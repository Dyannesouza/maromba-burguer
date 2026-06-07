/* ═══════════════════════════════════════════════
   MAROMBA BURGUER — maromba.js
═══════════════════════════════════════════════ */

// ── DATA VERSION (bump to force localStorage reset) ──
const DATA_VERSION = 3;

// ── CONSTANTS ──────────────────────────────────
const CAT_LABELS = {
  hamburgues:      '🍔 Hambúrgueres',
  acompanhamentos: '🍟 Acompanhamentos',
  bebidas:         '🥤 Bebidas',
  sobremesas:      '🍨 Sobremesas',
};

const CAT_EMOJI = {
  hamburgues:      '🍔',
  acompanhamentos: '🍟',
  bebidas:         '🥤',
  sobremesas:      '🍨',
};

const CATS = Object.keys(CAT_LABELS);

const DEFAULT_PRODUCTS = [
  // ── Hambúrgueres ─────────────────────────────
  { id:'h01', name:'Smash Burguer Clássico',       price:28.90, category:'hamburgues',      quantity:30, desc:'Blend 150g smashado, cheddar cremoso, picles, mostarda e ketchup artesanal.' },
  { id:'h02', name:'Maromba Beast',                price:42.90, category:'hamburgues',      quantity:20, desc:'Dois blends 150g, bacon defumado, cheddar duplo e molho especial da casa.' },
  { id:'h03', name:'Chicken Crispy',               price:32.90, category:'hamburgues',      quantity:25, desc:'Frango empanado crocante, maionese de alho, alface e tomate.' },
  { id:'h04', name:'BBQ Smokehouse',               price:39.90, category:'hamburgues',      quantity:22, desc:'Blend 180g, molho BBQ defumado, cebola caramelizada, queijo gouda e bacon.' },
  { id:'h05', name:'X-Tudo da Casa',               price:36.90, category:'hamburgues',      quantity:18, desc:'Blend 150g, ovo, bacon, presunto, queijo prato, alface e tomate.' },
  { id:'h06', name:'Burguer Vegetariano',          price:29.90, category:'hamburgues',      quantity:20, desc:'Blend de grão-de-bico, queijo prato derretido, rúcula e maionese de ervas.' },
  { id:'h07', name:'Truffle & Mushroom',           price:44.90, category:'hamburgues',      quantity:15, desc:'Blend 180g, cogumelos shimeji, queijo gruyère e maionese de trufas.' },
  { id:'h08', name:'Crispy Bacon Lovers',          price:38.90, category:'hamburgues',      quantity:18, desc:'Blend 150g, bacon crispy em dobro, cheddar, maionese defumada e pepperoni.' },
  { id:'h09', name:'Frango Buffalo',               price:33.90, category:'hamburgues',      quantity:22, desc:'Frango no molho buffalo picante, queijo azul, alface e molho ranch.' },
  { id:'h10', name:'Kids Burguer',                 price:22.90, category:'hamburgues',      quantity:30, desc:'Blend 100g, queijo prato, ketchup e maionese. Porção infantil.' },
  // ── Acompanhamentos ──────────────────────────
  { id:'a01', name:'Batata Frita Clássica',        price:16.50, category:'acompanhamentos', quantity:60, desc:'Batata palito frita em óleo de girassol com sal e páprica.' },
  { id:'a02', name:'Batata Frita com Cheddar',     price:22.90, category:'acompanhamentos', quantity:50, desc:'Batata frita coberta com molho de cheddar cremoso.' },
  { id:'a03', name:'Batata Frita com Bacon',       price:24.90, category:'acompanhamentos', quantity:45, desc:'Batata frita com bacon crocante picado e cebolinha.' },
  { id:'a04', name:'Batata Rústica Temperada',     price:19.90, category:'acompanhamentos', quantity:40, desc:'Wedges de batata com casca, alho e ervas finas.' },
  { id:'a05', name:'Anéis de Cebola',              price:18.90, category:'acompanhamentos', quantity:40, desc:'Cebola empanada crocante com molho ranch.' },
  { id:'a06', name:'Nuggets de Frango (8 un)',     price:21.90, category:'acompanhamentos', quantity:45, desc:'Nuggets artesanais de peito de frango com molho barbecue.' },
  { id:'a07', name:'Onion Rings BBQ',              price:20.90, category:'acompanhamentos', quantity:35, desc:'Anéis de cebola gigantes com molho BBQ defumado.' },
  { id:'a08', name:'Mac n Cheese Frito',           price:23.90, category:'acompanhamentos', quantity:28, desc:'Bolinhas de macarrão com queijo empanadas e fritas.' },
  { id:'a09', name:'Coleslaw da Casa',             price:12.90, category:'acompanhamentos', quantity:35, desc:'Salada de repolho cremosa com cenoura, maionese e limão.' },
  { id:'a10', name:'Batata Doce Frita',            price:21.90, category:'acompanhamentos', quantity:30, desc:'Batata doce frita com alecrim e flor de sal.' },
  // ── Bebidas ──────────────────────────────────
  { id:'b01', name:'Refrigerante Lata 350ml',      price: 7.90, category:'bebidas',         quantity:80, desc:'Coca-Cola, Pepsi, Guaraná Antarctica ou Sprite.' },
  { id:'b02', name:'Refrigerante 600ml',           price:11.90, category:'bebidas',         quantity:60, desc:'Coca-Cola, Pepsi, Guaraná Antarctica ou Sprite.' },
  { id:'b03', name:'Água Mineral 500ml',           price: 5.00, category:'bebidas',         quantity:80, desc:'Água mineral sem gás ou com gás.' },
  { id:'b04', name:'Suco Natural de Laranja',      price:13.90, category:'bebidas',         quantity:35, desc:'Suco de laranja espremido na hora, 400ml.' },
  { id:'b05', name:'Suco de Maracujá',             price:13.90, category:'bebidas',         quantity:30, desc:'Suco de maracujá natural batido, 400ml.' },
  { id:'b06', name:'Limonada Suíça',               price:14.90, category:'bebidas',         quantity:30, desc:'Limonada cremosa com leite condensado e menta, 400ml.' },
  { id:'b07', name:'Milkshake Oreo',               price:19.90, category:'bebidas',         quantity:25, desc:'Sorvete de baunilha com biscoito Oreo, 400ml.' },
  { id:'b08', name:'Milkshake Morango',            price:19.90, category:'bebidas',         quantity:25, desc:'Sorvete de morango com calda artesanal, 400ml.' },
  { id:'b09', name:'Milkshake Chocolate',          price:19.90, category:'bebidas',         quantity:25, desc:'Sorvete de chocolate belga, 400ml.' },
  { id:'b10', name:'Cerveja Artesanal IPA 350ml',  price:16.90, category:'bebidas',         quantity:40, desc:'IPA artesanal gelada, produção local.' },
  { id:'b11', name:'Cerveja Long Neck',            price:12.90, category:'bebidas',         quantity:50, desc:'Long neck gelada, marcas variadas.' },
  { id:'b12', name:'Cha Gelado Pessego/Limao',     price: 9.90, category:'bebidas',         quantity:35, desc:'Chá gelado artesanal, 400ml.' },
  // ── Sobremesas ───────────────────────────────
  { id:'s01', name:'Brownie com Sorvete',          price:18.90, category:'sobremesas',      quantity:20, desc:'Brownie quente com sorvete de creme e calda de chocolate.' },
  { id:'s02', name:'Cheesecake Frutas Vermelhas',  price:17.90, category:'sobremesas',      quantity:18, desc:'Fatia de cheesecake com calda de frutas vermelhas.' },
  { id:'s03', name:'Sorvete 2 Bolas',              price:10.90, category:'sobremesas',      quantity:30, desc:'Duas bolas — creme, chocolate, morango ou coco.' },
  { id:'s04', name:'Casquinha Simples',            price: 6.90, category:'sobremesas',      quantity:40, desc:'Casquinha com 1 bola de sorvete, sabores variados.' },
  { id:'s05', name:'Cookie com Sorvete',           price:16.90, category:'sobremesas',      quantity:15, desc:'Cookie gigante quentinho com sorvete e calda de caramelo.' },
  { id:'s06', name:'Pudim de Leite Condensado',    price:12.90, category:'sobremesas',      quantity:20, desc:'Fatia de pudim cremoso com calda de caramelo.' },
  { id:'s07', name:'Banana Split',                 price:19.90, category:'sobremesas',      quantity:15, desc:'Banana, 3 bolas de sorvete, chantilly e chocolate.' },
];

