// src/components/tools/cybersecurity/CyberTerminalTool.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ShieldAlert, CheckCircle2, Play } from 'lucide-react';

export default function CyberTerminalTool({ workspaceState, onContainThreat }) {
  const isContained = workspaceState?.threatContained;

  const [history, setHistory] = useState([
    'soc-bastion:~$ uname -a',
    'Linux bastion-soc-02 6.1.0-21-amd64 #1 SMP Debian 6.1.90-1 x86_64 GNU/Linux',
    'soc-bastion:~$ whoami',
    'analyst-jordan [Tier 2 Incident Response]',
    'soc-bastion:~$ iptables -L INPUT -n --line-numbers',
    'Chain INPUT (policy ACCEPT)',
    'num   target     prot opt source               destination',
    '1     ACCEPT     all  --  10.0.0.0/8           0.0.0.0/0',
    '2     ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:443',
    'soc-bastion:~$ Type "help" or run "iptables -A INPUT -s 185.220.101.0/24 -j DROP" to isolate attackers.'
  ]);

  const [inputVal, setInputVal] = useState('');
  const terminalBottomRef = useRef(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, `soc-bastion:~$ ${cmd}`];

    if (cmd === 'clear') {
      setHistory(['soc-bastion:~$ ']);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      newHistory.push(
        'SOC Bastion Command Reference:',
        '  iptables -A INPUT -s <CIDR> -j DROP  - Drop all traffic from rogue IP/subnet',
        '  quarantine-ip <IP/CIDR>              - Shortcut to blacklist IP in edge firewall',
        '  iptables -L -n --line-numbers        - Inspect active firewall rules & packet drops',
        '  grep -i "401" /var/log/auth.log      - Scan local auth log for failed logins',
        '  whois <IP>                           - Look up ASN and autonomous system ownership',
        '  mitre T1110                          - Display MITRE ATT&CK definition & countermeasures',
        '  status                               - Check live attack RPS & containment status',
        '  clear                                - Clear screen'
      );
    } 
    // Containment command
    else if (
      cmd.includes('iptables') && cmd.includes('DROP') && cmd.includes('185.220.101') ||
      cmd.startsWith('quarantine-ip') && cmd.includes('185.220.101')
    ) {
      newHistory.push(
        '\x1b[32m[IPTABLES]\x1b[0m Executing kernel firewall update...',
        'Chain INPUT rule inserted: DROP all from 185.220.101.0/24 to 0.0.0.0/0',
        '\x1b[32m[SUCCESS]\x1b[0m Edge WAF synched across 42 POPs. Packets dropped: 142,890 / min.',
        '\x1b[32m[TELEMETRY]\x1b[0m Network RPS dropping to baseline (~140 req/sec). Incident contained!'
      );
      if (onContainThreat) {
        onContainThreat('185.220.101.0/24');
      }
    } 
    else if (cmd.includes('iptables -L')) {
      if (isContained) {
        newHistory.push(
          'Chain INPUT (policy ACCEPT)',
          'num   target     prot opt source               destination',
          '1     DROP       all  --  185.220.101.0/24     0.0.0.0/0           /* Quarantined Botnet */',
          '2     ACCEPT     all  --  10.0.0.0/8           0.0.0.0/0',
          '3     ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:443',
          'Chain FORWARD (policy DROP)',
          'Chain OUTPUT (policy ACCEPT)'
        );
      } else {
        newHistory.push(
          'Chain INPUT (policy ACCEPT)',
          'num   target     prot opt source               destination',
          '1     ACCEPT     all  --  10.0.0.0/8           0.0.0.0/0',
          '2     ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           tcp dpt:443',
          'Chain FORWARD (policy DROP)'
        );
      }
    }
    else if (cmd.includes('grep') && cmd.includes('401')) {
      newHistory.push(
        '[14:01:58] 185.220.101.42 - POST /api/v1/auth 401 Unauthorized user="admin"',
        '[14:02:00] 185.220.101.88 - POST /api/v1/auth 401 Unauthorized user="root"',
        '[14:02:02] 185.220.101.19 - POST /api/v1/auth 401 Unauthorized user="jordan.v"',
        '[14:02:04] 185.220.101.99 - POST /api/v1/auth 401 Unauthorized user="finance"'
      );
    }
    else if (cmd.startsWith('whois')) {
      newHistory.push(
        'inetnum:        185.220.101.0 - 185.220.101.255',
        'netname:        TOR-EXIT-NODES-APX',
        'origin:         AS41378',
        'country:        NL',
        'descr:          Public Tor Anonymity Relays / Rotating Exit Pool',
        'abuse-mailbox:  abuse@zwiebelfreunde.de'
      );
    }
    else if (cmd.includes('mitre') || cmd.includes('T1110')) {
      newHistory.push(
        'MITRE ATT&CK Technique T1110.004: Credential Stuffing',
        'Tactic: TA0006 - Credential Access',
        'Adversaries use compromised credentials (username/password lists) from previous breaches to attempt authentication.',
        'Mitigations: M1036 Multi-Factor Auth, M1037 Filter Network Traffic (WAF/iptables), M1032 Automated Account Lockout.'
      );
    }
    else if (cmd === 'status') {
      newHistory.push(
        `Containment Status: ${isContained ? '\x1b[32mCONTAINED\x1b[0m' : '\x1b[31mACTIVE ATTACK\x1b[0m'}`,
        `Current Traffic Load: ${isContained ? '140 RPS (Normal)' : '2,850 RPS (Severe Spike)'}`,
        `Dropped Packets: ${isContained ? '418,290 packets blocked' : '0 (Firewall open)'}`
      );
    }
    else {
      newHistory.push(`bash: ${cmd}: command not found. Type "help" for a list of available commands.`);
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="terminal-container">
      {/* Terminal Header */}
      <div className="terminal-header-bar">
        <div className="terminal-window-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">
          <Terminal size={14} />
          <span>soc-bastion — analyst-jordan@bastion-soc-02 — root bash</span>
        </div>
        <div className="terminal-quick-actions">
          <button 
            className="btn btn-secondary btn-xs"
            onClick={() => {
              setInputVal('iptables -A INPUT -s 185.220.101.0/24 -j DROP');
            }}
          >
            <Play size={12} />
            <span>Fill "iptables DROP"</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="terminal-screen font-mono">
        {history.map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line}
          </div>
        ))}
        <div ref={terminalBottomRef} />
      </div>

      {/* Terminal Input Bar */}
      <form className="terminal-input-form" onSubmit={handleCommand}>
        <span className="terminal-prompt">soc-bastion:~$</span>
        <input 
          type="text"
          className="terminal-cmd-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="iptables -A INPUT -s 185.220.101.0/24 -j DROP, whois, status..."
          autoFocus
        />
        <button type="submit" className="terminal-enter-btn">
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
