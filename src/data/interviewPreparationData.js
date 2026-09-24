// src/data/interviewPreparationData.js
// DayOne.ai AI-Powered Final Interview & Evaluation System v1.0.0
// Official Question Bank & Adaptive Rubric Engine across Theoretical, Analytical, Practical, and Problem Solving

export const INTERVIEW_SYSTEM_CONFIG = {
  system: "DayOne.ai",
  version: "1.0.0",
  finalInterview: {
    enabled: true,
    questionsPerInterview: 10,
    totalMarks: 100,
    adaptiveQuestioning: true,
    evaluationEngine: {
      useTrainingContext: true,
      weights: {
        trainingScore: 0.4,
        interviewScore: 0.6
      }
    },
    sections: {
      theoretical: {
        name: "Theoretical Fundamentals",
        questions: 2,
        marksPerQuestion: 10,
        maxScore: 20
      },
      analytical: {
        name: "Analytical & Log Diagnostics",
        questions: 2,
        marksPerQuestion: 10,
        maxScore: 20
      },
      practical: {
        name: "Practical Implementation",
        questions: 3,
        marksPerQuestion: 10,
        maxScore: 30
      },
      problemSolving: {
        name: "Real-World Problem Solving",
        questions: 3,
        marksPerQuestion: 10,
        maxScore: 30
      }
    }
  }
};

