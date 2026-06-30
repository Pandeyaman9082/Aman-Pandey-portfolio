import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Download, ArrowRight, Terminal, Award, BookOpen } from "lucide-react";

export default function Hero() {
  const titles = [
    "Diploma CSE Student",
    "MERN Stack Developer",
    "Full Stack Engineer",
    "Creative Web Designer",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullTitle = titles[currentTitleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullTitle.substring(0, displayText.length + 1));
        if (displayText === currentFullTitle) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before starting delete
          return;
        }
      } else {
        setDisplayText(currentFullTitle.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 40 : 100);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSec = document.querySelector("#contact");
    if (contactSec) {
      const top = contactSec.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Mock Resume Download function that triggers generating a professional plain-text summary resume
  const handleDownloadResume = () => {
    const resumeText = `=====================================================
AMAN PANDEY - CURRICULUM VITAE
Computer Science Engineering (Diploma) Student
=====================================================
Phone: +91 9082115064
Email: pandeyaman5283@gmail.com
College: Ambikeswar Group of Institute
Role: Aspiring MERN Stack / Full Stack Developer

-----------------------------------------------------
PROFESSIONAL SUMMARY
-----------------------------------------------------
Passionate Diploma Computer Science Engineering student focused on building highly responsive, visually stunning, and performance-optimized websites. Continuously honing skills in full-stack engineering with MongoDB, Express, React, and Node.js (MERN Stack).

-----------------------------------------------------
TECHNICAL SKILLS
-----------------------------------------------------
* Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS
* Backend: Node.js, Express.js
* Database: MongoDB
* Programming: C, Python, JavaScript
* Tools: Git, GitHub, REST APIs, VS Code

-----------------------------------------------------
ACADEMIC DETAILS
-----------------------------------------------------
Pursuing Computer Science Engineering (Diploma)
Ambikeswar Group of Institute (Active enrollment)

-----------------------------------------------------
PROJECT SUMMARY
-----------------------------------------------------
1. Personal Portfolio Website
   - Premium interactive showcase built with React, Tailwind CSS, and Framer Motion.
2. Student Management System
   - MERN stack application with complete CRUD functionalities for handling student profiles.
3. Weather App
   - Dynamic tracker integrating Geolocation and the OpenWeather API.
4. Calculator Web App
   - Highly responsive normal and scientific calculator utility.
5. Todo App
   - LocalStorage backed client productivity coordinator.
6. MERN Blog Website
   - Content management engine with safe databases.

-----------------------------------------------------
SERVICES OFFERED
-----------------------------------------------------
* Frontend Web Engineering
* Responsive Web Layout Design
* MERN Stack Application Construction
* Custom UI Glassmorphic Design

=====================================================
Thank you for downloading Aman's resume.
Reach out directly to arrange an interview!
=====================================================`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Aman_Pandey_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden grid-bg"
    >
      {/* Decorative Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl animate-glow-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl animate-glow-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          {/* Greeting Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel max-w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Available for Internships
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <div className="space-y-3">
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl font-medium text-indigo-600 dark:text-emerald-400"
            >
              Hi there, I'm
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight"
            >
              Aman Pandey
            </motion.h1>

            {/* Dynamic Typing Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold h-10 flex items-center text-slate-700 dark:text-slate-200"
            >
              <span className="mr-2">A passionate</span>
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent underline decoration-indigo-500/35">
                {displayText}
              </span>
              <span className="w-1 h-7 bg-indigo-500 animate-pulse ml-0.5" />
            </motion.h2>
          </div>

          {/* Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
          >
            I build modern, premium, and fully responsive websites. Currently pursuing my
            <strong> Diploma in Computer Science Engineering</strong>, I specialize in full-stack MERN development to shape high-fidelity, high-performing digital interfaces.
          </motion.p>

          {/* Social Icons Linkage */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center space-x-4 pt-2"
          >
            <a
              href="https://github.com/pandeyaman5283"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full glass-panel hover:text-indigo-600 dark:hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300 text-slate-700 dark:text-slate-300"
              title="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full glass-panel hover:text-indigo-600 dark:hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300 text-slate-700 dark:text-slate-300"
              title="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:pandeyaman5283@gmail.com"
              className="p-3 rounded-full glass-panel hover:text-indigo-600 dark:hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300 text-slate-700 dark:text-slate-300"
              title="Email Aman"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          {/* Buttons CTA Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            {/* Contact Trigger */}
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-xl shadow-indigo-500/20 text-center flex items-center justify-center gap-2 group transition-all duration-300"
            >
              Get In Touch
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Resume Button */}
            <button
              onClick={handleDownloadResume}
              className="px-8 py-4 rounded-full glass-panel border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 font-semibold text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
            >
              <Download size={18} />
              Download Resume
            </button>
          </motion.div>
        </div>

        {/* Right Side - Visual Collage and Floating Glass Cards */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-8 lg:py-0">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-visible"
          >
            {/* Elegant Outer Gradient Frame */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-1 shadow-2xl shadow-indigo-500/10">
              <div className="w-full h-full rounded-[22px] bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center p-8 text-center relative overflow-hidden">
                {/* Visual grid inside the profile box */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Developer Vector Representation */}
                <div className="w-24 h-24 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/20 relative z-10 animate-bounce">
                  <Terminal size={44} className="text-indigo-600 dark:text-emerald-400" />
                </div>

                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white relative z-10">
                  Aman Pandey
                </h3>
                <p className="text-xs font-medium text-indigo-600 dark:text-emerald-400 mt-1 uppercase tracking-widest relative z-10">
                  CSE Student & Developer
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 max-w-[200px] leading-relaxed relative z-10">
                  Crafting smooth interfaces & solid backend endpoints from scratch.
                </p>
              </div>
            </div>

            {/* Floating Glass Card 1 - Credentials */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-12 glass-panel p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40 dark:border-white/5"
            >
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                <BookOpen size={18} />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Diploma Student</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Computer Science Eng.</p>
              </div>
            </motion.div>

            {/* Floating Glass Card 2 - Specialty */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-8 -right-8 glass-panel p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40 dark:border-white/5"
            >
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Award size={18} />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">MERN Specialist</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">React & Node.js</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
