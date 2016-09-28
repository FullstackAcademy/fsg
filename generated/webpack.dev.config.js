'use strict'

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './browser/app.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modulesDirectories: ['browser', 'node_modules']
  },
  module: {
    preloaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint']
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)|(bower_components)/
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!sass?sourceMap'),
        include: /(browser)|(node_modules)/
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}

