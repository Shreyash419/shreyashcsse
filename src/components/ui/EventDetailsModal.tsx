import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Clock, Users, FileText, Check } from 'lucide-react';

export interface EventDetails {
  title: string;
  society: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  filled: number;
  description: string;
  status?: string;
}

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails | null;
}

export default function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (isOpen && event) setRegistered(false);
  }, [isOpen, event?.title]);

  if (!event) return null;

  const percentage = Math.min(100, Math.round((event.filled / event.capacity) * 100));
  const isFull = percentage >= 100;

  const handleRegister = () => {
    setRegistered(true);
    // TODO: call API when backend is ready
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-slate-50/95 shadow-glow backdrop-blur-xl dark:bg-slate-900/95"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-slate-200/60 px-6 py-4 dark:border-slate-700/60">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {event.society}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {event.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-slate-500 transition hover:bg-slate-200/80 hover:text-slate-700 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-200/80 dark:bg-slate-700/60">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Date</p>
                  <p className="font-medium text-slate-900 dark:text-slate-50">{event.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-200/80 dark:bg-slate-700/60">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Time</p>
                  <p className="font-medium text-slate-900 dark:text-slate-50">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-200/80 dark:bg-slate-700/60">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Venue</p>
                  <p className="font-medium text-slate-900 dark:text-slate-50">{event.venue}</p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-slate-500 dark:text-slate-400">Capacity</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-50">
                    {event.filled} / {event.capacity} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {event.description && (
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Description</span>
                  </div>
                  <p className="rounded-2xl bg-slate-200/60 px-4 py-3 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
                    {event.description}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-200/60 p-4 dark:border-slate-700/60">
              {!registered ? (
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isFull}
                  className="btn-primary w-full py-2.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFull ? 'Event full' : 'Register for event'}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="h-4 w-4" />
                  <span>You&apos;re registered!</span>
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-3xl border border-slate-200/80 px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:border-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan dark:border-slate-700 dark:text-slate-200 dark:hover:border-neon-cyan dark:hover:bg-neon-cyan/10"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
