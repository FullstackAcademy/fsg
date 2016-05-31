'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var twitterConfig = app.getValue('env').TWITTER;

    var twitterCredentials = {
        consumerKey: twitterConfig.consumerKey,
        consumerSecret: twitterConfig.consumerSecret,
        callbackUrl: twitterConfig.callbackUrl
    };

    var createNewUser = function (token, tokenSecret, profile) {
        return User.create({
            twitter_id: profile.id
        });
    };

    var verifyCallback = function (token, tokenSecret, profile, done) {

        UserModel.findOne({
            where: {
                twitter_id: profile.id
            }
        }).exec()
            .then(function (user) {
                if (user) { // If a user with this twitter id already exists.
                    return user;
                } else { // If this twitter id has never been seen before and no user is attached.
                    return createNewUser(token, tokenSecret, profile);
                }
            })
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                console.error('Error creating user from Twitter authentication', err);
                done(err);
            });

    };

    passport.use(new TwitterStrategy(twitterCredentials, verifyCallback));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
