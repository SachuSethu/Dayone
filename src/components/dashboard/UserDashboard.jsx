// src/components/dashboard/UserDashboard.jsx
// Optimized Web-Standard Dashboard with Left-Side Navigation Sidebar
// - Left Sidebar with categorized navigation groups and status badges
// - Right Content Viewport with topbar, identity strip, and dynamic view panels:
//   1. Domain Knowledge Growth State (real-time telemetry from tasks)
//   2. Job Vacancies & Employer Market (dynamic matching & 1-click apply)
//   3. ATS Resume Generator (career history + DayOne verified incident credentials)
//   4. Future Weaknesses & Remediation Plan (targeted blind spot fixes)
//   5. Micro-Learning Courses & Recently Watched (video tutorial hub)
//   6. User Profile & Details Editor (AI-extracted editable details)
//   7. Verified Micro-Credentials (cryptographic certs)
//   8. Simulation Audit History (full test & task log)

import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, Award, Shield, AlertTriangle, CheckCircle2, 
  Clock, ArrowLeft, Briefcase, Bot, ExternalLink, Layers, 
  Zap, Check, AlertOctagon, Info, Video, User, FileText, 
  Send, Sparkles, ChevronRight, Menu, X, Compass, Search, 
  Home, LogOut, ChevronLeft
} from 'lucide-react';
import { getUserDashboard } from '../../lib/dashboard/dashboardStore';
import { findMicroCourseForWeakness, getMicroCoursesByRole } from '../../data/microCourses';
import MicroCourseCard from '../common/MicroCourseCard';

// Dashboard Modular Views
import DomainGrowthTracker from './DomainGrowthTracker';
import RecentlyWatchedCourses from './RecentlyWatchedCourses';
import FutureWeaknessesPlan from './FutureWeaknessesPlan';
import MatchingJobVacancies from './MatchingJobVacancies';
import UserProfileEditor from './UserProfileEditor';
import AtsResumeGenerator from './AtsResumeGenerator';
import NotificationCenter from '../common/NotificationCenter';
import { extract19SkillVector, evaluateCompanyJobsForCandidate } from '../../data/skillBaseData';

const NAVIGATION_ITEMS = [
  {
    group: 'CORE GROWTH',
    items: [
      {
        id: 'growth',
        label: 'Domain Growth State',
        icon: TrendingUp,
        description: 'Knowledge progression & baseline vs task score',
        badgeType: 'growth'
      },
      {
        id: 'weaknesses',
        label: 'Weaknesses & Fixes',
        icon: AlertTriangle,
        description: 'Diagnosed blind spots & remediation advice',
        badgeType: 'weakness'
      }
    ]
  },
  {
    group: 'CAREER & OPPORTUNITIES',
    items: [
      {
        id: 'jobs',
        label: 'Matching Job Vacancies',
        icon: Briefcase,
        description: 'Market salary benchmarks & 1-click apply',
        badgeText: 'Hiring'
      },
      {
        id: 'ats_resume',
        label: 'ATS Resume Builder',
        icon: FileText,
        description: 'Exportable resume with verified incident proofs',
        badgeText: '98% ATS',
        badgeGreen: true
      }
    ]
  },
  {
    group: 'LEARNING HUB',
    items: [
      {
        id: 'courses',
        label: 'Micro-Courses & Videos',
        icon: Video,
        description: 'Engaged tutorials & 33 role curriculum modules',
        badgeText: '33 Modules'
      }
    ]
  },
  {
    group: 'VERIFICATION & PROFILE',
    items: [
      {
        id: 'credentials',
        label: 'Verified Credentials',
        icon: Award,
        description: 'Cryptographically signed workplace credentials',
        badgeType: 'credentials'
      },
      {
        id: 'history',
        label: 'Task Audit History',
        icon: Clock,
        description: 'Complete record of simulation runs & test suites',
        badgeType: 'history'
      },
      {
        id: 'profile',
        label: 'Profile & Contact Details',
        icon: User,
        description: 'AI-extracted contact information & bio'
      }
    ]
  }
];

