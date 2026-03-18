import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🖥️',
    title: 'Hosting Web',
    desc: 'Servidores rápidos y seguros con uptime garantizado. SSD, panel cPanel, backups diarios.',
  },
  {
    icon: '🌐',
    title: 'Dominios',
    desc: 'Registrá y administrá tus dominios .com, .uy y más de 500 extensiones disponibles.',
  },
  {
    icon: '💻',
    title: 'Desarrollo Web',
    desc: 'Sitios web profesionales, e-commerce y aplicaciones a medida para tu negocio.',
  },
  {
    icon: '🎫',
    title: 'Soporte Técnico',
    desc: 'Asistencia técnica 24/7. Equipo de expertos listo para resolver cualquier inconveniente.',
  },
];

const stats = [
  { value: '+500', label: 'Clientes activos' },
  { value: '99.9%', label: 'Uptime garantizado' },
  { value: '+8 años', label: 'En el mercado' },
  { value: '24/7', label: 'Soporte disponible' },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navbar */}
      <nav className="border-b border-border sticky top-0 z-50 bg-bg/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold">
            <span className="text-accent">MVD</span>
            <span className="text-white">Studio</span>
          </span>
          <Link
            to="/login"
            className="btn-primary text-sm"
          >
            Iniciar sesión
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent text-sm font-medium mb-8">
          ✦ Servicios digitales profesionales
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
          Tu negocio merece<br />
          <span className="text-accent">infraestructura de calidad</span>
        </h1>
        <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Hosting, dominios, desarrollo web y soporte técnico. Todo lo que necesitás para llevar tu empresa al siguiente nivel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="btn-primary text-base">
            Acceder al panel →
          </Link>
          <a href="https://mvdcreativestudio.com" target="_blank" rel="noopener noreferrer" className="btn-secondary text-base">
            Conocer más
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border py-12 bg-panel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-accent">{stat.value}</div>
                <div className="text-text-secondary text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nuestros servicios</h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Soluciones completas para que tu presencia digital sea impecable.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card hover:border-accent/40 transition-colors duration-300 group">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 bg-panel">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Ya sos cliente?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Accedé a tu panel para gestionar tus servicios, facturas y soporte en un solo lugar.
          </p>
          <Link to="/login" className="btn-primary text-base">
            Ingresar al panel de clientes →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-text-secondary text-sm">
          <span className="font-bold">
            <span className="text-accent">MVD</span>
            <span className="text-white">Studio</span>
          </span>
          <span className="mx-2">·</span>
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
