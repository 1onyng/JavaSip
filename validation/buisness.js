const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateBuisnessInput(data) {
  let errors = {};

  data.buisness_name = validText(data.buisness_name) ? data.buisness_name : '';

  if (!Validator.isLength(data.buisness_name, { min: 2, max: 20 })) {
    errors.buisness_name = 'Buisness name must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.buisness_name)) {
    errors.buisness_name = 'Buisness name field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};