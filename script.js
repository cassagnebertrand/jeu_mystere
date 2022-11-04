import {config, configDifficulty} from "./config.js";
import {commands} from "./commands.js";


const formNumber = document.querySelector("#form-number")
const textInfoNumber = document.querySelector("#text-info-number")
const validateNumber = document.querySelector("#valid-number")
const inputNumber = document.querySelector("#input-number")
const tableOfTryNumbers = document.querySelector("#table-of-try-numbers")

const formName = document.querySelector("#form-name")
const validateName = document.querySelector("#valid-name")
export const inputName = document.querySelector("#input-name")

const formDifficulty = document.querySelector("#form-difficulty")
const validateDifficulty = document.querySelector("#valid-difficulty")

export const renderResult = document.querySelector("#result")

const playerList = document.querySelector('.player-list');
const showPlayers = document.querySelector('#show-players');

const formReplay = document.querySelector('#form-replay')
const replay = document.querySelector('#replay');
const reset = document.querySelector('#reset-score');
const searchScore = document.querySelector('#search-score');
const validSearch = document.querySelector('#valid-search');
const scoreOfPlayer = document.querySelector('.scoreOfPlayer');


function tryOrTries(triesCounter){
    if(triesCounter===1){
        return "coup";
    } else {
        return "coups";
    }
}



function inputDifficulty() {
        var ele = document.getElementsByName('difficultyRadio');

        for(let i = 0; i < ele.length; i++) {
            if(ele[i].checked)
                return ele[i].value;
        }
}


export var triesCounter = 0;
export var score = 0;

score = 0

function initMysteryGame(maxNumberGen,maxTries){
   let randomInt =Math.floor(Math.random() * maxNumberGen);
   console.clear()
   console.log(`Pssst le nombre est: ${randomInt}.`);
   let latestInputs = [];
   textInfoNumber.innerHTML =`Entrer un nombre entre 1 et ${maxNumberGen} <br> Vous avez ${maxTries} essais`;
   return (rawInputInt) => {
       let arrayRenderLastestInputs = ''
       latestInputs.forEach(numberTry =>{
           arrayRenderLastestInputs += `<tr><td>${numberTry}</td></tr>`;
       })
       textInfoNumber.innerHTML =`Entrer un nombre entre 1 et ${maxNumberGen} <br> Vous avez ${maxTries-triesCounter} essais restants`;
       let inputInt = parseInt(rawInputInt, 10);
       if (isNaN(inputInt)) {
           return `<span class="alert">Il faut entrer un nombre entier !</span>`;
       }else {
           if(inputInt<1 || inputInt>maxNumberGen){
               return `<span class="alert">Le nombre entré doit être compris entre 1 et ${maxNumberGen}.</span>`
           }else if(latestInputs.includes(inputInt)){
               return `<span class="alert">Tu as deja essayer ${inputInt} !</span>`
           }else if (inputInt === randomInt){
               triesCounter += 1;
               initConfetti();
               renderConfetti();
               setImg('cat-flower')
               formNumberView.hide()
               inputNumber.value = "";
               formNameView.display()
               score = (config.maxScoreRegistered/triesCounter)*selectedDifficultyInfo.scoreMultiplicator;
               tableOfTryNumbers.innerHTML = ''
               return `<span class="success">Bravo! Tu as réussie en ${triesCounter} ${tryOrTries(triesCounter)}.</span>`;
           }else if (inputInt > randomInt){
               triesCounter += 1;
               latestInputs.push(inputInt);
               tableOfTryNumbers.innerHTML = arrayRenderLastestInputs + `<tr><td>${inputInt}</td></tr>`;
               if (maxTries <= triesCounter){
                   formNumberView.hide()
                   inputNumber.value = "";
                   replayView.display()
                   initRandomNumber = initMysteryGame(selectedDifficultyInfo.maxNumberGen,selectedDifficultyInfo.maxTries);
                   tableOfTryNumbers.innerHTML = ''
                   return `<span class="alert">Dommage ! C'était le dernier essai.</span>`
               }else {
                   textInfoNumber.innerHTML =`Entrer un nombre entre 1 et ${maxNumberGen} <br> Vous avez ${maxTries-triesCounter} essais restants`;
                   return `<span class="warning">C'est moins! Ça fait ${triesCounter} ${tryOrTries(triesCounter)}.</span>`;
               }
           }else if (inputInt < randomInt){
               triesCounter += 1;
               latestInputs.push(inputInt);
               tableOfTryNumbers.innerHTML = arrayRenderLastestInputs + `<tr><td>${inputInt}</td></tr>`;
               if (maxTries <= triesCounter){
                   formNumberView.hide()
                   inputNumber.value = "";
                   replayView.display()
                   initRandomNumber = initMysteryGame(selectedDifficultyInfo.maxNumberGen,selectedDifficultyInfo.maxTries);latestInputs = []
                   tableOfTryNumbers.innerHTML = ''
                   return `<span class="alert">Dommage ! C'était le dernier essai.</span>`
               }else {
                   textInfoNumber.innerHTML =`Entrer un nombre entre 1 et ${maxNumberGen} <br> Vous avez ${maxTries-triesCounter} essais restants`;
                   return `<span class="warning">C'est plus! Ça fait ${triesCounter} ${tryOrTries(triesCounter)}.</span>`;
               }
           }else {
               return `<span class="alert">Il faut entrer un nombre entier !</span>`
           }
       }
   }
}


