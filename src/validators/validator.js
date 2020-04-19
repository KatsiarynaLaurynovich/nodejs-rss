const { check, param, validationResult } = require('express-validator');
const userValidationBody = () => {
  return [
    check('name', 'not exists').exists(),
    check('login', 'not exists').exists(),
    check('password', 'not exists').exists(),
    check('password', 'not length 8').isLength({ min: 8, max: 20 })
  ];
};

const boardValidationBody = () => {
  return [
    check('title', 'not exists').exists(),
    check('columns', 'not exists').exists()
  ];
};

const ValidationIdUuid = () => {
  return [param('id', 'not format UUID').isUUID()];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationBody,
  boardValidationBody,
  ValidationIdUuid,
  validate
};
