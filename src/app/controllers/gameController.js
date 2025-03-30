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

module.exports = { createGame, getUserGames };