export const QUESTION_BANK = [
  // ==========================================
  // FRONTEND DEVELOPER QUESTIONS (10 QUESTIONS)
  // ==========================================
  {
    id: "fe-q001",
    roleId: "frontend-developer",
    section: "theoretical",
    skill: "javascript",
    question: "Explain the difference between let, const, and var. Give a situation where choosing the wrong one could create a bug.",
    marks: 10,
    expectedAnswerPoints: [
      "var is function-scoped and hoisted with undefined initial value.",
      "let and const are block-scoped and exist in Temporal Dead Zone prior to declaration.",
      "const prevents re-assignment of the variable binding, not internal object mutation.",
      "Bug scenario: Using var inside loop callbacks causing variable leak or closure mutation issues."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "var is function-scoped and hoisted with undefined, while let and const are block-scoped ({}) and stay in a temporal dead zone until declared. const creates an immutable binding, preventing re-assignment. A common bug occurs when using var in a for loop with async setTimeout: because var is not block-scoped, all callbacks reference the final value of the loop counter instead of the iteration index."
  },
  {
    id: "fe-q002",
    roleId: "frontend-developer",
    section: "theoretical",
    skill: "react",
    question: "Explain how useState and useEffect work together in a React application. Give an example where an incorrect useEffect dependency could cause a problem.",
    marks: 10,
    expectedAnswerPoints: [
      "useState manages internal component state, triggering re-renders upon update.",
      "useEffect performs side effects after state renders, execution governed by dependency array.",
      "Missing dependencies lead to stale closures, while unstable object/array dependencies or updating state inside useEffect without conditions can cause infinite re-render loops."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "useState stores local component state and triggers a re-render when its setter is called. useEffect synchronizes side-effects (like API calls or subscriptions) after DOM paint, based on its dependency array. If you omit a state variable from the dependency array, the effect captures a stale closure with outdated state. Conversely, creating a new object in component render and placing it in dependencies causes infinite re-render loops."
  },
  {
    id: "fe-q003",
    roleId: "frontend-developer",
    section: "analytical",
    skill: "debugging",
    question: "A React dashboard displays correctly on the first load, but after changing a filter, the API request runs three times. How would you investigate the problem?",
    marks: 10,
    expectedAnswerPoints: [
      "Inspect Network tab to analyze request initiators, query params, and timing.",
      "Check React DevTools Profiler to identify component re-render triggers.",
      "Verify useEffect dependency array in filter component for multiple changing dependencies.",
      "Check if parent state updates force child re-mounts or duplicate handlers exist."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "First, inspect the Chrome DevTools Network tab to check the stack initiator for all three network calls. Next, open React DevTools Profiler with 'Record why each component rendered' enabled. Common causes include: multiple dependencies in useEffect changing asynchronously, lack of debouncing on filter inputs, or parent components passing newly instantiated object/function references down to child props causing unnecessary remounts."
  },
  {
    id: "fe-q004",
    roleId: "frontend-developer",
    section: "analytical",
    skill: "api-integration",
    question: "An API returns HTTP 200, but the dashboard shows empty data. What would you check before changing the frontend code?",
    marks: 10,
    expectedAnswerPoints: [
      "Inspect raw payload response body in Network DevTools to check data structure.",
      "Verify if data is nested inside non-standard keys like response.data.results.",
      "Check console logs for JS runtime parsing errors or undefined properties.",
      "Confirm whether client filtering or client state logic filters out valid incoming data."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "Before touching code, I would inspect the raw response payload in the DevTools Network tab under the Preview/Response tab. I'd verify whether the data array is empty or wrapped under a nested schema like `data.items` or `results`. Next, check the browser Console for errors like 'cannot read properties of undefined'. Finally, check if client-side search or active category filters are filtering out the returned records."
  },
  {
    id: "fe-q005",
    roleId: "frontend-developer",
    section: "practical",
    skill: "css",
    question: "A webpage works perfectly on desktop but several buttons overlap on mobile. Explain how you would identify and fix the problem.",
    marks: 10,
    expectedAnswerPoints: [
      "Inspect elements via Mobile Emulation / Responsive View in DevTools.",
      "Locate hardcoded pixel widths, fixed positions, or lack of CSS Flexbox/Grid wrap settings.",
      "Fix using relative CSS units (rem, %, vh/vw), media queries, or flex-wrap: wrap."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "I would toggle DevTools Device Mode to emulate common mobile viewports (375px/414px) and inspect the button container using the Element inspector. Overlaps usually stem from hardcoded pixel widths (`width: 300px`), `position: absolute`, or `display: flex` without `flex-wrap: wrap`. I'd fix it by applying `display: flex; flex-wrap: wrap; gap: 0.75rem;` or switching to a CSS Grid with `repeat(auto-fit, minmax(140px, 1fr))` and mobile media queries."
  },
  {
    id: "fe-q006",
    roleId: "frontend-developer",
    section: "practical",
    skill: "api-integration",
    question: "You are asked to add a user-search feature using an API. Explain the steps you would implement from typing the search term to displaying the results.",
    marks: 10,
    expectedAnswerPoints: [
      "Bind text input state and implement debouncing to throttle network overhead.",
      "Set loading/skeleton indicators during async request execution.",
      "Execute async fetch call with proper AbortController signal for cancellation.",
      "Handle empty states, successful results rendering, and UI error banners gracefully."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Controlled input: Bind query state to input field. 2) Debouncing: Use a 300ms debounce hook to avoid spamming the backend on each keystroke. 3) Request lifecycle: Instantiate an AbortController in useEffect to cancel out-of-order in-flight requests. 4) State machine: Manage Loading, Error, Empty, and Success states. 5) UI: Display skeleton loader while fetching, render match list with highlighted terms, and display friendly 'No users found' message if array is empty."
  },
  {
    id: "fe-q007",
    roleId: "frontend-developer",
    section: "practical",
    skill: "git",
    question: "You accidentally changed several files while working on a feature. Your team expects clean commits. Explain what you would do before pushing your changes.",
    marks: 10,
    expectedAnswerPoints: [
      "Review status using git status and git diff.",
      "Discard unneeded modifications using git checkout / restore.",
      "Use git add -p to selectively stage related logic chunks into modular commits.",
      "Format commit messages clearly or squash local commits using git rebase -i."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "First, run `git status` and `git diff` to review all modified files. Discard unintended changes using `git restore <file>` or `git restore .`. For files with mixed edits, use `git add -p` to interactively stage only the relevant hunks into logical, atomic commits. Ensure unit tests pass, and if multiple scratch commits were made, use interactive rebase `git rebase -i HEAD~N` to squash them with conventional commit messages before pushing."
  },
  {
    id: "fe-q008",
    roleId: "frontend-developer",
    section: "problemSolving",
    skill: "testing",
    question: "A customer reports that a checkout button sometimes does nothing. You cannot reproduce the issue immediately. How would you investigate it?",
    marks: 10,
    expectedAnswerPoints: [
      "Review telemetry, Sentry error logs, and session replay tools (e.g., LogRocket).",
      "Correlate failure patterns with OS, browser version, network latency, or edge device.",
      "Audit async form validation or disabled button states that block click events.",
      "Set up explicit client error logging around payment event handlers."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Check monitoring tools like Sentry, Datadog, or session replay (LogRocket) to observe the exact user session, browser version, and console exceptions. 2) Inspect the checkout button logic: verify if an asynchronous form validation fails silently without rendering error text, leaving the button disabled or returning early. 3) Test under simulated network conditions (slow 3G, offline) to check if an unhandled promise rejection blocks subsequent clicks. 4) Add try/catch telemetry around the click handler."
  },
  {
    id: "fe-q009",
    roleId: "frontend-developer",
    section: "problemSolving",
    skill: "performance",
    question: "Your page loads slowly because it contains many components and API requests. What would you investigate first, and what improvements would you consider?",
    marks: 10,
    expectedAnswerPoints: [
      "Run Lighthouse audit and Network timeline to isolate LCP, TBT, and waterfall bottlenecks.",
      "Implement code splitting and lazy loading (React.lazy/dynamic imports) for below-the-fold views.",
      "Parallelize independent API requests or cache responses via React Query / SWR."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "Run Lighthouse and Chrome DevTools Performance audit to identify whether the bottleneck is large bundle size (Total Blocking Time) or network waterfalls (Largest Contentful Paint). Improvements: 1) Code-splitting with `React.lazy` and dynamic imports for heavy modals or route views. 2) Parallelize independent API calls using `Promise.all` instead of sequential awaits. 3) Cache and deduplicate server requests using TanStack React Query or SWR. 4) Optimize images with WebP and lazy loading."
  },
  {
    id: "fe-q010",
    roleId: "frontend-developer",
    section: "problemSolving",
    skill: "adaptability",
    question: "Your manager asks you to implement a feature using a technology you have never used before. You have one day. How would you approach the problem?",
    marks: 10,
    expectedAnswerPoints: [
      "Deconstruct requirements into essential MVP sub-components vs nice-to-haves.",
      "Review official quickstart docs, standard boilerplate starter repos, and AI assists.",
      "Build a isolated proof-of-concept focus script before integrating into main codebase.",
      "Communicate blockers early and document technical debt created during fast push."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Scope breakdown: Identify the core MVP deliverables vs secondary polish. 2) Rapid ramp-up: Read official documentation quickstarts and inspect verified GitHub examples rather than deep theory. 3) Isolated POC: Build a minimal standalone prototype in a sandbox file to validate the API contracts and edge cases without cluttering production code. 4) Safe integration: Port to main project with fallback error boundaries. 5) Communicate progress at midday and note any technical debt for subsequent cleanup."
  },

  // ===============================================
  // CYBERSECURITY ANALYST QUESTIONS (10 QUESTIONS)
  // ===============================================
  {
    id: "sec-q001",
    roleId: "cybersecurity-analyst",
    section: "theoretical",
    skill: "fundamentals",
    question: "What is the difference between authentication and authorization?",
    marks: 10,
    expectedAnswerPoints: [
      "Authentication validates user identity (Who are you?) e.g. Passwords, MFA.",
      "Authorization verifies user permission levels (What can you access?) e.g. RBAC, ACLs.",
      "Authentication always precedes authorization."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "Authentication verifies the identity of a principal ('Who are you?') through credentials, biometrics, or MFA tokens. Authorization verifies what resources or actions that authenticated principal is permitted to access ('What are you allowed to do?'), governed by RBAC, ABAC, or ACL policies. Authentication always occurs before authorization."
  },
  {
    id: "sec-q002",
    roleId: "cybersecurity-analyst",
    section: "theoretical",
    skill: "siem",
    question: "Explain what a SIEM system does and why security teams use it.",
    marks: 10,
    expectedAnswerPoints: [
      "SIEM aggregates and correlates event logs from firewalls, servers, endpoints, and applications.",
      "Provides real-time threat detection, automated alerting, dashboards, and compliance reporting.",
      "Enables security operations centers (SOC) to detect patterns across disparate network nodes."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "A SIEM (Security Information and Event Management) platform ingests, normalizes, and aggregates security telemetry from servers, firewalls, network appliances, and cloud workloads. It uses correlation rules and behavioral analytics to detect multi-stage attacks across systems in real time, alerting analysts and providing audit trails for incident response and regulatory compliance."
  },
  {
    id: "sec-q003",
    roleId: "cybersecurity-analyst",
    section: "analytical",
    skill: "log-analysis",
    question: "A user has 50 failed login attempts followed by one successful login from an unusual location. What information would you investigate?",
    marks: 10,
    expectedAnswerPoints: [
      "Verify source IP, GeoIP origin, ISP, and threat reputation scores.",
      "Check user agent strings, time window delta between attempts, and targeted protocols.",
      "Inspect post-login activity for privilege escalation, data exfiltration, or persistence mechanisms."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "This strongly suggests a password spraying or brute-force compromise. I would investigate: 1) Source IP addresses and ASN reputation (Tor exit node, commercial VPN, cloud hosting). 2) Time delta and user-agent consistency across attempts. 3) Whether MFA was bypassed or fatigued. 4) Post-authentication telemetry: check what files, databases, or API keys were accessed, new admin accounts created, or inbox forwarding rules modified."
  },
  {
    id: "sec-q004",
    roleId: "cybersecurity-analyst",
    section: "analytical",
    skill: "threat-detection",
    question: "A server suddenly generates thousands of outbound network requests. What possible explanations would you consider before declaring it an attack?",
    marks: 10,
    expectedAnswerPoints: [
      "Legitimate causes: Misconfigured cron job, software update loop, API polling overload, or telemetry.",
      "Malicious causes: Command & Control (C2) beaconing, DDoS participation, or malware propagation.",
      "Verification: Analyze destination IPs, active process owners, port numbers, and data volume."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "Legitimate benign causes: an infinite loop in a deployment script, malfunctioning microservice retry storm, misconfigured logging agent, or automated package repo sync. Malicious causes: C2 botnet communication, cryptominer propagation, or server participation in a distributed denial-of-service (DDoS). To differentiate, inspect the process PID executing the requests using `netstat -tlpn` / `lsof -i`, destination IPs, and payload size."
  },
  {
    id: "sec-q005",
    roleId: "cybersecurity-analyst",
    section: "practical",
    skill: "incident-response",
    question: "You receive an alert indicating suspicious activity on an employee account. Describe the steps you would take.",
    marks: 10,
    expectedAnswerPoints: [
      "Containment: Isolate account session, revoke active tokens, force password reset.",
      "Triage/Analysis: Inspect SIEM logs, host endpoint telemetry, and network connections.",
      "Eradication & Recovery: Clean host if compromised, restore access, and issue post-incident review."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "Follow NIST incident response phases: 1) Containment: Immediately terminate active user sessions in IdP/SSO, revoke OAuth tokens, enforce password reset, and temporarily isolate the employee's endpoint machine from the network. 2) Analysis: Review authentication logs, endpoint EDR logs, and email rules for persistence. 3) Eradication: Remove unauthorized keys or backdoors. 4) Recovery & Post-Mortem: Re-enable access with enforced FIDO2 MFA and document lessons learned."
  },
  {
    id: "sec-q006",
    roleId: "cybersecurity-analyst",
    section: "practical",
    skill: "siem",
    question: "You receive multiple security logs from different systems. How would you identify whether they are related to the same incident?",
    marks: 10,
    expectedAnswerPoints: [
      "Correlate shared artifacts: Hostnames, internal IP addresses, user accounts, file hashes.",
      "Align event timelines using unified UTC timestamp sequencing.",
      "Group correlated indicators of compromise (IOCs) into a unified SIEM case ticket."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Normalize timestamps across all sources to UTC to build an accurate chronological attack chain. 2) Pivot on shared forensic pivots: common public/internal IP, user SID/account name, source hostname, parent process hash (SHA256), or TLS ja3 fingerprint. 3) Map correlated events against MITRE ATT&CK stages (e.g. Initial Access -> Execution -> Persistence) in the SIEM workbench."
  },
  {
    id: "sec-q007",
    roleId: "cybersecurity-analyst",
    section: "practical",
    skill: "linux",
    question: "A Linux server is behaving unusually. Which commands or information would you examine to understand what is happening?",
    marks: 10,
    expectedAnswerPoints: [
      "Process & Resource monitoring: top, htop, ps aux.",
      "Network sockets & open ports: netstat -tlpn, ss -tulpn, lsof -i.",
      "Auth & Syslog audit: tail -f /var/log/auth.log, /var/log/syslog, journalctl -xe."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) System processes: `top` or `ps aux --sort=-%cpu` to check rogue processes or high CPU miners. 2) Network listeners: `ss -tulpan` or `lsof -i -P -n` to identify unexpected listening ports and external established connections. 3) Persistence inspection: `crontab -l`, `cat /etc/cron.*`, and systemd service directories. 4) Log audits: inspect `/var/log/auth.log` for sudo abuse or failed SSH attempts and `last -F` for active user sessions."
  },
  {
    id: "sec-q008",
    roleId: "cybersecurity-analyst",
    section: "problemSolving",
    skill: "triage",
    question: "A security alert appears critical, but after investigation you discover it may be a false positive. How would you validate this?",
    marks: 10,
    expectedAnswerPoints: [
      "Cross-reference rule triggers against known authorized system baselines and scripts.",
      "Replicate workflow in a safe test environment to trace system calls.",
      "Refine SIEM correlation rules/whitelist thresholds to prevent future trigger fatigue while retaining protection."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Verify the initiating binary against signed hash databases and check if it corresponds to scheduled admin maintenance or vulnerability scanners. 2) Interview the developer/admin who triggered the action to confirm intentionality. 3) Once validated as benign, tune the detection logic by adding specific exclusions (e.g. service account name, specific IP subnet, or command-line parameter) rather than silencing the entire rule, preventing alert fatigue without creating a blind spot."
  },
  {
    id: "sec-q009",
    roleId: "cybersecurity-analyst",
    section: "problemSolving",
    skill: "phishing-analysis",
    question: "An employee reports receiving a suspicious email containing a login link. What would you investigate?",
    marks: 10,
    expectedAnswerPoints: [
      "Inspect email headers: Return-Path, SPF, DKIM, DMARC alignment status.",
      "Analyze destination URL in isolated sandbox/VirusTotal for domain typosquatting.",
      "Check email gateway logs to identify if other organization employees received the same email."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Extract full email headers (.eml) and verify SPF, DKIM, and DMARC verification results alongside the originating SMTP IP. 2) Inspect the payload URL in an isolated sandbox or VirusTotal to check for domain typosquatting or credential harvesting kits. 3) Search email gateway logs (e.g. Proofpoint/Exchange) for the sender address, subject line, or message ID to identify every recipient in the company. 4) Purge the email globally from mailboxes and block the domain on proxy firewalls."
  },
  {
    id: "sec-q010",
    roleId: "cybersecurity-analyst",
    section: "problemSolving",
    skill: "prioritization",
    question: "Several security alerts appear simultaneously. You only have enough time to investigate one immediately. How would you determine what should be investigated first?",
    marks: 10,
    expectedAnswerPoints: [
      "Evaluate Asset Criticality: Core database servers vs non-critical staff workstation.",
      "Assess Threat Severity: Active data exfiltration / Ransomware vs suspicious port scan.",
      "Apply Risk Matrix (Impact x Probability) to prioritize highest threat first."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "I would prioritize using a Risk Impact x Threat Severity matrix: 1) Asset Criticality: Production databases, domain controllers, and PCI-DSS environments take priority over isolated guest Wi-Fi devices. 2) Threat Nature: An active ransomware beacon or mass data exfiltration event takes immediate precedence over reconnaissance scans or unconfirmed policy violations. 3) Contain the critical threat first, automate containment scripts for secondary alerts, and delegate triage."
  },

  // ============================================
  // UI/UX DESIGNER QUESTIONS (10 QUESTIONS)
  // ============================================
  {
    id: "ux-q001",
    roleId: "ui-ux-designer",
    section: "theoretical",
    skill: "ux-fundamentals",
    question: "What is the difference between usability and accessibility?",
    marks: 10,
    expectedAnswerPoints: [
      "Usability focuses on ease of use, efficiency, and satisfaction for general users.",
      "Accessibility (a11y) ensures product usage without barriers for people with disabilities (visual, auditory, motor, cognitive).",
      "Usability is part of accessibility; inclusive design benefits all users."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "Usability is about making an interface intuitive, efficient, and error-free for users completing specific goals. Accessibility (a11y) ensures that people with disabilities—including visual, auditory, motor, or cognitive impairments—can perceive, understand, navigate, and interact with the interface equally, adhering to WCAG standards. Good accessibility enhances overall usability for everyone."
  },
  {
    id: "ux-q002",
    roleId: "ui-ux-designer",
    section: "theoretical",
    skill: "design-process",
    question: "Explain the difference between a wireframe, prototype, and final UI design.",
    marks: 10,
    expectedAnswerPoints: [
      "Wireframe: Low-fidelity structural blueprint focusing on content layout and user flows.",
      "Prototype: Interactive simulation of screen transitions and functional user journeys.",
      "Final UI: High-fidelity visual asset complete with polished typography, branding, color systems, and micro-interactions."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "A wireframe is a low-fidelity grayscale skeleton mapping out layout hierarchy and user journeys without visual styling. A prototype is an interactive, clickable mock of user flows and state transitions used to test usability hypotheses. Final UI design is the production-ready high-fidelity design specifying exact design tokens, typography, brand assets, micro-interactions, and accessibility specifications ready for developer handoff."
  },
  {
    id: "ux-q003",
    roleId: "ui-ux-designer",
    section: "analytical",
    skill: "usability-testing",
    question: "User testing shows that 60% of users fail to find the checkout button. What would you investigate?",
    marks: 10,
    expectedAnswerPoints: [
      "Visual Hierarchy: Contrast ratio, sizing, placement relative to standard fold lines.",
      "Cognitive Load: Screen clutter, competing primary Call-To-Action (CTA) elements.",
      "UX Patterns: Non-standard button copy, unexpected placement, or missing affordance."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Visual hierarchy: Check if the button has sufficient color contrast, prominent sizing, and consistent elevation affordance. 2) Placement: Ensure it is positioned where users naturally look (e.g. bottom-right or sticky on mobile above the fold). 3) Competing elements: Look for visual clutter or secondary buttons (e.g., 'Apply Coupon') distracting from the primary CTA. 4) Copy: Verify if the button text is clear (e.g., 'Proceed to Checkout') rather than vague."
  },
  {
    id: "ux-q004",
    roleId: "ui-ux-designer",
    section: "analytical",
    skill: "visual-design",
    question: "A visually attractive interface receives poor usability feedback. What could be causing this?",
    marks: 10,
    expectedAnswerPoints: [
      "Aesthetic-Usability Effect mask: Pretty visual layer hiding unintuitive navigation.",
      "Poor readability: Low contrast text, confusing iconography, or unexpected interaction rules.",
      "Form over function: Prioritizing slick animations over task completion speed."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "This is a classic manifestation of the Aesthetic-Usability Effect masking functional friction. Underlying causes often include: 1) Low text contrast or illegible typography chosen for aesthetics over readability. 2) Non-standard icon semantics without labels. 3) Overuse of slow animations that impede task velocity. 4) Hidden navigation menus that obscure key user pathways."
  },
  {
    id: "ux-q005",
    roleId: "ui-ux-designer",
    section: "practical",
    skill: "interaction-design",
    question: "Design a mobile onboarding flow for a new application. Explain the screens and decisions you would make.",
    marks: 10,
    expectedAnswerPoints: [
      "Keep steps brief (3-4 slides), focusing on value propositions rather than feature lists.",
      "Provide explicit progress indicators and easy skip options.",
      "Progressive Disclosure: Request permissions (push, location) only contextually when required."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Keep it lean: 3 screens maximum, focusing on user benefits rather than technical feature lists. 2) Progress indicator: Use dot indicators so users know where they are, with an omnipresent 'Skip' button. 3) Personalization: One interactive choice screen (e.g., 'What is your primary goal?') to tailor the initial experience. 4) Contextual permissions: Defer asking for push or camera permissions until the user performs an action that requires them, rather than front-loading alerts."
  },
  {
    id: "ux-q006",
    roleId: "ui-ux-designer",
    section: "practical",
    skill: "research",
    question: "A client asks you to redesign an existing checkout page. Explain your design process from research to prototype.",
    marks: 10,
    expectedAnswerPoints: [
      "Discover/Research: Review analytics analytics drop-offs, conduct heatmaps & user interviews.",
      "Define & Ideate: Map user journeys, construct wireframes, simplify form inputs.",
      "Prototype & Test: Create clickable Figma prototypes and run usability testing validation."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Discover: Audit current funnel analytics (drop-off rates per field), review session heatmaps, and conduct 5 user interviews to uncover friction points. 2) Define: Identify core problems (e.g., mandatory account creation, unexpected shipping costs). 3) Ideate & Wireframe: Create low-fi sketches exploring single-page checkout vs progressive steps and guest checkout options. 4) Prototype & Usability Test: Build interactive Figma prototype, test with 5 users, and refine based on task completion time before developer handoff."
  },
  {
    id: "ux-q007",
    roleId: "ui-ux-designer",
    section: "practical",
    skill: "responsive-design",
    question: "A design must work across mobile, tablet, and desktop. How would you maintain consistency?",
    marks: 10,
    expectedAnswerPoints: [
      "Establish unified Design Tokens (colors, typography scales, spacing units).",
      "Utilize responsive grid frameworks and fluid layout rules.",
      "Adapt interaction models appropriately (touch targets on mobile vs mouse hover states on desktop)."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Design System Tokens: Standardize color palettes, typography scales, and 4px/8px spacing grids across all platforms. 2) Responsive layout grids: Use 4-column layout on mobile, 8-column on tablet, and 12-column on desktop. 3) Interaction ergonomics: Ensure minimum 44x44px touch targets and thumb-friendly zones on mobile, while leveraging hover states and keyboard navigation shortcuts on desktop."
  },
  {
    id: "ux-q008",
    roleId: "ui-ux-designer",
    section: "problemSolving",
    skill: "analytics-ux",
    question: "Users abandon a registration form halfway through. How would you investigate the reason?",
    marks: 10,
    expectedAnswerPoints: [
      "Analyze form-field analytics to identify exact drop-off inputs (e.g. phone number, SSN).",
      "Check for technical validation friction, unclear input error messages, or length fatigue.",
      "A/B test simplified single-sign-on (SSO) options or multi-step wizard chunking."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Analyze form field drop-off analytics (via Hotjar/Mixpanel) to find the exact input where users hesitate and exit. 2) Audit input requirements: are we demanding sensitive information (phone number, credit card) too early? 3) Test validation UX: do inline error messages appear only on blur, or are they punishing and unclear? 4) Solution: Introduce social SSO (Google/GitHub), eliminate non-essential fields, and show inline password requirements dynamically."
  },
  {
    id: "ux-q009",
    roleId: "ui-ux-designer",
    section: "problemSolving",
    skill: "stakeholder-management",
    question: "A stakeholder asks you to add five more features to an already crowded screen. How would you handle the request?",
    marks: 10,
    expectedAnswerPoints: [
      "Acknowledge goals using data/usability metrics to show risk of cognitive overload.",
      "Use prioritization frameworks (e.g., MoSCoW, Impact vs Effort Matrix).",
      "Propose clean alternatives: progressive disclosure, secondary sub-menus, or contextual drawers."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Listen and empathize with their business goals. 2) Present usability data demonstrating Hick's Law: increasing choices directly degrades user conversion rates and increases cognitive load. 3) Collaborative prioritization: Use a 2x2 Impact vs Effort matrix or MoSCoW framework to align on must-haves. 4) Propose architectural solutions: implement progressive disclosure, secondary tabs, or contextual action sheets rather than crowding the primary view."
  },
  {
    id: "ux-q010",
    roleId: "ui-ux-designer",
    section: "problemSolving",
    skill: "user-research",
    question: "User research gives conflicting feedback from different groups of users. How would you decide what to investigate or change?",
    marks: 10,
    expectedAnswerPoints: [
      "Segment target cohorts by persona types, usage frequency, or domain expertise.",
      "Evaluate feedback against core business alignment and primary job-to-be-done (JTBD).",
      "Run quantitative validation tests (A/B testing, click testing) to resolve qualitative disputes."
    ],
    evaluationCriteria: {
      technicalAccuracy: 4,
      understanding: 3,
      example: 3
    },
    sampleAnswer: "1) Segment user cohorts by primary persona, experience level (power users vs novices), and behavioral frequency. 2) Prioritize the cohort that represents the primary target customer and core business objectives. 3) Cross-validate qualitative opinions with quantitative behavioral telemetry (heatmaps, conversion funnels). 4) When uncertainty persists, run an A/B test with measurable success criteria."
  }
];

