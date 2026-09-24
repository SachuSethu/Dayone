// src/data/flags/captureFlagRegistry.js
// DayOne.ai — Master Capture-Flag Intelligence Engine
// Scale: 192 Tasks × 2 Subtasks × 5 Capture Flags = 1,920 Challenge Checkpoints.
//
// A flag represents an authentic workplace milestone: discover, decide, produce,
// fix, query, calculate, or submit technical evidence inside the simulation.

/**
 * Role-specific action verbs and inspection modalities
 */
export const ROLE_FLAG_ACTIONS = {
  frontend: [
    'Inspect browser console',
    'Identify broken request',
    'Modify code in Monaco editor',
    'Run automated test suite in terminal',
    'Verify UI rendering in live browser'
  ],
  backend: [
    'Inspect application logs in terminal',
    'Analyze API response & status codes',
    'Execute query in database console',
    'Identify system bottleneck & latency root cause',
    'Implement resilient backend fix'
  ],
  cybersecurity: [
    'Inspect SIEM event telemetry',
    'Correlate timestamps across audit logs',
    'Identify affected account & host identity',
    'Determine threat severity & exploit vector',
    'Execute containment & remediation rule'
  ],
  data_analyst: [
    'Inspect raw tabular dataset',
    'Write diagnostic SQL query',
    'Clean corrupted or null data pipeline',
    'Calculate metric & variance indicator',
    'Explain business & executive revenue implication'
  ],
  ui_ux: [
    'Inspect user conversion flow & funnel drop-off',
    'Identify cognitive friction & interaction barrier',
    'Analyze quantitative heatmaps & qualitative feedback',
    'Propose responsive interaction & layout pattern',
    'Justify design decision with accessibility compliance'
  ],
  fullstack: [
    'Trace browser network request to gateway',
    'Inspect API endpoint handler & middleware',
    'Inspect database schema & query transaction',
    'Fix full-stack contract mismatch',
    'Verify end-to-end user workflow'
  ]
};

/**
 * Level-graduated progression types
 */
