const express = require('express');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Registrar las rutas aquí
router.use('/users', userRoutes);

// Ruta base para verificar el estado de la API
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

module.exports = router;
