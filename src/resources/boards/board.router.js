const router = require('express').Router();
const httpStatus = require('http-status-codes');
const taskRouter = require('../tasks/task.router.js');

const catchErrors = require('../../helpers/catch.errors');

const { ErrorHandler } = require('../../helpers/error.handler');
const { boardValidationBody, validate } = require('../../validators/validator');
const MESSAGES = require('./board.constants');

const boardRepository = require('./board.db.repository');
const taskRepository = require('../tasks/task.db.repository');
const Board = require('./board.model');
const BoardService = require('./board.service');
const boardsService = new BoardService(boardRepository, taskRepository);

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  return res.status(httpStatus.OK).json(boards.map(Board.toResponse));
});

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      return res.status(httpStatus.OK).json(Board.toResponse(board));
    }

    throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.NOT_FOUND);
  })
);

router.route('/:id').put(
  boardValidationBody(),
  validate,
  catchErrors(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);

    if (board) {
      return res.status(httpStatus.OK).json(Board.toResponse(board));
    }
    throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.UPDATE_ERROR);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.create(req.body);

    if (board) {
      return res.status(httpStatus.OK).json(Board.toResponse(board));
    }

    throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const result = await boardsService.remove(req.params.id);

    if (result) {
      return res.status(httpStatus.NO_CONTENT).json(MESSAGES.DELETE_SUCCESS);
    }

    throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.DELETE_ERROR);
  })
);

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

module.exports = router;
