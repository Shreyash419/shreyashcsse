import { MotionConfig, motion } from 'framer-motion';
import { Activity, CalendarDays, Users, Sparkles } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';

const activityData = [
  { day: 'Mon', events: 4, signups: 42 },
  { day: 'Tue', events: 3, signups: 36 },
  { day: 'Wed', events: 5, signups: 58 },
  { day: 'Thu', events: 2, signups: 21 },
  { day: 'Fri', events: 6, signups: 74 },
  { day: 'Sat', events: 3, signups: 33 },
  { day: 'Sun', events: 1, signups: 12 }
];

const societyDistribution = [
  { name: 'Cultural', value: 18 },
  { name: 'Technical', value: 12 },
  { name: 'Sports', value: 9 },
  { name: 'Arts', value: 7 }
];

const pieColors = ['#00f5ff', '#a855f7', '#22c55e', '#eab308'];

const listVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.2 }
  })
};

export default function Dashboard() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Overview
            </p>
            <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
              College Society Command Center
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Monitor engagement, events, and society health in one premium dashboard.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary text-xs">Create event</button>
            <button className="rounded-3xl border border-slate-200/80 bg-white/60 px-4 py-2 text-xs font-medium text-slate-700 shadow-soft transition hover:border-neon-cyan hover:text-neon-cyan dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
              Export report
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <motion.div custom={0} variants={listVariants} initial="hidden" animate="visible">
            <StatCard
              label="Active societies"
              value={46}
              icon={<Users className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div custom={1} variants={listVariants} initial="hidden" animate="visible">
            <StatCard
              label="Events this month"
              value={128}
              icon={<CalendarDays className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div custom={2} variants={listVariants} initial="hidden" animate="visible">
            <StatCard
              label="Unique attendees"
              value={2312}
              icon={<Activity className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div custom={3} variants={listVariants} initial="hidden" animate="visible">
            <StatCard
              label="AI recommendations"
              value={38}
              icon={<Sparkles className="h-4 w-4" />}
            />
          </motion.div>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <GlassCard className="rounded-3xl p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Event momentum
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Events and signups over the last 7 days
                </p>
              </div>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.3} />
                  <XAxis dataKey="day" tickLine={false} tickMargin={8} stroke="#64748b" />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    stroke="#64748b"
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      borderRadius: 16,
                      border: '1px solid rgba(148, 163, 184, 0.5)',
                      fontSize: 11
                    }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="events"
                    stroke="#00f5ff"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="signups"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="rounded-3xl p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Society mix
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  How your societies are distributed
                </p>
              </div>
            </div>
            <div className="grid h-52 grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={societyDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={4}
                  >
                    {societyDistribution.map((_, index) => (
                      <Cell key={index} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <ul className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                {societyDistribution.map((item, index) => (
                  <li key={item.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: pieColors[index] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-slate-400">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <GlassCard className="rounded-3xl p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Recent activity
              </p>
              <span className="rounded-3xl bg-slate-900/5 px-2 py-1 text-[10px] text-slate-500 dark:bg-white/5">
                Last 24 hours
              </span>
            </div>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {[
                'Robotics Society published the lineup for RoboFest 2026.',
                'Cultural Committee approved 3 new inter-college collaborations.',
                'Photography Club reached 500 members milestone.',
                'AI Society scheduled 2 workshops for next weekend.'
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 rounded-2xl bg-slate-900/5 px-3 py-2 dark:bg-white/5"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="rounded-3xl p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Upcoming events
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {[
                {
                  title: 'RoboFest 2026 Qualifiers',
                  meta: 'Robotics Society · Tomorrow · 5:30 PM'
                },
                {
                  title: 'Midnight Acoustic Sessions',
                  meta: 'Music Club · Friday · 9:00 PM'
                },
                {
                  title: 'AI for Campus Operations',
                  meta: 'AI Society · Sunday · 11:00 AM'
                }
              ].map((event) => (
                <li
                  key={event.title}
                  className="flex items-start justify-between gap-2 rounded-2xl bg-slate-900/5 px-3 py-2 dark:bg-white/5"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                      {event.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{event.meta}</p>
                  </div>
                  <button className="btn-primary px-3 py-1 text-[10px]">View</button>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </MotionConfig>
  );
}

