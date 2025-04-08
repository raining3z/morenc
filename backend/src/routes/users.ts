import express from 'express';
import { getUsers, addUser, deleteUser } from '../controllers/User';

const router = express.Router();

router.get('/api/users', getUsers);
router.post('/api/users', addUser);
router.delete('/api/users/:userId', deleteUser);

export default router;
