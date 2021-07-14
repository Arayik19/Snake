let snake = [46, 45, 44];
let snakeBoard = document.querySelector('.snake-board');
let snakeDirection = 1; //direction 1 = left, direction -1 = right, direction 10 = up, direction -10 = down
let previousDirection = 1;
let boardCells = snakeBoard.children;
let snakeMovement;
let tail;

//==== Options =====
let width = 10;
let boardSize = 100;
let speed = 0.6;
//==== Options ======



initGame();

function initGame() {
    if (boardCells.length === 0) {
        createBoard();
        document.addEventListener("keydown", (event) => addSnakeDirectionKeybinds(event.key));
    };
    clearInterval(snakeMovement);
    generateSnakeFood();
    setInitialSnakePosition();
    snakeMovement = setInterval(() => moveSnake(snakeDirection), speed * 1000)
}

function moveSnake() {

    if (hasSnakeCrashed()) {
        alert("Game Over!");
        clearInterval(snakeMovement);
        return;
    };
    if (boardCells[snake[0] + snakeDirection].classList.contains('snake')) {
        snakeDirection = -previousDirection;
    };

    tail = snake.pop();
    boardCells[tail].classList.remove('snake');

    let snakeHead = snake[0] + snakeDirection;
    snake.unshift(snakeHead);
    boardCells[snakeHead].classList.add('snake');
    hasSnakeEaten();
};

function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        let cell = document.createElement('div');
        cell.classList.add('board-cell');
        snakeBoard.appendChild(cell);
    };
};

function setInitialSnakePosition() {
    snake.forEach(part => {
        boardCells[part].classList.add('snake');
    });
};

function addSnakeDirectionKeybinds(arrowDirection) {
    switch (arrowDirection) {
        case "ArrowDown":
            setSnakeDirection(10);
            break;
        case "ArrowUp":
            setSnakeDirection(-10);
            break;
        case "ArrowLeft":
            setSnakeDirection(-1);
            break;
        case "ArrowRight":
            setSnakeDirection(1);
            break;
    };
};

function setSnakeDirection(direction) {
    snakeDirection = direction;
    previousDirection = direction;
}

function hasSnakeCrashed() {
    if (snake[0] + snakeDirection >= boardSize ||
        snake[0] % width === width - 1 && snakeDirection === 1 ||
        snake[0] % width === 0 && snakeDirection === -1 ||
        snake[0] - width < 0 && snakeDirection === -10 ||
        boardCells[snake[0] + snakeDirection].classList.contains('snake') && snakeDirection === -previousDirection
    ) {
        return true;
    } else {
        return false;
    };
};

function hasSnakeEaten() {
    if (boardCells[snake[0]].classList.contains('food')) {
        boardCells[snake[0]].classList.remove('food');
        snake.push(tail);
        boardCells[tail].classList.add('snake')
        generateSnakeFood();
    };
};

function generateSnakeFood() {
    let foodIndex;
    do {
        foodIndex = Math.floor(Math.random() * boardSize);
    } while (snake.includes(foodIndex));
    boardCells[foodIndex].classList.add('food');
};