// Todos os produtos vão pro cardápio por padrão
const DEFAULT_MENU_IDS = DEFAULT_PRODUCTS.map(p => p.id);

const DEFAULT_TABLES = ['01','02','03','04','05','06'];

// ── API CLIENT ──────────────────────────────────────
const API_BASE = window.location.protocol !== 'file:' ? '' : '';
const USE_API  = window.location.protocol !== 'file:';

const API = {
  async get(path) {
    try {
      const r = await fetch(API_BASE + path);
      return await r.json();
    } catch { return null; }
  },
  async post(path, data) {
    try {
      const r = await fetch(API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await r.json();
    } catch { return null; }
  },
  async put(path, data) {
    try {
      const r = await fetch(API_BASE + path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await r.json();
    } catch { return null; }
  },
};

// ── LOCAL STORAGE FALLBACK ───────────────────────────
const S = {
  get(k)       { try { return localStorage.getItem(k); } catch { try { return sessionStorage.getItem(k); } catch { return null; } } },
  set(k, v)    { try { localStorage.setItem(k, v); } catch { try { sessionStorage.setItem(k, v); } catch {} } },
  parse(k, fb) { try { const v = this.get(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
  save(k, v)   { this.set(k, JSON.stringify(v)); },
};

// ── STATE ─────────────────────────────────────────
let stock   = [];
let menuIds = [];
let orders  = [];
let tables  = [];

let editOrderId  = null;
let editStockId  = null;
let payOrderId   = null;
let adminMenuCat = 'all';
let adminStockCat = 'all';

// ── INIT ──────────────────────────────────────────
async function loadData() {
  if (USE_API) {
    // Carrega dados do servidor (compartilhado entre todos os dispositivos)
    const [apiOrders, apiStock, apiTables, apiMenu] = await Promise.all([
      API.get('/api/orders'),
      API.get('/api/stock'),
      API.get('/api/tables'),
      API.get('/api/menu'),
    ]);

    orders  = Array.isArray(apiOrders)  ? apiOrders  : [];
    stock   = Array.isArray(apiStock)  && apiStock.length  ? apiStock  : DEFAULT_PRODUCTS.map(p => ({ ...p }));
    tables  = Array.isArray(apiTables) && apiTables.length ? apiTables : DEFAULT_TABLES.map(n => ({ number: n }));
    menuIds = Array.isArray(apiMenu)   && apiMenu.length   ? apiMenu   : stock.map(p => p.id);

    // Se não havia dados no servidor, salva os defaults
    if (!apiStock  || !apiStock.length)  await API.post('/api/stock',  stock);
    if (!apiTables || !apiTables.length) await API.post('/api/tables', tables);
    if (!apiMenu   || !apiMenu.length)   await API.post('/api/menu',   menuIds);
  } else {
    // Fallback local (desenvolvimento via file://)
    const savedVersion = parseInt(S.get('mb-version') || '0');
    if (savedVersion < DATA_VERSION) {
      ['mb-stock','mb-orders','mb-tables','mb-menu'].forEach(k => {
        try { localStorage.removeItem(k); } catch {}
        try { sessionStorage.removeItem(k); } catch {}
      });
      S.set('mb-version', String(DATA_VERSION));
    }
    const savedStock = S.parse('mb-stock', null);
    stock   = (savedStock && savedStock.length) ? savedStock : DEFAULT_PRODUCTS.map(p => ({ ...p }));
    orders  = S.parse('mb-orders', []);
    tables  = S.parse('mb-tables', DEFAULT_TABLES.map(n => ({ number: n })));
    const savedMenu = S.parse('mb-menu', null);
    menuIds = savedMenu || stock.map(p => p.id);
  }
}

async function saveAll() {
  if (USE_API) {
    await Promise.all([
      API.post('/api/orders', orders),
      API.post('/api/stock',  stock),
      API.post('/api/tables', tables),
      API.post('/api/menu',   menuIds),
    ]);
  } else {
    S.save('mb-stock',  stock);
    S.save('mb-orders', orders);
    S.save('mb-tables', tables);
    S.save('mb-menu',   menuIds);
  }
}

// ── HELPERS ───────────────────────────────────────
const fmt       = v => `R$ ${Number(v).toFixed(2).replace('.', ',')}`;
const uid       = () => 'PED' + String(Date.now()).slice(-6);
const orderTotal = o => o.items.reduce((s, i) => s + i.price * i.quantity, 0);
const productById = id => stock.find(p => p.id === id);

function getStatusBadge(status) {
  const map = { 'Pendente':'badge-pending', 'Em preparo':'badge-prep', 'Entregue':'badge-done', 'Pago':'badge-paid' };
  return `<span class="badge ${map[status]||''}">${status}</span>`;
}

function toast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 3000);
}

// ── MODAL HELPERS ─────────────────────────────────
function openModal(id)  { document.getElementById('backdrop').classList.remove('hidden'); const m = document.getElementById(id); m.classList.remove('hidden'); m.classList.add('visible'); }
function closeModal(id) { document.getElementById('backdrop').classList.add('hidden');    const m = document.getElementById(id); m.classList.add('hidden');    m.classList.remove('visible'); }

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-close]');
  if (btn) closeModal(btn.dataset.close);
  if (e.target === document.getElementById('backdrop'))
    ['modalOrder','modalPayment','modalStock','modalMenu','modalQR'].forEach(id => closeModal(id));
});

