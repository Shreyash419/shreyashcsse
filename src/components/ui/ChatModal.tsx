import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const API_BASE = '/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WELCOME = `Hi! I'm Aurora AI, your assistant for the College Society Management platform. I can help you with:
• Upcoming events and schedules
• Societies and their activities
• Event planning and recommendations
• Dashboard stats and insights

What would you like to know?`;

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 'welcome', role: 'assistant', content: WELCOME, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) throw new Error('Failed to send message');
      const data = await res.json();
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.response || "I couldn't process that. Please try again.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallback: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble connecting. Make sure the backend server is running on port 3001. In the meantime, you can browse Events and Societies from the sidebar.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="chat-modal"
          className="fixed inset-0 z-50 flex items-end justify-end p-3 pb-20 sm:p-4 sm:pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
          <motion.div
            className="relative flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/20 bg-slate-50/95 shadow-glow backdrop-blur-xl dark:bg-slate-900/95 sm:h-[520px]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/60 px-4 py-3 dark:border-slate-700/60">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple text-slate-950">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Aurora AI
                </h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Ask about events & societies
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-2xl text-slate-500 transition hover:bg-slate-200/80 hover:text-slate-700 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                  'flex',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={clsx(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-slate-950'
                      : 'bg-slate-200/80 text-slate-800 dark:bg-slate-800/80 dark:text-slate-100'
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 rounded-2xl bg-slate-200/80 px-4 py-2.5 dark:bg-slate-800/80">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neon-cyan" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neon-purple" style={{ animationDelay: '0.15s' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: '0.3s' }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="border-t border-slate-200/60 p-3 dark:border-slate-700/60"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about events, societies..."
                disabled={isLoading}
                className={clsx(
                  'flex-1 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm',
                  'placeholder:text-slate-400 outline-none transition',
                  'focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30',
                  'dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500'
                )}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-purple text-slate-950 shadow-soft transition hover:shadow-glow disabled:opacity-50 disabled:hover:shadow-soft"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
