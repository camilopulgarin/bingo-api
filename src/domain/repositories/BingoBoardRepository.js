
const {BingoBoard } = require('../../infrastructure/database/models');

const createBoard = async (data) => {
  return await BingoBoard.create(data);
};

const bulkCreateBoards = async (boardsData) => {
  return await BingoBoard.bulkCreate(boardsData, { returning: true });
};

const findBoardsByUserAndGame = async (userId, gameId) => {
  return await BingoBoard.findAll({
    where: { user_id: userId, game_id: gameId },
    attributes: ['id', 'numbers'],
  });
};

const findBoardById = async (id) => {
  return await BingoBoard.findByPk(id);
};

module.exports = {
  createBoard,
  bulkCreateBoards,
  findBoardsByUserAndGame,
  findBoardById,
};