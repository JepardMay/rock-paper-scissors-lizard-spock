const PICKING_TIMEOUT = 1000;
const RESULT_TIMEOUT = 700;

const scoreEl = document.querySelector('.score__num');
const stageOne = document.querySelector('.gameboard__stage-1');
const stageTwo = document.querySelector('.gameboard__stage-2');
const gameBtns = stageOne.querySelectorAll('.gameboard__element');
const chosenElement = stageTwo.querySelector('.gameboard__block--player .gameboard__element');
const computerElement = stageTwo.querySelector('.gameboard__block--house .gameboard__element');
const resultBlock = document.querySelector('.gameboard__result');
const restartBtn = document.querySelector('#restart-btn');

let score = localStorage.getItem('score') !== null ? localStorage.getItem('score') : 0;
scoreEl.textContent = score;

const isExtended = document.querySelector('.gameboard--extended') ? true : false;
const classes = isExtended ? ['rock', 'paper', 'scissors', 'lizard', 'spock'] : ['rock', 'paper', 'scissors'];

const restartGame = () => {
  stageOne.classList.remove('display-none');
  stageTwo.classList.add('display-none');
  resultBlock.classList.add('gameboard__result--hidden');
  chosenElement.className = 'gameboard__element';
  chosenElement.removeAttribute('data-type');
  chosenElement.innerHTML = '';
  computerElement.className = 'gameboard__element';
  computerElement.removeAttribute('data-type');
  computerElement.innerHTML = '';
};

const chooseIcon = (type) => {
  switch (type) {
    case 'paper':
      return `<svg width="49" height="59" aria-hidden="true">
        <use xlink:href="img/sprite_auto.svg#icon-paper"></use>
      </svg>`;
    case 'scissors':
      return `<svg width="51" height="58" aria-hidden="true">
        <use xlink:href="img/sprite_auto.svg#icon-scissors"></use>
      </svg>`;
    case 'rock':
      return `<svg width="48" height="58" aria-hidden="true">
        <use xlink:href="img/sprite_auto.svg#icon-rock"></use>
      </svg>`;
    case 'lizard':
      return `<svg width="63" height="60" aria-hidden="true">
        <use xlink:href="img/sprite_auto.svg#icon-lizard"></use>
      </svg>`;
    case 'spock':
      return `<svg width="45" height="59" aria-hidden="true">
        <use xlink:href="img/sprite_auto.svg#icon-spock"></use>
      </svg>`;
    default:
      break;
  }
};

const chooseWinner = (playerPicked, housePicked) => {
  console.log(playerPicked, housePicked);
  const resultText = resultBlock.querySelector('.gameboard__text');

  const win = () => {
    score++;
    scoreEl.textContent = score;
    chosenElement.classList.add('gameboard__element--win');
    resultText.textContent = 'You win';
  };

  const lose = () => {
    score--;
    scoreEl.textContent = score;
    computerElement.classList.add('gameboard__element--win');
    resultText.textContent = 'You lose';
  };

  if (playerPicked === housePicked) {
    resultText.textContent = "It's a Tie";
  } else if (playerPicked === 'rock' && (housePicked === 'scissors' || housePicked === 'lizard')) {
    win();
  } else if (playerPicked === 'paper' && (housePicked === 'rock' || housePicked === 'spock')) {
    win();
  } else if (playerPicked === 'scissors' && (housePicked === 'paper' || housePicked === 'lizard')) {
    win();
  } else if (playerPicked === 'lizard' && (housePicked === 'paper' || housePicked === 'spock')) {
    win();
  } else if (playerPicked === 'spock' && (housePicked === 'rock' || housePicked === 'scissors')) {
    win();
  } else if (playerPicked === 'rock' && (housePicked === 'paper' || housePicked === 'spock')) {
    lose();
  } else if (playerPicked === 'paper' && (housePicked === 'scissors' || housePicked === 'lizard')) {
    lose();
  } else if (playerPicked === 'scissors' && (housePicked === 'rock' || housePicked === 'spock')) {
    lose();
  } else if (playerPicked === 'lizard' && (housePicked === 'scissors' || housePicked === 'rock')) {
    lose();
  } else if (playerPicked === 'spock' && (housePicked === 'paper' || housePicked === 'lizard')) {
    lose();
  }
};

const showResult = () => {
  chooseWinner(chosenElement.getAttribute('data-type'), computerElement.getAttribute('data-type'));

  localStorage.setItem('score', score);
  resultBlock.classList.remove('gameboard__result--hidden');
};

const initGame = () => {
  gameBtns.forEach((gameBtn) => {
    gameBtn.addEventListener('click', () => {
      const type = gameBtn.getAttribute('data-type');
      chosenElement.className = `gameboard__element gameboard__element--${type}`;
      chosenElement.setAttribute('data-type', type);
      chosenElement.innerHTML = chooseIcon(type);

      stageOne.classList.add('display-none');
      stageTwo.classList.remove('display-none');

      computerElement.className = isExtended ? 'gameboard__element gameboard__element--animate-extended' : 'gameboard__element gameboard__element--animate';

      setTimeout(() => {
        let randomNum = Math.floor(Math.random() * classes.length);
        computerElement.className = `gameboard__element gameboard__element--${classes[randomNum]}`;
        computerElement.setAttribute('data-type', classes[randomNum]);
        computerElement.innerHTML = chooseIcon(classes[randomNum]);

        setTimeout(() => {
          showResult();
        }, RESULT_TIMEOUT);
      }, PICKING_TIMEOUT);
    });
  });

  restartBtn.addEventListener('click', restartGame);
};

export { initGame };
