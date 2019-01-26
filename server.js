const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    '/api/teamcity',
    proxy({
      target: 'http://teamcity.qliro.local',
      changeOrigin: true,
      pathRewrite: {
        '^/api/teamcity': ''
      },
      logLevel: 'debug',
      onProxyReq(proxyReq) {
        proxyReq.setHeader('Authorization', 'Basic cG9udHVzbHU6U2Y4MzVwdWI0M3N1cmY3YWdl');
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
