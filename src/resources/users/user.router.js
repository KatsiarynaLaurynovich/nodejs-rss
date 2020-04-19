const router = require('express').Router();
const httpStatus = require('http-status-codes');
const User = require('./user.model');
const catchErrors = require('../../helpers/catch.errors');
const { ErrorHandler } = require('../../helpers/error.handler');
const MESSAGES = require('./user.constants');
const {
  userValidationBody,
  ValidationIdUuid,
  validate
} = require('../../validators/validator');

const userRepository = require('./user.db.repository');
const taskRepository = require('../tasks/task.db.repository');
const UserService = require('./user.service');
const usersService = new UserService(userRepository, taskRepository);

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();

    return res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    if (user) {
      return res.status(httpStatus.OK).json(User.toResponse(user));
    }

    throw new ErrorHandler(httpStatus.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
  })
);

router.route('/:id').put(
  ValidationIdUuid(),
  userValidationBody(),
  validate,
  catchErrors(async (req, res) => {
    const isUser = await usersService.getById(req.params.id);
    if (!isUser) {
      throw new ErrorHandler(httpStatus.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }
    const user = await usersService.update(req.params.id, req.body);
    return res.status(httpStatus.OK).json(user);
  })
);

router.route('/').post(
  userValidationBody(),
  validate,
  catchErrors(async (req, res) => {
    const user = await usersService.create(req.body);
    return res.status(httpStatus.OK).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const message = await usersService.remove(req.params.id);

    return res.status(httpStatus.NO_CONTENT).json({ message });
  })
);

module.exports = router;
