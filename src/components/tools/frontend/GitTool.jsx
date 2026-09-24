// src/components/tools/frontend/GitTool.jsx
import React, { useState } from 'react';
import { 
  GitBranch, GitCommit, GitPullRequest, Check, 
  FileDiff, CheckCircle2, ArrowRight, Shield 
} from 'lucide-react';

export default function GitTool({ workspaceState, onGitCommit }) {
  const [commitMsg, setCommitMsg] = useState('fix(checkout): add exponential backoff retry and fix currency float precision');
  const [isCommitted, setIsCommitted] = useState(workspaceState?.gitCommitted || false);

  const isPatched = workspaceState?.feCodePatched;

  const handleCommit = () => {
    setIsCommitted(true);
    if (onGitCommit) {
      onGitCommit(commitMsg);
    }
  };

  return (
    <div className="git-tool-container">
      {/* Git Header Bar */}
      <div className="git-header-bar">
        <div className="flex-row items-center gap-3">
          <div className="git-branch-badge">
            <GitBranch size={14} />
            <span>fix/prod-4092-checkout-timeout</span>
          </div>
          <span className="text-muted text-sm">Target: origin/main</span>
        </div>

        <div className="git-status-summary">
          <span className="text-accent font-semibold">1 File Changed</span>
          <span className="text-muted">· +28 / -6 lines</span>
        </div>
      </div>

      {/* Main Git Content */}
      <div className="git-grid-layout">
        {/* Left Column: Staged Files & Commit Form */}
        <div className="git-left-panel">
          <div className="git-panel-section">
            <h4 className="git-section-title">Staged Files for Commit</h4>
            <div className="staged-file-card active">
              <FileDiff size={16} className="text-accent" />
              <div className="staged-file-info">
                <span className="staged-file-path">src/services/checkoutApi.js</span>
                <span className="staged-file-status">M (Modified)</span>
              </div>
            </div>
          </div>

          <div className="git-panel-section mt-4">
            <h4 className="git-section-title">Commit & Open Pull Request</h4>
            <div className="commit-box">
              <textarea 
                className="commit-textarea"
                rows={3}
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
                placeholder="Commit message..."
                disabled={isCommitted}
              />

              <button 
                className={`btn btn-primary w-full ${isCommitted ? 'btn-success' : ''}`}
                onClick={handleCommit}
                disabled={isCommitted}
              >
                {isCommitted ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Committed & Pushed to Remote</span>
                  </>
                ) : (
                  <>
                    <GitCommit size={16} />
                    <span>Commit & Open Pull Request</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {isCommitted && (
            <div className="pr-created-card">
              <div className="flex-row items-center gap-2 text-success font-semibold mb-1">
                <GitPullRequest size={16} />
                <span>Pull Request #184 Opened</span>
              </div>
              <p className="text-xs text-muted">
                CI checks: Vitest (Passing), ESLint (Passing). Ready for review by Sarah Lin.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Visual Git Diff */}
        <div className="git-diff-viewer">
          <div className="diff-header">
            <span>Diff: src/services/checkoutApi.js</span>
            <span className="diff-stats font-mono">+28 -6</span>
          </div>

          <div className="diff-code-view">
            {isPatched ? (
              <>
                <div className="diff-line diff-del">
                  <span className="diff-marker">-</span>
                  <span>export async function submitCheckout(payload) {'{'}</span>
                </div>
                <div className="diff-line diff-del">
                  <span className="diff-marker">-</span>
                  <span>&nbsp;&nbsp;const response = await fetch('/api/v2/checkout', ...);</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>export async function submitCheckout(payload, maxRetries = 3) {'{'}</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;let attempt = 0;</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;while (attempt &lt;= maxRetries) {'{'}</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;try {'{'}</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const controller = new AbortController();</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const response = await fetch('/api/v2/checkout', {'{'} ... {'}'});</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!response.ok && response.status &gt;= 500) {'{'}</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;await new Promise(r =&gt; setTimeout(r, 400 * 2 ** attempt));</span>
                </div>
                <div className="diff-line diff-del">
                  <span className="diff-marker">-</span>
                  <span>&nbsp;&nbsp;sum = sum * 0.8; // vulnerable to float precision bug</span>
                </div>
                <div className="diff-line diff-add">
                  <span className="diff-marker">+</span>
                  <span>&nbsp;&nbsp;return Math.round((rawSum + Number.EPSILON) * 100) / 100;</span>
                </div>
              </>
            ) : (
              <div className="diff-empty-state">
                <span>No local changes staged yet. Edit code in Monaco Editor or apply the fix to inspect diffs.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
