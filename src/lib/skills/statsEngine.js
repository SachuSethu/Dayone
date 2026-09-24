// src/lib/skills/statsEngine.js
// Statistical Improvement & Time-Based Performance Engine for DayOne.ai
// Calculates speed bonuses, latency penalties, rubric metrics, and level progression credits.

/**
 * 4-Level Architecture Definitions
 */
export const LEVEL_DEFINITIONS = {
  1: { key: 'beginner', name: 'Beginner', level: 1, minCreditToPass: 75, targetMinutes: 15 },
  2: { key: 'intermediate', name: 'Intermediate', level: 2, minCreditToPass: 75, targetMinutes: 20 },
  3: { key: 'professional', name: 'Professional', level: 3, minCreditToPass: 80, targetMinutes: 25 },
  4: { key: 'advanced', name: 'Advanced', level: 4, minCreditToPass: 85, targetMinutes: 30 }
};

export function getLevelInfo(level) {
  const num = Number(level) || 2;
  return LEVEL_DEFINITIONS[num] || LEVEL_DEFINITIONS[2];
}

export function getNextLevel(currentLevel) {
  const num = Number(currentLevel) || 1;
  return num < 4 ? LEVEL_DEFINITIONS[num + 1] : null;
}

/**
 * Evaluates completion performance based on actual time elapsed vs target benchmark.
 * - Finishing fast with accuracy boosts statistical values.
 * - Finishing with very high time (e.g. running down the clock within 5 minutes of timeout)
 *   reduces statistical improvement.
 */
export function calculateTimePerformance({
  elapsedSeconds = 480,
  targetDurationMinutes = 20,
  hintsUsed = 0,
  isAccurate = true
}) {
  const targetSeconds = Math.max(300, targetDurationMinutes * 60);
  const timeRatio = Math.max(0.1, elapsedSeconds / targetSeconds);

  let speedTier = 'standard';
  let speedMultiplier = 1.0;
  let timeScore = 80;
  let feedback = 'Completed within standard operational timeframe.';

  if (timeRatio <= 0.50 && isAccurate) {
    // Finished in less than half the time with correct implementation -> High speed bonus
    speedTier = 'rapid';
    speedMultiplier = 1.25;
    timeScore = 96;
    feedback = 'Exceptional resolution velocity! High throughput with zero production regressions.';
  } else if (timeRatio <= 0.75 && isAccurate) {
    // Finished quickly
    speedTier = 'fast';
    speedMultiplier = 1.15;
    timeScore = 90;
    feedback = 'Swift diagnosis and patch delivery. Well ahead of production SLA benchmark.';
  } else if (timeRatio <= 0.88) {
    // Normal pace
    speedTier = 'standard';
    speedMultiplier = 1.0;
    timeScore = 82;
    feedback = 'Standard pace within expected sprint allocation.';
  } else {
    // Time was very high (finished close to deadline or under 5 minutes left) -> Statistical value reduced
    speedTier = 'delayed';
    speedMultiplier = 0.72; // Reduced statistical improvement
    timeScore = 64;
    feedback = 'High task completion time. Prolonged downtime reduces statistical readiness score.';
  }

  // Deduct slightly if multiple hints were requested
  const hintPenalty = Math.min(10, hintsUsed * 3);
  const adjustedScore = Math.max(45, timeScore - hintPenalty);

  return {
    elapsedSeconds,
    targetSeconds,
    timeRatio: Math.round(timeRatio * 100) / 100,
    speedTier,
    speedMultiplier,
    timeScore: adjustedScore,
    feedback
  };
}

/**
 * Comprehensive Evaluation Rubric & Statistical Progression
 */
