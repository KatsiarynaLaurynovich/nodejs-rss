const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const httpStatus = require('http-status-codes');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');

const morgan = require('morgan');
const { createWriteStream } = require('fs');
const { logger, handleError } = require('./helpers/error.handler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

app.use(
  morgan(':url :query :body', { stream: createWriteStream('requests.log') })
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', tasksRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

process.on('uncaughtException', err => {
  logger.error({
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message
  });

  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error({
    statCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: reason
  });
});

module.exports = app;
