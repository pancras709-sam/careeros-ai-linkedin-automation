import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Sparkles, Bot, User, RefreshCw, Minimize2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AICopilotDrawer: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen, userRole } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Hello! I'm your Navricon Copilot. I can analyze your uploaded resume, suggest high-impact projects, prepare you for audio/video interviews, or help with recruiter outreach messages. How can I help you today?`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCopilotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isCopilotOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: query };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, userRole }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'I apologize, I experienced a network issue. Please try asking again!' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Please check your connection or try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'How do I improve my resume for Google?',
    'What projects should I build for Full Stack AI role?',
    'Write a LinkedIn networking message to a Tech Recruiter',
    'Simulate a 2-minute system design interview question',
  ];

  return (
    <>
      <AnimatePresence>
        {!isCopilotOpen && (
          <motion.button
            key="copilot-floating-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsCopilotOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-2xl shadow-blue-500/30 border border-white/20 hover:shadow-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="font-bold tracking-wide">AI Copilot</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCopilotOpen && (
          <React.Fragment>
            {/* Mobile backdrop shadow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCopilotOpen(false)}
              className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            />

            {/* Bottom-right floating Copilot window */}
            <motion.div
              key="copilot-window"
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[82vh] bg-zinc-950/95 border border-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold flex items-center gap-1.5">
                      Navricon Copilot
                    </h3>
                    <p className="text-[10px] text-zinc-400">Contextual career intelligence & mentor</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsCopilotOpen(false)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Minimize"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsCopilotOpen(false)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Action Chips */}
              <div className="p-2.5 border-b border-white/5 bg-zinc-900/40 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 text-[10px] font-medium rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-blue-500/50 transition-all shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white font-medium rounded-tr-none shadow-sm'
                          : 'bg-zinc-900/90 border border-white/10 text-zinc-200 rounded-tl-none whitespace-pre-wrap'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2.5 items-center text-[11px] text-zinc-400">
                    <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <span>Analyzing career context...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="p-3 border-t border-white/10 bg-zinc-900/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-xl p-1 focus-within:border-blue-500/50 transition-all">
                  <input
                    type="text"
                    placeholder="Ask your AI mentor anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-transparent px-2.5 py-1.5 text-[11px] text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    disabled={!input.trim() || loading}
                    onClick={() => handleSend()}
                    className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};

