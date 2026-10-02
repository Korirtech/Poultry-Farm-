// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Building2, Check, CircleUserRound, LayoutDashboard, Plus, ShieldCheck, UsersRound } from "lucide-react";

type AdminSection = "overview" | "farms" | "people";
type Farm = { id: string; name: string; county: string; houses: number; status: "Active" | "Paused" };
type Member = { id: string; name: string; email: string; role: "Admin" | "Farm Manager" | "Worker"; farmId: string; active: boolean };

const farmsKey = "flockline.admin-farms.v1";
const peopleKey = "flockline.admin-people.v1";
const baseFarms: Farm[] = [
  { id: "farm-greenfields", name: "Greenfields Poultry", county: "Kiambu", houses: 4, status: "Active" },
  { id: "farm-highland", name: "Highland Layers", county: "Nakuru", houses: 2, status: "Active" },
];
const basePeople: Member[] = [
  { id: "member-james", name: "James Mwangi", email: "james@greenfields.co.ke", role: "Farm Manager", farmId: "farm-greenfields", active: true },
  { id: "member-amina", name: "Amina Wanjiku", email: "amina@greenfields.co.ke", role: "Worker", farmId: "farm-greenfields", active: true },
  { id: "member-peter", name: "Peter Otieno", email: "peter@highland.co.ke", role: "Farm Manager", farmId: "farm-highland", active: true },
];

function loadList<T>(key: string, fallback: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T[] : fallback;
  } catch {
    return fallback;
  }
}

