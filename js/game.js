import { formatData } from "./helper.js";
let difficulty = localStorage.getItem("difficulty") || "easy";
const CORRECT_BONUS = 10;
let URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;

let formattedData = null;
let checked = false;

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
//const answerList = document.getElementsByClassName("answer-text"); the output is an HTMLCollection [ you CAN NOT use forEach only for loop is allowd]
const answerList = document.querySelectorAll(".answer-text"); //the output is an NodeList [ you CAN use forEach ]
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");

const score = document.getElementById("score");

window.addEventListener("load", fetchData);
/*since this eventListener is written upper than the function fetchData 
we CAN NOT define the function as an array function, 
because we dont have hoisting for const and let, so we can 
1. write it as normal function or 
2 write all the eventListener at the bottom of our codes
 */
finishButton.addEventListener("click", finishHandler);
nextButton.addEventListener("click", nextQuestion);

answerList.forEach((button, index) => {
  //const handler = () => checkAnswer(event, index);
  //  button.addEventListener("click", handler);
  button.addEventListener("click", () => checkAnswer(event, index)); //chra rush khat keshide, khodesh input event dad beheshe
});

async function fetchData() {
  const response = await fetch(URL);
  const data = await response.json();
  formattedData = formatData(data.results);
  console.log(formattedData);
  start();
}

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
  showQuestion(0);
};

function showQuestion(i) {
  questionText.innerText = formattedData[i].question;
  // for (let g = 0; g < 4; g++) {
  //    answerList[g].innerText = formattedData[i].answers[g];
  // }

  answerList.forEach((button, g) => {
    button.innerText = formattedData[i].answers[g];
  });
  if (i == formattedData.length - 1) {
    nextButton.style.display = "none";
    const finalScore = score.innerText;
    localStorage.setItem("score", JSON.stringify(finalScore));
    nextButton.style.display = "none";
    return;
  }
}

function nextQuestion() {
  checked = false;
  questionNumber.innerText = +questionNumber.innerText + 1;
  let num = questionNumber.innerText - 1;
  showQuestion(num);
  answerList.forEach((answerbox) => {
    answerbox.classList.remove("correct", "incorrect");
    answerbox.style.pointerEvents = "auto"; //to re-enable the pointer
  });
}

function finishHandler() {
  setTimeout(() => {
    console.log("finish");
    const finalScore = score.innerText;
    localStorage.setItem("score", JSON.stringify(finalScore));
    window.location.assign("./end.html");
  }, 500);
}

// function checkAnswer(event) {
//   const selectedAnswer = event.target.innerText;
//   let num = questionNumber.innerText - 1;
//   const CA = formattedData[num].answers[formattedData[num].coorrectAnswerIndex];
//   console.log(CA);
//   if (selectedAnswer == CA) {
//     event.target.style.backgroundColor = "green";
//     score.innerText = +score.innerText + 10;
//   } else {
//     event.target.style.backgroundColor = "red";
//     answerList.forEach((answer) => {
//       if (answer.innerText == CA) {
//         answer.style.backgroundColor = "green";
//       }
//     });
//   }
//   console.log;
// }

function checkAnswer(event, selectedAnswerIndex) {
  if (checked) return;
  checked = true;
  answerList.forEach((answerbox) => {
    answerbox.style.pointerEvents = "none"; //vaghti pointer nabashe hover ham nemishe :)  btn.style.pointerEvents = 'none' is a simple and effective way to disable all mouse interactions, including :hover, :active, and clicks.
  });
  console.log(selectedAnswerIndex);
  const num = questionNumber.innerText - 1;
  const CAI = formattedData[num].coorrectAnswerIndex;
  console.log(num);
  console.log(CAI);
  if (selectedAnswerIndex == CAI) {
    score.innerText = +score.innerText + CORRECT_BONUS;
    event.target.classList.add("correct");
  } else {
    event.target.classList.add("incorrect");
    answerList[CAI].classList.add("correct");
  }
}
