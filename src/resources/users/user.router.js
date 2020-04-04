const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const data = await usersService.createUser(new User({ ...req.body }));

    if (data) {
      res.status(200).json(User.toResponse(data));
    } else {
      res.status(404).json('Error');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUserById(req.params.id);

    if (user.length === 0) {
      res.status(404).json('User with given ID is not found.');
    } else {
      res.json(user.map(User.toResponse)[0]);
    }
  })
  .put(async (req, res) => {
    const result = await usersService.updateUser(req.params.id, req.body);

    if (result) {
      res.status(200).json(User.toResponse(result));
    } else {
      res.status(404).json('User with given ID is not found.');
    }
  })
  .delete(async (req, res) => {
    const result = await usersService.deleteUser(req.params.id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json('User with given ID is not found.');
    }
  });

module.exports = router;
