import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allUseCases, getUseCaseBySlug, getLawById, getFunctionById, getToolById, getUseCasesForLaw, getUseCasesForFunction } from "@/lib/content";
import { RelationshipTrail } from "@/components/RelationshipTrail";
import { Badge } from "@/components/ui/Badge";
import { AutonomyBadge } from "@/components/AutononomyBadge";
import { UseCaseCard } from "@/components/UseCaseCard";
import { toRoman } from "@/lib/utils";
import { TrendingUp, Zap, Calculator } from "lucide-react";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allUseCases.map(u => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const uc = getUseCaseBySlug(params.slug);
  if (!uc) return {};
  return { title: uc.name, description: uc.economicOutcome };
}

export default function UseCaseDetailPage({ params }: Props) {
  const uc = getUseCaseBySlug(params.slug);
  if (!uc) notFound();

  const laws = uc.laws.map(id => getLawById(id)!).filter(Boolean);
  const functions = uc.functions.map(id => getFunctionById(id)!).filter(Boolean);
  const tools = uc.tools.map(id => getToolById(id)!).filter(Boolean);

  const related = [
    ...getUseCasesForLaw(uc.laws[0]),
    ...getUseCasesForFunction(uc.functions[0]),
  ]
    .filter((r, i, arr) => r.id !== uc.id && arr.findIndex(x => x.id === r.id) === i)
    .slice(0, 4);

  const trailItems = [
    { label: "Use Cases", href: "/use-cases" },
    ...laws.slice(0, 1).map(l => ({ label: `Law ${toRoman(l.number)}`, href: `/laws/${l.slug}` })),
    ...functions.slice(0, 1).map(f => ({ label: f.ref, href: `/functions/${f.slug}` })),
    { label: uc.name, href: `/use-cases/${uc.slug}` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RelationshipTrail items={trailItems} />

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {laws.map(l => <Badge key={l.id} variant="law">Law {toRoman(l.number)}: {l.name}</Badge>)}
          {functions.map(f => <Badge key={f.id} variant="function">{f.ref}: {f.name}</Badge>)}
          <Badge variant={uc.type === 'solo' ? 'default' : 'tool'}>{uc.type}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4">{uc.name}</h1>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-wide mb-1">Trigger</p>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">{uc.trigger}</p>
        </div>
      </div>

      {/* Tools */}
      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Tools Required</h2>
        <div className="flex flex-wrap gap-3">
          {tools.map(t => (
            <a key={t.id} href={`/tools/${t.slug}`}
              className="flex items-center gap-2 border border-[var(--card-border)] bg-[var(--card)] rounded-lg px-4 py-2 text-sm hover:bg-[var(--muted-bg)] transition-colors">
              <span className="font-medium text-[var(--foreground)]">{t.name}</span>
              <span className="text-xs text-[var(--muted)]">{t.vendor}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Autonomy levels */}
      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Response at Each Autonomy Level</h2>
        <div className="space-y-3">
          {Object.entries(uc.autonomyLevels).map(([level, description]) => (
            <div key={level} className="flex gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
              <AutonomyBadge level={level} className="shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--muted)] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Economic outcome */}
      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Economic Outcome</h2>
        <div className="rounded-xl border border-green-900/30 bg-green-900/10 p-5 mb-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{uc.economicOutcome}</p>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <div className="flex items-start gap-3">
            <Calculator className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--muted)] leading-relaxed font-mono">{uc.economicCalculation}</p>
          </div>
        </div>
      </section>

      {/* Combination upgrade */}
      {uc.combinationUpgrade && (
        <section className="mb-8">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Combination Upgrade</h2>
          <div className="rounded-xl border border-brand-gold/30 bg-brand-gold/5 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--muted)] leading-relaxed">{uc.combinationUpgrade}</p>
            </div>
          </div>
        </section>
      )}

      {/* Related use cases */}
      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Related Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map(r => (
              <UseCaseCard
                key={r.id}
                useCase={r}
                laws={r.laws.map(id => getLawById(id)!).filter(Boolean)}
                functions={r.functions.map(id => getFunctionById(id)!).filter(Boolean)}
                tools={r.tools.map(id => getToolById(id)!).filter(Boolean)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
