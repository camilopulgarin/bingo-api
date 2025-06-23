const gameService = require('../../domain/services/gameService');

const createGame = async (req, res) => {
  try {
    const { name, capacity, userIds } = req.body;
    const creatorId = req.user.id; // ID del usuario autenticado

    const game = await gameService.createGame({ name, capacity, creatorId, userIds});

    res.status(201).json({ message: 'Game created successfully', game });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserGames = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const paginatedGames = await gameService.getUserGames(userId, page, limit);

    res.status(200).json(paginatedGames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const joinGame = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId, selectedTables, gameModeVote } = req.body;

    const result = await gameService.joinGame({
      userId,
      gameId,
      selectedTables,
      gameModeVote,
    });

    res.status(200).json({ message: 'Successfully joined the game', data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPlayerGameInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.params;

    console.log('gameId:', gameId);
    console.log('userId:', userId);

    const playerData = await gameService.getPlayerGameInfo(gameId, userId);

    res.status(200).json(playerData);
  } catch (error) {
    console.error('Error fetching player game info:', error);
    res.status(404).json({ message: 'Player not found in this game' });
  }
};


module.exports = { createGame, getUserGames, joinGame, getPlayerGameInfo };
