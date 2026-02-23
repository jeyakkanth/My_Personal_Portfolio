import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, RefreshCw, Loader2, Mail, Clock, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    createdAt: string;
    read?: boolean;
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchMessages = async () => {
        setLoading(true); setError('');
        try {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get(`${API_BASE_URL}/api/admin/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(data);
        } catch {
            setError('Failed to load messages. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []); // eslint-disable-line

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this message? This action cannot be undone.')) return;
        setDeleting(id);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE_URL}/api/admin/messages/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages((prev) => prev.filter((m) => m._id !== id));
        } catch {
            setError('Failed to delete message.');
        } finally {
            setDeleting(null);
        }
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <AdminLayout>
            <div className="max-w-3xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Messages
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            {loading ? 'Loading...' : `${messages.length} message${messages.length !== 1 ? 's' : ''} received`}
                        </p>
                    </div>
                    <button
                        onClick={fetchMessages} disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10
              hover:border-white/25 text-slate-300 hover:text-white text-sm transition-all disabled:opacity-60"
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>
                </div>

                {error && (
                    <div className="mb-5 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                        <AlertCircle size={16} className="shrink-0" /> {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 size={28} className="animate-spin text-blue-500" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="bg-gray-900 border border-white/10 rounded-xl p-16 text-center">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Mail size={24} className="text-slate-500" />
                        </div>
                        <p className="text-slate-400 font-medium">No messages yet</p>
                        <p className="text-slate-600 text-sm mt-1">Messages from your contact form will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`bg-gray-900 border rounded-xl p-5 hover:border-white/20 transition-all duration-200
                  ${!msg.read ? 'border-blue-500/40' : 'border-white/10'}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    {/* Sender */}
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                      flex items-center justify-center text-white text-xs font-bold shrink-0 uppercase select-none">
                                            {msg.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-white font-semibold text-sm">{msg.name}</span>
                                                {!msg.read && (
                                                    <span className="px-1.5 py-0.5 rounded bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-wide">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                                                <Mail size={11} />
                                                <a href={`mailto:${msg.email}`} className="hover:text-slate-300 transition-colors truncate">
                                                    {msg.email}
                                                </a>
                                            </div>
                                            {msg.subject && (
                                                <p className="text-slate-400 text-xs font-medium mt-1 truncate">
                                                    Subject: {msg.subject}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Date + Delete */}
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <div className="flex items-center gap-1 text-slate-600 text-xs">
                                            <Clock size={11} /> {formatDate(msg.createdAt)}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(msg._id)} disabled={deleting === msg._id}
                                            className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                                            aria-label="Delete message"
                                        >
                                            {deleting === msg._id
                                                ? <Loader2 size={13} className="animate-spin" />
                                                : <Trash2 size={13} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Message body */}
                                <div className="mt-3 pl-12">
                                    <p className="text-slate-300 text-sm leading-relaxed">{msg.message}</p>
                                    <a
                                        href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your message'}`}
                                        className="inline-flex items-center gap-1.5 mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        <Mail size={12} /> Reply via email
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Messages;
