const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bingo API',
      version: '1.0.0',
      description: 'Documentación de la API para el proyecto Bingo.',
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    security: [{ bearerAuth: [] }], // Aplicar globalmente
    servers: [
      {
        url: 'http://localhost:3000/api/v1', // Cambia según tu entorno
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/app/routes/*.js'], // Ubicación de los archivos con las anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
