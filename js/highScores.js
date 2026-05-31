const highScoresList = JSON.parse(localStorage.getItem("highScores")) || [];
const scoreSection = document.getElementById("scoreSection");

highScoresList.forEach((player, index) => {
  console.log(player);
  scoreSection.innerHTML += `
  <li> 
    <span>${index + 1}</span> 
    <p>${player.userName}</p> 
    <span>${player.score}</span> 
  </li>
  `;
});
