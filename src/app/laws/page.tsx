import type { Metadata } from "next";
import { allLaws, getFunctionsForLaw, getUseCasesForLaw } from "@/lib/content";
import { LawCard } from "@/components/LawCard";

export const metadata: Metadata = {
  title: "The Six Laws",
  description: "Six economic laws govern every mobile network operator. Each law anchors one or more observability functions.",
};

export default function LawsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Framework</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-3">The Six Laws</h1>
        <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl">
          These laws are not regulations or standards. They are invariants — structural conditions of the telecom economy that hold across generations, geographies, and operators. Each law derives one or more observability functions that are theoretically necessary consequences.
        </p>
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
  );
}
