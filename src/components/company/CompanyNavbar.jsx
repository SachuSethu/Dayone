// src/components/company/CompanyNavbar.jsx
// Persistent Company Navbar with DayOne Visual Identity (Near-black, neon green, glassmorphism)

import React from 'react';
import { 
  Building2, Briefcase, Plus, LogOut, ExternalLink, 
  Sparkles, Shield, Palette, Code2, LayoutDashboard, 
  TrendingUp, Users, CheckCircle2 
} from 'lucide-react';

export default function CompanyNavbar({
  company,
  currentView, // 'dashboard' | 'applied-vacancies' | 'hire-frontend' | 'hire-cybersecurity' | 'hire-uiux' | 'trends'
  appliedCount = 0,
  onNavigate,
  onOpenCreateJob,
  onLogout
}) {
  const companyName = company?.companyName || 'TechNova Labs';
  const companyLogo = company?.logo || '🏢';
  const industry = company?.industry || 'Enterprise Tech';

  return (
    <header className="company-navbar">
      {/* Left: Brand Identity & Nav Links */}
      <div className="company-nav-left">
        <div 
          className="company-brand"
          onClick={() => onNavigate('dashboard')}
          title="Return to Company Dashboard"
        >
          <div className="company-brand-icon">D</div>
          <span className="company-brand-title">DAYONE</span>
          <span className="company-badge-tag">RECRUITER</span>
        </div>

        <nav className="company-nav-links">
          <button 
            type="button"
            className={`company-nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </button>

          <button 
            type="button"
            className={`company-nav-btn ${currentView === 'applied-vacancies' ? 'active' : ''}`}
            onClick={() => onNavigate('applied-vacancies')}
          >
            <Briefcase size={15} />
            <span>Applied Vacancies</span>
            {appliedCount > 0 && (
              <span className="company-badge-tag" style={{ padding: '0.1rem 0.45rem', fontSize: '0.65rem' }}>
                {appliedCount}
              </span>
            )}
          </button>

          <button 
            type="button"
            className={`company-nav-btn ${currentView === 'hire-frontend' ? 'active' : ''}`}
            onClick={() => onNavigate('hire-frontend')}
          >
            <Code2 size={15} />
            Frontend Path
          </button>

          <button 
            type="button"
            className={`company-nav-btn ${currentView === 'hire-cybersecurity' ? 'active' : ''}`}
            onClick={() => onNavigate('hire-cybersecurity')}
          >
            <Shield size={15} />
            Cybersecurity Path
          </button>

          <button 
            type="button"
            className={`company-nav-btn ${currentView === 'hire-uiux' ? 'active' : ''}`}
            onClick={() => onNavigate('hire-uiux')}
          >
            <Palette size={15} />
            UI/UX Path
          </button>

          <button 
            type="button"
            className={`company-nav-btn ${currentView === 'trends' ? 'active' : ''}`}
            onClick={() => onNavigate('trends')}
          >
            <TrendingUp size={15} />
            Trends & Market
          </button>
        </nav>
      </div>

      {/* Right: Actions, Company Profile, Switcher, Logout */}
      <div className="company-nav-right">
        {/* Post Vacancy Action */}
        <button 
          type="button"
          className="company-post-btn"
          onClick={onOpenCreateJob}
          title="Post a vacancy and configure your Dream Candidate requirements"
        >
          <Plus size={16} />
          Drop Vacancy
        </button>

        {/* Company Identity Chip */}
        <div className="company-info-chip" title={`${companyName} — ${industry}`}>
          <div className="company-logo-avatar">{companyLogo}</div>
          <div className="company-info-text">
            <span className="company-info-name">{companyName}</span>
            <span className="company-info-role">{industry}</span>
          </div>
        </div>

        {/* Blind Evaluation Privacy Badge */}
        <span 
          className="company-badge-tag" 
          style={{ 
            background: 'rgba(255, 255, 255, 0.04)', 
            color: '#94a3b8', 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
          title="Company has zero access to candidate personal employee accounts or private contact information"
        >
          <Shield size={12} color="#10b981" />
          Blind Evaluation Mode
        </span>

        {/* Secure Logout */}
        <button 
          type="button" 
          className="company-logout-btn"
          onClick={onLogout}
          title="Sign out of employer account"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
