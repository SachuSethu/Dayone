// src/components/dashboard/FutureWeaknessesPlan.jsx
// Displays diagnosed workplace blind spots and an actionable future improvement roadmap
// linked with targeted micro-learning courses from DayOne's curriculum database.

import React from 'react';
import { 
  AlertTriangle, AlertOctagon, Zap, BookOpen, CheckCircle2, 
  ArrowRight, ShieldAlert, Sparkles, Target, ExternalLink
} from 'lucide-react';
import { findMicroCourseForWeakness } from '../../data/microCourses';
import MicroCourseCard from '../common/MicroCourseCard';

export default function FutureWeaknessesPlan({ dashboard, onLaunchSimulation }) {
  if (!dashboard) return null;

  const candidate = dashboard.candidate || {};
  const activeWeaknesses = dashboard.activeWeaknesses || [];
  const roleId = candidate.roleId || 'frontend-developer';

  return (
    <div className="future-weaknesses-plan animate-fade-in">
      <div className="section-header-compact mb-4">
        <div>
          <div className="flex-row items-center gap-2">
            <Target size={20} className="text-amber" />
            <h3 className="section-title-sm">Future Focus: Diagnosed Production Deficiencies</h3>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Real engineering blind spots detected across resume benchmarking and simulated incident telemetry requiring remediation before employer submission.
          </p>
        </div>
      </div>

      {activeWeaknesses.length === 0 ? (
        <div className="empty-weakness-box">
          <CheckCircle2 size={36} className="text-emerald mb-2" />
          <h4 className="text-white">Zero High-Severity Deficiencies Detected!</h4>
          <p className="text-xs text-muted max-w-lg mx-auto">
            Your recent simulation runs and code reviews have satisfied defensive architecture, edge cases, and test assertions. You are currently in the fast-track tier.
          </p>
        </div>
      ) : (
        <div className="future-weakness-grid">
          {activeWeaknesses.map((w, idx) => {
            const course = w.microCourse || findMicroCourseForWeakness(roleId, w.area);
            const severity = (w.severity || 'HIGH').toUpperCase();

            return (
              <div key={w.id || idx} className={`weakness-plan-card severity-${severity.toLowerCase()}`}>
                {/* Header */}
                <div className="weakness-plan-header">
                  <div className="flex-row items-center gap-2">
                    <span className={`severity-badge ${severity.toLowerCase()}`}>
                      {severity === 'CRITICAL' ? <AlertOctagon size={12} /> : <AlertTriangle size={12} />}
                      <span>{severity} PRIORITY</span>
                    </span>
                    <span className="source-label text-xs text-muted">
                      Source: {w.taskTitle || 'Simulation Telemetry'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted">
                    #{idx + 1}
                  </span>
                </div>

                {/* Deficiency Title & Description */}
                <div className="weakness-plan-body mt-3">
                  <h4 className="deficiency-area-title text-white font-semibold">
                    {w.area}
                  </h4>
                  <p className="deficiency-desc text-xs text-muted mt-1">
                    {w.description}
                  </p>

                  {/* Production Risk Callout */}
                  {w.impactOnProduction && (
                    <div className="production-risk-callout mt-2">
                      <div className="flex-row items-center gap-1.5 text-rose text-xs font-bold mb-0.5">
                        <AlertOctagon size={13} />
                        <span>Workplace Production Impact:</span>
                      </div>
                      <p className="text-xs text-muted mb-0">{w.impactOnProduction}</p>
                    </div>
                  )}

                  {/* Concrete Engineering Remediation Advice */}
                  {w.remediationAdvice && (
                    <div className="remediation-step-box mt-3">
                      <div className="flex-row items-center gap-1.5 text-amber text-xs font-bold mb-0.5">
                        <Zap size={13} />
                        <span>Actionable Engineering Remediation:</span>
                      </div>
                      <p className="text-xs text-muted mb-0">{w.remediationAdvice}</p>
                    </div>
                  )}
                </div>

                {/* Linked Targeted Micro-Course */}
                {course && (
                  <div className="weakness-plan-course mt-3 pt-3 border-t border-border">
                    <div className="flex-row items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-cyan uppercase tracking-wider flex-row items-center gap-1">
                        <BookOpen size={12} />
                        <span>Recommended Curriculum Tutorial:</span>
                      </span>
                    </div>

                    <MicroCourseCard 
                      course={course}
                      remediationArea={w.area}
                      compact={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
