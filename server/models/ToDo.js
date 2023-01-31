const mongoose = require('mongoose');

const { Schema } = mongoose;

const toDoSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'notStarted',
    enum: {
      values: ['notStarted', 'InProgress', 'finished'],
      message: '{VALUE} is not supported'
    }
  }
});

const Todo = mongoose.model('Todo', toDoSchema);

module.exports = Todo;
