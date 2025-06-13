const express = require("express");
const Joi = require("joi");
const app = express();
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");

// console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgon enabled...");
}

app.use(logger);

const courses = [
  {
    id: 1,
    name: "Back End",
  },
  {
    id: 2,
    name: "Front End",
  },
  {
    id: 3,
    name: "Full Stack",
  },
];

// base rount
app.get("/", (req, res) => {
  res.send("Hello World");
});

// get api to get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// get api to get course by id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The Course does not exist");
  } else {
    res.send(course);
  }
});

// post api to create new course
app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
});

// put api to update existing course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The Course you are trying to modify does not exist");
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

// get api to get post by mutiple params and query
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The Course you are trying to delete does not exist");
  const index = courses.indexOf(course);

  courses.splice(index, 1);

  res.send("Course has been deleted");
});
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.post();
// app.put();
// app.delete();
