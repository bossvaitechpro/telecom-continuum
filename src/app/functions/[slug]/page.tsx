import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allFunctions, getFunctionBySlug, getUseCasesForFunction, getToolsForFunction, getLawById, getFunctionById, getToolById } from "@/lib/content";
import { RelationshipTrail } from "@/components/RelationshipTrail";
import { ToolCard } from "@/components/ToolCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import { Badge } from "@/components/ui/Badge";
import { CoverageDot } from "@/components/CoverageDot";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allFunctions.map(f => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fn = getFunctionBySlug(params.slug);
  if (!fn) return {};
  return { title: `${fn.ref}: ${fn.name}`, description: fn.question };
}

export default function FunctionDetailPage({ params }: Props) {
  const fn = getFunctionBySlug(params.slug);
  if (!fn) notFound();

  const laws = fn.lawAnchors.map(id => getLawById(id)!).filter(Boolean);
  const tools = getToolsForFunction(fn.id);
  const useCases = getUseCasesForFunction(fn.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RelationshipTrail items={[
        { label: "Functions", href: "/functions" },
        { label: `${fn.ref}: ${fn.name}`, href: `/functions/${fn.slug}` },
      ]} />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-2xl font-mono font-bold px-3 py-1 rounded"
            style={{ backgroundColor: fn.color + '22', color: fn.color }}
          >
            {fn.ref}
          </span>
          <Badge variant={fn.type === 'mandatory' ? 'mandatory' : 'conditional'}>{fn.type}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4">{fn.name}</h1>
        <p className="text-base text-[var(--foreground)] italic leading-relaxed mb-4">{fn.question}</p>
        <div className="flex flex-wrap gap-2">
          {laws.map(l => (
            <Badge key={l.id} variant="law">Law {['I','II','III','IV','V','VI'][l.number - 1]}: {l.name}</Badge>
          ))}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-3">If Absent</h2>
        <div className="rounded-xl border border-red-900/30 bg-red-900/10 p-5">
          <p className="text-sm text-[var(--muted)] leading-relaxed">{fn.ifAbsent}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-3">At L4 — Autonomous Networks</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-xs font-mono text-[var(--muted)] mb-2 uppercase tracking-wide">{fn.atL4Role}</p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{fn.atL4}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-3">Tool Coverage</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(fn.toolCoverage).map(([type, level]) => (
            <div key={type} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-center">
              <CoverageDot level={level as 'full' | 'partial' | 'none'} showLabel />
              <p className="text-xs text-[var(--muted)] mt-1 capitalize">{type.replace('-', ' ')}</p>
            </div>
          ))}
        </div>
      </section>

      {tools.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Tools That Serve This Function</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        </section>
      )}

      {useCases.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Use Cases This Function Enables</h2>
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
