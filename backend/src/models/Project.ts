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
    type: String,
    required: true,
  },
  // "relational": we want to grab the user id from User to deterine you created the Project
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});

const Project = model('Project', ProjectSchema, 'projects');

export default Project;

// when not using TS:

// const mongoose = require('mongoose');
// const { Schema, model } = mongoose;

// module.exports = model('Project', ProjectSchema, 'projects');
