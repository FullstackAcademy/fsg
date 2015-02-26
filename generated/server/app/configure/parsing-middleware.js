'use strict';
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app) {

    //app.use(morgan('dev'));

    // Important to have this before any session middleware (what is a session without cookies??)
    app.use(cookieParser());

    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

};