const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');


const options = {
    
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API User',
      version: '1.0.0',
        description: 'Documentation for the API User service',
    },
    },
    apis: [path.resolve(__dirname, '../controllers/UserController.js')],

};

const specs = swaggerJsdoc(options);

module.exports = specs;
