import express from 'express';

const app = express();

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

app.use('/', (req, res) => {
  res.status(200)
    .json({
      status: 'Active',
    });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running...');
});

export default app;
