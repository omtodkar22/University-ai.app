import React, { useState } from 'react';
import { AppTheme, SpecForgeView, CyberView, Course, MappingLevel, AuditSignoff, InvariantRule, TelemetryLog } from './types';
import { INITIAL_COURSES, INITIAL_SIGNOFFS, INITIAL_TELEMETRY_LOGS, INITIAL_INVARIANTS, INITIAL_KEY_SHARES, ABET_CRITERIA } from './data/mockData';
import { Header } from './components/Header';
import { OutcomeMatrix } from './components/specforge/OutcomeMatrix';
import { CurriculumGraph } from './components/specforge/CurriculumGraph';
import { SyllabusRegistry } from './components/specforge/SyllabusRegistry';
import { AccreditationAudit } from './components/specforge/AccreditationAudit';
import { CourseDetailModal } from './components/specforge/CourseDetailModal';
import { SignoffModal } from './components/specforge/SignoffModal';
import { CyberCommandDeck } from './components/cyber/CyberCommandDeck';
import { TelemetryInspector } from './components/cyber/TelemetryInspector';
import { InvariantMatrix } from './components/cyber/InvariantMatrix';
import { KeyCeremonyPanel } from './components/cyber/KeyCeremonyPanel';
import { Check, Info, ShieldCheck, Download } from 'lucide-react';
import { AnimatedTypewriter } from './components/AnimatedTypewriter';
import { SearchGroundingModal } from './components/SearchGroundingModal';

