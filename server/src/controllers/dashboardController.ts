import { Request, Response } from 'express';

export const dashboardController = {
  getStats(req: Request, res: Response) {
    res.json({
      activeSocieties: 46,
      eventsThisMonth: 128,
      uniqueAttendees: 2312,
      aiRecommendations: 38
    });
  },

  getActivity(req: Request, res: Response) {
    res.json({
      activityData: [
        { day: 'Mon', events: 4, signups: 42 },
        { day: 'Tue', events: 3, signups: 36 },
        { day: 'Wed', events: 5, signups: 58 },
        { day: 'Thu', events: 2, signups: 21 },
        { day: 'Fri', events: 6, signups: 74 },
        { day: 'Sat', events: 3, signups: 33 },
        { day: 'Sun', events: 1, signups: 12 }
      ],
      societyDistribution: [
        { name: 'Cultural', value: 18 },
        { name: 'Technical', value: 12 },
        { name: 'Sports', value: 9 },
        { name: 'Arts', value: 7 }
      ]
    });
  },

  getRecentActivity(req: Request, res: Response) {
    res.json({
      activities: [
        'Robotics Society published the lineup for RoboFest 2026.',
        'Cultural Committee approved 3 new inter-college collaborations.',
        'Photography Club reached 500 members milestone.',
        'AI Society scheduled 2 workshops for next weekend.'
      ]
    });
  },

  getUpcomingEvents(req: Request, res: Response) {
    res.json({
      events: [
        {
          id: 1,
          title: 'RoboFest 2026 Qualifiers',
          meta: 'Robotics Society · Tomorrow · 5:30 PM'
        },
        {
          id: 2,
          title: 'Midnight Acoustic Sessions',
          meta: 'Music Club · Friday · 9:00 PM'
        },
        {
          id: 3,
          title: 'AI for Campus Operations',
          meta: 'AI Society · Sunday · 11:00 AM'
        }
      ]
    });
  },

  exportReport(req: Request, res: Response) {
    const { format = 'json' } = req.body;

    const reportData = {
      generatedAt: new Date().toISOString(),
      stats: {
        activeSocieties: 46,
        eventsThisMonth: 128,
        uniqueAttendees: 2312,
        aiRecommendations: 38
      },
      summary: 'College Society Management System - Monthly Report'
    };

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
      res.send('Metric,Value\nActive Societies,46\nEvents This Month,128\nUnique Attendees,2312\nAI Recommendations,38');
    } else {
      res.json({ success: true, report: reportData });
    }
  }
};
