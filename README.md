# console.log(myFeelings

A simple journaling web app built with Node.js, Express, and EJS.  
[**Live Demo** on Render](https://console-log-myfeelings.onrender.com/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Future Improvements](#future-improvements)

---

## Overview

**console.log(myFeelings)** is a small journaling app that allows you to:

- Create short “entries” that include a question and an answer (like a personal Q&A).
- View previously submitted entries during a single session.
- Update or edit existing entries.

It is primarily a **learning exercise** to explore the fundamentals of Node.js, Express, and EJS templating. Data in this application is stored in the user’s **session**—so once the server restarts or the session ends, your data is lost. This approach is fine for demonstrations, but not intended for production use.

---

## Features

- **Landing Page**: Introductory page with a button to begin.
- **Question Submission**: Form to submit a new question and answer pair.
- **View Entries**: See all submitted entries for your current session.
- **Edit Entries**: Update the answer of an existing entry.
- **Session-Based Storage**: Keeps data in your session for the duration of your visit.

---

## Tech Stack

- **Node.js**: JavaScript runtime for the server.
- **Express**: Web framework for routing and middleware.
- **EJS**: Template engine for rendering server-side HTML.
- **express-session**: Manages session data for each user.
- **HTML/CSS/JS**: Frontend structure, styling, and interactivity.

---

## Project Structure
console-log-myfeelings/
├── public/
│   ├── css/
│   │   └── styles.css         # Basic CSS for styling
│   └── js/
│       └── script.js          # Client-side JavaScript for fetch calls, etc.
├── views/
│   ├── landing.ejs            # Landing page template
│   ├── questions.ejs          # Page displaying existing entries & form
│   └── post.ejs               # Single Q&A detail page
├── server.js                  # Main application server
├── package.json               # Project metadata and scripts
└── README.md                  # Project documentation

---

## How It Works

### Landing Page
A simple introduction (title, description, and a “Let’s Go” button).

### Session Initialization
On each visit, Express sets up a new session (if one does not already exist).

### Questions Page
- When you visit `/questions`, the server checks if your session has a `dailyEntries` array.
- If not, it initializes an empty array.
- It then renders `questions.ejs`, passing the current entries in your session for display.

### Submitting a New Q&A
- Submissions to `/answers` include a question and answer.
- A unique ID is generated for each entry using `Date.now()`.

### Viewing a Single Q&A
- Accessing `/answers/:id` looks up the specific entry in the session by ID.
- If found, `post.ejs` is rendered to show full details.

### Editing an Existing Q&A
- Submitting a `POST` request to `/answers/:id` updates that entry’s answer.
- The user is then redirected back to `/answers/:id` to see the changes.

### Session Duration
All data is lost upon session expiration or server restart (since it’s stored in memory and not in a database).

---

## Future Improvements

- **Database Integration**: Persist entries in a real database (e.g., MongoDB, PostgreSQL) so they survive server restarts.
- **User Authentication**: Allow users to create accounts and securely store their entries.
- **Styling & Layout**: Improve the design and add responsiveness for mobile devices.
- **Validation**: Add server-side validation to ensure questions/answers are not empty.
- **Error Handling**: Provide more user-friendly error messages if something goes wrong.
