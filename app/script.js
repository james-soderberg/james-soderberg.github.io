// Define the game settings
const gridSize = 10; // The size of the grid (e.g. 10 = 10x10 grid)
const totalTiles = gridSize * gridSize; // The total number of tiles in the grid
let winningTileIndex; // The index of the winning tile
let tileElements; // The array of tile elements in the grid
let tilesFlipped = 0; // The number of tiles that have been flipped over by the user

// Define the function that initializes the game
function init() {
  // Generate the tile elements and add them to the board
  const board = document.querySelector(".board");
  let tileHTML = "";

  for (let i = 0; i < totalTiles; i++) {
    tileHTML += "<div class='tile'></div>";
  }

  board.innerHTML = tileHTML;

  // Randomly select the winning tile
  winningTileIndex = Math.floor(Math.random() * totalTiles);

  // Get the array of tile elements in the grid and add click listeners to them
  tileElements = document.querySelectorAll(".tile");
  tileElements.forEach((tile, index) => {
    tile.addEventListener("click", () => flipTile(tile, index));
  });
}

// Define the function that flips a tile and shows the distance from the clicked tile to the winning tile
function flipTile(tile, index) {
  // If the tile is already flipped, ignore the click
  if (tile.classList.contains("flipped")) {
    return;
  }

  // Add the "flipped" class to the tile to flip it
  tile.classList.add("flipped");

  // If the tile is the winning tile, show an "X"
  if (index === winningTileIndex) {
    tile.innerText = "X";
  } else {
    // Calculate the number of tiles away from the winning tile
    const rowDifference = Math.abs(Math.floor(index / gridSize) - Math.floor(winningTileIndex / gridSize)); // Number of rows away
    const colDifference = Math.abs((index % gridSize) - (winningTileIndex % gridSize)); // Number of columns away
    const totalDifference = rowDifference + colDifference; // Total number of tiles away

    // Show the number of tiles away from the winning tile
    tile.innerText = totalDifference;
  }

  // Increase the number of tiles flipped by the user
  tilesFlipped++;

  // If all tiles have been flipped, end the game
  if (tilesFlipped === totalTiles) {
    endGame();
  }
}

// Define the function that ends the game
function endGame() {
  // Show the winning tile
  const winningTile = tileElements[winningTileIndex];
  winningTile.classList.add("flipped");
  winningTile.innerText = "X";
}

// Start the game when the page loads
window.addEventListener("load", init);
