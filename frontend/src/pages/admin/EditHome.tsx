import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface HomeData {
    name: string;
    title: string;
    subtitle: string;
    description: string;
    githubUrl: string;
    linkedinUrl: string;
    email: string;
}

const defaultForm: HomeData = {
    name: '', title: '', subtitle: '', description: '',
    githubUrl: '', linkedinUrl: '', email: '',
};

const fields: { key: keyof HomeData; label: string; placeholder: string; type?: string; multiline?: boolean }[] = [
    { key: 'name', label: 'Full Name', placeholder: 'e.g. Jeyakkanth' },
    { key: 'title', label: 'Job Title / Role', placeholder: 'e.g. Full Stack Developer' },
    { key: 'subtitle', label: 'Subtitle / Tagline', placeholder: 'e.g. I build modern web apps' },
    { key: 'description', label: 'Hero Description', placeholder: 'Short intro paragraph...', multiline: true },
    { key: 'githubUrl', label: 'GitHub URL', placeholder: 'https://github.com/username', type: 'url' },
    { key: 'linkedinUrl', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/username', type: 'url' },
    { key: 'email', label: 'Contact Email', placeholder: 'you@example.com', type: 'email' },
];

const EditHome: React.FC = () => {
    const [form, setForm] = useState<HomeData>(defaultForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/home`)
            .then((r) => setForm(r.data))
            .catch(() => setError('Failed to load home data.'))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
        setSuccess(''); setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true); setError(''); setSuccess('');
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/api/admin/home`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Home section updated successfully!');
        } catch {
            setError('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Edit Home Section
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Update your hero section content.</p>
                </div>

                {success && (
                    <div className="mb-5 flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
                        <CheckCircle size={16} className="shrink-0" /> {success}
                    </div>
                )}
                {error && (
                    <div className="mb-5 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                        <AlertCircle size={16} className="shrink-0" /> {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <Loader2 size={28} className="animate-spin text-blue-500" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-gray-900 border border-white/10 rounded-xl p-6 space-y-5">
                        {fields.map((f) => (
                            <div key={f.key}>
                                <label htmlFor={f.key} className="block text-sm font-medium text-slate-300 mb-1.5">
                                    {f.label}
                                </label>
                                {f.multiline ? (
                                    <textarea
                                        id={f.key} name={f.key} value={form[f.key]}
                                        onChange={handleChange} placeholder={f.placeholder} rows={4}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-slate-500
                      text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                                    />
                                ) : (
                                    <input
                                        id={f.key} type={f.type || 'text'} name={f.key} value={form[f.key]}
                                        onChange={handleChange} placeholder={f.placeholder}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-slate-500
                      text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            type="submit" disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white
                text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                        >
                            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                            {saving ? 'Saving…' : 'Save Changes'}
                        </button>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default EditHome;
