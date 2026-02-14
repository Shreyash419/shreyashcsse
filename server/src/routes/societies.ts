import { Router } from 'express';
import { societiesController } from '../controllers/societiesController.js';

export const societiesRouter = Router();

societiesRouter.get('/', societiesController.getAllSocieties);
societiesRouter.get('/:id', societiesController.getSocietyById);
societiesRouter.post('/', societiesController.createSociety);
societiesRouter.put('/:id', societiesController.updateSociety);
societiesRouter.delete('/:id', societiesController.deleteSociety);
