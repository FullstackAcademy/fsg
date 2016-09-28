'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const indexPath = path.join(__dirname, 'client', 'src', 'index.html')

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './client/src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'client', 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modulesDirectories: ['client', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)|(bower_components)/
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!sass'),
        include: /(client)|(node_modules)/
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
		new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      minimize: true,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}

