import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { getClientDomains } from '../lib/api';
import { LoadingPage } from '../components/Spinner';
import { Badge } from '../components/Badge';

function parseWhmcsDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  const ddmmyyyy = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (ddmmyyyy) return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`);
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = parseWhmcsDate(dateStr);
  if (d.getTime() === 0) return dateStr;
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

interface Domain {
  id: string;
  domainname: string;
  regdate: string;
  nextduedate: string;
  expirydate: string;
  status: string;
  registrar: string;
  recurringamount: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Active': return { label: 'Activo', variant: 'success' as const };
    case 'Expired': return { label: 'Expirado', variant: 'danger' as const };
    case 'Suspended': return { label: 'Suspendido', variant: 'warning' as const };
    case 'Cancelled': return { label: 'Cancelado', variant: 'default' as const };
    default: return { label: status, variant: 'default' as const };
  }
}

export function Domains() {
  const { user } = useAuth();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getClientDomains(user.id)
      .then((data) => setDomains(data.domains?.domain || []))
      .catch(() => setError('No se pudieron cargar los dominios.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dominios</h1>
        <p className="text-text-secondary mt-1">Administrá tus dominios registrados</p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {domains.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">🌐</div>
          <p className="text-text-secondary">No tenés dominios registrados.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Dominio</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Registrado</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Expira</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Precio</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain, i) => {
                  const { label, variant } = getStatusBadge(domain.status);
                  return (
                    <tr key={domain.id} className={i !== domains.length - 1 ? 'border-b border-border' : ''}>
                      <td className="px-6 py-4 text-white font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🌐</span>
                          {domain.domainname}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{formatDate(domain.regdate)}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{formatDate(domain.expirydate || domain.nextduedate)}</td>
                      <td className="px-6 py-4 text-accent font-semibold">USD {domain.recurringamount}</td>
                      <td className="px-6 py-4">
                        <Badge variant={variant}>{label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
