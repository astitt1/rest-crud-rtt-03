const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const users = require("./data/users");
const posts = require("./data/posts");

// // DOCS error handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(404).json({ error: `Resource not found` });
// });

//MIDDLEWARE
//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("Work in progress");
});

// GET all USERS
app.get("/api/users", (req, res) => {
  res.json(users);
});
// POST USER - create a new user

app.post("/api/users", (req, res) => {
  // Within the POST request route, we create a new
  // user with the data given by the client.
  // We should also do some more robust validation here,
  // but this is just an example for now.
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.username)) {
      res.json({ error: `Username already taken` });
      return;
    }

    const newUser = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(newUser);
    res.json(users[users.length - 1]);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

// GET USER by id
app.get("/api/users/:id", (req, res, next) => {
  try {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    next();
  } catch (error) {
    console.error(error);
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

// //The code above written as a catch-all route
// app.get('/*', (req, res)=>{
//     res.status(404);
//     res.json({ error: `Resource not found` });
// })

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
