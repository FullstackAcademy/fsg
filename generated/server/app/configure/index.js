'use strict';
module.exports = function (app) {
    require('./app-variables')(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);
    require('./authentication')(app);
};