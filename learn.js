const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<h1>Home Page</h1>");
  } else if (req.url === "/login") {
    res.write("<h1>Login Page</h1>");
  } else if (req.url === "/term") {
    res.write("<h1>Terms</h1>");
  }
  // res.setHeader("Content-Type", "application/json");
  // res.write(JSON.stringify([{ name: "chirag" }]));
  res.end();
});

const arg = process.argv;
console.log("arguments :", arg);
// Listing Port
server.listen(3500);
