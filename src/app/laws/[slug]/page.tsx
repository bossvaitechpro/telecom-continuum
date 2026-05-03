import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allLaws, getLawBySlug, getFunctionsForLaw, getUseCasesForLaw, getLawById, getFunctionById, getToolById } from "@/lib/content";
import { RelationshipTrail } from "@/components/RelationshipTrail";
import { FunctionCard } from "@/components/FunctionCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import { Badge } from "@/components/ui/Badge";
import { toRoman } from "@/lib/utils";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allLaws.map(l => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const law = getLawBySlug(params.slug);
  if (!law) return {};
  return {
    title: `Law ${toRoman(law.number)}: ${law.name}`,
    description: law.statement,
  };
}

export default function LawDetailPage({ params }: Props) {
  const law = getLawBySlug(params.slug);
  if (!law) notFound();

  const functions = getFunctionsForLaw(law.id);
  const useCases = getUseCasesForLaw(law.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RelationshipTrail items={[
        { label: "Laws", href: "/laws" },
        { label: `Law ${toRoman(law.number)}: ${law.name}`, href: `/laws/${law.slug}` },
      ]} />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-5xl font-serif font-bold opacity-30"
            style={{ color: law.color }}
          >
            {toRoman(law.number)}
          </span>
          <Badge variant="law">Law {toRoman(law.number)}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4">{law.name}</h1>
        <p className="text-lg text-[var(--foreground)] leading-relaxed mb-4 font-sans">{law.statement}</p>
        <div className="rounded-lg border-l-4 pl-4 py-2" style={{ borderColor: law.color }}>
          <p className="text-sm text-[var(--muted)] italic">{law.corollary}</p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-3">The Mechanism</h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{law.mechanism}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-3">At L4 — Autonomous Networks</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] leading-relaxed">{law.atL4}</p>
        </div>
      </section>

      {functions.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Derived Functions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {functions.map(fn => (
              <FunctionCard
                key={fn.id}
                fn={fn}
                laws={fn.lawAnchors.map(id => getLawById(id)!).filter(Boolean)}
              />
            ))}
          </div>
        </section>
      )}

      {useCases.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Anchored Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map(uc => (
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
      )}
    </div>
  );
}
