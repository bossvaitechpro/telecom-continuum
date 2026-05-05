import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Radio, Eye, Shield, Zap, Server, Smartphone, Wifi, Activity, GitMerge, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { allFunctions, getFunctionById } from "@/lib/content";

export const metadata: Metadata = {
  title: "Integrated Architecture — The Complete Observability Stack",
  description: "Three instruments, three perspectives, one truth. Evolver validates the core. ANTS validates the service. nScan validates the truth.",
};

/* ── instrument definitions ── */

const instruments = [
  {
    id: "evolver",
    name: "Evolver",
    vendor: "Emblasoft",
    color: "#1a4f8a",
    tagline: "Validates the Core",
    icon: Server,
    what: "Cloud-native protocol-level simulation engine. Software agents inject synthetic L7 traffic into core network nodes.",
    protocols: ["GTP", "SIP", "Diameter", "SS7", "PFCP", "RTP", "QUIC"],
    components: ["PureLoad Workers", "simulation-control API", "Protocol JARs", "Cranium", "Uranium (UPF)"],
    primaryFunctions: ["f3", "f6", "f10"],
    sharedFunctions: ["f1", "f5", "f9"],
    noFunctions: ["f2", "f4", "f8"],
    networkTouch: "Core Network — EPC, IMS, SBC, UPF, HSS/UDM, 5G Core NFs",
    perspective: "Inward — tests nodes, protocols, load, functional regression from inside the core",
  },
  {
    id: "ants",
    name: "ANTS",
    vendor: "Aubay",
    color: "#c8a030",
    tagline: "Validates the Service",
    icon: Smartphone,
    what: "RTU-based E2E active testing from real handsets in real locations. 2G–5G SA. Voice/data/SMS/OTT. Drive test. 60+ country roaming. Revenue assurance.",
    protocols: ["VoLTE", "VoNR", "VoWiFi", "CSFB", "HTTP", "iPerf", "PESQ/POLQA"],
    components: ["ANTS-SA (E2E active)", "ANTS-GRA (60+ country roaming)", "ANTS-RA (Revenue Assurance)", "ANTS-DT (Drive Test + GeoANTS)", "Nexus AI (Architect, Sentinel, Explorer)"],
    primaryFunctions: ["f1", "f4", "f9"],
    sharedFunctions: ["f3", "f5", "f7", "f8"],
    noFunctions: ["f2"],
    networkTouch: "RAN + Edge + Field — RTUs in cabinets, drive test routes, enterprise premises, roaming partners, fixed links",
    perspective: "Outward — tests what the subscriber actually experiences, from the field",
  },
  {
    id: "nscan",
    name: "nScan",
    vendor: "Emblasoft",
    color: "#1a6a40",
    tagline: "Validates the Truth",
    icon: Eye,
    what: "Passive monitoring platform. Taps live network traffic. Sees every real session, every subscriber, every signalling message.",
    protocols: ["SS7", "Diameter", "GTP", "SIP", "RTP", "CDR correlation"],
    components: ["Passive Probe", "Subscriber Trace (per-IMSI)", "Signalling Monitor", "CDR Correlation", "TrueVoice", "NetQPro"],
    primaryFunctions: ["f2", "f8"],
    sharedFunctions: ["f5", "f7"],
    noFunctions: ["f4", "f6", "f9", "f10"],
    networkTouch: "All Interfaces — S1-MME, S6a, N3, N4, Gx/Gy/Gz, SS7 links, Diameter hubs, GTP tunnels, billing mediation",
    perspective: "Transparent — observes everything happening, identifies who is affected",
  },
];

/* ── coverage levels per function per instrument ── */

type CoverageLevel = "full" | "shared" | "none";

const coverageMap: Record<string, Record<string, CoverageLevel>> = {
  f1:  { evolver: "shared", ants: "full", nscan: "shared" },
  f2:  { evolver: "none", ants: "shared", nscan: "full" },
  f3:  { evolver: "full", ants: "full", nscan: "shared" },
  f4:  { evolver: "none", ants: "full", nscan: "none" },
  f5:  { evolver: "full", ants: "full", nscan: "shared" },
  f6:  { evolver: "full", ants: "shared", nscan: "shared" },
  f7:  { evolver: "shared", ants: "full", nscan: "full" },
  f8:  { evolver: "none", ants: "shared", nscan: "full" },
  f9:  { evolver: "full", ants: "full", nscan: "none" },
  f10: { evolver: "full", ants: "shared", nscan: "shared" },
};

/* ── closed-loop scenario ── */

