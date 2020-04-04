const data = [
  {
    id: '1',
    name: 'name',
    login: 'login',
    password: 'password'
  },
  {
    id: '2',
    name: 'name2',
    login: 'login2',
    password: 'password'
  }
];

const getAll = async () => {
  return data;
};

const createUser = async user => {
  data.push(user);

  return user;
};

const updateUser = async (id, user) => {
  const index = data.findIndex(i => i.id === id);
  data[index] = { id, ...user };

  return data[index];
};

const deleteUser = id => {
  const i = data.findIndex(user => user.id === id);
  return data.splice(i, 1);
};

module.exports = { getAll, createUser, updateUser, deleteUser };
