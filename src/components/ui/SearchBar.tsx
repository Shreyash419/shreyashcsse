import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Society {
  name: string;
  category: string;
}

interface Event {
  name: string;
  society: string;
  date: string;
}

const STATIC_SOCIETIES: Society[] = [
  { name: 'Aurora Robotics Society', category: 'Technical' },
  { name: 'Crescendo Music Collective', category: 'Cultural' },
  { name: 'Spectrum Arts Guild', category: 'Arts' },
  { name: 'Vanguard Sports League', category: 'Sports' },
  { name: 'LensCraft Photography Club', category: 'Arts' },
  { name: 'Quantum Computing Circle', category: 'Technical' },
  { name: 'Dramatics Ensemble', category: 'Cultural' },
  { name: 'Data Science Forum', category: 'Technical' }
];

const STATIC_EVENTS: Event[] = [
  { name: 'RoboFest 2026: Autonomous Arena', society: 'Aurora Robotics Society', date: 'Tomorrow · 5:30 PM' },
  { name: 'Midnight Acoustic Sessions', society: 'Crescendo Music Collective', date: 'Today · 9:00 PM' },
  { name: 'Inter-College Basketball Finals', society: 'Vanguard Sports League', date: 'Friday · 7:00 PM' },
  { name: 'AI for Campus Operations Workshop', society: 'Quantum Computing Circle', date: 'Sunday · 11:00 AM' },
  { name: 'Monsoon Street Photography Walk', society: 'LensCraft Photography Club', date: 'Completed · Last week' }
];

function filterMatches(query: string, text: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return text.toLowerCase().includes(q);
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [societies, setSocieties] = useState<Society[]>(STATIC_SOCIETIES);
  const [events, setEvents] = useState<Event[]>(STATIC_EVENTS);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socRes, evRes] = await Promise.all([
          fetch('/api/societies'),
          fetch('/api/events')
        ]);
        if (socRes.ok) {
          const { societies: s } = await socRes.json();
          if (Array.isArray(s)) setSocieties(s.map((x: { name: string; category: string }) => ({ name: x.name, category: x.category })));
        }
        if (evRes.ok) {
          const { events: e } = await evRes.json();
          if (Array.isArray(e)) setEvents(e.map((x: { name: string; society: string; date: string }) => ({ name: x.name, society: x.society, date: x.date })));
        }
      } catch {
        // Use static data if backend is not running
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setShowDropdown(query.trim().length > 0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSocieties = societies.filter(
    (s) => filterMatches(query, s.name) || filterMatches(query, s.category)
  );
  const filteredEvents = events.filter(
    (e) => filterMatches(query, e.name) || filterMatches(query, e.society)
  );
  const hasResults = filteredSocieties.length > 0 || filteredEvents.length > 0;
  const shouldShowDropdown = showDropdown && query.trim().length > 0;

  const handleSelectSociety = () => {
    setQuery('');
    setShowDropdown(false);
    navigate('/societies');
  };

  const handleSelectEvent = () => {
    setQuery('');
    setShowDropdown(false);
    navigate('/events');
  };

  return (
    <div ref={containerRef} className="relative hidden flex-1 md:block">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setShowDropdown(true)}
          placeholder="Search societies, events..."
          className="h-9 w-full rounded-3xl border border-slate-200 bg-white/60 pl-9 pr-3 text-xs text-slate-700 shadow-inner outline-none placeholder:text-slate-400 focus:border-neon-cyan/80 focus:ring-1 focus:ring-neon-cyan/60 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      <AnimatePresence>
        {shouldShowDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-3xl border border-white/20 bg-slate-50/95 shadow-glow backdrop-blur-xl dark:bg-slate-900/95"
          >
            {hasResults ? (
              <div className="py-2">
                {filteredSocieties.length > 0 && (
                  <div className="mb-1 px-3 py-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Societies
                    </p>
                  </div>
                )}
                {filteredSocieties.slice(0, 5).map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={handleSelectSociety}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs transition hover:bg-slate-200/60 dark:hover:bg-slate-700/40"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-600 dark:bg-slate-700/80 dark:text-slate-300">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-50">{s.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.category}</p>
                    </div>
                  </button>
                ))}
                {filteredEvents.length > 0 && (
                  <div className="mb-1 mt-2 border-t border-slate-200/60 px-3 py-1 pt-2 dark:border-slate-700/60">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Events
                    </p>
                  </div>
                )}
                {filteredEvents.slice(0, 5).map((e) => (
                  <button
                    key={e.name}
                    type="button"
                    onClick={handleSelectEvent}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs transition hover:bg-slate-200/60 dark:hover:bg-slate-700/40"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-600 dark:bg-slate-700/80 dark:text-slate-300">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-50">{e.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {e.society} · {e.date}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                No societies or events match &quot;{query}&quot;
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
