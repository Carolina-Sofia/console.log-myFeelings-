const questions = [
  "What’s something small that brought you joy today?",
  "If today had a theme song, what would it be?",
  "What’s a simple moment from today you’d like to remember?",
  "Who made your day a little better, and why?",
  "What’s one thing your past self would be proud of today?",
  "What’s a small but meaningful victory you had today?",
  "What’s one thing you appreciate about yourself right now?",
  "If today was a book, what would the title be?",
  "What’s a challenge you faced today, and how did you handle it?",
  "What was the best thing you ate today?",
  "What’s one thing you saw today that made you pause and appreciate life?",
  "What’s something you feel grateful for in this exact moment?",
  "If you could bottle the feeling of today, what would it taste like?",
  "What’s one sensation (smell, sound, texture) you really noticed today?",
  "What’s something you did today that made you feel truly present?",
  "If you had to describe today’s energy in one word, what would it be?",
  "What’s a kind thought you had about yourself today?",
  "What’s something you can let go of before tomorrow?",
  "How did you take care of yourself today?",
  "What’s a comforting or familiar thing that grounded you today?",
  "If you had a reset button for today, would you press it? Why or why not?",
  "If your emotions today were a weather forecast, what would it be?",
  "If you could relive one moment from today, what would it be?",
  "Imagine a future version of yourself—what advice would they give you right now?",
  "If you could send your worries to the moon tonight, what would you send?",
  "If today was a dream, what would be its weirdest or most magical detail?",
  "If your mood was a color palette today, what colors would it include?",
  "What’s one thing you did today that your childhood self would love?",
  "If you could give today’s version of you a hug, what would you say?",
  "What’s one thing you’d love to dream about tonight?",
  "What’s something you’re looking forward to tomorrow?",
  "What’s one act of kindness you witnessed or did today?",
  "If you had an extra hour today, how would you spend it?",
  "What’s one thing you wish you had more time for?",
  "What’s something new you learned or realized today?",
  "How would you describe your current mindset in three words?",
  "What’s one thing that surprised you about today?",
  "What’s something you did today that felt effortless?",
  "If today was a lesson, what did it teach you?",
  "What’s something you did today that made you feel creative?",
  "What’s one thing you can forgive yourself for today?",
  "If you could write a letter to yourself one year from now, what would it say?",
  "What’s a simple pleasure you fully enjoyed today?",
  "What’s something you let go of today, even if just a little?",
  "What’s one habit you’d like to build starting tomorrow?",
  "If you could spend today with any fictional character, who would it be?",
  "What’s a thought or idea that stuck with you today?",
  "If today had a scent, what would it be?",
  "What’s something you’d tell a friend if they had the same kind of day as you?",
  "What’s a dream or goal that excites you right now?",
];

// DOM elements
const promptElement = document.getElementById("prompt");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submitButton");

let usedIndices = JSON.parse(localStorage.getItem("usedIndices")) || [];

// --- New day check ---
// (Removes previous data if day changed)
const today = new Date().toDateString();
const storedDate = localStorage.getItem("qnaDate");
if (storedDate !== today) {
  localStorage.removeItem("questionCount");
  localStorage.removeItem("usedIndices");
  localStorage.setItem("qnaDate", today);
  usedIndices = []; // reset after clearing
}

// Helper to get a random unused index
function getRandomUnusedIndex() {
  let index;
  do {
    index = Math.floor(Math.random() * questions.length);
  } while (
    usedIndices.includes(index) &&
    usedIndices.length < questions.length
  );

  return index;
}

const newIndex = getRandomUnusedIndex();
promptElement.textContent = questions[newIndex];

// When the user clicks "Submit"
submitButton.addEventListener("click", async () => {
  const currentQuestion = promptElement.textContent.trim();
  const userAnswer = answerElement.value.trim();

  if (!userAnswer) {
    alert("Please write something before submitting!");
    return;
  }

  // Post the question & answer to the server
  try {
    await fetch("/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: currentQuestion, answer: userAnswer }),
    });

    // Mark this question's index as used
    const indexUsed = questions.indexOf(currentQuestion);
    if (indexUsed !== -1 && !usedIndices.includes(indexUsed)) {
      usedIndices.push(indexUsed);
      localStorage.setItem("usedIndices", JSON.stringify(usedIndices));
    }

    // Reload the page so that EJS re-renders the left column with the new Q&A
    window.location.reload();
  } catch (err) {
    console.error("Error saving data:", err);
    alert("There was an error saving your answer. Please try again.");
  }
});
