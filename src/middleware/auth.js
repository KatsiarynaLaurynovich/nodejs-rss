const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes');
const { ErrorHandler } = require('../helpers/error.handler');
const { JWT_SECRET_KEY } = require('../common/config');
const MESSAGES = require('../resources/login/login.constants');

const isAuthenticated = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token && (await jwt.verify(token, JWT_SECRET_KEY))) {
    return next();
  }
  return next(new ErrorHandler(UNAUTHORIZED, MESSAGES.UNAUTHORIZED));
};

module.exports = isAuthenticated;
