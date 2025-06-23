const express = require("express");
const Joi = require("joi");
const router = express.Router();

const posts = [
  { id: 1, name: "apple launches new phone" },
  { id: 2, name: "samsung launches new phone" },
  { id: 3, name: "google launches new phone" },
];

// get all posts
app.get("/api/posts", (req, res) => {
  res.send(posts);
});

// get post by id
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send("This course does not exist");
  } else {
    res.send(post);
  }
});

// post api for creating new post
app.post("/api/posts", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const post = {
    id: posts.length + 1,
    name: req.body.name,
  };
  posts.push(post);

  res.send(post);
});

// put api to update existing posts
app.put("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res
      .status(404)
      .send("The post you're trying to modify does not exists");
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  post.name = req.body.name;
  res.send(post);
});

// delete post api
app.delete("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    res.status(400).send("The post you're trying to delete does not exist");
    return;
  }
  const index = posts.indexOf(post);

  posts.splice(index, 1);

  res.send("Course has been deleted");
});
