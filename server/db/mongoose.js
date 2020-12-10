import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

function connect(req = null, res = null) {
  try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true },
      () => {
        if (req) {
          res.status(200).json({ message: 'Database connected' });
        }
      });
  } catch (err) {
    res.status(500).json({ message: 'Database not connected' });
  }
}

export default connect;
