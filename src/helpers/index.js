const { validationResult } = require('express-validator');

const validateResponce = async req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Error');
  }
};

module.exports = {
  validateResponce
};
