export default function TermsPage() {
  return (
    <article className="cove-prose animate-in" style={{ padding: '80px 0 96px' }}>
      <h1>Terms of Service</h1>
      <p className="rail-label" style={{ marginBottom: '40px' }}>Last Updated: April 3, 2026</p>

      <section className="stack-lg">
        <div>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using the Sales Autonomy platform (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
          </p>
        </div>

        <div>
          <h3>2. Description of Service</h3>
          <p>
            Sales Autonomy provides infrastructure for autonomous revenue generation, including API-based billing, usage metering, and account management. We grant you a limited, non-exclusive, non-transferable license to use the Service as specified in your subscription plan.
          </p>
        </div>

        <div>
          <h3>3. User Accounts</h3>
          <p>
            You are responsible for maintaining the security of your account and API keys. We use PBKDF2 hashing for API keys, but you must prevent unauthorized access to your secrets. You are liable for all activity under your account.
          </p>
        </div>

        <div>
          <h3>4. API Usage and Limits</h3>
          <p>
            API usage is subjected to rate limits and quotas defined by your current plan. We reserve the right to throttle or block access if your usage patterns are deemed abusive or harmful to the infrastructure.
          </p>
        </div>

        <div>
          <h3>5. Payments and Subscriptions</h3>
          <p>
            All paid plans are billed in advance on a recurring monthly or annual basis. Payments are processed via Stripe. You can cancel at any time, but no refunds will be issued for partial periods except as stated in our Refund Policy.
          </p>
        </div>

        <div>
          <h3>6. Intellectual Property</h3>
          <p>
            The Sales Autonomy platform, including its code, design, and branding (the "Golden UI"), is the property of Sales Autonomy. You retain all rights to your data processed through our platform.
          </p>
        </div>

        <div>
          <h3>7. Disclaimer of Warranty</h3>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DO NOT GUARANTEE 100% UPTIME, THOUGH WE STRIVE FOR HIGH AVAILABILITY.
          </p>
        </div>

        <div>
          <h3>8. Limitation of Liability</h3>
          <p>
            SALES AUTONOMY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
          </p>
        </div>

        <div>
          <h3>9. Governing Law</h3>
          <p>
            These terms are governed by the laws of the jurisdiction in which Sales Autonomy is registered, without regard to conflict of law principles.
          </p>
        </div>

        <div>
          <h3>10. Contact</h3>
          <p>
            For any questions, contact us at <a href="mailto:legal@salesautonomy.com" style={{ color: '#a5b4fc' }}>legal@salesautonomy.com</a>.
          </p>
        </div>
      </section>
    </article>
  );
}
