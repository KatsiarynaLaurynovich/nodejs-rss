const router = require('express').Router();
const {
  taskIdValidation,
  taskValidation,
  boardIdValidation
} = require('./task.validator');

const taskController = require('./task.controller');

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
