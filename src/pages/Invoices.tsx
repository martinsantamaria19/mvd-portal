import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { getInvoices } from '../lib/api';
import { LoadingPage } from '../components/Spinner';
import { Badge } from '../components/Badge';

interface Invoice {
  id: string;
  invoicenum: string;
  date: string;
  duedate: string;
  total: string;
  status: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Paid': return { label: 'Pagada', variant: 'success' as const };
    case 'Unpaid': return { label: 'Pendiente', variant: 'warning' as const };
    case 'Overdue': return { label: 'Vencida', variant: 'danger' as const };
    case 'Cancelled': return { label: 'Cancelada', variant: 'default' as const };
    default: return { label: status, variant: 'default' as const };
  }
}

export function Invoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getInvoices(user.id)
      .then((data) => setInvoices(data.invoices?.invoice || []))
      .catch(() => setError('No se pudieron cargar las facturas.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Facturas</h1>
        <p className="text-text-secondary mt-1">Historial de tus facturas y pagos</p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">🧾</div>
          <p className="text-text-secondary">No tenés facturas registradas.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Nº Factura</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Fecha</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Vencimiento</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Total</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Estado</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, i) => {
                  const { label, variant } = getStatusBadge(invoice.status);
                  return (
                    <tr key={invoice.id} className={i !== invoices.length - 1 ? 'border-b border-border' : ''}>
                      <td className="px-6 py-4 text-white font-medium">#{invoice.invoicenum || invoice.id}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{invoice.date}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{invoice.duedate}</td>
                      <td className="px-6 py-4 text-white font-semibold">${invoice.total}</td>
                      <td className="px-6 py-4">
                        <Badge variant={variant}>{label}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        {invoice.status === 'Unpaid' && (
                          <a
                            href={`https://mvdcreativestudio.com/clientes/viewinvoice.php?id=${invoice.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs px-4 py-2 inline-block"
                          >
                            Pagar
                          </a>
                        )}
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
