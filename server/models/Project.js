const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  
  deadline: {
    type: String
  }
});

const Project = mongoose.model('Todo', projectSchema);

module.exports = Project;