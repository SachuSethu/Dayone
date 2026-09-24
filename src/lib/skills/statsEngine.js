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
  chaosResolved = true
}) {
  const levelInfo = getLevelInfo(candidateLevel);
  const targetMinutes = missionData?.estimatedDurationMinutes || levelInfo.targetMinutes || 20;

  // Check technical success
  const isPatched = Boolean(
    workspaceState?.feCodePatched || 
    workspaceState?.threatContained || 
    workspaceState?.activeLayoutVariant === 'variant_b' ||
    workspaceState?.testsPassed
  );

  const testsPassed = Boolean(workspaceState?.testsPassed || (isPatched && !workspaceState?.hasEdgeCaseFailure));
  const hasEdgeCaseFailure = Boolean(workspaceState?.hasEdgeCaseFailure);

  // Time performance calculation
  const timePerf = calculateTimePerformance({
    elapsedSeconds,
    targetDurationMinutes: targetMinutes,
    hintsUsed,
    isAccurate: isPatched && !hasEdgeCaseFailure
  });

  // Technical Review Scores (Step 12)
  const codeCorrectness = Math.round((isPatched ? 91 : 45) * (hasEdgeCaseFailure ? 0.78 : 1.0));
  const edgeCases = hasEdgeCaseFailure ? 58 : Math.round(78 * (testsPassed ? 1.15 : 0.85));
  const architecture = Math.round(84 * (workspaceState?.gitCommitted ? 1.05 : 0.95));
  const debugging = Math.round(94 * timePerf.speedMultiplier);

  // Workplace Review Scores (Step 12)
  const communication = Math.round((workspaceState?.gitCommitted ? 88 : 72) * (chaosResolved ? 1.08 : 0.9));
  const problemSolving = Math.round(91 * timePerf.speedMultiplier);
  const prioritization = chaosResolved ? 86 : 74;
  const coachability = Math.max(80, 96 - hintsUsed * 2);

  const technicalAverage = Math.round((codeCorrectness + edgeCases + architecture + debugging) / 4);
  const workplaceAverage = Math.round((communication + problemSolving + prioritization + coachability) / 4);

  // Combined Job Readiness Score
  const rawScore = Math.round((technicalAverage * 0.6) + (workplaceAverage * 0.4));
  const totalScore = Math.min(99, Math.max(35, rawScore));

  const passed = totalScore >= levelInfo.minCreditToPass && !hasEdgeCaseFailure;

  // Calculate Statistical Skill Improvements
  const skillGaps = missionData?.skillGaps || [];
  const skillImprovements = skillGaps.slice(0, 5).map(gap => {
    const before = Number(gap.candidateEvidencePercent || gap.candidateScore || 50);
    // Base gain modified by speed multiplier
    const baseGain = isPatched ? 22 : 8;
    const gain = Math.round(baseGain * timePerf.speedMultiplier);
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
    hasEdgeCaseFailure,
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
    demonstratedCapabilities: [
      `${missionData?.role?.name || 'Core'} Debugging`,
      'State Management & Lifecycle',
      'API Integration & Error Handling',
      'Edge-Case Verification',
      'Git Workflow & PR Hygiene',
      'Production Triage & Prioritization'
    ]
  };
}
