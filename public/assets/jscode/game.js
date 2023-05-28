const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "assets/img/ground.png";

let dir;

const foodImg = new Image();
foodImg.src = "assets/img/food.png";

const socket = io('/mobile');
socket.on('rightButtonClickOnMobile', () => {
    if(dir != "left")
        dir = "right";
});
socket.on('leftButtonClickOnMobile', () => {
    if(dir != "right")
        dir = "left";
});
socket.on('downButtonClickOnMobile', () => {
    if(dir != "up")
        dir = "down";
});
socket.on('upButtonClickOnMobile', () => {
    if(dir != "down")
        dir = "up";
});
socket.on('enterButtonClickOnMobile', () => {
    restartGame();
});

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};


function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            clearInterval(drawInterval);
            drawDeathScreen();
        }
    }
}
function restartGame() {
    window.location.reload(false);
}

function drawDeathScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(`Game Over! Score: ${score}`, box * 3, box * 8);

    ctx.fillStyle = "red";
    ctx.fillRect(box * 7, box * 10, box * 5, box * 2);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Restart", box * 7.5, box * 11.7);

}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else
        snake.pop();

    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17){
        clearInterval(game);
        drawDeathScreen();
    }


    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

const drawInterval = setInterval(drawGame, 450);
