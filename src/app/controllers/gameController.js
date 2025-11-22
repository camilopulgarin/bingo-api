const gameService = require('../../domain/services/gameService');
const getFinishedGameDetail = async (req, res) => {
  try {
    const { gameId } = req.params;
    const gameDetail = await gameService.getFinishedGameDetail(gameId);
    if (!gameDetail) {
      return res.status(404).json({ message: 'Game not found or not finished' });
    }
    res.status(200).json(gameDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

    console.log('Fetching player game info for user:', userId, 'in game:', gameId);

    const playerData = await gameService.getPlayerGameInfo(gameId, userId);

    res.status(200).json(playerData);
  } catch (error) {
    console.error('Error fetching player game info:', error);
    res.status(404).json({ message: 'Player not found in this game' });
  }
};

// Valida si el usuario autenticado es el creador de la partida
const isCreator = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.params;
    const game = await gameService.getGameById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    const isCreator = game.creator_id === userId;
    res.status(200).json({ isCreator });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createGame, getUserGames, joinGame, getPlayerGameInfo, getFinishedGameDetail, isCreator };
