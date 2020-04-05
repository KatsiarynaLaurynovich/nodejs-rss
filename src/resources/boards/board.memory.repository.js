const data = [
  {
    id: 'id',
    title: 'string',
    columns: [
      {
        id: 'string',
        title: 'string',
        order: 0
      }
    ]
  },
  {
    id: 'id1',
    title: 'string1',
    columns: [
      {
        id: 'string1',
        title: 'string1',
        order: 0
      }
    ]
  }
];
const getAll = async () => {
  return data;
};

const create = async board => {
  data.push(board);

  return board;
};

const update = async (id, board) => {
  const index = data.findIndex(i => i.id === id);
  data[index] = { id, ...board };

  return data[index];
};

const remove = id => {
  const i = data.findIndex(board => board.id === id);
  return data.splice(i, 1);
};

module.exports = { getAll, create, update, remove };
