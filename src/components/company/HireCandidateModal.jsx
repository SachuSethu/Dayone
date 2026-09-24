// src/components/company/HireCandidateModal.jsx
// Offer Generation & Hiring Confirmation Modal for Recruiters

import React, { useState } from 'react';
import { 
  X, CheckCircle2, DollarSign, Calendar, MapPin, 
  Send, Sparkles, Building2, User, Award, ShieldCheck 
} from 'lucide-react';

export default function HireCandidateModal({
  candidate,
  company,
  onConfirmHire,
  onClose
}) {
  const [offerRole, setOfferRole] = useState(candidate?.targetRole || 'Software Engineer');
  const [salaryPackage, setSalaryPackage] = useState('$85,000 - $110,000 / year');
  const [startDate, setStartDate] = useState('Immediate / Next Monday');
  const [workArrangement, setWorkArrangement] = useState('Hybrid / Remote');
  const [message, setMessage] = useState(
    `Hello ${candidate?.name},\n\nBased on your outstanding DAYONE simulation results and verified skill proficiency, ${company?.companyName || 'our engineering team'} is delighted to extend this formal job offer. We look forward to building high-impact technology together!`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!candidate) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      onConfirmHire({
        offerRole,
        salaryPackage,
        startDate,
        workArrangement,
        message
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1400);
    }, 600);
  };

  return (
    <div className="company-modal-backdrop" onClick={onClose}>
      <div 
        className="company-modal-panel animate-fade" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
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
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
                Extend Offer & Hire
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af' }}>
                Hiring {candidate.name} ({candidate.targetRole})
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
            <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              Job Offer Extended Successfully!
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
              {candidate.name} has been added to your hired talent pool. Candidate status updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="company-modal-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Candidate Quick Stats */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ fontSize: '1.4rem' }}>{candidate.avatar || '👤'}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{candidate.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      {candidate.candidateTag || '#C-VERIFIED'} • {candidate.targetRole} • <span style={{ color: '#10b981' }}>🔒 Blind Evaluation</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
                    {candidate.overallPerformance || 88}%
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                    Performance Score
                  </div>
                </div>
              </div>

              {/* Offer Role */}
              <div className="filter-group">
                <label className="filter-label">Official Job Role Title</label>
                <input 
                  type="text" 
                  value={offerRole}
                  onChange={(e) => setOfferRole(e.target.value)}
                  className="filter-select"
                  required
                />
              </div>

              {/* Two columns: Salary + Arrangement */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="filter-group">
                  <label className="filter-label">Compensation Package</label>
                  <input 
                    type="text" 
                    value={salaryPackage}
                    onChange={(e) => setSalaryPackage(e.target.value)}
                    className="filter-select"
                    required
                  />
                </div>
                <div className="filter-group">
                  <label className="filter-label">Work Arrangement</label>
                  <select 
                    value={workArrangement}
                    onChange={(e) => setWorkArrangement(e.target.value)}
                    className="filter-select"
                  >
                    <option value="Hybrid / Remote">Hybrid / Remote</option>
                    <option value="100% Remote">100% Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              {/* Start Date */}
              <div className="filter-group">
                <label className="filter-label">Expected Start Date</label>
                <input 
                  type="text" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="filter-select"
                />
              </div>

              {/* Message to candidate */}
              <div className="filter-group">
                <label className="filter-label">Welcome & Offer Letter Notes</label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="filter-select"
                  style={{ resize: 'vertical' }}
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
                {isSubmitting ? 'Transmitting Offer...' : 'Confirm & Hire Candidate'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
