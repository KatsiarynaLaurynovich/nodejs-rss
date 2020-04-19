const uuid = require('uuid');
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String || null,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

TaskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', TaskSchema, 'tasks');

module.exports = Task;
