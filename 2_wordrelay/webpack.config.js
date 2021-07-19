const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',  // 실서비스: 'production'
  devtool: 'eval',  // 빠르게 하겠다는 뜻
  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: {
    app: ['./client'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
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

};