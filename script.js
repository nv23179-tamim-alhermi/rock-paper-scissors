let playerScore = 0;
let computerScore = 0;

const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultDiv = document.getElementById('result');
const scoreDiv = document.getElementById('score');

rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));

function playRound(playerSelection) {
    if (playerScore >= 5 || computerScore >= 5) return;

    const choices = ['rock', 'paper', 'scissors'];
    const computerSelection = choices[Math.floor(Math.random() * 3)];
    const roundResult = getResult(playerSelection, computerSelection);
    
    if (roundResult.includes('Win')) playerScore++;
    if (roundResult.includes('Lose')) computerScore++;
    
    resultDiv.textContent = `You chose ${playerSelection}, computer chose ${computerSelection}. ${roundResult}`;
    scoreDiv.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    
    if (playerScore >= 5 || computerScore >= 5) {
        endGame();
    }
}

function getResult(player, computer) {
    if (player === computer) return 'Tie!';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) return 'You Win!';
    return 'You Lose!';
}

function endGame() {
    const winner = playerScore > computerScore ? 'Player' : 'Computer';
    resultDiv.textContent += `\n\nGame Over! ${winner} wins the game!`;
    
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
    });
    
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Play Again';
    restartBtn.addEventListener('click', restartGame);
    resultDiv.appendChild(document.createElement('br'));
    resultDiv.appendChild(document.createElement('br'));
    resultDiv.appendChild(restartBtn);
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    resultDiv.textContent = '';
    scoreDiv.textContent = '';
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
    const restartBtn = document.querySelector('#result button');
    if (restartBtn) restartBtn.remove();
}
