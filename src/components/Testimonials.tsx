import { motion } from "motion/react";
import { Star, Quote, UserRound } from "lucide-react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const testimonialsData: Testimonial[] = [
    {
      id: "test-1",
      name: "Dr. Rajesh K. Mehta",
      role: "Senior CSE Department HOD",
      company: "Ambikeswar Group of Institute",
      content:
        "Aman has shown stellar dedication throughout his Computer Science Diploma studies. His proactive approach to learning advanced full-stack technologies like React and MongoDB on top of his college curriculum is truly exemplary.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: "test-2",
      name: "Saurabh Sharma",
      role: "Senior Web Architect",
      company: "TechNexus Solutions",
      content:
        "Collaborating with Aman on coding challenges was a pleasure. His ability to craft responsive, custom-animated interfaces using Tailwind CSS and Framer Motion shows a deep natural talent for user experience design.",
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: "test-3",
      name: "Ananya Deshmukh",
      role: "Open Source Coordinator",
      company: "DevSprint Initiatives",
      content:
        "Aman has a keen eye for clean layout structures and modular component construction. His Student Management System and MERN Blog codebase demonstrate solid programming discipline and REST API handling.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-emerald-400"
          >
            Endorsements
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2"
          >
            What Mentors Say
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-md bg-white dark:bg-slate-950/70 transition-all duration-300 relative flex flex-col justify-between group hover:shadow-indigo-500/5"
            >
              {/* Decorative Quotation Icon */}
              <Quote className="absolute top-6 right-6 text-indigo-500/10 dark:text-emerald-400/10 group-hover:scale-110 transition-transform" size={40} />

              <div className="space-y-4">
                {/* Five star rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{item.content}"
                </p>
              </div>

              {/* Endorser Profile Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/55 mt-6">
                {/* Fallback avatar shape with high fidelity look */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <UserRound size={18} className="text-slate-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-semibold text-indigo-600 dark:text-emerald-400 mt-0.5">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
