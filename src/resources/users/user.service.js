const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = async id =>
  (await usersRepo.getAll()).filter(user => user.id === id);
const create = user => usersRepo.create(user);
const update = (id, user) => usersRepo.update(id, user);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, getById, update, create, remove };
