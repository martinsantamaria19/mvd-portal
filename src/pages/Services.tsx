import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { getClientProducts } from '../lib/api';
import { LoadingPage } from '../components/Spinner';
import { Badge } from '../components/Badge';

interface Service {
  id: string;
  name: string;
  groupname: string;
  regdate: string;
  nextduedate: string;
  status: string;
  billingcycle: string;
  amount: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Active': return { label: 'Activo', variant: 'success' as const };
    case 'Suspended': return { label: 'Suspendido', variant: 'warning' as const };
    case 'Terminated': return { label: 'Terminado', variant: 'danger' as const };
    case 'Cancelled': return { label: 'Cancelado', variant: 'default' as const };
    default: return { label: status, variant: 'default' as const };
  }
}

export function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getClientProducts(user.id)
      .then((data) => setServices(data.products?.product || []))
      .catch(() => setError('No se pudieron cargar los servicios.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Servicios</h1>
        <p className="text-text-secondary mt-1">Tus servicios de hosting y productos contratados</p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {services.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">🖥️</div>
          <p className="text-text-secondary">No tenés servicios activos.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => {
            const { label, variant } = getStatusBadge(service.status);
            return (
              <div key={service.id} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🖥️</div>
                    <div>
                      <h3 className="text-white font-semibold">{service.name}</h3>
                      <p className="text-text-secondary text-sm">{service.groupname}</p>
                      <p className="text-text-secondary text-xs mt-1">
                        Contratado el {service.regdate} · {service.billingcycle}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <Badge variant={variant}>{label}</Badge>
                    <p className="text-text-secondary text-sm">
                      Próximo vencimiento: <span className="text-white font-medium">{service.nextduedate}</span>
                    </p>
                    <p className="text-accent font-semibold">${service.amount}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
