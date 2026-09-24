// src/components/tools/frontend/JiraTool.jsx
import React, { useState } from 'react';
import { 
  CheckSquare, AlertCircle, Clock, User, Tag, 
  ExternalLink, CheckCircle2, ChevronRight, FileText, Bug
} from 'lucide-react';

export default function JiraTool({ missionData, workspaceState, onUpdateJiraStatus }) {
  const [ticketStatus, setTicketStatus] = useState(workspaceState?.jiraStatus || 'In Progress');
  const [criteria, setCriteria] = useState([
    { id: 'c1', text: 'Reproduce 504 Gateway Timeout in Live Browser preview', checked: true },
    { id: 'c2', text: 'Implement exponential backoff retry in src/services/checkoutApi.js', checked: workspaceState?.feCodePatched || false },
    { id: 'c3', text: 'Fix floating point currency precision in calculateCartTotal()', checked: workspaceState?.feCodePatched || false },
    { id: 'c4', text: 'Execute `npm test` and verify 4/4 Vitest assertions pass', checked: workspaceState?.testsPassed || false },
    { id: 'c5', text: 'Commit changes to Git branch fix/prod-4092-checkout-timeout', checked: workspaceState?.gitCommitted || false }
  ]);

  const toggleCriteria = (id) => {
    setCriteria(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleStatusChange = (newStatus) => {
    setTicketStatus(newStatus);
    if (onUpdateJiraStatus) {
      onUpdateJiraStatus(newStatus);
    }
  };

  const completedCount = criteria.filter(c => c.checked).length;
  const progressPercent = Math.round((completedCount / criteria.length) * 100);

  return (
    <div className="jira-container">
      {/* Top Jira Breadcrumbs & Status Bar */}
      <div className="jira-top-bar">
        <div className="jira-breadcrumbs">
          <span>DAYONE PAY</span>
          <ChevronRight size={14} />
          <span>PROD SPRINT 42</span>
          <ChevronRight size={14} />
          <span className="jira-key">PROD-4092</span>
        </div>

        <div className="jira-actions-row">
          <span className="status-label">Status:</span>
          <select 
            className={`jira-status-select status-${ticketStatus.toLowerCase().replace(/\s+/g, '-')}`}
            value={ticketStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Code Review">Code Review</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {/* Main Ticket Layout */}
      <div className="jira-content-grid">
        {/* Left Column: Description & Acceptance Criteria */}
        <div className="jira-main-column">
          <div className="jira-title-row">
            <span className="jira-issue-type">
              <Bug size={16} />
              <span>Bug</span>
            </span>
            <h2 className="jira-summary">
              [P1 CRITICAL] Checkout API times out on 3G/4G connections with unhandled promise rejection
            </h2>
          </div>

          <div className="jira-section">
            <h4 className="jira-section-title">Issue Description</h4>
            <div className="jira-description-box">
              <p>
                Mobile shoppers in APAC and EU experiencing high latency report the payment button hangs in 
                "Processing Payment..." indefinitely. Sentry alerts confirm recurring <code>504 Gateway Timeout</code> 
                and uncaught exceptions when <code>fetch</code> resolves with non-200 status codes.
              </p>
              <div className="jira-code-snippet">
                <span className="snippet-title">Sentry Exception Trace:</span>
                <code>
                  Error: Uncaught (in promise) Gateway Timeout (504){'\n'}
                  &nbsp;&nbsp;at submitCheckout (checkoutApi.js:8:11){'\n'}
                  &nbsp;&nbsp;at handleClick (CheckoutButton.jsx:14:26)
                </code>
              </div>
            </div>
          </div>

          <div className="jira-section">
            <div className="flex-row justify-between items-center mb-2">
              <h4 className="jira-section-title">Acceptance Criteria Checklist</h4>
              <span className="text-accent text-sm font-semibold">{progressPercent}% Completed</span>
            </div>
            
            <div className="criteria-progress-bar">
              <div className="criteria-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="criteria-checklist">
              {criteria.map(item => (
                <div 
                  key={item.id} 
                  className={`criteria-item ${item.checked ? 'completed' : ''}`}
                  onClick={() => toggleCriteria(item.id)}
                >
                  <div className="checkbox-custom">
                    {item.checked && <CheckCircle2 size={16} className="text-success" />}
                  </div>
                  <span className="criteria-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Meta Fields */}
        <div className="jira-sidebar-column">
          <div className="jira-meta-panel">
            <div className="meta-field-row">
              <span className="meta-label">Priority:</span>
              <span className="priority-badge-p1">
                <AlertCircle size={14} />
                <span>P1 - Blocker</span>
              </span>
            </div>

            <div className="meta-field-row">
              <span className="meta-label">Assignee:</span>
              <div className="meta-user">
                <span className="avatar-initials">AR</span>
                <span>Alex Rivera (You)</span>
              </div>
            </div>

            <div className="meta-field-row">
              <span className="meta-label">Reporter:</span>
              <div className="meta-user">
                <span className="avatar-initials">SL</span>
                <span>Sarah Lin (Lead)</span>
              </div>
            </div>

            <div className="meta-field-row">
              <span className="meta-label">Story Points:</span>
              <span className="badge-pill-xs">5 Points</span>
            </div>

            <div className="meta-field-row">
              <span className="meta-label">Sprint:</span>
              <span>DayOne Core Sprint 42</span>
            </div>

            <div className="meta-field-row">
              <span className="meta-label">Target Release:</span>
              <span>v2.14.0-rc2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
