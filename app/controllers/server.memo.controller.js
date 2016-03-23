/**
 * Created by Jun on 2016-03-23.
 */

var mongoose = require('mongoose'),
    Memo = mongoose.model('Memo');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

module.exports.create = function(){

};

module.exports.read = function(){

};

module.exports.update = function(){

};

module.exports.delete = function(){

};

module.exports.list = function(){

};