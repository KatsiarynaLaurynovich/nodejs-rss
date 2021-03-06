const httpStatus = require('http-status-codes');
const MESSAGES = require('./user.constants');

const { ErrorHandler } = require('../../helpers/error.handler');
const catchErrors = require('../../helpers/catch.errors');

const User = require('./user.model');
const userService = require('./user.service');

const getAll = catchErrors(async (req, res) => {
  const users = await userService.getAll();

  return res.status(httpStatus.OK).json(users.map(User.toResponse));
});

const getById = catchErrors(async (req, res) => {
  const user = await userService.getById(req.params.id);
  if (user) {
    return res.status(httpStatus.OK).json(User.toResponse(user));
  }
  throw new ErrorHandler(httpStatus.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
});

const create = catchErrors(async (req, res) => {
  const user = await userService.create(req.body);

  if (user) {
    res.status(httpStatus.OK).json(User.toResponse(user));
  } else {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
  }
});

const update = catchErrors(async (req, res) => {
  const isUser = await userService.getById(req.params.id);
  if (!isUser) {
    throw new ErrorHandler(httpStatus.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
  }
  const user = await userService.update(req.body);

  return res.status(httpStatus.OK).json(user);
});

const remove = catchErrors(async (req, res) => {
  const message = await userService.remove(req.params.id);

  if (message) {
    res.status(httpStatus.NO_CONTENT).json(MESSAGES.DELETE_SUCCESS);
  } else {
    throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.DELETE_ERROR);
  }
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
