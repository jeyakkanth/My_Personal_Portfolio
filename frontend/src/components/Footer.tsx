import { Github, Linkedin, Youtube, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "https://github.com/jeyakkanth", color: "hover:text-white" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/jeyakkanth-jegathees/", color: "hover:text-accent-blue" },
        { icon: Youtube, href: "https://www.youtube.com/@ShadowCode_17", color: "hover:text-red-500" },
    ];

    return (
        <footer className="relative py-16 bg-slate-100 dark:bg-[#050505] border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
                    {/* Brand & Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <a href="/" className="group inline-block text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tighter">
                            JEY<span className="text-accent-blue group-hover:text-accent-purple transition-colors duration-300">.</span>
                        </a>
                        <p className="mt-4 text-sm text-slate-500 max-w-xs mx-auto md:mx-0 leading-relaxed">
                            Crafting high-performance digital experiences with a focus on modern aesthetics and robust engineering.
                        </p>
                    </motion.div>

                    {/* Social links with modern hover */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex justify-center gap-4"
                    >
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-4 rounded-2xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-all duration-300 text-slate-500 dark:text-slate-400 ${social.color} hover:bg-slate-300 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10 hover:-translate-y-1`}
                            >
                                <social.icon size={22} />
                            </a>
                        ))}
                    </motion.div>

                    {/* Copyright & Signoff */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-slate-500 md:text-right"
                    >
                        <p className="flex items-center justify-center md:justify-end gap-1.5 mb-2">
                            Designed & Built with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                        </p>
                        <p className="font-medium text-slate-500 dark:text-slate-400">
                            &copy; {currentYear} Jeyakkanth. All rights reserved.
                        </p>
                    </motion.div>
                </div>

                {/* Bottom decorative line */}
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-4">
                    <div className="flex gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                        <span className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors cursor-default">Vavuniya, SL</span>
                        <span className="hover:text-slate-400 transition-colors cursor-default">Remote Available</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}