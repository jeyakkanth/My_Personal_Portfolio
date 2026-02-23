import { motion } from 'framer-motion';
import {
    Layout,
    Server,
    Database,
    Wrench
} from 'lucide-react';

const skillCategories = [
    {
        title: "Frontend",
        icon: Layout,
        skills: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js"],
        color: "text-blue-400"
    },
    {
        title: "Backend",
        icon: Server,
        skills: ["Java (Spring Boot)", "Node.js", "Express.js", "REST APIs"],
        color: "text-green-400"
    },
    {
        title: "Database",
        icon: Database,
        skills: ["MySQL", "MongoDB"],
        color: "text-purple-400"
    },
    {
        title: "Tools",
        icon: Wrench,
        skills: ["Git & GitHub", "Postman", "IntelliJ IDEA", "VS Code"],
        color: "text-pink-400"
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-white dark:bg-primary relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-display mb-4 text-slate-900 dark:text-white">
                        Technical <span className="text-accent-blue">Proficiency</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A comprehensive overview of the tools and technologies I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillCategories.map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-8 rounded-2xl group hover:border-accent-blue/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl bg-slate-100 dark:bg-white/5 group-hover:bg-accent-blue/10 transition-colors ${cat.color}`}>
                                    <cat.icon size={24} />
                                </div>
                                <h3 className="text-xl text-slate-900 dark:text-white font-display">{cat.title}</h3>
                            </div>
                            <ul className="space-y-3">
                                {cat.skills.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/50" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
