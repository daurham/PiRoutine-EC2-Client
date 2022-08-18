/**
 * Return to this idea:
 * https://stackoverflow.com/questions/35233291/running-a-node-express-server-using-webpack-dev-server
 */

const express = require('express');
const path = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware'); // webpack hot reloading middleware
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { get, update } = require('./controller');

const compiler = webpack({
  mode: 'development',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/dist/index.html'),
    }),
  ],
  stats: {
    children: true,
  },
}); // move your `devServer` config from `webpack.config.js`

const app = express();
app.use(middleware(compiler, {
  // webpack-dev-middleware options
}));

const PORT = 8080;
const DIST_DIR = path.join(__dirname, '../client/dist/');

app.use(express.static(DIST_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ALARM TIME
app.get('/api/get-alarm-time', get.alarmTime);
app.patch('/update-alarm-time', update.alarmTime);

// DISARM STATUS
app.get('/api/get-disarm-status', get.disarmStatus);
app.patch('/update-disarm-status', update.disarmStatus);

// STREAK COUNT
app.get('/api/get-streak-count', get.streakCount);
app.patch('/update-streak-count', update.streakCount);

app.listen(PORT, () => console.log(`Listening and running: http://localhost:${PORT}`));
