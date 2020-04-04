const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = async id =>
  (await usersRepo.getAll()).filter(user => user.id === id);
const createUser = user => usersRepo.createUser(user);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
