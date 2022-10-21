let randomNumber = Math.floor(Math.random() * 99) + 1;
var nbTries = 0;
let scores = [];
let names = [];
var i = 0;
function findNumber() {
  let x = document.getElementById('numb').value;
  let text = '';
  let errorText;
  if (typeof x !== 'number') {
    errorText = 'you should try with a number not a ' + typeof x + '!';
  } else {
    if (x > randomNumber) {
      nbTries = nbTries + 1;
      text = 'try again with a lesser number';
    } else if (x < randomNumber) {
      nbTries = nbTries + 1;
      text = 'try again with a bigger number';
    } else {
      text = 'Congratulations you did it in ' + nbTries + ' tries!';
      // scores.push(nbTries);
      // console.log(scores);

      localStorage.setItem('listOfScores', nbTries);
    }
  }
  if (text != '') {
    document.getElementById('demo').innerHTML = text;
  } else document.getElementById('errorText').innerHTML = errorText;
}
function saveName() {
  localStorage.setItem(
    'listOfNames',
    JSON.stringify(document.getElementById('name').value)
  );
  //   names.push(document.getElementById('name').value);
  //   console.log(names);
  document.getElementById('formName').style.display = 'none';
}
let score = JSON.parse(localStorage.getItem('listOfScores'));
scores.push(score);
let naame = JSON.parse(localStorage.getItem('listOfNames'));
names.push(naame);
console.log(names);
console.log(scores);
