const bcrypt = require('bcrypt');
const authRepository = require('../repositories/authRepository');

const PASSWORD_MIN_LENGTH = 8;

const authenticateUser = async (email, password) => {
  const user = await authRepository.findByEmail(email);
  if (!user) return null;

  // Comparar contraseñas
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};

const changeUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await authRepository.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentValid) {
    const error = new Error('Current password is incorrect');
    error.status = 401;
    throw error;
  }

  if (newPassword.length < PASSWORD_MIN_LENGTH) {
    const error = new Error(`New password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await authRepository.updatePassword(userId, hashedPassword);
};

module.exports = { authenticateUser, changeUserPassword };
