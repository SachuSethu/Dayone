// src/lib/company/companyStore.js
// DayOne.ai — Company / Employer State & Performance Intelligence Store
// Manages employer accounts, dynamic vacancies, applicant tracking,
// candidate evaluation telemetry, 3 distinct hiring paths, and hiring actions.
// STRICT PRIVACY: Companies have NO access to candidate personal employee accounts or personal contact info.

import { SKILLBASE_COMPANY_JOBS, SKILLBASE_19_SKILLS, SKILLBASE_ROLES } from '../../data/skillBaseData';

// Default Seed Companies
export const SEED_COMPANIES = [
  {
    companyId: 'company_001',
    companyName: 'TechNova Labs',
    email: 'hiring@technova.io',
    industry: 'Enterprise AI & Cloud Infrastructure',
    location: 'Bengaluru, India (Hybrid)',
    website: 'https://technova.io',
    logo: '🚀',
    accentColor: '#10b981',
    about: 'TechNova Labs builds next-generation AI developer tools and real-time streaming architectures.'
  },
  {
    companyId: 'company_002',
    companyName: 'PixelStack',
    email: 'talent@pixelstack.dev',
    industry: 'FinTech & Consumer SaaS',
    location: 'Kochi, India (Remote)',
    website: 'https://pixelstack.dev',
    logo: '💻',
    accentColor: '#06b6d4',
    about: 'PixelStack powers frictionless micro-transactions and enterprise dashboards.'
  },
  {
    companyId: 'company_003',
    companyName: 'SecureNet Systems',
    email: 'secops@securenet.com',
    industry: 'Cybersecurity & Defense Ops',
    location: 'Pune, India',
    website: 'https://securenet.com',
    logo: '🛡️',
    accentColor: '#f59e0b',
    about: 'SecureNet provides enterprise threat detection, perimeter monitoring, and incident response automation.'
  },
  {
    companyId: 'company_004',
    companyName: 'DesignFlow Studio',
    email: 'design@designflow.co',
    industry: 'Digital Product Design & Design Systems',
    location: 'Hyderabad, India (Remote)',
    website: 'https://designflow.co',
    logo: '🎨',
    accentColor: '#ec4899',
    about: 'Award-winning design agency specializing in accessible design systems and frictionless UI/UX.'
  }
];

