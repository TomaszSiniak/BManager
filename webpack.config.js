const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules:
    [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-hot-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]--[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader',
          'img-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    publicPath: '/',
    proxy: {
      '/api/**': 'http://localhost:3000'
    }
  }
}