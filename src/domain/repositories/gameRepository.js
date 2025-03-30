const { Game, GameUser, User } = require('../../infrastructure/database/models');
const { Op } = require('sequelize');
const paginate = require('../../utils/paginate');

const create = async (gameData) => Game.create(gameData);

const addUsersToGame = async (gameId, userIds) => {
  const gameUsers = userIds.map((userId) => ({ game_id: gameId, user_id: userId }));
  await GameUser.bulkCreate(gameUsers);
};

const findByUserId = async (userId, page, limit) => {
  return paginate(Game, {
    include: [
      {
        model: User,
        as: 'players',
        attributes: ['id', 'name', 'email'],
        through: { attributes: [] },
        where: { id: userId },
      },
    ],
  }, page, limit);
};

module.exports = { create, findByUserId, addUsersToGame };
