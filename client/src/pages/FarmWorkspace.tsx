// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Coins,
  Egg,
  FileBarChart,
  Layers3,
  LayoutDashboard,
  Plus,
  ShieldAlert,
  UsersRound,
} from "lucide-react";

type Section = "overview" | "flocks" | "production" | "tasks" | "finance" | "alerts" | "reports";
type WorkspaceRole = "manager" | "worker";
type RecordKind = "flock" | "production" | "task" | "finance";
type FarmRecord = {
  id: string;
  kind: RecordKind;
  label: string;
  detail: string;
  date: string;
  status?: string;
  amount?: number;
  birds?: number;
  eggs?: number;
  mortality?: number;
  feed?: number;
  flock?: string;
  category?: string;
  assignee?: string;
  due?: string;
  house?: string;
};

const storageKey = "flockline.farm-records.v1";
const today = () => new Date().toISOString().slice(0, 10);
const dateOffset = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const startingRecords: FarmRecord[] = [
  { id: "demo-flock-1", kind: "flock", label: "Kuroiler · Batch 24-06", detail: "Kuroiler · placed 12 Jun 2026", date: "2026-06-12", birds: 2400, house: "House 01", status: "Active" },
  { id: "demo-flock-2", kind: "flock", label: "Layers · Batch 24-09", detail: "Isa Brown · placed 04 Sep 2026", date: "2026-09-04", birds: 1800, house: "House 02", status: "Active" },
  { id: "demo-prod-1", kind: "production", label: "Morning collection", detail: "Kuroiler · Batch 24-06 · 02 Oct 2026", date: today(), flock: "Kuroiler · Batch 24-06", eggs: 1720, mortality: 28, feed: 184, status: "Recorded" },
  { id: "demo-prod-2", kind: "production", label: "Morning collection", detail: "Layers · Batch 24-09 · 02 Oct 2026", date: today(), flock: "Layers · Batch 24-09", eggs: 1450, mortality: 3, feed: 136, status: "Recorded" },
  { id: "demo-task-1", kind: "task", label: "Check drinker pressure", detail: "House 01 · Maintenance · Amina", date: today(), due: dateOffset(-1), category: "Maintenance", assignee: "Amina", status: "Open" },
  { id: "demo-task-2", kind: "task", label: "Weekly house sanitation", detail: "House 02 · Biosecurity · Peter", date: today(), due: dateOffset(1), category: "Biosecurity", assignee: "Peter", status: "Scheduled" },
  { id: "demo-fin-1", kind: "finance", label: "Layer mash", detail: "Feed · Expense · M-Pesa", date: today(), category: "Feed", amount: 28500, status: "Expense" },
  { id: "demo-fin-2", kind: "finance", label: "Egg tray sales", detail: "Sales · Income · Cash", date: today(), category: "Sales", amount: 46200, status: "Income" },
];

const navigation: { key: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "flocks", label: "Flock & batches", icon: Layers3 },
  { key: "production", label: "Daily production", icon: Egg },
  { key: "tasks", label: "Tasks & schedules", icon: ClipboardList },
  { key: "finance", label: "Finance", icon: Coins },
  { key: "alerts", label: "Explainable alerts", icon: ShieldAlert },
  { key: "reports", label: "Reports", icon: FileBarChart },
];

const sectionTitles: Record<Section, { title: string; description: string }> = {
  overview: { title: "Farm overview", description: "A working view of today across your flocks, records, and team." },
  flocks: { title: "Flock & batches", description: "Track placements, flock size, breed, and house assignment." },
  production: { title: "Daily production", description: "Record egg collection, mortality, and feed while the day is in view." },
  tasks: { title: "Tasks & schedules", description: "Assign routine work and keep due dates visible to the team." },
  finance: { title: "Farm finance", description: "Capture farm income and costs alongside operational activity." },
  alerts: { title: "Explainable alerts", description: "Every flag includes the observation, rule, and next useful check." },
  reports: { title: "Reports", description: "Review the records behind your operation and export them for analysis." },
};

function loadRecords(): FarmRecord[] {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) as FarmRecord[] : startingRecords;
  } catch {
    return startingRecords;
  }
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="farm-field"><span>{label}</span>{children}</label>;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(value);
}

