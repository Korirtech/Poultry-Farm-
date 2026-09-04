// Style direction: Field Notes / Operational Editorial — warm paper, deep pine, clay marker, asymmetric information hierarchy.
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  MapPin,
  Sprout,
} from "lucide-react";
import { useSearch } from "wouter";

const roleLabels: Record<string, string> = {
  admin: "Admin",
  manager: "Farm Manager",
  worker: "Worker",
};
const stepLabels = ["Farm", "First flock", "Review"];

export default function Onboarding() {
  const search = useSearch();
  const roleFromUrl = new URLSearchParams(search).get("role") || "manager";
  const [step, setStep] = useState(0);
  const [farmName, setFarmName] = useState("");
  const [county, setCounty] = useState("");
  const [flockType, setFlockType] = useState("Broilers");
  const [count, setCount] = useState("");
  const [role, setRole] = useState(
    roleLabels[roleFromUrl] ? roleFromUrl : "manager"
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const roleLabel = roleLabels[role];
  const canContinue = useMemo(
    () =>
      step === 0
        ? farmName.trim().length > 1 && county.trim().length > 1
        : step === 1
          ? Number(count) > 0
          : true,
    [step, farmName, county, count]
  );

  function next(event?: FormEvent) {
    event?.preventDefault();
    if (!canContinue) {
      setError(
        step === 0
          ? "Add the farm name and county to continue."
          : "Enter the starting number of birds to continue."
      );
      return;
    }
    setError("");
    setStep(current => Math.min(current + 1, 2));
  }

  function finish(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="site-shell onboarding-page">
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
          <ArrowLeft size={15} /> Save and return
        </a>
      </header>
      <main>
        <section className="onboarding-hero">
          <div className="section-grid onboarding-hero-inner">
            <div className="section-index">
              <span>08</span>
              <span>First-farm setup</span>
            </div>
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> A small beginning / a useful
                record
              </div>
              <h1>
                Set up the farm
                <br />
                <em>you already know.</em>
              </h1>
              <p>
                Start with the few details that make the first flock legible.
                The full system can grow from this first clear record.
              </p>
            </div>
            <div className="onboarding-note">
              <Sprout size={20} />
              <span>Setup role</span>
              <strong>{roleLabel}</strong>
              <p>
                This starting view will be shaped for the person doing the
                setup.
              </p>
            </div>
          </div>
        </section>
        <section className="onboarding-body section-grid">
          <div className="section-index">
            <span>01</span>
            <span>Setup path</span>
          </div>
          <div className="onboarding-content">
            <div
              className="onboarding-progress"
              aria-label="Onboarding progress"
            >
              {stepLabels.map((label, index) => (
                <div
                  className={
                    index <= step ? "progress-step is-active" : "progress-step"
                  }
                  key={label}
                >
                  <span>
                    {index < step ? <Check size={13} /> : `0${index + 1}`}
                  </span>
                  <b>{label}</b>
                </div>
              ))}
            </div>
            {!submitted ? (
              <form
                onSubmit={step === 2 ? finish : next}
                className="onboarding-form"
              >
                {step === 0 && (
                  <div className="onboarding-step">
                    <p className="section-kicker">Step 01 / The farm</p>
                    <h2>
                      Give the operation
                      <br />
                      <em>a clear home.</em>
                    </h2>
                    <div className="form-grid">
                      <label>
                        Farm name
                        <input
                          value={farmName}
                          onChange={event => setFarmName(event.target.value)}
                          placeholder="e.g. Green Valley Farm"
                          autoFocus
                        />
                      </label>
                      <label>
                        County
                        <select
                          value={county}
                          onChange={event => setCounty(event.target.value)}
                        >
                          <option value="">Choose county</option>
                          <option>Nakuru</option>
                          <option>Kiambu</option>
                          <option>Uasin Gishu</option>
                          <option>Machakos</option>
                          <option>Kisumu</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown className="select-icon" size={15} />
                      </label>
                      <label>
                        Your setup role
                        <select
                          value={role}
                          onChange={event => setRole(event.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Farm Manager</option>
                          <option value="worker">Worker</option>
                        </select>
                        <ChevronDown className="select-icon" size={15} />
                      </label>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div className="onboarding-step">
                    <p className="section-kicker">Step 02 / The first flock</p>
                    <h2>
                      Give today’s birds
                      <br />
                      <em>a starting point.</em>
                    </h2>
                    <div className="form-grid">
                      <label>
                        Flock type
                        <select
                          value={flockType}
                          onChange={event => setFlockType(event.target.value)}
                        >
                          <option>Broilers</option>
                          <option>Layers</option>
                          <option>Indigenous / Kienyeji</option>
                          <option>Breeders</option>
                        </select>
                        <ChevronDown className="select-icon" size={15} />
                      </label>
                      <label>
                        Initial bird count
                        <input
                          type="number"
                          min="1"
                          value={count}
                          onChange={event => setCount(event.target.value)}
                          placeholder="e.g. 1200"
                        />
                      </label>
                      <div className="input-note">
                        <MapPin size={17} />
                        <span>
                          Flockline starts at batch level so entry stays fast
                          and relationships stay clear.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="onboarding-step">
                    <p className="section-kicker">Step 03 / Review</p>
                    <h2>
                      Make sure the first record
                      <br />
                      <em>looks like the farm.</em>
                    </h2>
                    <div className="review-card">
                      <div>
                        <span>Farm</span>
                        <strong>{farmName}</strong>
                        <small>{county} County</small>
                      </div>
                      <div>
                        <span>First flock</span>
                        <strong>{flockType}</strong>
                        <small>
                          {Number(count).toLocaleString()} initial birds
                        </small>
                      </div>
                      <div>
                        <span>Setup by</span>
                        <strong>{roleLabel}</strong>
                        <small>Role-scoped first view</small>
                      </div>
                    </div>
                    <p className="review-note">
                      In the connected Django product, this step will create the
                      farm, its first flock, and your role-scoped workspace.
                      This static flow is ready for that API handoff.
                    </p>
                  </div>
                )}
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="form-actions">
                  {step > 0 ? (
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => {
                        setError("");
                        setStep(current => current - 1);
                      }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < 2 ? (
                    <button className="button button-primary" type="submit">
                      Continue <ArrowRight size={17} />
                    </button>
                  ) : (
                    <button className="button button-primary" type="submit">
                      Create the first record <ArrowUpRight size={17} />
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="onboarding-complete">
                <div className="complete-icon">
                  <CircleCheck size={30} />
                </div>
                <p className="section-kicker">First record ready</p>
                <h2>
                  {farmName} has
                  <br />
                  <em>a starting point.</em>
                </h2>
                <p>
                  Your {flockType.toLowerCase()} flock of{" "}
                  {Number(count).toLocaleString()} birds is ready for the next
                  step. Connect the Django backend to persist this setup and
                  enforce the {roleLabel} permission boundary.
                </p>
                <div className="complete-actions">
                  <a className="button button-primary" href="/">
                    Return to blueprint <ArrowUpRight size={17} />
                  </a>
                  <a className="text-link" href={`/roles/${role}`}>
                    Review {roleLabel} view <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}
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
          <span>Setup / 01</span>
          <span>Built for the next clear decision.</span>
        </div>
      </footer>
    </div>
  );
}
