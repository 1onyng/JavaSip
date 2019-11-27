const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.comment = validText(data.comment) ? data.comment : "";
 
  if (!validNumber(data.rate, 1, 5)) {
    errors.rate = "rate must be number between 1 and 5";
  }

  if (Validator.isEmpty(data.comment)) {
    errors.rate = "comment field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
