const Board = require('./board.model');

class BoardService {
  constructor(boardsRepository, tasksRepository) {
    this.boardsRepository = boardsRepository;
    this.tasksRepository = tasksRepository;
  }

  getAll() {
    return this.boardsRepository.getAll();
  }

  async getById(id) {
    return this.boardsRepository.getById(id);
  }

  async create(data) {
    const board = new Board({ ...data });
    return this.boardsRepository.create(board);
  }

  async update(id, data) {
    const board = new Board({ id, ...data });
    return this.boardsRepository.update(id, board);
  }

  async remove(id) {
    await this.removeRelatedTasks(id);
    return await this.boardsRepository.remove(id);
  }

  async removeRelatedTasks(id) {
    const tasks = await this.tasksRepository.getAll();

    tasks.map(async task => {
      if (task.boardId === id) {
        await this.tasksRepository.remove(task.id, id);
      }
    });
  }
}

module.exports = BoardService;
