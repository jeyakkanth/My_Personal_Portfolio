import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import ResumeImg from '../Assets/resume.jpg';
import ResumePDF from '../Assets/Jeyakkanth_Resume.pdf';

export default function Resume() {
    const resumeLink = ResumePDF;

    return (
        <section id="resume" className="py-24 bg-white dark:bg-primary overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden bg-slate-50/50 dark:bg-white/5 shadow-xl dark:shadow-none">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                        {/* Heading - Order 1 on Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:col-span-2 text-center lg:text-left"
                        >
                            <h2 className="text-3xl md:text-5xl font-display mb-2 text-slate-900 dark:text-white">
                                Professional <span className="text-accent-blue">Resume</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-accent-blue mx-auto lg:mx-0 rounded-full" />
                        </motion.div>

                        {/* Image Preview - Order 2 on Mobile */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1 flex justify-center lg:justify-start"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-accent-blue rounded-xl rotate-6 group-hover:rotate-3 transition-transform duration-300 opacity-20" />
                                <img
                                    src={ResumeImg}
                                    alt="Resume Preview"
                                    className="relative w-[280px] h-[360px] object-cover rounded-xl shadow-2xl grayscale dark:grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/40 dark:bg-primary/40 backdrop-blur-[2px] rounded-xl">
                                    <a
                                        href={resumeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content - Order 3 on Mobile */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-3 lg:order-2"
                        >
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed max-w-2xl text-center lg:text-left">
                                I am constantly honing my skills and staying up-to-date with the latest industry trends. My resume provides a comprehensive overview of my experience, education, and technical expertise.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <a
                                    href={resumeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex items-center gap-3"
                                >
                                    <FileText size={20} /> View Resume
                                </a>
                                <a
                                    href={resumeLink}
                                    download="Jeyakkanth_Resume.pdf"
                                    className="btn-secondary flex items-center gap-3 text-slate-900 dark:text-white"
                                >
                                    <Download size={20} /> Download PDF
                                </a>
                            </div>

                            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-slate-200 dark:border-white/5 pt-10">
                                <div className="text-center lg:text-left">
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Education</h4>
                                    <p className="text-sm text-slate-500">B.Sc Computer Science</p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Experience</h4>
                                    <p className="text-sm text-slate-500">Full Stack Focus</p>
                                </div>
                                <div className="text-center lg:text-left md:col-span-1 col-span-2">
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Location</h4>
                                    <p className="text-sm text-slate-500">Remote / On-site</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}