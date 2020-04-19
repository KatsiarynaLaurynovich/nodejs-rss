const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { logger } = require('./logger');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

function handleError(err, res) {
  logger.error(err);

  const { statusCode, message } = err;

  if (statusCode) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });

    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
}

module.exports = { ErrorHandler, handleError };