// ── TABS ──────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
      if (btn.dataset.tab === 'finance') renderFinance();
    });
  });
}

// ── KPI ───────────────────────────────────────────
function renderKpi() {
  const active  = orders.filter(o => o.status !== 'Pago');
  const paid    = orders.filter(o => o.status === 'Pago');
  const revenue = paid.reduce((s, o) => s + orderTotal(o), 0);
  const busy    = tables.filter(t => orders.some(o => o.table === t.number && o.status !== 'Pago')).length;

  document.getElementById('kpiGrid').innerHTML = [
    { icon:'🔥', label:'Pedidos Ativos',   value:active.length,  style:'--stat-color:var(--red)' },
    { icon:'🪑', label:'Mesas Ocupadas',   value:busy,           style:'--stat-color:var(--orange)' },
    { icon:'✅', label:'Pedidos do Dia',   value:paid.length,    style:'--stat-color:var(--green)' },
    { icon:'💰', label:'Faturamento Hoje', value:fmt(revenue),   style:'--stat-color:var(--yellow)' },
  ].map(k => `<div class="stat-card" style="${k.style}">
    <div class="stat-icon">${k.icon}</div>
    <div class="stat-label">${k.label}</div>
    <div class="stat-value">${k.value}</div>
  </div>`).join('');
}

