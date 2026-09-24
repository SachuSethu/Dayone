// src/components/company/CompanyDashboard.jsx
// Complete DayOne Company / Employer POV Module
// Features KPIs, Interested Candidates, Completed Tasks, 3 Distinct Hiring Paths,
// Dream Candidate Vacancy Engine, Candidate Inspection, and Industry Tech Trends.

import React, { useState, useMemo, useEffect } from 'react';
import CompanyNavbar from './CompanyNavbar';
import CategoryCandidateSelection from './CategoryCandidateSelection';
import CompanyCandidateProfileModal from './CompanyCandidateProfileModal';
import HireCandidateModal from './HireCandidateModal';
import CreateDreamJobModal from './CreateDreamJobModal';
import AppliedVacanciesView from './AppliedVacanciesView';
import SendToHrModal from './SendToHrModal';

import { 
  Users, CheckCircle2, Star, Zap, Briefcase, 
  Code2, Shield, Palette, Sparkles, TrendingUp, 
  ArrowRight, Eye, Calendar, DollarSign, MapPin, 
  ExternalLink, ChevronRight, FileText, Check, Send 
} from 'lucide-react';

import { 
  getCompanyDashboardStats, 
  toggleShortlistCandidate, 
  hireCandidate,
  sendApplicationToHr,
  getJobsForCompany 
} from '../../lib/company/companyStore';
import { SKILLBASE_NEWS } from '../../data/skillBaseData';
import './company.css';

