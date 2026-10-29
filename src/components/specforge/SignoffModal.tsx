import React, { useState } from 'react';
import { AuditSignoff } from '../../types';
import { ABET_CRITERIA } from '../../data/mockData';
import { X, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SignoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSignoff: (signoff: AuditSignoff) => void;
}

export const SignoffModal: React.FC<SignoffModalProps> = ({
  isOpen,
  onClose,
  onAddSignoff,
}) => {
  if (!isOpen) return null;

  const [criterionId, setCriterionId] = useState('CRIT-3');
  const [evaluatorName, setEvaluatorName] = useState('Dr. Maya Lin, IEEE Fellow');
  const [evaluatorTitle, setEvaluatorTitle] = useState('Chair, ABET Steering Committee');
  const [department, setDepartment] = useState('School of Electrical & Computer Engineering');
  const [status, setStatus] = useState<'Approved' | 'Conditional'>('Approved');
  const [notes, setNotes] = useState(
    'Comprehensive review completed for technical and oral communication artifacts across Junior Embedded and Senior Capstone I & II. Performance benchmarks exceed the 80% threshold.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomHex = Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6);
    const newSignoff: AuditSignoff = {
      id: `SIG-${Date.now().toString().slice(-4)}`,
      criterionId,
      evaluatorName,
      evaluatorTitle,
      department,
      timestamp: new Date().toISOString(),
      status,
      notes,
      signatureHash: `0x${randomHex}`,
    };
    onAddSignoff(newSignoff);
    onClose();
  };

  const selectedCrit = ABET_CRITERIA.find((c) => c.id === criterionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1d]/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0e1424] border border-[#10b981]/40 rounded-lg shadow-2xl w-full max-w-lg flex flex-col overflow-hidden text-[#dee2f6]">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#090e1c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#10b981]" />
            <h2 className="text-sm font-bold font-mono text-[#e0fdff]">
              Archival Accreditation Sign-Off Certification
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-[#e0fdff] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
              Select ABET Criterion to Certify
            </label>
            <select
              value={criterionId}
              onChange={(e) => setCriterionId(e.target.value)}
              className="w-full h-8 px-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#10b981]"
            >
              {ABET_CRITERIA.map((crit) => (
                <option key={crit.id} value={crit.id}>
                  {crit.code} ({crit.id}) · {crit.shortTitle}
                </option>
              ))}
            </select>
            {selectedCrit && (
              <p className="text-[11px] text-[#849495] mt-1 italic font-sans">
                &ldquo;{selectedCrit.description}&rdquo;
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                Evaluator Name & Credentials
              </label>
              <input
                type="text"
                required
                value={evaluatorName}
                onChange={(e) => setEvaluatorName(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#10b981] font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                Institutional Title
              </label>
              <input
                type="text"
                required
                value={evaluatorTitle}
                onChange={(e) => setEvaluatorTitle(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#10b981] font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                Academic Department
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#10b981] font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
                Compliance Determination
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full h-8 px-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#10b981]"
              >
                <option value="Approved">Approved (Full Compliance)</option>
                <option value="Conditional">Conditional (Minor Action Item)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#849495] mb-1">
              Curricular Audit Findings & Assessment Summary
            </label>
            <textarea
              rows={3}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-[#070b14] border border-[rgba(255,255,255,0.12)] rounded text-xs text-[#dee2f6] focus:outline-none focus:border-[#10b981] leading-relaxed font-sans"
            />
          </div>

          <div className="p-3 bg-[#10b981]/15 border border-[#10b981]/40 rounded text-[11px] text-[#10b981] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              Submitting this attestation permanently writes a signed record with cryptographic hash verification to the archival audit log.
            </span>
          </div>

          <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium rounded border border-[rgba(255,255,255,0.12)] text-[#dee2f6] hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold rounded bg-[#0d7a53] text-white hover:bg-[#0b6545] glow-emerald transition-colors flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Sign Off & Notarize
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
