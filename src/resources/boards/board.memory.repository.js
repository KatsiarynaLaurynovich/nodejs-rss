let data = [];

const setData = boards => {
  data = boards;
};

const getAll = async () => data;

const getById = async id => {
  const board = data.find(item => item.id === id);

  return board ? board : undefined;
};

const create = async board => {
  setData([...data, board]);

  return board;
};

const getUpdatedBoards = board => {
  return data.map(item => {
    return item.id === board.id ? { ...item, ...board } : item;
  });
};

const update = async (id, boardData) => {
  setData(getUpdatedBoards(boardData));

  return getById(id);
};

const remove = id => {
  const result = getById(id);
  setData(data.filter(board => board.id !== id));

  return result ? result : undefined;
};

module.exports = { getAll, getById, create, update, remove };
