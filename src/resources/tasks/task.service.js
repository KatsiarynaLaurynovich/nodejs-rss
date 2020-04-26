class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAll() {
    return this.taskRepository.getAll();
  }

  async getByTaskId(taskId) {
    return await this.taskRepository.getByTaskId(taskId);
  }

  async create(boardId, task) {
    return this.taskRepository.create(boardId, task);
  }

  async update(task) {
    return this.taskRepository.update(task);
  }

  async removeByTaskId(taskId) {
    return this.taskRepository.removeByTaskId(taskId);
  }

  async removeByBoardId(boardId) {
    return this.taskRepository.removeByBoardId(boardId);
  }
}

module.exports = new TaskService(require('./task.db.repository'));
