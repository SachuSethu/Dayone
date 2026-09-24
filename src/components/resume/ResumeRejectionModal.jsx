// src/components/resume/ResumeRejectionModal.jsx
// Interactive Pop-Up Modal when a resume fails DayOne's Strict AI Evaluation Standards
// (No accredited certifications and no documented projects found).

import React from 'react';
import { 
  AlertOctagon, ShieldAlert, Award, FileText, 
  ArrowLeft, RefreshCw, CheckCircle2, XCircle
} from 'lucide-react';

export default function ResumeRejectionModal({ 
  rejectionData, 
  onReEnter 
}) {
  return (
    <div className="rejection-modal-backdrop">
      <div className="rejection-modal-card animate-scale-in">
        <div className="rejection-modal-header">
          <div className="rejection-icon-pulse">
            <AlertOctagon size={36} className="text-rose" />
          </div>
          <div className="rejection-badge">
            <ShieldAlert size={13} />
            <span>STRICT AI EVALUATION STANDARDS ENFORCED</span>
          </div>
          <h2 className="rejection-title">Resume Submission Rejected</h2>
          <p className="rejection-subtitle">
            Accredited Certification Credentials or Documented Project Deliverables Required
          </p>
        </div>

        <div className="rejection-body">
          <div className="rejection-reason-callout">
            <XCircle size={18} className="text-rose flex-shrink-0 mt-0.5" />
            <div>
              <strong>Rejection Verdict:</strong>
              <p>{rejectionData?.reason || 'No accredited certifications or documented project deliverables were detected in the uploaded document.'}</p>
            </div>
          </div>

          <div className="rejection-rules-explanation">
            <h4 className="rules-heading">Why was this resume rejected?</h4>
            <ul className="rejection-rules-list">
              <li>
                <strong>No Silent Zero Scoring:</strong> Rather than assigning arbitrary 0% scores across requirements, DayOne enforces upfront verification standards. Unverified submissions cannot proceed to diagnostics.
              </li>
              <li>
                <strong>Courses Alone Do Not Qualify:</strong> Listing course titles (e.g., Udemy, Coursera, YouTube tutorials) without official accredited certification credentials cannot be accepted as validated skill evidence.
              </li>
              <li>
                <strong>Mandatory Evidence Pathways:</strong> To pass evaluation, candidate skills must be backed by either:
                <div className="evidence-pathways-grid">
                  <div className="pathway-card">
                    <div className="pathway-title">
                      <Award size={14} className="text-amber" />
                      <span>Pathway A: Accredited Certification</span>
                    </div>
                    <p>Official credential or license from recognized bodies (e.g., AWS, Cisco, CompTIA, Meta, Microsoft, Google Cloud, Oracle).</p>
                  </div>
                  <div className="pathway-card">
                    <div className="pathway-title">
                      <FileText size={14} className="text-cyan" />
                      <span>Pathway B: Documented Project</span>
                    </div>
                    <p>Concrete projects listing technologies used, architectural responsibilities, and verifiable deliverables.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="rejection-footer">
          <button 
            type="button" 
            className="btn-reenter-resume"
            onClick={onReEnter}
          >
            <RefreshCw size={16} />
            <span>Re-enter Resume with Proper Certification or Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
}
