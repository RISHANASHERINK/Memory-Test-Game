document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameButton = document.getElementById('newGameButton');
    const fruits = ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍍', '🥝', '🍊', '🍋'];
    let tiles = [];
    let matchedTiles = [];
    let flippedTiles = [];
    let canFlip = true;

    // Function to create and shuffle tiles
    function createTiles() {
        const combinedFruits = [...fruits, ...fruits];
        combinedFruits.sort(() => Math.random() - 0.5);
        tiles = combinedFruits.map(fruit => ({
            fruit,
            flipped: false
        }));
    }

    // Function to create the board
    function createBoard() {
        board.innerHTML = '';
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.dataset.index = index;
            tileElement.textContent = tile.flipped ? tile.fruit : '';
            tileElement.addEventListener('click', () => flipTile(index));
            board.appendChild(tileElement);
        });
    }

    // Function to handle tile click
    function flipTile(index) {
        if (!canFlip || matchedTiles.includes(index) || flippedTiles.includes(index)) return;

        const tile = tiles[index];
        tile.flipped = true;
        flippedTiles.push(index);
        createBoard();

        if (flippedTiles.length === 2) {
            const [firstIndex, secondIndex] = flippedTiles;
            const firstTile = tiles[firstIndex];
            const secondTile = tiles[secondIndex];
            canFlip = false;

            setTimeout(() => {
                if (firstTile.fruit === secondTile.fruit) {
                    matchedTiles.push(firstIndex, secondIndex);
                    if (matchedTiles.length === tiles.length) {
                        showResult('You win!');
                    }
                } else {
                    firstTile.flipped = false;
                    secondTile.flipped = false;
                }
                flippedTiles = [];
                canFlip = true;
                createBoard();
            }, 1000);
        }
    }

    // Function to display result screen
    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.classList.remove('hidden');
    }

    // Function to reset the game
    function resetGame() {
        matchedTiles = [];
        flippedTiles = [];
        canFlip = true;
        createTiles();
        createBoard();
        resultScreen.classList.add('hidden');
    }

    // Event listener for the new game button
    newGameButton.addEventListener('click', resetGame);

    // Initialize the game
    createTiles();
    createBoard();
});
