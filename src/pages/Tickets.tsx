import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { getTickets } from '../lib/api';
import { LoadingPage } from '../components/Spinner';
import { Badge } from '../components/Badge';

interface Ticket {
  tid: string;
  c: string;
  title: string;
  status: string;
  dept: string;
  date: string;
  lastreply: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Open': return { label: 'Abierto', variant: 'success' as const };
    case 'Answered': return { label: 'Respondido', variant: 'info' as const };
    case 'Customer-Reply': return { label: 'Pendiente respuesta', variant: 'warning' as const };
    case 'Closed': return { label: 'Cerrado', variant: 'default' as const };
    case 'On Hold': return { label: 'En espera', variant: 'warning' as const };
    default: return { label: status, variant: 'default' as const };
  }
}

export function Tickets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getTickets(user.id)
      .then((data) => setTickets(data.tickets?.ticket || []))
      .catch(() => setError('No se pudieron cargar los tickets.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Soporte</h1>
          <p className="text-text-secondary mt-1">Tus tickets de soporte técnico</p>
        </div>
        <button
          onClick={() => navigate('/tickets/new')}
          className="btn-primary self-start sm:self-auto"
        >
          + Nuevo ticket
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">🎫</div>
          <p className="text-text-secondary mb-4">No tenés tickets de soporte.</p>
          <button
            onClick={() => navigate('/tickets/new')}
            className="btn-primary"
          >
            Abrir primer ticket
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">ID</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Asunto</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Departamento</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Fecha</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Último reply</th>
                  <th className="text-left text-text-secondary text-xs font-medium uppercase tracking-wider px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, i) => {
                  const { label, variant } = getStatusBadge(ticket.status);
                  return (
                    <tr key={ticket.tid} className={i !== tickets.length - 1 ? 'border-b border-border' : ''}>
                      <td className="px-6 py-4 text-text-secondary text-sm font-mono">#{ticket.c || ticket.tid}</td>
                      <td className="px-6 py-4 text-white font-medium">{ticket.title}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{ticket.dept}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{ticket.date}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{ticket.lastreply || '—'}</td>
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
