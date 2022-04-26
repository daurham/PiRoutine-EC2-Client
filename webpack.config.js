const path = require('path');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: SRC_DIR,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: 'file-loader',
      },
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-transform-runtime', {
              regenerator: true,
            }],
          ],
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // plugins: [
    // new HtmlWebpackPlugin({
    // title: "esBUild",
    // template: "src/index.html",
    // }),
    // instead of fallback
    // new NodePolyfillPlugin(),

    // new webpack.ProvidePlugin({
    // process: "process/browser",
    // Buffer: ["buffer", "Buffer"],
    // React: "react",
    // }),
  // ],
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.ttf'],
  },
  // stats: {
  //   errorDetails: true,
  // },
};


// module.exports = {
//   entry: SRC_DIR,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR,
//   },
//   mode: 'development',
//   module: {
//     rules: [
//       {
//         test: /\.ttf$/,
//         use: 'file-loader',
//       },
//       {
//         test: /\.(js|jsx)?/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env', '@babel/preset-react'],
//           plugins: [
//             ['@babel/plugin-transform-runtime', {
//               regenerator: true,
//             }],
//           ],
//         },
//       },
//       {
//         test: /\.css$/i,
//         use: [
//           'style-loader',
//           {
//             loader: 'css-loader',
//             options: {
//               modules: true,
//             },
//           },
//         ],
//       },
//       {
//         test: /\.(woff|woff2|ttf)$/i,
//         use: {
//           loader: 'url-loader',
//         },
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: 'asset/resource',
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', 'css', 'ttf'],
//   },
// };