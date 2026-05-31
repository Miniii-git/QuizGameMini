const score = +JSON.parse(localStorage.getItem("score"));
const highScoresList = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreEle = document.getElementById("score");
const inputName = document.getElementById("inputName");
const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", saveScoreHandler);

scoreEle.innerText = score;

function saveScoreHandler() {
  if (!inputName.value || score == 0) {
    alert("Invalid username or score");
  } else {
    const gamerScore = {
      userName: inputName.value,
      score,
    };
    highScoresList.push(gamerScore);
    console.log(highScoresList);
    let highScoresListSorted = highScoresList.sort((a, b) => b.score - a.score); //**********
    highScoresListSorted.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScoresListSorted));
    console.log(localStorage.getItem("highScores"));
    inputName.value = "";
    scoreEle.innerText = null;
  }
}
