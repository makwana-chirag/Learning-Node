const express = require("express");
const Joi = require("joi");
const router = express.Router();
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

// get api to get all courses
router.get("/", (req, res) => {
  res.send(courses);
});

// get api to get course by id
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The Course does not exist");
  } else {
    res.send(course);
  }
});

// post api to create new course
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The Course you are trying to delete does not exist");
  const index = courses.indexOf(course);

  courses.splice(index, 1);

  res.send("Course has been deleted");
});

module.exports = router;
