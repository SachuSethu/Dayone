// src/components/home/AllJobsMicroCoursesView.jsx
// Loads the full DayOne.ai Micro-Learning curriculum across all 6 roles with 33 modules.
// Includes video walkthrough player, topic filters, domain tags, and direct provider links.

import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Video, ExternalLink, Play, CheckCircle2, 
  Sparkles, Code2, Database, Layers, Palette, Shield, LineChart, 
  BookOpen, Clock, Check, X 
} from 'lucide-react';
import { MICRO_LEARNING_DATABASE, getModuleImage, extractYouTubeId } from '../../data/microCourses';
import './home.css';

const ROLE_ICONS = {
  'frontend-developer': Code2,
  'backend-developer': Database,
  'full-stack-developer': Layers,
  'ui-ux-designer': Palette,
  'cybersecurity-analyst': Shield,
  'data-analyst': LineChart
};

const ROLE_COLORS = {
  'frontend-developer': '#10b981',
  'backend-developer': '#38bdf8',
  'full-stack-developer': '#818cf8',
  'ui-ux-designer': '#ec4899',
  'cybersecurity-analyst': '#06b6d4',
  'data-analyst': '#f59e0b'
};

export default function AllJobsMicroCoursesView({ onBack }) {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_completed_modules');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const roles = MICRO_LEARNING_DATABASE.curriculum.roles;

  // Flattened modules with role metadata
  const allModules = useMemo(() => {
    const list = [];
    roles.forEach(role => {
      role.learningModules.forEach(mod => {
        list.push({
          ...mod,
          roleId: role.roleId,
          roleTitle: role.title,
          roleColor: ROLE_COLORS[role.roleId] || '#10b981'
        });
      });
    });
    return list;
  }, [roles]);

  // Filtered by role and search
  const filteredModules = useMemo(() => {
    return allModules.filter(item => {
      if (selectedRoleFilter !== 'all' && item.roleId !== selectedRoleFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inVideo = item.videoTitle.toLowerCase().includes(q);
        const inProvider = item.provider.toLowerCase().includes(q);
        const inDomains = (item.domainsCovered || []).some(d => d.toLowerCase().includes(q));
        const inRole = item.roleTitle.toLowerCase().includes(q);
        return inTitle || inVideo || inProvider || inDomains || inRole;
      }
      return true;
    });
  }, [allModules, selectedRoleFilter, searchQuery]);

  const toggleModuleCompleted = (moduleId) => {
    setCompletedModules(prev => {
      const updated = prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId];
      localStorage.setItem('dayone_completed_modules', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="home-root" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Top Navigation Bar */}
      <header className="home-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            type="button" 
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Hub</span>
          </button>

          <div className="home-brand-wrap" onClick={onBack} style={{ cursor: 'pointer' }}>
            <div className="home-brand-logo">D</div>
            <span className="home-brand-title">DAYONE<span>.AI</span></span>
            <span className="home-brand-badge">MICRO COURSES</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Curriculum v2.0 • <strong>33 Modules across 6 Domains</strong>
          </span>
          <span style={{ 
            fontSize: '0.75rem', 
            background: 'rgba(16, 185, 129, 0.15)', 
            color: '#34d399', 
            padding: '0.3rem 0.7rem', 
            borderRadius: '9999px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            {completedModules.length} Completed
          </span>
        </div>
      </header>

      <div className="home-container">
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(13, 27, 24, 0.85) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '18px',
          padding: '2.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="home-hero-pill" style={{ margin: 0 }}>
                <Sparkles size={12} /> Full Learning Curriculum
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 0.5rem 0' }}>
              Micro Courses for All Jobs
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0, maxWidth: '650px', lineHeight: 1.5 }}>
              Expert video tutorials curated across Frontend, Backend, Full Stack, UI/UX, Cybersecurity, and Data Analytics. Targeted for workplace production readiness.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.8rem 1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>6</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Job Roles</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.8rem 1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#38bdf8' }}>33</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Modules</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.8rem 1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c084fc' }}>100%</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Video Verified</div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          {/* Search Input */}
          <div style={{ 
            position: 'relative', 
            maxWidth: '500px', 
            width: '100%' 
          }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input 
              type="text"
              placeholder="Search by topic, skill, provider (e.g. React, SQL, Fireship)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--home-border)',
                borderRadius: '10px',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Role Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              type="button"
              className={`home-nav-item ${selectedRoleFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedRoleFilter('all')}
              style={{ borderRadius: '9999px', fontSize: '0.8rem' }}
            >
              All Jobs ({allModules.length})
            </button>

            {roles.map(r => {
              const Icon = ROLE_ICONS[r.roleId] || BookOpen;
              const isSel = selectedRoleFilter === r.roleId;
              const color = ROLE_COLORS[r.roleId] || '#10b981';

              return (
                <button
                  key={r.roleId}
                  type="button"
                  className="home-nav-item"
                  onClick={() => setSelectedRoleFilter(r.roleId)}
                  style={{
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    background: isSel ? `rgba(${color === '#10b981' ? '16, 185, 129' : '56, 189, 248'}, 0.15)` : 'rgba(255,255,255,0.04)',
                    color: isSel ? color : '#94a3b8',
                    borderColor: isSel ? color : 'transparent'
                  }}
                >
                  <Icon size={14} color={color} />
                  <span>{r.title} ({r.learningModules.length})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modules Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredModules.map(mod => {
            const isDone = completedModules.includes(mod.moduleId);
            const thumb = getModuleImage(mod);

            return (
              <div 
                key={mod.moduleId}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Thumbnail & Video Header */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', background: '#0a0f1d' }}>
                  <img 
                    src={thumb} 
                    alt={mod.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(9, 13, 22, 0.9) 100%)'
                  }} />

                  {/* Role Tag & Provider */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      color: mod.roleColor,
                      border: `1px solid ${mod.roleColor}40`,
                      backdropFilter: 'blur(4px)'
                    }}>
                      {mod.roleTitle}
                    </span>
                  </div>

                  {/* Play Action Overlay Button */}
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(mod)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.9)',
                      color: '#042f24',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.5)'
                    }}
                    title="Watch Video"
                  >
                    <Play size={20} fill="#042f24" style={{ marginLeft: '2px' }} />
                  </button>

                  <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#cbd5e1', background: 'rgba(0,0,0,0.6)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      {mod.provider}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                      {mod.moduleId}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: '0 0 0.4rem 0', lineHeight: 1.35 }}>
                      {mod.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 1rem 0' }}>
                      {mod.videoTitle}
                    </p>

                    {/* Domains Covered */}
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                      {(mod.domainsCovered || []).map((dom, i) => (
                        <span key={i} style={{
                          fontSize: '0.68rem',
                          color: '#e2e8f0',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                          {dom}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                      type="button"
                      onClick={() => toggleModuleCompleted(mod.moduleId)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isDone ? '#10b981' : '#64748b',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontWeight: 600
                      }}
                    >
                      <CheckCircle2 size={16} color={isDone ? '#10b981' : '#64748b'} />
                      <span>{isDone ? 'Completed' : 'Mark Watched'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveVideoModal(mod)}
                      style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#34d399',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Play size={12} fill="#34d399" /> Watch Course
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Video Modal */}
      {activeVideoModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '1.5rem'
          }}
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            style={{
              background: '#0d1527',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '16px',
              maxWidth: '850px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
                  {activeVideoModal.title}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {activeVideoModal.provider} • {activeVideoModal.roleTitle}
                </span>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveVideoModal(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.4rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Frame */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
              {(() => {
                const ytId = extractYouTubeId(activeVideoModal.videoUrl);
                if (ytId) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                      title={activeVideoModal.videoTitle}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <p style={{ margin: '0 0 1rem 0' }}>External Provider Walkthrough:</p>
                    <a 
                      href={activeVideoModal.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 700 }}
                    >
                      Open Video on Provider Site <ExternalLink size={16} />
                    </a>
                  </div>
                );
              })()}
            </div>

            <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {(activeVideoModal.domainsCovered || []).map((dom, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {dom}
                  </span>
                ))}
              </div>

              <a 
                href={activeVideoModal.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  color: '#38bdf8',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Watch on YouTube <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
