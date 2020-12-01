import { Schema, model } from 'mongoose';

const profileSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    profileImage: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    birthday: {type: String},
    phoneNumber: {type: String},
    location: {type: String}
});

export default model('Profile', profileSchema);