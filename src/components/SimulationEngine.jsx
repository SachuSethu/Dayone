// src/components/SimulationEngine.jsx
// Main generic simulation engine orchestrator coordinating the entire DayOne.ai role-based simulation lifecycle.

import React, { useState } from 'react';
import RoleSelector from './RoleSelector';
import MissionGenerator from './MissionGenerator';
import WorkspaceRenderer from './WorkspaceRenderer';
import EvaluationEngine from './EvaluationEngine';
import { SIMULATION_EVENTS } from '../data/events';
import { 
  Sparkles, Layers, Shield, Award, Terminal, 
  ChevronRight, RefreshCw, Cpu, LogOut
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
  onSelectNewRole: propOnSelectNewRole = null 
}) {
  const [currentStage, setCurrentStage] = useState(
    initialMissionData ? STAGES.WORKSPACE : STAGES.ROLE_SELECT
  );

  // Core Generic Simulation State
  const [simulationConfig, setSimulationConfig] = useState(null);
  const [missionData, setMissionData] = useState(initialMissionData || null);
  const [workspaceState, setWorkspaceState] = useState(null);
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

  const handleSelectNewRole = () => {
    if (propOnSelectNewRole) {
      propOnSelectNewRole();
    } else {
      setCurrentStage(STAGES.ROLE_SELECT);
    }
  };

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

        {/* Global Action Status */}
        <div className="engine-global-status">
          {simulationConfig && (
            <span className="active-role-pill">
              {simulationConfig.role.name}
            </span>
          )}
          {currentUser && (
            <div className="user-profile-nav">
              <span className="user-avatar-bubble">{currentUser.avatar || '👤'}</span>
              <span className="user-display-name">{currentUser.name}</span>
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
          />
        )}

        {currentStage === STAGES.EVALUATION && missionData && (
          <EvaluationEngine 
            missionData={missionData}
            workspaceState={workspaceState}
            onRetakeSimulation={handleRetakeSimulation}
            onSelectNewRole={handleSelectNewRole}
          />
        )}
      </main>
    </div>
  );
}
