const bcrypt = require('bcrypt');
const authRepository = require('../repositories/authRepository');

const authenticateUser = async (email, password) => {
  const user = await authRepository.findByEmail(email);
  if (!user) return null;

  // Comparar contraseñas
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};

module.exports = { authenticateUser };
