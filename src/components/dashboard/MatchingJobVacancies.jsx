// src/components/dashboard/MatchingJobVacancies.jsx
// Displays employer market statistics and matching job vacancies
// dynamically scored against candidate's current DayOne verified readiness and domain skills.

import React, { useState } from 'react';
import { 
  Briefcase, TrendingUp, DollarSign, Building2, MapPin, 
  CheckCircle2, AlertCircle, ArrowUpRight, Award, Shield, 
  Send, Sparkles, Filter, ChevronRight, Check
} from 'lucide-react';
import { MARKET_STATISTICS, getVacanciesForRole } from '../../data/matchingJobs';

export default function MatchingJobVacancies({ dashboard }) {
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'high_match' | 'remote'

  if (!dashboard) return null;

  const candidate = dashboard.candidate || {};
  const readiness = dashboard.readiness || {};
  const currentScore = readiness.current || 50;
  const skillsMatrix = dashboard.skillsMatrix || [];
  const verifiedCredentials = dashboard.verifiedCredentials || [];

  const roleId = candidate.roleId || 'frontend-developer';
  const marketStats = MARKET_STATISTICS[roleId] || MARKET_STATISTICS['frontend-developer'];
  const allVacancies = getVacanciesForRole(roleId, currentScore, skillsMatrix);

  const filteredVacancies = allVacancies.filter(job => {
    if (filterType === 'high_match') return job.match.matchPercentage >= 75;
    if (filterType === 'remote') return job.location.toLowerCase().includes('remote');
    return true;
  });

  const handleApply = (job) => {
    setSelectedJobForModal(job);
  };

  const handleConfirmApplication = (jobId) => {
    setAppliedJobIds(prev => [...prev, jobId]);
    setSelectedJobForModal(null);
  };

  return (
    <div className="matching-jobs-section animate-fade-in">
      {/* 1. Employer Market Statistics Bar */}
      <div className="market-stats-banner">
        <div className="market-stats-header">
          <div className="flex-row items-center gap-2">
            <TrendingUp size={20} className="text-emerald" />
            <h3 className="section-title-sm text-white">
              Employer Market Statistics // {marketStats.domainTitle}
            </h3>
          </div>
          <span className="market-demand-badge">
            <span className="live-pulse" />
            <span>Demand: {marketStats.hiringDemand}</span>
          </span>
        </div>

        <div className="market-stats-grid mt-3">
          <div className="market-stat-card">
            <div className="stat-label">Average Annual Compensation</div>
            <div className="stat-val font-mono text-emerald">{marketStats.avgSalary}</div>
            <div className="stat-sub">Based on verified market offers</div>
          </div>

          <div className="market-stat-card">
            <div className="stat-label">Active Market Vacancies</div>
            <div className="stat-val font-mono text-cyan">{marketStats.activeVacanciesCount}</div>
            <div className="stat-sub">YoY Growth: {marketStats.growthRateYearOverYear}</div>
          </div>

          <div className="market-stat-card">
            <div className="stat-label">Your DayOne Benchmark</div>
            <div className="stat-val font-mono text-white">
              {currentScore}% <span className="text-xs text-cyan">Readiness</span>
            </div>
            <div className="stat-sub">
              {currentScore >= 75 ? 'Top 15% Verified Tier' : 'Developing Tier'}
            </div>
          </div>

          <div className="market-stat-card">
            <div className="stat-label">Actively Hiring Employers</div>
            <div className="employer-tags-list">
              {marketStats.topEmployers.slice(0, 4).map((emp, idx) => (
                <span key={idx} className="employer-pill">{emp}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Demanded Skills List */}
        <div className="top-skills-demand mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted mr-2 font-semibold">Top In-Demand Competencies:</span>
          <div className="top-skills-pills-row">
            {marketStats.topDemandedSkills.map((sk, idx) => (
              <span key={idx} className="skill-demand-badge">
                <Sparkles size={10} className="text-accent" />
                <span>{sk}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Job Vacancies Grid with Real-Time Match Scoring */}
      <div className="job-vacancies-header mt-5 mb-3 flex-row justify-between items-center">
        <div>
          <div className="flex-row items-center gap-2">
            <Briefcase size={20} className="text-cyan" />
            <h3 className="section-title-sm text-white">Matching Job Vacancies ({filteredVacancies.length})</h3>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Match score dynamically calculated from your DayOne verified simulation performance and skills matrix.
          </p>
        </div>

        <div className="vacancies-filter-pills">
          <button 
            type="button" 
            className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Roles
          </button>
          <button 
            type="button" 
            className={`filter-pill ${filterType === 'high_match' ? 'active' : ''}`}
            onClick={() => setFilterType('high_match')}
          >
            High Match (75%+)
          </button>
          <button 
            type="button" 
            className={`filter-pill ${filterType === 'remote' ? 'active' : ''}`}
            onClick={() => setFilterType('remote')}
          >
            Remote
          </button>
        </div>
      </div>

      <div className="vacancies-grid">
        {filteredVacancies.map(job => {
          const isApplied = appliedJobIds.includes(job.id);
          const matchPercent = job.match.matchPercentage;
          const matchColor = matchPercent >= 80 ? 'emerald' : (matchPercent >= 65 ? 'cyan' : 'amber');

          return (
            <div key={job.id} className={`job-vacancy-card ${job.match.isHighlyRecommended ? 'recommended-border' : ''}`}>
              <div className="job-card-top">
                <div className="company-logo-mark font-mono">{job.companyLogo}</div>
                <div className="job-title-group">
                  <h4 className="job-role-title text-white">{job.title}</h4>
                  <div className="flex-row items-center gap-2 text-xs text-muted">
                    <span className="company-name font-semibold text-white">{job.company}</span>
                    <span>•</span>
                    <span className="flex-row items-center gap-1">
                      <MapPin size={11} />
                      <span>{job.location}</span>
                    </span>
                    <span>•</span>
                    <span className="salary-pill font-mono text-emerald">{job.salaryRange}</span>
                  </div>
                </div>

                {/* Match Score Gauge */}
                <div className="job-match-badge-box">
                  <div className={`match-percent-ring ring-${matchColor}`}>
                    <span className="match-num font-mono">{matchPercent}%</span>
                    <span className="match-sub">MATCH</span>
                  </div>
                </div>
              </div>

              <p className="job-summary-desc text-xs text-muted mt-3 mb-3">
                {job.description}
              </p>

              {/* Skills matched tags */}
              <div className="job-skills-matched-wrap">
                <span className="text-xs text-muted font-medium mb-1 block">Key Competencies:</span>
                <div className="job-skills-tags">
                  {job.keySkillsRequired.map((sk, idx) => {
                    const isCandidateSkill = skillsMatrix.some(s => 
                      (s.skill.toLowerCase().includes(sk.toLowerCase()) || sk.toLowerCase().includes(s.skill.toLowerCase())) &&
                      (s.current >= 70 || s.status === 'verified_by_simulation')
                    );

                    return (
                      <span key={idx} className={`job-skill-chip ${isCandidateSkill ? 'matched' : 'unmatched'}`}>
                        {isCandidateSkill ? <Check size={10} className="text-emerald" /> : null}
                        <span>{sk}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer: Apply with DayOne Verified Profile */}
              <div className="job-card-footer mt-4 pt-3 border-t border-border flex-row justify-between items-center">
                <div className="flex-row items-center gap-1.5 text-xs text-muted">
                  <Shield size={13} className="text-purple-400" />
                  <span>DayOne Fast-Track Eligible</span>
                </div>

                <button 
                  type="button" 
                  className={`btn-apply-job ${isApplied ? 'applied' : 'btn-ready'}`}
                  onClick={() => !isApplied && handleApply(job)}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>Application Submitted</span>
                    </>
                  ) : (
                    <>
                      <span>Apply with DayOne Profile</span>
                      <ArrowUpRight size={13} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Submit DayOne Verified Application */}
      {selectedJobForModal && (
        <div className="credential-modal-backdrop" onClick={() => setSelectedJobForModal(null)}>
          <div className="apply-modal-card animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="apply-modal-header">
              <div className="flex-row items-center gap-2">
                <Send size={18} className="text-cyan" />
                <h3 className="text-white font-semibold">
                  Submit Verified Application to {selectedJobForModal.company}
                </h3>
              </div>
              <button 
                type="button" 
                className="btn-close-modal"
                onClick={() => setSelectedJobForModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="apply-modal-body">
              <div className="applying-for-box">
                <div className="text-xs text-muted">POSITION:</div>
                <div className="text-white font-bold text-sm">{selectedJobForModal.title}</div>
                <div className="text-xs text-cyan font-mono mt-0.5">{selectedJobForModal.salaryRange} • {selectedJobForModal.location}</div>
              </div>

              <div className="verified-provenance-included mt-3">
                <h4 className="text-xs font-semibold text-emerald uppercase tracking-wider flex-row items-center gap-1 mb-2">
                  <Shield size={13} />
                  <span>Included DayOne Workplace Verification Package:</span>
                </h4>
                <ul className="provenance-bullets">
                  <li>
                    <strong>Candidate Verified Readiness Score:</strong> {currentScore}% production capability.
                  </li>
                  <li>
                    <strong>Cryptographic Credentials:</strong> {verifiedCredentials.length} verified incident resolution micro-credential(s).
                  </li>
                  <li>
                    <strong>AST Code Review & Telemetry:</strong> Zero regressions, 100% test assertions, defensive architecture audits.
                  </li>
                  <li>
                    <strong>Pre-Verified Skills:</strong> {selectedJobForModal.match.verifiedCount} of {selectedJobForModal.keySkillsRequired.length} competencies pre-validated in live simulation.
                  </li>
                </ul>
              </div>

              <div className="candidate-signoff-box mt-3">
                <div className="text-xs text-muted">Applying as:</div>
                <strong className="text-white">{candidate.name || 'Candidate'} ({candidate.email || 'Email Attached'})</strong>
              </div>
            </div>

            <div className="apply-modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedJobForModal(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary btn-sm flex-row items-center gap-1.5"
                onClick={() => handleConfirmApplication(selectedJobForModal.id)}
              >
                <Send size={14} />
                <span>Transmit Verified Application</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
