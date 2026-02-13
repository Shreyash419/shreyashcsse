import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const sparkleVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.8, 1.1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export default function Ai() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            AI Studio
          </p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Intelligent society recommendations
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Let Aurora AI discover high-impact events and automations across your campus.
          </p>
        </div>
      </div>

      <GlassCard className="relative overflow-hidden rounded-3xl p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.2),_transparent_55%)] opacity-80" />
        <div className="relative z-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-3xl bg-slate-950/80 text-neon-cyan shadow-glow">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                  Aurora AI
                </p>
                <p className="text-[11px] text-slate-400">
                  Curated insights from historical participation, time, and society affinities.
                </p>
              </div>
            </div>
            <div className="space-y-3 text-xs text-slate-200">
              <p className="rounded-3xl bg-slate-950/70 px-4 py-3">
                Based on the last 90 days of activity, <span className="font-semibold">Friday</span>{' '}
                evenings between <span className="font-semibold">7–10 PM</span> drive the highest
                unique attendance for inter-society events.
              </p>
              <p className="rounded-3xl bg-slate-950/60 px-4 py-3">
                Consider a{' '}
                <span className="font-semibold">Tech × Arts collaboration</span> featuring the
                Robotics Society and Spectrum Arts Guild with live installations. Projected uplift:{' '}
                <span className="font-semibold text-neon-cyan">+34% engagement</span> over average
                technical events.
              </p>
              <p className="rounded-3xl bg-slate-950/50 px-4 py-3">
                Deploy a <span className="font-semibold">smart RSVP window</span> opening 72 hours
                before the event and a reminder at +8 hours, synced with peak mobile usage for your
                campus.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-4 -top-8 h-44 w-44 rounded-full bg-neon-cyan/20 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-neon-purple/20 blur-3xl" />
            <div className="relative space-y-3 text-xs text-slate-200">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                AI playbook preview
              </p>
              <div className="space-y-2 rounded-3xl bg-slate-950/70 p-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span>Projected attendance band</span>
                  <span className="font-semibold text-neon-cyan">180 – 230</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-300">
                  <div className="rounded-2xl bg-slate-900/70 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Best slot
                    </p>
                    <p className="mt-1 font-semibold">Fri · 8:30 PM</p>
                    <p className="mt-1 text-[11px] text-slate-400">+21% vs average Friday</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Ideal venue
                    </p>
                    <p className="mt-1 font-semibold">Central Courtyard</p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Highest dwell time for open-air fests.
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
                className="pointer-events-none absolute -right-1 top-4 h-8 w-8 rounded-full border border-neon-cyan/40 bg-gradient-to-br from-neon-cyan/40 to-neon-purple/40 shadow-glow"
              />

              <button className="btn-primary mt-2 w-full text-xs">Generate next playbook</button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

