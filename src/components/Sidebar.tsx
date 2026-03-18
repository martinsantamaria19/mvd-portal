import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/invoices', label: 'Facturas', icon: '🧾' },
  { to: '/quotes', label: 'Presupuestos', icon: '📋' },
  { to: '/services', label: 'Servicios', icon: '🖥️' },
  { to: '/domains', label: 'Dominios', icon: '🌐' },
  { to: '/tickets', label: 'Soporte', icon: '🎫' },
  { to: '/profile', label: 'Mi Perfil', icon: '👤' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-panel border-r border-border min-h-screen">
      <div className="p-6 border-b border-border">
        <span className="text-xl font-bold">
          <span className="text-accent">MVD</span>
          <span className="text-white">Studio</span>
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <p className="text-text-secondary text-xs text-center">
          © 2025 MVD Studio
        </p>
      </div>
    </aside>
  );
}
