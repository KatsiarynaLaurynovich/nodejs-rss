const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = async id =>
  (await boardsRepo.getAll()).filter(board => board.id === id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = id => boardsRepo.remove(id);

module.exports = { getAll, getById, update, create, remove };
