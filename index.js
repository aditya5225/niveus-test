const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 5000;

const routes = {
  '/users': 'http://localhost:5001',
  '/transactions': 'http://localhost:5002'
}

for (let route in routes) {
  app.use(route, createProxyMiddleware({ target: routes[route] }));
}


app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
