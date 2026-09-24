// src/data/skills.js
// Universal taxonomy of skills across engineering, cybersecurity, and design domains

export const SKILL_TAXONOMY = {
  frontend: [
    {
      id: 'react_state',
      name: 'React & State Management',
      category: 'Core Engineering',
      description: 'Component lifecycle, hooks (useState, useEffect, useMemo), state lifting, and context architecture.',
      defaultBaseline: 85,
      weight: 1.2
    },
    {
      id: 'api_integration',
      name: 'API Integration & Async Handling',
      category: 'Network & Backend Comms',
      description: 'REST/GraphQL consumption, error boundaries, retry logic, payload sanitization, and race condition prevention.',
      defaultBaseline: 90,
      weight: 1.3
    },
    {
      id: 'testing_qa',
      name: 'Automated Testing (Unit & E2E)',
      category: 'Quality Assurance',
      description: 'Writing resilient unit tests with Jest/Vitest, React Testing Library, mocking network calls, and regression testing.',
      defaultBaseline: 80,
      weight: 1.1
    },
    {
      id: 'performance_opt',
      name: 'Web Performance Optimization',
      category: 'Core Engineering',
      description: 'Core Web Vitals (LCP, FID, CLS), code-splitting, lazy loading, debouncing, and bundle analysis.',
      defaultBaseline: 75,
      weight: 1.0
    },
    {
      id: 'css_responsive',
      name: 'Modern CSS & Responsive Systems',
      category: 'UI Architecture',
      description: 'Flexbox, Grid layouts, Tailwind/CSS variables, fluid typography, cross-browser compatibility.',
      defaultBaseline: 85,
      weight: 0.9
    },
    {
      id: 'git_workflow',
      name: 'Git & Production Workflows',
      category: 'Collaboration',
      description: 'Atomic commits, PR reviews, merge conflict resolution, CI/CD pipeline awareness.',
      defaultBaseline: 80,
      weight: 0.8
    }
  ],

  cybersecurity: [
    {
      id: 'siem_log_analysis',
      name: 'SIEM & Log Anomaly Analysis',
      category: 'Detection & Monitoring',
      description: 'Ingesting and querying Splunk/ELK logs, correlation rule queries, timestamp normalization, and outlier detection.',
      defaultBaseline: 85,
      weight: 1.3
    },
    {
      id: 'incident_triage',
      name: 'Incident Response & Triage',
      category: 'SecOps',
      description: 'NIST/SANS incident lifecycle, severity classification (P1-P4), containment strategies, and stakeholder updates.',
      defaultBaseline: 90,
      weight: 1.4
    },
    {
      id: 'network_traffic',
      name: 'Network Traffic & Protocol Analysis',
      category: 'Detection & Monitoring',
      description: 'PCAP inspection, anomalous DNS/HTTP tunneling detection, Wireshark/tshark triage, TCP handshake anomaly parsing.',
      defaultBaseline: 80,
      weight: 1.1
    },
    {
      id: 'threat_containment',
      name: 'Threat Containment & Remediation',
      category: 'SecOps',
      description: 'Host isolation, firewall rule deployment (iptables/WAF), credential revocation, IOC blacklisting.',
      defaultBaseline: 85,
      weight: 1.2
    },
    {
      id: 'threat_intelligence',
      name: 'Threat Intel & MITRE ATT&CK Mapping',
      category: 'Strategy & Intelligence',
      description: 'Mapping observed tactics to MITRE framework (T1110, T1059, T1071), CVE tracking, and adversary profiling.',
      defaultBaseline: 75,
      weight: 1.0
    },
    {
      id: 'security_hygiene',
      name: 'Forensic Reporting & Documentation',
      category: 'Governance & Reporting',
      description: 'Post-incident reviews (PIR), evidence chain of custody, compliance audit trails, root cause summary.',
      defaultBaseline: 80,
      weight: 0.9
    }
  ],

  ui_ux: [
    {
      id: 'design_systems',
      name: 'Design Systems & Component Architecture',
      category: 'UI Craft',
      description: 'Atomic tokens, color harmonies, component variant matrices, responsive constraints, Figma token parity.',
      defaultBaseline: 85,
      weight: 1.2
    },
    {
      id: 'user_research',
      name: 'User Research & Feedback Synthesis',
      category: 'Discovery & Empathy',
      description: 'Qualitative interview coding, affinity mapping, friction-point identification, customer journey tracking.',
      defaultBaseline: 85,
      weight: 1.3
    },
    {
      id: 'interaction_design',
      name: 'Interaction & Micro-Flow Design',
      category: 'UX Architecture',
      description: 'Checkout funnels, form validation states, progressive disclosure, cognitive load reduction.',
      defaultBaseline: 90,
      weight: 1.3
    },
    {
      id: 'usability_heuristics',
      name: 'Heuristic Evaluation & WCAG Accessibility',
      category: 'Standards & Usability',
      description: "Nielsen's 10 Heuristics, WCAG 2.1 AA color contrast compliance, screen-reader focus orders, tap target sizes.",
      defaultBaseline: 80,
      weight: 1.1
    },
    {
      id: 'information_arch',
      name: 'Information Architecture & Wireframing',
      category: 'UX Architecture',
      description: 'Card sorting, site tree taxonomy, low-to-high fidelity wireframing, content hierarchy.',
      defaultBaseline: 75,
      weight: 1.0
    },
    {
      id: 'stakeholder_alignment',
      name: 'Design Critique & Cross-Functional Alignment',
      category: 'Product Strategy',
      description: 'Defending design decisions with user data, negotiating engineering constraints, iterative feedback incorporation.',
      defaultBaseline: 80,
      weight: 0.9
    }
  ]
};

// Candidate profile presets for simulation testing
export const CANDIDATE_PROFILES = {
  frontend: {
    name: 'Alex Rivera',
    title: 'Associate Frontend Engineer',
    skills: {
      react_state: 78,
      api_integration: 48, // Large gap!
      testing_qa: 35,       // Top gap!
      performance_opt: 62,
      css_responsive: 82,
      git_workflow: 75
    }
  },
  cybersecurity: {
    name: 'Jordan Vance',
    title: 'Junior SOC Analyst',
    skills: {
      siem_log_analysis: 45, // Top gap!
      incident_triage: 80,
      network_traffic: 52,   // Gap!
      threat_containment: 40,// Top gap!
      threat_intelligence: 70,
      security_hygiene: 78
    }
  },
  ui_ux: {
    name: 'Taylor Chen',
    title: 'Junior Product Designer',
    skills: {
      design_systems: 80,
      user_research: 42,       // Top gap!
      interaction_design: 50,  // Top gap!
      usability_heuristics: 65,
      information_arch: 70,
      stakeholder_alignment: 76
    }
  }
};

/**
 * Calculates skill gaps given candidate skills and required baseline
 * Returns sorted list of gaps from largest to smallest
 */
export function calculateSkillGaps(roleSkills, candidateSkillMap) {
  return roleSkills.map(skill => {
    const candidateScore = candidateSkillMap[skill.id] || 50;
    const requiredScore = skill.defaultBaseline;
    const gap = Math.max(0, requiredScore - candidateScore);
    const gapPercentage = Math.round((gap / requiredScore) * 100);

    return {
      skillId: skill.id,
      name: skill.name,
      category: skill.category,
      candidateScore,
      requiredScore,
      gap,
      gapPercentage,
      weight: skill.weight,
      isTopGap: false // will be marked below
    };
  }).sort((a, b) => b.gap - a.gap).map((item, index) => ({
    ...item,
    isTopGap: index < 2
  }));
}