// ── ORDERS ────────────────────────────────────────
function renderOrders() {
  const active = orders.filter(o => o.status !== 'Pago');
  const done   = orders.filter(o => o.status === 'Pago');

  document.getElementById('tbActive').innerHTML = active.length ? active.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>Mesa ${o.table}</td>
      <td>${o.customer}</td>
      <td class="text-muted">${o.items.length} item(s)</td>
      <td class="text-yellow font-cond">${fmt(orderTotal(o))}</td>
      <td>${getStatusBadge(o.status)}</td>
      <td><div class="flex gap-8">
        <button class="btn btn-secondary btn-sm" data-action="edit-order" data-id="${o.id}">✏️ Editar</button>
        ${o.status !== 'Entregue'
          ? `<button class="btn btn-outline-yellow btn-sm" data-action="advance-status" data-id="${o.id}">▶ Avançar</button>`
          : `<button class="btn btn-primary btn-sm" data-action="pay-order" data-id="${o.id}">💳 Fechar</button>`}
      </div></td>
    </tr>`).join('')
  : `<tr><td colspan="7" style="text-align:center;color:var(--text-dim);padding:24px">Nenhum pedido em andamento.</td></tr>`;

  document.getElementById('tbDone').innerHTML = done.length ? done.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>Mesa ${o.table}</td>
      <td>${o.customer}</td>
      <td class="font-cond text-yellow">${fmt(orderTotal(o))}</td>
      <td><span class="badge badge-paid">${o.paymentMethod||'Pago'}</span></td>
      <td class="text-muted text-sm">${o.paidAt ? new Date(o.paidAt).toLocaleString('pt-BR') : '—'}</td>
    </tr>`).join('')
  : `<tr><td colspan="6" style="text-align:center;color:var(--text-dim);padding:24px">Nenhum pedido finalizado.</td></tr>`;

  renderKpi();
}

