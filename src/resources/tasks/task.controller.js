const httpStatus = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error.handler');

const tasksRepository = require('./task.memory.repository');
const boardsRepository = require('../boards/board.memory.repository');
const MESSAGES = require('./task.constants');

const TasksService = require('./task.service');
const tasksService = new TasksService(tasksRepository, boardsRepository);

const getAll = async (req, res, next) => {
  try {
    const result = await tasksService.getAllByBoardId(req.params.boardId);

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      throw new ErrorHandler(httpStatus.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }
  } catch (e) {
    return next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await tasksService.getByTaskId(
      req.params.id,
      req.params.boardId
    );

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.NOT_FOUND);
    }
  } catch (e) {
    return next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await tasksService.create(req.params.boardId, req.body);

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
    }
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await tasksService.update(
      req.params.id,
      req.params.boardId,
      req.body
    );

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.UPDATE_ERROR);
    }
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await tasksService.remove(req.params.id);

    if (result) {
      res.status(httpStatus.NO_CONTENT).json(MESSAGES.DELETE_SUCCESS);
    } else {
      throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.DELETE_ERROR);
    }
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
