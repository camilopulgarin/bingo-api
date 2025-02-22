const { Game } = require('../../infrastructure/database/models');

const create = async (gameData) => Game.create(gameData);

const findByUserId = async (userId) => {
  return Game.findAll({ where: { creator_id: userId } });
};

module.exports = { create, findByUserId };
