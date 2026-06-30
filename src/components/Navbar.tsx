import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  activeSection: string;
}

export default function Navbar({ darkMode, setDarkMode, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "py-4 glass-nav shadow-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Branding */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center space-x-2 text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent">
            Aman
          </span>
          <span className="text-slate-800 dark:text-slate-200">Pandey</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-indigo-500 dark:hover:text-emerald-400 ${
                activeSection === link.href.substring(1)
                  ? "text-indigo-600 dark:text-emerald-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-100"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center gap-1.5 group"
          >
            Hire Me
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Controls (Menu Trigger & Theme Toggle) */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full glass-panel text-slate-800 dark:text-slate-100"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full glass-panel text-slate-800 dark:text-slate-100"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full glass-panel shadow-xl py-6 px-8 flex flex-col space-y-4 lg:hidden z-50"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-base font-semibold py-2 border-b border-slate-100 dark:border-slate-800/50 ${
                  activeSection === link.href.substring(1)
                    ? "text-indigo-600 dark:text-emerald-400"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="mt-2 w-full py-3 rounded-xl bg-indigo-600 text-white text-center font-bold text-sm shadow-md"
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
