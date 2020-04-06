const uuid = require('uuid');
const BoardColumn = require('./board.column.model');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new BoardColumn(column));
  }
}

module.exports = Board;
