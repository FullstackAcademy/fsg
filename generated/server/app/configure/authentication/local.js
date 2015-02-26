'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var strategyFn = function (email, password, done) {
        UserModel.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (!user || !user.correctPassword(password)) return done(null, false);
            done(null, user);
        });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) {
                return next(err);
            }

            if (!user) {
                var error = new Error('Invalid login credentials');
                error.status = 401;
                return next(error);
            }

            req.logIn(user, function (err) {

                if (err) return next(err);

                res.status(200).send({ user: _.pick(user, ['_id', 'email']) });

            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

    app.set('isAuthenticated', function (req, res, next) {
        if (req.user) {
            next(null);
        } else {
            var err = new Error('Request is not authorized.');
            err.status = 401;
            next(err);
        }
    });

};