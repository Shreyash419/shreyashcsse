import EventCard from '../components/ui/EventCard';

const events = [
  {
    name: 'RoboFest 2026: Autonomous Arena',
    society: 'Aurora Robotics Society',
    date: 'Tomorrow · 5:30 PM · Main Auditorium',
    capacity: 320,
    filled: 261,
    status: 'upcoming' as const
  },
  {
    name: 'Midnight Acoustic Sessions',
    society: 'Crescendo Music Collective',
    date: 'Today · 9:00 PM · Amphitheatre',
    capacity: 220,
    filled: 198,
    status: 'live' as const
  },
  {
    name: 'Inter-College Basketball Finals',
    society: 'Vanguard Sports League',
    date: 'Friday · 7:00 PM · Sports Complex',
    capacity: 500,
    filled: 412,
    status: 'upcoming' as const
  },
  {
    name: 'AI for Campus Operations Workshop',
    society: 'Quantum Computing Circle',
    date: 'Sunday · 11:00 AM · Innovation Lab',
    capacity: 120,
    filled: 94,
    status: 'upcoming' as const
  },
  {
    name: 'Monsoon Street Photography Walk',
    society: 'LensCraft Photography Club',
    date: 'Completed · Last week',
    capacity: 80,
    filled: 76,
    status: 'completed' as const
  }
];

export default function Events() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Events
          </p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Live campus calendar
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Track capacity, engagement and status across every society event in real time.
          </p>
        </div>
        <button className="btn-primary text-xs">Plan event</button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.name} {...event} />
        ))}
      </div>
    </div>
  );
}