// ── TABLES / MESAS ────────────────────────────────
function renderTables() {
  document.getElementById('tablesGrid').innerHTML = tables.map(t => {
    const order = orders.find(o => o.table === t.number && o.status !== 'Pago');
    const busy = !!order;
    return `<div class="mesa-card ${busy ? 'occupied' : ''}">
      <div>
        <div class="mesa-number">Mesa ${t.number}</div>
        <div class="mesa-status ${busy ? 'busy' : 'free'}">${busy ? '🔴 Ocupada' : '🟢 Livre'}</div>
        ${busy ? `<div class="text-muted text-sm" style="margin-top:4px">${order.customer} — ${fmt(orderTotal(order))}</div>` : ''}
      </div>
      <div class="mesa-actions">
        <button class="btn btn-primary btn-sm" data-action="open-table" data-table="${t.number}">${busy ? '📝 Ver Pedido' : '＋ Abrir'}</button>
        <button class="btn btn-secondary btn-sm" data-action="show-qr" data-table="${t.number}">QR Code</button>
        ${!busy ? `<button class="btn btn-danger btn-sm" data-action="delete-table" data-table="${t.number}">🗑</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

// ── STOCK ─────────────────────────────────────────
function renderStock() {
  // category filter bar
  const bar = document.getElementById('stockCatBar');
  if (bar) {
    bar.innerHTML = ['all', ...CATS].map(c => `
      <button class="cat-btn ${adminStockCat === c ? 'active' : ''}" data-stock-cat="${c}">
        ${c === 'all' ? '🌐 Todos' : CAT_LABELS[c]}
      </button>`).join('');
  }

  const filtered = adminStockCat === 'all' ? stock : stock.filter(p => p.category === adminStockCat);

  document.getElementById('tbStock').innerHTML = filtered.length ? filtered.map(p => `
    <tr>
      <td>
        <strong>${p.name}</strong>
        ${p.desc ? `<div class="text-muted text-sm" style="margin-top:3px">${p.desc}</div>` : ''}
      </td>
      <td><span class="badge" style="background:rgba(255,255,255,0.05);color:var(--text-muted);border:1px solid var(--border)">${CAT_LABELS[p.category]||p.category}</span></td>
      <td class="font-cond text-yellow">${fmt(p.price)}</td>
      <td><span style="color:${p.quantity <= 5 ? 'var(--red)' : 'var(--text)'}">${p.quantity}${p.quantity <= 5 ? ' ⚠️' : ''}</span></td>
      <td><div class="flex gap-8">
        <button class="btn btn-secondary btn-sm" data-action="edit-stock" data-id="${p.id}">✏️ Editar</button>
        <button class="btn btn-danger btn-sm" data-action="del-stock" data-id="${p.id}">🗑 Remover</button>
      </div></td>
    </tr>`).join('')
  : `<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px">Nenhum produto nesta categoria.</td></tr>`;
}

// ── ADMIN MENU ────────────────────────────────────
function renderAdminMenu() {
  const bar = document.getElementById('adminCatBar');
  bar.innerHTML = ['all', ...CATS].map(c => `
    <button class="cat-btn ${adminMenuCat === c ? 'active' : ''}" data-admin-cat="${c}">
      ${c === 'all' ? '🌐 Todos' : CAT_LABELS[c]}
    </button>`).join('');

  const inMenu = menuIds.map(id => stock.find(p => p.id === id)).filter(Boolean);
  const filtered = adminMenuCat === 'all' ? inMenu : inMenu.filter(p => p.category === adminMenuCat);

  document.getElementById('tbMenu').innerHTML = filtered.length ? filtered.map(p => `
    <tr>
      <td>
        <strong>${p.name}</strong>
        ${p.desc ? `<div class="text-muted text-sm" style="margin-top:3px">${p.desc}</div>` : ''}
      </td>
      <td>${CAT_LABELS[p.category]||p.category}</td>
      <td class="font-cond text-yellow">${fmt(p.price)}</td>
      <td>${p.quantity}</td>
      <td><button class="btn btn-danger btn-sm" data-action="del-menu" data-id="${p.id}">🗑 Remover do Cardápio</button></td>
    </tr>`).join('')
  : `<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px">Nenhum item nesta categoria.</td></tr>`;
}

// ── FINANCE ───────────────────────────────────────
function renderFinance() {
  const paid    = orders.filter(o => o.status === 'Pago');
  const revenue = paid.reduce((s, o) => s + orderTotal(o), 0);
  const avg     = paid.length ? revenue / paid.length : 0;

  document.getElementById('financeKpi').innerHTML = [
    { icon:'💰', label:'Faturamento Total', value:fmt(revenue),  style:'--stat-color:var(--yellow)' },
    { icon:'📊', label:'Pedidos Pagos',     value:paid.length,   style:'--stat-color:var(--green)' },
    { icon:'🧾', label:'Ticket Médio',      value:fmt(avg),      style:'--stat-color:var(--blue)' },
  ].map(k => `<div class="stat-card" style="${k.style}">
    <div class="stat-icon">${k.icon}</div><div class="stat-label">${k.label}</div><div class="stat-value">${k.value}</div>
  </div>`).join('');

  const byPay = {};
  paid.forEach(o => { const m = o.paymentMethod||'N/D'; if (!byPay[m]) byPay[m] = {count:0,total:0}; byPay[m].count++; byPay[m].total += orderTotal(o); });

  document.getElementById('tbPayments').innerHTML = Object.entries(byPay).map(([m,v]) =>
    `<tr><td>${m}</td><td>${v.count}</td><td class="font-cond text-yellow">${fmt(v.total)}</td></tr>`
  ).join('') || `<tr><td colspan="3" style="text-align:center;color:var(--text-dim);padding:18px">Nenhum pagamento registrado.</td></tr>`;

  document.getElementById('tbFinanceAll').innerHTML = paid.map(o =>
    `<tr>
      <td><strong>${o.id}</strong></td><td>Mesa ${o.table}</td><td>${o.customer}</td>
      <td class="font-cond text-yellow">${fmt(orderTotal(o))}</td><td>${o.paymentMethod}</td>
      <td class="text-muted text-sm">${o.paidAt ? new Date(o.paidAt).toLocaleString('pt-BR') : '—'}</td>
    </tr>`
  ).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--text-dim);padding:18px">Nenhum histórico.</td></tr>`;
}

// ── ORDER MODAL ───────────────────────────────────
function openOrderModal(tableNumber, orderId = null) {
  editOrderId = orderId;
  const order = orderId ? orders.find(o => o.id === orderId) : null;
  document.getElementById('modalOrderTitle').textContent = order ? `Editar Pedido — ${orderId}` : 'Novo Pedido';
  document.getElementById('fTable').value    = tableNumber;
  document.getElementById('fCustomer').value = order?.customer || '';
  document.getElementById('fPhone').value    = order?.phone    || '';
  document.getElementById('fNotes').value    = order?.notes    || '';
  document.getElementById('itemsList').innerHTML = '';
  if (order?.items.length) order.items.forEach(i => addItemRow(i.productId, i.quantity));
  else addItemRow();
  recalcSummary();
  openModal('modalOrder');
}

function addItemRow(productId = '', qty = 1) {
  const row = document.createElement('div');
  row.className = 'item-row';
  const opts = stock.map(p =>
    `<option value="${p.id}" ${p.id === productId ? 'selected' : ''}>${CAT_EMOJI[p.category]||''} ${p.name} — ${fmt(p.price)}</option>`
  ).join('');
  row.innerHTML = `
    <select class="item-product" style="width:100%;padding:10px 12px;background:var(--bg-input);border:1px solid var(--border-strong);border-radius:var(--radius-sm);color:var(--text)">
      <option value="">— selecione um produto —</option>${opts}
    </select>
    <div class="item-controls">
      <div></div>
      <div><input type="number" class="item-qty" value="${qty}" min="1" style="padding:8px 10px;background:var(--bg-input);border:1px solid var(--border-strong);border-radius:var(--radius-sm);color:var(--text);width:100%" /></div>
      <div class="flex" style="gap:6px;align-items:center">
        <span class="item-total font-cond text-yellow" style="min-width:80px;text-align:right">—</span>
        <button class="btn btn-danger btn-sm item-remove" type="button">🗑</button>
      </div>
    </div>`;
  row.querySelector('.item-product').addEventListener('change', recalcSummary);
  row.querySelector('.item-qty').addEventListener('input', recalcSummary);
  row.querySelector('.item-remove').addEventListener('click', () => { row.remove(); recalcSummary(); });
  document.getElementById('itemsList').appendChild(row);
  recalcSummary();
}

function recalcSummary() {
  let items = 0, total = 0;
  document.querySelectorAll('#itemsList .item-row').forEach(row => {
    const pid = row.querySelector('.item-product').value;
    const qty = Number(row.querySelector('.item-qty').value) || 0;
    const p   = productById(pid);
    const sub = p ? p.price * qty : 0;
    row.querySelector('.item-total').textContent = p ? fmt(sub) : '—';
    if (p && qty > 0) { items += qty; total += sub; }
  });
  document.getElementById('sumItems').textContent = items;
  document.getElementById('sumTotal').textContent  = fmt(total);
}

async function saveOrder() {
  const tableNumber = document.getElementById('fTable').value;
  const customer    = document.getElementById('fCustomer').value.trim() || 'Cliente';
  const phone       = document.getElementById('fPhone').value.trim();
  const notes       = document.getElementById('fNotes').value.trim();
  const items = [];
  document.querySelectorAll('#itemsList .item-row').forEach(row => {
    const pid = row.querySelector('.item-product').value;
    const qty = Number(row.querySelector('.item-qty').value) || 0;
    const p = productById(pid);
    if (p && qty > 0) items.push({ productId:p.id, name:p.name, price:p.price, quantity:qty });
  });
  if (!items.length) { toast('Adicione pelo menos um item.', 'error'); return; }

  if (editOrderId) {
    const o = orders.find(x => x.id === editOrderId);
    if (o) Object.assign(o, { items, customer, phone, notes });
    if (USE_API) await API.put('/api/orders/' + editOrderId, o);
  } else {
    const newOrder = { id:uid(), table:tableNumber, customer, phone, notes, items, status:'Pendente', createdAt:new Date().toISOString() };
    orders.unshift(newOrder);
    items.forEach(i => { const p = productById(i.productId); if (p) p.quantity = Math.max(0, p.quantity - i.quantity); });
    if (USE_API) await API.post('/api/orders', newOrder);
  }
  await saveAll(); renderAll(); closeModal('modalOrder');
  toast(editOrderId ? 'Pedido atualizado!' : 'Pedido criado!');
  editOrderId = null;
}

async function advanceStatus(orderId) {
  const o = orders.find(x => x.id === orderId);
  if (!o) return;
  const next = { 'Pendente':'Em preparo', 'Em preparo':'Entregue' };
  if (next[o.status]) {
    o.status = next[o.status];
    if (USE_API) await API.put('/api/orders/' + orderId, { status: o.status });
    await saveAll(); renderAll(); toast('Status atualizado!');
  }
}

// ── PAYMENT ───────────────────────────────────────
function openPayment(orderId) {
  const o = orders.find(x => x.id === orderId);
  if (!o) return;
  payOrderId = orderId;
  document.getElementById('payOrderLabel').textContent = `${o.id} — Mesa ${o.table} — ${o.customer}`;
  document.getElementById('payTotal').textContent = fmt(orderTotal(o));
  document.querySelectorAll('[name=payMethod]').forEach(r => r.checked = r.value === 'Dinheiro');
  openModal('modalPayment');
}

async function confirmPayment() {
  const o = orders.find(x => x.id === payOrderId);
  if (!o) return;
  o.status = 'Pago';
  o.paymentMethod = document.querySelector('[name=payMethod]:checked')?.value || 'Dinheiro';
  o.paidAt = new Date().toISOString();
  if (USE_API) await API.put('/api/orders/' + payOrderId, { status: o.status, paymentMethod: o.paymentMethod, paidAt: o.paidAt });
  await saveAll(); renderAll(); closeModal('modalPayment');
  toast(`Conta fechada — ${o.paymentMethod} ✅`);
}

// ── STOCK MODAL ───────────────────────────────────
function openStockModal(productId = null) {
  editStockId = productId;
  const p = productId ? stock.find(x => x.id === productId) : null;
  document.getElementById('modalStockTitle').textContent = p ? 'Editar Produto' : 'Adicionar Produto';
  document.getElementById('fStockName').value  = p?.name     || '';
  document.getElementById('fStockPrice').value = p?.price    || '';
  document.getElementById('fStockQty').value   = p?.quantity ?? '';
  document.getElementById('fStockCat').value   = p?.category || 'hamburgues';
  document.getElementById('fStockDesc').value  = p?.desc     || '';
  openModal('modalStock');
}

function saveStockProduct() {
  const name     = document.getElementById('fStockName').value.trim();
  const price    = parseFloat(document.getElementById('fStockPrice').value);
  const quantity = parseInt(document.getElementById('fStockQty').value);
  const category = document.getElementById('fStockCat').value;
  const desc     = document.getElementById('fStockDesc').value.trim();

  if (!name || isNaN(price) || isNaN(quantity)) { toast('Preencha nome, preço e quantidade.', 'error'); return; }

  if (editStockId) {
    const p = stock.find(x => x.id === editStockId);
    if (p) Object.assign(p, { name, price, quantity, category, desc });
  } else {
    const id = 'u' + Date.now();
    stock.push({ id, name, price, quantity, category, desc });
    // Novo produto vai pro cardápio automaticamente
    menuIds.push(id);
  }
  saveAll(); renderStock(); renderAdminMenu();
  closeModal('modalStock');
  toast(editStockId ? 'Produto atualizado!' : 'Produto adicionado ao estoque e cardápio!');
  editStockId = null;
}

// ── MENU MODAL ────────────────────────────────────
function openMenuModal() {
  const notInMenu = stock.filter(p => !menuIds.includes(p.id));
  const sel = document.getElementById('fMenuProduct');
  sel.innerHTML = notInMenu.length
    ? notInMenu.map(p => `<option value="${p.id}">${CAT_EMOJI[p.category]||''} ${p.name} — ${fmt(p.price)}</option>`).join('')
    : '<option disabled>Todos os produtos já estão no cardápio</option>';
  openModal('modalMenu');
}

function saveMenuItem() {
  const id = document.getElementById('fMenuProduct').value;
  if (!id) { toast('Selecione um produto.', 'error'); return; }
  if (!menuIds.includes(id)) menuIds.push(id);
  saveAll(); renderAdminMenu(); closeModal('modalMenu');
  toast('Produto adicionado ao cardápio!');
}

// ── QR ────────────────────────────────────────────
function showQR(tableNumber) {
  const proto  = window.location.protocol;
  const host   = window.location.hostname;
  const isFile = proto === 'file:';
  const isLocal = host === 'localhost' || host === '127.0.0.1' || /^192\.168\./.test(host) || /^10\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host);

  document.getElementById('qrTitle').textContent = `QR Code — Mesa ${tableNumber}`;
  const c      = document.getElementById('qrContainer');
  const linkEl = document.getElementById('qrLinkText');
  const noteEl = document.getElementById('qrNote');
  c.innerHTML  = '';

  if (isFile) {
    c.innerHTML = `
      <div style="padding:20px;text-align:center;display:grid;gap:10px">
        <div style="font-size:2.5rem">⚠️</div>
        <div style="font-family:var(--font-cond);font-size:1rem;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:.06em">Arquivo local — QR inativo</div>
        <div style="font-size:0.82rem;color:var(--text-muted);line-height:1.6">
          Abra via <code style="color:var(--yellow)">node server.js</code> para ativar.
        </div>
      </div>`;
    linkEl.textContent = '';
    if (noteEl) noteEl.style.display = 'none';
    openModal('modalQR');
    return;
  }

  const u = new URL(window.location.href);
  u.searchParams.set('mesa', tableNumber);
  const url = u.toString();

  if (typeof QRCode !== 'undefined') {
    new QRCode(c, { text:url, width:200, height:200, colorDark:'#000', colorLight:'#fff', correctLevel:QRCode.CorrectLevel.H });
  }
  linkEl.innerHTML = `<a href="${url}" target="_blank" rel="noopener" style="word-break:break-all">${url}</a>`;

  if (isLocal && noteEl) {
    noteEl.innerHTML = `
      <span style="color:var(--orange)">⚠️ URL local — só funciona na sua rede Wi-Fi.</span><br>
      <span style="font-size:0.78rem">Para qualquer pessoa acessar de fora, use o <strong style="color:var(--yellow)">ngrok</strong> ou faça deploy no <strong style="color:var(--yellow)">Railway</strong>.<br>
      Veja as instruções no arquivo <code>DEPLOY.md</code>.</span>`;
    noteEl.style.display = '';
  } else if (noteEl) {
    noteEl.innerHTML = '✅ QR Code público — qualquer pessoa pode escanear.';
    noteEl.style.color = 'var(--green)';
    noteEl.style.display = '';
  }

  openModal('modalQR');
}

// ── CLIENT MODE ───────────────────────────────────
let clientSelections = {};
let clientCat = 'hamburgues';

function isClientMode() { return new URLSearchParams(window.location.search).get('mesa') !== null; }

function initClientMode() {
  const tableNumber = new URLSearchParams(window.location.search).get('mesa');
  if (!tableNumber) return;
  document.getElementById('adminShell').classList.add('hidden');
  document.getElementById('clientShell').classList.remove('hidden');
  document.getElementById('clientTableLabel').textContent = `Mesa ${tableNumber}`;
  renderClientCats();
  renderClientGrid();
  document.getElementById('btnClientConfirm').addEventListener('click', () => confirmClientOrder(tableNumber));
}

function renderClientCats() {
  document.getElementById('clientCatBar').innerHTML = CATS.map(c => `
    <button class="client-cat-btn ${clientCat === c ? 'active' : ''}" data-client-cat="${c}">${CAT_LABELS[c]}</button>`).join('');
}

function renderClientGrid() {
  const items = menuIds.map(id => stock.find(p => p.id === id)).filter(p => p && p.category === clientCat);
  document.getElementById('clientGrid').innerHTML = items.length ? items.map(p => {
    const qty = clientSelections[p.id] || 0;
    return `<div class="menu-card ${qty > 0 ? 'has-qty' : ''}" data-product-card="${p.id}">
      <div class="menu-card-emoji">${CAT_EMOJI[p.category]||'🍽️'}</div>
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
    .filter(([,qty]) => qty > 0)
    .map(([id,qty]) => { const p = stock.find(x => x.id === id); return p ? { productId:p.id, name:p.name, price:p.price, quantity:qty } : null; })
    .filter(Boolean);
  if (!items.length) return;
  orders.unshift({ id:uid(), table:tableNumber, customer:'Autoatendimento', phone:'', notes:'Pedido via QR Code', items, status:'Pendente', createdAt:new Date().toISOString() });
  items.forEach(i => { const p = stock.find(x => x.id === i.productId); if (p) p.quantity = Math.max(0, p.quantity - i.quantity); });
  saveAll();
  document.getElementById('clientGrid').innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:40px 20px">
      <div style="font-size:4rem;margin-bottom:16px">🎉</div>
      <div style="font-family:var(--font-display);font-size:2rem;color:var(--yellow);margin-bottom:8px">Pedido Confirmado!</div>
      <div style="color:var(--text-muted)">Enviado para a cozinha. Aguarde! 💪</div>
    </div>`;
  document.getElementById('clientCatBar').innerHTML = '';
  document.querySelector('.client-footer').style.display = 'none';
}

// ── DELEGATE EVENTS ───────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id, table } = btn.dataset;
  switch (action) {
    case 'open-table':      { const o = orders.find(x => x.table === table && x.status !== 'Pago'); openOrderModal(table, o?.id); break; }
    case 'edit-order':      { const o = orders.find(x => x.id === id); if (o) openOrderModal(o.table, id); break; }
    case 'advance-status':  advanceStatus(id); break;
    case 'pay-order':       openPayment(id); break;
    case 'show-qr':         showQR(table); break;
    case 'delete-table':
      if (confirm(`Remover Mesa ${table}?`)) { tables = tables.filter(t => t.number !== table); saveAll(); renderTables(); } break;
    case 'edit-stock':      openStockModal(id); break;
    case 'del-stock':
      if (confirm('Remover este produto do estoque? Ele também será removido do cardápio.')) {
        stock   = stock.filter(p => p.id !== id);
        menuIds = menuIds.filter(x => x !== id);
        saveAll(); renderStock(); renderAdminMenu();
        toast('Produto removido.');
      } break;
    case 'del-menu':
      menuIds = menuIds.filter(x => x !== id);
      saveAll(); renderAdminMenu();
      toast('Removido do cardápio. Produto ainda está no estoque.'); break;
  }
});

// Category filters
document.addEventListener('click', e => {
  const ab = e.target.closest('[data-admin-cat]');
  if (ab) { adminMenuCat = ab.dataset.adminCat; renderAdminMenu(); return; }
  const sb = e.target.closest('[data-stock-cat]');
  if (sb) { adminStockCat = sb.dataset.stockCat; renderStock(); return; }
});

// Client events
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

// ── BUTTON WIRING ─────────────────────────────────
function wireBtns() {
  document.getElementById('btnNewOrder').addEventListener('click', () => {
    const free = tables.find(t => !orders.some(o => o.table === t.number && o.status !== 'Pago'));
    openOrderModal(free?.number || tables[0]?.number || '01');
  });
  document.getElementById('btnNewTable').addEventListener('click', () => {
    const nums = tables.map(t => parseInt(t.number)).filter(n => !isNaN(n));
    const next = String((nums.length ? Math.max(...nums) + 1 : 1)).padStart(2, '0');
    tables.push({ number: next }); saveAll(); renderTables();
    toast(`Mesa ${next} adicionada!`);
  });
  document.getElementById('btnAddItem').addEventListener('click', () => addItemRow());
  document.getElementById('btnSaveOrder').addEventListener('click', saveOrder);
  document.getElementById('btnConfirmPayment').addEventListener('click', confirmPayment);
  document.getElementById('btnAddStock').addEventListener('click', () => openStockModal());
  document.getElementById('btnSaveStock').addEventListener('click', saveStockProduct);
  document.getElementById('btnAddMenu').addEventListener('click', openMenuModal);
  document.getElementById('btnSaveMenu').addEventListener('click', saveMenuItem);
}

function renderAll() { renderOrders(); renderTables(); renderStock(); renderAdminMenu(); }

// ── MAIN ──────────────────────────────────────────
(async function main() {
  await loadData();
  if (isClientMode()) {
    initClientMode();
  } else {
    initTabs(); wireBtns(); renderAll();
  }
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

  // Auto-refresh pedidos a cada 5 segundos (só no painel admin online)
  if (USE_API && !isClientMode()) {
    setInterval(async () => {
      const fresh = await API.get('/api/orders');
      if (Array.isArray(fresh)) { orders = fresh; renderOrders(); }
    }, 5000);
  }

  // ── PWA Install prompt ──────────────────────────
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    // Só mostra o banner de instalação no modo admin (não no cardápio do cliente)
    if (!isClientMode()) showInstallBanner();
  });

  function showInstallBanner() {
    if (document.getElementById('installBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'installBanner';
    banner.style.cssText = `
      position:fixed;bottom:20px;right:20px;z-index:999;
      background:var(--bg-card);border:1px solid var(--yellow);
      border-radius:var(--radius);padding:14px 18px;
      display:flex;align-items:center;gap:14px;
      box-shadow:0 8px 32px rgba(0,0,0,0.5);
      font-family:var(--font-body);max-width:320px;
      animation:slideUp 300ms ease;
    `;
    banner.innerHTML = `
      <style>@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}</style>
      <div style="font-size:2rem">📲</div>
      <div style="flex:1">
        <div style="font-family:var(--font-cond);font-weight:700;font-size:0.95rem;letter-spacing:.04em">Instalar App</div>
        <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px">Adicione à tela inicial para acesso rápido</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button id="btnInstallPwa" style="padding:7px 14px;background:var(--yellow);color:#000;border:none;border-radius:8px;font-family:var(--font-cond);font-weight:700;font-size:0.82rem;cursor:pointer;letter-spacing:.04em">Instalar</button>
        <button id="btnDismissInstall" style="padding:4px;background:none;border:none;color:var(--text-muted);font-size:0.75rem;cursor:pointer">Agora não</button>
      </div>
    `;
    document.body.appendChild(banner);
    document.getElementById('btnInstallPwa').addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      banner.remove();
      if (outcome === 'accepted') toast('App instalado com sucesso! 🎉');
    });
    document.getElementById('btnDismissInstall').addEventListener('click', () => banner.remove());
  }
})();
