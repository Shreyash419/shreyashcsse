import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.div
      className={clsx(
        'glass-card relative overflow-hidden border border-white/20 bg-white/10 dark:bg-black/10',
        className
      )}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-neon-purple/10 opacity-60 mix-blend-overlay" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

