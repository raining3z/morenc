import express from 'express';
import {
  addProject,
  deleteProject,
  getProjects,
  getSingleProject,
  updateProject,
} from '../controllers/Project';

const router = express.Router();

router.get('/api/projects', getProjects);
router.get('/api/projects/:projectId', getSingleProject);
router.post('/api/projects', addProject);
router.patch('/api/projects/:projectId', updateProject);
router.delete('/api/projects/:projectId', deleteProject);

export default router;
