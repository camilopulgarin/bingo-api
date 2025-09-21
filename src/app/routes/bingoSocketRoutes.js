const BingoSocketController = require('../controllers/bingoSocketController');

const setBingoSocketRoutes = (io) => {
  const bingoSocketController = new BingoSocketController(io);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('startGame', () => {
      bingoSocketController.startGame(socket);
    });

    socket.on('drawBall', () => {
      bingoSocketController.drawBall(socket);
    });

    socket.on('confirmWinner', (winnerId) => {
      bingoSocketController.confirmWinner(socket, winnerId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setBingoSocketRoutes;