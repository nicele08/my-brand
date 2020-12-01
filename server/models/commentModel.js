import { Schema, model } from 'mongoose';

const commentSchema = Schema({
    _id: Schema.Types.ObjectId,
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {type: String, required: true},
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('Comment', commentSchema);