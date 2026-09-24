// src/components/resume/TargetRoleSelector.jsx
// Target Role Selection stage of the DayOne.ai Resume Intelligence Workflow.

import React, { useState } from 'react';
import { ROLES_DATASET } from '../../lib/roles/roles';
import { 
  Code2, Server, ShieldAlert, Palette, BarChart2, 
  ArrowRight, CheckCircle2, TrendingUp, Sparkles, LogOut, Briefcase
} from 'lucide-react';

const ICON_MAP = {
  'frontend-developer': Code2,
  'backend-developer': Server,
  'cybersecurity-analyst': ShieldAlert,
  'uiux-designer': Palette,
  'data-analyst': BarChart2
};

export default function TargetRoleSelector({ onSelectRole, currentUser, onLogout }) {
  const [selectedRoleId, setSelectedRoleId] = useState('frontend-developer');

  const handleConfirm = (role) => {
    if (onSelectRole) {
      onSelectRole(role);
    }
  };

  const selectedRole = ROLES_DATASET.find(r => r.id === selectedRoleId) || ROLES_DATASET[0];

  return (
    <div className="target-role-page">
      {/* Top Banner Navigation */}
      <header className="target-role-header">
        <div className="brand-group">
          <div className="brand-logo-mark">DayOne<span>.ai</span></div>
          <span className="platform-tag">Job-Readiness Intelligence</span>
        </div>

        <div className="flow-stepper">
          <div className="flow-step current">
            <span className="step-circle">1</span>
            <span className="step-text">Choose Target Role</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step pending">
            <span className="step-circle">2</span>
            <span className="step-text">Resume Intelligence</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step pending">
            <span className="step-circle">3</span>
            <span className="step-text">Skill Gap Diagnostics</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step pending">
            <span className="step-circle">4</span>
            <span className="step-text">First-Day Simulation</span>
          </div>
        </div>

        <div className="user-nav-actions">
          {currentUser && (
            <div className="current-user-pill">
              <span className="user-icon">{currentUser.avatar || '👤'}</span>
              <span className="user-name">{currentUser.name || currentUser.email}</span>
            </div>
          )}
          {onLogout && (
            <button className="btn-signout-subtle" onClick={onLogout} title="Sign Out">
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Container */}
      <div className="target-role-container">
        <div className="target-role-hero">
          <div className="hero-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>STEP 1 OF 3 • CAREER BENCHMARKING</span>
          </div>
          <h1 className="hero-title">Select Your Target Role</h1>
          <p className="hero-description">
            Choose the position you are targeting. DayOne’s AI Evaluation Engine 
            will extract your verified resume evidence, benchmark against production requirements, 
            and generate a personalized first-day workplace scenario.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="roles-grid">
          {ROLES_DATASET.map(role => {
            const IconComponent = ICON_MAP[role.id] || Briefcase;
            const isSelected = selectedRoleId === role.id;

            return (
              <div 
                key={role.id}
                className={`role-selection-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedRoleId(role.id)}
              >
                <div className="card-top">
                  <div className={`role-card-icon-wrap ${isSelected ? 'active' : ''}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="card-meta">
                    <span className="role-department">{role.department}</span>
                    <h3 className="role-card-name">{role.name}</h3>
                  </div>
                  {isSelected && (
                    <div className="selected-indicator">
                      <CheckCircle2 size={20} className="check-icon" />
                    </div>
                  )}
                </div>

                <p className="role-card-desc">{role.description}</p>

                {/* Market Demand Pill */}
                <div className="market-demand-callout">
                  <TrendingUp size={13} className="demand-icon" />
                  <span>{role.marketDemandHeadline}</span>
                </div>

                {/* Skill Chips */}
                <div className="role-skills-wrap">
                  <span className="skills-label">Core Capabilities Tested:</span>
                  <div className="skill-pills-list">
                    {role.skills.slice(0, 5).map(skill => (
                      <span key={skill.name} className="skill-pill">
                        {skill.name}
                      </span>
                    ))}
                    {role.skills.length > 5 && (
                      <span className="skill-pill more">+{role.skills.length - 5} more</span>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="card-footer">
                  <button 
                    type="button"
                    className={`btn-select-card ${isSelected ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirm(role);
                    }}
                  >
                    <span>{isSelected ? 'Continue with This Role' : 'Select Role'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Continue Bar for Mobile / Convenience */}
        <div className="role-confirm-dock">
          <div className="dock-info">
            <span className="dock-label">Selected Role:</span>
            <strong className="dock-role-name">{selectedRole.name}</strong>
            <span className="dock-dept">({selectedRole.department})</span>
          </div>
          <button 
            type="button" 
            className="btn-dock-confirm"
            onClick={() => handleConfirm(selectedRole)}
          >
            <span>Proceed to Resume Intelligence</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
