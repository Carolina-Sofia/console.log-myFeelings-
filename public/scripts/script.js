const questions = [
  "What's the things you feel more grateful for today?",
  "What are you excited about tomorrow?",
  "How are you feeling today?",
];

const prompt = document.getElementById(prompt).textContent;
const button = document.getElementsByClassName(btn - primary);

function changePrompt() {
  console.log("changePrompt function was called");
  for (let i = 0; i < questions.length; i++) {
    prompt.textContent = questions[i];
  }
}

button.addEventListener("click", changePrompt);
