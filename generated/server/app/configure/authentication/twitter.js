'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var Q = require('q');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var twitterConfig = app.get('env').auth.twitter;

    var twitterCredentials = {
        consumerKey: twitterConfig.credentials.consumerKey,
        consumerSecret: twitterConfig.credentials.consumerSecret,
        callbackUrl: twitterConfig.credentials.callbackUrl
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

    var updateUserCreds = function (user, token, tokenSecret, profile) {

        user.twitter.token = token;
        user.twitter.tokenSecret = tokenSecret;
        user.twitter.username = profile.username;

        return new Q(function (resolve, reject) {
            user.save(function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(user);
            });
        });
    };

    var verifyCallback = function (token, tokenSecret, profile, done) {

        UserModel.findOne({ 'twitter.id': profile.id }, function (err, user) {

            if (err) return done(err);

            if (user) {
                updateUserCreds(user, token, tokenSecret, profile).then(function () {
                    done(null, user);
                });
            } else {
                createNewUser(token, tokenSecret, profile).then(function (createdUser) {
                    done(null, createdUser);
                });
            }

        });

    };

    passport.use(new TwitterStrategy(twitterCredentials, verifyCallback));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
            passport.authenticate('twitter', { failureRedirect: '/login' }),
            function (req, res) {
                console.log('called');
                res.redirect('/');
            });

};