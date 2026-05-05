# DRF Observability Strategy

## Executive Summary

This document defines the strategic framework for observing, testing, and validating the **Data Roaming Function (DRF)** — a GTP proxy that routes mobile data roaming traffic between Visited Public Mobile Networks (VPMN) and Home Public Mobile Networks (HPMN).

**The Core Insight**: DRF is not just a network function — it is a **revenue-critical transaction processor**. Every GTP message represents billable roaming activity. Observability must prove the DRF never drops, miscounts, or misroutes revenue.

---

## 1. The Three-Tier Risk Model

### Tier 1: Revenue-Critical (Test Daily)
**Philosophy**: These are the tests that, if they fail, stop money from flowing or create billing disputes.

**Coverage**:
- **Create PDP/Session**: TC101, TC1201, TC1241 (revenue starts)
- **Delete PDP/Session**: TC301, TC1271 (revenue stops, final CDR generated)
- **Data Plane**: TC401 (actual usage reaches UPF for charging)
- **Handover**: TC1258 (revenue continues during mobility)

**Instrumentation Strategy**:
- **Evolver**: Full YAML automation, every build
- **nScan**: Production capture of 100% Tier 1 message types
- **ANTS**: Daily probes from 3+ roaming locations

**Business Question Answered**: *"Will today's deployment break roaming revenue?"*

---

### Tier 2: Operational (Test Weekly)
**Philosophy**: These prevent revenue leakage and ensure customer experience. Failures degrade service but don't immediately stop billing.

**Coverage**:
- **Modify/Update Bearers**: Session maintenance during mobility
- **Inter-Cluster Routing**: Multi-datacenter resilience
- **Resume/Suspend**: MME load balancing
- **Multi-Bearer**: Enterprise/M2M scenarios

**Instrumentation Strategy**:
- **Evolver**: Weekly regression batch
- **nScan**: Sampled capture (1% of Tier 2 traffic)
- **ANTS**: Weekly field validation

**Business Question Answered**: *"Are we losing revenue through inefficiency?"*

---

### Tier 3: Edge & Compliance (Test on Change)
**Philosophy**: Security, fraud prevention, and regulatory compliance. These don't run often but protect against existential risk.

**Coverage**:
- **Rejection Scenarios**: Barred IMSI, unknown APN (fraud prevention)
- **Malformed Packets**: Resilience against attacks
- **Timeout Recovery**: Graceful degradation
- **Trace Session**: Lawful intercept compliance

**Instrumentation Strategy**:
- **Evolver**: Pre-release security suite
- **nScan**: Anomaly detection on error patterns
- **ANTS**: Compliance audit runs

**Business Question Answered**: *"Are we compliant and secure?"*

---

## 2. The "Four Proofs" Model

Every observability output must deliver one or more proofs to the customer:

### Proof of Transit
**What**: Message entered DRF at VPMN side and exited at HPMN side (or vice versa).

**How**: nScan captures GTP headers at ingress and egress, hashes the payload, and confirms integrity.

**Customer Value**: *"We can prove the message was forwarded, not dropped."*

---

### Proof of Transformation
**What**: TEID aliasing worked correctly — VPMN TEID ≠ HPMN TEID, but session state is consistent.

**How**: Evolver validates CDR contains both original and aliased TEIDs with correct mapping. nScan captures live traffic to confirm runtime aliasing matches design.

**Customer Value**: *"We can prove DRF didn't confuse sessions or leak contexts."*

---

### Proof of Persistence
**What**: A CDR was generated, stored, and contains accurate session data.

**How**: 
- Evolver asserts CDR content in YAML tests
- ANTS queries CDRF to confirm write completion
- nScan correlates captured traffic to CDR timestamps

**Customer Value**: *"We can prove billing records are complete and accurate."*

---

### Proof of Compliance
**What**: DRF follows GSMA IR.88 guidelines for GTP roaming proxies.

**How**:
- Automated IR.88 scorecard derived from Tier 1-3 test results
- Compliance dashboard updated hourly
- Quarterly audit reports with full traceability

**Customer Value**: *"We can prove to regulators and partners that we meet industry standards."*

---

## 3. Instrument Positioning

### Evolver: The Contract Enforcer
**Role**: Active protocol testing — proves DRF behavior against defined YAML contracts.

**Key Value Propositions**:
1. **Pre-Deployment Confidence**: Run 243 tests before any production release
2. **Regression Safety**: Ensure new code doesn't break existing scenarios
3. **CDR Validation**: Assert that generated CDRs match expected structure

