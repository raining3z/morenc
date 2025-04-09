import School from '../models/School';

import type { Request, Response, NextFunction } from 'express';

async function getSchools(req: Request, res: Response, next: NextFunction) {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
}

async function addSchool(req: Request, res: Response, next: NextFunction) {
  const { name, address, county } = req.body;

  try {
    const school = await School.findOne({ name });

    if (school) {
      res.status(409).json({ error: 'School already exists' });
      return;
    }

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

async function updateSchool(req: Request, res: Response, next: NextFunction) {
  const { _id: schoolId, ...updatedFields } = req.body;

  try {
    const school = await School.findByIdAndUpdate(
      schoolId,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json(school);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to update project ${schoolId}` });
  }
}

async function deleteSchool(req: Request, res: Response, next: NextFunction) {
  const { schoolId } = req.params;

  try {
    await School.findByIdAndDelete(schoolId);

    res.status(200).json({ message: `${schoolId} was deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete school ${schoolId}` });
  }
}

export { getSchools, addSchool, deleteSchool, updateSchool };
