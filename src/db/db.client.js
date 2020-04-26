const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');
const User = require('../resources/users/user.model');

const adminUser = new User({
  name: 'Admin',
  login: 'admin',
  password: 'admin'
});

const db = mongoose.connection;

const connectDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connection Successful!');
    db.dropDatabase();

    adminUser.save((err, doc) => {
      if (err) return console.error(err);
      console.log(`${doc.name} saved to users collection.`);
    });

    callback();
  });
};

module.exports = { connectDB };
