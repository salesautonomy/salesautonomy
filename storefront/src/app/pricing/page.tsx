import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Sales Autonomy",
  description: "Simple, transparent pricing. Start free, scale as you grow. No hidden fees.",
};

export default function PricingPage() {
  return (
    <section style={{ padding: '80px 0 96px' }}>
      <div className="cove-content">
        <div className="text-center" style={{ marginBottom: '64px' }}>
          <h1 style={{ fontSize: 'var(--text-display-lg)' }}>
            Simple, transparent pricing
          </h1>
          <p style={{ maxWidth: '480px', margin: '16px auto 0' }}>
            Start free. Pay only when you scale. All plans include the full API.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card">
            <div className="pricing-name">Free</div>
            <div className="pricing-price">$0 <span>/month</span></div>
            <div className="pricing-desc">For testing and prototyping</div>
            <ul className="pricing-features">
              <li>10 requests/min</li>
              <li>100 requests/day</li>
              <li>1,000 requests/month</li>
              <li>1 API key</li>
              <li>Community support</li>
            </ul>
            <a href="/signup" className="btn btn-secondary w-full">Get started free</a>
          </div>

          {/* Pro — featured */}
          <div className="pricing-card featured">
            <span className="badge badge-accent" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
              Most popular
            </span>
            <div className="pricing-name">Pro</div>
            <div className="pricing-price">$49 <span>/month</span></div>
            <div className="pricing-desc">For growing teams and production workloads</div>
            <ul className="pricing-features">
              <li>60 requests/min</li>
              <li>5,000 requests/day</li>
              <li>50,000 requests/month</li>
              <li>5 API keys</li>
              <li>Priority support</li>
              <li>Webhook events</li>
              <li>Advanced analytics</li>
            </ul>
            <a href="/signup?plan=pro" className="btn btn-primary w-full">Start with Pro</a>
          </div>

          {/* Enterprise */}
          <div className="pricing-card">
            <div className="pricing-name">Enterprise</div>
            <div className="pricing-price">Custom</div>
            <div className="pricing-desc">For high-volume and custom requirements</div>
            <ul className="pricing-features">
              <li>300 requests/min</li>
              <li>100,000 requests/day</li>
              <li>1,000,000 requests/month</li>
              <li>Unlimited API keys</li>
              <li>Dedicated support</li>
              <li>SLA guarantee</li>
              <li>Custom integrations</li>
              <li>SSO / SAML</li>
            </ul>
            <a href="mailto:sales@salesautonomy.com" className="btn btn-secondary w-full">Contact sales</a>
          </div>
        </div>

        {/* FAQ-ish note */}
        <div className="text-center" style={{ marginTop: '64px' }}>
          <p style={{ fontSize: 'var(--text-body-sm)' }}>
            All plans include API key management, usage metering, Stripe billing, transactional email,
            and immutable audit logging. No credit card required for the free tier.
          </p>
        </div>
      </div>
    </section>
  );
}
