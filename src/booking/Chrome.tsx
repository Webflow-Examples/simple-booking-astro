import type { ReactNode } from "react";
import { LOGO_FULL_WHITE } from "./webflowLogo";

interface ChromeProps {
  framework: string;
  repoUrl: string;
  children: ReactNode;
}

interface DocLink {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: ReactNode;
}

// Icon palette: white = primary shape, gray-400 = secondary detail, blue = framing rim
const ICON_WHITE = "#FFFFFF";
const ICON_GRAY = "#898989";
const ICON_BLUE = "#146EF5";

const IconFrame = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 48 48" width="48" height="48" fill="none" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const CloudIcon = () => (
  <IconFrame>
    <path
      d="M16 32a6 6 0 1 1 1.4-11.84A8.5 8.5 0 0 1 33 22a5.5 5.5 0 1 1 0 11H16z"
      stroke={ICON_WHITE}
      strokeWidth="1.5"
    />
    <circle cx="24" cy="25" r="1.6" fill={ICON_GRAY} />
  </IconFrame>
);

const DatabaseIcon = () => (
  <IconFrame>
    <ellipse cx="24" cy="15" rx="9" ry="3" stroke={ICON_WHITE} strokeWidth="1.5" />
    <path d="M15 15v8c0 1.7 4 3 9 3s9-1.3 9-3v-8" stroke={ICON_WHITE} strokeWidth="1.5" />
    <path d="M15 23v8c0 1.7 4 3 9 3s9-1.3 9-3v-8" stroke={ICON_GRAY} strokeWidth="1.5" />
  </IconFrame>
);

const RocketIcon = () => (
  <IconFrame>
    <path
      d="M24 12c5 3 8 8 8 13l-3 3h-10l-3-3c0-5 3-10 8-13z"
      stroke={ICON_WHITE}
      strokeWidth="1.5"
    />
    <circle cx="24" cy="22" r="2" stroke={ICON_GRAY} strokeWidth="1.5" />
    <path d="M19 28l-2 4M29 28l2 4" stroke={ICON_GRAY} strokeWidth="1.5" />
  </IconFrame>
);

const BranchesIcon = () => (
  <IconFrame>
    <circle cx="16" cy="14" r="2.5" stroke={ICON_GRAY} strokeWidth="1.5" />
    <circle cx="16" cy="34" r="2.5" stroke={ICON_GRAY} strokeWidth="1.5" />
    <circle cx="32" cy="24" r="2.5" stroke={ICON_WHITE} strokeWidth="1.5" />
    <path d="M16 16.5v15" stroke={ICON_WHITE} strokeWidth="1.5" />
    <path d="M16 24h13.5" stroke={ICON_WHITE} strokeWidth="1.5" />
  </IconFrame>
);

const DOC_LINKS: DocLink[] = [
  {
    title: "Webflow Cloud overview",
    description: "What Webflow Cloud is and what you can build on it.",
    cta: "Read overview",
    href: "https://developers.webflow.com/webflow-cloud",
    icon: <CloudIcon />,
  },
  {
    title: "Storing data",
    description: "Add SQLite, Key Value, and Object Storage bindings.",
    cta: "View bindings",
    href: "https://developers.webflow.com/webflow-cloud/storing-data/overview",
    icon: <DatabaseIcon />,
  },
  {
    title: "Getting started",
    description: "Build and deploy your first Webflow Cloud app.",
    cta: "Get started",
    href: "https://developers.webflow.com/webflow-cloud/getting-started",
    icon: <RocketIcon />,
  },
  {
    title: "Environments & deployments",
    description: "Manage previews, production, and deployment history.",
    cta: "Manage environments",
    href: "https://developers.webflow.com/webflow-cloud/environments",
    icon: <BranchesIcon />,
  },
];

export function Chrome({ framework, repoUrl, children }: ChromeProps) {
  return (
    <div className="wf-page">
      <div className="wf-glow" aria-hidden="true" />

      <header className="wf-header">
        <a className="wf-brand" href="https://webflow.com/cloud" target="_blank" rel="noreferrer">
          <img className="wf-logo" src={LOGO_FULL_WHITE} alt="Webflow" />
          <span className="wf-brand-divider" aria-hidden="true">/</span>
          <span className="wf-brand-text">Cloud</span>
        </a>
        <nav className="wf-nav" aria-label="Primary">
          <a href="https://developers.webflow.com/webflow-cloud" target="_blank" rel="noreferrer">
            Docs
          </a>
          <a href={repoUrl} target="_blank" rel="noreferrer" className="wf-nav-ghost">
            GitHub
          </a>
        </nav>
      </header>

      <main className="wf-main">
        <p className="wf-eyebrow">Simple booking · {framework}</p>
        {children}

        <section className="wf-cards" aria-label="Documentation">
          <h2 className="wf-cards-title">Build on this template</h2>
          <div className="wf-cards-grid">
            {DOC_LINKS.map((l) => (
              <a key={l.href} className="wf-card" href={l.href} target="_blank" rel="noreferrer">
                <div className="wf-card-icon">{l.icon}</div>
                <div className="wf-card-title">{l.title}</div>
                <div className="wf-card-desc">{l.description}</div>
                <div className="wf-card-cta">
                  {l.cta} <span className="wf-card-arrow" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="wf-footer">
        <span>
          Built with {framework} · Deployed on{" "}
          <a href="https://webflow.com/cloud" target="_blank" rel="noreferrer">
            Webflow Cloud
          </a>
        </span>
      </footer>
    </div>
  );
}
