// src/lib/skills/missionBridge.js
// Bridges Gemini-generated mission telemetry, assigned tasks from the 192-task database, and candidate gap profiles with the live DayOne workspace engine.

import { ROLES } from '../../data/roles';
import { TASK_ARCHETYPES, normalizeRoleId } from '../../data/tasks';

export function buildSimulationMissionData({
  targetRole,
  candidateProfile,
  skillGaps = [],
  priorityGaps = [],
  aiMission = {},
  assignedTask = null
}) {
  const roleMapping = {
    'frontend-developer': 'frontend',
    'backend-developer': 'backend',
    'fullstack-developer': 'fullstack',
    'cybersecurity-analyst': 'cybersecurity',
    'uiux-designer': 'ui_ux',
    'data-analyst': 'data_analyst'
  };

  const simRoleId = roleMapping[targetRole.id] || normalizeRoleId(targetRole.id) || 'frontend';
  const matchedRole = ROLES.find(r => r.id === simRoleId) || ROLES[0];

  // If assignedTask was passed, use it, otherwise find a matching task archetype
  let matchedTask = assignedTask;
  if (!matchedTask) {
    matchedTask = TASK_ARCHETYPES.find(t => t.applicableRoles && t.applicableRoles.includes(simRoleId));
  }
  if (!matchedTask) {
    matchedTask = TASK_ARCHETYPES[0];
  }

  // Base fallback archetype to guarantee initialCode, terminalHistory, etc. never fail
  const baseArchetype = TASK_ARCHETYPES.find(t => t.applicableRoles && t.applicableRoles.includes(simRoleId)) || TASK_ARCHETYPES[0];
  const template = matchedTask.missionDataTemplate || baseArchetype.missionDataTemplate || {};
  const baseTemplate = baseArchetype.missionDataTemplate || {};

  const topGap = priorityGaps[0]?.skill || skillGaps[0]?.skill || matchedTask.competency || 'Core Capability';

  // Format objectives from subtasks if available
  const subtaskObjectives = (matchedTask.subtasks && matchedTask.subtasks.length > 0)
    ? matchedTask.subtasks.map((st, i) => `Subtask ${i === 0 ? 'A' : 'B'} (${st.title}): ${st.description}`)
    : (template.objectives || [
        `Analyze telemetry and reproduce the root cause targeting ${topGap}.`,
        `Implement error-resilient logic in the role workspace.`,
        `Execute automated tests in the terminal to verify zero regressions.`,
        `Commit your changes and submit for AI Lead review.`
      ]);

  return {
    missionId: `D1-AI-${simRoleId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    missionCode: template.missionCode || matchedTask.id || `D1-${simRoleId.toUpperCase()}-01`,
    role: matchedRole,
    skills: targetRole.skills || matchedTask.skills || [],
    skillGaps: skillGaps,
    priorityGaps: priorityGaps,
    taskType: matchedTask.archetype || baseArchetype.archetype || 'production_incident',
    difficulty: matchedTask.levelLabel || matchedTask.difficulty || aiMission.difficulty || 'Intermediate',
    subtasks: matchedTask.subtasks || [],
    matchingRationale: matchedTask.matchingRationale || null,
    competency: matchedTask.competency || null,
    environment: {
      ...matchedRole.environment,
      ...(baseArchetype.environment || {}),
      ...(matchedTask.environment || {})
    },
    tools: matchedRole.tools || [],
    evaluationCriteria: matchedTask.evaluationCriteria || baseArchetype.evaluationCriteria || {
      accuracy: 35,
      resilience: 25,
      testCoverage: 25,
      communication: 15
    },
    candidateProfile: {
      name: candidateProfile?.candidate?.detectedName || 'Candidate',
      targetRole: targetRole.name,
      topGap
    },
    aiLead: {
      ...matchedRole.aiLead,
      initialGreeting: `Welcome to DayOne! Sentry and telemetry just flagged a critical issue in our ${topGap} pipeline: "${matchedTask.shortDescription || aiMission.scenario || template.scenarioBrief}". Let's inspect the telemetry, check Jira, fix the root cause in the editor, and verify with tests before opening a PR.`
    },
    title: matchedTask.title || aiMission.title,
    scenarioBrief: matchedTask.shortDescription || template.scenarioBrief || aiMission.scenario,
    incidentPriority: template.incidentPriority || 'P1 - High Priority',
    estimatedDurationMinutes: matchedTask.estimatedMinutes || aiMission.estimatedMinutes || template.estimatedDurationMinutes || 30,
    objectives: subtaskObjectives,
    initialCode: template.initialCode || baseTemplate.initialCode || null,
    initialTerminalHistory: template.initialTerminalHistory || baseTemplate.initialTerminalHistory || [
      `${simRoleId}-shell:~$ npm test`,
      `FAIL: 3 assertions failed on ${topGap} timeout boundary`,
      `${simRoleId}-shell:~$`
    ],
    initialLogs: template.initialLogs || baseTemplate.initialLogs || [
      `[CRITICAL ALERT] Exception in ${topGap} handler: Operation timed out`,
      `[TELEMETRY] 504 Gateway Timeout on checkout API stream`
    ],
    simulatedThreatData: template.simulatedThreatData || baseTemplate.simulatedThreatData || null,
    currentLayoutState: template.currentLayoutState || baseTemplate.currentLayoutState || null,
    createdAt: new Date().toISOString()
  };
}
