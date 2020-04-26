const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    login: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
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

UserSchema.pre('save', async function myFunc(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
