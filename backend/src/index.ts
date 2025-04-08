import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import type { Express } from 'express';

import projectRoutes from './routes/projects';
import schoolRoutes from './routes/schools';
import userRoutes from './routes/users';

const app: Express = express();

app.use(bodyParser.json());

app.use(projectRoutes);
app.use(schoolRoutes);
app.use(userRoutes);

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://raining3z:AkuWc53mlcXXNf8d@cluster0.ye36n.mongodb.net/more?retryWrites=true&w=majority&appName=Cluster'
    );
    console.log('mongoose connected');
    app.listen(3000);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
})();

// when not using TS:

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const projectRoutes = require('./routes/projects');
// const schoolRoutes = require('./routes/projects');
