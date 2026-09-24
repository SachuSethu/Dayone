// src/data/tasks.js
// Reusable task archetypes for dynamic role-based simulation generation.
// The engine dynamically selects tasks matching the candidate's biggest skill gaps.

export const TASK_ARCHETYPES = [
  // 1. DEBUGGING / CUSTOMER-ISSUE (Frontend)
  {
    id: 'task-fe-api-failure',
    archetype: 'debugging',
    title: 'API Failure & Race Condition in Checkout Pipeline',
    shortDescription: 'Production API calls fail silently under poor network conditions, causing unhandled promise rejections and stuck UI spinners.',
    applicableRoles: ['frontend'],
    skills: ['api_integration', 'testing_qa', 'react_state'],
    difficulty: 'Mid-Level',
    environment: {
      framework: 'React 18',
      testSuite: 'vitest',
      targetFile: 'src/services/checkoutApi.js'
    },
    evaluationCriteria: {
      accuracy: 30, // Root-cause fix
      resilience: 25, // Retry & timeout handling
      testCoverage: 25, // Unit test execution & assertions
      communication: 20 // PR notes & Jira ticket closure
    },
    missionDataTemplate: {
      missionCode: 'FE-CRIT-049',
      incidentPriority: 'P1 - High Revenue Impact',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Customers attempting checkout with slow cellular connections (3G/4G) experience infinite loading spinners or duplicate charge errors. Sentry logs indicate uncaught 504 Gateway Timeouts and unhandled Promise rejections in checkoutApi.js.',
      objectives: [
        'Review Jira ticket PROD-4092 and reproduce error in the Live Browser preview.',
        'Inspect checkoutApi.js and CheckoutButton.jsx in the Monaco Code Editor.',
        'Implement exponential backoff retry logic and safe error boundary fallbacks.',
        'Run `npm test` in the terminal to ensure automated test suites pass (100% green).',
        'Stage changes, commit via Git tool, and submit for Engineering Lead signoff.'
      ],
      initialCode: {
        'src/services/checkoutApi.js': `// CRITICAL BUG: Unhandled rejected promises on 500/504
export async function submitCheckout(payload) {
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
}`,
        'src/components/CheckoutButton.jsx': `import React, { useState } from 'react';
import { submitCheckout } from '../services/checkoutApi';

export function CheckoutButton({ cartItems, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitCheckout({ items: cartItems });
      if (result.success) {
        onComplete(result);
      } else {
        // Bug: Doesn't handle server message
        setError("Checkout failed.");
      }
    } catch (err) {
      // Bug: Swallows error silently in production
      console.error(err);
      setError("Network timeout. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-widget">
      <button 
        disabled={loading} 
        onClick={handleClick}
        className="pay-btn"
      >
        {loading ? "Processing Payment..." : "Pay Now ($149.00)"}
      </button>
      {error && <p className="error-banner">{error}</p>}
    </div>
  );
}`
      },
      initialTerminalHistory: [
        'dayone-fe-sandbox:~$ git status',
        'On branch fix/prod-4092-checkout-timeout',
        'Your branch is up to date with origin/main.',
        'dayone-fe-sandbox:~$ npm test',
        'FAIL src/tests/checkoutApi.test.js',
        '  ✕ should retry 3 times on 504 Gateway Timeout (timed out after 5000ms)',
        '  ✕ should return clean error state without crashing React tree',
        '  ✕ should round currency total to 2 decimal places',
        'Tests: 3 failed, 1 passed, 4 total',
        'dayone-fe-sandbox:~$'
      ],
      initialLogs: [
        '[14:02:11] Sentry Alert: Uncaught (in promise) Error: Gateway Timeout (504) at /api/v2/checkout',
        '[14:02:15] Client Browser: TypeError: Cannot read properties of undefined (reading "transactionId")',
        '[14:03:01] Customer Support Ticket #9812: "My card was charged twice when the spinner froze!"'
      ]
    }
  },

  // 2. INCIDENT-RESPONSE / DATA-INVESTIGATION (Cybersecurity)
  {
    id: 'task-sec-credential-stuffing',
    archetype: 'incident-response',
    title: 'Distributed Credential Stuffing & Gateway Brute-Force',
    shortDescription: 'High-volume distributed POST requests targeting /api/v1/auth with 401 response spikes across foreign autonomous systems (ASNs).',
    applicableRoles: ['cybersecurity'],
    skills: ['siem_log_analysis', 'incident_triage', 'threat_containment', 'network_traffic'],
    difficulty: 'Mid-Level',
    environment: {
      siem: 'Elasticsearch / Kibana SIEM query engine',
      firewall: 'iptables / Cloudflare WAF ACL',
      bastion: 'Linux Debian 12 SOC Gateway'
    },
    evaluationCriteria: {
      detectionAccuracy: 30, // Identifying correct rogue CIDR / botnet IPs
      containmentSpeed: 30,  // Applying firewall drop rules in terminal
      triageReporting: 25,   // Documenting IOCs in incident ticket
      hygiene: 15           // Verification of traffic normalization
    },
    missionDataTemplate: {
      missionCode: 'SEC-INC-942',
      incidentPriority: 'P1 - Active Brute Force Attack',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'At 13:42 UTC, SOC monitoring triggered threshold alerts for /api/v1/auth. Over 28,000 requests per minute with randomized User-Agents originating from ASN 41378 and ASN 50892. Attackers are rotating residential proxies to bypass per-IP rate limits.',
      objectives: [
        'Examine Incident Ticket #SEC-942 and review the triage criteria.',
        'Query the SIEM Log Analyzer to isolate malicious IP clusters and high 401 ratios.',
        'Cross-reference the Network Telemetry dashboard to verify anomalous outbound spikes.',
        'Launch SOC Bastion Shell and execute `iptables` drop rules to quarantine rogue subnets.',
        'Update IOC hashes and IP ranges in the Incident Ticket, then notify CISO Marcus Reyes.'
      ],
      initialTerminalHistory: [
        'soc-bastion:~$ whoami',
        'analyst-jordan [Tier 2 SecOps]',
        'soc-bastion:~$ iptables -L -n --line-numbers',
        'Chain INPUT (policy ACCEPT)',
        'num   target     prot opt source               destination',
        '1     ACCEPT     all  --  10.0.0.0/8           0.0.0.0/0',
        '2     ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:443',
        'Chain FORWARD (policy DROP)',
        'Chain OUTPUT (policy ACCEPT)',
        'soc-bastion:~$'
      ],
      simulatedThreatData: {
        attackVector: 'Credential Stuffing (MITRE ATT&CK T1110.004)',
        compromisedEndpoints: ['/api/v1/auth/login', '/oauth/v2/token'],
        rogueSubnets: ['185.220.101.0/24', '45.154.255.88', '194.26.29.112'],
        normalTrafficRps: 140,
        peakAttackRps: 2850
      }
    }
  },

  // 3. DESIGN-FEEDBACK / FEATURE-REQUEST (UI/UX Designer)
  {
    id: 'task-ux-checkout-friction',
    archetype: 'design-feedback',
    title: 'Mobile Checkout Drop-off & Form Friction Redesign',
    shortDescription: 'Conversion drop-off at billing/shipping step is 38%. Usability telemetry reveals mobile users struggle with hidden fee surprises and tiny tap targets.',
    applicableRoles: ['ui_ux'],
    skills: ['user_research', 'interaction_design', 'usability_heuristics', 'design_systems'],
    difficulty: 'Mid-Level',
    environment: {
      designTool: 'DayOne Canvas Studio',
      gridSystem: '8pt Responsive Grid',
      accessibilityLevel: 'WCAG 2.1 AA'
    },
    evaluationCriteria: {
      researchSynthesis: 30, // Diagnosing user pain points
      heuristicFixes: 30,    // Transparent pricing, clear step progress, tap target >= 44px
      accessibilityWCAG: 20, // Contrast ratio >= 4.5:1, semantic labels
      designDefense: 20      // Presenting rationale to AI Design Lead
    },
    missionDataTemplate: {
      missionCode: 'UX-AUDIT-208',
      incidentPriority: 'High Business Friction',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Analytics show 62% of mobile shoppers abandon cart on Step 3 of checkout. User recordings and survey feedback reveal frustration over undisclosed taxes until final click, confusing credit card error states, and unreadable gray-on-white text.',
      objectives: [
        'Review the Design Brief and extract key business KPIs and user constraints.',
        'Analyze User Feedback & Usability recordings for recurring friction themes.',
        'Inspect Research Notes to observe System Usability Scale (SUS) benchmarks.',
        'Use the Interactive Design Canvas to configure an accessible, transparent layout (Variant B/C).',
        'Review WCAG contrast compliance and present your layout rationale to Elena Rostova.'
      ],
      currentLayoutState: {
        activeVariant: 'variant_a_legacy',
        feeTransparency: false,
        stepProgressStyle: 'minimal_dots',
        tapTargetSize: '32px (Sub-optimal)',
        contrastRatio: '3.1:1 (Failing AA)'
      }
    }
  },

  // 4. PERFORMANCE OPTIMIZATION (Frontend)
  {
    id: 'task-fe-perf-opt',
    archetype: 'optimization',
    title: 'E-Commerce Catalog Render Thrashing & LCP Degradation',
    shortDescription: 'Large catalog re-renders 800 products on every keystroke in search filter, blocking main thread for 420ms.',
    applicableRoles: ['frontend'],
    skills: ['performance_opt', 'react_state'],
    difficulty: 'Senior',
    environment: {
      framework: 'React 18',
      profiler: 'Chrome DevTools Lighthouse'
    },
    evaluationCriteria: {
      renderOptimization: 40,
      debouncing: 30,
      responsiveFeel: 30
    }
  },

  // 5. THREAT HUNTING / DATA INVESTIGATION (Cybersecurity)
  {
    id: 'task-sec-data-exfil',
    archetype: 'data-investigation',
    title: 'Anomalous DNS Tunneling & Outbound Data Exfiltration',
    shortDescription: 'High frequency TXT record queries to suspicious apex domain over port 53, pointing to covert data exfiltration.',
    applicableRoles: ['cybersecurity'],
    skills: ['network_traffic', 'threat_intelligence', 'siem_log_analysis'],
    difficulty: 'Senior',
    environment: {
      siem: 'Zeek / Wireshark DNS Stream Analyzer'
    },
    evaluationCriteria: {
      dnsInspection: 40,
      mitreMapping: 30,
      containment: 30
    }
  },

  // 6. STAKEHOLDER REQUEST / DESIGN SYSTEM (UI/UX)
  {
    id: 'task-ux-saas-dashboard',
    archetype: 'stakeholder-request',
    title: 'Executive Analytics Hub: Information Architecture Overhaul',
    shortDescription: 'Enterprise clients report cognitive overload navigating multi-tenant metrics. Consolidate 18 disjointed widgets into a modular hierarchy.',
    applicableRoles: ['ui_ux'],
    skills: ['information_arch', 'stakeholder_alignment', 'design_systems'],
    difficulty: 'Mid-Level',
    environment: {
      designTool: 'DayOne Canvas Studio'
    },
    evaluationCriteria: {
      hierarchy: 40,
      clarity: 30,
      scalability: 30
    }
  }
];

