import { motion } from "motion/react";
import { GraduationCap, Award, Flame, UserCheck } from "lucide-react";

export default function About() {
  const stats = [
    {
      id: "stat-1",
      icon: <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={24} />,
      value: "CSE Diploma",
      label: "Academic Stream",
    },
    {
      id: "stat-2",
      icon: <Award className="text-emerald-500" size={24} />,
      value: "6+ Custom",
      label: "Portfolio Projects",
    },
    {
      id: "stat-3",
      icon: <Flame className="text-orange-500" size={24} />,
      value: "Full Stack",
      label: "Focused Future",
    },
    {
      id: "stat-4",
      icon: <UserCheck className="text-blue-500" size={24} />,
      value: "MERN Stack",
      label: "Target Stack Expertise",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-emerald-400"
          >
            A Closer Look
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2"
          >
            About Me
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Story Description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.h3
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              Crafting premium interfaces and durable backend services.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-600 dark:text-slate-300 leading-relaxed text-base"
            >
              I am a highly driven <strong>Computer Science Engineering Diploma</strong> student at
              <span className="text-indigo-600 dark:text-emerald-400 font-semibold"> Ambikeswar Group of Institute</span>. I love translating designs into pristine, clean, and interactive code. My absolute objective is to develop state-of-the-art products and earn a position as an experienced MERN Stack Developer.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-300 leading-relaxed text-base"
            >
              I spend my days studying modular layouts, configuring Express API routes, managing state stores, and optimizing page load speeds. For me, development isn’t just about writing logic; it's about crafting complete digital ecosystems that feel responsive, look exquisite, and work flawlessly.
            </motion.p>

            {/* Quick Credentials Info List */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Email: pandeyaman5283@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Phone: +91 9082115064</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Location: India (Available Remote)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Education: CSE Diploma Student</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Key Metrics Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between items-start text-left border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                    {stat.value}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