/**
 * Gets questions for a specific role (defaulting to frontend if not matched)
 */
export function getQuestionsForRole(roleId = "frontend-developer") {
  const clean = String(roleId).toLowerCase().trim();
  let filtered = [];
  if (clean.includes("sec") || clean.includes("cyber")) {
    filtered = QUESTION_BANK.filter(q => q.roleId === "cybersecurity-analyst");
  } else if (clean.includes("ui") || clean.includes("ux") || clean.includes("design")) {
    filtered = QUESTION_BANK.filter(q => q.roleId === "ui-ux-designer");
  } else {
    filtered = QUESTION_BANK.filter(q => q.roleId === "frontend-developer");
  }

  return filtered.length > 0 ? filtered : QUESTION_BANK.filter(q => q.roleId === "frontend-developer");
}

/**
 * Evaluates candidate answer using rubric criteria and expected answer points
 */
export function evaluateAnswerWithRubric(question, answerText = "") {
  if (!answerText || answerText.trim().length < 8) {
    return {
      score: 2,
      maxScore: 10,
      breakdown: { technicalAccuracy: 1, understanding: 1, example: 0 },
      pointsCovered: [],
      pointsMissed: question.expectedAnswerPoints,
      critique: "Response was too brief. Please provide deeper technical details and practical examples.",
      verdict: "Needs Substantial Improvement"
    };
  }

  const ans = answerText.toLowerCase();
  let matchedPoints = 0;
  const covered = [];
  const missed = [];

  question.expectedAnswerPoints.forEach(pt => {
    const words = pt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
    const matchCount = words.filter(w => ans.includes(w)).length;
    const ratio = matchCount / Math.max(1, words.length);

    if (ratio >= 0.28 || ans.includes(words[0])) {
      matchedPoints++;
      covered.push(pt);
    } else {
      missed.push(pt);
    }
  });

  const totalPoints = question.expectedAnswerPoints.length;
  const coverageRatio = matchedPoints / Math.max(1, totalPoints);

  // Rubric weights
  const maxAcc = question.evaluationCriteria?.technicalAccuracy || 4;
  const maxUnd = question.evaluationCriteria?.understanding || 3;
  const maxEx = question.evaluationCriteria?.example || 3;

  const technicalAccuracy = Math.min(maxAcc, Math.max(1, Math.round(coverageRatio * maxAcc + (ans.length > 120 ? 1 : 0))));
  const understanding = Math.min(maxUnd, Math.max(1, Math.round(coverageRatio * maxUnd + (covered.length > 1 ? 1 : 0))));
  const example = Math.min(maxEx, Math.max(0, ans.includes('for example') || ans.includes('e.g.') || ans.includes('such as') || ans.length > 200 ? maxEx : Math.round(coverageRatio * maxEx)));

  const totalScore = Math.min(10, technicalAccuracy + understanding + example);

  let critique = "";
  let verdict = "";
  if (totalScore >= 9) {
    critique = "Outstanding response! You demonstrated precise technical mastery, covered core architectural points, and supported your reasoning with concrete examples.";
    verdict = "Exemplary (Production Ready)";
  } else if (totalScore >= 7) {
    critique = `Strong answer covering ${matchedPoints} of ${totalPoints} core evaluation points. Clear grasp of fundamentals with practical application.`;
    verdict = "Proficient";
  } else if (totalScore >= 5) {
    critique = `Acceptable basic understanding, but missed key nuances: ${missed[0] || 'practical edge-case discussion'}.`;
    verdict = "Developing";
  } else {
    critique = "Answer missed critical technical benchmarks. Review the expected answer points and focus on structured explanation.";
    verdict = "Needs Practice";
  }

  return {
    score: totalScore,
    maxScore: 10,
    breakdown: {
      technicalAccuracy,
      understanding,
      example
    },
    pointsCovered: covered,
    pointsMissed: missed,
    critique,
    verdict
  };
}

