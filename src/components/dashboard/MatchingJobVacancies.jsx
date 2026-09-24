// src/components/dashboard/MatchingJobVacancies.jsx
// Personalized Job Recommendations & Prioritized Vacancies Engine
// Powered by Gemini AI Analytics & SkillBase Dual-Gate Hiring Architecture
// - Dynamically prioritized based on candidate's current readiness, verified skills, and task completions
// - No locked jobs: all jobs are accessible, transparent, and open for application
// - Interactive Job Requirements & AI Fit Diagnostics modal
// - Seamless 1-Click Application with Auto-Attached ATS-friendly CV

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, TrendingUp, DollarSign, Building2, MapPin, 
  CheckCircle2, AlertCircle, ArrowUpRight, Award, Shield, 
  Send, Sparkles, Filter, ChevronRight, Check, FileText, 
  Upload, Eye, User, Mail, Phone, Calendar, ArrowRight,
  Star, ThumbsUp, Zap, Clock, BookOpen, AlertTriangle, X,
  ExternalLink, Sparkle, RefreshCw
} from 'lucide-react';
import { 
  extract19SkillVector, 
  evaluateCandidateSuitability, 
  evaluateCompanyJobsForCandidate,
  SKILLBASE_ROLES
} from '../../data/skillBaseData';
import { MARKET_STATISTICS } from '../../data/matchingJobs';
import { findMicroCourseForWeakness } from '../../data/microCourses';
import { apiGetJobRecommendation } from '../../lib/api/client';
import { recordApplicationForCompany } from '../../lib/company/companyStore';