export const LEVEL_FLAG_PROGRESSIONS = {
  // L1: Foundation (Identify -> Inspect -> Apply -> Test -> Explain)
  1: {
    subtask1: [
      { type: 'evidence_identification', label: 'Identify Evidence', phase: 'Detection' },
      { type: 'inspection', label: 'Inspect Artifact', phase: 'Inspection' },
      { type: 'problem_identification', label: 'Identify Problem', phase: 'Diagnosis' },
      { type: 'impact_analysis', label: 'Determine UI/Data Impact', phase: 'Impact' },
      { type: 'root_cause', label: 'Submit Root Cause', phase: 'Root Cause' }
    ],
    subtask2: [
      { type: 'basic_solution', label: 'Select Solution Path', phase: 'Planning' },
      { type: 'implementation', label: 'Apply Code / Config Fix', phase: 'Implementation' },
      { type: 'edge_case_handling', label: 'Handle Edge Cases', phase: 'Hardening' },
      { type: 'verification', label: 'Test & Verify Recovery', phase: 'Verification' },
      { type: 'final_evidence', label: 'Submit Verified Evidence', phase: 'Submission' }
    ]
  },
  // L2: Intermediate (Investigate -> Correlate -> Prioritize -> Implement -> Verify)
  2: {
    subtask1: [
      { type: 'evidence', label: 'Investigate Incident', phase: 'Investigation' },
      { type: 'correlation', label: 'Correlate Telemetry', phase: 'Correlation' },
      { type: 'prioritization', label: 'Prioritize Failure Path', phase: 'Prioritization' },
      { type: 'debugging_path', label: 'Choose Debugging Path', phase: 'Strategy' },
      { type: 'root_cause', label: 'Submit Root Cause Explanation', phase: 'Root Cause' }
    ],
    subtask2: [
      { type: 'implementation', label: 'Implement Resilient Fix', phase: 'Implementation' },
      { type: 'state_verification', label: 'Verify State Consistency', phase: 'State Check' },
      { type: 'refresh_testing', label: 'Test Refresh & Concurrency', phase: 'Concurrency' },
      { type: 'failure_recovery', label: 'Test Failure Recovery', phase: 'Recovery' },
      { type: 'final_evidence', label: 'Submit Final Technical Evidence', phase: 'PR Evidence' }
    ]
  },
  // L3: Advanced (Diagnose -> Compare -> Decide -> Implement -> Defend)
  3: {
    subtask1: [
      { type: 'evidence_analysis', label: 'Diagnose Distributed Telemetry', phase: 'Diagnosis' },
      { type: 'root_cause_hypothesis', label: 'Hypothesize Failure Cascade', phase: 'Hypothesis' },
      { type: 'alternative_comparison', label: 'Compare Architectural Remedies', phase: 'Comparison' },
      { type: 'technical_decision', label: 'Decide Remediation Path', phase: 'Decision' },
      { type: 'architecture_triage', label: 'Audit System Invariants', phase: 'Audit' }
    ],
    subtask2: [
      { type: 'implementation', label: 'Implement Fault-Tolerant Logic', phase: 'Implementation' },
      { type: 'concurrency_testing', label: 'Stress-Test Race Conditions', phase: 'Stress Test' },
      { type: 'tradeoff_resolution', label: 'Resolve Performance Trade-offs', phase: 'Optimization' },
      { type: 'validation', label: 'Validate Distributed Invariants', phase: 'Validation' },
      { type: 'defense', label: 'Defend Architectural Choices', phase: 'Architecture Review' }
    ]
  },
  // L4: Critical (Detect -> Investigate -> Respond -> Adapt -> Recover)
  4: {
    subtask1: [
      { type: 'incident_detection', label: 'Detect Live Production Anomaly', phase: 'Detection' },
      { type: 'initial_diagnosis', label: 'Investigate Under SLA Pressure', phase: 'Triage' },
      { type: 'response_decision', label: 'Determine Incident Response', phase: 'Containment Decision' },
      { type: 'adaptation', label: 'Adapt to Changing Telemetry', phase: 'Dynamic Adaptation' },
      { type: 'containment', label: 'Execute Emergency Containment', phase: 'Containment' }
    ],
    subtask2: [
      { type: 'remediation', label: 'Deploy Production Hotfix', phase: 'Hotfix' },
      { type: 'hotfix_verification', label: 'Verify Production Traffic', phase: 'Canary Verification' },
      { type: 'resilience_testing', label: 'Test Fault Recovery & Fallbacks', phase: 'Chaos Test' },
      { type: 'recovery', label: 'Restore Full System Availability', phase: 'Full Recovery' },
      { type: 'incident_postmortem', label: 'Submit Postmortem & SLA Evidence', phase: 'Postmortem' }
    ]
  }
};

/**
 * Exact Handcrafted Canonical Flag Sets for Highlight Tasks
 */
