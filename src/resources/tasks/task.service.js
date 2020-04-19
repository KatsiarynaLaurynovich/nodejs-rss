class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAll(boardId) {
    return this.taskRepository.getAll(boardId);
  }

  async getByTaskId(boardId, taskId) {
    return await this.taskRepository.getByTaskId(boardId, taskId);
  }

  async create(boardId, task) {
    return this.taskRepository.create(boardId, task);
  }

  async update(boardId, taskId, task) {
    return this.taskRepository.update(boardId, taskId, task);
  }

  async removeByTaskId(taskId) {
    return this.taskRepository.removeByTaskId(taskId);
  }

  async removeByBoardId(boardId) {
    return this.taskRepository.removeByBoardId(boardId);
  }
}

module.exports = TaskService;
