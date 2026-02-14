import { Router } from 'express';
import { chatController } from '../controllers/chatController.js';

export const chatRouter = Router();

chatRouter.post('/message', chatController.sendMessage);
chatRouter.get('/history', chatController.getHistory);
