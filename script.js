// JavaScript for Tic-Tac-Toe with Crackers Animation
const board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = false;
let isComputerMode = false;

const boardElement = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const modeSelection = document.getElementById("mode-selection");
const crackersContainer = document.getElementById("crackers");

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

// Handle player mode selection
document.getElementById("two-player").addEventListener('click', () => {
  isComputerMode = false;
  currentPlayer = "X";
  isGameActive = true;
  modeSelection.style.display = 'none';
  createBoard();
});

document.getElementById("player-vs-computer").addEventListener('click', () => {
  isComputerMode = true;
  currentPlayer = "X";
  isGameActive = true;
  modeSelection.style.display = 'none';
  createBoard();
  if (currentPlayer === "O") {
    computerMove();
  }
});

// Handle cell click event
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] || !isGameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('taken');

  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
    isGameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    alert("It's a draw!");
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (isComputerMode && currentPlayer === "O") {
    computerMove();
  }
}

// Computer's move function
function computerMove() {
  let availableMoves = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null);

  if (availableMoves.length === 0) return;

  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[move] = currentPlayer;
  document.querySelector(`.cell[data-index='${move}']`).textContent = currentPlayer;
  document.querySelector(`.cell[data-index='${move}']`).classList.add('taken');

  if (checkWinner()) {
    showCrackers(); // Show cracker animation on win
    alert(`${currentPlayer} wins!`);
    isGameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    alert("It's a draw!");
    isGameActive = false;
    return;
  }

  currentPlayer = "X";
}

// Check for a winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Reset the game
resetButton.addEventListener('click', () => {
  board.fill(null);
  currentPlayer = "X";
  isGameActive = false;
  modeSelection.style.display = 'block';
  createBoard();
});

// Initialize the mode selection
modeSelection.style.display = 'block';
