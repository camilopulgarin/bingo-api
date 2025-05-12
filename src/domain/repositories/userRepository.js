const { User } = require('../../infrastructure/database/models');

const findByEmail = async (email) => User.findOne({ where: { email } });

const create = async (userData) => User.create(userData);

const findAll = async () => User.findAll({ attributes: ['id', 'name', 'email'] });

const findById = async (id) => User.findByPk(id, { attributes: ['id', 'name', 'email'] });

const update = async (id, userData) => {
  const user = await findById(id);
  if (!user) throw new Error('User not found');
  return user.update(userData);
};

module.exports = { findByEmail, create, findAll, findById, update };