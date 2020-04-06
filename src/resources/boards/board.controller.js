const httpStatus = require('http-status');

const { NOT_FOUND, DELETED } = require('../../constants');
const boardsRepository = require('./board.memory.repository');
const tasksRepository = require('../tasks/task.memory.repository');

const Board = require('./board.model');
const BoardsService = require('./board.service');
const boardsService = new BoardsService(boardsRepository, tasksRepository);

const getAll = async (req, res) => {
  const result = await boardsService.getAll();
  res.status(httpStatus.OK).json(result);
};

const getById = async (req, res) => {
  const result = await boardsService.getById(req.params.id);

  if (result) {
    res.status(httpStatus.OK).json(result);
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const create = async (req, res) => {
  const result = await boardsService.create(new Board({ ...req.body }));

  if (result) {
    res.status(httpStatus.OK).json(result);
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const update = async (req, res) => {
  const result = await boardsService.update(req.params.id, req.body);

  if (result) {
    res.status(httpStatus.OK).json(result);
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const remove = async (req, res) => {
  await boardsService.remove(req.params.id);
  res.status(httpStatus.NO_CONTENT).json(DELETED);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
