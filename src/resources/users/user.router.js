const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const httpStatus = require('http-status');
const { NOT_FOUND, DELETED } = require('../../constants');
const { validateResponce } = require('../../helpers');

router
  .route('/')
  .get(async (req, res) => {
    await validateResponce(req);
    const result = await usersService.getAll();

    res.status(httpStatus.OK).json(result.map(User.toResponse));
  })
  .post(async (req, res) => {
    const result = await usersService.create(new User({ ...req.body }));

    if (result) {
      res.status(httpStatus.OK).json(User.toResponse(result));
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const result = await usersService.getById(req.params.id);

    if (result) {
      res.json(User.toResponse(result));
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  })
  .put(async (req, res) => {
    const result = await usersService.update(req.params.id, req.body);

    if (result) {
      res.status(httpStatus.OK).json(User.toResponse(result));
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  })
  .delete(async (req, res) => {
    await usersService.remove(req.params.id);
    res.status(httpStatus.OK).json(DELETED);
  });

module.exports = router;
