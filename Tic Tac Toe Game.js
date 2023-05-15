const grid = [
  ['','',''],
  ['','',''],
  ['','','']
];

const cells = document.querySelectorAll('td');
const resultElement = document.querySelector('#result');    
let currentPlayer = 'X';

function handleCellClick(event) {
  const cell = event.target;
  const [rowIndex, colIndex] = cell.id.split('_').map(Number);
  if (grid[rowIndex][colIndex] !== '') {
    resultElement.textContent ='This cell has already been played! Please choose a different cell.';
    return;
  }
  grid[rowIndex][colIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkForWin()) {
    const resultElement = document.querySelector('#result');
    alert(`${currentPlayer} has won the game!`);
    resetGame();
    return;
  }
  if (checkForDraw()) {
    alert( 'The game is a draw!');
    resetGame();
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  computerMove();
}

function checkForWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      return true;
    }
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (grid[0][j] !== '' && grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]) {
      return true;
    }
  }
  // Check diagonals
  if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    return true;
  }
  if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    return true;
  }
  return false;
}

function checkForDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      grid[rowIndex][colIndex] = '';
      const cellId = `${rowIndex}_${colIndex}`;
      const cellElement = document.getElementById(cellId);
      cellElement.textContent = '';
    });
  });
}

function computerMove() {
const availableCells = [];
let playerWinningMoves = [];
for (let i = 0; i < 3; i++) {
for (let j = 0; j < 3; j++) {
if (grid[i][j] === '') {
  availableCells.push([i, j]);
  if (currentPlayer === 'O' && checkForWinningMove(i, j, 'X')) {
    playerWinningMoves.push([i, j]);
  }
}
}
}
if (availableCells.length === 0) {
return;
}
let [rowIndex, colIndex] = availableCells[Math.floor(Math.random() * availableCells.length)];
if (playerWinningMoves.length > 0 && Math.random() < 0.2) {
[rowIndex, colIndex] = playerWinningMoves[Math.floor(Math.random() * playerWinningMoves.length)];
}
grid[rowIndex][colIndex] = currentPlayer;
const cellId = `${rowIndex}_${colIndex}`;
const cellElement = document.getElementById(cellId);
cellElement.textContent = currentPlayer;
if (checkForWin()) {
alert(`Sorry! Computer has won the game!`);
resetGame();
return;
}
if (checkForDraw()) {
alert('The game is a draw!');
resetGame();
return;
}
currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
function checkForWinningMove(row, col, player) {
const tmpGrid = [...grid];
tmpGrid[row][col] = player;
return checkForWin(tmpGrid);
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));