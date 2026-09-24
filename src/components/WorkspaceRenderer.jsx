// src/components/WorkspaceRenderer.jsx
// Generic workspace renderer: Dynamically instantiates workplace tools based on the role's tool manifest.
// Do NOT show code editor to a cybersecurity analyst; do NOT show SIEM to a designer.

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, CheckSquare, Code, Terminal, Globe, 
  GitBranch, Bot, AlertTriangle, FileSearch, Activity, 
  Shield, Compass, Layers, SmilePlus, BookOpen, Kanban,
  Clock, ShieldAlert, Award, ArrowRight, Zap, Bell, CheckCircle2
} from 'lucide-react';

// Tool Components
import SlackTool from './tools/SlackTool';
import AIAssistantTool from './tools/AIAssistantTool';

// Frontend Tools
import JiraTool from './tools/frontend/JiraTool';
import MonacoEditorTool from './tools/frontend/MonacoEditorTool';
import TerminalTool from './tools/frontend/TerminalTool';
import BrowserPreviewTool from './tools/frontend/BrowserPreviewTool';
import GitTool from './tools/frontend/GitTool';

// Cybersecurity Tools
import IncidentTicketTool from './tools/cybersecurity/IncidentTicketTool';
import SiemTool from './tools/cybersecurity/SiemTool';
import CyberTerminalTool from './tools/cybersecurity/CyberTerminalTool';
import NetworkEventsTool from './tools/cybersecurity/NetworkEventsTool';

// Designer Tools
import DesignBriefTool from './tools/designer/DesignBriefTool';
import DesignCanvasTool from './tools/designer/DesignCanvasTool';
import UserFeedbackTool from './tools/designer/UserFeedbackTool';
import ResearchNotesTool from './tools/designer/ResearchNotesTool';
import ProjectBoardTool from './tools/designer/ProjectBoardTool';

// Generic Component Registry: Look up tool by ID
const TOOL_COMPONENT_REGISTRY = {
  // Universal
  slack: SlackTool,
  ai_assistant: AIAssistantTool,

  // Frontend
  jira: JiraTool,
  editor: MonacoEditorTool,
  terminal: TerminalTool,
  browser: BrowserPreviewTool,
  git: GitTool,

  // Cybersecurity
  incident_ticket: IncidentTicketTool,
  siem: SiemTool,
  network_events: NetworkEventsTool,

  // UI/UX Designer
  design_brief: DesignBriefTool,
  design_canvas: DesignCanvasTool,
  user_feedback: UserFeedbackTool,
  research_notes: ResearchNotesTool,
  project_board: ProjectBoardTool
};

// Icon map for tool tabs
const TOOL_ICON_MAP = {
  MessageSquare,
  CheckSquare,
  Code,
  Terminal,
  Globe,
  GitBranch,
  Bot,
  AlertTriangle,
  FileSearch,
  Activity,
  Shield,
  Compass,
  Layers,
  SmilePlus,
  BookOpen,
  Kanban
};

