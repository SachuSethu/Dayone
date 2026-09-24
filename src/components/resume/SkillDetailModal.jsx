// src/components/resume/SkillDetailModal.jsx
// Detailed modal inspector displaying exact resume evidence quotes, role demands, and simulation actions.

import React from 'react';
import { 
  X, CheckCircle, AlertTriangle, ArrowRight, 
  Quote, Target, Lightbulb, Shield, Compass, AlertOctagon, GraduationCap, Briefcase
} from 'lucide-react';

export default function SkillDetailModal({ skill, onClose, onTestSkill }) {
  if (!skill) return null;

  const isZero = skill.candidateEvidencePercent === 0;
  const isHighGap = skill.alignmentStatus === 'high_priority_gap';
  const isDevOpp = skill.alignmentStatus === 'development_opportunity';
  const isAligned = skill.alignmentStatus === 'strong_alignment';

  return (
    <div className="skill-modal-backdrop" onClick={onClose}>
      <div className="skill-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="skill-modal-header">
          <div className="modal-title-group">
            <span className="skill-category-badge">{skill.category || 'Core Skill'}</span>
            <h2 className="skill-modal-name">{skill.skill || skill.name}</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Comparison Metric Strip */}
        <div className="metric-strip">
          <div className="strip-col">
            <span className="col-label">Resume Evidence</span>
            <div className="col-val-row">
              <span className={`col-val ${isZero ? 'text-rose' : ''}`}>{skill.candidateEvidencePercent}%</span>
              <span className={`evidence-badge ${isZero ? 'zero' : skill.evidenceLevel}`}>
                {isZero ? '0% / Unverified' : `${skill.evidenceLevel} evidence`}
              </span>
            </div>
            <div className="col-bar-bg">
              <div 
                className={`col-bar-fill candidate ${isZero ? 'zero' : ''}`}
                style={{ width: `${Math.max(2, skill.candidateEvidencePercent)}%` }}
              />
            </div>
          </div>

          <div className="strip-divider" />

          <div className="strip-col">
            <span className="col-label">Role Requirement</span>
            <div className="col-val-row">
              <span className="col-val">{skill.roleRequirementPercent}%</span>
              <span className="role-weight-tag">production weight</span>
            </div>
            <div className="col-bar-bg">
              <div 
                className="col-bar-fill benchmark" 
                style={{ width: `${skill.roleRequirementPercent}%` }}
              />
            </div>
          </div>

          <div className="strip-divider" />

          <div className="strip-col">
            <span className="col-label">Opportunity Gap</span>
            <div className="col-val-row">
              <span className="col-val gap-val">{skill.gapPercentage}%</span>
              <span className={`status-badge ${skill.alignmentStatus}`}>
                {isAligned ? 'Strong Alignment' : isDevOpp ? 'Dev Opportunity' : (isZero ? 'Zero Evidence' : 'High Priority Gap')}
              </span>
            </div>
            <span className="priority-text">Priority: <strong>{skill.priority?.toUpperCase()}</strong></span>
          </div>
        </div>

        {/* Official AI Evaluation Remark Callout */}
        {(skill.isRemarkedInvalid || skill.validationRemark) && (
          <div className="skill-modal-remark-banner">
            <AlertTriangle size={20} className="text-amber flex-shrink-0 mt-0.5" />
            <div>
              <div className="remark-banner-title">OFFICIAL AI EVALUATION AUDIT REMARK</div>
              <p className="remark-banner-text">
                {skill.validationRemark || "This skill is not valid until you submit a valid certification."}
              </p>
              <span className="remark-banner-sub">
                Official Standard: Course claims or standalone keyword mentions without accredited certificates or documented project deliverables are not valid.
              </span>
            </div>
          </div>
        )}

        {/* Skill Verification Basis Strip */}
        <div className="modal-provenance-strip">
          <span className="prov-strip-label">Skill Verification Basis:</span>
          {skill.candidateEvidencePercent >= 75 ? (
            <span className="prov-chip cert"><CheckCircle size={13} /> ⭐ Primary Technical Competency</span>
          ) : skill.candidateEvidencePercent >= 50 ? (
            <span className="prov-chip proj"><CheckCircle size={13} /> 📘 Documented Resume Skill</span>
          ) : skill.candidateEvidencePercent >= 25 ? (
            <span className="prov-chip mod"><Shield size={13} /> 💡 Developing Skill Baseline</span>
          ) : (
            <span className="prov-chip zero"><Compass size={13} /> 🎯 Simulation Baseline (To Be Validated)</span>
          )}
        </div>

        {/* Evidence Section */}
        <div className="modal-body-section">
          <div className="section-label-row">
            <Quote size={16} className="section-icon" />
            <h4 className="section-title">Why Detected in Resume</h4>
          </div>
          <div className="evidence-quotes-box">
            {skill.evidence && skill.evidence.length > 0 ? (
              <ul className="evidence-list">
                {skill.evidence.map((quote, idx) => (
                  <li key={idx} className="evidence-item">
                    <span className="quote-mark">“</span>
                    <span className="quote-text">{quote}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-evidence-text">
                Baseline role competency. Practical workplace simulation will establish verified demonstrated ability.
              </p>
            )}
          </div>
        </div>

        {/* Role Demand Context */}
        <div className="modal-body-section">
          <div className="section-label-row">
            <Target size={16} className="section-icon" />
            <h4 className="section-title">Production Role Expectation</h4>
          </div>
          <p className="role-demand-text">
            {skill.description || `${skill.skill} is an essential capability for production reliability, client performance, and team collaboration.`}
          </p>
        </div>

        {/* DayOne AI Recommendation */}
        <div className="modal-body-section recommendation-section">
          <div className="section-label-row">
            <Lightbulb size={16} className="section-icon" />
            <h4 className="section-title">DayOne AI Diagnostic Recommendation</h4>
          </div>
          <p className="recommendation-text">
            {skill.isRemarkedInvalid ? (
              `${skill.skill} carries an official AI remark: "${skill.validationRemark || 'This skill is not valid until you submit a valid certification.'}" Under DayOne's strict evaluation policy, course claims without accredited certificates are given zero value. You can validate this skill directly in today's interactive First-Day Mission.`
            ) : isZero ? (
              `${skill.skill} received a 0% evidence rating because your resume lacked documented project implementation details or an accredited certification credential. Passive course mentions without certificates are discarded. We recommend proving this skill directly in today's interactive First-Day Mission.`
            ) : isAligned ? (
              `Your resume provides solid project-backed evidence for ${skill.skill}. The upcoming simulation will test how you apply this in edge-case production scenarios.`
            ) : (
              `${skill.skill} has a ${skill.gapPercentage}% gap against production benchmarks. Rather than spending weeks on passive video courses, DayOne recommends validating this capability directly in today's interactive First-Day Mission.`
            )}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="modal-disclaimer">
          <Shield size={13} />
          <span>Profile is estimated from strict resume parsing. Real proficiency is established via DayOne's workplace simulator.</span>
        </div>

        {/* Modal Actions */}
        <div className="skill-modal-actions">
          <button className="btn-modal-cancel" onClick={onClose}>
            Back to Opportunity Map
          </button>
          <button 
            className="btn-modal-test" 
            onClick={() => {
              onClose();
              if (onTestSkill) onTestSkill(skill);
            }}
          >
            <span>Test This Skill in Simulation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