**Execution Model**:
- **CI/CD Gate**: Tier 1 tests must pass before merge
- **Nightly**: Full Tier 1-2 suite
- **Weekly**: Complete Tier 1-3 suite
- **Release**: Full suite + performance benchmarks

---

### nScan: The Production Witness
**Role**: Passive monitoring — captures live traffic to prove DRF behaves correctly in production.

**Key Value Propositions**:
1. **Real Traffic Validation**: Not synthetic — actual subscriber sessions
2. **TEID Aliasing Verification**: Confirm runtime behavior matches design
3. **CDR Reconciliation**: Cross-check that every session has a matching CDR

**Deployment Model**:
- **Mirror ports** at DRF ingress/egress
- **Real-time analysis** of 1% sampled traffic
- **Anomaly detection** on error rate spikes
- **Forensic capture** on Tier 1 failures

---

### ANTS: The Field Truth
**Role**: End-to-end validation from real roaming locations.

**Key Value Propositions**:
1. **Subscriber Perspective**: Tests what subscribers actually experience
2. **Geographic Coverage**: Validate from multiple roaming partner locations
3. **Regulatory Authority**: 24x7 automated testing as neutral third party

**Deployment Model**:
- **RTU probes** at GRX peering points (Senegal, Europe, APAC)
- **Automated schedules**: Attach, PDP/Session create, data transfer, detach
- **Hourly reporting** to central dashboard
- **Alert on roaming failure** within 5 minutes

---

## 4. The Unified Scorecard

### DRF Health Score (0-100)
```
Score = (Tier1% × 40) + (Tier2% × 35) + (Tier3% × 25)

Where:
- Tier1% = Pass rate of 48 Tier 1 tests
- Tier2% = Pass rate of 127 Tier 2 tests  
- Tier3% = Pass rate of 68 Tier 3 tests

Target: >= 95
Alert: < 90
Critical: < 80
```

### Revenue at Risk
```
RaR = (Failed Tier 1 Tests) × (Average Session Value) × (Daily Session Volume)

Alert Threshold: > $0
Escalation: > $10,000/day
```

### CDR Completeness
```
Completeness = CDRs Generated / Sessions Created

Target: 1.000 (100%)
Warning: < 0.999
Critical: < 0.995
```

---

## 5. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Categorize all 243 YAML tests by risk tier (✓ Complete)
- [ ] Implement automated Tier 1 test runner in CI/CD
- [ ] Define "Golden CDR" specification for each Tier 1 scenario
- [ ] Create baseline DRF Health Score dashboard

### Phase 2: Integration (Weeks 3-4)
- [ ] Deploy nScan at DRF ingress/egress points
- [ ] Build CDR reconciliation pipeline (Evolver + nScan correlation)
- [ ] Deploy ANTS probes at 3+ roaming locations
- [ ] Implement hourly scorecard generation

### Phase 3: Intelligence (Weeks 5-6)
- [ ] Anomaly detection on Tier 2 traffic patterns
- [ ] Predictive alerting based on Tier 3 error trends
- [ ] Automated root cause analysis for failures
- [ ] Quarterly compliance report generation

### Phase 4: Scale (Weeks 7-8)
- [ ] Multi-DRF fleet monitoring
- [ ] Customer self-service observability portal
- [ ] Integration with operator billing systems
- [ ] GSMA IR.88 audit automation

---

## 6. "So What?" Decision Framework

When evaluating any test, metric, or investment:

| Question | If Yes | Priority |
|----------|--------|----------|
| Does failure stop revenue today? | Tier 1 — Automate immediately | P0 |
| Does failure leak revenue over time? | Tier 2 — Include in next sprint | P1 |
| Does failure create compliance risk? | Tier 3 — Schedule quarterly | P2 |
| Would a customer pay to know this? | Instrument and monetize | P1 |
| Can we prove this to an auditor? | Document and automate | P2 |

---

## Appendix: Test Case Inventory

### GTPv1 (77 Tests)
- **Tier 1**: 12 tests (Create, Delete, Data)
- **Tier 2**: 35 tests (Update, Inter-cluster)
- **Tier 3**: 30 tests (Errors, Malformed, Timeout)

### GTPv2 (166 Tests)
- **Tier 1**: 36 tests (Create, Delete, Bearer, Handover)
- **Tier 2**: 92 tests (Modify, Update, Commands, Multi-bearer)
- **Tier 3**: 38 tests (Trace, Resume/Suspend, Errors)

### Full Catalog
See `test-risk-catalog.json` for complete test case details with business impact assessments.