export default function App() {
  // Theme: 'cyber' (Cyber-Academic Dark) or 'specforge' (Academic Institutional Dark)
  const [theme, setTheme] = useState<AppTheme>('cyber');

  // Views for SpecForge
  const [specView, setSpecView] = useState<SpecForgeView>('matrix');

  // Views for Cyber-Academic
  const [cyberView, setCyberView] = useState<CyberView>('command');

  // Shared / Domain State
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [signoffs, setSignoffs] = useState<AuditSignoff[]>(INITIAL_SIGNOFFS);
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>(INITIAL_TELEMETRY_LOGS);
  const [invariants, setInvariants] = useState<InvariantRule[]>(INITIAL_INVARIANTS);
  const [keyShares, setKeyShares] = useState(INITIAL_KEY_SHARES);

  // Modals & UI State
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isSignoffModalOpen, setIsSignoffModalOpen] = useState(false);
  const [isGroundingModalOpen, setIsGroundingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // SpecForge actions
  const handleUpdateMapping = (courseId: string, criterionId: string, level: MappingLevel) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const existing = c.mappings[criterionId] || {
          level: 'Unmapped',
          bloomsLevel: 'Level 4: Analyze',
          rubric: 'Standardized ABET Departmental Assessment Matrix',
          benchmark: '80% of cohort achieves score >= 75%',
          artifactFile: `${c.id}_Artifact.pdf`,
        };
        return {
          ...c,
          mappings: {
            ...c.mappings,
            [criterionId]: {
              ...existing,
              level,
            },
          },
        };
      })
    );
    showToast(`Updated ${courseId} mapping for ${criterionId} to ${level}.`);
  };

  const handleSaveCourse = (updatedCourse: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    showToast(`Syllabus and outcome specifications saved for ${updatedCourse.id}.`);
  };

  const handleAddNewCourse = () => {
    const newCourseId = `ECE-${Math.floor(Math.random() * 800) + 4000}`;
    const newCourse: Course = {
      id: newCourseId,
      name: 'Advanced Hardware Security & Protocol Architecture',
      department: 'ECE',
      credits: 3,
      lecLabCredits: '3-0-3',
      term: 7,
      termName: 'Term 7 · Senior Fall',
      prerequisites: ['ECE-2020'],
      category: 'Engineering Topics',
      status: 'In Review',
      lastAudited: new Date().toISOString().split('T')[0],
      leadFaculty: 'Dr. Aris Thorne',
      syllabusVersion: 'v1.0.0',
      description: 'Formal verification, side-channel attack mitigation, and cryptographic hardware primitives.',
      mappings: {
        'CRIT-1': {
          level: 'Direct',
          bloomsLevel: 'Level 5: Evaluate',
          rubric: 'Hardware Security Invariant Proof Rubric',
          benchmark: '85% of cohort successfully verifies side-channel resistance',
          artifactFile: `${newCourseId}_Lab1_Artifact.pdf`,
        },
      },
    };
    setCourses((prev) => [...prev, newCourse]);
    setSelectedCourseForModal(newCourse);
    setIsCourseModalOpen(true);
    showToast(`Registered new course ${newCourseId}. Opened for configuration.`);
  };

  const handleAddSignoff = (newSignoff: AuditSignoff) => {
    setSignoffs((prev) => [newSignoff, ...prev]);
    showToast(`Criterion ${newSignoff.criterionId} formally signed off by ${newSignoff.evaluatorName}.`);
  };

  const handleExportReport = () => {
    const reportData = {
      institution: 'College of Engineering & Computing',
      evaluationCycle: '2026-2027 ABET Comprehensive Review',
      generatedDate: new Date().toISOString(),
      studentOutcomes: ABET_CRITERIA,
      curriculumRegistry: courses.map((c) => ({
        id: c.id,
        name: c.name,
        term: c.term,
        credits: c.credits,
        status: c.status,
        mappings: c.mappings,
      })),
      signoffTrail: signoffs,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ABET_SelfStudy_Form3.1_Export_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported ABET Form 3.1 Self-Study Dossier (JSON format).');
  };

  // Cyber actions
  const handleAddTelemetryLog = (newLog: TelemetryLog) => {
    setTelemetryLogs((prev) => [newLog, ...prev.slice(0, 199)]);
  };

  const handleUpdateInvariant = (updated: InvariantRule) => {
    setInvariants((prev) => prev.map((inv) => (inv.id === updated.id ? updated : inv)));
    showToast(`Invariant ${updated.code} formally proven in ${updated.executionTimeMs}ms.`);
  };

  const handleTriggerAttestation = () => {
    setKeyShares((prev) =>
      prev.map((k) => ({
        ...k,
        status: 'Attested',
        lastHeartbeat: '0ms ago',
      }))
    );
    showToast('DCAP Remote Attestation completed. 7/7 SGX/Nitro hardware enclave quotes valid.');
  };

  const isSpec = theme === 'specforge';

  return (
    <div
      className={`min-h-screen cyber-grid-bg transition-colors duration-200 ${
        isSpec ? 'bg-[#0e1321] text-[#dee2f6]' : 'bg-[#0a0f1d] text-[#dee2f6]'
      }`}
    >
      {/* Universal Top Bar adhering to 3-zone contract */}
      <Header
        theme={theme}
        setTheme={setTheme}
        specView={specView}
        setSpecView={setSpecView}
        cyberView={cyberView}
        setCyberView={setCyberView}
        onOpenSignoffModal={() => setIsSignoffModalOpen(true)}
        onExportReport={handleExportReport}
        onTriggerAttestation={handleTriggerAttestation}
        onOpenSearchGrounding={() => setIsGroundingModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Animated Typewriter Terminal Stream */}
        <AnimatedTypewriter theme={theme} />

        {isSpec ? (
          // SPECFORGE ACADEMIC ACCREDITATION VIEWS
          <>
            {specView === 'matrix' && (
              <OutcomeMatrix
                courses={courses}
                onUpdateMapping={handleUpdateMapping}
                onOpenCourseModal={(course) => {
                  setSelectedCourseForModal(course);
                  setIsCourseModalOpen(true);
                }}
              />
            )}

            {specView === 'curriculum' && (
              <CurriculumGraph
                courses={courses}
                onOpenCourseModal={(course) => {
                  setSelectedCourseForModal(course);
                  setIsCourseModalOpen(true);
                }}
              />
            )}

            {specView === 'syllabus' && (
              <SyllabusRegistry
                courses={courses}
                onOpenCourseModal={(course) => {
                  setSelectedCourseForModal(course);
                  setIsCourseModalOpen(true);
                }}
                onAddNewCourse={handleAddNewCourse}
              />
            )}

            {specView === 'audit' && (
              <AccreditationAudit
                courses={courses}
                signoffs={signoffs}
                onOpenSignoffModal={() => setIsSignoffModalOpen(true)}
                onExportReport={handleExportReport}
                onOpenGroundingSearch={() => setIsGroundingModalOpen(true)}
              />
            )}
          </>
        ) : (
          // CYBER-ACADEMIC PROTOCOL ENGINE VIEWS
          <>
            {cyberView === 'command' && (
              <CyberCommandDeck
                telemetryLogs={telemetryLogs}
                invariants={invariants}
                keyShares={keyShares}
                onTriggerAttestation={handleTriggerAttestation}
                onNavigateTab={(tab) => setCyberView(tab as CyberView)}
              />
            )}

            {cyberView === 'telemetry' && (
              <TelemetryInspector
                logs={telemetryLogs}
                onAddLog={handleAddTelemetryLog}
              />
            )}

            {cyberView === 'invariants' && (
              <InvariantMatrix
                invariants={invariants}
                onUpdateInvariant={handleUpdateInvariant}
              />
            )}

            {cyberView === 'key_ceremony' && (
              <KeyCeremonyPanel
                keyShares={keyShares}
                onTriggerAttestation={handleTriggerAttestation}
              />
            )}
          </>
        )}
      </main>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourseForModal}
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSaveCourse={handleSaveCourse}
      />

      {/* Sign-Off Modal */}
      <SignoffModal
        isOpen={isSignoffModalOpen}
        onClose={() => setIsSignoffModalOpen(false)}
        onAddSignoff={handleAddSignoff}
      />

      {/* Live Google Search Grounding Modal */}
      <SearchGroundingModal
        isOpen={isGroundingModalOpen}
        onClose={() => setIsGroundingModalOpen(false)}
        defaultCategory={theme}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div
            className={`px-4 py-2.5 rounded-lg shadow-lg border text-xs flex items-center gap-2 font-medium ${
              isSpec
                ? 'bg-[#111a2e] text-[#10b981] border-[#10b981]/40 glow-emerald font-mono'
                : 'bg-[#111a2e] text-[#00f2fe] border-[#00f2fe]/40 glow-cyan font-mono'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#00f2fe]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
