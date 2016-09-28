'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

module.exports = function (app) {
  if (NODE_ENV !== 'production' && NODE_ENV !== 'testing') {
    const webpack = require('webpack');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require(path.join(app.getValue('projectRoot'), 'webpack.dev.config.js'));
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }))
  }
}
