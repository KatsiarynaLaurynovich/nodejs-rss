const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const httpStatus = require('http-status');
const { NOT_FOUND, DELETED } = require('../../constants');

router
  .route('/')
  .get(async (req, res) => {
    const result = await tasksService.getAllByBoardId(req.params.boardId);

    res.status(httpStatus.OK).json(result.map(Task.toResponse));
  })
  .post(async (req, res) => {
    // const boardId = { boardId: req.params.boardId };
    const result = await tasksService.create(req.params.boardId, req.body);
    // new Task({ ...req.body,  ...boardId}

    if (result) {
      res.status(httpStatus.OK).json(Task.toResponse(result));
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const result = await tasksService.getByTaskId(req.params.id);

    if (result) {
      res.status(httpStatus.OK).json(Task.toResponse(result));
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  })
  .put(async (req, res) => {
    const result = await tasksService.update(req.params.id, req.body);

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  })
  .delete(async (req, res) => {
    await tasksService.remove(req.params.id);
    res.status(httpStatus.NO_CONTENT).json(DELETED);
  });

module.exports = router;