// Rich Seed Candidate Pool across the 3 Required Paths
// NOTE: Personal contact details & personal employee accounts are STRICTLY PROTECTED / BLIND
export const SEED_CANDIDATES = [
  // ================= 1. FRONTEND DEVELOPERS =================
  {
    id: 'cand-fe-01',
    candidateTag: '#C-FE01',
    name: 'Alex Johnson',
    roleId: 'frontend',
    targetRole: 'Frontend Developer',
    headline: 'Mid-Level React Engineer & Web Performance Specialist',
    experienceYears: 2.5,
    location: 'Bengaluru, India (Hybrid/Remote)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '👨‍💻',
    skills: {
      html: 88,
      css: 90,
      javascript: 92,
      react: 94,
      api: 86,
      git: 84,
      testing: 78
    },
    skillScore: 88,
    taskScore: 94,
    roleMatch: 92,
    taskSummary: {
      taskTitle: 'Micro-Frontend State Synchronization & Race Condition Guard',
      domain: 'Frontend Developer',
      completedAt: '2026-09-23T14:20:00Z',
      edgeCasesCovered: '10/10 (100%)',
      codeQuality: 96,
      executionSpeed: '1.2s (Optimal)',
      submissionSnippet: `// Implemented resilient cleanup & AbortController race guard\nuseEffect(() => {\n  const controller = new AbortController();\n  syncState({ signal: controller.signal }).catch(err => {\n    if (err.name !== 'AbortError') handleSyncError(err);\n  });\n  return () => controller.abort();\n}, [activeView]);`,
      aiReviewNotes: 'Exceptional handling of component lifecycle cleanup and asynchronous state mutations. Zero memory leaks detected.'
    },
    interestedInCompanies: ['company_001', 'company_002'],
    resumeSummary: '2.5 years developing high-throughput web applications with React 19, TypeScript, Tailwind CSS, and Vitest. Successfully reduced initial bundle size by 38% and improved Core Web Vitals across 4 enterprise dashboards.'
  },
  {
    id: 'cand-fe-02',
    candidateTag: '#C-FE02',
    name: 'Priya Sharma',
    roleId: 'frontend',
    targetRole: 'Frontend Developer',
    headline: 'Senior Frontend Developer & Design System Architect',
    experienceYears: 3.5,
    location: 'Kochi, India (Remote)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '👩‍💻',
    skills: {
      html: 94,
      css: 95,
      javascript: 91,
      react: 93,
      api: 88,
      git: 90,
      testing: 85
    },
    skillScore: 91,
    taskScore: 92,
    roleMatch: 95,
    taskSummary: {
      taskTitle: 'Defensive API Cache Layer & Virtualized Infinite Grid',
      domain: 'Frontend Developer',
      completedAt: '2026-09-22T10:15:00Z',
      edgeCasesCovered: '9/10 (90%)',
      codeQuality: 94,
      executionSpeed: '1.4s',
      submissionSnippet: `// LRU Memory cache with dynamic stale-while-revalidate invalidation\nexport class ClientCacheStore {\n  constructor(maxItems = 100) {\n    this.cache = new Map();\n    this.max = maxItems;\n  }\n  // ...\n}`,
      aiReviewNotes: 'Well-structured object-oriented caching strategy with clean DOM virtualization.'
    },
    interestedInCompanies: ['company_001'],
    resumeSummary: 'Experienced frontend engineer with mastery of React, Next.js, and CSS Architecture. Architected custom UI kit used by 20+ microservices.'
  },
  {
    id: 'cand-fe-03',
    candidateTag: '#C-FE03',
    name: 'Elena Rostova',
    roleId: 'frontend',
    targetRole: 'Frontend Developer',
    headline: 'Junior-to-Mid React & Component Library Developer',
    experienceYears: 1.5,
    location: 'Hyderabad, India (Hybrid)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '👩‍💻',
    skills: {
      html: 84,
      css: 82,
      javascript: 85,
      react: 86,
      api: 80,
      git: 78,
      testing: 70
    },
    skillScore: 81,
    taskScore: 86,
    roleMatch: 84,
    taskSummary: {
      taskTitle: 'Accessible Multi-Step Registration & Form Validation Suite',
      domain: 'Frontend Developer',
      completedAt: '2026-09-21T18:40:00Z',
      edgeCasesCovered: '8/10 (80%)',
      codeQuality: 88,
      executionSpeed: '1.8s',
      submissionSnippet: `// WAI-ARIA compliant tabpanel with live validation alerts\nconst validateField = (name, value) => {\n  const rules = schema[name];\n  return rules ? rules.test(value) : true;\n};`,
      aiReviewNotes: 'Strong focus on keyboard accessibility (WCAG AA) and form state error recovery.'
    },
    interestedInCompanies: ['company_002'],
    resumeSummary: 'Frontend developer skilled in JavaScript ES2022+, React Hooks, Tailwind, and React Hook Form. Quick learner with great attention to UI polish.'
  },
  {
    id: 'cand-fe-04',
    candidateTag: '#C-FE04',
    name: 'David Kim',
    roleId: 'frontend',
    targetRole: 'Frontend Developer',
    headline: 'Frontend Engineer | Modern Web APIs & Performance',
    experienceYears: 2.0,
    location: 'Chennai, India',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '👨‍💻',
    skills: {
      html: 82,
      css: 84,
      javascript: 88,
      react: 85,
      api: 84,
      git: 82,
      testing: 76
    },
    skillScore: 83,
    taskScore: 88,
    roleMatch: 86,
    taskSummary: {
      taskTitle: 'Real-time WebSocket Dashboard Streaming & Reconnection Logic',
      domain: 'Frontend Developer',
      completedAt: '2026-09-20T12:00:00Z',
      edgeCasesCovered: '9/10 (90%)',
      codeQuality: 90,
      executionSpeed: '1.1s',
      submissionSnippet: `// Exponential backoff reconnect policy\nconst scheduleReconnect = (attempt) => {\n  const delay = Math.min(1000 * Math.pow(2, attempt), 30000);\n  setTimeout(connectSocket, delay);\n};`,
      aiReviewNotes: 'Robust fallback logic for network interruption. Clean socket state management.'
    },
    interestedInCompanies: ['company_001', 'company_002'],
    resumeSummary: '2 years building reactive client interfaces, data visualizations using Chart.js/D3, and robust REST/WebSocket data pipelines.'
  },

  // ================= 2. CYBERSECURITY ANALYSTS =================
  {
    id: 'cand-sec-01',
    candidateTag: '#C-SEC01',
    name: 'Marcus Vance',
    roleId: 'cybersecurity',
    targetRole: 'Cybersecurity Analyst',
    headline: 'SOC Tier 2 Analyst & Threat Hunting Specialist',
    experienceYears: 3.0,
    location: 'Pune, India (Hybrid)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '🛡️',
    skills: {
      'network-security': 92,
      linux: 88,
      siem: 94,
      'incident-response': 90,
      'threat-detection': 92,
      'log-analysis': 91
    },
    skillScore: 91,
    taskScore: 95,
    roleMatch: 94,
    taskSummary: {
      taskTitle: 'SIEM Ransomware Correlation & Outbound C2 Containment',
      domain: 'Cybersecurity Analyst',
      completedAt: '2026-09-24T08:30:00Z',
      edgeCasesCovered: '10/10 (100%)',
      codeQuality: 98,
      executionSpeed: '0.9s (Critical Rapid Response)',
      submissionSnippet: `// Splunk SPL Rule & Automated IPTables Block\nindex=firewall action=allowed dest_port=445\n| stats count by src_ip, dest_ip\n| where count > 500\n| eval threat_level="CRITICAL"`,
      aiReviewNotes: 'Flawless identification of lateral movement and suspicious SMB beaconing. Scripted instant firewall quarantine with zero false positives.'
    },
    interestedInCompanies: ['company_003'],
    resumeSummary: '3 years in enterprise SOC. Certified in CompTIA Security+, proficient in Splunk, Wireshark, CrowdStrike Falcon, and automated Bash/Python IR scripts.'
  },
  {
    id: 'cand-sec-02',
    candidateTag: '#C-SEC02',
    name: 'Samantha Reed',
    roleId: 'cybersecurity',
    targetRole: 'Cybersecurity Analyst',
    headline: 'Incident Response & Network Forensics Analyst',
    experienceYears: 2.0,
    location: 'Bengaluru, India (Remote)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '👩‍💻',
    skills: {
      'network-security': 86,
      linux: 84,
      siem: 88,
      'incident-response': 89,
      'threat-detection': 85,
      'log-analysis': 87
    },
    skillScore: 87,
    taskScore: 90,
    roleMatch: 89,
    taskSummary: {
      taskTitle: 'Wireshark Packet Stream Reconstruction & Data Exfiltration Audit',
      domain: 'Cybersecurity Analyst',
      completedAt: '2026-09-22T15:20:00Z',
      edgeCasesCovered: '9/10 (90%)',
      codeQuality: 92,
      executionSpeed: '1.3s',
      submissionSnippet: `// Extracted covert DNS tunneling payload\ntshark -r traffic.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name\n| base64 -d > exfiltrated_data.bin`,
      aiReviewNotes: 'Demonstrated deep understanding of DNS query exfiltration tactics and protocol anomalies.'
    },
    interestedInCompanies: ['company_003'],
    resumeSummary: 'Cybersecurity analyst focused on PCAP packet dissection, SIEM alert triage, and MITRE ATT&CK matrix alignment.'
  },
  {
    id: 'cand-sec-03',
    candidateTag: '#C-SEC03',
    name: 'Tariq Al-Mansoor',
    roleId: 'cybersecurity',
    targetRole: 'Cybersecurity Analyst',
    headline: 'Linux Systems Security & Threat Detection Engineer',
    experienceYears: 2.5,
    location: 'Mumbai, India',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '🛡️',
    skills: {
      'network-security': 84,
      linux: 92,
      siem: 85,
      'incident-response': 86,
      'threat-detection': 88,
      'log-analysis': 89
    },
    skillScore: 87,
    taskScore: 88,
    roleMatch: 88,
    taskSummary: {
      taskTitle: 'Linux Privilege Escalation Audit & Kernel Exploit Mitigation',
      domain: 'Cybersecurity Analyst',
      completedAt: '2026-09-21T11:00:00Z',
      edgeCasesCovered: '8/10 (80%)',
      codeQuality: 89,
      executionSpeed: '1.5s',
      submissionSnippet: `// Auditd rule for unauthorized SUID binary execution\n-a always,exit -F arch=b64 -S execve -F euid=0 -F auid>=1000 -k root_escalation`,
      aiReviewNotes: 'Strong hardening practices. Implemented precise auditd and PAM authentication constraints.'
    },
    interestedInCompanies: ['company_003', 'company_001'],
    resumeSummary: 'Hands-on background in Linux server hardening, vulnerability remediation, and automated host-based intrusion detection.'
  },

  // ================= 3. UI/UX DESIGNERS =================
  {
    id: 'cand-ux-01',
    candidateTag: '#C-UX01',
    name: 'Chloe Dupont',
    roleId: 'uiux',
    targetRole: 'UI/UX Designer',
    headline: 'Senior Product Designer & Design Systems Lead',
    experienceYears: 4.0,
    location: 'Bengaluru, India (Remote)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '🎨',
    skills: {
      figma: 96,
      'user-research': 92,
      wireframing: 94,
      prototyping: 95,
      'usability-testing': 90,
      'design-systems': 95
    },
    skillScore: 94,
    taskScore: 96,
    roleMatch: 96,
    taskSummary: {
      taskTitle: 'Multi-Brand Cross-Platform Design Token Library & Handoff Kit',
      domain: 'UI/UX Designer',
      completedAt: '2026-09-24T12:00:00Z',
      edgeCasesCovered: '10/10 (100%)',
      codeQuality: 98,
      executionSpeed: 'Instant High-Fi Render',
      submissionSnippet: `// Style Dictionary Token Definition (Semantic Dark Mode)\n{\n  "color": {\n    "brand": { "primary": { "value": "#10b981" } },\n    "surface": { "bg": { "value": "#0a0c10" } }\n  }\n}`,
      aiReviewNotes: 'Masterful organization of atomic design tokens, WCAG AAA color contrast compliance, and auto-layout nested component variants.'
    },
    interestedInCompanies: ['company_004', 'company_002'],
    resumeSummary: '4 years leading product design at scale. Led end-to-end design for SaaS applications with 500k+ active users, increasing feature adoption by 42%.'
  },
  {
    id: 'cand-ux-02',
    candidateTag: '#C-UX02',
    name: 'Liam O’Connor',
    roleId: 'uiux',
    targetRole: 'UI/UX Designer',
    headline: 'Product Interaction Designer & Rapid Prototyper',
    experienceYears: 2.0,
    location: 'Kochi, India (Hybrid)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '👨‍🎨',
    skills: {
      figma: 90,
      'user-research': 82,
      wireframing: 88,
      prototyping: 92,
      'usability-testing': 84,
      'design-systems': 85
    },
    skillScore: 87,
    taskScore: 91,
    roleMatch: 88,
    taskSummary: {
      taskTitle: 'Frictionless Checkout Funnel Redesign & Micro-Interactions',
      domain: 'UI/UX Designer',
      completedAt: '2026-09-23T16:30:00Z',
      edgeCasesCovered: '9/10 (90%)',
      codeQuality: 92,
      executionSpeed: 'Smooth 60fps Prototype',
      submissionSnippet: `// Smart Animate spring config for payment confirmation card\nTransition: Spring (mass: 1, stiffness: 280, damping: 20)`,
      aiReviewNotes: 'Significant reduction in cognitive load during multi-step checkout. Intuitive error affordances.'
    },
    interestedInCompanies: ['company_004'],
    resumeSummary: 'UI/UX Designer specialized in Figma, Framer, user journey mapping, and mobile-first micro-interactions.'
  },
  {
    id: 'cand-ux-03',
    candidateTag: '#C-UX03',
    name: 'Maya Sen',
    roleId: 'uiux',
    targetRole: 'UI/UX Designer',
    headline: 'UX Researcher & Quantitative Usability Evaluator',
    experienceYears: 2.5,
    location: 'Hyderabad, India (Remote)',
    personalInfoProtected: true,
    personalAccountAccess: false,
    avatar: '👩‍🎨',
    skills: {
      figma: 86,
      'user-research': 94,
      wireframing: 88,
      prototyping: 85,
      'usability-testing': 93,
      'design-systems': 82
    },
    skillScore: 88,
    taskScore: 92,
    roleMatch: 90,
    taskSummary: {
      taskTitle: 'Heuristic Usability Audit & User Journey Friction Elimination',
      domain: 'UI/UX Designer',
      completedAt: '2026-09-22T09:40:00Z',
      edgeCasesCovered: '9/10 (90%)',
      codeQuality: 94,
      executionSpeed: '1.0s Report Matrix',
      submissionSnippet: `// Severity Rating Scale & SUS (System Usability Scale) Matrix\nIdentified 3 catastrophic onboarding drop-off points with verified 4.8/5 heuristic solutions.`,
      aiReviewNotes: 'Rigorous empirical approach to UX testing. Comprehensive benchmark analysis.'
    },
    interestedInCompanies: ['company_004', 'company_001'],
    resumeSummary: 'UX Researcher with deep expertise in usability testing, user interviews, heuristic evaluations, and data-informed UI iterations.'
  }
];

