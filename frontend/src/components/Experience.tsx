import { motion } from 'framer-motion';
import { Briefcase, Award, Calendar, MapPin } from 'lucide-react';

type ExperienceItem = {
    title: string;
    organization: string;
    location?: string;
    period: string;
    description: string;
    highlights: string[];
};

const internships: ExperienceItem[] = [
    {
        title: 'Software Engineer Intern',
        organization: 'Samuel Janam IT Centre',
        location: 'Jaffna, Sri Lanka',
        period: 'July 2025 – January 2026',
        description:
            'Worked as a Software Engineer Intern contributing to full-stack development using React.js and Java Spring Boot.',
        highlights: [
            'Developed responsive front-end interfaces using React.js',
            'Integrated front-end applications with backend REST APIs built using Spring Boot',
            'Implemented authentication, error handling, and database operations',
            'Applied modern development best practices and AI-assisted tools to improve productivity',
            'Strengthened knowledge in Structural Design and Project Management through practical application'
        ]
    }
];

const certifications: ExperienceItem[] = [
    // {
    //     title: 'Certification Title',
    //     organization: 'Issuing Organization',
    //     location: '',
    //     period: 'Month YYYY',
    //     description:
    //         'Validated skills in web development and modern technologies through hands-on projects and assessments.',
    //     highlights: [
    //         'Covered React, JavaScript/TypeScript, and REST API integration',
    //         'Built real-world style projects as part of the certification',
    //         'Strengthened problem-solving and clean code practices'
    //     ]
    // }
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="py-24 bg-slate-50 dark:bg-secondary transition-colors duration-300 relative overflow-hidden"
        >
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        Experience
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display mb-4 text-slate-900 dark:text-white">
                        Journey of <span className="text-accent-blue">Growth</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A quick snapshot of my internships and certifications that helped me grow as a developer.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Internships */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
                                <Briefcase size={22} />
                            </div>
                            <h3 className="text-xl font-display text-slate-900 dark:text-white">Internships</h3>
                        </div>

                        <div className="space-y-4">
                            {internships.map((item, idx) => (
                                <div
                                    key={`${item.title}-${idx}`}
                                    className="glass rounded-2xl p-6 border border-slate-200/70 dark:border-white/10 hover:border-accent-blue/50 transition-all duration-300"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                        <div>
                                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-accent-blue font-medium">{item.organization}</p>
                                        </div>
                                        <div className="flex flex-col items-end text-xs text-slate-500 dark:text-slate-400 gap-1">
                                            <span className="inline-flex items-center gap-1">
                                                <Calendar size={14} /> {item.period}
                                            </span>
                                            {item.location && (
                                                <span className="inline-flex items-center gap-1">
                                                    <MapPin size={14} /> {item.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                        {item.description}
                                    </p>
                                    <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                                        {item.highlights.map((point) => (
                                            <li key={point} className="flex gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-blue/70" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                                <Award size={22} />
                            </div>
                            <h3 className="text-xl font-display text-slate-900 dark:text-white">Certifications</h3>
                        </div>

                        <div className="space-y-4">
                            {certifications.map((item, idx) => (
                                <div
                                    key={`${item.title}-${idx}`}
                                    className="glass rounded-2xl p-6 border border-slate-200/70 dark:border-white/10 hover:border-amber-400/60 transition-all duration-300"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                        <div>
                                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-amber-400 font-medium">{item.organization}</p>
                                        </div>
                                        <div className="flex flex-col items-end text-xs text-slate-500 dark:text-slate-400 gap-1">
                                            <span className="inline-flex items-center gap-1">
                                                <Calendar size={14} /> {item.period}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                        {item.description}
                                    </p>
                                    <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                                        {item.highlights.map((point) => (
                                            <li key={point} className="flex gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

