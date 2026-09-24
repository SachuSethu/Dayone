// src/components/home/HomePage.jsx
// DayOne.ai Platform Home Page (Before Job Selection Hub)
// Features platform introduction, common platform info, and 4 large equal-height containers in a single row:
// 1. Micro courses for all jobs (loads 33 modules across 6 roles)
// 2. Career path (routes to target role selection & skill roadmap)
// 3. Job matching & available vacancy (routes to dynamic job matching)
// 4. Interview preparation (adaptive AI interview & evaluation model)

import React from 'react';
import { 
  Sparkles, BookOpen, Compass, Briefcase, Brain, 
  ArrowRight, Shield, Award, TrendingUp, CheckCircle2, 
  ExternalLink, Code2, Users, Layers, Zap, LogOut, LayoutDashboard 
} from 'lucide-react';
import './home.css';

export default function HomePage({
  currentUser,
  onSelectOption, // 'courses' | 'career_path' | 'jobs' | 'interview_prep'
  onOpenDashboard,
  onLogout
}) {
  const userName = currentUser?.name || 'Candidate';
  const userRole = currentUser?.targetRole || 'Engineering Track';

  return (
    <div className="home-root">
      {/* 1. TOP PLATFORM NAVBAR */}
      <header className="home-navbar">
        <div className="home-brand-wrap" onClick={() => onSelectOption('home')}>
          <div className="home-brand-logo">D</div>
          <span className="home-brand-title">DAYONE<span>.AI</span></span>
          <span className="home-brand-badge">PLATFORM HUB</span>
        </div>

        <nav className="home-nav-links">
          <button 
            type="button" 
            className="home-nav-item active"
            onClick={() => onSelectOption('home')}
          >
            Home
          </button>
          <button 
            type="button" 
            className="home-nav-item"
            onClick={() => onSelectOption('courses')}
          >
            <BookOpen size={14} /> Micro Courses
          </button>
          <button 
            type="button" 
            className="home-nav-item"
            onClick={() => onSelectOption('career_path')}
          >
            <Compass size={14} /> Career Path
          </button>
          <button 
            type="button" 
            className="home-nav-item"
            onClick={() => onSelectOption('jobs')}
          >
            <Briefcase size={14} /> Job Matches
          </button>
          <button 
            type="button" 
            className="home-nav-item"
            onClick={() => onSelectOption('interview_prep')}
          >
            <Brain size={14} /> Interview Prep
          </button>
          {onOpenDashboard && (
            <button 
              type="button" 
              className="home-nav-item"
              onClick={onOpenDashboard}
              style={{ color: '#38bdf8' }}
            >
              <LayoutDashboard size={14} /> Dashboard
            </button>
          )}
        </nav>

        <div className="home-nav-right">
          <div className="home-user-chip">
            <span className="home-user-avatar">👤</span>
            <div className="home-user-details">
              <span className="home-user-name">{userName}</span>
              <span className="home-user-role">{userRole}</span>
            </div>
          </div>

          {onLogout && (
            <button 
              type="button"
              className="home-nav-item"
              onClick={onLogout}
              style={{ color: '#f87171', padding: '0.45rem 0.75rem' }}
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="home-container">
        {/* HERO: PLATFORM INTRODUCTION */}
        <section className="home-hero animate-fade">
          <div className="home-hero-pill">
            <Sparkles size={13} /> DayOne.ai Talent Intelligence Pipeline
          </div>
          <h1 className="home-hero-title">
            The Production-Readiness & <span className="home-hero-highlight">Performance-Based</span> Hiring Platform
          </h1>
          <p className="home-hero-description">
            DayOne.ai replaces legacy keyword resumes with authentic workplace simulations, AI-evaluated production benchmarks, and direct employer talent pipelines. Prove your real-world engineering readiness before Day One.
          </p>
        </section>

        {/* METRICS & VERIFICATION STATS RIBBON */}
        <div className="home-metrics-ribbon animate-fade">
          <div className="home-metric-item">
            <div className="home-metric-val" style={{ color: '#10b981' }}>19</div>
            <div className="home-metric-lbl">Skill Vectors Evaluated</div>
          </div>
          <div className="home-metric-divider" />
          <div className="home-metric-item">
            <div className="home-metric-val" style={{ color: '#06b6d4' }}>6</div>
            <div className="home-metric-lbl">Engineering & Design Tracks</div>
          </div>
          <div className="home-metric-divider" />
          <div className="home-metric-item">
            <div className="home-metric-val" style={{ color: '#f59e0b' }}>Dual-Gate</div>
            <div className="home-metric-lbl">AI Verification Engine</div>
          </div>
          <div className="home-metric-divider" />
          <div className="home-metric-item">
            <div className="home-metric-val" style={{ color: '#a855f7' }}>100%</div>
            <div className="home-metric-lbl">Blind Recruiter Evaluation</div>
          </div>
        </div>

        {/* 3. SECTION HEADER FOR THE 4 LARGE CONTAINERS */}
        <div className="home-cards-section-header">
          <div>
            <h2 className="home-cards-section-title">
              <Zap size={22} color="#10b981" />
              Platform Modules & Acceleration Portals
            </h2>
            <p className="home-cards-section-subtitle">
              Select one of the 4 core pathways to begin your evaluation, target role planning, or live job matching.
            </p>
          </div>
        </div>

        {/* 4. THE 4 LARGE CONTAINERS IN A SINGLE ROW WITH SAME LENGTH AND HEIGHT & DIFFERENT COLORS */}
        <div className="home-cards-row animate-fade">
          {/* CONTAINER 1: MICRO COURSES FOR ALL JOBS (EMERALD) */}
          <div 
            className="home-large-container home-container-c1"
            onClick={() => onSelectOption('courses')}
            role="button"
            tabIndex={0}
          >
            <div className="container-top">
              <div className="container-header-row">
                <div className="container-icon-box">
                  <BookOpen size={24} />
                </div>
                <span className="container-badge">
                  33 MODULES • 6 ROLES
                </span>
              </div>

              <div>
                <h3 className="container-title">1. Micro Courses for All Jobs</h3>
                <p className="container-desc">
                  Curated video curriculum covering Frontend, Backend, Full Stack, UI/UX, Cybersecurity, and Data Analytics.
                </p>
              </div>

              <ul className="container-features-list">
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Tutorials from Fireship, ByteByteGo, Traversy</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>33 video-verified technical modules</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Domain tag filtering & completion tracker</span>
                </li>
              </ul>
            </div>

            <div className="container-bottom">
              <button 
                type="button" 
                className="container-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('courses');
                }}
              >
                <span>Load All Micro Courses</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* CONTAINER 2: CAREER PATH (CYAN) */}
          <div 
            className="home-large-container home-container-c2"
            onClick={() => onSelectOption('career_path')}
            role="button"
            tabIndex={0}
          >
            <div className="container-top">
              <div className="container-header-row">
                <div className="container-icon-box">
                  <Compass size={24} />
                </div>
                <span className="container-badge">
                  TARGET ROLE ROADMAP
                </span>
              </div>

              <div>
                <h3 className="container-title">2. Career Path</h3>
                <p className="container-desc">
                  Explore target roles, inspect production skill expectations, and embark on your personalized workplace simulation mission.
                </p>
              </div>

              <ul className="container-features-list">
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Frontend, Cyber, UI/UX, Full-Stack paths</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Resume extraction & skill gap diagnostics</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Interactive First-Day Workplace Simulation</span>
                </li>
              </ul>
            </div>

            <div className="container-bottom">
              <button 
                type="button" 
                className="container-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('career_path');
                }}
              >
                <span>Go to Career Path</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* CONTAINER 3: JOB MATCHING & AVAILABLE VACANCY (AMBER) */}
          <div 
            className="home-large-container home-container-c3"
            onClick={() => onSelectOption('jobs')}
            role="button"
            tabIndex={0}
          >
            <div className="container-top">
              <div className="container-header-row">
                <div className="container-icon-box">
                  <Briefcase size={24} />
                </div>
                <span className="container-badge">
                  LIVE VACANCIES
                </span>
              </div>

              <div>
                <h3 className="container-title">3. Job Matching & Vacancies</h3>
                <p className="container-desc">
                  Explore live job openings dropped by verified employers. Match your verified score, view ATS fit, and apply directly.
                </p>
              </div>

              <ul className="container-features-list">
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Prioritized by your readiness score</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Dropped employer vacancies & criteria</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>1-click apply with DayOne ATS Resume</span>
                </li>
              </ul>
            </div>

            <div className="container-bottom">
              <button 
                type="button" 
                className="container-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('jobs');
                }}
              >
                <span>Open Job Matching Page</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* CONTAINER 4: INTERVIEW PREPARATION (PURPLE) */}
          <div 
            className="home-large-container home-container-c4"
            onClick={() => onSelectOption('interview_prep')}
            role="button"
            tabIndex={0}
          >
            <div className="container-top">
              <div className="container-header-row">
                <div className="container-icon-box">
                  <Brain size={24} />
                </div>
                <span className="container-badge">
                  AI EVALUATION
                </span>
              </div>

              <div>
                <h3 className="container-title">4. Interview Preparation</h3>
                <p className="container-desc">
                  Practice interactive mock interviews across 4 evaluation rubrics with real-time scoring and comprehensive skill improvement report.
                </p>
              </div>

              <ul className="container-features-list">
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>10 adaptive questions: Theory to Problem Solving</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Instant AI scoring with technical rubric</span>
                </li>
                <li className="container-feature-item">
                  <span className="container-feature-dot" />
                  <span>Dual-Gate readiness report: (Train*0.4 + Int*0.6)</span>
                </li>
              </ul>
            </div>

            <div className="container-bottom">
              <button 
                type="button" 
                className="container-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('interview_prep');
                }}
              >
                <span>Start Interview Prep</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 5. ABOUT PLATFORM & ARCHITECTURE DETAILS */}
        <section className="home-info-section">
          <div>
            <h2 className="home-info-title">
              About DayOne.ai & Dual-Gate Verification
            </h2>
            <p className="home-info-text">
              DayOne.ai is engineered to solve the disconnect between static resume claims and real-world software engineering capability. By analyzing candidates across 19 skill vectors and verifying them in simulated workplace challenges, DayOne enables candidates to demonstrate true competence.
            </p>
            <p className="home-info-text">
              For hiring companies, DayOne enforces a strict <strong>Blind Evaluation Protocol</strong>: recruiters evaluate performance scores, code artifacts, and verified dossiers without access to personal employee credentials or private contact details until an offer is extended.
            </p>
          </div>

          <div className="home-info-grid">
            <div className="home-info-card">
              <div className="home-info-card-title">
                <Shield size={16} color="#10b981" />
                Dual-Gate Verification
              </div>
              <p className="home-info-card-desc">
                Gate 1 evaluates domain baseline fitness. Gate 2 measures workplace mission execution and edge-case resolution.
              </p>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-title">
                <Code2 size={16} color="#38bdf8" />
                Workplace Simulations
              </div>
              <p className="home-info-card-desc">
                Resolve simulated production bugs, API failures, and SIEM incident investigations in live sandboxes.
              </p>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-title">
                <Award size={16} color="#fbbf24" />
                ATS-Optimized Resumes
              </div>
              <p className="home-info-card-desc">
                Generate 98% ATS-friendly resumes auto-populated with verified competencies and performance scores.
              </p>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-title">
                <Users size={16} color="#c084fc" />
                Direct HR Transmission
              </div>
              <p className="home-info-card-desc">
                Shortlisted candidates can be forwarded directly to company HR leads with verified dossiers in 1 click.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
