const express = require('express');

const parsed = require('body-parser');

const Event = require('./models/Event');

import type { Express, Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');

const app: Express = express();

app.use(parsed.json());

app.get(
  '/api/events/:eventId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.params;

    try {
      const event = await Event.findById(eventId);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to fetch event ${eventId}` });
    }
  }
);

app.patch(
  '/api/events/:eventId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.params;
    const { ...updatedFields } = req.body;

    try {
      const event = await Event.findByIdAndUpdate(
        eventId,
        { $set: updatedFields },
        { new: true }
      );

      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to update event ${eventId}` });
    }
  }
);

app.delete(
  '/api/events/:eventId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.params;

    try {
      await Event.findByIdAndDelete(eventId);

      res.status(200).json({ message: `${eventId} was deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to delete event ${eventId}` });
    }
  }
);

app.get(
  '/api/events',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  }
);

app.post(
  '/api/events',
  async (req: Request, res: Response, next: NextFunction) => {
    const { eventName, description, date, startTime, endTime, schoolId } =
      req.body;

    try {
      const newEvent = new Event({
        eventName,
        description,
        date,
        startTime,
        endTime,
        schoolId,
      });

      const savedEvent = await newEvent.save();

      res.status(201).json(savedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  }
);

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://raining3z:AkuWc53mlcXXNf8d@cluster0.ye36n.mongodb.net/more?retryWrites=true&w=majority&appName=Cluster'
    );
    console.log('connected');
    app.listen(3000);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Optional: exit process on failure
  }
})();
