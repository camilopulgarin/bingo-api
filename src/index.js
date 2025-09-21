const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./infrastructure/swagger/swaggerConfig');
const routes = require('./app/routes');
const cors = require('cors');
const { setupSocket } = require('./infrastructure/sockets/bingoSocket');
const http = require('http');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Montar la documentación de Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Montar las rutas principales
app.use('/api/v1', routes);

// 🔥 CREAR UN SOLO SERVIDOR
const server = http.createServer(app);

// 🔌 Configurar Socket.IO en el mismo servidor
setupSocket(server);

const PORT = process.env.PORT || 3000;

// ✅ USAR server.listen() NO app.listen()
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});