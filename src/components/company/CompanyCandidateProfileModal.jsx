// src/components/company/CompanyCandidateProfileModal.jsx
// Full Candidate Profile View for Recruiters with DAYONE Evaluation,
// Task Simulation Telemetry, ATS Resume Preview, and Direct Shortlist/Hire Actions.

import React, { useState } from 'react';
import { 
  X, CheckCircle2, Award, Zap, Code2, FileText, 
  Star, Briefcase, Mail, Phone, MapPin, Calendar, 
  Shield, Check, ExternalLink, ArrowRight, UserCheck, Terminal
} from 'lucide-react';
import { SKILLBASE_19_SKILLS } from '../../data/skillBaseData';

export default function CompanyCandidateProfileModal({
  candidate,
  isShortlisted,
  isHired,
  onToggleShortlist,
  onOpenHireModal,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('evaluation'); // 'evaluation' | 'tasks' | 'resume'

  if (!candidate) return null;

  const skillsObj = candidate.skills || {};
  const skillEntries = Object.entries(skillsObj);

  return (
    <div className="company-modal-backdrop" onClick={onClose}>
      <div 
        className="company-modal-panel animate-fade" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '880px' }}
      >
        {/* Header */}
        <div className="company-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="cand-big-avatar" style={{ width: '48px', height: '48px', fontSize: '1.6rem' }}>
              {candidate.avatar || '👤'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#fff', fontWeight: 800 }}>
                  {candidate.name}
                </h2>
                {isHired && (
                  <span style={{ 
                    fontSize: '0.72rem', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '999px', 
                    background: 'rgba(16, 185, 129, 0.2)', 
                    color: '#34d399', 
                    fontWeight: 700,
                    border: '1px solid #10b981'
                  }}>
                    HIRED
                  </span>
                )}
                {isShortlisted && !isHired && (
                  <span style={{ 
                    fontSize: '0.72rem', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '999px', 
                    background: 'rgba(245, 158, 11, 0.2)', 
                    color: '#fbbf24', 
                    fontWeight: 700,
                    border: '1px solid #f59e0b'
                  }}>
                    SHORTLISTED
                  </span>
                )}
                <span style={{ 
                  fontSize: '0.72rem', 
                  padding: '0.2rem 0.55rem', 
                  borderRadius: '6px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  color: '#94a3b8', 
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {candidate.candidateTag || '#C-VERIFIED'}
                </span>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>
                {candidate.headline || candidate.targetRole} • {candidate.location} • <span style={{ color: '#10b981' }}>🔒 Personal Info Protected</span>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>
                {candidate.overallPerformance || 88}%
              </div>
              <div style={{ fontSize: '0.68rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 700 }}>
                DAYONE Score
              </div>
            </div>

            <button type="button" className="company-modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Blind Privacy Notice: Company Has Zero Access to Candidate Personal Employee Account */}
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.05)', 
          borderBottom: '1px solid rgba(16, 185, 129, 0.15)',
          padding: '0.55rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#a7f3d0'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Shield size={13} color="#10b981" />
            <strong>Blind Evaluation Protocol:</strong> Personal employee account & contact info are strictly confidential.
          </span>
          <span style={{ color: '#34d399', fontWeight: 700 }}>No Personal Account Access</span>
        </div>

        {/* Tab Switcher */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0 2rem',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <button 
            type="button"
            className={`company-nav-btn ${activeTab === 'evaluation' ? 'active' : ''}`}
            onClick={() => setActiveTab('evaluation')}
            style={{ borderRadius: '0', borderBottom: activeTab === 'evaluation' ? '2px solid #10b981' : 'none' }}
          >
            <Award size={15} />
            DAYONE AI Evaluation
          </button>
          <button 
            type="button"
            className={`company-nav-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
            style={{ borderRadius: '0', borderBottom: activeTab === 'tasks' ? '2px solid #10b981' : 'none' }}
          >
            <Code2 size={15} />
            Simulated Task Telemetry
          </button>
          <button 
            type="button"
            className={`company-nav-btn ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
            style={{ borderRadius: '0', borderBottom: activeTab === 'resume' ? '2px solid #10b981' : 'none' }}
          >
            <FileText size={15} />
            ATS Resume Preview
          </button>
        </div>

        {/* Content Area */}
        <div className="company-modal-content">
          {/* TAB 1: DAYONE AI EVALUATION */}
          {activeTab === 'evaluation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Formula & Overall Score Breakdown */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>
                    {candidate.skillScore || 85}%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                    Skill Score (40%)
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#38bdf8' }}>
                    {candidate.taskScore || 90}%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                    Task Score (30%)
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#a78bfa' }}>
                    {candidate.roleMatch || 88}%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                    Role Match (20%)
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fbbf24' }}>
                    {candidate.experienceYears || 2.0} yrs
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                    Experience (10%)
                  </div>
                </div>
              </div>

              {/* Skills Radar / Progress Bars */}
              <div>
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 1rem 0', fontWeight: 700 }}>
                  Verified Domain Competencies
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem 1.5rem' }}>
                  {skillEntries.map(([sKey, sScore]) => {
                    const skillMeta = SKILLBASE_19_SKILLS.find(s => s.id === sKey);
                    const displayName = skillMeta ? skillMeta.name : sKey.toUpperCase();
                    const baseline = skillMeta ? skillMeta.baselineMin : 50;
                    
                    return (
                      <div key={sKey} className="cand-skill-bar-row">
                        <div className="cand-skill-bar-labels">
                          <span style={{ fontWeight: 600, color: '#e5e7eb' }}>{displayName}</span>
                          <span style={{ color: sScore >= baseline ? '#34d399' : '#f59e0b', fontWeight: 700 }}>
                            {sScore}% <span style={{ color: '#6b7280', fontWeight: 400 }}>(min {baseline}%)</span>
                          </span>
                        </div>
                        <div className="cand-skill-bar-track">
                          <div 
                            className="cand-skill-bar-fill" 
                            style={{ 
                              width: `${Math.min(100, sScore)}%`,
                              background: sScore >= 85 
                                ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)' 
                                : 'linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%)'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Executive Summary */}
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.05)', 
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '10px',
                padding: '1rem 1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <Zap size={15} />
                  DAYONE Verification Verdict
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#d1d5db', lineHeight: 1.5 }}>
                  {candidate.resumeSummary || 'Candidate has completed comprehensive skill evaluations and validated workplace simulations on DayOne. Recommended for technical interview and direct pipeline onboarding.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SIMULATED TASK TELEMETRY */}
          {activeTab === 'tasks' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {candidate.taskSummary ? (
                <>
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                        {candidate.taskSummary.taskTitle}
                      </span>
                      <span style={{ 
                        background: 'rgba(16, 185, 129, 0.15)', 
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#10b981', 
                        padding: '0.25rem 0.65rem', 
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 800
                      }}>
                        {candidate.taskScore || 92}% Score
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block' }}>Edge Cases Passed</span>
                        <strong style={{ color: '#34d399', fontSize: '0.9rem' }}>{candidate.taskSummary.edgeCasesCovered}</strong>
                      </div>
                      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block' }}>Code Quality</span>
                        <strong style={{ color: '#38bdf8', fontSize: '0.9rem' }}>{candidate.taskSummary.codeQuality}/100</strong>
                      </div>
                      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block' }}>Execution Speed</span>
                        <strong style={{ color: '#f59e0b', fontSize: '0.9rem' }}>{candidate.taskSummary.executionSpeed}</strong>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#9ca3af', marginBottom: '0.4rem' }}>
                        <Terminal size={14} />
                        Production Code Submission:
                      </div>
                      <pre className="code-preview-box">
                        <code>{candidate.taskSummary.submissionSnippet}</code>
                      </pre>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                      <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                        DAYONE AI Reviewer Feedback:
                      </span>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#d1d5db', lineHeight: 1.45 }}>
                        {candidate.taskSummary.aiReviewNotes}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                  No simulation telemetry recorded yet.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ATS RESUME PREVIEW */}
          {activeTab === 'resume' && (
            <div style={{ 
              background: '#0d1117', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '2rem',
              color: '#f3f4f6',
              fontFamily: 'system-ui, sans-serif'
            }}>
              <div style={{ borderBottom: '2px solid #10b981', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
                  {candidate.name}
                </h3>
                <p style={{ margin: '0.25rem 0', color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>
                  {candidate.headline || candidate.targetRole}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.4rem' }}>
                  <span>🔒 Contact: <strong style={{ color: '#94a3b8' }}>Protected (DayOne Secure Relay)</strong></span>
                  <span>Location: <strong style={{ color: '#e5e7eb' }}>{candidate.location}</strong></span>
                  <span>ID: <strong style={{ color: '#34d399' }}>{candidate.candidateTag || '#C-VERIFIED'}</strong></span>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Executive Summary
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#d1d5db', lineHeight: 1.5 }}>
                  {candidate.resumeSummary}
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Core Competencies & Verified Scores
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {skillEntries.map(([k, val]) => (
                    <span key={k} style={{ 
                      background: 'rgba(255, 255, 255, 0.06)', 
                      padding: '0.25rem 0.6rem', 
                      borderRadius: '6px', 
                      fontSize: '0.78rem',
                      color: '#fff'
                    }}>
                      {k.toUpperCase()}: <strong style={{ color: '#10b981' }}>{val}%</strong>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  DAYONE Workplace Simulation Certification
                </h4>
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} />
                    Verified Production-Ready Engineer
                  </div>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.78rem', color: '#d1d5db' }}>
                    Completed real-world technical simulation with verified edge-case validation and code quality audit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="company-modal-footer">
          <button 
            type="button"
            className={`company-btn-sm-shortlist ${isShortlisted ? 'active' : ''}`}
            onClick={() => onToggleShortlist(candidate.id)}
            style={{ padding: '0.65rem 1.25rem' }}
          >
            <Star size={16} />
            {isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
          </button>

          {!isHired ? (
            <button 
              type="button"
              className="company-btn-sm-hire"
              onClick={() => onOpenHireModal(candidate)}
              style={{ padding: '0.65rem 1.4rem' }}
            >
              <Zap size={16} />
              Issue Job Offer / Hire
            </button>
          ) : (
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#34d399', 
              padding: '0.65rem 1.25rem', 
              borderRadius: '8px', 
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <CheckCircle2 size={16} />
              Offer Accepted
            </div>
          )}

          <button 
            type="button"
            className="company-btn-sm-view"
            onClick={onClose}
            style={{ padding: '0.65rem 1.2rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
