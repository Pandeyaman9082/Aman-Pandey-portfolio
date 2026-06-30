import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "assistant",
      text: "Hello! I am Aman-Bot, a custom AI host. Ask me about Aman's projects, skills, college, or current hiring availability!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest response
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 11),
      role: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Map frontend messages structure to the stateless chat history expected by the API
      const formattedHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: formattedHistory,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 11),
          role: "assistant",
          text: data.reply || "I apologize, I didn't catch that. Feel free to contact Aman at pandeyaman5283@gmail.com!",
        },
      ]);
    } catch (err) {
      console.error("AI Assistant Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 11),
          role: "assistant",
          text: "Oops, my virtual synapses got overloaded. Feel free to directly email Aman at pandeyaman5283@gmail.com!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    "What are Aman's main skills?",
    "Tell me about his Student System project.",
    "Is Aman open to internships?",
  ];

  const handleQuickPromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Dialog Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="w-[330px] sm:w-[380px] h-[480px] rounded-2xl glass-panel shadow-2xl border border-slate-200/50 dark:border-slate-800/60 mb-4 overflow-hidden flex flex-col bg-white dark:bg-slate-950/95"
          >
            {/* Header Banner */}
            <div className="p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Bot size={18} className="text-emerald-300 animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-sm leading-none flex items-center gap-1">
                    Aman's AI Co-Pilot
                    <Sparkles size={12} className="text-yellow-300 fill-yellow-300 animate-bounce" />
                  </h4>
                  <p className="text-[10px] text-indigo-200 font-semibold mt-0.5">Powered by Gemini 3.5</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversation Window area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 flex flex-col">
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed text-left ${
                      isAssistant
                        ? "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 rounded-tl-none self-start"
                        : "bg-indigo-600 text-white rounded-tr-none self-end"
                    }`}
                  >
                    {msg.text}
                  </div>
                );
              })}

              {/* Bot typing loader */}
              {isTyping && (
                <div className="bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 max-w-[50px] p-2.5 rounded-2xl rounded-tl-none self-start flex items-center justify-center">
                  <Loader2 size={14} className="animate-spin text-indigo-500" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Helper Prompts stack */}
            {messages.length === 1 && (
              <div className="px-4 pb-2.5 flex flex-wrap gap-1.5 justify-start">
                {quickPrompts.map((pText) => (
                  <button
                    key={pText}
                    onClick={() => handleQuickPromptClick(pText)}
                    className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 hover:border-indigo-500/50 dark:border-slate-800 dark:hover:border-emerald-400/50 bg-slate-50 hover:bg-white dark:bg-slate-900/40 transition-colors"
                  >
                    {pText}
                  </button>
                ))}
              </div>
            )}

            {/* Message composer input bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask something about Aman..."
                className="flex-grow px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-40"
                aria-label="Send query"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center border border-indigo-400/20 z-50 clickable"
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <MessageSquare size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
