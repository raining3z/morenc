import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProjectSchema = new Schema({
  name: {
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

const Project = model('Project', ProjectSchema, 'projects');

export default Project;
