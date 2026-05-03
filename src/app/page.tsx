import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Cpu, Scale, Activity, Wrench, BookOpen } from "lucide-react";
import { allLaws, getFunctionsForLaw, getUseCasesForLaw, allUseCases, getLawById, getFunctionById, getToolById } from "@/lib/content";
import { LawCard } from "@/components/LawCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telecom Economy Continuum",
  description: "Six laws govern every telecom economy. Ten functions determine what must be observed. One framework connects them to real operational use cases.",
};

export default function Home() {
  const recentUseCases = allUseCases.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-[var(--card-border)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-gold/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-4">Telecom Economy Continuum</p>
            <h1 className="text-4xl md:text-6xl font-serif text-[var(--foreground)] leading-tight mb-6">
              Six laws govern every telecom economy.
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8 max-w-2xl">
              Ten functions determine what must be observed. One framework connects them to real operational use cases — from silent cell degradation to autonomous SLA enforcement.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/laws"
                className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-blue-700 transition-colors"
              >
                Explore the Framework <ArrowRight className="w-4 h-4" />
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

      {/* Stats bar */}
      <section className="border-b border-[var(--card-border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 md:gap-12 text-sm text-[var(--muted)]">
            {[
              { icon: Scale, label: '6 Laws', sub: 'governing the telecom economy' },
              { icon: Activity, label: '10 Functions', sub: 'mandatory & conditional observability' },
              { icon: Wrench, label: '5 Tools', sub: 'mapped to functions' },
              { icon: BookOpen, label: '10 Use Cases', sub: 'with economic outcomes' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-brand-gold shrink-0" />
                <span><strong className="text-[var(--foreground)] font-sans font-semibold">{label}</strong> — {sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-serif text-[var(--foreground)] mb-8">Why this matters</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'For MNO operators',
              body: 'Every use case includes a quantified economic outcome — churn prevented, revenue recovered, fines avoided. This is not theory for its own sake. It connects to decisions made in planning cycles and NOC operations.',
            },
            {
              icon: Cpu,
              title: 'For technical teams',
              body: 'The framework maps tools to functions with full/partial/none coverage indicators. Engineers can immediately see which observability gaps exist in their current toolset and what those gaps cost.',
            },
            {
              icon: Users,
              title: 'For the industry',
              body: 'As networks move toward L4 autonomy, the independence principle becomes critical. This framework explains why autonomous networks require independent observers — and what happens when they do not have them.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <Icon className="w-5 h-5 text-brand-gold mb-4" />
              <h3 className="text-sm font-sans font-semibold text-[var(--foreground)] mb-2">{title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Laws overview */}
      <section className="border-t border-[var(--card-border)] bg-[var(--muted-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-[var(--foreground)]">The Six Laws</h2>
            <Link href="/laws" className="text-sm text-brand-blue hover:underline flex items-center gap-1">
              All laws <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
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
        </div>
      </section>

      {/* Recent use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif text-[var(--foreground)]">Use Case Library</h2>
          <Link href="/use-cases" className="text-sm text-brand-blue hover:underline flex items-center gap-1">
            All use cases <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentUseCases.map(uc => (
            <UseCaseCard
              key={uc.id}
              useCase={uc}
              laws={uc.laws.map(id => getLawById(id)!).filter(Boolean)}
              functions={uc.functions.map(id => getFunctionById(id)!).filter(Boolean)}
              tools={uc.tools.map(id => getToolById(id)!).filter(Boolean)}
            />
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8 md:p-12 text-center">
            <h2 className="text-2xl font-serif text-[var(--foreground)] mb-3">Join the conversation</h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 max-w-xl mx-auto">
              Ask questions. Contribute use cases. Submit tools for mapping. No account required.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[var(--card-border)] text-[var(--foreground)] px-5 py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-[var(--muted-bg)] transition-colors"
            >
              About the framework <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap justify-between gap-4 text-xs text-[var(--muted)]">
          <span>Telecom Economy Continuum — Framework by Vugar Aliyev</span>
          <div className="flex gap-4">
            <Link href="/laws" className="hover:text-[var(--foreground)]">Laws</Link>
            <Link href="/functions" className="hover:text-[var(--foreground)]">Functions</Link>
            <Link href="/use-cases" className="hover:text-[var(--foreground)]">Use Cases</Link>
            <Link href="/about" className="hover:text-[var(--foreground)]">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
