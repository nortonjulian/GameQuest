document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("player-name");
    const thePlayerDiv = document.getElementById("the-player");
    const letsPlay = document.getElementById("lets-play");
    const letsNot = document.getElementById("lets-not");
    const ansBtn = document.getElementById("ansBtn");
    const questionDiv = document.getElementById("question");
    const yesNoDiv = document.getElementById("yes-no");
    const gameArea = document.getElementById("game-area");
    const welcomeMessage = document.getElementById("welcome-message");
    const choiceBtns = document.querySelectorAll(".choice-btn");
    const playerChoiceDisp = document.getElementById("player-choice");
    const computerChoiceDisp = document.getElementById("computer-choice");
    const roundResultDisp = document.getElementById("round-result");
    const scoreDisplay = document.getElementById("score");
    const nextRoundBtn = document.querySelector(".next-round");
    const restartGameBtn = document.querySelector(".restart-game");
    const endGameBtn = document.querySelector(".endgame");
    const playItAgain = document.querySelector("#play-again")

    let playerName = "";
    let playerWins = 0;
    let computerWins = 0;
    const choices = ["Rock", "Paper", "Scissors"];

    // Initialize the game area
    gameArea.style.display = "none";
    toggleControlButtons(false, false, false, false);

    function toggleControlButtons(enable){
        choiceBtns.forEach(button => {
            button.disabled = !enable
        })
    }

    // Start game: Handle "Yes" button
    letsPlay.addEventListener("click", () => {
        questionDiv.style.display = "none";
        yesNoDiv.style.display = "none";
        thePlayerDiv.style.display = "block";
    });

    // Handle "No" button
    letsNot.addEventListener("click", () => {
        const messages = [
            "Maybe next time!",
            "Don't get scurred.",
            "It's fine, I was gonna win anyway.",
            "Fair enough. I’ll just play with my imaginary friends… again.",
            "Wow, okay, leaving me to fend off my boredom alone. Savage.",
            "I get it. You're afraid of my mad skills, aren't you?"
        ];
        alert(messages[Math.floor(Math.random() * messages.length)]);
    });

    // Capture player name
    ansBtn.addEventListener("click", () => {
        playerName = playerNameInput.value.trim();
        if (playerName) {
            welcomeMessage.textContent = `Welcome, ${playerName}! Let's start the game!`;
            thePlayerDiv.style.display = "none";
            gameArea.style.display = "block";
            toggleControlButtons(true)
        } else {
            alert("Please enter a name to proceed");
        }
    });

    // Handle player's choice
    choiceBtns.forEach(button => {
        button.addEventListener("click", (e) => {
            // if (button.disabled) return;
            console.log(`Button clicked: ${e.target.dataset.choice}`)
            const playerChoice = e.target.dataset.choice;
            const computerChoice = choices[Math.floor(Math.random() * 3)];
            const result = determineWinner(playerChoice, computerChoice);

            displayResult(playerChoice, computerChoice, result);
            toggleControlButtons(false)

            if (playerWins === 3 || computerWins === 3) {
                endGame();
            } else {
                toggleControlButtons(false, true, false, true, true);
            }
        });
    });

    // Determine the winner of a round
    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return "It's a draw!";
        if (
            (playerChoice === "Rock" && computerChoice === "Scissors") ||
            (playerChoice === "Paper" && computerChoice === "Rock") ||
            (playerChoice === "Scissors" && computerChoice === "Paper")
        ) {
            playerWins++;
            return `${playerName} wins this round!`;
        } else {
            computerWins++;
            return "Computer wins this round!";
        }
    }

    // Display the round results
    function displayResult(playerChoice, computerChoice, result) {
        playerChoiceDisp.textContent = `You chose: ${playerChoice}`;
        computerChoiceDisp.textContent = `Computer chose: ${computerChoice}`;
        roundResultDisp.textContent = result;
        scoreDisplay.textContent = `Score - ${playerName}: ${playerWins}, Computer: ${computerWins}`;
    }

    // End the game
    function endGame() {
        const winner = playerWins === 3 ? playerName : "Computer";
        roundResultDisp.textContent = `${winner} wins the game!`;
        toggleControlButtons(false, false, true, false, false)
        playItAgain.style.display = "block"
    }

    //Restart Button
    restartGameBtn.addEventListener("click", () => {
        resetGame();
        toggleControlButtons(true, false, false, true)
    });

    // Proceed to the next round
    nextRoundBtn.addEventListener("click", () => {
        resetRound();
        toggleControlButtons(true, false, false, true, true);
    });

    // Quit the game
    endGameBtn.addEventListener("click", () => {
        resetGame();
        gameArea.style.display = "none";
        questionDiv.style.display = "block";
        yesNoDiv.style.display = "block";
        toggleControlButtons(false, false, false, false);
    });

    // Reset the game
    function resetGame() {
        playerWins = 0;
        computerWins = 0;
        resetRound();
        playItAgain.style.display = "none";
        gameArea.style.display = "block"
    }

    // Reset the round
    function resetRound() {
        playerChoiceDisp.textContent = "";
        computerChoiceDisp.textContent = "";
        roundResultDisp.textContent = "";
        scoreDisplay.textContent = `Score - ${playerName}: ${playerWins}, Computer: ${computerWins}`;
        toggleControlButtons(true, false, false, true, true)
    }

    //Play Again Button
    playItAgain.addEventListener("click", () => {
        resetGame()
        gameArea.style.display = "block";
        toggleControlButtons(true)
        scoreDisplay.textContent = `Score - ${playerName}: ${playerWins}, Computer: ${computerWins}`
    })

    //Button visibilty
    function toggleControlButtons(enableChoices, showNextRound = false, isGameOver = false, showRestart = false, showEndGame = false) {
        choiceBtns.forEach(button => (button.disabled = !enableChoices))
        nextRoundBtn.style.display = showNextRound ? "inline-block" : "none";
        restartGameBtn.style.display = showRestart ? "inline-block" : "none";
        endGameBtn.style.display = showEndGame ? "block" : "none";
        playItAgain.style.display = isGameOver ? "block" : "none";
    }
});

