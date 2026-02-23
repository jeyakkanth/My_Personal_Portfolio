import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, CheckCircle, AlertCircle, Loader2, Upload } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface ResumeData {
    resumeUrl: string;
    lastUpdated: string;
    highlights: string;
}

const EditResume: React.FC = () => {
    const [form, setForm] = useState<ResumeData>({ resumeUrl: '', lastUpdated: '', highlights: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/resume`)
            .then((r) => setForm(r.data))
            .catch(() => setError('Failed to load resume data.'))
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
            await axios.put(`${API_BASE_URL}/api/admin/resume`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Resume section updated successfully!');
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
                        Edit Resume
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Update your resume download link and details.</p>
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
                        {/* Resume URL */}
                        <div>
                            <label htmlFor="resumeUrl" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Resume / CV URL
                            </label>
                            <div className="relative">
                                <Upload size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                <input
                                    id="resumeUrl" type="url" name="resumeUrl" value={form.resumeUrl}
                                    onChange={handleChange} placeholder="https://drive.google.com/file/d/... or /resume.pdf"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-slate-500
                    text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Link to Google Drive, Dropbox, or a hosted PDF file.</p>
                        </div>

                        {/* Last Updated */}
                        <div>
                            <label htmlFor="lastUpdated" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Last Updated
                            </label>
                            <input
                                id="lastUpdated" type="text" name="lastUpdated" value={form.lastUpdated}
                                onChange={handleChange} placeholder="e.g. February 2025"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-slate-500
                  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            />
                        </div>

                        {/* Highlights */}
                        <div>
                            <label htmlFor="highlights" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Resume Highlights (one per line)
                            </label>
                            <textarea
                                id="highlights" name="highlights" value={form.highlights} onChange={handleChange} rows={5}
                                placeholder={'2+ years of experience\nProficient in MERN stack\nOpen to full-time roles'}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-slate-500
                  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                            />
                        </div>

                        {/* Live Preview */}
                        {form.resumeUrl && (
                            <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg px-4 py-3">
                                <p className="text-xs text-blue-400 font-semibold mb-1">Current Resume Link</p>
                                <a
                                    href={form.resumeUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-blue-300 hover:text-white transition-colors break-all underline underline-offset-2"
                                >
                                    {form.resumeUrl}
                                </a>
                            </div>
                        )}

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

export default EditResume;
