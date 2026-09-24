// src/App.jsx
// DayOne.ai — Gemini-Powered Resume Intelligence & Skill-Gap Analysis Application.

import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import TargetRoleSelector from './components/resume/TargetRoleSelector';
import ResumeUploader from './components/resume/ResumeUploader';
import AnalysisProgress from './components/resume/AnalysisProgress';
import CandidateProfileView from './components/resume/CandidateProfileView';
import SimulationEngine from './components/SimulationEngine';

import { ROLES_DATASET } from './lib/roles/roles';
import { calculateSkillGaps, getPriorityAreas } from './lib/skills/gapEngine';
import { 
  apiExtractResume, 
  apiAnalyzeResume, 
  apiAnalyzeGaps, 
  apiGenerateMission 
} from './lib/api/client';
import { buildSimulationMissionData } from './lib/skills/missionBridge';

import './App.css';

const APP_STAGES = {
  AUTH: 'AUTH',
  SELECT_ROLE: 'SELECT_ROLE',
  UPLOAD_RESUME: 'UPLOAD_RESUME',
  ANALYZING: 'ANALYZING',
  PROFILE_VIEW: 'PROFILE_VIEW',
  SIMULATION: 'SIMULATION'
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [currentStage, setCurrentStage] = useState(() => {
    return localStorage.getItem('dayone_user') ? APP_STAGES.SELECT_ROLE : APP_STAGES.AUTH;
  });

  // Selected Target Role
  const [selectedRole, setSelectedRole] = useState(ROLES_DATASET[0]);

  // Upload & Extraction state
  const [uploadedResumeMeta, setUploadedResumeMeta] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  // AI & Gap state
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [skillGaps, setSkillGaps] = useState([]);
  const [priorityGaps, setPriorityGaps] = useState([]);
  const [generatedMission, setGeneratedMission] = useState(null);

  // Simulation bridge data
  const [simulationMissionData, setSimulationMissionData] = useState(null);

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentStage(APP_STAGES.SELECT_ROLE);
  };

  const handleLogout = () => {
    localStorage.removeItem('dayone_user');
    setCurrentUser(null);
    setCurrentStage(APP_STAGES.AUTH);
  };

  // Step 1: Role Selected -> Go to must-fill Resume Upload
  const handleRoleSelected = (role) => {
    setSelectedRole(role);
    setCurrentStage(APP_STAGES.UPLOAD_RESUME);
  };

  // Step 2: Resume Submitted (Must-fill, un-skippable)
  const handleResumeSubmit = async (payload) => {
    setAnalysisError(null);
    setUploadedResumeMeta({ fileName: payload.fileName });
    setCurrentStage(APP_STAGES.ANALYZING);

    try {
      // 1. Server-side resume text extraction
      const extracted = await apiExtractResume(payload);
      setUploadedResumeMeta(extracted);

      // 2. Gemini Resume Understanding & Skill Evidence Extraction
      const profile = await apiAnalyzeResume(
        extracted.text,
        selectedRole.name,
        selectedRole.skills
      );
      setCandidateProfile(profile);

      // 3. Deterministic Gap Engine Computation
      const gaps = calculateSkillGaps(profile.skills, selectedRole.skills);
      setSkillGaps(gaps);

      // 4. Gemini Gap Diagnostics & Reasoning
      let pGaps = [];
      try {
        pGaps = await apiAnalyzeGaps(profile, selectedRole.skills, gaps);
      } catch (gapErr) {
        console.warn('Fallback gap reasoning:', gapErr);
        pGaps = getPriorityAreas(gaps, 3);
      }
      setPriorityGaps(pGaps);

      // 5. Gemini Synthesized First-Day Workplace Mission
      const mission = await apiGenerateMission(profile, selectedRole.name, pGaps);
      setGeneratedMission(mission);

      // Allow visual animation of pipeline to finish smoothly
      setTimeout(() => {
        setCurrentStage(APP_STAGES.PROFILE_VIEW);
      }, 1500);

    } catch (err) {
      console.error('[Resume Workflow Error]:', err);
      setAnalysisError(err.message || 'Failed to complete resume analysis.');
      setCurrentStage(APP_STAGES.UPLOAD_RESUME);
      alert(`Resume Processing Notice: ${err.message || 'Please check your resume document and try again.'}`);
    }
  };

  // Step 3: Launch Live First-Day Simulation
  const handleStartSimulation = (taskOverride = null) => {
    const liveSimData = buildSimulationMissionData({
      targetRole: selectedRole,
      candidateProfile,
      skillGaps,
      priorityGaps,
      aiMission: generatedMission,
      assignedTask: taskOverride
    });
    setSimulationMissionData(liveSimData);
    setCurrentStage(APP_STAGES.SIMULATION);
  };

  // Return to role selection
  const handleResetToRoles = () => {
    setCurrentStage(APP_STAGES.SELECT_ROLE);
  };

  // Return to resume upload
  const handleResetToUpload = () => {
    setCurrentStage(APP_STAGES.UPLOAD_RESUME);
  };

  return (
    <div className="dayone-app-root">
      {/* 1. AUTHENTICATION */}
      {currentStage === APP_STAGES.AUTH && (
        <AuthPage onLogin={handleLogin} />
      )}

      {/* 2. CHOOSE TARGET ROLE */}
      {currentStage === APP_STAGES.SELECT_ROLE && (
        <TargetRoleSelector 
          onSelectRole={handleRoleSelected}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* 3. MUST-FILL RESUME UPLOAD (NON-SKIPPABLE) */}
      {currentStage === APP_STAGES.UPLOAD_RESUME && (
        <ResumeUploader 
          targetRole={selectedRole}
          onBack={handleResetToRoles}
          onSubmitResume={handleResumeSubmit}
          currentUser={currentUser}
        />
      )}

      {/* 4. ANIMATED SEQUENTIAL AI EVALUATION */}
      {currentStage === APP_STAGES.ANALYZING && (
        <AnalysisProgress 
          targetRole={selectedRole}
          fileName={uploadedResumeMeta?.fileName}
        />
      )}

      {/* 5. INTERACTIVE CANDIDATE PROFILE & SKILL DNA VIEW */}
      {currentStage === APP_STAGES.PROFILE_VIEW && (
        <CandidateProfileView 
          candidateProfile={candidateProfile}
          targetRole={selectedRole}
          skillGaps={skillGaps}
          priorityGaps={priorityGaps}
          generatedMission={generatedMission}
          onStartSimulation={handleStartSimulation}
          onReset={handleResetToUpload}
        />
      )}

      {/* 6. LIVE WORKPLACE SIMULATION ENGINE */}
      {currentStage === APP_STAGES.SIMULATION && (
        <SimulationEngine 
          currentUser={currentUser} 
          onLogout={handleLogout}
          initialMissionData={simulationMissionData}
          onSelectNewRole={handleResetToRoles}
        />
      )}
    </div>
  );
}
