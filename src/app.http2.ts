import http2 from 'node:http2';
import fs from 'node:fs';

const keyPath = './keys/server.key';
const certPath = './keys/server.crt';

const server = http2.createSecureServer(
  {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  },
  (req, res) => {
    console.log(req.url);

    if (req.url === '/') {
      const fsFileHtml = fs.readFileSync('./public/index.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fsFileHtml);
      return;
    }
    if (req.url?.endsWith('.js')) {
      const fsFileJs = fs.readFileSync('./public/js/app.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(fsFileJs);
      return;
    }
    if (req.url?.endsWith('.css')) {
      const fsFileCss = fs.readFileSync('./public/css/style.css', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(fsFileCss);
      return;
    }

    if (req.url.endsWith('.ico')) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end();
    }
  }
);

server.listen(8080, () => {
  console.log('Server running at 8080 port');
});
