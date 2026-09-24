/**
 * DayOne.ai - Master Task Database & Dynamic Task Intelligence Engine
 * 
 * SCALE:
 * - 6 Target Roles: Frontend, Backend, Fullstack, UI/UX, Cybersecurity, Data Analyst
 * - 4 Experience Levels: 
 *     Level 1: Foundation (8 tasks per role)
 *     Level 2: Intermediate (8 tasks per role)
 *     Level 3: Advanced (8 tasks per role)
 *     Level 4: Critical Incident (8 tasks per role)
 * - 32 Main Tasks per role = 192 Main Task Candidates total
 * - Exactly 2 Subtasks per main task = 384 Subtasks total
 * 
 * CANDIDATE ASSIGNMENT RULES:
 * - The AI assigns EXACTLY 2 main tasks to a candidate at a time based on resume evidence,
 *   skill gaps, weaknesses, target role, and candidate level.
 * - TASK DIVERSITY RULE: The 2 assigned tasks must test different core competencies
 *   (never 2 identical bug types or identical competencies).
 * - BACKWARD COMPATIBILITY: Existing simulation engine components (FE-CRIT-049, SEC-INC-942,
 *   UX-AUDIT-208, Monaco editor, terminal, telemetry) are 100% preserved.
 */

import { FRONTEND_TASKS } from './tasks/frontendTasks.js';
import { BACKEND_TASKS } from './tasks/backendTasks.js';
import { FULLSTACK_TASKS } from './tasks/fullstackTasks.js';
import { UIUX_TASKS } from './tasks/uiuxTasks.js';
import { CYBERSECURITY_TASKS } from './tasks/cybersecurityTasks.js';
import { DATA_ANALYST_TASKS } from './tasks/dataAnalystTasks.js';

/**
 * Normalizes varied role identifiers to standard role keys
 */
export function normalizeRoleId(roleId) {
  if (!roleId) return 'frontend';
  const clean = String(roleId).toLowerCase().trim();
  
  if (clean.includes('front')) return 'frontend';
  if (clean.includes('full')) return 'fullstack';
  if (clean.includes('back')) return 'backend';
  if (clean.includes('cyber') || clean.includes('sec')) return 'cybersecurity';
  if (clean.includes('ui') || clean.includes('ux') || clean.includes('design')) return 'ui_ux';
  if (clean.includes('data') || clean.includes('anal')) return 'data_analyst';

  return 'frontend';
}

// Master aggregation of all 192 main tasks with normalized roleId and competency
export const ALL_TASKS = [
  ...FRONTEND_TASKS,
  ...BACKEND_TASKS,
  ...FULLSTACK_TASKS,
  ...UIUX_TASKS,
  ...CYBERSECURITY_TASKS,
  ...DATA_ANALYST_TASKS
].map(task => {
  const normRoleId = normalizeRoleId(task.roleId || task.role || task.applicableRoles?.[0]);
  const primaryCompetency = task.competency || (task.coreCompetencies && task.coreCompetencies[0]) || 'Software Engineering';
  const diffLabel = task.difficulty || (task.level === 1 ? 'Foundation' : task.level === 2 ? 'Intermediate' : task.level === 3 ? 'Advanced' : 'Critical Incident');
  return {
    ...task,
    roleId: normRoleId,
    competency: primaryCompetency,
    levelLabel: task.levelLabel || `Level ${task.level}: ${diffLabel}`
  };
});

export const TASK_DATABASE_STATS = {
  totalTasks: ALL_TASKS.length, // 192
  totalSubtasks: ALL_TASKS.reduce((acc, t) => acc + (t.subtasks?.length || 0), 0), // 384
  rolesCount: 6,
  levelsPerRole: 4,
  tasksPerLevel: 8
};

/**
 * Retrieves a single task by ID or aliasId
 */
export function findTaskById(taskId) {
  if (!taskId) return ALL_TASKS[0];
  return ALL_TASKS.find(t => t.id === taskId || t.aliasId === taskId) || ALL_TASKS[0];
}

