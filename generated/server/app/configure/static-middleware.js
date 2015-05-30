"use strict";
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

module.exports = function (app) {

    var root = app.getValue('projectRoot');

    var uiBootstrapPath = path.join(root, './node_modules/angular-bootstrap');
    var npmPath = path.join(root, './node_modules');
    var publicPath = path.join(root, './public');
    var browserPath = path.join(root, './browser');

    app.use(favicon(app.getValue('faviconPath')));
    app.use(express.static(uiBootstrapPath));
    app.use(express.static(npmPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));

};