function sectionFromLocation(role: WorkspaceRole): Section {
  const segment = window.location.pathname.split("/").filter(Boolean).at(-1);
  if (role === "worker" && !["production", "tasks"].includes(segment || "")) return "overview";
  return navigation.some(item => item.key === segment) ? segment as Section : "overview";
}

export default function FarmWorkspace({ role = "manager" }: { role?: WorkspaceRole }) {
  const [section, setSection] = useState<Section>(() => sectionFromLocation(role));
  const [records, setRecords] = useState<FarmRecord[]>(loadRecords);
  const [savedNotice, setSavedNotice] = useState("");
  const [reportFrom, setReportFrom] = useState("");
  const [reportTo, setReportTo] = useState("");
  const [farmProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("flockline.farm-profile.v1") || "null") as { name?: string; county?: string } | null;
    } catch {
      return null;
    }
  });
  const visibleNavigation = role === "worker"
    ? navigation.filter(item => ["overview", "production", "tasks"].includes(item.key))
    : navigation;

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    const onPopState = () => {
      setSection(sectionFromLocation(role));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const showSection = (next: Section) => {
    setSection(next);
    const path = next === "overview" ? `/roles/${role}` : `/roles/${role}/${next}`;
    window.history.pushState({}, "", path);
    setSavedNotice("");
  };

  const toggleTask = (id: string) => {
    setRecords(current => current.map(record => record.id === id && record.kind === "task"
      ? { ...record, status: record.status === "Done" ? "Open" : "Done" }
      : record));
  };

  const saveRecord = (event: FormEvent<HTMLFormElement>, kind: RecordKind) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const date = String(values.date || today());
    const record: FarmRecord = {
      id: crypto.randomUUID(), kind, date,
      label: String(values.label || values.name || values.category || "Farm record"),
      detail: "", status: "Recorded",
    };
    if (kind === "flock") {
      Object.assign(record, { birds: Number(values.birds), house: String(values.house), detail: `${values.breed} · placed ${date}`, status: "Active" });
    } else if (kind === "production") {
      Object.assign(record, { flock: String(values.flock), eggs: Number(values.eggs), mortality: Number(values.mortality), feed: Number(values.feed), detail: `${values.flock} · ${date}` });
    } else if (kind === "task") {
      Object.assign(record, { due: String(values.due), category: String(values.category), assignee: String(values.assignee), detail: `${values.category} · ${values.assignee}`, status: "Open" });
    } else {
      Object.assign(record, { amount: Number(values.amount), category: String(values.category), detail: `${values.category} · ${values.type}`, status: String(values.type) });
    }
    setRecords(current => [record, ...current]);
    setSavedNotice("Record saved to this device");
    form.reset();
  };

  const flocks = records.filter(record => record.kind === "flock");
  const production = records.filter(record => record.kind === "production");
  const tasks = records.filter(record => record.kind === "task" && (role === "manager" || record.assignee === "Amina" || record.assignee === "Amina Wanjiku"));
  const finance = records.filter(record => record.kind === "finance");
  const activeAlerts = getAlerts(records);
  const todayProduction = production.filter(record => record.date === today());
  const eggsToday = todayProduction.reduce((sum, record) => sum + (record.eggs || 0), 0);
  const mortalityToday = todayProduction.reduce((sum, record) => sum + (record.mortality || 0), 0);
  const openTasks = tasks.filter(record => record.status !== "Done").length;
  const income = finance.filter(record => record.status === "Income").reduce((sum, record) => sum + (record.amount || 0), 0);
  const expenses = finance.filter(record => record.status === "Expense").reduce((sum, record) => sum + (record.amount || 0), 0);
  const page = sectionTitles[section];
  const reportRecords = records.filter(record => (!reportFrom || record.date >= reportFrom) && (!reportTo || record.date <= reportTo));
  const reportFlocks = reportRecords.filter(record => record.kind === "flock");
  const reportProduction = reportRecords.filter(record => record.kind === "production");
  const reportTasks = reportRecords.filter(record => record.kind === "task");
  const reportFinance = reportRecords.filter(record => record.kind === "finance");
  const reportIncome = reportFinance.filter(record => record.status === "Income").reduce((sum, record) => sum + (record.amount || 0), 0);
  const reportExpenses = reportFinance.filter(record => record.status === "Expense").reduce((sum, record) => sum + (record.amount || 0), 0);

  const recordForm = (kind: RecordKind) => {
    if (kind === "flock") return <form className="farm-form" onSubmit={event => saveRecord(event, kind)}>
      <Field label="Batch name"><input name="name" placeholder="e.g. Layers · Batch 25-01" required /></Field>
      <Field label="Breed"><input name="breed" placeholder="Isa Brown" required /></Field>
      <Field label="Bird count"><input name="birds" type="number" min="1" placeholder="1800" required /></Field>
      <Field label="House"><input name="house" placeholder="House 01" required /></Field>
      <Field label="Placement date"><input name="date" type="date" defaultValue={today()} required /></Field>
      <button className="farm-primary" type="submit"><Plus size={16} /> Add batch</button>
    </form>;
    if (kind === "production") return <form className="farm-form" onSubmit={event => saveRecord(event, kind)}>
      <Field label="Flock / batch"><select name="flock" required defaultValue=""><option value="" disabled>Select a flock</option>{flocks.map(flock => <option key={flock.id} value={flock.label}>{flock.label}</option>)}</select></Field>
      <Field label="Eggs collected"><input name="eggs" type="number" min="0" placeholder="1450" required /></Field>
      <Field label="Mortality"><input name="mortality" type="number" min="0" placeholder="0" required /></Field>
      <Field label="Feed used (kg)"><input name="feed" type="number" min="0" step="0.1" placeholder="136" required /></Field>
      <Field label="Record date"><input name="date" type="date" defaultValue={today()} required /></Field>
      <button className="farm-primary" type="submit"><Plus size={16} /> Save production</button>
    </form>;
    if (kind === "task") return <form className="farm-form" onSubmit={event => saveRecord(event, kind)}>
      <Field label="Task"><input name="label" placeholder="e.g. Inspect water lines" required /></Field>
      <Field label="Category"><select name="category"><option>Feeding</option><option>Health</option><option>Biosecurity</option><option>Maintenance</option><option>Other</option></select></Field>
      <Field label="Assigned to"><input name="assignee" placeholder="Team member" required /></Field>
      <Field label="Due date"><input name="due" type="date" defaultValue={today()} required /></Field>
      <Field label="Schedule date"><input name="date" type="date" defaultValue={today()} required /></Field>
      <button className="farm-primary" type="submit"><Plus size={16} /> Schedule task</button>
    </form>;
    return <form className="farm-form" onSubmit={event => saveRecord(event, kind)}>
      <Field label="Entry type"><select name="type"><option>Expense</option><option>Income</option></select></Field>
      <Field label="Category"><select name="category"><option>Feed</option><option>Medicine</option><option>Labour</option><option>Utilities</option><option>Sales</option><option>Other</option></select></Field>
      <Field label="Description"><input name="label" placeholder="e.g. Layer mash" required /></Field>
      <Field label="Amount (KES)"><input name="amount" type="number" min="1" step="1" placeholder="28500" required /></Field>
      <Field label="Date"><input name="date" type="date" defaultValue={today()} required /></Field>
      <button className="farm-primary" type="submit"><Plus size={16} /> Add transaction</button>
    </form>;
  };

  return <div className="farm-workspace">
    <aside className="farm-sidebar">
      <a className="farm-brand" href="/"><span className="farm-brand-mark"><img src="/manus-storage/flockline-mark_7fa89f7e.png" alt="" /></span><span>Flockline<span>.</span></span></a>
      <div className="farm-farm-switch"><span className="farm-overline">CURRENT FARM</span><strong>{farmProfile?.name || "Greenfields Poultry"}</strong><small>{farmProfile?.county ? `${farmProfile.county} County` : "Kiambu County"}</small></div>
      <span className="farm-overline nav-caption">OPERATIONS</span>
      <nav className="farm-side-nav" aria-label="Farm operations">{visibleNavigation.map(item => {
        const Icon = item.icon;
        return <button key={item.key} className={section === item.key ? "selected" : ""} onClick={() => showSection(item.key)}><Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>{item.key === "alerts" && activeAlerts.length > 0 && <i>{activeAlerts.length}</i>}</button>;
      })}</nav>
      <div className="farm-sidebar-bottom"><span className="farm-avatar">{role === "worker" ? "AW" : "JM"}</span><span><strong>{role === "worker" ? "Amina Wanjiku" : "James Mwangi"}</strong><small>{role === "worker" ? "Farm worker" : "Farm manager"}</small></span><span className="farm-status-dot" /></div>
    </aside>

    <main className="farm-main">
      <header className="farm-topbar"><div className="farm-breadcrumb">Farm workspace <span>/</span> <strong>{page.title}</strong></div><div className="farm-top-actions"><span><span className="farm-live-dot" /> Saved on this device</span><a href="/roles">Role guide <ArrowUpRight size={14} /></a></div></header>
      <div className="farm-page-content">
        <div className="farm-page-heading"><div><p className="farm-overline">{new Date().toLocaleDateString("en-KE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}</p><h1>{page.title}</h1><p className="farm-page-description">{page.description}</p></div><div className="farm-heading-note"><Activity size={16} /><span>Farm status<strong>{activeAlerts.length ? `${activeAlerts.length} items need review` : "Within expected range"}</strong></span></div></div>
        {savedNotice && <div className="farm-save-notice"><CheckCircle2 size={16} /> {savedNotice}</div>}

        {section === "overview" && <>
          <div className="farm-metric-grid">
            <Metric label="Active flocks" value={String(flocks.length)} detail={`${flocks.reduce((sum, flock) => sum + (flock.birds || 0), 0).toLocaleString()} birds on farm`} icon={<Layers3 />} />
            <Metric label="Eggs collected today" value={eggsToday.toLocaleString()} detail={`${todayProduction.length} production ${todayProduction.length === 1 ? "entry" : "entries"}`} icon={<Egg />} />
            <Metric label="Open tasks" value={String(openTasks)} detail="Across all farm teams" icon={<ClipboardList />} />
            {role === "worker"
              ? <Metric label="Mortality recorded" value={mortalityToday.toLocaleString()} detail="Birds recorded today" icon={<Activity />} />
              : <Metric label="Net recorded" value={currency(income - expenses)} detail={`${currency(income)} income · ${currency(expenses)} costs`} icon={<Coins />} />}
          </div>
          <div className="farm-overview-grid"><section className="farm-panel farm-recent-panel"><PanelTitle kicker="LATEST ENTRIES" title="Today on the farm" action={() => showSection("reports")} actionLabel="All records" />{records.slice(0, 5).map(record => <RecordRow key={record.id} record={record} />)}</section><section className="farm-panel farm-alert-panel"><PanelTitle kicker="RULE-BASED REVIEW" title="Needs a closer look" action={() => showSection("alerts")} actionLabel="Review alerts" />{activeAlerts.length ? activeAlerts.slice(0, 3).map(alert => <AlertRow key={alert.id} alert={alert} />) : <p className="farm-muted">No current alerts. The latest records are within configured thresholds.</p>}</section></div>
          <div className="farm-quick-actions"><span className="farm-overline">QUICK ENTRY</span><button onClick={() => showSection("production")}><Egg size={16} /> Record production</button><button onClick={() => showSection("tasks")}><ClipboardList size={16} /> {role === "worker" ? "View assigned tasks" : "Assign a task"}</button>{role === "manager" && <button onClick={() => showSection("finance")}><Coins size={16} /> Log transaction</button>}</div>
        </>}

        {section === "flocks" && <ModuleLayout title="Batch register" kicker="FLOCK INVENTORY" formTitle="Register a batch" form={recordForm("flock")}><div className="farm-table-wrap"><table className="farm-table"><thead><tr><th>FLOCK / BATCH</th><th>HOUSE</th><th>PLACED</th><th>BIRDS</th><th>STATUS</th></tr></thead><tbody>{flocks.map(record => <tr key={record.id}><td><strong>{record.label}</strong><small>{record.detail}</small></td><td>{record.house}</td><td>{record.date}</td><td>{record.birds?.toLocaleString()}</td><td><span className="farm-pill green">{record.status}</span></td></tr>)}</tbody></table>{flocks.length === 0 && <EmptyState text="No flocks registered yet. Add your first batch to begin." />}</div></ModuleLayout>}
        {section === "production" && <ModuleLayout title="Daily production log" kicker="DAILY RECORDS" formTitle="Record today's figures" form={recordForm("production")}><div className="farm-table-wrap"><table className="farm-table"><thead><tr><th>FLOCK / BATCH</th><th>DATE</th><th>EGGS</th><th>MORTALITY</th><th>FEED (KG)</th></tr></thead><tbody>{production.map(record => <tr key={record.id}><td><strong>{record.flock}</strong><small>{record.label}</small></td><td>{record.date}</td><td>{record.eggs?.toLocaleString()}</td><td>{record.mortality}</td><td>{record.feed}</td></tr>)}</tbody></table>{production.length === 0 && <EmptyState text="No production records yet. Record collection, mortality, and feed." />}</div></ModuleLayout>}
        {section === "tasks" && <ModuleLayout title="Work queue" kicker="TEAM SCHEDULE" formTitle="Assign farm work" form={recordForm("task")} showForm={role === "manager"}><div className="farm-task-list">{tasks.map(record => <div className="farm-task-row" key={record.id}><button type="button" className={`farm-task-check ${record.status === "Done" ? "done" : ""}`} onClick={() => toggleTask(record.id)} aria-label={`${record.status === "Done" ? "Reopen" : "Complete"} ${record.label}`} title={record.status === "Done" ? "Reopen task" : "Mark complete"}><CheckCircle2 size={17} /></button><div><strong>{record.label}</strong><small>{record.category} · Assigned to {record.assignee}</small></div><span className={`farm-pill ${record.due && record.due < today() && record.status !== "Done" ? "red" : "neutral"}`}>{record.due && record.due < today() && record.status !== "Done" ? "Overdue" : record.status}</span><time>{record.due}</time></div>)}{tasks.length === 0 && <EmptyState text="No tasks scheduled. Add a task to create the team's work queue." />}</div></ModuleLayout>}
        {section === "finance" && <ModuleLayout title="Income & expenses" kicker="FARM LEDGER" formTitle="Log a transaction" form={recordForm("finance")}><div className="farm-finance-summary"><div><span>Recorded income</span><strong>{currency(income)}</strong></div><div><span>Recorded costs</span><strong>{currency(expenses)}</strong></div><div><span>Net recorded</span><strong>{currency(income - expenses)}</strong></div></div><div className="farm-table-wrap"><table className="farm-table"><thead><tr><th>DESCRIPTION</th><th>CATEGORY</th><th>DATE</th><th>TYPE</th><th>AMOUNT</th></tr></thead><tbody>{finance.map(record => <tr key={record.id}><td><strong>{record.label}</strong></td><td>{record.category}</td><td>{record.date}</td><td><span className={`farm-pill ${record.status === "Income" ? "green" : "neutral"}`}>{record.status}</span></td><td className="farm-money">{currency(record.amount || 0)}</td></tr>)}</tbody></table>{finance.length === 0 && <EmptyState text="No transactions recorded. Start the farm ledger with income or a cost." />}</div></ModuleLayout>}
        {section === "alerts" && <section className="farm-panel farm-alerts-page"><PanelTitle kicker="TRANSPARENT THRESHOLDS" title="Signals from your records" />{activeAlerts.length ? activeAlerts.map(alert => <AlertRow key={alert.id} alert={alert} expanded />) : <EmptyState text="No active alerts. New records are checked against the rules below." />}<div className="farm-rule-note"><ShieldAlert size={18} /><div><strong>How alerts are determined</strong><p>Mortality is flagged when daily deaths exceed 1% of the flock's recorded bird count. Tasks are overdue when their due date has passed and their status is not complete. Review the source record and farm context before acting.</p></div></div></section>}
        {section === "reports" && <><div className="farm-report-toolbar"><div><span className="farm-overline">FILTERED VIEW · CURRENT FARM</span><p>{reportRecords.length} records across {reportFlocks.length} flocks</p></div><div className="farm-report-filters"><label>From<input type="date" value={reportFrom} onChange={event => setReportFrom(event.target.value)} /></label><label>To<input type="date" value={reportTo} onChange={event => setReportTo(event.target.value)} /></label><button className="farm-primary" onClick={() => exportRecords(reportRecords)}><ArrowDownToLine size={16} /> Export CSV</button></div></div><div className="farm-report-grid"><Metric label="Flocks registered" value={String(reportFlocks.length)} detail="In selected period" icon={<Layers3 />} /><Metric label="Eggs recorded" value={reportProduction.reduce((sum, record) => sum + (record.eggs || 0), 0).toLocaleString()} detail={`${reportProduction.length} daily entries`} icon={<Egg />} /><Metric label="Tasks scheduled" value={String(reportTasks.length)} detail={`${reportTasks.filter(task => task.status === "Done").length} completed`} icon={<UsersRound />} /><Metric label="Net recorded" value={currency(reportIncome - reportExpenses)} detail="Income less expenses" icon={<Coins />} /></div><section className="farm-panel farm-report-records"><PanelTitle kicker="SOURCE DATA" title="Records in selected period" />{reportRecords.length ? reportRecords.map(record => <RecordRow key={record.id} record={record} />) : <EmptyState text="No records match this date range." />}</section></>}
      </div>
    </main>
  </div>;
}

function getAlerts(records: FarmRecord[]) {
  const flocks = records.filter(record => record.kind === "flock");
  const alerts: { id: string; title: string; observed: string; reason: string; action: string; level: string }[] = [];
  for (const entry of records.filter(record => record.kind === "production")) {
    const flock = flocks.find(item => item.label === entry.flock);
    const rate = flock?.birds ? (entry.mortality || 0) / flock.birds : 0;
    if (flock && rate > 0.01) alerts.push({ id: entry.id, title: `Mortality review · ${flock.label}`, observed: `${entry.mortality} of ${flock.birds?.toLocaleString()} birds (${(rate * 100).toFixed(2)}%) on ${entry.date}`, reason: "Daily mortality exceeds the configured 1% of recorded flock size.", action: "Verify the count and timing, inspect the house, then record the manager's follow-up.", level: "High" });
  }
  for (const task of records.filter(record => record.kind === "task" && record.status !== "Done" && record.due && record.due < today())) alerts.push({ id: task.id, title: `Overdue task · ${task.label}`, observed: `Due ${task.due} · assigned to ${task.assignee}`, reason: "The task due date has passed and the task is not marked complete.", action: "Confirm with the assignee, complete the work, or update the schedule.", level: "Review" });
  return alerts;
}

function Metric({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: ReactNode }) {
  return <section className="farm-metric"><span className="farm-metric-icon">{icon}</span><span className="farm-metric-label">{label}</span><strong>{value}</strong><small>{detail}</small></section>;
}

function PanelTitle({ kicker, title, action, actionLabel }: { kicker: string; title: string; action?: () => void; actionLabel?: string }) {
  return <div className="farm-panel-title"><div><span className="farm-overline">{kicker}</span><h2>{title}</h2></div>{action && <button onClick={action}>{actionLabel}<ArrowUpRight size={14} /></button>}</div>;
}

function ModuleLayout({ title, kicker, formTitle, form, children, showForm = true }: { title: string; kicker: string; formTitle: string; form: ReactNode; children: ReactNode; showForm?: boolean }) {
  return <div className="farm-module-layout"><section className="farm-panel farm-records-panel"><PanelTitle kicker={kicker} title={title} />{children}</section>{showForm && <aside className="farm-panel farm-entry-panel"><span className="farm-overline">NEW RECORD</span><h2>{formTitle}</h2>{form}</aside>}</div>;
}

function RecordRow({ record }: { record: FarmRecord }) {
  const icon = record.kind === "flock" ? <Layers3 size={16} /> : record.kind === "production" ? <Egg size={16} /> : record.kind === "task" ? <CalendarDays size={16} /> : <Coins size={16} />;
  return <div className="farm-record-row"><span className="farm-record-icon">{icon}</span><span className="farm-record-copy"><strong>{record.label}</strong><small>{record.detail}</small></span><span className="farm-record-date">{record.date}</span></div>;
}

function AlertRow({ alert, expanded = false }: { alert: ReturnType<typeof getAlerts>[number]; expanded?: boolean }) {
  return <article className={`farm-alert-row ${alert.level === "High" ? "high" : ""}`}><span className="farm-alert-icon"><AlertTriangle size={18} /></span><div className="farm-alert-copy"><div className="farm-alert-heading"><strong>{alert.title}</strong><span className={`farm-pill ${alert.level === "High" ? "red" : "amber"}`}>{alert.level}</span></div><p className="farm-alert-observed">{alert.observed}</p>{expanded && <><p><b>Why it was flagged:</b> {alert.reason}</p><p><b>Suggested check:</b> {alert.action}</p></>}</div></article>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="farm-empty"><span><FileBarChart size={18} /></span><p>{text}</p></div>;
}

function exportRecords(records: FarmRecord[]) {
  const columns = ["kind", "label", "detail", "date", "status", "amount", "birds", "eggs", "mortality", "feed", "flock", "category", "assignee", "due", "house"] as const;
  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [columns.join(","), ...records.map(record => columns.map(column => escape(record[column])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `flockline-farm-records-${today()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}