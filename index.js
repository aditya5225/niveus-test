const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 5000;

const routes = {
  '/users': 'http://users:5001',
  '/transactions': 'http://transactions:5002',
  // '/gcs_upload': 'http://localhost:5003',
}

for (let route in routes) {
  app.use(route, createProxyMiddleware(route, {
    target: routes[route],
    changeOrigin: true,
    pathRewrite: {
      [route]: '',
    },
  }));
}

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