export default function UserDashboard({
  onBack,
  onStartSimulation,
  onSelectRole,
  currentLevel = 2,
  initialTab = 'growth',
  onReturnToCompany = null
}) {
  const [dashboard, setDashboard] = useState(() => getUserDashboard());
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sync activeTab when initialTab prop updates
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Listen for real-time dashboard update events
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setDashboard(e.detail);
      } else {
        setDashboard(getUserDashboard());
      }
    };

    window.addEventListener('dayone:dashboard_updated', handleUpdate);
    return () => window.removeEventListener('dayone:dashboard_updated', handleUpdate);
  }, []);

  const candidate = dashboard?.candidate || {};
  const readiness = dashboard?.readiness || {};
  const activeWeaknesses = dashboard?.activeWeaknesses || [];
  const taskHistory = dashboard?.taskHistory || [];
  const verifiedCredentials = dashboard?.verifiedCredentials || [];
  const assignedMicroCourses = dashboard?.assignedMicroCourses || [];
  const metrics = dashboard?.metrics || {};

  const baselineScore = readiness.baseline || 50;
  const currentScore = readiness.current || 50;
  const gain = currentScore - baselineScore;

  const allRemediationCourses = useMemo(() => {
    const list = [...(assignedMicroCourses || [])];
    (activeWeaknesses || []).forEach(w => {
      const c = w.microCourse || findMicroCourseForWeakness(candidate.roleId, w.area);
      if (c && !list.some(item => item.moduleId === c.moduleId)) {
        list.push(c);
      }
    });
    if (list.length === 0) {
      return getMicroCoursesByRole(candidate.roleId || 'frontend-developer');
    }
    return list;
  }, [assignedMicroCourses, activeWeaknesses, candidate.roleId]);

  if (!dashboard) {
    return (
      <div className="dashboard-empty-state">
        <AlertTriangle size={36} className="text-amber mb-3" />
        <h3>Candidate Profile Not Found</h3>
        <p className="text-muted">Upload your resume and select a target role to generate your dynamic profile dashboard.</p>
        <button className="btn btn-primary mt-3" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Return to Setup</span>
        </button>
      </div>
    );
  }

  const formatDuration = (secs = 0) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // SkillBase Dual-Gate evaluation for notifications
  const evaluatedJobsForAlerts = useMemo(() => {
    const vector = extract19SkillVector(dashboard?.skillsMatrix || []);
    return evaluateCompanyJobsForCandidate(vector, candidate.roleId || 'frontend');
  }, [dashboard?.skillsMatrix, candidate.roleId]);

  const jobNotifications = useMemo(() => {
    return (evaluatedJobsForAlerts || []).slice(0, 8).map(j => ({
      id: j.id,
      title: j.title,
      company: j.company,
      score: j.jobCriteriaScore,
      unlocked: j.isUnlocked,
      missingCount: j.skillGaps.length,
      timestamp: new Date().toISOString()
    }));
  }, [evaluatedJobsForAlerts]);

  // Find active navigation item metadata
  let activeItemMeta = null;
  NAVIGATION_ITEMS.forEach(group => {
    const found = group.items.find(i => i.id === activeTab);
    if (found) activeItemMeta = found;
  });

  return (
    <div className="optimized-dashboard-layout">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="sidebar-backdrop-mobile"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* =========================================================================
          LEFT SIDEBAR: Web-Standard Categorized Option Selection
          ========================================================================= */}
      <aside className={`dashboard-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Brand Header */}
        <div className="sidebar-brand-header">
          <div 
            className="flex-row items-center gap-2.5" 
            onClick={onBack}
            style={{ cursor: 'pointer' }}
            title="Return to DayOne Platform Hub"
          >
            <div className="sidebar-brand-logo font-mono">D1</div>
            <div>
              <div className="brand-logo-text">DayOne<span>.ai</span></div>
              <span className="sidebar-brand-sub">Candidate Workspace</span>
            </div>
          </div>
          <button 
            type="button" 
            className="mobile-close-sidebar-btn"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Back to Hub Button in Sidebar */}
        <div style={{ padding: '0.75rem 1rem 0 1rem' }}>
          <button 
            type="button" 
            onClick={onBack}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.55rem',
              color: '#38bdf8',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={14} />
            <span>← Back to Platform Hub</span>
          </button>
        </div>

        {/* Sidebar Navigation Menu */}
        <nav className="sidebar-nav-container">
          {NAVIGATION_ITEMS.map((group, gIdx) => (
            <div key={gIdx} className="sidebar-nav-group">
              <div className="sidebar-group-title">{group.group}</div>
              <div className="sidebar-group-items">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      title={item.description}
                    >
                      <div className="flex-row items-center gap-2.5 flex-1 min-w-0">
                        <Icon size={17} className={`nav-item-icon ${isActive ? 'active-icon' : ''}`} />
                        <span className="nav-item-label truncate">{item.label}</span>
                      </div>

                      {/* Dynamic Badge Rendering */}
                      {item.badgeType === 'growth' && gain > 0 && (
                        <span className="badge-pill badge-emerald font-mono">+{gain}%</span>
                      )}
                      {item.badgeType === 'weakness' && activeWeaknesses.length > 0 && (
                        <span className="badge-pill badge-amber font-mono">{activeWeaknesses.length}</span>
                      )}
                      {item.badgeType === 'credentials' && verifiedCredentials.length > 0 && (
                        <span className="badge-pill badge-purple font-mono">{verifiedCredentials.length}</span>
                      )}
                      {item.badgeType === 'history' && taskHistory.length > 0 && (
                        <span className="badge-pill badge-slate font-mono">{taskHistory.length}</span>
                      )}
                      {item.badgeText && (
                        <span className={`badge-pill ${item.badgeGreen ? 'badge-emerald' : 'badge-slate'}`}>
                          {item.badgeText}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="sidebar-footer-user">
          <div className="sidebar-user-card" onClick={() => setActiveTab('profile')}>
            <div className="sidebar-avatar">
              <span>{candidate.name?.slice(0, 2).toUpperCase() || 'AL'}</span>
              <div className="live-status-dot" title="Telemetry Active" />
            </div>
            <div className="sidebar-user-info min-w-0 flex-1">
              <div className="sidebar-user-name truncate text-white font-semibold">
                {candidate.name || 'Candidate'}
              </div>
              <div className="sidebar-user-role truncate text-xs text-muted">
                {candidate.targetRole || 'Software Engineer'}
              </div>
            </div>
            <ChevronRight size={14} className="text-muted" />
          </div>

          <button 
            type="button" 
            className="sidebar-btn-exit"
            onClick={onBack}
            title="Exit to Simulation Hub"
          >
            <ArrowLeft size={14} />
            <span>Return to Hub</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN CONTENT VIEWPORT
          ========================================================================= */}
      <main className="dashboard-main-viewport">
        {/* Top Navbar */}
        <header className="dashboard-topbar">
          <div className="topbar-left-col flex-row items-center gap-3">
            <button 
              type="button" 
              className="topbar-hamburger-btn"
              onClick={() => setMobileSidebarOpen(true)}
              title="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>

            {/* Prominent Back to Platform Hub Navigation Button */}
            <button 
              type="button"
              onClick={onBack}
              title="Return to DayOne.ai Platform Hub"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '0.42rem 0.85rem',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ArrowLeft size={15} />
              <span>Back to Hub</span>
            </button>

            <div className="topbar-breadcrumb">
              <span className="text-muted">Account Dashboard</span>
              <span className="breadcrumb-divider">/</span>
              <span className="text-white font-semibold">{activeItemMeta?.label || 'Overview'}</span>
            </div>
          </div>

          <div className="topbar-right-col flex-row items-center gap-3">
            {/* Quick Readiness Score Pill */}
            <div className="topbar-readiness-pill">
              <span className="text-muted text-xs">Readiness:</span>
              <strong className="font-mono text-cyan text-sm">{currentScore}%</strong>
              {gain > 0 && (
                <span className="text-emerald font-mono text-xs font-bold">
                  (+{gain}%)
                </span>
              )}
            </div>

            {/* Live Notification & Intelligence Center */}
            <NotificationCenter 
              jobNotifications={jobNotifications}
              onSelectJob={() => setActiveTab('jobs')}
            />

            {onStartSimulation && (
              <button 
                type="button"
                className="btn btn-primary btn-sm flex-row items-center gap-1.5"
                onClick={() => onStartSimulation()}
              >
                <span>Launch Simulation Task</span>
                <ExternalLink size={13} />
              </button>
            )}

            <button 
              type="button" 
              className="btn btn-secondary btn-sm flex-row items-center gap-1.5"
              onClick={onBack}
              title="Return to Simulation Hub"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
          </div>
        </header>

        {/* Compact Candidate Identity Strip */}
        <div className="candidate-identity-strip">
          <div className="identity-strip-left flex-row items-center gap-3.5">
            <div className="identity-avatar-medium">
              <span>{candidate.name?.slice(0, 2).toUpperCase() || 'AL'}</span>
            </div>
            <div>
              <div className="flex-row items-center gap-2">
                <h2 className="identity-name">{candidate.name || 'Candidate'}</h2>
                <span className="verified-provenance-badge">
                  <Shield size={11} className="text-cyan" />
                  <span>DayOne Verified</span>
                </span>
              </div>
              <div className="identity-headline-row text-xs text-muted flex-row items-center gap-2 mt-0.5">
                <span>{candidate.headline || `${candidate.experienceLevel || 'Intermediate'} ${candidate.targetRole || 'Software Engineer'}`}</span>
                <span>•</span>
                <span>{candidate.location || 'San Francisco, CA / Remote'}</span>
                <span>•</span>
                <span className="font-mono text-cyan">Resume: {candidate.resumeFileName || 'Extracted Baseline'}</span>
              </div>
            </div>
          </div>

          <div className="identity-strip-right flex-row items-center gap-4">
            <div className="identity-stat-cell">
              <span className="stat-cell-label">Baseline</span>
              <strong className="stat-cell-val font-mono">{baselineScore}%</strong>
            </div>
            <div className="identity-stat-cell">
              <span className="stat-cell-label">Current</span>
              <strong className="stat-cell-val font-mono text-cyan">{currentScore}%</strong>
            </div>
            <div className="identity-stat-cell">
              <span className="stat-cell-label">Tasks Passed</span>
              <strong className="stat-cell-val font-mono text-emerald">{metrics.tasksPassed || 0} / {metrics.tasksCompleted || 0}</strong>
            </div>
            <div className="identity-stat-cell">
              <span className="stat-cell-label">Flags Captured</span>
              <strong className="stat-cell-val font-mono text-amber">{metrics.totalFlagsCaptured || 0}</strong>
            </div>
          </div>
        </div>

        {/* Dynamic View Content Panel */}
        <div className="dashboard-content-viewport animate-fade-in">
          {/* VIEW 1: DOMAIN KNOWLEDGE & DYNAMIC GROWTH STATE */}
          {activeTab === 'growth' && (
            <DomainGrowthTracker 
              dashboard={dashboard} 
              onLaunchTask={onStartSimulation}
            />
          )}

          {/* VIEW 2: FUTURE WEAKNESSES & REMEDIATION PLAN */}
          {activeTab === 'weaknesses' && (
            <FutureWeaknessesPlan 
              dashboard={dashboard} 
              onLaunchSimulation={onStartSimulation} 
            />
          )}

          {/* VIEW 3: MATCHING JOB VACANCIES & EMPLOYER MARKET STATS */}
          {activeTab === 'jobs' && (
            <MatchingJobVacancies dashboard={dashboard} />
          )}

          {/* VIEW 4: ATS RESUME BUILDER */}
          {activeTab === 'ats_resume' && (
            <AtsResumeGenerator dashboard={dashboard} />
          )}

          {/* VIEW 5: MICRO-LEARNING & RECENTLY WATCHED */}
          {activeTab === 'courses' && (
            <div className="micro-courses-tab-wrapper animate-fade-in">
              <RecentlyWatchedCourses 
                dashboard={dashboard} 
                onSwitchToAllCourses={() => {}}
              />

              <div className="assigned-role-catalog mt-6 pt-5 border-t border-border">
                <div className="section-header-compact mb-3">
                  <div className="flex-row items-center gap-2">
                    <Sparkles size={18} className="text-cyan" />
                    <h3 className="section-title-sm text-white">
                      Curriculum Database for {candidate.targetRole || 'Your Role'}
                    </h3>
                  </div>
                  <span className="text-xs text-muted">
                    Official DayOne video modules covering core domain requirements
                  </span>
                </div>

                <div className="assigned-courses-grid">
                  {allRemediationCourses.map((course, idx) => (
                    <MicroCourseCard 
                      key={course.moduleId || idx}
                      course={course}
                      remediationArea={course.domainsCovered?.[0] || 'Targeted Domain'}
                      showWatchModal={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 6: USER PROFILE & DETAILS EDITOR */}
          {activeTab === 'profile' && (
            <UserProfileEditor dashboard={dashboard} />
          )}

          {/* VIEW 7: VERIFIED MICRO-CREDENTIALS */}
          {activeTab === 'credentials' && (
            <div className="dashboard-tab-content animate-fade-in">
              <div className="section-header-compact mb-4">
                <div>
                  <div className="flex-row items-center gap-2">
                    <Award size={20} className="text-purple-400" />
                    <h3 className="section-title-sm">Verified DayOne Micro-Credentials</h3>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    Cryptographically signed credentials earned exclusively through live simulated workplace performance.
                  </p>
                </div>
              </div>

              {verifiedCredentials.length === 0 ? (
                <div className="empty-credentials-box">
                  <Award size={40} className="text-muted mb-2" />
                  <h4>No Micro-Credentials Earned Yet</h4>
                  <p className="text-muted">
                    Complete your assigned workplace simulation tasks with passing test assertions and code reviews to earn verified micro-credentials.
                  </p>
                  {onStartSimulation && (
                    <button className="btn btn-primary mt-3" onClick={() => onStartSimulation()}>
                      Start Simulation to Earn Credential
                    </button>
                  )}
                </div>
              ) : (
                <div className="credentials-grid">
                  {verifiedCredentials.map((cred, idx) => (
                    <div key={cred.credentialId || idx} className="credential-badge-card">
                      <div className="credential-badge-icon">
                        <Award size={36} className="text-purple-400" />
                      </div>
                      <div className="credential-badge-body">
                        <div className="credential-meta-header">
                          <span className="credential-status-tag">VERIFIED WORKPLACE PROVENANCE</span>
                          <span className="credential-id font-mono">{cred.credentialId}</span>
                        </div>
                        <h3 className="credential-skill-name">{cred.skill}</h3>
                        <p className="credential-role-text">Validated for {cred.roleName}</p>
                        
                        <div className="credential-footer-row">
                          <span className="issuer-text">Issued by: {cred.issuer}</span>
                          <button 
                            type="button" 
                            className="btn btn-secondary btn-xs"
                            onClick={() => setSelectedCredential(cred)}
                          >
                            <span>View Certificate</span>
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW 8: SIMULATION AUDIT HISTORY */}
          {activeTab === 'history' && (
            <div className="dashboard-tab-content animate-fade-in">
              <div className="section-header-compact mb-4">
                <div>
                  <div className="flex-row items-center gap-2">
                    <Clock size={20} className="text-cyan" />
                    <h3 className="section-title-sm">Task Performance & Audit History</h3>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    Complete record of live workplace simulation tasks, AST reviews, and automated test runs.
                  </p>
                </div>
              </div>

              {taskHistory.length === 0 ? (
                <div className="empty-history-box">
                  <Clock size={36} className="text-muted mb-2" />
                  <h4>No Tasks Submitted Yet</h4>
                  <p className="text-muted">Launch your first simulation task to populate your audit history with Gemini AI evaluations.</p>
                  {onStartSimulation && (
                    <button className="btn btn-primary mt-3" onClick={() => onStartSimulation()}>
                      Launch Simulation Task 1
                    </button>
                  )}
                </div>
              ) : (
                <div className="history-timeline">
                  {taskHistory.map((item, idx) => (
                    <div key={item.id || idx} className={`history-item-card ${item.passed ? 'passed' : 'failed'}`}>
                      <div className="history-item-header">
                        <div className="flex-row items-center gap-2">
                          <span className={`history-status-pill ${item.passed ? 'passed' : 'failed'}`}>
                            {item.passed ? 'PASSED' : 'PARTIAL / NEEDS RETRY'}
                          </span>
                          <h4 className="history-task-title">{item.title}</h4>
                          <span className="history-task-code font-mono">[{item.taskId}]</span>
                        </div>
                        <span className="history-date text-muted text-xs">
                          {new Date(item.completedAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="history-metrics-row">
                        <div className="metric-pill">
                          <span className="label">Readiness Score:</span>
                          <strong className="val font-mono">{item.readinessScore}%</strong>
                        </div>
                        <div className="metric-pill">
                          <span className="label">Code Correctness:</span>
                          <strong className="val font-mono">{item.codeCorrectness}%</strong>
                        </div>
                        <div className="metric-pill">
                          <span className="label">Edge Cases:</span>
                          <strong className="val font-mono">{item.edgeCases}%</strong>
                        </div>
                        <div className="metric-pill">
                          <span className="label">Checkpoints:</span>
                          <strong className="val font-mono">{item.flagsCaptured} Flags</strong>
                        </div>
                        <div className="metric-pill">
                          <span className="label">Time Elapsed:</span>
                          <strong className="val font-mono">{formatDuration(item.elapsedSeconds)}</strong>
                        </div>
                      </div>

                      {item.aiSummary && (
                        <div className="history-ai-summary-box">
                          <div className="flex-row items-center gap-2 mb-1">
                            <Bot size={14} className={item.passed ? 'text-emerald' : 'text-amber'} />
                            <span className="font-bold text-xs">GEMINI AI AUDIT VERDICT:</span>
                          </div>
                          <p className="text-xs text-muted mb-0">{item.aiSummary}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal: View Credential Certificate */}
      {selectedCredential && (
        <div className="credential-modal-backdrop" onClick={() => setSelectedCredential(null)}>
          <div className="credential-cert-card animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="cert-watermark">DAYONE.AI</div>
            <div className="cert-header">
              <Award size={48} className="text-purple-400 mb-2" />
              <h2 className="cert-headline">CERTIFICATE OF DEMONSTRATED PROFICIENCY</h2>
              <span className="cert-auth">ISSUED BY DAYONE AUTONOMOUS SIMULATION AUTHORITY</span>
            </div>

            <div className="cert-body">
              <p className="cert-intro">This certifies that</p>
              <h3 className="cert-recipient-name">{candidate.name || 'Candidate'}</h3>
              <p className="cert-statement">
                has successfully resolved live workplace production incidents, passed automated test suites,
                and satisfied defensive architecture requirements for:
              </p>
              <div className="cert-skill-box">
                <h4>{selectedCredential.skill}</h4>
                <span>Production Alignment: {selectedCredential.roleName}</span>
              </div>
              <div className="cert-meta-grid">
                <div>
                  <span className="cert-meta-label">Credential ID:</span>
                  <strong className="font-mono text-cyan">{selectedCredential.credentialId}</strong>
                </div>
                <div>
                  <span className="cert-meta-label">Verification Date:</span>
                  <strong className="text-white">{new Date(selectedCredential.verifiedAt).toLocaleDateString()}</strong>
                </div>
                <div>
                  <span className="cert-meta-label">Integrity Status:</span>
                  <strong className="text-emerald">Cryptographically Verified</strong>
                </div>
              </div>
            </div>

            <div className="cert-footer">
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedCredential(null)}
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
