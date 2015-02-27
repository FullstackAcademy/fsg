'use strict';
module.exports = function (app) {

    app.setValue = app.set.bind(app);

    app.getValue = function (path) {
        return app.get(path);
    };

    require('./app-variables')(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);

    app.use(app.getValue('log'));
    require('./authentication')(app);
};