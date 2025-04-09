import Project from '../models/Project';

import type { Request, Response, NextFunction } from 'express';

async function getProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

async function getSingleProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch project ${projectId}` });
  }
}

async function addProject(req: Request, res: Response, next: NextFunction) {
  const { name, description, date, startTime, endTime, schoolId } = req.body;
  // const { _id: userId } = req.user._id;

  try {
    const project = await Project.findOne({ name });

    if (project) {
      res.status(409).json({ error: 'School already exists' });
      return;
    }

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

async function updateProject(req: Request, res: Response, next: NextFunction) {
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

async function deleteProject(req: Request, res: Response, next: NextFunction) {
  const { projectId } = req.params;

  try {
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: `${projectId} was deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete project ${projectId}` });
  }
}

export {
  getProjects,
  getSingleProject,
  addProject,
  updateProject,
  deleteProject,
};
