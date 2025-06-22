let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner()) {
                statusText.textContent = `¡El jugador ${currentPlayer} gana!`;
                gameActive = false;
            } else if (!board.includes("")) {
                statusText.textContent = "¡Empate!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `Turno del jugador ${currentPlayer}`;
            }
        }
    });
});

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Turno del jugador ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
}