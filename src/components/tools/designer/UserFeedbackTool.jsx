// src/components/tools/designer/UserFeedbackTool.jsx
import React, { useState } from 'react';
import { 
  SmilePlus, Frown, MessageSquare, Flame, 
  ThumbsDown, Filter, PlayCircle, Star
} from 'lucide-react';

const INTERVIEW_FEEDBACK = [
  {
    id: 1,
    user: 'Sarah M. (UserTesting Session #482)',
    sentiment: 'Frustrated',
    tag: '#hidden-fees',
    quote: "I thought the total was $149, but the moment I clicked 'Pay Now', the screen jumped to $184 with shipping fees I never saw coming. I felt tricked and abandoned my cart immediately.",
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: 'David K. (UserTesting Session #489)',
    sentiment: 'Frustrated',
    tag: '#rage-clicks',
    quote: "The 'Pay' button and 'Cancel' button are right next to each other on mobile. My thumb kept tapping Cancel by mistake, and it wiped out my entire shipping address!",
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    user: 'Elena P. (Customer Survey)',
    sentiment: 'Negative',
    tag: '#contrast-wcag',
    quote: "I was purchasing this outside in the park and couldn't read the gray text on the white background. The credit card expiration month dropdown was unreadable in daylight.",
    timestamp: 'Yesterday'
  },
  {
    id: 4,
    user: 'Marcus T. (UserTesting Session #495)',
    sentiment: 'Neutral',
    tag: '#flow-clarity',
    quote: "The checkout dots at the top didn't tell me how many steps were left. I didn't know if clicking 'Next' would charge me or take me to review.",
    timestamp: '2 days ago'
  }
];

export default function UserFeedbackTool() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showHeatmap, setShowHeatmap] = useState(false);

  const filtered = INTERVIEW_FEEDBACK.filter(item => {
    if (activeFilter === 'ALL') return true;
    return item.tag.includes(activeFilter.toLowerCase());
  });

  return (
    <div className="user-feedback-container">
      {/* Feedback Header */}
      <div className="feedback-header-bar">
        <div className="flex-row items-center gap-2">
          <SmilePlus size={20} className="text-accent" />
          <h3 className="feedback-title">Customer Feedback & Qualitative Synthesis</h3>
        </div>

        <div className="flex-row items-center gap-2">
          <button 
            className={`btn btn-sm ${showHeatmap ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            <Flame size={14} className="text-warning" />
            <span>{showHeatmap ? 'Hide Rage-Click Heatmap' : 'View Mobile Rage-Click Heatmap'}</span>
          </button>
        </div>
      </div>

      {/* Sentiment Overview Cards */}
      <div className="feedback-stats-grid">
        <div className="sentiment-card card-neg">
          <div className="sentiment-header">
            <Frown size={20} className="text-danger" />
            <span className="font-semibold text-danger">76% Negative Sentiment</span>
          </div>
          <p className="sentiment-sub">Primary driver: Undisclosed shipping costs at Step 3.</p>
        </div>

        <div className="sentiment-card card-rage">
          <div className="sentiment-header">
            <Flame size={20} className="text-warning" />
            <span className="font-semibold text-warning">412 Rage-Clicks Logged</span>
          </div>
          <p className="sentiment-sub">Users repeatedly tapping cramped 32px Cancel/Pay buttons.</p>
        </div>

        <div className="sentiment-card card-rating">
          <div className="sentiment-header">
            <Star size={20} className="text-accent" />
            <span className="font-semibold text-white">2.2 / 5.0 Checkout Rating</span>
          </div>
          <p className="sentiment-sub">NPS for mobile payment funnel is currently -42.</p>
        </div>
      </div>

      {/* Heatmap Overlay View */}
      {showHeatmap && (
        <div className="heatmap-visual-box">
          <div className="heatmap-header">
            <div className="flex-row items-center gap-2">
              <Flame size={16} className="text-warning" />
              <span className="font-semibold text-white">Aggregated Touch Event Density (Hotjar Simulation)</span>
            </div>
            <span className="text-xs text-muted">Sample size: 1,420 mobile sessions</span>
          </div>

          <div className="heatmap-screen-mock">
            <div className="heatmap-area-container">
              <div className="heatmap-button-zone">
                <span className="button-label">Legacy Cramped Buttons Area</span>
                {/* Hotspots */}
                <div className="hotspot hotspot-red" style={{ top: '30%', left: '35%' }}>
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-text">840 Clicks</span>
                </div>
                <div className="hotspot hotspot-orange" style={{ top: '45%', left: '65%' }}>
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-text">520 Miss-Clicks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tag Filters */}
      <div className="feedback-tag-filter-row">
        <span className="filter-label">Filter Themes:</span>
        {['ALL', 'HIDDEN-FEES', 'RAGE-CLICKS', 'CONTRAST-WCAG', 'FLOW-CLARITY'].map(tag => (
          <button 
            key={tag}
            className={`filter-theme-pill ${activeFilter === tag ? 'active' : ''}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Interview Quotes Stream */}
      <div className="quotes-stream-list">
        {filtered.map(fb => (
          <div key={fb.id} className="quote-card">
            <div className="quote-header">
              <div className="flex-row items-center gap-2">
                <span className="quote-user font-semibold">{fb.user}</span>
                <span className="quote-sentiment-pill">{fb.sentiment}</span>
              </div>
              <span className="quote-tag font-mono">{fb.tag}</span>
            </div>
            <p className="quote-body">"{fb.quote}"</p>
            <span className="quote-time text-xs text-muted">{fb.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
