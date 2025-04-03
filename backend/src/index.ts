const express = require('express');

const parser = require('body-parser');

const cors = require('cors'); // localhost only: this is needed for React to hit backend port

import type { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();

app.use(cors()); // localhost only: this is needed for React to hit backend port

app.use(parser.json());

const players = [
  {
    id: 1,
    sportId: 1,
    profile: {
      firstName: 'Aubrey',
      lastName: 'Chase',
      gender: 'F',
      position: 'PF',
      weight: 0,
    },
  },
  {
    id: 2,
    sportId: 2,
    profile: {
      firstName: 'Basia',
      lastName: 'Walls',
      gender: 'M',
      position: 'OL',
      weight: 230,
    },
  },
  {
    id: 3,
    sportId: 3,
    profile: {
      firstName: 'Carter',
      lastName: 'Brooks',
      gender: 'M',
      position: 'CF',
      weight: 185,
    },
  },
  {
    id: 4,
    sportId: 4,
    profile: {
      firstName: 'Delaney',
      lastName: 'Rivera',
      gender: 'F',
      position: 'S',
      weight: 145,
    },
  },
  {
    id: 5,
    sportId: 1,
    profile: {
      firstName: 'Emerson',
      lastName: 'Lee',
      gender: 'F',
      position: 'SG',
      weight: 135,
    },
  },
  {
    id: 6,
    sportId: 2,
    profile: {
      firstName: 'Finn',
      lastName: 'Douglas',
      gender: 'M',
      position: 'QB',
      weight: 210,
    },
  },
  {
    id: 7,
    sportId: 3,
    profile: {
      firstName: 'Gia',
      lastName: 'Anderson',
      gender: 'F',
      position: 'LW',
      weight: 120,
    },
  },
  {
    id: 8,
    sportId: 4,
    profile: {
      firstName: 'Hudson',
      lastName: 'Blake',
      gender: 'M',
      position: 'MB',
      weight: 200,
    },
  },
  {
    id: 9,
    sportId: 1,
    profile: {
      firstName: 'Isla',
      lastName: 'Nguyen',
      gender: 'F',
      position: 'PG',
      weight: 125,
    },
  },
  {
    id: 10,
    sportId: 2,
    profile: {
      firstName: 'Jaxon',
      lastName: 'Taylor',
      gender: 'M',
      position: 'RB',
      weight: 205,
    },
  },
  {
    id: 11,
    sportId: 3,
    profile: {
      firstName: 'Kira',
      lastName: 'Santos',
      gender: 'F',
      position: 'RW',
      weight: 130,
    },
  },
  {
    id: 12,
    sportId: 4,
    profile: {
      firstName: 'Luca',
      lastName: 'Martinez',
      gender: 'M',
      position: 'OH',
      weight: 190,
    },
  },
];
app.get('/api/players', (req: Request, res: Response, next: NextFunction) => {
  console.log('✅ Backend hit: /api/players');

  res.status(200).json(players);
});

app.post('/api/players', (req: Request, res: Response, next: NextFunction) => {
  players.push(req.body);

  res.status(201).json({ message: 'New player added' });
});

app.listen(3000);
