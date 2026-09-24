// src/lib/skills/missionBridge.js
// Bridges Gemini-generated mission telemetry and candidate gap profiles with the live DayOne workspace engine.

import { ROLES } from '../../data/roles';
import { TASK_ARCHETYPES } from '../../data/tasks';

export function buildSimulationMissionData({
  targetRole,
  candidateProfile,
  skillGaps = [],
  priorityGaps = [],
  aiMission = {}
}) {
  // Map targetRole.id to simulation role id in ROLES
  const roleMapping = {
    'frontend-developer': 'frontend',
    'backend-developer': 'backend',
    'cybersecurity-analyst': 'cybersecurity',
    'uiux-designer': 'ui_ux',
    'data-analyst': 'data_analyst'
  };

  const simRoleId = roleMapping[targetRole.id] || 'frontend';
  const matchedRole = ROLES.find(r => r.id === simRoleId) || ROLES[0];

  // Find a matching task archetype
  let matchedTask = TASK_ARCHETYPES.find(t => t.applicableRoles && t.applicableRoles.includes(simRoleId));
  if (!matchedTask) {
    matchedTask = TASK_ARCHETYPES[0];
  }

  const template = matchedTask.missionDataTemplate || {};
  const topGap = priorityGaps[0]?.skill || skillGaps[0]?.skill || 'Core Capability';

  // Construct unified mission data
  return {
    missionId: `D1-AI-${simRoleId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    missionCode: template.missionCode || `D1-${simRoleId.toUpperCase()}-01`,
    role: matchedRole,
    skills: targetRole.skills || [],
    skillGaps: skillGaps,
    priorityGaps: priorityGaps,
    taskType: matchedTask.archetype || 'production_incident',
    difficulty: aiMission.difficulty || 'Intermediate',
    environment: {
      ...matchedRole.environment,
      ...matchedTask.environment
    },
    tools: matchedRole.tools || [],
    evaluationCriteria: matchedTask.evaluationCriteria || {
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
      initialGreeting: `Welcome to DayOne! Sentry and telemetry just flagged a critical issue in our ${topGap} pipeline: "${aiMission.scenario || template.scenarioBrief}". Let's inspect the telemetry, check Jira, fix the root cause in the editor, and verify with tests before opening a PR.`
    },
    title: aiMission.title || matchedTask.title,
    scenarioBrief: aiMission.scenario || template.scenarioBrief,
    incidentPriority: template.incidentPriority || 'P1 - High Priority',
    estimatedDurationMinutes: aiMission.estimatedMinutes || template.estimatedDurationMinutes || 45,
    objectives: [
      `Analyze telemetry and reproduce the root cause targeting ${topGap}.`,
      `Implement error-resilient logic in the role workspace.`,
      `Execute automated tests in the terminal to verify zero regressions.`,
      `Commit your changes and submit for AI Lead review.`
    ],
    initialCode: template.initialCode || null,
    initialTerminalHistory: template.initialTerminalHistory || [
      `${simRoleId}-shell:~$ npm test`,
      `FAIL: 3 assertions failed on ${topGap} timeout boundary`,
      `${simRoleId}-shell:~$`
    ],
    initialLogs: template.initialLogs || [
      `[CRITICAL ALERT] Exception in ${topGap} handler: Operation timed out`,
      `[TELEMETRY] 504 Gateway Timeout on checkout API stream`
    ],
    simulatedThreatData: template.simulatedThreatData || null,
    currentLayoutState: template.currentLayoutState || null,
    createdAt: new Date().toISOString()
  };
}
