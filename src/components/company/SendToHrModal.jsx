// src/components/company/SendToHrModal.jsx
// Modal for Transmitting AI-Shortlisted Candidate Applications directly to Company HR

import React, { useState } from 'react';
import { 
  X, Send, CheckCircle2, Shield, Mail, FileText, 
  Sparkles, Award, ArrowRight, Building2, UserCheck, Calendar 
} from 'lucide-react';

export default function SendToHrModal({
  application,
  company,
  onConfirmSend,
  onClose
}) {
  const [hrEmail, setHrEmail] = useState(company?.email || 'hiring@technova.io');
  const [interviewType, setInterviewType] = useState('Fast-Track Technical Panel (AI Verified)');
  const [notes, setNotes] = useState(
    `DayOne AI has shortlisted candidate ${application?.candidateTag || application?.candidateName} for the ${application?.jobTitle} position with a verified ${application?.aiShortlist?.fitScore || 90}% match score. Recommend scheduling a 45-minute technical panel.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!application) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onConfirmSend(application.applicationId, {
        hrEmail,
        interviewType,
        notes
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1600);
    }, 600);
  };

  return (
    <div className="company-modal-backdrop" onClick={onClose}>
      <div 
        className="company-modal-panel animate-fade" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        {/* Header */}
        <div className="company-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '8px', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Send size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: 800 }}>
                Transmit to Company HR
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af' }}>
                Forwarding AI-shortlisted dossier to {company?.companyName} Talent Acquisition
              </p>
            </div>
          </div>

          <button type="button" className="company-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              border: '2px solid #10b981'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>
              Dossier Transmitted to HR Lead!
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0, maxWidth: '420px', marginInline: 'auto' }}>
              Successfully dispatched to <strong>{hrEmail}</strong> with AI Shortlisting verification receipt <code>#HR-TX-{Date.now().toString().slice(-5)}</code>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="company-modal-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Candidate & AI Match Summary Box */}
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.08)', 
                border: '1px solid rgba(16, 185, 129, 0.25)', 
                borderRadius: '12px', 
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>
                      {application.candidateName}
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                      {application.candidateTag || '#C-VERIFIED'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
                    Applied for: <strong>{application.jobTitle}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={13} color="#10b981" />
                    Attached: <strong>{application.cvName || 'DayOne_ATS_Resume.pdf'}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>
                    {application.aiShortlist?.fitScore || 92}%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
                    AI Match Score
                  </div>
                </div>
              </div>

              {/* Destination HR Work Email */}
              <div className="filter-group">
                <label className="filter-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={13} /> Destination Company HR Email
                </label>
                <input 
                  type="email"
                  className="filter-select"
                  value={hrEmail}
                  onChange={(e) => setHrEmail(e.target.value)}
                  placeholder="hr@company.com"
                  required
                />
              </div>

              {/* Recommended Action */}
              <div className="filter-group">
                <label className="filter-label">Recommended Interview Flow</label>
                <select 
                  className="filter-select"
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                >
                  <option value="Fast-Track Technical Panel (AI Verified)">Fast-Track Technical Panel (AI Verified)</option>
                  <option value="Direct 1:1 with Engineering Lead">Direct 1:1 with Engineering Lead</option>
                  <option value="Standard Technical Interview">Standard Technical Interview</option>
                </select>
              </div>

              {/* HR Notes / Dossier Cover */}
              <div className="filter-group">
                <label className="filter-label">AI Dossier Executive Summary & HR Notes</label>
                <textarea 
                  rows={3}
                  className="filter-select"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ resize: 'vertical' }}
                  required
                />
              </div>
            </div>

            {/* Footer */}
            <div className="company-modal-footer">
              <button 
                type="button" 
                className="company-btn-sm-view"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="company-post-btn"
                disabled={isSubmitting}
                style={{ padding: '0.65rem 1.4rem' }}
              >
                <Send size={15} />
                {isSubmitting ? 'Transmitting...' : 'Confirm & Transmit to HR'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
