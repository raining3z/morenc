import express from 'express';
import Project from '../models/Project';

import type { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get(
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

router.patch(
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

router.delete(
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

router.get(
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

router.post(
  '/api/projects',
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, date, startTime, endTime, schoolId } = req.body;

    try {
      const newProject = new Project({
        name,
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

export default router;
