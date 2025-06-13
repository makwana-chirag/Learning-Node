const log = (req, res, next) => {
  console.log("Logger...");
  next();
};

module.exports = log;
