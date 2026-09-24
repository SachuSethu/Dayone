// src/data/taskSolutions.js
// Exhaustive architectural analysis, working breakdown, and step-by-step solution playbook
// for every task across every role in the DayOne.ai platform.

export const TASK_SOLUTIONS = [
  // =========================================================================
  // 1. FRONTEND DEVELOPER
  // =========================================================================
  {
    id: 'task-fe-api-failure',
    roleId: 'frontend',
    roleName: 'Frontend Developer',
    title: 'API Failure & Race Condition in Checkout Pipeline',
    missionCode: 'FE-CRIT-049',
    difficulty: 'Mid-Level',
    department: 'Web Engineering & Core Platform',
    incidentPriority: 'P1 - High Revenue Impact',
    estimatedTime: '25 Mins',
    
    problemOverview: {
      summary: 'Production checkout API calls fail intermittently under poor mobile network conditions (3G/4G), causing unhandled promise rejections, stuck UI loading spinners, and duplicate credit card charges.',
      rootCause: 'The checkout API client in `checkoutApi.js` lacks request timeouts and exponential retry backoff. When a network connection drops or receives a 504 Gateway Timeout, the promise rejects unhandled. Furthermore, `CheckoutButton.jsx` does not disable the submit button after an initial failure, causing users to tap repeatedly and submit duplicate charges. Lastly, currency calculations suffer from a floating-point precision error.',
      telemetryAlerts: [
        'Sentry Alert: Uncaught (in promise) Error: Gateway Timeout (504) at /api/v2/checkout',
        'Client Browser: TypeError: Cannot read properties of undefined (reading "transactionId")',
        'Customer Support Ticket #9812: "My card was charged twice when the spinner froze!"'
      ],
      impactMetric: '14% checkout abandonment rate and 82 duplicate transaction disputes per hour.'
    },

    stepByStepGuide: [
      {
        step: 1,
        title: 'Review the Bug Ticket in Jira',
        tool: 'Jira Tool',
        action: 'Click on Jira in the left tool navigation. Review ticket PROD-4092, observe the reproduction steps and error logs, and click "Start Progress" to signal the sprint squad.'
      },
      {
        step: 2,
        title: 'Reproduce Error in Live Browser Preview',
        tool: 'Live Browser Preview',
        action: 'Open the Live Browser preview. Click "Pay Now ($149.00)". Under simulated 3G latency, observe that the button hangs indefinitely in "Processing Payment..." without recovering.'
      },
      {
        step: 3,
        title: 'Patch checkoutApi.js in Monaco Code Editor',
        tool: 'Monaco Code Editor',
        action: 'Open `src/services/checkoutApi.js`. Implement an exponential backoff loop (3 attempts) with a 3000ms AbortController timeout, verify `response.ok`, and fix the floating-point discount precision in `calculateCartTotal`.'
      },
      {
        step: 4,
        title: 'Patch CheckoutButton.jsx Error State',
        tool: 'Monaco Code Editor',
        action: 'Open `src/components/CheckoutButton.jsx`. Ensure the button clears the error banner upon new attempts, catches network timeout errors safely, and resets loading states cleanly.'
      },
      {
        step: 5,
        title: 'Run Automated Tests in Dev Terminal',
        tool: 'Dev Terminal',
        action: 'Switch to the Terminal tool and execute `npm test`. Verify that all 4 test suites pass (100% green).'
      },
      {
        step: 6,
        title: 'Stage Changes & Open Pull Request in Git',
        tool: 'Git & PR Inspector',
        action: 'Open the Git tool. Stage `checkoutApi.js` and `CheckoutButton.jsx`, write commit message `fix(checkout): add exponential retry backoff and fix precision bug`, and open a PR.'
      }
    ],

    solutionCode: {
      'src/services/checkoutApi.js': `// PRODUCTION SOLUTION: Resilient Checkout API with Retry & Timeout
export async function submitCheckout(payload, maxRetries = 3) {
  let attempt = 0;
  let delay = 500; // base delay 500ms

  while (attempt < maxRetries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch('/api/v2/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(\`Checkout HTTP Error \${response.status}\`);
      }

      const data = await response.json();
      return { success: true, ...data };
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) {
        return {
          success: false,
          error: 'Payment gateway timeout. Please verify funds and retry.'
        };
      }
      // Exponential backoff delay
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
}

export function calculateCartTotal(items = [], discountCode = '') {
  if (!items || !items.length) return 0.00;
  
  const rawSum = items.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + (price * qty);
  }, 0);

  let finalSum = rawSum;
  if (discountCode === 'DAYONE20') {
    finalSum = rawSum * 0.8;
  }

  // Round currency accurately to 2 decimal places
  return Math.round(finalSum * 100) / 100;
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
      if (result && result.success) {
        if (onComplete) onComplete(result);
      } else {
        setError(result?.error || 'Payment gateway did not respond.');
      }
    } catch (err) {
      setError('Connection interrupted. No charge was made.');
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
        {loading ? 'Securing Transaction...' : 'Pay Now ($149.00)'}
      </button>
      {error && <p className="error-banner">{error}</p>}
    </div>
  );
}`
    },

    verificationChecklist: [
      'npm test runs with 4/4 passing tests',
      'Timeout retry logic triggers on 504 responses without user interaction',
      'Browser preview displays clear red error banner if all retries fail',
      'Git PR is committed with atomic changes and linked to PROD-4092'
    ]
  },

  // =========================================================================
  // 2. CYBERSECURITY ANALYST
  // =========================================================================
  {
    id: 'task-sec-credential-stuffing',
    roleId: 'cybersecurity',
    roleName: 'Cybersecurity Analyst',
    title: 'Distributed Credential Stuffing & Gateway Brute-Force',
    missionCode: 'SEC-INC-942',
    difficulty: 'Mid-Level',
    department: 'Security Operations Center (SOC Tier 2)',
    incidentPriority: 'P1 - Active Brute Force Attack',
    estimatedTime: '20 Mins',

    problemOverview: {
      summary: 'High-velocity distributed credential stuffing attack targeting `/api/v1/auth/login`. Traffic spiked from 140 RPS to 2,850 RPS across 3 malicious autonomous systems (ASNs), triggering automated SIEM anomaly alarms.',
      rootCause: 'Threat actors are utilizing breached credential combo-lists and rotating residential proxies to bypass per-IP rate limits. 98.4% of authentication attempts yield HTTP 401 Unauthorized responses with spoofed User-Agents.',
      telemetryAlerts: [
        'SIEM Elastic Alert: Threshold exceeded on /api/v1/auth - 28,400 failed auths / min',
        'WAF Rate Rule Breach: Rogue subnets 185.220.101.0/24, 45.154.255.88, 194.26.29.112',
        'Threat Intel Feed: High confidence mapping to MITRE ATT&CK T1110.004 (Credential Stuffing)'
      ],
      impactMetric: 'Risk of account takeover (ATO) across 45,000 corporate consumer identities.'
    },

    stepByStepGuide: [
      {
        step: 1,
        title: 'Review Incident Ticket SEC-942',
        tool: 'Incident Ticket Tool',
        action: 'Open the Incident Ticket tool. Review the severity classification (P1), compromised API endpoints, and assigned containment SLA (under 20 minutes).'
      },
      {
        step: 2,
        title: 'Query SIEM Log Analyzer for Rogue Clusters',
        tool: 'SIEM Log Analyzer',
        action: 'Execute log queries filtering for HTTP 401 response status codes grouped by IP address and User-Agent. Identify the top 3 rogue IP clusters contributing to 86% of the traffic.'
      },
      {
        step: 3,
        title: 'Cross-Reference Network Telemetry',
        tool: 'Network Telemetry Dashboard',
        action: 'Inspect real-time RPS charts. Verify that traffic has reached 2,850 RPS with an anomalous ratio of outbound 401 response payloads.'
      },
      {
        step: 4,
        title: 'Execute Firewall Containment in Bastion Terminal',
        tool: 'SOC Bastion Shell',
        action: 'Open the terminal and run iptables drop rules to quarantine the identified botnet CIDR blocks and IP addresses.'
      },
      {
        step: 5,
        title: 'Verify Traffic Normalization & Brief CISO',
        tool: 'Incident Ticket Tool',
        action: 'Confirm traffic drops back to baseline (140 RPS), update ticket resolution status to "Contained", attach IOC hashes, and notify CISO Marcus Reyes.'
      }
    ],

    solutionCode: {
      'terminal_commands': `# SOC BASTION SHELL CONTAINMENT COMMANDS

# 1. Inspect current firewall rules
iptables -L -n --line-numbers

# 2. Block rogue residential proxy subnet (ASN 41378)
iptables -A INPUT -s 185.220.101.0/24 -j DROP

# 3. Block secondary credential stuffing nodes (ASN 50892)
iptables -A INPUT -s 45.154.255.88 -j DROP
iptables -A INPUT -s 194.26.29.112 -j DROP

# 4. Save and verify active firewall drop rules
iptables -L -n --line-numbers | grep DROP

# 5. Check gateway authentication traffic status
systemctl status ingress-waf-shield
# [ACTIVE] Ingress WAF rules applied. Malicious packets dropped: 148,290`
    },

    verificationChecklist: [
      'iptables drop rules added for 185.220.101.0/24, 45.154.255.88, and 194.26.29.112',
      'SIEM telemetry confirms 401 error rate returns below 2% threshold',
      'Network traffic drops from 2,850 RPS back to 140 RPS baseline',
      'Incident ticket SEC-942 updated with MITRE ATT&CK T1110.004 tag'
    ]
  },

  // =========================================================================
  // 3. UI/UX DESIGNER
  // =========================================================================
  {
    id: 'task-ux-checkout-friction',
    roleId: 'ui_ux',
    roleName: 'UI/UX Designer',
    title: 'Mobile Checkout Drop-off & Form Friction Redesign',
    missionCode: 'UX-AUDIT-208',
    difficulty: 'Mid-Level',
    department: 'Product Experience & Design Systems',
    incidentPriority: 'High Business Friction',
    estimatedTime: '25 Mins',

    problemOverview: {
      summary: 'Mobile analytics show 38% of customers abandon cart specifically on the Step 3 billing/shipping screen due to undisclosed taxes, tiny tap targets, and poor WCAG color contrast.',
      rootCause: 'The legacy layout (Variant A) hides mandatory taxes and shipping fees until the final confirmation step, causing sticker shock. Furthermore, primary action buttons have a height of only 32px (violating the WCAG 44x44px minimum target heuristic), and helper text contrast is 3.1:1 (failing Level AA 4.5:1 standard).',
      telemetryAlerts: [
        'Analytics: 38% conversion drop-off on checkout Step 3',
        'Usability Telemetry: 42% rage-click events on mobile "Continue" button',
        'Accessibility Audit: Color contrast 3.1:1 fails WCAG 2.1 Level AA'
      ],
      impactMetric: 'Estimated $180,000 lost monthly gross merchandise value (GMV).'
    },

    stepByStepGuide: [
      {
        step: 1,
        title: 'Review the Design Brief & KPIs',
        tool: 'Design Brief Tool',
        action: 'Review UX-AUDIT-208 goals: reduce cart abandonment by at least 15% and achieve 100% WCAG 2.1 AA compliance.'
      },
      {
        step: 2,
        title: 'Analyze Usability Recordings & Friction Themes',
        tool: 'User Feedback Tool',
        action: 'Inspect 3 customer usability sessions. Note recurring quotes regarding surprise fees, tiny buttons, and unreadable gray text.'
      },
      {
        step: 3,
        title: 'Configure Accessible Layout in Canvas Studio',
        tool: 'DayOne Canvas Studio',
        action: 'Switch layout from legacy Variant A to Variant B (Optimized Sticky) or Variant C (Transparent Accordion). Enable upfront fee transparency, set button size to 48px, and increase contrast.'
      },
      {
        step: 4,
        title: 'Verify WCAG 2.1 AA Contrast Compliance',
        tool: 'WCAG Contrast Inspector',
        action: 'Verify that button text contrast exceeds 4.5:1 (achieved 12.6:1 with dark slate #0f172a on white #ffffff).'
      },
      {
        step: 5,
        title: 'Present Rationale to AI Design Lead',
        tool: 'Slack (#design-sprint)',
        action: 'Send layout rationale to Design Lead Elena Rostova summarizing heuristic improvements and submit for review.'
      }
    ],

    solutionCode: {
      'design_specification': `/* DAYONE DESIGN TOKENS & ACCESSIBILITY SPECIFICATION */
:root {
  /* Tap Target & Layout Ergonomics */
  --checkout-button-height: 48px; /* Meets WCAG 2.1 AA (>= 44px) */
  --checkout-button-radius: 8px;
  --checkout-tap-padding: 12px 24px;
  
  /* Color Contrast Tokens */
  --color-text-primary: #0f172a; /* 12.6:1 contrast against #ffffff */
  --color-text-muted: #475569;   /* 4.8:1 contrast against #ffffff */
  --color-error-banner: #b91c1c; /* 5.2:1 contrast against #fee2e2 */
  
  /* Transparent Pricing Component */
  --pricing-display: flex;
  --pricing-subtotal: visible;
  --pricing-estimated-tax: upfront_calculated;
  --pricing-shipping-guarantee: "Free 2-Day Shipping (Calculated)";
}`
    },

    verificationChecklist: [
      'Switched active layout from Variant A to Variant B or C',
      'Upfront fee transparency enabled to eliminate checkout sticker shock',
      'Primary tap target button height increased from 32px to 48px',
      'Color contrast ratio exceeds 4.5:1 WCAG Level AA benchmark'
    ]
  },

  // =========================================================================
  // 4. BACKEND DEVELOPER
  // =========================================================================
  {
    id: 'task-be-connection-pool',
    roleId: 'backend',
    roleName: 'Backend Developer',
    title: 'Database Connection Pool Exhaustion & Resilient Webhook Processing',
    missionCode: 'BE-DIST-301',
    difficulty: 'Mid-Level',
    department: 'Distributed Systems & Cloud Services',
    incidentPriority: 'P1 - Critical Database Outage',
    estimatedTime: '25 Mins',

    problemOverview: {
      summary: 'Sudden traffic spike triggers PostgreSQL connection pool exhaustion (503 Service Unavailable), causing non-idempotent stripe webhooks to process twice, producing duplicate customer billing records.',
      rootCause: 'Node.js Express microservices were opening a direct client connection per HTTP request instead of using a managed connection pool with bounded limits (`max: 20`). In addition, the webhook listener lacked a distributed Redis idempotency lock, processing incoming duplicate webhooks concurrently.',
      telemetryAlerts: [
        'Postgres Error: FATAL: remaining connection slots are reserved for non-replication superuser connections',
        'Redis Telemetry: 1,420 un-cached concurrent requests hitting db cluster directly',
        'HTTP 503 Spike: API Gateway shedding 22% of inbound traffic'
      ],
      impactMetric: 'Database server CPU at 99.4%, 180 concurrent transactions blocked in deadlock.'
    },

    stepByStepGuide: [
      {
        step: 1,
        title: 'Inspect Microservice Logs & Connection Metrics',
        tool: 'Server Telemetry Tool',
        action: 'Review database connection charts and observe pool exhaustion at 100 concurrent clients.'
      },
      {
        step: 2,
        title: 'Configure Bounded Connection Pool in db.js',
        tool: 'Monaco Code Editor',
        action: 'Replace raw `new Client()` with `new Pool({ max: 20, idleTimeoutMillis: 30000, connectionTimeoutMillis: 2000 })`.'
      },
      {
        step: 3,
        title: 'Implement Distributed Redis Idempotency Lock',
        tool: 'Monaco Code Editor',
        action: 'In the webhook handler, acquire an atomic Redis lock using `SET webhook:eventId 1 NX EX 300`. If key exists, return 200 immediately.'
      },
      {
        step: 4,
        title: 'Verify with Stress Test in Terminal',
        tool: 'Dev Terminal',
        action: 'Execute `npm run test:concurrency` simulating 500 parallel webhook payloads. Verify 0 duplicate records and zero connection timeouts.'
      }
    ],

    solutionCode: {
      'src/config/database.js': `// PRODUCTION POOL CONFIGURATION
import { Pool } from 'pg';

export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Bounded pool limit to protect PostgreSQL
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2500 // Fail fast rather than hanging
});

export async function query(text, params) {
  const start = Date.now();
  const res = await dbPool.query(text, params);
  const duration = Date.now() - start;
  if (duration > 500) {
    console.warn(\`[Slow Query Alert] (\${duration}ms): \${text}\`);
  }
  return res;
}`,

      'src/handlers/webhookHandler.js': `// IDEMPOTENT WEBHOOK HANDLER WITH REDIS LOCK
import redisClient from '../config/redis.js';
import { dbPool } from '../config/database.js';

export async function handleStripeWebhook(req, res) {
  const event = req.body;
  const eventId = event?.id;

  if (!eventId) {
    return res.status(400).json({ error: 'Missing event ID' });
  }

  // 1. Check & acquire atomic distributed lock (300s TTL)
  const isNew = await redisClient.set(\`webhook:lock:\${eventId}\`, 'processing', {
    NX: true,
    EX: 300
  });

  if (!isNew) {
    // Duplicate webhook delivery: Return 200 OK without re-processing
    return res.status(200).json({ status: 'already_processed_or_in_flight' });
  }

  try {
    // 2. Execute database transaction with pool client
    const client = await dbPool.connect();
    try {
      await client.query('BEGIN');
      await client.query(
        'INSERT INTO billing_events (event_id, payload, processed_at) VALUES ($1, $2, NOW())',
        [eventId, JSON.stringify(event)]
      );
      await client.query('COMMIT');
    } catch (dbErr) {
      await client.query('ROLLBACK');
      throw dbErr;
    } finally {
      client.release(); // Return client to pool
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    // Release lock on fatal error so Stripe can retry
    await redisClient.del(\`webhook:lock:\${eventId}\`);
    return res.status(500).json({ error: 'Webhook transaction failed' });
  }
}`
    },

    verificationChecklist: [
      'Database connection pool configured with max 20 connections',
      'Redis atomic lock prevents duplicate webhook execution',
      'Concurrency stress test passes with 100% successful requests',
      'Deadlock rate reduced to 0.0%'
    ]
  },

  // =========================================================================
  // 5. DATA ANALYST
  // =========================================================================
  {
    id: 'task-da-mrr-discrepancy',
    roleId: 'data_analyst',
    roleName: 'Data Analyst',
    title: 'Monthly Recurring Revenue (MRR) Discrepancy & Cohort Churn Diagnostics',
    missionCode: 'DA-REV-502',
    difficulty: 'Mid-Level',
    department: 'Business Intelligence & Data Science',
    incidentPriority: 'P1 - Financial Reporting Inaccuracy',
    estimatedTime: '25 Mins',

    problemOverview: {
      summary: 'Executive dashboard indicates a $42,000 discrepancy between Stripe billing revenue and the Snowflake warehouse Monthly Recurring Revenue (MRR) metric due to unhandled refund reversals and timezone truncation errors.',
      rootCause: 'The SQL aggregation CTE grouped transactions by `DATE_TRUNC("month", event_timestamp)` in server local timezone (PST) instead of UTC, causing end-of-month transactions to shift into the wrong financial month. Furthermore, the query omitted a filter for `refund_status = "reversed"`, counting refunded subscriptions twice.',
      telemetryAlerts: [
        'Finance VP Alert: March reported MRR is $842,000; Stripe ledger reflects $800,000',
        'Data Warehouse Sync: Telemetry delta identified in table `analytics.fact_subscriptions`',
        'Executive Dashboard: Churn cohort curve showing artificial -8% anomaly'
      ],
      impactMetric: 'Overstated financial reporting metrics on executive board presentation.'
    },

    stepByStepGuide: [
      {
        step: 1,
        title: 'Review Financial Variance in Dashboard',
        tool: 'Tableau Executive Preview',
        action: 'Inspect the Monthly Revenue waterfall chart. Observe the $42,000 spike in the March billing cycle.'
      },
      {
        step: 2,
        title: 'Inspect Schema in Snowflake Query Console',
        tool: 'SQL Query Console',
        action: 'Examine `analytics.fact_subscriptions` schema and cross-reference transaction IDs with the raw Stripe billing table.'
      },
      {
        step: 3,
        title: 'Rewrite SQL Aggregation CTE with UTC Truncation',
        tool: 'SQL Query Console',
        action: 'Update the query to enforce `DATE_TRUNC("month", transaction_timestamp AT TIME ZONE "UTC")` and add filter `WHERE is_refunded = FALSE AND status = "active"`.'
      },
      {
        step: 4,
        title: 'Verify Ledger Reconciliation & Rebuild Dashboard',
        tool: 'Tableau Executive Preview',
        action: 'Execute reconciliation query. Verify that discrepancy drops from $42,000 to $0.00 and publish the corrected cohort dashboard.'
      }
    ],

    solutionCode: {
      'queries/mrr_reconciliation.sql': `-- PRODUCTION MRR RECONCILIATION QUERY
WITH normalized_transactions AS (
  SELECT 
    subscription_id,
    customer_id,
    amount_cents / 100.0 AS amount_usd,
    -- Fix: Standardize timezone to UTC before monthly date truncation
    DATE_TRUNC('month', transaction_timestamp AT TIME ZONE 'UTC') AS billing_month,
    status,
    is_refunded,
    refund_amount_cents / 100.0 AS refund_amount_usd
  FROM warehouse.raw_stripe_charges
  WHERE 
    -- Fix: Exclude refunded transactions and non-recurring one-off charges
    is_refunded = FALSE
    AND status = 'succeeded'
    AND charge_type = 'recurring_subscription'
),

monthly_mrr_summary AS (
  SELECT 
    billing_month,
    COUNT(DISTINCT customer_id) AS active_subscribers,
    SUM(amount_usd) AS total_mrr_usd,
    -- Calculate net churn
    LAG(SUM(amount_usd), 1) OVER (ORDER BY billing_month) AS prev_month_mrr,
    SUM(amount_usd) - LAG(SUM(amount_usd), 1) OVER (ORDER BY billing_month) AS net_mrr_expansion
  FROM normalized_transactions
  GROUP BY billing_month
)

SELECT 
  billing_month,
  active_subscribers,
  ROUND(total_mrr_usd, 2) AS validated_mrr,
  ROUND(COALESCE(net_mrr_expansion, 0), 2) AS expansion_usd
FROM monthly_mrr_summary
ORDER BY billing_month DESC;`
    },

    verificationChecklist: [
      'SQL query standardizes timezone to UTC before monthly truncation',
      'Refunded transactions and one-off charges filtered out completely',
      'MRR variance against Stripe billing ledger drops to $0.00',
      'Tableau executive waterfall charts re-rendered with 100% financial accuracy'
    ]
  }
];

export function getSolutionByTaskId(taskId) {
  return TASK_SOLUTIONS.find(s => s.id === taskId) || TASK_SOLUTIONS[0];
}

export function getSolutionByRoleId(roleId) {
  return TASK_SOLUTIONS.find(s => s.roleId === roleId || s.roleId.includes(roleId) || roleId?.includes(s.roleId)) || TASK_SOLUTIONS[0];
}
