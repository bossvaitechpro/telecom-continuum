import { cn } from '@/lib/utils';

interface AutonomyBadgeProps {
  level: string;
  className?: string;
}

const levelColors: Record<string, string> = {
  L1: 'bg-slate-700/30 text-slate-400 border-slate-700/40',
  L2: 'bg-blue-900/30 text-blue-400 border-blue-800/40',
  L3: 'bg-purple-900/30 text-purple-400 border-purple-800/40',
  L4: 'bg-amber-900/30 text-amber-400 border-amber-800/40',
};

export function AutonomyBadge({ level, className }: AutonomyBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold border',
      levelColors[level] || levelColors.L1,
      className
    )}>
      {level}
    </span>
  );
}
