let numberOfTiles = 10; // Change to adjust grid size
let winningTile = Math.floor(Math.random() * numberOfTiles * numberOfTiles);
let tiles = [];
let gameBoard = document.querySelector("#game-board");
let gameContainer = document.querySelector("#game-container");

// Dynamically create grid and add click event listeners
for (let i = 0; i < numberOfTiles * numberOfTiles; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = i.toString(); // Set the id of each tile
    tile.addEventListener("click", handleClick);
    gameBoard.appendChild(tile);
    tiles.push(tile);
}

// Handle click event
function handleClick() {
    let clickedTile = this;
    let clickedTileIndex = tiles.indexOf(clickedTile);

    if (clickedTile.classList.contains("flipped") || clickedTile.classList.contains("animated")) {
        return;
    }

    if (clickedTileIndex === winningTile) {
        showWinningScreen();
    } else {
        showDistance(clickedTileIndex);
    }

    clickedTile.classList.add("animated", "flipping");
    setTimeout(() => {
        clickedTile.classList.remove("flipping");
        clickedTile.classList.add("flipped");
    }, 500);
}

// Handle play again button click
function handlePlayAgainClick() {
    // Reset the state of the game
    winningTile = Math.floor(Math.random() * numberOfTiles * numberOfTiles);
    for (let i = 0; i < numberOfTiles * numberOfTiles; i++) {
        tiles[i].classList.remove("flipped", "animated", "clickable", "winning", "distance");
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
    let playAgainButton = document.querySelector("#play-again-button");
    playAgainButton.addEventListener("click", handlePlayAgainClick);
}

// Show the distance between the clicked tile and the winning tile
function showDistance(clickedTileIndex) {
    let distance = getDistance(clickedTileIndex, winningTile);
    for (let i = 0; i < numberOfTiles * numberOfTiles; i++) {
        let tile = tiles[i];
        if (i === clickedTileIndex) {
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
function getDistance(tileIndex1, tileIndex2) {
    let x1 = tileIndex1 % numberOfTiles;
    let y1 = Math.floor(tileIndex1 / numberOfTiles);
    let x2 = tileIndex2 % numberOfTiles;
    let y2 = Math.floor(tileIndex2 / numberOfTiles);
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}