// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// In-memory storage for the daily Q&A
let dailyEntries = [];

// --- ROUTES ---

// 1) Landing Page (title, description, "Let's Go" button)
app.get("/", (req, res) => {
  res.render("landing");
});

// 2) Questions Page
app.get("/questions", (req, res) => {
  res.render("questions", { dailyEntries });
});

// 3) Handle new question–answer submission
app.post("/answers", (req, res) => {
  const { question, answer } = req.body;
  const newEntry = {
    id: Date.now().toString(),
    question,
    answer,
  };
  dailyEntries.push(newEntry);

  // Return success to script.js
  res.json({ success: true });
});

// 4) Show single Q&A detail page (post.ejs)
app.get("/answers/:id", (req, res) => {
  const { id } = req.params;
  const entry = dailyEntries.find((item) => item.id === id);
  if (!entry) {
    return res.status(404).send("Entry not found");
  }
  res.render("post", { entry });
});

// 5) Update existing Q&A
app.post("/answers/:id", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  const entry = dailyEntries.find((item) => item.id === id);
  if (!entry) {
    return res.status(404).send("Entry not found");
  }
  entry.answer = answer;
  res.redirect(`/answers/${id}`);
});

// Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
