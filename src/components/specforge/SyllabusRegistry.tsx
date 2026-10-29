import React, { useState } from 'react';
import { Course } from '../../types';
import { Search, Filter, Download, Plus, FileEdit, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface SyllabusRegistryProps {
  courses: Course[];
  onOpenCourseModal: (course: Course) => void;
  onAddNewCourse: () => void;
}

export const SyllabusRegistry: React.FC<SyllabusRegistryProps> = ({
  courses,
  onOpenCourseModal,
  onAddNewCourse,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = courses.filter((c) => {
    const matchesDept = deptFilter === 'ALL' || c.department === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.leadFaculty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['Course ID', 'Name', 'Department', 'Term', 'Credits', 'Status', 'Faculty Lead', 'Version', 'Last Audited'];
    const rows = filtered.map((c) => [
      c.id,
      `"${c.name}"`,
      c.department,
      c.term,
      c.credits,
      c.status,
      `"${c.leadFaculty}"`,
      c.syllabusVersion,
      c.lastAudited,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SpecForge_Course_Registry_Audit.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Header and Controls */}
      <div className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-[#e0fdff]">
                Course Specification & Syllabus Audit Registry
              </h1>
              <span className="text-[10px] font-mono uppercase bg-[#090e1c] text-[#00f2fe] px-2 py-0.5 rounded border border-[#00f2fe]/30">
                {filtered.length} Recorded Units
              </span>
            </div>
            <p className="text-xs text-[#b9cacb] mt-1 font-mono">
              Dense 36px-row compliance records for ABET Criteria 3 and 5 verification.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <button
              onClick={exportCSV}
              className="h-8 px-3 text-xs font-medium rounded border border-[rgba(255,255,255,0.12)] bg-[#090e1c] text-[#dee2f6] hover:bg-white/5 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={onAddNewCourse}
              className="h-8 px-3 text-xs font-semibold rounded bg-[#00f2fe]/15 text-[#00f2fe] border border-[#00f2fe] hover:bg-[#00f2fe]/25 glow-cyan transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              Register Course
            </button>
          </div>
        </div>

        {/* Filter bar with 32px height inputs */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#849495]" />
            <input
              type="text"
              placeholder="Search by course code, title, or faculty lead..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 px-2.5 text-xs bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-[#dee2f6] placeholder-[#475569] focus:outline-none focus:border-[#00f2fe] w-full font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#849495] font-medium text-[11px] uppercase">Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="h-8 px-2 text-xs font-mono bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-[#dee2f6] focus:outline-none focus:border-[#00f2fe]"
            >
              <option value="ALL">All Departments</option>
              <option value="ECE">ECE</option>
              <option value="CS">CS</option>
              <option value="ENGR">ENGR</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#849495] font-medium text-[11px] uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 px-2 text-xs font-mono bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-[#dee2f6] focus:outline-none focus:border-[#00f2fe]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Compliant">Compliant / Approved</option>
              <option value="In Review">Draft / In Review</option>
              <option value="Revision Requested">Revision Requested</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabular Audit Grid (36px fixed row height) */}
      <div className="bg-[#111a2e]/90 border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#090e1c] border-b border-[rgba(255,255,255,0.06)] text-[12px] font-semibold text-[#849495] uppercase tracking-[0.05em] font-mono">
                <th className="py-2.5 px-3 w-28">Code</th>
                <th className="py-2.5 px-3 min-w-[220px]">Course Title</th>
                <th className="py-2.5 px-2 text-center w-16 font-mono">Term</th>
                <th className="py-2.5 px-2 text-center w-20 font-mono">L-L-C</th>
                <th className="py-2.5 px-3 min-w-[140px]">Lead Faculty</th>
                <th className="py-2.5 px-2 text-center w-20 font-mono">Version</th>
                <th className="py-2.5 px-3 w-28 font-mono">Last Audited</th>
                <th className="py-2.5 px-3 w-32 text-center">Status</th>
                <th className="py-2.5 px-3 w-20 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-xs">
              {filtered.map((course, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={course.id}
                    className={`h-[36px] transition-colors ${
                      isEven ? 'bg-[#0e1424] hover:bg-[#141c30]' : 'bg-[#111a2e] hover:bg-[#18223c]'
                    }`}
                  >
                    {/* Course Code Token */}
                    <td className="py-1 px-3 whitespace-nowrap">
                      <button
                        onClick={() => onOpenCourseModal(course)}
                        className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#070b14] text-[#00f2fe] border border-[#00f2fe]/30 hover:bg-[#00f2fe]/10 transition-colors"
                      >
                        {course.id}
                      </button>
                    </td>

                    {/* Course Title */}
                    <td className="py-1 px-3">
                      <div className="font-medium text-[#dee2f6] truncate max-w-[280px] font-sans" title={course.name}>
                        {course.name}
                      </div>
                    </td>

                    {/* Term */}
                    <td className="py-1 px-2 text-center font-mono text-[11px] text-[#849495] whitespace-nowrap">
                      T{course.term}
                    </td>

                    {/* Credits */}
                    <td className="py-1 px-2 text-center font-mono text-[11px] text-[#00f2fe] whitespace-nowrap">
                      {course.lecLabCredits}
                    </td>

                    {/* Lead Faculty */}
                    <td className="py-1 px-3 text-[#b9cacb] text-xs truncate max-w-[160px] font-sans">
                      {course.leadFaculty}
                    </td>

                    {/* Syllabus Version */}
                    <td className="py-1 px-2 text-center font-mono text-[11px] text-[#849495]">
                      {course.syllabusVersion}
                    </td>

                    {/* Last Audited */}
                    <td className="py-1 px-3 font-mono text-[11px] text-[#849495] whitespace-nowrap">
                      {course.lastAudited}
                    </td>

                    {/* Status Chip */}
                    <td className="py-1 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                          course.status === 'Compliant'
                            ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40'
                            : course.status === 'In Review'
                            ? 'bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/40'
                            : 'bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/40'
                        }`}
                      >
                        {course.status === 'Compliant' ? 'Compliant / Approved' : course.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-1 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onOpenCourseModal(course)}
                        className="text-xs font-semibold text-[#00f2fe] hover:underline px-2 py-1 rounded hover:bg-white/5 transition-colors font-mono"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
