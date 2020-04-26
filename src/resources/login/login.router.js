const router = require('express').Router();
const loginController = require('./login.controller');

router.post('/', loginController.sign);

module.exports = router;
