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

// Always send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
