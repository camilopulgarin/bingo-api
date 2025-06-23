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

const upsertGameUser = async (data) => {
  const [record, created] = await GameUser.upsert(data);
  return record;
};

const getGameUser = async (gameId, userId) => {
  return await GameUser.findOne({
    where: { game_id: gameId, user_id: userId },
  });
};

const updateGameUser = async (gameId, userId, fieldsToUpdate) => {
  await GameUser.update(fieldsToUpdate, {
    where: { game_id: gameId, user_id: userId },
  });

  return await GameUser.findOne({
    where: { game_id: gameId, user_id: userId },
  });
};

module.exports = { create, findByUserId, addUsersToGame, upsertGameUser, getGameUser, updateGameUser };
