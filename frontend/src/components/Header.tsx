import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (toggleMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [toggleMenu]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Resume', href: '#resume' },
        { name: 'Contact', href: '#contact' },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || toggleMenu ? 'bg-white dark:bg-primary border-b border-slate-200 dark:border-white/10 shadow-sm' : 'bg-transparent'
                    } h-16 md:h-20 flex items-center shadow-sm`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center w-full">
                    {/* Left: Logo */}
                    <motion.a
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tighter"
                        href="/"
                    >
                        JEY<span className="text-accent-blue">.</span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent-blue dark:hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300"
                                    aria-label="Toggle Theme"
                                >
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Right: Mobile Controls */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setToggleMenu(!toggleMenu)}
                            className="text-slate-900 dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Menu Toggle"
                        >
                            {toggleMenu ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {toggleMenu && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 z-40 bg-white dark:bg-primary md:hidden pt-20"
                    >
                        <nav className="h-full flex flex-col justify-center items-center px-6 pb-20">
                            <ul className="flex flex-col items-center space-y-8">
                                {navLinks.map((link) => (
                                    <motion.li
                                        key={link.name}
                                        variants={linkVariants}
                                        className="text-center"
                                    >
                                        <a
                                            href={link.href}
                                            onClick={() => setToggleMenu(false)}
                                            className="text-3xl font-display font-bold text-slate-900 dark:text-white hover:text-accent-blue transition-colors block py-2"
                                        >
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}