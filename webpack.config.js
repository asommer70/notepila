const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'pouchdb', 'pouchdb-quick-search', 'pouchdb-upsert', 'moment', 'draft-js', 'slugify'
]

var distPath, imgPath, fontsPath, indexFilename, cssFilename, fonts;
if (process.env.NODE_ENV == 'production') {
  distPath = 'dist/js';
  indexFilename = '../index.html';
  cssFilename = '../css/style.css';
  imgPath = 'url-loader?limit=1024&name=../assets/img/[name].[ext]';
  fontsPath = 'url-loader?limit=1024&name=../assets/fonts/[name].[ext]';
} else {
  distPath = 'dist';
  indexFilename = 'index.html';
  cssFilename = 'css/style.css';
  imgPath = 'url-loader?limit=1024&name=assets/img/[name].[ext]';
  fontsPath = 'url-loader?limit=1024&name=assets/fonts/[name].[ext]';
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
        test: /\.woff$/,
        exclude: /node_modules/,
        loader: fontsPath
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/,
        exclude: /node_modules/,
        loader: imgPath
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