export default function AdminWorkspace() {
  const [section, setSection] = useState<AdminSection>(() => {
    const last = window.location.pathname.split("/").filter(Boolean).at(-1);
    return last === "farms" || last === "people" ? last : "overview";
  });
  const [farms, setFarms] = useState(() => loadList(farmsKey, baseFarms));
  const [people, setPeople] = useState(() => loadList(peopleKey, basePeople));
  const [notice, setNotice] = useState("");

  useEffect(() => { localStorage.setItem(farmsKey, JSON.stringify(farms)); }, [farms]);
  useEffect(() => { localStorage.setItem(peopleKey, JSON.stringify(people)); }, [people]);
  useEffect(() => {
    const onPopState = () => {
      const last = window.location.pathname.split("/").filter(Boolean).at(-1);
      setSection(last === "farms" || last === "people" ? last : "overview");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (next: AdminSection) => {
    setSection(next);
    window.history.pushState({}, "", next === "overview" ? "/roles/admin" : `/roles/admin/${next}`);
    setNotice("");
  };

  const addFarm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    setFarms(current => [{ id: crypto.randomUUID(), name: String(values.name), county: String(values.county), houses: Number(values.houses), status: "Active" }, ...current]);
    setNotice("Farm added to this device");
    event.currentTarget.reset();
  };

  const inviteMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    setPeople(current => [{ id: crypto.randomUUID(), name: String(values.name), email: String(values.email), role: values.role as Member["role"], farmId: String(values.farmId), active: true }, ...current]);
    setNotice("Team member added to this device");
    event.currentTarget.reset();
  };

  const heading = section === "farms" ? "Farm register" : section === "people" ? "People & access" : "System overview";
  const farmName = (id: string) => farms.find(farm => farm.id === id)?.name || "Unassigned farm";

  return <div className="farm-workspace">
    <aside className="farm-sidebar">
      <a className="farm-brand" href="/"><span className="farm-brand-mark"><img src="/manus-storage/flockline-mark_7fa89f7e.png" alt="" /></span><span>Flockline<span>.</span></span></a>
      <div className="farm-farm-switch"><span className="farm-overline">SYSTEM SCOPE</span><strong>All farms</strong><small>Administration workspace</small></div>
      <span className="farm-overline nav-caption">STEWARDSHIP</span>
      <nav className="farm-side-nav" aria-label="Administration"><button className={section === "overview" ? "selected" : ""} onClick={() => navigate("overview")}><LayoutDashboard size={17} /><span>Overview</span></button><button className={section === "farms" ? "selected" : ""} onClick={() => navigate("farms")}><Building2 size={17} /><span>Farms</span></button><button className={section === "people" ? "selected" : ""} onClick={() => navigate("people")}><UsersRound size={17} /><span>People & access</span></button></nav>
      <div className="farm-sidebar-bottom"><span className="farm-avatar"><ShieldCheck size={15} /></span><span><strong>System admin</strong><small>All-farm access</small></span><span className="farm-status-dot" /></div>
    </aside>
    <main className="farm-main">
      <header className="farm-topbar"><div className="farm-breadcrumb">Administration <span>/</span> <strong>{heading}</strong></div><div className="farm-top-actions"><span><span className="farm-live-dot" /> Demo data stored locally</span><a href="/roles">Role guide</a></div></header>
      <div className="farm-page-content">
        <div className="farm-page-heading"><div><p className="farm-overline">SYSTEM STEWARDSHIP</p><h1>{heading}</h1><p className="farm-page-description">Manage farm boundaries, team membership, and role assignments.</p></div></div>
        {notice && <div className="farm-save-notice"><Check size={16} /> {notice}</div>}
        {section === "overview" && <>
          <div className="farm-metric-grid"><Metric label="Registered farms" value={String(farms.length)} detail={`${farms.filter(farm => farm.status === "Active").length} active`} icon={<Building2 />} /><Metric label="Team members" value={String(people.length)} detail={`${people.filter(person => person.active).length} active accounts`} icon={<UsersRound />} /><Metric label="Farm managers" value={String(people.filter(person => person.role === "Farm Manager" && person.active).length)} detail="Across all farms" icon={<CircleUserRound />} /><Metric label="Configured houses" value={farms.reduce((total, farm) => total + farm.houses, 0).toLocaleString()} detail="Within farm register" icon={<LayoutDashboard />} /></div>
          <div className="farm-overview-grid"><section className="farm-panel farm-recent-panel"><PanelTitle title="Farms" kicker="REGISTER" action={() => navigate("farms")} actionLabel="Manage farms" />{farms.map(farm => <div className="farm-record-row" key={farm.id}><span className="farm-record-icon"><Building2 size={16} /></span><span className="farm-record-copy"><strong>{farm.name}</strong><small>{farm.county} County · {farm.houses} houses</small></span><span className="farm-pill green">{farm.status}</span></div>)}</section><section className="farm-panel farm-recent-panel"><PanelTitle title="Recent membership" kicker="TEAM" action={() => navigate("people")} actionLabel="Manage access" />{people.slice(0, 5).map(person => <div className="farm-record-row" key={person.id}><span className="farm-record-icon"><CircleUserRound size={16} /></span><span className="farm-record-copy"><strong>{person.name}</strong><small>{person.role} · {farmName(person.farmId)}</small></span></div>)}</section></div>
          <div className="farm-rule-note"><ShieldCheck size={18} /><div><strong>Role enforcement boundary</strong><p>This prototype keeps its records in browser storage. In production, Django must enforce farm scope and permissions on every API request.</p></div></div>
        </>}
        {section === "farms" && <div className="farm-module-layout"><section className="farm-panel farm-records-panel"><PanelTitle title="Registered farms" kicker="FARM DIRECTORY" /><div className="farm-table-wrap"><table className="farm-table"><thead><tr><th>FARM</th><th>COUNTY</th><th>HOUSES</th><th>STATUS</th></tr></thead><tbody>{farms.map(farm => <tr key={farm.id}><td><strong>{farm.name}</strong></td><td>{farm.county}</td><td>{farm.houses}</td><td><span className="farm-pill green">{farm.status}</span></td></tr>)}</tbody></table></div></section><aside className="farm-panel farm-entry-panel"><span className="farm-overline">NEW RECORD</span><h2>Register a farm</h2><form className="farm-form" onSubmit={addFarm}><Field label="Farm name"><input name="name" placeholder="Farm name" required /></Field><Field label="County"><input name="county" placeholder="County" required /></Field><Field label="Number of houses"><input name="houses" type="number" min="1" placeholder="1" required /></Field><button className="farm-primary"><Plus size={16} /> Add farm</button></form></aside></div>}
        {section === "people" && <div className="farm-module-layout"><section className="farm-panel farm-records-panel"><PanelTitle title="Team directory" kicker="MEMBERS & ROLES" /><div className="farm-table-wrap"><table className="farm-table"><thead><tr><th>PERSON</th><th>FARM SCOPE</th><th>ROLE</th><th>ACCESS</th></tr></thead><tbody>{people.map(person => <tr key={person.id}><td><strong>{person.name}</strong><small>{person.email}</small></td><td>{farmName(person.farmId)}</td><td>{person.role}</td><td><button className={`farm-pill ${person.active ? "green" : "neutral"}`} onClick={() => setPeople(current => current.map(item => item.id === person.id ? { ...item, active: !item.active } : item))}>{person.active ? "Active" : "Paused"}</button></td></tr>)}</tbody></table></div></section><aside className="farm-panel farm-entry-panel"><span className="farm-overline">NEW MEMBER</span><h2>Add team member</h2><form className="farm-form" onSubmit={inviteMember}><Field label="Full name"><input name="name" placeholder="Full name" required /></Field><Field label="Email address"><input name="email" type="email" placeholder="name@example.com" required /></Field><Field label="Farm"><select name="farmId" required defaultValue=""><option value="" disabled>Select a farm</option>{farms.map(farm => <option key={farm.id} value={farm.id}>{farm.name}</option>)}</select></Field><Field label="Role"><select name="role"><option>Farm Manager</option><option>Worker</option><option>Admin</option></select></Field><button className="farm-primary"><Plus size={16} /> Add member</button></form><p className="farm-muted">Adding a member here is a local prototype action. Production invitations require the Django user API.</p></aside></div>}
      </div>
    </main>
  </div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="farm-field"><span>{label}</span>{children}</label>;
}

function Metric({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: ReactNode }) {
  return <section className="farm-metric"><span className="farm-metric-icon">{icon}</span><span className="farm-metric-label">{label}</span><strong>{value}</strong><small>{detail}</small></section>;
}

function PanelTitle({ kicker, title, action, actionLabel }: { kicker: string; title: string; action?: () => void; actionLabel?: string }) {
  return <div className="farm-panel-title"><div><span className="farm-overline">{kicker}</span><h2>{title}</h2></div>{action && <button onClick={action}>{actionLabel}</button>}</div>;
}