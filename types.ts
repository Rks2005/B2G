
export enum AppSection {
  OVERVIEW = 'overview',
  ABOUT = 'about',
  GSRE = 'gsre',
  PLM = 'plm',
  GIAE = 'giae',
  IMA = 'ima',
  POLICYWATCH = 'policywatch',
  SETTINGS = 'settings'
}

export interface CountryData {
  id: string;
  name: string;
  region: string;
  gdp: number;
  spi: number;
  innovationScore: number;
  devianceScore: number;
  replicationReadiness: number;
  fundingTotal: number;
  healthcareFunding: number;
  educationFunding: number;
  infrastructureFunding: number;
  energyFunding: number;
  impactScore: number;
  efficiency: number;
  complianceScore: number;
  equityIndex: number;
  policyGaps: number;
  collaborations: number;
  latency: number; // 0-100, lower is better (fast)
}

export interface Node {
  id: string;
  group: number;
  label: string;
  value: number;
  x?: number;
  y?: number;
  z?: number;
}

export interface Link {
  source: string | Node;
  target: string | Node;
  value: number;
}
