const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const httpStatus = require('http-status');
const { NOT_FOUND } = require('../../constants');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();

    res.status(httpStatus.OK).json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const data = await usersService.create(new User({ ...req.body }));

    if (data) {
      res.status(httpStatus.OK).json(User.toResponse(data));
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getById(req.params.id);

    if (user.length === 0) {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    } else {
      res.json(user.map(User.toResponse)[0]);
    }
  })
  .put(async (req, res) => {
    const result = await usersService.update(req.params.id, req.body);

    if (result) {
      res.status(200).json(User.toResponse(result));
    } else {
      res.status(404).json(NOT_FOUND);
    }
  })
  .delete(async (req, res) => {
    const result = await usersService.remove(req.params.id);

    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.NOT_FOUND).json(NOT_FOUND);
    }
  });

module.exports = router;
