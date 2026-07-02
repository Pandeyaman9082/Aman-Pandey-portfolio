import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import AIChatBot from "./components/AIChatBot";
import Footer from "./components/Footer";
import Page404 from "./components/Page404";
import { AlertCircle, Terminal, HelpCircle } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    // Default to dark theme as requested for "Modern Dark Theme"
    return saved ? saved === "dark" : true;
  });

  const [activeSection, setActiveSection] = useState<string>("home");
  const [simulate404, setSimulate404] = useState<boolean>(false);
  const [showTesterMenu, setShowTesterMenu] = useState<boolean>(true);

  // Sync dark theme class on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Track active page sections dynamically via IntersectionObserver
  useEffect(() => {
    if (simulate404) return;

    const sections = ["home", "about", "skills", "projects", "services", "experience", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [simulate404]);

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 selection:bg-indigo-500/30">
      <SpeedInsights />
      {/* Floating Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Recruiter / Tester Control Center */}
      <AnimatePresence>
        {showTesterMenu && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl glass-panel border border-slate-200/60 dark:border-slate-800/80 shadow-2xl bg-white/90 dark:bg-slate-950/90 max-w-[280px] text-left"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400 flex items-center gap-1">
                <Terminal size={12} />
                Recruiter Sandbox
              </span>
              <button
                onClick={() => setShowTesterMenu(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
                title="Hide menu"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mb-3">
              I built a custom 404 page &amp; interactive server-side guestbook. Toggle simulation below!
            </p>
            <button
              onClick={() => setSimulate404(!simulate404)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border ${
                simulate404
                  ? "bg-red-500 text-white border-red-600 hover:bg-red-600"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800"
              }`}
            >
              <AlertCircle size={14} />
              {simulate404 ? "Disable 404 View" : "Test Custom 404"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore Tester Menu FAB if closed */}
      {!showTesterMenu && (
        <button
          onClick={() => setShowTesterMenu(true)}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full glass-panel border border-slate-200/50 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 text-indigo-600 dark:text-emerald-400 shadow-lg"
          title="Open Recruiter Sandbox"
        >
          <HelpCircle size={18} />
        </button>
      )}

      {/* Floating Gemini AI conversational agent */}
      <AIChatBot />

      {/* Render 404 simulation layout or complete single-page portfolio */}
      {simulate404 ? (
        <div className="pt-24 min-h-screen">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} activeSection="none" />
          <Page404 onBackToHome={() => setSimulate404(false)} />
          <Footer />
        </div>
      ) : (
        <div className="relative overflow-x-hidden">
          {/* Header section with theme triggers */}
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} activeSection={activeSection} />

          {/* 1. Premium Animated Hero Section */}
          <Hero />

          {/* Scroll Reveal Entrance Wrapper */}
          <main className="relative">
            {/* 2. Detailed About Section */}
            <About />

            {/* 3. Linear Progress & Circular Skills Section */}
            <Skills />

            {/* 4. Filterable Project Cards Section */}
            <Projects />

            {/* 5. Custom Services Presentation */}
            <Services />

            {/* 6. Timeline Journey Section */}
            <Experience />

            {/* 7. Mentors & Peer Testimonials Grid */}
            <Testimonials />

            {/* 8. Full-Stack Interactive Contact Form */}
            <Contact />
          </main>

          {/* Footer credentials and quick link markers */}
          <Footer />
        </div>
      )}
    </div>
  );
}
