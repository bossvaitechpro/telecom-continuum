import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training — PureLoad 5G Core",
  description:
    "Partner training materials for testing 5G Service-Based Interfaces. Learn to simulate AMF, UDM, AUSF with HTTP/2 and TLS.",
};

/* ── data ── */
const agenda = [
  { module: "5G Core SBA Overview", duration: "5 min", content: "HTTP/2, TLS, Service-Based Interfaces vs 4G SS7/Diameter" },
  { module: "Live Demo", duration: "15 min", content: "Run AMF/UDM/AUSF simulation, analyze results" },
  { module: "Hands-On Exercise", duration: "20 min", content: "Modify IMSI, add delays, re-run tests" },
  { module: "Scale Testing", duration: "15 min", content: "Load testing with 5,000 parallel flows" },
  { module: "Integration", duration: "5 min", content: "REST API and CI/CD integration" },
];

const authParams = [
  { param: "SUCI", value: "suci-0-208-93-0-0-0-00007487" },
  { param: "SUPI/IMSI", value: "imsi-2089300007487" },
  { param: "PLMN", value: "20893 (MCC=208, MNC=93)" },
  { param: "Serving Network", value: "5G:mnc093.mcc208.3gppnetwork.org" },
  { param: "RES*", value: "d242094fcb1394c2d2856ea0a60f3d1f" },
  { param: "KSEAF", value: "058758e6b642d35042058016c673a8318c2c031c5d4cdbef19ef1df36a213ba8" },
];

const results = [
  { metric: "Tasks Executed", value: "10", status: "✓" },
  { metric: "Success Rate", value: "100% (10/10)", status: "✓" },
  { metric: "Failed Tasks", value: "0", status: "✓" },
  { metric: "Timeout Tasks", value: "0", status: "✓" },
  { metric: "Tasks/Second", value: "0.88", status: "✓" },
  { metric: "Transactions", value: "4 (3 auth + 1 SDM)", status: "✓" },
  { metric: "Transactions/Second", value: "0.35", status: "✓" },
  { metric: "Data Volume", value: "10.5 kbits", status: "✓" },
];

const perScenario = [
  { nf: "AMF", responseTime: "832 ms", transactions: "3", role: "Client (initiates requests)" },
  { nf: "UDM", responseTime: "7,059 ms", transactions: "1", role: "Server (SDM responses)" },
  { nf: "AUSF", responseTime: "11,316 ms", transactions: "0", role: "Server (auth responses)" },
];

const scaleComparison = [
  { feature: "Instances", functional: "1", load: "5,000" },
  { feature: "Distribution", functional: "burst", load: "rampup" },
  { feature: "Duration", functional: "~10 sec", load: "60 sec" },
  { feature: "Rate", functional: "~1 TPS", load: "100 TPS" },
  { feature: "Purpose", functional: "Validate flow", load: "Test capacity" },
];

const terminology = [
  { term: "AMF", definition: "Access and Mobility Management Function" },
  { term: "AUSF", definition: "Authentication Server Function" },
  { term: "UDM", definition: "Unified Data Management" },
  { term: "SBI", definition: "Service-Based Interface (HTTP/2 API between NFs)" },
  { term: "SUCI", definition: "Subscription Concealed Identifier (encrypted IMSI)" },
  { term: "SUPI", definition: "Subscription Permanent Identifier (IMSI)" },
  { term: "5G-AKA", definition: "5G Authentication and Key Agreement" },
  { term: "KSEAF", definition: "Key for Security Anchor Function" },
  { term: "NSSAI", definition: "Network Slice Selection Assistance Information" },
  { term: "PLC", definition: "PureLoad Configuration (XML test definition)" },
];

