let numberOfTiles = 10; // Change to adjust grid size
let winningTile = Math.floor(Math.random() * numberOfTiles * numberOfTiles);
let tiles = [];
let gameBoard = document.querySelector("#game-board");

// Dynamically create grid and add click event listeners
for (let i = 0; i < numberOfTiles * numberOfTiles; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = i.toString(); // Set the id of each tile
    gameBoard.appendChild(tile);
    tiles.push(tile);

    tile.addEventListener("click", function() {
        if (i === winningTile) {
            showWinningScreen();
        } else {
            showDistance(i);
        }
        this.classList.add("flipped");
    });
}

// Handle play again button click
function handlePlayAgainClick() {
    // Reset the state of the game
    winningTile = Math.floor(Math.random() * numberOfTiles * numberOfTiles);
    for (let i = 0; i < numberOfTiles * numberOfTiles; i++) {
        tiles[i].classList.remove("flipped", "clickable", "winning", "distance");
    }
    hideGameOverScreen();
}

// Show the screen that appears when the player wins
function showWinningScreen() {
    for (let i = 0; i < numberOfTiles * numberOfTiles; i++) {
        tiles[i].classList.remove("clickable");
        if (i === winningTile) {
            tiles[i].classList.add("winning");
        }
    }
    let gameOverScreen = document.querySelector("#game-over");
    gameOverScreen.style.display = "block";
    let playAgainButton = document.querySelector(".play-again-button");
    playAgainButton.addEventListener("click", handlePlayAgainClick);
}

// Show the distance between the clicked tile and the winning tile
function showDistance(clickedTile) {
    let distance = getDistance(clickedTile, winningTile);
    for (let i = 0; i < numberOfTiles * numberOfTiles; i++) {
        let tile = tiles[i];
        if (i === clickedTile) {
            tile.classList.add("clickable");
            let distanceSpan = document.createElement("span");
            distanceSpan.classList.add("distance");
            distanceSpan.textContent = distance.toString();
            tile.appendChild(distanceSpan);
        } else if (i === winningTile) {
            tile.classList.add("winning");
        }
    }
}

// Hide the game over screen
function hideGameOverScreen() {
    let gameOverScreen = document.querySelector("#game-over");
    gameOverScreen.style.display = "none";
}

// Calculate the Manhattan distance between two tiles
function getDistance(tile1, tile2) {
    let x1 = tile1 % numberOfTiles;
    let y1 = Math.floor(tile1 / numberOfTiles);
    let x2 = tile2 % numberOfTiles;
    let y2 = Math.floor(tile2 / numberOfTiles);
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}