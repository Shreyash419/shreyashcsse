import { motion } from 'framer-motion';
import clsx from 'clsx';

interface EventCardProps {
  name: string;
  society: string;
  date: string;
  capacity: number;
  filled: number;
  status: 'upcoming' | 'live' | 'completed';
}

export default function EventCard({ name, society, date, capacity, filled, status }: EventCardProps) {
  const percentage = Math.min(100, Math.round((filled / capacity) * 100));

  const statusColor =
    status === 'live'
      ? 'bg-emerald-400'
      : status === 'upcoming'
      ? 'bg-neon-cyan'
      : 'bg-slate-400';

  const statusLabel =
    status === 'live' ? 'Live now' : status === 'upcoming' ? 'Upcoming' : 'Completed';

  return (
    <motion.div
      className={clsx(
        'group relative rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/90 p-[1px] shadow-soft'
      )}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="rounded-[1.4rem] bg-slate-950/90 p-4 text-xs text-slate-200">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {society}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">{name}</h3>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="relative flex items-center gap-1 rounded-3xl bg-slate-900 px-2 py-1">
              <span className="relative flex h-2 w-2">
                <span
                  className={clsx(
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60',
                    statusColor
                  )}
                />
                <span className={clsx('relative inline-flex h-2 w-2 rounded-full', statusColor)} />
              </span>
              <span className="text-[10px] font-medium text-slate-200">{statusLabel}</span>
            </div>
            <p className="text-[10px] text-slate-500">{date}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Capacity</span>
            <span>
              {filled}/{capacity} ({percentage}%)
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

