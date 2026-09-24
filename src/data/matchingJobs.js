// src/data/matchingJobs.js
// Curated dataset of market statistics and employer job vacancies
// dynamically matched against candidate domain, verified skills, and DayOne readiness score.

export const MARKET_STATISTICS = {
  'frontend-developer': {
    domainTitle: 'Frontend & UI Engineering',
    avgSalary: '$135,000 - $175,000',
    salaryMedian: 152000,
    activeVacanciesCount: '2,840+',
    hiringDemand: 'High (Immediate Hiring)',
    growthRateYearOverYear: '+18.4%',
    topDemandedSkills: ['React 19 / Modern Hooks', 'State Architecture', 'Web Performance Optimization', 'TypeScript', 'Automated E2E Testing'],
    topEmployers: ['Stripe', 'Vercel', 'Linear', 'Airbnb', 'Figma', 'DoorDash']
  },
  'backend-developer': {
    domainTitle: 'Backend & Distributed Systems',
    avgSalary: '$145,000 - $190,000',
    salaryMedian: 168000,
    activeVacanciesCount: '3,120+',
    hiringDemand: 'Very High (Critical Shortage)',
    growthRateYearOverYear: '+22.1%',
    topDemandedSkills: ['Distributed System Design', 'High-Concurrency PostgreSQL', 'Redis Caching & Queues', 'Docker & Kubernetes', 'Defensive API Security'],
    topEmployers: ['Datadog', 'Coinbase', 'AWS', 'Twilio', 'Cloudflare', 'Snowflake']
  },
  'full-stack-developer': {
    domainTitle: 'Full-Stack Software Engineering',
    avgSalary: '$140,000 - $185,000',
    salaryMedian: 160000,
    activeVacanciesCount: '3,900+',
    hiringDemand: 'Very High',
    growthRateYearOverYear: '+24.5%',
    topDemandedSkills: ['Full-Stack React & Node', 'Relational & NoSQL Modeling', 'CI/CD Pipelines', 'GraphQL / REST APIs', 'Production Debugging'],
    topEmployers: ['Shopify', 'GitHub', 'Notion', 'Brex', 'Ramp', 'Atlassian']
  },
  'ui-ux-designer': {
    domainTitle: 'Product Design & Design Systems',
    avgSalary: '$120,000 - $160,000',
    salaryMedian: 138000,
    activeVacanciesCount: '1,750+',
    hiringDemand: 'Steady',
    growthRateYearOverYear: '+14.2%',
    topDemandedSkills: ['Figma Design Systems', 'High-Fidelity Interactive Prototyping', 'WCAG AAA Accessibility', 'User Research & Journey Mapping', 'Design-to-Code Handoff'],
    topEmployers: ['Spotify', 'Apple', 'Canva', 'Pinterest', 'Miro', 'Duolingo']
  },
  'cybersecurity-analyst': {
    domainTitle: 'Security Operations & Incident Response',
    avgSalary: '$130,000 - $175,000',
    salaryMedian: 150000,
    activeVacanciesCount: '2,300+',
    hiringDemand: 'Urgent (Critical Demand)',
    growthRateYearOverYear: '+28.0%',
    topDemandedSkills: ['SIEM & Splunk / Elastic', 'Network Forensics & Wireshark', 'OWASP Threat Mitigation', 'Zero-Trust Architecture', 'Incident Containment'],
    topEmployers: ['CrowdStrike', 'Palo Alto Networks', 'Mandiant', 'Microsoft Security', 'Cloudflare', 'Palantir']
  },
  'data-analyst': {
    domainTitle: 'Data Analytics & Business Intelligence',
    avgSalary: '$115,000 - $155,000',
    salaryMedian: 132000,
    activeVacanciesCount: '2,600+',
    hiringDemand: 'High',
    growthRateYearOverYear: '+19.8%',
    topDemandedSkills: ['Advanced SQL Analytics', 'Python (Pandas / NumPy / Scikit)', 'Tableau & Power BI Dashboards', 'A/B Testing & Statistical Modeling', 'ETL Data Pipelines'],
    topEmployers: ['Meta', 'Uber', 'Netflix', 'Amazon', 'Capital One', 'Spotify']
  }
};

