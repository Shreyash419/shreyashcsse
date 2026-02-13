import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SocietyCardProps {
  name: string;
  category: string;
  members: number;
  meetingsPerMonth: number;
}

export default function SocietyCard({
  name,
  category,
  members,
  meetingsPerMonth
}: SocietyCardProps) {
  return (
    <motion.div
      className={clsx(
        'group relative h-full cursor-pointer rounded-3xl border border-white/20',
        'bg-white/10 p-4 text-sm text-slate-900 shadow-soft backdrop-blur-xl',
        'dark:bg-slate-900/50 dark:text-slate-100'
      )}
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateX: -4, rotateY: 4, y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-cyan/15 via-transparent to-neon-purple/25 opacity-0 mix-blend-screen transition group-hover:opacity-100" />
      <div className="relative flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {category}
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
              {name}
            </h3>
          </div>
          <span className="rounded-3xl bg-slate-900/5 px-2 py-1 text-[10px] font-medium text-slate-500 dark:bg-white/5">
            {meetingsPerMonth} meets/mo
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em]">Members</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {members.toLocaleString()}
            </p>
          </div>
          <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/5">
            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

