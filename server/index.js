import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userRoutes from './routes/userRoute';
import dbConnect from './db/mongoose';
import articleRoutes from './routes/articleRoute';
import categoryRoutes from './routes/categoryRoute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dbConnect();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My-brand API',
      version: '1.0.0',
      description: 'Personal website with blog',
      contact: {
        name: 'Celestin Niyindagiriye(Developer)',
      },
      servers: ['https://celestin-brand.herokuapp.com/'],
    },
  },
  apis: ['server/index.js', 'server/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/my-brand-api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /home:
 *  get:
 *    summary: Welcome to this site
 *    description: <h1>Read to win. Time flies but you are the pilot</h1>
 *    responses:
 *      '200':
 *        description: success
 */
app.get('/', (req, res) => {
  res.status(200)
    .send(
      `
        <h1>Welcome my friend </h1>
        <p>This is an API of for my website
        <a href='https://celestin-brand.herokuapp.com/my-brand-api-docs'><b>Explore API<b></a>
      `,
    );
});

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/article-categories', categoryRoutes);

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running...');
});

export default app;
