import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 mb-4 flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-50/70 px-4 py-3 text-sm shadow-soft backdrop-blur-2xl dark:bg-slate-900/60">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative hidden flex-1 items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search societies, events, people..."
            className="h-9 w-full rounded-3xl border border-slate-200 bg-white/60 pl-9 pr-3 text-xs text-slate-700 shadow-inner outline-none placeholder:text-slate-400 focus:border-neon-cyan/80 focus:ring-1 focus:ring-neon-cyan/60 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-3xl border border-white/20 bg-white/60 text-slate-600 shadow-soft transition hover:text-neon-cyan dark:bg-slate-900/80 dark:text-slate-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-50" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-neon-cyan" />
          </span>
          <Bell className="h-4 w-4" />
        </motion.button>
        <ThemeToggle />
        <motion.button
          type="button"
          className="flex items-center gap-2 rounded-3xl bg-slate-900 text-xs text-slate-100 shadow-soft ring-1 ring-white/10 transition hover:ring-neon-cyan/60 dark:bg-slate-800"
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-3xl bg-gradient-to-br from-neon-cyan to-neon-purple text-slate-950">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden pr-3 text-left sm:block">
            <p className="text-[11px] font-semibold leading-tight">Shreyash</p>
            <p className="text-[10px] text-slate-400">Society Admin</p>
          </div>
        </motion.button>
      </div>
    </header>
  );
}

