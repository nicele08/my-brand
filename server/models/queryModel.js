import { Schema, model } from 'mongoose';

const querySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  message: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Query', querySchema);
