// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BellRing,
  Bird,
  Check,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  CloudOff,
  Database,
  Egg,
  Layers3,
  LockKeyhole,
  Menu,
  Minus,
  MoreHorizontal,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Sprout,
  Tag,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

const heroImage = "/manus-storage/flockline-hero_0b8b4fb3.jpg";
const dashboardImage = "/manus-storage/flockline-dashboard-scene_91d1cf74.jpg";
const houseImage = "/manus-storage/flockline-house-detail_776bca68.jpg";
const markImage = "/manus-storage/flockline-mark_7fa89f7e.png";

const navItems = [
  { label: "The thesis", href: "#thesis" },
  { label: "Blueprint", href: "#blueprint" },
  { label: "Daily loop", href: "#loop" },
  { label: "Phases", href: "#phases" },
];

const roles = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Admin",
    text: "Owns the system boundary: farms, users, reference data, and the rules that keep records trustworthy.",
    tone: "pine",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Farm manager",
    text: "Sees the whole operation, reviews alerts, corrects records, assigns tasks, and reads the week’s signal.",
    tone: "orange",
  },
  {
    icon: UsersRound,
    number: "03",
    title: "Worker",
    text: "Captures the day in a few clear taps: flock counts, feed, mortality, eggs, and assigned work.",
    tone: "sand",
  },
];

const modules = [
  { icon: Bird, title: "Flocks & batches", text: "Track by the operational unit farms already understand: one batch, one source of truth." },
  { icon: BarChart3, title: "Daily production", text: "Mortality, feed, movements, and eggs become a consistent record instead of scattered notes." },
  { icon: NotebookPen, title: "Tasks & schedules", text: "Vaccinations, cleaning, weighing, and feeding stay visible until someone closes the loop." },
  { icon: Tag, title: "Finance", text: "Connect income and expense to the farm—and, when useful, to the flock behind it." },
  { icon: BellRing, title: "Explainable alerts", text: "Raise attention with the rule and the figures visible, never with a mysterious score." },
  { icon: Database, title: "Reports", text: "Filter the records, export the view, and carry the farm’s story into the next decision." },
];

