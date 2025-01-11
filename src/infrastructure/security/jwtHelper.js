const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expira en 1 hora
    algorithm: 'HS256', // Algoritmo seguro
  });
};

module.exports = { generateToken };
