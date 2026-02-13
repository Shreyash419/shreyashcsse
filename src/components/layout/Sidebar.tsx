import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Home, Sparkles, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
  { to: '/societies', label: 'Societies', icon: <Users className="h-4 w-4" /> },
  { to: '/events', label: 'Events', icon: <CalendarDays className="h-4 w-4" /> },
  { to: '/ai', label: 'AI Studio', icon: <Sparkles className="h-4 w-4" /> }
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 232 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="glass-card sticky top-4 hidden h-[calc(100vh-2rem)] flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-3 text-sm shadow-soft backdrop-blur-2xl md:flex"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1 pt-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-3xl bg-gradient-to-br from-neon-cyan to-neon-purple text-slate-950 shadow-glow">
                <span className="text-sm font-black">CS</span>
              </div>
              {!collapsed && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Aurora
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    College Societies
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex h-7 w-7 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-slate-500 shadow-soft transition hover:text-neon-cyan dark:bg-black/40"
            >
              {collapsed ? (
                <ChevronRight className="h-3.5 w-3.5" />
              ) : (
                <ChevronLeft className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 rounded-3xl px-3 py-2 text-xs font-medium text-slate-500 transition',
                    'hover:bg-white/10 hover:text-neon-cyan dark:hover:bg-white/5',
                    isActive &&
                      'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/30 text-neon-cyan shadow-soft'
                  )
                }
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-2xl bg-slate-900/5 text-xs dark:bg-white/5">
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className={clsx('mt-4 rounded-3xl bg-slate-900/5 p-3 text-[10px] dark:bg-white/5')}>
          {!collapsed && (
            <>
              <p className="mb-1 font-semibold text-slate-300">Usage this month</p>
              <p className="mb-2 text-slate-500">You are at 72% of your activity quota.</p>
            </>
          )}
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800/40">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
            </div>
            {!collapsed && <span className="text-[10px] text-slate-400">72%</span>}
          </div>
        </div>
      </motion.aside>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-2 rounded-3xl bg-slate-950/80 px-3 py-2 text-[11px] text-slate-400 shadow-soft backdrop-blur-2xl md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex flex-1 flex-col items-center gap-1 rounded-3xl px-2 py-1.5 transition',
                'hover:text-neon-cyan',
                isActive && 'bg-white/5 text-neon-cyan shadow-soft'
              )
            }
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-2xl bg-slate-900/40">
              {item.icon}
            </span>
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

