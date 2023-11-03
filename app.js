const game = () => {
  let cScore = 0;
  let pScore = 0;

  const startGame = () => {
    const playBtn = document.querySelector('.intro button');
    const introScreen = document.querySelector('.intro');
    const match = document.querySelector('.match');

    playBtn.addEventListener('click', () => {
      introScreen.classList.add('fadeOut');
      match.classList.add('fadeIn');
    });
  };

  const playMatch = () => {
    const playerOptions = document.querySelectorAll('.options button');
    const computerHand = document.querySelector('.computer-hand');
    const playerHand = document.querySelector('.player-hand');
    const hands = document.querySelectorAll('.hands img');
    const rockCount = document.querySelector('.rock span');
    const paperCount = document.querySelector('.paper span');
    const scissorsCount = document.querySelector('.scissors span');

    hands.forEach(hand => {
      hand.addEventListener('animationend', function () {
        this.style.animation = '';
      });
    });

    const computerOptions = ['rock', 'paper', 'scissors'];
    const odds = [0, 0, 0];
    const findIndexOfMaxElement = (arr) => {
      let maxIndex = 0;
      arr.forEach((value, index) => {
        if (value > arr[maxIndex]) {
          maxIndex = index;
        }
      });
      return maxIndex;
    }

    const handsCount = [0, 0, 0];

    playerOptions.forEach(playerOption => {
      playerOption.addEventListener('click', function () {
        const computerCalc = [
          Math.random() * odds[0],
          Math.random() * odds[1],
          Math.random() * odds[2]
        ];
        const computerNumber = findIndexOfMaxElement(computerCalc);
        const computerChoice = computerOptions[computerNumber];

        const playerChoice = this.classList[0];
        setTimeout(() => {
          compareHnads(computerChoice, playerChoice);
          computerHand.src = `./assets/${computerChoice}.png`;
          playerHand.src = `./assets/${playerChoice}.png`;
        }, 1000);

        computerHand.style.animation = 'shakeComputer 1s ease';
        playerHand.style.animation = 'shakePlayer 1s ease';

        if (playerChoice === 'rock') {
          odds[1]++;
          handsCount[0]++;
        } else if (playerChoice === 'paper') {
          odds[2]++;
          handsCount[1]++;
        } else {
          odds[0]++;
          handsCount[2]++;
        }
        rockCount.textContent = handsCount[0];
        paperCount.textContent = handsCount[1];
        scissorsCount.textContent = handsCount[2];
        console.log(odds);
      });
    });
  };

  const updateScore = () => {
    const computerScore = document.querySelector('.computer-score p');
    const playerScore = document.querySelector('.player-score p');
    computerScore.textContent = cScore;
    playerScore.textContent = pScore;
  }

  const compareHnads = (computerChoice, playerChoice) => {
    const judgment = document.querySelector('.judgment');
    const updateJudgment = (playerHasWon) => {
      if (playerHasWon) {
        judgment.textContent = 'かち！';
        pScore++;
      } else {
        judgment.textContent = 'まけｉ';
        cScore++;
      }
      updateScore();
    }

    if (computerChoice === playerChoice) {
      judgment.textContent = 'あいこ';
      return;
    }

    if (playerChoice === 'rock') {
      if (computerChoice == 'scissors') {
        updateJudgment(true);
        return;
      } else {
        updateJudgment(false);
        return;
      }
    }

    if (playerChoice === 'paper') {
      if (computerChoice == 'rock') {
        updateJudgment(true);
        return;
      } else {
        updateJudgment(false);
        return;
      }
    }

    if (playerChoice === 'scissors') {
      if (computerChoice == 'paper') {
        updateJudgment(true);
        return;
      } else {
        updateJudgment(false);
        return;
      }
    }
  };

  startGame();
  playMatch();
};

game();