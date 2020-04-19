const uuid = require('uuid');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

UserSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
