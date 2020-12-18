import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My-brand API',
      description: 'Personal website with blog',
      contact: {
        name: 'Celestin Niyindagiriye(Developer)',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['index.js'],
};

const swapperDocs = swaggerJSDoc(swaggerOptions);

export default swapperDocs;