export default function WorkspaceRenderer({ 
  missionData, 
  simulationEvents = [],
  onTriggerSimEvent,
  onSubmitForEvaluation 
}) {
  const { role, tools, estimatedDurationMinutes } = missionData;

  // Active tool tab (default to the first active tool in role definition)
  const [activeToolId, setActiveToolId] = useState(() => {
    // If role has slack, default to slack or first tool
    return tools[0]?.id || 'slack';
  });

  // State maintained across tools during simulation
  const [workspaceState, setWorkspaceState] = useState({
    // Frontend state
    feCodePatched: false,
    testsPassed: false,
    gitCommitted: false,
    jiraStatus: 'In Progress',
    // Cybersecurity state
    threatContained: false,
    quarantinedIps: [],
    ticketTriageStatus: 'Triage In Progress',
    // Designer state
    activeLayoutVariant: 'variant_a',
    // General
    actionsCount: 0
  });

  // Countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState(estimatedDurationMinutes * 60);
  const [latestToast, setLatestToast] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen to simulation events for pop-up toast notifications
  useEffect(() => {
    if (!simulationEvents.length) return;
    const latest = simulationEvents[simulationEvents.length - 1];
    setLatestToast(latest);
    const timeout = setTimeout(() => setLatestToast(null), 5000);
    return () => clearTimeout(timeout);
  }, [simulationEvents]);

  // Handlers for state updates from tools
  const handleFeCodeUpdate = (isPatched) => {
    setWorkspaceState(prev => ({
      ...prev,
      feCodePatched: isPatched,
      actionsCount: prev.actionsCount + 1
    }));
  };

  const handleFeTestsPass = () => {
    setWorkspaceState(prev => ({
      ...prev,
      testsPassed: true,
      actionsCount: prev.actionsCount + 1
    }));
  };

  const handleFeGitCommit = () => {
    setWorkspaceState(prev => ({
      ...prev,
      gitCommitted: true,
      actionsCount: prev.actionsCount + 1
    }));
  };

  const handleContainThreat = (cidr) => {
    setWorkspaceState(prev => ({
      ...prev,
      threatContained: true,
      quarantinedIps: [...prev.quarantinedIps, cidr],
      actionsCount: prev.actionsCount + 1
    }));
  };

  const handleSaveVariant = (variant) => {
    setWorkspaceState(prev => ({
      ...prev,
      activeLayoutVariant: variant,
      actionsCount: prev.actionsCount + 1
    }));
  };

  // Format time MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine active component
  let ActiveComponent = TOOL_COMPONENT_REGISTRY[activeToolId];

  // Cybersecurity role uses special cyber terminal
  if (role.id === 'cybersecurity' && activeToolId === 'terminal') {
    ActiveComponent = CyberTerminalTool;
  }

  // Calculate readiness score
  const isReadyForSubmission = () => {
    if (role.id === 'frontend') {
      return workspaceState.feCodePatched || workspaceState.testsPassed;
    } else if (role.id === 'cybersecurity') {
      return workspaceState.threatContained;
    } else {
      return workspaceState.activeLayoutVariant === 'variant_b';
    }
  };

  return (
    <div className="workspace-engine-container">
      {/* Top Workspace Chrome / Control Bar */}
      <div className="workspace-top-bar">
        {/* Left: Role identity and task code */}
        <div className="workspace-identity">
          <div className="dayone-logo-icon">D1</div>
          <div>
            <div className="flex-row items-center gap-2">
              <span className="workspace-role-name">{role.name} Workspace</span>
              <span className="workspace-mission-pill">{missionData.missionCode}</span>
            </div>
            <div className="workspace-task-subtitle font-mono text-muted text-xs">
              {missionData.taskType.toUpperCase()} // {missionData.difficulty}
            </div>
          </div>
        </div>

        {/* Center: Mission Timer & Event Trigger */}
        <div className="workspace-timer-box">
          <div className="timer-badge">
            <Clock size={15} className="text-warning" />
            <span className="timer-digits font-mono">{formatTime(secondsRemaining)}</span>
          </div>

          <button 
            className="btn btn-secondary btn-xs btn-event-sim"
            onClick={onTriggerSimEvent}
            title="Inject real-time incident update / Slack message"
          >
            <Bell size={13} className="text-accent" />
            <span>Simulate Workplace Event</span>
          </button>
        </div>

        {/* Right: Submit Button */}
        <div className="workspace-submit-action">
          <button 
            className={`btn btn-submit-evaluation ${isReadyForSubmission() ? 'btn-ready' : ''}`}
            onClick={() => onSubmitForEvaluation(workspaceState)}
          >
            <Award size={16} />
            <span>Submit for Evaluation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Dynamic Role Tool Tabs Strip */}
      {/* STRICT RULE: Only tools present in role.tools are rendered! */}
      <div className="workspace-tools-nav-strip">
        <div className="tools-tabs-scroll">
          {tools.map(tool => {
            const IconComponent = TOOL_ICON_MAP[tool.icon] || Code;
            const isActive = activeToolId === tool.id;

            return (
              <button 
                key={tool.id}
                className={`tool-nav-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveToolId(tool.id)}
              >
                <IconComponent size={15} className="tab-icon" />
                <span className="tab-title">{tool.name}</span>

                {/* Dynamic mini indicators */}
                {tool.id === 'editor' && workspaceState.feCodePatched && (
                  <span className="tab-badge-indicator badge-green">Patched</span>
                )}
                {tool.id === 'terminal' && workspaceState.testsPassed && (
                  <span className="tab-badge-indicator badge-green">Tests 4/4</span>
                )}
                {tool.id === 'network_events' && (
                  <span className={`tab-badge-indicator ${workspaceState.threatContained ? 'badge-green' : 'badge-red'}`}>
                    {workspaceState.threatContained ? '140 RPS' : '2.8k RPS'}
                  </span>
                )}
                {tool.id === 'design_canvas' && workspaceState.activeLayoutVariant === 'variant_b' && (
                  <span className="tab-badge-indicator badge-green">Variant B</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tool Viewport */}
      <div className="workspace-active-viewport">
        {ActiveComponent ? (
          <ActiveComponent 
            role={role}
            missionData={missionData}
            workspaceState={workspaceState}
            simulationEvents={simulationEvents}
            // Frontend specific callbacks
            onCodeUpdate={handleFeCodeUpdate}
            onTestsPass={handleFeTestsPass}
            onGitCommit={handleFeGitCommit}
            // Cybersecurity specific callbacks
            onContainThreat={handleContainThreat}
            // Designer specific callbacks
            onSaveVariant={handleSaveVariant}
          />
        ) : (
          <div className="tool-fallback-empty">
            <AlertTriangle size={32} className="text-warning" />
            <p>Tool {activeToolId} is not loaded in this role configuration.</p>
          </div>
        )}
      </div>

      {/* Toast Notification Banner for Real-Time Simulation Events */}
      {latestToast && (
        <div className="sim-event-toast animate-slide-in">
          <div className="toast-icon-col">
            <span className="toast-avatar">{latestToast.sender?.avatar || '🔔'}</span>
          </div>
          <div className="toast-body">
            <div className="toast-header-row">
              <span className="toast-sender">{latestToast.sender?.name || 'Workplace Alert'}</span>
              <span className="toast-channel">{latestToast.channel || '#sprint'}</span>
            </div>
            <p className="toast-text">{latestToast.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