export default function CompanyDashboard({
  currentUser,
  onLogout,
  onSwitchToCandidateView
}) {
  const company = currentUser || {
    companyId: 'company_001',
    companyName: 'TechNova Labs',
    email: 'hiring@technova.io',
    industry: 'Enterprise AI & Cloud Infrastructure',
    location: 'Bengaluru, India (Hybrid)',
    logo: '🚀'
  };

  // Navigation View: 'dashboard' | 'hire-frontend' | 'hire-cybersecurity' | 'hire-uiux' | 'trends'
  const [currentView, setCurrentView] = useState('dashboard');

  // Trigger state for real-time local mutations
  const [dataVersion, setDataVersion] = useState(0);

  // Listen for new candidate applications or updates across platform
  useEffect(() => {
    const handleUpdate = () => {
      setDataVersion(v => v + 1);
    };
    window.addEventListener('dayone:application_received', handleUpdate);
    window.addEventListener('dayone:application_updated', handleUpdate);
    window.addEventListener('dayone:job_created', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('dayone:application_received', handleUpdate);
      window.removeEventListener('dayone:application_updated', handleUpdate);
      window.removeEventListener('dayone:job_created', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Modals state
  const [inspectCandidate, setInspectCandidate] = useState(null);
  const [candidateToHire, setCandidateToHire] = useState(null);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [appForHrModal, setAppForHrModal] = useState(null);

  // News Category Filter
  const [newsFilter, setNewsFilter] = useState('All');

  // Load Company Stats
  const stats = useMemo(() => {
    return getCompanyDashboardStats(company);
  }, [company, dataVersion]);

  // Handle Shortlist Toggle
  const handleToggleShortlist = (candId) => {
    toggleShortlistCandidate(company.companyId, candId);
    setDataVersion(v => v + 1);
  };

  // Handle Hire Candidate
  const handleConfirmHire = (offerData) => {
    if (!candidateToHire) return;
    hireCandidate(company.companyId, candidateToHire, offerData);
    setDataVersion(v => v + 1);
  };

  // Handle Transmit to HR
  const handleConfirmSendToHr = (applicationId, hrData) => {
    sendApplicationToHr(applicationId, hrData);
    setDataVersion(v => v + 1);
  };

  // Handle Vacancy Created
  const handleVacancyCreated = (newJob) => {
    setDataVersion(v => v + 1);
  };

  // Filtered News Items
  const filteredNews = useMemo(() => {
    if (newsFilter === 'All') return SKILLBASE_NEWS.slice(0, 8);
    return SKILLBASE_NEWS.filter(n => n.category.toLowerCase().includes(newsFilter.toLowerCase())).slice(0, 8);
  }, [newsFilter]);

  const hiredCandidateIds = stats.hiredList.map(h => h.candidateId);

  return (
    <div className="company-root">
      {/* Persistent Company Navbar */}
      <CompanyNavbar 
        company={company}
        currentView={currentView}
        appliedCount={stats.applicationCount}
        onNavigate={(view) => setCurrentView(view)}
        onOpenCreateJob={() => setShowCreateJobModal(true)}
        onLogout={onLogout}
      />

      <main className="company-main-container">
        {/* SUBVIEW 0: APPLIED VACANCIES & AI CV SHORTLISTING */}
        {currentView === 'applied-vacancies' && (
          <AppliedVacanciesView 
            company={company}
            onOpenCandidateProfile={(c) => setInspectCandidate(c)}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* SUBVIEW 1: FRONTEND HIRING PATH */}
        {currentView === 'hire-frontend' && (
          <CategoryCandidateSelection 
            pathId="frontend"
            company={company}
            shortlistedIds={stats.shortlistedIds}
            hiredList={stats.hiredList}
            onToggleShortlist={handleToggleShortlist}
            onOpenCandidateProfile={(c) => setInspectCandidate(c)}
            onOpenHireModal={(c) => setCandidateToHire(c)}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* SUBVIEW 2: CYBERSECURITY HIRING PATH */}
        {currentView === 'hire-cybersecurity' && (
          <CategoryCandidateSelection 
            pathId="cybersecurity"
            company={company}
            shortlistedIds={stats.shortlistedIds}
            hiredList={stats.hiredList}
            onToggleShortlist={handleToggleShortlist}
            onOpenCandidateProfile={(c) => setInspectCandidate(c)}
            onOpenHireModal={(c) => setCandidateToHire(c)}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* SUBVIEW 3: UI/UX HIRING PATH */}
        {currentView === 'hire-uiux' && (
          <CategoryCandidateSelection 
            pathId="uiux"
            company={company}
            shortlistedIds={stats.shortlistedIds}
            hiredList={stats.hiredList}
            onToggleShortlist={handleToggleShortlist}
            onOpenCandidateProfile={(c) => setInspectCandidate(c)}
            onOpenHireModal={(c) => setCandidateToHire(c)}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* SUBVIEW 4: INDUSTRY TRENDS VIEW */}
        {currentView === 'trends' && (
          <div>
            <div className="selection-header-banner">
              <div>
                <h1 className="selection-title">Latest Technology & Industry Trends</h1>
                <p className="selection-subtitle">
                  Curated intelligence for technical hiring managers, engineering directors, and cybersecurity leaders.
                </p>
              </div>
              <button 
                type="button" 
                className="selection-back-btn" 
                onClick={() => setCurrentView('dashboard')}
                style={{ margin: 0 }}
              >
                Back to Dashboard
              </button>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {['All', 'Technology', 'Cybersecurity', 'Design', 'AI'].map(cat => (
                <button 
                  key={cat}
                  type="button"
                  className={`company-nav-btn ${newsFilter === cat ? 'active' : ''}`}
                  onClick={() => setNewsFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News Grid */}
            <div className="company-news-grid">
              {filteredNews.map(item => (
                <div key={item.id} className="company-news-card">
                  <div>
                    <span className="news-tag">{item.category}</span>
                    <h3 className="news-title">{item.title}</h3>
                  </div>
                  <div className="news-meta">
                    <span>{item.source}</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBVIEW 5: MAIN COMPANY DASHBOARD */}
        {currentView === 'dashboard' && (
          <>
            {/* Welcome Banner */}
            <div className="company-welcome-banner animate-fade">
              <div>
                <h1 className="company-welcome-title">
                  Welcome back, {company.companyName}
                </h1>
                <p className="company-welcome-subtitle">
                  AI-powered talent verification pipeline active. Candidates are evaluated against your production benchmarks and simulated workplace missions.
                </p>
              </div>

              <div className="company-banner-actions">
                <button 
                  type="button" 
                  className="company-post-btn"
                  onClick={() => setShowCreateJobModal(true)}
                >
                  <Briefcase size={16} />
                  Drop New Vacancy
                </button>
              </div>
            </div>

            {/* Real-time KPI Cards Grid */}
            <div className="company-kpis-grid">
              {/* 1. Applied Vacancies & AI CV Shortlist */}
              <div 
                className="company-kpi-card" 
                style={{ cursor: 'pointer', border: '1px solid rgba(16, 185, 129, 0.4)' }}
                onClick={() => setCurrentView('applied-vacancies')}
                title="Click to view all incoming applications & AI Shortlisted CVs"
              >
                <div className="company-kpi-header">
                  <div className="company-kpi-icon-wrap kpi-icon-green">
                    <Sparkles size={18} />
                  </div>
                  <span className="company-badge-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                    AI SHORTLIST: {stats.aiShortlistedCount}
                  </span>
                </div>
                <div className="company-kpi-value" style={{ color: '#10b981' }}>{stats.applicationCount}</div>
                <div className="company-kpi-label">Applied Vacancies</div>
                <div className="company-kpi-hint" style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>Review AI CV Matches</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* 2. Interested Candidates */}
              <div className="company-kpi-card">
                <div className="company-kpi-header">
                  <div className="company-kpi-icon-wrap kpi-icon-green">
                    <Users size={18} />
                  </div>
                  <span className="company-badge-tag">APPLICANTS</span>
                </div>
                <div className="company-kpi-value">{stats.interestedCount}</div>
                <div className="company-kpi-label">Interested Candidates</div>
                <div className="company-kpi-hint">
                  <Sparkles size={12} /> Live applications to {company.companyName}
                </div>
              </div>

              {/* 3. Completed Tasks */}
              <div className="company-kpi-card">
                <div className="company-kpi-header">
                  <div className="company-kpi-icon-wrap kpi-icon-blue">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="company-badge-tag">VERIFIED</span>
                </div>
                <div className="company-kpi-value">{stats.completedTasksCount}</div>
                <div className="company-kpi-label">Completed Tasks</div>
                <div className="company-kpi-hint" style={{ color: '#38bdf8' }}>
                  <Code2 size={12} /> Passed simulation challenges
                </div>
              </div>

              {/* 4. Shortlisted */}
              <div className="company-kpi-card">
                <div className="company-kpi-header">
                  <div className="company-kpi-icon-wrap kpi-icon-amber">
                    <Star size={18} />
                  </div>
                  <span className="company-badge-tag" style={{ color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.1)' }}>
                    STARRED
                  </span>
                </div>
                <div className="company-kpi-value">{stats.shortlistedCount}</div>
                <div className="company-kpi-label">Shortlisted</div>
                <div className="company-kpi-hint" style={{ color: '#fbbf24' }}>
                  Curated candidate shortlist
                </div>
              </div>

              {/* 5. Hired */}
              <div className="company-kpi-card">
                <div className="company-kpi-header">
                  <div className="company-kpi-icon-wrap kpi-icon-purple">
                    <Zap size={18} />
                  </div>
                  <span className="company-badge-tag" style={{ color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.1)' }}>
                    OFFERS
                  </span>
                </div>
                <div className="company-kpi-value">{stats.hiredCount}</div>
                <div className="company-kpi-label">Hired Candidates</div>
                <div className="company-kpi-hint" style={{ color: '#c084fc' }}>
                  Verified offers accepted
                </div>
              </div>

              {/* 6. Active Jobs */}
              <div className="company-kpi-card">
                <div className="company-kpi-header">
                  <div className="company-kpi-icon-wrap kpi-icon-pink">
                    <Briefcase size={18} />
                  </div>
                  <span className="company-badge-tag" style={{ color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.3)', background: 'rgba(236, 72, 153, 0.1)' }}>
                    OPEN
                  </span>
                </div>
                <div className="company-kpi-value">{stats.activeJobsCount}</div>
                <div className="company-kpi-label">Active Vacancies</div>
                <div className="company-kpi-hint" style={{ color: '#f472b6' }}>
                  Live in candidate feed
                </div>
              </div>
            </div>

            {/* SECTION 0: APPLIED VACANCIES & AI CV SHORTLIST */}
            <div style={{ marginBottom: '3rem' }}>
              <div className="company-section-header">
                <div className="company-section-title-wrap">
                  <h2 className="company-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Sparkles size={20} color="#10b981" />
                    Applied Vacancies & AI CV Shortlist
                  </h2>
                  <span className="company-section-count">
                    {stats.applicationCount} Applications • {stats.aiShortlistedCount} AI Shortlisted
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Shield size={13} /> Strict Blind Candidate Evaluation Active
                  </span>
                  <button 
                    type="button" 
                    className="company-nav-btn active"
                    onClick={() => setCurrentView('applied-vacancies')}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    Open Applied Vacancies Column <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="company-candidates-list-card">
                {stats.applications.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                    <Briefcase size={36} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>No candidate applications received yet.</p>
                    <p style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
                      When candidates apply for your dropped vacancies, DayOne AI automatically scores their CV and flags shortlist matches here.
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="company-candidates-table">
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Applied Vacancy</th>
                          <th>AI Match Score</th>
                          <th>AI Shortlist Status</th>
                          <th>Attached Resume</th>
                          <th style={{ textAlign: 'right' }}>HR Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.applications.slice(0, 5).map(app => {
                          const isSent = app.sentToHr;
                          const isShort = app.aiShortlist?.isShortlistedByAi;
                          return (
                            <tr key={app.applicationId}>
                              <td>
                                <div className="company-cand-cell-profile">
                                  <div className="company-cand-avatar">👤</div>
                                  <div>
                                    <div className="company-cand-name" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                      <span>{app.candidateName}</span>
                                      <span style={{ fontSize: '0.68rem', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                                        {app.candidateTag}
                                      </span>
                                    </div>
                                    <div className="company-cand-headline">
                                      {app.candidateRole} • {app.experience || '2+ yrs'} • <span style={{ color: '#10b981' }}>Verified CV</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div style={{ fontWeight: 600, color: '#e5e7eb', fontSize: '0.85rem' }}>
                                  {app.jobTitle}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                                  Applied {new Date(app.appliedAt).toLocaleDateString()}
                                </div>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span className={`company-score-badge ${app.aiShortlist?.fitScore >= 85 ? 'score-badge-high' : 'score-badge-mid'}`}>
                                    {app.aiShortlist?.fitScore || app.readinessScore}%
                                  </span>
                                  {isShort && (
                                    <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                                      ★ High Fit
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td>
                                <span style={{ 
                                  fontSize: '0.75rem', 
                                  padding: '0.2rem 0.55rem', 
                                  borderRadius: '6px', 
                                  fontWeight: 600,
                                  background: isShort ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.12)',
                                  color: isShort ? '#34d399' : '#38bdf8',
                                  border: isShort ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(56, 189, 248, 0.3)'
                                }}>
                                  {app.aiShortlist?.aiShortlistStatus || 'Under Evaluation'}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#93c5fd', fontSize: '0.78rem' }}>
                                  <FileText size={13} />
                                  <span style={{ maxWidth: '140px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={app.cvName}>
                                    {app.cvName || 'DayOne_ATS_Resume.pdf'}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="company-action-btns-cell" style={{ justifyContent: 'flex-end' }}>
                                  <button
                                    type="button"
                                    className="company-btn-sm-view"
                                    onClick={() => setCurrentView('applied-vacancies')}
                                    title="View full AI CV score breakdown & skill comparison"
                                  >
                                    <Eye size={12} /> Inspect AI Match
                                  </button>
                                  {isSent ? (
                                    <span style={{ 
                                      display: 'inline-flex', 
                                      alignItems: 'center', 
                                      gap: '0.3rem', 
                                      color: '#34d399', 
                                      fontSize: '0.75rem', 
                                      fontWeight: 600,
                                      background: 'rgba(16, 185, 129, 0.1)',
                                      padding: '0.35rem 0.65rem',
                                      borderRadius: '6px',
                                      border: '1px solid rgba(16, 185, 129, 0.25)'
                                    }}>
                                      <CheckCircle2 size={13} /> Sent to HR
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      className="company-btn-sm-hire"
                                      onClick={() => setAppForHrModal(app)}
                                      title="Forward AI-shortlisted dossier directly to Company HR"
                                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#042f24' }}
                                    >
                                      <Send size={12} /> Send to HR
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 1: CANDIDATES INTERESTED IN YOUR COMPANY */}
            <div style={{ marginBottom: '3rem' }}>
              <div className="company-section-header">
                <div className="company-section-title-wrap">
                  <h2 className="company-section-title">Candidates Interested in Your Company</h2>
                  <span className="company-section-count">{stats.interestedCandidates.length} Candidates</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Shield size={13} /> Blind Evaluation Protocol Active — Candidate personal employee accounts & contact info are strictly confidential.
                </span>
              </div>

              <div className="company-candidates-list-card">
                <div style={{ overflowX: 'auto' }}>
                  <table className="company-candidates-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Target Role</th>
                        <th>Readiness Score</th>
                        <th>Task Status</th>
                        <th>Resume Attached</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.interestedCandidates.map(cand => {
                        const isShort = stats.shortlistedIds.includes(cand.id);
                        const isHired = hiredCandidateIds.includes(cand.id);

                        return (
                          <tr key={cand.id}>
                            <td 
                              style={{ cursor: 'pointer' }}
                              onClick={() => setInspectCandidate(cand)}
                              title="Click to view candidate verification breakdown"
                            >
                              <div className="company-cand-cell-profile">
                                <div className="company-cand-avatar">{cand.avatar || '👤'}</div>
                                <div>
                                  <div className="company-cand-name" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                    <span>{cand.name}</span>
                                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                                      {cand.candidateTag || '#C-VERIFIED'}
                                    </span>
                                  </div>
                                  <div className="company-cand-headline">{cand.experienceYears} yrs exp • {cand.location} • <span style={{ color: '#10b981' }}>🔒 Blind Evaluation</span></div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ color: '#e5e7eb', fontWeight: 600, fontSize: '0.85rem' }}>
                                {cand.targetRole}
                              </span>
                            </td>
                            <td>
                              <span className={`company-score-badge ${cand.overallPerformance >= 85 ? 'score-badge-high' : 'score-badge-mid'}`}>
                                {cand.overallPerformance}%
                              </span>
                            </td>
                            <td>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>
                                <CheckCircle2 size={14} /> Completed
                              </span>
                            </td>
                            <td>
                              <button 
                                type="button" 
                                className="company-btn-sm-view"
                                onClick={() => setInspectCandidate(cand)}
                                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                              >
                                <FileText size={12} /> ATS Resume
                              </button>
                            </td>
                            <td>
                              <div className="company-action-btns-cell" style={{ justifyContent: 'flex-end' }}>
                                <button 
                                  type="button" 
                                  className="company-btn-sm-view"
                                  onClick={() => setInspectCandidate(cand)}
                                >
                                  <Eye size={13} /> View
                                </button>
                                <button 
                                  type="button" 
                                  className={`company-btn-sm-shortlist ${isShort ? 'active' : ''}`}
                                  onClick={() => handleToggleShortlist(cand.id)}
                                >
                                  <Star size={13} /> {isShort ? 'Saved' : 'Shortlist'}
                                </button>
                                {!isHired ? (
                                  <button 
                                    type="button" 
                                    className="company-btn-sm-hire"
                                    onClick={() => setCandidateToHire(cand)}
                                  >
                                    <Zap size={13} /> Hire
                                  </button>
                                ) : (
                                  <span className="company-btn-sm-hire hired">
                                    <Check size={12} /> Hired
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SECTION 2: CANDIDATES WHO COMPLETED YOUR TASKS */}
            <div style={{ marginBottom: '3rem' }}>
              <div className="company-section-header">
                <div className="company-section-title-wrap">
                  <h2 className="company-section-title">Candidates Who Completed Your Tasks</h2>
                  <span className="company-section-count">{stats.completedTaskCandidates.length} Submissions</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                  Verified workplace challenge solutions with automated test suites
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
                {stats.completedTaskCandidates.slice(0, 4).map(cand => (
                  <div key={cand.id} className="company-path-card" style={{ padding: '1.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="company-cand-avatar" style={{ width: '36px', height: '36px', fontSize: '1.2rem' }}>
                          {cand.avatar || '👤'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{cand.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{cand.targetRole}</div>
                        </div>
                      </div>
                      <span className="score-badge-high" style={{ padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>
                        {cand.taskScore || 92}% Score
                      </span>
                    </div>

                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', color: '#e5e7eb', fontWeight: 600, marginBottom: '0.35rem' }}>
                        {cand.taskSummary?.taskTitle}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', color: '#9ca3af' }}>
                        <span>Edge Cases: <strong style={{ color: '#34d399' }}>{cand.taskSummary?.edgeCasesCovered}</strong></span>
                        <span>Quality: <strong style={{ color: '#38bdf8' }}>{cand.taskSummary?.codeQuality}/100</strong></span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.65rem' }}>
                      <button 
                        type="button" 
                        className="company-btn-sm-view"
                        onClick={() => setInspectCandidate(cand)}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <Eye size={13} /> View Performance & Code
                      </button>
                      <button 
                        type="button"
                        className="company-btn-sm-hire"
                        onClick={() => setCandidateToHire(cand)}
                      >
                        <Zap size={13} /> Hire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: THREE DISTINCT HIRING PATHS (DO NOT MERGE!) */}
            <div style={{ marginBottom: '3rem' }}>
              <div className="company-section-header">
                <div className="company-section-title-wrap">
                  <h2 className="company-section-title">Three Dedicated Hiring Paths</h2>
                  <span className="company-section-count">Specialized Portals</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                  Independent evaluation rubrics and verified candidate pipelines
                </span>
              </div>

              <div className="company-hiring-paths-grid">
                {/* 1. FRONTEND DEVELOPER */}
                <div className="company-path-card">
                  <div className="company-path-top">
                    <div className="company-path-icon-title">
                      <div className="company-path-icon">
                        <Code2 size={24} color="#10b981" />
                      </div>
                      <div>
                        <h3 className="company-path-title">Frontend Developer</h3>
                        <span className="company-path-skills-count">7 Core Skills Tracked</span>
                      </div>
                    </div>

                    <p className="company-path-desc">
                      Evaluate responsive layouts, client state resilience, web vitals, and modern component architectures.
                    </p>

                    <div className="company-path-skills-pills">
                      {['HTML', 'CSS', 'JavaScript', 'React', 'APIs', 'Git', 'Testing'].map(s => (
                        <span key={s} className="company-skill-pill">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="company-path-stats-row">
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num">{stats.talentPoolSummary.frontend}</span>
                        <span className="company-path-stat-lbl">Candidates</span>
                      </div>
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num" style={{ color: '#10b981' }}>88%</span>
                        <span className="company-path-stat-lbl">Avg Score</span>
                      </div>
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num" style={{ color: '#38bdf8' }}>94%</span>
                        <span className="company-path-stat-lbl">Top Task</span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="company-path-enter-btn"
                      onClick={() => setCurrentView('hire-frontend')}
                    >
                      Enter Frontend Hiring Path <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* 2. CYBERSECURITY ANALYST */}
                <div className="company-path-card">
                  <div className="company-path-top">
                    <div className="company-path-icon-title">
                      <div className="company-path-icon">
                        <Shield size={24} color="#06b6d4" />
                      </div>
                      <div>
                        <h3 className="company-path-title">Cybersecurity Analyst</h3>
                        <span className="company-path-skills-count" style={{ color: '#38bdf8' }}>6 Core Skills Tracked</span>
                      </div>
                    </div>

                    <p className="company-path-desc">
                      Evaluate SOC log correlation, perimeter threat isolation, Linux system auditing, and incident playbooks.
                    </p>

                    <div className="company-path-skills-pills">
                      {['Network Sec', 'Linux', 'SIEM', 'IR', 'Threat Detection', 'Logs'].map(s => (
                        <span key={s} className="company-skill-pill">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="company-path-stats-row">
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num">{stats.talentPoolSummary.cybersecurity}</span>
                        <span className="company-path-stat-lbl">Candidates</span>
                      </div>
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num" style={{ color: '#06b6d4' }}>89%</span>
                        <span className="company-path-stat-lbl">Avg Score</span>
                      </div>
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num" style={{ color: '#38bdf8' }}>95%</span>
                        <span className="company-path-stat-lbl">Top Task</span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="company-path-enter-btn"
                      onClick={() => setCurrentView('hire-cybersecurity')}
                      style={{ borderColor: 'rgba(6, 182, 212, 0.3)', color: '#38bdf8', background: 'rgba(6, 182, 212, 0.1)' }}
                    >
                      Enter Cybersecurity Path <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* 3. UI/UX DESIGNER */}
                <div className="company-path-card">
                  <div className="company-path-top">
                    <div className="company-path-icon-title">
                      <div className="company-path-icon">
                        <Palette size={24} color="#ec4899" />
                      </div>
                      <div>
                        <h3 className="company-path-title">UI/UX Designer</h3>
                        <span className="company-path-skills-count" style={{ color: '#f472b6' }}>6 Core Skills Tracked</span>
                      </div>
                    </div>

                    <p className="company-path-desc">
                      Evaluate design system tokens, interactive prototypes, usability testing heuristics, and UX research.
                    </p>

                    <div className="company-path-skills-pills">
                      {['Figma', 'User Research', 'Wireframes', 'Prototypes', 'Usability', 'Tokens'].map(s => (
                        <span key={s} className="company-skill-pill">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="company-path-stats-row">
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num">{stats.talentPoolSummary.uiux}</span>
                        <span className="company-path-stat-lbl">Candidates</span>
                      </div>
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num" style={{ color: '#ec4899' }}>91%</span>
                        <span className="company-path-stat-lbl">Avg Score</span>
                      </div>
                      <div className="company-path-stat-item">
                        <span className="company-path-stat-num" style={{ color: '#f472b6' }}>96%</span>
                        <span className="company-path-stat-lbl">Top Task</span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="company-path-enter-btn"
                      onClick={() => setCurrentView('hire-uiux')}
                      style={{ borderColor: 'rgba(236, 72, 153, 0.3)', color: '#f472b6', background: 'rgba(236, 72, 153, 0.1)' }}
                    >
                      Enter UI/UX Hiring Path <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: LATEST TECHNOLOGY & INDUSTRY TRENDS */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="company-section-header">
                <div className="company-section-title-wrap">
                  <h2 className="company-section-title">Latest Technology & Industry Trends</h2>
                  <span className="company-section-count">Live Updates</span>
                </div>
                <button 
                  type="button" 
                  className="company-nav-btn"
                  onClick={() => setCurrentView('trends')}
                >
                  View All News <ArrowRight size={14} />
                </button>
              </div>

              <div className="company-news-grid">
                {SKILLBASE_NEWS.slice(0, 4).map(item => (
                  <div key={item.id} className="company-news-card">
                    <div>
                      <span className="news-tag">{item.category}</span>
                      <h3 className="news-title">{item.title}</h3>
                    </div>
                    <div className="news-meta">
                      <span>{item.source}</span>
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* INSPECT CANDIDATE MODAL */}
      {inspectCandidate && (
        <CompanyCandidateProfileModal 
          candidate={inspectCandidate}
          isShortlisted={stats.shortlistedIds.includes(inspectCandidate.id)}
          isHired={hiredCandidateIds.includes(inspectCandidate.id)}
          onToggleShortlist={handleToggleShortlist}
          onOpenHireModal={(cand) => {
            setInspectCandidate(null);
            setCandidateToHire(cand);
          }}
          onClose={() => setInspectCandidate(null)}
        />
      )}

      {/* HIRE CANDIDATE MODAL */}
      {candidateToHire && (
        <HireCandidateModal 
          candidate={candidateToHire}
          company={company}
          onConfirmHire={handleConfirmHire}
          onClose={() => setCandidateToHire(null)}
        />
      )}

      {/* CREATE JOB / DREAM CANDIDATE MODAL */}
      {showCreateJobModal && (
        <CreateDreamJobModal 
          company={company}
          onVacancyCreated={handleVacancyCreated}
          onClose={() => setShowCreateJobModal(false)}
        />
      )}

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
