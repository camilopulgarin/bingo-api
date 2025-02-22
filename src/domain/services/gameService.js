const gameRepository = require('../repositories/gameRepository');

const createGame = async ({ name, capacity, creatorId }) => {
  return gameRepository.create({ name, capacity, creator_id: creatorId });
};

const getUserGames = async (userId) => {
  return gameRepository.findByUserId(userId);
};

module.exports = { createGame, getUserGames };
