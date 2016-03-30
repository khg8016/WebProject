/**
 * Created by Jun on 2016-03-21.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var getErrorMessage = function(err){ //err은 mongoose error 객체. singup 페이지에서 가입시 db에 문제 있을 경우 해당 메세지를 flash 객체에 넣어주고 view에 띄워줌
    var message = '';

    if(err.code){
        switch(err.code){//mongodb index error 처리
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }else{//mongoose 검증 오류 처리
        for (var errName in err.errors){
            if(err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

module.exports.index = function(req, res){
    var message = req.flash('error')[0];
    res.render('index', {
            user : JSON.stringify(req.user) || 'undefined',
            errorMessage : message
        });
};

module.exports.signUp = function(req, res, next){
    if(!req.user) {
        var user = new User(req.body);

        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/#!/signup');
            }

            req.login(user, function(err) { //이걸 실행하면 serialze 메서드가 실행되고 serialize에서 사용자 세션(req.user) 생성.passport.authenticate()메서드 사용할 때 자동으로 호출되기도 함.
                if (err)
                    return next(err);
                return res.redirect('/#!/list');
            });
        });

    }else{
        res.redirect('/#!/list');
    }
};

module.exports.signOut = function(req, res, next){
    if(req.user) req.logout();
    res.redirect('/');
};

module.exports.requiresLogin = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};
