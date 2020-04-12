const User = require('./user.model');

let data = [];

const setData = users => {
  data = users;
};

const getAll = async () => data.map(User.toResponse);

const getById = async id => {
  const user = data.find(item => item.id === id);
  return user ? User.toResponse(user) : undefined;
};

const create = async user => {
  setData([...data, user]);

  return User.toResponse(user);
};

const getUpdatedUsers = user => {
  return data.map(item => (item.id === user.id ? { ...item, ...user } : item));
};

const update = async (id, userData) => {
  setData(getUpdatedUsers(userData));

  return getById(id);
};

const remove = id => {
  const result = getById(id);
  setData(data.filter(user => user.id !== id));

  return result ? result : undefined;
};

module.exports = { getAll, getById, create, update, remove };
