import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Youtube, ArrowRight, Download } from 'lucide-react';
import HeroImg from '../Assets/hero.jpg';

const roles = [
    "Software Engineer",
    "Java Full Stack Developer",
    "React Developer",
    "MERN Stack Developer"
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/jeyakkanth-jegathees/', color: 'hover:text-accent-blue' },
        { icon: Github, href: 'https://github.com/jeyakkanth', color: 'hover:text-white' },
        { icon: Youtube, href: 'https://www.youtube.com/@ShadowCode_17', color: 'hover:text-red-500' },
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-primary transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent-blue/10 dark:bg-accent-blue/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent-purple/10 dark:bg-accent-purple/5 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Header: Title & Roles - Order 1 on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left order-1 lg:col-start-1"
                    >

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-slate-900 dark:text-white">
                            Hi, I'm <span className="gradient-text">Jeyakkanth</span>
                        </h1>

                        <div className="h-20 md:h-24 mb-6 flex items-center justify-center lg:justify-start gap-2 md:gap-3">
                            <span className="text-2xl md:text-4xl text-slate-500 dark:text-slate-400 font-medium">
                                I'm a
                            </span>
                            <div className="relative">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roles[roleIndex]}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-2xl md:text-4xl text-slate-900 dark:text-white font-medium inline-block"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image - Order 2 on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:col-start-2 lg:row-span-2"
                    >
                        <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-pink rounded-3xl rotate-6 animate-pulse opacity-20" />
                            <img
                                src={HeroImg}
                                alt="Jeyakkanth"
                                className="relative z-10 w-full h-full object-cover rounded-3xl border border-slate-200 dark:border-white/10 grayscale dark:grayscale-0 hover:grayscale-0 transition-all duration-500 shadow-2xl"
                            />
                        </div>
                    </motion.div>

                    {/* Content: Description, Buttons & Socials - Order 3 on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center lg:text-left order-3 lg:col-start-1"
                    >
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Crafting high-performance, scalable web applications with a focus on seamless user experiences and robust backend architectures.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                            <a href="#projects" className="btn-primary flex items-center gap-2">
                                View Projects <ArrowRight size={18} />
                            </a>
                            <a href="#resume" className="btn-secondary flex items-center gap-2 text-slate-900 dark:text-white">
                                Resume <Download size={18} />
                            </a>
                        </div>

                        <div className="flex justify-center lg:justify-start gap-6">
                            {socialLinks.map(({ icon: Icon, href, color }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className={`text-slate-500 transition-colors ${color}`}
                                >
                                    <Icon size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}