import { findMicroCourseForWeakness, getMicroCoursesByRole } from '../../data/microCourses';

const STORAGE_KEY = 'dayone_user_dashboard';

/**
 * Retrieve the current dashboard state from localStorage.
 */
export function getUserDashboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('[DashboardStore] Failed to read dashboard:', err);
    return null;
  }
}

/**
 * Initialize candidate dashboard from resume extraction and target role benchmarking.
 */
export function initUserDashboard({
  candidateProfile,
  targetRole,
  skillGaps = [],
  resumeFileName = 'Uploaded_Resume.pdf',
  currentUser = null
}) {
  try {
    // Check if an existing dashboard exists
    const existing = getUserDashboard();
    const roleId = targetRole?.id || 'frontend';

    // Calculate baseline readiness score from skill gaps
    const avgCandidate = Math.round(
      skillGaps.reduce((acc, curr) => acc + (curr.candidateEvidencePercent || 0), 0) / (skillGaps.length || 1)
    );
    const avgReq = Math.round(
      skillGaps.reduce((acc, curr) => acc + (curr.roleRequirementPercent || 0), 0) / (skillGaps.length || 1)
    );
    const baselineReadiness = Math.min(100, Math.max(20, Math.round((avgCandidate / (avgReq || 1)) * 100)));

    // Initial skills matrix from resume benchmarking
    const skillsMatrix = skillGaps.map(g => ({
      skill: g.skill,
      baseline: g.candidateEvidencePercent || 0,
      current: g.candidateEvidencePercent || 0,
      required: g.roleRequirementPercent || 75,
      status: g.candidateEvidencePercent >= (g.roleRequirementPercent || 75)
        ? 'verified'
        : (g.candidateEvidencePercent > 0 ? 'developing' : 'gap'),
      evidence: g.evidenceRationale || 'Extracted from resume experience',
      lastEvaluatedAt: new Date().toISOString()
    }));

    // Initial weaknesses from resume gaps with matching micro-learning courses
    const initialWeaknesses = skillGaps
      .filter(g => g.alignmentStatus === 'high_priority_gap' || (g.gapPercent && g.gapPercent > 30))
      .slice(0, 3)
      .map((g, idx) => ({
        id: `weakness-resume-${idx}-${Date.now()}`,
        area: g.skill,
        severity: g.gapPercent > 50 ? 'HIGH' : 'MEDIUM',
        description: `Resume benchmark revealed a ${g.gapPercent}% deficit against production expectations.`,
        impactOnProduction: `Unvalidated proficiency in ${g.skill} requires live workplace verification.`,
        remediationAdvice: `Complete targeted DayOne simulations to build verifiable workplace evidence.`,
        taskTitle: 'Resume Benchmark Diagnostic',
        detectedAt: new Date().toISOString(),
        microCourse: findMicroCourseForWeakness(roleId, g.skill)
      }));

    // Initial demonstrated strengths from resume
    const initialStrengths = skillGaps
      .filter(g => g.alignmentStatus === 'strong_alignment')
      .slice(0, 4)
      .map(g => ({
        area: g.skill,
        evidence: `Documented experience and project validation (${g.candidateEvidencePercent}% alignment).`,
        taskTitle: 'Resume Grounded Evidence',
        validatedAt: new Date().toISOString()
      }));

    const newDashboard = {
      version: '2.0',
      initializedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      candidate: {
        name: candidateProfile?.candidateName || currentUser?.name || 'Candidate',
        email: currentUser?.email || candidateProfile?.contactInfo?.email || 'alex.chen.dev@example.com',
        phone: candidateProfile?.contactInfo?.phone || '+1 (555) 382-9401',
        headline: candidateProfile?.headline || `${candidateProfile?.experienceLevel || 'Intermediate'} ${targetRole?.name || 'Software Engineer'}`,
        location: candidateProfile?.contactInfo?.location || 'San Francisco, CA / Remote',
        bio: candidateProfile?.professionalSummary || 'Product-minded engineer passionate about building high-reliability production web applications, clean asynchronous architecture, and automated test resilience.',
        github: candidateProfile?.contactInfo?.github || 'https://github.com/candidate-dev',
        linkedin: candidateProfile?.contactInfo?.linkedin || 'https://linkedin.com/in/candidate-dev',
        portfolio: candidateProfile?.contactInfo?.portfolio || 'https://candidate-portfolio.dev',
        yearsOfExperience: candidateProfile?.yearsOfExperience || 3,
        targetRole: targetRole?.name || 'Software Engineer',
        roleId: targetRole?.id || 'frontend',
        experienceLevel: candidateProfile?.experienceLevel || 'Intermediate',
        resumeFileName: resumeFileName,
        education: candidateProfile?.education || [],
        certifications: candidateProfile?.provenance?.verifiedCertifications || [],
        projects: candidateProfile?.provenance?.documentedProjects || [],
        unverifiedClaims: candidateProfile?.provenance?.unverifiedCourseClaims || []
      },
      readiness: {
        baseline: baselineReadiness,
        current: existing?.candidate?.roleId === targetRole?.id && existing?.readiness?.current
          ? existing.readiness.current
          : baselineReadiness,
        gain: existing?.candidate?.roleId === targetRole?.id && existing?.readiness?.gain
          ? existing.readiness.gain
          : 0,
        status: 'Benchmark Established'
      },
      domainGrowthHistory: existing?.candidate?.roleId === targetRole?.id && existing?.domainGrowthHistory?.length
        ? existing.domainGrowthHistory
        : [
            {
              id: 'growth-baseline',
              timestamp: new Date().toISOString(),
              label: 'Resume Baseline Benchmark',
              score: baselineReadiness,
              level: candidateProfile?.experienceLevel || 'Intermediate',
              delta: 0,
              taskTitle: 'Resume Intelligence Extraction',
              details: 'Initialized baseline knowledge grounded in documented resume evidence.'
            }
          ],
      recentlyWatchedCourses: existing?.recentlyWatchedCourses || [],
      skillsMatrix: existing?.candidate?.roleId === targetRole?.id && existing?.skillsMatrix?.length
        ? existing.skillsMatrix
        : skillsMatrix,
      activeWeaknesses: existing?.candidate?.roleId === targetRole?.id && existing?.activeWeaknesses?.length
        ? existing.activeWeaknesses
        : initialWeaknesses,
      demonstratedStrengths: existing?.candidate?.roleId === targetRole?.id && existing?.demonstratedStrengths?.length
        ? existing.demonstratedStrengths
        : initialStrengths,
      taskHistory: existing?.candidate?.roleId === targetRole?.id && existing?.taskHistory
        ? existing.taskHistory
        : [],
      verifiedCredentials: existing?.candidate?.roleId === targetRole?.id && existing?.verifiedCredentials
        ? existing.verifiedCredentials
        : [],
      assignedMicroCourses: existing?.candidate?.roleId === targetRole?.id && existing?.assignedMicroCourses
        ? existing.assignedMicroCourses
        : initialWeaknesses.map(w => w.microCourse).filter(Boolean),
      metrics: existing?.candidate?.roleId === targetRole?.id && existing?.metrics
        ? existing.metrics
        : {
            tasksCompleted: 0,
            tasksPassed: 0,
            totalFlagsCaptured: 0,
            totalSimulationSeconds: 0
          }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDashboard));
    dispatchDashboardEvent(newDashboard);
    return newDashboard;
  } catch (err) {
    console.error('[DashboardStore] Error in initUserDashboard:', err);
    return null;
  }
}