/**
 * Retrieves all 32 tasks for a given role
 */
export function getTasksByRole(roleId) {
  const normId = normalizeRoleId(roleId);
  return ALL_TASKS.filter(t => t.roleId === normId);
}

/**
 * Retrieves the 8 tasks for a given role and level (1..4)
 */
export function getTasksByRoleAndLevel(roleId, level = 2) {
  const normId = normalizeRoleId(roleId);
  const targetLevel = Number(level) || 2;
  return ALL_TASKS.filter(t => t.roleId === normId && t.level === targetLevel);
}

/**
 * Determines the candidate's level (1, 2, 3, or 4) based on:
 * - Explicit level override
 * - Years of experience
 * - Average evidence percentage / readiness score
 */
export function determineCandidateLevel({ candidateProfile, skillGaps = [], candidateLevel = null }) {
  if (candidateLevel && [1, 2, 3, 4].includes(Number(candidateLevel))) {
    return Number(candidateLevel);
  }

  // Check years of experience if detected
  const yearsExp = candidateProfile?.candidate?.yearsExperience || 
                   candidateProfile?.yearsExperience || 
                   candidateProfile?.experienceYears;

  if (typeof yearsExp === 'number') {
    if (yearsExp <= 1.5) return 1; // Level 1: Foundation (Junior / 0-1 years)
    if (yearsExp <= 4.0) return 2; // Level 2: Intermediate (Mid / 2-4 years)
    if (yearsExp <= 7.5) return 3; // Level 3: Advanced (Senior / 5-7 years)
    return 4;                      // Level 4: Critical Incident (Lead/Staff / 8+ years)
  }

  // Check average evidence percentage from skill gaps
  if (Array.isArray(skillGaps) && skillGaps.length > 0) {
    const totalEvidence = skillGaps.reduce((acc, curr) => acc + (curr.candidateEvidencePercent || curr.evidence || 0), 0);
    const avgEvidence = totalEvidence / skillGaps.length;

    if (avgEvidence < 35) return 1; // Foundation
    if (avgEvidence < 65) return 2; // Intermediate
    if (avgEvidence < 80) return 3; // Advanced
    return 4;                       // Critical Incident
  }

  // Default to Level 2 (Intermediate)
  return 2;
}

/**
 * Dynamic Task Selector:
 * Selects EXACTLY 2 main tasks (with 2 subtasks each) from the candidate's role and level pool.
 * Enforces the TASK DIVERSITY RULE:
 * The 2 tasks must test different core competencies (never 2 identical bug types).
 *
 * @param {Object} params
 * @param {string} params.roleId Target role (e.g. 'frontend', 'backend', 'frontend-developer')
 * @param {number} [params.candidateLevel] Explicit or computed level (1..4)
 * @param {Array} [params.skillGaps] Candidate skill gaps with evidence scores
 * @param {Object} [params.candidateProfile] Resume profile
 * @param {number} [params.maxTasks=2] Number of tasks to assign (defaults to 2)
 * @returns {Array} Exactly 2 assigned task objects with matching rationale and subtasks
 */
