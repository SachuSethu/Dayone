// src/data/skillBaseData.js
// SkillBase Hiring & Evaluation Model dataset and Dual-Gate Verification Engine.
// Integrates 19-skill taxonomy across 3 domains (Frontend, Cybersecurity, UI/UX),
// 9 company job specs, 20 live industry news updates, and exact mathematical formulations.

export const SKILLBASE_ROLES = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    description: 'Builds responsive web interfaces and frontend applications.',
    workspace: 'frontend',
    skillsCount: 7,
    minimumRequirements: {
      html: 50,
      css: 50,
      javascript: 55,
      react: 40,
      api: 30,
      git: 30,
      testing: 25
    }
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Analyst',
    description: 'Monitors systems, investigates incidents and identifies security threats.',
    workspace: 'cybersecurity',
    skillsCount: 6,
    minimumRequirements: {
      'network-security': 50,
      linux: 40,
      siem: 35,
      'incident-response': 40,
      'threat-detection': 40,
      'log-analysis': 45
    }
  },
  {
    id: 'uiux',
    name: 'UI/UX Designer',
    description: 'Designs user experiences, interfaces and product workflows.',
    workspace: 'design',
    skillsCount: 6,
    minimumRequirements: {
      figma: 50,
      'user-research': 40,
      wireframing: 50,
      prototyping: 40,
      'usability-testing': 35,
      'design-systems': 30
    }
  }
];

export const SKILLBASE_19_SKILLS = [
  // Frontend (7 Skills)
  { id: 'html', name: 'HTML / Semantic Markup', category: 'Frontend', baselineMin: 50, aliases: ['html5', 'semantic html', 'dom', 'markup'] },
  { id: 'css', name: 'CSS / Styling Frameworks', category: 'Frontend', baselineMin: 50, aliases: ['css3', 'scss', 'sass', 'tailwind', 'bootstrap', 'flexbox', 'grid'] },
  { id: 'javascript', name: 'JavaScript & Modern ECMAScript', category: 'Frontend', baselineMin: 55, aliases: ['js', 'es6', 'es2020+', 'typescript', 'ts'] },
  { id: 'react', name: 'React Ecosystem', category: 'Frontend', baselineMin: 40, aliases: ['react.js', 'reactjs', 'next.js', 'redux', 'hooks', 'zustand'] },
  { id: 'api', name: 'API Integration & Data Fetching', category: 'Frontend', baselineMin: 30, aliases: ['rest api', 'restful', 'graphql', 'fetch', 'axios', 'endpoints'] },
  { id: 'git', name: 'Version Control & Collaboration', category: 'Frontend', baselineMin: 30, aliases: ['git', 'github', 'gitlab', 'bitbucket', 'pull requests'] },
  { id: 'testing', name: 'Frontend Testing & QA', category: 'Frontend', baselineMin: 25, aliases: ['jest', 'cypress', 'playwright', 'vitest', 'rtl', 'tdd'] },

  // Cybersecurity (6 Skills)
  { id: 'network-security', name: 'Network Security Protocols', category: 'Cybersecurity', baselineMin: 50, aliases: ['firewalls', 'ids', 'ips', 'vpn', 'tcp/ip', 'wireshark'] },
  { id: 'linux', name: 'Linux System Administration', category: 'Cybersecurity', baselineMin: 40, aliases: ['ubuntu', 'debian', 'redhat', 'kali', 'bash', 'shell scripting'] },
  { id: 'siem', name: 'SIEM Platforms & Monitoring', category: 'Cybersecurity', baselineMin: 35, aliases: ['splunk', 'qradar', 'microsoft sentinel', 'elastic siem'] },
  { id: 'incident-response', name: 'Incident Response & Forensics', category: 'Cybersecurity', baselineMin: 40, aliases: ['triage', 'containment', 'forensics', 'root cause analysis'] },
  { id: 'threat-detection', name: 'Threat Detection & Hunting', category: 'Cybersecurity', baselineMin: 40, aliases: ['ioc', 'malware analysis', 'edr', 'crowdstrike', 'mitre att&ck'] },
  { id: 'log-analysis', name: 'Log Analysis & Auditing', category: 'Cybersecurity', baselineMin: 45, aliases: ['syslog', 'event viewer', 'audit logs', 'pcap', 'packet capture'] },

  // UI/UX (6 Skills)
  { id: 'figma', name: 'Figma & UI Tools', category: 'UI/UX', baselineMin: 50, aliases: ['figma', 'figjam', 'sketch', 'adobe xd', 'auto-layout'] },
  { id: 'user-research', name: 'User Research & Discovery', category: 'UI/UX', baselineMin: 40, aliases: ['interviews', 'personas', 'user journeys', 'surveys'] },
  { id: 'wireframing', name: 'Wireframing & Information Arch.', category: 'UI/UX', baselineMin: 50, aliases: ['wireframes', 'lo-fi', 'balsamiq', 'mockups'] },
  { id: 'prototyping', name: 'Interactive Prototyping', category: 'UI/UX', baselineMin: 40, aliases: ['user flows', 'micro-interactions', 'framer', 'invision'] },
  { id: 'usability-testing', name: 'Usability Testing & Validation', category: 'UI/UX', baselineMin: 35, aliases: ['a/b testing', 'heuristic evaluation', 'ux audits'] },
  { id: 'design-systems', name: 'Design Systems & Component Libs', category: 'UI/UX', baselineMin: 30, aliases: ['design tokens', 'atomic design', 'ui kits', 'style guides'] }
];

