import { Schema, model } from 'mongoose';

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password: {type: String, required: true},
    userType: {type: String, default: "client"},
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('User', userSchema);
