import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import RealEstateWebsite from '../../Assets/Real-Estate.png';
import SpicyWebsite from '../../Assets/organics.png';
import LoginSignUP from '../../Assets/Login.png';
import TSM_image from '../../Assets/TMS.png';

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: 'React' | 'Full Stack' | 'Backend';
    github: string;
    live: string;
}

const projects: Project[] = [
    {
        title: "Modern Real Estate Platform",
        description: "A comprehensive real estate marketplace with property listings, advanced search filters, and responsive design.",
        image: RealEstateWebsite,
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        category: "React",
        github: "https://github.com/jeyakkanth/Real-Estate-React.git",
        live: "https://real-estate-react-iey.web.app/"
    },
    {
        title: "Organic Spices E-commerce",
        description: "A specialized e-commerce store for organic products featuring a clean UI, shopping cart, and product management.",
        image: SpicyWebsite,
        tags: ["React", "CSS3", "JavaScript"],
        category: "React",
        github: "https://github.com/jeyakkanth/Spicy-Website.git",
        live: "https://spicywebsite-jey.netlify.app/"
    },
    {
        title: "Authentication Login & Sign Up",
        description: "A robust authentication system with user login, sign-up, and session management using best security practices.",
        image: LoginSignUP,
        tags: ["React"],
        category: "React",
        github: "https://github.com/jeyakkanth/Authentication_Full_Stack-Spring-boot-.git",
        live: "https://authentication-spring-boot.netlify.app/"
    },
    {
        title: "Task Management System",
        description: "A full-stack task management application with user management, task assignment, status tracking, workload reporting, and overdue task monitoring.",
        image: TSM_image,
        tags: ["React", "Spring Boot", "MySQL", "REST API"],
        category: "Full Stack",
        github: "https://github.com/jeyakkanth/task_management_system.git",
        live: "https://task-management-system-front-end.netlify.app/"
    },
];

const categories = ['All', 'React', 'Full Stack', 'Backend'] as const;

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    // Reset index when category changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCategory]);

    const nextProject = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <section id="projects" className="py-24 bg-slate-50 dark:bg-secondary transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display mb-4 text-slate-900 dark:text-white">
                            Featured <span className="text-accent-blue">Projects</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                            Navigate through my recent works. Use the filters to see specific technologies.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                                        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Slider Container */}
                <div className="relative group min-h-[500px]">
                    <div className="flex justify-center items-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={`${activeCategory}-${currentIndex}`}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="w-full max-w-4xl"
                            >
                                {filteredProjects.length > 0 ? (
                                    <div className="glass rounded-3xl overflow-hidden hover:border-accent-blue/50 transition-all duration-300 shadow-xl dark:shadow-none">
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Project Image */}
                                            <div className="lg:w-1/2 relative aspect-video lg:aspect-auto overflow-hidden bg-slate-100 dark:bg-white/5">
                                                <img
                                                    src={filteredProjects[currentIndex].image}
                                                    alt={filteredProjects[currentIndex].title}
                                                    className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>

                                            {/* Project Info */}
                                            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-transparent">
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {filteredProjects[currentIndex].tags.map(tag => (
                                                        <span key={tag} className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs font-bold rounded-lg uppercase tracking-wider">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-display mb-4 text-slate-900 dark:text-white">
                                                    {filteredProjects[currentIndex].title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                                                    {filteredProjects[currentIndex].description}
                                                </p>
                                                <div className="flex gap-4">
                                                    <a
                                                        href={filteredProjects[currentIndex].github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-secondary flex items-center gap-2"
                                                    >
                                                        <Github size={18} /> Code
                                                    </a>
                                                    <a
                                                        href={filteredProjects[currentIndex].live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary flex items-center gap-2"
                                                    >
                                                        <ExternalLink size={18} /> Live Demo
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-20 text-slate-500">
                                        No projects found in this category.
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    {filteredProjects.length > 1 && (
                        <div className="flex justify-center mt-12 gap-4 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:justify-between lg:px-4 lg:mt-0 pointer-events-none">
                            <button
                                onClick={prevProject}
                                className="pointer-events-auto p-4 glass rounded-full hover:bg-accent-blue hover:text-white transition-all duration-300 group shadow-lg dark:shadow-none"
                                aria-label="Previous Project"
                            >
                                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={nextProject}
                                className="pointer-events-auto p-4 glass rounded-full hover:bg-accent-blue hover:text-white transition-all duration-300 group shadow-lg dark:shadow-none"
                                aria-label="Next Project"
                            >
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center mt-8 gap-2">
                    {filteredProjects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-accent-blue' : 'w-2 bg-slate-300 dark:bg-white/10 hover:bg-slate-400 dark:hover:bg-white/20'
                                }`}
                            aria-label={`Go to project ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}