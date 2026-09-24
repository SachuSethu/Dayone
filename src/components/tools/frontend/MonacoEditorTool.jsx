// src/components/tools/frontend/MonacoEditorTool.jsx
import React, { useState } from 'react';
import { 
  FileCode, Play, Sparkles, Check, RotateCcw, 
  CheckCircle, AlertTriangle, Layers, SplitSquareVertical
} from 'lucide-react';

const INITIAL_FILES = {
  'src/services/checkoutApi.js': `// CRITICAL BUG: Unhandled rejected promises on 500/504
export async function submitCheckout(payload, maxRetries = 0) {
  // Missing timeout and retry logic
  const response = await fetch('/api/v2/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // BUG: Not checking response.ok properly
  const data = await response.json();
  return data;
}

export function calculateCartTotal(items, discountCode) {
  // BUG: Floating point precision error and missing null check
  let sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (discountCode === 'DAYONE20') {
    sum = sum * 0.8; // vulnerable to 0.79999999999
  }
  return sum;
}`,

  'src/components/CheckoutButton.jsx': `import React, { useState } from 'react';
import { submitCheckout, calculateCartTotal } from '../services/checkoutApi';

export function CheckoutButton({ cartItems, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitCheckout({ items: cartItems }, 3);
      if (result && result.success) {
        onComplete(result);
      } else {
        setError(result?.message || "Checkout could not be completed.");
      }
    } catch (err) {
      console.error("[Checkout Error]", err);
      setError("Network timeout. Automatic retries exhausted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-widget">
      <button disabled={loading} onClick={handleClick} className="pay-btn">
        {loading ? "Processing Payment..." : "Pay Now ($149.00)"}
      </button>
      {error && <p className="error-banner">{error}</p>}
    </div>
  );
}`
};

const PATCHED_API_CODE = `// PATCHED: Robust retry with exponential backoff & float precision
export async function submitCheckout(payload, maxRetries = 3) {
  let attempt = 0;
  
  while (attempt <= maxRetries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('/api/v2/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status >= 500 && attempt < maxRetries) {
          attempt++;
          await new Promise(r => setTimeout(r, 400 * Math.pow(2, attempt)));
          continue; // Retry on 5xx
        }
        throw new Error(\`Checkout API error (\${response.status})\`);
      }

      return await response.json();
    } catch (err) {
      if (attempt >= maxRetries) throw err;
      attempt++;
      await new Promise(r => setTimeout(r, 400 * Math.pow(2, attempt)));
    }
  }
}

export function calculateCartTotal(items = [], discountCode = null) {
  let rawSum = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  if (discountCode === 'DAYONE20') {
    rawSum = rawSum * 0.8;
  }
  // Safe financial precision rounding
  return Math.round((rawSum + Number.EPSILON) * 100) / 100;
}`;

export default function MonacoEditorTool({ onCodeUpdate, workspaceState }) {
  const [activeFile, setActiveFile] = useState('src/services/checkoutApi.js');
  const [fileContents, setFileContents] = useState(workspaceState?.fileContents || INITIAL_FILES);

  const currentCode = fileContents[activeFile] || '';

  const checkoutCode = fileContents['src/services/checkoutApi.js'] || '';
  const initialCheckoutNorm = INITIAL_FILES['src/services/checkoutApi.js'].replace(/\s+/g, '');
  const currentCheckoutNorm = checkoutCode.replace(/\s+/g, '');
  const isWhitespaceOnly = (initialCheckoutNorm === currentCheckoutNorm);
  const isPatched = !isWhitespaceOnly && (
    (checkoutCode.includes('while') || checkoutCode.includes('attempt') || checkoutCode.includes('maxRetries = 3')) && 
    checkoutCode.includes('catch')
  );

  const [lintStatus, setLintStatus] = useState(isPatched ? 'Passing' : 'Warnings Detected');

  const handleCodeChange = (e) => {
    const val = e.target.value;
    const updatedFiles = {
      ...fileContents,
      [activeFile]: val
    };
    setFileContents(updatedFiles);

    // Precise patch verification:
    const initialForActive = (INITIAL_FILES[activeFile] || '').replace(/\s+/g, '');
    const currentNorm = val.replace(/\s+/g, '');
    const isWhitespaceOrNoop = (initialForActive === currentNorm);

    // Requires genuine retry loop or precision rounding logic
    const hasRetry = (val.includes('while') || val.includes('attempt') || val.includes('maxRetries = 3')) && val.includes('catch');
    const hasRounding = val.includes('Math.round') && (val.includes('100') || val.includes('EPSILON'));
    const patched = !isWhitespaceOrNoop && (hasRetry || hasRounding);

    setLintStatus(patched ? 'Passing (All Linters Green)' : 'Warnings Detected');

    if (onCodeUpdate) {
      onCodeUpdate(patched, updatedFiles);
    }
  };

  const handleApplyPatch = () => {
    const updated = {
      ...fileContents,
      'src/services/checkoutApi.js': PATCHED_API_CODE
    };
    setFileContents(updated);
    setLintStatus('Passing (All Linters Green)');
    if (onCodeUpdate) {
      onCodeUpdate(true, updated);
    }
  };

  const handleResetCode = () => {
    setFileContents(INITIAL_FILES);
    setLintStatus('Warnings Detected (504 Uncaught)');
    if (onCodeUpdate) {
      onCodeUpdate(false, INITIAL_FILES);
    }
  };

  const lineCount = currentCode.split('\n').length;

  return (
    <div className="monaco-container">
      {/* File Tabs & Actions Bar */}
      <div className="monaco-header-bar">
        <div className="monaco-tabs-list">
          {Object.keys(fileContents).map(fileName => (
            <button 
              key={fileName}
              className={`monaco-tab ${activeFile === fileName ? 'active' : ''}`}
              onClick={() => setActiveFile(fileName)}
            >
              <FileCode size={14} className="tab-icon" />
              <span>{fileName.split('/').pop()}</span>
              {fileName === 'src/services/checkoutApi.js' && (
                <span className={`tab-dot ${isPatched ? 'dot-saved' : 'dot-modified'}`}></span>
              )}
            </button>
          ))}
        </div>

        <div className="monaco-tools-actions">
          <button 
            className="btn btn-secondary btn-xs"
            onClick={handleApplyPatch}
            title="Inject production-grade retry & precision solution"
          >
            <Sparkles size={13} className="text-warning" />
            <span>{isPatched ? 'Patch Active' : 'Apply Recommended Fix'}</span>
          </button>

          <button 
            className="btn btn-ghost btn-xs"
            onClick={handleResetCode}
            title="Reset file to initial bug state"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="monaco-editor-body">
        {/* Line Numbers */}
        <div className="line-numbers-gutter">
          {Array.from({ length: Math.max(lineCount, 25) }, (_, i) => (
            <div key={i} className="line-num">{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <div className="editor-textarea-wrapper">
          <textarea
            className="code-textarea"
            value={currentCode}
            onChange={handleCodeChange}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Editor Status Bar */}
      <div className="monaco-status-bar">
        <div className="status-item">
          <span className="text-muted">UTF-8</span>
          <span className="status-separator">|</span>
          <span className="text-muted">JavaScript (ES2024)</span>
          <span className="status-separator">|</span>
          <span className="text-muted">LF</span>
        </div>

        <div className="status-item">
          {isPatched ? (
            <span className="text-success flex-row items-center gap-1">
              <CheckCircle size={13} />
              <span>Retry logic & float precision OK</span>
            </span>
          ) : (
            <span className="text-warning flex-row items-center gap-1">
              <AlertTriangle size={13} />
              <span>Uncaught 504 & missing retry logic</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
