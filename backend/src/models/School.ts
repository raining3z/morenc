import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    require: true,
  },
  county: {
    type: String,
    required: true,
  },
});

const School = model('School', SchoolSchema, 'schools');

export default School;
