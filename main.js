var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;//made by gurpreet
var boardSize = Math.min(canvas.width, canvas.height) * 0.8;
var cellSize = boardSize / 3;
var boardOffsetX = (canvas.width - boardSize) / 2;
var boardOffsetY = (canvas.height - boardSize) / 2;
var currentPlayer = 'X';
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

class Rectangle {
    constructor(x, y, width, height, border, text, color) {
        this.x = x;//made by gurpreet
        this.y = y;
        this.width = width;
        this.height = height;
        this.border = border;
        this.text = text;
        this.color = color;
    }
    
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //made by gurpreet
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x + this.border,
            this.y + this.border,
            this.width - 2 * this.border,
            this.height - 2 * this.border
        );

        if (this.text !== "") {
            ctx.fillStyle = "black";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = (this.height / 2) + "px Arial";
            //made by gurpreet
            ctx.fillText(
                this.text,
                this.x + this.width / 2,
                this.y + this.height / 2
            );
        }
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();//made by gurpreet
    for (var i = 1; i < 3; i++) {
        ctx.moveTo(boardOffsetX + i * cellSize, boardOffsetY);
        ctx.lineTo(boardOffsetX + i * cellSize, boardOffsetY + boardSize);
        ctx.moveTo(boardOffsetX, boardOffsetY + i * cellSize);
        ctx.lineTo(boardOffsetX + boardSize, boardOffsetY + i * cellSize);
    }
    ctx.stroke();
}//made by gurpreet

function drawX(x, y, color) {
    var rect = new Rectangle(
        boardOffsetX + x * cellSize + 10,//made by gurpreet
        boardOffsetY + y * cellSize + 10,
        cellSize - 20,
        cellSize - 20,
        0,
        "X",
        color
    );
    rect.draw();
}
//made by gurpreet
function drawO(x, y, color) {
    var rect = new Rectangle(
        boardOffsetX + x * cellSize + 10,
        boardOffsetY + y * cellSize + 10,
        cellSize - 20,
        cellSize - 20,
        0,
        "O",
        color
    );//made by gurpreet
    rect.draw();
}

function checkWinner() {
    // Check rows
    for (var i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return board[i][0];
        }
    }//made by gurpreet
    // Check columns
    for (var i = 0; i < 3; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return board[0][i];
        }//made by gurpreet
    }
    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return board[0][2];
    }
    // Check for draw
    if (!board.flat().includes('')) {
        return 'draw';
    }
    return null;
}//made by gurpreet

function handleClick(event) {
    var x = Math.floor((event.clientX - boardOffsetX) / cellSize);
    var y = Math.floor((event.clientY - boardOffsetY) / cellSize);
    if (x >= 0 && x < 3 && y >= 0 && y < 3 && board[y][x] === '') {
        board[y][x] = currentPlayer;
        if (currentPlayer === 'X') {
            drawX(x, y, 'red');
            currentPlayer = 'O';
        } else {
            drawO(x, y, 'blue');
            currentPlayer = 'X';//made by gurpreet
        }
        var winner = checkWinner();
        if (winner) {
            if (winner === 'draw') {
                alert("It's a draw!");
            } else {
                alert(`${winner} wins!`);
            }
            resetGame();
        }
    }
}
//made by gurpreet
function resetGame() {
    currentPlayer = 'X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    drawBoard();
}//made by gurpreet

canvas.addEventListener('click', handleClick);
drawBoard();
