const express = require('express');
const userRoutes = require('./UserRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Registrar las rutas aquí
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

// Ruta base para verificar el estado de la API
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

module.exports = router;
