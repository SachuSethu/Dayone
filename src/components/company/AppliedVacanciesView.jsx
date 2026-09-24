// src/components/company/AppliedVacanciesView.jsx
// Dedicated View & Column Layout for Applied Vacancies & AI CV Shortlisting
// Automatically scores incoming candidate resumes and provides 1-click HR transmission.

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, Sparkles, Send, CheckCircle2, Star, 
  FileText, Clock, Shield, Award, Eye, Check, 
  ChevronRight, Filter, AlertCircle, ArrowUpRight, Mail 
} from 'lucide-react';
import { getCompanyApplications, sendApplicationToHr, getJobsForCompany } from '../../lib/company/companyStore';
import SendToHrModal from './SendToHrModal';

export default function AppliedVacanciesView({
  company,
  onOpenCandidateProfile,
  onBackToDashboard
}) {
  const [selectedJobFilter, setSelectedJobFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'shortlisted' | 'sent_hr'
  const [dataVersion, setDataVersion] = useState(0);

  // Application to forward to HR
  const [appForHrModal, setAppForHrModal] = useState(null);

  // Load all applications for this company
  const applications = useMemo(() => {
    return getCompanyApplications(company.companyId, company.companyName);
  }, [company, dataVersion]);

  // Load active & dropped jobs for this company
  const companyJobs = useMemo(() => {
    return getJobsForCompany(company.companyId, company.companyName);
  }, [company]);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (selectedJobFilter !== 'all' && app.jobId !== selectedJobFilter && app.jobTitle !== selectedJobFilter) {
        return false;
      }
      if (statusFilter === 'shortlisted' && !app.aiShortlist?.isShortlistedByAi) {
        return false;
      }
      if (statusFilter === 'sent_hr' && !app.sentToHr) {
        return false;
      }
      return true;
    });
  }, [applications, selectedJobFilter, statusFilter]);

  // Handle HR Send
  const handleConfirmSendToHr = (applicationId, hrData) => {
    sendApplicationToHr(applicationId, hrData);
    setDataVersion(v => v + 1);
  };

  const totalAppsCount = applications.length;
  const aiShortlistedCount = applications.filter(a => a.aiShortlist?.isShortlistedByAi).length;
  const sentToHrCount = applications.filter(a => a.sentToHr).length;

  return (
    <div className="applied-vacancies-view animate-fade" style={{ paddingBottom: '3rem' }}>
      {/* Header Banner */}
      <div className="selection-header-banner" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.3rem' }}>
            <h1 className="selection-title" style={{ margin: 0 }}>
              Applied Vacancies & AI CV Shortlisting
            </h1>
            <span className="company-badge-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              LIVE APPLICATIONS
            </span>
          </div>
          <p className="selection-subtitle">
            Incoming candidate applications for your dropped vacancies. DayOne AI automatically scores CVs, verifies skills, and shortlists top candidates for Company HR review.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', textAlign: 'right' }}>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              {totalAppsCount}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase' }}>
              Total Applications
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>
              {aiShortlistedCount}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase' }}>
              AI Auto-Shortlisted
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
              {sentToHrCount}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase' }}>
              Transmitted to HR
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Vacancies Column + Right Applications Column */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: VACANCIES RECEIVING APPLICATIONS */}
        <div style={{ 
          background: 'var(--company-card-bg)', 
          border: '1px solid var(--company-border)', 
          borderRadius: '16px', 
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700 }}>
              Filter by Dropped Vacancy
            </span>
            <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.1rem', color: '#fff', fontWeight: 800 }}>
              Active Vacancies
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              className={`company-nav-btn ${selectedJobFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedJobFilter('all')}
              style={{ justifyContent: 'space-between', padding: '0.75rem 1rem' }}
            >
              <span>All Vacancies</span>
              <span className="company-badge-tag">{totalAppsCount}</span>
            </button>

            {companyJobs.map(job => {
              const jobAppsCount = applications.filter(a => a.jobId === job.id || a.jobTitle === job.title).length;
              const isSelected = selectedJobFilter === job.id || selectedJobFilter === job.title;

              return (
                <button
                  key={job.id}
                  type="button"
                  className={`company-nav-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedJobFilter(job.id)}
                  style={{ 
                    justifyContent: 'space-between', 
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', maxWidth: '200px' }}>
                    <span style={{ fontWeight: 700, color: isSelected ? '#10b981' : '#e5e7eb', fontSize: '0.85rem' }} className="truncate">
                      {job.title}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      {job.location?.split('(')[0] || 'Remote'}
                    </span>
                  </div>
                  <span className={`company-badge-tag ${jobAppsCount > 0 ? '' : 'text-muted'}`} style={{ alignSelf: 'center' }}>
                    {jobAppsCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter: AI Shortlist Status */}
          <div style={{ borderTop: '1px solid var(--company-border)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
              Shortlist Filter
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className={`company-skill-pill ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
                style={{ cursor: 'pointer', background: statusFilter === 'all' ? '#10b981' : undefined, color: statusFilter === 'all' ? '#042f24' : undefined }}
              >
                All Applications
              </button>
              <button 
                type="button" 
                className={`company-skill-pill ${statusFilter === 'shortlisted' ? 'active' : ''}`}
                onClick={() => setStatusFilter('shortlisted')}
                style={{ cursor: 'pointer', background: statusFilter === 'shortlisted' ? '#10b981' : undefined, color: statusFilter === 'shortlisted' ? '#042f24' : undefined }}
              >
                AI Shortlisted ⭐
              </button>
              <button 
                type="button" 
                className={`company-skill-pill ${statusFilter === 'sent_hr' ? 'active' : ''}`}
                onClick={() => setStatusFilter('sent_hr')}
                style={{ cursor: 'pointer', background: statusFilter === 'sent_hr' ? '#06b6d4' : undefined, color: statusFilter === 'sent_hr' ? '#042f24' : undefined }}
              >
                Sent to HR 📨
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CANDIDATE APPLICATIONS & AI CV SHORTLIST CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredApps.length === 0 ? (
            <div style={{ 
              background: 'var(--company-card-bg)', 
              border: '1px solid var(--company-border)', 
              borderRadius: '16px', 
              padding: '3.5rem 2rem', 
              textAlign: 'center' 
            }}>
              <Briefcase size={36} color="#6b7280" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 0.4rem 0' }}>
                No Applications Found For This Filter
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>
                When candidates discover and apply for this vacancy in their feed, their verified CVs will be evaluated here by DayOne AI.
              </p>
            </div>
          ) : (
            filteredApps.map(app => {
              const ai = app.aiShortlist || {};
              const isAiTop = ai.fitScore >= 85;

              return (
                <div 
                  key={app.applicationId} 
                  className="company-path-card animate-fade"
                  style={{ 
                    padding: '1.6rem 1.8rem',
                    border: isAiTop ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--company-border)',
                    boxShadow: isAiTop ? '0 8px 30px rgba(16, 185, 129, 0.12)' : 'none'
                  }}
                >
                  {/* Top Bar: Candidate Info + AI Shortlist Score */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className="company-cand-avatar" style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}>
                        👤
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
                            {app.candidateName}
                          </h3>
                          <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                            {app.candidateTag || '#C-VERIFIED'}
                          </span>
                          {app.sentToHr && (
                            <span style={{ 
                              fontSize: '0.7rem', 
                              padding: '0.15rem 0.6rem', 
                              borderRadius: '999px', 
                              background: 'rgba(56, 189, 248, 0.15)', 
                              color: '#38bdf8', 
                              border: '1px solid rgba(56, 189, 248, 0.3)',
                              fontWeight: 700 
                            }}>
                              SENT TO HR
                            </span>
                          )}
                        </div>
                        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>
                          Applied for: <strong style={{ color: '#fff' }}>{app.jobTitle}</strong> • {app.experience} exp • {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* AI Shortlist Score Pill */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'flex-end' }}>
                        <Sparkles size={16} color={isAiTop ? '#10b981' : '#38bdf8'} />
                        <span style={{ fontSize: '1.7rem', fontWeight: 900, color: isAiTop ? '#10b981' : '#38bdf8', lineHeight: 1 }}>
                          {ai.fitScore || 90}%
                        </span>
                      </div>
                      <span style={{ 
                        fontSize: '0.68rem', 
                        fontWeight: 700, 
                        color: isAiTop ? '#34d399' : '#38bdf8', 
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        {ai.aiShortlistStatus || 'AI Shortlisted'}
                      </span>
                    </div>
                  </div>

                  {/* AI Shortlist Rationale Callout Box */}
                  <div style={{ 
                    background: isAiTop ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)', 
                    border: isAiTop ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '0.9rem 1.2rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                      <Star size={13} />
                      Company AI Shortlist Verdict:
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#e5e7eb', lineHeight: 1.45 }}>
                      {ai.aiRationale}
                    </p>
                  </div>

                  {/* Attached CV / Resume & Cover Pitch Note */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                        Attached Candidate Resume
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>
                        <FileText size={15} color="#10b981" />
                        <span className="truncate">{app.cvName || 'DayOne_ATS_Resume.pdf'}</span>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                        Candidate Pitch Note
                      </span>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#d1d5db', lineHeight: 1.4, maxHeight: '38px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        "{app.coverNote || 'Applied with verified DayOne performance credentials.'}"
                      </p>
                    </div>
                  </div>

                  {/* Actions: Send to HR, View Telemetry */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--company-border)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Shield size={12} color="#10b981" />
                      <span>Blind Evaluation Active • Personal Account Protected</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button 
                        type="button" 
                        className="company-btn-sm-view"
                        onClick={() => onOpenCandidateProfile({
                          name: app.candidateName,
                          candidateTag: app.candidateTag,
                          targetRole: app.jobTitle,
                          headline: app.candidateHeadline,
                          overallPerformance: ai.fitScore || 90,
                          skills: app.candidateVector || {},
                          location: app.location || 'Remote',
                          resumeSummary: app.coverNote
                        })}
                      >
                        <Eye size={14} />
                        View Telemetry
                      </button>

                      {!app.sentToHr ? (
                        <button 
                          type="button"
                          className="company-post-btn"
                          onClick={() => setAppForHrModal(app)}
                          style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
                        >
                          <Send size={14} />
                          Send to Company HR 📨
                        </button>
                      ) : (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.45rem', 
                          background: 'rgba(16, 185, 129, 0.15)', 
                          border: '1px solid rgba(16, 185, 129, 0.35)',
                          color: '#34d399', 
                          padding: '0.5rem 0.9rem', 
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700 
                        }}>
                          <CheckCircle2 size={15} />
                          <span>Dossier Transmitted to HR</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* SEND TO HR MODAL */}
      {appForHrModal && (
        <SendToHrModal 
          application={appForHrModal}
          company={company}
          onConfirmSend={handleConfirmSendToHr}
          onClose={() => setAppForHrModal(null)}
        />
      )}
    </div>
  );
}
