/**
 * Created by Jun on 2016-03-23.
 */
var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var memoSchema = new Schema({
    title : {
        type: String,
        default: '',
        trim : true
    },
    contents : {
        type: String,
        default: '',
        trim : true
    },
    creator : {
        type: Schema.ObjectId,
        ref : 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    comments : [{
        _id: {
            type : ObjectIdSchema,
            default : function () { return new ObjectId()}
        },
        content : {
            type : String,
            trim : true
        } ,
        created : {
            type: Date,
            default : Date.now()
        } ,
        creator : {
            type: Schema.ObjectId,
            ref : 'User'
        }
    }]
});

mongoose.model('Memo', memoSchema);
