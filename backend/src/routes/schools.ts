import express from 'express';
import School from '../models/School';

import type { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get(
  '/api/schools',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schools = await School.find();
      res.status(200).json(schools);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  }
);

router.post(
  '/api/schools',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('hell0');
    const { name, address, county } = req.body;
    console.log(req.body);

    try {
      const newSchool = new School({
        name,
        address,
        county,
      });

      const addedSchool = await newSchool.save();

      res.status(201).json(addedSchool);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create school' });
    }
  }
);

router.delete(
  '/api/schools/:school',
  async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params;

    try {
      await School.findByIdAndDelete(schoolId);

      res.status(200).json({ message: `${schoolId} was deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to delete school ${schoolId}` });
    }
  }
);

export default router;
