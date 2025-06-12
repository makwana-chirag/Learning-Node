var _ = require("underscore");

const result = _.contains([1, 2, 3, 4, 5], 4);

module.export.add = function (a, b) {
  return a + b;
};

module.export.mutiply = function (a, b) {
  return a * b;
};

console.log("result", result);
