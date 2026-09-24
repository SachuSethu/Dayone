// src/components/dashboard/DomainGrowthTracker.jsx
// Visualizes the candidate's domain knowledge growth:
// Initialized from the resume baseline, dynamically increased after each simulation task.

import React from 'react';
import { 
  TrendingUp, Award, Zap, CheckCircle2, AlertTriangle, 
  ArrowUpRight, Clock, Target, Shield, Sparkles, Layers,
  ChevronRight, BarChart2, Check
} from 'lucide-react';
import { getDomainGrowthMetrics } from '../../lib/dashboard/dashboardStore';

export default function DomainGrowthTracker({ dashboard, onLaunchTask }) {
  if (!dashboard) return null;

  const candidate = dashboard.candidate || {};
  const growthMetrics = getDomainGrowthMetrics(dashboard);
  const growthHistory = dashboard.domainGrowthHistory || [];
  const skillsMatrix = dashboard.skillsMatrix || [];

  const roleName = candidate.targetRole || 'Software Engineering';
  const baseline = growthMetrics.baseline;
  const current = growthMetrics.current;
  const gain = growthMetrics.gain;

  return (
    <div className="domain-growth-tracker animate-fade-in">
      {/* Hero Banner: Current Domain State & Stage Level */}
      <div className="growth-hero-card">
        <div className="growth-hero-grid">
          <div className="growth-main-info">
            <div className="growth-tag-row">
              <span className="domain-badge-pill">
                <Sparkles size={12} className="text-accent" />
                <span>PRIMARY DOMAIN: {roleName.toUpperCase()}</span>
              </span>
              <span className={`stage-level-badge level-${growthMetrics.levelIndex}`}>
                LEVEL {growthMetrics.levelIndex} // {growthMetrics.stageName.toUpperCase()}
              </span>
            </div>

            <h2 className="growth-headline">
              Domain Knowledge & Workplace Growth State
            </h2>
            <p className="growth-subtext">
              Initialized from your documented resume evidence and dynamically elevated by verified live workplace simulation incident resolutions.
            </p>

            {/* Level Progression Bar */}
            <div className="level-progression-box">
              <div className="level-progression-labels">
                <span className="text-xs font-semibold text-white">
                  Stage Progress: {growthMetrics.stageName}
                </span>
                <span className="text-xs font-mono text-cyan">
                  {growthMetrics.levelProgress}% towards {growthMetrics.nextStageName}
                </span>
              </div>
              <div className="level-bar-track">
                <div 
                  className="level-bar-fill" 
                  style={{ width: `${growthMetrics.levelProgress}%` }}
                />
              </div>
              <div className="level-milestones-row">
                <span className={`milestone-dot ${growthMetrics.levelIndex >= 1 ? 'active' : ''}`}>1. Beginner (0-54%)</span>
                <span className={`milestone-dot ${growthMetrics.levelIndex >= 2 ? 'active' : ''}`}>2. Intermediate (55-69%)</span>
                <span className={`milestone-dot ${growthMetrics.levelIndex >= 3 ? 'active' : ''}`}>3. Professional (70-84%)</span>
                <span className={`milestone-dot ${growthMetrics.levelIndex >= 4 ? 'active' : ''}`}>4. Advanced (85%+)</span>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Growth Score Cards */}
          <div className="growth-metrics-pod">
            <div className="score-pod-item current">
              <div className="score-pod-label">Current Validated Score</div>
              <div className="score-pod-value font-mono text-cyan">
                {current}<span>%</span>
              </div>
              <div className="score-pod-sub">
                {current >= 80 ? 'Production Ready' : 'In Active Progression'}
              </div>
            </div>

            <div className="score-pod-subgrid">
              <div className="score-pod-item baseline">
                <div className="score-pod-label">Resume Baseline</div>
                <div className="score-pod-value font-mono text-muted">
                  {baseline}<span>%</span>
                </div>
                <div className="score-pod-sub">AI Resume Benchmark</div>
              </div>

              <div className="score-pod-item gain">
                <div className="score-pod-label">Task Growth Gain</div>
                <div className="score-pod-value font-mono text-emerald">
                  +{gain}<span>%</span>
                </div>
                <div className="score-pod-sub">
                  {growthMetrics.tasksCount > 0 ? `${growthMetrics.tasksCount} Task(s) Evaluated` : 'Pending First Task'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Growth Timeline: Resume -> Task Checkpoints */}
      <div className="growth-timeline-section mt-5">
        <div className="section-header-compact">
          <div className="flex-row items-center gap-2">
            <TrendingUp size={18} className="text-emerald" />
            <h3 className="section-title-sm">Sequential Growth Trajectory</h3>
          </div>
          <span className="text-xs text-muted">Real-time telemetry audit points</span>
        </div>

        <div className="growth-timeline-strip">
          {growthHistory.map((step, idx) => {
            const isLatest = idx === growthHistory.length - 1;
            return (
              <div key={step.id || idx} className={`growth-step-node ${isLatest ? 'latest' : ''}`}>
                <div className="growth-node-marker">
                  <div className="marker-inner font-mono">{idx + 1}</div>
                </div>
                <div className="growth-node-content">
                  <div className="flex-row justify-between items-center mb-1">
                    <span className="node-title font-semibold text-white">{step.label}</span>
                    <span className="node-score font-mono text-cyan">{step.score}%</span>
                  </div>
                  <div className="flex-row items-center gap-2 text-xs text-muted mb-1">
                    <span className="node-stage">{step.level}</span>
                    <span>•</span>
                    <span className="node-date">{new Date(step.timestamp).toLocaleDateString()}</span>
                    {step.delta !== undefined && step.delta !== 0 && (
                      <span className={`node-delta ${step.delta > 0 ? 'text-emerald' : 'text-amber'} font-bold`}>
                        {step.delta > 0 ? `(+${step.delta}%)` : `(${step.delta}%)`}
                      </span>
                    )}
                  </div>
                  <p className="node-details text-xs text-muted mb-0">{step.details}</p>
                </div>
                {idx < growthHistory.length - 1 && <div className="growth-connector-line" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Competency Matrix & Evidence Breakdown */}
      <div className="domain-competencies-section mt-5">
        <div className="section-header-compact">
          <div className="flex-row items-center gap-2">
            <Layers size={18} className="text-cyan" />
            <h3 className="section-title-sm">Domain Skill Breakdown & Verified Telemetry</h3>
          </div>
          <span className="text-xs text-muted">Baseline vs Task-Verified Proficiency</span>
        </div>

        <div className="competencies-grid">
          {skillsMatrix.map((item, idx) => {
            const isVerified = item.status === 'verified_by_simulation' || item.current >= item.required;
            const delta = item.current - item.baseline;

            return (
              <div key={idx} className={`competency-card ${isVerified ? 'verified-card' : ''}`}>
                <div className="competency-card-header">
                  <div>
                    <h4 className="competency-skill-name text-white">{item.skill}</h4>
                    <span className="competency-target-text text-xs text-muted">
                      Production Target: {item.required}%
                    </span>
                  </div>
                  <div className="competency-badge-box">
                    <span className={`competency-status-badge ${item.status}`}>
                      {item.status === 'verified_by_simulation' ? (
                        <>
                          <CheckCircle2 size={12} className="text-emerald" />
                          <span>Task Verified</span>
                        </>
                      ) : (
                        <span>Developing</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Comparative Progress Bars */}
                <div className="competency-progress-dual mt-3">
                  <div className="progress-dual-labels">
                    <span className="text-xs text-muted">
                      Resume Baseline: <strong className="font-mono text-white">{item.baseline}%</strong>
                    </span>
                    <span className="text-xs font-semibold">
                      Current Validated: <strong className={`font-mono ${isVerified ? 'text-emerald' : 'text-cyan'}`}>{item.current}%</strong>
                      {delta > 0 && <span className="text-emerald ml-1 font-mono">(+{delta}%)</span>}
                    </span>
                  </div>

                  <div className="dual-bar-track">
                    {/* Baseline indicator */}
                    <div 
                      className="baseline-bar-fill" 
                      style={{ width: `${Math.min(100, item.baseline)}%` }} 
                      title={`Baseline: ${item.baseline}%`}
                    />
                    {/* Current fill */}
                    <div 
                      className={`current-bar-fill ${isVerified ? 'verified' : 'in-progress'}`} 
                      style={{ width: `${Math.min(100, item.current)}%` }} 
                      title={`Current: ${item.current}%`}
                    />
                    {/* Required target line */}
                    <div 
                      className="required-target-marker" 
                      style={{ left: `${item.required}%` }} 
                      title={`Target Requirement: ${item.required}%`}
                    />
                  </div>
                </div>

                {/* Evidence source description */}
                <div className="competency-evidence-footer mt-2">
                  <span className="text-xs text-muted flex-row items-center gap-1">
                    <Shield size={11} className={isVerified ? 'text-emerald' : 'text-cyan'} />
                    <span className="truncate" title={item.evidence}>{item.evidence}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
