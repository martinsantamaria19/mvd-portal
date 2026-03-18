import { Link } from 'react-router-dom';

const features = [
  {
    icon: '⚙️',
    title: 'Desarrollo a medida',
    desc: 'Sistemas, apps y e-commerce construidos exactamente como tu negocio los necesita. Nada genérico.',
  },
  {
    icon: '🖥️',
    title: 'Hosting & infraestructura',
    desc: 'Servidores SSD de alto rendimiento con uptime 99.9% garantizado, cPanel incluido y backups automáticos.',
  },
  {
    icon: '🧑‍💻',
    title: 'Soporte real, sin bots',
    desc: 'Hablás con personas reales que conocen tu sistema. Sin tickets perdidos, sin respuestas automáticas.',
  },
  {
    icon: '🔒',
    title: 'Seguridad y backups',
    desc: 'SSL gratis, firewalls activos, backups diarios y monitoreo 24/7 para que duermas tranquilo.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '$4.99',
    popular: false,
    features: [
      { label: 'Sitios web', value: '1' },
      { label: 'Espacio SSD', value: '10 GB' },
      { label: 'Ancho de banda', value: '100 GB' },
      { label: 'SSL gratis', value: '✓' },
      { label: 'cPanel', value: '✓' },
      { label: 'Backups', value: 'Semanal' },
      { label: 'Soporte', value: 'Email' },
      { label: 'Cuentas de email', value: '5' },
      { label: 'Bases de datos MySQL', value: '1' },
    ],
  },
  {
    name: 'Business',
    price: '$9.99',
    popular: true,
    features: [
      { label: 'Sitios web', value: '5' },
      { label: 'Espacio SSD', value: '50 GB' },
      { label: 'Ancho de banda', value: 'Ilimitado' },
      { label: 'SSL gratis', value: '✓' },
      { label: 'cPanel', value: '✓' },
      { label: 'Backups', value: 'Diario' },
      { label: 'Soporte', value: 'Email + Chat' },
      { label: 'Cuentas de email', value: '25' },
      { label: 'Bases de datos MySQL', value: '10' },
    ],
  },
  {
    name: 'Pro',
    price: '$19.99',
    popular: false,
    features: [
      { label: 'Sitios web', value: 'Ilimitados' },
      { label: 'Espacio SSD', value: '200 GB' },
      { label: 'Ancho de banda', value: 'Ilimitado' },
      { label: 'SSL gratis', value: '✓' },
      { label: 'cPanel', value: '✓' },
      { label: 'Backups', value: 'Diario' },
      { label: 'Soporte', value: 'Prioritario 24/7' },
      { label: 'Cuentas de email', value: 'Ilimitadas' },
      { label: 'Bases de datos MySQL', value: 'Ilimitadas' },
    ],
  },
];

const devServices = [
  { icon: '🌐', title: 'Sitios web corporativos', desc: 'Presencia digital profesional que refleja la identidad de tu empresa.' },
  { icon: '🛒', title: 'E-commerce', desc: 'Tiendas online con WooCommerce, Shopify o desarrollo 100% personalizado.' },
  { icon: '🗄️', title: 'Sistemas a medida', desc: 'CRM, ERP, portales internos y cualquier sistema que tu operación necesite.' },
  { icon: '📱', title: 'Apps móviles', desc: 'Aplicaciones iOS y Android nativas o multiplataforma para tu negocio.' },
  { icon: '🔗', title: 'Integraciones y APIs', desc: 'Conectamos tus sistemas entre sí y con plataformas externas sin fricciones.' },
];

const stats = [
  { value: '+500', label: 'Clientes activos' },
  { value: '99.9%', label: 'Uptime garantizado' },
  { value: '+8 años', label: 'En el mercado' },
  { value: '24/7', label: 'Soporte disponible' },
];

