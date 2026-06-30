import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Code2, Sparkles } from "lucide-react";
import { Project } from "../types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const projectsData: Project[] = [
    {
      id: "proj-portfolio",
      title: "Premium Portfolio Website",
      description:
        "Award-winning, high-fidelity developer showcase featuring glassmorphic structures, fluid Framer Motion triggers, light/dark responsive modules, and server-side custom AI assistant proxy integration.",
      tech: ["React.js", "Tailwind CSS", "Framer Motion", "Express", "Gemini API"],
      category: "Frontend",
      demoUrl: "#",
      githubUrl: "https://github.com/pandeyaman5283",
      image: "from-indigo-600 via-purple-600 to-pink-500",
    },
    {
      id: "proj-student",
      title: "Student Management System",
      description:
        "A heavy-duty, clean MERN stack web app allowing authorities to register, inspect, and organize complete student credentials with an agile, high-integrity database schema.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      category: "Full Stack",
      demoUrl: "https://github.com/pandeyaman5283",
      githubUrl: "https://github.com/pandeyaman5283",
      image: "from-sky-500 via-indigo-500 to-purple-600",
    },
    {
      id: "proj-weather",
      title: "Weather Tracking Hub",
      description:
        "An elegant real-time weather analytics terminal that queries OpenWeather REST APIs to retrieve dynamic atmospheric conditions based on active user geolocations.",
      tech: ["HTML5", "CSS3", "JavaScript", "REST API", "OpenWeather API"],
      category: "Utility",
      demoUrl: "https://github.com/pandeyaman5283",
      githubUrl: "https://github.com/pandeyaman5283",
      image: "from-teal-400 to-emerald-500",
    },
    {
      id: "proj-calculator",
      title: "Sleek Scientific Calculator",
      description:
        "A highly accessible, pixel-perfect normal and complex math computational keyboard designed with responsive keys, history tracking, and an immersive brutalist color layout.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      category: "Utility",
      demoUrl: "https://github.com/pandeyaman5283",
      githubUrl: "https://github.com/pandeyaman5283",
      image: "from-rose-500 via-pink-500 to-orange-500",
    },
    {
      id: "proj-todo",
      title: "Premium Tasks Planner",
      description:
        "An advanced, user-centric offline todo list equipped with categories, priority toggles, complete state statistics, and seamless client-side local cache storage.",
      tech: ["React.js", "Tailwind CSS", "Local Storage", "Framer Motion"],
      category: "Utility",
      demoUrl: "https://github.com/pandeyaman5283",
      githubUrl: "https://github.com/pandeyaman5283",
      image: "from-orange-400 via-amber-500 to-yellow-500",
    },
    {
      id: "proj-blog",
      title: "MERN Stack Blog Platform",
      description:
        "A production-ready blogging site where administrators can publish, modify, and manage full-length rich text articles with active viewer reviews backed by MongoDB servers.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API"],
      category: "Full Stack",
      demoUrl: "https://github.com/pandeyaman5283",
      githubUrl: "https://github.com/pandeyaman5283",
      image: "from-violet-600 via-fuchsia-600 to-pink-600",
    },
  ];

  const filters = ["All", "Full Stack", "Frontend", "Utility"];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-emerald-400"
          >
            My Works
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2"
          >
            Featured Projects
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Tab buttons */}
        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-slate-900 text-white dark:bg-emerald-400 dark:text-slate-950 shadow-md"
                  : "bg-white text-slate-700 hover:border-slate-300 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-slate-700 border border-slate-200/50 dark:border-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Cards Layout Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800/50 flex flex-col h-full bg-white dark:bg-slate-950 transition-all duration-300 group hover:shadow-indigo-500/10"
              >
                {/* Visual Header Placeholder Image */}
                <div className={`h-48 w-full bg-gradient-to-tr ${project.image} relative overflow-hidden flex items-center justify-center p-6`}>
                  {/* Grid background inside gradient header */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Floating badge */}
                  <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/10">
                    {project.category}
                  </span>

                  {/* Core Vector Icon */}
                  <Code2 size={48} className="text-white/80 transform group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Card Information */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-1.5 group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                      {project.id === "proj-portfolio" && (
                        <Sparkles size={14} className="text-emerald-400 animate-pulse" />
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Badges Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links Row */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
                    <a
                      href={project.demoUrl}
                      className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-emerald-400 hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors ml-auto"
                    >
                      <Github size={14} />
                      Codebase
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
