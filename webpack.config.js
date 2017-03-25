const webpack = require('webpack');
const path = require('path');

const store = process.env.STORE_TYPE;

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      path.join(__dirname, `example/${store}/client/index.jsx`)
    ]
  },

  output: {
    path: path.join(__dirname, `example/${store}/dist`),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]

};
