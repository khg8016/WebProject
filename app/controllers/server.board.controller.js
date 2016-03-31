/**
 * Created by Jun on 2016-03-31.
 */

var mongoose = require('mongoose'),
    Board = mongoose.model('Board'),
    Users = mongoose.model('User');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};


module.exports.create = function(req, res){
    var board = new Board(req.body);
    board.creator = req.user;
    req.user.boards.push(board);
    board.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            //res.json(board);
        }
    })
};

module.exports.delete = function(req, res){
    var board = req.board;

    board.remove();
};

module.exports.update = function(req, res){
    var board = req.board;
    board.name = req.body.name;
    board.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(board);
        }
    });
};

module.exports.addMember = function(req, res){
    var board = req.board;
    User.findOne({username : req.body}, function(err, user){
       if(err){
           return res.status(400).send({
               message: getErrorMessage(err)
           });
       } else {
           board.members.push(user);
       }
    });
};

module.exports.boardList = function(req, res){
    var user = req.user;
    res.json(user.boards);
};

module.exports.memoList = function(req, res){
    var board = req.board;
    res.json(board.memos);
};

module.exports.boardById = function(req, res, id, next){
    Board.findById(id).populate('creator members memos').exec(function(err, board){
        if(err) return next(err);
        if(!board) return next(new Error('Failed to load' | id));

        req.board = board;
        next();
    });
};