/**
 * Created by Jun on 2016-03-31.
 */

var mongoose = require('mongoose'),
    Board = mongoose.model('Board'),
    User = mongoose.model('User');

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
    board.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            //res.json(board);
        }
    });

    User.findOne({_id : req.user._id}, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            user.boards.push(board);
            user.save(function (err1) {
                if (err1) {
                    return res.status(400).send({
                        message: getErrorMessage(err1)
                    });
                } else {
                    res.json(user);
                }
            });
        }
    });
};

module.exports.delete = function(req, res){
    var boards = req.user.boards;
    var board = req.board;
    board.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            for(var i in boards){//user의 보드 목록에서도 제거
                if(boards[i]._id == board._id) {
                    boards.splice(i, 1);
                }
            }
            User.findOne({_id : req.user._id}, function(err1, user) {
                if (err1) {
                    return res.status(400).send({
                        message: getErrorMessage(err1)
                    });
                } else {
                    user.save(function(err2) {
                        if (err2) {
                            return res.status(400).send({
                                message: getErrorMessage(err2)
                            });
                        } else {
                            res.json(req.user);
                        }
                    });
                }
            });
            //res.json(board);
        }
    });
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
    User.findOne({username : req.body.username}).populate('boards').exec(function(err, user){
       if(err){
           return res.status(400).send({
               message: getErrorMessage(err)
           });
       } else {
           if(user){
               user.boards.push(board);
               user.save(function (err1) {
                   if (err1) {
                       return res.status(400).send({
                           message: getErrorMessage(err1)
                       });
                   } else {
                       res.json(user);
                   }
               });
           }else {
               return res.status(401).send({
                   message: '해당되는 유저가 없습니다.'
               });
           }

       }
    });
};

module.exports.boardList = function(req, res){
    //var user = req.user;
    User.findOne({_id : req.user._id}).populate('boards').exec(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(user.boards);
        }
    });
};


module.exports.read = function(req, res){
    res.json(req.board);
};


exports.hasAuthorization = function(req, res, next){ //글 작성자가 수정이나 지우려고 할 때 너가 권한 갖고있니? 이거
    if(req.board.creator.id !== req.user._id){ //글 작성자와 현재 유저가 같은지 확인
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

module.exports.boardById = function(req, res, next, id){
    Board.findById(id).populate('creator members memos').exec(function(err, board){
        if(err) return next(err);
        if(!board) return next(new Error('Failed to load' | id));

        req.board = board;
        next();
    });
};