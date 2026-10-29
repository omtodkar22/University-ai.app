import React from 'react';
import { AppTheme, SpecForgeView, CyberView } from '../types';
import { ShieldCheck, Cpu, Download, CheckCircle2, Terminal, Globe } from 'lucide-react';

interface HeaderProps {
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  specView: SpecForgeView;
  setSpecView: (v: SpecForgeView) => void;
  cyberView: CyberView;
  setCyberView: (v: CyberView) => void;
  onOpenSignoffModal: () => void;
  onExportReport: () => void;
  onTriggerAttestation: () => void;
  onOpenSearchGrounding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  specView,
  setSpecView,
  cyberView,
  setCyberView,
  onOpenSignoffModal,
  onExportReport,
  onTriggerAttestation,
  onOpenSearchGrounding,
}) => {
  const isSpec = theme === 'specforge';

  return (
    <header className="sticky top-0 z-40 transition-colors duration-200 border-b bg-[#111a2e]/95 backdrop-blur-md border-[rgba(255,255,255,0.08)] text-[#dee2f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setTheme(isSpec ? 'cyber' : 'specforge')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            title="Toggle between Academic Accreditation (SpecForge) and Cybernetic Infrastructure (Cyber-Academic)"
          >
            <div
              className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                isSpec
                  ? 'bg-[#0d7a53]/20 text-[#10b981] border border-[#10b981]/40 glow-emerald'
                  : 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 glow-cyan'
              }`}
            >
              {isSpec ? <ShieldCheck className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-semibold text-base tracking-tight whitespace-nowrap text-[#e0fdff]">
                {isSpec ? 'SpecForge' : 'Cyber-Academic'}
              </span>
              <span
                className={`hidden sm:inline-block ml-2 text-xs font-mono px-1.5 py-0.5 rounded ${
                  isSpec
                    ? 'bg-[#090e1c] text-[#10b981] border border-[#10b981]/30'
                    : 'bg-[#090e1c] text-[#00f2fe] border border-[#00f2fe]/30'
                }`}
              >
                {isSpec ? 'ABET CEAB 2026' : 'TEE·SGX v2.4'}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
          {isSpec ? (
            <>
              <button
                onClick={() => setSpecView('matrix')}
                className={`py-1 whitespace-nowrap transition-colors border-b-2 ${
                  specView === 'matrix'
                    ? 'text-[#10b981] font-bold border-[#10b981]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                Accreditation Matrix
              </button>
              <button
                onClick={() => setSpecView('curriculum')}
                className={`py-1 whitespace-nowrap transition-colors border-b-2 ${
                  specView === 'curriculum'
                    ? 'text-[#10b981] font-bold border-[#10b981]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                Curriculum Graph
              </button>
              <button
                onClick={() => setSpecView('syllabus')}
                className={`py-1 whitespace-nowrap transition-colors border-b-2 ${
                  specView === 'syllabus'
                    ? 'text-[#10b981] font-bold border-[#10b981]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                Syllabus Registry
              </button>
              <button
                onClick={() => setSpecView('audit')}
                className={`py-1 whitespace-nowrap transition-colors border-b-2 ${
                  specView === 'audit'
                    ? 'text-[#10b981] font-bold border-[#10b981]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                Self-Study Report
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCyberView('command')}
                className={`py-1 whitespace-nowrap transition-colors font-mono uppercase tracking-wider text-[11px] border-b-2 ${
                  cyberView === 'command'
                    ? 'text-[#00f2fe] font-bold border-[#00f2fe]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                Command Deck
              </button>
              <button
                onClick={() => setCyberView('telemetry')}
                className={`py-1 whitespace-nowrap transition-colors font-mono uppercase tracking-wider text-[11px] border-b-2 ${
                  cyberView === 'telemetry'
                    ? 'text-[#00f2fe] font-bold border-[#00f2fe]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                Telemetry Stream
              </button>
              <button
                onClick={() => setCyberView('invariants')}
                className={`py-1 whitespace-nowrap transition-colors font-mono uppercase tracking-wider text-[11px] border-b-2 ${
                  cyberView === 'invariants'
                    ? 'text-[#00f2fe] font-bold border-[#00f2fe]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                Invariant Matrix
              </button>
              <button
                onClick={() => setCyberView('key_ceremony')}
                className={`py-1 whitespace-nowrap transition-colors font-mono uppercase tracking-wider text-[11px] border-b-2 ${
                  cyberView === 'key_ceremony'
                    ? 'text-[#00f2fe] font-bold border-[#00f2fe]'
                    : 'text-[#849495] border-transparent hover:text-[#dee2f6]'
                }`}
              >
                MPC Quorum & Enclaves
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Actions & Theme Switch */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Google Search Grounding Trigger */}
          <button
            onClick={onOpenSearchGrounding}
            className="px-2.5 py-1 text-xs font-mono rounded transition-colors flex items-center gap-1.5 bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/40 hover:bg-[#00f2fe]/20 glow-cyan whitespace-nowrap"
            title="Search verified live web information with Google Search Grounding"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search Grounding</span>
          </button>

          {/* Switch Design Specification button */}
          <button
            onClick={() => setTheme(isSpec ? 'cyber' : 'specforge')}
            className="px-2.5 py-1 text-xs font-mono rounded transition-colors flex items-center gap-1.5 bg-[#090e1c] text-[#b9cacb] border border-[rgba(255,255,255,0.12)] hover:border-[#00f2fe]/40 hover:text-[#dee2f6] whitespace-nowrap"
            title="Switch between SpecForge and Cyber-Academic modes"
          >
            {isSpec ? (
              <>
                <Cpu className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span className="hidden sm:inline">Mode:</span> Cyber-Tech
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="hidden sm:inline">Mode:</span> SpecForge
              </>
            )}
          </button>

          {isSpec ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onExportReport}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border border-[rgba(255,255,255,0.12)] bg-[#090e1c] text-[#dee2f6] hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                Export 3.1
              </button>
              <button
                onClick={onOpenSignoffModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded bg-[#0d7a53] text-white hover:bg-[#0b6545] transition-colors whitespace-nowrap shadow-xs glow-emerald"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sign Off
              </button>
            </div>
          ) : (
            <button
              onClick={onTriggerAttestation}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe] hover:bg-[#00f2fe]/20 glow-cyan transition-all whitespace-nowrap"
            >
              <Terminal className="w-3.5 h-3.5" />
              Attestation
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
