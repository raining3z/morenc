const express = require('express');

const parsed = require('body-parser');

const Project = require('./models/Project');

import type { Express, Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');

const app: Express = express();

app.use(parsed.json());

app.get(
  '/api/projects/:projectId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;

    try {
      const project = await Project.findById(projectId);
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to fetch project ${projectId}` });
    }
  }
);

app.patch(
  '/api/projects/:projectId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    const { ...updatedFields } = req.body;

    try {
      const project = await Project.findByIdAndUpdate(
        projectId,
        { $set: updatedFields },
        { new: true }
      );

      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to update project ${projectId}` });
    }
  }
);

app.delete(
  '/api/projects/:projectId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;

    try {
      await Project.findByIdAndDelete(projectId);

      res.status(200).json({ message: `${projectId} was deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to delete project ${projectId}` });
    }
  }
);

app.get(
  '/api/projects',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }
);

app.post(
  '/api/projects',
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectName, description, date, startTime, endTime, schoolId } =
      req.body;

    try {
      const newProject = new Project({
        projectName,
        description,
        date,
        startTime,
        endTime,
        schoolId,
      });

      const addedProject = await newProject.save();

      res.status(201).json(addedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
);

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://raining3z:AkuWc53mlcXXNf8d@cluster0.ye36n.mongodb.net/more?retryWrites=true&w=majority&appName=Cluster'
    );
    console.log('connected');
    app.listen(3000);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Optional: exit process on failure
  }
})();
