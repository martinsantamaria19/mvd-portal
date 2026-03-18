import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { getQuotes } from '../lib/api';
import { LoadingPage } from '../components/Spinner';
import { Badge } from '../components/Badge';

const PRESUPUESTOS_BASE_URL = 'http://92.113.38.153:8003';

interface Quote {
  id: number;
  numero: string;
  fecha: string | null;
  estado: string;
  total: number;
  subtotal: number;
  iva_monto: number;
  iva_porcentaje: number;
  token_ver: string;
  firmado: boolean;
  firma_fecha: string | null;
  facturado: boolean;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 2,
  }).format(amount);
}

function getEstadoBadge(estado: string) {
  switch (estado) {
    case 'pendiente': return { label: 'Pendiente', variant: 'warning' as const };
    case 'enviado':   return { label: 'Enviado', variant: 'info' as const };
    case 'aprobado':  return { label: 'Aprobado', variant: 'success' as const };
    case 'firmado':   return { label: 'Firmado', variant: 'success' as const };
    case 'rechazado': return { label: 'Rechazado', variant: 'danger' as const };
    default:          return { label: estado, variant: 'default' as const };
  }
}

export function Quotes() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getQuotes(user.id)
      .then((data) => {
        setQuotes(data.data || []);
      })
      .catch(() => setError('No se pudieron cargar los presupuestos.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Presupuestos</h1>
        <p className="text-text-secondary mt-1">Tus presupuestos de MVD Studio</p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {!error && quotes.length === 0 && (
        <div className="bg-panel border border-border rounded-lg p-8 text-center">
          <p className="text-text-secondary text-lg">No tenés presupuestos aún.</p>
        </div>
      )}

      {quotes.length > 0 && (
        <div className="bg-panel border border-border rounded-lg overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-text-secondary text-sm font-medium px-6 py-4">Número</th>
                  <th className="text-left text-text-secondary text-sm font-medium px-6 py-4">Fecha</th>
                  <th className="text-left text-text-secondary text-sm font-medium px-6 py-4">Total</th>
                  <th className="text-left text-text-secondary text-sm font-medium px-6 py-4">Estado</th>
                  <th className="text-right text-text-secondary text-sm font-medium px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote, i) => {
                  const badge = getEstadoBadge(quote.estado);
                  const publicUrl = `${PRESUPUESTOS_BASE_URL}/p/${quote.token_ver}`;
                  const isPending = quote.estado === 'pendiente' || quote.estado === 'enviado';

                  return (
                    <tr
                      key={quote.id}
                      className={`border-b border-border last:border-0 transition-colors hover:bg-white/5 ${
                        i % 2 === 0 ? '' : 'bg-white/[0.02]'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{quote.numero}</span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">
                        {formatDate(quote.fecha)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">{formatCurrency(quote.total)}</span>
                        <span className="text-text-secondary text-xs ml-1">(IVA {quote.iva_porcentaje}%)</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                        {quote.firmado && (
                          <span className="ml-2 text-xs text-green-400">✍ Firmado</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-accent/10 text-accent border border-accent/20 text-xs font-medium hover:bg-accent/20 transition-colors"
                          >
                            📄 Ver / PDF
                          </a>
                          {isPending && (
                            <a
                              href={publicUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-900/30 text-green-400 border border-green-800 text-xs font-medium hover:bg-green-900/50 transition-colors"
                            >
                              ✍ Firmar
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border">
            {quotes.map((quote) => {
              const badge = getEstadoBadge(quote.estado);
              const publicUrl = `${PRESUPUESTOS_BASE_URL}/p/${quote.token_ver}`;
              const isPending = quote.estado === 'pendiente' || quote.estado === 'enviado';

              return (
                <div key={quote.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{quote.numero}</span>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                  <div className="text-text-secondary text-sm">{formatDate(quote.fecha)}</div>
                  <div className="text-white font-semibold">{formatCurrency(quote.total)}</div>
                  <div className="flex gap-2">
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-2 rounded-md bg-accent/10 text-accent border border-accent/20 text-sm font-medium hover:bg-accent/20 transition-colors"
                    >
                      📄 Ver / PDF
                    </a>
                    {isPending && (
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 rounded-md bg-green-900/30 text-green-400 border border-green-800 text-sm font-medium hover:bg-green-900/50 transition-colors"
                      >
                        ✍ Firmar
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
