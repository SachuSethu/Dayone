// src/components/tools/frontend/TerminalTool.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Play, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export default function TerminalTool({ workspaceState, onTestsPass, onGitCommit }) {
  const [history, setHistory] = useState([
    'dayone-fe-sandbox:~$ node -v && npm -v',
    'v20.11.1 / 10.2.4',
    'dayone-fe-sandbox:~$ git status',
    'On branch fix/prod-4092-checkout-timeout',
    'Changes not staged for commit: modified: src/services/checkoutApi.js',
    'dayone-fe-sandbox:~$ Type "npm test" to run automated Vitest assertions.'
  ]);

  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, `dayone-fe-sandbox:~$ ${cmd}`];

    if (cmd === 'clear') {
      setHistory(['dayone-fe-sandbox:~$ ']);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      newHistory.push(
        'Available commands:',
        '  npm test         - Run Vitest automated test suite',
        '  npm run dev      - Launch Vite local development server',
        '  git status       - Check current working tree branch and modified files',
        '  git commit -m    - Commit staged code fixes to current branch',
        '  curl             - Test checkout API endpoint connectivity',
        '  clear            - Clear terminal screen'
      );
    } else if (cmd === 'npm test') {
      const isPatched = workspaceState?.feCodePatched;

      if (isPatched) {
        newHistory.push(
          ' RUN  v2.1.1 /dayone/checkout-service',
          '',
          ' \x1b[32mPASS\x1b[0m  src/tests/checkoutApi.test.js',
          '  \x1b[32m✓\x1b[0m should retry 3 times on 504 Gateway Timeout (exponential backoff) (340ms)',
          '  \x1b[32m✓\x1b[0m should return clean error state without crashing React tree (42ms)',
          '  \x1b[32m✓\x1b[0m should round currency discount total to 2 decimal places (18ms)',
          '  \x1b[32m✓\x1b[0m should abort hung connections after 6000ms threshold (85ms)',
          '',
          ' \x1b[32mTest Files  1 passed (1)\x1b[0m',
          ' \x1b[32mTests       4 passed (4)\x1b[0m',
          ' Time        785ms',
          ' \x1b[32m[SUCCESS]\x1b[0m All acceptance criteria tests passing!'
        );
        if (onTestsPass) onTestsPass();
      } else {
        newHistory.push(
          ' RUN  v2.1.1 /dayone/checkout-service',
          '',
          ' \x1b[31mFAIL\x1b[0m  src/tests/checkoutApi.test.js',
          '  \x1b[31m✕\x1b[0m should retry 3 times on 504 Gateway Timeout (received Error 504 immediately without retry)',
          '  \x1b[32m✓\x1b[0m should return clean error state without crashing React tree (42ms)',
          '  \x1b[31m✕\x1b[0m should round currency discount total to 2 decimal places (expected 119.2, received 119.20000000000002)',
          '  \x1b[31m✕\x1b[0m should abort hung connections after 6000ms threshold',
          '',
          ' \x1b[31mTest Files  1 failed (1)\x1b[0m',
          ' \x1b[31mTests       3 failed, 1 passed (4 total)\x1b[0m',
          ' \x1b[33m[TIP]\x1b[0m Check src/services/checkoutApi.js: implement retry loop and Math.round.'
        );
      }
    } else if (cmd === 'npm run dev') {
      newHistory.push(
        '  VITE v5.2.0  ready in 184 ms',
        '  ➜  Local:   http://localhost:5173/',
        '  ➜  Network: http://192.168.1.42:5173/',
        '  ➜  press h + enter to show help'
      );
    } else if (cmd === 'git status') {
      newHistory.push(
        'On branch fix/prod-4092-checkout-timeout',
        'Your branch is up to date with origin/main.',
        'Changes not staged for commit:',
        '  (use "git add <file>..." to update what will be committed)',
        '        modified:   src/services/checkoutApi.js',
        '        modified:   src/components/CheckoutButton.jsx'
      );
    } else if (cmd.startsWith('git commit')) {
      newHistory.push(
        '[fix/prod-4092-checkout-timeout 9f23ac4] ' + (cmd.replace('git commit -m', '').replace(/"/g, '') || 'fix: checkout retry'),
        ' 2 files changed, 28 insertions(+), 6 deletions(-)',
        ' Commits pushed to remote branch. Ready for Pull Request review.'
      );
      if (onGitCommit) onGitCommit();
    } else if (cmd.startsWith('curl')) {
      newHistory.push(
        'HTTP/2 504 Gateway Timeout',
        'date: Thu, 24 Sep 2026 10:45:00 GMT',
        'content-type: application/json',
        '{"error": "Upstream connection timed out after 5000ms"}'
      );
    } else {
      newHistory.push(`bash: ${cmd}: command not found. Type "help" for a list of commands.`);
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
          <span>bash — dayone-fe-sandbox — 80x24</span>
        </div>
        <div className="terminal-quick-actions">
          <button 
            className="btn btn-secondary btn-xs"
            onClick={() => {
              setInputVal('npm test');
            }}
          >
            <Play size={12} />
            <span>Fill "npm test"</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="terminal-screen">
        {history.map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Bar */}
      <form className="terminal-input-form" onSubmit={handleCommand}>
        <span className="terminal-prompt">dayone-fe-sandbox:~$</span>
        <input 
          type="text"
          className="terminal-cmd-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'npm test', 'git status', 'help'..."
          autoFocus
        />
        <button type="submit" className="terminal-enter-btn">
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
