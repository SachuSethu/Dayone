// src/components/resume/AnalysisProgress.jsx
// Animated sequential analysis screen showing Gemini API reasoning pipeline.

import React, { useEffect, useState } from 'react';
import { 
  Cpu, FileSearch, Sparkles, Target, Compass, 
  CheckCircle2, Loader2, ArrowRight
} from 'lucide-react';

const ANALYSIS_STAGES = [
  {
    id: 1,
    title: 'Extracting Resume Text & Structural Entities',
    desc: 'Parsing sanitized sections, project deliverables, and technical claims...',
    icon: FileSearch
  },
  {
    id: 2,
    title: 'AI Evaluation: Capability & Evidence Reasoning',
    desc: 'Auditing accredited certifications and requiring concrete project details...',
    icon: Sparkles
  },
  {
    id: 3,
    title: 'Benchmarking Against Enterprise Role Requirements',
    desc: 'Comparing extracted skills against production importance weightings...',
    icon: Target
  },
  {
    id: 4,
    title: 'Computing Deterministic Opportunity Gap Matrix',
    desc: 'Calculating alignment statuses, gap percentages, and priority weighting...',
    icon: Compass
  },
  {
    id: 5,
    title: 'Synthesizing Personalized First-Day Workplace Mission',
    desc: 'AI Evaluation Engine architecting a production scenario challenging your top priority skill gap...',
    icon: Cpu
  }
];

export default function AnalysisProgress({ targetRole, fileName, currentStep = 1 }) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    // Smooth simulated step advancement if API is running
    const interval = setInterval(() => {
      setActiveStageIndex(prev => {
        if (prev < ANALYSIS_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(100, Math.round(((activeStageIndex + 1) / ANALYSIS_STAGES.length) * 100));

  return (
    <div className="analysis-progress-overlay">
      <div className="analysis-progress-modal">
        {/* Top Header */}
        <div className="progress-modal-header">
          <div className="ai-eval-pill-tag">
            <Sparkles size={14} className="gemini-sparkle" />
            <span>DAYONE AI EVALUATION PIPELINE</span>
          </div>
          <h2 className="progress-headline">Benchmarking Resume Intelligence</h2>
          <p className="progress-subtext">
            Evaluating <strong>{fileName || 'Resume Document'}</strong> against{' '}
            <strong>{targetRole?.name}</strong> production requirements.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="progress-bar-meta">
            <span className="current-operation">
              {ANALYSIS_STAGES[activeStageIndex]?.title}
            </span>
            <span className="percent-text">{progressPercent}%</span>
          </div>
        </div>

        {/* Sequential Pipeline Stages */}
        <div className="pipeline-stages-list">
          {ANALYSIS_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx < activeStageIndex;
            const isCurrent = idx === activeStageIndex;
            const isPending = idx > activeStageIndex;

            return (
              <div 
                key={stage.id} 
                className={`pipeline-stage-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${isPending ? 'pending' : ''}`}
              >
                <div className="stage-icon-wrap">
                  {isCompleted ? (
                    <CheckCircle2 size={20} className="check-success" />
                  ) : isCurrent ? (
                    <Loader2 size={20} className="spinner-active" />
                  ) : (
                    <Icon size={20} className="icon-pending" />
                  )}
                </div>

                <div className="stage-details">
                  <div className="stage-title-row">
                    <h4 className="stage-title">{stage.title}</h4>
                    {isCurrent && <span className="running-badge">Processing...</span>}
                    {isCompleted && <span className="done-badge">Verified</span>}
                  </div>
                  <p className="stage-desc">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom AI telemetry note */}
        <div className="progress-modal-footer">
          <div className="pulse-indicator">
            <span className="pulse-dot" />
            <span className="pulse-text">AI Telemetry Active • Enforcing Deterministic Gap Contracts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
