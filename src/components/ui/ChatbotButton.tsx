import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatbotButton() {
  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full bg-neon-cyan/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.button
        type="button"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple text-slate-950 shadow-glow outline-none ring-2 ring-white/40"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.button>
    </div>
  );
}

