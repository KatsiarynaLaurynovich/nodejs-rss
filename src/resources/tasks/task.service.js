const taskRepository = require('./task.memory.repository');
const boardRepository = require('../boards/board.memory.repository');

const getAll = () => taskRepository.getAll();
const getAllByBoardId = async id => await taskRepository.getAll(id);
const getByTaskId = async id => await taskRepository.getByTaskId(id);
const create = async (boardId, task) => {
  const board = await boardRepository.getById(boardId);

  console.log(task);
  task = { ...task, boardId: board.id };
  console.log(task);
  return taskRepository.create(task);
};
const update = (id, task) => taskRepository.update(id, task);
const remove = id => taskRepository.remove(id);

module.exports = {
  getAll,
  getAllByBoardId,
  getByTaskId,
  update,
  create,
  remove
};
