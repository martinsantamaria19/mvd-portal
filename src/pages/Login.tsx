import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { Spinner } from '../components/Spinner';

export function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Credenciales inválidas. Verificá tu email y contraseña.');
        return;
      }

      login(
        {
          id: String(data.clientId),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          phone: data.phone,
        },
        data.token
      );

      navigate('/dashboard');
    } catch {
      setError('Error de conexión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/" className="text-xl font-bold">
          <span className="text-accent">MVD</span>
          <span className="text-white">Studio</span>
        </Link>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Bienvenido de nuevo</h1>
              <p className="text-text-secondary text-sm">Ingresá a tu panel de cliente</p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    Ingresando...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>

            <p className="text-center text-text-secondary text-sm mt-6">
              ¿Necesitás ayuda?{' '}
              <a
                href="https://mvdcreativestudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                Contactanos
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
