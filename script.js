const InputNumber = document.querySelector('#input-number');
const validateNumber = document.querySelector('#valid-number');
const formNumber = document.querySelector('#form-number');

const InputName = document.querySelector('#input-name');
const validateName = document.querySelector('#valid-name');
const formName = document.querySelector('#form-name');

const renderResult = document.querySelector('#result');
const playerList = document.querySelector('.player-list');
const showPlayers = document.querySelector('#show-players');
var triesCounter = 0;
var compt = 0;
function randomNumberGen(max) {
  let randomInt = Math.floor(Math.random() * max + 1);
  console.log(`Pssst le nombre est: ${randomInt}.`);

  return (rawInputInt) => {
    let inputInt = parseInt(rawInputInt, 10);

    if (isNaN(inputInt)) {
      return `Il faut entrer un nombre entier !`;
    } else {
      if (inputInt < 1 || inputInt > max) {
        return `Le nombre entré doit être compris entre 1 et ${max}.`;
      } else if (inputInt == randomInt) {
        compt = compt + 1;
        initConfetti();
        render();
        formNumberView.hide();
        InputNumber.value = '';
        formNameView.display();
        return `Bravo! Tu as réussie en ${compt} coups.`;
      } else if (inputInt > randomInt) {
        compt = compt + 1;
        return `C'est moins! Ça fait ${compt} coups.`;
      } else if (inputInt < randomInt) {
        compt = compt + 1;
        return `C'est plus! Ça fait ${compt} coups.`;
      } else {
        return `Il faut entrer un nombre entier !`;
      }
    }
  };
}
function saveData(name, nbTries) {
  localStorage.setItem(name, nbTries);
}
var playersNames;
var playersScores = [];
const highscores = [];
function getData() {
  let html = '';

  playersNames = Object.keys(localStorage);
  playersNames.forEach((element) => {
    let playerScore = JSON.parse(localStorage.getItem(element));
    // playersScores.push(playerScore);
    highscores.push({ player: element, score: playerScore });
  });
  console.log(highscores);
  highscores.sort((a, b) => (a.score > b.score ? 1 : -1));
  console.log(highscores);

  let i = 0;
  highscores.forEach((element) => {
    html += `<li>le nom du joueur est : ${element.player} et son score est ${element.score} `;
    i++;
  });
  return html;
}

let initRandomNumber = randomNumberGen(99);

const formNumberView = {
  validate() {
    renderResult.innerHTML = initRandomNumber(InputNumber.value);
  },
  hide() {
    formNumber.classList.add('hide');
  },
  display() {
    formNumber.classList.remove('hide');
  },
};
const formNameView = {
  validate() {
    saveData(InputName.value, compt);
    formNameView.hide();
    initRandomNumber = randomNumberGen(99);
    InputName.value = '';
    formNumberView.display();
    renderResult.innerHTML = '';
    compt = 0;
  },
  hide() {
    formName.classList.add('hide');
  },
  display() {
    formName.classList.remove('hide');
  },
};
const listOfPlayersView = {
  validate() {
    playerList.innerHTML = '';
    playerList.innerHTML = getData();
  },
  hide() {
    showPlayers.classList.add('hide');
  },
  display() {
    showPlayers.classList.remove('hide');
  },
};
const main = {
  init() {
    validateNumber.addEventListener(
      'click',

      formNumberView.validate
    );
    validateName.addEventListener('click', formNameView.validate);
    showPlayers.addEventListener('click', listOfPlayersView.validate);
  },
};

window.addEventListener('load', main.init);

//-----------Var Inits--------------
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front: 'red', back: 'darkred' },
  { front: 'green', back: 'darkgreen' },
  { front: 'blue', back: 'darkblue' },
  { front: 'yellow', back: 'darkyellow' },
  { front: 'orange', back: 'darkorange' },
  { front: 'pink', back: 'darkpink' },
  { front: 'purple', back: 'darkpurple' },
  { front: 'turquoise', back: 'darkturquoise' },
];

//-----------Functions--------------
resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30),
      },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1,
      },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    });
  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(
      confetto.velocity.y + gravity,
      terminalVelocity
    );
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle =
      confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  window.requestAnimationFrame(render);
};

//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});
