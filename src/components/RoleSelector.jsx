// src/components/RoleSelector.jsx
import React, { useState } from 'react';
import { ROLES } from '../data/roles';
import { SKILL_TAXONOMY, CANDIDATE_PROFILES, calculateSkillGaps } from '../data/skills';
import { selectTaskForCandidate } from '../data/tasks';
import { 
  Code2, ShieldAlert, Palette, ArrowRight, Zap, 
  Target, Award, SlidersHorizontal, CheckCircle2, AlertCircle, Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Code2,
  ShieldAlert,
  Palette
};

export default function RoleSelector({ onRoleSelected, initialRoleId = 'frontend', currentUser }) {
  const [selectedRoleId, setSelectedRoleId] = useState(initialRoleId);
  const [customSkills, setCustomSkills] = useState({});
  const [isCustomizing, setIsCustomizing] = useState(false);

  const selectedRole = ROLES.find(r => r.id === selectedRoleId) || ROLES[0];
  const roleSkills = SKILL_TAXONOMY[selectedRoleId] || [];
  const candidatePreset = {
    ...(CANDIDATE_PROFILES[selectedRoleId] || { name: 'Candidate', title: selectedRole.name, skills: {} }),
    ...(currentUser ? { name: currentUser.name, title: currentUser.roleName || selectedRole.name } : {})
  };

  // Current candidate skills (either preset or customized)
  const candidateSkills = {
    ...candidatePreset.skills,
    ...(customSkills[selectedRoleId] || {})
  };

  // Calculate gaps
  const skillGaps = calculateSkillGaps(roleSkills, candidateSkills);
  const topGaps = skillGaps.slice(0, 2);

  // Dynamic task archetype matched
  const matchedTask = selectTaskForCandidate(selectedRoleId, skillGaps);

  const handleSkillSliderChange = (skillId, value) => {
    setCustomSkills(prev => ({
      ...prev,
      [selectedRoleId]: {
        ...(prev[selectedRoleId] || candidatePreset.skills),
        [skillId]: Number(value)
      }
    }));
  };

  const handleResetSkills = () => {
    setCustomSkills(prev => {
      const copy = { ...prev };
      delete copy[selectedRoleId];
      return copy;
    });
  };

  const handleConfirmRole = () => {
    onRoleSelected({
      role: selectedRole,
      skills: roleSkills,
      candidateProfile: {
        ...candidatePreset,
        skills: candidateSkills
      },
      skillGaps,
      matchedTask
    });
  };

  return (
    <div className="role-selector-container">
      {/* Header */}
      <div className="section-header text-center">
        <div className="badge-pill">
          <Sparkles size={14} className="text-accent" />
          <span>Role-Based Simulation Engine Architecture</span>
        </div>
        <h1 className="main-title">Select Profession & Benchmark Skill Gaps</h1>
        <p className="subtitle">
          DayOne.ai dynamically configures realistic workplace tools, telemetry, and high-stakes tasks
          tailored directly to your largest competency deficits.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="roles-grid">
        {ROLES.map(role => {
          const IconComponent = ICON_MAP[role.icon] || Code2;
          const isSelected = role.id === selectedRoleId;

          return (
            <div 
              key={role.id}
              className={`role-card ${isSelected ? 'role-card-active' : ''}`}
              onClick={() => setSelectedRoleId(role.id)}
            >
              <div className="role-card-header">
                <div className={`role-icon-box role-icon-${role.id}`}>
                  <IconComponent size={24} />
                </div>
                <span className="role-badge-pill">{role.badge}</span>
              </div>

              <h3 className="role-card-name">{role.name}</h3>
              <p className="role-card-dept">{role.department}</p>
              <p className="role-card-tagline">{role.tagline}</p>

              <div className="role-tools-preview">
                <span className="tools-label">Integrated Tools ({role.tools.length}):</span>
                <div className="tools-chips-row">
                  {role.tools.slice(0, 4).map(t => (
                    <span key={t.id} className="tool-chip">{t.name.split(' ')[0]}</span>
                  ))}
                  {role.tools.length > 4 && (
                    <span className="tool-chip tool-chip-more">+{role.tools.length - 4} more</span>
                  )}
                </div>
              </div>

              <div className="role-card-footer">
                <span className="role-lead-preview">
                  Lead: {role.aiLead.avatar} {role.aiLead.name}
                </span>
                <span className={`select-indicator ${isSelected ? 'selected' : ''}`}>
                  {isSelected ? 'Selected' : 'Click to Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Gap Analysis Box */}
      <div className="gap-analysis-card">
        <div className="gap-analysis-header">
          <div className="flex-row items-center gap-3">
            <Target className="text-accent" size={24} />
            <div>
              <h3 className="card-title">Candidate Skill Profile & Real-Time Gap Analysis</h3>
              <p className="card-subtext">
                Candidate: <strong className="text-white">{candidatePreset.name}</strong> ({candidatePreset.title}) 
                — Comparing against <strong className="text-accent">{selectedRole.name}</strong> production benchmark
              </p>
            </div>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsCustomizing(!isCustomizing)}
          >
            <SlidersHorizontal size={16} />
            {isCustomizing ? 'Hide Skill Sliders' : 'Adjust Candidate Scores'}
          </button>
        </div>

        {/* Skill Bars List */}
        <div className="skills-benchmark-grid">
          {skillGaps.map(skill => {
            const isTop = skill.isTopGap;

            return (
              <div key={skill.skillId} className={`skill-benchmark-row ${isTop ? 'top-gap-highlight' : ''}`}>
                <div className="skill-info-row">
                  <div className="flex-row items-center gap-2">
                    {isTop ? (
                      <AlertCircle size={16} className="text-warning" />
                    ) : (
                      <CheckCircle2 size={16} className="text-success" />
                    )}
                    <span className="skill-name">{skill.name}</span>
                    {isTop && <span className="top-gap-badge">Top Skill Gap</span>}
                  </div>
                  <div className="skill-scores">
                    <span className="cand-score">{skill.candidateScore}% Candidate</span>
                    <span className="divider">/</span>
                    <span className="req-score">{skill.requiredScore}% Req</span>
                    {skill.gap > 0 && (
                      <span className="gap-badge">-{skill.gap}% Deficit</span>
                    )}
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div className="benchmark-bar-track">
                  <div 
                    className="benchmark-bar-fill candidate" 
                    style={{ width: `${skill.candidateScore}%` }}
                  />
                  <div 
                    className="benchmark-target-marker" 
                    style={{ left: `${skill.requiredScore}%` }}
                    title={`Required Benchmark: ${skill.requiredScore}%`}
                  />
                </div>

                {/* Optional interactive slider */}
                {isCustomizing && (
                  <div className="slider-control">
                    <input 
                      type="range" 
                      min="15" 
                      max="100" 
                      value={skill.candidateScore} 
                      onChange={(e) => handleSkillSliderChange(skill.skillId, e.target.value)}
                    />
                    <span className="slider-val">{skill.candidateScore}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isCustomizing && (
          <div className="reset-bar">
            <button className="btn-link" onClick={handleResetSkills}>Reset to Preset Baseline</button>
          </div>
        )}

        {/* Dynamic Task Match Callout */}
        <div className="matched-task-callout">
          <div className="matched-task-icon">
            <Zap size={22} className="text-warning" />
          </div>
          <div className="matched-task-info">
            <div className="matched-badge">
              Dynamic Archetype Match: <span>{matchedTask.archetype.toUpperCase()}</span>
            </div>
            <h4 className="matched-task-title">{matchedTask.title}</h4>
            <p className="matched-task-desc">
              Triggered automatically because candidate's biggest deficits are in{' '}
              <strong className="text-accent">{topGaps.map(g => g.name).join(' and ')}</strong>.
            </p>
          </div>
          <button 
            className="btn btn-primary btn-generate"
            onClick={handleConfirmRole}
          >
            <span>Generate Mission</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
