import { motion } from "motion/react";
import { GraduationCap, Code2, Rocket, Calendar } from "lucide-react";

export default function Experience() {
  const timeline = [
    {
      id: "exp-1",
      icon: <GraduationCap size={18} className="text-white" />,
      title: "Diploma in Computer Science Engineering",
      institution: "Ambikeswar Group of Institute",
      period: "Currently Pursuing",
      description:
        "Learning core Computer Science fundamentals including algorithms, system structures, database architectures, and fundamental programming concepts (C, Python, etc.).",
      badge: "Academic Focus",
      badgeColor: "bg-indigo-500",
    },
    {
      id: "exp-2",
      icon: <Code2 size={18} className="text-white" />,
      title: "Full Stack Web Developer Training",
      institution: "Self-Guided & Communities",
      period: "Continuous Learning",
      description:
        "Actively constructing stateful web architectures, mastering the MERN Stack (MongoDB, Express, React, Node.js), writing RESTful APIs, and implementing scalable responsive designs using Tailwind CSS.",
      badge: "Core Expertise",
      badgeColor: "bg-emerald-500",
    },
    {
      id: "exp-3",
      icon: <Rocket size={18} className="text-white" />,
      title: "Aspiring Junior / Intern Engineer",
      institution: "Open to New Opportunities",
      period: "Ready to Join",
      description:
        "Eager to contribute to production environments, collaborate in agile teams, resolve frontend/backend bottlenecks, and deliver polished web assets.",
      badge: "Next Step",
      badgeColor: "bg-purple-500",
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-emerald-400"
          >
            My Journey
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2"
          >
            Education &amp; Experience
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Path Layout */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-0">
          
          {/* Vertical spine line */}
          <div className="absolute left-6 sm:left-1/2 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 pointer-events-none" />

          {/* Timeline Cards */}
          <div className="space-y-12">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center relative ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Bullet center marker */}
                  <div className="absolute left-6 sm:left-1/2 top-1.5 sm:top-1/2 w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 animate-pulse" />
                  </div>

                  {/* Left spacer / right item columns */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="glass-panel p-6 rounded-2xl text-left border border-slate-200/50 dark:border-slate-800/50 shadow-md relative hover:shadow-indigo-500/5 transition-all duration-300"
                    >
                      {/* Timeline Header Badge Row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-md ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 font-semibold ml-auto">
                          <Calendar size={12} />
                          {item.period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      
                      {/* Institution / College */}
                      <p className="text-xs font-semibold text-indigo-600 dark:text-emerald-400 mt-1">
                        {item.institution}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for vertical center grid */}
                  <div className="hidden sm:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
