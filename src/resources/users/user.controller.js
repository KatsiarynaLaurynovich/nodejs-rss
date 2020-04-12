const httpStatus = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error.handler');

const usersRepository = require('./user.memory.repository');
const tasksRepository = require('../tasks/task.memory.repository');

const MESSAGES = require('./user.constants');

const UsersService = require('./user.service');
const usersService = new UsersService(usersRepository, tasksRepository);

const getAll = async (req, res, next) => {
  try {
    const result = await usersService.getAll();

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
    const result = await usersService.getById(req.params.id);

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
    const result = await usersService.create(req.body);

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
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
    }

    const result = await usersService.update(req.params.id, req.body);

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
    const result = await usersService.remove(req.params.id);

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
