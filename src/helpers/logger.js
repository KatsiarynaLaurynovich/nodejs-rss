const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

const logRequest = req => {
  logger.log(
    'info',
    `url: ${req.url} params: ${JSON.stringify(
      req.query
    )}  body: ${JSON.stringify(req.body)}`
  );
};

module.exports = { logger, logRequest };
