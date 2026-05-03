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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Framework</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-3">The Ten Observability Functions</h1>
        <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl">
          Each function is a theoretically necessary consequence of one or more laws. Mandatory functions must be covered by every operator. Conditional functions are required under specific operational conditions.
        </p>
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