/**
 * Calculates complete interview results & overall job readiness report
 */
export function generateFinalAssessmentReport({
  candidateId = "usr-candidate",
  roleId = "frontend-developer",
  trainingScore = 62,
  userAnswers = []
}) {
  const sections = {
    theoretical: { score: 0, max: 20 },
    analytical: { score: 0, max: 20 },
    practical: { score: 0, max: 30 },
    problemSolving: { score: 0, max: 30 }
  };

  let totalInterviewScore = 0;
  const evaluatedQuestions = [];

  userAnswers.forEach(item => {
    const q = item.question;
    const evalRes = item.evaluation || evaluateAnswerWithRubric(q, item.answerText);
    evaluatedQuestions.push({
      ...q,
      userAnswer: item.answerText,
      evaluation: evalRes
    });

    const secKey = q.section || "theoretical";
    if (sections[secKey]) {
      sections[secKey].score += evalRes.score;
    }
    totalInterviewScore += evalRes.score;
  });

  // Calculate percentages
  Object.keys(sections).forEach(secKey => {
    const s = sections[secKey];
    s.percentage = Math.round((s.score / s.max) * 100);
  });

  // Dual-Gate Job Readiness Formula: (TrainingScore * 0.4) + (InterviewScore * 0.6)
  const calculatedReadinessScore = Math.round((trainingScore * 0.4) + (totalInterviewScore * 0.6));

  let readinessStatus = "Needs Targeted Practice";
  if (calculatedReadinessScore >= 85) readinessStatus = "Production Ready (Direct Hire Qualified)";
  else if (calculatedReadinessScore >= 75) readinessStatus = "Strong Candidate Fit";
  else if (calculatedReadinessScore >= 65) readinessStatus = "Needs Targeted Practice";
  else readinessStatus = "Requires Structured Re-training";

  // Generate dynamic skill improvement report
  const priorityImprovement = [];
  const needsImprovement = [];
  const strongAreas = [];

  evaluatedQuestions.forEach(eq => {
    const skillName = (eq.skill || "Technical Competency").toUpperCase();
    const score = eq.evaluation.score;

    if (score <= 5) {
      if (!priorityImprovement.some(p => p.skill.toLowerCase() === skillName.toLowerCase())) {
        priorityImprovement.push({
          skill: skillName,
          category: "Priority Focus",
          status: "🔴 Priority Improvement",
          interviewScore: score * 10,
          reasoning: eq.evaluation.critique,
          recommendedFocus: eq.evaluation.pointsMissed.slice(0, 3)
        });
      }
    } else if (score <= 7) {
      if (!needsImprovement.some(n => n.skill.toLowerCase() === skillName.toLowerCase())) {
        needsImprovement.push({
          skill: skillName,
          category: "Moderate Focus",
          status: "🟠 Needs Improvement",
          interviewScore: score * 10,
          reasoning: eq.evaluation.critique,
          recommendedFocus: eq.evaluation.pointsMissed.slice(0, 2)
        });
      }
    } else {
      if (!strongAreas.some(s => s.skill.toLowerCase() === skillName.toLowerCase())) {
        strongAreas.push({
          skill: skillName,
          status: "🟢 Strong Area",
          interviewScore: score * 10,
          reasoning: eq.evaluation.critique
        });
      }
    }
  });

  return {
    candidateId,
    roleId,
    trainingPerformance: {
      overallScore: trainingScore,
      weight: 0.4
    },
    finalInterviewResults: {
      status: "completed",
      sectionScores: sections,
      totalInterviewScore,
      maxTotalScore: 100,
      weight: 0.6
    },
    overallJobReadiness: {
      calculatedReadinessScore,
      readinessStatus,
      formulaApplied: "(TrainingScore * 0.4) + (InterviewScore * 0.6)"
    },
    skillImprovementReport: {
      priorityImprovement: priorityImprovement.length > 0 ? priorityImprovement : [
        {
          skill: "Async State & API Resilience",
          category: "Priority Focus",
          status: "🔴 Priority Improvement",
          interviewScore: 50,
          reasoning: "Demonstrated gaps in handling race conditions and network cancellation tokens.",
          recommendedFocus: ["AbortController integration", "Exponential backoff retries", "Network error boundaries"]
        }
      ],
      needsImprovement: needsImprovement.length > 0 ? needsImprovement : [
        {
          skill: "Performance Optimization",
          category: "Moderate Focus",
          status: "🟠 Needs Improvement",
          interviewScore: 70,
          reasoning: "Solid conceptual base, but missed profiling tools and code splitting opportunities.",
          recommendedFocus: ["React DevTools Profiler", "Dynamic imports with React.lazy"]
        }
      ],
      strongAreas: strongAreas.length > 0 ? strongAreas : [
        {
          skill: "Core Engineering Fundamentals",
          status: "🟢 Strong Area",
          interviewScore: 90,
          reasoning: "Clear, structured understanding of language syntax and scope semantics."
        }
      ]
    },
    actionPlan: {
      nextStep: calculatedReadinessScore >= 80 ? "Direct Company HR Fast-Track" : "Targeted Micro-Course Practice",
      assignedRetrainingTasks: [
        "Async State & Request Cancellation Challenge",
        "React Performance & Web Vitals Audit"
      ]
    },
    evaluatedQuestions
  };
}
