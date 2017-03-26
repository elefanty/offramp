const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable HMR in development
if (process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT ENVIRONMENT: Hot Reloading...');

  const webpack = require('webpack');
  const webpackDevConfig = require('../../../webpack.config');

  const compiler = webpack(webpackDevConfig);

  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevMiddleware = require('webpack-dev-middleware');

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true
  }));

  app.use(webpackHotMiddleware(compiler, {
    reload: true
  }));
}

// Serve static assets
app.use(express.static(path.join(__dirname, '../dist/assets')));

// Test async hooks in router
app.get('/api/hooks', (req, res) => {
  const hooks = [
    {
      name: 'beforeEnter'
    },

    {
      name: 'onEnter'
    },

    {
      name: 'beforeExit'
    },

    {
      name: 'onExit'
    }
  ];

  setTimeout(() => {
    res.json(hooks);
  }, 1000);
});

// Always send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
