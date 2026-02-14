import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Users, Sparkles } from 'lucide-react';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

const DEMO_NOTIFICATIONS = [
  {
    id: 1,
    type: 'event',
    title: 'RoboFest 2026 tomorrow',
    message: 'Reminder: RoboFest Qualifiers at 5:30 PM, Main Auditorium.',
    time: '2h ago',
    unread: true,
    icon: CalendarDays
  },
  {
    id: 2,
    type: 'society',
    title: 'New member joined',
    message: '15 new members joined Aurora Robotics Society this week.',
    time: '5h ago',
    unread: true,
    icon: Users
  },
  {
    id: 3,
    type: 'ai',
    title: 'AI recommendation ready',
    message: 'New playbook: Tech × Arts collaboration event (+34% engagement).',
    time: 'Yesterday',
    unread: false,
    icon: Sparkles
  },
  {
    id: 4,
    type: 'event',
    title: 'Midnight Acoustic Sessions',
    message: 'Event is live now. 198 attendees at Amphitheatre.',
    time: 'Yesterday',
    unread: false,
    icon: CalendarDays
  },
  {
    id: 5,
    type: 'society',
    title: 'Dramatics Ensemble update',
    message: 'Rehearsal schedule updated for next week.',
    time: '2 days ago',
    unread: false,
    icon: Users
  }
];

export default function NotificationsDropdown({
  isOpen,
  onClose,
  anchorRef
}: NotificationsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  const unreadCount = DEMO_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-3xl border border-white/20 bg-slate-50/95 shadow-glow backdrop-blur-xl dark:bg-slate-900/95"
        >
          <div className="flex items-center justify-between border-b border-slate-200/60 px-4 py-3 dark:border-slate-700/60">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-neon-cyan/20 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {DEMO_NOTIFICATIONS.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`flex gap-3 border-b border-slate-200/40 px-4 py-3 last:border-b-0 dark:border-slate-700/40 ${
                    n.unread ? 'bg-neon-cyan/5 dark:bg-neon-cyan/10' : ''
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-600 dark:bg-slate-700/80 dark:text-slate-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-900 dark:text-slate-50">
                      {n.title}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                      {n.message}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">{n.time}</p>
                  </div>
                  {n.unread && (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neon-cyan" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-t border-slate-200/60 p-2 dark:border-slate-700/60">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
            >
              Mark all as read
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