export function calculateTaskEvaluation({
  missionData,
  workspaceState,
  elapsedSeconds = 540,
  candidateLevel = 2,
  hintsUsed = 0,
  chaosResolved = true,
  aiEvaluation = null
}) {
  const levelInfo = getLevelInfo(candidateLevel);
  const targetMinutes = missionData?.estimatedDurationMinutes || levelInfo.targetMinutes || 20;

  // 1. Strict diff validation: Check if submitted code is identical to initial code or only whitespace
  const normInitial = (workspaceState?.initialCode || '').replace(/\s+/g, '');
  const normSubmitted = (workspaceState?.submittedCode || '').replace(/\s+/g, '');
  const isWhitespaceOnly = Boolean(normInitial && normSubmitted && normInitial === normSubmitted);

  // 2. Base patched detection
  let isPatched = Boolean(
    workspaceState?.feCodePatched || 
    workspaceState?.threatContained || 
    workspaceState?.activeLayoutVariant === 'variant_b' ||
    workspaceState?.testsPassed
  );

  // Trivial/whitespace edits never count as patched
  if (isWhitespaceOnly) {
    isPatched = false;
  }

  // Gemini AI Evaluation acts as the supreme ground truth
  if (aiEvaluation) {
    isPatched = Boolean(aiEvaluation.isBugFixed);
  }

  const testsPassed = Boolean(workspaceState?.testsPassed || (isPatched && !workspaceState?.hasEdgeCaseFailure));
  const hasEdgeCaseFailure = Boolean(workspaceState?.hasEdgeCaseFailure);

  // Time performance calculation
  const timePerf = calculateTimePerformance({
    elapsedSeconds,
    targetDurationMinutes: targetMinutes,
    hintsUsed,
    isAccurate: isPatched && !hasEdgeCaseFailure
  });

  // Capture Flag Checkpoint Metrics (10 flags per task)
  const capturedFlags = workspaceState?.capturedFlags || [];
  const capturedCount = capturedFlags.length > 0 
    ? capturedFlags.length 
    : (isPatched ? 8 : 4);
  const totalFlagsCount = workspaceState?.totalFlagsCount || 10;
  const flagScore = workspaceState?.flagScore ?? (capturedCount * 10);
  const flagPercentage = Math.round((capturedCount / totalFlagsCount) * 100);

  // Technical Review Scores (Step 12)
  let codeCorrectness = isPatched ? 91 : (isWhitespaceOnly ? 18 : 45);
  let edgeCases = hasEdgeCaseFailure ? 58 : Math.round(78 * (testsPassed ? 1.15 : 0.85));
  let architecture = Math.round(84 * (workspaceState?.gitCommitted ? 1.05 : 0.95));
  let debugging = Math.round((70 + (flagPercentage * 0.3)) * timePerf.speedMultiplier);

  // Workplace Review Scores (Step 12)
  let communication = Math.round((workspaceState?.gitCommitted ? 88 : 72) * (chaosResolved ? 1.08 : 0.9));
  let problemSolving = Math.round((isPatched ? 75 : 30) + (flagPercentage * 0.25)) * timePerf.speedMultiplier;
  let prioritization = chaosResolved ? 86 : 74;
  let coachability = Math.max(80, 96 - hintsUsed * 2);

  // Overlay Gemini AI Scores if available
  if (aiEvaluation) {
    if (aiEvaluation.codeCorrectnessScore !== undefined) codeCorrectness = aiEvaluation.codeCorrectnessScore;
    if (aiEvaluation.edgeCasesScore !== undefined) edgeCases = aiEvaluation.edgeCasesScore;
    if (aiEvaluation.architectureScore !== undefined) architecture = aiEvaluation.architectureScore;
    if (aiEvaluation.debuggingScore !== undefined) debugging = aiEvaluation.debuggingScore;
    if (aiEvaluation.workplaceReview) {
      if (aiEvaluation.workplaceReview.communication) communication = aiEvaluation.workplaceReview.communication;
      if (aiEvaluation.workplaceReview.problemSolving) problemSolving = aiEvaluation.workplaceReview.problemSolving;
      if (aiEvaluation.workplaceReview.prioritization) prioritization = aiEvaluation.workplaceReview.prioritization;
      if (aiEvaluation.workplaceReview.coachability) coachability = aiEvaluation.workplaceReview.coachability;
    }
  }

  const technicalAverage = Math.round((codeCorrectness + edgeCases + architecture + debugging) / 4);
  const workplaceAverage = Math.round((communication + problemSolving + prioritization + coachability) / 4);

  // Job Readiness Score
  let rawScore = Math.round((technicalAverage * 0.45) + (workplaceAverage * 0.35) + (flagPercentage * 0.20));
  let totalScore = Math.min(99, Math.max(24, rawScore));

  if (aiEvaluation?.totalReadinessScore !== undefined) {
    totalScore = aiEvaluation.totalReadinessScore;
  } else if (isWhitespaceOnly) {
    totalScore = 24;
  }

  // Pass condition: Requires bug fixed AND totalScore >= min credit AND no unresolved edge case
  const passed = isPatched && totalScore >= levelInfo.minCreditToPass && !hasEdgeCaseFailure;

  // Calculate Statistical Skill Improvements
  // STRICT RULE: If bug is not fixed, statistical improvement gain is 0%!
  const skillGaps = missionData?.skillGaps || [];
  const skillImprovements = skillGaps.slice(0, 5).map(gap => {
    const before = Number(gap.candidateEvidencePercent || gap.candidateScore || 50);
    let gain = 0;
    if (isPatched && !isWhitespaceOnly) {
      const baseGain = aiEvaluation?.statisticalImprovementGain || 20;
      const flagBonus = Math.round((flagPercentage / 100) * 4);
      gain = Math.round((baseGain + flagBonus) * timePerf.speedMultiplier);
    }
    const after = Math.min(95, before + gain);
    return {
      skill: gap.skill || gap.name,
      before,
      after,
      gain: after - before,
      required: Number(gap.roleRequirementPercent || 75)
    };
  });

  // Unique verified credential id
  const rolePrefix = (missionData?.role?.id || 'frontend').slice(0, 4).toUpperCase();
  const hexRandom = Math.floor(0x1000 + Math.random() * 0xefff).toString(16).toUpperCase();
  const credentialId = `D1-${hexRandom}-${rolePrefix}`;

  return {
    totalScore,
    levelInfo,
    passed,
    isPatched,
    isWhitespaceOnly,
    aiEvaluation,
    hasEdgeCaseFailure,
    flagMetrics: {
      capturedCount,
      totalFlagsCount,
      flagScore,
      flagPercentage,
      passedAllFlags: capturedCount >= totalFlagsCount
    },
    edgeCaseDetails: hasEdgeCaseFailure ? {
      skill: 'API Error Handling',
      description: 'Your solution works for the primary case, but fails when the API returns an empty payment response.',
      currentCapability: 54,
      requiredCapability: 72,
      sprintMinutes: 7
    } : null,
    technicalReview: {
      codeCorrectness: Math.min(100, codeCorrectness),
      edgeCases: Math.min(100, edgeCases),
      architecture: Math.min(100, architecture),
      debugging: Math.min(100, debugging),
      average: technicalAverage
    },
    workplaceReview: {
      communication: Math.min(100, communication),
      problemSolving: Math.min(100, problemSolving),
      prioritization: Math.min(100, prioritization),
      coachability: Math.min(100, coachability),
      average: workplaceAverage
    },
    timePerformance: timePerf,
    skillImprovements,
    credentialId,
    demonstratedCapabilities: isPatched ? [
      `${missionData?.role?.name || 'Core'} Debugging`,
      'State Management & Lifecycle',
      'API Integration & Error Handling',
      'Edge-Case Verification',
      'Git Workflow & PR Hygiene',
      'Production Triage & Prioritization'
    ] : [
      'Initial Code Inspection',
      'Workspace Telemetry Navigation'
    ]
  };
}
