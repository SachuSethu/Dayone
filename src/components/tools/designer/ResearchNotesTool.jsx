// src/components/tools/designer/ResearchNotesTool.jsx
import React from 'react';
import { BookOpen, StickyNote, Activity, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';

export default function ResearchNotesTool() {
  return (
    <div className="research-notes-container">
      {/* Header */}
      <div className="notes-header-bar">
        <div className="flex-row items-center gap-2">
          <BookOpen size={20} className="text-accent" />
          <h3 className="notes-title">UX Research Synthesis & Usability Benchmarks</h3>
        </div>
        <span className="badge-pill-xs">N = 40 Usability Participants</span>
      </div>

      {/* SUS Benchmark Comparison */}
      <div className="sus-card">
        <div className="flex-row justify-between items-center mb-2">
          <div>
            <h4 className="sus-title">System Usability Scale (SUS) Diagnostic</h4>
            <span className="text-xs text-muted">Industry average is 68. Scores below 68 indicate serious usability deficiencies.</span>
          </div>
          <div className="sus-scores-badge">
            <span className="score-current text-danger">Current: 54 (Grade F)</span>
            <span className="score-arrow">→</span>
            <span className="score-target text-success">Target: 82 (Grade A)</span>
          </div>
        </div>

        <div className="sus-bar-track">
          <div className="sus-fill-current" style={{ width: '54%' }}>
            <span>54</span>
          </div>
          <div className="sus-marker-target" style={{ left: '82%' }}>
            <span>Target: 82</span>
          </div>
        </div>
      </div>

      {/* Affinity Mapping Grid */}
      <div className="affinity-grid-container mt-4">
        <h4 className="card-section-title mb-2">Affinity Clustering & Design Insights</h4>
        
        <div className="affinity-columns">
          {/* Cluster 1: Transparency */}
          <div className="affinity-col col-yellow">
            <div className="col-header">
              <span className="col-name">1. Pricing Transparency</span>
              <span className="note-count">6 Cards</span>
            </div>
            <div className="sticky-notes-stack">
              <div className="sticky-card">
                "Users perceive unexpected shipping costs as deceptive dark patterns."
              </div>
              <div className="sticky-card">
                "Adding a dynamic shipping zip code estimator in Step 1 drops cart abandonment by an estimated 18%."
              </div>
            </div>
          </div>

          {/* Cluster 2: Touch Ergonomics */}
          <div className="affinity-col col-blue">
            <div className="col-header">
              <span className="col-name">2. Mobile Ergonomics</span>
              <span className="note-count">5 Cards</span>
            </div>
            <div className="sticky-notes-stack">
              <div className="sticky-card">
                "Average adult thumb width is 45-57px. 32px touch targets violate Fitts's Law on mobile screens."
              </div>
              <div className="sticky-card">
                "Increase primary action button height to 48px with 16px minimum vertical separation."
              </div>
            </div>
          </div>

          {/* Cluster 3: Heuristics */}
          <div className="affinity-col col-green">
            <div className="col-header">
              <span className="col-name">3. Heuristic Visibility</span>
              <span className="note-count">4 Cards</span>
            </div>
            <div className="sticky-notes-stack">
              <div className="sticky-card">
                "Nielsen #1 (Visibility of System Status): Stepper must explicitly show total steps remaining."
              </div>
              <div className="sticky-card">
                "Nielsen #5 (Error Prevention): Inline validation for credit card numbers before submit."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
