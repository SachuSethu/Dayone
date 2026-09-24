/**
 * DayOne.ai - Dynamic Task Database: Cybersecurity Tasks
 * 32 Main Tasks (8 Level 1 Foundation, 8 Level 2 Intermediate, 8 Level 3 Advanced, 8 Level 4 Critical Incident)
 * Exactly 2 Subtasks per main task = 64 subtasks total.
 * Preserves reference SEC-INC-942 (task-sec-credential-stuffing).
 */

export const CYBERSECURITY_TASKS = [
  // ==========================================
  // LEVEL 1: FOUNDATION (8 Tasks)
  // ==========================================
  {
    id: 'SEC-L1-001',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Port Scanning & Unnecessary Service Decommissioning',
    shortDescription: 'Audit exposed network surface on Linux edge server, detect unencrypted legacy services, and establish baseline firewall rules.',
    competency: 'Network Security',
    skills: ['nmap', 'port_security', 'service_hardening', 'iptables'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-001-A',
        title: 'Network Port Surface Discovery',
        description: 'Execute comprehensive TCP and UDP port scan using Nmap to inventory listening ports, identify service versions, and flag insecure cleartext protocols.',
        verificationMethod: 'Verify Nmap XML output identifying open ports 21 (FTP), 23 (Telnet), and 8080 (unauthenticated proxy).',
        deliverables: ['Network port discovery inventory', 'Vulnerability flags for cleartext daemons']
      },
      {
        id: 'SEC-L1-001-B',
        title: 'Service Termination & Ingress Filtering',
        description: 'Disable systemd services for deprecated protocols, remove legacy Telnet packages, and configure persistent iptables drop policies for unused ports.',
        verificationMethod: 'Confirm systemctl stop/disable executed on target services and iptables -L verifies default DROP policy.',
        deliverables: ['Updated iptables ruleset', 'Decommissioning change log']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-AUD-101',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'An external penetration test identified multiple legacy daemons listening on the staging edge gateway. You must audit listening sockets, decommission deprecated services, and enforce a strict firewall policy.',
      objectives: [
        'Run nmap against localhost and internal interfaces to enumerate listening ports.',
        'Stop and disable unnecessary services including vsftpd and telnetd.',
        'Configure UFW/iptables to allow only ports 22 (SSH) and 443 (HTTPS).'
      ]
    },
    evaluationCriteria: {
      discoveryThoroughness: 35,
      firewallAccuracy: 35,
      operationalSafety: 30
    }
  },
  {
    id: 'SEC-L1-002',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Weak Password Hash Audit & Policy Enforcement',
    shortDescription: 'Identify obsolete MD5/SHA-1 password hashes in authentication database and implement Argon2id hashing parameters.',
    competency: 'IAM & Access Control',
    skills: ['password_security', 'hashing', 'shadow_audit', 'argon2'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-002-A',
        title: 'Legacy Credential Hash Analysis',
        description: 'Inspect sanitized credential export to identify weak algorithms (MD5, unsalted SHA-1) and test against common wordlists to identify trivial credentials.',
        verificationMethod: 'Generate audit report identifying the count and percentage of users with sub-standard or crackable hashes.',
        deliverables: ['Hash algorithm distribution report', 'Compromised account watchlist']
      },
      {
        id: 'SEC-L1-002-B',
        title: 'Modern Key-Stretching Upgrade & MFA Policy',
        description: 'Configure PAM/auth service to use Argon2id with recommended memory and iteration cost parameters, forcing password reset on next authentication.',
        verificationMethod: 'Validate password hashing module generates $argon2id$ format hashes and flags reset requirement flag.',
        deliverables: ['Argon2id configuration file', 'Credential migration migration script']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-IAM-102',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'A legacy customer database still contains salted MD5 hashes created during early platform inception. Modernize the auth schema to Argon2id and enforce password complexity requirements.',
      objectives: [
        'Inspect the user password schema and classify hash strengths.',
        'Implement an auto-rehash on login interceptor using Argon2id.',
        'Configure policy to reject passwords under 12 characters or present in HaveIBeenPwned dictionary.'
      ]
    },
    evaluationCriteria: {
      hashIdentification: 35,
      upgradeSafety: 35,
      policyCompliance: 30
    }
  },
  {
    id: 'SEC-L1-003',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Web Application SSL/TLS Cipher Suite Hardening',
    shortDescription: 'Audit web server TLS configuration, disable obsolete SSLv3/TLS 1.0 protocols, and enforce modern ECDHE cipher suites with HSTS.',
    competency: 'Web Security',
    skills: ['tls_configuration', 'ssllabs', 'certificate_management', 'nginx_hardening'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-003-A',
        title: 'TLS Protocol & Cipher Enumeration',
        description: 'Run testssl.sh or OpenSSL s_client queries against web endpoints to identify support for deprecated SSLv3, TLS 1.0, TLS 1.1, and CBC mode ciphers.',
        verificationMethod: 'Audit log proving TLS 1.0 and weak RC4/3DES/CBC ciphers are currently accepted by reverse proxy.',
        deliverables: ['Cipher vulnerability assessment', 'Client compatibility matrix']
      },
      {
        id: 'SEC-L1-003-B',
        title: 'TLS 1.3 Transition & HSTS Deployment',
        description: 'Update Nginx configuration to mandate TLS 1.2 and TLS 1.3 with forward secrecy ciphers, configure OCSP stapling, and set Strict-Transport-Security header.',
        verificationMethod: 'Validate nginx -t passes and OpenSSL handshake confirms TLS 1.3 connection with max-age=31536000 HSTS.',
        deliverables: ['Hardened nginx.conf snippet', 'SSL verification handshake proof']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-TLS-103',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'A third-party vulnerability scan flagged support for legacy TLS 1.0 protocols on our public web app. Update our web reverse proxies to modern Mozilla intermediate/modern TLS guidelines.',
      objectives: [
        'Diagnose active TLS protocol support using OpenSSL CLI commands.',
        'Remove deprecated ciphers and enable modern elliptic curve suites.',
        'Verify zero handshake errors for supported modern browsers.'
      ]
    },
    evaluationCriteria: {
      cryptographicAccuracy: 40,
      configIntegrity: 35,
      backwardCompatibilityAwareness: 25
    }
  },
  {
    id: 'SEC-L1-004',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Endpoint EDR Agent Health & Removable Media Control',
    shortDescription: 'Query workstation fleet via osquery to locate missing EDR agent daemons and deploy USB mass-storage restriction policies.',
    competency: 'Endpoint Security',
    skills: ['edr', 'antivirus', 'osquery', 'endpoint_hardening'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-004-A',
        title: 'Fleet Osquery Telemetry Audit',
        description: 'Draft osquery SQL queries targeting the process and system services tables to identify endpoints with stalled or missing security agent processes.',
        verificationMethod: 'Osquery query correctly isolates offline hosts and returns agent version discrepancies.',
        deliverables: ['Osquery query file', 'Unprotected endpoint triage table']
      },
      {
        id: 'SEC-L1-004-B',
        title: 'USB Mass Storage Quarantine Enforcement',
        description: 'Deploy udev / kernel module blacklist rule (`install usb-storage /bin/true`) to prevent unauthorized USB flash drives on sensitive workstation terminals.',
        verificationMethod: 'Kernel module block verified via modprobe check and udevadm monitor logs.',
        deliverables: ['Udev blacklist ruleset', 'Endpoint compliance verification log']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-EDR-104',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'Internal compliance audit requires 100% EDR telemetry coverage across all staging bastion hosts and physical developer workstations. Audit endpoints and disable USB flash drives.',
      objectives: [
        'Execute osquery searches across running daemons.',
        'Restart failed agent services and register agent UUIDs.',
        'Deploy kernel configuration to disable USB storage mounts.'
      ]
    },
    evaluationCriteria: {
      queryAccuracy: 35,
      hardeningEnforcement: 35,
      troubleshootingClarity: 30
    }
  },
  {
    id: 'SEC-L1-005',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Phishing Email Header Triage & Gateway Quarantine',
    shortDescription: 'Analyze raw email RFC 822 headers, inspect SPF/DKIM/DMARC authentication failures, and extract malicious download URLs.',
    competency: 'Email Security',
    skills: ['email_security', 'spf_dkim_dmarc', 'ioc_extraction', 'email_forensics'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-005-A',
        title: 'RFC 822 Header & Authentication Parsing',
        description: 'Examine raw .eml file headers to trace Received: IP hops, evaluate SPF/DKIM alignment failures, and identify spoofed display names.',
        verificationMethod: 'Identify originating malicious server IP and pinpoint SPF softfail / DKIM signature mismatch.',
        deliverables: ['Email authentication breakdown', 'True originating IP identification']
      },
      {
        id: 'SEC-L1-005-B',
        title: 'IOC Extraction & Gateway Mail Purge',
        description: 'Extract obfuscated hyperlink URLs and SHA256 attachment hashes, and formulate email gateway block rule to quarantine related inbound messages.',
        verificationMethod: 'Mail gateway regex rule successfully captures variant phishing subjects and domains.',
        deliverables: ['Extracted IOC list', 'Mail gateway quarantine rule']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-EML-105',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'Several employees received an urgent invoice email claiming to be from the CEO with an attached Excel file containing macros. Deconstruct the email headers and quarantine the campaign.',
      objectives: [
        'Inspect raw email headers for sender forgery and authentication bypasses.',
        'Extract domains and payload hashes safely without executing attachments.',
        'Document IOCs and generate containment block rules for the email gateway.'
      ]
    },
    evaluationCriteria: {
      headerAnalysis: 40,
      iocPrecision: 35,
      containmentSpeed: 25
    }
  },
  {
    id: 'SEC-L1-006',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Linux SUID Binary & World-Writable File Audit',
    shortDescription: 'Discover dangerous SUID/SGID permissions and world-writable directories that allow unprivileged local privilege escalation.',
    competency: 'OS Hardening',
    skills: ['linux_privilege', 'suid_sgid', 'file_permissions', 'bash_scripting'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-006-A',
        title: 'SUID/SGID Permission Tree Enumeration',
        description: 'Execute deep find commands across root filesystem to isolate binaries with setuid bit set, comparing findings against standard GTFOBins exploitable binaries.',
        verificationMethod: 'Capture non-standard SUID binaries such as vim, nmap, or find with 4755 permissions.',
        deliverables: ['SUID anomaly report', 'GTFOBins risk rating matrix']
      },
      {
        id: 'SEC-L1-006-B',
        title: 'Permission Sanitization & Audit Rule Implementation',
        description: 'Strip unnecessary SUID bits with chmod u-s, correct world-writable paths in /etc, and configure auditd to log changes to root-owned system directories.',
        verificationMethod: 'Auditd rule actively alerts on permission modifications and target binaries revert to 0755.',
        deliverables: ['Remediation shell script', 'Auditd configuration rule file']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-SYS-106',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'A junior administrator configured custom backup scripts with SUID root permissions to avoid sudo prompts. Scan the Linux instance, identify vulnerable binaries, and restore least privilege.',
      objectives: [
        'Run recursive search for files with SUID/SGID bit set.',
        'Audit world-writable files in system binary and library paths.',
        'Remove dangerous execution flags and test baseline user functionality.'
      ]
    },
    evaluationCriteria: {
      enumerationSkill: 35,
      remediationThoroughness: 35,
      leastPrivilegeDiscipline: 30
    }
  },
  {
    id: 'SEC-L1-007',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Cloud Security Group Ingress Sanitization',
    shortDescription: 'Inspect AWS/cloud security group rules exposing management ports 22 and 3389 to 0.0.0.0/0 and restrict to corporate VPN subnets.',
    competency: 'Cloud Security',
    skills: ['cloud_security', 'security_groups', 'ingress_rules', 'least_privilege'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-007-A',
        title: 'Permissive Ingress Rule Detection',
        description: 'Parse cloud security group JSON configurations to detect open CIDR blocks (0.0.0.0/0, ::/0) granting access to administrative and database ports.',
        verificationMethod: 'JSON parser outputs precise security group IDs permitting unauthenticated SSH/RDP/PostgreSQL access.',
        deliverables: ['Security group risk catalog', 'Overexposed asset mapping']
      },
      {
        id: 'SEC-L1-007-B',
        title: 'CIDR Restriction & Bastion Routing',
        description: 'Replace broad CIDR blocks with corporate VPN / NAT gateway CIDRs, mandate bastion jump host routing, and verify connectivity.',
        verificationMethod: 'Cloud API calls verify security group ingress rules updated to restricted /32 and /24 CIDRs.',
        deliverables: ['Terraform/CLI remediation commands', 'Post-change network verification']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CLD-107',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'An automated security scanner flagged 14 security groups permitting SSH from any IP address on the public internet. Tighten security group ingress rules immediately.',
      objectives: [
        'Query cloud security group definitions for 0.0.0.0/0 rules.',
        'Revoke unrestricted ingress for ports 22, 3389, and 5432.',
        'Re-authorize only the verified corporate VPN egress IP.'
      ]
    },
    evaluationCriteria: {
      cloudParsingAccuracy: 35,
      remediationSpeed: 35,
      connectivityPreservation: 30
    }
  },
  {
    id: 'SEC-L1-008',
    roleId: 'cybersecurity',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'CVE Vulnerability Scan Triage & Patch Verification',
    shortDescription: 'Evaluate OpenVAS/Nessus vulnerability scan reports, filter false positives, prioritize by CISA KEV list, and verify package upgrades.',
    competency: 'Vulnerability Assessment',
    skills: ['cve_triage', 'cvss_scoring', 'patch_management', 'vulnerability_scanning'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'SEC-L1-008-A',
        title: 'CVSS & Exploitability Prioritization',
        description: 'Analyze CSV vulnerability scanner outputs, cross-referencing CVE scores with CISA Known Exploited Vulnerabilities (KEV) to determine true exploit likelihood.',
        verificationMethod: 'Prioritization matrix ranks active remote code execution vulnerabilities above non-exploitable local informational flaws.',
        deliverables: ['Prioritized remediation queue', 'False positive justification log']
      },
      {
        id: 'SEC-L1-008-B',
        title: 'Targeted Patch Application & Verification',
        description: 'Execute targeted apt/dnf package updates for vulnerable OpenSSL and glibc libraries without triggering full server reboots, verifying patched build strings.',
        verificationMethod: 'Package manager output and lsof confirm running processes now link against patched library versions.',
        deliverables: ['Package upgrade log', 'Post-patch verification status']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-VUL-108',
      incidentPriority: 'P3 - Security Hygiene Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'Monthly vulnerability scan generated 420 findings across staging servers. Filter out non-applicable findings, identify active remote CVEs, and apply targeted software patches.',
      objectives: [
        'Sort vulnerabilities by CVSS v3 score and KEV exploitation status.',
        'Update vulnerable system packages using package manager tools.',
        'Re-scan or check banner version strings to confirm remediation.'
      ]
    },
    evaluationCriteria: {
      prioritizationLogic: 40,
      patchVerification: 35,
      documentationQuality: 25
    }
  },

  // ==========================================
  // LEVEL 2: INTERMEDIATE (8 Tasks)
  // ==========================================
  {
    id: 'SEC-L2-001',
    aliasId: 'task-sec-credential-stuffing',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Distributed Credential Stuffing & Gateway Brute-Force',
    shortDescription: 'High-volume distributed POST requests targeting /api/v1/auth with 401 response spikes across foreign autonomous systems (ASNs).',
    competency: 'Incident Response',
    skills: ['siem_log_analysis', 'incident_triage', 'threat_containment', 'network_traffic'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-001-A',
        title: 'SIEM Log Querying & Malicious Cluster Isolation',
        description: 'Query Elasticsearch / SIEM log analyzer to isolate high-frequency 401 failures, cluster attacking CIDR subnets, and extract rotating User-Agent strings.',
        verificationMethod: 'SIEM query identifies top rogue ASNs (41378, 50892) and rogue IP list with attack velocity > 50 req/sec.',
        deliverables: ['Malicious IP CIDR cluster list', 'Attack velocity telemetry chart']
      },
      {
        id: 'SEC-L2-001-B',
        title: 'WAF Rate-Limiting & Bastion Firewall Containment',
        description: 'Deploy iptables drop rules and Cloudflare WAF bot-management challenge rules targeting the isolated rogue subnets and update incident IOC documentation.',
        verificationMethod: 'iptables rules drop packets from rogue CIDRs and WAF telemetry shows 401 attack volume drops to baseline < 5 req/sec.',
        deliverables: ['Firewall drop rule script', 'Incident Ticket SEC-942 IOC update']
      }
    ],
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
    },
    evaluationCriteria: {
      detectionAccuracy: 30,
      containmentSpeed: 30,
      triageReporting: 25,
      hygiene: 15
    }
  },
  {
    id: 'SEC-L2-002',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'SQL Injection Vulnerability Reproduction & Remediation',
    shortDescription: 'Reproduce union-based SQL injection vulnerability detected by DAST scanner on search parameter and refactor into parameterized queries.',
    competency: 'Application Security',
    skills: ['sqli_mitigation', 'owasp_top_10', 'parameterized_queries', 'secure_coding'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-002-A',
        title: 'Exploit Proof-of-Concept & Parameter Analysis',
        description: 'Analyze vulnerable backend handler code where user query parameter is string-interpolated into raw SQL, and craft safe PoC payload verifying the vulnerability.',
        verificationMethod: 'Document proof showing SQL syntax error or boolean condition leakage on single quote input.',
        deliverables: ['SQLi vulnerability analysis document', 'Exploit vector proof-of-concept']
      },
      {
        id: 'SEC-L2-002-B',
        title: 'Parameterized Query Refactoring & Unit Test',
        description: 'Rewrite database query using prepared statements with typed parameters and write automated security regression test attempting SQL syntax breakouts.',
        verificationMethod: 'Automated test suite executes malicious SQL payloads verifying they are treated as harmless literal strings.',
        deliverables: ['Refactored query source code', 'Security regression test file']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-APP-202',
      incidentPriority: 'P2 - Critical Vulnerability Remediation',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'A customer reporting endpoint `/api/reports/query?category=` was flagged for blind SQL injection. The backend performs raw string formatting into a PostgreSQL query.',
      objectives: [
        'Inspect the backend Node.js / Python controller code.',
        'Demonstrate the injection flaw safely in sandbox environment.',
        'Refactor the SQL call to use bind parameters and parameterized clauses.'
      ]
    },
    evaluationCriteria: {
      vulnerabilityUnderstanding: 35,
      codeRemediation: 40,
      testVerification: 25
    }
  },
  {
    id: 'SEC-L2-003',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Privilege Escalation via Sudoers Misconfiguration',
    shortDescription: 'Audit Linux /etc/sudoers file for dangerous NOPASSWD wildcard commands and tighten access according to least privilege.',
    competency: 'IAM & Access Control',
    skills: ['sudoers_hardening', 'rbac_audit', 'privilege_escalation', 'linux_security'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-003-A',
        title: 'Sudoers Privilege Abuse Path Discovery',
        description: 'Examine `sudo -l` permissions for service accounts and identify executable binaries that permit shell escapes or arbitrary file writes.',
        verificationMethod: 'Identify specific wildcard sudo command (e.g., `ALL=(ALL) NOPASSWD: /usr/bin/find`) allowing root shell spawn.',
        deliverables: ['Privilege escalation attack path mapping', 'Risk severity documentation']
      },
      {
        id: 'SEC-L2-003-B',
        title: 'Sudoers Syntax Hardening & Sudo Audit Logging',
        description: 'Edit /etc/sudoers safely using `visudo`, restrict commands to explicit arguments, and configure pam_limits and sudo logfile recording.',
        verificationMethod: '`visudo -c` succeeds and sudo execution without explicit approved flags is rejected and logged to /var/log/sudo.log.',
        deliverables: ['Sanitized sudoers configuration', 'Sudo activity audit log setup']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-IAM-203',
      incidentPriority: 'P2 - Local Privilege Risk',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'A deployment user was granted NOPASSWD access to common utilities during a crunch deployment. Restructure sudoers to enforce strict argument matching and session logging.',
      objectives: [
        'Inspect existing sudoers rules using visudo.',
        'Remove wildcards on binary paths that allow shell escapes.',
        'Verify service accounts can only run strictly whitelisted deployment scripts.'
      ]
    },
    evaluationCriteria: {
      privilegeAnalysis: 35,
      visudoHygiene: 35,
      securityLogging: 30
    }
  },
  {
    id: 'SEC-L2-004',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Internal Kerberoasting & Service Principal Name (SPN) Audit',
    shortDescription: 'Correlate Active Directory Event ID 4769 TGS ticket requests with RC4 cipher downgrade to detect Kerberoasting credential harvesting.',
    competency: 'Threat Hunting',
    skills: ['active_directory', 'kerberoasting', 'event_log_analysis', 'threat_hunting'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-004-A',
        title: 'Kerberos TGS Ticket Request Telemetry Analysis',
        description: 'Analyze Windows Security Event logs for Event ID 4769 anomalies featuring high volume of ticket requests using 0x17 (RC4) ticket encryption.',
        verificationMethod: 'Isolate user account generating anomalous TGS ticket requests targeting multiple internal service accounts.',
        deliverables: ['Kerberoasting detection query', 'Targeted SPN list']
      },
      {
        id: 'SEC-L2-004-B',
        title: 'SPN Account Hardening & AES256 Enforcement',
        description: 'Upgrade targeted service accounts to AES256 encryption, configure Group Managed Service Accounts (gMSA), and reset compromised account passwords.',
        verificationMethod: 'Validate PowerShell output confirming msDS-SupportedEncryptionTypes set to 0x18 (AES128/AES256) and RC4 disabled.',
        deliverables: ['gMSA migration plan', 'Active Directory encryption policy script']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-TH-204',
      incidentPriority: 'P2 - Internal Lateral Threat',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'SIEM detected a sudden burst of Event ID 4769 requests from an engineering workstation requesting tickets for 30 service accounts using obsolete RC4 encryption.',
      objectives: [
        'Query Windows Event logs to extract requested service principal names.',
        'Identify whether the requesting host was compromised by lateral movement tools.',
        'Enforce AES256 Kerberos ticket requirements and rotate service passwords.'
      ]
    },
    evaluationCriteria: {
      logCorrelation: 40,
      threatHuntingPrecision: 35,
      adRemediation: 25
    }
  },
  {
    id: 'SEC-L2-005',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Broken Object Level Authorization (BOLA / IDOR) Defense',
    shortDescription: 'Identify sequential integer ID vulnerabilities in `/api/invoices/{id}` allowing cross-tenant data leakage and implement tenant authorization checks.',
    competency: 'API Security',
    skills: ['idor_detection', 'api_security', 'jwt_validation', 'authorization_middleware'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-005-A',
        title: 'BOLA Exploitation Scenario Recreation',
        description: 'Inspect API endpoint logic to demonstrate that an authenticated user in Tenant A can fetch private records belonging to Tenant B by incrementing invoice IDs.',
        verificationMethod: 'Generate automated HTTP test demonstrating unauthorized HTTP 200 response with cross-tenant data.',
        deliverables: ['BOLA vulnerability report', 'Reproducible test case script']
      },
      {
        id: 'SEC-L2-005-B',
        title: 'Tenant-Scoped Middleware & UUID Migration',
        description: 'Implement authorization middleware checking JWT tenant_id against database record owner and replace sequential IDs with random UUIDv4.',
        verificationMethod: 'Test suite confirms unauthorized cross-tenant requests now return HTTP 403 Forbidden with audit security event.',
        deliverables: ['Authorization middleware code', 'Security audit log emission']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-API-205',
      incidentPriority: 'P2 - High Severity Data Exposure',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'A security bug bounty hunter demonstrated that changing the invoice ID in the URL allows viewing other companies confidential billing statements.',
      objectives: [
        'Reproduce the BOLA flaw in the API controller.',
        'Add tenant ownership validation in the data access layer.',
        'Verify that HTTP 403 Forbidden is returned and an alert is dispatched.'
      ]
    },
    evaluationCriteria: {
      exploitAnalysis: 35,
      middlewareImplementation: 40,
      testVerification: 25
    }
  },
  {
    id: 'SEC-L2-006',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Container Image CVE Remediation & Rootless Execution',
    shortDescription: 'Scan production Dockerfiles with Trivy, remediate base OS critical CVEs, and configure non-root user execution with read-only rootfs.',
    competency: 'Container Security',
    skills: ['docker_security', 'trivy_scanning', 'rootless_containers', 'container_hardening'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-006-A',
        title: 'Container Image Vulnerability Scan & Triage',
        description: 'Run Trivy scan against Node.js backend container image, filtering out unfixed CVEs and prioritizing remote execution vulnerabilities in glibc and curl.',
        verificationMethod: 'Trivy JSON output shows 0 CRITICAL CVEs remaining in staging image.',
        deliverables: ['Trivy scan vulnerability delta', 'Base image upgrade recommendation']
      },
      {
        id: 'SEC-L2-006-B',
        title: 'Dockerfile Hardening & Non-Root User Configuration',
        description: 'Refactor Dockerfile to use minimal distroless/alpine base, create unprivileged `appuser` (UID 10001), drop Linux capabilities, and mount /tmp as tmpfs.',
        verificationMethod: 'Docker container inspect confirms user is non-root and `docker run --read-only` executes successfully.',
        deliverables: ['Hardened Dockerfile', 'Runtime capability restriction profile']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CNT-206',
      incidentPriority: 'P2 - Container Compliance',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Production Kubernetes pods are currently running as root UID 0 with full filesystem write privileges. Remediate base image CVEs and enforce least-privilege container execution.',
      objectives: [
        'Scan the container image with Trivy and upgrade the base image.',
        'Add USER instruction and chown necessary directories.',
        'Test that the application still binds to unprivileged port (>1024).'
      ]
    },
    evaluationCriteria: {
      vulnerabilityRemediation: 35,
      dockerfileQuality: 40,
      containerRuntimeKnowledge: 25
    }
  },
  {
    id: 'SEC-L2-007',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Exposed S3 Bucket Remediations & API Key Revocation',
    shortDescription: 'Locate public AWS S3 bucket ACLs exposing user data, apply S3 Block Public Access, and rotate leaked credentials found in git commits.',
    competency: 'Cloud Security',
    skills: ['s3_hardening', 'secret_scanning', 'credential_rotation', 'cloud_iam'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-007-A',
        title: 'Public Storage Exposure & Git Secret Audit',
        description: 'Execute TruffleHog git commit scan to locate hardcoded AWS secret access keys and query S3 bucket policies for wildcard principal permissions.',
        verificationMethod: 'Identify exposed AWS_ACCESS_KEY_ID in commit history and public S3 bucket with Principal: "*".',
        deliverables: ['Leaked secret inventory', 'S3 policy risk assessment']
      },
      {
        id: 'SEC-L2-007-B',
        title: 'S3 Public Block Enforcement & Secret Invalidation',
        description: 'Apply AWS S3 Block Public Access at the account level, revoke compromised IAM credentials in AWS IAM, and configure KMS server-side encryption.',
        verificationMethod: 'AWS CLI commands confirm IAM key deactivated and S3 head-bucket requests from external IP return 403 Forbidden.',
        deliverables: ['IAM key deactivation log', 'Updated S3 bucket policy document']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CLD-207',
      incidentPriority: 'P2 - Active Credential Leak',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'A developer accidentally committed an AWS IAM access key to a public repository, and an asset bucket has public read ACL enabled.',
      objectives: [
        'Immediately deactivate the compromised IAM access key in IAM.',
        'Enable S3 Block Public Access on all sensitive buckets.',
        'Configure AWS KMS default encryption with SSE-KMS.'
      ]
    },
    evaluationCriteria: {
      revocationSpeed: 40,
      bucketPolicyPrecision: 35,
      incidentHygiene: 25
    }
  },
  {
    id: 'SEC-L2-008',
    roleId: 'cybersecurity',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Stored XSS Remediation & Content Security Policy (CSP)',
    shortDescription: 'Fix stored cross-site scripting flaw in user profile markdown renderer and implement strict CSP HTTP headers with script nonces.',
    competency: 'Web Security',
    skills: ['xss_defense', 'content_security_policy', 'dompurify', 'browser_security'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'SEC-L2-008-A',
        title: 'Stored XSS Payload Reproduction & DOM Analysis',
        description: 'Analyze user bio rendering component where raw HTML is injected into DOM (`dangerouslySetInnerHTML`), verifying execution of test alert script.',
        verificationMethod: 'Document proof showing script execution without user interaction upon viewing vulnerable profile view.',
        deliverables: ['Stored XSS proof-of-concept', 'DOM sinks & sources audit']
      },
      {
        id: 'SEC-L2-008-B',
        title: 'DOMPurify Sanitization & Strict CSP Deployment',
        description: 'Integrate DOMPurify to strip executable event handlers and tags, and configure Content-Security-Policy header blocking inline scripts without cryptographic nonces.',
        verificationMethod: 'Browser console proves inline malicious script is blocked by CSP and DOMPurify sanitizes `<img onerror=...>` tags.',
        deliverables: ['Sanitized component source code', 'CSP HTTP header specification']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-WEB-208',
      incidentPriority: 'P2 - Web Vulnerability',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'A user profile bio field allows injecting arbitrary JavaScript that executes whenever another employee views their profile. Sanitize the input and deploy modern CSP.',
      objectives: [
        'Reproduce the XSS vulnerability in the test environment.',
        'Sanitize Markdown HTML output using DOMPurify.',
        'Add a Content-Security-Policy HTTP header to prevent unauthorized script execution.'
      ]
    },
    evaluationCriteria: {
      reproductionAccuracy: 35,
      sanitizationQuality: 40,
      cspHeaderDesign: 25
    }
  },

  // ==========================================
  // LEVEL 3: ADVANCED (8 Tasks)
  // ==========================================
  {
    id: 'SEC-L3-001',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Advanced Persistent Threat (APT) C2 Beacon Detection',
    shortDescription: 'Analyze Zeek network connection logs and DNS telemetry for periodic jittered beaconing patterns indicative of Cobalt Strike C2 framework.',
    competency: 'Threat Hunting',
    skills: ['beacon_detection', 'dns_tunneling', 'zeek_suricata', 'threat_intelligence'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-001-A',
        title: 'Network Connection Delta & Jitter Frequency Analysis',
        description: 'Draft Python / RITA script parsing Zeek conn.log to calculate time delta variance, detecting regular heartbeat intervals with randomized jitter.',
        verificationMethod: 'Algorithm isolates external domain with connection interval distribution matching 60s +/- 15% jitter.',
        deliverables: ['C2 detection analysis script', 'Compromised internal host IP']
      },
      {
        id: 'SEC-L3-001-B',
        title: 'DNS Sinkholing & Host Network Containment',
        description: 'Configure internal DNS resolvers to sinkhole C2 domain to loopback 127.0.0.1, issue EDR host isolation command, and extract process memory dump.',
        verificationMethod: 'DNS sinkhole verified via dig test and EDR API confirms target host network connectivity severed except for SecOps gateway.',
        deliverables: ['DNS sinkhole zone configuration', 'EDR host containment confirmation']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-APT-301',
      incidentPriority: 'P1 - Active Compromise Detection',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Threat intelligence feed alerted that external IP 198.51.100.44 is an active Cobalt Strike team server. Zeek network telemetry shows outbound connections from an internal database proxy.',
      objectives: [
        'Analyze connection logs to identify beacon regularity and payload sizes.',
        'Quarantine the internal machine immediately from the corporate network.',
        'Configure DNS sinkholing to redirect malicious queries safely.'
      ]
    },
    evaluationCriteria: {
      statisticalDetection: 40,
      containmentDiscipline: 35,
      threatContextualization: 25
    }
  },
  {
    id: 'SEC-L3-002',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Ransomware Kill-Chain Disruption & Canary File Defense',
    shortDescription: 'Detect anomalous high-frequency file renaming operations, deploy canary honeypot directories, and protect volume shadow copies.',
    competency: 'Incident Response',
    skills: ['ransomware_containment', 'vss_protection', 'forensics', 'canary_tokens'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-002-A',
        title: 'High-Volume File Modification Detection Rule',
        description: 'Configure auditd / Sysmon file creation and modification triggers to detect bursts exceeding 500 file modifications/second with known extension patterns.',
        verificationMethod: 'Detection rule fires within 2 seconds of high-velocity directory traversal simulation.',
        deliverables: ['Sysmon/auditd detection configuration', 'Canary file directory layout']
      },
      {
        id: 'SEC-L3-002-B',
        title: 'Process Termination & VSS Snapshot Locking',
        description: 'Deploy automated response script that immediately kills spawning PID upon touching canary files and enforces immutable VSS / ZFS storage snapshots.',
        verificationMethod: 'Script halts test ransomware process instantaneously and restores canary state without data corruption.',
        deliverables: ['Automated kill-switch script', 'Immutable snapshot policy document']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-IR-302',
      incidentPriority: 'P1 - High Velocity Intrusion',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'A staging file server experienced a sudden flurry of .enc file modifications. Deploy active defenses to kill malicious encrypters and lock storage volumes.',
      objectives: [
        'Configure canary files with high-priority file system tripwires.',
        'Automate process tree termination when tripwires are triggered.',
        'Validate that volume shadow copies cannot be deleted by unprivileged processes.'
      ]
    },
    evaluationCriteria: {
      detectionVelocity: 40,
      containmentAutomation: 35,
      recoveryResilience: 25
    }
  },
  {
    id: 'SEC-L3-003',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'OAuth 2.0 / SAML Token Forgery & Golden SAML Mitigation',
    shortDescription: 'Investigate forged SAML assertions generated from compromised Active Directory Federation Services (ADFS) private signing key.',
    competency: 'IAM & Access Control',
    skills: ['oauth_security', 'saml_forgery', 'adfs_hardening', 'cryptographic_investigation'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-003-A',
        title: 'SAML Assertion Cryptographic Signature Validation',
        description: 'Deconstruct captured XML SAML response assertions, verify X.509 signature against known IdP certificates, and identify timestamp / issuer anomalies.',
        verificationMethod: 'Pinpoint invalid certificate thumbprint used to forge administrative SAML assertions.',
        deliverables: ['SAML assertion forensic breakdown', 'Compromised IdP signing key footprint']
      },
      {
        id: 'SEC-L3-003-B',
        title: 'Emergency IdP Certificate Rotation & Session Revocation',
        description: 'Generate fresh HSM-backed token-signing certificates, update SAML relying party metadata across SaaS apps, and revoke all active OAuth refresh tokens.',
        verificationMethod: 'All legacy token sessions invalidated and authentication fails until users re-authenticate with new IdP metadata.',
        deliverables: ['IdP metadata update manifest', 'Universal token revocation command script']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-IAM-303',
      incidentPriority: 'P1 - Identity Subversion',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Anomalous admin logins occurred from unrecognized geolocation without triggering MFA. Cryptographic examination indicates SAML token forgery using a compromised token-signing key.',
      objectives: [
        'Verify SAML response assertion signatures and detect signature mismatches.',
        'Execute emergency rotation of token-signing certificates.',
        'Force tenant-wide invalidation of active session tokens.'
      ]
    },
    evaluationCriteria: {
      samlForensics: 40,
      rotationProcedure: 35,
      tenantImpactMinimization: 25
    }
  },
  {
    id: 'SEC-L3-004',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Kubernetes Cluster RBAC Hardening & Falco Runtime Defense',
    shortDescription: 'Audit Kubernetes ClusterRoleBindings granting cluster-admin privileges to default service accounts and deploy Falco runtime syscall detection.',
    competency: 'Cloud Security',
    skills: ['kubernetes_security', 'admission_controllers', 'falco', 'rbac_hardening'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-004-A',
        title: 'Kubernetes RBAC Privilege Escalation Audit',
        description: 'Inspect cluster RBAC manifests using kubectl and audit tools to locate wildcard verbs (`*`) and default namespace service accounts with secret read access.',
        verificationMethod: 'Report isolates dangerous bindings such as system:anonymous having read access or pods with hostPath mounts.',
        deliverables: ['RBAC risk matrix', 'Remediated least-privilege RoleBindings']
      },
      {
        id: 'SEC-L3-004-B',
        title: 'Falco eBPF Kernel Rule Deployment',
        description: 'Deploy Falco daemonset with custom rules alerting on terminal spawns inside containers (`bash` in production pod) and unauthorized writes to /etc.',
        verificationMethod: 'Falco triggers JSON alert upon interactive `exec` inside nginx container and forwards to SIEM webhook.',
        deliverables: ['Falco custom rules YAML', 'Webhook notification integration']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-K8S-304',
      incidentPriority: 'P2 - Infrastructure Hardening',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Security audit revealed that several microservice pods have serviceAccountTokens mounted with wide cluster-admin read rights. Lock down RBAC and install runtime threat detection.',
      objectives: [
        'Audit RBAC bindings and disable automountServiceAccountToken where unnecessary.',
        'Deploy Falco with eBPF probe for runtime behavioral monitoring.',
        'Verify alerts on unauthorized shell creation inside running pods.'
      ]
    },
    evaluationCriteria: {
      rbacPrecision: 35,
      falcoRuleCrafting: 40,
      clusterStability: 25
    }
  },
  {
    id: 'SEC-L3-005',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Software Supply Chain & Dependency Confusion Defense',
    shortDescription: 'Detect internal proprietary package name hijacking on public npm/PyPI registries and enforce Sigstore Cosign container image signing.',
    competency: 'DevSecOps',
    skills: ['sbom_analysis', 'dependency_confusion', 'sigstore', 'supply_chain_security'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-005-A',
        title: 'Dependency Confusion Vulnerability Assessment',
        description: 'Analyze package.json and requirements.txt across build repos to identify private internal package names that are unreserved on public npm/PyPI registries.',
        verificationMethod: 'Scanner identifies 3 internal packages vulnerable to public namespace squatting.',
        deliverables: ['Dependency risk inventory', 'Namespace reservation checklist']
      },
      {
        id: 'SEC-L3-005-B',
        title: 'Scoped Registry Enforcement & Cosign Policy',
        description: 'Configure .npmrc registry scoping for internal packages and deploy Kyverno admission policy enforcing cryptographic Sigstore Cosign verification.',
        verificationMethod: 'CI/CD pipeline successfully signs image and Kubernetes admission controller rejects unsigned test container images.',
        deliverables: ['Scoped package manager configuration', 'Kyverno Cosign verification policy']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-SUP-305',
      incidentPriority: 'P2 - Supply Chain Risk',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Recent supply-chain attacks show malicious actors publishing empty public packages with company-internal names to trick build systems. Secure build configurations and enforce artifact signing.',
      objectives: [
        'Audit package manager manifests for unscoped internal library names.',
        'Configure private registry routing rules and npm organization scopes.',
        'Implement Cosign container signing in the GitHub Actions workflow.'
      ]
    },
    evaluationCriteria: {
      supplyChainRiskAudit: 35,
      signingPolicyExecution: 40,
      ciCdSafety: 25
    }
  },
  {
    id: 'SEC-L3-006',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Server-Side Request Forgery (SSRF) Cloud Metadata Defense',
    shortDescription: 'Mitigate SSRF vulnerability in webhook validator targeting AWS IMDS (169.254.169.254) and enforce IMDSv2 session token requirements.',
    competency: 'Application Security',
    skills: ['ssrf_defense', 'imds_v2', 'egress_proxy', 'network_isolation'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-006-A',
        title: 'SSRF Attack Vector Reproduction',
        description: 'Evaluate webhook dispatch service to demonstrate exploitation via DNS rebinding and IP representations (e.g., 0x7f000001, 169.254.169.254) to reach internal services.',
        verificationMethod: 'PoC verifies webhook dispatcher attempting to query cloud metadata endpoint.',
        deliverables: ['SSRF PoC technical brief', 'DNS rebinding bypass demonstration']
      },
      {
        id: 'SEC-L3-006-B',
        title: 'IP Whitelisting, Egress Proxy & IMDSv2 Enforcement',
        description: 'Implement strict IP address resolution validation rejecting RFC 1918 and link-local ranges, deploy egress proxy, and mandate IMDSv2 via AWS CLI.',
        verificationMethod: '`curl -H "X-aws-ec2-metadata-token: ..."` required for metadata access and SSRF requests to private IPs are rejected prior to HTTP socket open.',
        deliverables: ['SSRF safe URL validator code', 'EC2 IMDSv2 enforcement command script']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-APP-306',
      incidentPriority: 'P2 - Cloud Exfiltration Risk',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'A custom webhook feature allows users to provide an external URL for event callbacks. Attackers could point this to 169.254.169.254 to steal IAM role credentials.',
      objectives: [
        'Analyze URL parsing and DNS resolution in the webhook dispatcher.',
        'Add DNS resolution hook to verify IP before connection is made.',
        'Enforce IMDSv2 (HttpTokens=required) across EC2 instances.'
      ]
    },
    evaluationCriteria: {
      ssrfMitigationLogic: 40,
      cloudHardening: 35,
      dnsRebindingAwareness: 25
    }
  },
  {
    id: 'SEC-L3-007',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'WAF Rule Tuning for Zero-Day Payload Evasion',
    shortDescription: 'Analyze WAF evasion techniques utilizing nested URL encoding and Unicode normalization, and author custom regex rules to block bypass attempts.',
    competency: 'Network Security',
    skills: ['waf_tuning', 'regex_optimization', 'evasion_detection', 'modsecurity'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-007-A',
        title: 'Evasion Payload Decoding & Normalization Testing',
        description: 'Process incoming obfuscated HTTP payloads using double-encoding (%2527) and UTF-8 overlong sequences that bypass naive keyword matching.',
        verificationMethod: 'Identify specific bypass sequences evading default OWASP Core Rule Set (CRS).',
        deliverables: ['Evasion payload analysis', 'Normalization pipeline diagram']
      },
      {
        id: 'SEC-L3-007-B',
        title: 'Custom ModSecurity Rule Authoring & Performance Benchmarking',
        description: 'Author custom ModSecurity SecRule with `t:urlDecodeUni` and `t:normalizePath` transformations, verifying rule execution latency remains under 2ms.',
        verificationMethod: 'ModSecurity audit log confirms evasion payload blocked with 403 Forbidden without false positives on legitimate form submissions.',
        deliverables: ['Custom ModSecurity rule file', 'Performance benchmark report']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-WAF-307',
      incidentPriority: 'P2 - Perimeter Defense Tuning',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Attackers are using multi-byte Unicode characters and double URL encoding to slip SQL and command injection strings past the perimeter WAF.',
      objectives: [
        'Test evasion payloads against current WAF inspection engine.',
        'Configure recursive normalization transformations in SecRule definitions.',
        'Validate zero regression for international customer characters.'
      ]
    },
    evaluationCriteria: {
      wafRuleCrafting: 40,
      transformationUnderstanding: 35,
      performanceOptimization: 25
    }
  },
  {
    id: 'SEC-L3-008',
    roleId: 'cybersecurity',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Memory Forensics & Injected DLL Process Extraction',
    shortDescription: 'Analyze memory image using Volatility 3 to uncover hollowed processes, hidden code injection, and extract threat actor payload strings.',
    competency: 'Forensics',
    skills: ['volatility3', 'memory_forensics', 'rootkit_detection', 'process_injection'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'SEC-L3-008-A',
        title: 'Volatility 3 Process Tree & Malfind Analysis',
        description: 'Run Volatility 3 `windows.pslist`, `windows.pstree`, and `windows.malfind` plugins against raw memory dump to identify unlinked or memory-injected processes.',
        verificationMethod: 'Isolate PID with PAGE_EXECUTE_READWRITE permissions containing unbacked executable memory headers (MZ signature).',
        deliverables: ['Memory analysis findings report', 'Suspicious PID identification']
      },
      {
        id: 'SEC-L3-008-B',
        title: 'Payload Dumping & Static String Extraction',
        description: 'Dump injected memory segment using `windows.dumpfiles`, extract embedded strings, and calculate SHA256 / SSDEEP hashes for threat intelligence matching.',
        verificationMethod: 'Extracted payload strings reveal hardcoded C2 IP address and encoded staging script.',
        deliverables: ['Dumped binary artifact', 'IOC extraction report']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-FOR-308',
      incidentPriority: 'P2 - Deep Forensic Investigation',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'A critical server exhibited anomalous outbound connections, but standard disk scans found no malicious files. Perform volatile memory triage to extract in-memory malware.',
      objectives: [
        'Load memory image in Volatility 3.',
        'Identify process hollowing and reflective DLL injection using malfind.',
        'Dump suspicious memory sections and extract IOC strings.'
      ]
    },
    evaluationCriteria: {
      memoryForensicsExpertise: 40,
      artifactExtraction: 35,
      chainOfCustodyCare: 25
    }
  },

  // ==========================================
  // LEVEL 4: CRITICAL INCIDENT (8 Tasks)
  // ==========================================
  {
    id: 'SEC-L4-001',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Active Ransomware Outbreak & Domain Controller Eviction',
    shortDescription: 'Enterprise Active Directory domain controller compromised with active encryption propagating across hypervisors; execute KRBTGT double rotation and emergency containment.',
    competency: 'Incident Response',
    skills: ['disaster_containment', 'krbtgt_recovery', 'crisis_management', 'active_directory'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-001-A',
        title: 'Emergency Enterprise Isolation & Domain Forest Triage',
        description: 'Sever inter-VPC peering links, drop site-to-site IPsec tunnels to branch offices, and isolate primary domain controllers into quarantine VLAN.',
        verificationMethod: 'Network boundary logs verify all cross-site traffic halted within 180 seconds, stopping encryption spread.',
        deliverables: ['Emergency network severance log', 'Impacted hypervisor inventory']
      },
      {
        id: 'SEC-L4-001-B',
        title: 'KRBTGT Double Password Reset & Clean Forest Rebuild',
        description: 'Execute double KRBTGT password reset with replication interval to invalidate all Golden Tickets, and restore domain controllers from verified clean air-gapped snapshots.',
        verificationMethod: 'Active Directory authentication logs verify all legacy Kerberos tickets rejected and replication status reports healthy with new key versions.',
        deliverables: ['KRBTGT reset verification transcript', 'Domain recovery signoff document']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-401',
      incidentPriority: 'P0 - Enterprise Threat / Ransomware Outbreak',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'At 02:15, ransomware operators gained Domain Admin access and began deploying lockers via Group Policy Objects across 400 virtual machines. Contain the blast radius and purge the attacker presence.',
      objectives: [
        'Coordinate emergency network partition to prevent lateral encryption.',
        'Perform double-reset of the KRBTGT master Kerberos account.',
        'Rebuild the trust boundaries from immutable air-gapped backups.'
      ]
    },
    evaluationCriteria: {
      containmentDecisiveness: 40,
      krbtgtProcedureRigour: 35,
      crisisCommunication: 25
    }
  },
  {
    id: 'SEC-L4-002',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Zero-Day RCE in Edge Gateway & eBPF Hotpatching',
    shortDescription: 'Unauthenticated Remote Code Execution zero-day actively exploited against perimeter API gateway; reverse engineer payload and deploy kernel-level eBPF packet filter.',
    competency: 'Incident Response',
    skills: ['zero_day_triage', 'kernel_patching', 'ebpf_filtering', 'packet_analysis'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-002-A',
        title: 'Zero-Day Exploit PCAP Deconstruction',
        description: 'Examine packet capture of active exploit stream targeting port 443, reconstruct buffer overflow / format string trigger, and identify exploit signature offset.',
        verificationMethod: 'Pinpoint precise malformed header bytes and byte-pattern triggering memory corruption.',
        deliverables: ['Zero-day technical vulnerability advisory', 'Exploit byte-pattern signature']
      },
      {
        id: 'SEC-L4-002-B',
        title: 'Kernel eBPF XDP Hotpatch Deployment',
        description: 'Compile and attach an eBPF XDP program to network interface that inspects incoming TCP payloads at driver level and drops exploit packets before userland processing.',
        verificationMethod: 'XDP program drops 100% of exploit replay packets with zero CPU degradation and legitimate traffic passes unimpeded.',
        deliverables: ['eBPF XDP source code', 'Packet drop performance metrics']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-402',
      incidentPriority: 'P0 - Zero-Day RCE Active Exploitation',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'A newly disclosed zero-day in our reverse proxy software allows remote unauthenticated root code execution. The vendor has no patch available. We must deploy an inline filter.',
      objectives: [
        'Dissect the malicious payload in Wireshark / tcpdump traces.',
        'Author an eBPF filter at the XDP driver level to drop matching packets.',
        'Verify that production services stay online without restart.'
      ]
    },
    evaluationCriteria: {
      exploitAnalysisSpeed: 40,
      ebpfImplementation: 40,
      zeroDowntimePreservation: 20
    }
  },
  {
    id: 'SEC-L4-003',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Multi-Cloud Account Takeover & IAM Boundaries Quarantine',
    shortDescription: 'Compromised CI/CD deployment token used to create unauthorized AWS administrative users and spawn unauthorized GPU cryptominers across multiple regions.',
    competency: 'Cloud Security',
    skills: ['cloud_containment', 'cloudtrail_forensics', 'iam_boundary', 'incident_response'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-003-A',
        title: 'CloudTrail Multi-Region Reconnaissance Forensics',
        description: 'Query Athena CloudTrail logs to enumerate all API events initiated by the compromised token across all AWS regions, tracking created IAM roles and rogue EC2 instances.',
        verificationMethod: 'Identify all unauthorized IAM roles, persistence backdoors, and rogue EC2 instances across 5 regions.',
        deliverables: ['Adversary action timeline', 'Rogue cloud resource inventory']
      },
      {
        id: 'SEC-L4-003-B',
        title: 'Service Control Policy (SCP) Deny-All Lockdown',
        description: 'Deploy AWS Organizations Service Control Policy (SCP) denying EC2 RunInstances and IAM modifications, terminate unauthorized infrastructure, and revoke all active sessions.',
        verificationMethod: 'Rogue instances terminated and AWS CLI confirms rogue roles receive Explicit Deny on all API requests.',
        deliverables: ['Emergency SCP policy JSON', 'Automated resource eradication script']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-403',
      incidentPriority: 'P0 - Cloud Account Takeover',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'A leaked master CI token was used to establish administrative persistence and launch high-cost GPU instances in foreign AWS regions. Neutralize attacker access immediately.',
      objectives: [
        'Run CloudTrail Athena queries to map full scope of unauthorized calls.',
        'Attach organizational SCP to restrict operations across compromised accounts.',
        'Purge unauthorized IAM roles, access keys, and compute instances.'
      ]
    },
    evaluationCriteria: {
      forensicReconstruction: 35,
      containmentDecisiveness: 40,
      costMitigationSpeed: 25
    }
  },
  {
    id: 'SEC-L4-004',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Nation-State Covert DNS Data Exfiltration Triage',
    shortDescription: 'Detect covert slow-and-low DNS tunneling channel exfiltrating encrypted customer PII through randomized subdomains to foreign authoritative nameservers.',
    competency: 'Threat Hunting',
    skills: ['dns_exfiltration', 'threat_intelligence', 'counter_measures', 'entropy_analysis'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-004-A',
        title: 'High-Entropy Subdomain Statistical Detection',
        description: 'Develop Shannon entropy analysis script on recursive DNS server logs to detect anomalous query lengths (>60 chars) and high character randomness in subdomains.',
        verificationMethod: 'Algorithm flags malicious domain `*.exfil-cdn-service.com` with Shannon entropy score > 4.2.',
        deliverables: ['DNS Shannon entropy calculation script', 'Compromised internal host triage']
      },
      {
        id: 'SEC-L4-004-B',
        title: 'DNS Response Policy Zone (RPZ) Block & Law Enforcement Freeze',
        description: 'Configure BIND/Infoblox Response Policy Zone (RPZ) to return NXDOMAIN for attacker domains, isolate exfiltrating internal database, and preserve forensic disk images.',
        verificationMethod: 'DNS queries for target domains immediately dropped and dd image capture verified with cryptographic SHA256 checksums.',
        deliverables: ['RPZ configuration rule', 'Chain of custody evidence package']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-404',
      incidentPriority: 'P0 - Active Data Exfiltration',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'Internal DLP alerts triggered on anomalous DNS query volume. An adversary is using DNS TXT and A-record tunneling to bypass corporate egress firewalls and exfiltrate database records.',
      objectives: [
        'Isolate the source internal IP initiating the tunneling queries.',
        'Deploy DNS RPZ firewall rules to terminate exfiltration channel.',
        'Preserve evidentiary disk and memory snapshots according to forensic protocols.'
      ]
    },
    evaluationCriteria: {
      entropyAnalysisAccuracy: 40,
      channelInterruption: 35,
      forensicChainOfCustody: 25
    }
  },
  {
    id: 'SEC-L4-005',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Hardware Security Module (HSM) Root CA Key Compromise',
    shortDescription: 'Private key material from internal subordinate CA accessed inappropriately; execute emergency Certificate Revocation List (CRL) issuance and PKI re-keying.',
    competency: 'Cryptography',
    skills: ['pki_revocation', 'crl_ocsp', 'root_ca_rotation', 'hsm_security'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-005-A',
        title: 'Unauthorized Certificate Issuance Audit',
        description: 'Inspect CA audit logs to enumerate all digital certificates signed by compromised subordinate CA key within the last 72 hours, identifying rogue certificates.',
        verificationMethod: 'Produce complete list of rogue serial numbers issued without corresponding Jira change tickets.',
        deliverables: ['Rogue certificate serial registry', 'Cryptographic audit report']
      },
      {
        id: 'SEC-L4-005-B',
        title: 'Emergency CRL Generation & OCSP Responder Invalidation',
        description: 'Issue emergency CRL signed by offline Root CA, push CRL distribution points to enterprise endpoints, and update OCSP responders with revoked status.',
        verificationMethod: 'Client TLS handshakes against rogue certificates immediately fail with `SEC_ERROR_REVOKED_CERTIFICATE`.',
        deliverables: ['Signed emergency CRL file', 'OCSP responder update verification']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-405',
      incidentPriority: 'P0 - Root Trust Subversion',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'A security officer reported unauthorized physical and logical access to an internal PKI issuing node. We must assume the subordinate private signing key is compromised.',
      objectives: [
        'Audit all certificates signed by the compromised key.',
        'Publish emergency CRL to all distribution points and update OCSP.',
        'Generate new intermediate key pair in air-gapped HSM.'
      ]
    },
    evaluationCriteria: {
      pkiKnowledgeDepth: 40,
      revocationExecutionSpeed: 35,
      trustEcosystemRestoration: 25
    }
  },
  {
    id: 'SEC-L4-006',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Industrial SCADA / OT Boundary Breach & Modbus DPI',
    shortDescription: 'Adversary breached IT/OT DMZ firewall and is issuing unauthorized Modbus function code write commands to Programmable Logic Controllers (PLCs).',
    competency: 'Critical Infrastructure',
    skills: ['scada_security', 'modbus_dpi', 'airgap_enforcement', 'ot_incident_response'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-006-A',
        title: 'Modbus TCP Deep Packet Inspection (DPI) Triage',
        description: 'Analyze industrial network PCAP to isolate rogue IP sending Modbus Function Code 05 (Write Single Coil) and Function Code 06 (Write Single Register) to safety controllers.',
        verificationMethod: 'Isolate rogue pivot machine on the IT network issuing unauthorized coil force commands.',
        deliverables: ['Industrial protocol attack analysis', 'Targeted PLC register mapping']
      },
      {
        id: 'SEC-L4-006-B',
        title: 'OT Air-Gap Enforcement & Safety State Reset',
        description: 'Physically sever IT/OT DMZ routed interfaces, activate hardwired safety interlocks on PLCs, and deploy industrial firewall rules permitting read-only polling.',
        verificationMethod: 'Firewall rules enforce strict read-only Modbus function codes (FC 01, 03, 04) and reject all write commands.',
        deliverables: ['Industrial firewall ACL configuration', 'Safety controller validation log']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-406',
      incidentPriority: 'P0 - Physical Safety / Critical Infrastructure',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'Industrial telemetry shows unexpected valve position overrides on production pipeline controllers. Attackers have crossed the IT-OT DMZ firewall into the supervisory zone.',
      objectives: [
        'Inspect industrial network traffic using Suricata / Zeek industrial parsers.',
        'Drop unauthorized Modbus write commands immediately.',
        'Isolate the compromised IT pivot host and restore safe PLC parameters.'
      ]
    },
    evaluationCriteria: {
      icsUnderstanding: 40,
      safetyFirstDecisions: 40,
      protocolDissection: 20
    }
  },
  {
    id: 'SEC-L4-007',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Malicious Insider Mass Data Exfiltration & Audit Log Wiping',
    shortDescription: 'Privileged database administrator executing mass data dumps to external cloud storage and wiping local Linux audit logs (/var/log/audit/audit.log).',
    competency: 'Insider Threat',
    skills: ['database_activity_monitoring', 'log_integrity', 'forensics', 'insider_threat'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-007-A',
        title: 'Immutable WORM Log Reconstruction',
        description: 'Correlate centralized Write-Once-Read-Many (WORM) AWS S3 Glacier logs against wiped local host logs to reconstruct the exfiltrated database query statements and volume.',
        verificationMethod: 'Reconstruct complete sequence of `pg_dump` commands and destination IP from immutable central log stream.',
        deliverables: ['Forensic timeline of insider actions', 'Exfiltrated table inventory']
      },
      {
        id: 'SEC-L4-007-B',
        title: 'Immediate Access Revocation & Legal Evidence Freeze',
        description: 'Trigger enterprise-wide kill switch terminating user Active Directory, VPN, and database sessions, and generate cryptographically sealed forensic disk images for legal counsel.',
        verificationMethod: 'All active sessions severed within 60 seconds and digital forensics hash matching chain-of-custody documentation.',
        deliverables: ['Access revocation checklist', 'Evidentiary forensic hash certificate']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-407',
      incidentPriority: 'P0 - Privileged Insider Threat',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'A senior DBA who tendered resignation yesterday was observed running large table dumps outside business hours and attempting to shred bash histories and audit logs.',
      objectives: [
        'Reconstruct the incident using immutable remote SIEM log streams.',
        'Execute immediate credential and token deprovisioning.',
        'Package forensic evidence with verified cryptographic integrity for legal reporting.'
      ]
    },
    evaluationCriteria: {
      insiderThreatTriage: 40,
      evidencePreservation: 35,
      proceduralStrictness: 25
    }
  },
  {
    id: 'SEC-L4-008',
    roleId: 'cybersecurity',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Microarchitectural Speculative Execution Side-Channel Mitigation',
    shortDescription: 'Multi-tenant cloud hypervisor vulnerable to speculative execution cache-timing attacks (Spectre/Meltdown variant) leaking cryptographic keys across co-located tenant VMs.',
    competency: 'Hardware & Systems Security',
    skills: ['speculative_execution', 'microcode_update', 'hypervisor_security', 'cache_attacks'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'SEC-L4-008-A',
        title: 'Speculative Execution Vulnerability Characterization',
        description: 'Execute kernel vulnerability inspection tools (`spectre-meltdown-checker`) across hypervisor nodes to assess vulnerability to Branch Target Injection and L1TF.',
        verificationMethod: 'Report reveals missing IBRS / Retpoline mitigations on Intel Xeon hypervisor cluster.',
        deliverables: ['Hypervisor vulnerability audit matrix', 'Cross-VM leakage threat model']
      },
      {
        id: 'SEC-L4-008-B',
        title: 'CPU Microcode Hot-Update & Core Scheduling Deployment',
        description: 'Deploy CPU microcode firmware updates, enable Linux kernel core scheduling (`PR_SET_CORE_SCHED`), and enforce dedicated CPU pinning for sensitive cryptography workloads.',
        verificationMethod: 'Kernel flags confirm `Mitigation: Full generic retpoline, IBRS` and core scheduling isolates tenant execution threads on distinct physical cores.',
        deliverables: ['Hypervisor kernel configuration manifest', 'Core scheduling verification report']
      }
    ],
    missionDataTemplate: {
      missionCode: 'SEC-CRIT-408',
      incidentPriority: 'P0 - Hypervisor Isolation Breakdown',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'A critical vulnerability report demonstrated that a guest VM can read memory from adjacent guest VMs sharing CPU hyperthreads via speculative execution timing channels. Mitigate hypervisor risk.',
      objectives: [
        'Verify CPU speculative execution status across host nodes.',
        'Deploy kernel microcode updates and Retpoline kernel flags.',
        'Configure Linux core scheduling to prevent multi-tenant SMT co-location.'
      ]
    },
    evaluationCriteria: {
      lowLevelSecurityKnowledge: 45,
      hypervisorHardening: 35,
      performanceTradeoffAnalysis: 20
    }
  }
];
