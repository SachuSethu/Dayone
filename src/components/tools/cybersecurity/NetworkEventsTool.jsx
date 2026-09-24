// src/components/tools/cybersecurity/NetworkEventsTool.jsx
import React, { useState, useEffect } from 'react';
import { 
  Activity, Shield, ShieldAlert, Globe, Server, 
  Wifi, AlertTriangle, CheckCircle2, TrendingDown, ArrowUpRight
} from 'lucide-react';

export default function NetworkEventsTool({ workspaceState }) {
  const isContained = workspaceState?.threatContained;

  // Real-time RPS telemetry simulation
  const [currentRps, setCurrentRps] = useState(isContained ? 140 : 2850);
  const [trafficBars, setTrafficBars] = useState([
    2200, 2450, 2600, 2750, 2850, 2810, 2890, 2850
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isContained) {
        // Safe baseline oscillation (130-155 RPS)
        const val = Math.floor(130 + Math.random() * 25);
        setCurrentRps(val);
        setTrafficBars(prev => [...prev.slice(1), val]);
      } else {
        // High-volume attack oscillation (2700-2950 RPS)
        const val = Math.floor(2700 + Math.random() * 250);
        setCurrentRps(val);
        setTrafficBars(prev => [...prev.slice(1), val]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isContained]);

  return (
    <div className="network-tool-container">
      {/* Network Header */}
      <div className="network-header-bar">
        <div className="flex-row items-center gap-3">
          <Activity size={18} className={isContained ? "text-success" : "text-danger animate-pulse"} />
          <div>
            <h4 className="network-title">Real-Time Ingress Telemetry & Flow Analyzer</h4>
            <span className="text-xs text-muted">Sensor: edge-gateway-apac-01 (Suricata IDS 7.0)</span>
          </div>
        </div>

        <div className="network-status-badge">
          {isContained ? (
            <div className="badge-contained">
              <CheckCircle2 size={14} />
              <span>Normal Operations (Contained)</span>
            </div>
          ) : (
            <div className="badge-under-attack">
              <AlertTriangle size={14} className="animate-spin" />
              <span>Threshold Breach (2,850 RPS)</span>
            </div>
          )}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="network-metrics-grid">
        <div className="net-metric-card">
          <div className="metric-label">Ingress Requests / Sec</div>
          <div className={`metric-val font-mono ${isContained ? 'text-success' : 'text-danger'}`}>
            {currentRps.toLocaleString()} <span className="unit">req/s</span>
          </div>
          <div className="metric-sub">
            {isContained ? (
              <span className="text-success flex-row items-center gap-1">
                <TrendingDown size={14} />
                <span>-95.1% drop from peak</span>
              </span>
            ) : (
              <span className="text-danger flex-row items-center gap-1">
                <ArrowUpRight size={14} />
                <span>+1,930% above safe baseline</span>
              </span>
            )}
          </div>
        </div>

        <div className="net-metric-card">
          <div className="metric-label">Firewall Packet Drop Rate</div>
          <div className="metric-val font-mono text-accent">
            {isContained ? '142,890' : '0'} <span className="unit">pkts/min</span>
          </div>
          <div className="metric-sub text-muted">
            {isContained ? 'iptables rule active on 185.220.101.0/24' : 'Awaiting quarantine command'}
          </div>
        </div>

        <div className="net-metric-card">
          <div className="metric-label">HTTP 401 Failure Ratio</div>
          <div className={`metric-val font-mono ${isContained ? 'text-success' : 'text-danger'}`}>
            {isContained ? '1.8%' : '94.8%'}
          </div>
          <div className="metric-sub text-muted">
            {isContained ? 'Clean auth distribution' : 'Brute-force credential stuffing'}
          </div>
        </div>
      </div>

      {/* Visual Live RPS Timeline Bar Chart */}
      <div className="traffic-chart-card">
        <div className="flex-row justify-between items-center mb-2">
          <span className="chart-title">Requests Per Second (Last 60 Seconds)</span>
          <span className="text-xs text-muted">Baseline Threshold: 200 RPS</span>
        </div>

        <div className="chart-bars-track">
          {trafficBars.map((val, i) => {
            const heightPct = Math.min(100, Math.round((val / 3200) * 100));
            const isHigh = val > 500;

            return (
              <div key={i} className="chart-bar-col">
                <div 
                  className={`chart-bar-fill ${isHigh ? 'bar-high' : 'bar-normal'}`}
                  style={{ height: `${heightPct}%` }}
                  title={`${val} RPS`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Geo-Origin & Vectors */}
      <div className="network-vectors-grid">
        <div className="vector-card">
          <h5 className="vector-card-title">Traffic Origin Breakdown</h5>
          <div className="geo-list">
            <div className="geo-row">
              <span className="geo-name">🇳🇱 Amsterdam (ASN 41378 - Tor Relays)</span>
              <span className="geo-pct font-mono text-danger">48.2%</span>
            </div>
            <div className="geo-row">
              <span className="geo-name">🇭🇰 Hong Kong (ASN 50892 - Proxy Net)</span>
              <span className="geo-pct font-mono text-warning">33.6%</span>
            </div>
            <div className="geo-row">
              <span className="geo-name">🇺🇸 United States (Legitimate Endpoints)</span>
              <span className="geo-pct font-mono text-success">18.2%</span>
            </div>
          </div>
        </div>

        <div className="vector-card">
          <h5 className="vector-card-title">Active Suricata IDS Rules</h5>
          <div className="ids-rules-list">
            <div className="ids-rule-item">
              <div className="flex-row items-center gap-2">
                <span className="sig-id font-mono">[SID:202611]</span>
                <span className="sig-name">ET BRUTE_FORCE /api/v1/auth Rapid POST</span>
              </div>
              <span className="sig-state text-danger">{isContained ? 'SUPPRESSED (FILTERED)' : 'TRIGGERING'}</span>
            </div>

            <div className="ids-rule-item">
              <div className="flex-row items-center gap-2">
                <span className="sig-id font-mono">[SID:202618]</span>
                <span className="sig-name">ET TOR Known Exit Node Traffic Inbound</span>
              </div>
              <span className="sig-state text-danger">{isContained ? 'DROPPED AT INGRESS' : 'TRIGGERING'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
