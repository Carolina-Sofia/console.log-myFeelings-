// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// In-memory storage for posts
let posts = [];

// Routes

// Home Route - Display all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Create Post Form
app.get("/create", (req, res) => {
  res.render("create");
});

// Handle Post Creation
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
  };
  posts.push(newPost);
  res.redirect("/");
});

// View Single Post
app.get("/post/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    res.render("post", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Edit Post Form
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Handle Post Update
app.post("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    const { title, content } = req.body;
    post.title = title;
    post.content = content;
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

// Handle Post Deletion
app.post("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
