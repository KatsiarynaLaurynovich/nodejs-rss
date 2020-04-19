const Task = require('./task.model');

const getAll = async boardId => {
  console.log(boardId);
  return Task.find({});
};

const getByTaskId = async (boardId, taskId) => {
  return Task.findById(taskId);
};

const create = async (boardId, task) => {
  return Task.create({ ...task, boardId });
};

const update = async (boardId, taskId, task) => {
  return Task.updateOne({ _id: task.id }, task);
};

const removeByTaskId = async id => {
  return Task.deleteOne({ _id: id });
};

const removeByBoardId = async boardId => {
  return Task.deleteMany({ boardId });
};

const updateUserId = async userId => {
  return Task.updateMany({ userId }, { $set: { userId: null } });
};

module.exports = {
  getAll,
  getByTaskId,
  create,
  update,
  removeByTaskId,
  removeByBoardId,
  updateUserId
};