export const JOB_VACANCIES = [
  // FRONTEND
  {
    id: 'job-fe-01',
    roleId: 'frontend-developer',
    title: 'Senior Frontend Engineer (Core Platform)',
    company: 'Stripe',
    companyLogo: '💳',
    location: 'Remote (US/EU/Global)',
    employmentType: 'Full-time',
    salaryRange: '$150,000 - $185,000',
    minReadinessRequired: 70,
    keySkillsRequired: ['React', 'State Management', 'Web Performance', 'TypeScript', 'Defensive Architecture'],
    description: 'Lead checkout UI reliability, asynchronous resilience, and micro-frontend state synchronization for billions of daily transactions.',
    postedDaysAgo: 2,
    benefits: ['DayOne Fast-Track Accepted', 'Flexible Hours', 'Home Office Stipend', 'Health & Equity']
  },
  {
    id: 'job-fe-02',
    roleId: 'frontend-developer',
    title: 'Frontend Performance & Systems Engineer',
    company: 'Vercel',
    companyLogo: '▲',
    location: 'Hybrid / Remote',
    employmentType: 'Full-time',
    salaryRange: '$140,000 - $175,000',
    minReadinessRequired: 65,
    keySkillsRequired: ['React', 'Next.js', 'Web Vitals', 'Async Error Handling', 'CSS Architecture'],
    description: 'Optimize high-throughput web apps, minimize client-side bundle size, and build rock-solid crash recovery patterns.',
    postedDaysAgo: 3,
    benefits: ['DayOne Fast-Track Accepted', 'Unlimited PTO', 'Full Medical', '401k Matching']
  },
  {
    id: 'job-fe-03',
    roleId: 'frontend-developer',
    title: 'Product UI Engineer (Interactive Apps)',
    company: 'Linear',
    companyLogo: '⚡',
    location: 'Remote',
    employmentType: 'Full-time',
    salaryRange: '$145,000 - $180,000',
    minReadinessRequired: 60,
    keySkillsRequired: ['React', 'Component Architecture', 'Accessibility (a11y)', 'State Management'],
    description: 'Craft ultra-fast, keyboard-driven workplace productivity software with zero-latency optimistic updates.',
    postedDaysAgo: 1,
    benefits: ['Verified DayOne Credential Preference', 'Co-working Stipend', 'Annual Retreats']
  },

  // BACKEND
  {
    id: 'job-be-01',
    roleId: 'backend-developer',
    title: 'Senior Backend Engineer (Distributed Systems)',
    company: 'Datadog',
    companyLogo: '🐶',
    location: 'Remote / NYC',
    employmentType: 'Full-time',
    salaryRange: '$160,000 - $200,000',
    minReadinessRequired: 72,
    keySkillsRequired: ['Distributed Systems', 'PostgreSQL', 'Redis Caching', 'Docker', 'System Security'],
    description: 'Scale distributed ingestion pipelines processing petabytes of telemetry per minute with sub-millisecond query latency.',
    postedDaysAgo: 2,
    benefits: ['DayOne Simulation Fast-Track', 'Comprehensive Healthcare', 'Stock Options']
  },
  {
    id: 'job-be-02',
    roleId: 'backend-developer',
    title: 'Cloud Infrastructure & API Engineer',
    company: 'Cloudflare',
    companyLogo: '☁️',
    location: 'Remote / SF',
    employmentType: 'Full-time',
    salaryRange: '$150,000 - $190,000',
    minReadinessRequired: 65,
    keySkillsRequired: ['REST APIs', 'PostgreSQL', 'System Security', 'Docker'],
    description: 'Build edge workers, resilient API gateways, and multi-region database failover mechanisms.',
    postedDaysAgo: 4,
    benefits: ['DayOne Fast-Track Accepted', 'Parental Leave', 'Learning Stipend']
  },

  // FULL STACK
  {
    id: 'job-fs-01',
    roleId: 'full-stack-developer',
    title: 'Full-Stack Product Engineer',
    company: 'Shopify',
    companyLogo: '🛍️',
    location: 'Remote',
    employmentType: 'Full-time',
    salaryRange: '$145,000 - $185,000',
    minReadinessRequired: 68,
    keySkillsRequired: ['Full-Stack Architecture', 'React', 'GraphQL / REST', 'DevOps / CI/CD', 'Database Design'],
    description: 'Build merchant-facing commerce engines and high-volume checkout systems with end-to-end type safety.',
    postedDaysAgo: 2,
    benefits: ['DayOne Verified Profile Skip First Round', 'Remote-First Culture', 'Home Allowance']
  },
  {
    id: 'job-fs-02',
    roleId: 'full-stack-developer',
    title: 'Full-Stack Software Engineer (Core App)',
    company: 'Notion',
    companyLogo: '📝',
    location: 'Hybrid / SF / Remote',
    employmentType: 'Full-time',
    salaryRange: '$150,000 - $190,000',
    minReadinessRequired: 70,
    keySkillsRequired: ['React', 'System Design', 'PostgreSQL', 'GraphQL', 'Monorepo Tooling'],
    description: 'Build real-time collaborative workspace blocks, offline-first sync engines, and robust data persistence layers.',
    postedDaysAgo: 1,
    benefits: ['DayOne Fast-Track Accepted', 'Catered Meals', 'Top Tier Health Plans']
  },

  // UI/UX DESIGNER
  {
    id: 'job-ux-01',
    roleId: 'ui-ux-designer',
    title: 'Senior Product Designer (Design Systems)',
    company: 'Spotify',
    companyLogo: '🎧',
    location: 'Hybrid / NYC / Remote',
    employmentType: 'Full-time',
    salaryRange: '$130,000 - $165,000',
    minReadinessRequired: 65,
    keySkillsRequired: ['Design Systems', 'Figma', 'Interactive Prototyping', 'WCAG Accessibility', 'User Research'],
    description: 'Architect cross-platform design token architecture and accessible interaction components used by 600M+ listeners.',
    postedDaysAgo: 3,
    benefits: ['DayOne Verified Portfolio Bypass', 'Global Mobility', 'Wellness Fund']
  },
  {
    id: 'job-ux-02',
    roleId: 'ui-ux-designer',
    title: 'UI/UX Interaction Designer',
    company: 'Figma',
    companyLogo: '🎨',
    location: 'Remote / SF',
    employmentType: 'Full-time',
    salaryRange: '$135,000 - $170,000',
    minReadinessRequired: 70,
    keySkillsRequired: ['Interaction Design', 'Figma Prototyping', 'User Research', 'Design Systems'],
    description: 'Shape next-generation creative tooling and collaborative canvas workflows with crisp micro-interactions.',
    postedDaysAgo: 2,
    benefits: ['DayOne Fast-Track Accepted', 'Generous Equity', 'Equipment Fund']
  },

  // CYBERSECURITY
  {
    id: 'job-cy-01',
    roleId: 'cybersecurity-analyst',
    title: 'Senior SOC & Incident Response Analyst',
    company: 'CrowdStrike',
    companyLogo: '🛡️',
    location: 'Remote / Austin, TX',
    employmentType: 'Full-time',
    salaryRange: '$140,000 - $180,000',
    minReadinessRequired: 68,
    keySkillsRequired: ['SIEM & Log Analysis', 'Threat Hunting', 'Incident Response', 'Network Forensics', 'OWASP'],
    description: 'Investigate advanced persistent threats (APTs), quarantine compromised network segments, and orchestrate real-time incident containment.',
    postedDaysAgo: 1,
    benefits: ['DayOne Provenance Fast-Track', 'Security Clearance Sponsorship', 'Top-Band Equity']
  },
  {
    id: 'job-cy-02',
    roleId: 'cybersecurity-analyst',
    title: 'Detection & Threat Response Engineer',
    company: 'Palo Alto Networks',
    companyLogo: '🔒',
    location: 'Remote / Santa Clara',
    employmentType: 'Full-time',
    salaryRange: '$135,000 - $175,000',
    minReadinessRequired: 65,
    keySkillsRequired: ['Network Security', 'Wireshark', 'SIEM', 'Incident Response'],
    description: 'Author custom detection rules, triage security telemetry across hybrid clouds, and automate threat mitigation workflows.',
    postedDaysAgo: 4,
    benefits: ['DayOne Fast-Track Accepted', 'Continuous Training Allowance', 'Full Medical']
  },

  // DATA ANALYST
  {
    id: 'job-da-01',
    roleId: 'data-analyst',
    title: 'Senior Product Data Analyst',
    company: 'Netflix',
    companyLogo: '🎬',
    location: 'Remote / Los Gatos',
    employmentType: 'Full-time',
    salaryRange: '$130,000 - $170,000',
    minReadinessRequired: 68,
    keySkillsRequired: ['SQL Data Wrangling', 'Python (EDA)', 'Tableau / BI', 'Statistical Modeling', 'A/B Testing'],
    description: 'Uncover streaming engagement dynamics, design complex multivariate experiments, and deliver executive-grade behavioral models.',
    postedDaysAgo: 2,
    benefits: ['DayOne Benchmark Accepted', 'Top of Market Compensation', 'Full Benefits']
  },
  {
    id: 'job-da-02',
    roleId: 'data-analyst',
    title: 'Analytics Engineer & BI Specialist',
    company: 'Uber',
    companyLogo: '🚗',
    location: 'Remote / SF',
    employmentType: 'Full-time',
    salaryRange: '$125,000 - $160,000',
    minReadinessRequired: 62,
    keySkillsRequired: ['SQL', 'Data Modeling', 'Tableau', 'Python', 'Predictive Analytics'],
    description: 'Build reliable metric pipelines for marketplace liquidity, rider-driver matching efficiency, and automated BI reporting.',
    postedDaysAgo: 3,
    benefits: ['DayOne Fast-Track Accepted', 'Monthly Uber Credits', 'Equity Grant']
  }
];

