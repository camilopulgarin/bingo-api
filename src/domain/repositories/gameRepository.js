const { Game, GameUser, User } = require('../../infrastructure/database/models');
const { Op } = require('sequelize');

const create = async (gameData) => Game.create(gameData);

const addUsersToGame = async (gameId, userIds) => {
  const gameUsers = userIds.map((userId) => ({ game_id: gameId, user_id: userId }));
  await GameUser.bulkCreate(gameUsers);
};

const findByUserId = async (userId) => {
  try {
    const games = await Game.findAll({
      include: [
        {
          model: User,
          as: 'players', // Debe coincidir con el alias en la asociación
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] }, // Excluye la tabla pivot `GameUser`
          where: { id: userId },
        },
      ],
    });

    return games;
  } catch (error) {
    console.error('Error finding games by user:', error);
    throw new Error('Could not retrieve games');
  }
};

module.exports = { create, findByUserId, addUsersToGame };