export function selectAssignedTasksForCandidate({
  roleId,
  candidateLevel = null,
  skillGaps = [],
  candidateProfile = null,
  maxTasks = 2
}) {
  const normRoleId = normalizeRoleId(roleId);
  const resolvedLevel = candidateLevel || determineCandidateLevel({ candidateProfile, skillGaps });

  // Get the 8 task candidates for this role and level
  let levelTasks = getTasksByRoleAndLevel(normRoleId, resolvedLevel);

  // Fallback to all tasks for the role if specific level is empty
  if (!levelTasks || levelTasks.length === 0) {
    levelTasks = getTasksByRole(normRoleId);
  }
  if (!levelTasks || levelTasks.length === 0) {
    levelTasks = ALL_TASKS.slice(0, 8);
  }

  // Normalize gap strings for flexible matching
  const normalizedGaps = (skillGaps || []).map((gapItem, idx) => {
    const name = String(gapItem.skill || gapItem.skillId || gapItem.name || '').toLowerCase();
    const gapAmount = Number(gapItem.gap || (100 - (gapItem.candidateEvidencePercent || 0))) || 30;
    const rankWeight = (idx === 0) ? 3.0 : (idx === 1) ? 2.2 : (idx === 2) ? 1.6 : 1.0;
    return { name, gapAmount, rankWeight, raw: gapItem };
  });

  // Score each task against the candidate's skill gaps and weaknesses
  const scoredTasks = levelTasks.map(task => {
    let score = 10; // Baseline score
    let matchedGapName = null;
    let matchedCompetency = false;

    const taskSkills = (task.skills || []).map(s => String(s).toLowerCase());
    const taskCompetency = String(task.competency || '').toLowerCase();
    const taskTitle = String(task.title || '').toLowerCase();

    normalizedGaps.forEach(gap => {
      // Check if skill list matches gap
      const directMatch = taskSkills.some(ts => ts.includes(gap.name) || gap.name.includes(ts));
      // Check if competency matches gap
      const competencyMatch = taskCompetency.includes(gap.name) || gap.name.includes(taskCompetency);
      // Check title keywords
      const titleMatch = taskTitle.includes(gap.name);

      if (directMatch || competencyMatch || titleMatch) {
        const boost = (directMatch ? 40 : 25) * gap.rankWeight * (gap.gapAmount / 25);
        score += boost;
        if (!matchedGapName) {
          matchedGapName = gap.raw.skill || gap.raw.name || gap.name;
        }
        if (competencyMatch) matchedCompetency = true;
      }
    });

    return {
      task,
      score,
      matchedGapName: matchedGapName || (task.skills && task.skills[0]) || 'Core Capability',
      matchedCompetency
    };
  });

  // Sort tasks by matching score descending
  scoredTasks.sort((a, b) => b.score - a.score);

  const assignedTasks = [];

  // 1. Pick the primary #1 highest-scoring task
  const primaryItem = scoredTasks[0] || { task: levelTasks[0], score: 10, matchedGapName: 'Primary Focus' };
  assignedTasks.push({
    ...primaryItem.task,
    assignedOrder: 1,
    matchingRationale: `Directly targets priority gap in ${primaryItem.matchedGapName} under ${primaryItem.task.competency}.`,
    selectionScore: Math.round(primaryItem.score)
  });

  // 2. Pick the #2 task enforcing TASK DIVERSITY RULE:
  // Must test a DIFFERENT core competency than Task #1
  const primaryCompetency = primaryItem.task.competency;
  let secondaryItem = scoredTasks.find(item => 
    item.task.id !== primaryItem.task.id && 
    item.task.competency !== primaryCompetency
  );

  // If no task has a distinct competency (e.g. edge case in small subset), pick next highest score
  if (!secondaryItem && scoredTasks.length > 1) {
    secondaryItem = scoredTasks.find(item => item.task.id !== primaryItem.task.id);
  }

  if (secondaryItem) {
    assignedTasks.push({
      ...secondaryItem.task,
      assignedOrder: 2,
      matchingRationale: `Validates complementary domain in ${secondaryItem.task.competency} (${secondaryItem.matchedGapName}).`,
      selectionScore: Math.round(secondaryItem.score)
    });
  } else if (levelTasks.length > 1) {
    const fallback = levelTasks.find(t => t.id !== primaryItem.task.id) || levelTasks[1];
    assignedTasks.push({
      ...fallback,
      assignedOrder: 2,
      matchingRationale: `Validates complementary domain in ${fallback.competency}.`,
      selectionScore: 10
    });
  }

  // Ensure exactly maxTasks (default 2)
  return assignedTasks.slice(0, maxTasks);
}
