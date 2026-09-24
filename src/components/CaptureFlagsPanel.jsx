// src/components/CaptureFlagsPanel.jsx
// Interactive Capture-Flag Checkpoint Drawer & HUD for DayOne.ai
// Scale: 10 Flags per Task (5 per subtask) across 1,920 challenge checkpoints.

import React, { useState } from 'react';
import { 
  Flag, CheckCircle2, Circle, AlertCircle, ChevronDown, 
  ChevronUp, Sparkles, ArrowRight, X, ExternalLink, Zap,
  Search, Code, Terminal, Globe, Shield, Activity
} from 'lucide-react';

export default function CaptureFlagsPanel({ 
  subtasks = [], 
  capturedFlagIds = [], 
  onCaptureFlag, 
  onSelectTool,
  isOpen = true,
  onClose
}) {
  const [activeSubtaskIdx, setActiveSubtaskIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flagFeedback, setFlagFeedback] = useState({});

  // Flatten all flags
  const allFlags = subtasks.flatMap((st, sIdx) => 
    (st.flags || []).map(f => ({ ...f, subtaskIndex: sIdx, subtaskTitle: st.title }))
  );

  const totalPointsEarned = capturedFlagIds.length * 10;
  const maxPoints = Math.max(10, allFlags.length * 10);
  const percentComplete = Math.round((capturedFlagIds.length / (allFlags.length || 1)) * 100);

  const activeSubtask = subtasks[activeSubtaskIdx] || subtasks[0];
  const activeFlags = activeSubtask?.flags || [];

  const handleSelectOption = (flag, optionText, optionIdx) => {
    if (capturedFlagIds.includes(flag.id)) return;

    setSelectedAnswers(prev => ({ ...prev, [flag.id]: optionIdx }));

    if (optionIdx === (flag.correctOptionIndex ?? 0)) {
      setFlagFeedback(prev => ({
        ...prev,
        [flag.id]: { correct: true, message: `Flag Captured! +${flag.points || 10} PTS awarded.` }
      }));
      if (onCaptureFlag) {
        onCaptureFlag(flag.id, flag.points || 10);
      }
    } else {
      setFlagFeedback(prev => ({
        ...prev,
        [flag.id]: { 
          correct: false, 
          message: `Evidence mismatch. Inspect ${flag.requiredTool || 'the workspace tools'} and verify your telemetry.` 
        }
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="capture-flags-overlay" onClick={onClose}>
      <div className="capture-flags-card" onClick={e => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="flags-header">
          <div className="flags-title-group">
            <div className="flag-icon-badge">
              <Flag size={18} className="text-amber" />
            </div>
            <div>
              <div className="flags-main-heading">
                <h3>Workplace Capture-Flag Checkpoints</h3>
                <span className="flags-count-tag font-mono">
                  {capturedFlagIds.length} / {allFlags.length} CAPTURED
                </span>
              </div>
              <p className="flags-subtext">
                Real-time technical milestones & evidence checkpoints required for AI Code Review.
              </p>
            </div>
          </div>

          <div className="flags-header-actions">
            <div className="flags-score-gauge">
              <span className="score-val font-mono">{totalPointsEarned}</span>
              <span className="score-max font-mono">/ {maxPoints} PTS</span>
            </div>
            <button type="button" className="btn-close-flags" onClick={onClose} title="Close Checkpoints Drawer">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flags-progress-track">
          <div 
            className="flags-progress-fill" 
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {/* Subtask Stepper / Selector */}
        <div className="flags-subtask-tabs">
          {subtasks.map((st, sIdx) => {
            const stFlags = st.flags || [];
            const stCaptured = stFlags.filter(f => capturedFlagIds.includes(f.id)).length;
            const isSubtaskActive = activeSubtaskIdx === sIdx;

            return (
              <button
                key={st.id || sIdx}
                type="button"
                className={`flags-subtask-tab ${isSubtaskActive ? 'active' : ''}`}
                onClick={() => setActiveSubtaskIdx(sIdx)}
              >
                <div className="tab-left">
                  <span className="tab-step-num">SUBTASK {sIdx === 0 ? '1' : '2'}</span>
                  <span className="tab-st-title">{st.title}</span>
                </div>
                <span className="tab-badge font-mono">
                  {stCaptured}/{stFlags.length} Flags
                </span>
              </button>
            );
          })}
        </div>

        {/* Flags List for Active Subtask */}
        <div className="flags-list-scroll">
          {activeFlags.length === 0 ? (
            <div className="empty-flags-notice">
              <AlertCircle size={20} className="text-muted" />
              <span>No capture flags assigned to this subtask.</span>
            </div>
          ) : (
            activeFlags.map((flag, fIdx) => {
              const isCaptured = capturedFlagIds.includes(flag.id);
              const feedback = flagFeedback[flag.id];
              const selectedIdx = selectedAnswers[flag.id];

              return (
                <div 
                  key={flag.id || fIdx} 
                  className={`flag-item-card ${isCaptured ? 'captured' : ''}`}
                >
                  {/* Flag Header */}
                  <div className="flag-item-header">
                    <div className="flag-meta-row">
                      <div className="flag-id-badge">
                        {isCaptured ? (
                          <CheckCircle2 size={16} className="text-emerald" />
                        ) : (
                          <Circle size={16} className="text-amber" />
                        )}
                        <span className="flag-code font-mono">
                          FLAG {activeSubtaskIdx === 0 ? fIdx + 1 : fIdx + 6}
                        </span>
                      </div>

                      <span className="flag-type-pill">{flag.phase || flag.type}</span>
                      <span className="flag-action-pill font-mono">{flag.action}</span>
                    </div>

                    <div className="flag-points-tag font-mono">
                      {isCaptured ? `+${flag.points || 10} PTS` : `${flag.points || 10} PTS`}
                    </div>
                  </div>

                  {/* Flag Question / Mission */}
                  <p className="flag-question-text">{flag.question}</p>

                  {/* Interactive Workplace Decision Options */}
                  <div className="flag-options-grid">
                    {(flag.options || []).map((opt, oIdx) => {
                      const isCorrect = oIdx === (flag.correctOptionIndex ?? 0);
                      const isSelected = selectedIdx === oIdx;

                      let optClass = 'btn-flag-option';
                      if (isCaptured && isCorrect) {
                        optClass += ' opt-correct';
                      } else if (isSelected && !isCorrect) {
                        optClass += ' opt-incorrect';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={isCaptured}
                          className={optClass}
                          onClick={() => handleSelectOption(flag, opt, oIdx)}
                        >
                          <span className="opt-letter font-mono">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="opt-label">{opt}</span>
                          {isCaptured && isCorrect && (
                            <CheckCircle2 size={14} className="text-emerald ml-auto flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {feedback && (
                    <div className={`flag-feedback-banner ${feedback.correct ? 'success' : 'warning'}`}>
                      {feedback.correct ? (
                        <CheckCircle2 size={14} className="text-emerald" />
                      ) : (
                        <AlertCircle size={14} className="text-amber" />
                      )}
                      <span>{feedback.message}</span>
                    </div>
                  )}

                  {/* Quick-Jump to Tool */}
                  {flag.requiredTool && (
                    <div className="flag-tool-hint">
                      <span className="text-muted text-xs">Required Tool:</span>
                      <button 
                        type="button" 
                        className="btn-quick-jump"
                        onClick={() => {
                          if (onSelectTool) onSelectTool(flag.requiredTool);
                          if (onClose) onClose();
                        }}
                      >
                        <ExternalLink size={12} />
                        <span>Inspect in {flag.requiredTool.toUpperCase()}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flags-footer">
          <div className="flags-footer-info">
            <Sparkles size={14} className="text-cyan" />
            <span>
              {allFlags.length - capturedFlagIds.length === 0 
                ? 'All 10 Checkpoints Captured! 100% evidence verified.' 
                : `${allFlags.length - capturedFlagIds.length} checkpoint(s) remaining for complete verification.`}
            </span>
          </div>

          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            Resume Workplace Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
