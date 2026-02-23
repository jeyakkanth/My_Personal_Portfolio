import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import {
    Home, User, Briefcase,
    FolderOpen, FileText, MessageSquare, TrendingUp, ArrowRight,
} from 'lucide-react';

/* ─── Stat Card ─── */
interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    color: string;
    bg: string;
}
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color, bg }) => (
    <div className="bg-gray-900 border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-white/20 transition-all duration-200 group">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
            <Icon size={20} className={color} />
        </div>
        <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-white text-xl font-bold mt-0.5">{value}</p>
        </div>
    </div>
);

/* ─── Quick Links ─── */
const quickLinks = [
    { label: 'Edit Home', icon: Home, path: '/admin/edit-home', color: 'bg-blue-600' },
    { label: 'Edit About', icon: User, path: '/admin/edit-about', color: 'bg-purple-600' },
    { label: 'Edit Experience', icon: Briefcase, path: '/admin/edit-experience', color: 'bg-emerald-600' },
    { label: 'Edit Projects', icon: FolderOpen, path: '/admin/edit-projects', color: 'bg-orange-600' },
    { label: 'Edit Resume', icon: FileText, path: '/admin/edit-resume', color: 'bg-pink-600' },
    { label: 'Messages', icon: MessageSquare, path: '/admin/messages', color: 'bg-cyan-600' },
];

/* ─── Dashboard Overview ─── */
const DashboardHome: React.FC = () => (
    <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Welcome back, Jeyakkanth 👋
            </h2>
            <p className="text-slate-400 text-sm mt-1">Manage and update your portfolio content from here.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard icon={FolderOpen} label="Projects" value="—" bg="bg-blue-600/20" color="text-blue-400" />
            <StatCard icon={Briefcase} label="Experience" value="—" bg="bg-purple-600/20" color="text-purple-400" />
            <StatCard icon={MessageSquare} label="Messages" value="—" bg="bg-emerald-600/20" color="text-emerald-400" />
            <StatCard icon={TrendingUp} label="Profile Views" value="—" bg="bg-orange-600/20" color="text-orange-400" />
        </div>

        {/* Quick Actions */}
        <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {quickLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className="group bg-gray-900 border border-white/10 hover:border-white/25 rounded-xl p-4
              flex items-center gap-3 transition-all duration-200"
                    >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${link.color}`}>
                            <link.icon size={16} className="text-white" />
                        </div>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors flex-1">
                            {link.label}
                        </span>
                        <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </NavLink>
                ))}
            </div>
        </div>
    </div>
);

/* ─── Layout Shell ─── */
const AdminDashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggle = () => setSidebarOpen((o) => !o);

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <AdminSidebar isOpen={sidebarOpen} onToggle={toggle} />
            <AdminNavbar sidebarOpen={sidebarOpen} onMenuToggle={toggle} />

            <main
                className={`transition-all duration-300 pt-16 min-h-screen
          ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
            >
                <div className="p-6 md:p-8">
                    <DashboardHome />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
