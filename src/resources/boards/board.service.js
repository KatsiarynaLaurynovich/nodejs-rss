class BoardService {
  constructor(boardRepository, taskRepository) {
    this.boardRepository = boardRepository;
    this.taskRepository = taskRepository;
  }

  getAll() {
    return this.boardRepository.getAll();
  }

  async getById(id) {
    return this.boardRepository.getById(id);
  }

  async create(board) {
    return this.boardRepository.create(board);
  }

  async update(id, board) {
    return this.boardRepository.update(id, board);
  }

  async remove(id) {
    await this.taskRepository.removeByBoardId(id);
    return this.boardRepository.remove(id);
  }
}

module.exports = BoardService;
