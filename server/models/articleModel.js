import { Schema, model } from 'mongoose';

const articleSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  visible: { type: Boolean, default: true },
  articleImage: { type: String, required: true },
  author: { type: String, required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, default: 'client' },
});

export default model('Article', articleSchema);