/* ── component ── */
export default function TrainingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Partner Training</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-3">
          PureLoad 5G Core Training
        </h1>
        <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl">
          Partner training materials for testing 5G Service-Based Interfaces. Learn to simulate AMF, UDM, AUSF with HTTP/2 and TLS.
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          Quick Start (15-Minute Demo)
        </h2>
        <p className="text-sm text-[var(--foreground)] mb-4">
          New to PureLoad? Start with our guided demo that walks through a complete <strong>AMF/UDM/AUSF authentication flow</strong> with TLS encryption.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">What You&apos;ll Learn</h3>
            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>5G Core SBA basics (HTTP/2 + TLS)</li>
              <li>Simulating AMF as client</li>
              <li>AUSF/UDM as servers</li>
              <li>5G-AKA authentication flow</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Demo Environment</h3>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <p><strong>SSH:</strong> <code className="bg-[var(--muted-bg)] px-1 rounded">pureload@192.168.122.10</code></p>
              <p><strong>API:</strong> <code className="bg-[var(--muted-bg)] px-1 rounded">http://192.168.122.10:8089</code></p>
              <p><strong>VM Specs:</strong> 40GB RAM, 30GB disk, KVM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Agenda */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          Full Training Course (60 Minutes)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[var(--card-border)]">
            <thead>
              <tr className="bg-[var(--muted-bg)]">
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Module</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Duration</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Content</th>
              </tr>
            </thead>
            <tbody>
              {agenda.map(row => (
                <tr key={row.module} className="border-t border-[var(--card-border)]">
                  <td className="px-3 py-2 font-medium text-[var(--foreground)]">{row.module}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.duration}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Call Flow */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          AMF/UDM/AUSF Authentication Flow
        </h2>
        <p className="text-sm text-[var(--foreground)] mb-4">
          Simulate a complete <strong>5G-AKA authentication</strong> with TLS encryption on all HTTP/2 connections.
        </p>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Network Functions</h3>
        <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside mb-4">
          <li><strong>AMF</strong> (Client) — initiates authentication on 172.16.178.10</li>
          <li><strong>AUSF</strong> (Server, port 29509) — handles 5G-AKA authentication</li>
          <li><strong>UDM</strong> (Server, port 29503) — provides subscriber NSSAI data</li>
        </ul>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Call Flow Diagram</h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
          <pre className="text-[10px] sm:text-xs font-mono text-[var(--muted)] whitespace-pre leading-relaxed">{`┌─────────┐         TLS:29509          ┌─────────┐         TLS:29503          ┌─────────┐
│   AMF   │  ═══════════════════════════►│  AUSF   │                              │   UDM   │
│ (Client)│  ◄═══════════════════════════│ (Server)│                              │ (Server)│
│172.16.  │                              │172.16.  │                              │172.16.  │
│178.10   │                              │178.10   │                              │178.10   │
└────┬────┘                              └─────────┘                              └────┬────┘
     │                                                                                  │
     │  1. POST /nausf-auth/v1/ue-authentications                                       │
     │     Body: {supiOrSuci, servingNetworkName}                                       │
     │  ═══════════════════════════════════════════►                                     │
     │                                                                                  │
     │  ◄═══════════════════════════════════════════                                    │
     │     200 OK {authResult, kseaf}                                                   │
     │                                                                                  │
     │  2. PUT /nausf-auth/v1/ue-authentications/{suci}/5g-aka-confirmation             │
     │     Body: {resStar}                                                              │
     │  ════════════════════════════════════════════►                                    │
     │                                                                                  │
     │  ◄════════════════════════════════════════════                                   │
     │     200 OK {authResult, supi, kseaf}                                             │
     │                                                                                  │
     │  3. GET /nudm-sdm/v1/imsi-2089300007487/nssai?plmnid=20893                       │
     │  ═══════════════════════════════════════════════════════════════════════════════►  │
     │                                                                                  │
     │  ◄══════════════════════════════════════════════════════════════════════════════  │
     │     200 OK {deliveryStatus: "DELIVERED_TO_UE"}                                   │`}</pre>
        </div>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mt-4 mb-2">Authentication Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[var(--card-border)]">
            <thead>
              <tr className="bg-[var(--muted-bg)]">
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Parameter</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              {authParams.map(row => (
                <tr key={row.param} className="border-t border-[var(--card-border)]">
                  <td className="px-3 py-2 font-medium text-[var(--foreground)]">{row.param}</td>
                  <td className="px-3 py-2 text-[var(--muted)]"><code className="bg-[var(--muted-bg)] px-1 rounded break-all">{row.value}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Simulation Results */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          Simulation Results
        </h2>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Overall Statistics</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs border border-[var(--card-border)]">
            <thead>
              <tr className="bg-[var(--muted-bg)]">
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Metric</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Value</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map(row => (
                <tr key={row.metric} className="border-t border-[var(--card-border)]">
                  <td className="px-3 py-2 text-[var(--foreground)]">{row.metric}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.value}</td>
                  <td className="px-3 py-2 text-green-500">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Per-Scenario Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[var(--card-border)]">
            <thead>
              <tr className="bg-[var(--muted-bg)]">
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">NF</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Response Time</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Transactions</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {perScenario.map(row => (
                <tr key={row.nf} className="border-t border-[var(--card-border)]">
                  <td className="px-3 py-2 font-medium text-[var(--foreground)]">{row.nf}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.responseTime}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.transactions}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* API Integration */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          REST API Integration
        </h2>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Create and Run Simulation</h3>
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4 mb-4">
          <pre className="text-xs font-mono text-[var(--muted)] whitespace-pre-wrap">{`# Create simulation from template
curl -s -X POST -H 'Content-Type: application/json' \\
  -d '{"name":"AMF Test","templatePath":"/v1/template/100"}' \\
  http://192.168.122.10:8089/v1/simulation

# Start execution
curl -s -X PUT -H 'Content-Type: application/json' \\
  -d '{"state":"Running"}' \\
  http://192.168.122.10:8089/v1/simulation/100

# Get results
curl -s http://192.168.122.10:8089/v1/simulation/100/resulttotals`}</pre>
        </div>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Python Integration Example</h3>
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4 mb-4">
          <pre className="text-xs font-mono text-[var(--muted)] whitespace-pre-wrap">{`import requests
import time

def run_amf_auth_test():
    # Create simulation
    response = requests.post(
        'http://192.168.122.10:8089/v1/simulation',
        json={
            'name': 'Automated AMF Test',
            'templatePath': '/v1/template/100'
        }
    )
    sim_id = response.json()['id']
    
    # Start it
    requests.put(
        f'http://192.168.122.10:8089/v1/simulation/{sim_id}',
        json={'state': 'Running'}
    )
    
    # Poll for completion
    while True:
        status = requests.get(
            f'http://192.168.122.10:8089/v1/simulation/{sim_id}'
        ).json()
        if status['state'] == 'Done':
            return requests.get(
                f'http://192.168.122.10:8089/v1/simulation/{sim_id}/resulttotals'
            ).json()
        time.sleep(5)`}</pre>
        </div>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">CI/CD Integration (GitHub Actions)</h3>
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
          <pre className="text-xs font-mono text-[var(--muted)] whitespace-pre-wrap">{`name: 5G Core Test
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run PureLoad Simulation
        run: |
          RESULT=$(curl -s http://test-env:8089/v1/simulation/100/resulttotals)
          OK_RATE=$(echo $RESULT | jq '.percentageOK')
          if [ "$OK_RATE" != "100" ]; then exit 1; fi`}</pre>
        </div>
      </section>

      {/* Scale Testing */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          Scale Testing
        </h2>
        <p className="text-sm text-[var(--foreground)] mb-4">
          Same authentication flow, but with <strong>5,000 parallel instances</strong> at 100 TPS.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border border-[var(--card-border)]">
            <thead>
              <tr className="bg-[var(--muted-bg)]">
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Feature</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Functional</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Load</th>
              </tr>
            </thead>
            <tbody>
              {scaleComparison.map(row => (
                <tr key={row.feature} className="border-t border-[var(--card-border)]">
                  <td className="px-3 py-2 font-medium text-[var(--foreground)]">{row.feature}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.functional}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.load}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--muted)]">
          <strong>Proves:</strong> PureLoad scales from single requests to thousands. Same PLC logic, different parameters. Production-ready load patterns.
        </p>
      </section>

      {/* Hands-On Exercises */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          Hands-On Exercises
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Exercise 1: Modify IMSI</h3>
            <p className="text-xs text-[var(--muted)] mb-2">Change the SUCI/IMSI in the PLC file and re-run.</p>
            <p className="text-xs text-[var(--muted)]"><strong>Before:</strong> <code className="bg-[var(--muted-bg)] px-1 rounded">imsi-2089300007487</code></p>
            <p className="text-xs text-[var(--muted)]"><strong>After:</strong> <code className="bg-[var(--muted-bg)] px-1 rounded">imsi-2089300009999</code></p>
            <p className="text-xs text-[var(--muted)] mt-2"><strong>Question:</strong> Does UDM respond differently? Why?</p>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Exercise 2: Add Delay</h3>
            <p className="text-xs text-[var(--muted)] mb-2">Introduce latency to see impact on metrics.</p>
            <p className="text-xs text-[var(--muted)]"><strong>Change:</strong> Sleep 10s → 30s in AUSF</p>
            <p className="text-xs text-[var(--muted)]"><strong>Observe:</strong> Response time, TPS changes</p>
            <p className="text-xs text-[var(--muted)] mt-2"><strong>Verify:</strong> Success rate remains 100%</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          What This Proves to Partners
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">1. NF Development Testing</h3>
            <p className="text-xs text-[var(--muted)]">Test your AMF against realistic AUSF/UDM without real 5G core deployment.</p>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">2. Integration Testing</h3>
            <p className="text-xs text-[var(--muted)]">Connect PureLoad to your real NFs. Validate interfaces before production.</p>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">3. Load &amp; Capacity Testing</h3>
            <p className="text-xs text-[var(--muted)]">1 → 5,000 → 50,000 parallel flows. Find breaking points before launch.</p>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">4. Failure Scenario Testing</h3>
            <p className="text-xs text-[var(--muted)]">Simulate slow/failing peers. Test retry logic and timeouts.</p>
          </div>
        </div>
      </section>

      {/* Terminology */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          5G Core Terminology
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[var(--card-border)]">
            <thead>
              <tr className="bg-[var(--muted-bg)]">
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Term</th>
                <th className="text-left px-3 py-2 text-[var(--foreground)] font-semibold">Definition</th>
              </tr>
            </thead>
            <tbody>
              {terminology.map(row => (
                <tr key={row.term} className="border-t border-[var(--card-border)]">
                  <td className="px-3 py-2 font-medium text-[var(--foreground)]">{row.term}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{row.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Support */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
          Support &amp; Resources
        </h2>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Files from Today&apos;s Session</h3>
        <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside mb-4">
          <li><strong>PARTNER_TRAINING_KIT.md</strong> — 60-minute training guide</li>
          <li><strong>PARTNER_DEMO_SCRIPT.md</strong> — 15-minute demo script</li>
          <li><strong>PARTNER_PRESENTATION.md</strong> — 14-slide deck</li>
          <li><strong>AMF_UDM_AUSF_KDDIv_Functional_TLS.plc</strong> — TLS test (24,190 bytes)</li>
          <li><strong>AMF_UDM_AUSF_KDDIv_Load.plc</strong> — Load test variant</li>
        </ul>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">VM Environment</h3>
        <div className="text-xs text-[var(--muted)] space-y-1 mb-4">
          <p><strong>Host:</strong> 192.168.122.10</p>
          <p><strong>User:</strong> pureload</p>
          <p><strong>Specs:</strong> KVM VM, 40GB RAM, Ubuntu 22.04.5 LTS</p>
          <p><strong>Service:</strong> simulation-control on port 8089</p>
        </div>

        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2">Training Checklist</h3>
        <ol className="text-xs text-[var(--muted)] space-y-1 list-decimal list-inside">
          <li>Run the 15-minute demo</li>
          <li>Complete hands-on exercises</li>
          <li>Plan API/CI-CD integration</li>
          <li>Schedule advanced training (custom protocols)</li>
        </ol>
      </section>
    </div>
  );
}
// Deploy trigger: 2026-05-07 23:15
