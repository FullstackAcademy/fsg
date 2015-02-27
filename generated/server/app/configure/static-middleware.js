"use strict";
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

module.exports = function (app) {

    var root = app.getValue('projectRoot');
    var bowerPath = path.join(root, './bower_components');
    var publicPath = path.join(root, './public');
    var browserPath = path.join(root, './browser');

    app.use(favicon(app.getValue('faviconPath')));
    app.use(express.static(bowerPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));

};