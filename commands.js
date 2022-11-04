import {replayView, formDifficultyView, formNameView, setImg, renderResult, inputName} from "./script.js"
import {config} from "./config.js";

export const commands = {
    run(){
        replayView.hide()
        formDifficultyView.display()
        setImg()
        renderResult.innerHTML = ''
    },
     saveData(name, score) {
         if (name === ""){
             return `<span class="alert">Entrer votre nom !</span>`
         } else if (name.length > config.maxCharUsername) {
             inputName.value = ''
             return `<span class="alert">Votre nom est trop long ! <br> Il ne doit pas dépasser ${config.maxCharUsername} caractères.</span>`
         } else {
             var highscores = this.score()
             let found = highscores.find((p)=> p.player == name);
             if (found){
                 return `<span class="warning">${name} est déjà pris</span>`

             } else {
                 let scoreEnd = Math.trunc(parseFloat(score));
                 localStorage.setItem(name, scoreEnd);
                 inputName.value = "";
                 formNameView.hide()
                 replayView.display()
                 return `<span class="success">Bien joué ${name} !</span>`
             }
         }
      },
    score(){
      
          var playersNames;
          const highscores = [];
          
            playersNames = Object.keys(localStorage);
            playersNames.forEach((element) => {
              let playerScore = JSON.parse(localStorage.getItem(element));
              highscores.push({ player: element, score: playerScore });
            });

            highscores.sort((a, b) => (a.score < b.score ? 1 : -1));
              
            return highscores;
          
    },
    displayListOfPlayers(listOfPlayer){
        if (listOfPlayer.length > 0){
            let html = "";
            listOfPlayer.forEach((element) => {
                html += `<tr>
                            <td class="list-score"> ${element.score}</td>
                            <td> points pour </td>
                            <td class="list-player">${element.player}</td>
                         </tr>`;
            });
            return html;
        }else {
            return `<span class="warning">Il n'y a aucun joueur enregistré pour le moment</span>`
        }

    },
    resetScore(){
        localStorage.clear();
        window.location.reload();
    },
    searchScore(name){
        var highscores = this.score()
        let found = highscores.find((p)=> p.player == name);
        if (found){           
            return `Le score de <span class="list-player">${name}</span> est <span class="list-score">${found.score}</span>`
                            
        } else {
            return `<span class="alert">Ce joueur n'existe pas !</span>`
        }
     
    }
}
