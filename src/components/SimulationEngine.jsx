import React, { useState } from 'react';
import RoleSelector from './RoleSelector';
import MissionGenerator from './MissionGenerator';
import WorkspaceRenderer from './WorkspaceRenderer';
import EvaluationEngine from './EvaluationEngine';
import { SIMULATION_EVENTS } from '../data/events';
import { buildSimulationMissionData } from '../lib/skills/missionBridge';
import { selectAssignedTasksForCandidate } from '../data/taskDatabase';
import { getLevelInfo, getNextLevel } from '../lib/skills/statsEngine';
import { 
  Sparkles, Layers, Shield, Award, Terminal, 
  ChevronRight, RefreshCw, Cpu, LogOut, CheckCircle2, LayoutDashboard
} from 'lucide-react';

const STAGES = {
  ROLE_SELECT: 'ROLE_SELECT',
  MISSION_GEN: 'MISSION_GEN',
  WORKSPACE: 'WORKSPACE',
  EVALUATION: 'EVALUATION'
};

export default function SimulationEngine({ 
  currentUser, 
  onLogout, 
  initialMissionData = null, 
  onSelectNewRole: propOnSelectNewRole = null,
  onViewDashboard = null
}) {
  const [currentStage, setCurrentStage] = useState(
    initialMissionData ? STAGES.WORKSPACE : STAGES.ROLE_SELECT
  );

  // Core Generic Simulation State
  const [simulationConfig, setSimulationConfig] = useState(null);
  const [missionData, setMissionData] = useState(initialMissionData || null);
  const [workspaceState, setWorkspaceState] = useState(null);

  // Multi-Task & 4-Level progression state
  const [currentLevel, setCurrentLevel] = useState(
    initialMissionData?.candidateLevel || 2
  );
  const [taskIndex, setTaskIndex] = useState(
    initialMissionData?.taskIndex || 0
  );
  const [assignedTasks, setAssignedTasks] = useState(() => {
    if (initialMissionData?.allAssignedTasks && initialMissionData.allAssignedTasks.length > 0) {
      return initialMissionData.allAssignedTasks;
    }
    if (initialMissionData?.assignedTask) {
      return [initialMissionData.assignedTask];
    }
    return [];
  });

  const [simulationEvents, setSimulationEvents] = useState(() => {
    if (initialMissionData) {
      const initialRoleEvents = SIMULATION_EVENTS[initialMissionData.role?.id] || [];
      return initialRoleEvents.slice(0, 1);
    }
    return [];
  });

  // Step 1: User selects role and benchmarks skills
  const handleRoleSelected = (config) => {
    // config contains: { role, skills, candidateProfile, skillGaps, matchedTask }
    setSimulationConfig(config);
    setCurrentStage(STAGES.MISSION_GEN);
  };

  // Step 2: Mission generated and launched into workspace
  const handleLaunchMission = (generatedMissionData) => {
    setMissionData(generatedMissionData);
    // Initialize simulation events pool for this role
    const initialRoleEvents = SIMULATION_EVENTS[generatedMissionData.role.id] || [];
    setSimulationEvents(initialRoleEvents.slice(0, 1)); // first event ready
    setCurrentStage(STAGES.WORKSPACE);
  };

  // Step 3: Trigger dynamic workplace event on demand
  const handleTriggerSimEvent = () => {
    if (!missionData) return;
    const pool = SIMULATION_EVENTS[missionData.role.id] || [];
    const unposted = pool.filter(e => !simulationEvents.some(se => se.id === e.id));
    
    if (unposted.length > 0) {
      setSimulationEvents(prev => [...prev, unposted[0]]);
    } else {
      // Inject synthetic update
      const synthetic = {
        id: `synth-${Date.now()}`,
        channel: '#sprint-updates',
        sender: { name: 'Automated Health Check', avatar: '⚡', role: 'Monitor' },
        content: `Telemetry probe verified healthy responses on node ${Math.floor(10 + Math.random() * 80)}.`,
        badge: 'Health Check'
      };
      setSimulationEvents(prev => [...prev, synthetic]);
    }
  };

  // Step 4: Submit simulation for evaluation
  const handleSubmitEvaluation = (finalWorkspaceState) => {
    setWorkspaceState(finalWorkspaceState);
    setCurrentStage(STAGES.EVALUATION);
  };

  // Retake or restart
  const handleRetakeSimulation = () => {
    setCurrentStage(STAGES.WORKSPACE);
  };

  // Step 5: Sequential Multi-Task Progression (Task 1 -> Task 2)
  const handleProceedToNextTask = () => {
    const nextIdx = taskIndex + 1;
    let nextTask = assignedTasks[nextIdx];

    // Fallback if not preloaded
    if (!nextTask) {
      const poolTasks = selectAssignedTasksForCandidate({
        roleId: missionData?.role?.id || 'frontend',
        candidateLevel: currentLevel,
        skillGaps: missionData?.skillGaps || [],
        candidateProfile: missionData?.candidateProfile,
        maxTasks: 2
      });
      nextTask = poolTasks[nextIdx] || poolTasks[0];
    }

    const nextSimData = buildSimulationMissionData({
      targetRole: missionData?.targetRole || missionData?.role,
      candidateProfile: missionData?.candidateProfile,
      skillGaps: missionData?.skillGaps,
      priorityGaps: missionData?.priorityGaps,
      aiMission: missionData?.aiMission,
      assignedTask: nextTask,
      allAssignedTasks: assignedTasks,
      taskIndex: nextIdx,
      candidateLevel: currentLevel
    });

    setTaskIndex(nextIdx);
    setMissionData(nextSimData);
    setWorkspaceState(null);
    setCurrentStage(STAGES.WORKSPACE);
  };

  // Step 6: 4-Level Progression Promotion (Level N -> Level N+1)
  const handleAdvanceToNextLevel = (nextLevelNum) => {
    const targetLevel = nextLevelNum || (currentLevel + 1);

    // Dynamically pick 2 new tasks targeting weaknesses at the next level from the 8-task pool
    const newTasks = selectAssignedTasksForCandidate({
      roleId: missionData?.role?.id || 'frontend',
      candidateLevel: targetLevel,
      skillGaps: missionData?.skillGaps || [],
      candidateProfile: missionData?.candidateProfile,
      maxTasks: 2
    });

    const firstTask = newTasks[0];
    const newSimData = buildSimulationMissionData({
      targetRole: missionData?.targetRole || missionData?.role,
      candidateProfile: missionData?.candidateProfile,
      skillGaps: missionData?.skillGaps,
      priorityGaps: missionData?.priorityGaps,
      aiMission: missionData?.aiMission,
      assignedTask: firstTask,
      allAssignedTasks: newTasks,
      taskIndex: 0,
      candidateLevel: targetLevel
    });

    setCurrentLevel(targetLevel);
    setAssignedTasks(newTasks);
    setTaskIndex(0);
    setMissionData(newSimData);
    setWorkspaceState(null);
    setCurrentStage(STAGES.WORKSPACE);
  };

  const handleSelectNewRole = () => {
    if (propOnSelectNewRole) {
      propOnSelectNewRole();
    } else {
      setCurrentStage(STAGES.ROLE_SELECT);
    }
  };

  const currentLevelInfo = getLevelInfo(currentLevel);

  return (
    <div className="simulation-engine-app">
      {/* Global Engine Stepper / Breadcrumbs */}
      <header className="engine-top-nav">
        <div className="nav-brand-group">
          <div className="brand-logo-mark">DayOne<span>.ai</span></div>
          <span className="platform-tag">Role Simulation Engine</span>
        </div>

        {/* Dynamic Workflow Stepper */}
        <div className="engine-stepper-steps">
          <div className={`step-item ${currentStage === STAGES.ROLE_SELECT ? 'current' : 'completed'}`}>
            <span className="step-num">1</span>
            <span className="step-label">Role & Gaps</span>
          </div>
          <ChevronRight size={14} className="step-arrow" />

          <div className={`step-item ${currentStage === STAGES.MISSION_GEN ? 'current' : (currentStage === STAGES.WORKSPACE || currentStage === STAGES.EVALUATION ? 'completed' : '')}`}>
            <span className="step-num">2</span>
            <span className="step-label">Mission Brief</span>
          </div>
          <ChevronRight size={14} className="step-arrow" />

          <div className={`step-item ${currentStage === STAGES.WORKSPACE ? 'current' : (currentStage === STAGES.EVALUATION ? 'completed' : '')}`}>
            <span className="step-num">3</span>
            <span className="step-label">Role Workspace</span>
          </div>
          <ChevronRight size={14} className="step-arrow" />

          <div className={`step-item ${currentStage === STAGES.EVALUATION ? 'current' : ''}`}>
            <span className="step-num">4</span>
            <span className="step-label">Evaluation & Credential</span>
          </div>
        </div>

        {/* Global Action Status & Level/Task Indicator */}
        <div className="engine-global-status">
          {missionData && (
            <div className="engine-level-badge">
              <span className="badge-level-name">Level {currentLevel}: {currentLevelInfo.name}</span>
              <span className="badge-task-counter">Task {taskIndex + 1} of {assignedTasks.length > 0 ? assignedTasks.length : 2}</span>
            </div>
          )}
          {simulationConfig && !missionData && (
            <span className="active-role-pill">
              {simulationConfig.role.name}
            </span>
          )}
          {currentUser && (
            <div className="user-profile-nav">
              <span className="user-avatar-bubble">{currentUser.avatar || '👤'}</span>
              <span className="user-display-name">{currentUser.name}</span>
              {onViewDashboard && (
                <button 
                  type="button"
                  className="btn btn-secondary btn-xs flex-row items-center gap-1"
                  onClick={onViewDashboard}
                  title="Open Candidate Profile Dashboard"
                >
                  <LayoutDashboard size={12} className="text-cyan" />
                  <span>Dashboard</span>
                </button>
              )}
              <button 
                className="btn-logout-nav" 
                onClick={onLogout}
                title="Sign Out to Login / Register Screen"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Lifecycle Stages */}
      <main className="simulation-main-stage">
        {currentStage === STAGES.ROLE_SELECT && (
          <RoleSelector 
            onRoleSelected={handleRoleSelected}
            initialRoleId={simulationConfig?.role.id || currentUser?.role || 'frontend'}
            currentUser={currentUser}
          />
        )}

        {currentStage === STAGES.MISSION_GEN && simulationConfig && (
          <MissionGenerator 
            role={simulationConfig.role}
            skills={simulationConfig.skills}
            skillGaps={simulationConfig.skillGaps}
            matchedTask={simulationConfig.matchedTask}
            candidateProfile={simulationConfig.candidateProfile}
            onLaunchMission={handleLaunchMission}
            onBackToRoles={() => setCurrentStage(STAGES.ROLE_SELECT)}
          />
        )}

        {currentStage === STAGES.WORKSPACE && missionData && (
          <WorkspaceRenderer 
            missionData={missionData}
            simulationEvents={simulationEvents}
            onTriggerSimEvent={handleTriggerSimEvent}
            onSubmitForEvaluation={handleSubmitEvaluation}
            currentUser={currentUser}
            onViewDashboard={onViewDashboard}
          />
        )}

        {currentStage === STAGES.EVALUATION && missionData && (
          <EvaluationEngine 
            missionData={missionData}
            workspaceState={workspaceState}
            onRetakeSimulation={handleRetakeSimulation}
            onSelectNewRole={handleSelectNewRole}
            onProceedToNextTask={handleProceedToNextTask}
            onAdvanceToNextLevel={handleAdvanceToNextLevel}
            onViewDashboard={onViewDashboard}
            taskIndex={taskIndex}
            totalTasksInLevel={assignedTasks.length > 0 ? assignedTasks.length : 2}
            currentLevel={currentLevel}
          />
        )}
      </main>
    </div>
  );
}
