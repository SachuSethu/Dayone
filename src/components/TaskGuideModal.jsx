// src/components/TaskGuideModal.jsx
// Interactive in-app Task Guide & Solution Playbook modal with step-by-step resolution path, code solutions, and PDF export.

import React, { useState } from 'react';
import { TASK_SOLUTIONS, getSolutionByTaskId, getSolutionByRoleId } from '../data/taskSolutions';
import { printTaskGuidePDF, downloadTaskGuideHTML, printAllTasksMasterGuidePDF } from '../lib/pdf/pdfGenerator';
import { 
  X, BookOpen, Printer, Download, Copy, Check, 
  Terminal, ShieldAlert, Code2, AlertTriangle, CheckCircle2, 
  ChevronRight, ArrowRight, Layers, ExternalLink, Sparkles
} from 'lucide-react';

export default function TaskGuideModal({ 
  currentTaskId, 
  currentRoleId, 
  onClose,
  onApplySolutionCode 
}) {
  // Find current solution or default to matching role
  const initialSolution = currentTaskId 
    ? getSolutionByTaskId(currentTaskId)
    : getSolutionByRoleId(currentRoleId);

  const [activeSolutionId, setActiveSolutionId] = useState(initialSolution.id);
  const [copiedKey, setCopiedKey] = useState(null);

  const activeTask = TASK_SOLUTIONS.find(s => s.id === activeSolutionId) || initialSolution;

  const handleCopyCode = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="task-guide-backdrop" onClick={onClose}>
      <div className="task-guide-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <header className="guide-modal-header">
          <div className="guide-header-left">
            <div className="guide-header-badge">
              <BookOpen size={16} />
              <span>DAYONE SIMULATION SOLUTION PLAYBOOK</span>
            </div>
            <h2 className="guide-modal-title">Task Guide & Step-by-Step Resolution Path</h2>
          </div>

          <div className="guide-header-actions">
            {/* Print / Save as PDF */}
            <button 
              type="button" 
              className="btn-guide-action print-btn"
              onClick={() => printTaskGuidePDF(activeTask)}
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Save as PDF</span>
            </button>

            {/* Download Master Guidebook (All Jobs) */}
            <button 
              type="button" 
              className="btn-guide-action master-btn"
              onClick={() => printAllTasksMasterGuidePDF(TASK_SOLUTIONS)}
              title="Export Master PDF for All Jobs"
            >
              <Download size={15} />
              <span>Master PDF (All Jobs)</span>
            </button>

            <button 
              type="button" 
              className="btn-close-guide" 
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Role & Task Selector Tabs */}
        <div className="guide-task-tabs-strip">
          <span className="tabs-strip-label">Select Job & Task:</span>
          <div className="tabs-pill-list">
            {TASK_SOLUTIONS.map(sol => (
              <button
                key={sol.id}
                type="button"
                className={`guide-tab-pill ${sol.id === activeSolutionId ? 'active' : ''}`}
                onClick={() => setActiveSolutionId(sol.id)}
              >
                <span className="pill-code">{sol.missionCode}</span>
                <span className="pill-name">{sol.roleName}: {sol.title.slice(0, 28)}...</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Body Content Scroll Area */}
        <div className="guide-modal-body">
          {/* Task Hero Overview */}
          <div className="guide-task-hero">
            <div className="hero-top-row">
              <span className="hero-code-badge">{activeTask.missionCode}</span>
              <span className="hero-p1-badge">{activeTask.incidentPriority}</span>
              <span className="hero-dept-badge">{activeTask.department}</span>
              <span className="hero-time-badge">⏱ {activeTask.estimatedTime}</span>
            </div>
            <h1 className="hero-task-headline">{activeTask.title}</h1>
            <p className="hero-problem-summary">{activeTask.problemOverview.summary}</p>
          </div>

          {/* SECTION 1: ARCHITECTURAL ROOT CAUSE */}
          <div className="guide-section-block">
            <div className="guide-section-title-row">
              <AlertTriangle size={18} className="text-rose" />
              <h3>1. How It Works & What Causes The Failure</h3>
            </div>
            <div className="root-cause-card">
              <p className="root-cause-desc">
                <strong>Under the Hood:</strong> {activeTask.problemOverview.rootCause}
              </p>
              <div className="telemetry-callouts">
                <span className="telemetry-label">Observed Telemetry & Error Logs:</span>
                <ul>
                  {activeTask.problemOverview.telemetryAlerts.map((alert, idx) => (
                    <li key={idx} className="telemetry-item">
                      <code>{alert}</code>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="impact-note">
                <strong>Business & SLA Impact:</strong> {activeTask.problemOverview.impactMetric}
              </div>
            </div>
          </div>

          {/* SECTION 2: STEP-BY-STEP RESOLUTION GUIDE */}
          <div className="guide-section-block">
            <div className="guide-section-title-row">
              <Layers size={18} className="text-cyan" />
              <h3>2. Step-by-Step Resolution Guide Path</h3>
            </div>
            <div className="steps-timeline">
              {activeTask.stepByStepGuide.map(s => (
                <div key={s.step} className="step-timeline-card">
                  <div className="step-circle-badge">{s.step}</div>
                  <div className="step-content-col">
                    <div className="step-content-header">
                      <h4 className="step-name">{s.title}</h4>
                      <span className="step-tool-tag">{s.tool}</span>
                    </div>
                    <p className="step-action-text">{s.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: OFFICIAL SOLUTION CODE & COMMANDS */}
          <div className="guide-section-block">
            <div className="guide-section-title-row">
              <Code2 size={18} className="text-emerald" />
              <h3>3. Working Production Solution (Code & Commands)</h3>
            </div>
            <div className="solutions-code-blocks">
              {Object.entries(activeTask.solutionCode).map(([filename, code]) => (
                <div key={filename} className="solution-code-card">
                  <div className="code-card-header">
                    <span className="code-filename-label">{filename}</span>
                    <button 
                      type="button" 
                      className="btn-copy-code"
                      onClick={() => handleCopyCode(filename, code)}
                    >
                      {copiedKey === filename ? (
                        <>
                          <Check size={14} className="text-emerald" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy Solution</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="code-pre-box">
                    <code>{code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: VERIFICATION CHECKLIST */}
          <div className="guide-section-block">
            <div className="guide-section-title-row">
              <CheckCircle2 size={18} className="text-emerald" />
              <h3>4. Verification Checklist (Score 100% On AI Evaluation)</h3>
            </div>
            <div className="verification-checklist-card">
              {activeTask.verificationChecklist.map((item, idx) => (
                <div key={idx} className="checklist-row">
                  <span className="check-box-icon">✓</span>
                  <span className="check-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <footer className="guide-modal-footer">
          <div className="footer-left-info">
            <span className="confidential-tag">Confidential DayOne Solution Manual</span>
            <span className="dot-divider">•</span>
            <span className="footer-role">Active Target: {activeTask.roleName}</span>
          </div>

          <div className="footer-right-actions">
            <button 
              type="button" 
              className="btn-footer-download-pdf"
              onClick={() => printTaskGuidePDF(activeTask)}
            >
              <Printer size={16} />
              <span>Export Task PDF</span>
            </button>

            <button 
              type="button" 
              className="btn-footer-close"
              onClick={onClose}
            >
              Back to Simulation Workspace
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
