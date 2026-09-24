// src/lib/roles/roles.js
// Prototype role requirement dataset containing target role profiles, importance weightings, and workplace contexts.

export const ROLES_DATASET = [
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    shortName: 'Frontend',
    icon: 'Code2',
    department: 'Web Engineering & Core Platform',
    description: 'Build responsive, accessible user interfaces, manage complex async client state, and optimize Core Web Vitals.',
    marketDemandHeadline: 'High demand for React 18+, TypeScript, and resilient client-side state handling.',
    skills: [
      { name: 'React', importance: 0.92, category: 'Core Engineering', description: 'Hooks, component lifecycle, Context, and state lifting.' },
      { name: 'JavaScript', importance: 0.89, category: 'Core Engineering', description: 'ES2024+, async/await, closures, and DOM event loops.' },
      { name: 'TypeScript', importance: 0.81, category: 'Type Safety', description: 'Generics, union types, strict typing, and utility types.' },
      { name: 'REST APIs', importance: 0.74, category: 'Network Comms', description: 'Async data fetching, retry strategies, and error boundaries.' },
      { name: 'Testing', importance: 0.69, category: 'Quality Assurance', description: 'Unit testing with Jest/Vitest, React Testing Library, and mocking.' },
      { name: 'Git', importance: 0.67, category: 'Collaboration', description: 'Branch management, atomic pull requests, and merge conflict resolution.' },
      { name: 'System Design', importance: 0.51, category: 'Architecture', description: 'Frontend micro-frontends, caching, and state synchronization.' }
    ],
    workplaceTasks: [
      'Resolve race condition in payment checkout pipeline',
      'Optimize bundle size and reduce render thrashing in catalog view',
      'Build reusable accessible design system modal component'
    ]
  },

  {
    id: 'backend-developer',
    name: 'Backend Developer',
    shortName: 'Backend',
    icon: 'Server',
    department: 'Distributed Systems & Cloud Services',
    description: 'Architect scalable microservices, optimize database queries, implement message queues, and enforce resilient APIs.',
    marketDemandHeadline: 'Strong enterprise requirement for Node.js/Go, SQL optimization, and distributed idempotency.',
    skills: [
      { name: 'Node.js', importance: 0.90, category: 'Runtime & Services', description: 'Event-driven servers, Express/Nest, and stream processing.' },
      { name: 'REST APIs', importance: 0.88, category: 'Architecture', description: 'API contract design, rate-limiting, and OAuth2 security.' },
      { name: 'PostgreSQL', importance: 0.84, category: 'Databases', description: 'Indexing, query optimization, ACID transactions, and ORMs.' },
      { name: 'System Design', importance: 0.78, category: 'Architecture', description: 'Horizontal scaling, caching with Redis, and load balancing.' },
      { name: 'Testing', importance: 0.72, category: 'Quality Assurance', description: 'Integration tests, database mocking, and load testing.' },
      { name: 'Docker', importance: 0.68, category: 'DevOps', description: 'Multi-stage builds, container networking, and deployment.' },
      { name: 'Message Queues', importance: 0.58, category: 'Distributed Systems', description: 'RabbitMQ/Kafka asynchronous event streaming.' }
    ],
    workplaceTasks: [
      'Remediate database connection pool exhaustion under sudden traffic spike',
      'Implement idempotent webhook processor for payment events',
      'Migrate monolithic auth endpoint to Redis-backed token cache'
    ]
  },

  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    shortName: 'Cybersecurity',
    icon: 'ShieldAlert',
    department: 'Security Operations Center (SOC)',
    level: 'Tier 2 Incident Response',
    description: 'Monitor SIEM telemetry, investigate threat vectors, execute containment procedures, and author post-incident forensic briefs.',
    marketDemandHeadline: 'Urgent demand for log correlation, credential stuffing mitigation, and network forensics.',
    skills: [
      { name: 'SIEM Log Analysis', importance: 0.92, category: 'Threat Detection', description: 'Querying Splunk/ELK, correlation rules, and anomaly detection.' },
      { name: 'Incident Triage', importance: 0.89, category: 'SecOps', description: 'Classifying severity (P1-P4), containment checklists, and SLAs.' },
      { name: 'Network Forensics', importance: 0.82, category: 'Detection', description: 'PCAP triage, Wireshark, DNS tunneling, and packet flow inspection.' },
      { name: 'Threat Containment', importance: 0.80, category: 'SecOps', description: 'iptables firewall drops, WAF rules, and token revoking.' },
      { name: 'MITRE ATT&CK', importance: 0.75, category: 'Threat Intel', description: 'Tactics, techniques, and adversary profiling.' },
      { name: 'Compliance & Hygiene', importance: 0.65, category: 'Governance', description: 'Chain of custody, post-incident reviews, and audit trails.' }
    ],
    workplaceTasks: [
      'Mitigate high-velocity distributed credential stuffing on authentication gateway',
      'Investigate anomalous DNS TXT record tunneling for outbound exfiltration',
      'Coordinate post-breach firewall rules and brief incident commander'
    ]
  },

  {
    id: 'uiux-designer',
    name: 'UI/UX Designer',
    shortName: 'UI/UX Design',
    icon: 'Palette',
    department: 'Product Experience & Design Systems',
    description: 'Transform user research and usability friction into accessible, high-converting prototypes and scalable design systems.',
    marketDemandHeadline: 'Focus on WCAG 2.1 AA accessibility, mobile conversion funnels, and Figma tokens.',
    skills: [
      { name: 'Figma & Prototyping', importance: 0.93, category: 'Visual Craft', description: 'Auto-layout, responsive constraints, component sets, and interactive states.' },
      { name: 'User Research', importance: 0.88, category: 'Discovery', description: 'Synthesizing qualitative interviews, affinity mapping, and user friction.' },
      { name: 'Design Systems', importance: 0.85, category: 'System Architecture', description: 'Atomic tokens, typography scales, spacing grids, and developer handoff.' },
      { name: 'Accessibility (WCAG)', importance: 0.82, category: 'Standards', description: 'Color contrast compliance (4.5:1), screen-reader semantics, and tap targets.' },
      { name: 'Interaction Design', importance: 0.78, category: 'UX Craft', description: 'Micro-interactions, checkout funnels, and cognitive load reduction.' },
      { name: 'Information Architecture', importance: 0.68, category: 'Strategy', description: 'Card sorting, site tree taxonomy, and navigation models.' }
    ],
    workplaceTasks: [
      'Redesign mobile checkout flow to eliminate 38% cart abandonment',
      'Audit enterprise design system for WCAG 2.1 Level AA color contrast compliance',
      'Synthesize 40 customer usability interviews into actionable affinity maps'
    ]
  },

  {
    id: 'data-analyst',
    name: 'Data Analyst',
    shortName: 'Data Analytics',
    icon: 'BarChart2',
    department: 'Business Intelligence & Data Science',
    description: 'Extract business insights from relational warehouses, construct executive dashboards, and formulate metric hypotheses.',
    marketDemandHeadline: 'High market need for advanced SQL, cohort retention models, and executive reporting.',
    skills: [
      { name: 'SQL', importance: 0.94, category: 'Querying', description: 'Window functions, CTEs, complex joins, and query optimization.' },
      { name: 'Data Visualization', importance: 0.87, category: 'Reporting', description: 'Tableau/PowerBI/Looker, dashboard ergonomics, and storytelling.' },
      { name: 'Python (Pandas)', importance: 0.79, category: 'Analysis', description: 'Data cleansing, exploratory analysis, and numerical aggregations.' },
      { name: 'Statistical Inference', importance: 0.74, category: 'Statistics', description: 'A/B test significance, hypothesis testing, and variance analysis.' },
      { name: 'Data Modeling', importance: 0.70, category: 'Warehousing', description: 'Star schemas, dimension tables, and metric definitions.' },
      { name: 'Business Communication', importance: 0.65, category: 'Stakeholder Alignment', description: 'Translating technical queries into actionable executive decisions.' }
    ],
    workplaceTasks: [
      'Investigate discrepancy in monthly recurring revenue (MRR) recognition',
      'Construct executive dashboard for customer churn cohort analysis',
      'Analyze A/B test telemetry for new signup funnel variant'
    ]
  }
];

export function getRoleById(roleId) {
  return ROLES_DATASET.find(r => r.id === roleId || r.name.toLowerCase() === roleId?.toLowerCase()) || ROLES_DATASET[0];
}
