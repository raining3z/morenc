const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  // imageUrl: {
  //   type: String,
  //   required: true,
  // },
  schoolId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Project', ProjectSchema, 'projects');
