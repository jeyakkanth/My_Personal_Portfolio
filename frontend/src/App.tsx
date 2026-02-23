import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

// ── Portfolio (public) components ───────────────────────────────────────────
import Header from './components/portfolio/Header';
import Hero from './components/portfolio/Hero';
import About from './components/portfolio/About';
import Skills from './components/portfolio/Skills';
import Experience from './components/portfolio/Experience';
import Projects from './components/portfolio/Projects';
import Resume from './components/portfolio/Resume';
import Contact from './components/portfolio/Contact';
import Footer from './components/portfolio/Footer';

// ── Admin pages ─────────────────────────────────────────────────────────────
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import EditHome from './pages/admin/EditHome';
import EditAbout from './pages/admin/EditAbout';
import EditExperience from './pages/admin/EditExperience';
import EditProjects from './pages/admin/EditProjects';
import EditResume from './pages/admin/EditResume';
import Messages from './pages/admin/Messages';

// ── Auth guard ──────────────────────────────────────────────────────────────
import ProtectedRoute from './components/admin/ProtectedRoute';

/* ─── Public Portfolio Page ─────────────────────────────────────────────── */
function PortfolioPage({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <div className="min-h-screen bg-white dark:bg-primary transition-colors duration-300">
      <Toaster position="bottom-right" reverseOrder={false} />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ─── App Root ──────────────────────────────────────────────────────────── */
function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<PortfolioPage theme={theme} toggleTheme={toggleTheme} />} />

        {/* ── Admin auth ── */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Protected admin pages (flat routes, each page has its own sidebar) ── */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/edit-home" element={<ProtectedRoute><EditHome /></ProtectedRoute>} />
        <Route path="/admin/edit-about" element={<ProtectedRoute><EditAbout /></ProtectedRoute>} />
        <Route path="/admin/edit-experience" element={<ProtectedRoute><EditExperience /></ProtectedRoute>} />
        <Route path="/admin/edit-projects" element={<ProtectedRoute><EditProjects /></ProtectedRoute>} />
        <Route path="/admin/edit-resume" element={<ProtectedRoute><EditResume /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />

        {/* ── Catch-all ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