export const SKILLBASE_COMPANY_JOBS = [
  // FRONTEND ROLES
  {
    id: 'job-001',
    company: 'TechNova Labs',
    companyLogo: '🚀',
    title: 'Junior Frontend Developer',
    roleId: 'frontend',
    location: 'Kochi, India (Hybrid / Remote)',
    experience: '0-2 years',
    salaryRange: '$65,000 - $85,000',
    description: 'Build fast, responsive customer dashboards, implement modular design components, and connect with microservices.',
    requiredSkills: {
      html: 75,
      css: 80,
      javascript: 85,
      react: 78,
      api: 70,
      git: 65,
      testing: 60
    },
    interviewQuestions: [
      { question: 'How do you handle asynchronous race conditions when rapid tab switching triggers duplicate API calls?', type: 'Technical', difficulty: 'Medium', targetSkill: 'api' },
      { question: 'Explain the difference between useMemo and useCallback with a real-world render lifecycle example.', type: 'Technical', difficulty: 'Medium', targetSkill: 'react' },
      { question: 'Walk through your strategy for writing unit tests with mock handlers in Jest or Vitest.', type: 'Architecture', difficulty: 'Hard', targetSkill: 'testing' }
    ]
  },
  {
    id: 'job-002',
    company: 'PixelStack',
    companyLogo: '💻',
    title: 'React Developer',
    roleId: 'frontend',
    location: 'Bengaluru, India',
    experience: '1-3 years',
    salaryRange: '$75,000 - $105,000',
    description: 'Scale client-side performance, build high-throughput transaction flows, and maintain component library integrity.',
    requiredSkills: {
      html: 70,
      css: 78,
      javascript: 92,
      react: 90,
      api: 82,
      git: 75,
      testing: 72
    },
    interviewQuestions: [
      { question: 'How would you debug a subtle memory leak in a long-lived React dashboard containing WebSocket subscriptions?', type: 'Architecture', difficulty: 'Hard', targetSkill: 'react' },
      { question: 'What modern ECMAScript features do you leverage to enforce defensive immutability?', type: 'Technical', difficulty: 'Medium', targetSkill: 'javascript' }
    ]
  },
  {
    id: 'job-003',
    company: 'WebForge Solutions',
    companyLogo: '⚡',
    title: 'Frontend Engineer',
    roleId: 'frontend',
    location: 'Hyderabad, India (Remote)',
    experience: '1-3 years',
    salaryRange: '$80,000 - $110,000',
    description: 'Architect accessible, pixel-perfect web applications with robust unit test coverage and automated CI pipelines.',
    requiredSkills: {
      html: 82,
      css: 85,
      javascript: 88,
      react: 84,
      api: 80,
      git: 78,
      testing: 75
    },
    interviewQuestions: [
      { question: 'How do you ensure semantic HTML and WCAG AA accessibility across custom dropdowns and modal dialogs?', type: 'Technical', difficulty: 'Medium', targetSkill: 'html' }
    ]
  },

  // CYBERSECURITY ROLES
  {
    id: 'job-004',
    company: 'SecureNet Systems',
    companyLogo: '🛡️',
    title: 'Cybersecurity Analyst',
    roleId: 'cybersecurity',
    location: 'Pune, India',
    experience: '0-2 years',
    salaryRange: '$70,000 - $95,000',
    description: 'Monitor enterprise perimeter traffic, triage SIEM detection alerts, and orchestrate rapid threat containment.',
    requiredSkills: {
      'network-security': 78,
      linux: 72,
      siem: 80,
      'incident-response': 75,
      'threat-detection': 82,
      'log-analysis': 78
    },
    interviewQuestions: [
      { question: 'Given a spike in anomalous outbound SMB traffic, walk me through your live packet analysis process in Wireshark.', type: 'Technical', difficulty: 'Hard', targetSkill: 'network-security' },
      { question: 'How do you construct effective correlation rules in Splunk to flag pass-the-hash or lateral movement attempts?', type: 'Architecture', difficulty: 'Hard', targetSkill: 'siem' }
    ]
  },
  {
    id: 'job-005',
    company: 'CyberShield Technologies',
    companyLogo: '🔒',
    title: 'SOC Analyst',
    roleId: 'cybersecurity',
    location: 'Bengaluru, India',
    experience: '1-3 years',
    salaryRange: '$80,000 - $115,000',
    description: 'Investigate multi-stage malware campaigns, audit endpoint logs, and maintain playbooks for zero-day incident response.',
    requiredSkills: {
      'network-security': 85,
      linux: 80,
      siem: 88,
      'incident-response': 84,
      'threat-detection': 90,
      'log-analysis': 86
    },
    interviewQuestions: [
      { question: 'Describe your containment protocol when a critical domain controller exhibits signs of active ransomware execution.', type: 'Behavioral', difficulty: 'Hard', targetSkill: 'incident-response' }
    ]
  },
  {
    id: 'job-006',
    company: 'SentinelWorks',
    companyLogo: '🌐',
    title: 'Security Operations Analyst',
    roleId: 'cybersecurity',
    location: 'Chennai, India (Hybrid)',
    experience: '1-3 years',
    salaryRange: '$75,000 - $108,000',
    description: 'Perform real-time packet inspection, correlate SIEM events across hybrid clouds, and automate forensic evidence preservation.',
    requiredSkills: {
      'network-security': 82,
      linux: 78,
      siem: 84,
      'incident-response': 88,
      'threat-detection': 85,
      'log-analysis': 80
    },
    interviewQuestions: [
      { question: 'How do you extract actionable IOCs from encrypted TLS handshake metadata without full SSL termination?', type: 'Technical', difficulty: 'Hard', targetSkill: 'threat-detection' }
    ]
  },

  // UI/UX ROLES
  {
    id: 'job-007',
    company: 'DesignFlow',
    companyLogo: '🎨',
    title: 'Junior UI/UX Designer',
    roleId: 'uiux',
    location: 'Kochi, India',
    experience: '0-2 years',
    salaryRange: '$60,000 - $80,000',
    description: 'Conduct stakeholder discovery, translate user interview findings into wireframes, and test interactive Figma prototypes.',
    requiredSkills: {
      figma: 78,
      'user-research': 72,
      wireframing: 80,
      prototyping: 76,
      'usability-testing': 68,
      'design-systems': 62
    },
    interviewQuestions: [
      { question: 'How do you structure user interviews to eliminate confirmation bias during early feature discovery?', type: 'Behavioral', difficulty: 'Medium', targetSkill: 'user-research' },
      { question: 'Walk through how you implement Figma auto-layout and component variants to ensure smooth developer handoff.', type: 'Technical', difficulty: 'Medium', targetSkill: 'figma' }
    ]
  },
  {
    id: 'job-008',
    company: 'PixelWorks Studio',
    companyLogo: '✨',
    title: 'Product Designer',
    roleId: 'uiux',
    location: 'Bengaluru, India',
    experience: '1-3 years',
    salaryRange: '$75,000 - $110,000',
    description: 'Own full lifecycle product design, architect cross-platform design token libraries, and run quantitative usability audits.',
    requiredSkills: {
      figma: 90,
      'user-research': 88,
      wireframing: 86,
      prototyping: 92,
      'usability-testing': 82,
      'design-systems': 80
    },
    interviewQuestions: [
      { question: 'How do you scale a design token system across mobile native (iOS/Android) and modern React web applications?', type: 'Architecture', difficulty: 'Hard', targetSkill: 'design-systems' }
    ]
  },
  {
    id: 'job-009',
    company: 'CreativeSphere',
    companyLogo: '💡',
    title: 'UX Designer',
    roleId: 'uiux',
    location: 'Mumbai, India (Remote)',
    experience: '1-3 years',
    salaryRange: '$72,000 - $102,000',
    description: 'Create intuitive information architectures, validate complex onboarding flows, and run heuristic evaluation sprints.',
    requiredSkills: {
      figma: 84,
      'user-research': 90,
      wireframing: 82,
      prototyping: 85,
      'usability-testing': 88,
      'design-systems': 74
    },
    interviewQuestions: [
      { question: 'How do you prioritize usability findings when quantitative analytics diverge from qualitative interview observations?', type: 'Behavioral', difficulty: 'Medium', targetSkill: 'usability-testing' }
    ]
  }
];

