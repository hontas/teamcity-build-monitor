require('dotenv').config();
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const TEAMCITY_URL = process.env.TEAMCITY_URL;
const TEAMCITY_AUTH = process.env.TEAMCITY_AUTH;

app.prepare().then(() => {
  const server = express();

  server.use(
    '/api/teamcity',
    proxy({
      target: TEAMCITY_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/teamcity': ''
      },
      logLevel: 'debug',
      onProxyReq(proxyReq) {
        proxyReq.setHeader('Authorization', TEAMCITY_AUTH);
      }
    })
  );

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
