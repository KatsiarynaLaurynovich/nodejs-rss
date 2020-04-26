/* eslint-disable require-atomic-updates */
const loginService = require('./login.service');
const { ErrorHandler } = require('../../helpers/error.handler');
const { FORBIDDEN, OK } = require('http-status-codes');
const catchErrors = require('../../helpers/catch.errors');
const MESSAGES = require('./login.constants');

const sign = catchErrors(async (req, res) => {
  const token = await loginService.getJWTToken(req.body);
  if (!token) {
    throw new ErrorHandler(FORBIDDEN, MESSAGES.FORBIDDEN);
  }
  req.headers.authorization = token;
  res.status(OK).json({ token });
});

module.exports = {
  sign
};
