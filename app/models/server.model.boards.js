/**
 * Created by Jun on 2016-03-31.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var boardSchema = new Schema({
    name : {
        type: String,
        trim : true,
        required : 'Username is required'
    },
    creator : {
        type: Schema.ObjectId,
        ref : 'User'
    },
    members : [{
        type: Schema.ObjectId,
        ref : 'User'
    }],
    memos: [{
        type: Schema.ObjectId,
        ref : 'Memo'
    }]
});

mongoose.model('Board', boardSchema);