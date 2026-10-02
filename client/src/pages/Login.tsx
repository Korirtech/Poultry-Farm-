// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import { useLocation } from "wouter";
import { isDjangoConfigured, signIn } from "@/lib/djangoAuth";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const user = await signIn(email, password);
      navigate(`/roles/${user.role}`);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Sign-in could not be completed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="site-shell auth-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Back to Flockline home">
          <span className="brand-mark">
            <img src="/manus-storage/flockline-mark_7fa89f7e.png" alt="" />
          </span>
          <span className="brand-name">
            Flockline<span className="brand-notch">.</span>
          </span>
        </a>
        <a className="back-link" href="/">
          <ArrowLeft size={15} /> Back to blueprint
        </a>
      </header>
      <main>
        <section className="auth-layout section-grid">
          <div className="section-index">
            <span>09</span>
            <span>Sign in</span>
          </div>
          <div className="auth-card-wrap">
            <div className="auth-intro">
              <div className="eyebrow">
                <span className="eyebrow-dot" /> Farm workspace / secure access
              </div>
              <h1>
                Return to the
                <br />
                <em>right view.</em>
              </h1>
              <p>
                Sign in to open the farm workspace shaped by your role and
                assigned records.
              </p>
            </div>
            <form className="auth-card" onSubmit={submit}>
              <div className="auth-card-kicker">
                <LockKeyhole size={16} /> Django session boundary
              </div>
              <label>
                Email address
                <input
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Your password"
                />
              </label>
              {message && (
                <p className="form-error" role="alert">
                  {message}
                </p>
              )}
              <button
                className="button button-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Checking…" : "Sign in"} <ArrowUpRight size={17} />
              </button>
              <a className="auth-demo-link" href="/roles/manager">
                Open the local demo workspace <ArrowUpRight size={14} />
              </a>
              <p className="auth-note">
                The Django backend must enforce role permissions server-side.
                This page only begins the authenticated session.
              </p>
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark small">
            <img src="/manus-storage/flockline-mark_7fa89f7e.png" alt="" />
          </span>
          <span className="brand-name">
            Flockline<span className="brand-notch">.</span>
          </span>
        </div>
        <p>Batch-level operations for Kenyan poultry farms.</p>
        <div className="footer-meta">
          <span>Access / 01</span>
          <span>
            {isDjangoConfigured()
              ? "Django API configured"
              : "Django API awaiting connection"}
          </span>
        </div>
      </footer>
    </div>
  );
}
