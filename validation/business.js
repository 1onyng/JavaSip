const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateBusinessInput(data) {
  let errors = {};

  data.business_name = validText(data.business_name) ? data.business_name : '';

  if (!Validator.isLength(data.business_name, { min: 2, max: 20 })) {
    errors.business_name = 'Business name must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.business_name)) {
    errors.business_name = 'Business name field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};