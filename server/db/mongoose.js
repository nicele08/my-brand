import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

export default function dbConnect() {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
}
