const router = require('express').Router({ mergeParams: true });
const taskController = require('./task.controller');
const {
  taskIdValidation,
  taskValidation,
  boardIdValidation
} = require('../../validators/task.validator');

router
  .get('/', taskController.getAll)
  .post(
    '/',
    [...boardIdValidation(), ...taskValidation()],
    taskController.create
  );

router
  .get(
    '/:id',
    [...boardIdValidation(), ...taskIdValidation()],
    taskController.getById
  )
  .put(
    '/:id',
    [...boardIdValidation(), ...taskIdValidation(), ...taskValidation()],
    taskController.update
  )
  .delete(
    '/:id',
    [...boardIdValidation(), ...taskIdValidation()],
    taskController.remove
  );

module.exports = router;
