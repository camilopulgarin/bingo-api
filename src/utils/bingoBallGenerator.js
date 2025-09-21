const generateBingoBalls = () => {
  const balls = Array.from({ length: 75 }, (_, i) => i + 1); // Bingo balls numbered 1 to 75
  const drawnBalls = [];

  const drawBall = () => {
    if (balls.length === 0) {
      return null; // No more balls to draw
    }
    const randomIndex = Math.floor(Math.random() * balls.length);
    const drawnBall = balls[randomIndex];
    drawnBalls.push(drawnBall);
    balls.splice(randomIndex, 1); // Remove the drawn ball from the pool
    return drawnBall;
  };

  return {
    drawBall,
    getDrawnBalls: () => drawnBalls,
    hasMoreBalls: () => balls.length > 0,
  };
};

module.exports = generateBingoBalls;