/**
 * Created by Jun on 2016-03-31.
 */

var board = require('../controllers/server.board.controller'),
    users = require('../controllers/server.user.controller'),
    memos = require('../controllers/server.memo.controller');

module.exports = function(app){

    app.route('/api/main').
        get(board.boardList).
        post(users.requiresLogin, board.create);

    app.route('/api/main/:boardId').
        get(board.read).
        post(users.requiresLogin, board.hasAuthorization, board.addMember).
        put(users.requiresLogin, board.hasAuthorization, board.update).
        delete(users.requiresLogin, board.hasAuthorization, board.delete);


    app.param('boardId', board.boardById);

};