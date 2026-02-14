import { Request, Response } from 'express';

// Mock database (use a real database in production)
let societies = [
  { id: 1, name: 'Aurora Robotics Society', category: 'Technical', members: 184, meetingsPerMonth: 6 },
  { id: 2, name: 'Crescendo Music Collective', category: 'Cultural', members: 312, meetingsPerMonth: 8 },
  { id: 3, name: 'Spectrum Arts Guild', category: 'Arts', members: 129, meetingsPerMonth: 5 },
  { id: 4, name: 'Vanguard Sports League', category: 'Sports', members: 267, meetingsPerMonth: 10 },
  { id: 5, name: 'LensCraft Photography Club', category: 'Arts', members: 201, meetingsPerMonth: 4 },
  { id: 6, name: 'Quantum Computing Circle', category: 'Technical', members: 96, meetingsPerMonth: 3 },
  { id: 7, name: 'Dramatics Ensemble', category: 'Cultural', members: 178, meetingsPerMonth: 7 },
  { id: 8, name: 'Data Science Forum', category: 'Technical', members: 142, meetingsPerMonth: 4 }
];

export const societiesController = {
  getAllSocieties(req: Request, res: Response) {
    res.json({ societies });
  },

  getSocietyById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const society = societies.find((s) => s.id === id);
    if (!society) {
      return res.status(404).json({ error: 'Society not found' });
    }
    res.json({ society });
  },

  createSociety(req: Request, res: Response) {
    const { name, category, members = 0, meetingsPerMonth = 0 } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const newSociety = {
      id: societies.length + 1,
      name,
      category,
      members: parseInt(members),
      meetingsPerMonth: parseInt(meetingsPerMonth)
    };

    societies.push(newSociety);
    res.status(201).json({ society: newSociety, message: 'Society created successfully' });
  },

  updateSociety(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const societyIndex = societies.findIndex((s) => s.id === id);

    if (societyIndex === -1) {
      return res.status(404).json({ error: 'Society not found' });
    }

    societies[societyIndex] = { ...societies[societyIndex], ...req.body };
    res.json({ society: societies[societyIndex], message: 'Society updated successfully' });
  },

  deleteSociety(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const societyIndex = societies.findIndex((s) => s.id === id);

    if (societyIndex === -1) {
      return res.status(404).json({ error: 'Society not found' });
    }

    societies.splice(societyIndex, 1);
    res.json({ message: 'Society deleted successfully' });
  }
};