/**
 * Record a completed task submission in the candidate's dashboard,
 * dynamically updating readiness score, skills matrix, Gemini weakness diagnosis,
 * task history, and verified credentials.
 */
export function recordTaskResultInDashboard({
  evalData,
  missionData,
  workspaceState,
  aiEvaluation
}) {
  try {
    let dashboard = getUserDashboard();

    // Fallback initialize if missing
    if (!dashboard) {
      dashboard = initUserDashboard({
        candidateProfile: missionData?.candidateProfile,
        targetRole: missionData?.targetRole || missionData?.role,
        skillGaps: missionData?.skillGaps || []
      });
    }

    if (!dashboard) return null;

    const taskTitle = missionData?.assignedTask?.title || missionData?.missionTitle || missionData?.missionCode || 'First-Day Simulation Task';
    const primarySkill = missionData?.assignedTask?.primarySkill || missionData?.assignedTask?.coreDomain || 'Core Domain Logic';
    const isPassed = Boolean(evalData?.passed);
    const elapsedSeconds = workspaceState?.elapsedSeconds || 540;
    const flagsCount = workspaceState?.capturedFlags?.length || 0;

    // 1. Update Metrics
    dashboard.metrics.tasksCompleted += 1;
    if (isPassed) dashboard.metrics.tasksPassed += 1;
    dashboard.metrics.totalFlagsCaptured += flagsCount;
    dashboard.metrics.totalSimulationSeconds += elapsedSeconds;

    // 2. Update Readiness Score Dynamically
    // When passed: boost score based on statistical improvement gain
    const oldScore = dashboard.readiness.current;
    let newScore = oldScore;

    if (isPassed) {
      const gain = evalData?.statisticalImprovementGain || 20;
      newScore = Math.min(98, Math.round(oldScore + gain * ((100 - oldScore) / 100)));
      dashboard.readiness.status = newScore >= 80 ? 'Production Ready / Fast-Track' : 'Proficient Candidate';
    } else {
      // Partial pass or edge case failure: slight adjustment based on correctness
      const correctness = evalData?.technicalReview?.codeCorrectness || 50;
      if (correctness > oldScore) {
        newScore = Math.min(95, Math.round(oldScore + (correctness - oldScore) * 0.4));
      }
      dashboard.readiness.status = 'Remediation Sprint Recommended';
    }

    dashboard.readiness.current = newScore;
    dashboard.readiness.gain = newScore - dashboard.readiness.baseline;

    // 2b. Record Dynamic Domain Knowledge Growth History
    if (!dashboard.domainGrowthHistory) {
      dashboard.domainGrowthHistory = [];
    }
    const growthDelta = newScore - oldScore;
    const stageLevel = newScore >= 85 ? 'Advanced' : (newScore >= 70 ? 'Professional' : (newScore >= 55 ? 'Intermediate' : 'Beginner'));
    dashboard.domainGrowthHistory.push({
      id: `growth-task-${Date.now()}`,
      timestamp: new Date().toISOString(),
      label: taskTitle,
      score: newScore,
      delta: growthDelta,
      level: stageLevel,
      taskTitle: taskTitle,
      details: isPassed 
        ? `Passed simulation with ${flagsCount} flags captured and ${evalData?.technicalReview?.codeCorrectness || 88}% correctness.`
        : `Partial completion: ${evalData?.aiEvaluationSummary || 'Under remediation review'}`
    });

    // 3. Update Skills Matrix
    if (dashboard.skillsMatrix && dashboard.skillsMatrix.length > 0) {
      let matchedSkill = false;
      dashboard.skillsMatrix = dashboard.skillsMatrix.map(s => {
        const matches = s.skill.toLowerCase().includes(primarySkill.toLowerCase()) ||
          primarySkill.toLowerCase().includes(s.skill.toLowerCase());
        
        if (matches) {
          matchedSkill = true;
          const upgradedVal = isPassed 
            ? Math.max(s.current, evalData?.technicalReview?.codeCorrectness || 88)
            : Math.max(s.current, Math.round((evalData?.technicalReview?.codeCorrectness || 50) * 0.9));

          return {
            ...s,
            current: upgradedVal,
            status: upgradedVal >= s.required ? 'verified_by_simulation' : (upgradedVal > 0 ? 'developing' : 'gap'),
            evidence: isPassed
              ? `Verified via live workplace simulation (${taskTitle}) with ${evalData?.technicalReview?.codeCorrectness || 88}% correctness.`
              : `Partial completion in live simulation: ${evalData?.aiEvaluationSummary || 'Needs remediation'}`,
            lastEvaluatedAt: new Date().toISOString()
          };
        }
        return s;
      });

      // If skill was not in original matrix, append it
      if (!matchedSkill) {
        dashboard.skillsMatrix.push({
          skill: primarySkill,
          baseline: 50,
          current: isPassed ? 90 : 55,
          required: 75,
          status: isPassed ? 'verified_by_simulation' : 'developing',
          evidence: `Evaluated in task ${taskTitle}`,
          lastEvaluatedAt: new Date().toISOString()
        });
      }
    }

    // 4. Incorporate Gemini AI Weakness Analysis & Assigned Micro-Learning Course
    const weaknessAnalysis = aiEvaluation?.weaknessAnalysis;
    const roleKey = dashboard.candidate?.roleId || missionData?.targetRole?.id || missionData?.role?.id || 'frontend';
    const recommendedCourse = aiEvaluation?.recommendedMicroCourse || findMicroCourseForWeakness(
      roleKey,
      weaknessAnalysis?.primaryWeaknesses?.[0]?.area || primarySkill
    );

    if (!dashboard.assignedMicroCourses) {
      dashboard.assignedMicroCourses = [];
    }

    if (recommendedCourse) {
      const alreadyHasCourse = dashboard.assignedMicroCourses.some(c => c.moduleId === recommendedCourse.moduleId);
      if (!alreadyHasCourse) {
        dashboard.assignedMicroCourses = [recommendedCourse, ...dashboard.assignedMicroCourses];
      }
    }

    if (weaknessAnalysis) {
      // Primary Weaknesses
      if (weaknessAnalysis.primaryWeaknesses && weaknessAnalysis.primaryWeaknesses.length > 0) {
        const newWeaknesses = weaknessAnalysis.primaryWeaknesses.map((w, idx) => ({
          id: `weakness-ai-${Date.now()}-${idx}`,
          area: w.area,
          severity: w.severity || 'HIGH',
          description: w.description,
          impactOnProduction: w.impactOnProduction,
          remediationAdvice: w.remediationAdvice,
          taskTitle: taskTitle,
          detectedAt: new Date().toISOString(),
          microCourse: recommendedCourse || findMicroCourseForWeakness(roleKey, w.area)
        }));

        // Filter out existing weaknesses that have now been resolved if task passed
        if (isPassed) {
          dashboard.activeWeaknesses = dashboard.activeWeaknesses.filter(
            w => !w.area.toLowerCase().includes(primarySkill.toLowerCase())
          );
        }

        // Add new diagnosed weaknesses
        dashboard.activeWeaknesses = [...newWeaknesses, ...dashboard.activeWeaknesses].slice(0, 6);
      } else if (isPassed) {
        // Clear resolved weaknesses in the tested area
        dashboard.activeWeaknesses = dashboard.activeWeaknesses.filter(
          w => !w.area.toLowerCase().includes(primarySkill.toLowerCase())
        );
      }

      // Demonstrated Strengths
      if (weaknessAnalysis.demonstratedStrengths && weaknessAnalysis.demonstratedStrengths.length > 0) {
        const newStrengths = weaknessAnalysis.demonstratedStrengths.map(s => ({
          area: s.area,
          evidence: s.evidence,
          taskTitle: taskTitle,
          validatedAt: new Date().toISOString()
        }));

        dashboard.demonstratedStrengths = [...newStrengths, ...dashboard.demonstratedStrengths].slice(0, 8);
      }
    }

    // 5. Append to Task History
    const historyItem = {
      id: `task-run-${Date.now()}`,
      taskId: missionData?.missionCode || 'TASK-01',
      title: taskTitle,
      role: missionData?.targetRole?.name || missionData?.role?.name || 'Engineering',
      level: missionData?.candidateLevel || 2,
      passed: isPassed,
      readinessScore: evalData?.totalReadinessScore || (isPassed ? 88 : 45),
      codeCorrectness: evalData?.technicalReview?.codeCorrectness || 0,
      edgeCases: evalData?.technicalReview?.edgeCases || 0,
      architecture: evalData?.technicalReview?.architecture || 0,
      debugging: evalData?.technicalReview?.debugging || 0,
      flagsCaptured: flagsCount,
      elapsedSeconds: elapsedSeconds,
      aiSummary: aiEvaluation?.aiEvaluationSummary || evalData?.aiEvaluationSummary || '',
      weaknesses: weaknessAnalysis?.primaryWeaknesses || [],
      recommendedMicroCourse: recommendedCourse || null,
      completedAt: new Date().toISOString()
    };

    dashboard.taskHistory = [historyItem, ...(dashboard.taskHistory || [])];

    // 6. Append Verified Micro-Credential if passed
    if (isPassed && evalData?.credentialId) {
      const alreadyHas = (dashboard.verifiedCredentials || []).some(
        c => c.credentialId === evalData.credentialId
      );
      if (!alreadyHas) {
        const newCred = {
          credentialId: evalData.credentialId,
          roleName: missionData?.targetRole?.name || missionData?.role?.name || 'Software Engineering',
          skill: primarySkill,
          badge: missionData?.role?.icon || '🏆',
          verifiedAt: new Date().toISOString(),
          issuer: 'DayOne.ai Autonomous Simulation Authority',
          status: 'active_verified'
        };
        dashboard.verifiedCredentials = [newCred, ...(dashboard.verifiedCredentials || [])];
      }
    }

    dashboard.updatedAt = new Date().toISOString();

    // Persist
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboard));
    dispatchDashboardEvent(dashboard);

    return dashboard;
  } catch (err) {
    console.error('[DashboardStore] Error in recordTaskResultInDashboard:', err);
    return null;
  }
}

