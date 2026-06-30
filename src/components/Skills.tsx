import { useState } from "react";
import { motion } from "motion/react";
import { Code, Server, Database, Braces, Cpu } from "lucide-react";
import { Skill } from "../types";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const skillsData: Skill[] = [
    // Frontend
    { name: "React.js", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 95, category: "Frontend" },
    { name: "JavaScript", level: 85, category: "Frontend" },
    { name: "HTML5", level: 95, category: "Frontend" },
    { name: "CSS3", level: 90, category: "Frontend" },

    // Backend
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Express.js", level: 85, category: "Backend" },

    // Database
    { name: "MongoDB", level: 80, category: "Database" },

    // Programming Languages
    { name: "C Language", level: 75, category: "Programming" },
    { name: "Python", level: 80, category: "Programming" },

    // Other
    { name: "Responsive Design", level: 95, category: "Other" },
    { name: "REST API", level: 85, category: "Other" },
    { name: "Git & GitHub", level: 85, category: "Other" },
    { name: "VS Code", level: 90, category: "Other" },
  ];

  const categories = ["All", "Frontend", "Backend", "Database", "Programming", "Other"];

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Frontend":
        return <Code size={16} />;
      case "Backend":
        return <Server size={16} />;
      case "Database":
        return <Database size={16} />;
      case "Programming":
        return <Braces size={16} />;
      default:
        return <Cpu size={16} />;
    }
  };

  // Major highlight skills for circular indicator visualization
  const circularSkills = [
    { name: "React.js", level: 90, color: "text-indigo-500", trackColor: "stroke-indigo-500/10" },
    { name: "Tailwind CSS", level: 95, color: "text-emerald-400", trackColor: "stroke-emerald-400/10" },
    { name: "Node.js", level: 80, color: "text-sky-500", trackColor: "stroke-sky-500/10" },
    { name: "MongoDB", level: 80, color: "text-green-500", trackColor: "stroke-green-500/10" },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-emerald-400"
          >
            Technical Stack
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2"
          >
            My Skills & Expertise
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Circular Skills Display (Core Highlight) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {circularSkills.map((cSkill, idx) => {
            const radius = 40;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (cSkill.level / 100) * circumference;

            return (
              <motion.div
                key={cSkill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/50 dark:border-slate-800/50"
              >
                {/* SVG Circle */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      className="stroke-slate-100 dark:stroke-slate-800"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                      cx="48"
                      cy="48"
                      r={radius}
                      className={cSkill.color}
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Center Text */}
                  <span className="absolute font-display font-extrabold text-lg text-slate-900 dark:text-white">
                    {cSkill.level}%
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-4 text-sm tracking-wide">
                  {cSkill.name}
                </h4>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Selector Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 border ${
                activeCategory === category
                  ? "bg-slate-900 border-slate-900 text-white dark:bg-emerald-400 dark:border-emerald-400 dark:text-slate-950 shadow-md shadow-emerald-400/10"
                  : "bg-white border-slate-200 text-slate-700 hover:border-indigo-500 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-emerald-400"
              }`}
            >
              {category !== "All" && getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>

        {/* Linear Progress Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
        >
          {filteredSkills.map((skill, idx) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-2 group"
            >
              {/* Skill Info Row */}
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Slider Track */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800/20">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
