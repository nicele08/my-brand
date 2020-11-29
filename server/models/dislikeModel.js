import { Schema, model } from 'mongoose';

const dislikeSchema = Schema({
    _id: Schema.Types.ObjectId,
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('Dislike', dislikeSchema);