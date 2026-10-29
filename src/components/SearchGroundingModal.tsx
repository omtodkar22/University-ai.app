import React, { useState } from 'react';
import { Search, Globe, ExternalLink, X, Sparkles, Loader2, BookOpen, ShieldCheck, Cpu } from 'lucide-react';

interface SearchGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: 'specforge' | 'cyber';
}

interface GroundingResult {
  text: string;
  sources: { title: string; uri: string }[];
  timestamp: string;
  model: string;
}

export const SearchGroundingModal: React.FC<SearchGroundingModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'cyber',
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'cyber' | 'specforge'>(defaultCategory);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GroundingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleQueries = {
    cyber: [
      'NIST FIPS 203 ML-KEM Post-Quantum Cryptography specifications',
      'Intel SGX DCAP remote attestation quote validation requirements',
      'Groth16 vs Plonk zero knowledge proof verification latency benchmarks',
      'Byzantine fault tolerance 3f+1 network partition recovery',
    ],
    specforge: [
      'ABET 2026-2027 Engineering Accreditation Commission Criterion 3 changes',
      'IEEE Computer Society Curriculum Guidelines for Embedded Systems',
      'CEAB Canadian Engineering Accreditation Board graduate attributes mapping',
      'Bloom taxonomy assessment rubrics for senior engineering design capstone',
    ],
  };

  const handleSearch = async (queryText?: string) => {
    const textToSearch = queryText || query;
    if (!textToSearch.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSearch,
          category,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data: GroundingResult = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error('Grounding search failed:', err);
      setError(err.message || 'Failed to retrieve live grounded data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1d]/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0e1424] border border-[#00f2fe]/30 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-[#dee2f6]">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#090e1c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 flex items-center justify-center glow-cyan">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-mono text-[#e0fdff] flex items-center gap-2">
                Live Google Search Grounding Engine
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe]/30 font-normal">
                  gemini-3.8-flash
                </span>
              </h2>
              <p className="text-[11px] text-[#849495] font-mono">
                Real-time web verified standards, ABET criteria, and cryptographic specifications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#849495] hover:text-[#e0fdff] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs font-mono">
          {/* Category Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#849495] uppercase">Target Domain:</span>
            <div className="flex items-center gap-1 p-0.5 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.08)]">
              <button
                onClick={() => setCategory('cyber')}
                className={`px-3 py-1 rounded text-[11px] transition-all flex items-center gap-1.5 ${
                  category === 'cyber'
                    ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-bold border border-[#00f2fe]/40'
                    : 'text-[#849495] hover:text-[#dee2f6]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Cyber & Cryptographic Specs
              </button>
              <button
                onClick={() => setCategory('specforge')}
                className={`px-3 py-1 rounded text-[11px] transition-all flex items-center gap-1.5 ${
                  category === 'specforge'
                    ? 'bg-[#10b981]/20 text-[#10b981] font-bold border border-[#10b981]/40'
                    : 'text-[#849495] hover:text-[#dee2f6]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                ABET & Curriculum Accreditation
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#849495] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={
                  category === 'cyber'
                    ? 'e.g., NIST Post-Quantum Cryptography FIPS 203 standards...'
                    : 'e.g., ABET Criterion 3 Student Outcomes latest guidelines...'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full h-9 pl-9 pr-3 rounded bg-[#070b14] border border-[rgba(255,255,255,0.12)] text-[#e0fdff] placeholder-[#475569] text-xs focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe]"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isLoading || !query.trim()}
              className="h-9 px-4 rounded bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe] hover:bg-[#00f2fe]/25 glow-cyan transition-all font-bold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? 'Grounding...' : 'Search Web'}</span>
            </button>
          </div>

          {/* Quick Suggestions */}
          <div>
            <div className="text-[10px] text-[#849495] uppercase tracking-wider mb-1.5">
              Suggested Verified Queries:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sampleQueries[category].map((sample) => (
                <button
                  key={sample}
                  onClick={() => {
                    setQuery(sample);
                    handleSearch(sample);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)] text-[#b9cacb] hover:text-[#00f2fe] hover:border-[#00f2fe]/30 transition-colors text-left"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="p-8 rounded bg-[#090e1c] border border-[#00f2fe]/20 text-center space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#00f2fe] mx-auto" />
              <div className="text-xs text-[#00f2fe] font-bold">
                Querying Google Search live index via gemini-3.8-flash...
              </div>
              <div className="text-[11px] text-[#849495]">
                Extracting authoritative citations, web sources, and technical invariants.
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded bg-[rgba(239,68,68,0.1)] border border-[#ef4444]/40 text-[#fca5a5] text-xs">
              <strong>Grounding Error:</strong> {error}
            </div>
          )}

          {/* Search Grounded Result */}
          {result && (
            <div className="p-4 rounded-lg bg-[#090e1c] border border-[rgba(255,255,255,0.08)] space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-2.5">
                <span className="text-[11px] font-bold text-[#10b981] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Google Search Grounded Briefing
                </span>
                <span className="text-[10px] text-[#849495]">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* Main Grounded Text */}
              <div className="text-xs text-[#dee2f6] leading-relaxed whitespace-pre-line font-sans">
                {result.text}
              </div>

              {/* Grounded Web Sources and Citations */}
              {result.sources && result.sources.length > 0 && (
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] space-y-2">
                  <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#00f2fe]" /> Verified Web Grounding Citations:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-2 rounded bg-[#070b14] border border-[rgba(255,255,255,0.06)] hover:border-[#00f2fe]/40 text-[11px] text-[#00f2fe] flex items-center justify-between gap-2 group transition-colors"
                      >
                        <span className="truncate group-hover:underline">{src.title}</span>
                        <ExternalLink className="w-3 h-3 text-[#849495] group-hover:text-[#00f2fe] shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#090e1c] flex items-center justify-between text-[11px] text-[#849495]">
          <span>Grounded with Google Search tool · Real-time index</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border border-[rgba(255,255,255,0.12)] text-[#dee2f6] hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
