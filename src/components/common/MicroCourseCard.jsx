// src/components/common/MicroCourseCard.jsx
// Lightweight, focused UI for targeted micro-learning courses assigned by Gemini AI.
// Displays course title, domain/video thumbnail image, and direct video link.

import React, { useState } from 'react';
import { Play, ExternalLink, Video, Sparkles, CheckCircle2, X } from 'lucide-react';
import { getModuleImage, extractYouTubeId } from '../../data/microCourses';

export default function MicroCourseCard({
  course,
  remediationArea = '',
  compact = false,
  showWatchModal = true
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!course) return null;

  const imageUrl = course.thumbnailUrl || getModuleImage(course);
  const ytId = extractYouTubeId(course.videoUrl);

  return (
    <>
      <div className={`micro-course-card ${compact ? 'compact' : ''} animate-fade-in`}>
        {/* Domain / Video Image */}
        <div className="course-image-wrapper">
          <img 
            src={imageUrl} 
            alt={course.title} 
            className="course-domain-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="course-image-overlay">
            {ytId && showWatchModal ? (
              <button 
                type="button" 
                className="btn-play-preview" 
                onClick={() => setIsPlaying(true)}
                title="Watch Video Course"
              >
                <Play size={20} className="play-icon-fill" />
              </button>
            ) : (
              <a 
                href={course.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-play-preview"
                title="Open Video Course"
              >
                <Play size={20} className="play-icon-fill" />
              </a>
            )}
            {course.provider && (
              <span className="course-provider-tag">{course.provider}</span>
            )}
          </div>
        </div>

        {/* Course Info & Link */}
        <div className="course-info-body">
          {remediationArea && (
            <div className="course-remediation-badge">
              <Sparkles size={11} className="text-amber" />
              <span>Targeted for: {remediationArea}</span>
            </div>
          )}

          <h4 className="course-title">{course.title}</h4>

          {course.videoTitle && (
            <p className="course-video-title text-muted text-xs">
              <Video size={12} className="inline mr-1 text-cyan" />
              {course.videoTitle}
            </p>
          )}

          {course.relevanceReason && (
            <p className="course-relevance-text">
              {course.relevanceReason}
            </p>
          )}

          {/* Action Link Row */}
          <div className="course-link-row">
            {ytId && showWatchModal ? (
              <button 
                type="button"
                className="btn-course-watch"
                onClick={() => setIsPlaying(true)}
              >
                <Play size={13} />
                <span>Watch Micro-Course</span>
              </button>
            ) : null}

            <a 
              href={course.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="course-direct-link"
              title="Open video in new tab"
            >
              <span>Open on YouTube</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Video Modal */}
      {isPlaying && ytId && (
        <div className="course-video-modal-backdrop" onClick={() => setIsPlaying(false)}>
          <div className="course-video-modal-card animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="course-video-modal-header">
              <div>
                <h3 className="modal-course-title text-white font-bold text-sm">{course.title}</h3>
                <span className="text-xs text-muted">{course.videoTitle} • {course.provider}</span>
              </div>
              <button 
                className="btn-close-modal" 
                onClick={() => setIsPlaying(false)}
                title="Close Video"
              >
                <X size={18} />
              </button>
            </div>

            <div className="course-video-frame-container">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
