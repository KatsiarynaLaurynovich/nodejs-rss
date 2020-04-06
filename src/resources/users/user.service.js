const usersRepository = require('./user.memory.repository');
const taskRepository = require('../tasks/task.memory.repository');

const getAll = () => usersRepository.getAll();
const getById = async id => await usersRepository.getById(id);

const create = user => usersRepository.create(user);

const update = (id, user) => usersRepository.update(id, user);

const remove = id => {
  _updateTasks(id);

  return usersRepository.remove(id);
};

const _updateTasks = async userId => {
  const tasks = await taskRepository.getAll();

  tasks.map(async task => {
    if (task.userId === userId) {
      task.userId = null;

      await taskRepository.update(task);
    }
  });
};

module.exports = { getAll, getById, update, create, remove };
