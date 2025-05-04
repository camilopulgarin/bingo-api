const { User } = require('../../infrastructure/database/models');

const findByEmail = async (email) => User.findOne({ where: { email } });

const create = async (userData) => User.create(userData);

const findAll = async () => User.findAll({ attributes: ['id', 'name', 'email'] });

const findById = async (id) => User.findByPk(id, { attributes: ['id', 'name', 'email'] });

module.exports = { findByEmail, create, findAll, findById };