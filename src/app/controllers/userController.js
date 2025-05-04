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

const getUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await userService.getUsers({ name, email, password });
    res.status(201).json({ message: 'User list', users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID in req.user
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User info', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerUser, getUsers, userInfo };