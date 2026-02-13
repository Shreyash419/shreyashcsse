import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const spring = {
  type: 'spring',
  stiffness: 260,
  damping: 20
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-10 w-18 items-center justify-between rounded-3xl border border-white/20 bg-white/10 px-2 text-slate-700 shadow-soft backdrop-blur-xl transition hover:shadow-glow dark:bg-black/20 dark:text-slate-100"
      whileTap={{ scale: 0.96 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-y-1 left-1 right-1 rounded-3xl bg-gradient-to-r from-neon-cyan/70 to-neon-purple/70"
        layout
        transition={{ ...spring, duration: 0.5 }}
        style={{
          width: '50%',
          transform: isDark ? 'translateX(100%)' : 'translateX(0%)'
        }}
      />
      <div className="relative z-10 flex w-full items-center justify-between">
        <AnimatePresence initial={false} mode="wait">
          {!isDark && (
            <motion.span
              key="sun"
              initial={{ rotate: -45, y: -8, opacity: 0 }}
              animate={{ rotate: 0, y: 0, opacity: 1 }}
              exit={{ rotate: 45, y: 8, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex items-center gap-1 text-xs font-medium"
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </motion.span>
          )}
          {isDark && (
            <motion.span
              key="moon"
              initial={{ rotate: 45, y: 8, opacity: 0 }}
              animate={{ rotate: 0, y: 0, opacity: 1 }}
              exit={{ rotate: -45, y: -8, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="ml-auto flex items-center gap-1 text-xs font-medium"
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

