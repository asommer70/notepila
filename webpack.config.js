const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'pouchdb', 'moment', 'draft-js'
]

var distPath, indexFilename, cssFilename;
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
    // contentBase: "./dist",
    // watchContentBase: true,
    // hot: true
  }
}

module.exports = config;
