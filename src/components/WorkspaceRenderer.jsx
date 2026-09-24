// src/components/WorkspaceRenderer.jsx
// Generic workspace renderer: Dynamically instantiates workplace tools based on the role's tool manifest.
// Do NOT show code editor to a cybersecurity analyst; do NOT show SIEM to a designer.

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, CheckSquare, Code, Terminal, Globe, 
  GitBranch, Bot, AlertTriangle, FileSearch, Activity, 
  Shield, Compass, Layers, SmilePlus, BookOpen, Kanban,
  Clock, ShieldAlert, Award, ArrowRight, Zap, Bell, CheckCircle2, Flag
} from 'lucide-react';

import CaptureFlagsPanel from './CaptureFlagsPanel';

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
  onSubmitForEvaluation,
  currentUser = null,
  onViewDashboard = null
}) {
  const { role, tools, estimatedDurationMinutes } = missionData;

  // Active tool tab (default to the first active tool in role definition)
  const [activeToolId, setActiveToolId] = useState(() => {
    // If role has slack, default to slack or first tool
    return tools[0]?.id || 'slack';
  });

  const defaultInitialCode = (missionData?.assignedTask?.initialFiles && Object.values(missionData.assignedTask.initialFiles)[0]) || 
`// CRITICAL BUG: Unhandled rejected promises on 500/504
export async function submitCheckout(payload, maxRetries = 0) {
  // Missing timeout and retry logic
  const response = await fetch('/api/v2/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // BUG: Not checking response.ok properly
  const data = await response.json();
  return data;
}

export function calculateCartTotal(items, discountCode) {
  // BUG: Floating point precision error and missing null check
  let sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (discountCode === 'DAYONE20') {
    sum = sum * 0.8; // vulnerable to 0.79999999999
  }
  return sum;
}`;

  // State maintained across tools during simulation
  const [workspaceState, setWorkspaceState] = useState({
    // Frontend state
    feCodePatched: false,
    testsPassed: false,
    gitCommitted: false,
    jiraStatus: 'In Progress',
    initialCode: defaultInitialCode,
    submittedCode: defaultInitialCode,
    fileContents: null,
    // Cybersecurity state
    threatContained: false,
    quarantinedIps: [],
    ticketTriageStatus: 'Triage In Progress',
    // Designer state
    activeLayoutVariant: 'variant_a',
    // General
    actionsCount: 0
  });

  // Elapsed seconds tracking & countdown
  const [secondsRemaining, setSecondsRemaining] = useState(estimatedDurationMinutes * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [latestToast, setLatestToast] = useState(null);

  // Step 9: Work Observation Signals quietly collected by DayOne
  const [workSignals, setWorkSignals] = useState({
    investigatedCode: false,
    reproducedIssue: false,
    askedQuestion: false,
    identifiedDependency: false,
    testedHypothesis: false,
    hintsUsed: 0
  });

  // Step 10: Chaos Event State
  const [chaosEvent, setChaosEvent] = useState({
    active: false,
    triggered: false,
    resolved: false,
    decision: null
  });

  // Edge case toggle for Step 13 demonstration
  const [hasEdgeCaseFailure, setHasEdgeCaseFailure] = useState(false);

  // Capture Flags Checkpoints State (10 Flags per Task, 5 per Subtask)
  const [showFlagsPanel, setShowFlagsPanel] = useState(false);
  const [capturedFlagIds, setCapturedFlagIds] = useState(() => {
    return workspaceState?.capturedFlags || [];
  });

  const allTaskFlags = (missionData.subtasks || []).flatMap(st => st.flags || []);

  const handleCaptureFlag = (flagId, points) => {
    setCapturedFlagIds(prev => {
      if (prev.includes(flagId)) return prev;
      return [...prev, flagId];
    });
    setWorkSignals(prev => ({
      ...prev,
      investigatedCode: true,
      testedHypothesis: true,
      identifiedDependency: true
    }));
  };

  // Real-time auto-unlock when workspace actions occur
  useEffect(() => {
    if (workspaceState.feCodePatched) {
      const implFlag = allTaskFlags.find(f => f.type === 'implementation' || f.action?.includes('Modify code'));
      if (implFlag && !capturedFlagIds.includes(implFlag.id)) {
        setCapturedFlagIds(prev => [...prev, implFlag.id]);
      }
    }
  }, [workspaceState.feCodePatched, allTaskFlags]);

  useEffect(() => {
    if (workspaceState.testsPassed) {
      const verifyFlag = allTaskFlags.find(f => f.type === 'verification' || f.type === 'testing' || f.action?.includes('test'));
      if (verifyFlag && !capturedFlagIds.includes(verifyFlag.id)) {
        setCapturedFlagIds(prev => [...prev, verifyFlag.id]);
      }
    }
  }, [workspaceState.testsPassed, allTaskFlags]);

  useEffect(() => {
    if (workspaceState.gitCommitted) {
      const finalFlag = allTaskFlags.find(f => f.type === 'final_evidence' || f.action?.includes('evidence'));
      if (finalFlag && !capturedFlagIds.includes(finalFlag.id)) {
        setCapturedFlagIds(prev => [...prev, finalFlag.id]);
      }
    }
  }, [workspaceState.gitCommitted, allTaskFlags]);

  useEffect(() => {
    if (workspaceState.threatContained) {
      const contFlag = allTaskFlags.find(f => f.type === 'containment' || f.action?.includes('containment'));
      if (contFlag && !capturedFlagIds.includes(contFlag.id)) {
        setCapturedFlagIds(prev => [...prev, contFlag.id]);
      }
    }
  }, [workspaceState.threatContained, allTaskFlags]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-trigger Chaos Event after 25 seconds of work if not yet triggered
  useEffect(() => {
    if (!chaosEvent.triggered && elapsedSeconds >= 25) {
      setChaosEvent(prev => ({ ...prev, active: true, triggered: true }));
    }
  }, [elapsedSeconds, chaosEvent.triggered]);

  // Track signals based on active tools
  useEffect(() => {
    if (activeToolId === 'editor') {
      setWorkSignals(prev => ({ ...prev, investigatedCode: true, identifiedDependency: true }));
    } else if (activeToolId === 'terminal') {
      setWorkSignals(prev => ({ ...prev, testedHypothesis: true }));
    } else if (activeToolId === 'browser' || activeToolId === 'jira') {
      setWorkSignals(prev => ({ ...prev, reproducedIssue: true }));
    }
  }, [activeToolId]);

  // Listen to simulation events for pop-up toast notifications
  useEffect(() => {
    if (!simulationEvents.length) return;
    const latest = simulationEvents[simulationEvents.length - 1];
    setLatestToast(latest);
    const timeout = setTimeout(() => setLatestToast(null), 5000);
    return () => clearTimeout(timeout);
  }, [simulationEvents]);

  // Handlers for state updates from tools
  const handleFeCodeUpdate = (isPatched, updatedFiles) => {
    setWorkSignals(prev => ({ ...prev, investigatedCode: true, testedHypothesis: true }));
    setWorkspaceState(prev => ({
      ...prev,
      feCodePatched: isPatched,
      fileContents: updatedFiles || prev.fileContents,
      submittedCode: updatedFiles ? (updatedFiles['src/services/checkoutApi.js'] || Object.values(updatedFiles)[0]) : prev.submittedCode,
      actionsCount: prev.actionsCount + 1
    }));
  };

  const handleFeTestsPass = () => {
    setWorkSignals(prev => ({ ...prev, testedHypothesis: true }));
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

        {/* Center: Mission Timer, Event Trigger & Capture Flags HUD */}
        <div className="workspace-timer-box">
          <div className="timer-badge">
            <Clock size={15} className="text-warning" />
            <span className="timer-digits font-mono">{formatTime(secondsRemaining)}</span>
          </div>

          <button 
            type="button"
            className={`btn-flags-hud ${capturedFlagIds.length === (allTaskFlags.length || 10) ? 'completed' : ''}`}
            onClick={() => setShowFlagsPanel(true)}
            title="Inspect Capture-Flag Checkpoints for this task"
          >
            <Flag size={14} className={capturedFlagIds.length === (allTaskFlags.length || 10) ? 'text-emerald' : 'text-amber'} />
            <span>Flags: <strong>{capturedFlagIds.length}/{allTaskFlags.length || 10}</strong></span>
            <span className="flags-score-badge font-mono">{capturedFlagIds.length * 10} pts</span>
          </button>

          <button 
            className="btn btn-secondary btn-xs btn-event-sim"
            onClick={onTriggerSimEvent}
            title="Inject real-time incident update / Slack message"
          >
            <Bell size={13} className="text-accent" />
            <span>Simulate Workplace Event</span>
          </button>
        </div>

        {/* Right: Submit Button & User Dashboard Access */}
        <div className="workspace-submit-action flex-row items-center gap-2">
          {currentUser && onViewDashboard && (
            <button 
              type="button"
              className="current-user-pill clickable workspace-user-pill"
              onClick={onViewDashboard}
              title="Click to view your Candidate Account Dashboard"
            >
              <span className="user-icon">{currentUser.avatar || '👤'}</span>
              <span className="user-name">{currentUser.name || 'Candidate'}</span>
              <span className="user-dash-tag">Dashboard</span>
            </button>
          )}

          <button 
            className={`btn btn-submit-evaluation ${isReadyForSubmission() ? 'btn-ready' : ''}`}
            onClick={() => onSubmitForEvaluation({
              ...workspaceState,
              initialCode: workspaceState.initialCode || defaultInitialCode,
              submittedCode: workspaceState.submittedCode || defaultInitialCode,
              files: workspaceState.fileContents,
              elapsedSeconds,
              workSignals,
              chaosResolved: chaosEvent.resolved,
              hasEdgeCaseFailure,
              capturedFlags: capturedFlagIds,
              flagScore: capturedFlagIds.length * 10,
              totalFlagsCount: allTaskFlags.length || 10,
              flagPercentage: Math.round((capturedFlagIds.length / (allTaskFlags.length || 10)) * 100)
            })}
          >
            <Award size={16} />
            <span>Submit for AI Code Review</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* STEP 9: AI Manager Quiet Evidence Collection Banner */}
      <div className="work-observation-bar">
        <div className="obs-label">
          <Bot size={14} className="text-cyan" />
          <span>WORK OBSERVATION:</span>
        </div>
        <div className="obs-chips">
          <span className={`obs-chip ${workSignals.investigatedCode ? 'done' : ''}`}>
            {workSignals.investigatedCode ? '✓' : '○'} Investigated existing code
          </span>
          <span className={`obs-chip ${workSignals.reproducedIssue ? 'done' : ''}`}>
            {workSignals.reproducedIssue ? '✓' : '○'} Reproduced issue
          </span>
          <span className={`obs-chip ${workSignals.askedQuestion ? 'done' : ''}`}>
            {workSignals.askedQuestion ? '✓' : '○'} Asked clarifying question
          </span>
          <span className={`obs-chip ${workSignals.identifiedDependency ? 'done' : ''}`}>
            {workSignals.identifiedDependency ? '✓' : '○'} Identified state dependency
          </span>
          <span className={`obs-chip ${workSignals.testedHypothesis ? 'done' : ''}`}>
            {workSignals.testedHypothesis ? '✓' : '○'} Tested hypothesis
          </span>
          <span className="obs-chip hint-tag">
            Hint used: {workSignals.hintsUsed}
          </span>
        </div>
        <div className="edge-case-demo-toggle">
          <label title="Toggle edge case discovery for Skill Sprint flow">
            <input 
              type="checkbox" 
              checked={hasEdgeCaseFailure}
              onChange={(e) => setHasEdgeCaseFailure(e.target.checked)}
            />
            <span>Simulate Production Edge Case</span>
          </label>
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
            onAskQuestion={() => setWorkSignals(p => ({ ...p, askedQuestion: true }))}
            onApplyHint={() => setWorkSignals(p => ({ ...p, hintsUsed: p.hintsUsed + 1 }))}
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

      {/* CHAOS EVENT MODAL */}
      {chaosEvent.active && (
        <div className="chaos-modal-backdrop">
          <div className="chaos-modal-card animate-scale-in">
            <div className="chaos-modal-header">
              <div className="chaos-badge">
                <AlertTriangle size={14} className="text-amber" />
                <span>💥 SPRINT DISRUPTION — CHAOS EVENT</span>
              </div>
              <h3 className="chaos-title">Unexpected Sprint Disruption</h3>
              <p className="chaos-subtitle">DayOne measures real workplace behaviour under sudden scope changes.</p>
            </div>

            <div className="chaos-slack-simulation">
              <div className="slack-msg-row">
                <span className="slack-avatar">👩‍💻</span>
                <div>
                  <div className="slack-user-header">
                    <strong>Maya</strong> <span className="slack-role-tag">QA Engineer</span> <span className="slack-time">Just now</span>
                  </div>
                  <p className="slack-quote">"Update: I found another issue. The same problem occurs on mobile Safari."</p>
                </div>
              </div>

              <div className="slack-msg-row pm-row">
                <span className="slack-avatar">👨‍💼</span>
                <div>
                  <div className="slack-user-header">
                    <strong>Alex</strong> <span className="slack-role-tag">Product Manager</span> <span className="slack-time">Just now</span>
                  </div>
                  <p className="slack-quote">"Can we get this fixed before today's release?"</p>
                </div>
              </div>
            </div>

            <div className="chaos-decision-prompt">
              <div className="prompt-label">How do you respond and prioritize?</div>
              <div className="decision-options-list">
                <button 
                  type="button"
                  className="btn-decision-opt recommended"
                  onClick={() => {
                    setChaosEvent({ active: false, triggered: true, resolved: true, decision: 'prioritize_p1' });
                    setWorkspaceState(p => ({ ...p, chaosResolved: true }));
                  }}
                >
                  <div className="opt-title">1. Deliver primary P1 fix first, then branch mobile Safari fix</div>
                  <p className="opt-sub">Communicate in Slack: "I will patch the checkout timeout first for today's release, then immediately investigate Safari WebKit in a hotfix branch."</p>
                  <span className="badge-tag green">Recommended: High Prioritization & Communication</span>
                </button>

                <button 
                  type="button"
                  className="btn-decision-opt"
                  onClick={() => {
                    setChaosEvent({ active: false, triggered: true, resolved: true, decision: 'pivot_safari' });
                    setWorkspaceState(p => ({ ...p, chaosResolved: true }));
                  }}
                >
                  <div className="opt-title">2. Immediately halt desktop work to investigate mobile Safari</div>
                  <p className="opt-sub">Switches context mid-task without completing the core timeout resolution.</p>
                </button>

                <button 
                  type="button"
                  className="btn-decision-opt"
                  onClick={() => {
                    setChaosEvent({ active: false, triggered: true, resolved: true, decision: 'ask_logs' });
                    setWorkspaceState(p => ({ ...p, chaosResolved: true }));
                  }}
                >
                  <div className="opt-title">3. Ask Maya for Safari console logs while continuing test run</div>
                  <p className="opt-sub">Gathers telemetry while keeping current sprint pipeline moving forward.</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Capture Flags Checkpoints Drawer */}
      <CaptureFlagsPanel 
        subtasks={missionData.subtasks || []}
        capturedFlagIds={capturedFlagIds}
        onCaptureFlag={handleCaptureFlag}
        onSelectTool={setActiveToolId}
        isOpen={showFlagsPanel}
        onClose={() => setShowFlagsPanel(false)}
      />
    </div>
  );
}
