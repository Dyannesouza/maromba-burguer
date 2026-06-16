/* ═══════════════════════════════════════════════
   MAROMBA BURGUER — cliente.js
   Cardápio do cliente via QR Code
   SEM Service Worker — chamadas diretas ao servidor
═══════════════════════════════════════════════ */

const CAT_LABELS = {
  hamburgues:  '🍔 Hambúrgueres',
  espetinhos:  '🍢 Espetinhos',
  combos:      '🍱 Combos',
  caldinhos:   '🍲 Caldinhos',
  bebidas:     '🥤 Bebidas',
};
const CAT_EMOJI = {
  hamburgues:  '🍔',
  espetinhos:  '🍢',
  combos:      '🍱',
  caldinhos:   '🍲',
  bebidas:     '🥤',
};
const CATS = Object.keys(CAT_LABELS);
const fmt  = v => `R$ ${Number(v).toFixed(2).replace('.', ',')}`;
const uid  = () => 'PED' + String(Date.now()).slice(-6);

let stock   = [];
let menuIds = [];
let clientSelections = {};
let clientCat = 'hamburgues';

// Desregistra qualquer Service Worker para garantir chamadas diretas
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(r => r.unregister());
    console.log('SW desregistrado');
  });
}

async function loadClientData() {
  try {
    const [resStock, resMenu] = await Promise.all([
      fetch('/api/stock',  { cache: 'no-store' }),
      fetch('/api/menu',   { cache: 'no-store' }),
    ]);
    const apiStock = await resStock.json();
    const apiMenu  = await resMenu.json();
    stock   = Array.isArray(apiStock) && apiStock.length ? apiStock : [];
    menuIds = Array.isArray(apiMenu)  && apiMenu.length  ? apiMenu  : stock.map(p => p.id);
  } catch(e) {
    console.error('Erro ao carregar dados:', e);
  }
}

function renderClientCats() {
  document.getElementById('clientCatBar').innerHTML = CATS.map(c => `
    <button class="client-cat-btn ${clientCat === c ? 'active' : ''}" data-client-cat="${c}">${CAT_LABELS[c]}</button>
  `).join('');
}

function renderClientGrid() {
  const items = menuIds.map(id => stock.find(p => p.id === id)).filter(p => p && p.category === clientCat);
  document.getElementById('clientGrid').innerHTML = items.length ? items.map(p => {
    const qty = clientSelections[p.id] || 0;
    return `<div class="menu-card ${qty > 0 ? 'has-qty' : ''}" data-product-card="${p.id}">
      <div class="menu-card-emoji">${CAT_EMOJI[p.category] || '🍽️'}</div>
      <div class="menu-card-name">${p.name}</div>
      ${p.desc ? `<div style="font-size:0.72rem;color:var(--text-muted);line-height:1.4;margin-bottom:2px">${p.desc}</div>` : ''}
      <div class="menu-card-price">${fmt(p.price)}</div>
      <div class="qty-controls">
        <button class="qty-btn sub" data-client-action="dec" data-pid="${p.id}">−</button>
        <span class="qty-display" id="qty-${p.id}">${qty}</span>
        <button class="qty-btn add" data-client-action="inc" data-pid="${p.id}">+</button>
      </div>
    </div>`;
  }).join('') : `<div style="grid-column:1/-1;text-align:center;color:var(--text-dim);padding:40px">Nenhum item nesta categoria.</div>`;
}

function updateClientFooter() {
  let total = 0, count = 0;
  Object.entries(clientSelections).forEach(([id, qty]) => {
    const p = stock.find(x => x.id === id);
    if (p && qty > 0) { total += p.price * qty; count += qty; }
  });
  document.getElementById('clientTotalVal').textContent = fmt(total);
  document.getElementById('clientItemsCount').textContent = `${count} ${count === 1 ? 'item' : 'itens'}`;
  document.getElementById('btnClientConfirm').disabled = count === 0;
}

async function confirmClientOrder(tableNumber) {
  const items = Object.entries(clientSelections)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const p = stock.find(x => x.id === id);
      if (!p) return null;
      return { productId: String(p.id), name: String(p.name), price: Number(p.price), quantity: Number(qty) };
    }).filter(Boolean);

  if (!items.length) return;

  const order = {
    id:       uid(),
    table:    String(tableNumber),
    customer: 'Autoatendimento',
    phone:    '',
    notes:    'Pedido via QR Code',
    items:    items,
    status:   'Pendente',
    createdAt: new Date().toISOString()
  };

  // Envia via XHR síncrono-like para garantir que não usa SW
  const ok = await new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/orders', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.onload  = () => { console.log('Pedido enviado! Status:', xhr.status, xhr.responseText); resolve(xhr.status < 400); };
    xhr.onerror = () => { console.error('Erro XHR'); resolve(false); };
    xhr.send(JSON.stringify(order));
  });

  console.log('Pedido confirmado:', ok, order.id);

  // Mostra tela de confirmação
  document.getElementById('clientGrid').innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:40px 20px">
      <div style="font-size:4rem;margin-bottom:16px">${ok ? '🎉' : '⚠️'}</div>
      <div style="font-family:var(--font-display);font-size:2rem;color:var(--yellow);margin-bottom:8px">
        ${ok ? 'Pedido Confirmado!' : 'Pedido Enviado!'}
      </div>
      <div style="color:var(--text-muted)">
        ${ok ? 'Enviado para a cozinha. Aguarde! 💪' : 'Seu pedido foi registrado. Aguarde!'}
      </div>
      <div style="margin-top:8px;color:var(--text-dim);font-size:0.82rem">Pedido #${order.id}</div>
    </div>`;
  document.getElementById('clientCatBar').innerHTML = '';
  document.querySelector('.client-footer').style.display = 'none';
}

// Eventos do cliente
document.addEventListener('click', e => {
  const cat = e.target.closest('[data-client-cat]');
  if (cat) { clientCat = cat.dataset.clientCat; renderClientCats(); renderClientGrid(); return; }

  const btn = e.target.closest('[data-client-action]');
  if (!btn) return;
  const { clientAction, pid } = btn.dataset;
  if (clientAction === 'inc') clientSelections[pid] = (clientSelections[pid] || 0) + 1;
  else if (clientAction === 'dec' && clientSelections[pid] > 0) clientSelections[pid]--;
  const disp = document.getElementById('qty-' + pid);
  if (disp) disp.textContent = clientSelections[pid] || 0;
  const card = document.querySelector(`[data-product-card="${pid}"]`);
  if (card) card.classList.toggle('has-qty', (clientSelections[pid] || 0) > 0);
  updateClientFooter();
});

// Init
(async function() {
  const tableNumber = new URLSearchParams(window.location.search).get('mesa');
  if (!tableNumber) return;

  document.getElementById('adminShell').classList.add('hidden');
  document.getElementById('clientShell').classList.remove('hidden');
  document.getElementById('clientTableLabel').textContent = `Mesa ${tableNumber}`;

  await loadClientData();
  renderClientCats();
  renderClientGrid();

  document.getElementById('btnClientConfirm').addEventListener('click', () => confirmClientOrder(tableNumber));
})();
