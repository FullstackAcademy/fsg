'use strict';

var path = require('path');
var rootPath = path.join(__dirname, '../../../');
var modelsPath = path.join(rootPath, './server/db/models');
var homePage = path.join(rootPath, './server/app/views/index.html');

var env = require(path.join(rootPath, './server/env'));

module.exports = function (app) {
    app.set('env', env);
    app.set('projectRoot', rootPath);
    app.set('homePagePath', homePage);
};