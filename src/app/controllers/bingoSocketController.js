class BingoSocketController {
  constructor(io) {
    this.io = io;
    this.drawnBalls = [];
    this.isGameActive = false;
    this.winnerConfirmed = false;
  }

  startGame() {
    this.isGameActive = true;
    this.winnerConfirmed = false;
    this.drawnBalls = [];
    this.drawBalls();
  }

  drawBalls() {
    const drawInterval = setInterval(() => {
      if (!this.isGameActive || this.winnerConfirmed) {
        clearInterval(drawInterval);
        return;
      }

      const ball = this.generateRandomBall();
      this.drawnBalls.push(ball);
      this.io.emit('ballDrawn', ball);

      if (this.drawnBalls.length >= 75) { // Assuming 75 balls in Bingo
        this.isGameActive = false;
        clearInterval(drawInterval);
        this.io.emit('gameOver', this.drawnBalls);
      }
    }, 7000);
  }

  confirmWinner(winnerId) {
    this.winnerConfirmed = true;
    this.io.emit('winnerConfirmed', winnerId);
  }

  generateRandomBall() {
    let ball;
    do {
      ball = Math.floor(Math.random() * 75) + 1; // Generate a number between 1 and 75
    } while (this.drawnBalls.includes(ball));
    return ball;
  }
}

module.exports = BingoSocketController;