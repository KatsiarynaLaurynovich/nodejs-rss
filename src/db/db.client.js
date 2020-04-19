const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');

const db = mongoose.connection;

const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connection Successful!');
    db.dropDatabase();
    cb();
  });
};

module.exports = { connectDB };
