// src/lib/pdf/pdfGenerator.js
// High-fidelity solution manual generator & printable PDF exporter for all DayOne.ai simulation tasks.

/**
 * Builds printable HTML document styled for high-resolution PDF printing
 */
export function buildPrintableTaskHTML(task) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DayOne.ai — ${task.missionCode} Solution Manual</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .header {
      border-bottom: 2px solid #0284c7;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand-title {
      font-size: 22pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .brand-title span {
      color: #0284c7;
    }
    .brand-sub {
      font-size: 9pt;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .meta-box {
      text-align: right;
      font-size: 9pt;
      color: #475569;
    }
    .meta-badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 8pt;
      margin-bottom: 4px;
    }
    .task-hero {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #0284c7;
      border-radius: 6px;
      padding: 14px 18px;
      margin-bottom: 22px;
    }
    .task-title {
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    .task-tags {
      font-size: 9pt;
      color: #475569;
      display: flex;
      gap: 12px;
    }
    .section-heading {
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
      margin: 22px 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .overview-text {
      font-size: 10.5pt;
      color: #334155;
      margin-bottom: 10px;
    }
    .root-cause-box {
      background: #fff1f2;
      border: 1px solid #fecdd3;
      border-left: 4px solid #e11d48;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 16px;
      font-size: 10pt;
    }
    .root-cause-title {
      font-weight: 800;
      color: #9f1239;
      margin-bottom: 4px;
    }
    .steps-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .step-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px 14px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .step-num-title {
      font-weight: 800;
      color: #0f172a;
      font-size: 10.5pt;
    }
    .step-tool-badge {
      background: #e2e8f0;
      color: #334155;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 8.5pt;
      font-weight: 600;
    }
    .step-action-desc {
      font-size: 10pt;
      color: #475569;
      margin: 0;
    }
    .code-container {
      margin: 12px 0;
      page-break-inside: avoid;
    }
    .code-filename {
      background: #1e293b;
      color: #94a3b8;
      font-family: monospace;
      font-size: 8.5pt;
      padding: 5px 12px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      font-weight: 700;
    }
    pre {
      background: #0f172a;
      color: #f8fafc;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      font-size: 8.5pt;
      line-height: 1.45;
      padding: 12px;
      margin: 0;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .checklist-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 4px solid #16a34a;
      border-radius: 6px;
      padding: 12px 16px;
      margin: 16px 0;
      page-break-inside: avoid;
    }
    .checklist-title {
      font-weight: 800;
      color: #14532d;
      font-size: 10.5pt;
      margin-bottom: 8px;
    }
    .check-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 9.5pt;
      color: #166534;
      margin-bottom: 4px;
    }
    .footer {
      margin-top: 30px;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-title">DayOne<span>.ai</span></div>
      <div class="brand-sub">Production Role Simulation • Official Solution Manual</div>
    </div>
    <div class="meta-box">
      <span class="meta-badge">${task.missionCode}</span>
      <div>Role: <strong>${task.roleName}</strong></div>
      <div>Priority: <strong>${task.incidentPriority}</strong></div>
    </div>
  </div>

  <div class="task-hero">
    <h1 class="task-title">${task.title}</h1>
    <div class="task-tags">
      <span><strong>Department:</strong> ${task.department}</span>
      <span>•</span>
      <span><strong>Difficulty:</strong> ${task.difficulty}</span>
      <span>•</span>
      <span><strong>Allocated Duration:</strong> ${task.estimatedTime}</span>
    </div>
  </div>

  <div class="section-heading">1. Incident Overview & Architectural Problem</div>
  <p class="overview-text">${task.problemOverview.summary}</p>

  <div class="root-cause-box">
    <div class="root-cause-title">Root Cause Analysis:</div>
    <div>${task.problemOverview.rootCause}</div>
    <div style="margin-top: 6px; font-weight: 700; color: #9f1239;">Impact Metric: ${task.problemOverview.impactMetric}</div>
  </div>

  <div class="section-heading">2. Step-by-Step Resolution Guide Path</div>
  <div class="steps-list">
    ${task.stepByStepGuide.map(s => `
      <div class="step-card">
        <div class="step-header">
          <span class="step-num-title">Step ${s.step}: ${s.title}</span>
          <span class="step-tool-badge">${s.tool}</span>
        </div>
        <p class="step-action-desc">${s.action}</p>
      </div>
    `).join('')}
  </div>

  <div class="section-heading">3. Official Production Solution Implementation</div>
  ${Object.entries(task.solutionCode).map(([filename, code]) => `
    <div class="code-container">
      <div class="code-filename">${filename}</div>
      <pre><code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>
  `).join('')}

  <div class="section-heading">4. Verification & Evaluation Scoring Criteria</div>
  <div class="checklist-box">
    <div class="checklist-title">Production Readiness Verification Checklist (100% Score):</div>
    ${task.verificationChecklist.map(c => `
      <div class="check-item">
        <span>✓</span>
        <span>${c}</span>
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <span>DayOne.ai Job-Readiness Platform — Confidential AI Evaluation Material</span>
    <span>Generated: ${new Date().toLocaleDateString()}</span>
  </div>
</body>
</html>`;
}

/**
 * Trigger print dialog directly in new window (user can "Save as PDF" instantly)
 */
export function printTaskGuidePDF(task) {
  const html = buildPrintableTaskHTML(task);
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  } else {
    // Fallback if popup blocked: trigger direct download
    downloadTaskGuideHTML(task);
  }
}

/**
 * Direct file download as HTML document (works offline with full styling)
 */
export function downloadTaskGuideHTML(task) {
  const html = buildPrintableTaskHTML(task);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `DayOne_Guide_${task.missionCode}_${task.roleId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export complete Master Guidebook covering all roles & tasks
 */
export function printAllTasksMasterGuidePDF(tasksList) {
  const fullContent = tasksList.map((task, idx) => `
    <div style="${idx > 0 ? 'page-break-before: always;' : ''}">
      ${buildPrintableTaskHTML(task).replace(/<!DOCTYPE html>[\s\S]*?<div class="header">/i, '<div class="header">').replace(/<\/body>[\s\S]*?<\/html>/i, '')}
    </div>
  `).join('');

  const masterHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DayOne.ai — Master Task & Solution Guidebook (All Roles)</title>
  <style>
    @page { size: A4; margin: 18mm 16mm 18mm 16mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; margin: 0; line-height: 1.5; font-size: 11pt; }
    .header { border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .brand-title { font-size: 22pt; font-weight: 800; color: #0f172a; }
    .brand-title span { color: #0284c7; }
    .brand-sub { font-size: 9pt; color: #64748b; font-weight: 700; text-transform: uppercase; }
    .meta-box { text-align: right; font-size: 9pt; color: #475569; }
    .meta-badge { background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 8pt; }
    .task-hero { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0284c7; border-radius: 6px; padding: 14px 18px; margin-bottom: 20px; }
    .task-title { font-size: 15pt; font-weight: 800; color: #0f172a; margin: 0 0 6px; }
    .task-tags { font-size: 9pt; color: #475569; display: flex; gap: 12px; }
    .section-heading { font-size: 12pt; font-weight: 800; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin: 20px 0 10px; text-transform: uppercase; }
    .overview-text { font-size: 10pt; color: #334155; margin-bottom: 10px; }
    .root-cause-box { background: #fff1f2; border: 1px solid #fecdd3; border-left: 4px solid #e11d48; border-radius: 6px; padding: 10px 14px; margin-bottom: 14px; font-size: 9.5pt; }
    .root-cause-title { font-weight: 800; color: #9f1239; margin-bottom: 4px; }
    .step-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 14px; margin-bottom: 8px; page-break-inside: avoid; }
    .step-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
    .step-num-title { font-weight: 800; color: #0f172a; font-size: 10pt; }
    .step-tool-badge { background: #e2e8f0; color: #334155; padding: 2px 7px; border-radius: 4px; font-size: 8pt; font-weight: 600; }
    .step-action-desc { font-size: 9.5pt; color: #475569; margin: 0; }
    .code-container { margin: 10px 0; page-break-inside: avoid; }
    .code-filename { background: #1e293b; color: #94a3b8; font-family: monospace; font-size: 8pt; padding: 4px 10px; border-top-left-radius: 6px; border-top-right-radius: 6px; font-weight: 700; }
    pre { background: #0f172a; color: #f8fafc; font-family: monospace; font-size: 8pt; line-height: 1.4; padding: 10px; margin: 0; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; white-space: pre-wrap; }
    .checklist-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 10px 14px; margin: 14px 0; page-break-inside: avoid; }
    .checklist-title { font-weight: 800; color: #14532d; font-size: 10pt; margin-bottom: 6px; }
    .check-item { display: flex; align-items: center; gap: 8px; font-size: 9pt; color: #166534; margin-bottom: 3px; }
    .footer { margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; font-size: 8pt; color: #94a3b8; }
  </style>
</head>
<body>
  ${fullContent}
</body>
</html>`;

  const printWindow = window.open('', '_blank', 'width=950,height=850');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(masterHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 450);
  }
}
