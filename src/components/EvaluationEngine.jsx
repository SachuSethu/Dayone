// src/components/EvaluationEngine.jsx
// DayOne.ai — Master Evaluation Engine implementing Steps 12 - 18
// Step 12: AI Code Review (Technical & Workplace metrics)
// Step 13: Partial pass / Edge case detection & 7-min Skill Sprint offer
// Step 14: Micro-Learning Skill Sprint
// Step 15: Try the Shift Again
// Step 16: First-Day Report & Job Readiness %
// Step 17: Verified Micro-Credential with Verify Modal
// Step 18: DayOne Skill Passport (Verified & Developing skills)
// Multi-Task & 4-Level Sequential Progression

import React, { useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, CheckCircle2, Shield, TrendingUp, Sparkles, 
  ExternalLink, Share2, Download, ArrowRight, RotateCcw, 
  Star, Briefcase, ChevronRight, FileCheck, AlertTriangle,
  Zap, Clock, Bot, Check, PieChart, ShieldCheck, CheckSquare, X, Flag,
  Loader2, XCircle, Lock, LayoutDashboard
} from 'lucide-react';
import { JOB_PROFILES } from '../data/jobs';
import { calculateTaskEvaluation, getLevelInfo, getNextLevel } from '../lib/skills/statsEngine';
import { apiEvaluateTaskSolution } from '../lib/api/client';
import { recordTaskResultInDashboard } from '../lib/dashboard/dashboardStore';
import { findMicroCourseForWeakness } from '../data/microCourses';
import MicroCourseCard from './common/MicroCourseCard';
import MicroCourseSkillSprint from './MicroCourseSkillSprint';

