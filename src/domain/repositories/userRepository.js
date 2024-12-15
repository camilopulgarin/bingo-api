const { User } = require('../../infrastructure/database/models');

const findByEmail = async (email) => User.findOne({ where: { email } });

const create = async (userData) => User.create(userData);

module.exports = { findByEmail, create };