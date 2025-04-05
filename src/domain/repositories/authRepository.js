const { User } = require('../../infrastructure/database/models');

const findByEmail = async (email) => User.findOne({ where: { email } });
const findById = async (id) => User.findByPk(id);
const updatePassword = async (id, hashedPassword) =>
    User.update({ password: hashedPassword }, { where: { id } });

module.exports = { findByEmail, findById, updatePassword };
