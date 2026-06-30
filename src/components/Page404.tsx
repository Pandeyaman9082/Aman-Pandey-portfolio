import { motion } from "motion/react";
import { AlertCircle, ArrowLeft, Terminal } from "lucide-react";

interface Page404Props {
  onBackToHome: () => void;
}

export default function Page404({ onBackToHome }: Page404Props) {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-16 px-6 relative overflow-hidden">
      {/* Glow ambient background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-xl text-center space-y-8 relative z-10">
        
        {/* Visual Header Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-500 animate-pulse"
        >
          <AlertCircle size={48} />
        </motion.div>

        {/* Big Code Heading */}
        <div className="space-y-3">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white"
          >
            Route / Page Not Found
          </motion.h2>
        </div>

        {/* Explanation text */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed"
        >
          The page or asset you are trying to lookup has been moved, archived, or is currently undergoing structural maintenance.
        </motion.p>

        {/* Interactive Mock Terminal Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 p-5 text-left font-mono text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto shadow-md"
        >
          <div className="flex items-center gap-1.5 pb-3 border-b border-slate-200 dark:border-slate-800/80 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 ml-auto">
              <Terminal size={10} />
              Aman-Bot Bash
            </span>
          </div>
          <p className="text-red-500 font-semibold">$ find /path/requested</p>
          <p className="mt-1">Searching directory records...</p>
          <p className="mt-1 text-red-400 font-bold">Error: Resource unavailable. Status 404.</p>
        </motion.div>

        {/* CTA triggers */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-4"
        >
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all duration-300"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
        </motion.div>

      </div>
    </div>
  );
}
