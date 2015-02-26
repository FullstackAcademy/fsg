'use strict';

var path = require('path');
var rootPath = path.join(__dirname, '../../../');
var indexPath = path.join(rootPath, './server/app/views/index.html');
var faviconPath = path.join(rootPath, './server/app/views/favicon.ico');

var env = require(path.join(rootPath, './server/env'));

module.exports = function (app) {
    app.set('env', env);
    app.set('projectRoot', rootPath);
    app.set('indexHTMLPath', indexPath);
    app.set('faviconPath', faviconPath);
};