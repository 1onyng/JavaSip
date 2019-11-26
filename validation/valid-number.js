const validNumber = (num, min, max) => {
  if(isNaN(num) || num < min || num > max || (num % 1 != 0)){
    return false
  }
  return true
};

module.exports = validNumber;