export const SKILLBASE_NEWS = [
  { id: 'news-001', title: 'AI startups expand investment in developer productivity tools', category: 'Technology', source: 'Tech Daily', publishedAt: '2026-09-24T09:15:00Z', url: '#' },
  { id: 'news-002', title: 'New cybersecurity research highlights evolving phishing techniques', category: 'Cybersecurity', source: 'Security Journal', publishedAt: '2026-09-24T07:40:00Z', url: '#' },
  { id: 'news-003', title: 'Design teams adopt accessibility-first product workflows', category: 'Design', source: 'Design Weekly', publishedAt: '2026-09-23T16:20:00Z', url: '#' },
  { id: 'news-004', title: 'Cloud platforms announce new tools for web application deployment', category: 'Technology', source: 'Developer News', publishedAt: '2026-09-23T11:10:00Z', url: '#' },
  { id: 'news-005', title: 'Security teams increase focus on real-time log monitoring', category: 'Cybersecurity', source: 'Cyber Update', publishedAt: '2026-09-22T14:30:00Z', url: '#' },
  { id: 'news-006', title: 'AI coding assistants push developers toward stronger code-review skills', category: 'AI & Development', source: 'Developer World', publishedAt: '2026-09-22T10:00:00Z', url: '#' },
  { id: 'news-007', title: 'Web developers focus on performance as modern applications become more interactive', category: 'Web Development', source: 'Frontend Today', publishedAt: '2026-09-21T13:30:00Z', url: '#' },
  { id: 'news-008', title: 'Browser security updates target newly discovered web vulnerabilities', category: 'Cybersecurity', source: 'Security Journal', publishedAt: '2026-09-23T08:25:00Z', url: '#' },
  { id: 'news-009', title: 'Organizations increase adoption of continuous security monitoring', category: 'Cybersecurity', source: 'Cyber Update', publishedAt: '2026-09-21T09:45:00Z', url: '#' },
  { id: 'news-010', title: 'Product teams use AI-assisted research to identify user experience issues', category: 'UI/UX & AI', source: 'Design Weekly', publishedAt: '2026-09-20T15:10:00Z', url: '#' },
  { id: 'news-011', title: 'Accessibility testing becomes a larger part of modern product development', category: 'UI/UX', source: 'UX Journal', publishedAt: '2026-09-19T12:20:00Z', url: '#' },
  { id: 'news-012', title: 'Cloud-native teams expand use of automated deployment pipelines', category: 'Cloud & DevOps', source: 'Developer News', publishedAt: '2026-09-18T11:35:00Z', url: '#' },
  { id: 'news-013', title: 'API security becomes a growing priority for connected applications', category: 'Web Security', source: 'Tech Security Daily', publishedAt: '2026-09-17T16:05:00Z', url: '#' },
  { id: 'news-014', title: 'Design systems help product teams maintain consistency across platforms', category: 'UI/UX', source: 'Product Design News', publishedAt: '2026-09-16T14:15:00Z', url: '#' },
  { id: 'news-015', title: 'Security operations teams experiment with AI-assisted alert triage', category: 'Cybersecurity & AI', source: 'SOC News', publishedAt: '2026-09-15T10:40:00Z', url: '#' },
  { id: 'news-016', title: 'Frontend teams adopt stronger testing practices for complex web interfaces', category: 'Web Development', source: 'Frontend Today', publishedAt: '2026-09-14T09:50:00Z', url: '#' },
  { id: 'news-017', title: 'New developer tools focus on simplifying local-to-cloud application workflows', category: 'Developer Tools', source: 'Tech Daily', publishedAt: '2026-09-13T13:00:00Z', url: '#' },
  { id: 'news-018', title: 'Security researchers examine risks created by autonomous AI agents', category: 'AI Security', source: 'Security Journal', publishedAt: '2026-09-12T08:30:00Z', url: '#' },
  { id: 'news-019', title: 'Product designers explore new workflows for rapid prototype validation', category: 'UI/UX', source: 'Design Weekly', publishedAt: '2026-09-11T15:45:00Z', url: '#' },
  { id: 'news-020', title: 'Companies increase attention on secure software development practices', category: 'Software Security', source: 'Developer Security News', publishedAt: '2026-09-10T11:25:00Z', url: '#' }
];

