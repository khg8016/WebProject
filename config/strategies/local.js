/**
 * Created by Aplus on 2016-02-16.
 */
'use strict';

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    user = require('mongoose').model('User');

module.exports = function() {
    // Use the Passport's Local strategy
    passport.use(new localStrategy(function(username, password, done) {
        // Use the 'User' model 'findOne' method to find a user with the current username
        user.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            return done(null, user);
        });
    }));
};