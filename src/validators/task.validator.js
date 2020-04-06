const { body, param } = require('express-validator');

const taskIdValidation = () => {
  return [
    param('id')
      .not()
      .isEmpty()
      .trim()
      .escape()
  ];
};

const boardIdValidation = () => {
  return [
    param('boardId')
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ];
};

const taskValidation = () => {
  return [
    body('title')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('order')
      .optional()
      .isInt(),
    body('title')
      .optional()
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body(['userId', 'columnId'])
      .optional()
      .trim()
      .escape()
  ];
};

module.exports = {
  taskIdValidation,
  boardIdValidation,
  taskValidation
};
