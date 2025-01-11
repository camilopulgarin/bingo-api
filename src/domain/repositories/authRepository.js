const { User } = require('../../infrastructure/database/models');

const findByEmail = async (email) => User.findOne({ where: { email } });

module.exports = { findByEmail };
