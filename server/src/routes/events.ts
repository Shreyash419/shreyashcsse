import { Router } from 'express';
import { eventsController } from '../controllers/eventsController.js';

export const eventsRouter = Router();

eventsRouter.get('/', eventsController.getAllEvents);
eventsRouter.get('/:id', eventsController.getEventById);
eventsRouter.post('/', eventsController.createEvent);
eventsRouter.put('/:id', eventsController.updateEvent);
eventsRouter.delete('/:id', eventsController.deleteEvent);
