import Link from 'next/link';
import { Law, ObservabilityFunction } from '@/types';
import { toRoman } from '@/lib/utils';
import { Badge } from './ui/Badge';
import { ArrowRight } from 'lucide-react';

interface LawCardProps {
  law: Law;
  functions: ObservabilityFunction[];
  useCaseCount: number;
}

export function LawCard({ law, functions, useCaseCount }: LawCardProps) {
  return (
    <Link href={`/laws/${law.slug}`} className="group block">
      <div className="relative rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 h-full transition-all duration-200 hover:border-[var(--card-border)] hover:shadow-lg hover:-translate-y-0.5">
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
          style={{ backgroundColor: law.color }}
        />
        <div className="pl-2">
          <div className="flex items-start justify-between mb-3">
            <span
              className="text-3xl font-serif font-bold opacity-20"
              style={{ color: law.color }}
            >
              {toRoman(law.number)}
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
          </div>
          <h3 className="text-base font-sans font-semibold text-[var(--foreground)] mb-2 leading-snug">
            {law.name}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 line-clamp-2">
            {law.statement}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {functions.map(f => (
              <Badge key={f.id} variant="function">{f.ref}</Badge>
            ))}
          </div>
          {useCaseCount > 0 && (
            <p className="text-xs text-[var(--muted)]">
              {useCaseCount} use case{useCaseCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
