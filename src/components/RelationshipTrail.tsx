import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface TrailItem {
  label: string;
  href: string;
}

interface RelationshipTrailProps {
  items: TrailItem[];
}

export function RelationshipTrail({ items }: RelationshipTrailProps) {
  return (
    <nav className="flex items-center flex-wrap gap-1 text-xs text-[var(--muted)] mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
          <Link
            href={item.href}
            className="hover:text-[var(--foreground)] transition-colors px-1.5 py-0.5 rounded hover:bg-[var(--muted-bg)]"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
