function validateWinningBoard(board, drawnBalls) {
  const columns = ['B', 'I', 'N', 'G', 'O'];
  // Convert board to 2D array
  const grid = Array.from({ length: 5 }, (_, row) =>
    columns.map(col => board.numbers[col][row])
  );

  // Helper to check if all numbers in arr are in drawnBalls (ignore '★')
  const allMarked = arr => arr.every(num => num === '★' || drawnBalls.includes(num));

  // Tabla completa
  const allNumbers = [];
  grid.forEach(row => row.forEach(num => { if (num !== '★') allNumbers.push(num); }));
  if (allMarked(allNumbers)) {
    return { hasWon: true, pattern: 'tabla completa' };
  }

  // 4 esquinas
  const corners = [grid[0][0], grid[0][4], grid[4][0], grid[4][4]];
  if (allMarked(corners)) {
    return { hasWon: true, pattern: '4 esquinas' };
  }

  // Línea horizontal llena
  for (let i = 0; i < 5; i++) {
    if (allMarked(grid[i])) {
      return { hasWon: true, pattern: `línea horizontal (${i + 1})` };
    }
  }

  // Línea vertical llena
  for (let j = 0; j < 5; j++) {
    const col = grid.map(row => row[j]);
    if (allMarked(col)) {
      return { hasWon: true, pattern: `línea vertical (${columns[j]})` };
    }
  }

  // Cruz grande (fila y columna del centro)
  const centerRow = grid[2];
  const centerCol = grid.map(row => row[2]);
  if (allMarked(centerRow) && allMarked(centerCol)) {
    return { hasWon: true, pattern: 'cruz grande' };
  }

  // Cruz pequeña (celdas adyacentes al centro)
  const smallCross = [grid[1][2], grid[2][1], grid[2][3], grid[3][2]];
  if (allMarked(smallCross)) {
    return { hasWon: true, pattern: 'cruz pequeña' };
  }

  // Cuadro 2x2 en una esquina
  const squares = [
    [grid[0][0], grid[0][1], grid[1][0], grid[1][1]], // top-left
    [grid[0][3], grid[0][4], grid[1][3], grid[1][4]], // top-right
    [grid[3][0], grid[3][1], grid[4][0], grid[4][1]], // bottom-left
    [grid[3][3], grid[3][4], grid[4][3], grid[4][4]]  // bottom-right
  ];
  for (let idx = 0; idx < squares.length; idx++) {
    if (allMarked(squares[idx])) {
      return { hasWon: true, pattern: `cuadro 2x2 esquina (${idx + 1})` };
    }
  }

  return { hasWon: false, pattern: null };
}

module.exports = { validateWinningBoard };