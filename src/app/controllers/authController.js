const authService = require('../../domain/services/authService');
const jwtHelper = require('../../infrastructure/security/jwtHelper');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar usuario y contraseña
    const user = await authService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generar token
    const token = jwtHelper.generateToken({ id: user.id, email: user.email });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { login };
