const userService = require('../../domain/services/userService');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.registerUser({ name, email, password });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser };