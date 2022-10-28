export const commands = {
    run(){
        replay.addEventListener("click",window.location.reload())
    },
     saveData(name, nbTries) {
        localStorage.setItem(name, nbTries);
      },
    score(){
      
          var playersNames;
          const highscores = [];
          
            playersNames = Object.keys(localStorage);
            playersNames.forEach((element) => {
              let playerScore = JSON.parse(localStorage.getItem(element));
              highscores.push({ player: element, score: playerScore });
            });
            console.log(highscores);
            highscores.sort((a, b) => (a.score > b.score ? 1 : -1));
            console.log(highscores);
              
            return highscores;
          
    },
    displayListOfPlayers(listOfPlayer){
        let i = 0;
        let html = "";
        listOfPlayer.forEach((element) => {
            html += `<li>le nom du joueur est : ${element.player} et son score est ${element.score} `;
            i++;
          });
        return html;
    },
    resetScore(){
        localStorage.clear();
        window.location.reload();
    },
    searchScore(name){
        var highscores = this.score()
        let found = highscores.find((p)=> p.player == name);
        if (found){           
            return `le score est ${found.score}`
                            
        } else {
            return "ce joueur n'existe pas !"
        }
     
    }
}
