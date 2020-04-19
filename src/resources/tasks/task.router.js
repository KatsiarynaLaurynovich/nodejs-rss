const router = require('express').Router();
const httpStatus = require('http-status-codes');
const catchErrors = require('../../helpers/catch.errors');
const { ValidationIdUuid, validate } = require('../../validators/validator');
const { ErrorHandler } = require('../../helpers/error.handler');
const MESSAGES = require('./task.constants');

const taskRepository = require('./task.db.repository');
const Task = require('./task.model');

const TaskService = require('./task.service');
const tasksService = new TaskService(taskRepository);

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getAll(req.boardId);
    return res.status(httpStatus.OK).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const task = await tasksService.getByTaskId(req.boardId, req.params.id);

    if (task) {
      return res.status(httpStatus.OK).json(Task.toResponse(task));
    }
    throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.NOT_FOUND);
  })
);

router.route('/:id').put(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const task = await tasksService.update(
      req.boardId,
      req.params.id,
      req.body
    );

    if (task) {
      return res.status(httpStatus.OK).json(Task.toResponse(task));
    }
    throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.UPDATE_ERROR);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await tasksService.create(req.boardId, req.body);

    if (task) {
      return res.status(httpStatus.OK).json(Task.toResponse(task));
    }

    throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
  })
);

router.route('/:id').delete(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const message = await tasksService.removeByTaskId(req.params.id);
    if (!message) {
      throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.DELETE_ERROR);
    }
    return res.status(httpStatus.NO_CONTENT).json(MESSAGES.DELETE_SUCCESS);
  })
);

module.exports = router;
