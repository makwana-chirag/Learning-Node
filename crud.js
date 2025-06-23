const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

// base api
app.get("/", (req, res) => {
  res.send("Hello You can see the new post everyday");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
