import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Category', CategorySchema);
