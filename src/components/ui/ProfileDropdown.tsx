import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, LogOut, Settings } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

const PROFILE = {
  name: 'Shreyash',
  email: 'shreyash@college.edu',
  role: 'Society Admin',
  society: 'College Society Management',
  memberSince: 'Jan 2024',
  eventsOrganized: 12,
  societiesManaged: 3
};

export default function ProfileDropdown({ isOpen, onClose, anchorRef }: ProfileDropdownProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-3xl border border-white/20 bg-slate-50/95 shadow-glow backdrop-blur-xl dark:bg-slate-900/95"
        >
          <div className="border-b border-slate-200/60 px-4 py-4 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple text-slate-950">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {PROFILE.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{PROFILE.role}</p>
              </div>
            </div>
          </div>
          <div className="space-y-1 p-2">
            <div className="flex items-center gap-2 rounded-2xl px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
              <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>{PROFILE.email}</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
              <Shield className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>{PROFILE.society}</span>
            </div>
            <div className="rounded-2xl px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400">
              Member since {PROFILE.memberSince} · {PROFILE.eventsOrganized} events organized ·{' '}
              {PROFILE.societiesManaged} societies managed
            </div>
          </div>
          <div className="border-t border-slate-200/60 p-2 dark:border-slate-700/60">
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/60 dark:hover:text-slate-50"
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-xs text-slate-600 transition hover:bg-red-100 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
