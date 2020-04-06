const { body, param } = require('express-validator');

const boardIdValidation = () => {
  return [
    param('id')
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ];
};

const boardValidation = () => {
  return [
    body('title')
      .not()
      .isEmpty()
      .trim()
      .escape()
  ];
};

module.exports = {
  boardIdValidation,
  boardValidation
};
