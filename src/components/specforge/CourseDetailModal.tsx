import React, { useState } from 'react';
import { Course, MappingLevel } from '../../types';
import { ABET_CRITERIA } from '../../data/mockData';
import { X, Check, Save, FileText, ShieldCheck, AlertCircle } from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveCourse: (updated: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onSaveCourse,
}) => {
  if (!isOpen || !course) return null;

  const [formData, setFormData] = useState<Course>({ ...course });
  const [activeTab, setActiveTab] = useState<'details' | 'outcomes'>('outcomes');

  const handleLevelChange = (critId: string, level: MappingLevel) => {
    setFormData((prev) => {
      const existing = prev.mappings[critId] || {
        level: 'Unmapped',
        bloomsLevel: 'Level 4: Analyze',
        rubric: 'Standardized ABET Departmental Assessment Matrix',
        benchmark: '80% of cohort achieves score >= 75%',
        artifactFile: `${prev.id}_Artifact.pdf`,
      };
      return {
        ...prev,
        mappings: {
          ...prev.mappings,
          [critId]: {
            ...existing,
            level,
          },
        },
      };
    });
  };

  const handleSave = () => {
    onSaveCourse(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1d]/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0e1424] border border-[#00f2fe]/30 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-[#dee2f6]">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#090e1c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#070b14] text-[#00f2fe] border border-[#00f2fe]/30">
              {formData.id}
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#e0fdff] font-sans">{formData.name}</h2>
              <div className="text-[11px] text-[#849495] font-mono">
                {formData.termName} · {formData.category} · {formData.lecLabCredits} Credits
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-[#e0fdff] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center px-4 bg-[#0e1424] border-b border-[rgba(255,255,255,0.08)] text-xs font-mono font-medium">
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              activeTab === 'outcomes'
                ? 'border-[#00f2fe] text-[#00f2fe] font-bold'
                : 'border-transparent text-[#849495] hover:text-[#dee2f6]'
            }`}
          >
            ABET Criterion Mappings ({Object.values(formData.mappings).filter((m) => m.level !== 'Unmapped').length})
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-[#00f2fe] text-[#00f2fe] font-bold'
                : 'border-transparent text-[#849495] hover:text-[#dee2f6]'
            }`}
          >
            Syllabus Specification & Metadata
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs font-mono">
          {activeTab === 'outcomes' && (
            <div className="space-y-4">
              <p className="text-[#b9cacb] text-xs leading-relaxed font-sans">
                Configure longitudinal coverage for ABET Student Outcomes (SO-1 through SO-7). Direct mappings designate direct summative instruments included in the accreditation self-study dossier.
              </p>

              <div className="space-y-3">
                {ABET_CRITERIA.map((crit) => {
                  const mapping = formData.mappings[crit.id];
                  const currentLevel = mapping?.level || 'Unmapped';

                  return (
                    <div
                      key={crit.id}
                      className="p-3 rounded border border-[rgba(255,255,255,0.06)] bg-[#090e1c] space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#00f2fe]">
                              {crit.code} ({crit.id})
                            </span>
                            <span className="font-semibold text-xs text-[#e0fdff] font-sans">
                              {crit.shortTitle}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#849495] mt-0.5 font-sans">{crit.description}</div>
                        </div>

                        {/* Level Switcher */}
                        <div className="flex items-center gap-1 shrink-0 p-0.5 bg-[#070b14] rounded border border-[rgba(255,255,255,0.08)]">
                          {(['Direct', 'Reinforced', 'Unmapped'] as MappingLevel[]).map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleLevelChange(crit.id, lvl)}
                              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                                currentLevel === lvl
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
                          ))}
                        </div>
                      </div>

                      {/* If mapped, show rubric & benchmark */}
                      {currentLevel !== 'Unmapped' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[rgba(255,255,255,0.06)] text-xs">
                          <div>
                            <label className="block text-[10px] font-semibold uppercase text-[#849495] mb-1">
                              Assessment Rubric
                            </label>
                            <input
                              type="text"
                              value={mapping?.rubric || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  mappings: {
                                    ...prev.mappings,
                                    [crit.id]: {
                                      ...prev.mappings[crit.id],
                                      rubric: val,
                                    },
                                  },
                                }));
                              }}
                              className="w-full h-7 px-2 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-[11px] text-[#dee2f6] focus:outline-none focus:border-[#00f2fe] font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold uppercase text-[#849495] mb-1">
                              Benchmark Specification
                            </label>
                            <input
                              type="text"
                              value={mapping?.benchmark || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  mappings: {
                                    ...prev.mappings,
                                    [crit.id]: {
                                      ...prev.mappings[crit.id],
                                      benchmark: val,
                                    },
                                  },
                                }));
                              }}
                              className="w-full h-7 px-2 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-[11px] text-[#10b981] focus:outline-none focus:border-[#10b981] font-sans"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-8 px-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#00f2fe] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                    Lead Faculty / Evaluator
                  </label>
                  <input
                    type="text"
                    value={formData.leadFaculty}
                    onChange={(e) => setFormData({ ...formData, leadFaculty: e.target.value })}
                    className="w-full h-8 px-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#00f2fe] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                    Credit Allocation (Lec-Lab-Credit)
                  </label>
                  <input
                    type="text"
                    value={formData.lecLabCredits}
                    onChange={(e) => setFormData({ ...formData, lecLabCredits: e.target.value })}
                    className="w-full h-8 px-2.5 font-mono bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#00f2fe] focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                    Compliance Review Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full h-8 px-2 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#00f2fe]"
                  >
                    <option value="Compliant">Compliant / Approved</option>
                    <option value="In Review">Draft / In Review</option>
                    <option value="Revision Requested">Revision Requested</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                  Catalog Course Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#00f2fe] leading-relaxed font-sans"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#090e1c] flex items-center justify-between font-mono">
          <span className="text-[11px] text-[#849495]">
            Syllabus: {formData.syllabusVersion} · Last modified {formData.lastAudited}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium rounded border border-[rgba(255,255,255,0.12)] text-[#dee2f6] hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-semibold rounded bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 hover:bg-[#00f2fe]/30 glow-cyan transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Save Specification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
