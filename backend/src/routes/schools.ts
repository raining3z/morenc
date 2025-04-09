import express from 'express';

import {
  getSchools,
  addSchool,
  deleteSchool,
  updateSchool,
} from '../controllers/school';

const router = express.Router();

router.get('/api/schools', getSchools);
router.post('/api/schools', addSchool);
router.patch('/api/schools/:schoolId', updateSchool);
router.delete('/api/schools/:schoolId', deleteSchool);

export default router;
