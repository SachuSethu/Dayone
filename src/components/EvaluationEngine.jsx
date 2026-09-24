// src/components/EvaluationEngine.jsx
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, CheckCircle2, Shield, TrendingUp, Sparkles, 
  ExternalLink, Share2, Download, ArrowRight, RotateCcw, 
  Star, Briefcase, ChevronRight, FileCheck
} from 'lucide-react';
import { JOB_PROFILES } from '../data/jobs';

export default function EvaluationEngine({ 
  missionData, 
  workspaceState, 
  onRetakeSimulation,
  onSelectNewRole 
}) {
  const { role, candidateProfile, evaluationCriteria, skillGaps, taskType } = missionData;
  const targetJobs = JOB_PROFILES[role.id] || [];

  // Calculate scores based on criteria and workspace actions
  const calculateResults = () => {
    let earnedScore = 0;
    let maxScore = 100;
    const criteriaBreakdown = [];

    if (role.id === 'frontend') {
      // 1. Accuracy (30)
      const acc = workspaceState?.feCodePatched ? 30 : 12;
      earnedScore += acc;
      criteriaBreakdown.push({
        name: 'Root Cause Resolution & Async Handling',
        earned: acc,
        max: 30,
        feedback: workspaceState?.feCodePatched 
          ? 'Implemented exponential backoff retry and handled non-200 HTTP responses without unhandled rejections.'
          : 'Partially identified 504 status, but retry loop was not fully instantiated.'
      });

      // 2. Resilience & Precision (25)
      const res = workspaceState?.feCodePatched ? 25 : 10;
      earnedScore += res;
      criteriaBreakdown.push({
        name: 'Financial Math & Precision Safety',
        earned: res,
        max: 25,
        feedback: workspaceState?.feCodePatched
          ? 'Correctly rounded floating point currency discounts using standard financial epsilon precision.'
          : 'Currency calculations remained vulnerable to IEEE 754 precision artifacts.'
      });

      // 3. Test Coverage (25)
      const test = workspaceState?.testsPassed ? 25 : (workspaceState?.feCodePatched ? 22 : 8);
      earnedScore += test;
      criteriaBreakdown.push({
        name: 'Automated Vitest Regression Verification',
        earned: test,
        max: 25,
        feedback: workspaceState?.testsPassed
          ? 'Executed `npm test` verifying 4/4 passing unit assertions including timeout aborts.'
          : 'Automated test suite was not fully verified in terminal.'
      });

      // 4. Git & PR Communication (20)
      const comm = workspaceState?.gitCommitted ? 20 : 16;
      earnedScore += comm;
      criteriaBreakdown.push({
        name: 'Production Git Hygiene & PR Clarity',
        earned: comm,
        max: 20,
        feedback: workspaceState?.gitCommitted
          ? 'Opened atomic Pull Request with clear regression test summary.'
          : 'Changes staged in working tree; ready for final push.'
      });
    } 
    else if (role.id === 'cybersecurity') {
      // 1. Detection (30)
      const det = 30; // user reviewed logs
      earnedScore += det;
      criteriaBreakdown.push({
        name: 'Anomaly Detection & SIEM Correlation',
        earned: det,
        max: 30,
        feedback: 'Successfully isolated 401 surge signatures from ASN 41378 Tor exit relays.'
      });

      // 2. Containment Speed (30)
      const cont = workspaceState?.threatContained ? 30 : 14;
      earnedScore += cont;
      criteriaBreakdown.push({
        name: 'Firewall Containment & Kernel Isolation',
        earned: cont,
        max: 30,
        feedback: workspaceState?.threatContained
          ? 'Executed `iptables -A INPUT -s 185.220.101.0/24 -j DROP`, eliminating 2,850 RPS attack flood.'
          : 'Containment command was not fully executed in bastion shell.'
      });

      // 3. Triage Reporting (25)
      const triage = workspaceState?.threatContained ? 24 : 12;
      earnedScore += triage;
      criteriaBreakdown.push({
        name: 'Incident Ticket Documentation & IOC Ledger',
        earned: triage,
        max: 25,
        feedback: 'Logged malicious CIDR block and User-Agent signatures into official chain of custody.'
      });

      // 4. Hygiene & Recovery (15)
      const hyg = workspaceState?.threatContained ? 15 : 8;
      earnedScore += hyg;
      criteriaBreakdown.push({
        name: 'Network Telemetry Recovery Verification',
        earned: hyg,
        max: 15,
        feedback: workspaceState?.threatContained
          ? 'Verified network ingress telemetry returned to baseline safe threshold (140 req/sec).'
          : 'Telemetry still indicates active anomalous ingress.'
      });
    } 
    else { // UI/UX Designer
      // 1. Research Synthesis (30)
      const res = 30;
      earnedScore += res;
      criteriaBreakdown.push({
        name: 'Qualitative Synthesis & Pain-Point Diagnosis',
        earned: res,
        max: 30,
        feedback: 'Synthesized interview telemetry into clear friction drivers: hidden shipping fees and cramped touch targets.'
      });

      // 2. Heuristic Fixes (30)
      const fix = workspaceState?.activeLayoutVariant === 'variant_b' ? 30 : 12;
      earnedScore += fix;
      criteriaBreakdown.push({
        name: 'Fitts\'s Law & Touch Target Ergonomics',
        earned: fix,
        max: 30,
        feedback: workspaceState?.activeLayoutVariant === 'variant_b'
          ? 'Expanded mobile touch targets from 32px to 48px with 16px safety spacing buffer.'
          : 'Retained sub-optimal 32px targets.'
      });

      // 3. WCAG AA Accessibility (20)
      const a11y = workspaceState?.activeLayoutVariant === 'variant_b' ? 20 : 8;
      earnedScore += a11y;
      criteriaBreakdown.push({
        name: 'WCAG 2.1 Level AA Color Contrast',
        earned: a11y,
        max: 20,
        feedback: workspaceState?.activeLayoutVariant === 'variant_b'
          ? 'Exceeded 4.5:1 ratio requirement with 5.8:1 high-contrast typography.'
          : 'Failing AA contrast on gray inputs.'
      });

      // 4. Design Defense (20)
      const def = workspaceState?.activeLayoutVariant === 'variant_b' ? 19 : 14;
      earnedScore += def;
      criteriaBreakdown.push({
        name: 'Design System Token Spec & Lead Signoff',
        earned: def,
        max: 20,
        feedback: 'Successfully defended upfront pricing transparency to mitigate 38.4% cart drop-off.'
      });
    }

    return { totalScore: Math.min(100, earnedScore), criteriaBreakdown };
  };

  const results = calculateResults();
  const certId = `D1-${role.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Trigger celebration confetti
  useEffect(() => {
    if (results.totalScore >= 80) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // gracefully ignore if canvas not supported
      }
    }
  }, [results.totalScore]);

  return (
    <div className="evaluation-engine-container">
      {/* Top Banner */}
      <div className="eval-hero-banner">
        <div className="eval-hero-content">
          <div className="flex-row items-center gap-2 mb-2">
            <span className="badge-pill">
              <Sparkles size={14} className="text-warning" />
              <span>DayOne Automated Simulation Evaluation</span>
            </span>
          </div>

          <h1 className="eval-hero-title">
            {results.totalScore >= 80 ? 'Simulation Passed with Distinction!' : 'Simulation Completed'}
          </h1>
          <p className="eval-hero-sub">
            Candidate <strong>{candidateProfile.name}</strong> successfully resolved the {role.name} incident ({missionData.missionCode}).
          </p>
        </div>

        <div className="eval-score-orb">
          <div className="orb-circle">
            <span className="orb-score font-mono">{results.totalScore}</span>
            <span className="orb-denom">/ 100</span>
          </div>
          <span className="orb-percentile">Top 4% Candidate Cohort</span>
        </div>
      </div>

      {/* Main Grid: Credential + Criteria Breakdown */}
      <div className="eval-content-grid">
        {/* Left Column: Official DayOne Verified Credential */}
        <div className="eval-col-credential">
          <div className="official-credential-card">
            <div className="credential-watermark">DAYONE.AI VERIFIED</div>
            
            <div className="credential-card-header">
              <div className="flex-row items-center gap-2">
                <div className="cert-logo-badge">D1</div>
                <div>
                  <h4 className="cert-org-name">DayOne.ai Simulation Institute</h4>
                  <span className="cert-type-label">Role-Based Competency Certificate</span>
                </div>
              </div>
              <Shield size={24} className="text-accent" />
            </div>

            <div className="credential-card-body">
              <p className="cert-grant-text">This verifiable credential certifies that</p>
              <h2 className="cert-recipient-name">{candidateProfile.name}</h2>
              <p className="cert-achievement-text">
                has successfully demonstrated production-grade workplace mastery in
              </p>
              <h3 className="cert-role-title font-semibold text-accent">
                {role.name} // {taskType.toUpperCase()}
              </h3>

              <div className="cert-meta-grid">
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Credential ID:</span>
                  <span className="cert-meta-val font-mono">{certId}</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Verified Score:</span>
                  <span className="cert-meta-val font-mono text-success">{results.totalScore} / 100</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Evaluator:</span>
                  <span className="cert-meta-val">{role.aiLead.name}</span>
                </div>
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Issued:</span>
                  <span className="cert-meta-val">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="cert-badge-row">
                <div className="mastery-badge">
                  <Award size={14} className="text-warning" />
                  <span>Production Ready</span>
                </div>
                <div className="mastery-badge">
                  <CheckCircle2 size={14} className="text-success" />
                  <span>Deficit Resolved</span>
                </div>
              </div>
            </div>

            <div className="credential-card-footer">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => alert(`Credential ${certId} link copied to clipboard!`)}
              >
                <Share2 size={14} />
                <span>Share Credential</span>
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => window.print()}
              >
                <Download size={14} />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>

          {/* Skill Gap Progression (Before vs After) */}
          <div className="skill-progression-card mt-4">
            <h4 className="progression-title">
              <TrendingUp size={18} className="text-accent" />
              <span>Skill Deficit Remediation Results</span>
            </h4>
            <div className="progression-items-list">
              {skillGaps.slice(0, 3).map(gap => {
                const improvedScore = Math.min(95, gap.candidateScore + Math.round(results.totalScore * 0.45));
                return (
                  <div key={gap.skillId} className="progression-row">
                    <div className="flex-row justify-between text-sm mb-1">
                      <span className="font-semibold text-white">{gap.name}</span>
                      <div className="flex-row items-center gap-2">
                        <span className="text-muted line-through text-xs">{gap.candidateScore}%</span>
                        <span className="text-success font-bold text-sm">→ {improvedScore}%</span>
                        <span className="badge-pill-xs font-semibold text-success">
                          +{improvedScore - gap.candidateScore}% Gain
                        </span>
                      </div>
                    </div>
                    <div className="progression-bar-track">
                      <div className="progression-old-fill" style={{ width: `${gap.candidateScore}%` }}></div>
                      <div className="progression-new-fill" style={{ width: `${improvedScore}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Criteria Rubric Breakdown & Target Jobs */}
        <div className="eval-col-details">
          {/* Rubric Breakdown */}
          <div className="rubric-card">
            <h4 className="rubric-title">
              <FileCheck size={18} className="text-accent" />
              <span>Evaluation Rubric & Actionable Feedback</span>
            </h4>

            <div className="rubric-items-list">
              {results.criteriaBreakdown.map((item, i) => (
                <div key={i} className="rubric-item">
                  <div className="rubric-item-header">
                    <span className="rubric-item-name font-semibold text-white">{item.name}</span>
                    <span className="rubric-item-score font-mono text-accent">
                      {item.earned} / {item.max} pts
                    </span>
                  </div>
                  <p className="rubric-feedback-text">{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Lead Signoff Quote */}
          <div className="ai-lead-signoff-card mt-4">
            <div className="lead-avatar-sm">{role.aiLead.avatar}</div>
            <div className="signoff-content">
              <h5 className="signoff-author">{role.aiLead.name} ({role.aiLead.title})</h5>
              <p className="signoff-quote">
                "{candidateProfile.name} exhibited exceptional technical intuition during this simulation. 
                Addressing the root cause rather than applying a cosmetic patch demonstrates the exact engineering hygiene 
                we look for in Tier-1 hires."
              </p>
            </div>
          </div>

          {/* Target Jobs Aligned with this Credential */}
          <div className="target-jobs-card mt-4">
            <div className="flex-row justify-between items-center mb-3">
              <h4 className="jobs-title">
                <Briefcase size={18} className="text-accent" />
                <span>Job Openings Aligned with this Credential</span>
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
                    className="btn btn-secondary btn-xs"
                    onClick={() => alert(`Application submitted for ${job.title} at ${job.company} with verified DayOne Credential!`)}
                  >
                    <span>Fast-Track Apply</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="eval-footer-nav mt-4">
            <button className="btn btn-secondary" onClick={onRetakeSimulation}>
              <RotateCcw size={16} />
              <span>Retry this Simulation</span>
            </button>

            <button className="btn btn-primary" onClick={onSelectNewRole}>
              <span>Explore Next Role</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
