const { Server } = require('socket.io');

let drawnBalls = [];
let gameInterval;

// ✅ Recibir el servidor ya creado, no crear uno nuevo
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // ⚠️ Solo para desarrollo
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('startGame', () => {
      console.log('Starting game...');
      drawnBalls = [];
      startDrawingBalls(io);
    });

    socket.on('confirmWinner', (winnerId) => {
      console.log('Winner confirmed:', winnerId);
      clearInterval(gameInterval);
      io.emit('winnerConfirmed', winnerId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

const startDrawingBalls = (io) => {
  const totalBalls = Array.from({ length: 75 }, (_, i) => i + 1);
  const shuffledBalls = totalBalls.sort(() => Math.random() - 0.5);
  
  let index = 0;

  gameInterval = setInterval(() => {
    if (index < shuffledBalls.length) {
      const ball = shuffledBalls[index];
      drawnBalls.push(ball);
      console.log('Drawing ball:', ball);
      io.emit('ballDrawn', ball);
      index++;
    } else {
      clearInterval(gameInterval);
      console.log('Game over, all balls drawn');
      io.emit('gameOver', drawnBalls);
    }
  }, 7000);
};

module.exports = { setupSocket };