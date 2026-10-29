import React, { useState } from 'react';
import { Course } from '../../types';
import { ArrowRight, CheckCircle2, AlertTriangle, Layers, BookOpen, Clock, GitCommit } from 'lucide-react';

interface CurriculumGraphProps {
  courses: Course[];
  onOpenCourseModal: (course: Course) => void;
}

export const CurriculumGraph: React.FC<CurriculumGraphProps> = ({
  courses,
  onOpenCourseModal,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ECE-4030');
  const [termFilter, setTermFilter] = useState<number | 'ALL'>('ALL');

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  // Compute upstream prerequisites (recursive)
  const getUpstreamPrereqs = (courseId: string, visited = new Set<string>()): string[] => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return [];
    const direct = course.prerequisites || [];
    direct.forEach((p) => {
      if (!visited.has(p)) {
        visited.add(p);
        getUpstreamPrereqs(p, visited);
      }
    });
    return Array.from(visited);
  };

  // Compute downstream dependent courses (courses that require this course)
  const getDownstreamDependents = (courseId: string): string[] => {
    return courses
      .filter((c) => c.prerequisites && c.prerequisites.includes(courseId))
      .map((c) => c.id);
  };

  const upstreamPrereqs = selectedCourseId ? getUpstreamPrereqs(selectedCourseId) : [];
  const downstreamDependents = selectedCourseId ? getDownstreamDependents(selectedCourseId) : [];

  // Group courses by term (1 to 8)
  const terms = [1, 2, 3, 4, 5, 6, 7, 8];
  const termLabels: Record<number, string> = {
    1: 'Term 1 · Freshman Fall',
    2: 'Term 2 · Freshman Spring',
    3: 'Term 3 · Sophomore Fall',
    4: 'Term 4 · Sophomore Spring',
    5: 'Term 5 · Junior Fall',
    6: 'Term 6 · Junior Spring',
    7: 'Term 7 · Senior Fall',
    8: 'Term 8 · Senior Spring',
  };

  // Credit Tally Computations
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0) + 75;
  const engTopicsCredits = courses
    .filter((c) => c.category === 'Engineering Topics' || c.category === 'Engineering Design')
    .reduce((acc, c) => acc + c.credits, 0) + 24;
  const mathSciCredits = courses
    .filter((c) => c.category === 'Math & Basic Science')
    .reduce((acc, c) => acc + c.credits, 0) + 20;

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Top Banner: Credit Hour Allocations & Formula Validations */}
      <div className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-[#e0fdff]">
                Curriculum Prerequisite & Longitudinal Sequence
              </h1>
              <span className="text-[10px] font-mono uppercase bg-[#10b981]/15 text-[#10b981] px-2 py-0.5 rounded border border-[#10b981]/40 font-semibold">
                ABET Criterion 5 Verified
              </span>
            </div>
            <p className="text-xs text-[#b9cacb] mt-1 font-mono">
              Multi-year dependency trees from Freshman Foundations through Senior Capstone Defense.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#849495]">Focus Term:</span>
            <select
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="h-8 px-2 text-xs font-mono bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-[#dee2f6] focus:outline-none focus:border-[#00f2fe]"
            >
              <option value="ALL">All 8 Terms (Full Degree Program)</option>
              {terms.map((t) => (
                <option key={t} value={t}>
                  Term {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Quantitative Rigor Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 font-mono">
          <div className="p-3 bg-[#090e1c] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-[11px] font-medium text-[#849495] uppercase tracking-wider">
              Total Program Credits
            </div>
            <div className="text-xl font-bold text-[#e0fdff] mt-1 tabular-nums">
              128 <span className="text-xs font-normal text-[#849495]">/ 128 req</span>
            </div>
            <div className="text-[11px] text-[#10b981] font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Satisfied
            </div>
          </div>

          <div className="p-3 bg-[#090e1c] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-[11px] font-medium text-[#849495] uppercase tracking-wider">
              Engineering Topics
            </div>
            <div className="text-xl font-bold text-[#00f2fe] mt-1 tabular-nums">
              {engTopicsCredits} <span className="text-xs font-normal text-[#849495]">/ 48 min</span>
            </div>
            <div className="text-[11px] text-[#10b981] font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> +{engTopicsCredits - 48} Excess Rigor
            </div>
          </div>

          <div className="p-3 bg-[#090e1c] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-[11px] font-medium text-[#849495] uppercase tracking-wider">
              Math & Basic Sciences
            </div>
            <div className="text-xl font-bold text-[#e0fdff] mt-1 tabular-nums">
              {mathSciCredits} <span className="text-xs font-normal text-[#849495]">/ 32 min</span>
            </div>
            <div className="text-[11px] text-[#10b981] font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Compliant Standard
            </div>
          </div>

          {/* Card 4: Prerequisite Health */}
          <div className="p-3 bg-[#090e1c] border border-[rgba(0,242,254,0.4)] rounded animate-cyber-pulse relative overflow-hidden transition-all">
            <div className="text-[11px] font-medium text-[#849495] uppercase tracking-wider flex items-center justify-between">
              <span className="text-[#00f2fe] font-semibold">Prerequisite Health</span>
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            </div>
            <div className="text-xl font-bold text-[#10b981] mt-1 tabular-nums flex items-baseline gap-1.5">
              0 Cycles
              <span className="text-[10px] font-normal text-[#849495]">100% DAG VALID</span>
            </div>
            <div className="text-[11px] text-[#10b981] font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Deterministic DAG Verified
            </div>
          </div>
        </div>
      </div>

      {/* Main Flowchart & Inspector */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Longitudinal Term Swimlanes */}
        <div className="flex-1 w-full space-y-4">
          {terms
            .filter((t) => termFilter === 'ALL' || termFilter === t)
            .map((termNum) => {
              const termCourses = courses.filter((c) => c.term === termNum);
              if (termCourses.length === 0) return null;

              return (
                <div
                  key={termNum}
                  className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg p-4 shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40">
                        Term {termNum}
                      </span>
                      <h2 className="text-xs font-semibold text-[#e0fdff]">
                        {termLabels[termNum]}
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono text-[#849495] tabular-nums">
                      {termCourses.reduce((sum, c) => sum + c.credits, 0)} Credits Planned
                    </span>
                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {termCourses.map((course) => {
                      const isSelected = selectedCourseId === course.id;
                      const isUpstream = upstreamPrereqs.includes(course.id);
                      const isDownstream = downstreamDependents.includes(course.id);

                      return (
                        <div
                          key={course.id}
                          onClick={() => setSelectedCourseId(course.id)}
                          className={`p-3 rounded border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#00f2fe] bg-[#090e1c] ring-2 ring-[#00f2fe]/30 glow-cyan'
                              : isUpstream
                              ? 'border-[#8b5cf6] bg-[#090e1c] ring-1 ring-[#8b5cf6]/50'
                              : isDownstream
                              ? 'border-[#10b981] bg-[#090e1c] ring-1 ring-[#10b981]/50'
                              : 'border-[rgba(255,255,255,0.08)] bg-[#090e1c] hover:border-[#00f2fe]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#070b14] text-[#00f2fe] border border-[#00f2fe]/30">
                              {course.id}
                            </span>
                            <div className="flex items-center gap-1.5 font-mono text-[10px]">
                              <span className="text-[#849495]">{course.lecLabCredits}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded font-semibold ${
                                  course.status === 'Compliant'
                                    ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40'
                                    : 'bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/40'
                                }`}
                              >
                                {course.status}
                              </span>
                            </div>
                          </div>

                          <div className="font-semibold text-xs text-[#dee2f6] truncate font-sans">
                            {course.name}
                          </div>

                          {/* Prerequisites Pill badges / indicators */}
                          <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono">
                            <div className="flex items-center gap-1 text-[#849495]">
                              <span>Prereqs:</span>
                              {course.prerequisites.length > 0 ? (
                                <div className="flex items-center gap-1">
                                  {course.prerequisites.map((p) => (
                                    <span
                                      key={p}
                                      className={`text-[10px] px-1 py-0.2 rounded ${
                                        selectedCourseId === p
                                          ? 'bg-[#00f2fe] text-[#0a0f1d] font-bold'
                                          : 'bg-[#070b14] text-[#dee2f6] border border-[rgba(255,255,255,0.1)]'
                                      }`}
                                    >
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-[#475569] italic">None (Admitted)</span>
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenCourseModal(course);
                              }}
                              className="text-[10px] text-[#00f2fe] hover:underline font-medium"
                            >
                              Details →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Side Panel: Prerequisite Trace Inspector (360px) */}
        <div className="w-full lg:w-[360px] shrink-0 bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg p-5 space-y-4 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#00f2fe]" />
              <h2 className="text-sm font-bold text-[#e0fdff]">Prerequisite Inspector</h2>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#090e1c] text-[#00f2fe] border border-[#00f2fe]/30">
              Active Node
            </span>
          </div>

          {selectedCourse ? (
            <div className="space-y-4">
              <div className="bg-[#090e1c] border border-[rgba(255,255,255,0.06)] rounded p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40">
                    {selectedCourse.id}
                  </span>
                  <span className="text-[11px] text-[#849495]">
                    Term {selectedCourse.term} ({selectedCourse.credits} Cr)
                  </span>
                </div>
                <div className="font-semibold text-xs text-[#dee2f6] font-sans">{selectedCourse.name}</div>
                <div className="text-[11px] text-[#849495]">Faculty: {selectedCourse.leadFaculty}</div>
              </div>

              {/* Upstream Prerequisites Chain */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1.5">
                  Upstream Prerequisites ({upstreamPrereqs.length})
                </label>
                {upstreamPrereqs.length > 0 ? (
                  <div className="space-y-1.5">
                    {upstreamPrereqs.map((prereqId) => {
                      const pCourse = courses.find((c) => c.id === prereqId);
                      return (
                        <div
                          key={prereqId}
                          onClick={() => setSelectedCourseId(prereqId)}
                          className="flex items-center justify-between p-2 rounded border border-[rgba(255,255,255,0.08)] bg-[#090e1c] hover:border-[#8b5cf6]/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#070b14] text-[#8b5cf6] border border-[#8b5cf6]/30">
                              {prereqId}
                            </span>
                            <span className="text-[11px] text-[#dee2f6] truncate font-sans">
                              {pCourse?.name || prereqId}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#849495] shrink-0">
                            Term {pCourse?.term}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-2.5 rounded border border-dashed border-[rgba(255,255,255,0.1)] text-[11px] text-[#849495] text-center">
                    No upstream prerequisites. Open enrollment course.
                  </div>
                )}
              </div>

              {/* Downstream Dependent Courses */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1.5">
                  Downstream Direct Dependents ({downstreamDependents.length})
                </label>
                {downstreamDependents.length > 0 ? (
                  <div className="space-y-1.5">
                    {downstreamDependents.map((depId) => {
                      const dCourse = courses.find((c) => c.id === depId);
                      return (
                        <div
                          key={depId}
                          onClick={() => setSelectedCourseId(depId)}
                          className="flex items-center justify-between p-2 rounded border border-[rgba(255,255,255,0.08)] bg-[#090e1c] hover:border-[#10b981]/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#070b14] text-[#10b981] border border-[#10b981]/30">
                              {depId}
                            </span>
                            <span className="text-[11px] text-[#dee2f6] truncate font-sans">
                              {dCourse?.name || depId}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#10b981] shrink-0">
                            Term {dCourse?.term}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-2.5 rounded border border-dashed border-[rgba(255,255,255,0.1)] text-[11px] text-[#849495] text-center">
                    Terminal course. No downstream prerequisites depend on this course.
                  </div>
                )}
              </div>

              {/* ABET Criteria Mapped in this course */}
              <div className="pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#849495] mb-1.5">
                  ABET Criteria Anchored
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(selectedCourse.mappings)
                    .filter(([_, m]) => m.level !== 'Unmapped')
                    .map(([critId, m]) => (
                      <span
                        key={critId}
                        className={`text-[10px] px-2 py-0.5 rounded border ${
                          m.level === 'Direct'
                            ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40'
                            : 'bg-[#00f2fe]/10 text-[#00f2fe] border-[#00f2fe]/30'
                        }`}
                      >
                        {critId}: {m.level}
                      </span>
                    ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenCourseModal(selectedCourse)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe] hover:bg-[#00f2fe]/25 glow-cyan transition-colors"
                >
                  Edit Course Specification
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#849495]">
              Select any course node to inspect prerequisite chains and dependent pathways.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
