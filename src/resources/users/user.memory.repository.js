let data = [
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

const getAll = () => data;

const getById = async id => {
  return data.find(user => user.id === id);
};

const create = async user => {
  data.push(user);

  return user;
};

const update = async (id, userData) => {
  const user = await getById(id);
  const updatedUser = { ...user, ...userData };

  data = data.map(u => {
    return u.id === updatedUser.id ? updatedUser : u;
  });

  return updatedUser;
};

const remove = id => {
  data = data.filter(user => user.id !== id);
};

module.exports = { getAll, getById, create, update, remove };
