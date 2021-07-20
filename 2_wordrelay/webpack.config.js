const path = require('path');
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: ['./client',]
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'],  // browserslist
            },
            debug: true,
          }],
          '@babel/preset-react'
        ],
        plugins: [
          'react-refresh/babel',
        ],
      },
    }],
  },
  plugins: [
    new RefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },
  devServer: {
    publicPath: '/dist/',
    hot: true,
  },
};
