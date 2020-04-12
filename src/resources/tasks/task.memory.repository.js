let data = [];

const setData = tasks => {
  data = tasks;
};

const getAll = () => data;

const getAllByBoardId = async boardId => {
  const tasks = data.filter(task => task.boardId === boardId);

  return tasks;
};

const getByTaskId = async (taskId, boardId) => {
  const task = data.find(
    item => item.id === taskId && item.boardId === boardId
  );

  return task ? task : undefined;
};

const create = async task => {
  setData([...data, task]);

  return task;
};

const check = (id, task) => task.id === id;

const getUpdatedTasks = item => {
  return data.map(task => (check(task.id, task) ? { ...task, ...item } : task));
};

const update = async (id, boardId, taskData) => {
  const index = data.findIndex(task => task.id === id);
  setData(getUpdatedTasks(taskData));

  return data[index];
};

const remove = async id => {
  const result = getByTaskId(id);
  setData(data.filter(task => task.id !== id));

  return result ? result : undefined;
};

module.exports = {
  getAll,
  getAllByBoardId,
  getByTaskId,
  create,
  update,
  remove
};
