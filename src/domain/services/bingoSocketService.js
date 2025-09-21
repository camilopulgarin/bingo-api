class BingoSocketService {
    constructor() {
        this.drawnBalls = [];
        this.allBalls = Array.from({ length: 75 }, (_, i) => i + 1); // Bingo balls from 1 to 75
        this.winnerConfirmed = false;
    }

    generateRandomBall() {
        if (this.drawnBalls.length >= this.allBalls.length || this.winnerConfirmed) {
            return null; // No more balls to draw or a winner has been confirmed
        }

        let ball;
        do {
            ball = this.allBalls[Math.floor(Math.random() * this.allBalls.length)];
        } while (this.drawnBalls.includes(ball));

        this.storeDrawnBall(ball);
        return ball;
    }

    storeDrawnBall(ball) {
        this.drawnBalls.push(ball);
    }

    checkWinner(playerBalls) {
        // Assuming playerBalls is an array of balls that a player has
        const isWinner = playerBalls.every(ball => this.drawnBalls.includes(ball));
        if (isWinner) {
            this.winnerConfirmed = true;
        }
        return isWinner;
    }

    getDrawnBallsHistory() {
        return this.drawnBalls;
    }

    resetGame() {
        this.drawnBalls = [];
        this.winnerConfirmed = false;
    }
}

module.exports = BingoSocketService;