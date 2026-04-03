export default function RefundPage() {
  return (
    <article className="cove-prose animate-in" style={{ padding: '80px 0 96px' }}>
      <h1>Refund Policy</h1>
      <p className="rail-label" style={{ marginBottom: '40px' }}>Last Updated: April 3, 2026</p>

      <section className="stack-lg">
        <div>
          <h3>1. Commitment to Quality</h3>
          <p>
            We strive to provide the most reliable revenue infrastructure on the market. If you are not satisfied with our service, we want to hear from you.
          </p>
        </div>

        <div>
          <h3>2. 14-Day Refund Period</h3>
          <p>
            New subscribers to a paid plan are eligible for a full refund within the first 14 days of their initial purchase, provided the account has not exceeded 10% of its monthly request quota.
          </p>
        </div>

        <div>
          <h3>3. Pro-Rated Refunds</h3>
          <p>
            Outside of the 14-day window, we do not generally offer refunds for partial months. However, pro-rated refunds may be issued at our discretion in cases of significant service unavailability (SLA failure).
          </p>
        </div>

        <div>
          <h3>4. Fee Deductions</h3>
          <p>
            All refunds are minus the payment processing fees charged by Stripe (or other payment partners), which are non-refundable to us.
          </p>
        </div>

        <div>
          <h3>5. Requesting a Refund</h3>
          <p>
            To request a refund, please email <a href="mailto:billing@salesautonomy.com" style={{ color: '#a5b4fc' }}>billing@salesautonomy.com</a> with your account details and reason for the request.
          </p>
        </div>
      </section>
    </article>
  );
}
