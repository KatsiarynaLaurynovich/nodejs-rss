const User = require('./user.model');

class UserService {
  constructor(usersRepository, tasksRepository) {
    this.usersRepository = usersRepository;
    this.tasksRepository = tasksRepository;
  }

  async getAll() {
    return this.usersRepository.getAll();
  }

  async getById(id) {
    return this.usersRepository.getById(id);
  }

  async create(data) {
    const user = new User({ ...data });
    return this.usersRepository.create(user);
  }

  async update(id, data) {
    const user = new User({ id, ...data });
    return this.usersRepository.update(id, user);
  }

  async remove(id) {
    await this.updateUserId(id);
    await this.usersRepository.remove(id);
    // console.log(this.usersRepository.remove(id));
    return true;
  }

  async updateUserId(userId) {
    const tasks = await this.tasksRepository.getAll();
    // console.log('Before');
    // console.log(tasks);
    // console.log('-------');
    tasks.map(async task => {
      if (task.userId === userId) {
        task.userId = null;
        await this.tasksRepository.update(task);
      }
    });
    // console.log('After');
    // console.log(tasks);
    // console.log('-------');
  }
}

module.exports = UserService;
