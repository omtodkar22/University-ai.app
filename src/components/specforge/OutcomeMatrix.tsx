import React, { useState } from 'react';
import { Course, AbetCriterion, MappingLevel } from '../../types';
import { ABET_CRITERIA } from '../../data/mockData';
import { Check, FileText, ChevronRight, Filter, Info, ShieldCheck, Sparkles } from 'lucide-react';

interface OutcomeMatrixProps {
  courses: Course[];
  onUpdateMapping: (courseId: string, criterionId: string, level: MappingLevel) => void;
  onOpenCourseModal: (course: Course) => void;
}

export const OutcomeMatrix: React.FC<OutcomeMatrixProps> = ({
  courses,
  onUpdateMapping,
  onOpenCourseModal,
}) => {
  const [selectedCell, setSelectedCell] = useState<{ courseId: string; critId: string } | null>({
    courseId: 'ECE-4030',
    critId: 'CRIT-2',
  });
  const [filterDept, setFilterDept] = useState<'ALL' | 'ECE' | 'CS' | 'ENGR'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((c) => {
    const matchesDept = filterDept === 'ALL' || c.department === filterDept;
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const selectedCourse = selectedCell
    ? courses.find((c) => c.id === selectedCell.courseId)
    : null;
  const selectedCrit = selectedCell
    ? ABET_CRITERIA.find((cr) => cr.id === selectedCell.critId)
    : null;
  const currentMapping =
    selectedCourse && selectedCell ? selectedCourse.mappings[selectedCell.critId] : null;

  // Calculate totals
  let totalDirect = 0;
  let totalReinforced = 0;
  courses.forEach((c) => {
    Object.values(c.mappings).forEach((m) => {
      if (m.level === 'Direct') totalDirect++;
      if (m.level === 'Reinforced') totalReinforced++;
    });
  });

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Subheader & Metrics Banner */}
      <div className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#e0fdff]">
              Criterion 3 Student Outcome Coverage Matrix
            </h1>
            <span className="text-[10px] font-mono uppercase bg-[#090e1c] text-[#00f2fe] px-2 py-0.5 rounded border border-[#00f2fe]/30">
              ABET Self-Study 2026
            </span>
          </div>
          <p className="text-xs text-[#b9cacb] mt-1 font-mono">
            24×24px mapping node grid displaying longitudinal distribution across ABET SO-1 through SO-7 outcomes.
          </p>
        </div>

        {/* Legend & Stats */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-[2px] bg-[#0d7a53] flex items-center justify-center text-white text-[10px] glow-emerald">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[#dee2f6] font-medium">Direct Assessment</span>
            <span className="font-mono text-[#10b981] font-semibold tabular-nums">({totalDirect})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-[2px] hatch-slate-dark border border-[#00f2fe]/40" />
            <span className="text-[#dee2f6] font-medium">Reinforced / Formative</span>
            <span className="font-mono text-[#00f2fe] font-semibold tabular-nums">({totalReinforced})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-[2px] border border-[rgba(255,255,255,0.15)] bg-[#070b14]" />
            <span className="text-[#849495]">Unmapped</span>
          </div>
        </div>
      </div>

      {/* Main Grid + Inspector Side Panel Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Core Matrix Area */}
        <div className="flex-1 w-full bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg overflow-hidden backdrop-blur-md">
          {/* Controls bar */}
          <div className="p-3 border-b border-[rgba(255,255,255,0.06)] bg-[#090e1c] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#849495] font-medium uppercase tracking-wider text-[11px]">Filter Dept:</span>
              {(['ALL', 'ECE', 'CS', 'ENGR'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setFilterDept(d)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    filterDept === d
                      ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 font-bold'
                      : 'bg-[#070b14] border border-[rgba(255,255,255,0.08)] text-[#849495] hover:text-[#dee2f6]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search course code or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 px-2.5 text-xs bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-[#dee2f6] placeholder-[#475569] focus:outline-none focus:border-[#00f2fe] w-56 font-sans"
              />
            </div>
          </div>

          {/* Table Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#090e1c] border-b border-[rgba(255,255,255,0.06)] text-[11px] font-semibold text-[#849495] uppercase tracking-wider font-mono">
                  <th className="py-2.5 px-3 w-28">Course Code</th>
                  <th className="py-2.5 px-3 min-w-[200px]">Course Title & Term</th>
                  <th className="py-2.5 px-2 text-center w-14 font-mono">Credits</th>
                  {ABET_CRITERIA.map((crit) => (
                    <th
                      key={crit.id}
                      className="py-2.5 px-1 text-center w-12 font-mono group relative cursor-pointer"
                      title={`${crit.code} - ${crit.shortTitle}: ${crit.description}`}
                    >
                      <span className="block text-[#00f2fe] font-bold">{crit.code}</span>
                      <span className="text-[9px] lowercase text-[#849495] font-normal">{crit.category.slice(0, 4)}</span>
                    </th>
                  ))}
                  <th className="py-2.5 px-3 text-right w-20">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-xs">
                {filteredCourses.map((course, idx) => {
                  const isRowActive = selectedCell?.courseId === course.id;
                  const directCount = Object.values(course.mappings).filter((m) => m.level === 'Direct').length;
                  const reinforcedCount = Object.values(course.mappings).filter((m) => m.level === 'Reinforced').length;

                  return (
                    <tr
                      key={course.id}
                      className={`transition-colors ${
                        isRowActive
                          ? 'bg-[rgba(0,242,254,0.06)] border-l-2 border-l-[#00f2fe]'
                          : idx % 2 === 0
                          ? 'bg-[#0e1424] hover:bg-[#141c30]'
                          : 'bg-[#111a2e] hover:bg-[#18223c]'
                      }`}
                    >
                      {/* Course Code Token */}
                      <td className="py-2 px-3 whitespace-nowrap">
                        <button
                          onClick={() => onOpenCourseModal(course)}
                          className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#070b14] text-[#00f2fe] border border-[#00f2fe]/30 hover:bg-[#00f2fe]/10 transition-colors"
                        >
                          {course.id}
                        </button>
                      </td>

                      {/* Course Title */}
                      <td className="py-2 px-3">
                        <div className="font-medium text-[#dee2f6] truncate max-w-[240px]" title={course.name}>
                          {course.name}
                        </div>
                        <div className="text-[11px] text-[#849495] flex items-center gap-1.5 font-mono">
                          <span>{course.termName.split('·')[1]?.trim()}</span>
                          <span>·</span>
                          <span className="text-[#a78bfa]">{course.category}</span>
                        </div>
                      </td>

                      {/* Credits */}
                      <td className="py-2 px-2 text-center font-mono text-xs text-[#00f2fe] whitespace-nowrap">
                        {course.lecLabCredits}
                      </td>

                      {/* ABET Matrix Cells (24x24px node grid) */}
                      {ABET_CRITERIA.map((crit) => {
                        const mapping = course.mappings[crit.id];
                        const isCellSelected =
                          selectedCell?.courseId === course.id && selectedCell?.critId === crit.id;

                        return (
                          <td key={crit.id} className="py-2 px-1 text-center align-middle">
                            <button
                              onClick={() => setSelectedCell({ courseId: course.id, critId: crit.id })}
                              aria-label={`${course.id} ${crit.code} mapping: ${mapping?.level || 'Unmapped'}`}
                              className={`w-6 h-6 rounded-[3px] mx-auto flex items-center justify-center transition-all ${
                                isCellSelected
                                  ? 'ring-2 ring-[#00f2fe] ring-offset-1 ring-offset-[#090e1c] scale-105 shadow-md'
                                  : 'hover:ring-1 hover:ring-[#00f2fe]/60'
                              } ${
                                mapping?.level === 'Direct'
                                  ? 'bg-[#0d7a53] text-white glow-emerald'
                                  : mapping?.level === 'Reinforced'
                                  ? 'hatch-slate-dark border border-[#00f2fe]/40'
                                  : 'border border-[rgba(255,255,255,0.12)] bg-[#070b14] hover:bg-[#0e1424]'
                              }`}
                            >
                              {mapping?.level === 'Direct' && (
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              )}
                            </button>
                          </td>
                        );
                      })}

                      {/* Mapped summary */}
                      <td className="py-2 px-3 text-right whitespace-nowrap font-mono text-[11px]">
                        <span className="text-[#10b981] font-semibold">{directCount}D</span>
                        <span className="text-[#849495] mx-1">/</span>
                        <span className="text-[#00f2fe] font-medium">{reinforcedCount}R</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel Anchoring: Audit Validation Inspector (360px) */}
        <div className="w-full lg:w-[360px] shrink-0 bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg p-5 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <h2 className="text-sm font-bold font-mono text-[#e0fdff]">Audit Node Inspector</h2>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#090e1c] text-[#00f2fe] border border-[#00f2fe]/30">
              Live Cell
            </span>
          </div>

          {selectedCourse && selectedCrit ? (
            <div className="space-y-4 text-xs font-mono">
              {/* Target Identification */}
              <div className="bg-[#090e1c] border border-[rgba(255,255,255,0.06)] rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#070b14] text-[#00f2fe] border border-[#00f2fe]/30">
                    {selectedCourse.id}
                  </span>
                  <span className="text-xs font-semibold text-[#10b981] bg-[#070b14] px-2 py-0.5 rounded border border-[#10b981]/30">
                    {selectedCrit.code}
                  </span>
                </div>
                <div className="font-semibold text-[#e0fdff] text-[13px] font-sans">{selectedCourse.name}</div>
                <div className="text-[#849495] text-[11px] font-medium font-sans">{selectedCrit.fullTitle}</div>
              </div>

              {/* Mapping Level Segmented Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1.5">
                  Accreditation Mapping Level
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#090e1c] rounded border border-[rgba(255,255,255,0.06)]">
                  {(['Direct', 'Reinforced', 'Unmapped'] as MappingLevel[]).map((lvl) => {
                    const isSelected = (currentMapping?.level || 'Unmapped') === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => onUpdateMapping(selectedCourse.id, selectedCrit.id, lvl)}
                        className={`py-1.5 px-2 rounded text-[11px] font-medium transition-all ${
                          isSelected
                            ? lvl === 'Direct'
                              ? 'bg-[#0d7a53] text-white shadow-xs glow-emerald'
                              : lvl === 'Reinforced'
                              ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40'
                              : 'bg-white/10 text-[#dee2f6]'
                            : 'text-[#849495] hover:text-[#dee2f6]'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rubric and Bloom's Details */}
              {currentMapping && currentMapping.level !== 'Unmapped' ? (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1">
                      Bloom’s Taxonomy Target
                    </label>
                    <div className="text-xs text-[#00f2fe] bg-[#090e1c] p-2 rounded border border-[rgba(255,255,255,0.06)]">
                      {currentMapping.bloomsLevel}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1">
                      Evaluation Rubric Standard
                    </label>
                    <div className="text-xs text-[#dee2f6] bg-[#090e1c] p-2 rounded border border-[rgba(255,255,255,0.06)] leading-relaxed font-sans">
                      {currentMapping.rubric}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1">
                      Performance Benchmark
                    </label>
                    <div className="text-xs text-[#10b981] bg-[#090e1c] p-2 rounded border border-[rgba(16,185,129,0.3)] font-medium font-sans">
                      {currentMapping.benchmark}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1">
                      Direct Assessment Artifact
                    </label>
                    <div className="flex items-center justify-between p-2 rounded border border-[rgba(255,255,255,0.06)] bg-[#090e1c]">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <FileText className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
                        <span className="text-[11px] text-[#e0fdff] truncate">
                          {currentMapping.artifactFile}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#10b981] font-semibold px-1.5 py-0.5 rounded bg-[#10b981]/15 border border-[#10b981]/40 shrink-0">
                        Verified
                      </span>
                    </div>
                  </div>

                  {currentMapping.signedBy && (
                    <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] text-[11px] text-[#849495] space-y-0.5">
                      <div>Sign-off: <span className="text-[#e0fdff] font-medium">{currentMapping.signedBy}</span></div>
                      <div>Timestamp: <span className="text-[#00f2fe]">{currentMapping.signDate}</span></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-[#849495] bg-[#090e1c] rounded border border-dashed border-[rgba(255,255,255,0.1)] p-4">
                  <p className="text-xs">This course is currently unmapped for outcome {selectedCrit.code}.</p>
                  <p className="text-[11px] text-[#475569] mt-1 font-sans">
                    Select &apos;Direct&apos; or &apos;Reinforced&apos; above to attach evaluation rubrics.
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                <button
                  onClick={() => onOpenCourseModal(selectedCourse)}
                  className="text-xs text-[#00f2fe] font-semibold flex items-center gap-1 hover:underline"
                >
                  View Full Syllabus <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#849495] font-mono">
              Click any 24×24px node in the matrix to inspect and adjust accreditation criteria mappings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
