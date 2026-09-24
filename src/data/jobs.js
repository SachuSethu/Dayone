// src/data/jobs.js
// Career roles and real-world job market requirements aligned with DayOne.ai credentials.

export const JOB_PROFILES = {
  frontend: [
    {
      id: 'job-fe-1',
      title: 'Senior Frontend Engineer',
      company: 'Stripe / Fintech Platforms',
      salaryRange: '$145,000 - $190,000',
      location: 'Remote / San Francisco',
      keyRequirements: [
        'Resilient payment UI and async race-condition prevention',
        'State architecture in React 18+ with strict TypeScript',
        'Production debugging and synthetic latency handling'
      ],
      dayoneSkillsTested: ['api_integration', 'testing_qa', 'react_state']
    },
    {
      id: 'job-fe-2',
      title: 'Frontend Platform Engineer',
      company: 'Datadog / Observability UI',
      salaryRange: '$150,000 - $205,000',
      location: 'New York / Remote',
      keyRequirements: [
        'High-throughput web telemetry dashboards',
        'Client-side performance and Core Web Vitals optimization',
        'Robust automated unit and integration test suites'
      ],
      dayoneSkillsTested: ['performance_opt', 'testing_qa', 'react_state']
    }
  ],

  cybersecurity: [
    {
      id: 'job-sec-1',
      title: 'SOC Incident Responder (Tier 2/3)',
      company: 'CrowdStrike / Falcon Complete',
      salaryRange: '$120,000 - $165,000',
      location: 'Remote / Austin, TX',
      keyRequirements: [
        'Live threat hunting and credential stuffing mitigation',
        'SIEM query creation (Splunk, ELK, KQL)',
        'Rapid network containment and iptables/WAF orchestration'
      ],
      dayoneSkillsTested: ['siem_log_analysis', 'threat_containment', 'incident_triage']
    },
    {
      id: 'job-sec-2',
      title: 'Detection & Response Engineer',
      company: 'Cloudflare / Security Cloud',
      salaryRange: '$135,000 - $185,000',
      location: 'San Francisco / Remote',
      keyRequirements: [
        'DDoS and botnet mitigation at edge gateways',
        'PCAP and deep packet inspection',
        'MITRE ATT&CK framework mapping & forensic post-mortems'
      ],
      dayoneSkillsTested: ['network_traffic', 'threat_containment', 'threat_intelligence']
    }
  ],

  ui_ux: [
    {
      id: 'job-ux-1',
      title: 'Senior Product Designer (Growth & Funnels)',
      company: 'Figma / Creative Cloud',
      salaryRange: '$140,000 - $180,000',
      location: 'San Francisco / Remote',
      keyRequirements: [
        'Conversion rate optimization and checkout journey redesign',
        'WCAG 2.1 AA accessibility auditing and design system token scaling',
        'Synthesizing customer interviews into high-converting prototypes'
      ],
      dayoneSkillsTested: ['interaction_design', 'user_research', 'usability_heuristics']
    },
    {
      id: 'job-ux-2',
      title: 'Lead UX Architect (Enterprise SaaS)',
      company: 'Linear / Modern Dev Tools',
      salaryRange: '$150,000 - $195,000',
      location: 'Remote Global',
      keyRequirements: [
        'Information architecture and cognitive load reduction',
        'Defending design decisions with empirical usability metrics',
        'Micro-interactions and rapid prototyping'
      ],
      dayoneSkillsTested: ['information_arch', 'stakeholder_alignment', 'design_systems']
    }
  ]
};
