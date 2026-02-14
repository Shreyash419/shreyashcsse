import { Router } from 'express';
import { aiController } from '../controllers/aiController.js';

export const aiRouter = Router();

aiRouter.post('/generate-playbook', aiController.generatePlaybook);
aiRouter.get('/recommendations', aiController.getRecommendations);