// =========================================================================
// MATHEMATICAL & LOGICAL FORMULATIONS (Exact SkillBase Dual-Gate Pipeline)
// =========================================================================

/**
 * Normalizes candidate skills array / matrix into the standardized 19-skill vector (0-100).
 */
export function extract19SkillVector(skillsMatrix = []) {
  const vector = {};

  SKILLBASE_19_SKILLS.forEach(skillDef => {
    // Check direct ID or alias matches
    const match = skillsMatrix.find(s => {
      const sName = (s.skill || s.name || s.id || '').toLowerCase();
      if (sName === skillDef.id.toLowerCase() || sName.includes(skillDef.name.toLowerCase())) return true;
      return skillDef.aliases.some(alias => sName.includes(alias.toLowerCase()));
    });

    if (match) {
      vector[skillDef.id] = typeof match.current === 'number' ? match.current : (match.score || match.candidateEvidencePercent || skillDef.baselineMin);
    } else {
      // Default to baseline minimum estimate if grounded in target domain
      vector[skillDef.id] = 0;
    }
  });

  return vector;
}

/**
 * GATE 1: Role Baseline Suitability Score
 * RoleScore(R) = (1 / |R|) * sum_{s in R} min(C_s / M_s, 1.0) * 100
 * MeetsAll(R) = forall s in R: C_s >= M_s
 * BestFitRole = argmax_R (MeetsAll(R) * 1000 + RoleScore(R))
 */
