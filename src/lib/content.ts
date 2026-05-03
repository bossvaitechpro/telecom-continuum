import { Law, ObservabilityFunction, Tool, UseCase, SearchItem } from '@/types';

import lawI from '../../content/laws/law-i.json';
import lawII from '../../content/laws/law-ii.json';
import lawIII from '../../content/laws/law-iii.json';
import lawIV from '../../content/laws/law-iv.json';
import lawV from '../../content/laws/law-v.json';
import lawVI from '../../content/laws/law-vi.json';

import f1 from '../../content/functions/f1.json';
import f2 from '../../content/functions/f2.json';
import f3 from '../../content/functions/f3.json';
import f4 from '../../content/functions/f4.json';
import f5 from '../../content/functions/f5.json';
import f6 from '../../content/functions/f6.json';
import f7 from '../../content/functions/f7.json';
import f8 from '../../content/functions/f8.json';
import f9 from '../../content/functions/f9.json';
import f10 from '../../content/functions/f10.json';

import exfoEvolver from '../../content/tools/exfo-evolver.json';
import radcomAce from '../../content/tools/radcom-ace.json';
import keysightNemo from '../../content/tools/keysight-nemo.json';
import ooklaForNetworks from '../../content/tools/ookla-for-networks.json';
import activePassiveCombination from '../../content/tools/active-passive-combination.json';

import silentCellDegradation from '../../content/use-cases/silent-cell-degradation.json';
import highArpuPreChurn from '../../content/use-cases/high-arpu-pre-churn.json';
import shutdown23g from '../../content/use-cases/2g-3g-shutdown-regression.json';
import competitiveGap from '../../content/use-cases/competitive-gap-detection.json';
import enterpriseSla from '../../content/use-cases/enterprise-sla-breach-prevention.json';
import cellEnergy from '../../content/use-cases/cell-energy-optimisation.json';
import revenueLeakage from '../../content/use-cases/revenue-leakage-identification.json';
import signallingAttack from '../../content/use-cases/signalling-attack-detection.json';
import coverageObligation from '../../content/use-cases/5g-sa-coverage-obligation.json';
import cloudRanHealth from '../../content/use-cases/cloud-ran-vendor-health.json';

export const allLaws: Law[] = [lawI, lawII, lawIII, lawIV, lawV, lawVI] as Law[];

export const allFunctions: ObservabilityFunction[] = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10] as ObservabilityFunction[];

export const allTools: Tool[] = [exfoEvolver, radcomAce, keysightNemo, ooklaForNetworks, activePassiveCombination] as Tool[];

export const allUseCases: UseCase[] = [
  silentCellDegradation, highArpuPreChurn, shutdown23g, competitiveGap,
  enterpriseSla, cellEnergy, revenueLeakage, signallingAttack,
  coverageObligation, cloudRanHealth
] as UseCase[];

export function getLawById(id: string): Law | undefined {
  return allLaws.find(l => l.id === id);
}

export function getLawBySlug(slug: string): Law | undefined {
  return allLaws.find(l => l.slug === slug);
}

export function getFunctionById(id: string): ObservabilityFunction | undefined {
  return allFunctions.find(f => f.id === id);
}

export function getFunctionBySlug(slug: string): ObservabilityFunction | undefined {
  return allFunctions.find(f => f.slug === slug);
}

export function getToolById(id: string): Tool | undefined {
  return allTools.find(t => t.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return allTools.find(t => t.slug === slug);
}

export function getUseCaseById(id: string): UseCase | undefined {
  return allUseCases.find(u => u.id === id);
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return allUseCases.find(u => u.slug === slug);
}

export function getUseCasesForLaw(lawId: string): UseCase[] {
  return allUseCases.filter(u => u.laws.includes(lawId));
}

export function getUseCasesForFunction(functionId: string): UseCase[] {
  return allUseCases.filter(u => u.functions.includes(functionId));
}

export function getUseCasesForTool(toolId: string): UseCase[] {
  return allUseCases.filter(u => u.tools.includes(toolId));
}

export function getToolsForFunction(functionId: string): Tool[] {
  return allTools.filter(t => t.functions.some(f => f.id === functionId));
}

export function getLawsForFunction(functionId: string): Law[] {
  return allLaws.filter(l => l.derivedFunctions.includes(functionId));
}

export function getFunctionsForLaw(lawId: string): ObservabilityFunction[] {
  const law = getLawById(lawId);
  if (!law) return [];
  return law.derivedFunctions.map(id => getFunctionById(id)).filter(Boolean) as ObservabilityFunction[];
}

export function getRecentItems(count = 6) {
  const items = [
    ...allUseCases.map(u => ({ ...u, itemType: 'use-case' as const })),
    ...allTools.map(t => ({ ...t, itemType: 'tool' as const })),
  ];
  return items
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, count);
}

export function getAllSearchItems(): SearchItem[] {
  const items: SearchItem[] = [
    ...allLaws.map(l => ({
      id: l.id, type: 'law' as const,
      title: `Law ${toRoman(l.number)}: ${l.name}`,
      subtitle: l.statement.slice(0, 80) + '...',
      slug: l.slug, href: `/laws/${l.slug}`,
    })),
    ...allFunctions.map(f => ({
      id: f.id, type: 'function' as const,
      title: `${f.ref}: ${f.name}`,
      subtitle: f.question.slice(0, 80) + '...',
      slug: f.slug, href: `/functions/${f.slug}`,
    })),
    ...allTools.map(t => ({
      id: t.id, type: 'tool' as const,
      title: t.name,
      subtitle: t.description.slice(0, 80) + '...',
      slug: t.slug, href: `/tools/${t.slug}`,
    })),
    ...allUseCases.map(u => ({
      id: u.id, type: 'use-case' as const,
      title: u.name,
      subtitle: u.trigger.slice(0, 80) + '...',
      slug: u.slug, href: `/use-cases/${u.slug}`,
    })),
  ];
  return items;
}

export function toRoman(num: number): string {
  const map: [number, string][] = [[6,'VI'],[5,'V'],[4,'IV'],[3,'III'],[2,'II'],[1,'I']];
  for (const [n, r] of map) if (num === n) return r;
  return String(num);
}

export const toolTypeLabels: Record<string, string> = {
  'active-monitoring': 'Active Monitoring',
  'passive-probe': 'Passive Probe',
  'drive-test': 'Drive Test',
  'crowdsourced': 'Crowdsourced',
  'hybrid': 'Hybrid',
};

export const dimensionLabels: Record<string, string> = {
  quality: 'Quality Delivery',
  cost: 'Cost Efficiency',
  revenue: 'Revenue Integrity',
  security: 'Security Resilience',
  compliance: 'Regulatory Compliance',
  ecosystem: 'Ecosystem Dependency',
};
