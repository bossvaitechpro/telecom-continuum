'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, X, Scale, Activity, Wrench, BookOpen } from 'lucide-react';
import { getAllSearchItems } from '@/lib/content';
import type { SearchItem } from '@/types';

const typeIcons = {
  law: Scale,
  function: Activity,
  tool: Wrench,
  'use-case': BookOpen,
};

const typeLabels = {
  law: 'Law',
  function: 'Function',
  tool: 'Tool',
  'use-case': 'Use Case',
};

export function QuickJump() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const items: SearchItem[] = getAllSearchItems();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filtered = query.length > 0
    ? items.filter(i =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : items.slice(0, 12);

  function handleSelect(item: SearchItem) {
    router.push(item.href);
    setOpen(false);
    setQuery('');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-brand-blue text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors text-sm font-sans font-medium"
        aria-label="Quick Jump"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Quick Jump</span>
        <kbd className="hidden sm:inline text-xs bg-white/20 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xl bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-2xl overflow-hidden">
            <Command className="w-full" shouldFilter={false}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--card-border)]">
                <Search className="w-4 h-4 text-[var(--muted)] shrink-0" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search laws, functions, tools, use cases..."
                  className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none"
                  autoFocus
                />
                <button onClick={() => setOpen(false)}>
                  <X className="w-4 h-4 text-[var(--muted)] hover:text-[var(--foreground)]" />
                </button>
              </div>
              <Command.List className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <Command.Empty className="py-8 text-center text-sm text-[var(--muted)]">
                    No results found.
                  </Command.Empty>
                )}
                {filtered.map(item => {
                  const Icon = typeIcons[item.type];
                  return (
                    <Command.Item
                      key={item.id}
                      value={item.id}
                      onSelect={() => handleSelect(item)}
                      className="flex items-start gap-3 px-4 py-2.5 cursor-pointer hover:bg-[var(--muted-bg)] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[var(--foreground)] truncate">{item.title}</span>
                          <span className="text-xs text-[var(--muted)] shrink-0">{typeLabels[item.type]}</span>
                        </div>
                        <p className="text-xs text-[var(--muted)] truncate mt-0.5">{item.subtitle}</p>
                      </div>
                    </Command.Item>
                  );
                })}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