export function evaluateCandidateSuitability(candidateVector) {
  const evaluations = {};
  let bestFitRole = 'frontend';
  let highestCompoundScore = -1;

  SKILLBASE_ROLES.forEach(role => {
    const minReqs = role.minimumRequirements;
    const skillKeys = Object.keys(minReqs);
    let sumRatio = 0;
    let meetsAll = true;
    const skillBreakdown = {};

    skillKeys.forEach(key => {
      const candVal = candidateVector[key] || 0;
      const reqVal = minReqs[key];
      const ratio = Math.min(candVal / reqVal, 1.0);
      sumRatio += ratio;
      const met = candVal >= reqVal;
      if (!met) meetsAll = false;

      skillBreakdown[key] = {
        candidateScore: candVal,
        requiredMin: reqVal,
        ratio: Math.round(ratio * 100),
        met
      };
    });

    const roleScore = Math.round((sumRatio / skillKeys.length) * 100);
    const compoundScore = (meetsAll ? 1000 : 0) + roleScore;

    if (compoundScore > highestCompoundScore) {
      highestCompoundScore = compoundScore;
      bestFitRole = role.id;
    }

    evaluations[role.id] = {
      roleId: role.id,
      roleName: role.name,
      roleScore,
      meetsAll,
      compoundScore,
      skillBreakdown
    };
  });

  return {
    bestFitRole,
    evaluations,
    bestFitEvaluation: evaluations[bestFitRole]
  };
}

