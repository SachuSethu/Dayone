// src/components/resume/ResumeUploader.jsx
// Mandatory / Must-fill Resume Upload step. Users cannot skip this page.
// Supports drag-and-drop PDF files, local file browsing, and instant 1-click sample profiles.

import React, { useState, useRef } from 'react';
import { SAMPLE_RESUMES } from '../../data/sampleResumes';
import { 
  UploadCloud, FileText, CheckCircle2, AlertCircle, 
  ArrowRight, ArrowLeft, Sparkles, Shield, Lock, FileCheck, RefreshCw
} from 'lucide-react';

export default function ResumeUploader({ 
  targetRole, 
  onBack, 
  onSubmitResume, 
  currentUser 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeTextContent, setResumeTextContent] = useState('');
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'sample' | 'paste'
  const [sampleKey, setSampleKey] = useState(targetRole?.id || 'frontend-developer');
  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);

  // Handle Drag Over & Leave
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle File Drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setValidationError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  // Handle File Change from input
  const handleFileInputChange = (e) => {
    setValidationError('');
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    const validExtensions = ['.pdf', '.txt', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      setValidationError('Please upload a valid document (.pdf, .docx, or .txt). PDF is recommended.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setValidationError('File size exceeds the 10MB limit. Please upload a smaller document.');
      return;
    }

    setSelectedFile(file);
    setInputMode('upload');
  };

  // Load Sample Profile
  const handleLoadSample = (roleId) => {
    setValidationError('');
    setSampleKey(roleId);
    const sample = SAMPLE_RESUMES[roleId] || SAMPLE_RESUMES['frontend-developer'];
    setSelectedFile(null);
    setResumeTextContent(sample.text);
    setInputMode('sample');
  };

  // Reset File
  const handleClearSelection = () => {
    setSelectedFile(null);
    setResumeTextContent('');
    setValidationError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit Handler - strictly validates that resume input is present
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (inputMode === 'upload') {
      if (!selectedFile) {
        setValidationError('A resume document is strictly required to proceed. Please upload your PDF resume or select a verified sample profile.');
        return;
      }
      setIsProcessing(true);
      try {
        await onSubmitResume({
          type: 'file',
          file: selectedFile,
          fileName: selectedFile.name
        });
      } catch (err) {
        setValidationError(err.message || 'Error parsing resume file.');
        setIsProcessing(false);
      }
    } else if (inputMode === 'sample') {
      const sample = SAMPLE_RESUMES[sampleKey] || SAMPLE_RESUMES[targetRole?.id] || SAMPLE_RESUMES['frontend-developer'];
      setIsProcessing(true);
      try {
        await onSubmitResume({
          type: 'text',
          text: sample.text,
          fileName: sample.fileName
        });
      } catch (err) {
        setValidationError(err.message || 'Error submitting sample resume.');
        setIsProcessing(false);
      }
    } else if (inputMode === 'paste') {
      if (!resumeTextContent || resumeTextContent.trim().length < 60) {
        setValidationError('Please paste sufficient resume text (at least 60 characters) detailing your technical work and skills.');
        return;
      }
      setIsProcessing(true);
      try {
        await onSubmitResume({
          type: 'text',
          text: resumeTextContent,
          fileName: 'Pasted_Resume_Profile.txt'
        });
      } catch (err) {
        setValidationError(err.message || 'Error processing resume text.');
        setIsProcessing(false);
      }
    }
  };

  const currentSample = SAMPLE_RESUMES[sampleKey] || SAMPLE_RESUMES[targetRole?.id] || SAMPLE_RESUMES['frontend-developer'];

  return (
    <div className="resume-uploader-page">
      {/* Top Banner Navigation */}
      <header className="target-role-header">
        <div className="brand-group">
          <div className="brand-logo-mark">DayOne<span>.ai</span></div>
          <span className="platform-tag">Job-Readiness Intelligence</span>
        </div>

        <div className="flow-stepper">
          <div className="flow-step completed" onClick={onBack} role="button" tabIndex={0}>
            <span className="step-circle">✓</span>
            <span className="step-text">Target: {targetRole?.name || 'Role'}</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step current">
            <span className="step-circle">2</span>
            <span className="step-text">Resume Intelligence (Must-Fill)</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step pending">
            <span className="step-circle">3</span>
            <span className="step-text">Skill Gap Diagnostics</span>
          </div>
          <span className="flow-divider">/</span>
          <div className="flow-step pending">
            <span className="step-circle">4</span>
            <span className="step-text">First-Day Simulation</span>
          </div>
        </div>

        <div className="user-nav-actions">
          <span className="mandatory-badge">
            <Lock size={12} />
            <span>Non-Skippable Step</span>
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="resume-uploader-container">
        {/* Breadcrumb / Back button */}
        <div className="uploader-header-meta">
          <button className="btn-back-link" onClick={onBack} disabled={isProcessing}>
            <ArrowLeft size={15} />
            <span>Change Target Role</span>
          </button>
          <div className="active-target-pill">
            <span className="pill-prefix">Evaluating For:</span>
            <strong className="pill-name">{targetRole?.name}</strong>
          </div>
        </div>

        <div className="uploader-hero">
          <div className="hero-badge required-badge">
            <AlertCircle size={14} className="alert-badge-icon" />
            <span>MANDATORY STEP • RESUME INTELLIGENCE</span>
          </div>
          <h1 className="hero-title">Submit Candidate Resume</h1>
          <p className="hero-description">
            DayOne’s AI Evaluation Engine extracts real project evidence, audits accredited certifications, 
            benchmarks demonstrated competencies against <strong>{targetRole?.name}</strong> production requirements, 
            and generates your customized first-day workplace mission.
          </p>
        </div>

        {/* Tab mode toggle: Upload File vs Sample Demo vs Paste */}
        <div className="input-mode-tabs">
          <button 
            type="button"
            className={`mode-tab-btn ${inputMode === 'upload' ? 'active' : ''}`}
            onClick={() => { setInputMode('upload'); setValidationError(''); }}
          >
            <UploadCloud size={16} />
            <span>Upload Document (.PDF / .DOCX)</span>
          </button>

          <button 
            type="button"
            className={`mode-tab-btn ${inputMode === 'sample' ? 'active' : ''}`}
            onClick={() => handleLoadSample(targetRole?.id || 'frontend-developer')}
          >
            <Sparkles size={16} />
            <span>Instant Demo Profile (1-Click Test)</span>
          </button>

          <button 
            type="button"
            className={`mode-tab-btn ${inputMode === 'paste' ? 'active' : ''}`}
            onClick={() => { setInputMode('paste'); setValidationError(''); }}
          >
            <FileText size={16} />
            <span>Paste Resume Text</span>
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="uploader-form-card">
          {/* MODE 1: FILE DRAG AND DROP */}
          {inputMode === 'upload' && (
            <div className="upload-dropzone-wrapper">
              <input 
                ref={fileInputRef}
                type="file" 
                id="resume-file-input"
                accept=".pdf,.docx,.txt"
                onChange={handleFileInputChange}
                className="hidden-file-input"
              />

              {!selectedFile ? (
                <div 
                  className={`dropzone-surface ${dragActive ? 'drag-over' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="dropzone-icon-circle">
                    <UploadCloud size={36} className="upload-icon" />
                  </div>
                  <h3 className="dropzone-title">Drag & drop your resume PDF here</h3>
                  <p className="dropzone-subtitle">
                    or <span className="browse-link">browse files</span> from your computer
                  </p>
                  <div className="dropzone-specs">
                    <span className="spec-tag">PDF Recommended</span>
                    <span className="spec-tag">DOCX</span>
                    <span className="spec-tag">TXT</span>
                    <span className="spec-tag">Max 10MB</span>
                  </div>
                </div>
              ) : (
                <div className="file-selected-card">
                  <div className="file-info-col">
                    <div className="file-type-icon">
                      <FileCheck size={28} className="file-check-icon" />
                    </div>
                    <div className="file-details">
                      <h4 className="file-name">{selectedFile.name}</h4>
                      <div className="file-meta">
                        <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                        <span className="dot-divider">•</span>
                        <span className="file-status ready">Ready for AI Evaluation</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-change-file" 
                    onClick={handleClearSelection}
                  >
                    Change File
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: INSTANT SAMPLE PROFILE */}
          {inputMode === 'sample' && (
            <div className="sample-profiles-wrapper">
              <div className="sample-selector-bar">
                <span className="sample-selector-label">Select Demo Candidate Profile:</span>
                <div className="sample-chips">
                  {Object.entries(SAMPLE_RESUMES).map(([id, sample]) => (
                    <button
                      key={id}
                      type="button"
                      className={`sample-chip ${sampleKey === id ? 'active' : ''}`}
                      onClick={() => handleLoadSample(id)}
                    >
                      {sample.name.split('—')[0].trim()} ({sample.name.split('—')[1]?.trim() || id})
                    </button>
                  ))}
                </div>
              </div>

              <div className="sample-preview-card">
                <div className="sample-preview-header">
                  <div className="sample-header-title">
                    <FileText size={18} className="sample-file-icon" />
                    <strong>{currentSample.fileName}</strong>
                    <span className="sample-badge">Verified Test Document</span>
                  </div>
                  <span className="sample-role-tag">Mapped: {currentSample.roleId}</span>
                </div>
                <pre className="sample-text-viewport">
                  {currentSample.text.slice(0, 750)}...
                </pre>
                <div className="sample-footer-note">
                  ✓ Pre-loaded with verified technical projects, work experience, and technology stacks.
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: PASTE RESUME TEXT */}
          {inputMode === 'paste' && (
            <div className="paste-text-wrapper">
              <label htmlFor="pasted-resume-area" className="paste-label">
                Paste Resume Text or LinkedIn Experience Summary:
              </label>
              <textarea 
                id="pasted-resume-area"
                rows={10}
                className="paste-textarea"
                placeholder="Paste the full text of your resume here, including technical skills, work experience, projects, and education..."
                value={resumeTextContent}
                onChange={(e) => setResumeTextContent(e.target.value)}
              />
              <div className="paste-char-counter">
                {resumeTextContent.length} characters (minimum 60 required)
              </div>
            </div>
          )}

          {/* Validation Error Banner */}
          {validationError && (
            <div className="validation-error-alert">
              <AlertCircle size={18} className="error-icon" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Security & Strict Compliance Notice */}
          <div className="privacy-security-notice">
            <Shield size={15} className="shield-icon" />
            <p>
              <strong>Strict AI Evaluation Standards:</strong> Courses without accredited certification credentials are 
              not counted as verified skills. Projects must include concrete project info (technologies, architecture); 
              skills lacking project details are scored at zero (0%).
            </p>
          </div>

          {/* Submit Action Bar */}
          <div className="uploader-action-bar">
            <div className="must-fill-reminder">
              <span className="lock-dot">●</span>
              <span>Must-fill step. Cannot skip without submitting resume data.</span>
            </div>

            <button 
              type="submit" 
              className="btn-submit-resume"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={17} className="spin-icon" />
                  <span>Preparing Analysis...</span>
                </>
              ) : (
                <>
                  <span>Analyze Resume with AI Evaluation</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
