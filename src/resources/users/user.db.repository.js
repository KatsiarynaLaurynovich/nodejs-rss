const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findById(id);
};

const create = async user => {
  return User.create(user);
};

const update = async (id, user) => {
  return User.updateOne({ _id: user.id }, user);
};

const remove = async id => {
  return User.deleteOne({ _id: id });
};

module.exports = { getAll, getById, create, update, remove };
