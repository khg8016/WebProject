/**
 * Created by Aplus on 2016-02-16.
 */
'use strict';

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    user = require('mongoose').model('User');

module.exports = function(){
    passport.use(new localStrategy(function(username, password, done){
        user.findOne({username: username}, function(err, user){
           if(err){
                return done(err);
           }
           if(!user){
               return done(null, false, {
                   message : 'Unknown User'
               });
           }
           if(!user.authenticate(password)){
               return done(null, false, {
                   message : 'Invalid Password'
               });
           }

           return done(null, user);
        });
    }));
};