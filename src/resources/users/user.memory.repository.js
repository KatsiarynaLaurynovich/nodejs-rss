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

const create = async user => {
  data.push(user);

  return user;
};

const update = async (id, user) => {
  const index = data.findIndex(i => i.id === id);
  data[index] = { id, ...user };

  return data[index];
};

const remove = id => {
  const i = data.findIndex(user => user.id === id);
  return data.splice(i, 1);
};

module.exports = { getAll, create, update, remove };
