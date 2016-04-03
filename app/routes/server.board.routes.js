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
        post(board.addMember).
        put(board.update).
        delete(board.delete);


    app.param('boardId', board.boardById);

};