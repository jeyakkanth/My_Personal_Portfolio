import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Plus, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface ExperienceItem {
    _id?: string;
    company: string;
    role: string;
    duration: string;
    location: string;
    description: string;
    technologies: string;
}

const emptyItem = (): ExperienceItem => ({
    company: '', role: '', duration: '', location: '', description: '', technologies: '',
});

const inputFields = [
    { name: 'company', label: 'Company Name', placeholder: 'e.g. TechCorp Inc.' },
    { name: 'role', label: 'Role / Position', placeholder: 'e.g. Full Stack Developer' },
    { name: 'duration', label: 'Duration', placeholder: 'e.g. Jan 2023 – Present' },
    { name: 'location', label: 'Location', placeholder: 'e.g. Remote / Chennai' },
    { name: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB...' },
];

const EditExperience: React.FC = () => {
    const [items, setItems] = useState<ExperienceItem[]>([emptyItem()]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/experience`)
            .then((r) => setItems(r.data.length > 0 ? r.data : [emptyItem()]))
            .catch(() => setError('Failed to load experience data.'))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItems((prev) => prev.map((item, i) => i === index ? { ...item, [e.target.name]: e.target.value } : item));
        setSuccess(''); setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true); setError(''); setSuccess('');
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/api/admin/experience`, { experience: items }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Experience section updated successfully!');
        } catch {
            setError('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Edit Experience
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">Manage your work history entries.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setItems((p) => [...p, emptyItem()])}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10
              hover:border-white/25 text-slate-300 hover:text-white text-sm transition-all"
                    >
                        <Plus size={15} /> Add Entry
                    </button>
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
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {items.map((item, index) => (
                            <div key={index} className="bg-gray-900 border border-white/10 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-semibold text-slate-300">Experience #{index + 1}</span>
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setItems((p) => p.filter((_, i) => i !== index))}
                                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {inputFields.map((f) => (
                                        <div key={f.name}>
                                            <label htmlFor={`${f.name}-${index}`} className="block text-xs font-medium text-slate-400 mb-1">
                                                {f.label}
                                            </label>
                                            <input
                                                id={`${f.name}-${index}`} type="text" name={f.name}
                                                value={(item as any)[f.name]} onChange={(e) => handleChange(index, e)}
                                                placeholder={f.placeholder}
                                                className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-slate-500
                          text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label htmlFor={`description-${index}`} className="block text-xs font-medium text-slate-400 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            id={`description-${index}`} name="description" value={item.description}
                                            onChange={(e) => handleChange(index, e)} rows={3}
                                            placeholder="Describe your responsibilities and achievements..."
                                            className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-slate-500
                        text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit" disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white
                text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                        >
                            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                            {saving ? 'Saving…' : 'Save All Changes'}
                        </button>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default EditExperience;
