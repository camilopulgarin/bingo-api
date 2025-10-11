const gameRepository = require('../repositories/gameRepository');
const BingoBoardRepository = require('../repositories/BingoBoardRepository');
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

  // Inserta cada tabla en BingoBoard
  const boards = await Promise.all(selectedTables.map(async (table) => {
    return await BingoBoardRepository.createBoard({
      user_id: userId,
      game_id: gameId,
      numbers: table, // ahora se pasa la tabla completa
    });
  }));

  return {
    ...updatedGameUser.dataValues,
    boards: boards.map(board => ({
      id: board.id,
      numbers: board.numbers,
    })),
  };
};

const getPlayerGameInfo = async (gameId, userId) => {
  const gameUser = await gameRepository.getGameUser(gameId, userId);

  // Obtén las tablas del usuario en la partida
  const boards = await BingoBoardRepository.findBoardsByUserAndGame(userId, gameId);

  return {
    ...gameUser.dataValues,
    boards: boards.map(board => ({
      id: board.id,
      numbers: board.numbers,
    })),
  };
};

const getBoardById = async (boardId) => {
  return await BingoBoardRepository.findBoardById(boardId);
};

module.exports = { createGame, getUserGames, getPlayerGameInfo, joinGame, getBoardById };
