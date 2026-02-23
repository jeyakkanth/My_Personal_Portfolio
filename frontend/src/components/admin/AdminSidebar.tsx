import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Home,
    User,
    Briefcase,
    FolderOpen,
    FileText,
    MessageSquare,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Home Section', icon: Home, path: '/admin/edit-home' },
    { label: 'About Section', icon: User, path: '/admin/edit-about' },
    { label: 'Experience', icon: Briefcase, path: '/admin/edit-experience' },
    { label: 'Projects', icon: FolderOpen, path: '/admin/edit-projects' },
    { label: 'Resume', icon: FileText, path: '/admin/edit-resume' },
    { label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
];

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}
        bg-gray-900 border-r border-white/10 shadow-xl shadow-black/30`}
        >
            {/* Logo */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/10 h-16 shrink-0">
                {isOpen && (
                    <span className="text-xl font-bold text-white font-display tracking-tight select-none">
                        JEY<span className="text-blue-500">.</span>
                        <span className="text-sm font-normal text-slate-500 ml-1">Admin</span>
                    </span>
                )}
                <button
                    onClick={onToggle}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all ml-auto shrink-0"
                    aria-label="Toggle Sidebar"
                >
                    {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin/dashboard'}
                        title={!isOpen ? item.label : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
               ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                : 'text-slate-400 hover:text-white hover:bg-white/8'}`
                        }
                    >
                        <item.icon size={18} className="shrink-0" />
                        {isOpen && <span className="truncate">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-2 pb-4 pt-4 border-t border-white/10 shrink-0">
                <button
                    onClick={handleLogout}
                    title={!isOpen ? 'Logout' : undefined}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
            text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                    <LogOut size={18} className="shrink-0" />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
