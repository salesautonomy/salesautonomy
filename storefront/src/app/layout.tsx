import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Autonomy — Autonomous Revenue Infrastructure",
  description: "Enterprise-grade API infrastructure for autonomous B2B revenue generation. Self-serve onboarding, usage-based billing, and zero-touch sales.",
  keywords: ["API", "B2B SaaS", "autonomous sales", "revenue infrastructure"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav-inner">
            <a href="/" className="nav-logo">
              <div className="nav-logo-icon">SA</div>
              Sales Autonomy
            </a>
            <div className="nav-links">
              <a href="/pricing" className="nav-link">Pricing</a>
              <a href="/docs" className="nav-link">Docs</a>
              <a href="/login" className="btn btn-ghost">Sign in</a>
              <a href="/signup" className="btn btn-primary btn-sm">Get Started</a>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <span>© {new Date().getFullYear()} Sales Autonomy. All rights reserved.</span>
            <div className="footer-links">
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy</a>
              <a href="/docs">Documentation</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
