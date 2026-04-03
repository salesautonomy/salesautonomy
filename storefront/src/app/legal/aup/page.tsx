export default function AUPPage() {
  return (
    <article className="cove-prose animate-in" style={{ padding: '80px 0 96px' }}>
      <h1>Acceptable Use Policy</h1>
      <p className="rail-label" style={{ marginBottom: '40px' }}>Last Updated: April 3, 2026</p>

      <section className="stack-lg">
        <div>
          <h3>1. Prohibited Activities</h3>
          <p>
            You agree not to use the Sales Autonomy platform for:
          </p>
          <ul style={{ paddingLeft: '24px', marginTop: '12px', color: 'var(--text-secondary)' }}>
            <li>Illegal activities (fraud, terrorism, or other criminal acts)</li>
            <li>Spamming or sending unsolicited bulk commercial communications</li>
            <li>Attempting to breach, probe, or scan the security of our infrastructure</li>
            <li>Reverse engineering the platform or its proprietary code (Golden UI)</li>
            <li>Using the Service to conduct DDOS attacks or botnet activity</li>
            <li>Interfering with other users' access to the Service</li>
          </ul>
        </div>

        <div>
          <h3>2. API Usage Integrity</h3>
          <p>
            API keys must be kept secure. Sharing keys across multiple organizations to circumvent rate limits is prohibited.
          </p>
        </div>

        <div>
          <h3>3. Content Standards</h3>
          <p>
            Any data pushed through our API or metadata stored in our platform must not be defamatory, obscene, or infringing on third-party intellectual property.
          </p>
        </div>

        <div>
          <h3>4. Enforcement</h3>
          <p>
            Failure to comply with this AUP may result in immediate suspension or termination of your account without notice.
          </p>
        </div>
      </section>
    </article>
  );
}
