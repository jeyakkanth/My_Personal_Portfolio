import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, AlertCircle, Loader2, User, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT || '';

/**
 * Contact Component
 * Uses Formspree for "out-of-the-box" email delivery (no backend).
 * Features: Real-time validation, smart button, and premium animations.
 */
export default function Contact() {
    const [isSending, setIsSending] = useState(false);

    // Initializing react-hook-form for real-time validation
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<ContactFormData>({
        mode: 'onChange'
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSending(true);
        const toastId = toast.loading('Sending your message...');

        try {
            if (FORMSPREE_ENDPOINT) {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        message: data.message
                    })
                });

                if (!response.ok) {
                    throw new Error('Form submission failed');
                }

                toast.success('Message sent successfully! I will reply to you at your email.', {
                    id: toastId,
                    duration: 5000
                });
                reset();
            } else {
                const subject = `New message from ${data.name || 'your portfolio site'}`;
                const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;

                const mailtoUrl = `mailto:jeyakkanth2001@gmail.com?subject=${encodeURIComponent(
                    subject
                )}&body=${encodeURIComponent(body)}`;

                window.location.href = mailtoUrl;

                toast.success('Your email app is open. Please press send to finish.', {
                    id: toastId,
                    duration: 6000
                });
                reset();
            }
        } catch (error) {
            toast.error('Failed to send. Please email me directly at jeyakkanth2001@gmail.com.', {
                id: toastId
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-primary transition-colors duration-300 relative overflow-hidden">
            {/* Soft Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/30 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Section Header */}
                    <div className="text-center mb-16 px-4">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-block px-4 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-bold uppercase tracking-widest mb-4"
                        >
                            Contact
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-slate-900 dark:text-white">
                            Let's <span className="gradient-text">Connect</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                            Ready to start a project? I'm currently available for full-time roles and freelance work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Info Cards */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-secondary/50 border border-slate-100 dark:border-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Fast Response</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all">
                                            <Mail size={22} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email Me</p>
                                            <a href="mailto:jeyakkanth2001@gmail.com" className="text-slate-900 dark:text-white font-medium truncate block hover:text-accent-blue transition-colors">
                                                jeyakkanth2001@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-white/50 dark:bg-transparent">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                            "I aim to reply to all messages within 24 hours. Your vision is my priority."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modern Form */}
                        <div className="lg:col-span-8">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white dark:bg-secondary/30 p-8 md:p-12 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none relative"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    {/* Name Field */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                            <User size={14} className="text-accent-blue" /> Your Name
                                        </label>
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            type="text"
                                            placeholder="Enter your name"
                                            className={`w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border outline-none text-slate-900 dark:text-white transition-all ring-offset-2 focus:ring-2 focus:ring-accent-blue/20 ${errors.name ? 'border-red-500' : 'border-slate-100 dark:border-white/10 focus:border-accent-blue'
                                                }`}
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                            <Mail size={14} className="text-accent-blue" /> Email
                                        </label>
                                        <input
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Valid email required'
                                                }
                                            })}
                                            type="email"
                                            placeholder="hello@example.com"
                                            className={`w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border outline-none text-slate-900 dark:text-white transition-all ring-offset-2 focus:ring-2 focus:ring-accent-blue/20 ${errors.email ? 'border-red-500' : 'border-slate-100 dark:border-white/10 focus:border-accent-blue'
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="space-y-3 mb-10">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                        <MessageCircle size={14} className="text-accent-blue" /> Your Message
                                        <span className="text-[10px] text-slate-400 font-normal ml-auto">(Required)</span>
                                    </label>
                                    <textarea
                                        {...register('message', {
                                            required: 'Message is required',
                                            minLength: { value: 10, message: 'Minimum 10 characters' }
                                        })}
                                        rows={6}
                                        placeholder="Briefly describe your project or enquiry..."
                                        className={`w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border outline-none resize-none text-slate-900 dark:text-white transition-all ring-offset-2 focus:ring-2 focus:ring-accent-blue/20 ${errors.message ? 'border-red-500' : 'border-slate-100 dark:border-white/10 focus:border-accent-blue'
                                            }`}
                                    />
                                    <AnimatePresence>
                                        {(errors.name || errors.email || errors.message) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-2"
                                            >
                                                <p className="text-xs text-red-500 font-bold flex items-center gap-2">
                                                    <AlertCircle size={14} /> Please fill in all fields correctly to enable sending.
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Smart Submit Button */}
                                <motion.button
                                    whileHover={isValid && !isSending ? { scale: 1.01 } : {}}
                                    whileTap={isValid && !isSending ? { scale: 0.98 } : {}}
                                    disabled={!isValid || isSending}
                                    type="submit"
                                    className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${isValid && !isSending
                                        ? 'bg-accent-blue hover:bg-accent-blue/90 text-white shadow-accent-blue/25'
                                        : 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed shadow-none'
                                        }`}
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} className={isValid ? 'animate-bounce' : ''} /> Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}