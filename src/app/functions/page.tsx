import type { Metadata } from "next";
import { allFunctions, getLawById, dimensionLabels } from "@/lib/content";
import { FunctionCard } from "@/components/FunctionCard";
import type { Dimension } from "@/types";

export const metadata: Metadata = {
  title: "The Ten Observability Functions",
  description: "Ten functions derived from the six laws determine what must be observed in every mobile network.",
};

const dimensions: Dimension[] = ["quality", "cost", "revenue", "security", "compliance", "ecosystem"];

export default function FunctionsPage() {
  const mandatoryCount = allFunctions.filter(f => f.type === "mandatory").length;
  const conditionalCount = allFunctions.filter(f => f.type === "conditional").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Framework</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-3">The Ten Observability Functions</h1>
        <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl">
          Each function is a theoretically necessary consequence of one or more laws. Mandatory functions must be covered by every operator. Conditional functions are required under specific operational conditions.
        </p>
      </div>

      {/* Layered Architecture */}
      <div className="mb-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
        {/* Layer 1 — Economic Laws */}
        <div className="px-6 py-4 bg-brand-gold/10 border-b border-[var(--card-border)]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-0.5">Layer 1 — Foundation</p>
              <p className="text-sm font-sans font-semibold text-[var(--foreground)]">Six Economic Laws</p>
            </div>
            <p className="text-xs text-[var(--muted)] max-w-sm leading-relaxed">
              Structural conditions of every telecom economy — scarcity, inelasticity, stratification, regulation, competition, independence. These are not policy choices; they hold regardless of operator strategy or vendor selection.
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center py-2 border-b border-[var(--card-border)] bg-[var(--background)]">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-px h-3 bg-[var(--card-border)]" />
            <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest px-2">derive</p>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[var(--card-border)]" />
          </div>
        </div>

        {/* Layer 2 — Mandatory */}
        <div className="px-6 py-4 border-b border-[var(--card-border)]">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="shrink-0">
              <p className="text-xs font-mono text-brand-blue uppercase tracking-widest mb-0.5">Layer 2 — Universal requirement</p>
              <p className="text-sm font-sans font-semibold text-[var(--foreground)]">
                Mandatory Functions
                <span className="ml-2 text-xs font-mono font-normal text-[var(--muted)]">×{mandatoryCount}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {allFunctions.filter(f => f.type === "mandatory").map(fn => (
                <span
                  key={fn.id}
                  className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--card-border)]"
                  style={{ color: fn.color, borderColor: fn.color + "44", backgroundColor: fn.color + "11" }}
                >
                  {fn.ref}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
            Required by every operator in every market. The absence of any mandatory function leaves a structural gap in economic visibility — it is not a configuration choice.
          </p>
        </div>

        {/* Layer 3 — Conditional */}
        <div className="px-6 py-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="shrink-0">
              <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-0.5">Layer 3 — Conditional requirement</p>
              <p className="text-sm font-sans font-semibold text-[var(--foreground)]">
                Conditional Functions
                <span className="ml-2 text-xs font-mono font-normal text-[var(--muted)]">×{conditionalCount}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {allFunctions.filter(f => f.type === "conditional").map(fn => (
                <span
                  key={fn.id}
                  className="text-xs font-mono px-2 py-0.5 rounded border border-dashed border-[var(--card-border)]"
                  style={{ color: fn.color, borderColor: fn.color + "44", backgroundColor: fn.color + "0a" }}
                >
                  {fn.ref}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
            Required when specific operational conditions hold — active spectrum competition, enterprise SLA contracts, legacy network transitions, or network sharing agreements. Not universal, but non-optional when triggered.
          </p>
        </div>
      </div>

      {dimensions.map(dim => {
        const fns = allFunctions.filter(f => f.dimension === dim);
        if (!fns.length) return null;
        return (
          <div key={dim} className="mb-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
              {dimensionLabels[dim]}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fns.map(fn => (
                <FunctionCard
                  key={fn.id}
                  fn={fn}
                  laws={fn.lawAnchors.map(id => getLawById(id)!).filter(Boolean)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
