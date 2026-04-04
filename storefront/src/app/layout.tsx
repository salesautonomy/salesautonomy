import type { Metadata } from "next";
import { NavWrapper } from "@/components/NavWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Autonomy — Trained Sales Operators, Placed in 30 Days",
  description: "We source, train, and place B2B sales professionals who run a proven 4D sales framework. Your reps arrive with playbooks, accountability, and the discipline to hit quota.",
  keywords: ["sales staffing", "B2B sales", "sales training", "contract sales reps", "sales methodology"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NavWrapper>
          <nav className="nav">
            <div className="nav-inner">
              <a href="/" className="nav-logo">
                <div className="nav-logo-icon">SA</div>
                Sales Autonomy
              </a>
              <div className="nav-links">
                <a href="/pricing" className="nav-link">Pricing</a>
                <a href="/login" className="btn btn-ghost">Sign in</a>
                <a href="/signup" className="btn btn-primary btn-sm">Get Started</a>
              </div>
            </div>
          </nav>
        </NavWrapper>

        <main>{children}</main>

        <NavWrapper>
          <footer className="footer">
            <div className="footer-inner">
              <span>© {new Date().getFullYear()} Sales Autonomy. All rights reserved.</span>
              <div className="footer-links">
                <a href="/terms">Terms</a>
                <a href="/privacy">Privacy</a>
              </div>
            </div>
          </footer>
        </NavWrapper>
      </body>
    </html>
  );
}
