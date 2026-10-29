import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Zap, Activity } from 'lucide-react';

interface AnimatedTypewriterProps {
  theme: 'specforge' | 'cyber';
}

const CYBER_LOGS = [
  'EXEC: formal_invariant_prover --engine=tla+ --spec=BFT-3F+1 [INV_OK 1.42ms]',
  'SGX2: remote_dcap_attestation quote=0x88f2b1... mrenclave_match=TRUE',
  'ZK_PROOF: groth16_batch_verify constraints=2048 soundness=2^(-128) [VERIFIED]',
  'CONSENSUS: epoch_commit #1842910 raft_quorum=7/7 validators=ONLINE',
  'STATE_TRIE: merkle_patricia_root updated=0xbc902e... state_deltas=14890',
  'FROST: schnorr_threshold_reconstruct quorum=7/10 key_ceremony_complete',
];

const SPEC_LOGS = [
  'AUDIT: ABET Criterion 3 Student Outcomes (SO-1 through SO-7) longitudinal scan complete.',
  'SYLLABUS: ECE-4030 Embedded Systems direct summative rubric anchored to Bloom Level 5.',
  'CURRICULUM: 128 credit hours verified across 8 terms. 0 cyclic prerequisite anomalies.',
  'CAPSTONE: Major Engineering Design experience confirmed for ECE-4810 & ECE-4820.',
  'NOTARIZED: Evaluation sign-off hash sealed by Dr. Maya Lin, IEEE Fellow [0x3b11...90fe].',
];

export const AnimatedTypewriter: React.FC<AnimatedTypewriterProps> = ({ theme }) => {
  const isCyber = theme === 'cyber';
  const logs = isCyber ? CYBER_LOGS : SPEC_LOGS;

  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(25);

  useEffect(() => {
    const fullText = logs[currentLogIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
        setTypingSpeed(18 + Math.random() * 15);

        if (displayedText.length + 1 >= fullText.length) {
          // Pause at end of line
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        // Backspacing
        setDisplayedText(fullText.slice(0, displayedText.length - 2));
        setTypingSpeed(10);

        if (displayedText.length <= 2) {
          setIsDeleting(false);
          setCurrentLogIndex((prev) => (prev + 1) % logs.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentLogIndex, logs, typingSpeed]);

  return (
    <div
      className={`w-full px-4 py-2 rounded-lg border backdrop-blur-md text-xs font-mono flex items-center justify-between gap-3 shadow-md transition-all ${
        isCyber
          ? 'bg-[#090e1c]/90 border-[#00f2fe]/30 text-[#00f2fe] glow-cyan'
          : 'bg-[#0f1e36] border-[#3e5c76] text-[#e0fdff]'
      }`}
    >
      <div className="flex items-center gap-2.5 overflow-hidden flex-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <Terminal className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
          <span className="text-[10px] uppercase font-bold text-[#849495] tracking-wider hidden sm:inline">
            {isCyber ? 'CORE_PROVER' : 'ABET_AUDIT'}:
          </span>
        </div>

        <div className="truncate font-mono tracking-tight text-[11px] sm:text-xs">
          <span>{displayedText}</span>
          <span className="inline-block w-2 h-3.5 ml-1 bg-[#00f2fe] align-middle animate-cursor" />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono text-[#849495] hidden md:flex">
        <span className="flex items-center gap-1 text-[#10b981]">
          <Activity className="w-3 h-3" /> LIVE STREAM
        </span>
        <span>·</span>
        <span>ANSI UTF-8</span>
      </div>
    </div>
  );
};
