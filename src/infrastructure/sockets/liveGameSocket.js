const WebSocket = require('ws');
const liveGameService = require('../../domain/services/liveGameService');

const wss = new WebSocket.Server({ noServer: true });
let liveGameInterval;

const handleConnection = (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // Handle incoming messages from clients if needed
  });

  ws.on('close', () => {
    // Handle disconnection if needed
  });
};

const startLiveGame = async (gameId) => {
  const liveGame = await liveGameService.createLiveGame(gameId);
  if (liveGame) {
    liveGameInterval = setInterval(async () => {
      const drawnBall = await liveGameService.drawRandomBall(gameId);
      if (drawnBall) {
        broadcastDrawnBall(drawnBall);
      } else {
        clearInterval(liveGameInterval);
      }
    }, 7000);
  }
};

const broadcastDrawnBall = (ball) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'DRAWN_BALL', ball }));
    }
  });
};

const stopLiveGame = () => {
  clearInterval(liveGameInterval);
};

module.exports = {
  wss,
  handleConnection,
  startLiveGame,
  stopLiveGame,
};