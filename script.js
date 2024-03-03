document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const submitButton = document.getElementById('submit');
    const message = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    let currentPlayer;
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    // Function to check if the current player wins
    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameOver = true;
                message.textContent = `${currentPlayer}, congratulations you won!`;
                break;
            }
        }
    }

    // Function to handle cell clicks
    function handleCellClick(index) {
        if (board[index] === '' && !gameOver) {
            board[index] = currentPlayer === player1Input.value ? 'X' : 'O';
            cells[index].textContent = board[index];
            checkWinner();
            if (!gameOver) {
                currentPlayer = currentPlayer === player1Input.value ? player2Input.value : player1Input.value;
                message.textContent = `${currentPlayer}, you're up`;
            }
        }
    }

    // Function to initialize the game
    function startGame() {
        currentPlayer = player1Input.value;
        message.textContent = `${currentPlayer}, you're up`;
        board = ['', '', '', '', '', '', '', '', '']; // Reset board
        gameOver = false; // Reset game over flag
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.addEventListener('click', () => {
                if (!gameOver) {
                    handleCellClick(index);
                }
            });
        });
    }

    // Event listener for submit button
    submitButton.addEventListener('click', () => {
        if (player1Input.value && player2Input.value) {
            startGame();
        } else {
            alert('Please enter names for both players');
        }
    });
});
