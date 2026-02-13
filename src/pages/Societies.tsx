import { motion } from 'framer-motion';
import SocietyCard from '../components/ui/SocietyCard';

const societies = [
  { name: 'Aurora Robotics Society', category: 'Technical', members: 184, meetingsPerMonth: 6 },
  { name: 'Crescendo Music Collective', category: 'Cultural', members: 312, meetingsPerMonth: 8 },
  { name: 'Spectrum Arts Guild', category: 'Arts', members: 129, meetingsPerMonth: 5 },
  { name: 'Vanguard Sports League', category: 'Sports', members: 267, meetingsPerMonth: 10 },
  { name: 'LensCraft Photography Club', category: 'Arts', members: 201, meetingsPerMonth: 4 },
  { name: 'Quantum Computing Circle', category: 'Technical', members: 96, meetingsPerMonth: 3 },
  { name: 'Dramatics Ensemble', category: 'Cultural', members: 178, meetingsPerMonth: 7 },
  { name: 'Data Science Forum', category: 'Technical', members: 142, meetingsPerMonth: 4 }
];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.03 * i, duration: 0.2 }
  })
};

export default function Societies() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Societies
          </p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Curated campus collectives
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Browse and manage societies with live membership insights and engagement signals.
          </p>
        </div>
        <button className="btn-primary text-xs">New society</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {societies.map((society, index) => (
          <motion.div
            key={society.name}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <SocietyCard {...society} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

