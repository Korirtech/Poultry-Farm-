// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const rows = [
  { label: "View all farms", admin: true, manager: false, worker: false },
  {
    label: "Manage users and groups",
    admin: true,
    manager: false,
    worker: false,
  },
  {
    label: "Configure reference data",
    admin: true,
    manager: false,
    worker: false,
  },
  {
    label: "Manage assigned flocks",
    admin: true,
    manager: true,
    worker: false,
  },
  {
    label: "Enter daily production records",
    admin: true,
    manager: true,
    worker: true,
  },
  {
    label: "Review farm dashboards",
    admin: true,
    manager: true,
    worker: false,
  },
  { label: "Assign and close tasks", admin: true, manager: true, worker: true },
  {
    label: "Export farm-level reports",
    admin: true,
    manager: true,
    worker: false,
  },
  { label: "Review audit history", admin: true, manager: true, worker: false },
];

const cards = [
  {
    href: "/roles/admin",
    label: "Admin",
    text: "Sets the boundary and protects the system’s shared vocabulary.",
    icon: ShieldCheck,
  },
  {
    href: "/roles/manager",
    label: "Farm Manager",
    text: "Reads the operation, follows exceptions, and closes the loop.",
    icon: ShieldCheck,
  },
  {
    href: "/roles/worker",
    label: "Worker",
    text: "Keeps the day current from the house floor.",
    icon: UsersRound,
  },
];

function Mark({ value }: { value: boolean }) {
  return value ? (
    <Check size={15} aria-label="Allowed" />
  ) : (
    <span className="permission-dash" aria-label="Not in this role">
      —
    </span>
  );
}

export default function RoleComparison() {
  return (
    <div className="site-shell role-page comparison-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Back to Flockline home">
          <span className="brand-mark">
            <img src="/manus-storage/flockline-mark_7fa89f7e.png" alt="" />
          </span>
          <span className="brand-name">
            Flockline<span className="brand-notch">.</span>
          </span>
        </a>
        <nav className="role-nav" aria-label="Role pages">
          <a className="active" href="/roles">
            Compare roles
          </a>
          <a href="/login">Sign in</a>
          <a href="/roles/admin">Admin</a>
          <a href="/roles/manager">Farm Manager</a>
          <a href="/roles/worker">Worker</a>
        </nav>
        <a className="back-link" href="/">
          <ArrowLeft size={15} /> Back to blueprint
        </a>
      </header>
      <main>
        <section className="comparison-hero">
          <div className="section-grid comparison-hero-inner">
            <div className="section-index">
              <span>07</span>
              <span>Role comparison</span>
            </div>
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> Permission review / MVP
                boundary
              </div>
              <h1>
                One farm view.
                <br />
                <em>Three ways in.</em>
              </h1>
              <p>
                Use this page to quickly understand who configures the system,
                who manages the operation, and who keeps the daily record
                current.
              </p>
            </div>
            <div className="comparison-note">
              <span className="card-kicker">Field note / access</span>
              <strong>Permission should reduce noise, not add distance.</strong>
            </div>
          </div>
        </section>
        <section className="comparison-body section-grid">
          <div className="section-index">
            <span>01</span>
            <span>At a glance</span>
          </div>
          <div className="comparison-content">
            <div className="comparison-cards">
              {cards.map(card => {
                const Icon = card.icon;
                return (
                  <a
                    className="comparison-card"
                    href={card.href}
                    key={card.href}
                  >
                    <div className="comparison-card-top">
                      <Icon size={19} />
                      <ArrowUpRight size={16} />
                    </div>
                    <h2>{card.label}</h2>
                    <p>{card.text}</p>
                    <span>
                      Open role page <ChevronRight size={14} />
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="matrix-heading">
              <div>
                <p className="section-kicker">Permission matrix</p>
                <h2>
                  Where the boundary
                  <br />
                  <em>actually sits.</em>
                </h2>
              </div>
              <p>
                Checks indicate the role can perform or review the action in the
                MVP. Farm-scoped access still applies.
              </p>
            </div>
            <div className="permission-table-wrap">
              <table className="permission-table">
                <caption className="sr-only">
                  Flockline permission comparison
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Capability</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Farm Manager</th>
                    <th scope="col">Worker</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>
                        <Mark value={row.admin} />
                      </td>
                      <td>
                        <Mark value={row.manager} />
                      </td>
                      <td>
                        <Mark value={row.worker} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="comparison-callout paper-band">
          <div className="section-grid comparison-callout-inner">
            <div>
              <p className="section-kicker">
                Ready to configure the first farm?
              </p>
              <h2>
                Start with the role
                <br />
                <em>closest to the work.</em>
              </h2>
            </div>
            <a
              className="button button-primary"
              href="/onboarding?role=manager"
            >
              Begin first-farm setup <ArrowUpRight size={17} />
            </a>
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
          <span>Role comparison / 2026</span>
          <span>
            <a href="/">Return to blueprint</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
