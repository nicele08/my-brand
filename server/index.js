import express from 'express';
import userRoutes from './routes/userRoute';
import mongoose from './db/mongoose';
import articleRoutes from './routes/articleRoute';
import categoryRoutes from './routes/categoryRoute';

const app = express();

const db = mongoose;
app.use('/database', (req, res) => {
  res.status(500).json({
    dbState: db.connection.readyState,
  });
});

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTION') {
    res.header('Accept-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    res.status(200).json({});
  }
  next();
});

app.use('/home', (req, res) => {
  res.status(200)
    .json({
      status: 'Active',
    });
});

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/article-categories', categoryRoutes);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running...');
});

export default app;
