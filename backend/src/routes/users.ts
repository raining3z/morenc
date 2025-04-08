import express from 'express';
import { getUsers, addUser, deleteUser, loginUser } from '../controllers/user';

const router = express.Router();

router.get('/api/users', getUsers);
router.post('/api/users', addUser);
router.delete('/api/users/:userId', deleteUser);
router.post('/api/login', loginUser);

export default router;
