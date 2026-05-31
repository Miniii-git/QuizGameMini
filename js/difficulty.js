const buttonDifficulty = document.querySelectorAll(".difficulty");

buttonDifficulty.forEach((button) => {
  button.addEventListener("click", difficultyHandler);
  if (localStorage.getItem("difficulty") == button.innerText.toLowerCase()) {
    button.classList.add("choosed");
  }
});

function difficultyHandler(event) {
  const level = event.target.innerText.toLowerCase();
  localStorage.setItem("difficulty", level);

  buttonDifficulty.forEach((button) => {
    button.classList.remove("choosed");
    if (localStorage.getItem("difficulty") == level) {
      event.target.classList.add("choosed");
    }
  });
}
