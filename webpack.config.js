// const path = require('path');
//
// module.exports = {
//   entry: [
//     path.resolve(__dirname, 'example/index.jsx')
//   ],
//   output: {
//     path: path.resolve(__dirname, 'example'),
//     filename: 'bundle.js'
//   },
//   devtool: 'source-map',
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       }
//     ]
//   }
// };

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      path.join(__dirname, 'example/client/index.jsx')
    ]
  },

  output: {
    path: path.join(__dirname, 'example/dist'),
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
