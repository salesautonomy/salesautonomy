export default function PrivacyPage() {
  return (
    <article className="cove-prose animate-in" style={{ padding: '80px 0 96px' }}>
      <h1>Privacy Policy</h1>
      <p className="rail-label" style={{ marginBottom: '40px' }}>Last Updated: April 3, 2026</p>

      <section className="stack-lg">
        <div>
          <h3>1. Data We Collect</h3>
          <p>
            We collect basic account information (email, name) and technical metadata required to provide the Service (IP addresses, API request logs, usage metrics).
          </p>
        </div>

        <div>
          <h3>2. How We Use Data</h3>
          <p>
            Data is used to provide, maintain, and improve the Service, to process payments via Stripe, and to send transactional emails via Resend. We do not sell your personal information.
          </p>
        </div>

        <div>
          <h3>3. Data Storage and Security</h3>
          <p>
            Your data is stored in secure databases on Supabase. We use Row Level Security (RLS) to ensure that only authorized users can access specific records. Audit logs are immutable to prevent tampering.
          </p>
        </div>

        <div>
          <h3>4. Third-Party Services</h3>
          <p>
            We share data only with service providers necessary for our operations:
          </p>
          <ul style={{ paddingLeft: '24px', marginTop: '12px', color: 'var(--text-secondary)' }}>
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>Resend:</strong> Transactional email delivery</li>
            <li><strong>Supabase:</strong> Database and infrastructure hosting</li>
            <li><strong>Railway:</strong> Application hosting</li>
          </ul>
        </div>

        <div>
          <h3>5. Cookies</h3>
          <p>
            We use essential cookies for authentication and session management. We do not use third-party tracking or advertising cookies.
          </p>
        </div>

        <div>
          <h3>6. Your Rights</h3>
          <p>
            Depending on your location, you may have rights under GDPR, CCPA, or similar regulations regarding access to and deletion of your personal data. Contact us for any requests.
          </p>
        </div>

        <div>
          <h3>7. Changes to Policy</h3>
          <p>
            We may update this policy occasionally. Major changes will be announced via email.
          </p>
        </div>

        <div>
          <h3>8. Contact</h3>
          <p>
            For any questions, contact us at <a href="mailto:privacy@salesautonomy.com" style={{ color: '#a5b4fc' }}>privacy@salesautonomy.com</a>.
          </p>
        </div>
      </section>
    </article>
  );
}
