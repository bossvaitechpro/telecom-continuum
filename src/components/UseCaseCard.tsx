import Link from 'next/link';
import { UseCase, Law, ObservabilityFunction, Tool } from '@/types'; // Tool kept for interface
import { Badge } from './ui/Badge';
import { AutonomyBadge } from './AutononomyBadge';
import { toRoman } from '@/lib/utils';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface UseCaseCardProps {
  useCase: UseCase;
  laws: Law[];
  functions: ObservabilityFunction[];
  tools: Tool[];
}

// tools is accepted for API consistency but not rendered on the card
export function UseCaseCard({ useCase, laws, functions }: UseCaseCardProps) {
  return (
    <Link href={`/use-cases/${useCase.slug}`} className="group block">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-wrap gap-1.5">
            {laws.map(l => (
              <Badge key={l.id} variant="law">Law {toRoman(l.number)}</Badge>
            ))}
            {functions.map(f => (
              <Badge key={f.id} variant="function">{f.ref}</Badge>
            ))}
            <Badge variant={useCase.type === 'solo' ? 'default' : 'tool'}>
              {useCase.type}
            </Badge>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
        </div>
        <h3 className="text-sm font-sans font-semibold text-[var(--foreground)] mb-2 leading-snug">
          {useCase.name}
        </h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed mb-3 line-clamp-2">
          {useCase.trigger}
        </p>
        <div className="flex items-center gap-1.5 mb-3">
          {Object.keys(useCase.autonomyLevels).map(level => (
            <AutonomyBadge key={level} level={level} />
          ))}
        </div>
        <div className="flex items-start gap-1.5 text-xs text-green-500">
          <TrendingUp className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span className="leading-relaxed line-clamp-1">{useCase.economicOutcome}</span>
        </div>
      </div>
    </Link>
  );
}