// Helper: Calculate DayOne Performance Formula:
// Overall Performance = Skill Score * 0.40 + Task Score * 0.30 + Role Match * 0.20 + (Experience / 4 * 100) * 0.10
export function calculateOverallPerformance(cand) {
  const s = cand.skillScore || 80;
  const t = cand.taskScore || 85;
  const r = cand.roleMatch || 80;
  // Normalize experience (up to 4 years = 100%)
  const expNorm = Math.min(100, Math.round(((cand.experienceYears || 1.5) / 4) * 100));
  
  const score = (s * 0.40) + (t * 0.30) + (r * 0.20) + (expNorm * 0.10);
  return Math.round(score);
}

// -------------------------------------------------------------
// COMPANY SESSION MANAGEMENT
// -------------------------------------------------------------

export function getCompanySession() {
  try {
    const raw = localStorage.getItem('dayone_company_session');
    if (raw) return JSON.parse(raw);
    const userRaw = localStorage.getItem('dayone_user');
    if (userRaw) {
      const u = JSON.parse(userRaw);
      if (u.userType === 'company') return u;
    }
  } catch (e) {
    console.error('Failed to get company session:', e);
  }
  return null;
}

export function setCompanySession(companyObj) {
  const fullObj = {
    userType: 'company',
    ...companyObj,
    companyId: companyObj.companyId || `company_${Date.now()}`
  };
  localStorage.setItem('dayone_company_session', JSON.stringify(fullObj));
  localStorage.setItem('dayone_user', JSON.stringify(fullObj));
  return fullObj;
}

