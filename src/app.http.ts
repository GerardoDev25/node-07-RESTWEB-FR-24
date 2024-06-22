import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer((req, res) => {
  console.log(req.url);

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(`<h1>Url: ${req.url}</h1>`);
  // res.end();

  // const data = {
  //   name: 'John',
  //   age: 30,
  //   city: 'New York',
  // };

  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.write(JSON.stringify(data));
  // res.end();

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
});

server.listen(8080, () => {
  console.log('Server running at 8080 port');
});
