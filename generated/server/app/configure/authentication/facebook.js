'use strict';
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var facebookConfig = app.get('env').auth.facebook;

    var facebookCredentials = {
        clientID: facebookConfig.credentials.clientID,
        clientSecret: facebookConfig.credentials.clientSecret,
        callbackURL: facebookConfig.credentials.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'facebook.id': profile.id }, function (err, user) {

            if (err) return done(err);

            if (user) {
                done(null, user);
            } else {
                UserModel.create({
                    facebook: {
                        id: profile.id
                    }
                }).then(function (user) {
                    done(null, user);
                });
            }

        });

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/user');
        });

};