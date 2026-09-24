// src/components/MicroCourseSkillSprint.jsx
// Step 14 Micro-Learning Sprint: 7-minute targeted gap remediation.
// 01 - Understand | 02 - Inspect | 03 - Fix | 04 - Challenge
// Gives instant skill improvement (54% -> 71%) and sends candidate back to shift (Step 15).

import React, { useState } from 'react';
import { 
  BookOpen, Search, Wrench, Trophy, CheckCircle2, 
  ArrowRight, RotateCcw, AlertTriangle, ShieldCheck, 
  Zap, Code, Terminal, Clock, Sparkles, X
} from 'lucide-react';

export default function MicroCourseSkillSprint({
  gapSkill = 'API Error Handling',
  currentScore = 54,
  requiredScore = 72,
  onCompleteSprint,
  onClose
}) {
  const [activeStep, setActiveStep] = useState(1); // 1: Understand, 2: Inspect, 3: Fix, 4: Challenge, 5: Complete
  const [inspectedFound, setInspectedFound] = useState(false);
  const [fixApplied, setFixApplied] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  const improvedScore = 71;

  const handleInspectClick = () => {
    setInspectedFound(true);
  };

  const handleApplyFix = () => {
    setFixApplied(true);
  };

  const handleChallengeSubmit = (option) => {
    setChallengeAnswer(option);
    setChallengeSubmitted(true);
  };

  const handleFinish = () => {
    if (onCompleteSprint) {
      onCompleteSprint({
        skill: gapSkill,
        improvedScore,
        remediated: true
      });
    }
  };

  return (
    <div className="sprint-modal-backdrop">
      <div className="sprint-modal-card animate-scale-in">
        {/* Sprint Header */}
        <div className="sprint-header">
          <div className="sprint-header-top">
            <div className="sprint-badge">
              <Zap size={13} className="text-amber" />
              <span>7-MINUTE TARGETED SKILL SPRINT</span>
            </div>
            <button className="btn-close-sprint" onClick={onClose} title="Close Sprint">
              <X size={18} />
            </button>
          </div>

          <div className="sprint-title-row">
            <div>
              <h2 className="sprint-title">{gapSkill}</h2>
              <p className="sprint-subtitle">
                Master production edge-case handling when services return empty or malformed payloads.
              </p>
            </div>

            <div className="sprint-score-pill">
              <span className="score-current">{currentScore}%</span>
              <span className="score-arrow">→</span>
              <span className="score-target text-emerald">{activeStep === 5 ? `${improvedScore}%` : `${requiredScore}%`}</span>
              <span className="score-label">Required</span>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="sprint-stepper">
            <button 
              className={`sprint-step-tab ${activeStep === 1 ? 'active' : (activeStep > 1 ? 'done' : '')}`}
              onClick={() => setActiveStep(1)}
            >
              <span className="step-idx">01</span>
              <span>Understand</span>
            </button>
            <button 
              className={`sprint-step-tab ${activeStep === 2 ? 'active' : (activeStep > 2 ? 'done' : '')}`}
              onClick={() => setActiveStep(2)}
            >
              <span className="step-idx">02</span>
              <span>Inspect</span>
            </button>
            <button 
              className={`sprint-step-tab ${activeStep === 3 ? 'active' : (activeStep > 3 ? 'done' : '')}`}
              onClick={() => setActiveStep(3)}
            >
              <span className="step-idx">03</span>
              <span>Fix</span>
            </button>
            <button 
              className={`sprint-step-tab ${activeStep === 4 ? 'active' : (activeStep > 4 ? 'done' : '')}`}
              onClick={() => setActiveStep(4)}
            >
              <span className="step-idx">04</span>
              <span>Challenge</span>
            </button>
          </div>
        </div>

        {/* Sprint Body Content */}
        <div className="sprint-body">
          {/* STEP 1: UNDERSTAND */}
          {activeStep === 1 && (
            <div className="sprint-content-step animate-fade-in">
              <div className="step-lead">
                <BookOpen size={20} className="text-cyan flex-shrink-0" />
                <div>
                  <h3>Why Empty API Payloads Crash Production</h3>
                  <p>2-minute architectural explanation</p>
                </div>
              </div>

              <div className="explanation-card">
                <p>
                  In high-throughput distributed systems, a payment gateway or microservice can resolve with 
                  <code>200 OK</code>, but contain an empty body (<code>{}</code> or <code>null</code>) due to database read timeouts or downstream circuit breaker trips.
                </p>
                <div className="anti-pattern-box">
                  <div className="box-title text-rose">❌ The Vulnerable Pattern:</div>
                  <pre>
{`const response = await fetch('/api/pay');
const data = await response.json();
// If data.transactions is undefined, this throws TypeError: Cannot read properties of undefined
return data.transactions.map(t => t.id);`}
                  </pre>
                </div>
                <div className="resilient-pattern-box">
                  <div className="box-title text-emerald">✓ The Resilient Defense:</div>
                  <pre>
{`const response = await fetch('/api/pay');
if (!response.ok) throw new HttpError(response.status);
const data = await response.json();
// Defensive null-coalescing + optional chaining guarantees zero crash:
return (data?.transactions ?? []).map(t => t.id);`}
                  </pre>
                </div>
              </div>

              <div className="sprint-action-bar">
                <span className="time-note"><Clock size={13} /> 2 mins reading time</span>
                <button className="btn-sprint-next" onClick={() => setActiveStep(2)}>
                  <span>Proceed to 02 — Inspect</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INSPECT */}
          {activeStep === 2 && (
            <div className="sprint-content-step animate-fade-in">
              <div className="step-lead">
                <Search size={20} className="text-amber flex-shrink-0" />
                <div>
                  <h3>Inspect & Locate the Vulnerability</h3>
                  <p>Click on the vulnerable line that causes the empty payment crash</p>
                </div>
              </div>

              <div className="interactive-code-inspector">
                <div className="code-inspector-header">
                  <span>src/services/paymentHandler.js</span>
                  <span className="hint-pill">Click the line missing null-checks</span>
                </div>
                <div className="code-lines-container">
                  <div className="code-line">
                    <span className="ln">1</span>
                    <span className="lc">export async function processPaymentResponse(res) &#123;</span>
                  </div>
                  <div className="code-line">
                    <span className="ln">2</span>
                    <span className="lc">&nbsp;&nbsp;const payload = await res.json();</span>
                  </div>
                  <div 
                    className={`code-line clickable-bug ${inspectedFound ? 'identified' : ''}`}
                    onClick={handleInspectClick}
                  >
                    <span className="ln">3</span>
                    <span className="lc">&nbsp;&nbsp;const receiptId = payload.receipt.id; // &lt;-- Click here</span>
                    {inspectedFound && <span className="bug-flag">⚠️ Crash: Uncaught TypeError on empty receipt</span>}
                  </div>
                  <div className="code-line">
                    <span className="ln">4</span>
                    <span className="lc">&nbsp;&nbsp;return &#123; success: true, receiptId &#125;;</span>
                  </div>
                  <div className="code-line">
                    <span className="ln">5</span>
                    <span className="lc">&#125;</span>
                  </div>
                </div>
              </div>

              {inspectedFound && (
                <div className="feedback-banner success animate-fade-in">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>
                    <strong>Spot on!</strong> Line 3 directly dereferences <code>payload.receipt.id</code>. 
                    When the API returns <code>&#123;&#125;</code>, <code>payload.receipt</code> is <code>undefined</code>, causing a fatal runtime exception.
                  </span>
                </div>
              )}

              <div className="sprint-action-bar">
                <button className="btn-sprint-back" onClick={() => setActiveStep(1)}>Back</button>
                <button 
                  className="btn-sprint-next" 
                  disabled={!inspectedFound}
                  onClick={() => setActiveStep(3)}
                >
                  <span>Proceed to 03 — Fix</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: FIX */}
          {activeStep === 3 && (
            <div className="sprint-content-step animate-fade-in">
              <div className="step-lead">
                <Wrench size={20} className="text-indigo flex-shrink-0" />
                <div>
                  <h3>Apply Production-Grade Defensive Fix</h3>
                  <p>Implement optional chaining and fallback receipt ID</p>
                </div>
              </div>

              <div className="fix-editor-card">
                <div className="fix-editor-header">
                  <span>Interactive Patch Sandbox</span>
                  <button 
                    type="button" 
                    className="btn-apply-patch" 
                    onClick={handleApplyFix}
                  >
                    {fixApplied ? '✓ Patch Applied' : 'Inject Resilient Fix'}
                  </button>
                </div>
                <pre className="patch-code-view">
{fixApplied ? (
`// PATCH APPLIED:
export async function processPaymentResponse(res) {
  const payload = (await res.json()) || {};
  // Safely fallback when receipt or id is absent:
  const receiptId = payload?.receipt?.id ?? 'RCPT-PENDING-SYNC';
  return { success: Boolean(payload?.status === 'ok'), receiptId };
}`
) : (
`// UNPATCHED CODE:
export async function processPaymentResponse(res) {
  const payload = await res.json();
  const receiptId = payload.receipt.id;
  return { success: true, receiptId };
}`
)}
                </pre>
              </div>

              {fixApplied && (
                <div className="terminal-test-simulation animate-fade-in">
                  <div className="terminal-test-header">
                    <Terminal size={13} />
                    <span>Unit Test Runner</span>
                  </div>
                  <div className="terminal-test-logs">
                    <p className="text-emerald">PASS src/__tests__/paymentHandler.test.js</p>
                    <p className="text-muted">✓ handles normal 200 payload with receipt</p>
                    <p className="text-emerald font-bold">✓ handles empty payload {`{}`} gracefully with fallback ID</p>
                    <p className="text-muted">Test Suites: 1 passed, 1 total | Tests: 2 passed, 2 total</p>
                  </div>
                </div>
              )}

              <div className="sprint-action-bar">
                <button className="btn-sprint-back" onClick={() => setActiveStep(2)}>Back</button>
                <button 
                  className="btn-sprint-next" 
                  disabled={!fixApplied}
                  onClick={() => setActiveStep(4)}
                >
                  <span>Proceed to 04 — Challenge</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CHALLENGE */}
          {activeStep === 4 && (
            <div className="sprint-content-step animate-fade-in">
              <div className="step-lead">
                <Trophy size={20} className="text-amber flex-shrink-0" />
                <div>
                  <h3>Production Edge-Case Challenge</h3>
                  <p>Which implementation best handles both network timeout and corrupted JSON?</p>
                </div>
              </div>

              <div className="challenge-options-grid">
                {[
                  {
                    id: 'A',
                    text: 'try { const d = await res.json(); return d?.data ?? []; } catch (e) { logError(e); return []; }',
                    isCorrect: true,
                    rationale: 'Wraps JSON deserialization in try/catch to absorb malformed bodies, and uses null-coalescing for undefined data.'
                  },
                  {
                    id: 'B',
                    text: 'const d = await res.json(); return d.data.filter(Boolean);',
                    isCorrect: false,
                    rationale: 'Fails if response body is unparseable or data is undefined.'
                  },
                  {
                    id: 'C',
                    text: 'if (res.status === 200) return res.data;',
                    isCorrect: false,
                    rationale: 'Standard fetch response object has no .data property directly before calling .json().'
                  }
                ].map(opt => (
                  <div 
                    key={opt.id} 
                    className={`challenge-option-card ${challengeAnswer === opt.id ? (opt.isCorrect ? 'correct' : 'incorrect') : ''}`}
                    onClick={() => handleChallengeSubmit(opt.id)}
                  >
                    <div className="opt-header">
                      <span className="opt-letter">{opt.id}</span>
                      {challengeSubmitted && challengeAnswer === opt.id && (
                        <span className={`opt-verdict ${opt.isCorrect ? 'text-emerald' : 'text-rose'}`}>
                          {opt.isCorrect ? '✓ Correct Answer' : '✕ Incomplete Defense'}
                        </span>
                      )}
                    </div>
                    <pre className="opt-code">{opt.text}</pre>
                    {challengeSubmitted && challengeAnswer === opt.id && (
                      <p className="opt-rationale">{opt.rationale}</p>
                    )}
                  </div>
                ))}
              </div>

              {challengeSubmitted && challengeAnswer === 'A' && (
                <div className="sprint-success-card animate-fade-in">
                  <div className="success-icon-box">
                    <Sparkles size={28} className="text-amber" />
                  </div>
                  <div>
                    <h4 className="success-headline">Skill Improved: {currentScore}% → {improvedScore}%!</h4>
                    <p className="success-sub">
                      You've mastered resilient API error boundaries. Your profile is ready for production re-submission.
                    </p>
                  </div>
                </div>
              )}

              <div className="sprint-action-bar">
                <button className="btn-sprint-back" onClick={() => setActiveStep(3)}>Back</button>
                {challengeSubmitted && challengeAnswer === 'A' && (
                  <button className="btn-sprint-finish" onClick={handleFinish}>
                    <RotateCcw size={16} />
                    <span>Try the Shift Again</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
