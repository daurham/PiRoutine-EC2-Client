const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client/src'),
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-transform-runtime', { regenerator: true }],
          ],
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
