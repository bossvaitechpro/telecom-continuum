import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Activity,
  Shield,
  Database,
  CheckCircle2,
  XCircle,
  Globe,
  Server,
  Layers,
  Eye,
  Smartphone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'DRF Observability — GTP Proxy Testing & Monitoring',
  description: 'Complete observability story for the Data Roaming Function: how Evolver, nScan, and ANTS together prove transit, transformation, persistence and compliance.',
};

/* ── DRF node map ── */
const drfNodes = [
  { name: 'DRF-C', desc: 'Core GTP-C proxy logic', side: 'center', color: '#374151' },
  { name: 'DRF-TIDE', desc: 'TEID allocator', side: 'center', color: '#374151' },
  { name: 'DRF-Router', desc: 'Routing library', side: 'center', color: '#374151' },
  { name: 'Valkey', desc: 'Session state cache', side: 'center', color: '#374151' },
  { name: 'CDRF', desc: 'CDR storage', side: 'center', color: '#374151' },
  { name: 'UPF', desc: 'GTP-U user plane', side: 'center', color: '#374151' },
];

/* ── instrument roles in this use case ── */
const instruments = [
  {
    id: 'evolver',
    name: 'Evolver',
    color: '#1a4f8a',
    tagline: 'The Contract Enforcer',
    Icon: Server,
    what: 'Executes 243 YAML scenarios against DRF. Injects synthetic GTPv1/v2 messages, validates TEID aliasing, asserts CDR structure.',
    when: 'Pre-deployment CI/CD gate · Nightly Tier 1 · Weekly full suite',
    gtpv1: '77 scenarios',
    gtpv2: '166 scenarios',
    proofs: ['Proof of Transformation', 'Proof of Persistence'],
  },
  {
    id: 'nscan',
    name: 'nScan',
    color: '#1a6a40',
    tagline: 'The Production Witness',
    Icon: Eye,
    what: 'Passively taps live traffic at DRF ingress/egress. Verifies real TEID aliasing, correlates CDRs with captured sessions.',
    when: '24 × 7 capture · 1% sampled analysis · anomaly detection',
    gtpv1: 'GTP-C tap',
    gtpv2: 'GTP-U tap',
    proofs: ['Proof of Transit', 'Proof of Persistence'],
  },
  {
    id: 'ants',
    name: 'ANTS',
    color: '#c8a030',
    tagline: 'The Field Truth',
    Icon: Smartphone,
    what: 'RTU probes dial actual roaming sessions through the DRF from field locations. Validates end-to-end subscriber experience.',
    when: 'Hourly probes · 3+ locations · 5-min failure alerting',
    gtpv1: 'GTPv1 roaming',
    gtpv2: 'GTPv2 roaming',
    proofs: ['Proof of Transit', 'Proof of Compliance'],
  },
];

/* ── four proofs ── */
const fourProofs = [
  {
    title: 'Proof of Transit',
    Icon: Globe,
    color: '#1a6a40',
    who: ['nScan', 'ANTS'],
    what: 'Message entered DRF at VPMN side and exited at HPMN side without being dropped.',
    how: 'nScan captures GTP headers at both interfaces. ANTS verifies end-to-end session success from field.',
    evidence: '"We can prove the message was forwarded."',
  },
  {
    title: 'Proof of Transformation',
    Icon: Server,
    color: '#1a4f8a',
    who: ['Evolver'],
    what: 'TEID aliasing worked — VPMN TEID ≠ HPMN TEID, but session state is consistent throughout.',
    how: 'Evolver YAML assertions validate CDR contains correct aliased TEID pairs. nScan confirms at runtime.',
    evidence: '"We can prove DRF did not confuse or leak sessions."',
  },
  {
    title: 'Proof of Persistence',
    Icon: Database,
    color: '#374151',
    who: ['Evolver', 'nScan', 'ANTS'],
    what: 'A CDR was generated, written to CDRF, and contains accurate session data for every billable event.',
    how: 'Evolver asserts CDR content in YAML tests. ANTS queries CDRF write completion. nScan correlates to timestamps.',
    evidence: '"We can prove billing records are complete and accurate."',
  },
  {
    title: 'Proof of Compliance',
    Icon: Shield,
    color: '#7c3aed',
    who: ['Evolver', 'ANTS'],
    what: 'DRF follows GSMA IR.88 guidelines — correct rejection codes, proper timer behaviour, valid CDR fields.',
    how: 'Automated IR.88 scorecard derived from Tier 1-3 results. Quarterly audit reports with traceability.',
    evidence: '"We can prove compliance to regulators and roaming partners."',
  },
];

