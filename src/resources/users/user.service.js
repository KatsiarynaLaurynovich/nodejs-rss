class UserService {
  constructor(usersRepository, tasksRepository) {
    this.usersRepository = usersRepository;
    this.tasksRepository = tasksRepository;
  }

  getAll() {
    return this.usersRepository.getAll();
  }

  async getById(id) {
    return this.usersRepository.getById(id);
  }

  async create(user) {
    return this.usersRepository.create(user);
  }

  async update(id, user) {
    return this.usersRepository.update(id, user);
  }

  async remove(id) {
    await this.resetUserId(id);
    return await this.usersRepository.remove(id);
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

module.exports = UserService;
