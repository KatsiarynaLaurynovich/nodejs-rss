class UserService {
  constructor(userRepository, taskRepository) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  async getById(id) {
    return this.userRepository.getById(id);
  }

  async create(user) {
    return this.userRepository.create(user);
  }

  async update(user) {
    return this.userRepository.update(user);
  }

  async remove(id) {
    await this.taskRepository.updateUserId(id);
    return this.userRepository.remove(id);
  }
}

module.exports = UserService;
