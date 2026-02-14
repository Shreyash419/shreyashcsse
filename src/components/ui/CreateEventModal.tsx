import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateEventFormData) => void;
}

export interface CreateEventFormData {
  eventName: string;
  society: string;
  date: string;
  time: string;
  venue: string;
  capacity: string;
  description: string;
}

const SOCIETIES = [
  'Aurora Robotics Society',
  'Crescendo Music Collective',
  'Spectrum Arts Guild',
  'Vanguard Sports League',
  'LensCraft Photography Club',
  'Quantum Computing Circle',
  'Dramatics Ensemble',
  'Data Science Forum'
];

export default function CreateEventModal({ isOpen, onClose, onSubmit }: CreateEventModalProps) {
  const [formData, setFormData] = useState<CreateEventFormData>({
    eventName: '',
    society: '',
    date: '',
    time: '',
    venue: '',
    capacity: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof CreateEventFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600)); // Simulate API call
      onSubmit?.(formData);
      setSuccess(true);
      setTimeout(() => {
        setFormData({
          eventName: '',
          society: '',
          date: '',
          time: '',
          venue: '',
          capacity: '',
          description: ''
        });
        setSuccess(false);
        onClose();
      }, 1200);
    } catch {
      // Handle error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputClass = clsx(
    'w-full rounded-3xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900',
    'placeholder:text-slate-400 outline-none transition',
    'focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30',
    'dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500'
  );
  const labelClass = 'mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400';

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
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-slate-50/95 shadow-soft backdrop-blur-xl dark:bg-slate-900/95"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-4 dark:border-slate-700/60">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                Create new event
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-2xl text-slate-500 transition hover:bg-slate-200/80 hover:text-slate-700 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label htmlFor="eventName" className={labelClass}>
                  Event name *
                </label>
                <input
                  id="eventName"
                  type="text"
                  required
                  placeholder="e.g. RoboFest 2026 Qualifiers"
                  value={formData.eventName}
                  onChange={handleChange('eventName')}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="society" className={labelClass}>
                  Society *
                </label>
                <select
                  id="society"
                  required
                  value={formData.society}
                  onChange={handleChange('society')}
                  className={inputClass}
                >
                  <option value="">Select a society</option>
                  {SOCIETIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className={labelClass}>
                    Date *
                  </label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange('date')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="time" className={labelClass}>
                    Time *
                  </label>
                  <input
                    id="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={handleChange('time')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="venue" className={labelClass}>
                  Venue *
                </label>
                <input
                  id="venue"
                  type="text"
                  required
                  placeholder="e.g. Main Auditorium"
                  value={formData.venue}
                  onChange={handleChange('venue')}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="capacity" className={labelClass}>
                  Capacity
                </label>
                <input
                  id="capacity"
                  type="number"
                  min="1"
                  placeholder="e.g. 200"
                  value={formData.capacity}
                  onChange={handleChange('capacity')}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Brief description of the event..."
                  value={formData.description}
                  onChange={handleChange('description')}
                  className={clsx(inputClass, 'resize-none')}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-3xl border border-slate-200/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-70"
                >
                  {isSubmitting ? (success ? 'Created!' : 'Creating...') : 'Submit'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
