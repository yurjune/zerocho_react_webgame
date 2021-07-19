const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',  // 실서비스: 'production'
  devtool: 'eval',  // 실서비스: 'hidden-source-map'
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: ['./client'],
  },
  module: {
    rules: [{
      test: /\.jsx?/, // 정규표현식: js와 jsx파일에 룰을 적용
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    }],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  
};