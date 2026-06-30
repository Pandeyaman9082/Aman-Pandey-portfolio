import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { MessageLog } from "../types";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [recentMessages, setRecentMessages] = useState<MessageLog[]>([]);

  // Retrieve recent public messages from the backend guestbook API
  const fetchRecentMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setRecentMessages(data);
      }
    } catch (err) {
      console.error("Failed to load guestbook messages:", err);
    }
  };

  useEffect(() => {
    fetchRecentMessages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          success: true,
          message: "Aman has received your message successfully! He will reach out shortly.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        // Refresh the guestbook list
        fetchRecentMessages();
      } else {
        setSubmitStatus({
          success: false,
          message: result.error || "Failed to deliver message. Please email Aman directly.",
        });
      }
    } catch (error) {
      console.error("Contact Form error:", error);
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please reach Aman at pandeyaman5283@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-emerald-400"
          >
            Get in touch
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2"
          >
            Contact Me
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Form & Info Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact Information & Stylized Map */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="space-y-6">
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                Let's discuss your next project
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Whether you have an internship position, freelance requirements, or simply want to speak about code, don't hesitate to reach out! I am highly responsive.
              </p>
            </div>

            {/* Quick click contacts */}
            <div className="space-y-4">
              <a
                href="mailto:pandeyaman5283@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl glass-panel hover:border-indigo-500/50 dark:hover:border-emerald-400/50 hover:bg-white/80 transition-all duration-300 group border border-slate-200/50 dark:border-slate-800"
              >
                <div className="p-3 bg-indigo-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    pandeyaman5283@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+919082115064"
                className="flex items-center gap-4 p-4 rounded-xl glass-panel hover:border-indigo-500/50 dark:hover:border-emerald-400/50 hover:bg-white/80 transition-all duration-300 group border border-slate-200/50 dark:border-slate-800"
              >
                <div className="p-3 bg-emerald-50 dark:bg-slate-900 text-emerald-500 rounded-lg group-hover:scale-105 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    +91 9082115064
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-slate-200/50 dark:border-slate-800 bg-white/40">
                <div className="p-3 bg-sky-50 dark:bg-slate-900 text-sky-500 rounded-lg">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    Ambikeswar Group of Institute Campus, India
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Google Maps Placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 border border-slate-200/60 dark:border-slate-800 relative shadow-inner group">
              {/* Dynamic abstract map matrix pattern */}
              <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/80 z-0 flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-indigo-500/15 dark:bg-indigo-500/10 blur-xl animate-pulse" />
                
                {/* Visual marker pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-3 bg-indigo-600 text-white rounded-full shadow-lg"
                  >
                    <MapPin size={24} />
                  </motion.div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-950/80 px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm mt-3 border border-slate-200/50 dark:border-slate-800">
                    Ambikeswar Group of Institute
                  </span>
                </div>
              </div>

              {/* Direct Link on Click */}
              <a
                href="https://maps.google.com/?q=Ambikeswar+Group+of+Institute"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-20 bg-slate-950/0 hover:bg-slate-950/45 flex items-center justify-center text-white/0 hover:text-white transition-all duration-300 font-bold text-sm tracking-wide"
              >
                Open in Google Maps ➔
              </a>
            </div>
          </div>

          {/* Right Side: Animated Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg text-left bg-white dark:bg-slate-950/80 flex flex-col gap-5"
            >
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>

              {/* Success / Error notification */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${
                      submitStatus.success
                        ? "bg-emerald-50 dark:bg-emerald-950/15 border-emerald-500/20 text-emerald-800 dark:text-emerald-400"
                        : "bg-red-50 dark:bg-red-950/15 border-red-500/20 text-red-800 dark:text-red-400"
                    }`}
                  >
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <p className="font-semibold">{submitStatus.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name field */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-200"
                />
              </div>

              {/* Email / Phone fields side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Message field */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell Aman about your goals..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </motion.form>

            {/* Recruiter Guestbook Submissions List */}
            {recentMessages.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left bg-white/40"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={16} className="text-indigo-600 dark:text-emerald-400" />
                  <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white">
                    Live Recruiter Submissions Guestbook
                  </h4>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-3.5 pr-2">
                  {recentMessages.map((msg, idx) => (
                    <div key={idx} className="text-xs border-b border-slate-100 dark:border-slate-800/40 pb-2.5 last:border-0 last:pb-0">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>{msg.name}</span>
                        <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
