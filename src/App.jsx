// src/App.jsx
// DayOne.ai — Gemini-Powered Resume Intelligence & Skill-Gap Analysis Application.

import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import TargetRoleSelector from './components/resume/TargetRoleSelector';
import ResumeUploader from './components/resume/ResumeUploader';
import AnalysisProgress from './components/resume/AnalysisProgress';
import CandidateProfileView from './components/resume/CandidateProfileView';
import SimulationEngine from './components/SimulationEngine';
import UserDashboard from './components/dashboard/UserDashboard';

import { ROLES_DATASET } from './lib/roles/roles';
import { calculateSkillGaps, getPriorityAreas } from './lib/skills/gapEngine';
import { 
  apiExtractResume, 
  apiAnalyzeResume, 
  apiAnalyzeGaps, 
  apiGenerateMission 
} from './lib/api/client';
import { buildSimulationMissionData } from './lib/skills/missionBridge';
import { initUserDashboard, getUserDashboard } from './lib/dashboard/dashboardStore';

import './App.css';

const APP_STAGES = {
  AUTH: 'AUTH',
  SELECT_ROLE: 'SELECT_ROLE',
  UPLOAD_RESUME: 'UPLOAD_RESUME',
  ANALYZING: 'ANALYZING',
  PROFILE_VIEW: 'PROFILE_VIEW',
  SIMULATION: 'SIMULATION',
  DASHBOARD: 'DASHBOARD'
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

  // Saved Resume persistence (preserves resume data across role changes and page refreshes)
  const [savedResume, setSavedResume] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_saved_resume');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Selected Target Role
  const [selectedRole, setSelectedRole] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_selected_role');
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = ROLES_DATASET.find(r => r.id === parsed.id);
        if (match) return match;
      }
    } catch (e) {}
    return ROLES_DATASET[0];
  });

  const [currentStage, setCurrentStage] = useState(() => {
    if (!localStorage.getItem('dayone_user')) return APP_STAGES.AUTH;
    const savedStage = localStorage.getItem('dayone_stage');
    if (savedStage && [APP_STAGES.SELECT_ROLE, APP_STAGES.PROFILE_VIEW, APP_STAGES.SIMULATION].includes(savedStage)) {
      // If we have saved profile and gaps, restore profile view directly
      if (savedStage === APP_STAGES.PROFILE_VIEW && localStorage.getItem('dayone_candidate_profile')) {
        return APP_STAGES.PROFILE_VIEW;
      }
      return savedStage;
    }
    return APP_STAGES.SELECT_ROLE;
  });

  // Upload & Extraction state
  const [uploadedResumeMeta, setUploadedResumeMeta] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_saved_resume');
      return saved ? { fileName: JSON.parse(saved).fileName } : null;
    } catch (e) {
      return null;
    }
  });
  const [analysisError, setAnalysisError] = useState(null);

  // AI & Gap state
  const [candidateProfile, setCandidateProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_candidate_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });
  const [skillGaps, setSkillGaps] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_skill_gaps');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [priorityGaps, setPriorityGaps] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_priority_gaps');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [generatedMission, setGeneratedMission] = useState(() => {
    try {
      const saved = localStorage.getItem('dayone_generated_mission');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  // Simulation bridge data
  const [simulationMissionData, setSimulationMissionData] = useState(null);

  // Initialize or restore candidate profile dashboard from saved state
  React.useEffect(() => {
    if (candidateProfile && selectedRole && !getUserDashboard()) {
      initUserDashboard({
        candidateProfile,
        targetRole: selectedRole,
        skillGaps,
        resumeFileName: uploadedResumeMeta?.fileName || 'Uploaded_Resume.pdf',
        currentUser
      });
    }
  }, [candidateProfile, selectedRole, skillGaps, uploadedResumeMeta, currentUser]);

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentStage(APP_STAGES.SELECT_ROLE);
    localStorage.setItem('dayone_stage', APP_STAGES.SELECT_ROLE);
  };

  const handleLogout = () => {
    localStorage.removeItem('dayone_user');
    localStorage.removeItem('dayone_saved_resume');
    localStorage.removeItem('dayone_selected_role');
    localStorage.removeItem('dayone_candidate_profile');
    localStorage.removeItem('dayone_skill_gaps');
    localStorage.removeItem('dayone_priority_gaps');
    localStorage.removeItem('dayone_generated_mission');
    localStorage.removeItem('dayone_stage');
    setCurrentUser(null);
    setSavedResume(null);
    setCandidateProfile(null);
    setCurrentStage(APP_STAGES.AUTH);
  };

  // Step 1: Role Selected -> If resume is already saved, automatically analyze for this role without re-uploading!
  const handleRoleSelected = (role) => {
    setSelectedRole(role);
    localStorage.setItem('dayone_selected_role', JSON.stringify(role));

    // Check if resume data already exists in memory or localStorage
    const existingResume = savedResume || (() => {
      try {
        const d = localStorage.getItem('dayone_saved_resume');
        return d ? JSON.parse(d) : null;
      } catch (e) { return null; }
    })();

    if (existingResume && existingResume.text) {
      // Re-use saved resume directly: analyze against the newly chosen role!
      handleResumeSubmit({
        type: 'text',
        text: existingResume.text,
        fileName: existingResume.fileName || 'Uploaded_Resume.pdf'
      }, role);
    } else {
      setCurrentStage(APP_STAGES.UPLOAD_RESUME);
      localStorage.setItem('dayone_stage', APP_STAGES.UPLOAD_RESUME);
    }
  };

  // Step 2: Resume Submitted (Saves resume to avoid re-uploading on role changes or refresh)
  const handleResumeSubmit = async (payload, targetRoleOverride = null) => {
    const roleToEvaluate = targetRoleOverride || selectedRole;
    setAnalysisError(null);
    setUploadedResumeMeta({ fileName: payload.fileName });
    setCurrentStage(APP_STAGES.ANALYZING);
    localStorage.setItem('dayone_stage', APP_STAGES.ANALYZING);

    try {
      // 1. Server-side resume text extraction
      const extracted = await apiExtractResume(payload);
      setUploadedResumeMeta(extracted);

      // Persist resume data to localStorage so it is never lost on back/refresh/role changes
      const resumeRecord = {
        text: extracted.text,
        fileName: payload.fileName || extracted.fileName || 'Uploaded_Resume.pdf',
        savedAt: Date.now()
      };
      setSavedResume(resumeRecord);
      localStorage.setItem('dayone_saved_resume', JSON.stringify(resumeRecord));

      // 2. Gemini Resume Understanding & Skill Evidence Extraction (No mandatory certs/projects)
      const profile = await apiAnalyzeResume(
        extracted.text,
        roleToEvaluate.name,
        roleToEvaluate.skills
      );

      setCandidateProfile(profile);
      localStorage.setItem('dayone_candidate_profile', JSON.stringify(profile));

      // 3. Deterministic Gap Engine Computation
      const gaps = calculateSkillGaps(profile.skills, roleToEvaluate.skills);
      setSkillGaps(gaps);
      localStorage.setItem('dayone_skill_gaps', JSON.stringify(gaps));

      // 4. Gemini Gap Diagnostics & Reasoning
      let pGaps = [];
      try {
        pGaps = await apiAnalyzeGaps(profile, roleToEvaluate.skills, gaps);
      } catch (gapErr) {
        console.warn('Fallback gap reasoning:', gapErr);
        pGaps = getPriorityAreas(gaps, 3);
      }
      setPriorityGaps(pGaps);
      localStorage.setItem('dayone_priority_gaps', JSON.stringify(pGaps));

      // 5. Gemini Synthesized First-Day Workplace Mission
      const mission = await apiGenerateMission(profile, roleToEvaluate.name, pGaps);
      setGeneratedMission(mission);
      localStorage.setItem('dayone_generated_mission', JSON.stringify(mission));

      // 6. Initialize Dynamic Candidate Dashboard from Resume
      initUserDashboard({
        candidateProfile: profile,
        targetRole: roleToEvaluate,
        skillGaps: gaps,
        resumeFileName: payload.fileName || extracted.fileName || 'Uploaded_Resume.pdf',
        currentUser
      });

      // Allow visual animation of pipeline to finish smoothly
      setTimeout(() => {
        setCurrentStage(APP_STAGES.PROFILE_VIEW);
        localStorage.setItem('dayone_stage', APP_STAGES.PROFILE_VIEW);
      }, 1500);

    } catch (err) {
      console.error('[Resume Workflow Error]:', err);
      setAnalysisError(err.message || 'Failed to complete resume analysis.');
      setCurrentStage(APP_STAGES.UPLOAD_RESUME);
      localStorage.setItem('dayone_stage', APP_STAGES.UPLOAD_RESUME);
      alert(`Resume Processing Notice: ${err.message || 'Please check your resume document and try again.'}`);
    }
  };

  // Step 3: Launch Live First-Day Simulation
  const handleStartSimulation = (taskOverride = null, allTasks = [], taskIdx = 0, level = 2) => {
    const liveSimData = buildSimulationMissionData({
      targetRole: selectedRole,
      candidateProfile,
      skillGaps,
      priorityGaps,
      aiMission: generatedMission,
      assignedTask: taskOverride,
      allAssignedTasks: allTasks && allTasks.length > 0 ? allTasks : (taskOverride ? [taskOverride] : []),
      taskIndex: taskIdx,
      candidateLevel: level
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
          savedResume={savedResume}
          onUploadNewResume={handleResetToUpload}
          onOpenDashboard={() => setCurrentStage(APP_STAGES.DASHBOARD)}
        />
      )}

      {/* 3. RESUME UPLOAD */}
      {currentStage === APP_STAGES.UPLOAD_RESUME && (
        <ResumeUploader 
          targetRole={selectedRole}
          onBack={handleResetToRoles}
          onSubmitResume={handleResumeSubmit}
          currentUser={currentUser}
          savedResume={savedResume}
          onOpenDashboard={() => setCurrentStage(APP_STAGES.DASHBOARD)}
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
          onOpenDashboard={() => setCurrentStage(APP_STAGES.DASHBOARD)}
        />
      )}

      {/* 6. LIVE WORKPLACE SIMULATION ENGINE */}
      {currentStage === APP_STAGES.SIMULATION && (
        <SimulationEngine 
          currentUser={currentUser} 
          onLogout={handleLogout}
          initialMissionData={simulationMissionData}
          onSelectNewRole={handleResetToRoles}
          onViewDashboard={() => setCurrentStage(APP_STAGES.DASHBOARD)}
        />
      )}

      {/* 7. DYNAMIC CANDIDATE PROFILE DASHBOARD */}
      {currentStage === APP_STAGES.DASHBOARD && (
        <UserDashboard 
          onBack={() => setCurrentStage(candidateProfile ? APP_STAGES.PROFILE_VIEW : APP_STAGES.SELECT_ROLE)}
          onStartSimulation={handleStartSimulation}
          onSelectRole={handleResetToRoles}
          currentLevel={simulationMissionData?.candidateLevel || 2}
        />
      )}
    </div>
  );
}
