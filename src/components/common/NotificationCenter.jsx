// src/components/common/NotificationCenter.jsx
// Live Notification & Intelligence Center:
// Delivers real-time job criteria unlock alerts, application status updates,
// and live IT domain news from the SkillBase 20-article intelligence feed.

import React, { useState, useEffect } from 'react';
import { 
  Bell, CheckCircle2, AlertTriangle, ExternalLink, 
  Briefcase, Sparkles, Newspaper, Shield, X, Check, Clock
} from 'lucide-react';
import { SKILLBASE_NEWS } from '../../data/skillBaseData';

export default function NotificationCenter({ 
  jobNotifications = [], 
  onSelectJob = null 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'jobs' | 'news'
  const [readIds, setReadIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_read_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // Combine dynamic job alerts + industry news into standard notification items
  const allNotifications = [
    ...jobNotifications.map(j => ({
      id: `job-alert-${j.id}`,
      type: 'job',
      title: j.unlocked 
        ? `Criteria Unlocked: ${j.company} (${j.score}%)`
        : `Application Gate: ${j.company} (${j.score}%)`,
      description: j.unlocked 
        ? `You met the 75% Gate 2 criteria for ${j.title}. "Apply" is now unlocked!`
        : `Deficit in required skills. Missing ${j.missingCount} competency threshold(s).`,
      timestamp: j.timestamp || new Date().toISOString(),
      priority: j.unlocked ? 'high' : 'normal',
      meta: j
    })),
    ...SKILLBASE_NEWS.slice(0, 10).map((n, idx) => ({
      id: `news-${n.id || idx}`,
      type: 'news',
      title: n.title,
      description: `Source: ${n.source} • Category: ${n.category}`,
      timestamp: n.publishedAt,
      priority: 'normal',
      meta: n
    }))
  ];

  const unreadCount = allNotifications.filter(n => !readIds.includes(n.id)).length;

  const markAllAsRead = () => {
    const allIds = allNotifications.map(n => n.id);
    setReadIds(allIds);
    localStorage.setItem('dayone_read_notifications', JSON.stringify(allIds));
  };

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem('dayone_read_notifications', JSON.stringify(updated));
    }
  };

  const filtered = allNotifications.filter(n => {
    if (activeTab === 'jobs') return n.type === 'job';
    if (activeTab === 'news') return n.type === 'news';
    return true;
  });

  return (
    <div className="notification-center-root">
      {/* Bell Trigger Button */}
      <button 
        type="button" 
        className={`notification-bell-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="View Notifications & Tech Intelligence"
      >
        <Bell size={17} />
        {unreadCount > 0 && (
          <span className="bell-badge-count font-mono animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div className="notification-backdrop-click" onClick={() => setIsOpen(false)} />
          <div className="notification-dropdown-panel animate-scale-in">
            {/* Header */}
            <div className="notification-panel-header">
              <div className="flex-row items-center gap-2">
                <Bell size={16} className="text-cyan" />
                <h4 className="panel-title-text text-white">Notifications & Intelligence</h4>
                {unreadCount > 0 && (
                  <span className="unread-pill-tag font-mono">{unreadCount} New</span>
                )}
              </div>

              <div className="flex-row items-center gap-2">
                {unreadCount > 0 && (
                  <button 
                    type="button" 
                    className="btn-mark-all-read"
                    onClick={markAllAsRead}
                    title="Mark all as read"
                  >
                    <Check size={12} />
                    <span>Mark all</span>
                  </button>
                )}
                <button 
                  type="button" 
                  className="btn-close-notif"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="notification-tabs-bar">
              <button 
                type="button"
                className={`notif-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Updates
              </button>
              <button 
                type="button"
                className={`notif-tab ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobs')}
              >
                Job Matching Alerts
              </button>
              <button 
                type="button"
                className={`notif-tab ${activeTab === 'news' ? 'active' : ''}`}
                onClick={() => setActiveTab('news')}
              >
                Industry News
              </button>
            </div>

            {/* Notification Items List */}
            <div className="notification-items-list">
              {filtered.length === 0 ? (
                <div className="empty-notif-box">
                  <CheckCircle2 size={28} className="text-muted mb-1" />
                  <p className="text-xs text-muted">No updates in this filter.</p>
                </div>
              ) : (
                filtered.map(item => {
                  const isRead = readIds.includes(item.id);
                  const isJob = item.type === 'job';

                  return (
                    <div 
                      key={item.id} 
                      className={`notif-item-row ${isRead ? 'read' : 'unread'} ${isJob ? 'job-alert' : 'news-item'}`}
                      onClick={() => markAsRead(item.id)}
                    >
                      <div className="notif-item-icon-box">
                        {isJob ? (
                          item.priority === 'high' 
                            ? <Sparkles size={14} className="text-emerald" /> 
                            : <Briefcase size={14} className="text-amber" />
                        ) : (
                          <Newspaper size={14} className="text-cyan" />
                        )}
                      </div>

                      <div className="notif-item-content min-w-0 flex-1">
                        <div className="flex-row justify-between items-start mb-0.5">
                          <h5 className="notif-item-title text-white truncate">{item.title}</h5>
                          <span className="notif-time text-muted font-mono">
                            {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="notif-item-desc text-xs text-muted mb-0">{item.description}</p>
                      </div>

                      {!isRead && <div className="unread-dot-indicator" />}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="notification-panel-footer">
              <span className="text-xs text-muted">SkillBase Dual-Gate Intelligence Feed</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
