import { motion } from "motion/react";
import { Monitor, Smartphone, Layers, Palette } from "lucide-react";
import { Service } from "../types";

export default function Services() {
  const servicesData: Service[] = [
    {
      id: "srv-frontend",
      title: "Frontend Development",
      description:
        "Building blazing-fast, semantic, and pixel-perfect web interfaces using modern frameworks like React.js and styling libraries like Tailwind CSS. Fully optimized for production.",
      iconName: "Monitor",
    },
    {
      id: "srv-responsive",
      title: "Responsive Website Design",
      description:
        "Ensuring your websites adapt dynamically across desktop, tablet, and mobile platforms. High priority given to intuitive touch gestures, typography spacing, and fluid grids.",
      iconName: "Smartphone",
    },
    {
      id: "srv-mern",
      title: "MERN Stack Development",
      description:
        "Assembling scalable, robust full-stack applications with high-integrity MongoDB schemas, secure Node/Express API routes, and lightweight stateful React.js pages.",
      iconName: "Layers",
    },
    {
      id: "srv-ui",
      title: "Website UI Design",
      description:
        "Designing elegant, high-contrast user experiences using glassmorphic panels, beautiful typography, intuitive dark modes, custom cursors, and meaningful micro-interactions.",
      iconName: "Palette",
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Monitor":
        return <Monitor className="text-indigo-600 dark:text-indigo-400" size={28} />;
      case "Smartphone":
        return <Smartphone className="text-emerald-500" size={28} />;
      case "Layers":
        return <Layers className="text-purple-500" size={28} />;
      default:
        return <Palette className="text-pink-500" size={28} />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-emerald-400"
          >
            What I Offer
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2"
          >
            My Services
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-md bg-white dark:bg-slate-950/80 transition-all duration-300 flex flex-col sm:flex-row gap-6 hover:shadow-indigo-500/5 group"
            >
              {/* Icon Panel */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl h-fit w-fit group-hover:bg-gradient-to-br group-hover:from-indigo-50/50 group-hover:to-indigo-100/20 dark:group-hover:from-indigo-950/20 dark:group-hover:to-transparent transition-colors duration-300">
                {getIcon(service.iconName)}
              </div>

              {/* Service text detail */}
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
