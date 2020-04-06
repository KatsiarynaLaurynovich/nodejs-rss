const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'string',
    order = 0,
    description = 'description',
    userId = '1',
    boardId = '1',
    columnId = '1'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }

  getUserId() {
    return this.userId;
  }
}

module.exports = Task;
