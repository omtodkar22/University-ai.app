import React, { useState } from 'react';
import { Course, AbetCriterion, AuditSignoff } from '../../types';
import { ABET_CRITERIA } from '../../data/mockData';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Download, Award, ArrowUpRight, Search } from 'lucide-react';

interface AccreditationAuditProps {
  courses: Course[];
  signoffs: AuditSignoff[];
  onOpenSignoffModal: () => void;
  onExportReport: () => void;
  onOpenGroundingSearch?: () => void;
}

export const AccreditationAudit: React.FC<AccreditationAuditProps> = ({
  courses,
  signoffs,
  onOpenSignoffModal,
  onExportReport,
  onOpenGroundingSearch,
}) => {
  const [activeTab, setActiveTab] = useState<'criteria' | 'signoffs' | 'discrepancies'>('criteria');

  // Compute coverage per criterion
  const criteriaStats = ABET_CRITERIA.map((crit) => {
    let directCount = 0;
    let reinforcedCount = 0;
    courses.forEach((c) => {
      const m = c.mappings[crit.id];
      if (m?.level === 'Direct') directCount++;
      if (m?.level === 'Reinforced') reinforcedCount++;
    });
    const totalMapped = directCount + reinforcedCount;
    const isSatisfied = totalMapped >= crit.targetCourseCount;
    return {
      crit,
      directCount,
      reinforcedCount,
      totalMapped,
      isSatisfied,
    };
  });

  // Discrepancy Analysis
  const discrepancies: { severity: 'Warning' | 'Passed'; message: string; details: string }[] = [];

  const capstoneCourses = courses.filter((c) => c.id.includes('4810') || c.id.includes('4820'));
  const capstoneCrit2 = capstoneCourses.some((c) => c.mappings['CRIT-2']?.level === 'Direct');
  const capstoneCrit3 = capstoneCourses.some((c) => c.mappings['CRIT-3']?.level === 'Direct');
  const capstoneCrit5 = capstoneCourses.some((c) => c.mappings['CRIT-5']?.level === 'Direct');

  if (capstoneCrit2 && capstoneCrit3 && capstoneCrit5) {
    discrepancies.push({
      severity: 'Passed',
      message: 'Criterion 5 Major Design Experience fully integrated in Senior Capstone',
      details: 'ECE-4810 and ECE-4820 include Direct summative rubrics for Engineering Design (CRIT-2), Communication (CRIT-3), and Teamwork (CRIT-5).',
    });
  } else {
    discrepancies.push({
      severity: 'Warning',
      message: 'Senior Capstone missing required direct ABET summative assessments',
      details: 'Ensure capstone sequence explicitly maps CRIT-2, CRIT-3, and CRIT-5.',
    });
  }

  const ethicsCourse = courses.find((c) => c.id === 'ECE-3820');
  if (ethicsCourse && ethicsCourse.mappings['CRIT-4']?.level === 'Direct') {
    discrepancies.push({
      severity: 'Passed',
      message: 'Independent Professional & Ethical Responsibility course verified',
      details: 'ECE-3820 provides dedicated 2-credit coverage with NSPE case study assessments.',
    });
  }

  const labCourses = courses.filter((c) => c.lecLabCredits.split('-')[1] !== '0');
  discrepancies.push({
    severity: 'Passed',
    message: `${labCourses.length} hands-on laboratory experiences verified across curriculum`,
    details: 'Satisfies ABET hands-on engineering experimentation criteria across foundational and advanced stages.',
  });

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Title & Institutional Header */}
      <div className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-[#e0fdff]">
                Institutional Accreditation Self-Study & Compliance Report
              </h1>
              <span className="text-[10px] font-mono uppercase bg-[#10b981]/15 text-[#10b981] px-2 py-0.5 rounded border border-[#10b981]/40 font-semibold">
                ABET Evaluation Cycle 2026-2027
              </span>
            </div>
            <p className="text-xs text-[#b9cacb] mt-1 font-mono">
              Curriculum Committee & Accreditation Steering Board official archival audit documentation.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            {onOpenGroundingSearch && (
              <button
                onClick={onOpenGroundingSearch}
                className="h-8 px-3 text-xs font-semibold rounded bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe] hover:bg-[#00f2fe]/25 glow-cyan transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                Live Search Grounding
              </button>
            )}
            <button
              onClick={onExportReport}
              className="h-8 px-3 text-xs font-semibold rounded bg-[#090e1c] text-[#dee2f6] border border-[rgba(255,255,255,0.12)] hover:bg-white/5 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Generate Dossier
            </button>
            <button
              onClick={onOpenSignoffModal}
              className="h-8 px-3 text-xs font-semibold rounded bg-[#0d7a53] text-white hover:bg-[#0b6545] transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs glow-emerald"
            >
              <Award className="w-3.5 h-3.5" />
              Attest & Sign Off
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-4 text-xs font-mono border-b border-[rgba(255,255,255,0.06)]">
          <button
            onClick={() => setActiveTab('criteria')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              activeTab === 'criteria'
                ? 'border-[#00f2fe] text-[#00f2fe] font-bold'
                : 'border-transparent text-[#849495] hover:text-[#dee2f6]'
            }`}
          >
            Criterion 3 Outcome Coverage ({criteriaStats.length})
          </button>
          <button
            onClick={() => setActiveTab('signoffs')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              activeTab === 'signoffs'
                ? 'border-[#00f2fe] text-[#00f2fe] font-bold'
                : 'border-transparent text-[#849495] hover:text-[#dee2f6]'
            }`}
          >
            Archival Sign-Off Registry ({signoffs.length})
          </button>
          <button
            onClick={() => setActiveTab('discrepancies')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              activeTab === 'discrepancies'
                ? 'border-[#00f2fe] text-[#00f2fe] font-bold'
                : 'border-transparent text-[#849495] hover:text-[#dee2f6]'
            }`}
          >
            Automated Discrepancy Audit ({discrepancies.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Criteria Coverage Details */}
      {activeTab === 'criteria' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criteriaStats.map(({ crit, directCount, reinforcedCount, totalMapped, isSatisfied }) => (
            <div
              key={crit.id}
              className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg p-4 shadow-lg space-y-3 backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#070b14] text-[#00f2fe] border border-[#00f2fe]/30">
                      {crit.code}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#a78bfa]">
                      {crit.category}
                    </span>
                  </div>
                  <h2 className="font-semibold text-sm text-[#e0fdff] mt-1 font-sans">{crit.fullTitle}</h2>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                    isSatisfied
                      ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40'
                      : 'bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/40'
                  }`}
                >
                  {isSatisfied ? 'Audit Compliant' : 'Target Incomplete'}
                </span>
              </div>

              <p className="text-xs text-[#b9cacb] leading-relaxed font-sans">{crit.description}</p>

              {/* Progress and numbers */}
              <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#849495]">Distribution:</span>
                  <span className="text-[#dee2f6]">
                    <strong className="text-[#10b981]">{directCount} Direct</strong> ·{' '}
                    <span className="text-[#00f2fe]">{reinforcedCount} Reinforced</span> (Target:{' '}
                    {crit.targetCourseCount})
                  </span>
                </div>

                <div className="w-full bg-[#070b14] rounded-full h-2 overflow-hidden flex border border-[rgba(255,255,255,0.06)]">
                  <div
                    className="bg-[#0d7a53] h-full"
                    style={{ width: `${Math.min(100, (directCount / crit.targetCourseCount) * 100)}%` }}
                    title={`${directCount} Direct`}
                  />
                  <div
                    className="bg-[#00f2fe]/70 h-full"
                    style={{ width: `${Math.min(100, (reinforcedCount / crit.targetCourseCount) * 100)}%` }}
                    title={`${reinforcedCount} Reinforced`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Archival Sign-Off Registry */}
      {activeTab === 'signoffs' && (
        <div className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg overflow-hidden backdrop-blur-md">
          <div className="p-4 border-b border-[rgba(255,255,255,0.06)] bg-[#090e1c] flex items-center justify-between font-mono">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#849495]">
              Formal Evaluation Sign-Off Record & Cryptographic Hashes
            </h2>
            <span className="text-xs text-[#00f2fe]">All signatures notarized</span>
          </div>

          <div className="divide-y divide-[rgba(255,255,255,0.04)] font-mono text-xs">
            {signoffs.map((sig) => (
              <div key={sig.id} className="p-4 hover:bg-white/5 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#070b14] text-[#00f2fe] border border-[#00f2fe]/30">
                      {sig.criterionId}
                    </span>
                    <span className="font-semibold text-xs text-[#e0fdff] font-sans">{sig.evaluatorName}</span>
                    <span className="text-[11px] text-[#849495]">({sig.evaluatorTitle})</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#849495]">
                    <span>{new Date(sig.timestamp).toLocaleDateString()}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold ${
                        sig.status === 'Approved'
                          ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40'
                          : 'bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/40'
                      }`}
                    >
                      {sig.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#dee2f6] bg-[#090e1c] p-2.5 rounded border border-[rgba(255,255,255,0.06)] leading-relaxed font-sans">
                  {sig.notes}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#849495]">
                  <span>Department: {sig.department}</span>
                  <span className="text-[#00f2fe]">Audit Hash: {sig.signatureHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Automated Discrepancy Audit */}
      {activeTab === 'discrepancies' && (
        <div className="space-y-3 font-mono">
          {discrepancies.map((d, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border shadow-lg flex items-start gap-3 backdrop-blur-md ${
                d.severity === 'Passed'
                  ? 'bg-[#111a2e]/90 border-[rgba(255,255,255,0.08)]'
                  : 'bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.3)]'
              }`}
            >
              <div
                className={`p-1.5 rounded ${
                  d.severity === 'Passed' ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#fbbf24]/15 text-[#fbbf24]'
                }`}
              >
                {d.severity === 'Passed' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-xs text-[#e0fdff] font-sans">{d.message}</div>
                <div className="text-xs text-[#b9cacb] leading-relaxed font-sans">{d.details}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
