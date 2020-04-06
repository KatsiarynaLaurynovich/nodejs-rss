let data = [
  {
    id: '1',
    title: 'string',
    order: 0,
    description: 'description',
    userId: '1',
    boardId: '1',
    columnId: '1'
  },
  {
    id: '2',
    title: 'string',
    order: 0,
    description: 'description',
    userId: '2',
    boardId: '2',
    columnId: '2'
  },
  {
    id: '3',
    title: 'string',
    order: 0,
    description: 'description',
    userId: '2',
    boardId: '1',
    columnId: '1'
  }
];

const getAll = () => data;

const getAllByBoardId = async boardId => {
  const tasks = data.filter(task => task.boardId === boardId);
  return tasks;
};

const getByTaskId = async taskId => {
  return data.find(task => task.id === taskId);
};

const create = async task => {
  data.push(task);

  return task;
};

const update = async (id, task) => {
  const index = data.findIndex(i => i.id === id);

  data[index] = { ...data[index], ...task, ...{ id } };

  return data[index];
};

const remove = id => {
  data = data.filter(task => task.id !== id);
};

module.exports = {
  getAll,
  getAllByBoardId,
  getByTaskId,
  create,
  update,
  remove
};
