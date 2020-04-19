const httpStatus = require('http-status-codes');
const MESSAGES = require('./board.constants');

const { ErrorHandler } = require('../../helpers/error.handler');
const catchErrors = require('../../helpers/catch.errors');

const boardRepository = require('./board.db.repository');
const taskRepository = require('../tasks/task.db.repository');
const Board = require('./board.model');
const BoardService = require('./board.service');
const boardsService = new BoardService(boardRepository, taskRepository);

const getAll = catchErrors(async (req, res) => {
  const boards = await boardsService.getAll();
  return res.status(httpStatus.OK).json(boards.map(Board.toResponse));
});

const getById = catchErrors(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (board) {
    return res.status(httpStatus.OK).json(Board.toResponse(board));
  }

  throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.NOT_FOUND);
});

const create = catchErrors(async (req, res) => {
  const board = await boardsService.create(req.body);

  if (board) {
    return res.status(httpStatus.OK).json(Board.toResponse(board));
  }

  throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
});

const update = catchErrors(async (req, res) => {
  const board = await boardsService.update(req.body);

  if (board) {
    return res.status(httpStatus.OK).json(Board.toResponse(board));
  }
  throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.UPDATE_ERROR);
});

const remove = catchErrors(async (req, res) => {
  const result = await boardsService.remove(req.params.id);

  if (result) {
    return res.status(httpStatus.NO_CONTENT).json(MESSAGES.DELETE_SUCCESS);
  }

  throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.DELETE_ERROR);
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
