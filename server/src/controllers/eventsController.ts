import { Request, Response } from 'express';

// Mock database (use a real database in production)
let events = [
  {
    id: 1,
    name: 'RoboFest 2026: Autonomous Arena',
    society: 'Aurora Robotics Society',
    date: 'Tomorrow · 5:30 PM · Main Auditorium',
    capacity: 320,
    filled: 261,
    status: 'upcoming'
  },
  {
    id: 2,
    name: 'Midnight Acoustic Sessions',
    society: 'Crescendo Music Collective',
    date: 'Today · 9:00 PM · Amphitheatre',
    capacity: 220,
    filled: 198,
    status: 'live'
  },
  {
    id: 3,
    name: 'Inter-College Basketball Finals',
    society: 'Vanguard Sports League',
    date: 'Friday · 7:00 PM · Sports Complex',
    capacity: 500,
    filled: 412,
    status: 'upcoming'
  },
  {
    id: 4,
    name: 'AI for Campus Operations Workshop',
    society: 'Quantum Computing Circle',
    date: 'Sunday · 11:00 AM · Innovation Lab',
    capacity: 120,
    filled: 94,
    status: 'upcoming'
  },
  {
    id: 5,
    name: 'Monsoon Street Photography Walk',
    society: 'LensCraft Photography Club',
    date: 'Completed · Last week',
    capacity: 80,
    filled: 76,
    status: 'completed'
  }
];

export const eventsController = {
  getAllEvents(req: Request, res: Response) {
    res.json({ events });
  },

  getEventById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const event = events.find((e) => e.id === id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ event });
  },

  createEvent(req: Request, res: Response) {
    const { name, society, date, capacity, status = 'upcoming' } = req.body;

    if (!name || !society || !date || !capacity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEvent = {
      id: events.length + 1,
      name,
      society,
      date,
      capacity: parseInt(capacity),
      filled: 0,
      status
    };

    events.push(newEvent);
    res.status(201).json({ event: newEvent, message: 'Event created successfully' });
  },

  updateEvent(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const eventIndex = events.findIndex((e) => e.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }

    events[eventIndex] = { ...events[eventIndex], ...req.body };
    res.json({ event: events[eventIndex], message: 'Event updated successfully' });
  },

  deleteEvent(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const eventIndex = events.findIndex((e) => e.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }

    events.splice(eventIndex, 1);
    res.json({ message: 'Event deleted successfully' });
  }
};
