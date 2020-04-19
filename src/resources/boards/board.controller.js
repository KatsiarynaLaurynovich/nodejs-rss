// const httpStatus = require('http-status-codes');
// const { ErrorHandler } = require('../../helpers/error.handler');

// const catchErrors = require('../../common/catchErrors');

// const MESSAGES = require('./borad.constants');
// const boardRepository = require('./board.memory.repository');
// const taskRepository = require('../tasks/task.memory.repository');

// const BoardService = require('./board.service');
// const boardsService = new BoardService(boardRepository, taskRepository);

// const getAll = async (req, res, next) => {
//   catchErrors(async (req, res) => {
//     const boards = await boardsService.getAll();

//     if (boards.length) {
//       return res.status(httpStatus.OK).json(boards);
//     }

//     throw new ErrorHandler(httpStatus.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
//   });
// };

// const getById = async (req, res, next) => {
//   catchErrors(async (req, res) => {
//     const board = await boardsService.getById(req.params.id);
//     if (board) {
//       return res.status(httpStatus.OK).json(board);
//     }

//     throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.NOT_FOUND);
//   });
// };

// const create = async (req, res, next) => {
//   catchErrors(async (req, res) => {
//     const board = await boardsService.create(req.body);

//     if (board) {
//       return res.status(httpStatus.OK).json(board);
//     }

//     throw new ErrorHandler(httpStatus.BAD_REQUEST, MESSAGES.BAD_REQUEST);
//   })
// };

// const update = async (req, res, next) => {
//   catchErrors(async (req, res) => {
//     const board = await boardsService.update(req.params.id, req.body);

//     if (board) {
//       return res.status(httpStatus.OK).json(board);
//     }
//     throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.UPDATE_ERROR);
//   });
// };

// const remove = async (req, res, next) => {
//   catchErrors(async (req, res) => {
//     const result = await boardsService.remove(req.params.id);

//     if (result) {
//       return res.status(httpStatus.NO_CONTENT).json(MESSAGES.DELETE_SUCCESS);
//     }

//     throw new ErrorHandler(httpStatus.NOT_FOUND, MESSAGES.DELETE_ERROR);
//   });
// };

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   remove
// };
