// src/components/resume/CandidateProfileView.jsx
// Interactive candidate profile, Skill DNA radar, comparative bar graphs, histogram plot, Opportunity Map, and First-Day Mission Preview.

import React, { useState } from 'react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from 'recharts';
import SkillDetailModal from './SkillDetailModal';
import SkillRemarkModal from './SkillRemarkModal';
import { calculateEvidenceHistogram } from '../../lib/skills/gapEngine';
import { 
  Sparkles, Target, Compass, Award, AlertTriangle, 
  ChevronRight, ArrowRight, ArrowLeft, Shield, CheckCircle2, TrendingUp, 
  Layers, Clock, HelpCircle, Eye, Play, BarChart3, RefreshCw,
  GraduationCap, Briefcase, AlertOctagon, FileCode2, Info, BookOpen,
  CheckSquare, Check, Flag, UserCheck, LayoutDashboard
} from 'lucide-react';
import { 
  selectAssignedTasksForCandidate, 
  determineCandidateLevel 
} from '../../data/taskDatabase';

export default function CandidateProfileView({ 
  candidateProfile, 
  targetRole, 
  skillGaps, 
  priorityGaps, 
  generatedMission,
  onStartSimulation,
  onReset,
  onOpenDashboard,
  onBackToHome = null
}) {
  const [selectedSkillForModal, setSelectedSkillForModal] = useState(null);
  const [chartViewMode, setChartViewMode] = useState('radar'); // 'radar' | 'barchart' | 'histogram' | 'bars'
  const [activeAssignedIndex, setActiveAssignedIndex] = useState(0);

  // Skills evidence list
  const remarkedSkills = skillGaps.filter(g => g.isRemarkedInvalid || g.remarkStatus === 'invalid_certification');
  const [showSkillRemarkModal, setShowSkillRemarkModal] = useState(false);

  // Compute Candidate Experience Level (1..4)
  const candidateLevel = determineCandidateLevel({
    candidateProfile,
    skillGaps
  });

  // Select EXACTLY 2 Assigned Main Tasks (each with 2 subtasks) enforcing Task Diversity Rule
  const assignedTasks = selectAssignedTasksForCandidate({
    roleId: targetRole?.id || 'frontend',
    candidateLevel,
    skillGaps,
    candidateProfile,
    maxTasks: 2
  });

  const activeTask = assignedTasks[activeAssignedIndex] || assignedTasks[0];

  // Prepare radar chart data
  const chartData = skillGaps.map(g => ({
    subject: g.skill,
    candidateEvidence: g.candidateEvidencePercent,
    roleRequirement: g.roleRequirementPercent,
    fullMark: 100
  }));

  // Prepare comparative bar chart data
  const barChartData = skillGaps.map(g => ({
    skill: g.skill,
    'Candidate Evidence': g.candidateEvidencePercent,
    'Production Demand': g.roleRequirementPercent
  }));

  // Calculate evidence distribution histogram
  const histogramData = calculateEvidenceHistogram(skillGaps);

  // Overall metrics calculation
  const avgCandidate = Math.round(skillGaps.reduce((acc, curr) => acc + curr.candidateEvidencePercent, 0) / (skillGaps.length || 1));
  const avgRequirement = Math.round(skillGaps.reduce((acc, curr) => acc + curr.roleRequirementPercent, 0) / (skillGaps.length || 1));
  const overallAlignment = Math.min(100, Math.round((avgCandidate / avgRequirement) * 100));

  const strongCount = skillGaps.filter(g => g.alignmentStatus === 'strong_alignment').length;
  const oppCount = skillGaps.filter(g => g.alignmentStatus === 'development_opportunity').length;
  const gapCount = skillGaps.filter(g => g.alignmentStatus === 'high_priority_gap').length;
  const zeroEvidenceCount = skillGaps.filter(g => g.candidateEvidencePercent === 0).length;

  // Pure skill-based strengths and weaknesses
  const fallbackStrengths = skillGaps
    .filter(g => g.candidateEvidencePercent >= 60)
    .slice(0, 4)
    .map(g => ({
      skill: g.skill,
      proficiency: g.candidateEvidencePercent,
      strengthRationale: `Demonstrates strong technical proficiency (${g.candidateEvidencePercent}%) from resume profile.`
    }));

  const fallbackWeaknesses = skillGaps
    .filter(g => g.candidateEvidencePercent < 55)
    .slice(0, 4)
    .map(g => ({
      skill: g.skill,
      proficiency: g.candidateEvidencePercent,
      deficit: `Foundational representation in resume profile.`,
      priority: g.priority || 'high',
      weaknessRationale: `Core ${targetRole?.name || 'role'} competency (${g.roleRequirementPercent}%) targeted for practical validation in workplace simulation.`
    }));

  const skillStrengths = candidateProfile?.skillStrengths?.length 
    ? candidateProfile.skillStrengths 
    : fallbackStrengths;

  const skillWeaknesses = candidateProfile?.skillWeaknesses?.length 
    ? candidateProfile.skillWeaknesses 
    : fallbackWeaknesses;

  return (
    <div className="candidate-profile-page">
      {/* Top Banner Navigation */}
      <header className="target-role-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {onBackToHome && (
            <button 
              type="button" 
              onClick={onBackToHome}
              title="Return to DayOne.ai Platform Hub"
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
          )}

          <div 
            className="brand-group" 
            onClick={onBackToHome}
            style={{ cursor: onBackToHome ? 'pointer' : 'default' }}
            title={onBackToHome ? "Return to DayOne.ai Platform Hub" : undefined}
          >
            <div className="brand-logo-mark">DayOne<span>.ai</span></div>
            <span className="platform-tag">AI Evaluation & Gap Diagnostics</span>
          </div>
        </div>

        <div className="flow-stepper">
          <div className="flow-step completed" onClick={onReset} role="button" tabIndex={0}>
            <span className="step-circle">✓</span>
            <span className="step-text">{targetRole.name}</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step completed">
            <span className="step-circle">✓</span>
            <span className="step-text">Resume Extracted</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step current">
            <span className="step-circle">3</span>
            <span className="step-text">Skill Gap Diagnostics</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step pending">
            <span className="step-circle">4</span>
            <span className="step-text">Workplace Simulation</span>
          </div>
        </div>

        <div className="user-nav-actions flex-row items-center gap-2">
          {onOpenDashboard && (
            <button 
              type="button" 
              className="current-user-pill clickable"
              onClick={onOpenDashboard}
              title="Click to open your Candidate Account Dashboard"
            >
              <span className="user-icon">👤</span>
              <span className="user-name">{candidateProfile?.candidateName || 'Candidate Profile'}</span>
              <span className="user-dash-tag">Dashboard</span>
            </button>
          )}
          {onOpenDashboard && (
            <button 
              type="button" 
              className="btn btn-secondary btn-sm flex-row items-center gap-1.5"
              onClick={onOpenDashboard}
              title="Open Dynamic Candidate Dashboard"
            >
              <LayoutDashboard size={14} className="text-cyan" />
              <span>Account Dashboard</span>
            </button>
          )}
          <button className="btn-reupload-subtle" onClick={onReset}>
            <RefreshCw size={13} />
            <span>Upload Another Resume</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="candidate-profile-container">
        {/* Back Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {onBackToHome && (
              <button 
                type="button" 
                onClick={onBackToHome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#38bdf8',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={14} /> Back to Hub
              </button>
            )}
            <button 
              type="button" 
              onClick={onReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={13} /> Change Resume / Role
            </button>
          </div>

          {onOpenDashboard && (
            <button 
              type="button" 
              onClick={onOpenDashboard}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#34d399',
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <LayoutDashboard size={14} /> My Candidate Dashboard →
            </button>
          )}
        </div>

        {/* Profile Standards Notice */}
        <div className="estimated-profile-disclaimer">
          <Shield size={18} className="disclaimer-shield-icon" />
          <div className="disclaimer-content">
            <strong>AI Evaluation Standards:</strong> DayOne extracts technical skills directly from your resume to calculate your baseline capability and diagnose skill strengths and improvement areas. Real-world workplace proficiency is validated dynamically during DayOne’s live First-Day Simulation.
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="profile-hero-card">
          <div className="profile-hero-left">
            <div className="profile-avatar-box">
              <span className="avatar-initials">
                {candidateProfile?.candidate?.detectedName?.charAt(0) || 'C'}
              </span>
            </div>
            <div className="profile-hero-info">
              <div className="role-headline-tag">
                <Target size={13} />
                <span>BENCHMARKED AGAINST {targetRole.name.toUpperCase()}</span>
              </div>
              <h1 className="profile-candidate-name">
                {candidateProfile?.candidate?.detectedName || 'Candidate Profile'}
              </h1>
              <p className="profile-summary-text">
                {candidateProfile?.candidate?.summary || 
                  `Experience evaluated against enterprise ${targetRole.name} production standards.`}
              </p>
            </div>
          </div>

          <div className="profile-hero-stats">
            <div className="stat-metric-box">
              <span className="stat-label">Role Alignment</span>
              <span className="stat-number">{overallAlignment}%</span>
              <span className="stat-sub">Market benchmark fit</span>
            </div>
            <div className="stat-metric-box">
              <span className="stat-label">Skill Strengths</span>
              <span className="stat-number text-emerald">{skillStrengths.length || strongCount}</span>
              <span className="stat-sub">Demonstrated proficiency</span>
            </div>
            <div className="stat-metric-box">
              <span className="stat-label">Simulation Focus</span>
              <span className="stat-number text-amber">{skillWeaknesses.length || gapCount}</span>
              <span className="stat-sub">Needs practical validation</span>
            </div>
            <div className="stat-metric-box">
              <span className="stat-label">Priority Gaps</span>
              <span className="stat-number text-cyan">{gapCount}</span>
              <span className="stat-sub">Targeted in Day 1</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: STATISTICAL VISUALIZATIONS & PLOTS */}
        <section className="profile-section-card">
          <div className="section-header-row">
            <div>
              <div className="section-pre-badge">
                <Sparkles size={13} />
                <span>MULTIDIMENSIONAL STATISTICAL ANALYSIS</span>
              </div>
              <h2 className="section-title">Capability Analytics & Statistical Plots</h2>
              <p className="section-subtitle">
                Inspect your competency distribution, comparative requirement bars, and radar footprint.
              </p>
            </div>

            <div className="view-toggle-pills">
              <button 
                type="button"
                className={`view-pill ${chartViewMode === 'radar' ? 'active' : ''}`}
                onClick={() => setChartViewMode('radar')}
                title="Multidimensional Radar Footprint"
              >
                <Compass size={14} />
                <span>Radar View</span>
              </button>

              <button 
                type="button"
                className={`view-pill ${chartViewMode === 'barchart' ? 'active' : ''}`}
                onClick={() => setChartViewMode('barchart')}
                title="Side-by-side Comparative Bars"
              >
                <BarChart3 size={14} />
                <span>Comparative Bar Chart</span>
              </button>

              <button 
                type="button"
                className={`view-pill ${chartViewMode === 'histogram' ? 'active' : ''}`}
                onClick={() => setChartViewMode('histogram')}
                title="Evidence Tier Frequency Histogram"
              >
                <Layers size={14} />
                <span>Score Distribution Histogram</span>
              </button>

              <button 
                type="button"
                className={`view-pill ${chartViewMode === 'bars' ? 'active' : ''}`}
                onClick={() => setChartViewMode('bars')}
                title="Dual Progress Capability Bars"
              >
                <TrendingUp size={14} />
                <span>Capability Bars</span>
              </button>
            </div>
          </div>

          <div className="skill-dna-visual-grid">
            {/* Visual Chart Column */}
            <div className="chart-column">
              {/* PLOT 1: RADAR CHART (Existing) */}
              {chartViewMode === 'radar' && (
                <div className="radar-chart-wrapper">
                  <ResponsiveContainer width="100%" height={380}>
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                      <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 500 }} 
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: '#64748b', fontSize: 10 }}
                      />
                      <Radar
                        name="Target Role Benchmark"
                        dataKey="roleRequirement"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.25}
                      />
                      <Radar
                        name="Candidate Resume Evidence"
                        dataKey="candidateEvidence"
                        stroke="#38bdf8"
                        fill="#38bdf8"
                        fillOpacity={0.4}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderColor: '#334155', 
                          borderRadius: '8px', 
                          color: '#f8fafc' 
                        }} 
                      />
                      <Legend wrapperStyle={{ paddingTop: '16px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* PLOT 2: COMPARATIVE SIDE-BY-SIDE BAR CHART (New) */}
              {chartViewMode === 'barchart' && (
                <div className="barchart-wrapper">
                  <div className="chart-inner-header">
                    <span className="inner-chart-title">Competency-by-Competency Benchmark Comparison</span>
                    <span className="inner-chart-sub">Candidate Evidence % vs Production Demand %</span>
                  </div>
                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#23314d" />
                      <XAxis 
                        dataKey="skill" 
                        stroke="#94a3b8" 
                        fontSize={11}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} unit="%" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderColor: '#334155', 
                          borderRadius: '8px', 
                          color: '#f8fafc' 
                        }} 
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Bar dataKey="Candidate Evidence" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Production Demand" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* PLOT 3: FREQUENCY DISTRIBUTION HISTOGRAM (New) */}
              {chartViewMode === 'histogram' && (
                <div className="histogram-wrapper">
                  <div className="chart-inner-header">
                    <span className="inner-chart-title">Skill Evidence Distribution Histogram</span>
                    <span className="inner-chart-sub">Frequency of candidate skills across 5 evidence tiers (Notice tier 0%-20% for unverified claims)</span>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#23314d" />
                      <XAxis dataKey="tier" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} label={{ value: 'Number of Skills', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                      <Tooltip 
                        formatter={(val, name, item) => [`${val} Skills`, name === 'candidateCount' ? 'Candidate Skills' : 'Target Role Demands']}
                        labelFormatter={(label) => `Tier: ${label}`}
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderColor: '#334155', 
                          borderRadius: '8px', 
                          color: '#f8fafc' 
                        }} 
                      />
                      <Legend 
                        formatter={(value) => value === 'candidateCount' ? 'Candidate Skills Distribution' : 'Target Role Demand Baseline'}
                        wrapperStyle={{ paddingTop: '10px' }} 
                      />
                      <Bar dataKey="candidateCount" name="candidateCount" fill="#38bdf8" radius={[4, 4, 0, 0]}>
                        {histogramData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? '#f43f5e' : (index === 1 ? '#f59e0b' : (index >= 3 ? '#10b981' : '#38bdf8'))} 
                          />
                        ))}
                      </Bar>
                      <Bar dataKey="requirementCount" name="requirementCount" fill="#64748b" radius={[4, 4, 0, 0]} opacity={0.5} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="histogram-legend-note">
                    <span className="hist-key rose">■ 0%-20%: Zero/Unsubstantiated</span>
                    <span className="hist-key amber">■ 21%-40%: Limited</span>
                    <span className="hist-key blue">■ 41%-60%: Developing</span>
                    <span className="hist-key emerald">■ 61%-100%: Project Verified / Certified</span>
                  </div>
                </div>
              )}

              {/* PLOT 4: CAPABILITY DUAL-PROGRESS BARS (Existing) */}
              {chartViewMode === 'bars' && (
                <div className="capability-bars-list">
                  {skillGaps.map(g => (
                    <div 
                      key={g.skill} 
                      className="capability-bar-item clickable"
                      onClick={() => setSelectedSkillForModal(g)}
                    >
                      <div className="cap-bar-header">
                        <span className="cap-bar-name">
                          {g.skill}
                          {g.candidateEvidencePercent === 0 && (
                            <span className="zero-val-tag">0% Unverified</span>
                          )}
                        </span>
                        <div className="cap-bar-numbers">
                          <span className={g.candidateEvidencePercent === 0 ? 'text-rose' : 'text-cyan'}>
                            Resume: {g.candidateEvidencePercent}%
                          </span>
                          <span className="text-muted">/</span>
                          <span className="text-emerald">Role: {g.roleRequirementPercent}%</span>
                        </div>
                      </div>
                      <div className="dual-progress-track">
                        <div 
                          className={`dual-fill candidate ${g.candidateEvidencePercent === 0 ? 'zero' : ''}`}
                          style={{ width: `${Math.max(2, g.candidateEvidencePercent)}%` }}
                          title={`Candidate Evidence: ${g.candidateEvidencePercent}%`}
                        />
                        <div 
                          className="dual-fill benchmark" 
                          style={{ width: `${g.roleRequirementPercent}%` }}
                          title={`Role Requirement: ${g.roleRequirementPercent}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Diagnostic Insights Column */}
            <div className="dna-insights-column">
              <h3 className="insights-headline">AI Evidence Audit</h3>
              
              <div className="insight-card highlight-emerald">
                <div className="insight-top">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <strong>Documented Strengths ({strongCount})</strong>
                </div>
                <p>
                  Supported by concrete project deliverables or accredited certifications.
                </p>
                <div className="insight-tags">
                  {skillGaps.filter(g => g.alignmentStatus === 'strong_alignment').map(g => (
                    <span key={g.skill} className="mini-tag tag-strong">{g.skill}</span>
                  ))}
                </div>
              </div>

              {zeroEvidenceCount > 0 && (
                <div className="insight-card highlight-rose">
                  <div className="insight-top">
                    <AlertOctagon size={16} className="text-rose" />
                    <strong>Zero-Evidence Claims ({zeroEvidenceCount})</strong>
                  </div>
                  <p>
                    Skills lacking project information or course claims without official certificates. Scored at 0% per strict evaluation rules.
                  </p>
                  <div className="insight-tags">
                    {skillGaps.filter(g => g.candidateEvidencePercent === 0).map(g => (
                      <span key={g.skill} className="mini-tag tag-zero">{g.skill} (0%)</span>
                    ))}
                  </div>
                </div>
              )}

              {remarkedSkills.length > 0 && (
                <div 
                  className="insight-card highlight-amber clickable-card"
                  onClick={() => setShowSkillRemarkModal(true)}
                  title="Click to view full unverified skill audit"
                >
                  <div className="insight-top">
                    <AlertTriangle size={16} className="text-amber" />
                    <strong>Certification Remarks ({remarkedSkills.length})</strong>
                  </div>
                  <p>
                    Skills flagged: <em>"This skill is not valid until you submit a valid certification."</em>
                  </p>
                  <div className="insight-tags">
                    {remarkedSkills.map(g => (
                      <span key={g.skill} className="mini-tag tag-zero">⚠️ {g.skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="insight-card highlight-amber">
                <div className="insight-top">
                  <AlertTriangle size={16} className="text-amber" />
                  <strong>Development Areas ({gapCount})</strong>
                </div>
                <p>
                  Essential role requirements requiring practical demonstration during your simulation.
                </p>
                <div className="insight-tags">
                  {skillGaps.filter(g => g.alignmentStatus === 'high_priority_gap' && g.candidateEvidencePercent > 0).map(g => (
                    <span key={g.skill} className="mini-tag tag-gap">{g.skill}</span>
                  ))}
                </div>
              </div>

              <div className="dna-help-box">
                <HelpCircle size={14} className="text-muted" />
                <span>Click any row in the Opportunity Map to inspect exact quotes and reasons why skills received scores.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILL-BASED STRENGTHS & WEAKNESSES INTELLIGENCE HUB */}
        <section className="profile-section-card skill-intelligence-hub-section">
          <div className="section-header-row">
            <div>
              <div className="section-pre-badge">
                <Award size={13} />
                <span>SKILL-BASED CAPABILITY DIAGNOSTICS</span>
              </div>
              <h2 className="section-title">Skill-Based Strengths & Weakness Analysis</h2>
              <p className="section-subtitle">
                Pure skill evaluation extracted directly from your resume text. Highlights your verified technical competencies alongside targeted improvement priorities for workplace simulation.
              </p>
            </div>
          </div>

          <div className="skill-intelligence-grid">
            {/* Box 1: Demonstrated Skill Strengths */}
            <div className="skill-intel-box strengths-box">
              <div className="intel-header">
                <div className="intel-title-wrap">
                  <CheckCircle2 size={18} className="text-emerald" />
                  <h4 className="intel-title">Demonstrated Skill Strengths</h4>
                </div>
                <span className="intel-count-badge text-emerald">{skillStrengths.length} Core Strengths</span>
              </div>
              <p className="intel-desc">
                High-proficiency skills where candidate resume indicates prominent technical competency and applied depth.
              </p>
              {skillStrengths.length > 0 ? (
                <div className="intel-items-list">
                  {skillStrengths.map((item, i) => (
                    <div key={i} className="intel-item strength">
                      <div className="intel-item-top">
                        <div className="flex-row items-center gap-2">
                          <span className="intel-bullet text-emerald">✦</span>
                          <strong className="intel-skill-name">{item.skill}</strong>
                        </div>
                        <span className="intel-prof-badge text-emerald">{item.proficiency || 85}% Proficiency</span>
                      </div>
                      <div className="intel-progress-track">
                        <div 
                          className="intel-progress-fill strength" 
                          style={{ width: `${Math.min(100, Math.max(10, item.proficiency || 85))}%` }} 
                        />
                      </div>
                      {item.strengthRationale && (
                        <p className="intel-rationale text-muted">
                          “{item.strengthRationale}”
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="intel-empty-note">
                  No high-depth skills identified. Baseline profile will be established in simulation.
                </div>
              )}
            </div>

            {/* Box 2: Targeted Skill Weaknesses / Improvement Areas */}
            <div className="skill-intel-box weaknesses-box">
              <div className="intel-header">
                <div className="intel-title-wrap">
                  <AlertTriangle size={18} className="text-amber" />
                  <h4 className="intel-title">Targeted Improvement Focus (Skill Deficits)</h4>
                </div>
                <span className="intel-count-badge text-amber">{skillWeaknesses.length} Focus Areas</span>
              </div>
              <p className="intel-desc">
                Core role competencies with lower resume representation requiring applied validation in workplace simulations.
              </p>
              {skillWeaknesses.length > 0 ? (
                <div className="intel-items-list">
                  {skillWeaknesses.map((item, i) => (
                    <div key={i} className="intel-item weakness">
                      <div className="intel-item-top">
                        <div className="flex-row items-center gap-2">
                          <span className="intel-bullet text-amber">▲</span>
                          <strong className="intel-skill-name">{item.skill}</strong>
                        </div>
                        <div className="flex-row items-center gap-1.5">
                          <span className="intel-priority-pill">{item.priority?.toUpperCase() || 'HIGH'} PRIORITY</span>
                          <span className="intel-prof-badge text-amber">{item.proficiency || 20}%</span>
                        </div>
                      </div>
                      <div className="intel-progress-track">
                        <div 
                          className="intel-progress-fill weakness" 
                          style={{ width: `${Math.min(100, Math.max(10, item.proficiency || 20))}%` }} 
                        />
                      </div>
                      <p className="intel-rationale text-amber-subtle">
                        {item.weaknessRationale || item.deficit || 'Essential role capability requiring hands-on demonstration.'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="intel-empty-note">
                  All role competencies meet initial baseline criteria.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: OPPORTUNITY MAP (COMPARATIVE MATRIX) */}
        <section className="profile-section-card">
          <div className="section-header-row">
            <div>
              <div className="section-pre-badge">
                <Compass size={13} />
                <span>BENCHMARKING MATRIX</span>
              </div>
              <h2 className="section-title">Opportunity Map: Evidence vs Production Demand</h2>
              <p className="section-subtitle">
                Inspect how each skill was evaluated. Click any row to view why it was detected and the specific recommendations.
              </p>
            </div>
          </div>

          <div className="opportunity-table-container">
            <table className="opportunity-table">
              <thead>
                <tr>
                  <th>Competency</th>
                  <th>Category</th>
                  <th>Resume Evidence</th>
                  <th>Evidence Basis</th>
                  <th>Role Demand</th>
                  <th>Gap Delta</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {skillGaps.map(g => {
                  const isZero = g.candidateEvidencePercent === 0;
                  const isHighGap = g.alignmentStatus === 'high_priority_gap';
                  const isDevOpp = g.alignmentStatus === 'development_opportunity';
                  const isAligned = g.alignmentStatus === 'strong_alignment';

                  return (
                    <tr 
                      key={g.skill} 
                      className={`opp-table-row ${isZero ? 'zero-row' : ''}`}
                      onClick={() => setSelectedSkillForModal(g)}
                    >
                      <td className="cell-skill-name">
                        <div className="skill-name-col">
                          <strong>{g.skill}</strong>
                        </div>
                      </td>
                      <td className="cell-category">
                        <span className="category-pill">{g.category || 'Engineering'}</span>
                      </td>
                      <td className="cell-evidence">
                        <div className="evidence-cell-wrap">
                          <span className={`percent-num ${isZero ? 'text-rose' : ''}`}>
                            {g.candidateEvidencePercent}%
                          </span>
                          <span className={`evidence-level-pill ${g.evidenceLevel}`}>
                            {isZero ? '0% / Zero' : g.evidenceLevel}
                          </span>
                        </div>
                      </td>
                      <td className="cell-provenance">
                        {g.candidateEvidencePercent >= 75 ? (
                          <span className="prov-basis-badge strong">⭐ Primary Competency</span>
                        ) : g.candidateEvidencePercent >= 50 ? (
                          <span className="prov-basis-badge mod">📘 Documented Skill</span>
                        ) : g.candidateEvidencePercent >= 25 ? (
                          <span className="prov-basis-badge dev">💡 Developing Skill</span>
                        ) : (
                          <span className="prov-basis-badge none">🎯 Needs Simulation</span>
                        )}
                      </td>
                      <td className="cell-demand">
                        <span className="percent-num">{g.roleRequirementPercent}%</span>
                      </td>
                      <td className="cell-gap">
                        <span className={`gap-badge ${isHighGap ? 'high' : isDevOpp ? 'medium' : 'low'}`}>
                          {g.gapPercentage > 0 ? `-${g.gapPercentage}%` : 'Aligned'}
                        </span>
                      </td>
                      <td className="cell-status">
                        <span className={`status-pill ${g.alignmentStatus}`}>
                          {isAligned ? 'Strong Alignment' : isDevOpp ? 'Development Area' : (isZero ? 'Simulation Baseline' : 'Priority Gap')}
                        </span>
                      </td>
                      <td className="cell-actions">
                        <button 
                          type="button" 
                          className="btn-inspect-evidence"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSkillForModal(g);
                          }}
                        >
                          <Eye size={13} />
                          <span>Inspect Evidence</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: PRIORITY SKILL GAPS (TOP 3) */}
        <section className="profile-section-card">
          <div className="section-header-row">
            <div>
              <div className="section-pre-badge">
                <Target size={13} />
                <span>CONSTRUCTIVE CAREER DIAGNOSTICS</span>
              </div>
              <h2 className="section-title">Top Priority Skill Gaps</h2>
              <p className="section-subtitle">
                Constructive, empowering analysis of the high-leverage areas to validate in practical workplace simulations.
              </p>
            </div>
          </div>

          <div className="priority-gaps-grid">
            {priorityGaps.map((gap, idx) => (
              <div key={gap.skill || idx} className="priority-gap-card">
                <div className="gap-card-header">
                  <div className="gap-rank-circle">#{idx + 1}</div>
                  <div>
                    <h3 className="gap-skill-name">{gap.skill}</h3>
                    <span className="gap-priority-badge">{gap.priority?.toUpperCase()} PRIORITY</span>
                  </div>
                </div>

                <p className="gap-reason-text">
                  {gap.reason || gap.constructiveReason}
                </p>

                <div className="gap-action-footer">
                  <span className="action-tag">Recommended: Practical Simulation</span>
                  <button 
                    type="button"
                    className="btn-link-inspect"
                    onClick={() => {
                      const match = skillGaps.find(s => s.skill === gap.skill);
                      if (match) setSelectedSkillForModal(match);
                    }}
                  >
                    <span>View Resume Context</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: DYNAMIC TASK INTELLIGENCE — 2 ASSIGNED TASKS */}
        <section className="profile-section-card mission-preview-section">
          <div className="mission-preview-glow" />
          
          <div className="section-header-row">
            <div>
              <div className="section-pre-badge ai-mission-badge">
                <Sparkles size={13} />
                <span>DYNAMIC TASK INTELLIGENCE • {activeTask?.levelLabel || `LEVEL ${candidateLevel}`}</span>
              </div>
              <h2 className="section-title">Personalized First-Day Simulation — 2 Assigned Tasks</h2>
              <p className="section-subtitle">
                The AI dynamically matched exactly 2 production tasks from our 192-task database based on your resume evidence, verified strengths, and high-priority skill gaps.
              </p>
            </div>

            <div className="mission-meta-pills">
              <span className="meta-pill">
                <Clock size={13} />
                <span>{activeTask?.estimatedMinutes || 25} mins</span>
              </span>
              <span className="meta-pill difficulty">
                <Layers size={13} />
                <span>{activeTask?.levelLabel || `Level ${candidateLevel}`}</span>
              </span>
              <span className="meta-pill subtask-count-pill">
                <CheckSquare size={13} />
                <span>2 Subtasks</span>
              </span>
            </div>
          </div>

          {/* TWO ASSIGNED TASKS SELECTOR / TABS */}
          <div className="assigned-tasks-toggle-row">
            {assignedTasks.map((t, idx) => (
              <div 
                key={t.id}
                className={`assigned-task-tab-card ${activeAssignedIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveAssignedIndex(idx)}
                role="button"
                tabIndex={0}
              >
                <div className="tab-card-header">
                  <span className="task-order-badge">Assigned Task {idx + 1} of 2</span>
                  <span className="task-competency-pill">{t.competency}</span>
                </div>
                <h4 className="tab-card-title">{t.title}</h4>
                <p className="tab-card-rationale">
                  <Target size={12} className="inline-icon text-amber" />
                  <span>{t.matchingRationale}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mission-preview-body">
            <div className="mission-headline-row">
              <div>
                <span className="mission-code-badge">{activeTask?.id || activeTask?.missionDataTemplate?.missionCode}</span>
                <h3 className="mission-headline-title">
                  {activeTask?.title}
                </h3>
              </div>
            </div>

            {/* AI Matching Rationale Banner */}
            <div className="mission-rationale-box">
              <Sparkles size={16} className="text-amber" />
              <div>
                <strong>AI Task Matching Rationale:</strong> {activeTask?.matchingRationale || 'Targeted to validate priority competency areas.'}
              </div>
            </div>

            <p className="mission-scenario-narrative">
              {activeTask?.shortDescription || activeTask?.missionDataTemplate?.scenarioBrief || generatedMission?.scenario}
            </p>

            <div className="mission-skills-tested-row">
              <span className="skills-tested-label">Skills Tested in Simulation:</span>
              <div className="tested-pills-list">
                {(activeTask?.skills || generatedMission?.skillsTested || [targetRole.skills[0]?.name]).map((sk, idx) => (
                  <span key={idx} className="tested-pill">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* EXACTLY 2 SUBTASKS DISPLAY */}
            <div className="assigned-subtasks-container">
              <div className="subtasks-section-title">
                <CheckSquare size={16} className="text-emerald" />
                <span>Required Subtasks (2 Subtasks for this Mission)</span>
              </div>

              <div className="subtasks-grid">
                {(activeTask?.subtasks || [
                  { id: `${activeTask?.id}-A`, title: 'Root Cause Investigation', description: 'Inspect telemetry logs and isolate fault triggers.', verificationMethod: 'Automated test suite passes.', deliverables: ['Telemetry diagnosis', 'Reproduction trace'] },
                  { id: `${activeTask?.id}-B`, title: 'Production Patch & Verification', description: 'Implement resilient code and pass all regression checks.', verificationMethod: 'Zero regression test runs.', deliverables: ['Code patch', 'Unit test assertions'] }
                ]).map((st, sIdx) => (
                  <div key={st.id || sIdx} className="subtask-card">
                    <div className="subtask-card-header">
                      <div className="flex-row items-center gap-2">
                        <span className="subtask-step-pill">SUBTASK {sIdx === 0 ? '1' : '2'}</span>
                        <span className="subtask-flags-pill font-mono">
                          <Flag size={11} className="text-amber" />
                          <span>{st.flags?.length || 5} CAPTURE FLAGS (50 PTS)</span>
                        </span>
                      </div>
                      <h4 className="subtask-title">{st.title}</h4>
                    </div>
                    <p className="subtask-description">{st.description}</p>
                    
                    <div className="subtask-verification-box">
                      <CheckCircle2 size={14} className="text-emerald" />
                      <div>
                        <strong>Verification:</strong> {st.verificationMethod}
                      </div>
                    </div>

                    {st.deliverables && st.deliverables.length > 0 && (
                      <div className="subtask-deliverables-row">
                        <span className="deliverables-label">Deliverables:</span>
                        <div className="deliverable-tags">
                          {st.deliverables.map((d, dIdx) => (
                            <span key={dIdx} className="deliverable-tag">{d}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Primary CTA Button */}
            <div className="mission-launch-row">
              <div className="launch-context-note">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Workplace environment provisioned for {activeTask?.title}. Ready for deployment.</span>
              </div>

              <div className="mission-cta-actions">
                <button 
                  type="button" 
                  className="btn-start-first-day"
                  onClick={() => onStartSimulation && onStartSimulation(activeTask, assignedTasks, activeAssignedIndex, candidateLevel)}
                >
                  <Play size={18} className="play-icon" />
                  <span>START TASK {activeAssignedIndex + 1} SIMULATION</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkillForModal && (
        <SkillDetailModal 
          skill={selectedSkillForModal}
          onClose={() => setSelectedSkillForModal(null)}
          onTestSkill={() => {
            setSelectedSkillForModal(null);
            onStartSimulation && onStartSimulation(activeTask, assignedTasks, activeAssignedIndex, candidateLevel);
          }}
        />
      )}

      {/* Skill Remark Pop-up Modal */}
      {showSkillRemarkModal && remarkedSkills.length > 0 && (
        <SkillRemarkModal 
          remarkedSkills={remarkedSkills}
          onClose={() => setShowSkillRemarkModal(false)}
          onUpdateResume={onReset}
        />
      )}
    </div>
  );
}
