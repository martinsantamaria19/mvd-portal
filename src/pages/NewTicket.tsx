import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { openTicket } from '../lib/api';
import { Spinner } from '../components/Spinner';

const departments = [
  { id: '1', name: 'Soporte Técnico' },
  { id: '2', name: 'Facturación' },
  { id: '3', name: 'Ventas' },
];

const priorities = ['Low', 'Medium', 'High'];
const priorityLabels: Record<string, string> = {
  Low: 'Baja',
  Medium: 'Media',
  High: 'Alta',
};

export function NewTicket() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    deptId: '1',
    subject: '',
    message: '',
    priority: 'Medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setLoading(true);

    try {
      await openTicket({
        clientId: user.id,
        deptId: form.deptId,
        subject: form.subject,
        message: form.message,
        priority: form.priority,
      });
      navigate('/tickets');
    } catch {
      setError('No se pudo crear el ticket. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/tickets')}
          className="text-text-secondary hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors"
        >
          ← Volver a tickets
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Nuevo ticket</h1>
        <p className="text-text-secondary mt-1">Abrí un ticket y te responderemos a la brevedad</p>
      </div>

      <div className="max-w-2xl">
        <div className="card">
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Departamento
              </label>
              <select
                value={form.deptId}
                onChange={(e) => setForm({ ...form, deptId: e.target.value })}
                className="input-field"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Prioridad
              </label>
              <div className="flex gap-3">
                {priorities.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm({ ...form, priority: p })}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      form.priority === p
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-text-secondary hover:border-accent/50'
                    }`}
                  >
                    {priorityLabels[p]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Asunto
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Describí brevemente el problema"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Mensaje
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describí en detalle tu consulta o problema..."
                required
                rows={6}
                className="input-field resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/tickets')}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <><Spinner size="sm" /> Enviando...</> : 'Enviar ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
