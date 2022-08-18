/**
 * This version is a functioning independant devServer.
 *  I'm refactoring to enable simple workflow.
 * But intend on exploring this again.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = require('dotenv').config().parsed;

const MODE = ENV.NODE_ENV || 'development';

module.exports = {
  entry: path.resolve(__dirname, './client/src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  mode: MODE,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/dist/index.html'),
    }),
  ],
  // devServer: {
  //   historyApiFallback: true,
  //   hot: true,
  //   // inline: true,

  //   host: 'localhost', // Defaults to `localhost`
  //   port: 3000, // Defaults to 8080
  //   proxy: {
  //     '^/api/*': {
  //       target: 'http://localhost:8080/api/',
  //       secure: false,
  //     },
  //   },
  // },
};