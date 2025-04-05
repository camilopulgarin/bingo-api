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

const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id; // Asume que `req.user` viene del middleware de autenticación
    console.log("userId", userId);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required' });
    }

    await authService.changeUserPassword(userId, currentPassword, newPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = { login, changePassword };
