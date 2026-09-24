// src/components/dashboard/UserProfileEditor.jsx
// Form to view and update candidate details, pre-filled automatically
// from AI resume analytics with instant persistence and profile sync.

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Globe, 
  Briefcase, Save, CheckCircle2, RotateCcw, Sparkles, FileText, Link
} from 'lucide-react';
import { updateUserProfile } from '../../lib/dashboard/dashboardStore';

function GithubIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function UserProfileEditor({ dashboard }) {
  const candidate = dashboard?.candidate || {};

  const [formData, setFormData] = useState({
    name: candidate.name || '',
    email: candidate.email || '',
    phone: candidate.phone || '',
    headline: candidate.headline || '',
    location: candidate.location || '',
    bio: candidate.bio || '',
    github: candidate.github || '',
    linkedin: candidate.linkedin || '',
    portfolio: candidate.portfolio || '',
    yearsOfExperience: candidate.yearsOfExperience || 3,
    targetRole: candidate.targetRole || 'Frontend Developer',
    experienceLevel: candidate.experienceLevel || 'Intermediate'
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (dashboard?.candidate) {
      setFormData({
        name: dashboard.candidate.name || '',
        email: dashboard.candidate.email || '',
        phone: dashboard.candidate.phone || '',
        headline: dashboard.candidate.headline || '',
        location: dashboard.candidate.location || '',
        bio: dashboard.candidate.bio || '',
        github: dashboard.candidate.github || '',
        linkedin: dashboard.candidate.linkedin || '',
        portfolio: dashboard.candidate.portfolio || '',
        yearsOfExperience: dashboard.candidate.yearsOfExperience || 3,
        targetRole: dashboard.candidate.targetRole || 'Frontend Developer',
        experienceLevel: dashboard.candidate.experienceLevel || 'Intermediate'
      });
    }
  }, [dashboard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    setSaveSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSaveSuccess(true);
    setIsDirty(false);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="user-profile-editor animate-fade-in">
      <div className="section-header-compact mb-4 flex-row justify-between items-center">
        <div>
          <div className="flex-row items-center gap-2">
            <User size={20} className="text-cyan" />
            <h3 className="section-title-sm text-white">Candidate Account Details & Contact</h3>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Details automatically extracted from your resume via Gemini AI analytics. You can edit, customize, and save changes here anytime.
          </p>
        </div>

        {saveSuccess && (
          <div className="save-success-badge animate-fade-in">
            <CheckCircle2 size={14} className="text-emerald" />
            <span>Profile Saved & Synchronized!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="profile-form-grid">
        {/* Personal & Contact Section */}
        <div className="profile-form-card">
          <div className="card-subhead flex-row items-center gap-2 mb-3">
            <User size={16} className="text-cyan" />
            <h4 className="text-sm font-semibold text-white">Primary Identity</h4>
            <span className="ai-extracted-tag">
              <Sparkles size={10} />
              <span>AI Extracted</span>
            </span>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-xs text-muted">Full Legal Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              className="form-input-dark" 
              placeholder="e.g. Alex Chen" 
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-xs text-muted">Professional Headline / Current Title</label>
            <input 
              type="text" 
              name="headline" 
              value={formData.headline} 
              onChange={handleChange}
              className="form-input-dark" 
              placeholder="e.g. Senior Frontend Software Engineer" 
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group mb-3">
              <label className="form-label text-xs text-muted flex-row items-center gap-1">
                <Mail size={12} />
                <span>Email Address</span>
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="form-input-dark" 
                placeholder="candidate@example.com" 
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-xs text-muted flex-row items-center gap-1">
                <Phone size={12} />
                <span>Phone Number</span>
              </label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                className="form-input-dark" 
                placeholder="+1 (555) 000-0000" 
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group mb-3">
              <label className="form-label text-xs text-muted flex-row items-center gap-1">
                <MapPin size={12} />
                <span>Location</span>
              </label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                className="form-input-dark" 
                placeholder="e.g. San Francisco, CA / Remote" 
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-xs text-muted">Years of Experience</label>
              <input 
                type="number" 
                name="yearsOfExperience" 
                min="0"
                max="30"
                value={formData.yearsOfExperience} 
                onChange={handleChange}
                className="form-input-dark" 
              />
            </div>
          </div>
        </div>

        {/* Links & Professional Summary */}
        <div className="profile-form-card">
          <div className="card-subhead flex-row items-center gap-2 mb-3">
            <Globe size={16} className="text-emerald" />
            <h4 className="text-sm font-semibold text-white">Social & Portfolio Links</h4>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-xs text-muted flex-row items-center gap-1">
              <GithubIcon />
              <span>GitHub Profile URL</span>
            </label>
            <input 
              type="url" 
              name="github" 
              value={formData.github} 
              onChange={handleChange}
              className="form-input-dark font-mono text-xs" 
              placeholder="https://github.com/username" 
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-xs text-muted flex-row items-center gap-1">
              <LinkedinIcon />
              <span>LinkedIn Profile URL</span>
            </label>
            <input 
              type="url" 
              name="linkedin" 
              value={formData.linkedin} 
              onChange={handleChange}
              className="form-input-dark font-mono text-xs" 
              placeholder="https://linkedin.com/in/username" 
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-xs text-muted flex-row items-center gap-1">
              <Globe size={12} />
              <span>Personal Portfolio / Blog URL</span>
            </label>
            <input 
              type="url" 
              name="portfolio" 
              value={formData.portfolio} 
              onChange={handleChange}
              className="form-input-dark font-mono text-xs" 
              placeholder="https://myportfolio.dev" 
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-xs text-muted">Professional Bio & Career Objective</label>
            <textarea 
              name="bio" 
              rows="3"
              value={formData.bio} 
              onChange={handleChange}
              className="form-textarea-dark text-xs" 
              placeholder="Brief summary of your production strengths, technical scope, and engineering philosophy..."
            />
          </div>
        </div>

        {/* Form Action Controls */}
        <div className="profile-form-actions-full">
          <button 
            type="submit" 
            className="btn btn-primary flex-row items-center gap-2"
          >
            <Save size={15} />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
