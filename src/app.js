const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const httpStatus = require('http-status-codes');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const isAuthenticated = require('./middleware/auth');

const morgan = require('morgan');
const { handleError } = require('./helpers/error.handler');
const { logger, logRequest } = require('./helpers/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  logRequest(req);

  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  next();
});

app.use('/login', loginRouter);
app.use('/users', isAuthenticated, userRouter);
app.use('/boards', isAuthenticated, boardRouter);
app.use('/tasks', isAuthenticated);

boardRouter.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

process
  .on('uncaughtException', err => {
    logger.error({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message
    });

    const exit = process.exit;
    exit(1);
  })
  .on('unhandledRejection', reason => {
    logger.error({
      statCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: reason
    });
  });

module.exports = app;
