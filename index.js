const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const mongoose = require("mongoose");
const app = express();
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");

// console.log(process.env.NODE_ENV);
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Cloud not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Node.js Course",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log("🚀 ~ result:", result);
};

const getCourses = async () => {
  // 1 : indicate ascending 
  // 2 : indicate descending
  // below is query for limit of number of result,sorting in ascending order with returning only selected two values per object
  const courses = await Course.find({isPublished:true, author:"Mosh"}).limit(2).sort({name:1}).select({name:1, tags:1});
  console.log("courses", courses);
};

getCourses();
// createCourse();
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgon enabled...");
}

dbDebugger("connecting to database");
app.use(logger);

app.use("/api/courses", courses);
app.use("/", home);

// get api to get post by mutiple params and query
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

// get api for another mutiple params and query
app.get("/api/course/:name/:tag", (req, res) => {
  res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.post();
// app.put();
// app.delete();
