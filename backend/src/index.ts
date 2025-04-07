import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import School from './models/School';

import type { Express, Request, Response, NextFunction } from 'express';

import projectsRouter from './routes/projects';
import schoolsRouter from './routes/schools';

const app: Express = express();

app.use(bodyParser.json());

app.use(projectsRouter);
app.use(schoolsRouter);

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
