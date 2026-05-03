import Link from 'next/link';
import { Tool } from '@/types';
import { Badge } from './ui/Badge';
import { CoverageDot } from './CoverageDot';
import { toolTypeLabels } from '@/lib/content';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="tool">{toolTypeLabels[tool.type] ?? tool.type}</Badge>
          <ArrowRight className="w-4 h-4 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-sm font-sans font-semibold text-[var(--foreground)] mb-0.5">
          {tool.name}
        </h3>
        <p className="text-xs text-[var(--muted)] mb-3">{tool.vendor}</p>
        <p className="text-xs text-[var(--muted)] leading-relaxed mb-4 line-clamp-2">
          {tool.description}
        </p>
        <div className="flex items-center gap-2">
          {tool.functions.map(f => (
            <span key={f.id} className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <CoverageDot level={f.coverage} size="sm" />
              <span className="font-mono">{f.id.toUpperCase()}</span>
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
