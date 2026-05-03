import type { Metadata } from "next";
import { allTools, toolTypeLabels } from "@/lib/content";
import { ToolCard } from "@/components/ToolCard";
import type { ToolType } from "@/types";

export const metadata: Metadata = {
  title: "Tool Landscape",
  description: "Five tool categories mapped to the ten observability functions, with full/partial/none coverage indicators.",
};

const toolTypes: ToolType[] = ["active-monitoring", "passive-probe", "drive-test", "crowdsourced", "hybrid"];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Framework</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-3">Tool Landscape</h1>
        <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl">
          Tools are mapped to functions with full, partial, or no coverage. No single tool covers all functions. The combination of active and passive instruments is required to achieve complete observability.
        </p>
      </div>

      {toolTypes.map(type => {
        const tools = allTools.filter(t => t.type === type);
        if (!tools.length) return null;
        return (
          <div key={type} className="mb-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] mb-4 border-b border-[var(--card-border)] pb-2">
              {toolTypeLabels[type]}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