/**
 * Dynamic Task Selector:
 * Selects the best matching task archetype based on the candidate's biggest skill gaps!
 *
 * Example:
 * Candidate Frontend Dev has largest gaps in:
 * 1. api_integration (gap = 42)
 * 2. testing_qa (gap = 35)
 * Matches: 'task-fe-api-failure' (API Failure & Race Condition)
 */
export function selectTaskForCandidate(roleId, skillGaps) {
  // Filter tasks applicable to this role
  const roleTasks = TASK_ARCHETYPES.filter(t => t.applicableRoles.includes(roleId));

  if (!roleTasks.length) {
    return TASK_ARCHETYPES[0];
  }

  // Score each task against the candidate's top skill gaps
  let highestScore = -1;
  let bestTask = roleTasks[0];

  roleTasks.forEach(task => {
    let matchScore = 0;
    
    // Check overlap with candidate's skill gaps
    skillGaps.forEach((gapItem, index) => {
      if (task.skills.includes(gapItem.skillId)) {
        // High priority for top gaps
        const rankMultiplier = (index === 0) ? 3 : (index === 1) ? 2 : 1;
        matchScore += gapItem.gap * rankMultiplier * (gapItem.weight || 1);
      }
    });

    if (matchScore > highestScore) {
      highestScore = matchScore;
      bestTask = task;
    }
  });

  return bestTask;
}
