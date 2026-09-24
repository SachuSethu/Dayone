// src/components/AuthPage.jsx
// DayOne.ai — Role-based Authentication (Candidate vs Employer/Hiring)
// Optimized UI with smooth hardware-accelerated toggle animations, micro-interactions,
// and dedicated employer registration & dashboard routing.

import React, { useState } from 'react';
import { Check, X, Building2, User, Sparkles, Shield, Briefcase } from 'lucide-react';
import { setCompanySession, SEED_COMPANIES } from '../lib/company/companyStore';

export default function AuthPage({ onLogin }) {
  // Role selector: 'candidate' | 'company'
  const [accountType, setAccountType] = useState('candidate');

  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');

  // Candidate Form States
  const [candLoginEmail, setCandLoginEmail] = useState('');
  const [candLoginPassword, setCandLoginPassword] = useState('');
  const [candRegEmail, setCandRegEmail] = useState('');
  const [candRegPassword, setCandRegPassword] = useState('');
  const [candRegConfirmPassword, setCandRegConfirmPassword] = useState('');

  // Employer Form States
  const [compLoginEmail, setCompLoginEmail] = useState('');
  const [compLoginPassword, setCompLoginPassword] = useState('');
  const [compRegName, setCompRegName] = useState('');
  const [compRegEmail, setCompRegEmail] = useState('');
  const [compRegIndustry, setCompRegIndustry] = useState('Enterprise AI & Cloud Infrastructure');
  const [compRegLocation, setCompRegLocation] = useState('Bengaluru, India (Hybrid)');
  const [compRegPassword, setCompRegPassword] = useState('');
  const [compRegConfirmPassword, setCompRegConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  // Password criteria for Candidate
  const candHasMinLength = candRegPassword.length >= 8;
  const candHasNumber = /\d/.test(candRegPassword);
  const candHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(candRegPassword);
  const candPasswordsMatch = candRegPassword.length > 0 && candRegPassword === candRegConfirmPassword;
  const isCandPasswordValid = candHasMinLength && candHasNumber && candHasSpecialChar;

  // Password criteria for Company
  const compHasMinLength = compRegPassword.length >= 8;
  const compHasNumber = /\d/.test(compRegPassword);
  const compHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(compRegPassword);
  const compPasswordsMatch = compRegPassword.length > 0 && compRegPassword === compRegConfirmPassword;
  const isCompPasswordValid = compHasMinLength && compHasNumber && compHasSpecialChar;

  // ================= CANDIDATE HANDLERS =================
  const handleCandLogin = (e) => {
    e.preventDefault();
    if (!candLoginEmail.trim()) {
      setErrorMsg('Please enter your email.');
      return;
    }

    let roleId = 'frontend';
    if (candLoginEmail.includes('cyber') || candLoginEmail.includes('sec')) roleId = 'cybersecurity';
    else if (candLoginEmail.includes('design') || candLoginEmail.includes('ux')) roleId = 'ui_ux';

    const displayName = candLoginEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const userObj = {
      userType: 'candidate',
      name: formattedName || 'Candidate',
      email: candLoginEmail.trim(),
      role: roleId,
      roleName: roleId === 'frontend' ? 'Frontend Developer' : (roleId === 'cybersecurity' ? 'Cybersecurity Analyst' : 'UI/UX Designer'),
      avatar: roleId === 'frontend' ? '👨‍💻' : (roleId === 'cybersecurity' ? '🛡️' : '🎨')
    };

    localStorage.setItem('dayone_user', JSON.stringify(userObj));
    onLogin(userObj);
  };

  const handleCandRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!candRegEmail.trim()) {
      setErrorMsg('Please enter your Gmail / email.');
      return;
    }

    if (!isCandPasswordValid) {
      setErrorMsg('Password must be at least 8 characters, contain 1 number, and 1 special character.');
      return;
    }

    if (candRegPassword !== candRegConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your confirm password.');
      return;
    }

    const displayName = candRegEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const userObj = {
      userType: 'candidate',
      name: formattedName || 'New Candidate',
      email: candRegEmail.trim(),
      role: 'frontend',
      roleName: 'Candidate',
      avatar: '👤'
    };

    localStorage.setItem('dayone_user', JSON.stringify(userObj));
    onLogin(userObj);
  };

  // ================= EMPLOYER HANDLERS =================
  const handleEmployerLogin = (e) => {
    e.preventDefault();
    if (!compLoginEmail.trim()) {
      setErrorMsg('Please enter your company work email.');
      return;
    }

    // Match with seed companies or construct company object
    const matchedSeed = SEED_COMPANIES.find(c => c.email.toLowerCase() === compLoginEmail.trim().toLowerCase());
    
    let companyName = 'TechNova Labs';
    let industry = 'Enterprise AI & Cloud Infrastructure';
    let location = 'Bengaluru, India (Hybrid)';
    let logo = '🚀';

    if (matchedSeed) {
      companyName = matchedSeed.companyName;
      industry = matchedSeed.industry;
      location = matchedSeed.location;
      logo = matchedSeed.logo;
    } else {
      const domainPart = compLoginEmail.split('@')[1]?.split('.')[0] || 'Enterprise';
      companyName = domainPart.charAt(0).toUpperCase() + domainPart.slice(1) + ' Inc';
    }

    const companyUser = {
      userType: 'company',
      companyId: matchedSeed ? matchedSeed.companyId : `company_${Date.now()}`,
      companyName,
      email: compLoginEmail.trim(),
      industry,
      location,
      logo,
      role: 'employer',
      roleName: 'Hiring Manager'
    };

    setCompanySession(companyUser);
    onLogin(companyUser);
  };

  const handlePresetEmployerLogin = (seedComp) => {
    const companyUser = {
      userType: 'company',
      companyId: seedComp.companyId,
      companyName: seedComp.companyName,
      email: seedComp.email,
      industry: seedComp.industry,
      location: seedComp.location,
      logo: seedComp.logo,
      role: 'employer',
      roleName: 'Hiring Manager'
    };

    setCompanySession(companyUser);
    onLogin(companyUser);
  };

  const handleEmployerRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!compRegName.trim()) {
      setErrorMsg('Please enter your company name.');
      return;
    }
    if (!compRegEmail.trim()) {
      setErrorMsg('Please enter your company work email.');
      return;
    }
    if (!isCompPasswordValid) {
      setErrorMsg('Password must be at least 8 characters, contain 1 number, and 1 special character.');
      return;
    }
    if (compRegPassword !== compRegConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your confirm password.');
      return;
    }

    const newCompany = {
      userType: 'company',
      companyId: `company_${Date.now()}`,
      companyName: compRegName.trim(),
      email: compRegEmail.trim(),
      industry: compRegIndustry,
      location: compRegLocation,
      logo: '🏢',
      role: 'employer',
      roleName: 'Talent Acquisition'
    };

    setCompanySession(newCompany);
    onLogin(newCompany);
  };

  return (
    <div className="exact-auth-viewport">
      {/* Background ambient lighting */}
      <div className="exact-ambient-glow"></div>
      <div className="exact-mesh-grid"></div>

      {/* Main Glassmorphic Auth Modal */}
      <div className="exact-auth-modal" style={{ maxWidth: '980px' }}>
        
        {/* Left Side: Brand Identity Banner */}
        <div className="exact-auth-left">
          <div className="exact-brand-icon-wrapper">
            <div className="exact-brand-icon">D</div>
            <div className="exact-brand-pulse"></div>
          </div>
          <h1 className="exact-brand-title">
            {accountType === 'candidate' ? 'DayOne.ai' : 'DAYONE Recruiter'}
          </h1>
          <p className="exact-brand-desc">
            {accountType === 'candidate'
              ? 'AI-powered talent onboarding, skill simulation and verifiable credentialing.'
              : 'Performance-based hiring platform. Evaluate candidates on real workplace challenges, verified task telemetry, and ATS precision.'}
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              <Check size={14} color="#10b981" />
              <span>3 Specialized Paths: Frontend, Cybersecurity, UI/UX</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              <Check size={14} color="#10b981" />
              <span>Dual-Gate Skill Vector Matching (19 Skills)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              <Check size={14} color="#10b981" />
              <span>Synchronized Dynamic Vacancies & ATS Portals</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form Panel */}
        <div className="exact-auth-right">
          
          {/* Overarching Role Selection: Candidate vs Employer */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '0.5rem', 
            background: '#070a12', 
            padding: '4px', 
            borderRadius: '12px', 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '1rem'
          }}>
            <button 
              type="button"
              onClick={() => {
                setAccountType('candidate');
                setErrorMsg('');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem',
                borderRadius: '8px',
                border: 'none',
                background: accountType === 'candidate' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                color: accountType === 'candidate' ? '#042f24' : '#9ca3af',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={15} />
              Candidate / Seeker
            </button>

            <button 
              type="button"
              onClick={() => {
                setAccountType('company');
                setErrorMsg('');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem',
                borderRadius: '8px',
                border: 'none',
                background: accountType === 'company' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                color: accountType === 'company' ? '#042f24' : '#9ca3af',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Building2 size={15} />
              Hiring / Employer
            </button>
          </div>

          {/* Smooth Sliding Pill Toggle Switch: Login vs Register */}
          <div className="exact-toggle-bar">
            <div className={`exact-toggle-slider ${authMode === 'register' ? 'slide-right' : 'slide-left'}`}></div>

            <button 
              type="button"
              className={`exact-toggle-btn ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('login');
                setErrorMsg('');
              }}
            >
              Login
            </button>
            <button 
              type="button"
              className={`exact-toggle-btn ${authMode === 'register' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('register');
                setErrorMsg('');
              }}
            >
              Register
            </button>
          </div>

          {/* Error Banner with Slide-in Animation */}
          {errorMsg && (
            <div className="exact-error-msg animate-fade">
              {errorMsg}
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION A: CANDIDATE FLOW (Preserved 100% Intact)           */}
          {/* ========================================================= */}
          {accountType === 'candidate' && (
            <div key={`cand-${authMode}`} className="exact-form-animated-container">
              {authMode === 'login' ? (
                /* Candidate Login Form */
                <form onSubmit={handleCandLogin} className="exact-form-flow">
                  <h2 className="exact-panel-heading">Candidate Login</h2>
                  <p className="exact-panel-sub">
                    Sign in to continue your skill simulation and view matched vacancies.
                  </p>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Email</label>
                    <input 
                      type="email"
                      className="exact-field-input"
                      value={candLoginEmail}
                      onChange={(e) => setCandLoginEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </div>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Password</label>
                    <input 
                      type="password"
                      className="exact-field-input"
                      value={candLoginPassword}
                      onChange={(e) => setCandLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>

                  <button type="submit" className="exact-gradient-submit-btn">
                    <span>Enter Candidate Dashboard</span>
                  </button>
                </form>
              ) : (
                /* Candidate Register Form */
                <form onSubmit={handleCandRegister} className="exact-form-flow">
                  <h2 className="exact-panel-heading">Create Candidate Account</h2>
                  <p className="exact-panel-sub">
                    Register with Gmail to build your AI skill profile and unlock simulations.
                  </p>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Gmail / Email</label>
                    <input 
                      type="email"
                      className="exact-field-input"
                      value={candRegEmail}
                      onChange={(e) => setCandRegEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      required
                    />
                  </div>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Create password</label>
                    <input 
                      type="password"
                      className="exact-field-input"
                      value={candRegPassword}
                      onChange={(e) => setCandRegPassword(e.target.value)}
                      placeholder="At least 8 chars, 1 number, 1 special"
                      required
                    />

                    {candRegPassword.length > 0 && (
                      <div className="exact-password-criteria-box animate-fade">
                        <span className="criteria-header">Password requirements:</span>
                        <div className="criteria-row">
                          {candHasMinLength ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                          <span className={candHasMinLength ? 'text-success' : 'text-muted'}>At least 8 characters</span>
                        </div>
                        <div className="criteria-row">
                          {candHasNumber ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                          <span className={candHasNumber ? 'text-success' : 'text-muted'}>At least 1 number (0-9)</span>
                        </div>
                        <div className="criteria-row">
                          {candHasSpecialChar ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                          <span className={candHasSpecialChar ? 'text-success' : 'text-muted'}>At least 1 special character (!@#$%^&*)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Confirm password</label>
                    <input 
                      type="password"
                      className={`exact-field-input ${candRegConfirmPassword ? (candPasswordsMatch ? 'input-match' : 'input-mismatch') : ''}`}
                      value={candRegConfirmPassword}
                      onChange={(e) => setCandRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                    />

                    {candRegConfirmPassword.length > 0 && (
                      <div className="criteria-row mt-1 animate-fade">
                        {candPasswordsMatch ? (
                          <>
                            <Check size={12} className="text-success" />
                            <span className="text-success text-xs font-semibold">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <X size={12} className="text-danger" />
                            <span className="text-danger text-xs font-semibold">Passwords do not match</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="exact-gradient-submit-btn">
                    <span>Register to candidate dashboard</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION B: EMPLOYER / COMPANY FLOW                         */}
          {/* ========================================================= */}
          {accountType === 'company' && (
            <div key={`comp-${authMode}`} className="exact-form-animated-container">
              {authMode === 'login' ? (
                /* Employer Login Form */
                <form onSubmit={handleEmployerLogin} className="exact-form-flow">
                  <h2 className="exact-panel-heading">Employer Sign In</h2>
                  <p className="exact-panel-sub">
                    Sign in to your company portal to manage vacancies and review candidates.
                  </p>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Company Work Email</label>
                    <input 
                      type="email"
                      className="exact-field-input"
                      value={compLoginEmail}
                      onChange={(e) => setCompLoginEmail(e.target.value)}
                      placeholder="recruiter@technova.io"
                      required
                    />
                  </div>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Password</label>
                    <input 
                      type="password"
                      className="exact-field-input"
                      value={compLoginPassword}
                      onChange={(e) => setCompLoginPassword(e.target.value)}
                      placeholder="Enter company account password"
                    />
                  </div>

                  <button type="submit" className="exact-gradient-submit-btn">
                    <span>Launch Company Dashboard</span>
                  </button>

                  {/* 1-Click Demo Company Presets for Fast Verification */}
                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                      Fast Demo Login As Employer:
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                      {SEED_COMPANIES.slice(0, 3).map(seed => (
                        <button 
                          key={seed.companyId}
                          type="button"
                          onClick={() => handlePresetEmployerLogin(seed)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            padding: '0.45rem',
                            color: '#e2e8f0',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                        >
                          <span>{seed.logo}</span>
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{seed.companyName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              ) : (
                /* Employer Register Form */
                <form onSubmit={handleEmployerRegister} className="exact-form-flow">
                  <h2 className="exact-panel-heading">Register Company Account</h2>
                  <p className="exact-panel-sub">
                    Set up your enterprise profile and publish vacancies directly to candidates.
                  </p>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Company Legal Name</label>
                    <input 
                      type="text"
                      className="exact-field-input"
                      value={compRegName}
                      onChange={(e) => setCompRegName(e.target.value)}
                      placeholder="e.g. TechNova Labs Inc."
                      required
                    />
                  </div>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Company Work Email</label>
                    <input 
                      type="email"
                      className="exact-field-input"
                      value={compRegEmail}
                      onChange={(e) => setCompRegEmail(e.target.value)}
                      placeholder="recruiter@technova.io"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="exact-field-group">
                      <label className="exact-field-label">Industry Domain</label>
                      <select 
                        className="exact-field-input"
                        value={compRegIndustry}
                        onChange={(e) => setCompRegIndustry(e.target.value)}
                      >
                        <option value="Enterprise AI & Cloud Infrastructure">Enterprise AI & Cloud</option>
                        <option value="FinTech & Consumer SaaS">FinTech & SaaS</option>
                        <option value="Cybersecurity & Defense Ops">Cybersecurity & Defense</option>
                        <option value="Digital Product Design & Systems">Digital Product Design</option>
                        <option value="E-Commerce & High-Throughput Platforms">E-Commerce</option>
                      </select>
                    </div>

                    <div className="exact-field-group">
                      <label className="exact-field-label">Headquarters / Location</label>
                      <input 
                        type="text"
                        className="exact-field-input"
                        value={compRegLocation}
                        onChange={(e) => setCompRegLocation(e.target.value)}
                        placeholder="e.g. Bengaluru / Remote"
                      />
                    </div>
                  </div>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Create password</label>
                    <input 
                      type="password"
                      className="exact-field-input"
                      value={compRegPassword}
                      onChange={(e) => setCompRegPassword(e.target.value)}
                      placeholder="At least 8 chars, 1 number, 1 special"
                      required
                    />

                    {compRegPassword.length > 0 && (
                      <div className="exact-password-criteria-box animate-fade">
                        <span className="criteria-header">Password requirements:</span>
                        <div className="criteria-row">
                          {compHasMinLength ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                          <span className={compHasMinLength ? 'text-success' : 'text-muted'}>At least 8 characters</span>
                        </div>
                        <div className="criteria-row">
                          {compHasNumber ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                          <span className={compHasNumber ? 'text-success' : 'text-muted'}>At least 1 number (0-9)</span>
                        </div>
                        <div className="criteria-row">
                          {compHasSpecialChar ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                          <span className={compHasSpecialChar ? 'text-success' : 'text-muted'}>At least 1 special character (!@#$%^&*)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="exact-field-group">
                    <label className="exact-field-label">Confirm password</label>
                    <input 
                      type="password"
                      className={`exact-field-input ${compRegConfirmPassword ? (compPasswordsMatch ? 'input-match' : 'input-mismatch') : ''}`}
                      value={compRegConfirmPassword}
                      onChange={(e) => setCompRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                    />

                    {compRegConfirmPassword.length > 0 && (
                      <div className="criteria-row mt-1 animate-fade">
                        {compPasswordsMatch ? (
                          <>
                            <Check size={12} className="text-success" />
                            <span className="text-success text-xs font-semibold">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <X size={12} className="text-danger" />
                            <span className="text-danger text-xs font-semibold">Passwords do not match</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="exact-gradient-submit-btn">
                    <span>Create Company Account & Launch</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
