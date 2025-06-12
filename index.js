const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

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
    name: "CSS",
  },
];
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The Course does not exist");
  } else {
    res.send(course);
  }
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

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
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.post();
// app.put();
// app.delete();
