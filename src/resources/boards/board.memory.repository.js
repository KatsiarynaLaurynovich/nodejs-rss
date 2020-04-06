let data = [
  {
    id: '1',
    title: 'string',
    columns: [
      {
        id: '1',
        title: 'string',
        order: 0
      }
    ]
  },
  {
    id: '2',
    title: 'string1',
    columns: [
      {
        id: '2',
        title: 'string1',
        order: 0
      }
    ]
  }
];

const getAll = () => data;

const getById = async id => {
  return data.find(board => board.id === id);
};

const create = async board => {
  data.push(board);

  return board;
};

const update = async (id, boardData) => {
  const board = await getById(id);
  const updatedBoard = { ...board, ...boardData };

  data = data.map(b => {
    return b.id === updatedBoard.id ? updatedBoard : b;
  });

  return updatedBoard;
};

const remove = id => {
  data = data.filter(board => board.id !== id);
};

module.exports = { getAll, getById, create, update, remove };
