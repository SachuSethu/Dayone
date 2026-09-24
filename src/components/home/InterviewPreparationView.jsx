// src/components/home/InterviewPreparationView.jsx
// DayOne.ai AI-Powered Final Interview & Evaluation System v1.0.0
// Adaptive questioning across Theoretical, Analytical, Practical, and Problem Solving.
// Evaluates candidate responses against rubric criteria and generates the Dual-Gate Diagnostic Report.

import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Sparkles, CheckCircle2, AlertTriangle, Shield, 
  HelpCircle, ChevronRight, ChevronLeft, Award, RefreshCw, 
  Send, Brain, FileText, Check, AlertOctagon, TrendingUp, 
  Code2, Eye, BookOpen 
} from 'lucide-react';
import { 
  INTERVIEW_SYSTEM_CONFIG, 
  getQuestionsForRole, 
  evaluateAnswerWithRubric, 
  generateFinalAssessmentReport 
} from '../../data/interviewPreparationData';
import './home.css';

const SECTION_BADGES = {
  theoretical: { label: 'Theoretical (20 Marks)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  analytical: { label: 'Analytical (20 Marks)', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)' },
  practical: { label: 'Practical (30 Marks)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
  problemSolving: { label: 'Problem Solving (30 Marks)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' }
};

export default function InterviewPreparationView({ 
  onBack,
  currentUser = null,
  initialRole = 'frontend-developer'
}) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentText, setCurrentText] = useState('');
  const [evaluations, setEvaluations] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalReport, setFinalReport] = useState(null);

  // Load questions for selected role
  const questions = useMemo(() => {
    return getQuestionsForRole(selectedRole);
  }, [selectedRole]);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Sync currentText when question changes
  const handleSelectQuestion = (index) => {
    setCurrentQuestionIndex(index);
    const qId = questions[index]?.id;
    setCurrentText(userAnswers[qId] || '');
  };

  // Switch role & reset state
  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setEvaluations({});
    setCurrentText('');
    setFinalReport(null);
  };

  // Quick fill sample answer for instant testing
  const handleUseSampleAnswer = () => {
    if (currentQ?.sampleAnswer) {
      setCurrentText(currentQ.sampleAnswer);
    }
  };

  // Evaluate current question
  const handleEvaluateCurrentAnswer = () => {
    if (!currentText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const evalResult = evaluateAnswerWithRubric(currentQ, currentText);
      
      setUserAnswers(prev => ({ ...prev, [currentQ.id]: currentText }));
      setEvaluations(prev => ({ ...prev, [currentQ.id]: evalResult }));
      setIsSubmitting(false);
    }, 450);
  };

  // Generate complete final assessment report
  const handleGenerateFinalReport = () => {
    // Fill any unanswered questions with blank or default evaluations
    const answersList = questions.map(q => {
      const text = userAnswers[q.id] || q.sampleAnswer || "";
      const evaluation = evaluations[q.id] || evaluateAnswerWithRubric(q, text);
      return {
        question: q,
        answerText: text,
        evaluation
      };
    });

    const report = generateFinalAssessmentReport({
      candidateId: currentUser?.name ? `usr-${currentUser.name.toLowerCase().replace(/\s+/g, '-')}` : "usr-fe-88291",
      roleId: selectedRole,
      trainingScore: 62, // Base workplace training performance
      userAnswers: answersList
    });

    setFinalReport(report);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentEval = evaluations[currentQ?.id];

  return (
    <div className="home-root" style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Navbar */}
      <header className="home-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            type="button" 
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Hub</span>
          </button>

          <div className="home-brand-wrap" onClick={onBack} style={{ cursor: 'pointer' }}>
            <div className="home-brand-logo">D</div>
            <span className="home-brand-title">DAYONE<span>.AI</span></span>
            <span className="home-brand-badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
              INTERVIEW PREP
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Progress: <strong style={{ color: '#fff' }}>{answeredCount} / {questions.length} Questions Evaluated</strong>
          </div>
          <button
            type="button"
            className="home-nav-item active"
            onClick={handleGenerateFinalReport}
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              color: '#fff',
              border: 'none',
              padding: '0.45rem 0.9rem',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <Sparkles size={14} /> Generate Assessment Report
          </button>
        </div>
      </header>

      <div className="home-container" style={{ maxWidth: '1280px' }}>
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(29, 17, 43, 0.85) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '18px',
          padding: '2.2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="home-hero-pill" style={{ margin: 0, background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                <Brain size={12} /> Adaptive AI Evaluation Engine
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 0.5rem 0' }}>
              AI Interview Preparation & Skill Diagnostics
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', margin: 0, maxWidth: '680px', lineHeight: 1.5 }}>
              10 Adaptive Questions divided into 4 Rubric Sections: Theoretical (20), Analytical (20), Practical (30), and Problem Solving (30). Dual-Gate weighting formula: <code>(TrainingScore * 0.4) + (InterviewScore * 0.6)</code>.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.4)', padding: '0.35rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { id: 'frontend-developer', label: 'Frontend Dev' },
              { id: 'cybersecurity-analyst', label: 'Cybersecurity' },
              { id: 'ui-ux-designer', label: 'UI/UX Design' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id)}
                style={{
                  background: selectedRole === r.id ? 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)' : 'transparent',
                  color: selectedRole === r.id ? '#fff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.55rem 0.95rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* If Final Report is Generated, show the Diagnostic Report */}
        {finalReport ? (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Dual-Gate Job Readiness & Skill Improvement Report
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                  Candidate: <strong style={{ color: '#fff' }}>{finalReport.candidateId}</strong> • Formula Applied: <code style={{ color: '#c084fc' }}>{finalReport.overallJobReadiness.formulaApplied}</code>
                </p>
              </div>

              <button
                type="button"
                className="home-nav-item"
                onClick={() => setFinalReport(null)}
                style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '8px' }}
              >
                <RefreshCw size={14} /> Review / Edit Answers
              </button>
            </div>

            {/* Top Score Banner */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem'
            }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '14px', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 700 }}>
                  Calculated Readiness
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', margin: '0.3rem 0' }}>
                  {finalReport.overallJobReadiness.calculatedReadinessScore}%
                </div>
                <span style={{ 
                  fontSize: '0.78rem', 
                  color: finalReport.overallJobReadiness.calculatedReadinessScore >= 70 ? '#34d399' : '#fbbf24', 
                  fontWeight: 700 
                }}>
                  {finalReport.overallJobReadiness.readinessStatus}
                </span>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Interview Score (60%)
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#c084fc', margin: '0.3rem 0' }}>
                  {finalReport.finalInterviewResults.totalInterviewScore} / 100
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Weight applied: 0.60
                </span>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Workplace Training (40%)
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#38bdf8', margin: '0.3rem 0' }}>
                  {finalReport.trainingPerformance.overallScore}%
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Weight applied: 0.40
                </span>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Recommended Action
                </span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>
                  {finalReport.actionPlan.nextStep}
                </div>
                <span style={{ fontSize: '0.78rem', color: '#10b981' }}>
                  {finalReport.actionPlan.assignedRetrainingTasks.length} Assigned Tasks
                </span>
              </div>
            </div>

            {/* 4 Section Scores */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--home-border)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: '0 0 1rem 0' }}>
                Section Performance Breakdown
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {Object.entries(finalReport.finalInterviewResults.sectionScores).map(([key, val]) => (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.8rem', textTransform: 'capitalize', color: '#cbd5e1', fontWeight: 600 }}>{key}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>{val.score} / {val.max}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${val.percentage}%`, height: '100%', background: '#a855f7', borderRadius: '999px' }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginTop: '0.35rem' }}>
                      {val.percentage}% mastery
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Improvement Diagnostic Report */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {/* Priority Improvement */}
              <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f87171', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>🔴</span> Priority Improvement Focus
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {finalReport.skillImprovementReport.priorityImprovement.map((item, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{item.skill}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#f87171', background: 'rgba(239, 68, 68, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          Score: {item.interviewScore}%
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '0 0 0.6rem 0', lineHeight: 1.45 }}>
                        {item.reasoning}
                      </p>
                      {item.recommendedFocus && (
                        <div>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Recommended Focus:</span>
                          <ul style={{ margin: '0.3rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#fca5a5' }}>
                            {item.recommendedFocus.map((f, fi) => (
                              <li key={fi}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Needs Improvement */}
              <div style={{ background: 'rgba(245, 158, 11, 0.04)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fbbf24', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>🟠</span> Moderate Focus Areas
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {finalReport.skillImprovementReport.needsImprovement.map((item, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{item.skill}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          Score: {item.interviewScore}%
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '0 0 0.6rem 0', lineHeight: 1.45 }}>
                        {item.reasoning}
                      </p>
                      {item.recommendedFocus && (
                        <ul style={{ margin: '0.3rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#fde68a' }}>
                          {item.recommendedFocus.map((f, fi) => (
                            <li key={fi}>{f}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strong Areas */}
              <div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#34d399', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>🟢</span> Verified Strong Areas
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {finalReport.skillImprovementReport.strongAreas.map((item, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{item.skill}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          Score: {item.interviewScore}%
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
                        {item.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive 10-Question Flow */
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
            {/* Left Questions Navigation Sidebar */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--home-border)',
              borderRadius: '16px',
              padding: '1.25rem',
              height: 'fit-content'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 1rem 0' }}>
                Question Matrix (10)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {questions.map((q, idx) => {
                  const isDone = !!userAnswers[q.id];
                  const isCurr = idx === currentQuestionIndex;
                  const secBadge = SECTION_BADGES[q.section] || { color: '#a855f7' };

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleSelectQuestion(idx)}
                      style={{
                        background: isCurr ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        border: isCurr ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        padding: '0.6rem 0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: isDone ? '#10b981' : 'rgba(255,255,255,0.08)',
                          color: isDone ? '#042f24' : '#fff',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {idx + 1}
                        </span>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>
                            {q.skill.toUpperCase()}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: secBadge.color }}>
                            {q.section}
                          </div>
                        </div>
                      </div>

                      {evaluations[q.id] && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399' }}>
                          {evaluations[q.id].score}/10
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  type="button"
                  onClick={handleGenerateFinalReport}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.7rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Award size={15} /> Finish & View Report
                </button>
              </div>
            </div>

            {/* Right Question Active Card */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--home-border)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      background: SECTION_BADGES[currentQ.section]?.bg || 'rgba(168, 85, 247, 0.15)',
                      color: SECTION_BADGES[currentQ.section]?.color || '#c084fc',
                      border: `1px solid ${SECTION_BADGES[currentQ.section]?.color}40`
                    }}>
                      Question {currentQuestionIndex + 1} of 10 • {SECTION_BADGES[currentQ.section]?.label}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      Skill: {currentQ.skill}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24' }}>
                    10 Marks
                  </span>
                </div>

                {/* Question Text */}
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: '0 0 1.25rem 0', lineHeight: 1.45 }}>
                  {currentQ.question}
                </h2>

                {/* Expected Points Hint Toggle */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <HelpCircle size={13} /> Evaluation Criteria Rubric:
                    </span>
                    <button
                      type="button"
                      onClick={handleUseSampleAnswer}
                      style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Use Demo Answer ⚡
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                    <span>Technical Accuracy: <strong>{currentQ.evaluationCriteria?.technicalAccuracy || 4} pts</strong></span>
                    <span>Conceptual Understanding: <strong>{currentQ.evaluationCriteria?.understanding || 3} pts</strong></span>
                    <span>Example Demonstration: <strong>{currentQ.evaluationCriteria?.example || 3} pts</strong></span>
                  </div>
                </div>

                {/* Answer Input */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.5rem' }}>
                    Your Technical Explanation & Practical Strategy:
                  </label>
                  <textarea
                    rows={7}
                    placeholder="Type your structured explanation, code considerations, and real-world example..."
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(10, 15, 28, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '1rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.72rem', color: '#64748b' }}>
                    <span>Include architectural points, edge cases, and examples for full points.</span>
                    <span>{currentText.length} characters</span>
                  </div>
                </div>

                {/* Feedback & Score Breakdown if evaluated */}
                {currentEval && (
                  <div className="animate-fade" style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={16} /> AI Evaluation Verdict: {currentEval.verdict}
                      </span>
                      <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#34d399' }}>
                        Score: {currentEval.score} / 10
                      </span>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '0 0 0.75rem 0', lineHeight: 1.5 }}>
                      {currentEval.critique}
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <span>Technical Accuracy: <strong style={{ color: '#fff' }}>{currentEval.breakdown.technicalAccuracy}/4</strong></span>
                      <span>Understanding: <strong style={{ color: '#fff' }}>{currentEval.breakdown.understanding}/3</strong></span>
                      <span>Example: <strong style={{ color: '#fff' }}>{currentEval.breakdown.example}/3</strong></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => handleSelectQuestion(currentQuestionIndex - 1)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: currentQuestionIndex === 0 ? '#475569' : '#fff',
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handleEvaluateCurrentAnswer}
                    disabled={isSubmitting || !currentText.trim()}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#042f24',
                      border: 'none',
                      padding: '0.65rem 1.4rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: isSubmitting || !currentText.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <Send size={14} /> {isSubmitting ? 'Evaluating with AI...' : 'Submit & Score Answer'}
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => handleSelectQuestion(currentQuestionIndex + 1)}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        padding: '0.6rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGenerateFinalReport}
                      style={{
                        background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                        color: '#fff',
                        border: 'none',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Award size={15} /> Final Report
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