export function clearCompanySession() {
  localStorage.removeItem('dayone_company_session');
  // If current dayone_user was company, remove it
  try {
    const u = JSON.parse(localStorage.getItem('dayone_user') || '{}');
    if (u.userType === 'company') {
      localStorage.removeItem('dayone_user');
    }
  } catch (e) {}
}

// -------------------------------------------------------------
// VACANCY MANAGEMENT (SYNCHRONIZED WITH CANDIDATE SIDE)
// -------------------------------------------------------------

/**
 * Returns dynamic vacancies created by companies.
 */
export function getDynamicCompanyJobs() {
  try {
    const saved = localStorage.getItem('dayone_company_jobs');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Returns all jobs (static + dynamic) for a given companyId.
 */
export function getJobsForCompany(companyId, companyName = '') {
  const dynamic = getDynamicCompanyJobs();
  const staticJobs = SKILLBASE_COMPANY_JOBS;
  
  const combined = [...dynamic, ...staticJobs];
  
  return combined.filter(job => {
    if (job.companyId && job.companyId === companyId) return true;
    if (companyName && job.company && job.company.toLowerCase() === companyName.toLowerCase()) return true;
    return false;
  });
}

/**
 * Creates a new vacancy posted by a company.
 * Updates both company jobs and the candidate job recommendation pool.
 */
export function createCompanyVacancy(company, jobData) {
  const dynamic = getDynamicCompanyJobs();
  const newJobId = `job-dyn-${Date.now()}`;
  
  const newJob = {
    id: newJobId,
    companyId: company.companyId,
    company: company.companyName,
    companyLogo: company.logo || '🏢',
    title: jobData.title,
    roleId: jobData.roleId, // 'frontend' | 'cybersecurity' | 'uiux'
    location: jobData.location || 'Remote / Hybrid',
    experience: jobData.experience || '1-3 years',
    salaryRange: jobData.salaryRange || '$75,000 - $110,000',
    description: jobData.description,
    requiredSkills: jobData.requiredSkills || {},
    interviewQuestions: jobData.interviewQuestions || [
      {
        question: `How do you handle production architecture and quality assurance in ${jobData.title}?`,
        type: 'Technical',
        difficulty: 'Medium',
        targetSkill: Object.keys(jobData.requiredSkills || {})[0] || 'core'
      }
    ],
    postedAt: new Date().toISOString(),
    isCompanyPosted: true
  };

  const updated = [newJob, ...dynamic];
  localStorage.setItem('dayone_company_jobs', JSON.stringify(updated));
  return newJob;
}

// -------------------------------------------------------------
// CANDIDATE POOL INTELLIGENCE (STRICT PRIVACY / ZERO PERSONAL ACCESS)
// -------------------------------------------------------------

/**
 * Returns all candidates for a specific domain ('frontend', 'cybersecurity', 'uiux').
 * NOTE: Strict Privacy Isolation — Companies have NO access to candidate personal accounts
 * or candidate private credentials.
 */
export function getCandidatesForPath(pathId) {
  // Normalize pathId
  let normId = pathId;
  if (pathId === 'ui_ux') normId = 'uiux';
  if (pathId === 'frontend-developer') normId = 'frontend';
  if (pathId === 'cybersecurity-analyst') normId = 'cybersecurity';
  if (pathId === 'ui-ux-designer') normId = 'uiux';

  const list = SEED_CANDIDATES.filter(c => c.roleId === normId);

  // Return verified talent pool with calculated DayOne performance
  return list.map(cand => ({
    ...cand,
    overallPerformance: calculateOverallPerformance(cand)
  }));
}

// -------------------------------------------------------------
// SHORTLIST & HIRE OPERATIONS
// -------------------------------------------------------------

export function getShortlistedIds(companyId) {
  try {
    const raw = localStorage.getItem(`dayone_shortlist_${companyId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleShortlistCandidate(companyId, candidateId) {
  const current = getShortlistedIds(companyId);
  let updated;
  if (current.includes(candidateId)) {
    updated = current.filter(id => id !== candidateId);
  } else {
    updated = [...current, candidateId];
  }
  localStorage.setItem(`dayone_shortlist_${companyId}`, JSON.stringify(updated));
  return updated;
}

export function getHiredCandidates(companyId) {
  try {
    const raw = localStorage.getItem(`dayone_hired_${companyId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function hireCandidate(companyId, candidate, offerData) {
  const hiredList = getHiredCandidates(companyId);
  const hireRecord = {
    candidateId: candidate.id,
    candidateTag: candidate.candidateTag || candidate.id,
    candidateName: candidate.name,
    candidateRole: candidate.targetRole,
    hiredAt: new Date().toISOString(),
    offerRole: offerData.offerRole || candidate.targetRole,
    salaryPackage: offerData.salaryPackage || '$85,000 / yr',
    startDate: offerData.startDate || 'Next Monday',
    workArrangement: offerData.workArrangement || 'Hybrid / Remote',
    message: offerData.message || 'Congratulations! We are thrilled to welcome you to our engineering team.'
  };

  const updated = [hireRecord, ...hiredList.filter(h => h.candidateId !== candidate.id)];
  localStorage.setItem(`dayone_hired_${companyId}`, JSON.stringify(updated));
  return hireRecord;
}

// -------------------------------------------------------------
// AI CV SHORTLISTING & APPLICATION TRANSMISSION ENGINE
// -------------------------------------------------------------

/**
 * AI CV Shortlisting Engine:
 * Compares candidate's verified skills against the specific vacancy requirements,
 * calculates fit percentage, generates AI rationale, and determines auto-shortlist status.
 */
export function evaluateCandidateCvForVacancy(candidateVector = {}, requiredSkills = {}) {
  const reqKeys = Object.keys(requiredSkills);
  if (reqKeys.length === 0) {
    return {
      fitScore: 85,
      isShortlistedByAi: true,
      aiShortlistStatus: 'AI Auto-Shortlisted',
      aiVerdict: 'Top Match — Direct HR Interview Recommended',
      aiRationale: 'Candidate profile aligns strongly with domain baseline competencies. Verified simulation results confirm production readiness.',
      topStrengths: ['Core Domain Mastery', 'Workplace Simulation Validated'],
      skillAlignments: []
    };
  }

  let sumRatio = 0;
  const skillAlignments = [];
  const topStrengths = [];

  reqKeys.forEach(k => {
    const candVal = candidateVector[k] || 75;
    const reqVal = requiredSkills[k] || 70;
    const ratio = Math.min(candVal / reqVal, 1.0);
    sumRatio += ratio;

    const skillDef = SKILLBASE_19_SKILLS.find(s => s.id === k);
    const skillName = skillDef ? skillDef.name.split('/')[0].trim() : k.toUpperCase();

    skillAlignments.push({
      skillKey: k,
      skillName,
      candidateScore: candVal,
      requiredScore: reqVal,
      isExceeded: candVal >= reqVal,
      diff: candVal - reqVal
    });

    if (candVal >= reqVal + 4) {
      topStrengths.push(`${skillName} (${candVal}% vs ${reqVal}% required)`);
    }
  });

  const fitScore = Math.round((sumRatio / reqKeys.length) * 100);
  const isShortlistedByAi = fitScore >= 75;

  let aiShortlistStatus = 'Under Evaluation';
  let aiVerdict = 'Pending Assessment';
  let aiRationale = '';

  if (fitScore >= 85) {
    aiShortlistStatus = 'AI Auto-Shortlisted (High Priority)';
    aiVerdict = 'Top Candidate Match — Direct HR Interview Recommended';
    aiRationale = `Exceeds critical production thresholds in ${topStrengths.slice(0, 2).join(' and ') || 'core architecture'}. Workplace challenge validation confirmed zero regressions with verified edge-case coverage.`;
  } else if (fitScore >= 75) {
    aiShortlistStatus = 'AI Shortlisted (Qualified)';
    aiVerdict = 'Strong Candidate Fit — Fast-Track Technical Panel';
    aiRationale = `Solid alignment across primary vacancy benchmarks (${fitScore}% match). Verified code quality qualifies candidate for direct interview scheduling with HR.`;
  } else {
    aiShortlistStatus = 'Under Evaluation';
    aiVerdict = 'Review Recommended';
    aiRationale = `Candidate achieves ${fitScore}% match on criteria. Minor skill gaps noted; recommended for preliminary technical screening.`;
  }

  return {
    fitScore,
    isShortlistedByAi,
    aiShortlistStatus,
    aiVerdict,
    aiRationale,
    topStrengths,
    skillAlignments
  };
}

// Initial Seed Applications for Dropped / Active Company Vacancies
export const SEED_APPLICATIONS = [
  {
    applicationId: 'app-001',
    companyId: 'company_001',
    company: 'TechNova Labs',
    jobId: 'job-001',
    jobTitle: 'Junior Frontend Developer',
    candidateId: 'cand-fe-01',
    candidateTag: '#C-FE01',
    candidateName: 'Alex Johnson',
    candidateRole: 'Frontend Developer',
    candidateHeadline: 'Mid-Level React Engineer & Web Performance Specialist',
    readinessScore: 88,
    experience: '2.5 years',
    location: 'Bengaluru, India (Hybrid)',
    cvName: 'Alex_Johnson_DayOne_ATS_Resume.pdf',
    appliedAt: '2026-09-24T18:30:00Z',
    coverNote: 'I am applying for the Junior Frontend Developer position at TechNova Labs. With a verified 88% readiness score on DayOne.ai and hands-on simulation experience, I am prepared to contribute production-ready code immediately.',
    aiShortlist: {
      fitScore: 94,
      isShortlistedByAi: true,
      aiShortlistStatus: 'AI Auto-Shortlisted (High Priority)',
      aiVerdict: 'Top Candidate Match — Direct HR Interview Recommended',
      aiRationale: 'Outstanding candidate match (94%). Exceeds key production thresholds in React (94% vs 78% required) and JavaScript (92% vs 85% required). Passed 10/10 edge cases in Workplace Simulation challenge.',
      topStrengths: ['React (94% vs 78%)', 'JavaScript (92% vs 85%)', 'HTML (88% vs 75%)'],
      skillAlignments: [
        { skillKey: 'html', skillName: 'HTML', candidateScore: 88, requiredScore: 75, isExceeded: true },
        { skillKey: 'css', skillName: 'CSS', candidateScore: 90, requiredScore: 80, isExceeded: true },
        { skillKey: 'javascript', skillName: 'JavaScript', candidateScore: 92, requiredScore: 85, isExceeded: true },
        { skillKey: 'react', skillName: 'React', candidateScore: 94, requiredScore: 78, isExceeded: true },
        { skillKey: 'api', skillName: 'APIs', candidateScore: 86, requiredScore: 70, isExceeded: true }
      ]
    },
    sentToHr: true,
    sentToHrAt: '2026-09-24T20:15:00Z',
    hrLeadEmail: 'hiring@technova.io',
    hrNotes: 'Fast-tracked for Senior Engineering Manager panel. AI verification score 94%.'
  },
  {
    applicationId: 'app-002',
    companyId: 'company_001',
    company: 'TechNova Labs',
    jobId: 'job-001',
    jobTitle: 'Junior Frontend Developer',
    candidateId: 'cand-fe-02',
    candidateTag: '#C-FE02',
    candidateName: 'Priya Sharma',
    candidateRole: 'Frontend Developer',
    candidateHeadline: 'Senior Frontend Developer & Design System Architect',
    readinessScore: 91,
    experience: '3.5 years',
    location: 'Kochi, India (Remote)',
    cvName: 'Priya_Sharma_DayOne_ATS_Resume.pdf',
    appliedAt: '2026-09-25T01:10:00Z',
    coverNote: 'Excited to apply for TechNova Labs. My verified competencies in React 19, CSS Architecture, and testing match your vacancy criteria. Attached is my ATS resume with verified incident proofs.',
    aiShortlist: {
      fitScore: 92,
      isShortlistedByAi: true,
      aiShortlistStatus: 'AI Auto-Shortlisted (High Priority)',
      aiVerdict: 'Top Candidate Match — Direct HR Interview Recommended',
      aiRationale: 'Exceptional mastery in styling systems (95% vs 80%) and HTML architecture (94% vs 75%). Completed defensive API cache simulation with 94/100 code quality.',
      topStrengths: ['CSS Architecture (95% vs 80%)', 'HTML (94% vs 75%)', 'React (93% vs 78%)'],
      skillAlignments: [
        { skillKey: 'html', skillName: 'HTML', candidateScore: 94, requiredScore: 75, isExceeded: true },
        { skillKey: 'css', skillName: 'CSS', candidateScore: 95, requiredScore: 80, isExceeded: true },
        { skillKey: 'javascript', skillName: 'JavaScript', candidateScore: 91, requiredScore: 85, isExceeded: true },
        { skillKey: 'react', skillName: 'React', candidateScore: 93, requiredScore: 78, isExceeded: true }
      ]
    },
    sentToHr: false,
    sentToHrAt: null,
    hrLeadEmail: null,
    hrNotes: ''
  },
  {
    applicationId: 'app-003',
    companyId: 'company_001',
    company: 'TechNova Labs',
    jobId: 'job-001',
    jobTitle: 'Junior Frontend Developer',
    candidateId: 'cand-fe-03',
    candidateTag: '#C-FE03',
    candidateName: 'Elena Rostova',
    candidateRole: 'Frontend Developer',
    candidateHeadline: 'Junior-to-Mid React & Component Library Developer',
    readinessScore: 81,
    experience: '1.5 years',
    location: 'Hyderabad, India (Hybrid)',
    cvName: 'Elena_Rostova_DayOne_ATS_Resume.pdf',
    appliedAt: '2026-09-25T03:30:00Z',
    coverNote: 'Submitting my DayOne ATS resume for the Frontend Developer vacancy. Demonstrated high proficiency in keyboard accessibility and asynchronous form validation.',
    aiShortlist: {
      fitScore: 83,
      isShortlistedByAi: true,
      aiShortlistStatus: 'AI Shortlisted (Qualified)',
      aiVerdict: 'Qualified Candidate — Suitable for HR Technical Screening',
      aiRationale: 'Strong React fundamentals (86% vs 78%) and API consumption. All core thresholds fulfilled for junior engineering level.',
      topStrengths: ['React (86% vs 78%)', 'APIs (80% vs 70%)'],
      skillAlignments: [
        { skillKey: 'html', skillName: 'HTML', candidateScore: 84, requiredScore: 75, isExceeded: true },
        { skillKey: 'css', skillName: 'CSS', candidateScore: 82, requiredScore: 80, isExceeded: true },
        { skillKey: 'javascript', skillName: 'JavaScript', candidateScore: 85, requiredScore: 85, isExceeded: true },
        { skillKey: 'react', skillName: 'React', candidateScore: 86, requiredScore: 78, isExceeded: true }
      ]
    },
    sentToHr: false,
    sentToHrAt: null,
    hrLeadEmail: null,
    hrNotes: ''
  }
];

export function getAllApplications() {
  try {
    const raw = localStorage.getItem('dayone_applications');
    if (raw) return JSON.parse(raw);
    // Initialize with seed applications
    localStorage.setItem('dayone_applications', JSON.stringify(SEED_APPLICATIONS));
    return SEED_APPLICATIONS;
  } catch (e) {
    return SEED_APPLICATIONS;
  }
}

/**
 * Called when a candidate applies to a vacancy (dropped or static).
 * Evaluates candidate CV against vacancy criteria, runs AI shortlisting, and saves.
 */
export function recordApplicationForCompany(payload) {
  const allApps = getAllApplications();
  const appId = `app-${Date.now()}`;

  // Run AI CV Shortlisting Engine
  const aiEvaluation = evaluateCandidateCvForVacancy(
    payload.candidateVector || {},
    payload.jobRequiredSkills || {}
  );

  const newApp = {
    applicationId: appId,
    companyId: payload.companyId || 'company_001',
    company: payload.company || 'TechNova Labs',
    jobId: payload.jobId,
    jobTitle: payload.jobTitle || 'Software Engineer',
    candidateId: payload.candidateId || `cand-${Date.now()}`,
    candidateTag: payload.candidateTag || '#C-NEW',
    candidateName: payload.candidateName || 'Candidate',
    candidateRole: payload.candidateRole || payload.jobTitle,
    candidateHeadline: payload.candidateHeadline || 'DayOne Evaluated Candidate',
    readinessScore: payload.readinessScore || 80,
    experience: payload.experience || '2 years',
    location: payload.location || 'Remote',
    cvName: payload.cvName || 'DayOne_ATS_Resume.pdf',
    appliedAt: new Date().toISOString(),
    coverNote: payload.coverNote || '',
    aiShortlist: aiEvaluation,
    sentToHr: false,
    sentToHrAt: null,
    hrLeadEmail: null,
    hrNotes: ''
  };

  const updated = [newApp, ...allApps.filter(a => a.applicationId !== appId)];
  localStorage.setItem('dayone_applications', JSON.stringify(updated));

  // Dispatch custom window event
  window.dispatchEvent(new CustomEvent('dayone:application_received', { detail: newApp }));
  return newApp;
}

/**
 * Returns all applications received for a specific company.
 */
export function getCompanyApplications(companyId, companyName = '') {
  const all = getAllApplications();
  return all.filter(app => {
    if (app.companyId && app.companyId === companyId) return true;
    if (companyName && app.company && app.company.toLowerCase() === companyName.toLowerCase()) return true;
    return false;
  }).sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
}

/**
 * Forwards an AI-shortlisted candidate application directly to the Company HR.
 */
export function sendApplicationToHr(applicationId, hrData = {}) {
  const all = getAllApplications();
  let updatedApp = null;

  const updated = all.map(app => {
    if (app.applicationId === applicationId) {
      updatedApp = {
        ...app,
        sentToHr: true,
        sentToHrAt: new Date().toISOString(),
        hrLeadEmail: hrData.hrEmail || 'hiring@company.io',
        hrNotes: hrData.notes || 'Transmitted via DayOne AI Shortlisting Engine for immediate technical panel review.',
        interviewType: hrData.interviewType || 'Fast-Track Technical Panel'
      };
      return updatedApp;
    }
    return app;
  });

  localStorage.setItem('dayone_applications', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('dayone:application_updated', { detail: updatedApp }));
  return updatedApp;
}

// -------------------------------------------------------------
// COMPANY DASHBOARD KPI METRICS
// -------------------------------------------------------------

export function getCompanyDashboardStats(company) {
  const companyId = company.companyId || 'company_001';
  const companyName = company.companyName || 'TechNova Labs';

  // 1. All candidates across all 3 paths
  const feCandidates = getCandidatesForPath('frontend');
  const secCandidates = getCandidatesForPath('cybersecurity');
  const uxCandidates = getCandidatesForPath('uiux');
  const allCandidates = [...feCandidates, ...secCandidates, ...uxCandidates];

  // 2. Applications received for this company
  const applications = getCompanyApplications(companyId, companyName);
  const applicationCount = applications.length;
  const aiShortlistedCount = applications.filter(a => a.aiShortlist?.isShortlistedByAi).length;
  const sentToHrCount = applications.filter(a => a.sentToHr).length;

  // 3. Interested Candidates:
  const interestedCandidates = allCandidates.filter(c => {
    if (c.interestedInCompanies && c.interestedInCompanies.includes(companyId)) return true;
    return c.overallPerformance >= 85;
  });

  // 4. Completed Tasks:
  const completedTaskCandidates = allCandidates.filter(c => Boolean(c.taskSummary));

  // 5. Shortlisted
  const shortlistedIds = getShortlistedIds(companyId);
  const shortlistedCount = shortlistedIds.length;

  // 6. Hired
  const hiredList = getHiredCandidates(companyId);
  const hiredCount = hiredList.length;

  // 7. Active Jobs
  const activeJobs = getJobsForCompany(companyId, companyName);
  const activeJobsCount = Math.max(activeJobs.length, 2);

  return {
    applications,
    applicationCount,
    aiShortlistedCount,
    sentToHrCount,
    interestedCount: Math.max(interestedCandidates.length, applicationCount),
    interestedCandidates,
    completedTasksCount: completedTaskCandidates.length,
    completedTaskCandidates,
    shortlistedCount,
    shortlistedIds,
    hiredCount,
    hiredList,
    activeJobsCount,
    activeJobs,
    talentPoolSummary: {
      frontend: feCandidates.length,
      cybersecurity: secCandidates.length,
      uiux: uxCandidates.length,
      total: allCandidates.length
    }
  };
}
