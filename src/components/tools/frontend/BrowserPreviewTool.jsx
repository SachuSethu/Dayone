// src/components/tools/frontend/BrowserPreviewTool.jsx
import React, { useState } from 'react';
import { 
  Globe, RotateCw, Smartphone, Monitor, ShieldCheck, 
  CreditCard, AlertTriangle, CheckCircle2, ChevronRight, Terminal
} from 'lucide-react';

export default function BrowserPreviewTool({ workspaceState }) {
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [promoCode, setPromoCode] = useState('DAYONE20');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([
    '[Client Hydration] React 18 mounted on #root',
    '[Analytics] checkout_viewed event fired for plan=enterprise'
  ]);

  const isPatched = workspaceState?.feCodePatched;

  // Total price calculation
  const rawPrice = 149;
  const isDiscountApplied = promoCode.toUpperCase() === 'DAYONE20';
  const displayedTotal = isDiscountApplied 
    ? (isPatched ? (rawPrice * 0.8).toFixed(2) : (rawPrice * 0.8)) // illustrates the float bug!
    : rawPrice.toFixed(2);

  const handlePay = () => {
    setIsProcessing(true);
    setPaymentResult(null);

    setConsoleLogs(prev => [
      ...prev,
      `[HTTP POST] /api/v2/checkout with payload: { amount: ${displayedTotal}, currency: 'USD' }`
    ]);

    setTimeout(() => {
      setIsProcessing(false);

      if (isPatched) {
        setPaymentResult({
          status: 'success',
          txId: 'TX-' + Math.floor(100000 + Math.random() * 900000),
          message: 'Payment Confirmed! Enterprise subscription provisioned with automatic retry resilience.'
        });
        setConsoleLogs(prev => [
          ...prev,
          '[Network] Retry attempt 1 succeeded (HTTP 200 OK)',
          '[Sentry] Zero client-side exceptions recorded'
        ]);
      } else {
        setPaymentResult({
          status: 'error',
          code: '504 GATEWAY TIMEOUT',
          message: 'Unhandled Promise Rejection: Upstream payment service timed out after 5000ms.'
        });
        setConsoleLogs(prev => [
          ...prev,
          '[HTTP 504] Gateway Timeout from /api/v2/checkout',
          '[Unhandled Exception] TypeError: Cannot read properties of undefined (reading "success")'
        ]);
      }
    }, 1800);
  };

  const handleReload = () => {
    setPaymentResult(null);
    setIsProcessing(false);
    setConsoleLogs(['[Client Hydration] Page reloaded. Cache cleared.']);
  };

  return (
    <div className="browser-tool-container">
      {/* Browser Chrome Header */}
      <div className="browser-chrome-bar">
        <div className="flex-row items-center gap-2">
          <button className="chrome-action-btn" onClick={handleReload} title="Reload Preview">
            <RotateCw size={14} />
          </button>
          <div className="browser-url-input">
            <Globe size={13} className="text-muted" />
            <span className="protocol">https://</span>
            <span className="domain">app.dayone-pay.io</span>
            <span className="path">/checkout?plan=enterprise</span>
          </div>
        </div>

        <div className="device-mode-switch">
          <button 
            className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
            onClick={() => setDeviceMode('desktop')}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>
          <button 
            className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceMode('mobile')}
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Browser Viewport Area */}
      <div className={`browser-viewport ${deviceMode === 'mobile' ? 'viewport-mobile' : 'viewport-desktop'}`}>
        <div className="web-app-frame">
          {/* App Header */}
          <div className="app-top-nav">
            <div className="brand-logo">DayOne Pay</div>
            <div className="secure-badge">
              <ShieldCheck size={14} className="text-success" />
              <span>256-Bit Encrypted</span>
            </div>
          </div>

          {/* Checkout Card */}
          <div className="checkout-card-preview">
            <h3 className="checkout-heading">Complete Your Subscription</h3>
            <p className="checkout-sub">Enterprise Plan (Annual Billing)</p>

            <div className="order-summary-box">
              <div className="order-line">
                <span>Enterprise Cloud Seat (x1)</span>
                <span>${rawPrice}.00</span>
              </div>
              {isDiscountApplied && (
                <div className="order-line text-success">
                  <span>Promo (DAYONE20 - 20% Off)</span>
                  <span>-${(rawPrice * 0.2).toFixed(2)}</span>
                </div>
              )}
              <div className="order-divider"></div>
              <div className="order-line total-line">
                <span>Total Amount Due:</span>
                <span className="total-price font-mono">
                  ${displayedTotal}
                </span>
              </div>
            </div>

            {/* Promo Input */}
            <div className="promo-input-row">
              <input 
                type="text" 
                value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Discount Code" 
              />
              <span className="promo-status-badge">Applied</span>
            </div>

            {/* Payment Button */}
            <button 
              className={`btn-pay-now ${isProcessing ? 'loading' : ''}`}
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner-sm"></span>
                  <span>Contacting Gateway...</span>
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  <span>Authorize & Pay ${displayedTotal}</span>
                </>
              )}
            </button>

            {/* Result State */}
            {paymentResult && (
              <div className={`payment-result-banner banner-${paymentResult.status}`}>
                {paymentResult.status === 'success' ? (
                  <>
                    <CheckCircle2 size={18} className="text-success" />
                    <div>
                      <strong>{paymentResult.message}</strong>
                      <div className="text-xs text-muted">Receipt Ref: {paymentResult.txId}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={18} className="text-danger" />
                    <div>
                      <strong>{paymentResult.code}</strong>
                      <div className="text-xs">{paymentResult.message}</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live Dev Console Drawer */}
        <div className="dev-console-drawer">
          <div className="console-drawer-header">
            <div className="flex-row items-center gap-1">
              <Terminal size={12} />
              <span>DevTools Console</span>
            </div>
            <span className="log-count">{consoleLogs.length} events</span>
          </div>
          <div className="console-logs-list">
            {consoleLogs.map((log, i) => (
              <div key={i} className={`console-log-row ${log.includes('504') || log.includes('Error') ? 'log-err' : ''}`}>
                <span className="console-arrow">›</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
