const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  console.log('Request received for:', path);
  if (path === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(
        "Hello, IT122 world class students, you have effectively set up your server! This is the home page."
    );
} else if (path === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(
        "Hello, This is the about page."
    );
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

