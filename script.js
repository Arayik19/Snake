let snake = [46, 45, 44];
let snakeBoard = document.querySelector('.snake-board');
let direction = 1; //direction 1 = left, direction -1 = right, direction 10 = up, direction -10 = down
let previousDirection = 1;
let boardCells = snakeBoard.children;
let snakeMovement;

//==== Options =====
let width = 10;
let boardSize = 100;
let speed = 0.6;
//==== Options ======



initGame();

function initGame() {
    if (boardCells.length === 0) {
        createBoard();
        document.addEventListener("keydown", (event) => changeSnakeDirection(event.key));
    };
    clearInterval(snakeMovement);
    generateSnakeFood();
    setInitialSnakePosition();
    snakeMovement = setInterval(() => moveSnake(direction), speed * 1000)
}

function moveSnake() {
    if (hasSnakeCrashed()) {
        // alert("Game Over!");
        clearInterval(snakeMovement);
        return;
    };
    if (boardCells[snake[0] + direction].classList.contains('snake')) {
        direction = -previousDirection;
    }
    let tail = snake.pop();
    boardCells[tail].classList.remove('snake');
    let snakeHead = snake[0] + direction;
    snake.unshift(snakeHead);
    boardCells[snakeHead].classList.add('snake');
    hasSnakeEaten();
};

function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        let cell = document.createElement('div');
        cell.classList.add('board-cell');
        snakeBoard.appendChild(cell);
    }

}

function setInitialSnakePosition() {
    snake.forEach(part => {
        boardCells[part].classList.add('snake');
    });
};

function changeSnakeDirection(arrowDirection) {
    switch (arrowDirection) {
        case "ArrowDown":
            direction = 10;
            previousDirection = 10;
            break;
        case "ArrowUp":
            direction = -10;
            previousDirection = -10;
            break;
        case "ArrowLeft":
            direction = -1;
            previousDirection = -1;
            break;
        case "ArrowRight":
            direction = 1;
            previousDirection = 1;
            break;
    };
}

function hasSnakeCrashed() {
    if (snake[0] + direction >= boardSize ||
        snake[0] % width === width - 1 && direction === 1 ||
        snake[0] % width === 0 && direction === -1 ||
        snake[0] - width < 0 && direction === -10) {
        return true;
    } else {
        return false;
    }
}


function generateSnakeFood() {
    let foodIndex;
    do {
        foodIndex = Math.floor(Math.random() * boardSize);
    } while (snake.includes(foodIndex));
    boardCells[foodIndex].classList.add('food');
}

function hasSnakeEaten() {
    if (boardCells[snake[0]].classList.contains('food')) {
        boardCells[snake[0]].classList.remove('food');
        generateSnakeFood();
    }
}


// function