import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { getInvoices, getClientProducts, getTickets } from '../lib/api';
import { LoadingPage } from '../components/Spinner';
import { StatCard } from '../components/Card';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ pendingInvoices: 0, activeServices: 0, openTickets: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const [invoicesData, servicesData, ticketsData] = await Promise.allSettled([
          getInvoices(user.id),
          getClientProducts(user.id),
          getTickets(user.id),
        ]);

        let pendingInvoices = 0;
        let activeServices = 0;
        let openTickets = 0;

        if (invoicesData.status === 'fulfilled') {
          const invoices = invoicesData.value.invoices?.invoice || [];
          pendingInvoices = invoices.filter((i: { status: string }) => i.status === 'Unpaid').length;
        }

        if (servicesData.status === 'fulfilled') {
          const products = servicesData.value.products?.product || [];
          activeServices = products.filter((p: { status: string }) => p.status === 'Active').length;
        }

        if (ticketsData.status === 'fulfilled') {
          const tickets = ticketsData.value.tickets?.ticket || [];
          openTickets = tickets.filter((t: { status: string }) => t.status === 'Open').length;
        }

        setStats({ pendingInvoices, activeServices, openTickets });
      } catch {
        setError('No se pudo cargar el resumen. Intentá de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Hola, {user?.firstName} 👋
        </h1>
        <p className="text-text-secondary mt-1">Bienvenido a tu panel de cliente MVD Studio</p>
      </div>

      {error && (
        <div className="bg-yellow-900/20 border border-yellow-800 text-yellow-400 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Facturas pendientes"
          value={stats.pendingInvoices}
          description="Requieren pago"
          icon="🧾"
          onClick={() => navigate('/invoices')}
        />
        <StatCard
          title="Servicios activos"
          value={stats.activeServices}
          description="En funcionamiento"
          icon="🖥️"
          onClick={() => navigate('/services')}
        />
        <StatCard
          title="Tickets abiertos"
          value={stats.openTickets}
          description="En soporte"
          icon="🎫"
          onClick={() => navigate('/tickets')}
        />
      </div>

      <h2 className="text-lg font-semibold text-white mb-4">Acceso rápido</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { to: '/invoices', icon: '🧾', title: 'Facturas', desc: 'Ver y pagar tus facturas' },
          { to: '/services', icon: '🖥️', title: 'Servicios', desc: 'Administrar hosting y más' },
          { to: '/domains', icon: '🌐', title: 'Dominios', desc: 'Gestionar tus dominios' },
          { to: '/tickets', icon: '🎫', title: 'Soporte', desc: 'Ver y crear tickets' },
          { to: '/profile', icon: '👤', title: 'Mi Perfil', desc: 'Actualizar tus datos' },
        ].map((item) => (
          <div
            key={item.to}
            className="card cursor-pointer hover:border-accent/50 transition-colors duration-200 group"
            onClick={() => navigate(item.to)}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="text-white font-semibold group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
              <span className="ml-auto text-text-secondary group-hover:text-accent transition-colors">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
