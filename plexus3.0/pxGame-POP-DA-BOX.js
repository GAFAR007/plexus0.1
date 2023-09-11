document.addEventListener(
  "DOMContentLoaded",
  () => {
    const startButton = document.getElementById(
      "startButton"
    );
    const stopButton =
      document.getElementById("stopButton");
    const resetButton = document.getElementById(
      "resetButton"
    );
    const countdownSpan =
      document.getElementById("countdown");
    const sumDisplay =
      document.getElementById("sumDisplay");
    const resultMessage = document.getElementById(
      "resultMessage"
    );
    const youWinCount = document.getElementById(
      "youWinCount"
    );
    const computerWinCount =
      document.getElementById("computerWinCount");

    let countdownTime = 0;
    let countdownInterval;
    let youWinCounter = 0;
    let computerWinCounter = 0;

    const clickedButtons = [];

    function updateCountdown() {
      countdownSpan.textContent = countdownTime;
      if (countdownTime === 0) {
        clearInterval(countdownInterval);
        displayResult();
      }
      countdownTime--;
    }

    function updateSumDisplay() {
      const sum = clickedButtons.reduce(
        (total, num) => total + num,
        0
      );
      sumDisplay.textContent = `Sum: ${sum}`;

      if (youWinCounter >= 10) {
        displayWinner("You");
      } else if (computerWinCounter >= 10) {
        displayWinner("Computer");
      }
    }

    function displayWinner(winner) {
      resultMessage.textContent = `${winner} won the game! `;
      resultMessage.style.display = "block";
      clearInterval(countdownInterval);
    }

    function displayResult() {
      if (
        clickedButtons.reduce(
          (total, num) => total + num,
          0
        ) === 55
      ) {
        resultMessage.textContent = "You win!";
        youWinCounter++;
        youWinCount.textContent = youWinCounter;
      } else {
        resultMessage.textContent =
          "Computer win!";
        computerWinCounter++;
        computerWinCount.textContent =
          computerWinCounter;
      }
      resultMessage.style.display = "block";
    }

    startButton.addEventListener("click", () => {
      if (
        countdownTime <= 0 &&
        !startButton.clicked
      ) {
        const uniqueRandomNumbers = new Set();

        while (uniqueRandomNumbers.size < 10) {
          const randomNumber =
            Math.floor(Math.random() * 10) + 1;
          uniqueRandomNumbers.add(randomNumber);
        }

        uniqueRandomNumbers.forEach(
          (randomNumber) => {
            const winButton =
              document.createElement("button");
            winButton.style.backgroundColor =
              "red";
            winButton.textContent = randomNumber;
            document.body.appendChild(winButton);

            const randomX = Math.floor(
              Math.random() * window.innerWidth
            );
            const randomY = Math.floor(
              Math.random() * window.innerHeight
            );

            winButton.style.position = "absolute";
            winButton.style.left = `${randomX}px`;
            winButton.style.top = `${randomY}px`;

            winButton.addEventListener(
              "click",
              () => {
                winButton.style.display = "none";
                clickedButtons.push(randomNumber);
                updateSumDisplay();
              }
            );
          }
        );

        countdownTime = 10;
        countdownSpan.textContent = countdownTime;

        startButton.style.backgroundColor = "red";
        startButton.clicked = true;

        countdownInterval = setInterval(
          updateCountdown,
          1000
        );
      }
    });

    stopButton.addEventListener("click", () => {
      clearInterval(countdownInterval);
    });

    resetButton.addEventListener("click", () => {
      clearInterval(countdownInterval); // Clear the countdown interval when "Reset" button is clicked
      countdownTime = 0;
      countdownSpan.textContent = countdownTime;
      clickedButtons.length = 0; // Clear the clicked buttons array
      sumDisplay.textContent = "Sum: 0"; // Reset the sum display
      startButton.clicked = false; // Reset the start button state
      startButton.style.backgroundColor = "";

      // Hide the result message
      resultMessage.style.display = "none";
    });
  }
);
