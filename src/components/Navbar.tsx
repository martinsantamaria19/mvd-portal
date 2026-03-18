import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/invoices', label: 'Facturas', icon: '🧾' },
  { to: '/services', label: 'Servicios', icon: '🖥️' },
  { to: '/domains', label: 'Dominios', icon: '🌐' },
  { to: '/tickets', label: 'Soporte', icon: '🎫' },
  { to: '/profile', label: 'Perfil', icon: '👤' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-panel border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Mobile logo */}
        <span className="md:hidden text-lg font-bold">
          <span className="text-accent">MVD</span>
          <span className="text-white">Studio</span>
        </span>

        {/* User menu */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-xs">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <span className="hidden sm:block">{user?.firstName} {user?.lastName}</span>
              <span className="text-xs">▾</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-panel border border-border rounded-xl shadow-2xl z-50">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-t-xl transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  👤 Mi Perfil
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded-b-xl transition-colors"
                >
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex overflow-x-auto border-t border-border px-2 pb-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-accent' : 'text-text-secondary'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
