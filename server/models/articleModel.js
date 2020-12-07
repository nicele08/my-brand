import { Schema, model } from 'mongoose';

const articleSchema = Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  title: { type: String, required: true },
  visible: { type: Boolean, default: false },
  articleImage: { type: String, required: true },
  content: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Article', articleSchema);
