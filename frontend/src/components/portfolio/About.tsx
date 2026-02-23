import { motion } from 'framer-motion';
import AboutImg from '../../Assets/About.png';

export default function About() {
    return (
        <section id="about" className="py-24 bg-slate-50 dark:bg-secondary overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Heading - Order 1 on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left order-1 lg:col-span-2"
                    >
                        <h2 className="text-3xl md:text-5xl font-display mb-2 text-slate-900 dark:text-white">
                            About <span className="text-accent-blue">Me</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-accent-blue mx-auto lg:mx-0 rounded-full mb-8" />
                    </motion.div>

                    {/* Image - Order 2 on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="absolute inset-0 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-full blur-3xl" />
                        <img
                            src={AboutImg}
                            alt="About Me"
                            className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl grayscale dark:grayscale-0 hover:grayscale-0 transition-all duration-500"
                        />
                    </motion.div>

                    {/* Content - Order 3 on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-3 lg:order-2"
                    >
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            <p>
                                I am a Computer Science graduate and a passionate Full-Stack Developer with a focus on building efficient, scalable, and user-friendly web applications.
                            </p>
                            <p>
                                With a strong foundation in both Frontend and Backend technologies, I specialize in the <span className="text-slate-900 dark:text-white font-semibold">Java Spring Boot</span> and <span className="text-accent-blue font-semibold">MERN Stack</span> ecosystems. I thrive on solving real-world problems through clean code and modern design principles.
                            </p>
                            <p>
                                My expertise spans the entire development lifecycle, from designing intuitive user interfaces with 🚀 <span className="text-slate-900 dark:text-white font-semibold">React.js and Tailwind CSS</span> to architecting robust server-side logic and database schemas.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}