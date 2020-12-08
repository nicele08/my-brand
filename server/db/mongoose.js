import mongoose from 'mongoose';

mongoose.set();
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => true)
  .catch(() => false);

export default mongoose;
