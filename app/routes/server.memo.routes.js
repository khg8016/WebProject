/**
 * Created by Jun on 2016-03-23.
 */
var users = require('../controllers/server.user.controller'),
    memos = require('../controllers/server.memo.controller');

module.exports = function(app){
    app.route('/api/memo').
        get(memos.list).
        post(users.requiresLogin, memos.create);




};