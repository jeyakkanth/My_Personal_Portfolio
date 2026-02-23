import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

/**
 * Shared layout wrapper for ALL admin pages (sidebar + navbar + main area).
 * Import this in each edit page instead of duplicating sidebar/navbar code.
 */
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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
                <div className="p-6 md:p-8 max-w-4xl">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
