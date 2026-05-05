'use client';

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { allUseCases, allLaws, allFunctions, getLawById, getFunctionById, getToolById } from "@/lib/content";
import { UseCaseCard } from "@/components/UseCaseCard";
import { Badge } from "@/components/ui/Badge";
import { toRoman } from "@/lib/utils";
import { Search, X, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

export default function UseCasesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedLaws, setSelectedLaws] = useState<string[]>(searchParams.getAll("law"));
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(searchParams.getAll("fn"));
  const [selectedTools, setSelectedTools] = useState<string[]>(searchParams.getAll("tool"));
  const [selectedLevels, setSelectedLevels] = useState<string[]>(searchParams.getAll("level"));
  const [selectedType, setSelectedType] = useState<string>(searchParams.get("type") || "");

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    selectedLaws.forEach(l => params.append("law", l));
    selectedFunctions.forEach(f => params.append("fn", f));
    selectedTools.forEach(t => params.append("tool", t));
    selectedLevels.forEach(l => params.append("level", l));
    if (selectedType) params.set("type", selectedType);
    router.replace(`/use-cases?${params.toString()}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedLaws, selectedFunctions, selectedTools, selectedLevels, selectedType]);

  const filtered = useMemo(() => {
    return allUseCases.filter(uc => {
      if (query && !uc.name.toLowerCase().includes(query.toLowerCase()) &&
          !uc.trigger.toLowerCase().includes(query.toLowerCase())) return false;
      if (selectedLaws.length && !selectedLaws.some(l => uc.laws.includes(l))) return false;
      if (selectedFunctions.length && !selectedFunctions.some(f => uc.functions.includes(f))) return false;
      if (selectedTools.length && !selectedTools.some(t => uc.tools.includes(t))) return false;
      if (selectedLevels.length && !selectedLevels.some(l => Object.keys(uc.autonomyLevels).includes(l))) return false;
      if (selectedType && uc.type !== selectedType) return false;
      return true;
    });
  }, [query, selectedLaws, selectedFunctions, selectedTools, selectedLevels, selectedType]);

  function toggle(arr: string[], set: (v: string[]) => void, val: string) {
    set(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  }

  function clearAll() {
    setQuery(""); setSelectedLaws([]); setSelectedFunctions([]);
    setSelectedTools([]); setSelectedLevels([]); setSelectedType("");
  }

  const hasFilters = query || selectedLaws.length || selectedFunctions.length ||
    selectedTools.length || selectedLevels.length || selectedType;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Framework</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-3">Use Case Library</h1>
        <p className="text-[var(--muted)] text-sm">
          {filtered.length} of {allUseCases.length} use cases
        </p>
      </div>

      {/* Featured: DRF Observability */}
      <Link href="/use-cases/drf-observability" className="block mb-8 group">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 transition-all hover:shadow-lg hover:border-slate-600">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />
          <div className="relative flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Featured Use Case</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                DRF Observability
              </h2>
              <p className="text-slate-300 text-sm mb-3 max-w-2xl">
                Strategic framework for testing and monitoring the Data Roaming Function (DRF) — 
                a GTP proxy that processes billable roaming transactions. Features 243 test cases 
                categorized by revenue risk across Evolver, nScan, and ANTS.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <span>Explore framework</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Filter bar */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 mb-8 space-y-4">
        <div className="flex items-center gap-2 border border-[var(--card-border)] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-[var(--muted)] shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search use cases..."
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none"
          />
          {query && <button onClick={() => setQuery("")}><X className="w-3.5 h-3.5 text-[var(--muted)]" /></button>}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-[var(--muted)] self-center mr-1">Laws:</span>
          {allLaws.map(l => (
            <button key={l.id} onClick={() => toggle(selectedLaws, setSelectedLaws, l.id)}>
              <Badge variant={selectedLaws.includes(l.id) ? 'law' : 'default'}>
                Law {toRoman(l.number)}
              </Badge>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-[var(--muted)] self-center mr-1">Functions:</span>
          {allFunctions.map(f => (
            <button key={f.id} onClick={() => toggle(selectedFunctions, setSelectedFunctions, f.id)}>
              <Badge variant={selectedFunctions.includes(f.id) ? 'function' : 'default'}>{f.ref}</Badge>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-[var(--muted)] self-center mr-1">Autonomy:</span>
          {['L1','L2','L3','L4'].map(l => (
            <button key={l} onClick={() => toggle(selectedLevels, setSelectedLevels, l)}>
              <Badge variant={selectedLevels.includes(l) ? 'autonomy' : 'default'}>{l}</Badge>
            </button>
          ))}
          <span className="text-xs text-[var(--muted)] self-center ml-2 mr-1">Type:</span>
          {['solo','combination'].map(t => (
            <button key={t} onClick={() => setSelectedType(selectedType === t ? '' : t)}>
              <Badge variant={selectedType === t ? 'tool' : 'default'}>{t}</Badge>
            </button>
          ))}
        </div>

        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1">
            <X className="w-3 h-3" /> Clear all filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-sm">No use cases match your filters.</p>
          <button onClick={clearAll} className="text-xs text-brand-blue mt-2 hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(uc => (
            <UseCaseCard
              key={uc.id}
              useCase={uc}
              laws={uc.laws.map(id => getLawById(id)!).filter(Boolean)}
              functions={uc.functions.map(id => getFunctionById(id)!).filter(Boolean)}
              tools={uc.tools.map(id => getToolById(id)!).filter(Boolean)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
