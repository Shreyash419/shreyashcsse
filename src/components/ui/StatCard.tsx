import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

interface StatCardProps {
  label: string;
  value: number;
  icon?: ReactNode;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

export default function StatCard({
  label,
  value,
  icon,
  prefix,
  suffix,
  durationMs = 1200
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return (
    <GlassCard className="flex flex-col gap-3 rounded-3xl p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {label}
        </p>
        {icon && (
          <motion.div
            className="flex h-9 w-9 items-center justify-center rounded-3xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/30 text-neon-cyan"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {icon}
          </motion.div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
          {prefix}
          {displayValue.toLocaleString()}
          {suffix}
        </p>
      </div>
    </GlassCard>
  );
}

