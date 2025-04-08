import express from 'express';

import { getSchools, addSchool, deleteSchool } from '../controllers/school';

const router = express.Router();

router.get('/api/schools', getSchools);
router.post('/api/schools', addSchool);
router.delete('/api/schools/:schoolId', deleteSchool);

export default router;
