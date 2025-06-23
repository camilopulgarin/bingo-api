const gameRepository = require('../repositories/gameRepository');

const createGame = async ({ name, capacity, creatorId, userIds }) => {
  const game = await gameRepository.create({ name, capacity, creator_id: creatorId });

  if (userIds && userIds.length > 0) {
    await gameRepository.addUsersToGame(game.id, userIds);
  }

  return game;
};

const getUserGames = async (userId, page, limit) => {
  return gameRepository.findByUserId(userId, page, limit);
};

const joinGame = async ({ userId, gameId, selectedTables, gameModeVote }) => {
  const boardCount = selectedTables.length;

  const updatedGameUser = await gameRepository.updateGameUser(gameId, userId, {
    selected_tables: selectedTables,
    game_mode_vote: gameModeVote,
    board_count: boardCount,
  });

  return updatedGameUser;
};

const getPlayerGameInfo = async (gameId, userId) => {
  return await gameRepository.getGameUser(gameId, userId);
};

module.exports = { createGame, getUserGames, getPlayerGameInfo, joinGame };
