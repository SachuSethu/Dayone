// src/components/AuthPage.jsx
// Optimized UI with smooth hardware-accelerated sliding toggle animation and micro-interactions.

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function AuthPage({ onLogin }) {
  // Toggle: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Password criteria validation
  const hasMinLength = regPassword.length >= 8;
  const hasNumber = /\d/.test(regPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(regPassword);
  const passwordsMatch = regPassword.length > 0 && regPassword === regConfirmPassword;
  const isPasswordValid = hasMinLength && hasNumber && hasSpecialChar;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg('Please enter your email.');
      return;
    }

    let roleId = 'frontend';
    if (loginEmail.includes('cyber') || loginEmail.includes('sec')) roleId = 'cybersecurity';
    else if (loginEmail.includes('design') || loginEmail.includes('ux')) roleId = 'ui_ux';

    const displayName = loginEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const userObj = {
      name: formattedName || 'Candidate',
      email: loginEmail.trim(),
      role: roleId,
      roleName: roleId === 'frontend' ? 'Frontend Developer' : (roleId === 'cybersecurity' ? 'Cybersecurity Analyst' : 'UI/UX Designer'),
      avatar: roleId === 'frontend' ? '👨‍💻' : (roleId === 'cybersecurity' ? '🛡️' : '🎨')
    };

    localStorage.setItem('dayone_user', JSON.stringify(userObj));
    onLogin(userObj);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regEmail.trim()) {
      setErrorMsg('Please enter your Gmail / email.');
      return;
    }

    if (!isPasswordValid) {
      setErrorMsg('Password must be at least 8 characters, contain 1 number, and 1 special character.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your confirm password.');
      return;
    }

    const displayName = regEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const userObj = {
      name: formattedName || 'New Candidate',
      email: regEmail.trim(),
      role: 'frontend',
      roleName: 'Candidate',
      avatar: '👤'
    };

    localStorage.setItem('dayone_user', JSON.stringify(userObj));
    onLogin(userObj);
  };

  return (
    <div className="exact-auth-viewport">
      {/* Background ambient lighting */}
      <div className="exact-ambient-glow"></div>
      <div className="exact-mesh-grid"></div>

      {/* Main Glassmorphic Auth Modal */}
      <div className="exact-auth-modal">
        
        {/* Left Side: Brand Identity Banner */}
        <div className="exact-auth-left">
          <div className="exact-brand-icon-wrapper">
            <div className="exact-brand-icon">D</div>
            <div className="exact-brand-pulse"></div>
          </div>
          <h1 className="exact-brand-title">DayOne.ai</h1>
          <p className="exact-brand-desc">
            AI-powered talent onboarding, skill simulation and verifiable credentialing.
          </p>
        </div>

        {/* Right Side: Interactive Form Panel */}
        <div className="exact-auth-right">
          
          {/* Smooth Sliding Pill Toggle Switch */}
          <div className="exact-toggle-bar">
            {/* Sliding Pill Indicator */}
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

          {/* Dynamic Animated Form Content Flow */}
          <div key={authMode} className="exact-form-animated-container">
            {authMode === 'login' ? (
              /* ================= LOGIN FORM ================= */
              <form onSubmit={handleLoginSubmit} className="exact-form-flow">
                <h2 className="exact-panel-heading">Welcome back</h2>
                <p className="exact-panel-sub">
                  You must create an account before you can log in.
                </p>

                <div className="exact-field-group">
                  <label className="exact-field-label">Email</label>
                  <input 
                    type="email"
                    className="exact-field-input"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div className="exact-field-group">
                  <label className="exact-field-label">Create password</label>
                  <input 
                    type="password"
                    className="exact-field-input"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="At least 8 chars, 1 number, 1 special"
                  />
                </div>

                <button type="submit" className="exact-gradient-submit-btn">
                  <span>Login to dashboard</span>
                </button>
              </form>
            ) : (
              /* ================= REGISTER FORM ================= */
              <form onSubmit={handleRegisterSubmit} className="exact-form-flow">
                <h2 className="exact-panel-heading">Create your account</h2>
                <p className="exact-panel-sub">
                  Enter your credentials to create an account.
                </p>

                <div className="exact-field-group">
                  <label className="exact-field-label">Gmail / Email</label>
                  <input 
                    type="email"
                    className="exact-field-input"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    required
                  />
                </div>

                <div className="exact-field-group">
                  <label className="exact-field-label">Create password</label>
                  <input 
                    type="password"
                    className="exact-field-input"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 8 chars, 1 number, 1 special"
                    required
                  />

                  {/* Real-time Password Criteria Checklist */}
                  {regPassword.length > 0 && (
                    <div className="exact-password-criteria-box animate-fade">
                      <span className="criteria-header">Password requirements:</span>
                      <div className="criteria-row">
                        {hasMinLength ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                        <span className={hasMinLength ? 'text-success' : 'text-muted'}>At least 8 characters</span>
                      </div>
                      <div className="criteria-row">
                        {hasNumber ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                        <span className={hasNumber ? 'text-success' : 'text-muted'}>At least 1 number (0-9)</span>
                      </div>
                      <div className="criteria-row">
                        {hasSpecialChar ? <Check size={12} className="text-success" /> : <X size={12} className="text-danger" />}
                        <span className={hasSpecialChar ? 'text-success' : 'text-muted'}>At least 1 special character (!@#$%^&*)</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="exact-field-group">
                  <label className="exact-field-label">Confirm password</label>
                  <input 
                    type="password"
                    className={`exact-field-input ${regConfirmPassword ? (passwordsMatch ? 'input-match' : 'input-mismatch') : ''}`}
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                  />

                  {regConfirmPassword.length > 0 && (
                    <div className="criteria-row mt-1 animate-fade">
                      {passwordsMatch ? (
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
                  <span>Register to dashboard</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
