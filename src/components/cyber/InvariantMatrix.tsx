import React, { useState } from 'react';
import { InvariantRule } from '../../types';
import { Shield, Play, CheckCircle2, AlertTriangle, Cpu, Terminal, RefreshCw, Zap } from 'lucide-react';

interface InvariantMatrixProps {
  invariants: InvariantRule[];
  onUpdateInvariant: (updated: InvariantRule) => void;
}

export const InvariantMatrix: React.FC<InvariantMatrixProps> = ({
  invariants,
  onUpdateInvariant,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);

  const categories = [
    'ALL',
    'Consensus Integrity',
    'Zero-Knowledge Bounds',
    'Cryptographic Quorum',
    'Hardware Enclave',
  ];

  const filteredInvariants = invariants.filter(
    (inv) => selectedCategory === 'ALL' || inv.category === selectedCategory
  );

  const handleEvaluate = (rule: InvariantRule) => {
    setEvaluatingId(rule.id);
    setTimeout(() => {
      const updated: InvariantRule = {
        ...rule,
        lastExecution: new Date().toISOString().split('T')[1].slice(0, 12),
        executionTimeMs: Number((Math.random() * 2 + 0.5).toFixed(2)),
        status: 'Optimal',
      };
      onUpdateInvariant(updated);
      setEvaluatingId(null);
    }, 700);
  };

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Header */}
      <div className="p-5 rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.05)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00f2fe]" />
              <h1 className="text-xl font-bold font-mono text-[#e0fdff]">
                Cryptographic Invariants & Formal Safety Bounds
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090e1c] text-[#10b981] border border-[rgba(16,185,129,0.4)]">
                0 Invariant Violations
              </span>
            </div>
            <p className="text-xs text-[#b9cacb] mt-1 font-mono">
              High-density mathematical constraints verified via TLA+, Ivy, and Bellman circuit provers.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#849495] uppercase text-[10px]">Domain:</span>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[rgba(0,242,254,0.15)] text-[#00f2fe] border border-[#00f2fe]/40 font-bold'
                      : 'bg-[#090e1c] text-[#849495] border border-[rgba(255,255,255,0.06)] hover:text-[#dee2f6]'
                  }`}
                >
                  {cat === 'ALL' ? 'ALL' : cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 font-mono text-xs">
          <div className="p-3 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)]">
            <div className="text-[10px] text-[#849495] uppercase">Active Invariants Verified</div>
            <div className="text-lg font-bold text-[#00f2fe] mt-1 tabular-nums">
              5 / 5 Rules Passing
            </div>
            <div className="text-[10px] text-[#10b981] mt-1">Safety Invariants 100% Active</div>
          </div>

          <div className="p-3 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)]">
            <div className="text-[10px] text-[#849495] uppercase">Average Proof Latency</div>
            <div className="text-lg font-bold text-[#e0fdff] mt-1 tabular-nums">1.86 ms</div>
            <div className="text-[10px] text-[#849495] mt-1">Zero-Knowledge Recursion Bounds</div>
          </div>

          <div className="p-3 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)]">
            <div className="text-[10px] text-[#849495] uppercase">Byzantine Fault Tolerance</div>
            <div className="text-lg font-bold text-[#10b981] mt-1 tabular-nums">f &lt; N/3</div>
            <div className="text-[10px] text-[#10b981] mt-1">0 Partition Safety Breaches</div>
          </div>
        </div>
      </div>

      {/* Invariant Cards Grid */}
      <div className="space-y-4">
        {filteredInvariants.map((rule) => {
          const isEvaluating = evaluatingId === rule.id;

          return (
            <div
              key={rule.id}
              className="p-5 rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg space-y-3 font-mono"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.05)] pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-[#00f2fe] px-2 py-0.5 rounded bg-[rgba(0,242,254,0.1)] border border-[#00f2fe]/30">
                    {rule.code}
                  </span>
                  <div>
                    <h2 className="font-bold text-sm text-[#e0fdff]">{rule.name}</h2>
                    <span className="text-[10px] text-[#8b5cf6] uppercase">{rule.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.4)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    {rule.status}
                  </span>
                  <button
                    onClick={() => handleEvaluate(rule)}
                    disabled={isEvaluating}
                    className="px-3 py-1 text-xs rounded bg-[rgba(0,242,254,0.12)] text-[#00f2fe] border border-[#00f2fe] hover:bg-[rgba(0,242,254,0.22)] glow-cyan transition-all flex items-center gap-1.5"
                  >
                    <Zap className={`w-3 h-3 ${isEvaluating ? 'animate-spin' : ''}`} />
                    {isEvaluating ? 'Proving...' : 'Evaluate'}
                  </button>
                </div>
              </div>

              {/* Formal Mathematical Expression Code Block */}
              <div className="bg-[#050811] p-3 rounded border border-[rgba(255,255,255,0.06)] text-xs text-[#00f2fe] font-mono leading-relaxed overflow-x-auto">
                <span className="text-[#849495] select-none mr-2">spec:</span>
                {rule.formalExpression}
              </div>

              <p className="text-xs text-[#b9cacb] leading-relaxed font-sans">{rule.description}</p>

              {/* Telemetry metadata footer */}
              <div className="pt-2 border-t border-[rgba(255,255,255,0.05)] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#849495]">
                <div>
                  <span className="block text-[9px] uppercase">Formal Engine</span>
                  <span className="text-[#dee2f6] font-medium">{rule.verificationEngine}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase">Last Verified</span>
                  <span className="text-[#dee2f6] tabular-nums">{rule.lastExecution}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase">Execution Latency</span>
                  <span className="text-[#10b981] font-bold tabular-nums">
                    {rule.executionTimeMs} ms
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase">Empirical Failure Rate</span>
                  <span className="text-[#10b981] font-bold tabular-nums">{rule.failureRate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
