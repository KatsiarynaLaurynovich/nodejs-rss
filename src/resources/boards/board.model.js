const uuid = require('uuid');
const mongoose = require('mongoose');
const BoardColumn = require('./board.column.model');

const BoardSchema = mongoose.Schema(
  {
    title: String,
    columns: [BoardColumn],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

BoardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', BoardSchema, 'boards');

module.exports = Board;
