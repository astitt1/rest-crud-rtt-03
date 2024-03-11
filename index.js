const express = require("express");
const app = express();
const port = 5000;

const users = require("./data/users");
const posts = require("./data/posts");

// // DOCS error handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(404).json({ error: `Resource not found` });
// });

app.get("/", (req, res) => {
  res.send("Work in progress");
});

// GET all USERS
app.get("/api/users", (req, res) => {
  res.json(users);
});
// POST USER
// GET USER by id
app.get("/api/users/:id", (req, res, next) => {
  try {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    next()
  } catch (error) {
    console.error(error)
  }
});
// PATCH/PUT USER by id
// DELETE user

//GET all Posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

//GET Post by id
app.get("/api/posts/:id", (req, res, next) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) res.json(post);
  else next();
});

//Lesson error handling middleware
app.use((req, res) => {
    res.status(404);
    res.json({ error: `Resource not found` });
  });

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
