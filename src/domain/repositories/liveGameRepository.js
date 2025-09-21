const { LiveGame } = require('../../infrastructure/database/models');

const saveDrawnBall = async (gameId, ball) => {
  const liveGame = await LiveGame.findByPk(gameId);
  if (liveGame) {
    liveGame.drawn_balls.push(ball);
    await liveGame.save();
  }
};

const getDrawnBallsHistory = async (gameId) => {
  const liveGame = await LiveGame.findByPk(gameId);
  return liveGame ? liveGame.drawn_balls : [];
};

module.exports = { saveDrawnBall, getDrawnBallsHistory };