import express from 'express';
import User from '../models/User';

import type { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get(
  '/api/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
);

router.post(
  '/api/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const addedUser = await newUser.save();

      res.status(201).json(addedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
);

router.delete(
  '/api/users/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
      await User.findByIdAndDelete(userId);

      res.status(200).json({ message: `${userId} was deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to delete user ${userId}` });
    }
  }
);

export default router;
