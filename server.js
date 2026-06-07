/**
 * MAROMBA BURGUER — Servidor Local
 * 
 * Como usar:
 *   1. Abra o terminal nesta pasta
 *   2. Execute:  node server.js
 *   3. Acesse no navegador:  http://localhost:3000
 *   4. O celular acessa pelo IP exibido no terminal
 *      — celular e computador precisam estar no mesmo Wi-Fi
 */

const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');
const os   = require('node:os');

const PORT = 3000;
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

function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

const server = http.createServer(function(req, res) {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext      = path.extname(filePath).toLowerCase();
  const mimeType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, function(err, data) {
    if (err) {
      fs.readFile(path.join(ROOT, 'index.html'), function(err2, fallback) {
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

server.listen(PORT, '0.0.0.0', function() {
  const ip = getLocalIP();
  const pad = '                  ';
  console.log('\n\u2554' + '\u2550'.repeat(52) + '\u2557');
  console.log('\u2551    \uD83C\uDF54  MAROMBA BURGUER \u2014 Servidor Local         \u2551');
  console.log('\u2560' + '\u2550'.repeat(52) + '\u2563');
  console.log('\u2551  Computador :  http://localhost:' + PORT + pad.slice(0,16) + '\u2551');
  console.log('\u2551  Celular/QR :  http://' + ip + ':' + PORT + pad.slice(ip.length) + '\u2551');
  console.log('\u2560' + '\u2550'.repeat(52) + '\u2563');
  console.log('\u2551  Celular e PC precisam estar no mesmo Wi-Fi    \u2551');
  console.log('\u2551  Pressione Ctrl+C para encerrar                \u2551');
  console.log('\u255A' + '\u2550'.repeat(52) + '\u255D\n');
});
