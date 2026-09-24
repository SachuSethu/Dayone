// src/components/dashboard/RecentlyWatchedCourses.jsx
// Displays recently watched and in-progress micro-courses with one-click re-watch player.

import React, { useState } from 'react';
import { 
  Play, Video, Clock, CheckCircle2, ExternalLink, 
  Sparkles, RotateCcw, BookOpen, AlertCircle
} from 'lucide-react';
import { recordCourseWatched } from '../../lib/dashboard/dashboardStore';
import { getMicroCoursesByRole } from '../../data/microCourses';
import MicroCourseCard from '../common/MicroCourseCard';

export default function RecentlyWatchedCourses({ dashboard, onSwitchToAllCourses }) {
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  if (!dashboard) return null;

  const candidate = dashboard.candidate || {};
  const recentlyWatched = dashboard.recentlyWatchedCourses || [];
  const assignedCourses = dashboard.assignedMicroCourses || [];
  const roleId = candidate.roleId || 'frontend-developer';

  // Fallback recommended modules if nothing watched yet
  const roleCatalog = getMicroCoursesByRole(roleId);

  const handlePlayVideo = (course) => {
    recordCourseWatched(course);
    setActiveVideoModal(course);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  return (
    <div className="recently-watched-section animate-fade-in">
      <div className="section-header-compact mb-4">
        <div>
          <div className="flex-row items-center gap-2">
            <Video size={20} className="text-amber" />
            <h3 className="section-title-sm">Recently Watched Micro-Learning</h3>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Targeted engineering tutorials you've engaged with to remedy diagnosed production deficiencies.
          </p>
        </div>

        {recentlyWatched.length > 0 && onSwitchToAllCourses && (
          <button 
            type="button" 
            className="btn btn-secondary btn-xs"
            onClick={onSwitchToAllCourses}
          >
            <span>Explore All Role Modules</span>
          </button>
        )}
      </div>

      {recentlyWatched.length === 0 ? (
        <div className="empty-watched-state">
          <div className="empty-watched-icon">
            <Play size={28} className="text-amber" />
          </div>
          <h4 className="text-white mt-2">No Courses Watched Recently</h4>
          <p className="text-xs text-muted max-w-md mx-auto">
            You haven't watched any micro-courses yet. Check your assigned remediation courses below to strengthen your production weaknesses.
          </p>
          <div className="mt-4">
            <h5 className="text-xs font-semibold text-cyan uppercase tracking-wider mb-3">
              Recommended Starter Modules for {candidate.targetRole || 'Your Role'}
            </h5>
            <div className="starter-courses-grid">
              {(assignedCourses.length > 0 ? assignedCourses.slice(0, 3) : roleCatalog.slice(0, 3)).map((course, idx) => (
                <MicroCourseCard 
                  key={course.moduleId || idx}
                  course={course}
                  remediationArea={course.domainsCovered?.[0] || 'Target Domain'}
                  showWatchModal={true}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="recently-watched-grid">
          {recentlyWatched.map((course, idx) => {
            const embedUrl = getEmbedUrl(course.videoUrl);
            const imageSrc = course.thumbnailUrl || course.domainImage;

            return (
              <div key={course.moduleId || idx} className="watched-course-card">
                {/* Thumbnail Header with Play Overlay */}
                <div className="watched-thumb-wrapper" onClick={() => handlePlayVideo(course)}>
                  {imageSrc ? (
                    <img src={imageSrc} alt={course.title} className="watched-thumb-img" />
                  ) : (
                    <div className="watched-thumb-placeholder">
                      <Video size={24} className="text-cyan" />
                    </div>
                  )}
                  <div className="watched-play-overlay">
                    <div className="play-button-circle">
                      <Play size={18} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="watched-badge-tag">
                    <CheckCircle2 size={12} className="text-emerald" />
                    <span>Watched</span>
                  </div>
                </div>

                {/* Content */}
                <div className="watched-card-content">
                  <div className="flex-row items-center justify-between text-xs text-muted mb-1">
                    <span className="font-mono text-cyan">{course.provider}</span>
                    <span className="flex-row items-center gap-1">
                      <Clock size={11} />
                      <span>{new Date(course.watchedAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h4 className="watched-title" title={course.title}>
                    {course.title}
                  </h4>
                  <p className="watched-video-title text-xs text-muted mb-2">
                    {course.videoTitle}
                  </p>

                  <div className="watched-card-actions">
                    <button 
                      type="button" 
                      className="btn-rewatch-action"
                      onClick={() => handlePlayVideo(course)}
                    >
                      <RotateCcw size={12} />
                      <span>Re-watch Tutorial</span>
                    </button>

                    <a 
                      href={course.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-external-link"
                      title="Open in YouTube"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="video-modal-container animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="video-modal-header">
              <div className="flex-row items-center gap-2">
                <Video size={18} className="text-amber" />
                <h4 className="video-modal-title">{activeVideoModal.title}</h4>
              </div>
              <button 
                type="button" 
                className="btn-close-modal"
                onClick={() => setActiveVideoModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="video-modal-body">
              {getEmbedUrl(activeVideoModal.videoUrl) ? (
                <div className="video-iframe-wrapper">
                  <iframe 
                    src={getEmbedUrl(activeVideoModal.videoUrl)}
                    title={activeVideoModal.videoTitle || activeVideoModal.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="video-fallback-box">
                  <p>Direct video playback is not embedded for this link.</p>
                  <a 
                    href={activeVideoModal.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>Open Tutorial on YouTube</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>

            <div className="video-modal-footer">
              <span className="text-xs text-muted">
                Instructor: <strong>{activeVideoModal.provider}</strong>
              </span>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setActiveVideoModal(null)}
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
