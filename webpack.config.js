const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'pouchdb', 'pouchdb-quick-search', 'moment', 'draft-js', 'slugify'
]

var distPath, indexFilename, cssFilename, fonts;
if (process.env.NODE_ENV == 'production') {
  distPath = 'dist/js';
  indexFilename = '../index.html';
  cssFilename = '../css/style.css';
} else {
  distPath = 'dist';
  indexFilename = 'index.html';
  cssFilename = 'css/style.css';
}

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, distPath),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        }),
        test: /\.css$/
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=css/fonts/[name].[ext]'
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=img/[name].[ext]'
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin(cssFilename),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      filename: indexFilename,
      template: './src/index.html'
    })
  ],
  devServer: {
    port: 3000,
  }
}

module.exports = config;
