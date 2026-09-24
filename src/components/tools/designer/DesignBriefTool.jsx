// src/components/tools/designer/DesignBriefTool.jsx
import React from 'react';
import { 
  Compass, Target, Users, AlertCircle, CheckCircle2, 
  Layers, Sliders, Sparkles, TrendingUp
} from 'lucide-react';

export default function DesignBriefTool() {
  return (
    <div className="design-brief-container">
      {/* Top Banner */}
      <div className="brief-header-bar">
        <div className="flex-row items-center gap-2">
          <Compass size={20} className="text-accent" />
          <h3 className="brief-title">Design Brief: Mobile Checkout Friction & Drop-Off Overhaul</h3>
        </div>
        <span className="badge-pill-xs font-semibold">Sprint 18 / Q3 Growth</span>
      </div>

      {/* Main Grid */}
      <div className="brief-content-grid">
        {/* Left Column: Context & Personas */}
        <div className="brief-col">
          <div className="brief-card">
            <h4 className="card-section-title">
              <Target size={16} className="text-accent" />
              <span>Problem Statement & Business Context</span>
            </h4>
            <p className="brief-text">
              Over the last 60 days, mobile cart abandonment surged to <strong>38.4%</strong> specifically at Step 3 
              (Shipping & Payment Review). Qualitative feedback indicates customers feel blindsided by undisclosed shipping 
              charges revealed only after inputting credit card numbers, and frequently tap the wrong button due to cramped spacing.
            </p>

            <div className="kpi-goals-row">
              <div className="kpi-box">
                <span className="kpi-label">Current Abandonment</span>
                <span className="kpi-val text-danger">38.4%</span>
                <span className="kpi-target">Target: &lt; 20%</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-label">System Usability (SUS)</span>
                <span className="kpi-val text-warning">54 / 100</span>
                <span className="kpi-target">Target: &gt; 80 (Grade A)</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-label">Mobile Touch Targets</span>
                <span className="kpi-val text-danger">32px (Failing)</span>
                <span className="kpi-target">Target: &gt;= 48px</span>
              </div>
            </div>
          </div>

          <div className="brief-card mt-3">
            <h4 className="card-section-title">
              <Users size={16} className="text-accent" />
              <span>Target Persona: Maya S. (Commuter Shopper)</span>
            </h4>
            <div className="persona-card">
              <div className="persona-header">
                <div className="persona-avatar">👩‍💼</div>
                <div>
                  <h5 className="persona-name">Maya Stewart (29)</h5>
                  <span className="persona-role">Senior Product Marketing Specialist</span>
                </div>
              </div>
              <ul className="persona-bullets">
                <li><strong>Behavior:</strong> Browses and buys high-value subscriptions on mobile while commuting via subway.</li>
                <li><strong>Pain Point:</strong> "If a site hides fees until the final confirmation, I immediately close the tab. I hate feeling tricked."</li>
                <li><strong>Accessibility:</strong> One-handed phone usage; requires generous tap targets (&gt;= 48px) and strong contrast in bright sunlight.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Requirements & Constraints */}
        <div className="brief-col">
          <div className="brief-card">
            <h4 className="card-section-title">
              <Layers size={16} className="text-accent" />
              <span>Core UX Requirements & Design System Tokens</span>
            </h4>
            
            <div className="requirements-list">
              <div className="req-item">
                <div className="req-icon">
                  <CheckCircle2 size={16} className="text-success" />
                </div>
                <div>
                  <h5 className="req-title">Upfront Pricing & Shipping Disclosure</h5>
                  <p className="req-desc">Display estimated shipping and tax calculators in Step 1 or dynamic sticky summary before payment entry.</p>
                </div>
              </div>

              <div className="req-item">
                <div className="req-icon">
                  <CheckCircle2 size={16} className="text-success" />
                </div>
                <div>
                  <h5 className="req-title">WCAG 2.1 Level AA Contrast Standards</h5>
                  <p className="req-desc">All body copy and interactive labels must maintain at least 4.5:1 contrast against background; headers 3:1.</p>
                </div>
              </div>

              <div className="req-item">
                <div className="req-icon">
                  <CheckCircle2 size={16} className="text-success" />
                </div>
                <div>
                  <h5 className="req-title">Ergonomic 48px Touch Targets</h5>
                  <p className="req-desc">Increase button heights to 48px with 16px minimum spacing buffer to prevent accidental cancellation taps.</p>
                </div>
              </div>

              <div className="req-item">
                <div className="req-icon">
                  <CheckCircle2 size={16} className="text-success" />
                </div>
                <div>
                  <h5 className="req-title">Progressive Step Indicator</h5>
                  <p className="req-desc">Replace ambiguous dot pagination with clear numbered badges (1. Cart → 2. Shipping → 3. Payment).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="brief-card mt-3">
            <h4 className="card-section-title">
              <Sliders size={16} className="text-accent" />
              <span>Design System Tokens (Orbit UI v3.2)</span>
            </h4>
            <div className="tokens-grid">
              <div className="token-item">
                <span className="token-name">Primary Blue:</span>
                <span className="token-value font-mono">#3b82f6</span>
              </div>
              <div className="token-item">
                <span className="token-name">Background:</span>
                <span className="token-value font-mono">#0f172a</span>
              </div>
              <div className="token-item">
                <span className="token-name">Text High:</span>
                <span className="token-value font-mono">#f8fafc (14.2:1)</span>
              </div>
              <div className="token-item">
                <span className="token-name">Border Subtle:</span>
                <span className="token-value font-mono">#334155</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
