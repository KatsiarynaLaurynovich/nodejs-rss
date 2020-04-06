const { body, param } = require('express-validator');

const userIdValidation = () => {
  return [
    param('id')
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ];
};

const userRequestValidation = () => {
  return [
    body(['name', 'login'])
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('password')
      .isLength({ min: 5 })
      .trim()
      .escape()
  ];
};

module.exports = {
  userIdValidation,
  userRequestValidation
};
