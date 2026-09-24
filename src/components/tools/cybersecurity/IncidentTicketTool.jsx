// src/components/tools/cybersecurity/IncidentTicketTool.jsx
import React, { useState } from 'react';
import { 
  AlertTriangle, Shield, CheckCircle2, Clock, 
  FileText, Plus, Check, ShieldAlert, ChevronRight, Hash
} from 'lucide-react';

export default function IncidentTicketTool({ workspaceState, onUpdateTicket }) {
  const isContained = workspaceState?.threatContained;

  const [triageStatus, setTriageStatus] = useState(isContained ? 'Contained' : 'Triage In Progress');
  const [checklist, setChecklist] = useState([
    { id: 'sec-c1', text: 'Identify rogue ASN / CIDR block in SIEM Log Analyzer', done: true },
    { id: 'sec-c2', text: 'Execute iptables drop rule in SOC Bastion Shell for subnet 185.220.101.0/24', done: isContained || false },
    { id: 'sec-c3', text: 'Verify Network Telemetry RPS drops from 2,850 RPS to < 200 RPS baseline', done: isContained || false },
    { id: 'sec-c4', text: 'Catalog Indicators of Compromise (IOCs) in incident ledger', done: isContained || false },
    { id: 'sec-c5', text: 'Brief CISO Marcus Reyes in #soc-war-room channel', done: false }
  ]);

  const [iocs, setIocs] = useState([
    { id: 1, type: 'IPv4 CIDR', value: '185.220.101.0/24', asn: 'ASN 41378 (Tor Exit)', status: isContained ? 'QUARANTINED' : 'ACTIVE ATTACK' },
    { id: 2, type: 'User-Agent', value: 'Mozilla/5.0 (Hydra-SecBot/v4.1)', asn: 'Custom Script', status: isContained ? 'BLOCKED' : 'ACTIVE' }
  ]);

  const [newIocInput, setNewIocInput] = useState('');

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const handleAddIoc = (e) => {
    e.preventDefault();
    if (!newIocInput.trim()) return;

    setIocs(prev => [
      ...prev,
      {
        id: Date.now(),
        type: 'IPv4 Address',
        value: newIocInput.trim(),
        asn: 'External Relay',
        status: isContained ? 'QUARANTINED' : 'FLAGGED'
      }
    ]);
    setNewIocInput('');
  };

  const doneCount = checklist.filter(c => c.done).length;
  const progressPct = Math.round((doneCount / checklist.length) * 100);

  return (
    <div className="incident-ticket-container">
      {/* Top Incident Status Banner */}
      <div className="incident-top-bar">
        <div className="incident-id-box">
          <ShieldAlert size={18} className="text-danger" />
          <span className="incident-id">INCIDENT #SEC-942</span>
          <span className="p1-tag">P1 CRITICAL</span>
        </div>

        <div className="flex-row items-center gap-2">
          <span className="text-muted text-sm">Triage Status:</span>
          <select 
            className={`triage-status-select ${isContained ? 'status-contained' : 'status-active'}`}
            value={triageStatus}
            onChange={(e) => {
              setTriageStatus(e.target.value);
              if (onUpdateTicket) onUpdateTicket(e.target.value);
            }}
          >
            <option value="Active Breach">Active Breach (Investigating)</option>
            <option value="Triage In Progress">Triage In Progress</option>
            <option value="Contained">Contained (Firewall Dropped)</option>
            <option value="Closed / Resolved">Closed / Post-Mortem</option>
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="incident-grid">
        {/* Left Column: Scope & Checklist */}
        <div className="incident-main-col">
          <div className="incident-card">
            <h3 className="incident-title">
              Distributed Credential Stuffing & Brute Force on /api/v1/auth
            </h3>
            <p className="incident-desc">
              Suricata IDS alert triggered at 13:42 UTC. Over 2,800 authentication attempts per second targeting customer accounts. 
              Attacker pool utilizing randomized user agents and rotating exit nodes in subnet <code>185.220.101.0/24</code>.
            </p>

            <div className="incident-stats-row">
              <div className="stat-pill">
                <span className="stat-k">Peak Traffic:</span>
                <span className="stat-v text-danger">2,850 RPS (Normal: 140)</span>
              </div>
              <div className="stat-pill">
                <span className="stat-k">Target URI:</span>
                <span className="stat-v text-warning">POST /api/v1/auth/login</span>
              </div>
              <div className="stat-pill">
                <span className="stat-k">401 Failure Ratio:</span>
                <span className="stat-v text-danger">94.8%</span>
              </div>
            </div>
          </div>

          {/* Containment Checklist */}
          <div className="incident-card mt-3">
            <div className="flex-row justify-between items-center mb-2">
              <h4 className="card-section-title">SOC Containment Checklist</h4>
              <span className="text-accent text-sm font-semibold">{progressPct}% Complete</span>
            </div>

            <div className="checklist-progress-bar">
              <div className="checklist-fill" style={{ width: `${progressPct}%` }} />
            </div>

            <div className="checklist-items-list">
              {checklist.map(item => (
                <div 
                  key={item.id}
                  className={`checklist-row ${item.done ? 'item-done' : ''}`}
                  onClick={() => toggleCheck(item.id)}
                >
                  <div className="checkbox-custom">
                    {item.done && <Check size={14} className="text-success" />}
                  </div>
                  <span className="item-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: IOC Ledger */}
        <div className="incident-sidebar-col">
          <div className="incident-card">
            <h4 className="card-section-title">Verified Indicators of Compromise (IOCs)</h4>
            
            <div className="ioc-table-wrapper">
              <table className="ioc-table">
                <thead>
                  <tr>
                    <th>Type / Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {iocs.map(ioc => (
                    <tr key={ioc.id}>
                      <td>
                        <div className="ioc-val font-mono">{ioc.value}</div>
                        <div className="ioc-asn">{ioc.asn}</div>
                      </td>
                      <td>
                        <span className={`ioc-status-tag ${ioc.status.includes('QUARANTINED') || ioc.status.includes('BLOCKED') ? 'tag-blocked' : 'tag-active'}`}>
                          {ioc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Add IOC */}
            <form onSubmit={handleAddIoc} className="add-ioc-form mt-3">
              <input 
                type="text"
                placeholder="Add IP or Hash (e.g. 45.154.255.88)"
                value={newIocInput}
                onChange={(e) => setNewIocInput(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary btn-xs">
                <Plus size={13} />
                <span>Add</span>
              </button>
            </form>
          </div>

          <div className="incident-card mt-3">
            <h4 className="card-section-title">Chain of Custody</h4>
            <div className="custody-row">
              <span className="text-muted text-xs">Incident Lead:</span>
              <span className="text-xs font-semibold text-white">Marcus Reyes (CISO)</span>
            </div>
            <div className="custody-row">
              <span className="text-muted text-xs">Assigned Responder:</span>
              <span className="text-xs font-semibold text-accent">Jordan Vance (You)</span>
            </div>
            <div className="custody-row">
              <span className="text-muted text-xs">Evidence Log:</span>
              <span className="text-xs font-mono text-muted">/var/log/audit/sec-942.pcap</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
