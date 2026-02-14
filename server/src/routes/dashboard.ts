import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController.js';

export const dashboardRouter = Router();

dashboardRouter.get('/stats', dashboardController.getStats);
dashboardRouter.get('/activity', dashboardController.getActivity);
dashboardRouter.get('/recent-activity', dashboardController.getRecentActivity);
dashboardRouter.get('/upcoming-events', dashboardController.getUpcomingEvents);
dashboardRouter.post('/export-report', dashboardController.exportReport);