const testimonials = [
  {
    name: 'Pablo Rodríguez',
    company: 'Rodríguez & Asociados',
    role: 'Director',
    text: 'Migramos todo nuestro sistema de gestión a MVD Studio. El desarrollo fue impecable y el hosting no nos dio ni un problema en dos años.',
  },
  {
    name: 'Valentina Sosa',
    company: 'Boutique Alma',
    role: 'Fundadora',
    text: 'Nos hicieron la tienda online y el hosting en el mismo lugar. Súper recomendable, el soporte responde rápido y saben de lo que hablan.',
  },
  {
    name: 'Ignacio Ferreira',
    company: 'Constructora Sur',
    role: 'Gerente de TI',
    text: 'Necesitábamos un portal de clientes y un CRM interno. Lo entregaron en plazo y con exactamente lo que pedimos. Muy profesionales.',
  },
];

const CONTACT_MAIL = 'mailto:info@mvdstudio.com.uy';
const WHATSAPP = 'https://wa.me/59898182162';

export function Landing() {
  const scrollToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', color: '#fff' }}>

      {/* ── NAVBAR ── */}
      <nav style={{ borderBottom: '1px solid #2a2a2a', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>
            <span style={{ color: '#b8f000' }}>MVD</span>
            <span style={{ color: '#fff' }}>Studio</span>
          </Link>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="#planes" onClick={scrollToPlans} style={navLinkStyle}>Hosting</a>
            <a href="#desarrollo" style={navLinkStyle}>Desarrollo</a>
            <a href={CONTACT_MAIL} style={navLinkStyle}>Soporte</a>
            <Link to="/login" className="btn-primary" style={{ marginLeft: 12, fontSize: 14 }}>
              Panel de clientes
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px 80px', textAlign: 'center' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(184,240,0,0.08)', border: '1px solid rgba(184,240,0,0.25)',
          borderRadius: 100, padding: '8px 20px', color: '#b8f000',
          fontSize: 13, fontWeight: 600, marginBottom: 32,
        }}>
          🇺🇾 Empresa uruguaya · +8 años en el mercado
        </div>

        <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-1.5px' }}>
          Tu software a medida.<br />
          <span style={{ color: '#b8f000' }}>Hosting que no te falla.</span>
        </h1>

        <p style={{ color: '#a0a0a0', fontSize: 20, maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Desarrollamos sistemas, apps y e-commerce desde cero. Y los hosteamos en infraestructura propia con soporte real en Uruguay.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#planes" onClick={scrollToPlans} className="btn-primary" style={{ fontSize: 16 }}>
            Ver planes de hosting →
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: 16 }}>
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', background: '#111', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#b8f000', letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ color: '#a0a0a0', fontSize: 14, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROPUESTA DE VALOR ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
            ¿Por qué elegir MVD Studio?
          </h2>
          <p style={{ color: '#a0a0a0', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>
            Somos el proveedor completo para tu negocio digital en Uruguay.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {features.map((f) => (
            <div key={f.title} className="card" style={{ transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,240,0,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: '#a0a0a0', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANES DE HOSTING ── */}
      <section id="planes" style={{ background: '#0d0d0d', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
              Planes de hosting
            </h2>
            <p style={{ color: '#a0a0a0', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>
              Infraestructura sólida para sitios web, e-commerce y aplicaciones. Todos los planes incluyen SSL y cPanel gratis.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{
                background: plan.popular ? 'rgba(184,240,0,0.04)' : '#111',
                border: plan.popular ? '2px solid #b8f000' : '1px solid #2a2a2a',
                borderRadius: 16,
                padding: '32px 28px',
                position: 'relative',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: '#b8f000', color: '#000', fontWeight: 800, fontSize: 12,
                    padding: '4px 16px', borderRadius: 100, letterSpacing: '0.5px', whiteSpace: 'nowrap',
                  }}>
                    ⭐ MÁS POPULAR
                  </div>
                )}

                <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{plan.name}</h3>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: plan.popular ? '#b8f000' : '#fff', letterSpacing: '-1px' }}>{plan.price}</span>
                  <span style={{ color: '#a0a0a0', fontSize: 14 }}>/mes</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map((f) => (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, borderBottom: '1px solid #1e1e1e', paddingBottom: 8 }}>
                      <span style={{ color: '#a0a0a0' }}>{f.label}</span>
                      <span style={{ fontWeight: 600, color: f.value === '✓' ? '#b8f000' : '#fff' }}>{f.value}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`${WHATSAPP}?text=Hola! Me interesa el plan ${plan.name} de hosting ($${plan.price}/mes)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', textAlign: 'center', textDecoration: 'none',
                    padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15,
                    background: plan.popular ? '#b8f000' : 'transparent',
                    color: plan.popular ? '#000' : '#b8f000',
                    border: plan.popular ? 'none' : '1.5px solid #b8f000',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Contratar {plan.name} →
                </a>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: '#666', fontSize: 13, marginTop: 32 }}>
            ¿Necesitás algo más grande? <a href={CONTACT_MAIL} style={{ color: '#b8f000', textDecoration: 'none' }}>Escribinos para un plan personalizado</a>
          </p>
        </div>
      </section>

      {/* ── SERVICIOS DE DESARROLLO ── */}
      <section id="desarrollo" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
            Servicios de desarrollo
          </h2>
          <p style={{ color: '#a0a0a0', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>
            Construimos el sistema que tu empresa necesita. Desde una landing page hasta un ERP completo.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20 }}>
          {devServices.map((s) => (
            <div key={s.title} className="card" style={{ transition: 'border-color 0.2s, transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,240,0,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: '#a0a0a0', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16 }}>
            Hablar sobre mi proyecto
          </a>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section style={{ background: '#111', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="card" style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,240,0,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; }}
              >
                <div style={{ color: '#b8f000', fontSize: 28, marginBottom: 12, lineHeight: 1 }}>"</div>
                <p style={{ color: '#d0d0d0', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{t.text}</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: '#a0a0a0', fontSize: 13 }}>{t.role} · {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Ya sos cliente */}
          <div style={{
            background: 'rgba(184,240,0,0.06)', border: '1px solid rgba(184,240,0,0.2)',
            borderRadius: 16, padding: '40px 32px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔑</div>
            <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>¿Ya sos cliente?</h3>
            <p style={{ color: '#a0a0a0', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              Gestioná tus servicios, facturas, dominios y soporte desde un solo lugar.
            </p>
            <Link to="/login" className="btn-primary">
              Ingresar al panel →
            </Link>
          </div>

          {/* Necesitás un plan */}
          <div style={{
            background: '#111', border: '1px solid #2a2a2a',
            borderRadius: 16, padding: '40px 32px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>💬</div>
            <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>¿Necesitás un plan?</h3>
            <p style={{ color: '#a0a0a0', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              Contanos qué necesitás y armamos una propuesta a medida para tu empresa.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Contactar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #2a2a2a', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 800 }}>
              <span style={{ color: '#b8f000' }}>MVD</span>
              <span style={{ color: '#fff' }}>Studio</span>
            </span>
            <div style={{ color: '#666', fontSize: 13, marginTop: 6 }}>
              Uruguay · info@mvdstudio.com.uy
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Link to="/login" style={footerLinkStyle}>Panel de clientes</Link>
            <a href={CONTACT_MAIL} style={footerLinkStyle}>Contacto</a>
            <a href="#" style={footerLinkStyle}>Términos y condiciones</a>
          </div>

          <div style={{ color: '#555', fontSize: 13 }}>
            © {new Date().getFullYear()} MVD Studio. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: '#a0a0a0',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
  padding: '6px 12px',
  borderRadius: 6,
  transition: 'color 0.15s',
};

const footerLinkStyle: React.CSSProperties = {
  color: '#666',
  textDecoration: 'none',
  fontSize: 14,
  transition: 'color 0.15s',
};