/**
 * Record a micro-course being watched by the candidate
 */
export function recordCourseWatched(course) {
  if (!course) return null;
  try {
    const dashboard = getUserDashboard();
    if (!dashboard) return null;

    if (!dashboard.recentlyWatchedCourses) {
      dashboard.recentlyWatchedCourses = [];
    }

    const courseId = course.moduleId || course.id || course.videoUrl;
    // Remove if already exists so we can unshift to top
    const filtered = dashboard.recentlyWatchedCourses.filter(c => 
      (c.moduleId || c.id || c.videoUrl) !== courseId
    );

    const watchedRecord = {
      moduleId: course.moduleId || `mod-${Date.now()}`,
      title: course.title || 'Micro-Learning Module',
      videoTitle: course.videoTitle || course.title,
      provider: course.provider || 'DayOne Engineering Academy',
      videoUrl: course.videoUrl,
      thumbnailUrl: course.thumbnailUrl || (course.videoUrl ? `https://img.youtube.com/vi/${course.videoUrl.split('v=')[1]?.slice(0, 11)}/hqdefault.jpg` : null),
      domainImage: course.domainImage,
      domainsCovered: course.domainsCovered || [],
      watchedAt: new Date().toISOString(),
      status: 'watched',
      progressPercent: 100
    };

    dashboard.recentlyWatchedCourses = [watchedRecord, ...filtered].slice(0, 12);
    dashboard.updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboard));
    dispatchDashboardEvent(dashboard);
    return dashboard;
  } catch (err) {
    console.error('[DashboardStore] Error recording course watched:', err);
    return null;
  }
}