const phases = [
  { phase: "01", title: "Foundation", text: "Users, farms, houses, and the first active flock." },
  { phase: "02", title: "Daily operations", text: "Mortality, movements, feed, eggs, validation, and audit history." },
  { phase: "03", title: "Tasks + finance", text: "Schedules, completion history, medication, income, and expenses." },
  { phase: "04", title: "Dashboard", text: "KPIs, comparisons, trends, and operational exports." },
  { phase: "05", title: "Smart rules", text: "Thresholds, baselines, and a calm, explainable alert layer." },
  { phase: "06", title: "Offline", text: "IndexedDB queue, safe retries, and deliberate conflict handling." },
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleComingSoon = () => {
    toast("The live product is the next chapter", {
      description: "This blueprint page is ready to share. Product onboarding will follow in the build phase.",
    });
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Flockline home">
          <span className="brand-mark"><img src={markImage} alt="" /></span>
          <span className="brand-name">Flockline<span className="brand-notch">.</span></span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <button className="nav-cta" onClick={handleComingSoon}>Start with a flock <ArrowUpRight size={15} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Poultry operations / Kenya / MVP blueprint</div>
            <h1>Make the day’s record the farm’s <em>clearest signal.</em></h1>
            <p className="hero-lede">Flockline is a practical operating blueprint for farms that want daily records to become calmer decisions—not another layer of admin.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollToId("#blueprint")}>Read the blueprint <ArrowDownRight size={17} /></button>
              <a className="text-link" href="#loop">See the daily loop <ChevronRight size={16} /></a>
            </div>
            <div className="hero-meta"><span>Batch-level by design</span><i /> <span>KSh ready</span><i /> <span>Offline-minded</span></div>
          </div>
          <div className="hero-visual">
            <div className="image-frame hero-image"><img src={heroImage} alt="Poultry farm at first light" /></div>
            <div className="hero-card">
              <div className="card-kicker"><span className="live-dot" /> Farm pulse / Tue 04 Jun</div>
              <div className="hero-card-grid">
                <div><span>Live birds</span><strong>4,286</strong><small className="positive"><ArrowUpRight size={12} /> 2.4%</small></div>
                <div><span>7-day mortality</span><strong>1.8%</strong><small className="neutral"><Minus size={12} /> within range</small></div>
              </div>
              <div className="sparkline" aria-label="Seven-day mortality trend"><span style={{ height: "40%" }} /><span style={{ height: "52%" }} /><span style={{ height: "45%" }} /><span style={{ height: "66%" }} /><span style={{ height: "51%" }} /><span style={{ height: "58%" }} /><span className="accent" style={{ height: "35%" }} /></div>
              <div className="hero-card-footer"><span>Active flocks <b>06</b></span><span>Tasks due <b>03</b></span><MoreHorizontal size={16} /></div>
            </div>
            <div className="image-caption"><span>01 / Field note</span><span>Morning count, recorded once.</span></div>
          </div>
        </section>

        <div className="chapter-rail"><span>Flockline / Operating brief</span><span>01—08</span></div>

        <section id="thesis" className="thesis section-grid anchor-section">
          <div className="section-index"><span>01</span><span>Why this exists</span></div>
          <div className="thesis-main">
            <p className="section-kicker">The operating thesis</p>
            <h2>Start with the flock. <em>Build from what you know.</em></h2>
            <div className="thesis-columns">
              <p>Farm software earns its place when it respects the rhythm of the work. A worker should be able to record a normal day in a few clear taps. A manager should be able to open the week and see what changed.</p>
              <p>That is why the MVP stays at batch level first. It keeps entry fast, keeps relationships clear, and gives future layers—individual birds, richer analytics, offline sync—a stable place to land.</p>
            </div>
          </div>
          <div className="thesis-note"><span className="note-mark">✳</span><p>Small, consistent records are more useful than elaborate records no one wants to enter.</p><span className="note-sign">Design principle / 01</span></div>
        </section>

        <section id="blueprint" className="blueprint band anchor-section">
          <div className="section-grid blueprint-header">
            <div className="section-index light"><span>02</span><span>Blueprint at a glance</span></div>
            <div><p className="section-kicker light-text">A system with a clear edge</p><h2 className="light-heading">Three roles. One farm view.</h2></div>
          </div>
          <div className="role-grid section-grid">
            {roles.map((role) => {
              const Icon = role.icon;
              return <article className={`role-card role-${role.tone}`} key={role.title}><div className="role-top"><span className="role-number">{role.number}</span><Icon size={20} strokeWidth={1.7} /></div><h3>{role.title}</h3><p>{role.text}</p><a href="#trust">Permission boundary <ChevronRight size={14} /></a></article>;
            })}
          </div>
          <div className="model-strip section-grid">
            <div className="model-label"><span className="section-kicker light-text">The relationship map</span><p>Every useful answer starts with a well-shaped relationship.</p></div>
            <div className="model-map"><div className="map-node main"><Sprout size={16} /> Farm</div><span className="map-line" /><div className="map-node"><Layers3 size={16} /> Flock / batch</div><span className="map-line" /><div className="map-node"><NotebookPen size={16} /> Daily record</div><span className="map-line" /><div className="map-node"><BarChart3 size={16} /> Report</div></div>
          </div>
        </section>

        <section id="loop" className="loop section-grid anchor-section">
          <div className="section-index"><span>03</span><span>The daily loop</span></div>
          <div className="loop-content">
            <div className="loop-heading"><div><p className="section-kicker">A quiet four-step rhythm</p><h2>From the house floor<br /><em>to the next decision.</em></h2></div><div className="loop-side-note"><span>02 / Field note</span><p>Capture the fact before it becomes a story.</p></div></div>
            <div className="loop-steps">
              {[{ n: "01", title: "Record", text: "Counts, mortality, feed, eggs, notes." }, { n: "02", title: "Reconcile", text: "Validate the population and the movement." }, { n: "03", title: "Review", text: "See the day against the recent baseline." }, { n: "04", title: "Act", text: "Close a task or follow the signal." }].map((step, i) => <div className="loop-step" key={step.n}><span className="step-number">{step.n}</span><div className="step-icon">{i === 0 ? <NotebookPen size={18} /> : i === 1 ? <Check size={18} /> : i === 2 ? <BarChart3 size={18} /> : <ArrowUpRight size={18} />}</div><h3>{step.title}</h3><p>{step.text}</p>{i < 3 && <span className="step-connector" />}</div>)}
            </div>
          </div>
        </section>

        <section className="module-section paper-band">
          <div className="section-grid module-layout">
            <div className="module-intro"><p className="section-kicker">The first release</p><h2>Enough structure<br /><em>to stay useful.</em></h2><p>Not every future idea belongs in the first build. These are the modules that make the daily record worth returning to.</p><button className="text-link dark" onClick={handleComingSoon}>View the build brief <ArrowUpRight size={16} /></button></div>
            <div className="module-grid">{modules.map((module) => { const Icon = module.icon; return <article className="module-card" key={module.title}><div className="module-icon"><Icon size={19} /></div><div><h3>{module.title}</h3><p>{module.text}</p></div></article>; })}</div>
          </div>
        </section>

        <section className="feature-split section-grid">
          <div className="feature-image image-frame"><img src={dashboardImage} alt="Farm notebook and mobile dashboard on a worktable" /><div className="image-stamp">03 / Entry by design</div></div>
          <div className="feature-copy"><p className="section-kicker">Built around the real moment</p><h2>Mobile first does not have to mean <em>feature light.</em></h2><p>Responsive forms, clear units, and a short correction window make the system usable where the work happens. The future offline queue can arrive later without changing the farm’s vocabulary.</p><div className="quote-rule"><span>“</span><p>Make the normal day feel easy to enter—and easy to trust.</p></div></div>
        </section>

        <section id="phases" className="phases section-grid anchor-section">
          <div className="section-index"><span>04</span><span>Build in phases</span></div>
          <div className="phases-content"><div className="phases-heading"><div><p className="section-kicker">A measured path to product</p><h2>Ship the signal<br /><em>before the sophistication.</em></h2></div><span className="phase-count">06 phases / 01 foundation</span></div><div className="phase-list">{phases.map((item, i) => <article className={`phase-row ${i === 0 ? "is-current" : ""}`} key={item.phase}><span className="phase-index">{item.phase}</span><div className="phase-title"><h3>{item.title}</h3>{i === 0 && <span className="current-chip">Start here</span>}</div><p>{item.text}</p><ChevronRight size={17} /></article>)}</div></div>
        </section>

        <section id="trust" className="trust band-light anchor-section">
          <div className="section-grid trust-layout"><div className="section-index"><span>05</span><span>The trust layer</span></div><div className="trust-copy"><p className="section-kicker">Quiet infrastructure</p><h2>Good records are a kind of <em>care.</em></h2><p className="trust-lede">The blueprint keeps the invisible essentials visible: KSh-ready amounts, Africa/Nairobi time, farm-scoped access, audit history, HTTPS, backups, and an offline plan that treats conflicts carefully.</p><div className="trust-points"><div><LockKeyhole size={18} /><span><b>Scoped by farm</b>Users only see the records they are meant to work with.</span></div><div><CloudOff size={18} /><span><b>Offline-minded</b>Queue the right forms later, with safe retries and conflict states.</span></div><div><ShieldCheck size={18} /><span><b>Auditable</b>Important corrections leave a trail instead of disappearing.</span></div></div></div><div className="trust-photo image-frame"><img src={houseImage} alt="Healthy broiler chickens inside a ventilated poultry house" /><span>06 / House detail</span></div></div>
        </section>

        <section className="final-cta section-grid"><div className="section-index"><span>06</span><span>Next step</span></div><div className="final-cta-content"><div><p className="section-kicker">Ready for the first flock?</p><h2>Begin with what the farm<br /><em>already knows.</em></h2></div><button className="button button-primary" onClick={handleComingSoon}>Start with a flock <ArrowUpRight size={17} /></button></div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark small"><img src={markImage} alt="" /></span><span className="brand-name">Flockline<span className="brand-notch">.</span></span></div><p>Batch-level operations for Kenyan poultry farms.</p><div className="footer-meta"><span>Blueprint / 2026</span><span>Built for the next clear decision.</span></div></footer>
    </div>
  );
}