/**
 * GATE 2: Company Job Criteria Match Score
 * JobCriteriaScore(J) = (1 / |J|) * sum_{s in J} min(C_s / q_s, 1.0) * 100
 * AllowApplication(J) = JobCriteriaScore(J) >= 75%
 */
export function evaluateCompanyJobsForCandidate(candidateVector, targetRoleId = null) {
  // Merge static jobs with dynamic company-posted vacancies
  let dynamicJobs = [];
  try {
    const saved = localStorage.getItem('dayone_company_jobs');
    if (saved) dynamicJobs = JSON.parse(saved);
  } catch (e) {}

  const allJobs = [...dynamicJobs, ...SKILLBASE_COMPANY_JOBS];

  return allJobs.map(job => {
    const reqs = job.requiredSkills || {};
    const skillKeys = Object.keys(reqs);
    let sumRatio = 0;
    const skillGaps = [];
    const matchedSkills = [];

    skillKeys.forEach(key => {
      const candVal = candidateVector[key] || 0;
      const reqVal = reqs[key];
      const ratio = Math.min(candVal / reqVal, 1.0);
      sumRatio += ratio;

      const skillDef = SKILLBASE_19_SKILLS.find(s => s.id === key);
      const skillName = skillDef ? skillDef.name : key;

      if (candVal >= reqVal) {
        matchedSkills.push({
          skillKey: key,
          skillName,
          candidateScore: candVal,
          requiredScore: reqVal
        });
      } else {
        const gapSize = reqVal - candVal;
        skillGaps.push({
          skillKey: key,
          skillName,
          candidateScore: candVal,
          requiredScore: reqVal,
          gapSize,
          priority: gapSize > 25 ? 'Critical' : (gapSize > 12 ? 'Important' : 'Minor')
        });
      }
    });

    const jobCriteriaScore = Math.round((sumRatio / skillKeys.length) * 100);

    // Priority Tier Calculation based on candidate's current status
    let priorityRank = 3;
    let priorityTier = 'growth_fit';
    let priorityLabel = 'Priority 3: Good Match';
    let priorityBadge = '🚀 Good Fit';

    if (jobCriteriaScore >= 80) {
      priorityRank = 1;
      priorityTier = 'top_fit';
      priorityLabel = 'Priority 1: Top Fit';
      priorityBadge = '🌟 Top Recommendation';
    } else if (jobCriteriaScore >= 65) {
      priorityRank = 2;
      priorityTier = 'strong_fit';
      priorityLabel = 'Priority 2: Strong Match';
      priorityBadge = '⭐ Strong Fit';
    } else if (jobCriteriaScore < 50) {
      priorityRank = 4;
      priorityTier = 'stretch_role';
      priorityLabel = 'Priority 4: Stretch Role';
      priorityBadge = '💡 Stretch Role';
    }

    return {
      ...job,
      jobCriteriaScore,
      priorityRank,
      priorityTier,
      priorityLabel,
      priorityBadge,
      criteriaReached: true,
      isUnlocked: true, // No locking - all jobs are open and prioritized
      skillGaps: skillGaps.sort((a, b) => b.gapSize - a.gapSize),
      matchedSkills,
      totalSkillsRequired: skillKeys.length,
      matchedSkillsCount: matchedSkills.length
    };
  }).sort((a, b) => {
    // Preferred role first, then priority rank (1 before 2 before 3), then higher criteria score
    const aMatchRole = targetRoleId && (a.roleId === targetRoleId || targetRoleId.includes(a.roleId));
    const bMatchRole = targetRoleId && (b.roleId === targetRoleId || targetRoleId.includes(b.roleId));
    if (aMatchRole && !bMatchRole) return -1;
    if (!aMatchRole && bMatchRole) return 1;
    if (a.priorityRank !== b.priorityRank) return a.priorityRank - b.priorityRank;
    return b.jobCriteriaScore - a.jobCriteriaScore;
  });
}
