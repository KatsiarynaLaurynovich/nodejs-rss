const uuid = require('uuid');
const mongoose = require('mongoose');

const ColumnSchema = mongoose.Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

ColumnSchema.statics.toResponse = column => {
  const { id, title, order } = column;
  return { id, title, order };
};

module.exports = ColumnSchema;
