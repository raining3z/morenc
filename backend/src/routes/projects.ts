import express from 'express';
import Project from '../models/Project';

import type { Request, Response, NextFunction } from 'express';

const router = express.Router();

// GET all projects
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

// GET single project
router.get(
  '/api/projects',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('hello');
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }
);

// POST project
router.post(
  '/api/projects',
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, date, startTime, endTime, schoolId } = req.body;
    // const { _id: userId } = req.user._id;

    try {
      const newProject = new Project({
        name,
        description,
        date,
        startTime,
        endTime,
        schoolId,
        // userId,
      });

      const addedProject = await newProject.save();

      res.status(201).json(addedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
);

// PATCH project
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

// DELETE project
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

export default router;
