const router = require('express').Router();
const boardController = require('./board.controller');
const {
  boardIdValidation,
  boardValidation
} = require('../../validators/board.validator');

router
  .get('/', boardController.getAll)
  .post('/', [...boardValidation()], boardController.create);

router
  .get('/:id', boardIdValidation(), boardController.getById)
  .put(
    '/:id',
    [...boardIdValidation(), ...boardValidation()],
    boardController.update
  )
  .delete('/:id', boardIdValidation(), boardController.remove);

module.exports = router;
