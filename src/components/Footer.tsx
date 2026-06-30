import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 py-16 border-t border-slate-900 overflow-hidden">
      {/* Decorative Grid Layer */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          
          {/* Main Info Box (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent">
                Aman
              </span>
              <span>Pandey</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </a>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Diploma in Computer Science Engineering student at <strong>Ambikeswar Group of Institute</strong>. Actively mastering MERN Stack to develop robust, premium digital products.
            </p>
            {/* Social linkages */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/pandeyaman5283"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:pandeyaman5283@gmail.com"
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
                title="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Group (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-100">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: "Home", href: "#home" },
                { name: "About Me", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic / Additional (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-100">Institutional Details</h4>
            <div className="text-xs space-y-3">
              <p className="leading-relaxed text-slate-500">
                Currently enrolled in the Diploma Stream at:
                <strong className="block text-slate-300 mt-1">Ambikeswar Group of Institute</strong>
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 rounded-full font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Seeking Internships</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright margin */}
        <div className="mt-12 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>Copyright &copy; 2026 Aman Pandey. All Rights Reserved.</p>
          
          {/* Scroll to Top helper widget */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1 px-3.5 rounded-full bg-slate-900 border border-slate-800"
            aria-label="Scroll to top"
          >
            <span>Scroll to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
