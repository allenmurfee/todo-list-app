const mongoose = require('mongoose');

const { Schema } = mongoose;

const ToDo = require('./ToDo');

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
  },
  toDos: [ToDo.schema]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;