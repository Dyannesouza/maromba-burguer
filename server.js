/**
 * MAROMBA BURGUER — Servidor com API de dados
 * Os pedidos ficam em memória no servidor (compartilhado entre todos os clientes)
 */

const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');
const os   = require('node:os');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
};

// ── BANCO DE DADOS EM MEMÓRIA ─────────────────────
// Persiste enquanto o servidor estiver rodando
// No Railway, reinicia ao fazer redeploy (dados zerados)
let db = {
  orders: [],
  stock:  null,  // null = usa os defaults do frontend
  tables: null,
  menu:   null,
};

function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

function jsonResponse(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url.split('?')[0];

  // ── API ROUTES ──────────────────────────────────
  if (url.startsWith('/api/')) {

    // GET /api/orders — lista todos os pedidos
    if (url === '/api/orders' && req.method === 'GET') {
      return jsonResponse(res, db.orders);
    }

    // POST /api/orders — cria novo pedido
    if (url === '/api/orders' && req.method === 'POST') {
      const body = await readBody(req);
      // Valida campos obrigatórios
      if (body && body.id && body.table) {
        // Garante que items é sempre array
        body.items = Array.isArray(body.items) ? body.items : [];
        // Remove pedido duplicado se existir
        db.orders = db.orders.filter(o => o.id !== body.id);
        db.orders.unshift(body);
        console.log('Novo pedido:', body.id, 'Mesa', body.table, body.items.length, 'itens');
      }
      return jsonResponse(res, { ok: true, order: body });
    }

    // PUT /api/orders/:id — atualiza pedido
    if (url.startsWith('/api/orders/') && req.method === 'PUT') {
      const id = url.replace('/api/orders/', '');
      const body = await readBody(req);
      const idx = db.orders.findIndex(o => o.id === id);
      if (idx !== -1) {
        db.orders[idx] = { ...db.orders[idx], ...body };
        return jsonResponse(res, { ok: true, order: db.orders[idx] });
      }
      return jsonResponse(res, { ok: false }, 404);
    }

    // GET /api/stock
    if (url === '/api/stock' && req.method === 'GET') {
      return jsonResponse(res, db.stock || []);
    }

    // POST /api/stock — salva estoque completo
    if (url === '/api/stock' && req.method === 'POST') {
      const body = await readBody(req);
      db.stock = body;
      return jsonResponse(res, { ok: true });
    }

    // GET /api/tables
    if (url === '/api/tables' && req.method === 'GET') {
      return jsonResponse(res, db.tables || []);
    }

    // POST /api/tables
    if (url === '/api/tables' && req.method === 'POST') {
      const body = await readBody(req);
      db.tables = body;
      return jsonResponse(res, { ok: true });
    }

    // GET /api/menu
    if (url === '/api/menu' && req.method === 'GET') {
      return jsonResponse(res, db.menu || []);
    }

    // POST /api/menu
    if (url === '/api/menu' && req.method === 'POST') {
      const body = await readBody(req);
      db.menu = body;
      return jsonResponse(res, { ok: true });
    }

    return jsonResponse(res, { error: 'Not found' }, 404);
  }

  // ── STATIC FILES ────────────────────────────────
  let filePath = url === '/' ? '/index.html' : url;
  filePath = path.normalize(path.join(ROOT, filePath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }

  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, function (err, data) {
    if (err) {
      fs.readFile(path.join(ROOT, 'index.html'), function (err2, fallback) {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fallback);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', function () {
  const ip = getLocalIP();
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║      🍔  MAROMBA BURGUER — Servidor Online       ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  Local:  http://localhost:${PORT}                    ║`);
  console.log(`║  Rede:   http://${ip}:${PORT}               ║`);
  console.log('╚══════════════════════════════════════════════════╝\n');
});
