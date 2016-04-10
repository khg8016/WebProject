/**
 * Created by Jun on 2016-03-21.
 */
var users = require('../../app/controllers/server.user.controller'),
    passport = require('passport');

module.exports = function(app){
    app.get('/', users.index);

    //app.post('/api/signup', users.signUp);
    app.post('/signup', users.signUp);
    app.post('/signin', passport.authenticate('local', {
        successRedirect: '/#!/main',
        failureRedirect: '/#!/signin',
        failureFlash: true
    }));
    app.get('/signout', users.signOut);

};