/* ── closed-loop story steps ── */
const storySteps = [
  {
    instrument: 'Evolver',
    color: '#1a4f8a',
    action: 'Detects TEID aliasing regression',
    fn: 'Tier 1 — TC101',
    detail: 'Nightly run finds GTPv2 Create Session response contains wrong aliased TEID after DRF-TIDE code change. CDR assertion fails.',
  },
  {
    instrument: 'nScan',
    color: '#1a6a40',
    action: 'Confirms in live production traffic',
    fn: 'Proof of Transformation',
    detail: 'Passive capture shows 0.3% of sessions have mismatched TEIDs in live traffic. Correlated to deployment timestamp.',
  },
  {
    instrument: 'ANTS',
    color: '#c8a030',
    action: 'Quantifies subscriber impact',
    fn: 'Proof of Transit',
    detail: 'Field probe from Senegal reports 12 failed roaming data sessions in the past hour. CDRF missing CDRs for those sessions.',
  },
  {
    instrument: 'Correlation',
    color: '#92400e',
    action: 'Establishes causal chain + financial impact',
    fn: '—',
    detail: 'TEID regression → misrouted sessions → missing CDRs → unbilled revenue. Estimated €4,200 / hour at risk.',
  },
  {
    instrument: 'Decision',
    color: '#5a1a6a',
    action: 'Alert or autonomous rollback',
    fn: 'L1–L4',
    detail: 'L3/L4: DRF-TIDE rollback triggered automatically. L1/L2: on-call engineer receives correlated alert with all three instrument data.',
  },
  {
    instrument: 'Evolver',
    color: '#1a4f8a',
    action: 'Re-runs regression suite post-fix',
    fn: 'Tier 1 — Full Suite',
    detail: 'All 48 Tier 1 YAML tests pass. TEID aliasing correct. CDR assertions validated.',
  },
  {
    instrument: 'nScan',
    color: '#1a6a40',
    action: 'Confirms clean production traffic',
    fn: 'Proof of Transformation',
    detail: 'Live capture shows zero TEID mismatches in 15-minute post-rollback window.',
  },
  {
    instrument: 'ANTS',
    color: '#c8a030',
    action: 'Confirms roaming restored for subscribers',
    fn: 'Proof of Transit',
    detail: 'All field probes green. CDRF CDR completeness back to 1.000. Zero lost revenue in 30-min follow-up window.',
  },
];

/* ── risk tiers ── */
const riskTiers = [
  {
    tier: 'Tier 1',
    name: 'Revenue-Critical',
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    count: 48,
    frequency: 'Daily',
    impact: 'Immediate revenue loss',
    tests: ['Create PDP/Session', 'Delete PDP/Session', 'Data Plane', 'Handover'],
    instruments: ['Evolver', 'nScan', 'ANTS'],
  },
  {
    tier: 'Tier 2',
    name: 'Operational',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    count: 127,
    frequency: 'Weekly',
    impact: 'Revenue leakage',
    tests: ['Modify Bearer', 'Update Bearer', 'Inter-Cluster', 'Resume/Suspend'],
    instruments: ['Evolver', 'nScan'],
  },
  {
    tier: 'Tier 3',
    name: 'Edge & Compliance',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    count: 68,
    frequency: 'On Change',
    impact: 'Compliance risk',
    tests: ['Rejection Scenarios', 'Malformed Packets', 'Timeout Recovery', 'Trace Session'],
    instruments: ['Evolver'],
  },
];

