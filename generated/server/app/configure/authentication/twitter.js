'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var Q = require('q');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var twitterConfig = app.getValue('env').TWITTER;

    var twitterCredentials = {
        consumerKey: twitterConfig.consumerKey,
        consumerSecret: twitterConfig.consumerSecret,
        callbackUrl: twitterConfig.callbackUrl
    };

    var createNewUser = function (token, tokenSecret, profile) {

            return UserModel.create({
                twitter: {
                    id: profile.id,
                    username: profile.username,
                    token: token,
                    tokenSecret: tokenSecret
                }
            });

    };

    var updateUserCredentials = function (user, token, tokenSecret, profile) {

        user.twitter.token = token;
        user.twitter.tokenSecret = tokenSecret;
        user.twitter.username = profile.username;

        return new Q(function (resolve, reject) {
            user.save(function (err) {
                if (err) return reject(err);
                resolve(user);
            });
        });
    };

    var verifyCallback = function (token, tokenSecret, profile, done) {

        UserModel.findOne({ 'twitter.id': profile.id }, function (err, user) {

            if (err) return done(err);

            if (user) { // If a user with this twitter id already exists.
                updateUserCredentials(user, token, tokenSecret, profile).then(function () {
                    done(null, user);
                });
            } else { // If this twitter id has never been seen before and no user is attached.
                createNewUser(token, tokenSecret, profile).then(function (createdUser) {
                    done(null, createdUser);
                }, function (err) {
                    console.error(err);
                    done(err);
                });
            }

        });

    };

    passport.use(new TwitterStrategy(twitterCredentials, verifyCallback));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
            passport.authenticate('twitter', { failureRedirect: '/login' }),
            function (req, res) {
                res.redirect('/');
            });

};