let initRandomNumber = () => {}

const formNumberView = {
    validate() {
        renderResult.innerHTML = initRandomNumber(inputNumber.value);
    },
    hide(){
        formNumber.classList.add("hide");
    },
    display(){
        formNumber.classList.remove("hide");
    }
}
export const formNameView = {
    validate() {
        renderResult.innerHTML = commands.saveData(inputName.value, score)
    },
    hide(){
        formName.classList.add("hide");
    },
    display(){
        formName.classList.remove("hide");
    }
}

const listOfPlayersView = {
    validate() {
        playerList.innerHTML = '';
        playerList.innerHTML = commands.displayListOfPlayers(commands.score());
    },
    hide() {
        showPlayers.classList.add('hide');
    },
    display() {
        showPlayers.classList.remove('hide');
    },
};

const ScoreView = {
    validate() {
        scoreOfPlayer.innerHTML = '';
        scoreOfPlayer.innerHTML = commands.searchScore(searchScore.value);
    },
    hide() {
        showPlayers.classList.add('hide');
    },
    display() {
        showPlayers.classList.remove('hide');
    },
}

export const replayView = {
    validate() {
        commands.run();
        score = 0;
        triesCounter = 0;
    },
    hide() {
        formReplay.classList.add('hide');
    },
    display() {
        formReplay.classList.remove('hide');
    },
}

var selectedDifficultyInfo = {
    scoreMultiplicator: configDifficulty.scoreMultiplicatorEseay,
    maxNumberGen: configDifficulty.initEasy.maxNumberGen,
    maxTries: configDifficulty.initEasy.maxTries
};
export const formDifficultyView = {
    validate() {
        selectedDifficultyInfo = selectedDifficultyInit(inputDifficulty());
        initRandomNumber = initMysteryGame(selectedDifficultyInfo.maxNumberGen,selectedDifficultyInfo.maxTries);
        formDifficultyView.hide()
        formNumberView.display()
    },
    hide(){
        formDifficulty.classList.add("hide");
    },
    display(){
        formDifficulty.classList.remove("hide");
    }
}


function selectedDifficultyInit(selectedDifficulty){
    if (selectedDifficulty==difficultyChoice.easy){
        return {
            scoreMultiplicator: configDifficulty.scoreMultiplicatorEseay,
            maxNumberGen: configDifficulty.initEasy.maxNumberGen,
            maxTries: configDifficulty.initEasy.maxTries
        };
    }else if (selectedDifficulty==difficultyChoice.medium){
        return {
            scoreMultiplicator: configDifficulty.scoreMultiplicatorMedium,
            maxNumberGen: configDifficulty.initMedium.maxNumberGen,
            maxTries: configDifficulty.initMedium.maxTries
        };
    }else if (selectedDifficulty==difficultyChoice.hard){
        return {
            scoreMultiplicator: configDifficulty.scoreMultiplicatorHard,
            maxNumberGen: configDifficulty.initHard.maxNumberGen,
            maxTries: configDifficulty.initHard.maxTries
        };
    }else {
        return {
            scoreMultiplicator: configDifficulty.scoreMultiplicatorEseay,
            maxNumberGen: configDifficulty.initEasy.maxNumberGen,
            maxTries: configDifficulty.initEasy.maxTries
        };
    }
}
const difficultyChoice = {
    easy: 1,
    medium: 2,
    hard: 3,
}

const main = {
    init() {
        validateNumber.addEventListener("click", formNumberView.validate)
        validateName.addEventListener("click", formNameView.validate)
        validateDifficulty.addEventListener("click", formDifficultyView.validate)

        showPlayers.addEventListener('click', listOfPlayersView.validate);
        replay.addEventListener('click',replayView.validate);
        reset.addEventListener('click',commands.resetScore);
        validSearch.addEventListener('click',ScoreView.validate);
    }
}

export function setImg(imgFileName=null) {
    if (imgFileName==null){
        document.querySelector("#img-cat").setAttribute("src", "")

    }else {
        document.querySelector("#img-cat").setAttribute("src", "assets/img/" + imgFileName + ".png")
    }

}

window.addEventListener("load", main.init)





















//-----------Var Inits--------------
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

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
    { front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
let resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
};

let randomRange = (min, max) => Math.random() * (max - min) + min;

let initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            color: colors[Math.floor(randomRange(0, colors.length))],
            dimensions: {
                x: randomRange(10, 20),
                y: randomRange(10, 30) },

            position: {
                x: randomRange(0, canvas.width),
                y: canvas.height - 1 },

            rotation: randomRange(0, 2 * Math.PI),
            scale: {
                x: 1,
                y: 1 },

            velocity: {
                x: randomRange(-25, 25),
                y: randomRange(0, -50) } });


    }
};

//---------Render-----------
let renderConfetti = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
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
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        // Draw confetti
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });



    window.requestAnimationFrame(renderConfetti);
};


//----------Resize----------
window.addEventListener('resize', function () {
    resizeCanvas();
});

