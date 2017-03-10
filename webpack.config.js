const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'example/index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
