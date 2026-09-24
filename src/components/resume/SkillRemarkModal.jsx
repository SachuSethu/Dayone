// src/components/resume/SkillRemarkModal.jsx
// Interactive Pop-Up Modal alerting user when specific skill certifications are unverified or invalid:
// "This skill is not valid until you submit a valid certification."

import React from 'react';
import { 
  AlertTriangle, ShieldAlert, Award, FileCode2, 
  Check, ArrowRight, X, ExternalLink, HelpCircle
} from 'lucide-react';

export default function SkillRemarkModal({ 
  remarkedSkills = [], 
  onClose,
  onUpdateResume 
}) {
  if (!remarkedSkills || remarkedSkills.length === 0) return null;

  return (
    <div className="skill-remark-backdrop" onClick={onClose}>
      <div className="skill-remark-card animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="remark-header">
          <div className="remark-icon-circle">
            <AlertTriangle size={28} className="text-amber" />
          </div>
          <div>
            <div className="remark-badge">
              <ShieldAlert size={12} />
              <span>STRICT AI VERIFICATION AUDIT</span>
            </div>
            <h3 className="remark-title">Unverified Skill Certification Notice</h3>
            <p className="remark-subtitle">
              {remarkedSkills.length} skill(s) flagged as unverified per DayOne AI Evaluation Standards
            </p>
          </div>
          <button type="button" className="btn-close-remark" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="remark-body">
          <p className="remark-intro">
            Under DayOne’s strict criteria, skills listed without an accredited certification credential or documented project info cannot be credited. The following skills carry an official evaluation remark:
          </p>

          <div className="remarked-skills-list">
            {remarkedSkills.map((item, idx) => (
              <div key={idx} className="remarked-skill-item">
                <div className="item-header">
                  <span className="skill-name">{item.skill}</span>
                  <span className="remark-status-pill">Invalid / Unverified</span>
                </div>
                <div className="remark-message-box">
                  <AlertTriangle size={13} className="text-amber flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>AI Remark:</strong> {item.validationRemark || 'This skill is not valid until you submit a valid accredited certification.'}
                  </span>
                </div>
                <div className="item-guidance">
                  <span>How to validate:</span> Submit an official certification credential (e.g. AWS, CompTIA, Cisco, Meta, Microsoft) OR add documented project deliverables demonstrating applied usage.
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="remark-footer">
          {onUpdateResume && (
            <button 
              type="button" 
              className="btn-update-resume-secondary"
              onClick={onUpdateResume}
            >
              <span>Update Resume / Add Credentials</span>
            </button>
          )}

          <button 
            type="button" 
            className="btn-acknowledge-remark"
            onClick={onClose}
          >
            <span>Acknowledge & Continue to Diagnostics</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
