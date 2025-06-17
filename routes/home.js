const express = require("express");
const router = express.Router();

// base rount
router.get("/", (req, res) => {
  // res.send("Hello World");
  res.render("index", { title: "My Express App", message: "Wow" });
});

module.exports = router;
