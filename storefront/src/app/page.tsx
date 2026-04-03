export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="cove-content">
          <div className="animate-in">
            <span className="badge badge-accent" style={{ marginBottom: '24px', display: 'inline-flex' }}>
              Now in Early Access
            </span>
          </div>
          <h1 className="animate-in animate-delay-1">
            <span className="text-gradient">Revenue infrastructure</span>
            <br />that runs itself
          </h1>
          <p className="animate-in animate-delay-2">
            Enterprise-grade API platform with built-in billing, authentication,
            and usage metering. Ship your product — we handle the business logic.
          </p>
          <div className="hero-actions animate-in animate-delay-3">
            <a href="/signup" className="btn btn-primary btn-lg">
              Start building →
            </a>
            <a href="/docs" className="btn btn-secondary btn-lg">
              Read the docs
            </a>
          </div>
        </div>
      </section>

      {/* ── Trusted By / Social Proof ─────────────────────────────────────── */}
      <section style={{ padding: '0 0 64px', textAlign: 'center' }}>
        <div className="cove-content">
          <p className="rail-label" style={{ marginBottom: '24px' }}>
            Built with battle-tested patterns
          </p>
          <div className="flex items-center justify-center" style={{ gap: '48px', flexWrap: 'wrap', opacity: 0.4 }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Supabase</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Stripe</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Resend</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Vercel</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Next.js</span>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 0 96px' }}>
        <div className="cove-content">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2>Everything you need to sell autonomously</h2>
            <p style={{ maxWidth: '560px', margin: '16px auto 0' }}>
              From API keys to invoices, the entire revenue stack — built in, not bolted on.
            </p>
          </div>
          <div className="grid-3">
            {[
              {
                icon: '🔑',
                title: 'API Key Management',
                desc: 'PBKDF2-hashed keys with scopes, CIDR restrictions, and automatic rotation. One-time secret display pattern.',
              },
              {
                icon: '📊',
                title: 'Usage Metering',
                desc: 'Every API call logged and metered. Tiered rate limits enforce quotas automatically. X-RateLimit headers included.',
              },
              {
                icon: '💳',
                title: 'Stripe Billing',
                desc: 'Checkout, subscriptions, invoices, and dunning — handled via webhooks. Plan upgrades sync in real-time.',
              },
              {
                icon: '🔒',
                title: 'Enterprise Auth',
                desc: 'Supabase Auth with Row Level Security. Every table locked down. Audit trail on every mutation.',
              },
              {
                icon: '✉️',
                title: 'Transactional Email',
                desc: 'Welcome sequences, payment receipts, usage alerts, and dunning emails — all via Resend with delivery tracking.',
              },
              {
                icon: '📋',
                title: 'Immutable Audit Log',
                desc: 'Every action recorded. UPDATE and DELETE blocked by database triggers. Full actor and resource tracking.',
              },
            ].map((feature) => (
              <div key={feature.title} className="card" style={{ padding: '32px' }}>
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-title">{feature.title}</div>
                <div className="feature-desc">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Code Example ──────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 0 96px' }}>
        <div className="cove-panel">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2>Simple, powerful API</h2>
            <p style={{ maxWidth: '560px', margin: '16px auto 0' }}>
              Authenticate with your API key. Get structured JSON responses with rate limit headers.
            </p>
          </div>
          <pre>
            <code>{`curl https://api.salesautonomy.com/v1/status \\
  -H "Authorization: Bearer sk_live_YOUR_KEY" \\
  -H "Content-Type: application/json"

# Response
{
  "ok": true,
  "tier": "pro",
  "usage": {
    "daily": 142,
    "daily_limit": 5000,
    "monthly": 3891,
    "monthly_limit": 50000
  }
}`}</code>
          </pre>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 0', textAlign: 'center' }}>
        <div className="cove-content">
          <h2>Ready to ship?</h2>
          <p style={{ maxWidth: '480px', margin: '16px auto 32px' }}>
            Start with the free tier. Upgrade when you scale. No credit card required.
          </p>
          <a href="/signup" className="btn btn-primary btn-lg">
            Create your account →
          </a>
        </div>
      </section>
    </>
  );
}
