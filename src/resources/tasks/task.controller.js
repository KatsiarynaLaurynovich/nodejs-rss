const httpStatus = require('http-status-codes');
const MESSAGES = require('./task.constants');

const { ErrorHandler } = require('../../helpers/error.handler');
const catchErrors = require('../../helpers/catch.errors');

const taskRepository = require('./task.db.repository');
const Task = require('./task.model');
const TaskService = require('./task.service');
const tasksService = new TaskService(taskRepository);

const getAll = catchErrors(async (req, res) => {
  const tasks = await tasksService.getAll();
  return res.status(httpStatus.OK).json(tasks.map(Task.toResponse));
});

const getById = catchErrors(async (req, res) => {
  const task = await tasksService.getByTaskId(req.params.id);

  if (task) {
    return res.status(httpStatus.OK).json(Task.toResponse(task));
  }
  throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.NOT_FOUND);
});

const create = catchErrors(async (req, res) => {
  const task = await tasksService.create(req.boardId, req.body);

  if (task) {
    return res.status(httpStatus.OK).json(Task.toResponse(task));
  }

  throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
});

const update = catchErrors(async (req, res) => {
  const task = await tasksService.update(req.body);

  if (task) {
    return res.status(httpStatus.OK).json(Task.toResponse(task));
  }
  throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.UPDATE_ERROR);
});

const remove = catchErrors(async (req, res) => {
  const message = await tasksService.removeByTaskId(req.params.id);
  if (!message) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.DELETE_ERROR);
  }
  return res.status(httpStatus.NO_CONTENT).json(MESSAGES.DELETE_SUCCESS);
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
