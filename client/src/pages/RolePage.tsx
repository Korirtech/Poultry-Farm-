// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Database,
  Egg,
  Layers3,
  LockKeyhole,
  NotebookPen,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

type RoleKey = "admin" | "manager" | "worker";

type RoleConfig = {
  key: RoleKey;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: typeof ShieldCheck;
  accent: string;
  responsibilities: string[];
  permissions: string[];
  workflow: { label: string; detail: string }[];
  boundary: string;
};

const configs: Record<RoleKey, RoleConfig> = {
  admin: {
    key: "admin",
    number: "01",
    title: "Admin",
    eyebrow: "System stewardship / access / reference data",
    description:
      "The Admin protects the shape of the system so the farm team can trust what it records. This role owns the boundary around people, farms, and rules—not the daily count itself.",
    icon: ShieldCheck,
    accent: "orange",
    responsibilities: [
      "Create and manage farms, houses, and reference data.",
      "Invite users and assign the right group or permission set.",
      "Maintain the system rules that keep records consistent.",
      "Review audit history when an important record is corrected.",
    ],
    permissions: [
      "All farms and operational areas",
      "User and group membership",
      "Reference data and configuration",
      "Audit history and system-level reports",
    ],
    workflow: [
      {
        label: "Set the boundary",
        detail:
          "Define the farms, houses, and users that belong in the workspace.",
      },
      {
        label: "Keep it coherent",
        detail: "Maintain the shared vocabulary used by every daily record.",
      },
      {
        label: "Protect the trail",
        detail: "Make sure corrections remain attributable and reviewable.",
      },
    ],
    boundary:
      "Admin can configure the system and see across farms, but should not replace the manager’s operational review.",
  },
  manager: {
    key: "manager",
    number: "02",
    title: "Farm Manager",
    eyebrow: "Daily oversight / review / action",
    description:
      "The Farm Manager turns records into a working view of the operation. They review the flock, follow the exceptions, assign work, and make the next decision visible to the team.",
    icon: ClipboardCheck,
    accent: "pine",
    responsibilities: [
      "Create and maintain flock or batch records for the farm.",
      "Review mortality, feed, eggs, movement, and production trends.",
      "Assign tasks and follow vaccination, feeding, and cleaning schedules.",
      "Review rule-based alerts and correct records when the context is known.",
    ],
    permissions: [
      "Assigned farms and their active flocks",
      "Daily records and operational corrections",
      "Tasks, schedules, and completion history",
      "Farm-level dashboards and exports",
    ],
    workflow: [
      {
        label: "Open the pulse",
        detail: "Start with what changed since the last review.",
      },
      {
        label: "Follow the signal",
        detail:
          "Compare today’s figures with recent baselines and the flock’s context.",
      },
      {
        label: "Close the loop",
        detail: "Assign, correct, or escalate the action that follows.",
      },
    ],
    boundary:
      "Farm Manager can operate the farm view and correct context, while system-wide access stays with the Admin.",
  },
  worker: {
    key: "worker",
    number: "03",
    title: "Worker",
    eyebrow: "House floor / fast entry / assigned work",
    description:
      "The Worker brings the system closest to the flock. Their experience should be short, clear, and forgiving: record the fact, complete the task, and get back to the work.",
    icon: UsersRound,
    accent: "sand",
    responsibilities: [
      "Record daily counts, mortality, feed, eggs, and notes for assigned flocks.",
      "Complete assigned feeding, cleaning, weighing, or vaccination tasks.",
      "Flag an observation that needs a manager’s attention.",
      "Correct a recent entry when permitted by the farm’s review policy.",
    ],
    permissions: [
      "Assigned farms, houses, and flocks only",
      "Daily entry forms for permitted records",
      "Assigned tasks and completion actions",
      "Personal recent-entry history",
    ],
    workflow: [
      {
        label: "Capture the fact",
        detail:
          "Enter the count or observation while the work is still in view.",
      },
      {
        label: "Confirm the unit",
        detail: "Use clear quantities, dates, and flock context before saving.",
      },
      {
        label: "Raise attention",
        detail: "Leave a useful note when the normal record is not enough.",
      },
    ],
    boundary:
      "Worker access is intentionally narrow: it makes entry easy without exposing settings or unrelated farm records.",
  },
};

