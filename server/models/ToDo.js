const mongoose = require('mongoose');

const { Schema } = mongoose;

const toDoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: {
      values: ['notStarted', 'InProgress', 'finished'],
      message: '{VALUE} is not supported'
    }
  }
});

const Todo = mongoose.model('Todo', toDoSchema);

module.exports = Todo;
