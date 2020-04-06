const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const httpStatus = require('http-status');
const { NOT_FOUND, DELETED } = require('../../constants');

router
  .route('/')
  .get(async (req, res) => {
    const result = await boardsService.getAll();
    res.status(httpStatus.OK).json(result);
  })
  .post(async (req, res) => {
    const result = await boardsService.create(new Board({ ...req.body }));

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const result = await boardsService.getById(req.params.id);

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  })
  .put(async (req, res) => {
    const result = await boardsService.update(req.params.id, req.body);

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  })
  .delete(async (req, res) => {
    await boardsService.remove(req.params.id);

    res.status(httpStatus.NO_CONTENT).json(DELETED);
  });

module.exports = router;
