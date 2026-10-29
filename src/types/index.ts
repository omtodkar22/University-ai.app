export type AppTheme = 'specforge' | 'cyber';

export type SpecForgeView = 'matrix' | 'curriculum' | 'syllabus' | 'audit';
export type CyberView = 'command' | 'telemetry' | 'invariants' | 'key_ceremony';

export type MappingLevel = 'Direct' | 'Reinforced' | 'Unmapped';

export interface CriterionOutcomeMapping {
  level: MappingLevel;
  bloomsLevel: 'Level 1: Remember' | 'Level 2: Understand' | 'Level 3: Apply' | 'Level 4: Analyze' | 'Level 5: Evaluate' | 'Level 6: Synthesize';
  rubric: string;
  benchmark: string;
  artifactFile: string;
  signedBy?: string;
  signDate?: string;
}

export interface Course {
  id: string;
  name: string;
  department: 'ECE' | 'CS' | 'ME' | 'ENGR';
  credits: number;
  lecLabCredits: string; // e.g. "3-3-4"
  term: number; // 1 to 8
  termName: string; // e.g. "Term 5 · Junior Fall"
  prerequisites: string[];
  corequisites?: string[];
  category: 'Engineering Topics' | 'Engineering Design' | 'Math & Basic Science' | 'General Ed' | 'Professional & Ethics';
  status: 'Compliant' | 'In Review' | 'Revision Requested';
  lastAudited: string;
  leadFaculty: string;
  syllabusVersion: string;
  description: string;
  mappings: Record<string, CriterionOutcomeMapping>;
}

export interface AbetCriterion {
  id: string; // e.g. CRIT-1
  code: string; // e.g. SO-1
  shortTitle: string;
  fullTitle: string;
  description: string;
  category: 'Foundational' | 'Design & System' | 'Professional & Ethics' | 'Empirical';
  targetCourseCount: number;
}

export interface AuditSignoff {
  id: string;
  criterionId: string;
  evaluatorName: string;
  evaluatorTitle: string;
  department: string;
  timestamp: string;
  status: 'Approved' | 'Conditional' | 'Pending';
  notes: string;
  signatureHash: string;
}

// Cyber-Academic Console Types
export interface TelemetryLog {
  id: number;
  timestamp: string;
  subsystem: 'CONSENSUS' | 'ZK_SNARK' | 'BLS_SIG' | 'ENCLAVE_SGX' | 'MEMPOOL' | 'STATE_TRIE';
  level: 'OPTIMAL' | 'VERIFIED' | 'TELEMETRY' | 'CRITICAL';
  message: string;
  hash: string;
  latencyUs: number;
}

export interface InvariantRule {
  id: string; // e.g. INV-01
  code: string;
  name: string;
  formalExpression: string;
  category: 'Consensus Integrity' | 'Zero-Knowledge Bounds' | 'Cryptographic Quorum' | 'Hardware Enclave';
  status: 'Optimal' | 'Verified' | 'Warning' | 'Checking';
  verificationEngine: string;
  lastExecution: string;
  executionTimeMs: number;
  failureRate: string;
  description: string;
}

export interface MPCKeyShare {
  nodeId: string;
  label: string;
  tier: 'Validator Primary' | 'Witness Quorum' | 'Cold Guardian';
  shareIndex: number;
  thresholdWeight: number;
  enclaveModel: string;
  region: string;
  status: 'Synchronized' | 'Attested' | 'Re-Keying';
  lastHeartbeat: string;
  pubKeyPrefix: string;
}