/**
 * Update candidate personal details in the dashboard and sync with user auth
 */
export function updateUserProfile(profileUpdates) {
  if (!profileUpdates) return null;
  try {
    const dashboard = getUserDashboard();
    if (!dashboard) return null;

    dashboard.candidate = {
      ...dashboard.candidate,
      ...profileUpdates
    };
    dashboard.updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboard));

    // Also update dayone_user if currentUser exists
    try {
      const savedUser = localStorage.getItem('dayone_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        const updatedUser = {
          ...parsed,
          name: profileUpdates.name || parsed.name,
          email: profileUpdates.email || parsed.email,
          title: profileUpdates.headline || parsed.title
        };
        localStorage.setItem('dayone_user', JSON.stringify(updatedUser));
      }
    } catch (e) {}

    dispatchDashboardEvent(dashboard);
    return dashboard;
  } catch (err) {
    console.error('[DashboardStore] Error updating user profile:', err);
    return null;
  }
}

/**
 * Calculate dynamic domain growth metrics, stage progression, and radar breakdown
 */
export function getDomainGrowthMetrics(dashboard) {
  if (!dashboard) return null;

  const baseline = dashboard.readiness?.baseline || 50;
  const current = dashboard.readiness?.current || 50;
  const gain = current - baseline;

  // Level classification
  let stageName = 'Beginner';
  let nextStageName = 'Intermediate';
  let stageMin = 0;
  let stageTarget = 55;
  let levelIndex = 1;

  if (current >= 85) {
    stageName = 'Advanced / Staff Architect';
    nextStageName = 'Distinguished Engineer';
    stageMin = 85;
    stageTarget = 100;
    levelIndex = 4;
  } else if (current >= 70) {
    stageName = 'Professional / Senior';
    nextStageName = 'Advanced / Staff';
    stageMin = 70;
    stageTarget = 85;
    levelIndex = 3;
  } else if (current >= 55) {
    stageName = 'Intermediate';
    nextStageName = 'Professional / Senior';
    stageMin = 55;
    stageTarget = 70;
    levelIndex = 2;
  }

  const levelProgress = Math.min(100, Math.max(0, Math.round(((current - stageMin) / (stageTarget - stageMin)) * 100)));

  return {
    baseline,
    current,
    gain,
    stageName,
    nextStageName,
    levelIndex,
    levelProgress,
    targetScore: stageTarget,
    tasksCount: dashboard.metrics?.tasksCompleted || 0,
    tasksPassed: dashboard.metrics?.tasksPassed || 0,
    flagsCaptured: dashboard.metrics?.totalFlagsCaptured || 0
  };
}

function dispatchDashboardEvent(dashboard) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dayone:dashboard_updated', { detail: dashboard }));
  }
}
