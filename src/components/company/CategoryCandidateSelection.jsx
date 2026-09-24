// src/components/company/CategoryCandidateSelection.jsx
// Dedicated Candidate Selection Experience for each Hiring Path:
// 1. Frontend Developer  2. Cybersecurity Analyst  3. UI/UX Designer
// Implements the exact DayOne Performance Formula and rich domain skill inspection.

import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Filter, Sliders, Star, Zap, Eye, CheckCircle2, 
  Award, Shield, Code2, Palette, Clock, Check, ChevronDown, 
  MapPin, Briefcase, Sparkles 
} from 'lucide-react';
import { getCandidatesForPath } from '../../lib/company/companyStore';
import { SKILLBASE_19_SKILLS } from '../../data/skillBaseData';

const PATH_METADATA = {
  frontend: {
    id: 'frontend',
    title: 'Frontend Developer Hiring Portal',
    badge: '7 Verified Skills',
    icon: <Code2 size={24} color="#10b981" />,
    description: 'Evaluate candidates on reactive UI architectures, state synchronization, web vitals, and automated component testing.',
    domainSkills: ['html', 'css', 'javascript', 'react', 'api', 'git', 'testing']
  },
  cybersecurity: {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst Hiring Portal',
    badge: '6 Verified Skills',
    icon: <Shield size={24} color="#06b6d4" />,
    description: 'Evaluate candidates on SIEM rule correlation, network packet triage, Linux hardening, and rapid threat containment.',
    domainSkills: ['network-security', 'linux', 'siem', 'incident-response', 'threat-detection', 'log-analysis']
  },
  uiux: {
    id: 'uiux',
    title: 'UI/UX Designer Hiring Portal',
    badge: '6 Verified Skills',
    icon: <Palette size={24} color="#ec4899" />,
    description: 'Evaluate candidates on atomic design systems, high-fidelity interactive prototyping, usability audits, and user research.',
    domainSkills: ['figma', 'user-research', 'wireframing', 'prototyping', 'usability-testing', 'design-systems']
  }
};

