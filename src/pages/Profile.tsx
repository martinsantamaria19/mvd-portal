import { useState, type FormEvent, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { getClientDetails, updateClientDetails } from '../lib/api';
import { LoadingPage, Spinner } from '../components/Spinner';

export function Profile() {
  const { user, login, token } = useAuth();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    companyname: '',
    address1: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getClientDetails(user.id)
      .then((data) => {
        const c = data.client || {};
        setForm({
          firstname: c.firstname || '',
          lastname: c.lastname || '',
          email: c.email || '',
          phonenumber: c.phonenumber || '',
          companyname: c.companyname || '',
          address1: c.address1 || '',
          city: c.city || '',
          state: c.state || '',
          postcode: c.postcode || '',
          country: c.country || '',
        });
      })
      .catch(() => setError('No se pudo cargar el perfil.'))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateClientDetails(user.id, form);
      setSuccess('Perfil actualizado correctamente.');
      // Update auth context
      login(
        {
          ...user,
          firstName: form.firstname,
          lastName: form.lastname,
          email: form.email,
          company: form.companyname,
          phone: form.phonenumber,
        },
        token || ''
      );
    } catch {
      setError('No se pudo actualizar el perfil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Mi Perfil</h1>
        <p className="text-text-secondary mt-1">Actualizá tus datos personales</p>
      </div>

      <div className="max-w-2xl">
        <div className="card">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-2xl">
              {form.firstname?.[0]}{form.lastname?.[0]}
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">{form.firstname} {form.lastname}</h2>
              <p className="text-text-secondary text-sm">{form.email}</p>
              {form.companyname && <p className="text-text-secondary text-sm">{form.companyname}</p>}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-900/20 border border-green-800 text-green-400 rounded-lg px-4 py-3 text-sm mb-6">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Nombre</label>
                <input
                  type="text"
                  value={form.firstname}
                  onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Apellido</label>
                <input
                  type="text"
                  value={form.lastname}
                  onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Teléfono</label>
              <input
                type="tel"
                value={form.phonenumber}
                onChange={(e) => setForm({ ...form, phonenumber: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Empresa</label>
              <input
                type="text"
                value={form.companyname}
                onChange={(e) => setForm({ ...form, companyname: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Dirección</label>
              <input
                type="text"
                value={form.address1}
                onChange={(e) => setForm({ ...form, address1: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Ciudad</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Código Postal</label>
                <input
                  type="text"
                  value={form.postcode}
                  onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <><Spinner size="sm" /> Guardando...</> : 'Guardar cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
