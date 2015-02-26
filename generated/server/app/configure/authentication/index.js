'use strict';
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

var authStrategies = [
    'local',
    //'twitter',
    //'facebook',
    //'google'
];

module.exports = function (app) {

    var authConfig = app.get('env').auth;

    app.use(session({
        secret: authConfig.session.secret,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        UserModel.findById(id, done);
    });

    app.get('/session', function (req, res) {
        if (req.user) {
            res.send({ user: req.user });
        } else {
            res.status(401).end();
        }
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.status(200).end();
    });

    authStrategies.forEach(function (strategyName) {
        require(path.join(__dirname, strategyName))(app);
    });

};