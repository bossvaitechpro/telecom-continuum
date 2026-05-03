import Link from 'next/link';
import { ObservabilityFunction, Law } from '@/types';
import { Badge } from './ui/Badge';
import { CoverageDot } from './CoverageDot';
import { ArrowRight } from 'lucide-react';

interface FunctionCardProps {
  fn: ObservabilityFunction;
  laws: Law[];
}

export function FunctionCard({ fn, laws }: FunctionCardProps) {
  return (
    <Link href={`/functions/${fn.slug}`} className="group block">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-mono font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: fn.color + '22', color: fn.color }}
            >
              {fn.ref}
            </span>
            <Badge variant={fn.type === 'mandatory' ? 'mandatory' : 'conditional'}>
              {fn.type}
            </Badge>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-sm font-sans font-semibold text-[var(--foreground)] mb-2 leading-snug">
          {fn.name}
        </h3>
        <p className="text-xs text-[var(--muted)] italic leading-relaxed mb-3 line-clamp-2">
          {fn.question}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {laws.map(l => (
            <Badge key={l.id} variant="law">Law {['I','II','III','IV','V','VI'][l.number - 1]}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <CoverageDot level={fn.toolCoverage['active-monitoring'] ?? 'none'} size="sm" />
          <CoverageDot level={fn.toolCoverage['passive-probe'] ?? 'none'} size="sm" />
          <CoverageDot level={fn.toolCoverage['drive-test'] ?? 'none'} size="sm" />
          <CoverageDot level={fn.toolCoverage['crowdsourced'] ?? 'none'} size="sm" />
          <CoverageDot level={fn.toolCoverage['cem'] ?? 'none'} size="sm" />
        </div>
      </div>
    </Link>
  );
}
