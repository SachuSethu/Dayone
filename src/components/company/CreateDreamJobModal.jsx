// src/components/company/CreateDreamJobModal.jsx
// Post New Company Vacancy & Dream Candidate Matching Engine
// Automatically synchronizes newly dropped vacancies to the candidate feed.

import React, { useState } from 'react';
import { 
  X, Plus, Sparkles, Building2, Briefcase, MapPin, 
  DollarSign, CheckCircle2, Sliders, ArrowRight, UserCheck, AlertCircle 
} from 'lucide-react';
import { SKILLBASE_ROLES, SKILLBASE_19_SKILLS } from '../../data/skillBaseData';
import { createCompanyVacancy, getCandidatesForPath } from '../../lib/company/companyStore';

export default function CreateDreamJobModal({
  company,
  onVacancyCreated,
  onClose
}) {
  const [rolePath, setRolePath] = useState('frontend'); // 'frontend' | 'cybersecurity' | 'uiux'
  const [title, setTitle] = useState('Frontend Engineer (Design & Performance)');
  const [location, setLocation] = useState('Remote / Hybrid (India)');
  const [experience, setExperience] = useState('1-3 years');
  const [salaryRange, setSalaryRange] = useState('$75,000 - $105,000');
  const [description, setDescription] = useState(
    'Build production-grade applications, optimize frontend rendering performance, and maintain comprehensive test coverage.'
  );

  // Dynamic Skill Requirements based on chosen rolePath
  const [requiredSkills, setRequiredSkills] = useState({
    html: 75,
    css: 80,
    javascript: 85,
    react: 80,
    api: 70,
    git: 65,
    testing: 60
  });

  const [createdVacancy, setCreatedVacancy] = useState(null);
  const [matchedCandidates, setMatchedCandidates] = useState([]);

  // When rolePath changes, update default skills
  const handleRoleChange = (newRole) => {
    setRolePath(newRole);
    if (newRole === 'frontend') {
      setTitle('Frontend Developer (Core Web)');
      setRequiredSkills({
        html: 75,
        css: 80,
        javascript: 85,
        react: 80,
        api: 70,
        git: 65,
        testing: 60
      });
    } else if (newRole === 'cybersecurity') {
      setTitle('Cybersecurity Operations Analyst');
      setRequiredSkills({
        'network-security': 75,
        linux: 70,
        siem: 80,
        'incident-response': 75,
        'threat-detection': 80,
        'log-analysis': 75
      });
    } else if (newRole === 'uiux') {
      setTitle('Product UI/UX Designer');
      setRequiredSkills({
        figma: 80,
        'user-research': 75,
        wireframing: 80,
        prototyping: 75,
        'usability-testing': 70,
        'design-systems': 70
      });
    }
  };

  const handleSkillSliderChange = (skillId, val) => {
    setRequiredSkills(prev => ({
      ...prev,
      [skillId]: Number(val)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobPayload = {
      title,
      roleId: rolePath,
      location,
      experience,
      salaryRange,
      description,
      requiredSkills
    };

    const newJob = createCompanyVacancy(company, jobPayload);
    setCreatedVacancy(newJob);

    // Calculate match against current candidate pool for this path
    const pathCandidates = getCandidatesForPath(rolePath);
    const scoredCandidates = pathCandidates.map(cand => {
      const candSkills = cand.skills || {};
      let sumRatio = 0;
      const skillKeys = Object.keys(requiredSkills);
      skillKeys.forEach(k => {
        const cVal = candSkills[k] || 60;
        const rVal = requiredSkills[k] || 70;
        sumRatio += Math.min(cVal / rVal, 1.0);
      });
      const matchScore = Math.round((sumRatio / skillKeys.length) * 100);
      return {
        ...cand,
        matchScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setMatchedCandidates(scoredCandidates);
    onVacancyCreated(newJob);
  };

  return (
    <div className="company-modal-backdrop" onClick={onClose}>
      <div 
        className="company-modal-panel animate-fade" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px' }}
      >
        {/* Header */}
        <div className="company-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '8px', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Plus size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: 800 }}>
                Drop New Vacancy & Define Dream Candidate
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af' }}>
                Posting for {company?.companyName || 'TechNova Labs'} — Automatically updates candidate job recommendations.
              </p>
            </div>
          </div>

          <button type="button" className="company-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content: Form OR Success Matches */}
        {createdVacancy ? (
          <div className="company-modal-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.1)', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <CheckCircle2 size={32} color="#10b981" />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1.1rem', fontWeight: 800 }}>
                  Vacancy Published Live!
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#d1d5db' }}>
                  <strong>{createdVacancy.title}</strong> has been created under <strong>{company?.companyName}</strong>. Candidates viewing their job recommendations can now discover and apply with their ATS resumes!
                </p>
              </div>
            </div>

            {/* Matched Dream Candidates in Pool */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.85rem 0' }}>
                Instant Matches in DAYONE Candidate Pool:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {matchedCandidates.slice(0, 3).map(cand => (
                  <div key={cand.id} style={{ 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '0.85rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ fontSize: '1.5rem' }}>{cand.avatar || '👤'}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{cand.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{cand.headline} • {cand.experienceYears} yrs exp</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981' }}>
                          {cand.matchScore}%
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                          Dream Match
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="company-modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
              <button 
                type="button" 
                className="company-post-btn"
                onClick={onClose}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Done & Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="company-modal-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Path Selector Tabs */}
              <div className="filter-group">
                <label className="filter-label">Hiring Path Domain</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <button 
                    type="button"
                    className={`company-nav-btn ${rolePath === 'frontend' ? 'active' : ''}`}
                    onClick={() => handleRoleChange('frontend')}
                    style={{ justifyContent: 'center', padding: '0.7rem' }}
                  >
                    Frontend Developer
                  </button>
                  <button 
                    type="button"
                    className={`company-nav-btn ${rolePath === 'cybersecurity' ? 'active' : ''}`}
                    onClick={() => handleRoleChange('cybersecurity')}
                    style={{ justifyContent: 'center', padding: '0.7rem' }}
                  >
                    Cybersecurity Analyst
                  </button>
                  <button 
                    type="button"
                    className={`company-nav-btn ${rolePath === 'uiux' ? 'active' : ''}`}
                    onClick={() => handleRoleChange('uiux')}
                    style={{ justifyContent: 'center', padding: '0.7rem' }}
                  >
                    UI/UX Designer
                  </button>
                </div>
              </div>

              {/* Title & Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="filter-group">
                  <label className="filter-label">Job Vacancy Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="filter-select"
                    required
                  />
                </div>
                <div className="filter-group">
                  <label className="filter-label">Location / Work Arrangement</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="filter-select"
                    required
                  />
                </div>
              </div>

              {/* Experience & Salary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="filter-group">
                  <label className="filter-label">Target Experience Range</label>
                  <input 
                    type="text" 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="filter-select"
                    required
                  />
                </div>
                <div className="filter-group">
                  <label className="filter-label">Salary Range</label>
                  <input 
                    type="text" 
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="filter-select"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="filter-group">
                <label className="filter-label">Vacancy Description</label>
                <textarea 
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="filter-select"
                  required
                />
              </div>

              {/* Dream Candidate Skill Benchmarks */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <label className="filter-label" style={{ margin: 0 }}>
                    Dream Candidate Skill Thresholds (Minimum Required)
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#10b981' }}>
                    Adjust sliders to tune candidate match criteria
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 1.5rem' }}>
                  {Object.entries(requiredSkills).map(([sKey, sVal]) => {
                    const skillMeta = SKILLBASE_19_SKILLS.find(s => s.id === sKey);
                    const name = skillMeta ? skillMeta.name : sKey.toUpperCase();
                    return (
                      <div key={sKey} className="filter-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                          <span style={{ color: '#d1d5db', fontWeight: 600 }}>{name}</span>
                          <span style={{ color: '#34d399', fontWeight: 700 }}>{sVal}%</span>
                        </div>
                        <input 
                          type="range"
                          min="30"
                          max="95"
                          value={sVal}
                          onChange={(e) => handleSkillSliderChange(sKey, e.target.value)}
                          className="filter-slider"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="company-modal-footer">
              <button type="button" className="company-btn-sm-view" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="company-post-btn" style={{ padding: '0.65rem 1.5rem' }}>
                <Sparkles size={15} />
                Publish Vacancy & Find Matches
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
