const Task = require('./task.model');

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

  async getByTaskId(id, boardId) {
    return await this.tasksRepository.getByTaskId(id, boardId);
  }

  async create(boardId, task) {
    const taskModel = new Task({ ...task, ...{ boardId } });

    return this.tasksRepository.create(taskModel);
  }

  async update(id, boardId, task) {
    const taskModel = new Task({
      id,
      boardId,
      userId: task.userId,
      title: task.title,
      order: task.order,
      description: task.description
    });

    return this.tasksRepository.update(id, boardId, taskModel);
  }

  async remove(id) {
    return this.tasksRepository.remove(id);
  }
}

module.exports = TaskService;