const closedLoopSteps = [
  { instrument: "Evolver", color: "#1a4f8a", action: "Detects protocol degradation", fn: "F3", detail: "Active probe finds latency anomaly on S1-U interface after RAN software update" },
  { instrument: "ANTS", color: "#c8a030", action: "Confirms service impact in field", fn: "F1", detail: "RTU in affected area reports MOS drop from 4.1 to 2.8 on VoLTE calls" },
  { instrument: "nScan", color: "#1a6a40", action: "Quantifies subscriber damage", fn: "F2", detail: "1,247 subscribers affected, 89 with ARPU >€50, total €12.4K/day at risk" },
  { instrument: "Correlation", color: "#8a6200", action: "Establishes causal chain + economic impact", fn: "—", detail: "Protocol fault → service degradation → subscriber impact confirmed across all three" },
  { instrument: "Decision", color: "#5a1a6a", action: "Autonomous action or human alert", fn: "L1–L4", detail: "At L3/L4: automatic rollback triggered. At L1/L2: engineer receives correlated alert" },
  { instrument: "Evolver", color: "#1a4f8a", action: "Re-tests after remediation", fn: "F3", detail: "Post-rollback regression suite confirms protocol integrity restored" },
  { instrument: "ANTS", color: "#c8a030", action: "Confirms service restored", fn: "F1", detail: "RTU reports MOS recovered to 4.0+ within 12 minutes" },
  { instrument: "nScan", color: "#1a6a40", action: "Confirms subscriber recovery", fn: "F2", detail: "All 1,247 subscriber sessions normalised. Zero churn events in 48h follow-up" },
];

/* ── use case summary counts ── */

const useCaseCounts = [
  { label: "Evolver solo", count: 8, color: "#1a4f8a" },
  { label: "nScan solo", count: 6, color: "#1a6a40" },
  { label: "ANTS solo", count: 10, color: "#c8a030" },
  { label: "Evolver + nScan", count: 8, color: "#1a4f8a" },
  { label: "Evolver + ANTS", count: 6, color: "#c8a030" },
  { label: "nScan + ANTS", count: 5, color: "#1a6a40" },
  { label: "All three", count: 6, color: "#5a1a6a" },
];

function CoverageDot({ level }: { level: CoverageLevel }) {
  if (level === "full") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (level === "shared") return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
  return <XCircle className="w-3.5 h-3.5 text-[var(--muted)]/40" />;
}

