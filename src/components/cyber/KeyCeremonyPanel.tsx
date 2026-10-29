import React, { useState } from 'react';
import { MPCKeyShare } from '../../types';
import { Lock, Cpu, Check, Shield, Key, RefreshCw, Server, Globe } from 'lucide-react';

interface KeyCeremonyPanelProps {
  keyShares: MPCKeyShare[];
  onTriggerAttestation: () => void;
}

export const KeyCeremonyPanel: React.FC<KeyCeremonyPanelProps> = ({
  keyShares,
  onTriggerAttestation,
}) => {
  const [selectedShares, setSelectedShares] = useState<string[]>([
    'NODE-US-EAST-01',
    'NODE-EU-CENTRAL-02',
    'NODE-AP-EAST-03',
    'NODE-CH-ZURICH-04',
    'NODE-CA-CENTRAL-05',
    'NODE-SE-STOCKHOLM-06',
    'NODE-SG-SINGAPORE-07',
  ]);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureOutput, setSignatureOutput] = useState<string | null>(null);

  const toggleShare = (nodeId: string) => {
    setSelectedShares((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    );
  };

  // Compute total threshold weight
  const currentWeight = selectedShares.reduce((sum, id) => {
    const node = keyShares.find((n) => n.nodeId === id);
    return sum + (node?.thresholdWeight || 1);
  }, 0);

  const isQuorumMet = currentWeight >= 7;

  const handleSimulateThresholdSignature = () => {
    if (!isQuorumMet) return;
    setIsSigning(true);
    setSignatureOutput(null);
    setTimeout(() => {
      setIsSigning(false);
      setSignatureOutput(
        '0x7c88b901ae4f5291...bc902e4 (BLS12-381 Threshold Signature successfully reconstructed from ' +
          selectedShares.length +
          ' participating enclave shares)'
      );
    }, 800);
  };

  return (
    <div className="space-y-6 text-[#dee2f6]">
      {/* Top Banner */}
      <div className="p-5 rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.05)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#8b5cf6]" />
              <h1 className="text-xl font-bold font-mono text-[#e0fdff]">
                MPC 7-of-10 Threshold Key Ceremony & Enclaves
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090e1c] text-[#8b5cf6] border border-[#8b5cf6]/40">
                FROST Schnorr / BLS12-381
              </span>
            </div>
            <p className="text-xs text-[#b9cacb] mt-1 font-mono">
              Hardware-isolated confidential computing nodes across Intel SGX2, AMD SEV-SNP, and AWS Nitro.
            </p>
          </div>

          <button
            onClick={onTriggerAttestation}
            className="px-4 py-2 text-xs font-mono font-medium rounded bg-[rgba(0,242,254,0.12)] text-[#00f2fe] border border-[#00f2fe] hover:bg-[rgba(0,242,254,0.22)] glow-cyan transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Shield className="w-3.5 h-3.5" />
            Run Remote DCAP Attestation
          </button>
        </div>

        {/* Quorum Progress Tracker */}
        <div className="mt-4 p-4 rounded bg-[#090e1c] border border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div>
            <div className="text-[10px] text-[#849495] uppercase">
              Participating Quorum Weight
            </div>
            <div className="text-xl font-bold text-[#e0fdff] mt-0.5 tabular-nums">
              <span className={isQuorumMet ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                {currentWeight}
              </span>{' '}
              <span className="text-xs text-[#849495]">/ 7 threshold required (10 total shares)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateThresholdSignature}
              disabled={!isQuorumMet || isSigning}
              className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 ${
                isQuorumMet
                  ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981] border border-[#10b981] hover:bg-[rgba(16,185,129,0.25)] glow-emerald'
                  : 'bg-[#1a1f2e] text-[#849495] border border-[rgba(255,255,255,0.06)] cursor-not-allowed'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              {isSigning ? 'Reconstructing Secret...' : 'Sign Master Digest with Quorum'}
            </button>
          </div>
        </div>

        {signatureOutput && (
          <div className="mt-3 p-3 rounded bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-xs font-mono text-[#10b981] break-all leading-relaxed">
            {signatureOutput}
          </div>
        )}
      </div>

      {/* Hardware Enclave Shares Table Grid */}
      <div className="rounded-lg bg-[#111a2e]/85 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-lg overflow-hidden font-mono text-xs">
        <div className="p-3.5 bg-[#090e1c] border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#849495]">
            Hardware Enclave Nodes Registry
          </span>
          <span className="text-[10px] text-[#00f2fe]">Click checkbox to toggle signer participation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#090e1c]/80 border-b border-[rgba(255,255,255,0.05)] text-[11px] uppercase tracking-wider text-[#849495]">
                <th className="py-2.5 px-3 w-10">Sign</th>
                <th className="py-2.5 px-3 w-44">Node ID</th>
                <th className="py-2.5 px-3 min-w-[160px]">Enclave Hardware Architecture</th>
                <th className="py-2.5 px-3 min-w-[160px]">Cloud Region & Host</th>
                <th className="py-2.5 px-2 text-center w-16">Weight</th>
                <th className="py-2.5 px-3 w-32">Public Key Root</th>
                <th className="py-2.5 px-3 w-28 text-center">Attestation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-xs">
              {keyShares.map((node) => {
                const isChecked = selectedShares.includes(node.nodeId);

                return (
                  <tr
                    key={node.nodeId}
                    onClick={() => toggleShare(node.nodeId)}
                    className={`cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[rgba(0,242,254,0.03)] hover:bg-[rgba(0,242,254,0.06)]'
                        : 'hover:bg-white/5 opacity-70'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-2 px-3">
                      <div
                        className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-[#00f2fe] text-[#0a0f1d] glow-cyan'
                            : 'border border-[rgba(255,255,255,0.2)] bg-[#070b14]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </td>

                    {/* Node ID */}
                    <td className="py-2 px-3 font-bold text-[#00f2fe] whitespace-nowrap">
                      {node.nodeId}
                    </td>

                    {/* Enclave Model */}
                    <td className="py-2 px-3 text-[#dee2f6]">
                      <div className="font-semibold text-xs">{node.enclaveModel}</div>
                      <div className="text-[10px] text-[#849495]">{node.tier}</div>
                    </td>

                    {/* Region */}
                    <td className="py-2 px-3 text-[#b9cacb] whitespace-nowrap">
                      {node.region}
                    </td>

                    {/* Threshold Weight */}
                    <td className="py-2 px-2 text-center text-[#e0fdff] font-bold tabular-nums">
                      {node.thresholdWeight}
                    </td>

                    {/* PubKey */}
                    <td className="py-2 px-3 text-[#849495] text-[11px] whitespace-nowrap">
                      {node.pubKeyPrefix}
                    </td>

                    {/* Attestation Status Badge */}
                    <td className="py-2 px-3 text-center whitespace-nowrap">
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.4)]">
                        {node.status}
                      </span>
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
