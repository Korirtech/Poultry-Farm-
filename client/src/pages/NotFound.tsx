import { AlertCircle, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="site-shell not-found-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Flockline home">
          <span className="brand-mark"><img src="/manus-storage/flockline-mark_7fa89f7e.png" alt="" /></span>
          <span className="brand-name">Flockline<span className="brand-notch">.</span></span>
        </a>
        <a className="back-link" href="/"><ArrowLeft size={15} /> Farm workspace</a>
      </header>
      <main className="not-found-main">
        <div className="not-found-mark"><AlertCircle size={21} /><span>ROUTE / 404</span></div>
        <h1>This page is outside the farm.</h1>
        <p>The address may have changed. Your farm records and workspace are still where you left them.</p>
        <div className="not-found-actions">
          <button className="button button-primary" onClick={handleGoHome}>Open farm workspace <ArrowUpRight size={16} /></button>
          <a className="text-link" href="/roles">Review access roles <ArrowUpRight size={15} /></a>
        </div>
      </main>
    </div>
  );
}
