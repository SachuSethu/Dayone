// src/components/MissionGenerator.jsx
import React, { useState } from 'react';
import { 
  Terminal, Shield, Play, Sparkles, Layers, CheckCircle2, 
  Clock, Cpu, AlertTriangle, FileCode, ArrowLeft, RefreshCw, Send
} from 'lucide-react';

export default function MissionGenerator({ 
  role, 
  skills, 
  skillGaps, 
  matchedTask, 
  candidateProfile,
  onLaunchMission,
  onBackToRoles 
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(matchedTask.difficulty || 'Mid-Level');

  // Build the dynamic MissionData object that the Workspace consumes
  const missionTemplate = matchedTask.missionDataTemplate || {};
  
  const missionData = {
    missionId: `MSN-${role.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    missionCode: missionTemplate.missionCode || `D1-${role.id.toUpperCase()}-01`,
    role: role,
    skills: skills,
    skillGaps: skillGaps,
    taskType: matchedTask.archetype,
    difficulty: selectedDifficulty,
    environment: {
      ...role.environment,
      ...matchedTask.environment
    },
    tools: role.tools,
    evaluationCriteria: matchedTask.evaluationCriteria,
    candidateProfile: candidateProfile,
    aiLead: role.aiLead,
    scenarioBrief: missionTemplate.scenarioBrief,
    incidentPriority: missionTemplate.incidentPriority || 'P1 - High Priority',
    estimatedDurationMinutes: missionTemplate.estimatedDurationMinutes || 20,
    objectives: missionTemplate.objectives || [
      'Investigate root-cause across workplace telemetry',
      'Execute technical remediation in the appropriate role tool',
      'Verify system recovery and submit for AI Lead evaluation'
    ],
    // State payloads for tools:
    initialCode: missionTemplate.initialCode || null,
    initialTerminalHistory: missionTemplate.initialTerminalHistory || [
      `${role.id}-shell:~$ systemctl status`,
      `[OK] Systems initialized.`
    ],
    initialLogs: missionTemplate.initialLogs || [],
    simulatedThreatData: missionTemplate.simulatedThreatData || null,
    currentLayoutState: missionTemplate.currentLayoutState || null,
    createdAt: new Date().toISOString()
  };

  // Structured prompt ready for Gemini / OpenAI API integration
  const dynamicAIPrompt = `SYSTEM: You are the DayOne.ai Role Simulation Architect.
Generate an authentic, high-fidelity workplace simulation scenario for:

ROLE: ${role.name} (${role.department})
DIFFICULTY: ${selectedDifficulty}
CANDIDATE SKILL DEFICITS:
${skillGaps.slice(0, 2).map(g => `- ${g.name}: ${g.candidateScore}% (Required: ${g.requiredScore}%, Deficit: -${g.gap}%)`).join('\n')}

TASK ARCHETYPE: ${matchedTask.archetype}
ENVIRONMENT:
${JSON.stringify(missionData.environment, null, 2)}

ALLOWED ROLE TOOLS:
${role.tools.map(t => `- ${t.name} (${t.category})`).join('\n')}

EVALUATION CRITERIA:
${JSON.stringify(matchedTask.evaluationCriteria, null, 2)}

INSTRUCTIONS:
1. Provide a realistic scenario brief involving realistic cross-functional friction.
2. Generate initial states for the role-specific tools (code/logs/brief/terminal).
3. Do not leak solutions; provide progressive clues via AI Lead (${role.aiLead.name}).`;

  const handleLaunch = () => {
    setIsGenerating(true);
    // Simulate dynamic mission assembly animation
    setTimeout(() => {
      setIsGenerating(false);
      onLaunchMission(missionData);
    }, 700);
  };

  return (
    <div className="mission-generator-container">
      {/* Top Bar */}
      <div className="flex-row justify-between items-center mb-4">
        <button className="btn btn-ghost btn-sm" onClick={onBackToRoles}>
          <ArrowLeft size={16} />
          <span>Back to Role Selection</span>
        </button>

        <div className="flex-row items-center gap-2">
          <span className="text-muted text-sm">Simulation Difficulty:</span>
          <div className="difficulty-toggle-group">
            {['Junior', 'Mid-Level', 'Senior'].map(lvl => (
              <button 
                key={lvl}
                className={`diff-btn ${selectedDifficulty === lvl ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Mission Briefing Card */}
      <div className="mission-brief-card">
        {/* Header */}
        <div className="mission-brief-header">
          <div>
            <div className="flex-row items-center gap-2 mb-1">
              <span className="mission-code-badge">{missionData.missionCode}</span>
              <span className="incident-p1-badge">{missionData.incidentPriority}</span>
              <span className="archetype-badge">{matchedTask.archetype}</span>
            </div>
            <h2 className="mission-title">{matchedTask.title}</h2>
          </div>

          <div className="mission-meta-stats">
            <div className="meta-stat-item">
              <Clock size={16} className="text-accent" />
              <span>{missionData.estimatedDurationMinutes} Mins Allocated</span>
            </div>
            <div className="meta-stat-item">
              <Cpu size={16} className="text-accent" />
              <span>{role.tools.length} Tools Instantiated</span>
            </div>
          </div>
        </div>

        {/* AI Lead Transmission Box */}
        <div className="ai-lead-transmission">
          <div className="lead-avatar-col">
            <div className="lead-avatar-bubble">{role.aiLead.avatar}</div>
          </div>
          <div className="lead-message-content">
            <div className="lead-header-row">
              <span className="lead-name">{role.aiLead.name}</span>
              <span className="lead-title">{role.aiLead.title}</span>
              <span className="status-live-dot">Live Transmission</span>
            </div>
            <p className="lead-speech">
              "{role.aiLead.initialGreeting}"
            </p>
          </div>
        </div>

        {/* Mission Objectives & Gaps Addressed */}
        <div className="mission-columns-grid">
          {/* Left Col: Objectives */}
          <div className="mission-col-box">
            <h4 className="col-heading">
              <CheckCircle2 size={18} className="text-accent" />
              <span>Sprint Objectives & Acceptance Criteria</span>
            </h4>
            <ul className="objectives-list">
              {missionData.objectives.map((obj, i) => (
                <li key={i} className="objective-item">
                  <span className="obj-number">0{i + 1}</span>
                  <span className="obj-text">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Col: Skill Gaps Targeted */}
          <div className="mission-col-box">
            <h4 className="col-heading">
              <AlertTriangle size={18} className="text-warning" />
              <span>Targeted Skill Deficits in this Mission</span>
            </h4>
            <div className="gaps-targeted-list">
              {skillGaps.slice(0, 3).map(gap => (
                <div key={gap.skillId} className="gap-targeted-card">
                  <div className="flex-row justify-between items-center mb-1">
                    <span className="font-semibold text-white">{gap.name}</span>
                    <span className="gap-negative">-{gap.gap}% Gap</span>
                  </div>
                  <div className="gap-mini-bar">
                    <div 
                      className="gap-mini-fill" 
                      style={{ width: `${gap.candidateScore}%` }} 
                    />
                  </div>
                  <span className="gap-category-label">{gap.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instantiated Tools & Environment Registry */}
        <div className="workspace-specs-box">
          <div className="specs-section">
            <span className="spec-label">Dynamically Loaded Workplace Tools:</span>
            <div className="tools-badges-cluster">
              {role.tools.map(tool => (
                <div key={tool.id} className="active-tool-pill">
                  <span className="pill-dot"></span>
                  <span className="pill-text">{tool.name}</span>
                  <span className="pill-category">{tool.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="specs-section mt-3">
            <span className="spec-label">Environment Architecture:</span>
            <div className="env-tags-row">
              {Object.entries(missionData.environment).map(([key, val]) => (
                <div key={key} className="env-tag">
                  <span className="env-key">{key}:</span>
                  <span className="env-val">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Evaluation Prompt Architecture Preview Toggle */}
        <div className="ai-prompt-preview-drawer">
          <button 
            className="btn-text-toggle"
            onClick={() => setShowPromptPreview(!showPromptPreview)}
          >
            <Sparkles size={15} />
            <span>{showPromptPreview ? 'Hide Dynamic AI Prompt Architecture' : 'View AI Evaluation Prompt Payload (Architecture Ready)'}</span>
          </button>

          {showPromptPreview && (
            <div className="prompt-code-block">
              <div className="prompt-code-header">
                <span>Dynamic AI Task Generation Schema</span>
                <span className="badge-pill-xs">Evaluation Ready</span>
              </div>
              <pre>{dynamicAIPrompt}</pre>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="mission-launch-footer">
          <div className="eval-notice">
            <Shield size={16} className="text-accent" />
            <span>Evaluation Engine active: Real-time scoring against 4 performance vectors.</span>
          </div>

          <button 
            className="btn btn-primary btn-launch" 
            onClick={handleLaunch}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Instantiating Role Workspace...</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span>Launch {role.shortName} Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
