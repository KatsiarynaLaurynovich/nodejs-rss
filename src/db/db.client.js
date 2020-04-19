const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const Task = require('../resources/tasks/task.model');
const Board = require('../resources/boards/board.model');

const db = mongoose.connection;

const item = new User({
  name: 'User name',
  login: 'login2',
  password: 'asdasdfasd'
});
const itemTask = new Task({
  title: 'Task name',
  order: 4,
  description: 'String',
  userId: 'String',
  boardId: 'String',
  columnId: 'String'
});
const itemBoard = new Board({
  title: 'Board name',
  columns: []
});

const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connection Successful!');
    db.dropDatabase();

    item.save((err, user) => {
      if (err) return console.error(err);
      console.log(`${user.name} saved to users collection.`);
    });

    itemTask.save((err, task) => {
      if (err) return console.error(err);
      console.log(`${task.title} saved to tasks collection.`);
    });

    itemBoard.save((err, board) => {
      if (err) return console.error(err);
      console.log(`${board.title} saved to boards collection.`);
    });

    cb();
  });
};

module.exports = { connectDB };
