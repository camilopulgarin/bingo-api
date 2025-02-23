const gameRepository = require('../repositories/gameRepository');

const createGame = async ({ name, capacity, creatorId, userIds }) => {
  const game = await gameRepository.create({ name, capacity, creator_id: creatorId });

  if (userIds && userIds.length > 0) {
    await gameRepository.addUsersToGame(game.id, userIds);
  }

  return game;
};

const getUserGames = async (userId) => {
  return gameRepository.findByUserId(userId);
};

module.exports = { createGame, getUserGames };
