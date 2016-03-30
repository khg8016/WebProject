/**
 * Created by Jun on 2016-03-23.
 */
var users = require('../controllers/server.user.controller'),
    memos = require('../controllers/server.memo.controller');

module.exports = function(app){
    app.route('/api/memos').
        get(memos.list).
        post(users.requiresLogin, memos.create);

    app.route('/api/memos/:memoId').
        get(memos.read).
        put(users.requiresLogin, memos.hasAuthorization, memos.update).
        delete(users.requiresLogin, memos.hasAuthorization, memos.delete);

    app.param('memoId', memos.memoById);

};