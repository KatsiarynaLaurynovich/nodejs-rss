const httpStatus = require('http-status');

const tasksRepository = require('./task.memory.repository');
const boardsRepository = require('../boards/board.memory.repository');

const { NOT_FOUND, DELETED } = require('../../constants');

const Task = require('./task.model');
const TasksService = require('./task.service');

const tasksService = new TasksService(tasksRepository, boardsRepository);

const getAll = async (req, res) => {
  const result = await tasksService.getAllByBoardId(req.params.boardId);

  res.status(httpStatus.OK).json(result.map(Task.toResponse));
};

const getById = async (req, res) => {
  const result = await tasksService.getByTaskId(req.params.id);

  if (result) {
    res.status(httpStatus.OK).json(Task.toResponse(result));
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const create = async (req, res) => {
  const result = await tasksService.create(
    req.params.boardId,
    new Task(req.body)
  );

  if (result) {
    res.status(httpStatus.OK).json(Task.toResponse(result));
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const update = async (req, res) => {
  const result = await tasksService.update(req.params.id, req.body);

  if (result) {
    res.status(httpStatus.OK).json(result);
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const remove = async (req, res) => {
  await tasksService.remove(req.params.id);
  res.status(httpStatus.NO_CONTENT).json(DELETED);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
