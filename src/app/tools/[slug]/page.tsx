import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allTools, getToolBySlug, getUseCasesForTool, getFunctionById, getLawById, getToolById } from "@/lib/content";
import { RelationshipTrail } from "@/components/RelationshipTrail";
import { UseCaseCard } from "@/components/UseCaseCard";
import { Badge } from "@/components/ui/Badge";
import { CoverageDot } from "@/components/CoverageDot";
import { toolTypeLabels } from "@/lib/content";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allTools.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return { title: tool.name, description: tool.description };
}

export default function ToolDetailPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const useCases = getUseCasesForTool(tool.id);
  const soloUseCases = useCases.filter(u => u.type === 'solo');
  const comboUseCases = useCases.filter(u => u.type === 'combination');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RelationshipTrail items={[
        { label: "Tools", href: "/tools" },
        { label: tool.name, href: `/tools/${tool.slug}` },
      ]} />

      <div className="mb-10">
        <Badge variant="tool" className="mb-4">{toolTypeLabels[tool.type]}</Badge>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-1">{tool.name}</h1>
        <p className="text-sm text-[var(--muted)] mb-4">{tool.vendor}</p>
        <p className="text-base text-[var(--foreground)] leading-relaxed">{tool.description}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-3">How It Works</h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{tool.howItWorks}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Functions Served</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tool.functions.map(f => {
            const fn = getFunctionById(f.id);
            if (!fn) return null;
            return (
              <a key={f.id} href={`/functions/${fn.slug}`} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 hover:bg-[var(--muted-bg)] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <CoverageDot level={f.coverage} />
                  <span className="text-xs font-mono font-bold" style={{ color: fn.color }}>{fn.ref}</span>
                </div>
                <p className="text-xs text-[var(--muted)] leading-snug line-clamp-2">{fn.name}</p>
              </a>
            );
          })}
        </div>
      </section>

      {soloUseCases.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Standalone Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {soloUseCases.map(uc => (
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

      {comboUseCases.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Combination Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {comboUseCases.map(uc => (
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
