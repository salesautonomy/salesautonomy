import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="cove-content">
          <div className="animate-in">
            <span className="badge badge-accent" style={{ marginBottom: '24px', display: 'inline-flex' }}>
              Now Accepting Clients
            </span>
          </div>
          <h1 className="animate-in animate-delay-1">
            <span className="text-gradient">Trained sales operators.</span>
            <br />Placed in 30 days.
          </h1>
          <p className="animate-in animate-delay-2">
            We source, train, and place sales professionals from America's top talent pools.
            Your reps arrive with a proven process, a diagnostic framework, and the reps to hit quota in 90 days.
          </p>
          <div className="hero-actions animate-in animate-delay-3">
            <a href="/room/ee0008cd-b2f0-49bb-825d-93c41ee5df12" className="btn btn-primary btn-lg">
              See a Discovery Room →
            </a>
            <a href="/pricing" className="btn btn-secondary btn-lg">
              View pricing
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────────────────── */}
      <section style={{ padding: '0 0 64px', textAlign: 'center' }}>
        <div className="cove-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            {[
              { value: '40–60%', label: 'of B2B deals die to inaction, not competitors' },
              { value: '50–60%', label: 'of sales reps miss quota annually' },
              { value: '$50K–$250K+', label: 'average cost of one bad sales hire' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-heading-lg)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)', maxWidth: '180px', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="rail-label" style={{ marginTop: '32px', fontSize: '9px' }}>
            Sources: Harvard Business Review · CSO Insights · DePaul University
          </p>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 0 96px' }}>
        <div className="cove-content">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <p className="rail-label" style={{ marginBottom: '12px' }}>The 4D Framework</p>
            <h2>A proven system. Not a job board.</h2>
            <p style={{ maxWidth: '560px', margin: '16px auto 0' }}>
              Every rep we place runs the same four-stage process that has closed millions in B2B revenue.
              No guesswork. No trial and error.
            </p>
          </div>
          <div className="grid-3">
            {[
              {
                icon: '🔍',
                title: 'Discovery',
                desc: 'Find out if the problem is real, urgent, and worth solving. Qualify hard. Disqualify early.',
              },
              {
                icon: '🩺',
                title: 'Diagnosis',
                desc: 'Go deeper. What have they tried? Why did it fail? Can they solve this without outside help?',
              },
              {
                icon: '🎯',
                title: 'Demo',
                desc: 'Show how your specific approach solves their specific problem. No feature dumps. No generic decks.',
              },
              {
                icon: '✅',
                title: 'Decision',
                desc: 'Guide the final call. Handle pricing, align stakeholders, and drive to a signed agreement.',
              },
              {
                icon: '🛡️',
                title: 'Fatality Matrix',
                desc: 'Every lost deal fits one of five categories. We diagnose the root cause and fix the process so it never happens again.',
              },
              {
                icon: '📊',
                title: 'Strategic Sales Plan',
                desc: 'Data-driven funnel tracking. Activities → Conversations → Meetings → Closed. Know your numbers at every stage.',
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

      {/* ── Discovery Room Preview ────────────────────────────────────── */}
      <section style={{ padding: '64px 0 96px' }}>
        <div className="cove-panel">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <p className="rail-label" style={{ marginBottom: '12px' }}>The Discovery Room</p>
            <h2>Your prospect gets their own private room</h2>
            <p style={{ maxWidth: '560px', margin: '16px auto 0' }}>
              Not a PDF. Not a pitch deck. A custom digital environment where prospects explore their challenges,
              see your approach, run their own ROI calculator, and review a tailored proposal — on their schedule.
            </p>
          </div>
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
              {['Pain Discovery', 'Solution Walkthrough', 'Social Proof', 'ROI Calculator', 'Proposal', 'Kickoff'].map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'var(--accent-soft)', color: '#a5b4fc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{step}</span>
                </div>
              ))}
            </div>
            <a href="/room/ee0008cd-b2f0-49bb-825d-93c41ee5df12" className="btn btn-primary btn-lg">
              Walk through a live demo →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 0', textAlign: 'center' }}>
        <div className="cove-content">
          <h2>Stop hiring. Start placing.</h2>
          <p style={{ maxWidth: '480px', margin: '16px auto 32px' }}>
            Tell us what you need. We source, train, and place operators who run
            a proven sales process from day one.
          </p>
          <a href="/room/ee0008cd-b2f0-49bb-825d-93c41ee5df12" className="btn btn-primary btn-lg">
            Open your Discovery Room →
          </a>
        </div>
      </section>
    </>
  );
}