const roleLinks: { key: RoleKey; label: string }[] = [
  { key: "admin", label: "Admin" },
  { key: "manager", label: "Farm Manager" },
  { key: "worker", label: "Worker" },
];

export default function RolePage({ role }: { role: RoleKey }) {
  const data = configs[role];
  const Icon = data.icon;
  return (
    <div className="site-shell role-page">
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
          <a href="/roles">Compare roles</a>
          <a href="/login">Sign in</a>
          {roleLinks.map(link => (
            <a
              key={link.key}
              className={role === link.key ? "active" : ""}
              href={`/roles/${link.key}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a className="back-link" href="/">
          <ArrowLeft size={15} /> Back to blueprint
        </a>
      </header>

      <main>
        <section className={`role-hero role-hero-${data.accent}`}>
          <div className="role-hero-inner section-grid">
            <div className="section-index">
              <span>{data.number}</span>
              <span>Role boundary</span>
            </div>
            <div className="role-hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" /> {data.eyebrow}
              </div>
              <div className="role-title-line">
                <div className="role-page-icon">
                  <Icon size={25} strokeWidth={1.5} />
                </div>
                <h1>{data.title}</h1>
              </div>
              <p>{data.description}</p>
              <div className="role-page-meta">
                <span>Flockline permissions</span>
                <i />
                <span>Designed for the MVP</span>
              </div>
              <a
                className="button role-hero-cta"
                href={`/onboarding?role=${data.key}`}
              >
                Start first-farm setup <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="role-signal-card">
              <span className="card-kicker">
                <CircleDot size={12} /> Permission boundary
              </span>
              <strong>{data.boundary}</strong>
              <div className="signal-card-footer">
                <span>Scope / {data.title}</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </div>
        </section>

        <section className="role-body section-grid">
          <div className="section-index">
            <span>01</span>
            <span>Responsibilities</span>
          </div>
          <div className="role-body-content">
            <div className="role-body-heading">
              <div>
                <p className="section-kicker">What this role carries</p>
                <h2>
                  Clear responsibility
                  <br />
                  <em>makes better records.</em>
                </h2>
              </div>
              <div className="role-aside-note">
                <span>Field note / {data.number}</span>
                <p>
                  Every role should know what belongs in their hands—and what
                  does not.
                </p>
              </div>
            </div>
            <div className="responsibility-grid">
              {data.responsibilities.map((item, index) => (
                <div className="responsibility-item" key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="permissions-band band">
          <div className="section-grid role-permissions-layout">
            <div className="section-index light">
              <span>02</span>
              <span>What they can see</span>
            </div>
            <div>
              <p className="section-kicker light-text">Permission by design</p>
              <h2 className="light-heading">
                The right view,
                <br />
                <em>not every view.</em>
              </h2>
              <div className="permission-list">
                {data.permissions.map(item => (
                  <div key={item}>
                    <Check size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="role-workflow section-grid">
          <div className="section-index">
            <span>03</span>
            <span>Role rhythm</span>
          </div>
          <div className="role-workflow-content">
            <p className="section-kicker">A practical handoff</p>
            <h2>
              How the {data.title.toLowerCase()} <em>moves through the day.</em>
            </h2>
            <div className="role-flow">
              {data.workflow.map((item, index) => (
                <div className="role-flow-item" key={item.label}>
                  <span className="flow-number">0{index + 1}</span>
                  <div className="flow-icon">
                    {index === 0 ? (
                      <NotebookPen size={18} />
                    ) : index === 1 ? (
                      <Layers3 size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                  {index < data.workflow.length - 1 && (
                    <ChevronRight className="flow-arrow" size={18} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="role-handoff paper-band">
          <div className="section-grid role-handoff-inner">
            <div className="role-handoff-label">
              <p className="section-kicker">Connect the handoff</p>
              <h2>
                One role’s record
                <br />
                <em>is another’s signal.</em>
              </h2>
            </div>
            <div className="role-handoff-copy">
              <p>
                The MVP keeps the role boundary visible so a team can work
                together without blurring accountability. The Admin sets the
                ground, the Farm Manager reads the operation, and the Worker
                keeps the day current.
              </p>
              <div className="handoff-links">
                {roleLinks.map(link => (
                  <a href={`/roles/${link.key}`} key={link.key}>
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
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
          <span>Role page / {data.title}</span>
          <span>
            <a href="/">Return to blueprint</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