export default function MatchingJobVacancies({ dashboard }) {
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('requirements'); // 'requirements' | 'apply' | 'interview_prep'
  const [expandedGapJobId, setExpandedGapJobId] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'top' | 'strong' | 'growth' | 'applied'

  // Application Tracking State (Stored with metadata)
  const [appliedJobsData, setAppliedJobsData] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_applied_jobs');
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const map = {};
        parsed.forEach(id => {
          map[id] = { appliedAt: new Date().toISOString(), status: 'Under Review', cvName: 'DayOne_ATS_Resume.pdf' };
        });
        return map;
      }
      return parsed;
    } catch (e) { return {}; }
  });

  // Application Form State inside modal
  const [cvOption, setCvOption] = useState('ats_resume'); // 'ats_resume' | 'custom_upload'
  const [customCvFileName, setCustomCvFileName] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Gemini AI Recommendation State for currently viewed job
  const [aiRecData, setAiRecData] = useState(null);
  const [loadingAiRec, setLoadingAiRec] = useState(false);

  if (!dashboard) return null;

  const candidate = dashboard.candidate || {};
  const readiness = dashboard.readiness || {};
  const currentScore = readiness.current || 50;
  const skillsMatrix = dashboard.skillsMatrix || [];
  const verifiedCredentials = dashboard.verifiedCredentials || [];

  // 1. Generate 19-Skill Vector from Candidate Skills
  const candidate19Vector = useMemo(() => {
    return extract19SkillVector(skillsMatrix);
  }, [skillsMatrix]);

  // 2. Gate 1: Role Suitability Evaluation
  const roleSuitability = useMemo(() => {
    return evaluateCandidateSuitability(candidate19Vector);
  }, [candidate19Vector]);

  // 3. Gate 2: Company Jobs Criteria Matching (Prioritized, NO locking)
  const evaluatedJobs = useMemo(() => {
    const roleKey = candidate.roleId || roleSuitability.bestFitRole;
    return evaluateCompanyJobsForCandidate(candidate19Vector, roleKey);
  }, [candidate19Vector, candidate.roleId, roleSuitability.bestFitRole]);

  const bestRoleMeta = SKILLBASE_ROLES.find(r => r.id === roleSuitability.bestFitRole) || SKILLBASE_ROLES[0];
  const appliedJobIds = Object.keys(appliedJobsData);
  const appliedCount = appliedJobIds.length;

  // Filter list by priority or applied status
  const filteredJobs = evaluatedJobs.filter(job => {
    const isJobApplied = Boolean(appliedJobsData[job.id]);
    if (filterType === 'top') return job.priorityRank === 1;
    if (filterType === 'strong') return job.priorityRank === 2;
    if (filterType === 'growth') return job.priorityRank >= 3;
    if (filterType === 'applied') return isJobApplied;
    return true;
  });

  // Open modal with specific tab and load live Gemini AI Fit Recommendation
  const handleOpenJobModal = async (job, defaultTab = 'requirements') => {
    setSelectedJobForModal(job);
    setActiveModalTab(defaultTab);
    setAppliedSuccess(false);

    const candidateName = candidate.name || 'Candidate';
    const targetRoleName = candidate.targetRole || job.title;
    const defaultPitch = `I am applying for the ${job.title} position at ${job.company}. With a verified ${currentScore}% readiness score on DayOne.ai and hands-on simulation experience, I am prepared to contribute production-ready code immediately.`;
    setCoverNote(defaultPitch);

    // Call Gemini AI endpoint for personalized fit analysis
    setLoadingAiRec(true);
    setAiRecData(null);
    try {
      const rec = await apiGetJobRecommendation({
        candidate: {
          name: candidateName,
          targetRole: targetRoleName,
          headline: candidate.headline
        },
        job: {
          id: job.id,
          company: job.company,
          title: job.title,
          location: job.location,
          salaryRange: job.salaryRange,
          description: job.description,
          requiredSkills: job.requiredSkills
        },
        candidateVector: candidate19Vector,
        readinessScore: currentScore
      });

      if (rec) {
        setAiRecData(rec);
        if (rec.aiPitchNote) {
          setCoverNote(rec.aiPitchNote);
        }
      }
    } catch (err) {
      console.warn('AI recommendation error:', err);
    } finally {
      setLoadingAiRec(false);
    }
  };

  // 1-Click Generate AI Pitch Note
  const handleGenerateAiPitch = () => {
    if (aiRecData?.aiPitchNote) {
      setCoverNote(aiRecData.aiPitchNote);
    } else {
      const topKeys = Object.keys(selectedJobForModal?.requiredSkills || {}).slice(0, 2);
      setCoverNote(`I am excited to apply for the ${selectedJobForModal.title} role at ${selectedJobForModal.company}. My verified readiness score of ${currentScore}% and demonstrated competencies in ${topKeys.join(' and ')} on DayOne align directly with your engineering requirements. Attached is my verified DayOne ATS Resume.`);
    }
  };

  // Submit Application with attached CV
  const handleConfirmApplication = (e) => {
    e.preventDefault();
    if (!selectedJobForModal) return;

    setIsApplying(true);
    setTimeout(() => {
      const candidateNameSafe = (candidate.name || 'Candidate').replace(/\s+/g, '_');
      const cvFileName = cvOption === 'ats_resume'
        ? `${candidateNameSafe}_DayOne_ATS_Resume.pdf`
        : (customCvFileName || 'Uploaded_Custom_CV.pdf');

      const updated = {
        ...appliedJobsData,
        [selectedJobForModal.id]: {
          jobId: selectedJobForModal.id,
          company: selectedJobForModal.company,
          title: selectedJobForModal.title,
          appliedAt: new Date().toISOString(),
          status: 'Under Review',
          cvName: cvFileName,
          coverNote
        }
      };

      // Transmit to corresponding company application receiver & AI CV shortlisting engine
      try {
        recordApplicationForCompany({
          companyId: selectedJobForModal.companyId || (selectedJobForModal.company?.toLowerCase().includes('technova') ? 'company_001' : (selectedJobForModal.company?.toLowerCase().includes('pixel') ? 'company_002' : (selectedJobForModal.company?.toLowerCase().includes('secure') ? 'company_003' : 'company_001'))),
          company: selectedJobForModal.company,
          jobId: selectedJobForModal.id,
          jobTitle: selectedJobForModal.title,
          candidateName: candidate.name || 'Candidate',
          candidateTag: '#C-' + Math.floor(1000 + Math.random() * 9000),
          candidateRole: candidate.targetRole || selectedJobForModal.title,
          candidateHeadline: candidate.headline || 'Verified DayOne Candidate',
          readinessScore: currentScore,
          candidateVector: candidate19Vector,
          jobRequiredSkills: selectedJobForModal.requiredSkills || {},
          location: candidate.location || 'Remote',
          cvName: cvFileName,
          coverNote
        });
      } catch (err) {
        console.warn('Could not record application for company:', err);
      }

      setAppliedJobsData(updated);
      localStorage.setItem('dayone_applied_jobs', JSON.stringify(updated));
      setIsApplying(false);
      setAppliedSuccess(true);
    }, 500);
  };

  // Custom CV file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCustomCvFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="matching-jobs-section animate-fade-in">
      {/* =========================================================================
          GATE 1: DOMAIN SUITABILITY CLASSIFIER BANNER
          ========================================================================= */}
      <div className="role-suitability-banner">
        <div className="suitability-header">
          <div className="flex-row items-center gap-2">
            <Shield size={20} className="text-cyan" />
            <h3 className="section-title-sm text-white">
              Domain Suitability Classifier
            </h3>
          </div>
          <span className="best-fit-pill">
            <Sparkles size={12} className="text-emerald" />
            <span>Primary Role Fit: <strong>{bestRoleMeta.name}</strong></span>
          </span>
        </div>

        <p className="suitability-subtext text-xs text-muted mt-1">
          Your extracted skills are benchmarked against 3 primary tech domains: Frontend (7 core skills), Cybersecurity (6 core skills), and UI/UX Design (6 core skills).
        </p>

        {/* 3 Domain Baselines Grid */}
        <div className="domain-suitability-grid mt-3">
          {SKILLBASE_ROLES.map(r => {
            const evalResult = roleSuitability.evaluations[r.id];
            const isBestFit = r.id === roleSuitability.bestFitRole;

            return (
              <div key={r.id} className={`domain-eval-card ${isBestFit ? 'best-fit-card' : ''}`}>
                <div className="flex-row justify-between items-center mb-1">
                  <h4 className="domain-name font-semibold text-white">{r.name}</h4>
                  <span className={`domain-score-pill font-mono ${evalResult.roleScore >= 60 ? 'text-emerald' : 'text-cyan'}`}>
                    {evalResult.roleScore}% Baseline
                  </span>
                </div>

                <div className="domain-bar-track mt-1.5 mb-2">
                  <div 
                    className="domain-bar-fill" 
                    style={{ width: `${evalResult.roleScore}%` }}
                  />
                </div>

                <div className="flex-row justify-between items-center text-xs">
                  <span className="text-muted">{r.skillsCount} Core Skills</span>
                  <span className={evalResult.meetsAll ? 'text-emerald font-semibold' : 'text-cyan'}>
                    {evalResult.meetsAll ? '✓ Meets All Minimums' : `${evalResult.roleScore}% Domain Alignment`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          PRIORITIZED JOB VACANCIES SECTION (NO LOCKED JOBS)
          ========================================================================= */}
      <div className="company-criteria-section mt-5">
        <div className="section-header-compact mb-3 flex-row justify-between items-center">
          <div>
            <div className="flex-row items-center gap-2">
              <Building2 size={20} className="text-emerald" />
              <h3 className="section-title-sm text-white">
                Personalized Job Recommendations ({filteredJobs.length})
              </h3>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Prioritized dynamically based on your current readiness score (<strong className="text-cyan font-mono">{currentScore}%</strong>), verified skills, and task completions. All jobs are open to view requirements and apply.
            </p>
          </div>

          <div className="vacancies-filter-pills">
            <button 
              type="button" 
              className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All Openings ({evaluatedJobs.length})
            </button>
            <button 
              type="button" 
              className={`filter-pill ${filterType === 'top' ? 'active' : ''}`}
              onClick={() => setFilterType('top')}
            >
              🌟 Top Fit (≥80%)
            </button>
            <button 
              type="button" 
              className={`filter-pill ${filterType === 'strong' ? 'active' : ''}`}
              onClick={() => setFilterType('strong')}
            >
              ⭐ Strong Fit (65–79%)
            </button>
            <button 
              type="button" 
              className={`filter-pill ${filterType === 'growth' ? 'active' : ''}`}
              onClick={() => setFilterType('growth')}
            >
              🚀 Good Match
            </button>
            {appliedCount > 0 && (
              <button 
                type="button" 
                className={`filter-pill ${filterType === 'applied' ? 'active' : ''}`}
                onClick={() => setFilterType('applied')}
              >
                ✓ Applied ({appliedCount})
              </button>
            )}
          </div>
        </div>

        {/* Jobs Grid (Prioritized & Interactive) */}
        <div className="vacancies-grid">
          {filteredJobs.map(job => {
            const isApplied = Boolean(appliedJobsData[job.id]);
            const matchScore = job.jobCriteriaScore;
            const isGapsExpanded = expandedGapJobId === job.id;
            const priorityRank = job.priorityRank || 3;

            return (
              <div 
                key={job.id} 
                className={`job-vacancy-card prioritized-card rank-${priorityRank} ${isApplied ? 'is-applied' : ''}`}
                onClick={() => handleOpenJobModal(job, 'requirements')}
              >
                {/* Job Card Top */}
                <div className="job-card-top">
                  <div className="company-logo-mark font-mono">{job.companyLogo}</div>
                  <div className="job-title-group min-w-0 flex-1">
                    <div className="flex-row items-center gap-2">
                      <h4 className="job-role-title text-white truncate">{job.title}</h4>
                      {isApplied && (
                        <span className="applied-tag-mini font-mono">
                          ✓ APPLIED
                        </span>
                      )}
                    </div>
                    <div className="flex-row items-center gap-2 text-xs text-muted mt-0.5">
                      <span className="company-name font-semibold text-white">{job.company}</span>
                      <span>•</span>
                      <span className="flex-row items-center gap-1">
                        <MapPin size={11} />
                        <span>{job.location}</span>
                      </span>
                      <span>•</span>
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  {/* Priority & Match Percentage Ring */}
                  <div className="job-match-badge-box">
                    <div className={`match-percent-ring ${matchScore >= 75 ? 'ring-emerald' : matchScore >= 60 ? 'ring-cyan' : 'ring-amber'}`}>
                      <span className="match-num font-mono">{matchScore}%</span>
                      <span className="match-sub">MATCH</span>
                    </div>
                  </div>
                </div>

                <p className="job-summary-desc text-xs text-muted mt-3 mb-2">
                  {job.description}
                </p>

                {/* Priority Status Pill (Replacing Locked state) */}
                <div className="gate-status-row mb-3 flex-row items-center justify-between">
                  <div className={`priority-status-pill rank-${priorityRank}`}>
                    {priorityRank === 1 ? (
                      <>
                        <Sparkles size={12} className="text-emerald" />
                        <span><strong>Priority 1: Top Fit</strong> • Highly Recommended</span>
                      </>
                    ) : priorityRank === 2 ? (
                      <>
                        <Star size={12} className="text-cyan" />
                        <span><strong>Priority 2: Strong Match</strong> • Direct Alignment</span>
                      </>
                    ) : priorityRank === 3 ? (
                      <>
                        <TrendingUp size={12} className="text-amber" />
                        <span><strong>Priority 3: Good Match</strong> • High Growth Fit</span>
                      </>
                    ) : (
                      <>
                        <Zap size={12} className="text-purple" />
                        <span><strong>Priority 4: Stretch Role</strong> • Career Expansion</span>
                      </>
                    )}
                  </div>

                  <span className="tap-hint text-xs text-muted flex-row items-center gap-1">
                    <span>Tap to View & Apply</span>
                    <ArrowRight size={11} />
                  </span>
                </div>

                {/* Skills Requirements & Competency Breakdown */}
                <div className="job-skills-matched-wrap">
                  <div className="flex-row justify-between items-center text-xs text-muted font-medium mb-1.5">
                    <span>Required Competencies ({job.matchedSkillsCount}/{job.totalSkillsRequired} Aligned):</span>
                    {job.skillGaps.length > 0 && (
                      <button 
                        type="button" 
                        className="btn-toggle-gaps text-cyan text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedGapJobId(isGapsExpanded ? null : job.id);
                        }}
                      >
                        {isGapsExpanded ? 'Hide Deficits ▲' : `View ${job.skillGaps.length} Skill Deficit(s) ▼`}
                      </button>
                    )}
                  </div>

                  {/* Skills Chips */}
                  <div className="job-skills-tags">
                    {Object.entries(job.requiredSkills).map(([skillKey, reqScore]) => {
                      const candScore = candidate19Vector[skillKey] || 0;
                      const isMet = candScore >= reqScore;

                      return (
                        <span 
                          key={skillKey} 
                          className={`job-skill-chip ${isMet ? 'matched' : 'unmatched'}`}
                          title={`${skillKey}: Candidate ${candScore}% / Required ${reqScore}%`}
                        >
                          {isMet ? <Check size={10} className="text-emerald" /> : <AlertTriangle size={10} className="text-amber" />}
                          <span className="capitalize">{skillKey}</span>
                          <strong className="font-mono text-xs ml-0.5">({candScore}/{reqScore}%)</strong>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Expandable Gap Analysis & Remediation Roadmap */}
                {isGapsExpanded && job.skillGaps.length > 0 && (
                  <div 
                    className="skill-gap-breakdown-card mt-3 animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex-row items-center gap-1.5 text-xs font-bold text-amber mb-2">
                      <AlertCircle size={13} />
                      <span>Skill Reinforcement Roadmap for this Position:</span>
                    </div>

                    <div className="gap-items-list">
                      {job.skillGaps.map((gap, gIdx) => {
                        const course = findMicroCourseForWeakness(job.roleId, gap.skillKey);

                        return (
                          <div key={gIdx} className="gap-item-row">
                            <div className="flex-row justify-between items-center text-xs mb-1">
                              <strong className="text-white capitalize">{gap.skillName}</strong>
                              <span className="text-amber font-mono font-bold">-{gap.gapSize}% Deficit</span>
                            </div>

                            <div className="flex-row justify-between text-xs text-muted mb-1.5">
                              <span>Resume Baseline: {gap.candidateScore}%</span>
                              <span>Target: {gap.requiredScore}%</span>
                            </div>

                            {course && (
                              <div className="gap-remediation-link">
                                <span className="text-xs text-cyan flex-row items-center gap-1">
                                  <BookOpen size={11} />
                                  <span>Recommended Sprint: {course.title}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Card Action Footer */}
                <div className="job-card-footer mt-4 pt-3 border-t border-border flex-row justify-between items-center">
                  <div className="flex-row items-center gap-1.5 text-xs text-muted">
                    <DollarSign size={13} className="text-emerald" />
                    <span className="font-mono text-emerald font-semibold">{job.salaryRange}</span>
                  </div>

                  <div className="action-buttons-group flex-row items-center gap-2">
                    {/* AI Interview Prep Button */}
                    <button 
                      type="button" 
                      className="btn-interview-prep"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenJobModal(job, 'interview_prep');
                      }}
                      title="Inspect AI Interview Questions tailored to this job"
                    >
                      <Sparkles size={12} className="text-accent" />
                      <span>Interview Prep</span>
                    </button>

                    {/* View Requirements & Apply Button */}
                    <button 
                      type="button" 
                      className={`btn-apply-job ${isApplied ? 'applied' : 'btn-ready'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenJobModal(job, isApplied ? 'requirements' : 'apply');
                      }}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 size={13} className="text-emerald" />
                          <span>Applied ({appliedJobsData[job.id]?.status || 'Under Review'})</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>View & Apply</span>
                          <ArrowUpRight size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE JOB REQUIREMENTS & APPLICATION MODAL (WITH ATTACHED CV)
          ========================================================================= */}
      {selectedJobForModal && (
        <div className="credential-modal-backdrop" onClick={() => setSelectedJobForModal(null)}>
          <div className="apply-modal-card animate-scale-in" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="apply-modal-header">
              <div className="flex-row items-center gap-2.5">
                <span className="company-modal-logo text-xl font-mono">{selectedJobForModal.companyLogo}</span>
                <div>
                  <h3 className="text-white font-bold text-base m-0">
                    {selectedJobForModal.title}
                  </h3>
                  <div className="text-xs text-cyan font-semibold mt-0.5">
                    {selectedJobForModal.company} • {selectedJobForModal.location} • {selectedJobForModal.salaryRange}
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-close-modal"
                onClick={() => setSelectedJobForModal(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="modal-tabs-strip">
              <button 
                type="button"
                className={`modal-tab-btn ${activeModalTab === 'requirements' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('requirements')}
              >
                <FileText size={13} />
                <span>Job Requirements & AI Fit</span>
              </button>

              <button 
                type="button"
                className={`modal-tab-btn ${activeModalTab === 'apply' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('apply')}
              >
                <Send size={13} />
                <span>
                  {appliedJobsData[selectedJobForModal.id] ? 'Application Status' : 'Apply with CV'}
                </span>
              </button>

              <button 
                type="button"
                className={`modal-tab-btn ${activeModalTab === 'interview_prep' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('interview_prep')}
              >
                <Sparkles size={13} />
                <span>AI Interview Questions ({selectedJobForModal.interviewQuestions?.length || 0})</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="apply-modal-body">
              {/* TAB 1: REQUIREMENTS & GEMINI AI FIT ANALYTICS */}
              {activeModalTab === 'requirements' && (
                <div className="requirements-tab-content">
                  {/* Gemini AI Personalized Match Analysis Card */}
                  <div className="ai-rec-banner">
                    <div className="flex-row justify-between items-center mb-2">
                      <div className="flex-row items-center gap-2">
                        <Sparkles size={16} className="text-cyan animate-pulse" />
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                          Gemini AI Personalized Recommendation Analysis
                        </h4>
                      </div>
                      <span className={`ai-fit-pill font-mono font-bold ${
                        (aiRecData?.aiFitScore || selectedJobForModal.jobCriteriaScore) >= 80 
                          ? 'text-emerald' 
                          : 'text-cyan'
                      }`}>
                        {aiRecData?.aiFitScore || selectedJobForModal.jobCriteriaScore}% AI Match Fit
                      </span>
                    </div>

                    {loadingAiRec ? (
                      <div className="ai-rec-loading flex-row items-center gap-2 py-3 text-xs text-muted">
                        <RefreshCw size={14} className="animate-spin text-cyan" />
                        <span>Gemini is analyzing your verified skills and generating a personalized match analysis...</span>
                      </div>
                    ) : (
                      <>
                        <div className="ai-rec-headline text-white font-semibold text-xs mb-1.5">
                          {aiRecData?.recommendationHeadline || `High alignment for ${selectedJobForModal.company}'s engineering stack.`}
                        </div>
                        <p className="ai-rec-rationale text-xs text-muted mb-2.5">
                          {aiRecData?.personalizedRationale || `Your technical background and DayOne readiness score of ${currentScore}% match the requirements for this role. Your verified hands-on simulation experience provides a strong competitive baseline.`}
                        </p>

                        {aiRecData?.competitiveStrengths && aiRecData.competitiveStrengths.length > 0 && (
                          <div className="ai-strengths-box mt-2">
                            <span className="text-xs text-emerald font-semibold flex-row items-center gap-1 mb-1">
                              <CheckCircle2 size={12} />
                              <span>Your Competitive Advantages for This Role:</span>
                            </span>
                            <ul className="ai-strengths-bullets text-xs text-white">
                              {aiRecData.competitiveStrengths.map((str, sIdx) => (
                                <li key={sIdx}>• {str}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {aiRecData?.applicationAdvice && (
                          <div className="ai-advice-note mt-2 text-xs text-cyan">
                            💡 <strong>Interview Tip:</strong> {aiRecData.applicationAdvice}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Role Overview */}
                  <div className="role-overview-card mb-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Position Overview & Responsibilities
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {selectedJobForModal.description}
                    </p>
                    <div className="role-meta-chips mt-3 flex-row flex-wrap gap-2 text-xs">
                      <span className="meta-chip">🏢 Company: {selectedJobForModal.company}</span>
                      <span className="meta-chip">📍 Location: {selectedJobForModal.location}</span>
                      <span className="meta-chip">💵 Compensation: {selectedJobForModal.salaryRange}</span>
                      <span className="meta-chip">⏳ Experience: {selectedJobForModal.experience}</span>
                    </div>
                  </div>

                  {/* Required Competency Matrix */}
                  <div className="competency-matrix-section">
                    <div className="flex-row justify-between items-center mb-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Required Competencies vs Your Verified Profile
                      </h4>
                      <span className="text-xs text-muted">
                        {selectedJobForModal.matchedSkillsCount} of {selectedJobForModal.totalSkillsRequired} Competencies Met
                      </span>
                    </div>

                    <div className="competencies-comparison-grid">
                      {Object.entries(selectedJobForModal.requiredSkills).map(([skillKey, reqScore]) => {
                        const candScore = candidate19Vector[skillKey] || 0;
                        const isMet = candScore >= reqScore;

                        return (
                          <div key={skillKey} className={`comp-compare-card ${isMet ? 'met' : 'gap'}`}>
                            <div className="flex-row justify-between items-center text-xs mb-1">
                              <strong className="text-white capitalize">{skillKey}</strong>
                              <span className={isMet ? 'text-emerald font-bold' : 'text-amber font-bold font-mono'}>
                                {isMet ? '✓ Met' : `${candScore}% / ${reqScore}%`}
                              </span>
                            </div>
                            <div className="comp-bar-track">
                              <div 
                                className={`comp-bar-fill ${isMet ? 'fill-emerald' : 'fill-amber'}`} 
                                style={{ width: `${Math.min(100, Math.round((candScore / reqScore) * 100))}%` }} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick CTA to Switch to Apply Tab */}
                  <div className="modal-cta-row mt-4 pt-3 border-t border-border flex-row justify-between items-center">
                    <span className="text-xs text-muted">
                      Ready to apply? Your DayOne ATS resume is automatically prepared.
                    </span>
                    <button 
                      type="button" 
                      className="btn btn-primary btn-sm flex-row items-center gap-1.5"
                      onClick={() => setActiveModalTab('apply')}
                    >
                      <span>Proceed to Apply with CV</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: APPLY WITH CV FORM */}
              {activeModalTab === 'apply' && (
                <div className="apply-tab-content">
                  {appliedSuccess ? (
                    <div className="application-success-banner animate-scale-in py-5 text-center">
                      <div className="success-icon-circle mx-auto mb-3">
                        <CheckCircle2 size={36} className="text-emerald" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Application Transmitted Successfully!
                      </h3>
                      <p className="text-xs text-muted max-w-md mx-auto mb-3">
                        Your application for <strong>{selectedJobForModal.title}</strong> at <strong>{selectedJobForModal.company}</strong> has been received with your verified DayOne technical profile and attached CV.
                      </p>
                      <div className="cv-pill-attached inline-flex items-center gap-2 mx-auto mb-3">
                        <FileText size={14} />
                        <span>Attached: {appliedJobsData[selectedJobForModal.id]?.cvName || 'DayOne_ATS_Resume.pdf'}</span>
                      </div>
                      <div className="status-note text-xs text-cyan">
                        Status: <strong>Under Review by Hiring Team</strong> • Applied on {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  ) : appliedJobsData[selectedJobForModal.id] ? (
                    <div className="already-applied-banner p-4 bg-secondary rounded-lg mb-3">
                      <div className="flex-row items-center gap-2 text-emerald font-semibold text-sm mb-1">
                        <CheckCircle2 size={16} />
                        <span>You have already submitted an application for this role</span>
                      </div>
                      <p className="text-xs text-muted mb-2">
                        Applied on {new Date(appliedJobsData[selectedJobForModal.id].appliedAt).toLocaleDateString()} with attached CV: <strong>{appliedJobsData[selectedJobForModal.id].cvName}</strong>.
                      </p>
                      <div className="p-2.5 bg-dark rounded border border-border text-xs text-white font-mono">
                        Status: <span className="text-emerald font-bold">{appliedJobsData[selectedJobForModal.id].status}</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleConfirmApplication} className="apply-form-container">
                      {/* Candidate Details Pre-filled */}
                      <div className="candidate-prefilled-box mb-3 p-3 bg-secondary rounded-lg border border-border">
                        <div className="flex-row justify-between items-center mb-1">
                          <span className="text-xs font-bold text-white flex-row items-center gap-1.5">
                            <User size={13} className="text-cyan" />
                            <span>Candidate Profile Details:</span>
                          </span>
                          <span className="text-xs font-mono text-emerald">
                            Readiness Score: {currentScore}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted mt-2">
                          <div><strong>Name:</strong> {candidate.name || 'Candidate Profile'}</div>
                          <div><strong>Email:</strong> {candidate.email || 'alex.chen.dev@example.com'}</div>
                          <div><strong>Role:</strong> {candidate.targetRole || selectedJobForModal.title}</div>
                          <div><strong>Location:</strong> {candidate.location || selectedJobForModal.location}</div>
                        </div>
                      </div>

                      {/* CV ATTACHMENT SECTION */}
                      <div className="cv-attachment-card mb-3">
                        <div className="flex-row items-center gap-2 mb-2">
                          <FileText size={15} className="text-emerald" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Attach Resume / Curriculum Vitae (CV)
                          </h4>
                        </div>

                        {/* CV Source Selector */}
                        <div className="cv-options-selector flex-row gap-3 mb-2.5">
                          <label className={`cv-radio-label ${cvOption === 'ats_resume' ? 'selected' : ''}`}>
                            <input 
                              type="radio" 
                              name="cv_option" 
                              value="ats_resume"
                              checked={cvOption === 'ats_resume'} 
                              onChange={() => setCvOption('ats_resume')} 
                            />
                            <span>Attach DayOne Verified ATS Resume (Recommended)</span>
                          </label>

                          <label className={`cv-radio-label ${cvOption === 'custom_upload' ? 'selected' : ''}`}>
                            <input 
                              type="radio" 
                              name="cv_option" 
                              value="custom_upload"
                              checked={cvOption === 'custom_upload'} 
                              onChange={() => setCvOption('custom_upload')} 
                            />
                            <span>Upload Custom CV (.pdf/.docx)</span>
                          </label>
                        </div>

                        {/* Option 1: DayOne ATS Resume Preview Pill */}
                        {cvOption === 'ats_resume' && (
                          <div className="cv-pill-attached">
                            <FileText size={15} className="text-emerald flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <strong className="text-white truncate block">
                                {(candidate.name || 'Candidate').replace(/\s+/g, '_')}_DayOne_ATS_Resume.pdf
                              </strong>
                              <span className="text-xs text-emerald block">
                                ✓ 98% ATS Compatibility Score • Live Simulation Verified Incident Proofs Included
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Option 2: Upload Custom CV */}
                        {cvOption === 'custom_upload' && (
                          <div className="custom-upload-box mt-2">
                            <input 
                              type="file" 
                              id="custom-cv-input" 
                              accept=".pdf,.docx,.txt"
                              onChange={handleFileChange}
                              className="file-input-hidden"
                            />
                            <label htmlFor="custom-cv-input" className="btn-upload-file">
                              <Upload size={14} />
                              <span>{customCvFileName ? `Selected: ${customCvFileName}` : 'Choose CV Document (.pdf, .docx)'}</span>
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Optional Pitch / Cover Note to Hiring Team */}
                      <div className="cover-note-section mb-3">
                        <div className="flex-row justify-between items-center mb-1.5">
                          <label className="text-xs font-bold text-white flex-row items-center gap-1.5">
                            <Mail size={13} className="text-cyan" />
                            <span>Quick Message to Hiring Manager (Optional):</span>
                          </label>
                          <button 
                            type="button" 
                            className="pitch-generate-btn"
                            onClick={handleGenerateAiPitch}
                            title="Generate a personalized pitch using Gemini AI"
                          >
                            <Sparkles size={11} className="inline mr-1" />
                            <span>Generate AI Pitch</span>
                          </button>
                        </div>
                        <textarea 
                          rows={3} 
                          value={coverNote}
                          onChange={(e) => setCoverNote(e.target.value)}
                          className="cover-note-textarea"
                          placeholder="Introduce yourself or highlight why you are a great match for this role..."
                        />
                      </div>

                      {/* Submit CTA */}
                      <div className="apply-submit-row pt-2 flex-row justify-between items-center">
                        <div className="text-xs text-muted">
                          Application sent directly to {selectedJobForModal.company}'s hiring portal.
                        </div>
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-sm flex-row items-center gap-1.5"
                          disabled={isApplying}
                        >
                          <Send size={14} />
                          <span>{isApplying ? 'Transmitting Application...' : `Submit Application to ${selectedJobForModal.company}`}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: AI INTERVIEW PREPARATION */}
              {activeModalTab === 'interview_prep' && (
                <div className="interview-prep-tab-content">
                  <p className="text-xs text-muted mb-3">
                    AI-curated technical and architectural interview questions tailored specifically for {selectedJobForModal.company}'s <strong>{selectedJobForModal.title}</strong> role:
                  </p>

                  <div className="interview-questions-list">
                    {selectedJobForModal.interviewQuestions && selectedJobForModal.interviewQuestions.length > 0 ? (
                      selectedJobForModal.interviewQuestions.map((q, qIdx) => (
                        <div key={qIdx} className="interview-q-card">
                          <div className="flex-row justify-between items-center mb-1">
                            <span className="q-tag font-mono text-cyan text-xs">
                              {q.type} // {q.difficulty}
                            </span>
                            <span className="q-target-skill text-xs text-muted">
                              Target: <strong className="capitalize">{q.targetSkill}</strong>
                            </span>
                          </div>
                          <p className="q-text text-xs text-white mb-0">{q.question}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted">Interview questions generating based on technical telemetry.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="apply-modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedJobForModal(null)}
              >
                Close
              </button>

              {activeModalTab === 'requirements' && (
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm flex-row items-center gap-1.5"
                  onClick={() => setActiveModalTab('apply')}
                >
                  <Send size={13} />
                  <span>Apply with CV</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
