import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Menu } from 'lucide-react';

interface AdminNavbarProps {
    onMenuToggle: () => void;
    sidebarOpen: boolean;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onMenuToggle, sidebarOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <header
            className={`fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6
        bg-gray-900/95 backdrop-blur-sm border-b border-white/10 transition-all duration-300
        ${sidebarOpen ? 'left-64' : 'left-16'}`}
        >
            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuToggle}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all md:hidden"
                    aria-label="Toggle menu"
                >
                    <Menu size={20} />
                </button>
                <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest leading-none">Admin Panel</p>
                    <h1 className="text-white font-bold text-sm leading-tight mt-0.5">Portfolio Manager</h1>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <button
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all relative"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                </button>

                <div className="h-6 w-px bg-white/10" />

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold select-none">
                        JA
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400
              hover:bg-red-500/20 hover:text-red-300 transition-all text-sm font-medium"
                    >
                        <LogOut size={14} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
