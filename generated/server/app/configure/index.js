'use strict';
module.exports = function (app, db) {

    // setValue and getValue are merely alias
    // for app.set and app.get used in the less
    // common way of setting application variables.
    app.setValue = app.set.bind(app);

    app.getValue = function (path) {
        return app.get(path);
    };

    require('./app-variables')(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);
    require('./webpack-middleware')(app);

    // Logging middleware, set as application
    // variable inside of server/app/configure/app-variables.js
    if (process.env.NODE_ENV !== 'testing') {
        app.use(app.getValue('log'));
    }

    require('./authentication')(app, db);

};
