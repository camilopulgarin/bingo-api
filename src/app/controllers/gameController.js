const gameService = require('../../domain/services/gameService');

const createGame = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const creatorId = req.user.id; // ID del usuario autenticado

    const game = await gameService.createGame({ name, capacity, creatorId });

    res.status(201).json({ message: 'Game created successfully', game });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserGames = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado
    const games = await gameService.getUserGames(userId);

    res.status(200).json({ games });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createGame, getUserGames };
