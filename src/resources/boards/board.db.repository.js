const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findById(id);
};

const create = async board => {
  return Board.create(board);
};

const update = async board => {
  return Board.updateOne({ _id: board.id }, board);
};

const remove = async id => {
  return Board.deleteOne({ _id: id });
};

module.exports = { getAll, getById, create, update, remove };
