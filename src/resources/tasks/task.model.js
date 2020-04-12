const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'title',
    order = 0,
    description = '',
    userId = null,
    boardId,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId || null;
    this.boardId = boardId;
    this.columnId = columnId || null;
  }
}

module.exports = Task;
