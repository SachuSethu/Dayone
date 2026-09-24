// src/components/resume/CandidateProfileView.jsx
// Interactive candidate profile, Skill DNA radar, comparative bar graphs, histogram plot, Opportunity Map, and First-Day Mission Preview.

import React, { useState } from 'react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from 'recharts';
import SkillDetailModal from './SkillDetailModal';
import TaskGuideModal from '../TaskGuideModal';
import { calculateEvidenceHistogram } from '../../lib/skills/gapEngine';
import { 
  Sparkles, Target, Compass, Award, AlertTriangle, 
  ChevronRight, ArrowRight, Shield, CheckCircle2, TrendingUp, 
  Layers, Clock, HelpCircle, Eye, Play, BarChart3, RefreshCw,
  GraduationCap, Briefcase, AlertOctagon, FileCode2, Info, BookOpen
} from 'lucide-react';

export default function CandidateProfileView({ 
  candidateProfile, 
  targetRole, 
  skillGaps, 
  priorityGaps, 
  generatedMission,
  onStartSimulation,
  onReset 
}) {
  const [selectedSkillForModal, setSelectedSkillForModal] = useState(null);
  const [chartViewMode, setChartViewMode] = useState('radar'); // 'radar' | 'barchart' | 'histogram' | 'bars'
  const [showTaskGuide, setShowTaskGuide] = useState(false);

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

  const provenance = candidateProfile?.provenance || {
    verifiedCertifications: [],
    unverifiedCourseClaims: [],
    documentedProjects: []
  };

  return (
    <div className="candidate-profile-page">
      {/* Top Banner Navigation */}
      <header className="target-role-header">
        <div className="brand-group">
          <div className="brand-logo-mark">DayOne<span>.ai</span></div>
          <span className="platform-tag">AI Evaluation & Gap Diagnostics</span>
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

        <div className="user-nav-actions">
          <button className="btn-reupload-subtle" onClick={onReset}>
            <RefreshCw size={13} />
            <span>Upload Another Resume</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="candidate-profile-container">
        {/* Estimated Profile Disclaimer Notice */}
        <div className="estimated-profile-disclaimer">
          <Shield size={18} className="disclaimer-shield-icon" />
          <div className="disclaimer-content">
            <strong>Strict AI Evaluation Standards:</strong> Skills without documented project info or accredited certification 
            credentials are scored at 0%. Course claims without official certificates are classified as unverified. 
            Actual workplace proficiency is validated during DayOne’s live First-Day Simulation.
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
              <span className="stat-label">Verified Strengths</span>
              <span className="stat-number text-emerald">{strongCount}</span>
              <span className="stat-sub">Strong project proof</span>
            </div>
            <div className="stat-metric-box">
              <span className="stat-label">Zero-Evidence Skills</span>
              <span className="stat-number text-rose">{zeroEvidenceCount}</span>
              <span className="stat-sub">Missing project info</span>
            </div>
            <div className="stat-metric-box">
              <span className="stat-label">Priority Gaps</span>
              <span className="stat-number text-amber">{gapCount}</span>
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

        {/* EVIDENCE PROVENANCE & STRICT AUDIT BREAKDOWN */}
        <section className="profile-section-card provenance-audit-section">
          <div className="section-header-row">
            <div>
              <div className="section-pre-badge">
                <Shield size={13} />
                <span>RESUME EVIDENCE PROVENANCE AUDIT</span>
              </div>
              <h2 className="section-title">Certification & Project Verification Breakdown</h2>
              <p className="section-subtitle">
                Transparent verification of what counted toward your score and what was excluded under strict AI evaluation criteria.
              </p>
            </div>
          </div>

          <div className="provenance-grid">
            {/* Box 1: Verified Certifications */}
            <div className="provenance-box">
              <div className="prov-header">
                <GraduationCap size={18} className="text-emerald" />
                <h4 className="prov-title">Verified Certifications</h4>
                <span className="prov-count text-emerald">{provenance.verifiedCertifications?.length || 0}</span>
              </div>
              <p className="prov-desc">Accredited certifications that confer direct capability evidence.</p>
              {provenance.verifiedCertifications && provenance.verifiedCertifications.length > 0 ? (
                <ul className="prov-list">
                  {provenance.verifiedCertifications.map((c, i) => (
                    <li key={i} className="prov-item verified">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>{c.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="prov-empty-note">
                  No accredited industry certifications detected in resume.
                </div>
              )}
            </div>

            {/* Box 2: Verified Projects */}
            <div className="provenance-box">
              <div className="prov-header">
                <Briefcase size={18} className="text-cyan" />
                <h4 className="prov-title">Documented Projects</h4>
                <span className="prov-count text-cyan">{provenance.documentedProjects?.length || 0}</span>
              </div>
              <p className="prov-desc">Projects containing verified architecture & technical info.</p>
              {provenance.documentedProjects && provenance.documentedProjects.length > 0 ? (
                <ul className="prov-list">
                  {provenance.documentedProjects.map((p, i) => (
                    <li key={i} className="prov-item project">
                      <FileCode2 size={13} className="text-cyan" />
                      <div>
                        <strong>{p.name}</strong>
                        {p.technologies && <span className="prov-tech-tag"> ({p.technologies.slice(0, 3).join(', ')})</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="prov-empty-note">
                  No projects with complete technical info found.
                </div>
              )}
            </div>

            {/* Box 3: Unverified Course Claims Discarded */}
            <div className="provenance-box discard-box">
              <div className="prov-header">
                <AlertOctagon size={18} className="text-rose" />
                <h4 className="prov-title">Courses Without Certification</h4>
                <span className="prov-count text-rose">0% Value</span>
              </div>
              <p className="prov-desc">Per strict evaluation rules, courses without accredited certificates are given zero value.</p>
              {provenance.unverifiedCourseClaims && provenance.unverifiedCourseClaims.length > 0 ? (
                <ul className="prov-list">
                  {provenance.unverifiedCourseClaims.map((u, i) => (
                    <li key={i} className="prov-item discarded">
                      <span className="cross-bullet">✕</span>
                      <div>
                        <strong>{u.courseName}</strong>
                        <span className="discard-note"> — {u.reason || 'Lacks official credential'}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="prov-empty-note text-muted">
                  No unverified course claims detected.
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
                        <strong>{g.skill}</strong>
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
                        {g.hasCertification ? (
                          <span className="prov-basis-badge cert">🎓 Certified</span>
                        ) : g.hasProjectInfo ? (
                          <span className="prov-basis-badge proj">🛠️ Project Info</span>
                        ) : (
                          <span className="prov-basis-badge none">⚠️ No Project/Cert</span>
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
                          {isAligned ? 'Strong Alignment' : isDevOpp ? 'Development Area' : (isZero ? 'Zero Evidence' : 'Priority Gap')}
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

        {/* SECTION 4: PERSONALIZED FIRST-DAY MISSION PREVIEW */}
        <section className="profile-section-card mission-preview-section">
          <div className="mission-preview-glow" />
          
          <div className="section-header-row">
            <div>
              <div className="section-pre-badge ai-mission-badge">
                <Sparkles size={13} />
                <span>AI SYNTHESIZED WORKPLACE MISSION</span>
              </div>
              <h2 className="section-title">Personalized First-Day Simulation</h2>
              <p className="section-subtitle">
                Tailored specifically to test and validate your #1 priority development area in a live production environment.
              </p>
            </div>

            <div className="mission-meta-pills">
              <span className="meta-pill">
                <Clock size={13} />
                <span>{generatedMission?.estimatedMinutes || 45} mins</span>
              </span>
              <span className="meta-pill difficulty">
                <Layers size={13} />
                <span>{generatedMission?.difficulty || 'Intermediate'}</span>
              </span>
            </div>
          </div>

          <div className="mission-preview-body">
            <h3 className="mission-headline-title">
              {generatedMission?.title || `${targetRole.name} Production Mission`}
            </h3>

            <p className="mission-scenario-narrative">
              {generatedMission?.scenario || 
                `A critical service component is experiencing edge-case failures during peak traffic. You must inspect telemetry logs, pinpoint the issue, and implement an error-handled fix.`}
            </p>

            <div className="mission-skills-tested-row">
              <span className="skills-tested-label">Skills Tested in Simulation:</span>
              <div className="tested-pills-list">
                {(generatedMission?.skillsTested || [targetRole.skills[0]?.name, 'Testing', 'API Integration']).map((sk, idx) => (
                  <span key={idx} className="tested-pill">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="mission-objective-callout">
              <strong>Objective:</strong> {generatedMission?.objective || 'Investigate, fix, and pass regression tests.'}
            </div>

            {/* Launch Primary CTA Button & Guide Manual Button */}
            <div className="mission-launch-row">
              <div className="launch-context-note">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Workplace environment provisioned. Ready for immediate deployment.</span>
              </div>

              <div className="mission-cta-actions">
                <button
                  type="button"
                  className="btn-preview-task-guide"
                  onClick={() => setShowTaskGuide(true)}
                  title="Open step-by-step resolution walkthrough and download printable PDF guide"
                >
                  <BookOpen size={16} />
                  <span>Task Guide & Solution (PDF)</span>
                </button>

                <button 
                  type="button" 
                  className="btn-start-first-day"
                  onClick={onStartSimulation}
                >
                  <Play size={18} className="play-icon" />
                  <span>START MY FIRST DAY</span>
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
            onStartSimulation();
          }}
        />
      )}

      {/* Interactive Task Guide & Solution Manual Modal */}
      {showTaskGuide && (
        <TaskGuideModal 
          currentTaskId={generatedMission?.taskType}
          currentRoleId={targetRole?.id}
          onClose={() => setShowTaskGuide(false)}
        />
      )}
    </div>
  );
}