export default function CategoryCandidateSelection({
  pathId, // 'frontend' | 'cybersecurity' | 'uiux'
  company,
  shortlistedIds = [],
  hiredList = [],
  onToggleShortlist,
  onOpenCandidateProfile,
  onOpenHireModal,
  onBackToDashboard
}) {
  const meta = PATH_METADATA[pathId] || PATH_METADATA.frontend;

  // Filters State
  const [expFilter, setExpFilter] = useState('all'); // 'all' | 'junior' | 'mid' | 'senior'
  const [minOverallPerf, setMinOverallPerf] = useState(70);
  const [minTaskScore, setMinTaskScore] = useState(70);
  const [minRoleMatch, setMinRoleMatch] = useState(70);
  const [sortBy, setSortBy] = useState('performance'); // 'performance' | 'skill' | 'task' | 'match' | 'experience'

  // Load Candidates for this path
  const candidates = useMemo(() => {
    return getCandidatesForPath(pathId);
  }, [pathId]);

  // Filter & Sort Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter(cand => {
      // Experience filter
      const exp = cand.experienceYears || 1.5;
      if (expFilter === 'junior' && exp > 2.0) return false;
      if (expFilter === 'mid' && (exp < 2.0 || exp > 3.5)) return false;
      if (expFilter === 'senior' && exp < 3.5) return false;

      // Score thresholds
      if ((cand.overallPerformance || 80) < minOverallPerf) return false;
      if ((cand.taskScore || 80) < minTaskScore) return false;
      if ((cand.roleMatch || 80) < minRoleMatch) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'performance') return (b.overallPerformance || 0) - (a.overallPerformance || 0);
      if (sortBy === 'skill') return (b.skillScore || 0) - (a.skillScore || 0);
      if (sortBy === 'task') return (b.taskScore || 0) - (a.taskScore || 0);
      if (sortBy === 'match') return (b.roleMatch || 0) - (a.roleMatch || 0);
      if (sortBy === 'experience') return (b.experienceYears || 0) - (a.experienceYears || 0);
      return 0;
    });
  }, [candidates, expFilter, minOverallPerf, minTaskScore, minRoleMatch, sortBy]);

  const hiredCandidateIds = hiredList.map(h => h.candidateId);

  return (
    <div className="candidate-selection-container">
      {/* Return to Dashboard */}
      <button 
        type="button" 
        className="selection-back-btn"
        onClick={onBackToDashboard}
      >
        <ArrowLeft size={15} />
        Back to Recruiter Dashboard
      </button>

      {/* Header Banner */}
      <div className="selection-header-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div className="company-path-icon" style={{ width: '56px', height: '56px' }}>
            {meta.icon}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.2rem' }}>
              <h1 className="selection-title">{meta.title}</h1>
              <span className="company-badge-tag">{meta.badge}</span>
            </div>
            <p className="selection-subtitle">{meta.description}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', textAlign: 'right' }}>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              {candidates.length}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>
              Qualified Candidates
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>
              {Math.round(candidates.reduce((acc, c) => acc + (c.overallPerformance || 85), 0) / (candidates.length || 1))}%
            </div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>
              Avg Performance
            </div>
          </div>
        </div>
      </div>

      {/* DayOne Formula Callout */}
      <div className="selection-formula-callout">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#10b981" />
          <span className="formula-text">
            <strong>DayOne Performance Ordering Formula:</strong>
          </span>
        </div>
        <div className="formula-math">
          Overall Performance = (Skill Score × 0.40) + (Task Score × 0.30) + (Role Match × 0.20) + (Exp × 0.10)
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="selection-filter-bar">
        {/* Experience Level */}
        <div className="filter-group">
          <label className="filter-label">Experience Tier</label>
          <select 
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Levels</option>
            <option value="junior">Junior (0 - 2 yrs)</option>
            <option value="mid">Mid-Level (2 - 3.5 yrs)</option>
            <option value="senior">Senior (3.5+ yrs)</option>
          </select>
        </div>

        {/* Min Overall Performance Slider */}
        <div className="filter-group">
          <label className="filter-label">Min Overall Score</label>
          <div className="filter-slider-wrap">
            <input 
              type="range"
              min="50"
              max="95"
              value={minOverallPerf}
              onChange={(e) => setMinOverallPerf(Number(e.target.value))}
              className="filter-slider"
            />
            <span className="filter-slider-val">{minOverallPerf}%</span>
          </div>
        </div>

        {/* Min Task Score Slider */}
        <div className="filter-group">
          <label className="filter-label">Min Task Score</label>
          <div className="filter-slider-wrap">
            <input 
              type="range"
              min="50"
              max="95"
              value={minTaskScore}
              onChange={(e) => setMinTaskScore(Number(e.target.value))}
              className="filter-slider"
            />
            <span className="filter-slider-val">{minTaskScore}%</span>
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="filter-group">
          <label className="filter-label">Sort Candidates By</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="performance">Overall Performance (Default Formula)</option>
            <option value="skill">Skill Score (40% Weight)</option>
            <option value="task">Simulated Task Score (30% Weight)</option>
            <option value="match">Role Match Score (20% Weight)</option>
            <option value="experience">Experience (Years)</option>
          </select>
        </div>
      </div>

      {/* Candidate List Cards */}
      <div className="selection-candidates-grid">
        {filteredCandidates.length === 0 ? (
          <div style={{ 
            background: 'var(--company-card-bg)', 
            border: '1px solid var(--company-border)',
            borderRadius: '16px',
            padding: '3.5rem 2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '1rem', margin: 0 }}>
              No candidates match your current filter thresholds. Try lowering the minimum score sliders.
            </p>
          </div>
        ) : (
          filteredCandidates.map(cand => {
            const isShortlisted = shortlistedIds.includes(cand.id);
            const isHired = hiredCandidateIds.includes(cand.id);

            return (
              <div key={cand.id} className="selection-cand-card">
                {/* Column 1: Candidate Meta */}
                <div className="cand-meta-col">
                  <div className="cand-big-avatar">
                    {cand.avatar || '👤'}
                  </div>
                  <div className="cand-name-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 className="cand-full-name">{cand.name}</h3>
                      <span style={{ fontSize: '0.68rem', background: 'rgba(255, 255, 255, 0.06)', padding: '0.1rem 0.45rem', borderRadius: '4px', color: '#94a3b8' }}>
                        {cand.candidateTag || '#C-VERIFIED'}
                      </span>
                    </div>
                    <span className="cand-target-role">{cand.headline || cand.targetRole}</span>
                    <span className="cand-experience-pill">
                      {cand.experienceYears} Years Exp • {cand.location} • <span style={{ color: '#10b981' }}>🔒 Blind Evaluation</span>
                    </span>
                  </div>
                </div>

                {/* Column 2: Individual Skill Bars & Task Telemetry */}
                <div className="cand-skills-breakdown-col">
                  <div className="cand-skills-bars-grid">
                    {meta.domainSkills.map(sKey => {
                      const skillVal = cand.skills[sKey] || 75;
                      const skillMeta = SKILLBASE_19_SKILLS.find(s => s.id === sKey);
                      const sName = skillMeta ? skillMeta.name.split('/')[0].split('&')[0].trim() : sKey;

                      return (
                        <div key={sKey} className="cand-skill-bar-row">
                          <div className="cand-skill-bar-labels">
                            <span>{sName}</span>
                            <span style={{ fontWeight: 700, color: skillVal >= 85 ? '#34d399' : '#e5e7eb' }}>
                              {skillVal}%
                            </span>
                          </div>
                          <div className="cand-skill-bar-track">
                            <div 
                              className="cand-skill-bar-fill" 
                              style={{ 
                                width: `${Math.min(100, skillVal)}%`,
                                background: skillVal >= 85 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #06b6d4, #38bdf8)'
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Task Callout */}
                  {cand.taskSummary && (
                    <div className="cand-task-summary-callout">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <CheckCircle2 size={13} color="#10b981" />
                        <span><strong>Task:</strong> {cand.taskSummary.taskTitle}</span>
                      </div>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>
                        {cand.taskScore || 90}% Score
                      </span>
                    </div>
                  )}
                </div>

                {/* Column 3: Performance Score & Actions */}
                <div className="cand-actions-perf-col">
                  <div className="overall-perf-badge">
                    <div className="perf-score-number">{cand.overallPerformance}%</div>
                    <div className="perf-score-label">Overall Performance</div>
                  </div>

                  <div className="cand-buttons-stack">
                    <button 
                      type="button"
                      className="company-btn-sm-view"
                      onClick={() => onOpenCandidateProfile(cand)}
                    >
                      <Eye size={14} />
                      View Profile
                    </button>

                    <button 
                      type="button"
                      className={`company-btn-sm-shortlist ${isShortlisted ? 'active' : ''}`}
                      onClick={() => onToggleShortlist(cand.id)}
                    >
                      <Star size={14} />
                      {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                    </button>

                    {!isHired ? (
                      <button 
                        type="button"
                        className="company-btn-sm-hire"
                        onClick={() => onOpenHireModal(cand)}
                      >
                        <Zap size={14} />
                        Hire Candidate
                      </button>
                    ) : (
                      <div className="company-btn-sm-hire hired">
                        <Check size={14} />
                        Hired
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
  );
}
