/**
 * Created by Jun on 2016-03-17.
 */
var mongoose = require('mongoose'),
    config = require('./config');

module.exports = function(){
    var db = mongoose.connect(config.db);
    require('../app/models/server.model.users');
    require('../app/models/server.model.memos');
    return db;
};