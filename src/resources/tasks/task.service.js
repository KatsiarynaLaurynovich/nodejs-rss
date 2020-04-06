class TaskService {
  constructor(tasksRepository, boardsRepository) {
    this.tasksRepository = tasksRepository;
    this.boardsRepository = boardsRepository;
  }

  getAll() {
    return this.tasksRepository.getAll();
  }

  async getAllByBoardId(id) {
    return await this.tasksRepository.getAll(id);
  }

  async getByTaskId(id) {
    return await this.tasksRepository.getByTaskId(id);
  }

  async create(boardId, task) {
    const board = await this.boardsRepository.getById(boardId);

    console.log({ ...task, boardId: board.id });

    return this.tasksRepository.create({ ...task, boardId: board.id });
  }

  async update(id, task) {
    return this.tasksRepository.update(id, task);
  }

  remove(id) {
    return this.tasksRepository.remove(id);
  }

  async resetUserId(userId) {
    const tasks = await this.tasksRepository.getAll();

    tasks.map(async task => {
      if (task.userId === userId) {
        task.userId = null;

        await this.tasksRepository.update(task);
      }
    });
  }
}

module.exports = TaskService;