/**
 * Calculate dynamic candidate match score for a job vacancy based on
 * readiness score, matched skills in candidate's matrix, and experience level.
 */
export function calculateJobMatch({ job, candidateReadinessScore = 50, candidateSkills = [] }) {
  // 1. Readiness Match (weight: 45%)
  const readinessRatio = Math.min(1.2, (candidateReadinessScore / (job.minReadinessRequired || 65)));
  const readinessScore = Math.min(100, Math.round(readinessRatio * 85));

  // 2. Skills Match (weight: 40%)
  const required = job.keySkillsRequired || [];
  let matchedCount = 0;
  let verifiedCount = 0;

  required.forEach(req => {
    const candidateSkill = candidateSkills.find(s => 
      s.skill.toLowerCase().includes(req.toLowerCase()) || 
      req.toLowerCase().includes(s.skill.toLowerCase())
    );

    if (candidateSkill) {
      matchedCount++;
      if (candidateSkill.status === 'verified_by_simulation' || candidateSkill.current >= 75) {
        verifiedCount++;
      }
    }
  });

  const skillsRatio = required.length ? (matchedCount / required.length) : 0.8;
  const verifiedBonus = required.length ? (verifiedCount / required.length) * 15 : 10;
  const skillsScore = Math.min(100, Math.round(skillsRatio * 85 + verifiedBonus));

  // 3. Combined Match Percentage
  const matchPercentage = Math.min(99, Math.max(45, Math.round((readinessScore * 0.5) + (skillsScore * 0.5))));

  return {
    matchPercentage,
    readinessRatio,
    matchedCount,
    totalRequired: required.length,
    verifiedCount,
    isHighlyRecommended: matchPercentage >= 80,
    isEligible: candidateReadinessScore >= (job.minReadinessRequired - 15)
  };
}

/**
 * Filter vacancies matching a given role and sort by match percentage
 */
export function getVacanciesForRole(roleId = 'frontend-developer', readinessScore = 50, candidateSkills = []) {
  // Normalize role ID (handle 'frontend' vs 'frontend-developer')
  const normalizedId = roleId.includes('developer') || roleId.includes('analyst') || roleId.includes('designer')
    ? roleId
    : `${roleId}-developer`;

  const matchingJobs = JOB_VACANCIES.filter(j => 
    j.roleId === normalizedId || 
    j.roleId.replace('-developer', '') === roleId ||
    roleId.includes(j.roleId.split('-')[0])
  );

  // If none matched, return all with fallback
  const list = matchingJobs.length > 0 ? matchingJobs : JOB_VACANCIES.slice(0, 4);

  return list.map(job => {
    const match = calculateJobMatch({
      job,
      candidateReadinessScore: readinessScore,
      candidateSkills
    });
    return {
      ...job,
      match
    };
  }).sort((a, b) => b.match.matchPercentage - a.match.matchPercentage);
}
