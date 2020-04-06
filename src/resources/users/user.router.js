const router = require('express').Router();
const userController = require('./user.controller');
const {
  userRequestValidation,
  userIdValidation
} = require('../../validators/user.validator');

router
  .get('/', userController.getAll)
  .post('/', userRequestValidation(), userController.create);

router
  .get('/:id', userIdValidation(), userController.getById)
  .put(
    '/:id',
    [...userIdValidation(), ...userRequestValidation()],
    userController.update
  )
  .delete('/:id', userIdValidation(), userController.remove);

module.exports = router;
