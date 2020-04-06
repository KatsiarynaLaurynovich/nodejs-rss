const httpStatus = require('http-status');

const usersRepository = require('./user.memory.repository');
const tasksRepository = require('../tasks/task.memory.repository');

const { NOT_FOUND, DELETED } = require('../../constants');

const UsersService = require('./user.service');
const User = require('./user.model');

const usersService = new UsersService(usersRepository, tasksRepository);

const getAll = async (req, res) => {
  const result = await usersService.getAll();
  res.status(httpStatus.OK).json(result.map(User.toResponse));
};

const getById = async (req, res) => {
  const result = await usersService.getById(req.params.id);

  if (result) {
    res.json(User.toResponse(result));
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const create = async (req, res) => {
  const result = await usersService.create(new User({ ...req.body }));

  if (result) {
    res.status(httpStatus.OK).json(User.toResponse(result));
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const update = async (req, res) => {
  const result = await usersService.update(req.params.id, req.body);

  if (result) {
    res.status(httpStatus.OK).json(User.toResponse(result));
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

const remove = async (req, res) => {
  if (await usersService.getById(req.params.id)) {
    await usersService.remove(req.params.id);
    res.status(httpStatus.OK).json(DELETED);
  } else {
    res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