const CANONICAL_FLAG_OVERRIDES = {
  // 1. FE-L2-002: Authentication State Desynchronization
  'FE-L2-002': {
    subtask1Flags: [
      {
        id: 'FE-L2-002-S1-F1',
        type: 'evidence',
        action: 'Inspect browser console',
        question: 'Identify the first observable failure occurring during the payment flow.',
        expectedAnswer: '504 Gateway Timeout on checkout API stream with unhandled rejection',
        options: [
          '504 Gateway Timeout on checkout API stream with unhandled rejection',
          '404 Not Found on static image bundle assets',
          'SyntaxError: Unexpected token < in JSON at position 0',
          'CORS preflight Access-Control-Allow-Origin header mismatch'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: '504 Gateway Timeout'
      },
      {
        id: 'FE-L2-002-S1-F2',
        type: 'correlation',
        action: 'Inspect the authentication evidence',
        question: 'Inspect the authentication evidence and state persistence across token refresh.',
        expectedAnswer: 'JWT accessToken expires at 15m; silent refresh fails due to mismatched session credentials',
        options: [
          'JWT accessToken expires at 15m; silent refresh fails due to mismatched session credentials',
          'Local storage quota exceeded with oversized cached cart state',
          'Cookie SameSite policy prevents transmitting cart items on HTTP',
          'WebSockets disconnected due to idle ping timeout after 60s'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: 'accessToken mismatch'
      },
      {
        id: 'FE-L2-002-S1-F3',
        type: 'prioritization',
        action: 'Identify the root cause',
        question: 'Identify the root cause of checkout button becoming unresponsive on payment failure.',
        expectedAnswer: 'setIsSubmitting(true) is never reset to false in the promise catch/finally block',
        options: [
          'setIsSubmitting(true) is never reset to false in the promise catch/finally block',
          'Button DOM node is completely removed from document body',
          'Z-index stacking context places invisible modal layer on top of button',
          'React SyntheticEvent stopPropagation is called unconditionally'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'editor',
        verificationKey: 'finally reset'
      },
      {
        id: 'FE-L2-002-S1-F4',
        type: 'debugging_path',
        action: 'Choose the correct debugging path',
        question: 'Choose the correct debugging path to address intermittent gateway timeouts without double billing.',
        expectedAnswer: 'Implement client-side exponential backoff with idempotent order UUID headers',
        options: [
          'Implement client-side exponential backoff with idempotent order UUID headers',
          'Disable timeout limit and let the browser wait infinitely for response',
          'Immediately reload entire page when API returns HTTP 504',
          'Clear user cookies and force immediate redirect to login page'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'editor',
        verificationKey: 'idempotent backoff'
      },
      {
        id: 'FE-L2-002-S1-F5',
        type: 'root_cause',
        action: 'Submit the root-cause explanation',
        question: 'Submit the formal root-cause explanation for QA and incident tracking.',
        expectedAnswer: 'State lock due to missing finally clause compounded by lack of exponential backoff retry on 504 gateway timeout',
        options: [
          'State lock due to missing finally clause compounded by lack of exponential backoff retry on 504 gateway timeout',
          'Database deadlocks occurring exclusively on promo code DAYONE20 validation',
          'Memory leak in React useState hook triggered by garbage collection latency',
          'Third-party analytics script blocking main JavaScript execution thread'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'jira',
        verificationKey: 'missing finally clause'
      }
    ],
    subtask2Flags: [
      {
        id: 'FE-L2-002-S2-F1',
        type: 'implementation',
        action: 'Implement the fix',
        question: 'Implement the fix in checkoutApi.js with exponential backoff and finally state release.',
        expectedAnswer: 'Wrapped network call in try/finally to clear isSubmitting and added 3-stage exponential backoff',
        options: [
          'Wrapped network call in try/finally to clear isSubmitting and added 3-stage exponential backoff',
          'Added setTimeout(5000) hard delay before triggering payment fetch',
          'Removed error handling completely to suppress uncaught exceptions',
          'Cached failed responses in sessionStorage to skip future payment attempts'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'editor',
        verificationKey: 'exponential backoff implemented'
      },
      {
        id: 'FE-L2-002-S2-F2',
        type: 'state_verification',
        action: 'Verify authenticated state',
        question: 'Verify authenticated state and user credentials persist correctly across API retries.',
        expectedAnswer: 'Authorization Bearer token attached on all retry attempts with refreshed claims',
        options: [
          'Authorization Bearer token attached on all retry attempts with refreshed claims',
          'Token converted to plain-text query parameter string',
          'User logged out and relogged in via background iframe',
          'Authentication header removed on retry to avoid CORS headers'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: 'Bearer token persistent'
      },
      {
        id: 'FE-L2-002-S2-F3',
        type: 'refresh_testing',
        action: 'Test refresh behavior',
        question: 'Test refresh behavior and ensure IEEE 754 discount rounding math is precise.',
        expectedAnswer: 'Discounts calculated using Math.round((price * discount) * 100) / 100 (119.20 instead of 119.20000000000002)',
        options: [
          'Discounts calculated using Math.round((price * discount) * 100) / 100 (119.20 instead of 119.20000000000002)',
          'Converted all prices to binary strings before displaying in cart',
          'Truncated prices with Math.floor discarding decimal cents',
          'Hardcoded discount value to exactly $20 without percentage calculation'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'terminal',
        verificationKey: 'IEEE 754 precision fixed'
      },
      {
        id: 'FE-L2-002-S2-F4',
        type: 'failure_recovery',
        action: 'Test failure recovery',
        question: 'Test failure recovery when mock API continues failing past maximum retries.',
        expectedAnswer: 'Graceful error banner displayed with retry button; checkout button unlocked and clickable',
        options: [
          'Graceful error banner displayed with retry button; checkout button unlocked and clickable',
          'Browser alerts native alert() dialog and crashes tab process',
          'Cart items automatically emptied and cleared from database',
          'Page displays blank white screen with unhandled promise rejection'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: 'graceful banner displayed'
      },
      {
        id: 'FE-L2-002-S2-F5',
        type: 'final_evidence',
        action: 'Submit final technical evidence',
        question: 'Submit final technical evidence by executing test suite and creating Git commit.',
        expectedAnswer: 'All 4 unit tests passing green in terminal; Git commit created on branch fix/prod-4092',
        options: [
          'All 4 unit tests passing green in terminal; Git commit created on branch fix/prod-4092',
          'Commented out failing test assertions to achieve green build status',
          'Committed files directly to master branch without running test suite',
          'Generated fake mock test report file manually in text editor'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'git',
        verificationKey: 'tests passing and committed'
      }
    ]
  },

  // 2. FE-L1-002: API Loading/Error State
  'FE-L1-002': {
    subtask1Flags: [
      {
        id: 'FE-L1-002-S1-F1',
        type: 'evidence_identification',
        action: 'Identify loading-state problem',
        question: 'Identify the loading-state problem occurring when recommendations API is slow.',
        expectedAnswer: 'UI displays indefinite spinner with no timeout or empty placeholder fallback',
        options: [
          'UI displays indefinite spinner with no timeout or empty placeholder fallback',
          'Browser window closes automatically when request takes longer than 2 seconds',
          'Operating system displays kernel memory alert',
          'Font sizes shrink to zero pixels during network request'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: 'indefinite spinner'
      },
      {
        id: 'FE-L1-002-S1-F2',
        type: 'inspection',
        action: 'Inspect API response',
        question: 'Inspect API response and network payload in DevTools Network tab.',
        expectedAnswer: 'Server returns HTTP 503 Service Unavailable with JSON error message',
        options: [
          'Server returns HTTP 503 Service Unavailable with JSON error message',
          'Server returns HTTP 200 OK with binary audio file',
          'Network connection drops DNS resolution entirely',
          'API returns HTML 301 Permanent Redirect to external website'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: 'HTTP 503 error'
      },
      {
        id: 'FE-L1-002-S1-F3',
        type: 'problem_identification',
        action: 'Identify error condition',
        question: 'Identify the error condition in DishCarousel.jsx component code.',
        expectedAnswer: 'fetch() call lacks catch() block and does not check res.ok status',
        options: [
          'fetch() call lacks catch() block and does not check res.ok status',
          'Component is missing export default statement',
          'CSS file has invalid semicolon on line 42',
          'React version is outdated by 6 major versions'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'editor',
        verificationKey: 'missing catch and res.ok check'
      },
      {
        id: 'FE-L1-002-S1-F4',
        type: 'impact_analysis',
        action: 'Determine UI impact',
        question: 'Determine the user interface impact when this error occurs during rush hour.',
        expectedAnswer: 'Customers see broken blank area; tap actions freeze causing order abandonment',
        options: [
          'Customers see broken blank area; tap actions freeze causing order abandonment',
          'Customer balance is refunded $100 automatically',
          'App switches to German language localization',
          'Screen brightness dims to 10% brightness'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: 'order abandonment'
      },
      {
        id: 'FE-L1-002-S1-F5',
        type: 'root_cause',
        action: 'Submit root cause',
        question: 'Submit root cause diagnosis to Jira issue tracking board.',
        expectedAnswer: 'Unhandled promise rejection and missing status check leaving isLoading: true',
        options: [
          'Unhandled promise rejection and missing status check leaving isLoading: true',
          'Hardware SSD failure on client smartphone device',
          'SSL certificate revocation on root certificate authority',
          'V8 JavaScript engine garbage collector bug'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'jira',
        verificationKey: 'unhandled promise rejection'
      }
    ],
    subtask2Flags: [
      {
        id: 'FE-L1-002-S2-F1',
        type: 'basic_solution',
        action: 'Implement error handling',
        question: 'Implement error handling in fetch request handler with try/catch.',
        expectedAnswer: 'Added if (!res.ok) throw new Error() inside try/catch with hasError state',
        options: [
          'Added if (!res.ok) throw new Error() inside try/catch with hasError state',
          'Wrapped component in empty HTML div to suppress error',
          'Switched to synchronous XMLHttpRequest in main thread',
          'Ignored network errors and rendered undefined item list'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'editor',
        verificationKey: 'try/catch res.ok'
      },
      {
        id: 'FE-L1-002-S2-F2',
        type: 'implementation',
        action: 'Add appropriate loading state',
        question: 'Add appropriate loading state and skeleton loader UI during data fetching.',
        expectedAnswer: 'Rendered DishSkeletonCard placeholders while isLoading is true',
        options: [
          'Rendered DishSkeletonCard placeholders while isLoading is true',
          'Showed spinning ASCII art in console.log',
          'Froze UI input elements using pointer-events: none',
          'Rendered black full-screen overlay blocking navigation'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'editor',
        verificationKey: 'skeleton placeholders'
      },
      {
        id: 'FE-L1-002-S2-F3',
        type: 'edge_case_handling',
        action: 'Handle failed request',
        question: 'Handle failed request with user-friendly retry button and error alert.',
        expectedAnswer: 'Rendered Retry button that resets error state and re-invokes fetchRecommendations()',
        options: [
          'Rendered Retry button that resets error state and re-invokes fetchRecommendations()',
          'Forced full page hard reload on every single network error',
          'Displayed raw stack trace and internal database credentials to user',
          'Disabled retry button permanently after first attempt'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'editor',
        verificationKey: 'retry button re-invokes fetch'
      },
      {
        id: 'FE-L1-002-S2-F4',
        type: 'verification',
        action: 'Verify recovery',
        question: 'Verify recovery in live preview by simulating 503 error then successful 200 response.',
        expectedAnswer: 'Verified error card appears on 503; clicking Retry loads recommendations cleanly',
        options: [
          'Verified error card appears on 503; clicking Retry loads recommendations cleanly',
          'Verified page reloads continuously in an infinite loop',
          'Verified component crashes entire browser window',
          'Verified recommendations are duplicated 10 times in cart'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'browser',
        verificationKey: 'retry loads recommendations'
      },
      {
        id: 'FE-L1-002-S2-F5',
        type: 'final_evidence',
        action: 'Submit evidence',
        question: 'Submit test results and Git commit to resolve ticket.',
        expectedAnswer: 'Unit tests for loading, error, and recovery states passed with 100% assertions green',
        options: [
          'Unit tests for loading, error, and recovery states passed with 100% assertions green',
          'Pushed unverified code directly to production without testing',
          'Skipped unit tests because manual inspection is sufficient',
          'Deleted unit test file from git repository'
        ],
        correctOptionIndex: 0,
        points: 10,
        requiredTool: 'terminal',
        verificationKey: '100% assertions green'
      }
    ]
  }
};

/**
 * Deterministic Flag Synthesizer
 * Generates 5 flags for Subtask 1 and 5 flags for Subtask 2 for any of the 192 tasks.
 */
export function generateCaptureFlagsForTask(task) {
  const taskId = task.id;
  
  // Return canonical handcrafted flags if defined
  if (CANONICAL_FLAG_OVERRIDES[taskId]) {
    return {
      subtask1Flags: CANONICAL_FLAG_OVERRIDES[taskId].subtask1Flags,
      subtask2Flags: CANONICAL_FLAG_OVERRIDES[taskId].subtask2Flags
    };
  }

  const role = task.roleId || task.role || 'frontend';
  const level = Number(task.level) || 2;
  const progression = LEVEL_FLAG_PROGRESSIONS[level] || LEVEL_FLAG_PROGRESSIONS[2];
  const roleActions = ROLE_FLAG_ACTIONS[role] || ROLE_FLAG_ACTIONS.frontend;

  const title = task.title || 'Workplace Challenge';
  const situation = task.situation || 'Critical production scenario requires triage and resolution.';
  const problem = task.problem || 'System error detected during operational workflow.';
  const competency = task.competency || 'Engineering Triage';
  const expectedSolution = task.expectedSolution || 'Resolve root cause and verify with automated tests.';
  const evidenceList = task.availableEvidence || [
    'Telemetry log showing abnormal error spike',
    'Incident alert logged in monitoring channel'
  ];

  // Map appropriate tool per role
  const getToolForAction = (roleKey, index) => {
    if (roleKey === 'cybersecurity') {
      return ['siem', 'siem', 'network_events', 'cyber_terminal', 'incident_ticket'][index] || 'siem';
    }
    if (roleKey === 'ui_ux') {
      return ['user_feedback', 'design_brief', 'research_notes', 'design_canvas', 'project_board'][index] || 'design_canvas';
    }
    if (roleKey === 'data_analyst' || roleKey === 'backend') {
      return ['terminal', 'editor', 'browser', 'terminal', 'jira'][index] || 'terminal';
    }
    return ['browser', 'browser', 'editor', 'terminal', 'git'][index] || 'editor';
  };

  // Build Subtask 1 Flags (Investigation & Discovery: Flags 1 to 5)
  const subtask1Flags = progression.subtask1.map((p, idx) => {
    const flagId = `${taskId}-S1-F${idx + 1}`;
    const actionVerb = roleActions[idx % roleActions.length];
    const tool = getToolForAction(role, idx);

    let question = '';
    let expectedAnswer = '';
    let options = [];

    if (level === 1) {
      if (idx === 0) {
        question = `Identify the observable issue in ${title}. Inspect evidence: "${evidenceList[0] || 'System alert'}".`;
        expectedAnswer = `${title}: ${problem.slice(0, 100)}...`;
      } else if (idx === 1) {
        question = `Inspect the primary artifact in ${tool}. What unexpected condition is present?`;
        expectedAnswer = `Discrepancy identified in ${competency} configuration matching alert telemetry.`;
      } else if (idx === 2) {
        question = `What is the direct technical cause of this failure?`;
        expectedAnswer = `${problem.slice(0, 120)}.`;
      } else if (idx === 3) {
        question = `What is the immediate impact on end-users or system consumers?`;
        expectedAnswer = `Degraded customer experience with unhandled error state on ${competency}.`;
      } else {
        question = `Submit the root cause summary for team handoff.`;
        expectedAnswer = `Root cause documented: ${problem.slice(0, 110)}. Ready for remediation.`;
      }
    } else if (level === 2) {
      if (idx === 0) {
        question = `Investigate the incident telemetry. Which anomaly first signals the failure in ${title}?`;
        expectedAnswer = `Telemetry anomaly detected in ${competency}: ${problem.slice(0, 100)}.`;
      } else if (idx === 1) {
        question = `Correlate telemetry between system components. What dependent failure path is active?`;
        expectedAnswer = `State desynchronization between client requests and ${competency} pipeline.`;
      } else if (idx === 2) {
        question = `Prioritize the triage path among competing signals. Which item must be tackled first?`;
        expectedAnswer = `Isolate the primary fault in ${competency} before addressing secondary symptoms.`;
      } else if (idx === 3) {
        question = `Choose the optimal debugging strategy to verify this hypothesis.`;
        expectedAnswer = `Inspect runtime state transitions using ${tool} and correlate with logs.`;
      } else {
        question = `Submit your root cause reasoning and verification evidence.`;
        expectedAnswer = `Definitive diagnosis: ${problem.slice(0, 120)}. Solution path approved.`;
      }
    } else if (level === 3) {
      if (idx === 0) {
        question = `Diagnose multi-source telemetry for ${title}. Several subsystems report latency; which is primary?`;
        expectedAnswer = `Distributed bottleneck centered on ${competency} causing cascading backpressure.`;
      } else if (idx === 1) {
        question = `Formulate the architectural root-cause hypothesis explaining the concurrency regression.`;
        expectedAnswer = `Race condition and cache coherence failure in ${competency} under concurrent load.`;
      } else if (idx === 2) {
        question = `Compare two architectural remedies. Which delivers high resilience with minimal regression risk?`;
        expectedAnswer = `Implement optimistic concurrency check with bounded retries and idempotent keys.`;
      } else if (idx === 3) {
        question = `Decide the implementation priority under strict SLA constraints.`;
        expectedAnswer = `Apply fail-safe circuit breaker and fallback default while repairing core logic.`;
      } else {
        question = `Audit system invariants and document architectural vulnerability.`;
        expectedAnswer = `System contract verified: resilience boundaries fortified against ${competency} collapse.`;
      }
    } else { // Level 4
      if (idx === 0) {
        question = `CRITICAL INCIDENT: Detect production failure pattern during high-traffic peak for ${title}.`;
        expectedAnswer = `P1 severity breach detected: Error rate increased to critical threshold on ${competency}.`;
      } else if (idx === 1) {
        question = `Investigate under active stakeholder pressure: PM wants rollback, Tech Lead wants live hotfix. What does telemetry prove?`;
        expectedAnswer = `Telemetry confirms failure is localized to ${competency}; targeted hotfix is faster and safer than full rollback.`;
      } else if (idx === 2) {
        question = `Determine the immediate containment action to halt customer impact.`;
        expectedAnswer = `Engage emergency feature flag or graceful degradation mode for ${competency}.`;
      } else if (idx === 3) {
        question = `New telemetry arrives mid-incident: secondary cluster reports latency. How do you adapt?`;
        expectedAnswer = `Shed non-essential background tasks and throttle retry bursts to stabilize cluster.`;
      } else {
        question = `Execute and confirm containment before opening hotfix pull request.`;
        expectedAnswer = `Containment verified active: customer error rate dropped below 0.1% baseline.`;
      }
    }

    options = [
      expectedAnswer,
      `Superficial visual glitch with zero backend or customer impact`,
      `Complete database wipeout requiring bare-metal restoration from tape backups`,
      `Client-side hardware defect requiring firmware updates on consumer devices`
    ];

    return {
      id: flagId,
      type: p.type,
      label: p.label,
      phase: p.phase,
      action: actionVerb,
      question,
      expectedAnswer,
      options,
      correctOptionIndex: 0,
      points: 10,
      requiredTool: tool,
      verificationKey: competency
    };
  });

  // Build Subtask 2 Flags (Remediation, Hardening & Verification: Flags 6 to 10)
  const subtask2Flags = progression.subtask2.map((p, idx) => {
    const flagId = `${taskId}-S2-F${idx + 1}`;
    const actionVerb = roleActions[(idx + 2) % roleActions.length];
    const tool = getToolForAction(role, (idx + 2) % 5);

    let question = '';
    let expectedAnswer = '';
    let options = [];

    if (level === 1) {
      if (idx === 0) {
        question = `Select the appropriate implementation pattern to resolve ${title}.`;
        expectedAnswer = `Implement ${expectedSolution.slice(0, 110)}.`;
      } else if (idx === 1) {
        question = `Apply the patch in ${tool}. Ensure syntax and logic are robust.`;
        expectedAnswer = `Code patch applied cleanly with zero syntax regressions.`;
      } else if (idx === 2) {
        question = `Handle edge conditions (empty payload, null attributes, or rapid click).`;
        expectedAnswer = `Defensive guards added to safely handle null and boundary states.`;
      } else if (idx === 3) {
        question = `Execute verification tests in ${tool}. What do results confirm?`;
        expectedAnswer = `All verification checks passed; issue confirmed resolved in preview.`;
      } else {
        question = `Submit final technical evidence and commit changes to version control.`;
        expectedAnswer = `Git commit created with clear message and verified test assertions.`;
      }
    } else if (level === 2) {
      if (idx === 0) {
        question = `Implement the resilient fix for ${title}. How is failure recovery managed?`;
        expectedAnswer = `Applied exponential backoff, timeout boundaries, and defensive fallback.`;
      } else if (idx === 1) {
        question = `Verify state consistency across rapid navigation and concurrent triggers.`;
        expectedAnswer = `State lifecycle verified clean with zero race conditions or memory leaks.`;
      } else if (idx === 2) {
        question = `Stress-test refresh and error recovery behaviors in ${tool}.`;
        expectedAnswer = `Component recovers cleanly from simulated network drops without freezing.`;
      } else if (idx === 3) {
        question = `Validate that unit and integration tests pass with 100% assertions green.`;
        expectedAnswer = `Test suite executed: all assertions passing green with zero regressions.`;
      } else {
        question = `Submit final technical PR evidence for code review approval.`;
        expectedAnswer = `Pull request submitted with comprehensive reproduction steps and test proofs.`;
      }
    } else if (level === 3) {
      if (idx === 0) {
        question = `Implement fault-tolerant architecture for ${title} under high concurrency.`;
        expectedAnswer = `Engineered distributed resilience with circuit breakers and idempotent transactions.`;
      } else if (idx === 1) {
        question = `Stress-test high-concurrency race conditions and edge-case boundaries.`;
        expectedAnswer = `Simulated 10,000 concurrent operations: zero data corruption or unhandled rejections.`;
      } else if (idx === 2) {
        question = `Resolve memory, compute, and latency trade-offs in the implementation.`;
        expectedAnswer = `Optimized computational complexity and verified sub-50ms p99 latency.`;
      } else if (idx === 3) {
        question = `Validate distributed invariants across all downstream services.`;
        expectedAnswer = `End-to-end telemetry confirms data consistency across all microservices.`;
      } else {
        question = `Defend architectural choices in the engineering postmortem.`;
        expectedAnswer = `Architecture defense approved: resilient against upstream outages and traffic spikes.`;
      }
    } else { // Level 4
      if (idx === 0) {
        question = `Deploy production hotfix to restore availability for ${title}.`;
        expectedAnswer = `Hotfix deployed to production canary fleet with live telemetry verification.`;
      } else if (idx === 1) {
        question = `Verify real user traffic telemetry post-deployment.`;
        expectedAnswer = `Live traffic confirms conversion rate restored to 100% baseline; zero 5xx errors.`;
      } else if (idx === 2) {
        question = `Run live chaos validation: inject simulated dependency latency.`;
        expectedAnswer = `Graceful degradation triggered successfully; core workflow remains 100% functional.`;
      } else if (idx === 3) {
        question = `Restore full normal operational parameters and decommission emergency throttles.`;
        expectedAnswer = `Full system operating at optimal throughput with all safety margins green.`;
      } else {
        question = `Publish incident postmortem with root cause, timeline, and permanent preventive actions.`;
        expectedAnswer = `Postmortem published: incident closed within SLA, MTTR under 20 minutes.`;
      }
    }

    options = [
      expectedAnswer,
      `Bypass security scans and deploy untested code directly to production`,
      `Disable monitoring alerts permanently so error notifications stop firing`,
      `Request customer users to refrain from using the platform during peak hours`
    ];

    return {
      id: flagId,
      type: p.type,
      label: p.label,
      phase: p.phase,
      action: actionVerb,
      question,
      expectedAnswer,
      options,
      correctOptionIndex: 0,
      points: 10,
      requiredTool: tool,
      verificationKey: competency
    };
  });

  return { subtask1Flags, subtask2Flags };
}

/**
 * Attaches capture flags to all tasks across the 192-task database.
 * Every main task receives 2 subtasks, each carrying 5 capture flags (10 flags per task).
 * Total: 192 × 2 × 5 = 1,920 challenge checkpoints.
 */
export function attachCaptureFlagsToTasks(tasks) {
  return tasks.map(task => {
    const { subtask1Flags, subtask2Flags } = generateCaptureFlagsForTask(task);
    
    // Ensure task has 2 subtasks
    const subtask1 = task.subtasks && task.subtasks[0] ? { ...task.subtasks[0] } : {
      id: `${task.id}-S1`,
      title: `Investigate and Triage ${task.title}`
    };

    const subtask2 = task.subtasks && task.subtasks[1] ? { ...task.subtasks[1] } : {
      id: `${task.id}-S2`,
      title: `Resolve and Verify ${task.title}`
    };

    subtask1.flags = subtask1Flags;
    subtask2.flags = subtask2Flags;

    return {
      ...task,
      subtasks: [subtask1, subtask2],
      totalFlagsCount: subtask1Flags.length + subtask2Flags.length, // 10
      totalFlagPoints: (subtask1Flags.length + subtask2Flags.length) * 10 // 100
    };
  });
}
