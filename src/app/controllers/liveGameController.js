const liveGameService = require('../../domain/services/liveGameService');

const startLiveGame = async (req, res) => {
  try {
    const { gameId } = req.body;
    const liveGame = await liveGameService.createLiveGame(gameId);
    res.status(201).json({ message: 'Live game started successfully', liveGame });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const drawBall = async (req, res) => {
  try {
    const { gameId } = req.params;
    const drawnBall = await liveGameService.drawRandomBall(gameId);
    res.status(200).json({ message: 'Ball drawn successfully', drawnBall });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLiveGameStatus = async (req, res) => {
  try {
    const { gameId } = req.params;
    const status = await liveGameService.getLiveGameStatus(gameId);
    res.status(200).json(status);
  } catch (error) {
    res.status(404).json({ message: 'Live game not found' });
  }
};

module.exports = { startLiveGame, drawBall, getLiveGameStatus };