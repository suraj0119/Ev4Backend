// backend/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Event Management API',
        version: '1.0.0',
        description: 'API documentation for the Event Management System',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
