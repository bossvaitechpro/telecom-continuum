import Link from "next/link";
import { ArrowRight, ArrowDown, Activity, Scale, Eye } from "lucide-react";
import { allLaws, getFunctionsForLaw, getUseCasesForLaw, allFunctions, getLawsForFunction, allUseCases, getLawById, getFunctionById, getToolById } from "@/lib/content";
import { LawCard } from "@/components/LawCard";
import { FunctionCard } from "@/components/FunctionCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Observe. Resolve. Automate.",
  description: "The complete observability framework for autonomous networks. Ten functions. Six economic laws. One standard.",
};

export default function Home() {
  const recentUseCases = allUseCases.slice(0, 6);

  return (
    <div>

      {/* ── ZONE 1 — ABOVE THE FOLD: The operational product ── */}

      {/* Hero */}
      <section className="relative border-b border-[var(--card-border)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-gold/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-4">The Observability Standard for Autonomous Networks</p>
            <h1 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] leading-tight mb-5">
              Most networks are not failing.<br />They are unobserved.
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8 max-w-2xl">
              Ten observability functions define what every autonomous network must measure. Miss one and you cannot detect the problem. Miss two and you cannot prove the cause. Miss three and you cannot defend the revenue.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/functions"
                className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-blue-700 transition-colors"
              >
                The Ten Functions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/use-cases"
                className="inline-flex items-center gap-2 border border-[var(--card-border)] text-[var(--foreground)] px-5 py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-[var(--muted-bg)] transition-colors"
              >
                Browse Use Cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Functions — the complete observability map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-1">Zone 1 — What must you observe?</p>
            <h2 className="text-2xl font-serif text-[var(--foreground)]">The Ten Observability Functions</h2>
          </div>
          <Link href="/functions" className="text-sm text-brand-blue hover:underline flex items-center gap-1 shrink-0 ml-4">
            Full detail <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          The complete observability map for mobile networks. Each function answers a question your network cannot answer without it. Click any to see tool coverage, L4 role, and active use cases.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allFunctions.map(fn => (
            <FunctionCard
              key={fn.id}
              fn={fn}
              laws={getLawsForFunction(fn.id)}
            />
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-1">What does this look like in practice?</p>
              <h2 className="text-2xl font-serif text-[var(--foreground)]">Use Case Library</h2>
            </div>
            <Link href="/use-cases" className="text-sm text-brand-blue hover:underline flex items-center gap-1 shrink-0 ml-4">
              All 10 use cases <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
            Each use case maps a real operational scenario to the functions it requires, the tools that enable it, and the economic outcome it protects — at L1 through L4 autonomy.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentUseCases.map(uc => (
              <UseCaseCard
                key={uc.id}
                useCase={uc}
                laws={uc.laws.map((id: string) => getLawById(id)!).filter(Boolean)}
                functions={uc.functions.map((id: string) => getFunctionById(id)!).filter(Boolean)}
                tools={uc.tools.map((id: string) => getToolById(id)!).filter(Boolean)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Zone divider */}
      <div className="border-t border-[var(--card-border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <ArrowDown className="w-4 h-4 text-brand-gold shrink-0" />
            <p className="text-sm text-[var(--muted)]">
              <strong className="text-[var(--foreground)]">Why are these functions non-negotiable?</strong>{" "}
              Six economic laws derive them. That is what separates this from a vendor checklist.
            </p>
          </div>
          <Link href="/laws" className="text-sm text-brand-blue hover:underline flex items-center gap-1 shrink-0">
            The Six Laws <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ── ZONE 2 — BELOW THE FOLD: The theoretical authority ── */}

      {/* Laws */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-1">Zone 2 — Why are they mandatory?</p>
            <h2 className="text-2xl font-serif text-[var(--foreground)]">The Six Economic Laws</h2>
          </div>
          <Link href="/laws" className="text-sm text-brand-blue hover:underline flex items-center gap-1 shrink-0 ml-4">
            Full detail <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          The ten functions are not a product opinion. They are derived from six laws that govern every telecom economy — scarcity, inelasticity, stratification, regulation, competition, and independence. Each law makes certain observations economically necessary.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allLaws.map(law => (
            <LawCard
              key={law.id}
              law={law}
              functions={getFunctionsForLaw(law.id)}
              useCaseCount={getUseCasesForLaw(law.id).length}
            />
          ))}
        </div>
      </section>

      {/* Observer Theorem */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-brand-gold" />
              <p className="text-xs font-mono text-brand-gold uppercase tracking-widest">The Observer Theorem — L4 Insight</p>
            </div>
            <h2 className="text-2xl font-serif text-[var(--foreground)] mb-4">
              An autonomous network cannot be its own observer.
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
              At L4 autonomy, the network detects, diagnoses, and heals itself without human intervention. But the observer of that system must remain independent. A network that monitors itself with its own components cannot detect the failure of those components — it has no external reference point.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              This is why Law VI — the Independence Principle — is the final and structurally necessary law. The ten functions derived from it are not optional features. They are the architectural requirement for L4 to be credible.
            </p>
            <Link
              href="/laws/law-vi-independence-principle"
              className="inline-flex items-center gap-2 border border-[var(--card-border)] text-[var(--foreground)] px-5 py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-[var(--card)] transition-colors"
            >
              Read Law VI — Independence Principle <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community + Author */}
      <section className="border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8">
              <Activity className="w-5 h-5 text-brand-gold mb-4" />
              <h3 className="text-lg font-serif text-[var(--foreground)] mb-2">Contribute to the framework</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                Submit a use case. Propose a function. Challenge a law. The framework is designed to evolve with the industry — not to be a closed standard.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-brand-blue hover:underline"
              >
                How to contribute <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8">
              <Scale className="w-5 h-5 text-brand-gold mb-4" />
              <h3 className="text-lg font-serif text-[var(--foreground)] mb-2">About the framework</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                Built by Vugar Aliyev — telecom economist and network strategist. This framework synthesises economic theory, regulatory observation, and operational practice into a single navigable standard.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-brand-blue hover:underline"
              >
                Read the foundation <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap justify-between gap-4 text-xs text-[var(--muted)]">
          <span>Observe. Resolve. Automate. — Framework by Vugar Aliyev</span>
          <div className="flex gap-4">
            <Link href="/functions" className="hover:text-[var(--foreground)]">Functions</Link>
            <Link href="/architecture" className="hover:text-[var(--foreground)]">Architecture</Link>
            <Link href="/use-cases" className="hover:text-[var(--foreground)]">Use Cases</Link>
            <Link href="/laws" className="hover:text-[var(--foreground)]">Laws</Link>
            <Link href="/tools" className="hover:text-[var(--foreground)]">Tools</Link>
            <Link href="/about" className="hover:text-[var(--foreground)]">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
