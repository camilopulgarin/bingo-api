const liveGameRepository = require('../repositories/liveGameRepository');
const bingoBallGenerator = require('../../utils/bingoBallGenerator');

let currentGame = null;
let drawnBalls = [];
let drawInterval = null;

const createLiveGame = async () => {
  currentGame = {
    id: generateGameId(),
    status: 'ongoing',
    drawnBalls: [],
  };
  return currentGame;
};

const drawRandomBall = async () => {
  if (!currentGame || currentGame.status !== 'ongoing') {
    throw new Error('No ongoing game to draw from.');
  }

  const ball = bingoBallGenerator();
  drawnBalls.push(ball);
  currentGame.drawnBalls.push(ball);
  
  await liveGameRepository.saveDrawnBall(currentGame.id, ball);

  if (drawnBalls.length === 75) { // Assuming a standard Bingo game with 75 balls
    currentGame.status = 'completed';
    clearInterval(drawInterval);
  }

  return ball;
};

const startDrawingBalls = () => {
  drawInterval = setInterval(drawRandomBall, 7000);
};

const getLiveGameHistory = () => {
  return drawnBalls;
};

const generateGameId = () => {
  return 'game-' + Date.now();
};

module.exports = { createLiveGame, startDrawingBalls, getLiveGameHistory };