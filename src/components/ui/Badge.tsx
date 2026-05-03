import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'mandatory' | 'conditional' | 'law' | 'function' | 'tool' | 'autonomy';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--muted-bg)] text-[var(--foreground)] border border-[var(--card-border)]',
  mandatory: 'bg-red-900/20 text-red-400 border border-red-900/30',
  conditional: 'bg-amber-900/20 text-amber-400 border border-amber-900/30',
  law: 'bg-blue-900/20 text-blue-400 border border-blue-900/30',
  function: 'bg-green-900/20 text-green-400 border border-green-900/30',
  tool: 'bg-purple-900/20 text-purple-400 border border-purple-900/30',
  autonomy: 'bg-[var(--muted-bg)] text-[var(--muted)] border border-[var(--card-border)]',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium',
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  );
}
