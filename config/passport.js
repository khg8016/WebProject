/**
 * Created by Jun on 2016-03-17.
 */
var passport = require('passport');

module.exports = function(){
    passport.serializeUser(function(user, done){
       done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user);
    });

    require('./strategies/local')();
};