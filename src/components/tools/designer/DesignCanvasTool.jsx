// src/components/tools/designer/DesignCanvasTool.jsx
import React, { useState } from 'react';
import { 
  Layers, Smartphone, Monitor, Eye, CheckCircle2, 
  AlertTriangle, Sliders, Sparkles, Check, ZoomIn, ZoomOut
} from 'lucide-react';

export default function DesignCanvasTool({ workspaceState, onSaveVariant }) {
  const [selectedVariant, setSelectedVariant] = useState(workspaceState?.activeLayoutVariant || 'variant_a');
  const [deviceView, setDeviceView] = useState('mobile');
  const [inspectedComponent, setInspectedComponent] = useState('cta_button');
  const [isSaved, setIsSaved] = useState(workspaceState?.activeLayoutVariant === 'variant_b');

  const isVariantB = selectedVariant === 'variant_b';

  const handleSelectVariant = (v) => {
    setSelectedVariant(v);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    if (onSaveVariant) {
      onSaveVariant(selectedVariant);
    }
  };

  return (
    <div className="design-canvas-container">
      {/* Top Toolbar */}
      <div className="canvas-toolbar">
        {/* Variant Switcher */}
        <div className="variant-switch-group">
          <button 
            className={`var-btn ${selectedVariant === 'variant_a' ? 'active' : ''}`}
            onClick={() => handleSelectVariant('variant_a')}
          >
            <span>Variant A (Current Legacy)</span>
            <span className="var-pill pill-danger">Failing WCAG</span>
          </button>

          <button 
            className={`var-btn ${selectedVariant === 'variant_b' ? 'active' : ''}`}
            onClick={() => handleSelectVariant('variant_b')}
          >
            <Sparkles size={13} className="text-warning" />
            <span>Variant B (Heuristic Redesign)</span>
            <span className="var-pill pill-success">WCAG AA Compliant</span>
          </button>
        </div>

        {/* Device Switcher */}
        <div className="device-toggle-group">
          <button 
            className={`dev-btn ${deviceView === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceView('mobile')}
          >
            <Smartphone size={14} />
            <span>Mobile (390px)</span>
          </button>
          <button 
            className={`dev-btn ${deviceView === 'desktop' ? 'active' : ''}`}
            onClick={() => setDeviceView('desktop')}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>
        </div>

        {/* Save Revision Action */}
        <button 
          className={`btn btn-sm ${isSaved ? 'btn-success' : 'btn-primary'}`}
          onClick={handleSave}
        >
          {isSaved ? (
            <>
              <Check size={14} />
              <span>Revision Saved</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={14} />
              <span>Apply & Save Variant</span>
            </>
          )}
        </button>
      </div>

      {/* Canvas Workspace Split */}
      <div className="canvas-stage-grid">
        {/* Interactive Canvas Viewport */}
        <div className="canvas-viewport-area">
          <div className={`canvas-frame ${deviceView === 'mobile' ? 'canvas-frame-mobile' : 'canvas-frame-desktop'}`}>
            
            {/* Header */}
            <div className="mock-app-header">
              <span className="mock-logo">DayOne Store</span>
              <span className="mock-cart-badge">Cart (1)</span>
            </div>

            {/* Stepper Progress */}
            <div className="canvas-stepper">
              {isVariantB ? (
                <div className="stepper-variant-b">
                  <div className="step-pill done">✓ Cart</div>
                  <div className="step-line active"></div>
                  <div className="step-pill done">✓ Shipping</div>
                  <div className="step-line active"></div>
                  <div className="step-pill active">3. Payment</div>
                </div>
              ) : (
                <div className="stepper-variant-a">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="text-muted text-xs ml-2">Step 3 of 3</span>
                </div>
              )}
            </div>

            {/* Mock Content */}
            <div className="canvas-screen-content">
              {/* Pricing Box */}
              <div 
                className={`canvas-element-box ${inspectedComponent === 'pricing' ? 'inspected' : ''}`}
                onClick={() => setInspectedComponent('pricing')}
              >
                <div className="flex-row justify-between text-xs text-muted mb-1">
                  <span>Cloud Pro Subscription</span>
                  <span>$149.00</span>
                </div>

                {isVariantB ? (
                  <>
                    <div className="flex-row justify-between text-xs text-muted mb-1">
                      <span>Standard Shipping (Tracked)</span>
                      <span className="text-success">FREE ($0.00)</span>
                    </div>
                    <div className="flex-row justify-between text-xs text-muted mb-1">
                      <span>Estimated Sales Tax (8.25%)</span>
                      <span>$12.29</span>
                    </div>
                    <div className="canvas-divider"></div>
                    <div className="flex-row justify-between text-sm font-bold text-white">
                      <span>Total Guaranteed:</span>
                      <span className="text-accent">$161.29</span>
                    </div>
                    <p className="text-xs text-success mt-1">✓ Upfront transparent pricing enabled</p>
                  </>
                ) : (
                  <>
                    <div className="canvas-divider"></div>
                    <div className="flex-row justify-between text-sm font-bold text-white">
                      <span>Subtotal:</span>
                      <span>$149.00*</span>
                    </div>
                    <p className="text-xs text-danger mt-1">
                      *Taxes and surprise $24.99 shipping added on final click without warning!
                    </p>
                  </>
                )}
              </div>

              {/* Form Input */}
              <div 
                className={`canvas-element-box mt-3 ${inspectedComponent === 'input_field' ? 'inspected' : ''}`}
                onClick={() => setInspectedComponent('input_field')}
              >
                <label className={`block text-xs mb-1 ${isVariantB ? 'font-semibold text-white' : 'text-muted'}`}>
                  Cardholder Name
                </label>
                <input 
                  type="text"
                  readOnly
                  value="Maya Stewart"
                  className={`mock-input ${isVariantB ? 'mock-input-b' : 'mock-input-a'}`}
                />
              </div>

              {/* Action Buttons */}
              <div 
                className={`canvas-element-box mt-4 ${inspectedComponent === 'cta_button' ? 'inspected' : ''}`}
                onClick={() => setInspectedComponent('cta_button')}
              >
                {isVariantB ? (
                  <div className="actions-b-row">
                    <button className="btn-cta-variant-b">
                      <span>Complete Purchase ($161.29)</span>
                      <span className="text-xs opacity-75">Instant Access</span>
                    </button>
                    <button className="btn-cancel-variant-b">
                      Return to Shipping
                    </button>
                  </div>
                ) : (
                  <div className="actions-a-cramped">
                    <button className="btn-cta-variant-a">
                      Pay
                    </button>
                    <button className="btn-cancel-variant-a">
                      Cancel
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Right Inspector Panel */}
        <div className="canvas-inspector-panel">
          <div className="inspector-header">
            <Sliders size={16} className="text-accent" />
            <span className="font-semibold">Component Token Inspector</span>
          </div>

          <div className="inspector-content">
            <div className="inspected-component-selector">
              <button 
                className={`insp-tab ${inspectedComponent === 'cta_button' ? 'active' : ''}`}
                onClick={() => setInspectedComponent('cta_button')}
              >
                CTA Buttons
              </button>
              <button 
                className={`insp-tab ${inspectedComponent === 'pricing' ? 'active' : ''}`}
                onClick={() => setInspectedComponent('pricing')}
              >
                Fee Transparency
              </button>
              <button 
                className={`insp-tab ${inspectedComponent === 'input_field' ? 'active' : ''}`}
                onClick={() => setInspectedComponent('input_field')}
              >
                Form Fields
              </button>
            </div>

            {/* Metrics Breakdown */}
            <div className="inspector-metrics-card">
              <h5 className="metric-card-title">
                {inspectedComponent === 'cta_button' && 'Call To Action (Primary / Secondary)'}
                {inspectedComponent === 'pricing' && 'Pricing Summary & Hidden Fee Audit'}
                {inspectedComponent === 'input_field' && 'Input Field Contrast & Labels'}
              </h5>

              {inspectedComponent === 'cta_button' && (
                <div className="metrics-specs-list">
                  <div className="spec-row">
                    <span className="spec-name">Touch Target Height:</span>
                    <span className={`spec-value font-mono ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? '48px (Ergonomic)' : '32px (Sub-optimal)'}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">WCAG Contrast Ratio:</span>
                    <span className={`spec-value font-mono ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? '5.8:1 (Passes AA)' : '3.1:1 (Failing AA)'}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Button Gap / Spacing:</span>
                    <span className={`spec-value font-mono ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? '16px Safety Buffer' : '4px (Rage-click hazard)'}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Heuristic Verdict:</span>
                    <span className={`spec-value ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? '✓ Error Prevention (Nielsen #5)' : '✕ High Accidental Cancel Rate'}
                    </span>
                  </div>
                </div>
              )}

              {inspectedComponent === 'pricing' && (
                <div className="metrics-specs-list">
                  <div className="spec-row">
                    <span className="spec-name">Fee Disclosure Timing:</span>
                    <span className={`spec-value ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? 'Upfront in Step 1/2' : 'Hidden until click in Step 3'}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Abandonment Projection:</span>
                    <span className={`spec-value font-mono ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? '~14.2% (Recovering +$320k MRR)' : '38.4% (Severe sticker shock)'}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Heuristic Verdict:</span>
                    <span className={`spec-value ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? '✓ System Status & Match Real World' : '✕ Violates User Trust'}
                    </span>
                  </div>
                </div>
              )}

              {inspectedComponent === 'input_field' && (
                <div className="metrics-specs-list">
                  <div className="spec-row">
                    <span className="spec-name">Label Visibility:</span>
                    <span className={`spec-value ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? 'Persistent Top Label' : 'Vanishing Light Placeholder'}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Focus State Ring:</span>
                    <span className={`spec-value font-mono ${isVariantB ? 'text-success' : 'text-danger'}`}>
                      {isVariantB ? '2px Solid Accent Ring' : 'None (Browser default)'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="designer-tip-box mt-3">
              <span className="tip-badge">Design Lead Tip</span>
              <p className="text-xs text-muted mt-1">
                "Saving Variant B satisfies the Sprint 18 acceptance criteria. You can now defend this in the AI Lead chat or submit the mission."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
