const isValid = (grid, row, col, num) => {
    // Check if the number already exists in the same row
    if (grid[row].includes(num)) {
      return false;
    }

    // Check if the number already exists in the same column
    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === num) {
        return false;
      }
    }

    // Check if the number already exists in the same 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (grid[r][c] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const solveSudoku = (grid, row, col) => {
    if (row === 9) {
      // Base case: we have filled all rows
      return true;
    }

    const nextRow = col < 8 ? row : row + 1;
    const nextCol = (col + 1) % 9;

    if (grid[row][col] !== 0) {
      // Skip cells that are already filled
      return solveSudoku(grid, nextRow, nextCol);
    }

    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(values); // Randomize the order of numbers

    for (let i = 0; i < values.length; i++) {
      const num = values[i];
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;

        if (solveSudoku(grid, nextRow, nextCol)) {
          return true;
        }

        grid[row][col] = 0; // Backtrack if the solution is not valid
      }
    }

    return false;
  };

  const createSudoku = () => {
    const grid = [...Array(9)].map(() => Array(9).fill(0));

    if (solveSudoku(grid, 0, 0)) {
      return grid;
    } else {
      return null;
    }
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const sudoku = createSudoku();
  //console.log(sudoku);
  
  export default sudoku;