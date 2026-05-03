import { CoverageLevel } from '@/types';
import { cn } from '@/lib/utils';

interface CoverageDotProps {
  level: CoverageLevel;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export function CoverageDot({ level, size = 'md', showLabel = false }: CoverageDotProps) {
  const dotMap = {
    full: { symbol: '●', label: 'Full', color: 'text-green-500' },
    partial: { symbol: '◑', label: 'Partial', color: 'text-amber-500' },
    none: { symbol: '○', label: 'None', color: 'text-[var(--muted)]' },
  };
  const { symbol, label, color } = dotMap[level];
  const sizeClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className={cn('inline-flex items-center gap-1', sizeClass, color)}>
      <span>{symbol}</span>
      {showLabel && <span className="text-[var(--muted)] text-xs">{label}</span>}
    </span>
  );
}