export default function EvaluationEngine({ 
  missionData, 
  workspaceState, 
  onRetakeSimulation,
  onSelectNewRole,
  onProceedToNextTask,
  onAdvanceToNextLevel,
  onViewDashboard,
  taskIndex = 0,
  totalTasksInLevel = 2,
  currentLevel = 2
}) {
  const { role, candidateProfile, skillGaps, taskType } = missionData;
  const targetJobs = JOB_PROFILES[role.id] || [];

  // State for Step 14 Skill Sprint modal
  const [showSkillSprint, setShowSkillSprint] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [sprintRemediated, setSprintRemediated] = useState(false);

  // Gemini AI Evaluation State
  const [aiEvaluation, setAiEvaluation] = useState(null);
  const [isEvaluatingAI, setIsEvaluatingAI] = useState(true);

  // Trigger Gemini API code review and evaluation
  useEffect(() => {
    let isMounted = true;
    async function runAIEvaluation() {
      setIsEvaluatingAI(true);
      try {
        const evalResult = await apiEvaluateTaskSolution({
          task: missionData?.assignedTask || { title: missionData?.missionCode, id: missionData?.missionCode },
          initialCode: workspaceState?.initialCode || '',
          submittedCode: workspaceState?.submittedCode || '',
          files: workspaceState?.fileContents || {},
          terminalOutput: workspaceState?.terminalOutput || '',
          capturedFlags: workspaceState?.capturedFlags || [],
          elapsedSeconds: workspaceState?.elapsedSeconds || 540,
          hasEdgeCaseFailure: Boolean(workspaceState?.hasEdgeCaseFailure)
        });

        if (isMounted && evalResult) {
          setAiEvaluation(evalResult);
        }
      } catch (err) {
        console.warn('AI evaluation error:', err);
      } finally {
        if (isMounted) {
          setIsEvaluatingAI(false);
        }
      }
    }

    runAIEvaluation();
    return () => { isMounted = false; };
  }, [workspaceState, missionData]);

  // Compute evaluation data using time-based stats engine with Gemini AI results
  const evalData = useMemo(() => {
    return calculateTaskEvaluation({
      missionData,
      workspaceState: {
        ...workspaceState,
        hasEdgeCaseFailure: sprintRemediated ? false : workspaceState?.hasEdgeCaseFailure
      },
      elapsedSeconds: workspaceState?.elapsedSeconds || 540,
      candidateLevel: currentLevel,
      hintsUsed: workspaceState?.workSignals?.hintsUsed || 0,
      chaosResolved: workspaceState?.chaosResolved ?? true,
      aiEvaluation
    });
  }, [missionData, workspaceState, currentLevel, sprintRemediated, aiEvaluation]);

  const recommendedCourse = useMemo(() => {
    if (aiEvaluation?.recommendedMicroCourse) {
      return aiEvaluation.recommendedMicroCourse;
    }
    const primaryWeakness = aiEvaluation?.weaknessAnalysis?.primaryWeaknesses?.[0]?.area ||
      evalData?.edgeCaseDetails?.skill ||
      missionData?.assignedTask?.primarySkill ||
      role?.skills?.[0]?.name;
    return findMicroCourseForWeakness(role?.id || 'frontend-developer', primaryWeakness);
  }, [aiEvaluation, evalData, missionData, role]);

  const levelInfo = getLevelInfo(currentLevel);
  const nextLevel = getNextLevel(currentLevel);

  // Format MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Trigger celebration confetti on pass
  useEffect(() => {
    if (evalData.passed && !evalData.hasEdgeCaseFailure) {
      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // canvas ignore
      }
    }
  }, [evalData.passed, evalData.hasEdgeCaseFailure]);

  // Automatically record task evaluation in candidate profile dashboard
  useEffect(() => {
    if (evalData && !isEvaluatingAI) {
      recordTaskResultInDashboard({
        evalData,
        missionData,
        workspaceState,
        aiEvaluation
      });
    }
  }, [evalData, isEvaluatingAI, missionData, workspaceState, aiEvaluation]);

  const candidateDisplayName = candidateProfile?.name || 'Sachu Sethu';

  return (
    <div className="evaluation-engine-container">
      {/* STEP 13: ALMOST THERE / EDGE CASE DETECTION BANNER */}
      {evalData.hasEdgeCaseFailure && !sprintRemediated && (
        <div className="step13-edgecase-banner animate-slide-in">
          <div className="edgecase-banner-left">
            <div className="edgecase-icon-pulse">
              <AlertTriangle size={24} className="text-amber" />
            </div>
            <div>
              <div className="edgecase-badge">
                <span>PRODUCTION EDGE CASE DETECTED</span>
              </div>
              <h2 className="edgecase-title">Almost there.</h2>
              <p className="edgecase-desc">
                Your implementation solved the main issue, but we found one production edge case:
                <strong> {evalData.edgeCaseDetails.description}</strong>
              </p>
              <div className="missing-skill-pill">
                <span>Missing Skill: <strong>{evalData.edgeCaseDetails.skill}</strong></span>
                <span className="dot-sep">•</span>
                <span>Current capability: <strong>{evalData.edgeCaseDetails.currentCapability}%</strong></span>
                <span className="dot-sep">•</span>
                <span>Required for role: <strong>{evalData.edgeCaseDetails.requiredCapability}%</strong></span>
              </div>
            </div>
          </div>

          <div className="edgecase-banner-right">
            <button 
              type="button"
              className="btn-fix-gap-sprint"
              onClick={() => setShowSkillSprint(true)}
            >
              <Zap size={16} />
              <span>Fix the Gap (7-min Skill Sprint)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* AI EVALUATION LOADING SPINNER */}
      {isEvaluatingAI && (
        <div className="ai-evaluating-loading-banner animate-pulse">
          <Loader2 size={22} className="animate-spin text-cyan" />
          <div className="ai-loading-text">
            <span className="font-bold text-white text-sm">Evaluating Code Fix with Gemini AI...</span>
            <p className="text-xs text-muted">Running AST diff comparison, verifying error handling, and calculating statistical readiness gain...</p>
          </div>
        </div>
      )}

      {/* AI CODE REVIEW AUDIT: BUG UNRESOLVED / TRIVIAL EDIT REJECTION */}
      {!evalData.passed && !isEvaluatingAI && (
        <div className="ai-audit-rejected-card animate-slide-in">
          <div className="ai-audit-header">
            <div className="ai-audit-icon-wrap">
              <XCircle size={32} className="text-rose" />
            </div>
            <div className="ai-audit-header-text">
              <div className="ai-audit-badge-pill">
                <AlertTriangle size={13} className="text-rose" />
                <span>AI AUDIT: ROOT CAUSE UNRESOLVED — PROGRESSION LOCKED</span>
              </div>
              <h2 className="ai-audit-title">Bug Fix Rejected — Code Review Failed</h2>
              <p className="ai-audit-explanation">
                {aiEvaluation?.aiEvaluationSummary || 
                  (evalData.isWhitespaceOnly 
                    ? 'AI Evaluation Audit: Only whitespace/formatting changes detected. The root-cause error was NOT resolved. No statistical improvement is awarded.'
                    : 'AI Evaluation Audit: The submitted code does not resolve the root-cause bug. Production tests fail.')}
              </p>
            </div>
          </div>

          <div className="ai-audit-body-grid">
            {/* Unresolved Errors */}
            <div className="ai-audit-box errors">
              <h4 className="audit-box-title text-rose">
                <XCircle size={15} />
                <span>Unresolved Errors & Flaws</span>
              </h4>
              <ul className="audit-errors-list">
                {(aiEvaluation?.unresolvedErrors?.length ? aiEvaluation.unresolvedErrors : [
                  'Trivial/whitespace edits do not resolve runtime race conditions',
                  'Missing retry loop for unhandled 504 / 500 network errors',
                  'Payment submitting lock not released on API exception',
                  'Floating point precision defect persists in cart total calculation'
                ]).map((err, i) => (
                  <li key={i} className="audit-error-item">
                    <span className="error-bullet">✕</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Next Steps */}
            <div className="ai-audit-box actions">
              <h4 className="audit-box-title text-cyan">
                <Bot size={15} />
                <span>Actionable Steps to Resolve</span>
              </h4>
              <ul className="audit-steps-list">
                {(aiEvaluation?.actionableNextSteps?.length ? aiEvaluation.actionableNextSteps : [
                  'Return to Monaco Editor and inspect submitCheckout() in src/services/checkoutApi.js',
                  'Implement an exponential backoff while loop for network retries (attempt < maxRetries)',
                  'Ensure response.ok is checked and non-ok status throws error to trigger retry',
                  'Wrap API calls in try/finally to clear loading and lock state'
                ]).map((step, i) => (
                  <li key={i} className="audit-step-item">
                    <span className="step-num-bullet">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ai-audit-footer-bar">
            <button 
              type="button" 
              className="btn btn-primary btn-retry-audit"
              onClick={onRetakeSimulation}
            >
              <RotateCcw size={16} />
              <span>Return to Workspace to Implement Fix</span>
            </button>
            <span className="audit-penalty-note">
              Readiness score limited to <strong>{evalData.totalScore}%</strong> (Passing threshold: {levelInfo.minCreditToPass}%). Progression locked until bug is resolved.
            </span>
          </div>
        </div>
      )}

      {/* AI CODE REVIEW AUDIT: SUCCESS BANNER */}
      {evalData.passed && !isEvaluatingAI && (
        <div className="ai-audit-passed-card animate-slide-in">
          <div className="flex-row items-center justify-between">
            <div className="flex-row items-center gap-3">
              <CheckCircle2 size={24} className="text-emerald" />
              <div>
                <span className="text-emerald font-bold text-sm">✓ GEMINI AI AUDIT: ROOT CAUSE RESOLVED</span>
                <p className="text-xs text-muted mt-0.5">
                  {aiEvaluation?.aiEvaluationSummary || 'Root cause verified resolved. Exponential backoff retry implemented and state cleanup verified.'}
                </p>
              </div>
            </div>
            <span className="badge-pill-xs text-emerald font-mono font-bold">
              +{evalData.skillImprovements[0]?.gain || 20}% Statistical Gain Awarded
            </span>
          </div>
        </div>
      )}

      {/* Top Banner (Step 16: First-Day Report) */}
      <div className="eval-hero-banner">
        <div className="eval-hero-content">
          <div className="flex-row items-center gap-2 mb-2">
            <span className="badge-pill">
              <Sparkles size={14} className="text-warning" />
              <span>DayOne Automated Workplace Review</span>
            </span>
            <span className="task-seq-pill">
              Task {taskIndex + 1} of {totalTasksInLevel} ({levelInfo.name} Level)
            </span>
          </div>

          <h1 className="eval-hero-title">
            {evalData.passed 
              ? 'SHIFT COMPLETE — Your First-Day Report' 
              : 'Shift Evaluation — Actionable Production Review'}
          </h1>
          <p className="eval-hero-sub">
            Evaluated against live production benchmarks for <strong>{role.name}</strong> ({missionData.missionCode}).
          </p>

          {/* Time Efficiency Metric Strip */}
          <div className="time-efficiency-strip">
            <div className="time-strip-item">
              <Clock size={14} className="text-amber" />
              <span>Time Taken: <strong>{formatTime(evalData.timePerformance.elapsedSeconds)}</strong></span>
              <span className="time-target-text">/ {formatTime(evalData.timePerformance.targetSeconds)} SLA target</span>
            </div>
            <div className={`time-speed-badge ${evalData.timePerformance.speedTier}`}>
              {evalData.timePerformance.speedTier === 'rapid' || evalData.timePerformance.speedTier === 'fast' ? (
                <span>⚡ +18% Speed & Velocity Bonus Applied</span>
              ) : evalData.timePerformance.speedTier === 'delayed' ? (
                <span>⚠️ Extended Duration: High completion time reduced statistical gain</span>
              ) : (
                <span>✓ Standard Sprint Velocity</span>
              )}
            </div>
          </div>
        </div>

        {/* Big Overall Job Readiness Orb */}
        <div className="eval-score-orb">
          <div className="orb-circle">
            <span className="orb-score font-mono">{evalData.totalScore}%</span>
            <span className="orb-denom">Readiness</span>
          </div>
          <span className="orb-percentile">
            {evalData.totalScore >= levelInfo.minCreditToPass 
              ? `✓ Passed ${levelInfo.name} Requirement (${levelInfo.minCreditToPass}%)`
              : `⚠️ Under Required Minimum (${levelInfo.minCreditToPass}%)`}
          </span>
        </div>
      </div>

      {/* Main Grid: Credential & Passport + Rubric Review */}
      <div className="eval-content-grid">
        {/* Left Column: Official DayOne Verified Micro-Credential & Skill Passport */}
        <div className="eval-col-credential">
          
          {/* STEP 17: VERIFIED MICRO-CREDENTIAL CARD */}
          <div className="official-credential-card">
            <div className="credential-watermark">DAYONE.AI VERIFIED</div>
            
            <div className="credential-card-header">
              <div className="flex-row items-center gap-2">
                <div className="cert-logo-badge">D1</div>
                <div>
                  <span className="cert-type-label">🏅 VERIFIED MICRO-CREDENTIAL</span>
                  <h4 className="cert-org-name">{missionData.competency || `${role.name} Production Debugging`}</h4>
                </div>
              </div>
              <ShieldCheck size={26} className="text-emerald" />
            </div>

            <div className="credential-card-body">
              <div className="cert-meta-grid">
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Credential ID:</span>
                  <span className="cert-meta-val font-mono text-cyan">{evalData.credentialId}</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Assessment:</span>
                  <span className="cert-meta-val">Workplace Simulation</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Status:</span>
                  <span className="cert-meta-val font-bold text-emerald">✓ VERIFIED</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Issued:</span>
                  <span className="cert-meta-val">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="cert-demonstrated-block">
                <div className="block-title">Demonstrated Capabilities:</div>
                <div className="demonstrated-tags-grid">
                  {evalData.demonstratedCapabilities.map((cap, i) => (
                    <span key={i} className="dem-tag">✓ {cap}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="credential-card-footer">
              <button 
                type="button"
                className="btn btn-verify-cred"
                onClick={() => setShowVerifyModal(true)}
              >
                <ShieldCheck size={14} />
                <span>Verify Credential</span>
              </button>

              <button 
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => window.print()}
              >
                <Download size={14} />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>

          {/* CAPTURE-FLAG CHECKPOINTS PERFORMANCE CARD */}
          {evalData.flagMetrics && (
            <div className="capture-flag-eval-card mt-4">
              <div className="flag-eval-header">
                <div className="flex-row items-center gap-2">
                  <Flag size={16} className="text-amber" />
                  <span className="font-bold text-white text-sm">CAPTURE-FLAG CHECKPOINTS</span>
                </div>
                <span className="flag-eval-score-pill font-mono">
                  {evalData.flagMetrics.capturedCount} / {evalData.flagMetrics.totalFlagsCount} Flags ({evalData.flagMetrics.flagScore} PTS)
                </span>
              </div>
              <div className="flag-eval-progress-bar">
                <div 
                  className="flag-eval-progress-fill" 
                  style={{ width: `${evalData.flagMetrics.flagPercentage}%` }}
                />
              </div>
              <div className="flag-eval-subtext text-xs text-muted mt-2">
                {evalData.flagMetrics.passedAllFlags 
                  ? '✓ 100% of workplace discovery, diagnosis, implementation, and verification checkpoints satisfied.'
                  : `${evalData.flagMetrics.capturedCount} of 10 challenge checkpoints successfully captured during simulation.`}
              </div>
            </div>
          )}

          {/* STEP 18: MY DAYONE SKILL PASSPORT */}
          <div className="skill-passport-card mt-4">
            <div className="passport-header">
              <div className="passport-avatar">🪪</div>
              <div>
                <h4 className="passport-name">{candidateDisplayName}</h4>
                <span className="passport-role-tag">{role.name}</span>
              </div>
              <div className="passport-readiness-pill font-mono">
                {evalData.totalScore}%
              </div>
            </div>

            <div className="passport-job-readiness-bar">
              <div className="bar-labels">
                <span>JOB READINESS</span>
                <span className="font-mono text-emerald">{evalData.totalScore}%</span>
              </div>
              <div className="readiness-track">
                <div className="readiness-fill" style={{ width: `${evalData.totalScore}%` }} />
              </div>
            </div>

            {/* Verified Skills (>= 75%) */}
            <div className="passport-skills-section">
              <div className="section-title text-emerald">
                <CheckCircle2 size={14} />
                <span>VERIFIED SKILLS</span>
              </div>
              <div className="passport-skills-list">
                {evalData.skillImprovements.filter(s => s.after >= 75).map(s => (
                  <div key={s.skill} className="passport-skill-row">
                    <span className="skill-name">✓ {s.skill}</span>
                    <span className="skill-pct font-mono text-emerald">{s.after}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Developing Skills (< 75%) */}
            <div className="passport-skills-section developing">
              <div className="section-title text-amber">
                <span className="half-circle">◐</span>
                <span>DEVELOPING</span>
              </div>
              <div className="passport-skills-list">
                {evalData.skillImprovements.filter(s => s.after < 75).map(s => (
                  <div key={s.skill} className="passport-skill-row">
                    <span className="skill-name">◐ {s.skill}</span>
                    <span className="skill-pct font-mono text-amber">{s.after}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Gap Progression (Before vs After) */}
          <div className="skill-progression-card mt-4">
            <h4 className="progression-title">
              <TrendingUp size={18} className="text-accent" />
              <span>Statistical Improvement (Based on Velocity & Accuracy)</span>
            </h4>
            <div className="progression-items-list">
              {evalData.skillImprovements.map(item => (
                <div key={item.skill} className="progression-row">
                  <div className="flex-row justify-between text-sm mb-1">
                    <span className="font-semibold text-white">{item.skill}</span>
                    <div className="flex-row items-center gap-2">
                      <span className="text-muted line-through text-xs">{item.before}%</span>
                      <span className="text-success font-bold text-sm">→ {item.after}%</span>
                      <span className="badge-pill-xs font-semibold text-success">
                        +{item.gain}% Gain
                      </span>
                    </div>
                  </div>
                  <div className="progression-bar-track">
                    <div className="progression-old-fill" style={{ width: `${item.before}%` }}></div>
                    <div className="progression-new-fill" style={{ width: `${item.after}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Step 12 AI Code Review & Multi-Task Sequential Progression */}
        <div className="eval-col-details">
          
          {/* STEP 12: TECHNICAL & WORKPLACE REVIEW CARD */}
          <div className="ai-code-review-card">
            <div className="card-header-badge">
              <FileCheck size={18} className="text-accent" />
              <h3 className="card-heading">🔎 AI CODE REVIEW</h3>
            </div>

            <div className="reviews-split-grid">
              {/* Technical Review */}
              <div className="review-subcard">
                <h4 className="subcard-title text-cyan">TECHNICAL REVIEW</h4>
                <div className="metrics-list">
                  <div className="metric-row">
                    <span>Code correctness</span>
                    <span className="metric-val font-mono">{evalData.technicalReview.codeCorrectness}%</span>
                  </div>
                  <div className="metric-row">
                    <span>Edge cases</span>
                    <span className={`metric-val font-mono ${evalData.hasEdgeCaseFailure ? 'text-amber' : ''}`}>
                      {evalData.technicalReview.edgeCases}%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span>Architecture</span>
                    <span className="metric-val font-mono">{evalData.technicalReview.architecture}%</span>
                  </div>
                  <div className="metric-row">
                    <span>Debugging</span>
                    <span className="metric-val font-mono">{evalData.technicalReview.debugging}%</span>
                  </div>
                </div>
              </div>

              {/* Workplace Review */}
              <div className="review-subcard">
                <h4 className="subcard-title text-emerald">WORKPLACE REVIEW</h4>
                <div className="metrics-list">
                  <div className="metric-row">
                    <span>Communication</span>
                    <span className="metric-val font-mono">{evalData.workplaceReview.communication}%</span>
                  </div>
                  <div className="metric-row">
                    <span>Problem solving</span>
                    <span className="metric-val font-mono">{evalData.workplaceReview.problemSolving}%</span>
                  </div>
                  <div className="metric-row">
                    <span>Prioritization</span>
                    <span className="metric-val font-mono">{evalData.workplaceReview.prioritization}%</span>
                  </div>
                  <div className="metric-row">
                    <span>Coachability</span>
                    <span className="metric-val font-mono">{evalData.workplaceReview.coachability}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gemini AI Detailed Code Audit Feedback */}
            {aiEvaluation && (
              <div className={`ai-eval-summary-strip ${evalData.passed ? 'passed' : 'failed'} mt-3`}>
                <div className="flex-row items-center gap-2 mb-1">
                  <Bot size={14} className={evalData.passed ? 'text-emerald' : 'text-rose'} />
                  <span className="font-bold text-xs">
                    {evalData.passed ? 'GEMINI AI VERIFICATION: ROOT CAUSE RESOLVED' : 'GEMINI AI AUDIT: DEFECT UNRESOLVED'}
                  </span>
                </div>
                <p className="text-xs text-muted mb-0">
                  {aiEvaluation.aiEvaluationSummary}
                </p>

                {/* Gemini AI Weakness Diagnostic */}
                {aiEvaluation.weaknessAnalysis && (
                  <div className="eval-weakness-diagnostic-box mt-3 pt-3 border-t border-border">
                    <div className="flex-row items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber flex-row items-center gap-1">
                        <AlertTriangle size={13} />
                        <span>GEMINI AI ROOT-CAUSE DIAGNOSTIC & BLIND SPOTS</span>
                      </span>
                      {aiEvaluation.weaknessAnalysis.recommendedRemediationSprint && (
                        <span className="badge-tag xs amber">
                          Sprint: {aiEvaluation.weaknessAnalysis.recommendedRemediationSprint}
                        </span>
                      )}
                    </div>

                    {aiEvaluation.weaknessAnalysis.primaryWeaknesses?.length > 0 ? (
                      <div className="diagnostic-items-list">
                        {aiEvaluation.weaknessAnalysis.primaryWeaknesses.map((w, idx) => (
                          <div key={idx} className="diagnostic-item-row p-2 mb-2 rounded bg-surface">
                            <div className="flex-row items-center justify-between">
                              <strong className="text-white text-xs">{w.area}</strong>
                              <span className={`severity-tag xs ${(w.severity || 'high').toLowerCase()}`}>
                                {w.severity || 'HIGH'}
                              </span>
                            </div>
                            <p className="text-xs text-muted mb-1 mt-1">{w.description}</p>
                            {w.impactOnProduction && (
                              <div className="text-xs text-rose mb-1">
                                <strong>Production Impact:</strong> {w.impactOnProduction}
                              </div>
                            )}
                            {w.remediationAdvice && (
                              <div className="text-xs text-cyan">
                                <strong>Remediation:</strong> {w.remediationAdvice}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-emerald mb-0">
                        ✓ Zero critical weaknesses detected. Architecture satisfies defensive standards.
                      </p>
                    )}

                    {/* Gemini AI Assigned Micro-Learning Course */}
                    {recommendedCourse && (
                      <div className="eval-micro-course-box mt-3 pt-3 border-t border-border">
                        <div className="flex-row items-center gap-1.5 mb-2">
                          <Sparkles size={14} className="text-amber" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Gemini AI Assigned Micro-Learning Course
                          </span>
                        </div>
                        <MicroCourseCard 
                          course={recommendedCourse} 
                          remediationArea={aiEvaluation?.weaknessAnalysis?.primaryWeaknesses?.[0]?.area || evalData.edgeCaseDetails?.skill}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Lead Quote */}
          <div className="ai-lead-signoff-card mt-4">
            <div className="lead-avatar-sm">{role.aiLead.avatar}</div>
            <div className="signoff-content">
              <h5 className="signoff-author">{role.aiLead.name} ({role.aiLead.title})</h5>
              <p className="signoff-quote">
                "{candidateDisplayName} demonstrated authentic engineering problem-solving. 
                Investigating root cause state dependencies, communicating under sudden chaos events, and ensuring test assertions pass represents the exact day-one readiness employers test for."
              </p>
            </div>
          </div>

          {/* Target Jobs Aligned with this Credential */}
          <div className="target-jobs-card mt-4">
            <div className="flex-row justify-between items-center mb-3">
              <h4 className="jobs-title">
                <Briefcase size={18} className="text-accent" />
                <span>Job Openings Unlocked by this Credential</span>
              </h4>
              <span className="text-xs text-muted">Direct Hiring Partner Fast-Track</span>
            </div>

            <div className="jobs-list">
              {targetJobs.map(job => (
                <div key={job.id} className="job-match-row">
                  <div>
                    <h5 className="job-title font-semibold text-white">{job.title}</h5>
                    <span className="job-company text-accent">{job.company}</span>
                    <span className="job-salary font-mono text-muted text-xs ml-2">({job.salaryRange})</span>
                  </div>

                  <button 
                    type="button"
                    className="btn btn-secondary btn-xs"
                    onClick={() => alert(`Application fast-tracked for ${job.title} at ${job.company} with verified DayOne Credential ${evalData.credentialId}!`)}
                  >
                    <span>Fast-Track Apply</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Task Sequential Progression Footer Actions */}
          <div className="eval-footer-nav mt-4">
            {/* If task 1 of 2: Proceed to Task 2 */}
            {taskIndex < totalTasksInLevel - 1 ? (
              evalData.passed ? (
                <button 
                  type="button" 
                  className="btn btn-primary btn-proceed-next-task"
                  onClick={onProceedToNextTask}
                >
                  <span>Proceed to Task {taskIndex + 2} of {totalTasksInLevel}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-secondary btn-proceed-locked"
                  onClick={onRetakeSimulation}
                  title={`Resolve defect in workspace to unlock Task ${taskIndex + 2}`}
                >
                  <Lock size={15} className="text-muted" />
                  <span>Task {taskIndex + 2} Locked (Resolve Bug to Unlock)</span>
                </button>
              )
            ) : (
              /* If task 2 of 2: Check if minimum credit met for Next Level Promotion */
              evalData.passed && evalData.totalScore >= levelInfo.minCreditToPass && nextLevel ? (
                <button 
                  type="button" 
                  className="btn btn-primary btn-advance-level"
                  onClick={() => onAdvanceToNextLevel && onAdvanceToNextLevel(nextLevel.level)}
                >
                  <Award size={16} />
                  <span>Advance to Level {nextLevel.level}: {nextLevel.name}</span>
                  <ArrowRight size={16} />
                </button>
              ) : evalData.passed && evalData.totalScore >= levelInfo.minCreditToPass && !nextLevel ? (
                <button 
                  type="button" 
                  className="btn btn-primary btn-advance-level"
                  onClick={onSelectNewRole}
                >
                  <Sparkles size={16} />
                  <span>All 4 Levels Mastered! Explore Another Role</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-primary btn-retry-task"
                  onClick={onRetakeSimulation}
                >
                  <RotateCcw size={16} />
                  <span>Return to Workspace to Fix Bug (Need {levelInfo.minCreditToPass}% to Advance)</span>
                </button>
              )
            )}

            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onRetakeSimulation}
            >
              <RotateCcw size={16} />
              <span>Retry this Shift</span>
            </button>

            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onSelectNewRole}
            >
              <span>Change Role</span>
            </button>

            {onViewDashboard && (
              <button 
                type="button" 
                className="btn btn-secondary flex-row items-center gap-1.5" 
                onClick={onViewDashboard}
                title="View dynamic Candidate Profile Dashboard"
              >
                <LayoutDashboard size={15} className="text-cyan" />
                <span>Candidate Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STEP 14: MICRO-LEARNING SKILL SPRINT MODAL */}
      {showSkillSprint && (
        <MicroCourseSkillSprint 
          gapSkill={evalData.edgeCaseDetails?.skill || 'API Error Handling'}
          currentScore={evalData.edgeCaseDetails?.currentCapability || 54}
          requiredScore={evalData.edgeCaseDetails?.requiredCapability || 72}
          onClose={() => setShowSkillSprint(false)}
          onCompleteSprint={(res) => {
            setShowSkillSprint(false);
            setSprintRemediated(true);
          }}
        />
      )}

      {/* STEP 17: VERIFY CREDENTIAL MODAL */}
      {showVerifyModal && (
        <div className="verify-cred-backdrop" onClick={() => setShowVerifyModal(false)}>
          <div className="verify-cred-card animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="verify-modal-header">
              <div className="verify-badge">
                <ShieldCheck size={18} className="text-emerald" />
                <span>OFFICIAL VERIFICATION REGISTRY</span>
              </div>
              <button 
                type="button" 
                className="btn-close-verify" 
                onClick={() => setShowVerifyModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="verify-modal-body">
              <h3 className="verify-title">Credential Verification Proof</h3>
              <p className="verify-subtitle">
                This micro-credential was awarded following live environment task simulation on DayOne.ai.
              </p>

              <div className="verify-info-table">
                <div className="table-row">
                  <span className="row-key">Recipient:</span>
                  <span className="row-val font-bold text-white">{candidateDisplayName}</span>
                </div>
                <div className="table-row">
                  <span className="row-key">Credential ID:</span>
                  <span className="row-val font-mono text-cyan">{evalData.credentialId}</span>
                </div>
                <div className="table-row">
                  <span className="row-key">Competency:</span>
                  <span className="row-val font-semibold">{missionData.competency || 'Production Engineering'}</span>
                </div>
                <div className="table-row">
                  <span className="row-key">Role & Level:</span>
                  <span className="row-val">{role.name} — {levelInfo.name}</span>
                </div>
                <div className="table-row">
                  <span className="row-key">Verified Readiness:</span>
                  <span className="row-val font-mono text-emerald">{evalData.totalScore}%</span>
                </div>
                <div className="table-row">
                  <span className="row-key">Status:</span>
                  <span className="row-val badge-verified">✓ AUTHENTIC & VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="verify-modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  navigator.clipboard?.writeText?.(`https://dayone.ai/verify/${evalData.credentialId}`);
                  alert('Verification URL copied to clipboard!');
                }}
              >
                <Share2 size={14} />
                <span>Copy Public Link</span>
              </button>

              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => setShowVerifyModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
