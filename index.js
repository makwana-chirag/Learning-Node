const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");

// console.log(process.env.NODE_ENV);

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

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.post();
// app.put();
// app.delete();
