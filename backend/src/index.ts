const express = require('express');

const parsed = require('body-parser');

const Event = require('./models/Event');

import type { Express, Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');

const app: Express = express();

app.use(parsed.json());

app.get(
  '/api/events/:_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    try {
      const event = await Event.findById(_id);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to fetch event ${_id}` });
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
