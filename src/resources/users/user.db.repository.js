const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findById(id);
};

const getByLogin = async login => {
  return await User.findOne({ login });
};

const create = async user => {
  return User.create(user);
};

const update = async user => {
  return User.updateOne({ _id: user.id }, user);
};

const remove = async id => {
  return User.deleteOne({ _id: id });
};

module.exports = { getAll, getById, getByLogin, create, update, remove };