export default function ArchitecturePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative border-b border-[var(--card-border)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-gold/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-4">Integrated Architecture</p>
            <h1 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] leading-tight mb-5">
              The Complete Observability Stack
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-4 max-w-2xl">
              Three instruments. Three perspectives. One truth.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              A single instrument&apos;s finding is a hypothesis. Two instruments corroborating is evidence. Three is truth.
              The architecture exists to turn three partial views into one complete picture.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three Instruments Overview ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Instrument Plane</p>
        <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">Three Instruments, Three Perspectives</h2>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          Each instrument touches a different part of the network. Independence is the architecture — disagreement between instruments IS the diagnostic.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {instruments.map(inst => {
            const Icon = inst.icon;
            return (
              <div
                key={inst.id}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-[var(--card-border)]" style={{ borderTopColor: inst.color, borderTopWidth: 3 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: inst.color + "15" }}>
                      <Icon className="w-5 h-5" style={{ color: inst.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-[var(--foreground)]">{inst.name}</h3>
                      <p className="text-xs text-[var(--muted)]">{inst.vendor}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: inst.color }}>{inst.tagline}</p>
                </div>

                {/* Body */}
                <div className="px-6 py-4 space-y-4">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{inst.what}</p>

                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Perspective</p>
                    <p className="text-sm text-[var(--foreground)]">{inst.perspective}</p>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Network touch point</p>
                    <p className="text-sm text-[var(--foreground)]">{inst.networkTouch}</p>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Protocols</p>
                    <div className="flex flex-wrap gap-1.5">
                      {inst.protocols.map(p => (
                        <span key={p} className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-[var(--foreground)]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Components</p>
                    <ul className="space-y-1">
                      {inst.components.map(c => (
                        <li key={c} className="text-xs text-[var(--muted)] flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: inst.color }} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Primary functions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {inst.primaryFunctions.map(fid => {
                        const fn = getFunctionById(fid);
                        return fn ? (
                          <span key={fid} className="text-xs font-mono px-2 py-0.5 rounded border" style={{ color: fn.color, borderColor: fn.color + "44", backgroundColor: fn.color + "11" }}>
                            {fn.ref}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Four-Plane Architecture Diagram ── */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">System Design</p>
          <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">Four-Plane Architecture</h2>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            The architecture is organised into four planes. Data flows upward from the network through independent instruments into a correlation engine that produces actionable decisions.
          </p>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">

            {/* Plane 4 — Decision */}
            <div className="px-6 py-5 border-b border-[var(--card-border)] bg-brand-purple/5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-brand-purple" />
                <p className="text-xs font-mono text-brand-purple uppercase tracking-widest">Plane 4 — Decision</p>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)] mb-2">Autonomy Levels L1–L4</p>
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { level: "L1", desc: "Human detects, human acts" },
                  { level: "L2", desc: "System detects, human acts" },
                  { level: "L3", desc: "System acts, human reviews" },
                  { level: "L4", desc: "System acts, system validates" },
                ].map(l => (
                  <div key={l.level} className="text-xs rounded-lg border border-[var(--card-border)] px-3 py-2">
                    <span className="font-mono font-semibold text-[var(--foreground)]">{l.level}</span>
                    <span className="text-[var(--muted)] ml-1.5">{l.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--muted)] mt-3">
                L4 requires ALL THREE instruments. No single tool can both detect and validate its own fix.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center py-2 border-b border-[var(--card-border)] bg-[var(--background)]">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-[var(--card-border)]" />
                <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest px-2">decides from</p>
                <div className="w-px h-3 bg-[var(--card-border)]" />
              </div>
            </div>

            {/* Plane 3 — Correlation */}
            <div className="px-6 py-5 border-b border-[var(--card-border)] bg-brand-amber/5">
              <div className="flex items-center gap-2 mb-2">
                <GitMerge className="w-4 h-4 text-brand-amber" />
                <p className="text-xs font-mono text-brand-amber uppercase tracking-widest">Plane 3 — Correlation Engine</p>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Where truth emerges</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-[var(--card-border)] px-4 py-3">
                  <p className="text-xs font-mono font-semibold text-[var(--foreground)] mb-1">Temporal Alignment</p>
                  <p className="text-xs text-[var(--muted)]">Same event seen by three instruments at the same time?</p>
                </div>
                <div className="rounded-lg border border-[var(--card-border)] px-4 py-3">
                  <p className="text-xs font-mono font-semibold text-[var(--foreground)] mb-1">Causal Chain</p>
                  <p className="text-xs text-[var(--muted)]">Protocol fault → service impact → subscriber loss?</p>
                </div>
                <div className="rounded-lg border border-[var(--card-border)] px-4 py-3">
                  <p className="text-xs font-mono font-semibold text-[var(--foreground)] mb-1">Economic Impact</p>
                  <p className="text-xs text-[var(--muted)]">Subscribers × ARPU × duration = € at risk</p>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)] mt-3">
                No single vendor owns the truth. The correlation engine is the only place where findings from all three instruments meet.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center py-2 border-b border-[var(--card-border)] bg-[var(--background)]">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-[var(--card-border)]" />
                <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest px-2">correlates from</p>
                <div className="w-px h-3 bg-[var(--card-border)]" />
              </div>
            </div>

            {/* Plane 2 — Instruments */}
            <div className="px-6 py-5 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-brand-blue" />
                <p className="text-xs font-mono text-brand-blue uppercase tracking-widest">Plane 2 — Instrument Plane</p>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Three independent data paths</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {instruments.map(inst => {
                  const Icon = inst.icon;
                  return (
                    <div key={inst.id} className="rounded-lg border px-4 py-3" style={{ borderColor: inst.color + "44" }}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className="w-4 h-4" style={{ color: inst.color }} />
                        <p className="text-sm font-semibold" style={{ color: inst.color }}>{inst.name}</p>
                      </div>
                      <p className="text-xs text-[var(--muted)]">{inst.tagline}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {inst.primaryFunctions.map(fid => {
                          const fn = getFunctionById(fid);
                          return fn ? (
                            <span key={fid} className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ color: fn.color, backgroundColor: fn.color + "15" }}>
                              {fn.ref}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[var(--muted)] mt-3">
                Each instrument produces data independently. Disagreement between them IS the diagnostic signal.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center py-2 border-b border-[var(--card-border)] bg-[var(--background)]">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-[var(--card-border)]" />
                <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest px-2">observes</p>
                <div className="w-px h-3 bg-[var(--card-border)]" />
              </div>
            </div>

            {/* Plane 1 — Network */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="w-4 h-4 text-[var(--muted)]" />
                <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest">Plane 1 — Network</p>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)] mb-3">The thing being observed</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: "Core", items: "5G Core, EPC, IMS, SBC, UPF", observer: "Evolver injects here", color: "#1a4f8a" },
                  { name: "RAN", items: "eNB, gNB, O-RAN", observer: "ANTS tests from here", color: "#c8a030" },
                  { name: "Transport", items: "IP, GTP tunnels, MPLS", observer: "nScan taps here", color: "#1a6a40" },
                  { name: "Services", items: "SMSC, VAS, Billing, CDN", observer: "ANTS-RA audits here", color: "#c8a030" },
                  { name: "Interconnect", items: "SS7, Diameter hubs, Roaming", observer: "nScan observes here", color: "#1a6a40" },
                ].map(n => (
                  <div key={n.name} className="rounded-lg border border-[var(--card-border)] px-3 py-2.5">
                    <p className="text-xs font-mono font-semibold text-[var(--foreground)] mb-1">{n.name}</p>
                    <p className="text-[10px] text-[var(--muted)] leading-relaxed mb-2">{n.items}</p>
                    <p className="text-[10px] font-mono" style={{ color: n.color }}>{n.observer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Function Coverage Matrix ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Coverage Matrix</p>
        <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">Function Coverage Across All Three Instruments</h2>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          Every function has a primary instrument (detects), a confirmer (validates the cause), and a quantifier (measures impact).
        </p>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left px-4 py-3 text-xs font-mono text-[var(--muted)] uppercase tracking-widest">Function</th>
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: "#1a4f8a" }}>Evolver</th>
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: "#c8a030" }}>ANTS</th>
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: "#1a6a40" }}>nScan</th>
                  <th className="text-left px-4 py-3 text-xs font-mono text-[var(--muted)] uppercase tracking-widest hidden lg:table-cell">Blind spot without all three</th>
                </tr>
              </thead>
              <tbody>
                {allFunctions.map(fn => {
                  const cov = coverageMap[fn.id];
                  return (
                    <tr key={fn.id} className="border-b border-[var(--card-border)] last:border-b-0 hover:bg-[var(--muted-bg)] transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/functions/${fn.slug}`} className="group flex items-center gap-2">
                          <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ color: fn.color, backgroundColor: fn.color + "15" }}>
                            {fn.ref}
                          </span>
                          <span className="text-sm text-[var(--foreground)] group-hover:text-brand-blue transition-colors">{fn.name}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center"><CoverageDot level={cov?.evolver ?? "none"} /></td>
                      <td className="px-4 py-3 text-center"><CoverageDot level={cov?.ants ?? "none"} /></td>
                      <td className="px-4 py-3 text-center"><CoverageDot level={cov?.nscan ?? "none"} /></td>
                      <td className="px-4 py-3 text-xs text-[var(--muted)] hidden lg:table-cell">
                        {fn.id === "f1" && "Without ANTS: no field-level QoS. Without Evolver: no protocol depth"}
                        {fn.id === "f2" && "Only nScan sees individual subscriber ARPU in real time"}
                        {fn.id === "f3" && "Both Evolver and ANTS provide regression — different layers of the stack"}
                        {fn.id === "f4" && "Only ANTS has drive test and geo-referenced competitor benchmarking"}
                        {fn.id === "f5" && "Evolver: logical SLA. ANTS: physical link SLA. nScan: session evidence"}
                        {fn.id === "f6" && "Evolver validates from core. ANTS confirms from field"}
                        {fn.id === "f7" && "nScan catches leakage in live traffic. ANTS-RA audits billing accuracy"}
                        {fn.id === "f8" && "nScan: signalling-layer security. ANTS-GRA: SimBox/OTT bypass fraud"}
                        {fn.id === "f9" && "Evolver: automated evidence. ANTS: physical geo-referenced proof"}
                        {fn.id === "f10" && "Evolver isolates vendor failure at protocol level"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-[var(--card-border)] bg-[var(--muted-bg)] flex flex-wrap gap-4 text-xs text-[var(--muted)]">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Primary coverage</span>
            <span className="flex items-center gap-1.5"><AlertTriangle className="w-3 h-3 text-amber-500" /> Shared / partial</span>
            <span className="flex items-center gap-1.5"><XCircle className="w-3 h-3 text-[var(--muted)]/40" /> Not covered</span>
          </div>
        </div>
      </section>

      {/* ── Closed-Loop Feedback ── */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Closed-Loop Validation</p>
          <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">The Validation Loop — From Detection to Confirmed Resolution</h2>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            This is what makes L3/L4 autonomy credible. Without all three instruments in the loop, the validation step is incomplete — you fixed something but you cannot prove the fix worked at all three levels.
          </p>

          <div className="space-y-0">
            {closedLoopSteps.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < closedLoopSteps.length - 1 && (
                  <div className="absolute left-[19px] top-[40px] bottom-0 w-px bg-[var(--card-border)]" />
                )}
                <div className="flex gap-4 pb-6">
                  {/* Step number */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-mono font-semibold shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </div>
                  {/* Content */}
                  <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded" style={{ color: step.color, backgroundColor: step.color + "15" }}>
                        {step.instrument}
                      </span>
                      <span className="text-xs font-mono text-[var(--muted)]">{step.fn}</span>
                    </div>
                    <p className="text-sm font-semibold text-[var(--foreground)] mb-1">{step.action}</p>
                    <p className="text-xs text-[var(--muted)]">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Diagnostic Table ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Diagnostic Power</p>
        <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">Why Disagreement Is the Signal</h2>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          When instruments agree, the picture is clear. When they disagree, the disagreement itself tells you exactly where the problem lies.
        </p>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: "#1a4f8a" }}>Evolver</th>
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: "#c8a030" }}>ANTS</th>
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: "#1a6a40" }}>nScan</th>
                  <th className="text-left px-4 py-3 text-xs font-mono text-[var(--muted)] uppercase tracking-widest">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { e: true, a: false, n: null, verdict: "RAN or transport problem — between core and field" },
                  { e: false, a: true, n: null, verdict: "Compensating mechanism hiding a real core fault" },
                  { e: true, a: true, n: false, verdict: "Capacity problem visible only under real subscriber load" },
                  { e: true, a: true, n: true, verdict: "System healthy — all three layers confirmed" },
                  { e: false, a: false, n: true, verdict: "Service failure confirmed — subscribers unaffected (yet)" },
                  { e: false, a: false, n: false, verdict: "Full outage — all layers impacted" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[var(--card-border)] last:border-b-0">
                    <td className="px-4 py-3 text-center">
                      {row.e === true && <span className="text-xs font-mono text-emerald-500">PASS</span>}
                      {row.e === false && <span className="text-xs font-mono text-red-500">FAIL</span>}
                      {row.e === null && <span className="text-xs font-mono text-[var(--muted)]">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.a === true && <span className="text-xs font-mono text-emerald-500">PASS</span>}
                      {row.a === false && <span className="text-xs font-mono text-red-500">FAIL</span>}
                      {row.a === null && <span className="text-xs font-mono text-[var(--muted)]">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.n === true && <span className="text-xs font-mono text-emerald-500">PASS</span>}
                      {row.n === false && <span className="text-xs font-mono text-red-500">FAIL</span>}
                      {row.n === null && <span className="text-xs font-mono text-[var(--muted)]">—</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Use Case Counts ── */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Operational Evidence</p>
          <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">49 Documented Use Cases</h2>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            Every combination of instruments produces use cases that no single tool or pair can address alone.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {useCaseCounts.map(uc => (
              <div key={uc.label} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-4 text-center">
                <p className="text-2xl font-serif font-semibold" style={{ color: uc.color }}>{uc.count}</p>
                <p className="text-xs text-[var(--muted)] mt-1 leading-tight">{uc.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-4">
            <p className="text-sm text-[var(--foreground)] font-semibold mb-2">The architectural principle in one sentence:</p>
            <p className="text-sm text-[var(--muted)] italic leading-relaxed">
              Evolver validates the core. ANTS validates the service. nScan validates the truth.
              Together they are the complete observability stack — from protocol to field to live subscriber.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/functions" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-5 hover:border-brand-blue/40 transition-colors">
              <Activity className="w-5 h-5 text-brand-blue mb-3" />
              <p className="text-sm font-semibold text-[var(--foreground)] mb-1 group-hover:text-brand-blue transition-colors">The Ten Functions</p>
              <p className="text-xs text-[var(--muted)]">What must be observed — the complete map</p>
            </Link>
            <Link href="/use-cases" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-5 hover:border-brand-gold/40 transition-colors">
              <Radio className="w-5 h-5 text-brand-gold mb-3" />
              <p className="text-sm font-semibold text-[var(--foreground)] mb-1 group-hover:text-brand-gold transition-colors">Use Case Library</p>
              <p className="text-xs text-[var(--muted)]">Real operational scenarios mapped to functions and tools</p>
            </Link>
            <Link href="/tools" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-5 hover:border-brand-green/40 transition-colors">
              <Shield className="w-5 h-5 text-brand-green mb-3" />
              <p className="text-sm font-semibold text-[var(--foreground)] mb-1 group-hover:text-brand-green transition-colors">Tool Coverage</p>
              <p className="text-xs text-[var(--muted)]">How each instrument maps to the ten functions</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
