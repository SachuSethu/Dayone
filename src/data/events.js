// src/data/events.js
// Dynamic simulation events triggered periodically or on user actions to simulate real-world workplace pressure.

export const SIMULATION_EVENTS = {
  frontend: [
    {
      id: 'fe-event-1',
      triggerSeconds: 45,
      type: 'slack_message',
      channel: '#frontend-sprint',
      sender: { name: 'DevOps Bot', avatar: '🤖', role: 'CI/CD Bot' },
      content: '🚨 ALERT: Synthetic checkout test failed on Mobile-Safari-US-East. Response latency > 8000ms. Sentry issue count +42.',
      badge: 'System Alert'
    },
    {
      id: 'fe-event-2',
      triggerSeconds: 120,
      type: 'slack_message',
      channel: '#frontend-sprint',
      sender: { name: 'Sarah Lin', avatar: '👩‍💻', role: 'Staff Eng Lead' },
      content: 'Quick note Alex: make sure we wrap the retry logic with a max of 3 attempts so we don’t hammer the payment gateway if their upstream database is down.',
      badge: 'Lead Guidance'
    },
    {
      id: 'fe-event-3',
      triggerSeconds: 240,
      type: 'ticket_update',
      channel: '#support-escalations',
      sender: { name: 'Support Lead Carlos', avatar: '🎧', role: 'Customer Success' },
      content: 'VP of Sales says a Tier-1 enterprise account just had checkout time out. If we fix this within the hour, we save the renewal!',
      badge: 'Stakeholder Escalation'
    }
  ],

  cybersecurity: [
    {
      id: 'sec-event-1',
      triggerSeconds: 30,
      type: 'slack_message',
      channel: '#soc-war-room',
      sender: { name: 'SOC Guard Bot', avatar: '🤖', role: 'WAF Engine' },
      content: '🔥 THRESHOLD BREACH: 401 Unauthorized count exceeded 5,000 req/min from subnet 185.220.101.0/24.',
      badge: 'WAF Alert'
    },
    {
      id: 'sec-event-2',
      triggerSeconds: 90,
      type: 'slack_message',
      channel: '#soc-war-room',
      sender: { name: 'Marcus Reyes', avatar: '🛡️', role: 'CISO / Incident Commander' },
      content: 'Analyst, ensure you drop the entire /24 CIDR block in iptables, not just the single IP. These botnets cycle through multiple IP addresses in the same pool.',
      badge: 'Directive'
    },
    {
      id: 'sec-event-3',
      triggerSeconds: 180,
      type: 'threat_telemetry',
      channel: '#sec-ops',
      sender: { name: 'Threat Intel Feed', avatar: '📡', role: 'AbuseIPDB Sync' },
      content: 'Subnet 185.220.101.0/24 flagged by 84 external reporting nodes for Tor exit node brute-forcing.',
      badge: 'Threat Intel'
    }
  ],

  ui_ux: [
    {
      id: 'ux-event-1',
      triggerSeconds: 40,
      type: 'slack_message',
      channel: '#design-critique',
      sender: { name: 'Analytics Webhook', avatar: '📊', role: 'Mixpanel Bot' },
      content: '📉 Cart Abandonment Alert: Step 3 drop-off reached 38.4% today. 82% of drop-off events happen right after shipping calculation.',
      badge: 'Analytics'
    },
    {
      id: 'ux-event-2',
      triggerSeconds: 110,
      type: 'slack_message',
      channel: '#design-critique',
      sender: { name: 'Elena Rostova', avatar: '🎨', role: 'Head of Design' },
      content: 'Taylor, take a look at Variant B in the canvas. Notice how showing estimated shipping costs upfront in Step 1 eliminates the sticker shock in Step 3.',
      badge: 'Critique'
    },
    {
      id: 'ux-event-3',
      triggerSeconds: 200,
      type: 'user_quote',
      channel: '#voice-of-customer',
      sender: { name: 'Usability Study #14', avatar: '🧑', role: 'Test Participant' },
      content: '"I tried tapping the Apply Promo Code button on my iPhone four times and it kept hitting the Cancel button instead because they were squished together."',
      badge: 'User Quote'
    }
  ]
};
