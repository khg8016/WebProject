/**
 * Created by Jun on 2016-03-23.
 */

var mongoose = require('mongoose'),
    Memo = mongoose.model('Memo'),
    Board = mongoose.model('Board');

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
    var memo = new Memo(req.body); // $
    // 를 통해 post요청을 보내면 그 값들이 req.body에 들어감
    memo.creator = req.user;
    req.board.memos.push(memo);

    req.board.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
    });
    memo.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(memo);
        }
    });
};

module.exports.read = function(req, res){
    res.json(req.memo);
};

module.exports.update = function(req, res){
    var memo = req.memo;

    memo.title = req.body.title;
    memo.contents = req.body.contents;

    memo.save(function(err){
           if(err){
               return res.status(400).send({
                   message: getErrorMessage(err)
               });
           } else{
               res.json(memo);
           }
    });
};

module.exports.delete = function(req, res){
    var memo = req.memo;
    var memos = req.board.memos;
    memo.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            for(var i in memos){//user의 보드 목록에서도 제거
                if(memos[i]._id == memo._id) {
                    memos.splice(i, 1);
                }
            }
            req.board.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                }
            });
            res.json(memo);
        }
    });
};

module.exports.memoById = function(req, res, next, id){
    Memo.findById(id).populate('creator comments.creator').exec(function(err, memo){
        if(err) return next(err);
        if(!memo) return next(new Error('Failed to load' | id));

        req.memo = memo;
        next();
    });
};

module.exports.commentById = function(req, res, next, id){
<<<<<<< HEAD
    var comments = req.memo.comments;
    for(var i in comments){
        if(comments[i].id === id) {
            req.comment = comments[i];
        }
    }
    next();
};

=======
    Memo.findById(id).populate('creator comments.creator').exec(function(err, memo){
        if(err) return next(err);
        if(!memo) return next(new Error('Failed to load' | id));

        req.memo = memo;
        next();
    });
};


>>>>>>> 0da6a2d9ac50209742da582ff26c76c6afe5160b
module.exports.memoList = function(req, res){
    var board = req.board;
    res.json(board.memos);


};

exports.hasAuthorization = function(req, res, next){ //글 작성자가 수정이나 지우려고 할 때 너가 권한 갖고있니? 이거
    if(req.memo.creator.id !== req.user._id){ //글 작성자와 현재 유저가 같은지 확인
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

module.exports.addComment = function(req ,res){
    var memo = req.memo;
    console.log("add comment");
    var comment = {
        _id : new mongoose.Types.ObjectId(),
        content : req.body.content,
        created : Date.now(),
        creator : req.user
    };
    memo.comments.push(comment);


    memo.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(comment);
        }
    });
};

module.exports.deleteComment = function(req ,res){
    console.log("delete comment");
    var memo = req.memo;
    var comment = req.comment;
    var comments = memo.comments;
    for(var i in comments){
        if(comments[i].id === comment.id) {
            comments.splice(i, 1);
        }
    }
    memo.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(memo);
        }
    });
};

module.exports.updateComment = function(req ,res){

    var memo = req.memo;
    var comment = req.comment;
    var comments = memo.comments;
    var comment1;

    for(var i in comments){
        if(comments[i].id === comment.id) {
            comments[i].content = req.body.content;
            comments[i].created = Date.now();
            comment1 = comments[i];
        }
    }

    memo.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            console.log("update save success");
            res.json(comment1);
        }
    });

};

module.exports.getComments = function(req ,res){
    res.json(req.memo.comments);
};