export default function DRFObservabilityPage() {
  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative border-b border-[var(--card-border)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-gold/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-4">DRF Observability</p>
            <h1 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] leading-tight mb-5">
              GTP Proxy — Complete Observability Story
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-4 max-w-2xl">
              Three instruments. Four proofs. One guarantee.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              The DRF is not just a network function — it is a revenue-critical transaction processor.
              Every GTP message it handles represents billable roaming revenue. Observability must prove
              it never drops, miscounts, or misroutes money.
            </p>
          </div>
        </div>
      </section>

      {/* ── What Is the DRF ── */}
      <section className="border-b border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">System Under Test</p>
          <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">The Data Roaming Function</h2>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            A GTP-C proxy/hub sitting between Visited (VPMN) and Home (HPMN) networks. Every roaming data
            session passes through it. It must alias TEIDs, route across clusters, and generate a CDR for
            every billable event.
          </p>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
            {/* VPMN → DRF → HPMN flow */}
            <div className="grid grid-cols-3 divide-x divide-[var(--card-border)]">
              <div className="px-6 py-5">
                <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-3">VPMN</p>
                <p className="text-sm font-semibold text-[var(--foreground)] mb-1">Visited Network</p>
                <p className="text-xs text-[var(--muted)]">S-GW / MME sends GTPv1 or GTPv2 to DRF</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {['GTPv1-C', 'GTPv2-C', 'GTP-U'].map(p => (
                    <span key={p} className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-[var(--foreground)]">{p}</span>
                  ))}
                </div>
              </div>
              <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900/40">
                <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-3">DRF (System Under Test)</p>
                <div className="grid grid-cols-2 gap-2">
                  {drfNodes.map(n => (
                    <div key={n.name} className="rounded-lg border border-[var(--card-border)] px-3 py-2">
                      <p className="text-xs font-mono font-semibold text-[var(--foreground)]">{n.name}</p>
                      <p className="text-[10px] text-[var(--muted)]">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-3">HPMN</p>
                <p className="text-sm font-semibold text-[var(--foreground)] mb-1">Home Network</p>
                <p className="text-xs text-[var(--muted)]">P-GW / SMF receives proxied GTP from DRF</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {['GTPv1-C', 'GTPv2-C', 'PFCP'].map(p => (
                    <span key={p} className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-[var(--foreground)]">{p}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-[var(--card-border)] bg-amber-50/50 dark:bg-amber-900/10">
              <p className="text-xs text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">Key invariant:</strong> TEID on VPMN side ≠ TEID on HPMN side — the DRF aliases every tunnel.
                If this aliasing breaks, sessions are misrouted and CDRs are lost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Instrument Plane for DRF ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Instrument Plane</p>
        <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">Three Instruments, Three Angles on DRF</h2>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          Independence is the architecture. Each instrument sees a different slice of the DRF&apos;s behaviour.
          Agreement confirms correctness. Disagreement IS the diagnostic.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {instruments.map(inst => {
            const Icon = inst.Icon;
            return (
              <div key={inst.id} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
                <div className="px-6 py-5 border-b border-[var(--card-border)]" style={{ borderTopColor: inst.color, borderTopWidth: 3 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: inst.color + '15' }}>
                      <Icon className="w-5 h-5" style={{ color: inst.color }} />
                    </div>
                    <h3 className="text-lg font-serif text-[var(--foreground)]">{inst.name}</h3>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: inst.color }}>{inst.tagline}</p>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{inst.what}</p>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Schedule</p>
                    <p className="text-xs text-[var(--foreground)]">{inst.when}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-[var(--card-border)] px-3 py-2">
                      <p className="text-[10px] font-mono text-[var(--muted)] uppercase mb-1">GTPv1</p>
                      <p className="text-xs font-semibold text-[var(--foreground)]">{inst.gtpv1}</p>
                    </div>
                    <div className="rounded-lg border border-[var(--card-border)] px-3 py-2">
                      <p className="text-[10px] font-mono text-[var(--muted)] uppercase mb-1">GTPv2</p>
                      <p className="text-xs font-semibold text-[var(--foreground)]">{inst.gtpv2}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Delivers</p>
                    <div className="flex flex-wrap gap-1.5">
                      {inst.proofs.map(p => (
                        <span key={p} className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-[var(--foreground)]">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Four Proofs ── */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Evidence Model</p>
          <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">The Four Proofs</h2>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            Don&apos;t just monitor — prove. Every observability output must deliver a specific burden of proof
            to the customer. Data without evidence is noise.
          </p>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden divide-y divide-[var(--card-border)]">
            {fourProofs.map(proof => {
              const Icon = proof.Icon;
              return (
                <div key={proof.title} className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: proof.color + '15' }}>
                      <Icon className="w-5 h-5" style={{ color: proof.color }} />
                    </div>
                    <div className="flex-1 grid lg:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">{proof.title}</h3>
                        <p className="text-xs text-[var(--muted)] leading-relaxed">{proof.what}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {proof.who.map(w => (
                            <span key={w} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-[var(--foreground)]">{w}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1">How</p>
                        <p className="text-xs text-[var(--foreground)] leading-relaxed">{proof.how}</p>
                      </div>
                      <div className="rounded-lg border border-[var(--card-border)] px-4 py-3 bg-[var(--muted-bg)]">
                        <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1">Customer Evidence</p>
                        <p className="text-xs text-[var(--foreground)] italic">{proof.evidence}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Risk-Based Test Pyramid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Test Strategy</p>
        <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">243 Tests — Prioritised by Revenue Risk</h2>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          Don&apos;t test everything equally. 80% of business value lives in 20% of test cases.
          The pyramid defines what to run when — and what a failure in each tier means.
        </p>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
          {riskTiers.map((tier, i) => (
            <div key={tier.tier} className={i < riskTiers.length - 1 ? 'border-b border-[var(--card-border)]' : ''}>
              <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 ${tier.color}`}>
                    <span className="text-white text-xs font-mono font-bold">{tier.tier}</span>
                    <span className="text-white text-lg font-serif font-semibold leading-none">{tier.count}</span>
                  </div>
                  <div className="flex-1 grid lg:grid-cols-4 gap-4">
                    <div>
                      <h3 className={`text-sm font-semibold mb-1 ${tier.textColor}`}>{tier.name}</h3>
                      <p className="text-xs text-[var(--muted)]">
                        <span className="font-semibold">Frequency:</span> {tier.frequency}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">
                        <span className="font-semibold">On failure:</span> {tier.impact}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Test categories</p>
                      <ul className="space-y-0.5">
                        {tier.tests.map(t => (
                          <li key={t} className="text-xs text-[var(--foreground)] flex items-center gap-1.5">
                            <span className={`w-1 h-1 rounded-full ${tier.color} shrink-0`} />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">Instruments</p>
                      <div className="flex flex-wrap gap-1">
                        {tier.instruments.map(inst => (
                          <span key={inst} className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-[var(--foreground)]">{inst}</span>
                        ))}
                      </div>
                    </div>
                    <div className={`rounded-lg px-3 py-2 ${tier.lightColor}`}>
                      <p className={`text-xs font-semibold ${tier.textColor}`}>Business Question</p>
                      <p className={`text-xs mt-1 ${tier.textColor} opacity-80`}>
                        {tier.tier === 'Tier 1' && '"Will today\'s deployment break roaming revenue?"'}
                        {tier.tier === 'Tier 2' && '"Are we leaking revenue through inefficiency?"'}
                        {tier.tier === 'Tier 3' && '"Are we secure and compliant for audit?"'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="px-6 py-3 border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
            <p className="text-xs text-[var(--muted)]">
              Total: 243 YAML scenarios (77 GTPv1 + 166 GTPv2) across Create/Update/Delete/Handover/Resume/Trace/Data-Plane categories.
              68 tests currently NOT DEFINED represent known coverage gaps.
            </p>
          </div>
        </div>
      </section>

      {/* ── Closed-Loop Story ── */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Closed-Loop Validation</p>
          <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">From Detection to Confirmed Resolution</h2>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            A real scenario: TEID aliasing regression introduced by a DRF-TIDE code change.
            Watch how all three instruments work together — and how the loop closes.
          </p>

          <div className="space-y-0">
            {storySteps.map((step, i) => (
              <div key={i} className="relative">
                {i < storySteps.length - 1 && (
                  <div className="absolute left-[19px] top-[40px] bottom-0 w-px bg-[var(--card-border)]" />
                )}
                <div className="flex gap-4 pb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-mono font-semibold shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded" style={{ color: step.color, backgroundColor: step.color + '15' }}>
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

          <div className="mt-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-4">
            <p className="text-sm text-[var(--foreground)] font-semibold mb-1">Why all three instruments are required:</p>
            <p className="text-sm text-[var(--muted)] italic leading-relaxed">
              Evolver detects the regression in synthetic tests before production. nScan proves it is happening in real traffic.
              ANTS proves real subscribers are affected. Without all three, you have a theory — not a fact.
            </p>
          </div>
        </div>
      </section>

      {/* ── Diagnostic Table ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Diagnostic Power</p>
        <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">Why Disagreement Is the Signal</h2>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          When instruments agree on DRF, the picture is clear. When they disagree, the pattern tells you exactly where the fault is.
        </p>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: '#1a4f8a' }}>Evolver</th>
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: '#c8a030' }}>ANTS</th>
                  <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest" style={{ color: '#1a6a40' }}>nScan</th>
                  <th className="text-left px-4 py-3 text-xs font-mono text-[var(--muted)] uppercase tracking-widest">DRF Verdict</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { e: true,  a: true,  n: true,  verdict: 'DRF healthy — TEID aliasing, CDR and field all confirmed' },
                  { e: false, a: true,  n: true,  verdict: 'Protocol regression in DRF logic — not yet visible in production load' },
                  { e: true,  a: false, n: true,  verdict: 'Field routing issue — DRF passes synthetic, real subscribers dropped' },
                  { e: true,  a: true,  n: false, verdict: 'CDR leakage — sessions succeed but billing records are missing' },
                  { e: false, a: false, n: true,  verdict: 'DRF down — both active instruments fail, traffic tapped but not processed' },
                  { e: false, a: false, n: false, verdict: 'Full DRF outage — all layers impacted, zero roaming sessions completing' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[var(--card-border)] last:border-b-0 hover:bg-[var(--muted-bg)] transition-colors">
                    <td className="px-4 py-3 text-center">
                      {row.e ? <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-red-500 inline" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.a ? <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-red-500 inline" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.n ? <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-red-500 inline" />}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Scorecard ── */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Unified Scorecard</p>
          <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2">Three Metrics That Matter</h2>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            Don&apos;t report 200 KPIs. Report three numbers that answer the only questions that matter.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'DRF Health Score', formula: '(T1% × 40) + (T2% × 35) + (T3% × 25)', target: '≥ 95', freq: 'Hourly', color: '#1a4f8a' },
              { name: 'Revenue at Risk', formula: 'Failed Tier 1 × Avg Session Value × Daily Volume', target: '€ 0', freq: 'Real-time', color: '#dc2626' },
              { name: 'CDR Completeness', formula: 'CDRs Generated / Sessions Created', target: '1.000', freq: 'Hourly', color: '#1a6a40' },
            ].map(m => (
              <div key={m.name} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
                <div className="h-1" style={{ backgroundColor: m.color }} />
                <div className="px-6 py-5">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">{m.name}</h3>
                  <div className="rounded-lg bg-[var(--muted-bg)] px-3 py-2 mb-3">
                    <p className="text-[10px] font-mono text-[var(--muted)] uppercase mb-1">Formula</p>
                    <p className="text-xs font-mono text-[var(--foreground)]">{m.formula}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-[var(--muted)] uppercase">Target</p>
                      <p className="text-xl font-serif font-semibold" style={{ color: m.color }}>{m.target}</p>
                    </div>
                    <span className="text-xs text-[var(--muted)]">Updated {m.freq.toLowerCase()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-4">
            <p className="text-sm text-[var(--foreground)] font-semibold mb-1">The DRF observability principle in one sentence:</p>
            <p className="text-sm text-[var(--muted)] italic leading-relaxed">
              Evolver proves the contract. nScan witnesses production. ANTS confirms the field.
              Together they eliminate the gap between what was tested and what subscribers experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/architecture" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-5 hover:border-brand-blue/40 transition-colors">
              <Layers className="w-5 h-5 text-brand-blue mb-3" />
              <p className="text-sm font-semibold text-[var(--foreground)] mb-1 group-hover:text-brand-blue transition-colors">Full Architecture</p>
              <p className="text-xs text-[var(--muted)]">See how DRF fits in the complete four-plane observability stack</p>
            </Link>
            <Link href="/tools" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-5 hover:border-brand-gold/40 transition-colors">
              <Server className="w-5 h-5 text-brand-gold mb-3" />
              <p className="text-sm font-semibold text-[var(--foreground)] mb-1 group-hover:text-brand-gold transition-colors">Instrument Details</p>
              <p className="text-xs text-[var(--muted)]">Deep-dive into Evolver, nScan, and ANTS capabilities</p>
            </Link>
            <Link href="/use-cases" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-5 hover:border-brand-green/40 transition-colors">
              <Activity className="w-5 h-5 text-brand-green mb-3" />
              <p className="text-sm font-semibold text-[var(--foreground)] mb-1 group-hover:text-brand-green transition-colors">More Use Cases</p>
              <p className="text-xs text-[var(--muted)]">Explore the full observability use case library</p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
