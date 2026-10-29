import React, { useState, useEffect } from 'react';
import { TelemetryLog } from '../../types';
import { Play, Pause, RefreshCw, Search, Terminal, Filter, Shield, Cpu } from 'lucide-react';

interface TelemetryInspectorProps {
  logs: TelemetryLog[];
  onAddLog: (newLog: TelemetryLog) => void;
}

export const TelemetryInspector: React.FC<TelemetryInspectorProps> = ({
  logs,
  onAddLog,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLogId, setActiveLogId] = useState<number | null>(logs[0]?.id || null);

  // Simulated live event generation when isPlaying
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const subsystems: TelemetryLog['subsystem'][] = ['CONSENSUS', 'ZK_SNARK', 'BLS_SIG', 'ENCLAVE_SGX', 'STATE_TRIE', 'MEMPOOL'];
      const levels: TelemetryLog['level'][] = ['OPTIMAL', 'VERIFIED', 'TELEMETRY'];
      const chosenSub = subsystems[Math.floor(Math.random() * subsystems.length)];
      const chosenLvl = levels[Math.floor(Math.random() * levels.length)];
      const now = new Date();
      const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const randomHash = '0x' + Math.random().toString(16).substring(2, 18);
      const latency = Math.floor(Math.random() * 900) + 120;

      const messages: Record<TelemetryLog['subsystem'], string[]> = {
        CONSENSUS: [
          'Epoch commitment finalized. Byzantine validator quorum signature validated.',
          'Raft leader heartbeat acknowledged across 7 regions with 0 packet drops.',
          'Mempool batch 184 packed into merkle block header.',
        ],
        ZK_SNARK: [
          'Plonk constraint system verification passed: zero witness leak.',
          'Groth16 polynomial division evaluation verified in 1.42ms.',
          'CRS non-interactive zero-knowledge bounds enforced.',
        ],
        BLS_SIG: [
          'BLS12-381 threshold point scalar multiplication verified.',
          'Aggregated public key signature verified over elliptic curve G2.',
        ],
        ENCLAVE_SGX: [
          'SGX2 Enclave attestation quote matches target MRENCLAVE hash.',
          'Constant-time cache instruction pipeline verified under stress.',
        ],
        STATE_TRIE: [
          'State root transition committed: Merkle trie depth 14 levels intact.',
          'Account balance delta verified against cryptographic balance leaf.',
        ],
        MEMPOOL: [
          'Mempool prioritized transaction queue re-indexed by gas auction order.',
          'Nonce monotonicity check succeeded for 42 account state slots.',
        ],
      };

      const msgList = messages[chosenSub];
      const msg = msgList[Math.floor(Math.random() * msgList.length)];

      const newLog: TelemetryLog = {
        id: Date.now(),
        timestamp: timeStr,
        subsystem: chosenSub,
        level: chosenLvl,
        message: msg,
        hash: randomHash,
        latencyUs: latency,
      };

      onAddLog(newLog);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, onAddLog]);

  const filteredLogs = logs.filter((log) => {
    const matchesSub = selectedSubsystem === 'ALL' || log.subsystem === selectedSubsystem;
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.subsystem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesSearch;
  });

  const selectedLog = logs.find((l) => l.id === activeLogId);

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Control Deck */}
      <div className="p-5 rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.05)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#00f2fe]" />
              <h1 className="text-xl font-bold font-mono text-[#e0fdff]">
                Live Runtime Telemetry & Trace Inspector
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090e1c] text-[#00f2fe] border border-[#00f2fe]/30">
                {filteredLogs.length} Events Cached
              </span>
            </div>
            <p className="text-xs text-[#b9cacb] mt-1 font-mono">
              Line-numbered asynchronous trace stream for distributed state transitions and hardware enclaves.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`h-8 px-3 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPlaying
                  ? 'bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.4)]'
                  : 'bg-[rgba(245,158,11,0.12)] text-[#fbbf24] border border-[rgba(245,158,11,0.4)]'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Live Stream Active' : 'Stream Paused'}
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#849495]" />
            <input
              type="text"
              placeholder="Search traces by message, hash 0x..., or subsystem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 px-2.5 text-xs bg-[#070b14] border border-[rgba(255,255,255,0.08)] rounded text-[#dee2f6] placeholder-[#475569] focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#849495] uppercase text-[10px]">Subsystem:</span>
            <select
              value={selectedSubsystem}
              onChange={(e) => setSelectedSubsystem(e.target.value)}
              className="h-8 px-2 text-xs bg-[#070b14] border border-[rgba(255,255,255,0.08)] rounded text-[#dee2f6] focus:outline-none focus:border-[#00f2fe]"
            >
              <option value="ALL">ALL Subsystems</option>
              <option value="CONSENSUS">CONSENSUS</option>
              <option value="ZK_SNARK">ZK_SNARK</option>
              <option value="BLS_SIG">BLS_SIG</option>
              <option value="ENCLAVE_SGX">ENCLAVE_SGX</option>
              <option value="STATE_TRIE">STATE_TRIE</option>
              <option value="MEMPOOL">MEMPOOL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Terminal Grid: Telemetry log viewer + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Line-numbered Telemetry Console (8 cols) */}
        <div className="lg:col-span-8 rounded-lg bg-[#050811] border border-[rgba(255,255,255,0.08)] shadow-xl overflow-hidden font-mono text-xs">
          <div className="p-3 bg-[#090e1c] border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#849495]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <span>/var/log/consensus_trace.node01.log</span>
            </div>
            <span>ANSI UTF-8 · Monospace</span>
          </div>

          <div className="max-h-[560px] overflow-y-auto divide-y divide-[rgba(255,255,255,0.03)] scanline-bg">
            {filteredLogs.map((log, index) => {
              const isSelected = activeLogId === log.id;
              const isFirst = index === 0;

              return (
                <div
                  key={log.id}
                  onClick={() => setActiveLogId(log.id)}
                  className={`py-2 px-3 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[rgba(0,242,254,0.1)] border-l-2 border-l-[#00f2fe]'
                      : isFirst
                      ? 'bg-[rgba(0,242,254,0.03)] hover:bg-[rgba(0,242,254,0.06)]'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Line Number */}
                  <span className="text-[rgba(255,255,255,0.25)] select-none w-10 text-right shrink-0 text-[11px]">
                    {index + 1}
                  </span>

                  {/* Timestamp */}
                  <span className="text-[#849495] shrink-0 text-[11px]">{log.timestamp}</span>

                  {/* Subsystem */}
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

                  {/* Log message */}
                  <div className="flex-1 text-[#dee2f6] leading-relaxed break-all">
                    {log.message}
                  </div>

                  {/* Latency */}
                  <span className="text-[#849495] text-[10px] shrink-0 font-mono">
                    {log.latencyUs}µs
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trace Packet Inspector (4 cols) */}
        <div className="lg:col-span-4 rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#00f2fe]">
              Trace Inspector
            </h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#090e1c] text-[#849495] border border-[rgba(255,255,255,0.06)]">
              Payload Analysis
            </span>
          </div>

          {selectedLog ? (
            <div className="space-y-3.5">
              <div className="p-3 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)] space-y-2">
                <div className="text-[10px] text-[#849495] uppercase tracking-wider">
                  Cryptographic Hash
                </div>
                <div className="text-[#00f2fe] text-xs font-bold break-all select-all">
                  {selectedLog.hash}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[#849495] uppercase tracking-wider block mb-1">
                  Subsystem & Status
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[rgba(0,242,254,0.12)] text-[#00f2fe] border border-[#00f2fe]/40 font-bold">
                    {selectedLog.subsystem}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.4)] font-bold">
                    {selectedLog.level}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[#849495] uppercase tracking-wider block mb-1">
                  Full Payload Message
                </span>
                <div className="p-2.5 rounded bg-[#070b14] border border-[rgba(255,255,255,0.06)] text-[#dee2f6] leading-relaxed text-xs">
                  {selectedLog.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[9px] text-[#849495] block uppercase">Execution Latency</span>
                  <span className="text-[#10b981] font-bold tabular-nums">
                    {selectedLog.latencyUs} microseconds
                  </span>
                </div>
                <div className="p-2 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[9px] text-[#849495] block uppercase">Capture Time</span>
                  <span className="text-[#dee2f6] tabular-nums">{selectedLog.timestamp}</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#090e1c] border border-[rgba(0,242,254,0.2)] text-[11px] text-[#b9cacb] leading-relaxed">
                Deterministic trace integrity verified. State trie transition confirmed by node alpha-01.
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#849495]">
              Select any trace in the left log stream to inspect its cryptographic payload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
