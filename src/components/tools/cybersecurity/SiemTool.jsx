// src/components/tools/cybersecurity/SiemTool.jsx
import React, { useState } from 'react';
import { 
  FileSearch, Search, Filter, AlertTriangle, ShieldAlert, 
  Terminal, ExternalLink, ChevronDown, ChevronRight, Copy, Check
} from 'lucide-react';

const RAW_LOGS = [
  {
    id: 'log-101',
    timestamp: '14:02:18.912',
    srcIp: '185.220.101.42',
    geo: 'NL (Amsterdam / Tor Node)',
    method: 'POST',
    endpoint: '/api/v1/auth/login',
    status: 401,
    severity: 'CRITICAL',
    signature: 'T1110.004 Credential Stuffing',
    payload: { user: 'admin@dayone.io', attempt_num: 842, response_time_ms: 12 },
    isMalicious: true
  },
  {
    id: 'log-102',
    timestamp: '14:02:18.919',
    srcIp: '185.220.101.88',
    geo: 'NL (Amsterdam / Tor Node)',
    method: 'POST',
    endpoint: '/api/v1/auth/login',
    status: 401,
    severity: 'CRITICAL',
    signature: 'T1110.004 Credential Stuffing',
    payload: { user: 'jordan.v@dayone.io', attempt_num: 843, response_time_ms: 11 },
    isMalicious: true
  },
  {
    id: 'log-103',
    timestamp: '14:02:19.004',
    srcIp: '192.168.10.15',
    geo: 'US (Internal Office)',
    method: 'GET',
    endpoint: '/api/v1/dashboard/metrics',
    status: 200,
    severity: 'INFO',
    signature: 'Legitimate Internal Traffic',
    payload: { user: 'ciso@dayone.io', response_time_ms: 45 },
    isMalicious: false
  },
  {
    id: 'log-104',
    timestamp: '14:02:19.120',
    srcIp: '185.220.101.19',
    geo: 'NL (Amsterdam / Tor Node)',
    method: 'POST',
    endpoint: '/api/v1/auth/login',
    status: 401,
    severity: 'CRITICAL',
    signature: 'T1110.004 Credential Stuffing',
    payload: { user: 'root', attempt_num: 844, response_time_ms: 14 },
    isMalicious: true
  },
  {
    id: 'log-105',
    timestamp: '14:02:19.245',
    srcIp: '45.154.255.88',
    geo: 'HK (Proxy Farm)',
    method: 'POST',
    endpoint: '/oauth/v2/token',
    status: 403,
    severity: 'WARNING',
    signature: 'WAF Rate Limit Triggered',
    payload: { grant_type: 'password', client_id: 'dayone-app' },
    isMalicious: true
  },
  {
    id: 'log-106',
    timestamp: '14:02:19.380',
    srcIp: '185.220.101.99',
    geo: 'NL (Amsterdam / Tor Node)',
    method: 'POST',
    endpoint: '/api/v1/auth/login',
    status: 401,
    severity: 'CRITICAL',
    signature: 'T1110.004 Credential Stuffing',
    payload: { user: 'billing@dayone.io', attempt_num: 845, response_time_ms: 12 },
    isMalicious: true
  },
  {
    id: 'log-107',
    timestamp: '14:02:19.510',
    srcIp: '172.56.21.90',
    geo: 'US (T-Mobile Mobile)',
    method: 'GET',
    endpoint: '/api/v1/products',
    status: 200,
    severity: 'INFO',
    signature: 'Legitimate Consumer',
    payload: { session_id: 'sess-84920' },
    isMalicious: false
  }
];

export default function SiemTool({ workspaceState, onQuarantineIp }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [copiedIp, setCopiedIp] = useState(null);

  const isContained = workspaceState?.threatContained;

  const filteredLogs = RAW_LOGS.filter(log => {
    // Severity filter
    if (severityFilter !== 'ALL' && log.severity !== severityFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.srcIp.toLowerCase().includes(q) ||
        log.endpoint.toLowerCase().includes(q) ||
        log.signature.toLowerCase().includes(q) ||
        String(log.status).includes(q)
      );
    }
    return true;
  });

  const toggleExpand = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const copyToClipboard = (ip) => {
    setCopiedIp(ip);
    navigator.clipboard?.writeText(ip);
    setTimeout(() => setCopiedIp(null), 1500);
  };

  return (
    <div className="siem-container">
      {/* SIEM Top Query Bar */}
      <div className="siem-header-bar">
        <div className="siem-search-wrapper">
          <Search size={15} className="search-icon" />
          <input 
            type="text"
            placeholder='Query logs: "status:401", "185.220.101.*", "/api/v1/auth"...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Severity Filter Tabs */}
        <div className="siem-filter-tabs">
          {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map(sev => (
            <button 
              key={sev}
              className={`sev-filter-btn filter-${sev.toLowerCase()} ${severityFilter === sev ? 'active' : ''}`}
              onClick={() => setSeverityFilter(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Query Stats Banner */}
      <div className="siem-stats-bar">
        <div className="flex-row items-center gap-2">
          <FileSearch size={14} className="text-accent" />
          <span className="text-xs">Index: <code>soc-gateway-access-*</code> (28,540 events/min)</span>
        </div>
        <div className="text-xs text-muted">
          Showing {filteredLogs.length} matching events {isContained && <span className="text-success font-semibold">(Firewall Filter Engaged)</span>}
        </div>
      </div>

      {/* Log Table Stream */}
      <div className="siem-log-table-wrapper">
        <table className="siem-table">
          <thead>
            <tr>
              <th style={{ width: '32px' }}></th>
              <th>Timestamp</th>
              <th>Source IP & Geo</th>
              <th>Method & Endpoint</th>
              <th>HTTP</th>
              <th>Threat Signature</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => {
              const isExpanded = expandedLogId === log.id;
              const isDropped = isContained && log.srcIp.startsWith('185.220.101');

              return (
                <React.Fragment key={log.id}>
                  <tr 
                    className={`siem-row ${log.isMalicious ? 'row-malicious' : ''} ${isDropped ? 'row-dropped' : ''}`}
                    onClick={() => toggleExpand(log.id)}
                  >
                    <td>
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </td>
                    <td className="font-mono text-xs text-muted">{log.timestamp}</td>
                    <td>
                      <div className="font-mono text-sm font-semibold">{log.srcIp}</div>
                      <div className="text-xs text-muted">{log.geo}</div>
                    </td>
                    <td>
                      <span className="font-mono text-xs">{log.method} {log.endpoint}</span>
                    </td>
                    <td>
                      <span className={`status-code-badge status-${String(log.status)[0]}xx`}>
                        {log.status}
                      </span>
                    </td>
                    <td>
                      <span className={`sig-badge sig-${log.severity.toLowerCase()}`}>
                        {log.signature}
                      </span>
                    </td>
                    <td>
                      {log.isMalicious && (
                        <button 
                          className="btn btn-secondary btn-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(log.srcIp);
                            if (onQuarantineIp) onQuarantineIp(log.srcIp);
                          }}
                          title="Copy IP for terminal quarantine command"
                        >
                          {copiedIp === log.srcIp ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                          <span>{copiedIp === log.srcIp ? 'Copied' : 'Quarantine'}</span>
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Expanded JSON details */}
                  {isExpanded && (
                    <tr className="siem-expanded-row">
                      <td colSpan={7}>
                        <div className="log-json-viewer">
                          <div className="json-title">Parsed Event Payload & IOC Metadata:</div>
                          <pre>{JSON.stringify(log, null, 2)}</pre>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
