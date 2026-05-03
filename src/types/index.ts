export type CoverageLevel = 'full' | 'partial' | 'none';
export type FunctionType = 'mandatory' | 'conditional';
export type ToolType = 'active-monitoring' | 'passive-probe' | 'drive-test' | 'crowdsourced' | 'hybrid';
export type UseCaseType = 'solo' | 'combination';
export type AutononomyLevel = 'L1' | 'L2' | 'L3' | 'L4';
export type Dimension = 'quality' | 'cost' | 'revenue' | 'security' | 'compliance' | 'ecosystem';

export interface Law {
  id: string;
  number: number;
  name: string;
  statement: string;
  corollary: string;
  dimension: string;
  derivedFunctions: string[];
  color: string;
  mechanism: string;
  atL4: string;
  slug: string;
  relatedPredictions: string[];
}

export interface ObservabilityFunction {
  id: string;
  ref: string;
  name: string;
  type: FunctionType;
  dimension: Dimension;
  lawAnchors: string[];
  question: string;
  ifAbsent: string;
  atL4Role: string;
  atL4: string;
  color: string;
  slug: string;
  toolCoverage: Record<string, CoverageLevel>;
}

export interface ToolFunction {
  id: string;
  coverage: CoverageLevel;
}

export interface Tool {
  id: string;
  name: string;
  vendor: string;
  type: ToolType;
  description: string;
  howItWorks: string;
  functions: ToolFunction[];
  laws: string[];
  slug: string;
  dateAdded: string;
}

export interface UseCase {
  id: string;
  name: string;
  trigger: string;
  type: UseCaseType;
  laws: string[];
  functions: string[];
  tools: string[];
  autonomyLevels: Record<string, string>;
  economicOutcome: string;
  economicCalculation: string;
  combinationUpgrade: string;
  slug: string;
  dateAdded: string;
}

export interface SearchItem {
  id: string;
  type: 'law' | 'function' | 'tool' | 'use-case';
  title: string;
  subtitle: string;
  slug: string;
  href: string;
}
