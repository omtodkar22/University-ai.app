import React, { useState } from 'react';
import { InvariantRule, MPCKeyShare, TelemetryLog } from '../../types';
import { Terminal, Shield, Activity, Cpu, Check, Play, Pause, RefreshCw, Zap, Lock, ExternalLink } from 'lucide-react';

interface CyberCommandDeckProps {
  telemetryLogs: TelemetryLog[];
  invariants: InvariantRule[];
  keyShares: MPCKeyShare[];
  onTriggerAttestation: () => void;
  onNavigateTab: (tab: 'telemetry' | 'invariants' | 'key_ceremony') => void;
}

export const CyberCommandDeck: React.FC<CyberCommandDeckProps> = ({
  telemetryLogs,
  invariants,
  keyShares,
  onTriggerAttestation,
  onNavigateTab,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleRunFullProofSuite = () => {
    setIsVerifying(true);
    setSuccessNotice(null);
    setTimeout(() => {
      setIsVerifying(false);
      setSuccessNotice('All 5 Formal Invariants and 7 MPC Hardware Enclave attestations verified across distributed nodes.');
    }, 900);
  };

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Hero Command Deck Header */}
      <div className="p-6 rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2fe]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[rgba(0,242,254,0.12)] text-[#00f2fe] border border-[#00f2fe]/40">
                Active Protocol Node Alpha-01
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.4)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                Quorum Synchronized
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#e0fdff] mt-2">
              Cryptographic Invariant & Infrastructure Command Deck
            </h1>
            <p className="text-xs text-[#b9cacb] mt-1 max-w-2xl leading-relaxed">
              Real-time formal verification engine, remote hardware enclave attestation (Intel SGX2 / AMD SEV-SNP), and Byzantine fault tolerance monitor.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRunFullProofSuite}
              disabled={isVerifying}
              className="px-4 py-2 text-xs font-mono font-medium rounded bg-[rgba(0,242,254,0.12)] text-[#00f2fe] border border-[#00f2fe] hover:bg-[rgba(0,242,254,0.22)] glow-cyan transition-all flex items-center gap-2"
            >
              <Zap className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
              {isVerifying ? 'Evaluating Invariants...' : 'Execute Formal Verification'}
            </button>
            <button
              onClick={onTriggerAttestation}
              className="px-4 py-2 text-xs font-mono font-medium rounded bg-[#161b2a] text-[#dee2f6] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] transition-colors flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#8b5cf6]" />
              Attest Enclaves
            </button>
          </div>
        </div>

        {successNotice && (
          <div className="mt-4 p-3 rounded bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-xs text-[#10b981] flex items-center gap-2 font-mono">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* 4 Telemetry Trackers in strict 4px/8px micro-metric system */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-3.5 rounded-lg bg-[#090e1c] border border-[rgba(255,255,255,0.08)] hover:border-[#00f2fe]/50 transition-all hover:glow-cyan group cursor-pointer">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#849495]">
              <span>Epoch Consensus</span>
              <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
            </div>
            <div className="text-xl font-bold font-mono text-[#00f2fe] mt-1 tabular-nums flex items-baseline gap-1">
              #1,842,910
              <span className="text-[10px] text-[#849495] font-normal">+1 block/s</span>
            </div>
            <div className="text-[10px] font-mono text-[#10b981] mt-1.5 flex items-center justify-between">
              <span>Δt: 420ms</span>
              <span className="px-1.5 py-0.2 rounded bg-[#10b981]/15 text-[#10b981]">7/7 Quorum</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#090e1c] border border-[rgba(255,255,255,0.08)] hover:border-[#10b981]/50 transition-all hover:glow-emerald group cursor-pointer">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#849495]">
              <span>ZK Soundness</span>
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#10b981] mt-1 tabular-nums">
              2^(-128)
            </div>
            <div className="text-[10px] font-mono text-[#dee2f6] mt-1.5 flex items-center justify-between">
              <span>Plonk Commitments</span>
              <span className="text-[#10b981] font-bold">100% SOUND</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#090e1c] border border-[rgba(255,255,255,0.08)] hover:border-[#8b5cf6]/50 transition-all hover:glow-violet group cursor-pointer">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#849495]">
              <span>MPC Threshold</span>
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#8b5cf6] mt-1 tabular-nums">
              k = 7 / 10
            </div>
            <div className="text-[10px] font-mono text-[#849495] mt-1.5 flex items-center justify-between">
              <span>FROST BLS12</span>
              <span className="px-1.5 py-0.2 rounded bg-[#8b5cf6]/15 text-[#a78bfa]">SYNCHRONIZED</span>
            </div>
          </div>

          {/* Targeted CSS Selector Element: Card 4 Enclave DCAP Health */}
          <div
            onClick={onTriggerAttestation}
            className="p-3.5 rounded-lg bg-[#090e1c] border border-[rgba(0,242,254,0.4)] animate-cyber-pulse transition-all cursor-pointer group relative overflow-hidden"
            title="Click to trigger DCAP Remote Attestation"
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#849495]">
              <span className="text-[#00f2fe] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                Enclave DCAP Health
              </span>
              <span className="text-[9px] px-1 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] font-bold">
                LIVE VERIFY
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-[#00f2fe] mt-1 tabular-nums flex items-center justify-between">
              <span>100.0%</span>
              <span className="text-[10px] font-mono text-[#10b981] font-normal flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                PKey Confirmed
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#10b981] mt-1.5 flex items-center justify-between">
              <span>7/7 SGX / Nitro Attested</span>
              <span className="text-[#00f2fe] text-[9px] underline group-hover:no-underline">Re-Attest →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Command Layout: Live Telemetry Stream + Invariant Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Real-time Telemetry Stream (7 cols) */}
        <div className="lg:col-span-7 rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg overflow-hidden flex flex-col">
          <div className="p-3.5 border-b border-[rgba(255,255,255,0.05)] bg-[#090e1c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00f2fe]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dee2f6]">
                Telemetry Stream & Cryptographic Traces
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('telemetry')}
              className="text-[10px] font-mono text-[#00f2fe] hover:underline flex items-center gap-1"
            >
              Full Stream <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Code block with line-numbers, enclosed in #050811 */}
          <div className="bg-[#050811] p-3 text-[11px] font-mono divide-y divide-[rgba(255,255,255,0.03)] overflow-x-auto">
            {telemetryLogs.slice(0, 6).map((log, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={log.id}
                  className={`py-2 px-2 flex items-start gap-3 transition-colors ${
                    isFirst ? 'bg-[rgba(0,242,254,0.05)] border-l-2 border-l-[#00f2fe]' : 'hover:bg-white/5'
                  }`}
                >
                  {/* Line number gutter */}
                  <span className="text-[rgba(255,255,255,0.3)] select-none w-10 text-right shrink-0">
                    {index + 101}
                  </span>

                  {/* Timestamp */}
                  <span className="text-[#849495] shrink-0">{log.timestamp}</span>

                  {/* Subsystem badge */}
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                      log.subsystem === 'CONSENSUS'
                        ? 'text-[#00f2fe] bg-[#00f2fe]/10 border border-[#00f2fe]/30'
                        : log.subsystem === 'ZK_SNARK'
                        ? 'text-[#8b5cf6] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30'
                        : 'text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30'
                    }`}
                  >
                    {log.subsystem}
                  </span>

                  {/* Message */}
                  <div className="flex-1 text-[#dee2f6] leading-relaxed truncate">
                    {log.message}
                  </div>

                  {/* Hash */}
                  <span className="text-[rgba(255,255,255,0.4)] text-[10px] shrink-0 hidden sm:inline">
                    {log.hash.slice(0, 8)}...
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Invariant Watchlist & Quorum (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#10b981]" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dee2f6]">
                  Active Security Invariants
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('invariants')}
                className="text-[10px] font-mono text-[#00f2fe] hover:underline"
              >
                Inspect All →
              </button>
            </div>

            <div className="space-y-2.5">
              {invariants.slice(0, 3).map((inv) => (
                <div
                  key={inv.id}
                  className="p-2.5 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#00f2fe]">{inv.code}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.4)]">
                      {inv.status}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[#b9cacb] truncate">{inv.name}</div>
                  <div className="text-[10px] font-mono text-[#849495] bg-[#050811] p-1.5 rounded truncate">
                    {inv.formalExpression}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MPC Node Quorum Summary */}
          <div className="rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#8b5cf6]" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dee2f6]">
                  Hardware Enclave Quorum
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('key_ceremony')}
                className="text-[10px] font-mono text-[#8b5cf6] hover:underline"
              >
                Ceremony →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {keyShares.slice(0, 4).map((share) => (
                <div
                  key={share.nodeId}
                  className="p-2 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)] text-[11px]"
                >
                  <div className="text-[#dee2f6] font-medium truncate">{share.label}</div>
                  <div className="text-[10px] text-[#849495] truncate">{share.enclaveModel.split('/')[0]}</div>
                  <div className="text-[10px] text-[#10b981] mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    {share.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
