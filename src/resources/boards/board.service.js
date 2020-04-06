const boardsRepository = require('./board.memory.repository');
const taskRepository = require('../tasks/task.memory.repository');

const getAll = () => boardsRepository.getAll();
const getById = async id => await boardsRepository.getById(id);

const create = board => boardsRepository.create(board);

const update = (id, board) => boardsRepository.update(id, board);

const remove = async id => {
  const tasks = await taskRepository.getAll();

  tasks.map(async task => {
    if (task.boardId === id) {
      await taskRepository.remove(task.id);
    }
  });

  return boardsRepository.remove(id);
};

module.exports = { getAll, getById, update, create, remove };
