// src/data/roles.js
// Dynamic role definitions. To add a new role (e.g. Cloud/DevOps or Data Scientist),
// simply add a new object to this registry without touching any core engine components!

export const ROLES = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    shortName: 'Frontend',
    icon: 'Code2',
    department: 'Web Engineering & Platforms',
    level: 'L3 / Mid-Level Track',
    badge: 'Engineering',
    tagline: 'Build mission-critical web applications, debug asynchronous state, and optimize user-facing performance.',
    description: 'Simulates the high-stakes environment of a modern SaaS engineering sprint. Tackle production bugs, build performant UI features, resolve git pull requests, and communicate with product teams.',
    
    // Exact tools requested for Frontend Developer:
    // Slack, Jira, Git, Monaco-style code editor, Terminal, Browser preview, AI Manager
    tools: [
      { id: 'slack', name: 'Slack (#frontend-sprint)', icon: 'MessageSquare', defaultActive: true, category: 'Communication' },
      { id: 'jira', name: 'Jira (PROD-4092)', icon: 'CheckSquare', defaultActive: false, category: 'Project Management' },
      { id: 'editor', name: 'Monaco Code Editor', icon: 'Code', defaultActive: false, category: 'Engineering Workspace' },
      { id: 'terminal', name: 'Dev Terminal (bash)', icon: 'Terminal', defaultActive: false, category: 'Runtime & Build' },
      { id: 'browser', name: 'Live Browser Preview', icon: 'Globe', defaultActive: false, category: 'Testing & Render' },
      { id: 'git', name: 'Git & PR Inspector', icon: 'GitBranch', defaultActive: false, category: 'Version Control' },
      { id: 'ai_assistant', name: 'AI Manager (Sarah Lin)', icon: 'Bot', defaultActive: false, category: 'Mentorship & Review' }
    ],

    aiLead: {
      name: 'Sarah Lin',
      title: 'Staff Frontend Architect & Engineering Lead',
      avatar: '👩‍💻',
      personality: 'Pragmatic, high code standards, values root-cause analysis and automated test coverage over quick hacks.',
      initialGreeting: "Hey! Glad you're on this sprint. Our Sentry alerts picked up recurring checkout API failures affecting 14% of mobile users. Let's inspect the bug ticket in Jira, reproduce it in the browser preview, patch the client code, and make sure tests pass before opening a PR."
    },

    environment: {
      runtime: 'Node.js v20.11 / Vite 5.2 / React 18.2',
      targetDomain: 'app.dayone-pay.io',
      apiEndpoint: 'https://api.dayone-pay.io/v2/checkout',
      buildSystem: 'npm test --run / vitest'
    },

    evaluationFocus: [
      'Root-cause accuracy & error handling',
      'Code cleanliness & state safety',
      'Test coverage & regression verification',
      'Stakeholder communication & PR clarity'
    ]
  },

  {
    id: 'cybersecurity',
    name: 'Cybersecurity Analyst',
    shortName: 'Cybersecurity',
    icon: 'ShieldAlert',
    department: 'Security Operations Center (SOC)',
    level: 'Tier 2 Incident Responder',
    badge: 'SecOps',
    tagline: 'Defend corporate infrastructure, analyze SIEM anomalies, triage threats, and execute containment protocols.',
    description: 'Step into an active SOC during an ongoing security incident. Parse high-velocity SIEM logs, correlate network indicators of compromise (IOCs), isolate rogue IPs via terminal commands, and coordinate with the CISO.',
    
    // Exact tools requested for Cybersecurity Analyst:
    // Slack, Incident ticket, SIEM/log viewer, Terminal, Network events, AI Security Lead
    tools: [
      { id: 'slack', name: 'Slack (#soc-war-room)', icon: 'MessageSquare', defaultActive: true, category: 'Communication' },
      { id: 'incident_ticket', name: 'Incident Ticket (#SEC-942)', icon: 'AlertTriangle', defaultActive: false, category: 'Incident Management' },
      { id: 'siem', name: 'SIEM Log Analyzer', icon: 'FileSearch', defaultActive: false, category: 'Threat Detection' },
      { id: 'terminal', name: 'SOC Bastion Shell', icon: 'Terminal', defaultActive: false, category: 'SecOps CLI' },
      { id: 'network_events', name: 'Network Telemetry & Vectors', icon: 'Activity', defaultActive: false, category: 'Packet & Flow Inspection' },
      { id: 'ai_assistant', name: 'AI Security Lead (Marcus Reyes)', icon: 'Shield', defaultActive: false, category: 'CISO / Tactical Lead' }
    ],

    aiLead: {
      name: 'Marcus Reyes',
      title: 'Lead Incident Commander & Threat Hunter',
      avatar: '🛡️',
      personality: 'Fast-paced, rigorous, demands verified IOCs, strictly enforces containment checklists and chain of custody.',
      initialGreeting: "Analyst, we have an uncontained P1 alert triggering across the APAC gateway. Our SIEM is flagging an abnormal surge in 401/403 status spikes and credential stuffing against /api/v1/auth. Check the Incident Ticket, drill into the SIEM logs, extract the attacker IPs, drop them via iptables in the terminal, and verify the network telemetry drops to normal."
    },

    environment: {
      runtime: 'Splunk/ELK SIEM Core v8.4 / Suricata IDS 7.0',
      targetDomain: 'gateway-apac-prod.cloudvault.net',
      bastionHost: 'bastion-soc-02.internal.net',
      idsRuleSet: 'ET OPEN Emerging Threats v2026'
    },

    evaluationFocus: [
      'Rapid anomaly detection & log pattern recognition',
      'Accuracy of extracted IOCs (IPs, hashes, user agents)',
      'Containment execution speed & firewall accuracy',
      'Incident ticket documentation & chain of custody'
    ]
  },

  {
    id: 'ui_ux',
    name: 'UI/UX Designer',
    shortName: 'Product Design',
    icon: 'Palette',
    department: 'Product Experience & Design Studio',
    level: 'Senior Product Designer Track',
    badge: 'Design',
    tagline: 'Transform messy user feedback and checkout drop-offs into high-converting, accessible design solutions.',
    description: 'Take ownership of an underperforming product flow. Synthesize user complaints and analytics drop-offs, inspect research notes, iterate on interactive wireframes on the design canvas, and defend your decisions to product leadership.',
    
    // Exact tools requested for UI/UX Designer:
    // Slack, Design brief, Design canvas, User feedback, Research notes, Project board, AI Design Lead
    tools: [
      { id: 'slack', name: 'Slack (#design-critique)', icon: 'MessageSquare', defaultActive: true, category: 'Communication' },
      { id: 'design_brief', name: 'Design Brief & KPIs', icon: 'Compass', defaultActive: false, category: 'Product Strategy' },
      { id: 'design_canvas', name: 'Interactive Design Canvas', icon: 'Layers', defaultActive: false, category: 'Visual Prototyping' },
      { id: 'user_feedback', name: 'User Feedback & Heatmaps', icon: 'SmilePlus', defaultActive: false, category: 'Customer Insights' },
      { id: 'research_notes', name: 'Research & Usability Notes', icon: 'BookOpen', defaultActive: false, category: 'UX Synthesis' },
      { id: 'project_board', name: 'Design Sprint Board', icon: 'Kanban', defaultActive: false, category: 'Workflow' },
      { id: 'ai_assistant', name: 'AI Design Lead (Elena Rostova)', icon: 'Sparkles', defaultActive: false, category: 'Design Leadership' }
    ],

    aiLead: {
      name: 'Elena Rostova',
      title: 'Head of Product Experience & Design Systems',
      avatar: '🎨',
      personality: 'Human-centric, detail-oriented, obsessed with micro-interactions, WCAG AA compliance, and data-backed rationale.',
      initialGreeting: "Welcome to the team! Our Q3 e-commerce conversion has plummeted 28% at the shipping and payment step. Users are complaining about hidden fees, ambiguous error labels, and poor mobile touch targets. Review the Design Brief and User Feedback, test layout variants on the Design Canvas, and present a compliant redesign."
    },

    environment: {
      designSystem: 'DayOne Orbit UI v3.2 / 8pt Fluid Grid',
      targetFlow: 'Checkout & Subscription Onboarding',
      accessibilityStandard: 'WCAG 2.1 Level AA',
      screenTypes: 'Responsive Mobile (390px) & Desktop (1440px)'
    },

    evaluationFocus: [
      'Problem diagnosis from raw qualitative/quantitative data',
      'Information architecture & visual hierarchy clarity',
      'WCAG 2.1 AA accessibility & responsive layout hygiene',
      'Strategic design rationale and critique response'
    ]
  }
];

export function getRoleById(roleId) {
  return ROLES.find(r => r.id === roleId) || ROLES[0];
}
