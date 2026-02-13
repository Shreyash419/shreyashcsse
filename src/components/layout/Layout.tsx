import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ChatbotButton from '../ui/ChatbotButton';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        theme === 'dark'
          ? 'from-slate-950 via-slate-900 to-slate-950'
          : 'from-slate-100 via-slate-50 to-slate-200'
      } text-slate-900 transition-colors duration-500 dark:text-slate-100`}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl gap-4 px-3 py-4 md:px-6">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <main className="relative flex min-h-[calc(100vh-2rem)] flex-1 flex-col pb-16 md:pb-4">
          <Navbar />
          <motion.section
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-1 space-y-4 rounded-3xl"
          >
            {children}
          </motion.section>
          <ChatbotButton />
        </main>
      </div>
    </div>
  );
}

