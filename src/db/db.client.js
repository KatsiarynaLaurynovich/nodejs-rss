const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');

// const User = require('../resources/users/user.model');

// const users = [
//   new User({ name: 'name1', login: 'login1', password: 'asdasd' }),
//   new User({ name: 'name2', login: 'login2', password: 'asdasd' })
// ];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('We are connected');
    // db.dropDatabase();
    cb();
    // users.forEach(user => user.save());
  });
};

module.exports = { connectToDB };
