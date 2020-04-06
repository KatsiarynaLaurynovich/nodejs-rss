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

  async create(board) {
    return this.boardsRepository.create(board);
  }

  async update(id, board) {
    return this.boardsRepository.update(id, board);
  }

  async remove(id) {
    this.removeRelatedTasks(id);
    return this.boardsRepository.remove(id);
  }

  async removeRelatedTasks(id) {
    const tasks = await this.tasksRepository.getAll();

    tasks.map(async task => {
      if (task.boardId === id) {
        await this.tasksRepository.remove(task.id);
      }
    });
  }
}

module.exports = BoardService;
