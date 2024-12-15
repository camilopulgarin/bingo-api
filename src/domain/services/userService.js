const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepository.create({ name, email, password: hashedPassword });
};

module.exports = { registerUser };
