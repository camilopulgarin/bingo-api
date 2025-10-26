const { Server } = require('socket.io');
const { getBoardById, setGameWinner } = require('../../domain/services/gameService');

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

    const { validateWinningBoard } = require('../../utils/validateWinningBoard');
    socket.on('bingo', async ({ userId, boardId, gameId }) => {
      clearInterval(gameInterval); // Pausa el sorteo
      console.log(`User ${userId} claims bingo with board ${boardId}`);

      // Verifica si el juego ha iniciado
      if (!drawnBalls || drawnBalls.length === 0) {
        socket.emit('bingoResult', { success: false, message: 'El juego no ha iniciado.' });
        return;
      }

      // Obtén la tabla del usuario
      const board = await getBoardById(boardId);
      console.log('User claimed bingo with board:', board);
      if (!board) {
        socket.emit('bingoResult', { success: false, message: 'Tabla no encontrada.' });
        return;
      }

      // Validar con la nueva función
      const result = validateWinningBoard(board, drawnBalls);
      console.log('Validación de bingo:', result);

      if (result.hasWon) {
        // Actualiza el estado de la partida y el ganador
        if (gameId) {
           await setGameWinner(gameId, userId);
        }
        io.emit('winnerConfirmed', { userId, pattern: result.pattern });
        socket.emit('bingoResult', { success: true, message: `¡Bingo válido! Patrón: ${result.pattern}` });
      } else {
        socket.emit('bingoResult', { success: false, message: 'Falsa alarma, tu tabla no cumple ningún patrón ganador.' });
        startDrawingBalls(io); // Reanuda el sorteo
      }
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
      console.log("BALL LIST: ", drawnBalls);
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
  }, 5000);
};

module.exports = { setupSocket };