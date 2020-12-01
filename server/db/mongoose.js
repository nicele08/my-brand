import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

try {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true },
    // eslint-disable-next-line no-console
    () => console.log('database connected'));
} catch (err) {
  // eslint-disable-next-line no-console
  console.log('database not connected');
}

export default mongoose;
