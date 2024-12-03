const express = require('express');
const { connectDB } = require('./config/database');
//const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rutas
//app.use('/api/auth', authRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  await connectDB(); // Conectar a MySQL
});