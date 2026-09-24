// src/data/tasks/uiuxTasks.js
// 32 UI/UX Designer Main Tasks (4 Levels × 8 Tasks = 32 Tasks, 64 Subtasks)

export const UIUX_TASKS = [
  // ==========================================
  // LEVEL 1: FOUNDATION (8 TASKS, 16 SUBTASKS)
  // ==========================================
  {
    id: 'UX-L1-001',
    title: 'Mobile Signup Form Tap Target & Spacing Violations',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'Duolingo / Mobile Growth Design',
    department: 'Onboarding & Growth Studio',
    domain: 'EdTech / Mobile Form Usability',
    skills: ['usability_mobile', 'interaction_design', 'wcag_accessibility', 'figma_prototyping'],
    coreCompetencies: ['mobile_ergonomics', 'tap_target_sizing', 'touch_interaction'],
    secondarySkills: ['thumb_zone_mapping', 'spacing_scales'],
    skillTags: ['mobile_ux', 'tap_targets', 'wcag', 'spacing', 'onboarding'],
    situation: 'User session recordings reveal that 48% of mobile learners accidentally tap the wrong input field or "Terms of Service" link when trying to submit the signup form, causing frustration and rage clicks.',
    problem: 'Input fields and buttons have touch target heights of 32px (violating WCAG 2.1 AA requirement of minimum 44x44px), and the primary CTA sits in the "Hard to Reach" top thumb zone on modern smartphones.',
    mission: 'Redesign the mobile signup layout in Figma / Design Canvas: expand all interactive targets to minimum 48px, re-position the primary CTA to the bottom natural thumb zone, and verify touch ergonomics.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback'],
      environment: { designSystem: 'Orbit UI v3.2 / 8pt Fluid Grid' }
    },
    availableEvidence: [
      'Heatmap report: High cluster of mis-taps around dense link clusters',
      'Rage click analytics: 3.4 rage clicks per mobile signup attempt'
    ],
    subtasks: [
      {
        id: 'UX-L1-001-S1',
        title: 'Analyze Mobile Touch Heatmaps & Ergonomic Zones',
        objective: 'Inspect user feedback heatmaps and identify tap target collisions.',
        instructions: 'Open User Feedback Tool, review mobile tap heatmaps, and measure touch target dimensions against the 44px standard.',
        expectedActions: ['Review mobile tap heatmap in User Feedback Tool', 'Measure 32px input height violation and 6px gap violation'],
        successCriteria: ['Identified undersized tap targets causing accidental clicks', 'Mapped primary CTA outside natural thumb reach zone'],
        evaluationCriteria: { ergonomicAnalysis: 50, diagnosticClarity: 50 }
      },
      {
        id: 'UX-L1-001-S2',
        title: 'Configure 48px Tap Targets & Bottom Sticky CTA Layout',
        objective: 'Redesign signup canvas with 48px input heights, 16px vertical gutters, and sticky bottom CTA.',
        instructions: 'Switch to Design Canvas, apply 48px touch targets, reposition button to bottom natural thumb zone, and save layout variant.',
        expectedActions: ['Update button and input heights to 48px', 'Apply 16px minimum touch target spacing', 'Position primary CTA at bottom sticky viewport anchor', 'Save layout variant in Design Canvas'],
        successCriteria: ['All interactive touch targets meet or exceed 48x48px', 'Primary CTA within easy reach of one-handed thumb grip'],
        evaluationCriteria: { layoutExecution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Sticky bottom button vs inline form button', 'Label inside input (floating) vs persistent label above input'],
    pressureEvents: ['Product Manager: Mobile signup completion dropped by 18% this sprint'],
    expectedSolution: 'Expand input heights to 48px; increase vertical spacing to 16px; anchor primary CTA to bottom mobile thumb zone.',
    acceptableApproaches: ['Mobile-first thumb zone layout restructuring', 'Bottom sheet signup modal with large touch affordances'],
    failureConditions: ['Touch targets remain below 44px', 'Sticky CTA obscures input fields when mobile keyboard opens'],
    finalDeliverable: 'Accessible mobile signup layout variant meeting WCAG 2.1 AA touch standards.',
    evaluationCriteria: { mobileErgonomics: 40, complianceRigor: 30, testValidation: 30 },
    workplaceContext: 'Mobile Onboarding Ergonomics & Tap Target Compliance',
    taskType: 'mobile_ergonomics'
  },

  {
    id: 'UX-L1-002',
    title: 'WCAG 2.1 AA Color Contrast & Visual Hierarchy Audit',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'Healthcare.gov / Digital Accessibility Office',
    department: 'Inclusive Design & Standards',
    domain: 'Public Health / Accessible User Interfaces',
    skills: ['accessibility_wcag', 'color_theory', 'visual_hierarchy', 'design_systems'],
    coreCompetencies: ['color_contrast_compliance', 'visual_hierarchy', 'inclusive_design'],
    secondarySkills: ['token_systems', 'typography_scale'],
    skillTags: ['wcag', 'color_contrast', 'accessibility', 'a11y', 'tokens'],
    situation: 'Elderly citizens and low-vision users report that instructions on the prescription refill form are completely unreadable in daylight, leading to a 34% abandonment rate.',
    problem: 'Placeholder text and error messages use light gray (#94A3B8 on #FFFFFF, contrast ratio 2.4:1) and secondary buttons use low-contrast blue (#60A5FA on #FFFFFF, contrast ratio 2.9:1), failing WCAG 2.1 AA 4.5:1 requirement.',
    mission: 'Audit the prescription refill interface using contrast analyzers, update color token palette to meet strict 4.5:1 contrast for normal text and 3:1 for graphical controls, and maintain clear visual hierarchy.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { standard: 'WCAG 2.1 Level AA (4.5:1 text, 3:1 UI controls)' }
    },
    availableEvidence: [
      'Accessibility audit report: 14 color contrast failures across form inputs and error messages',
      'Citizen feedback: "The gray instructions are impossible to read on my tablet in bright light"'
    ],
    subtasks: [
      {
        id: 'UX-L1-002-S1',
        title: 'Audit Color Contrast Ratios Across Form Tokens',
        objective: 'Analyze foreground/background hex codes and calculate contrast ratios.',
        instructions: 'Open Research Notes Tool, review color contrast audit table, and identify tokens failing the 4.5:1 threshold.',
        expectedActions: ['Inspect color tokens in Research Notes', 'Calculate contrast ratios for #94A3B8 and #60A5FA', 'Document 14 failing elements'],
        successCriteria: ['Identified all 14 contrast violations', 'Documented required target ratios (4.5:1 normal, 3:1 large text)'],
        evaluationCriteria: { auditAccuracy: 50, standardsComprehension: 50 }
      },
      {
        id: 'UX-L1-002-S2',
        title: 'Update Token Palette & Validate Inclusive Hierarchy',
        objective: 'Remediate color tokens to #475569 (5.8:1) and #2563EB (5.1:1) in Design Canvas.',
        instructions: 'Open Design Canvas, apply accessible color palette tokens, verify readable visual hierarchy, and save accessible variant.',
        expectedActions: ['Update text token to Slate-700 (#334155, 9.6:1)', 'Update error banner to Crimson-700 (#B91C1C, 5.2:1)', 'Update secondary button to Blue-700 (#1D4ED8, 6.2:1)', 'Save compliant variant'],
        successCriteria: ['100% of text elements achieve >= 4.5:1 contrast ratio', 'Interface maintains clear visual hierarchy without harsh clashing colors'],
        evaluationCriteria: { designSystemExecution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['High-contrast theme toggle vs updating primary design system defaults', 'Underline links vs relying solely on color distinctions'],
    pressureEvents: ['Government compliance review: Federal audit inspection deadline in 4 hours'],
    expectedSolution: 'Darken secondary text to #334155 (9.6:1); darken error text to #B91C1C (5.2:1); add persistent visible focus rings and input borders.',
    acceptableApproaches: ['Remediating core design system color tokens', 'Creating accessible high-contrast variant layer'],
    failureConditions: ['Text contrast remains below 4.5:1', 'Error states communicated purely via color without icons or text'],
    finalDeliverable: 'WCAG 2.1 AA certified prescription refill layout with documented color contrast matrix.',
    evaluationCriteria: { wcagCompliance: 40, aestheticHygiene: 30, testValidation: 30 },
    workplaceContext: 'Federal Accessibility & Inclusive Design Remediation',
    taskType: 'accessibility'
  },

  {
    id: 'UX-L1-003',
    title: 'E-Commerce Product Card Information Architecture & Scanability',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'ASOS / Catalog Browsing Experience',
    department: 'Catalog Experience & Search UI',
    domain: 'Fashion E-Commerce / Grid Layouts',
    skills: ['information_hierarchy', 'visual_design', 'typography_scale', 'interaction_design'],
    coreCompetencies: ['information_architecture', 'catalog_scanability', 'typography'],
    secondarySkills: ['badge_placement', 'card_components'],
    skillTags: ['product_card', 'typography', 'visual_hierarchy', 'scanability', 'ecommerce'],
    situation: 'Shoppers report that the product catalog grid feels cluttered and overwhelming; click-through rate from catalog to product detail pages has dropped by 18%.',
    problem: 'Product cards cram 8 competing visual elements (brand, title, discount badge, star ratings, review count, color swatches, stock alert, wishlist icon) into a 220px card without a clear focal point.',
    mission: 'Restructure product card information hierarchy: establish clear typographic scale (Brand $\\rightarrow$ Title $\\rightarrow$ Price), reduce visual clutter, and prioritize the primary image and price focal points.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback'],
      environment: { framework: 'Orbit UI Card Matrix' }
    },
    availableEvidence: [
      'Eye-tracking study: Users fixate on flashing discount badges and miss the product title completely',
      'User feedback: "There are so many badges and stars on every shoe that I can\'t compare prices"'
    ],
    subtasks: [
      {
        id: 'UX-L1-003-S1',
        title: 'Conduct Visual Clutter & Eye-Tracking Analysis',
        objective: 'Analyze current product card layout and document competing focal points.',
        instructions: 'Open User Feedback Tool, review eye-tracking heatmaps on the product grid, and list all 8 card elements.',
        expectedActions: ['Inspect product card visual hierarchy in User Feedback Tool', 'Identify badge overload and lack of typographic scale'],
        successCriteria: ['Mapped 8 competing visual elements', 'Identified primary shopper goal: Price and Title comparison'],
        evaluationCriteria: { visualAudit: 50, userInsights: 50 }
      },
      {
        id: 'UX-L1-003-S2',
        title: 'Redesign Scannable Product Card with Refined Typography',
        objective: 'Reorganize card layout: Clean photo -> Subtle brand label -> 1-line title -> Prominent price and swatches.',
        instructions: 'Open Design Canvas, apply 3-tier typographic hierarchy, simplify badges to a single floating chip, and save clean variant.',
        expectedActions: ['Clean up image container with 3:4 aspect ratio', 'Apply bold 18px price and subtle 12px brand category', 'Consolidate review stars into compact rating pill', 'Save Variant B in Design Canvas'],
        successCriteria: ['Shoppers can scan 12 cards in < 5 seconds', 'Clear visual anchor on product image and price'],
        evaluationCriteria: { layoutElegance: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Hover-activated quick view vs persistent button', 'Color swatches on card vs on detail page only'],
    pressureEvents: ['Head of Merchandising: Autumn fashion launch starts this Friday; catalog must look premium'],
    expectedSolution: 'Establish hierarchy: Large clean image -> Brand name (12px uppercase) -> Product name (14px medium) -> Price (16px bold); declutter secondary badges.',
    acceptableApproaches: ['Minimalist Scandinavian catalog layout', 'Progressive disclosure on card hover'],
    failureConditions: ['Card title truncated to less than 15 characters', 'Price obscured by promotional stickers'],
    finalDeliverable: 'High-converting, scannable product card component with documented typography scale.',
    evaluationCriteria: { aestheticClarity: 40, informationHierarchy: 30, testValidation: 30 },
    workplaceContext: 'High-Volume E-Commerce Catalog Scanability',
    taskType: 'catalog_design'
  },

  {
    id: 'UX-L1-004',
    title: 'Zero-Data Empty States & First-Time Onboarding Microcopy',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'Dropbox / Web Workspace',
    department: 'Product Growth & Activation',
    domain: 'Cloud Productivity / First-Run UX',
    skills: ['ux_writing', 'empty_states', 'user_activation', 'onboarding'],
    coreCompetencies: ['empty_state_design', 'microcopy_craft', 'user_activation'],
    secondarySkills: ['illustration_guidance', 'call_to_action'],
    skillTags: ['empty_state', 'ux_writing', 'onboarding', 'activation', 'microcopy'],
    situation: 'Newly registered users who create a team workspace land on a completely blank white screen with the single word "No files found", resulting in 58% of new signups never uploading their first file (Day 1 Churn).',
    problem: 'Empty states are treated as null error conditions instead of onboarding opportunities; the screen lacks an inviting illustration, clear instructional microcopy, or an obvious primary "Upload File" call to action.',
    mission: 'Design an engaging zero-data empty state: author welcoming, actionable microcopy, integrate a contextual illustration, and provide a prominent drag-and-drop target to drive first-time activation.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { targetMetric: 'Day-1 File Upload Activation Rate' }
    },
    availableEvidence: [
      'Mixpanel activation metric: 58% of new users leave workspace within 40 seconds of seeing blank screen',
      'User interview note: "I logged in and saw \'No files found\'. I thought the account creation was broken."'
    ],
    subtasks: [
      {
        id: 'UX-L1-004-S1',
        title: 'Evaluate Activation Drop-Off & Microcopy Tone',
        objective: 'Review user churn telemetry and analyze current cold, clinical empty state text.',
        instructions: 'Open Research Notes Tool, examine Day-1 user churn funnel, and critique "No files found" copy.',
        expectedActions: ['Review user activation funnel in Research Notes', 'Identify cold/negative tone in existing message'],
        successCriteria: ['Quantified 58% activation drop-off', 'Identified missing action affordance for new users'],
        evaluationCriteria: { critiqueDepth: 50, activationInsight: 50 }
      },
      {
        id: 'UX-L1-004-S2',
        title: 'Design Engaging Empty State with Actionable CTA',
        objective: 'Create welcoming empty state with friendly headline, benefit-driven subcopy, and drag-and-drop dropzone.',
        instructions: 'Open Design Canvas, insert friendly folder illustration, add headline "Your team\'s creative hub starts here", and provide big "Upload First File" CTA.',
        expectedActions: ['Design centered empty state layout in Design Canvas', 'Write clear copy: "Upload photos, documents, and videos to collaborate with your team"', 'Add prominent primary CTA "Upload Files" with drag-and-drop zone', 'Save activated variant'],
        successCriteria: ['Empty state clearly guides user to upload first file', 'Friendly, encouraging tone replaces clinical error copy'],
        evaluationCriteria: { copyQuality: 50, visualComposition: 50 }
      }
    ],
    decisionPoints: ['Interactive drag-and-drop dropzone vs standard button CTA', 'Template starter files vs empty canvas with prompt'],
    pressureEvents: ['Growth Sprint Goal: Increase Day-1 activation by 15% before investor quarterly report'],
    expectedSolution: 'Center-aligned layout: Friendly illustration -> "Store, sync, and share your team\'s work" -> "Drag files here or browse" -> Primary Upload button.',
    acceptableApproaches: ['Illustration-driven empty state with drag-and-drop dropzone', 'Interactive checklist onboarding empty state'],
    failureConditions: ['Empty state looks like a technical database error', 'No actionable button or upload trigger provided'],
    finalDeliverable: 'High-activation empty state design with validated microcopy and drag-and-drop affordance.',
    evaluationCriteria: { userActivation: 40, microcopyCraft: 30, testValidation: 30 },
    workplaceContext: 'SaaS Product Activation & Empty State UX',
    taskType: 'onboarding_ux'
  },

  {
    id: 'UX-L1-005',
    title: 'Design System Button Component Variant Matrix & Consistency',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'Atlassian / Core Design System',
    department: 'Design Systems & Component Library',
    domain: 'Enterprise Tools / Design Tokens & Components',
    skills: ['design_systems', 'figma_components', 'interaction_states', 'wcag_accessibility'],
    coreCompetencies: ['component_variant_architecture', 'interactive_states', 'token_harmony'],
    secondarySkills: ['focus_rings', 'auto_layout'],
    skillTags: ['design_systems', 'buttons', 'variants', 'interactive_states', 'tokens'],
    situation: 'Engineers building new pages are creating custom CSS buttons because the central design system Button component lacks a clear variant hierarchy, missing disabled, loading, and active focus states.',
    problem: 'Buttons across Jira and Confluence look inconsistent: some have rounded corners (4px), others pill shapes (99px), and focus states lack accessible 2px offset rings.',
    mission: 'Create a comprehensive Button component variant matrix in Figma / Design Canvas: define 4 variants (Primary, Secondary, Subtle, Danger) across 3 sizes with all 5 interactive states (Default, Hover, Focus, Pressed, Disabled).',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { system: 'Atlassian Design System Tokens' }
    },
    availableEvidence: [
      'Design audit: 18 different button styles found across product navigation and modals',
      'Accessibility ticket: Keyboard tab focus ring is completely invisible on dark buttons'
    ],
    subtasks: [
      {
        id: 'UX-L1-005-S1',
        title: 'Audit Inconsistent Button Instances Across Products',
        objective: 'Catalog disjointed button styles and map missing interactive states.',
        instructions: 'Open Research Notes Tool, examine button inventory screenshots, and document state gaps.',
        expectedActions: ['Review button audit inventory in Research Notes', 'Identify missing focus-visible and loading spinner states'],
        successCriteria: ['Cataloged 18 rogue button variations', 'Documented need for unified 4x3 variant matrix'],
        evaluationCriteria: { auditThoroughness: 50, systemThinking: 50 }
      },
      {
        id: 'UX-L1-005-S2',
        title: 'Build Unified Component Matrix with Accessible Focus States',
        objective: 'Design 4 variants (Primary, Secondary, Subtle, Danger) across Sm/Md/Lg with 2px blue focus ring.',
        instructions: 'In Design Canvas, configure button component variants with Auto Layout, consistent 8px corner radius, and accessible focus states.',
        expectedActions: ['Create component variants in Design Canvas', 'Define Default, Hover, Active, Focus, and Disabled states', 'Apply 2px high-contrast focus ring token', 'Save Button Master Component to project board'],
        successCriteria: ['Complete 4x3 variant matrix with all interactive states documented', '100% compliant with WCAG 2.1 AA focus-visible standards'],
        evaluationCriteria: { componentArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['8px rounded corners vs 4px enterprise square corners', 'Icon-only buttons: Square vs round pill containers'],
    pressureEvents: ['Frontend lead on Slack: "We are freezing component library refactor tonight; need final button specs"'],
    expectedSolution: 'Define 4 variants (Primary, Secondary, Subtle, Danger), 3 sizes (32px, 40px, 48px), all states including 2px outline focus ring.',
    acceptableApproaches: ['Figma Auto Layout component set with component properties', 'Atomic token-driven component variant matrix'],
    failureConditions: ['Disabled state contrast too high, confusing users whether clickable', 'Focus state invisible on dark background'],
    finalDeliverable: 'Comprehensive, accessible Button component set ready for engineering handoff.',
    evaluationCriteria: { componentSystematics: 40, accessibilityCompliance: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Design System Component Architecture',
    taskType: 'design_systems'
  },

  {
    id: 'UX-L1-006',
    title: 'Dropdown vs Radio Button Usability Decision in Plan Selection',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'The Wall Street Journal / Digital Subscriptions',
    department: 'Subscription Funnels & Growth',
    domain: 'Digital Publishing / Checkout Decision Architecture',
    skills: ['interaction_design', 'usability_heuristics', 'cognitive_friction', 'conversion_design'],
    coreCompetencies: ['form_element_selection', 'cognitive_load_reduction', 'decision_architecture'],
    secondarySkills: ['pricing_cards', 'visual_prominence'],
    skillTags: ['radio_buttons', 'dropdowns', 'form_usability', 'cognitive_load', 'subscriptions'],
    situation: 'Subscription checkout conversion dropped 14% after switching the billing frequency options (Monthly vs Annual vs 2-Year) from visible cards to a collapsed HTML `<select>` dropdown.',
    problem: 'Collapsed dropdowns hide choices and savings discounts behind an extra click, increasing cognitive load and forcing users to open the menu just to compare prices.',
    mission: 'Re-architect plan selection from a hidden dropdown to prominent radio selection cards with visible savings badges (e.g. "Save 30%"), reducing decision friction.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback'],
      environment: { targetFlow: 'Digital Subscription Checkout' }
    },
    availableEvidence: [
      'Analytics report: 62% of users never clicked the billing frequency dropdown, defaulting to monthly without seeing the discount',
      'User quote: "I didn\'t even know you had an annual discount until I saw it on another page"'
    ],
    subtasks: [
      {
        id: 'UX-L1-006-S1',
        title: 'Evaluate Cognitive Friction & Dropdown Concealment',
        objective: 'Analyze how collapsed dropdown hides pricing options and causes decision abandonment.',
        instructions: 'Open User Feedback Tool, review subscription funnel drop-off analytics, and critique dropdown interaction.',
        expectedActions: ['Inspect dropdown analytics in User Feedback Tool', 'Identify hidden discount information and extra click friction'],
        successCriteria: ['Quantified 14% conversion loss caused by dropdown concealment', 'Identified heuristic rule: Use radio buttons when options <= 5'],
        evaluationCriteria: { heuristicEvaluation: 50, cognitiveAnalysis: 50 }
      },
      {
        id: 'UX-L1-006-S2',
        title: 'Design Side-by-Side Radio Pricing Cards with Savings Badges',
        objective: 'Replace dropdown with 3 prominent selection cards featuring clear monthly equivalent pricing.',
        instructions: 'Open Design Canvas, lay out 3 horizontal radio cards (Monthly $10, Annual $7/mo, 2-Year $5/mo), badge the best value, and save variant.',
        expectedActions: ['Remove collapsed dropdown in Design Canvas', 'Design 3 comparative radio cards with selected state', 'Add prominent "BEST VALUE - SAVE 30%" badge on Annual card', 'Save Variant B to Project Board'],
        successCriteria: ['All 3 pricing options immediately visible without clicking', 'Annual discount prominently highlighted to drive higher AOV'],
        evaluationCriteria: { visualLayout: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Highlighting Annual as default pre-selected option vs neutral unselected state', 'Displaying total billed price ($84/year) vs breakdown ($7/month)'],
    pressureEvents: ['CMO notice: Quarterly subscription targets are behind; need conversion boost before Friday'],
    expectedSolution: 'Replace select dropdown with side-by-side selectable radio cards; pre-select Annual plan with "Save 30%" tag.',
    acceptableApproaches: ['Horizontal segmented radio cards', 'Vertical comparative pricing card list with badge'],
    failureConditions: ['Total billed amount hidden until payment step', 'Radio cards tap targets difficult to select on mobile'],
    finalDeliverable: 'High-converting subscription plan selector with validated decision architecture.',
    evaluationCriteria: { conversionArchitecture: 40, heuristicApplication: 30, testValidation: 30 },
    workplaceContext: 'Subscription Funnel Usability & Cognitive Ergonomics',
    taskType: 'conversion_design'
  },

  {
    id: 'UX-L1-007',
    title: 'Qualitative User Interview Tagging & Empathy Synthesis',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'Headspace / Mental Health & Meditation',
    department: 'User Research & Customer Insights',
    domain: 'Health & Wellness / Qualitative Research',
    skills: ['user_research', 'affinity_mapping', 'qualitative_synthesis', 'persona_empathy'],
    coreCompetencies: ['user_research_synthesis', 'affinity_mapping', 'empathy_mapping'],
    secondarySkills: ['thematic_coding', 'insight_presentation'],
    skillTags: ['user_research', 'affinity_map', 'qualitative', 'interviews', 'empathy'],
    situation: 'Following 30 customer discovery interviews regarding why users abandon meditation streaks after Day 3, raw interview transcripts sit in messy Google Docs without structured synthesis.',
    problem: 'Product teams are making gut-feel decisions without actionable insights because qualitative feedback has not been tagged, clustered into affinity themes, or mapped to user emotional states.',
    mission: 'Synthesize 30 raw interview transcripts: code user quotes into thematic clusters (Time Constraints, Notification Fatigue, Lack of Immediate Value), construct an Affinity Map, and deliver 3 actionable product opportunities.',
    workspace: {
      tools: ['design_brief', 'research_notes', 'project_board'],
      environment: { method: 'Thematic Affinity Mapping' }
    },
    availableEvidence: [
      'Interview transcript quotes: "The reminders pop up when I\'m driving and by the time I get home I forget"',
      'Churn metric: 72% streak drop-off on Day 3'
    ],
    subtasks: [
      {
        id: 'UX-L1-007-S1',
        title: 'Code User Quotes into Emotional & Functional Categories',
        objective: 'Review raw interview snippets in Research Notes Tool and tag repeating pain points.',
        instructions: 'Open Research Notes Tool, read customer quotes, and tag recurring phrases with pain point codes.',
        expectedActions: ['Read qualitative user quotes in Research Notes', 'Tag quotes under Notification Anxiety, Session Length, and Habit Formation'],
        successCriteria: ['Coded 30 interview quotes into structured tags', 'Identified primary friction: Notifications arrive at wrong time of day'],
        evaluationCriteria: { qualitativeCoding: 50, insightRigor: 50 }
      },
      {
        id: 'UX-L1-007-S2',
        title: 'Construct Thematic Affinity Map & Product Recommendations',
        objective: 'Cluster quotes into 3 themes and present actionable feature recommendations to leadership.',
        instructions: 'In Project Board, build an Affinity Map cluster, summarize top 3 findings, and formulate concrete design recommendations.',
        expectedActions: ['Group tagged quotes into 3 thematic columns', 'Synthesize core pain point: Rigid reminder scheduling', 'Formulate recommendation: Contextual smart reminders based on bedtime routines', 'Save synthesis to Project Board'],
        successCriteria: ['Clean affinity map clustering synthesized themes', '3 data-backed product recommendations ready for executive presentation'],
        evaluationCriteria: { synthesisClarity: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Tagging by feature area vs tagging by user emotion/motivation', 'Prioritizing habit formation vs notification frequency'],
    pressureEvents: ['Product Strategy Sync in 1 hour: VP of Product needs qualitative findings to allocate Q4 roadmap'],
    expectedSolution: 'Cluster quotes into 3 clear themes: 1. Notification timing mismatch, 2. Intimidating 15-minute session length, 3. Missing milestone rewards.',
    acceptableApproaches: ['Affinity diagramming with sticky note clusters', 'Empathy map with Says / Thinks / Does / Feels quadrants'],
    failureConditions: ['Presenting raw un-categorized quotes without synthesis', 'Recommendations unsupported by actual interview quotes'],
    finalDeliverable: 'Structured Affinity Map and executive summary of user churn drivers.',
    evaluationCriteria: { researchSynthesis: 40, strategicClarity: 30, testValidation: 30 },
    workplaceContext: 'User Research Synthesis & Affinity Clustering',
    taskType: 'user_research'
  },

  {
    id: 'UX-L1-008',
    title: 'Mobile Modal Dismissibility & Touch Gesture Conflicts',
    role: 'ui_ux',
    level: 1,
    difficulty: 'Foundation',
    company: 'Instagram / Mobile App Experience',
    department: 'Mobile Interactions & Direct Messaging',
    domain: 'Social Media / Mobile Gestures',
    skills: ['mobile_ux', 'gesture_design', 'interaction_design', 'usability_heuristics'],
    coreCompetencies: ['gesture_ergonomics', 'modal_dismissibility', 'touch_conflicts'],
    secondarySkills: ['bottom_sheet_modal', 'pull_to_refresh'],
    skillTags: ['modal', 'swipe_gesture', 'touch_conflict', 'bottom_sheet', 'mobile'],
    situation: 'Users scrolling through comment threads inside a mobile bottom sheet modal frequently close the modal by mistake because the vertical scroll gesture conflicts with the drag-down-to-dismiss gesture.',
    problem: 'The modal interprets any downward finger motion as a dismiss trigger, even when the user is trying to scroll through a long list of comments, leading to accidental dismissals and lost draft comments.',
    mission: 'Redesign bottom sheet interaction: require scroll container to reach `scrollTop === 0` before engaging pull-to-dismiss, add explicit drag handle affordance, and provide persistent close icon.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback'],
      environment: { platform: 'iOS and Android Native Web' }
    },
    availableEvidence: [
      'Usability video: User typing comment accidentally closes bottom sheet when scrolling up to read earlier comment',
      'Crash/Exit telemetry: 24% of bottom sheet exits classified as accidental (reopened within 3 seconds)'
    ],
    subtasks: [
      {
        id: 'UX-L1-008-S1',
        title: 'Analyze Gesture Conflict & Scroll Trap in User Recordings',
        objective: 'Inspect usability recordings in User Feedback Tool and identify touch event conflict.',
        instructions: 'Open User Feedback Tool, observe user interactions with comments modal, and note touch conflict points.',
        expectedActions: ['Watch interaction recording in User Feedback Tool', 'Identify downward scroll triggering modal dismissal mid-read'],
        successCriteria: ['Identified touch gesture threshold conflict', 'Quantified 24% accidental dismissal rate'],
        evaluationCriteria: { gestureAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L1-008-S2',
        title: 'Design Safe Bottom Sheet Drag Affordance & Scroll Lock',
        objective: 'Design visual grab handle (36x4px pill), explicit (X) button, and define safe gesture thresholds.',
        instructions: 'Open Design Canvas, design safe bottom sheet header with drag pill and top-right close icon, and specify scroll boundary interaction rules.',
        expectedActions: ['Add prominent top grab handle bar in Design Canvas', 'Add accessible (X) close icon in top-right header', 'Document interaction rule: Dismiss gesture activates ONLY when list is at top', 'Save Variant B to Project Board'],
        successCriteria: ['Accidental dismissals eliminated while preserving easy intentional dismissal', 'Explicit tap close target provided for accessibility'],
        evaluationCriteria: { interactionDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Full-screen modal takeover vs expandable bottom sheet (half / full)', 'Confirmation prompt on dismiss if user has unsaved draft text'],
    pressureEvents: ['Mobile app release branch cut tonight: Gesture conflict must be resolved for App Store submission'],
    expectedSolution: 'Add visual drag handle; lock dismiss gesture until list is scrolled to top (scrollTop == 0); add explicit (X) button; prompt if draft comment exists.',
    acceptableApproaches: ['Standard iOS-style interactive bottom sheet with safe gesture thresholds', 'Two-stage modal with snap points (collapsed / expanded)'],
    failureConditions: ['Removing swipe-down dismiss entirely, making modal hard to close with one hand', 'Accidental dismissals continue to delete draft comments'],
    finalDeliverable: 'Mobile bottom sheet component spec with safe gesture arbitration and persistent close controls.',
    evaluationCriteria: { gestureErgonomics: 40, interactionFidelity: 30, testValidation: 30 },
    workplaceContext: 'Mobile Gesture Design & Modal Usability',
    taskType: 'mobile_gestures'
  },

  // =============================================
  // LEVEL 2: INTERMEDIATE (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'UX-L2-001', // Also links with existing DES-204 / task-ux-checkout-friction
    aliasId: 'task-ux-checkout-friction',
    missionCode: 'UX-AUDIT-208',
    title: 'Mobile Checkout Drop-off & Form Friction Redesign',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Wayfair / Home Goods Checkout',
    department: 'Conversion Rate Optimization (CRO)',
    domain: 'Retail E-Commerce / Checkout Flow',
    skills: ['user_research', 'interaction_design', 'usability_heuristics', 'design_systems'],
    coreCompetencies: ['checkout_conversion', 'form_friction_reduction', 'heuristic_evaluation'],
    secondarySkills: ['single_page_accordion', 'transparent_pricing'],
    skillTags: ['checkout', 'friction', 'drop_off', 'accordion', 'wcag', 'cro'],
    situation: 'Analytics show 62% of mobile shoppers abandon cart on Step 3 of checkout. User recordings and survey feedback reveal frustration over undisclosed taxes until final click, confusing credit card error states, and unreadable gray-on-white text.',
    problem: 'Multi-step pagination disorients users, hidden shipping fees cause price shock at payment, and form fields violate touch target standards (32px), causing high mobile drop-off.',
    mission: 'Review Design Brief and User Feedback, test layout variants on the Interactive Design Canvas, eliminate hidden fee surprises, and present an accessible single-page accordion redesign.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'user_feedback', 'research_notes', 'project_board', 'ai_assistant'],
      environment: { designSystem: 'DayOne Orbit UI v3.2 / 8pt Fluid Grid', standard: 'WCAG 2.1 Level AA' }
    },
    availableEvidence: [
      'Analytics funnel: Step 1 (Cart): 10,000 -> Step 2 (Shipping): 7,200 -> Step 3 (Payment): 2,800 (Drop-off 62%)',
      'Hotjar recording: Users repeatedly toggle between Step 1 and Step 3 to check why total price jumped by $24',
      'Survey feedback: "Why did my $79 order suddenly become $103 on the last screen?"'
    ],
    subtasks: [
      {
        id: 'UX-L2-001-S1',
        title: 'Review Brief, KPIs & Synthesize User Heatmap Feedback',
        objective: 'Extract business conversion KPIs from Design Brief and identify friction themes in User Feedback.',
        instructions: 'Open Design Brief Tool and User Feedback Tool, review customer complaints about hidden fees and tiny inputs.',
        expectedActions: ['Open Design Brief Tool and review Q3 target KPIs', 'Inspect User Feedback Tool and identify top 3 friction points', 'Document price transparency failure and 32px touch targets'],
        successCriteria: ['Identified fee surprise as primary drop-off driver', 'Documented mobile accessibility violations'],
        evaluationCriteria: { researchSynthesis: 50, problemDiagnosis: 50 }
      },
      {
        id: 'UX-L2-001-S2',
        title: 'Configure Accessible Accordion Variant B & Defend Solution',
        objective: 'Activate Variant B on Design Canvas with upfront pricing, 48px inputs, and sticky summary, then save to board.',
        instructions: 'Open Design Canvas Tool, activate Variant B, verify WCAG contrast and touch target compliance, save to Project Board, and brief AI Lead Elena Rostova.',
        expectedActions: ['Open Design Canvas and select Variant B (Streamlined Accordion)', 'Verify touch targets >= 48px and clear price breakdown', 'Click "Save Variant B to Project Board"', 'Present layout rationale to AI Design Lead'],
        successCriteria: ['Variant B configured with transparent order summary', 'Saved to Project Board and validated with AI Lead'],
        evaluationCriteria: { designSolution: 50, designDefense: 50 }
      }
    ],
    decisionPoints: ['Single-page accordion vs traditional multi-step wizard', 'Express checkout buttons (Apple Pay/Google Pay) placed at top of funnel vs payment step'],
    pressureEvents: ['AI Design Lead Elena Rostova: "Our Q3 e-commerce conversion has plummeted 28%. We need a compliant redesign today."'],
    expectedSolution: 'Transition from rigid 3-step wizard to single-page accordion; show taxes upfront; expand touch targets to 48px; attach persistent sticky summary.',
    acceptableApproaches: ['Single-page progressive disclosure accordion', 'Express 1-click checkout with inline drawer'],
    failureConditions: ['Total price still hides taxes until final button click', 'Inputs remain below 44px touch target threshold'],
    finalDeliverable: 'Variant B layout saved to Project Board with defended design rationale.',
    evaluationCriteria: { researchSynthesis: 30, heuristicFixes: 30, accessibilityWCAG: 20, designDefense: 20 },
    workplaceContext: 'E-Commerce Mobile Checkout Conversion Redesign',
    taskType: 'conversion_redesign',
    missionDataTemplate: {
      missionCode: 'UX-AUDIT-208',
      incidentPriority: 'High Business Friction',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Analytics show 62% of mobile shoppers abandon cart on Step 3 of checkout. User recordings and survey feedback reveal frustration over undisclosed taxes until final click, confusing credit card error states, and unreadable gray-on-white text.',
      objectives: [
        'Review the Design Brief and extract key business KPIs and user constraints.',
        'Analyze User Feedback & Usability recordings for recurring friction themes.',
        'Inspect Research Notes to observe System Usability Scale (SUS) benchmarks.',
        'Use the Interactive Design Canvas to configure an accessible, transparent layout (Variant B/C).',
        'Review WCAG contrast compliance and present your layout rationale to Elena Rostova.'
      ],
      currentLayoutState: {
        activeVariant: 'variant_a_legacy',
        feeTransparency: false,
        stepProgressStyle: 'minimal_dots',
        tapTargetSize: '32px (Sub-optimal)',
        contrastRatio: '3.1:1 (Failing AA)'
      }
    }
  },

  {
    id: 'UX-L2-002',
    title: 'Enterprise Data Table Density, Filtering & Batch Action Ergonomics',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Salesforce / CRM Platform Data Experience',
    department: 'Enterprise Productivity & Tables',
    domain: 'Enterprise SaaS / High-Density Data Tables',
    skills: ['enterprise_ux', 'data_tables', 'information_architecture', 'interaction_design'],
    coreCompetencies: ['data_table_design', 'batch_actions', 'information_density'],
    secondarySkills: ['sticky_columns', 'filtering_patterns'],
    skillTags: ['data_table', 'enterprise', 'filtering', 'batch_actions', 'density'],
    situation: 'Enterprise account managers managing 5,000 client accounts complain that the data table requires excessive horizontal scrolling, hides batch actions off-screen, and lacks multi-column sorting.',
    problem: 'Table columns lack sticky headers and pinned identification columns (Account Name), batch operations require scrolling to the bottom of the page, and filter pills are buried in a complex modal.',
    mission: 'Redesign data table experience: introduce user-configurable row density (Compact, Comfortable), pin the Account Name column with a sticky header, and design a floating bottom batch action bar.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { framework: 'Enterprise Table Grid' }
    },
    availableEvidence: [
      'Account manager survey: 78% of power users find the table frustrating due to losing context when scrolling right',
      'Time-and-motion study: Performing bulk status update takes 14 clicks across 3 minutes'
    ],
    subtasks: [
      {
        id: 'UX-L2-002-S1',
        title: 'Analyze Enterprise Table Workflow & Horizontal Scroll Fatigue',
        objective: 'Review account manager workflow recordings and identify lost context points.',
        instructions: 'Open Research Notes Tool, examine user time-and-motion recordings, and document table pain points.',
        expectedActions: ['Review table workflow pain points in Research Notes', 'Identify missing sticky column causing lost row context on column 12'],
        successCriteria: ['Mapped horizontal scrolling friction points', 'Identified lack of contextual batch action bar'],
        evaluationCriteria: { workflowAudit: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L2-002-S2',
        title: 'Design Pinned Columns, Floating Batch Bar & Density Controls',
        objective: 'In Design Canvas: pin column 1, implement floating batch action bar upon row selection, and add density toggle.',
        instructions: 'Open Design Canvas, configure pinned left column with drop shadow divider, add floating bottom bulk toolbar, and save layout.',
        expectedActions: ['Pin Account Name column to left viewport edge', 'Design floating bottom batch bar appearing when rows are checked', 'Add row density toggle (Compact: 36px, Comfortable: 48px)', 'Save Enterprise Table Variant to Project Board'],
        successCriteria: ['Account Name remains visible throughout horizontal scrolling', 'Bulk actions accessible immediately with 1 click without scrolling'],
        evaluationCriteria: { enterpriseLayout: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Floating bottom batch bar vs top table header replacement', 'In-cell editing vs side-sheet drawer editing'],
    pressureEvents: ['Enterprise Client Advisory Board: 3 Fortune 500 renewals contingent on table workflow improvements'],
    expectedSolution: 'Pin primary identifier column; make table headers sticky; display floating bottom batch toolbar when rows selected; offer compact/comfortable density toggle.',
    acceptableApproaches: ['Floating bottom action dock with row count', 'Sticky header replacement with batch operations'],
    failureConditions: ['Pinned column overlaps content without clear visual elevation shadow', 'Batch bar obscures pagination controls'],
    finalDeliverable: 'High-density Enterprise Data Table specification with sticky context and bulk action bar.',
    evaluationCriteria: { enterpriseUX: 40, interactionErgonomics: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Data Table Density & Workflow Optimization',
    taskType: 'enterprise_table'
  },

  {
    id: 'UX-L2-003',
    title: 'SaaS Onboarding: Progressive Disclosure vs Upfront Multi-Step Wizard',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Miro / Visual Collaboration Platform',
    department: 'Product Growth & First-Run Experience',
    domain: 'Collaboration SaaS / User Activation',
    skills: ['onboarding_ux', 'progressive_disclosure', 'user_activation', 'interaction_design'],
    coreCompetencies: ['onboarding_strategy', 'progressive_disclosure', 'time_to_value'],
    secondarySkills: ['time_to_first_canvas', 'completion_rate'],
    skillTags: ['onboarding', 'progressive_disclosure', 'time_to_value', 'wizard', 'growth'],
    situation: 'New user signups drop off by 52% during the initial onboarding setup wizard because users are forced to answer 12 questions (Team size, Role, Project type, Tools used, Invite teammates) before seeing the canvas.',
    problem: 'High cognitive upfront barrier before delivering core product value (Time to Value = 4.5 minutes). Users are fatigued before ever experiencing the collaborative whiteboarding canvas.',
    mission: 'Re-architect onboarding from a 12-question gate to a 1-question launchpad ("What do you want to create today?") with progressive disclosure: defer team invitations and tool integrations until after first canvas creation.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback'],
      environment: { targetMetric: 'Time-to-First-Canvas & Activation %' }
    },
    availableEvidence: [
      'Funnel analytics: 10,000 signups -> Only 4,800 reach the blank canvas (52% onboarding drop-off)',
      'User interview quote: "I just wanted to brainstorm an idea quickly, but you asked me 20 questions about my company size"'
    ],
    subtasks: [
      {
        id: 'UX-L2-003-S1',
        title: 'Map Time-to-Value Bottlenecks in Onboarding Funnel',
        objective: 'Inspect drop-off rates across all 12 onboarding steps and identify high-friction questions.',
        instructions: 'Open User Feedback Tool, review onboarding step drop-off chart, and identify the steepest attrition steps.',
        expectedActions: ['Analyze step-by-step drop-off in User Feedback Tool', 'Identify Step 4 (Invite Teammates) as losing 34% of users'],
        successCriteria: ['Pinpointed team invitation gate as primary blocker', 'Calculated 4.5 minute delay to first core value experience'],
        evaluationCriteria: { funnelAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L2-003-S2',
        title: 'Design 1-Click Template Launchpad & Contextual Progressive Disclosure',
        objective: 'Replace 12-step wizard with single screen: Select Template -> Land in Canvas with interactive guide.',
        instructions: 'Open Design Canvas, design 3 template starter cards (Brainstorming, Flowchart, Agile Board), and defer team invite to in-canvas share button.',
        expectedActions: ['Design streamlined template selection screen', 'Direct user immediately into pre-populated interactive canvas', 'Move team invite to contextual top-right Share button', 'Save Streamlined Onboarding Variant'],
        successCriteria: ['Time to Value reduced from 4.5 minutes to under 20 seconds', 'Onboarding drop-off projected to decline from 52% to < 10%'],
        evaluationCriteria: { growthDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['1-question template selector vs zero-question instant blank canvas', 'Mandatory team invite vs optional skippable prompt'],
    pressureEvents: ['Growth Team OKR: Increase weekly active workspace activation rate by 20% before end of quarter'],
    expectedSolution: 'Eliminate 11 pre-flight questions; present single template launcher; drop user immediately into live canvas; progressively request profile data later.',
    acceptableApproaches: ['Single-click template picker leading immediately to canvas', 'Interactive sandbox canvas with sample sticky notes'],
    failureConditions: ['Demanding work email invitations before allowing canvas exploration', 'Users dumped into empty canvas with zero guidance'],
    finalDeliverable: 'Streamlined onboarding flow reducing Time-to-Value to under 20 seconds.',
    evaluationCriteria: { growthUX: 40, progressiveDisclosure: 30, testValidation: 30 },
    workplaceContext: 'SaaS User Activation & Time-to-Value Optimization',
    taskType: 'onboarding_optimization'
  },

  {
    id: 'UX-L2-004',
    title: 'Multi-Brand Design System Token Synchronization Across Web & Mobile',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Gap Inc. / Multi-Brand Retail (Old Navy, Banana Republic, Athleta)',
    department: 'Global Design Systems & Brand Architecture',
    domain: 'Retail Apparel / Multi-Brand Token Systems',
    skills: ['design_systems', 'design_tokens', 'figma_variables', 'brand_architecture'],
    coreCompetencies: ['design_token_architecture', 'multi_brand_theming', 'component_reusability'],
    secondarySkills: ['semantic_tokens', 'figma_modes'],
    skillTags: ['design_tokens', 'multi_brand', 'figma_variables', 'theming', 'design_systems'],
    situation: 'The company operates 4 retail brands using duplicate, unlinked component libraries. A simple button update requires manual edits across 4 different Figma files and 4 frontend codebases.',
    problem: 'Components hardcode brand colors instead of consuming semantic design tokens (`color.interactive.primary`), making multi-brand theming impossible without duplicating components.',
    mission: 'Architect a 3-tier token system in Figma / Design Canvas: Global Primitives $\\rightarrow$ Semantic Tokens $\\rightarrow$ Brand Modes, enabling a single core component library to theme seamlessly across all 4 brands.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { tokenEngine: 'Figma Variables & W3C Design Tokens Spec' }
    },
    availableEvidence: [
      'Design debt audit: 4 separate button components maintained across Old Navy and Athleta libraries',
      'Engineering friction: Developers spending 40% of sprint time manually porting styles across brand repos'
    ],
    subtasks: [
      {
        id: 'UX-L2-004-S1',
        title: 'Audit Hardcoded Brand Values & Map Semantic Token Hierarchy',
        objective: 'Inspect component library and map raw hex codes to 3-tier token architecture.',
        instructions: 'Open Research Notes Tool, examine color token inventory, and structure tokens into Primitives vs Semantics.',
        expectedActions: ['Inspect raw color values in Research Notes', 'Map raw blue-500 and navy-800 to semantic token color.primary.interactive'],
        successCriteria: ['Mapped 3-tier token hierarchy (Primitive -> Semantic -> Component)', 'Eliminated hardcoded brand-specific hex codes'],
        evaluationCriteria: { tokenArchitecture: 50, systematicThinking: 50 }
      },
      {
        id: 'UX-L2-004-S2',
        title: 'Configure Multi-Brand Figma Variable Modes & Themed Component',
        objective: 'Implement 4 brand modes in Design Canvas, verify button switches cleanly from Old Navy (Blue) to Athleta (Plum).',
        instructions: 'In Design Canvas, configure semantic tokens, toggle brand mode selector across 4 brands, and verify component styling updates dynamically.',
        expectedActions: ['Define semantic variable collection in Design Canvas', 'Configure 4 brand variable modes (Old Navy, Banana Republic, Athleta, Gap)', 'Verify Button and Card components re-theme automatically upon mode toggle', 'Save Multi-Brand Token System to Project Board'],
        successCriteria: ['Single shared component library themes all 4 brands via variable modes', 'Zero duplicate component definitions required'],
        evaluationCriteria: { tokenExecution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['3-tier token hierarchy (Primitive -> Semantic -> Component) vs 2-tier (Primitive -> Semantic)', 'Font family swapping via tokens vs layout adjustments per brand'],
    pressureEvents: ['Design Ops Lead: "New brand launch in 3 weeks; we cannot afford 4 separate Figma libraries"'],
    expectedSolution: 'Create Global Primitives (color.blue.500); map to Semantic Tokens (color.action.primary); create Brand Modes where Old Navy maps to Blue and Athleta maps to Plum.',
    acceptableApproaches: ['Figma Variables multi-mode token architecture', 'Style Dictionary W3C token hierarchy'],
    failureConditions: ['Components still reference primitive hex codes directly', 'Contrast ratio fails WCAG on one of the brand modes'],
    finalDeliverable: 'Multi-brand design token architecture with automated variable switching across 4 brands.',
    evaluationCriteria: { tokenArchitecture: 40, scalability: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Multi-Brand Design System Architecture',
    taskType: 'design_systems'
  },

  {
    id: 'UX-L2-005',
    title: 'Complex Form Error Feedback: Inline Validation vs Top Summary Banner',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Intuit / TurboTax Financial Filing',
    department: 'Tax Filing Experience & Form Ergonomics',
    domain: 'Fintech / Complex Tax Compliance Forms',
    skills: ['form_ergonomics', 'error_handling', 'accessibility_wcag', 'interaction_design'],
    coreCompetencies: ['error_message_design', 'form_validation_ergonomics', 'accessible_error_handling'],
    secondarySkills: ['screen_reader_announcements', 'scroll_to_error'],
    skillTags: ['form_errors', 'inline_validation', 'error_summary', 'wcag', 'fintech'],
    situation: 'Tax filers on a 25-field deduction form click "Continue" and nothing happens because validation errors are hidden off-screen below the fold, causing confusion and form abandonment.',
    problem: 'The form relies solely on inline red field borders without an Error Summary banner at the top of the page, and fails to automatically scroll the user to the first invalid field upon submission.',
    mission: 'Design accessible, high-usability form error handling conforming to UK GDS standards: render a top-of-page Error Summary banner with jump links, paired with inline contextual field errors and aria-live announcements.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback'],
      environment: { standard: 'UK GDS Form Validation & WCAG 2.1 AA' }
    },
    availableEvidence: [
      'Customer support log: Users call saying "Continue button is broken" when fields below the fold are invalid',
      'Accessibility audit: Screen reader users not alerted when form submission is rejected'
    ],
    subtasks: [
      {
        id: 'UX-L2-005-S1',
        title: 'Evaluate Form Validation Failure & Off-Screen Errors',
        objective: 'Analyze user submissions on 25-field form and identify why users miss invalid inputs.',
        instructions: 'Open User Feedback Tool, observe simulated user session with invalid fields below the fold, and note friction points.',
        expectedActions: ['Review user session recording in User Feedback Tool', 'Identify off-screen errors leaving user stranded without feedback'],
        successCriteria: ['Demonstrated failure of inline-only validation on long forms', 'Mapped accessibility gap for screen reader users'],
        evaluationCriteria: { errorAudit: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L2-005-S2',
        title: 'Design Dual Error Architecture: Top Summary & Inline Anchors',
        objective: 'Design prominent top Error Summary box with jump links and inline error messages with icons.',
        instructions: 'Open Design Canvas, place accessible Error Summary box at top of form, link each error item to its input field, and save layout.',
        expectedActions: ['Design top Error Summary box with bold headline: "There is a problem"', 'List all invalid fields as clickable anchor links focusing the input', 'Add inline error messages directly above invalid inputs with warning icon', 'Save Error Handling Variant'],
        successCriteria: ['Users immediately alerted to errors at top of page upon clicking submit', 'Clicking summary item jumps and focuses the exact invalid field'],
        evaluationCriteria: { errorArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Real-time inline validation onBlur vs validation on form submit', 'Focus jump to top summary banner vs jump to first invalid input'],
    pressureEvents: ['Tax filing deadline in 72 hours: Customer support queues flooded with form submission calls'],
    expectedSolution: 'Implement UK GDS error pattern: Top error summary box listing all errors with jump anchors; inline red error text directly above input; shift focus to summary on submit.',
    acceptableApproaches: ['Top Error Summary with inline contextual anchors (UK GDS pattern)', 'Floating drawer error tray with click-to-fix anchors'],
    failureConditions: ['Relying solely on red border color without descriptive text or icon', 'Error summary does not shift keyboard focus for screen readers'],
    finalDeliverable: 'Accessible, comprehensive form error architecture adhering to UK GDS and WCAG 2.1 AA standards.',
    evaluationCriteria: { errorErgonomics: 40, accessibilityCompliance: 30, testValidation: 30 },
    workplaceContext: 'Complex Long-Form Error Recovery & Accessibility',
    taskType: 'form_ergonomics'
  },

  {
    id: 'UX-L2-006',
    title: 'Responsive Navigation Architecture for Multi-Level Enterprise App',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'HubSpot / Enterprise Marketing Hub',
    department: 'Information Architecture & Navigation',
    domain: 'Enterprise CRM / Complex Navigation Systems',
    skills: ['information_architecture', 'responsive_navigation', 'interaction_design', 'wayfinding'],
    coreCompetencies: ['navigation_architecture', 'wayfinding_systems', 'responsive_drawer_design'],
    secondarySkills: ['mega_menus', 'breadcrumb_navigation'],
    skillTags: ['navigation', 'information_architecture', 'mega_menu', 'responsive', 'breadcrumbs'],
    situation: 'As HubSpot added 8 new product lines, the top navigation bar became cluttered with 14 top-level items that wrap onto two lines on laptops (1366px), pushing main content below the fold.',
    problem: 'Horizontal nav items exceed viewport width; secondary and tertiary tools are buried in unpredictable dropdown menus; mobile users have no way to access sub-tools from the mobile drawer.',
    mission: 'Re-architect the navigation taxonomy: organize 30 tools into 4 logical product suites, design a responsive collapsible sidebar with persistent icons, and implement contextual breadcrumbs for orientation.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { framework: 'HubSpot Orbit Responsive Navigation' }
    },
    availableEvidence: [
      'Visual regression report: Top navigation wraps into 2 messy rows on 1366x768 screens (affecting 32% of enterprise laptops)',
      'Card sort study: 82% of marketers group tools into 4 distinct functional suites'
    ],
    subtasks: [
      {
        id: 'UX-L2-006-S1',
        title: 'Analyze Navigation Wrap & Card Sorting Clustering',
        objective: 'Review card sorting findings in Research Notes Tool and map tool sprawl.',
        instructions: 'Open Research Notes Tool, examine open card sorting results, and consolidate 14 top items into 4 core hubs.',
        expectedActions: ['Inspect navigation wrapping failure on 1366px screens in Research Notes', 'Cluster 14 disjointed tools into Marketing, Sales, Service, and Operations'],
        successCriteria: ['Consolidated 14 messy items into 4 clean suites', 'Documented need for collapsible vertical sidebar'],
        evaluationCriteria: { iaSynthesis: 50, taxonomyClarity: 50 }
      },
      {
        id: 'UX-L2-006-S2',
        title: 'Design Collapsible Left Sidebar & Contextual Breadcrumbs',
        objective: 'Design 240px left sidebar with icons, sub-menu accordion, collapse toggle (64px), and breadcrumbs.',
        instructions: 'Open Design Canvas, create responsive collapsible sidebar layout with persistent wayfinding icons, and save layout variant.',
        expectedActions: ['Replace top wrapping nav with 240px collapsible left sidebar', 'Include persistent 64px icon-only rail collapsed state', 'Add contextual breadcrumb wayfinding at top of content area', 'Save Responsive Navigation Variant to Project Board'],
        successCriteria: ['Content area never pushed down by wrapping navigation on any screen size', 'Users can navigate 3 levels deep while maintaining clear orientation'],
        evaluationCriteria: { navigationExecution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Collapsible vertical sidebar vs full-width Mega Menu dropdown', 'Auto-expand on hover vs click-to-expand accordion'],
    pressureEvents: ['Enterprise client churn feedback: "Your app has become an unnavigable maze; our team can\'t find the reporting tool"'],
    expectedSolution: 'Transition from horizontal header to collapsible left sidebar (240px expanded / 64px collapsed icon rail); organize into 4 core suites; add breadcrumbs.',
    acceptableApproaches: ['Collapsible sidebar navigation with icon rail', 'Full-width categorized Mega Menu with grouped columns'],
    failureConditions: ['Navigation items wrap to multi-line row on standard desktop viewports', 'Collapsed icon rail lacks accessible tooltips on hover/focus'],
    finalDeliverable: 'Responsive enterprise navigation architecture with collapsible sidebar and breadcrumb wayfinding.',
    evaluationCriteria: { informationArchitecture: 40, wayfindingErgonomics: 30, testValidation: 30 },
    workplaceContext: 'Complex Multi-Level Enterprise Navigation Architecture',
    taskType: 'navigation_design'
  },

  {
    id: 'UX-L2-007',
    title: 'Usability Testing Synthesis & System Usability Scale (SUS) Benchmark',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Zoom / Video Settings & Audio Preferences',
    department: 'UX Research & Quantitative Insights',
    domain: 'Communications / Quantitative Usability Testing',
    skills: ['user_research', 'sus_scoring', 'quantitative_ux', 'usability_testing'],
    coreCompetencies: ['sus_calculation', 'usability_benchmarking', 'research_presentation'],
    secondarySkills: ['task_success_metrics', 'executive_reporting'],
    skillTags: ['sus_score', 'usability_testing', 'quantitative_research', 'benchmarking', 'ux'],
    situation: 'Following a major redesign of the Audio & Video settings panel, users flooded the community forums with complaints, but product managers claim the redesign is a success based on vanity metrics.',
    problem: 'The team lacks objective usability data. 20 moderated usability test sessions were conducted, but the System Usability Scale (SUS) questionnaires and task completion metrics have not been calculated or benchmarked.',
    mission: 'Calculate the System Usability Scale (SUS) score from the 20 test participants, analyze task completion times and error rates, compare against industry benchmarks (68 = Average), and present data-backed redesign recommendations.',
    workspace: {
      tools: ['design_brief', 'research_notes', 'project_board'],
      environment: { method: 'System Usability Scale (Brooke, 1996)' }
    },
    availableEvidence: [
      'Raw participant scores: 20 completed 10-item Likert scale questionnaires in Google Sheets',
      'Task metrics: Task 1 (Select Bluetooth Microphone): 8 of 20 users failed within 3-minute time limit'
    ],
    subtasks: [
      {
        id: 'UX-L2-007-S1',
        title: 'Calculate Standardized SUS Score & Task Failure Rates',
        objective: 'Apply SUS scoring formula to 20 participant datasets and calculate overall benchmark score.',
        instructions: 'Open Research Notes Tool, execute SUS formula: (Odd items - 1) + (5 - Even items) * 2.5, and calculate mean score.',
        expectedActions: ['Calculate individual and mean SUS scores in Research Notes', 'Identify mean SUS score of 52.4 (Grade F / Below Average)', 'Correlate with 40% task failure rate on Bluetooth selection'],
        successCriteria: ['Calculated accurate mean SUS score of 52.4', 'Proved quantitatively that settings panel is below industry standards (68)'],
        evaluationCriteria: { quantitativeAccuracy: 50, benchmarkInterpretation: 50 }
      },
      {
        id: 'UX-L2-007-S2',
        title: 'Formulate Data-Backed Heuristic Action Plan for Leadership',
        objective: 'Translate SUS findings into 3 prioritized engineering action items and present to Product Lead.',
        instructions: 'In Project Board, synthesize SUS findings into executive brief with task completion charts and 3 immediate design fixes.',
        expectedActions: ['Create executive usability briefing card on Project Board', 'Identify top failure driver: Hidden device dropdown menu', 'Propose auto-device detection with live mic test visualizer', 'Submit report to Project Board'],
        successCriteria: ['Data-driven report proves usability deficit to skeptical product leadership', 'Actionable remediation plan prioritized for immediate engineering sprint'],
        evaluationCriteria: { executivePresentation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['System Usability Scale (SUS) vs Single Ease Question (SEQ) vs SUPR-Q', 'Separating novice vs power user benchmark cohorts'],
    pressureEvents: ['Product VP review in 2 hours: Need definitive data to decide whether to roll back the settings panel redesign'],
    expectedSolution: 'Calculate SUS = 52.4 (Grade F); highlight 40% task failure on device selection; recommend auto-detecting active mic and persistent audio test meter.',
    acceptableApproaches: ['Standard SUS scoring methodology with grade scale mapping', 'Triangulated analysis combining SUS score, Task Success Rate, and Time on Task'],
    failureConditions: ['Miscalculating SUS formula by failing to invert even-numbered negative questions', 'Presenting raw numbers without actionable design recommendations'],
    finalDeliverable: 'Executive Usability Benchmark Report with calculated SUS score and prioritized remediation roadmap.',
    evaluationCriteria: { researchRigor: 40, dataTranslation: 30, testValidation: 30 },
    workplaceContext: 'Quantitative Usability Benchmarking & Leadership Reporting',
    taskType: 'research_benchmarking'
  },

  {
    id: 'UX-L2-008',
    title: 'Dark Mode Contrast Inversion & Elevation Shadow Architecture',
    role: 'ui_ux',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Spotify / Desktop & Web Client Design',
    department: 'Design Systems & Theming',
    domain: 'Streaming Media / Dark Theme Design',
    skills: ['visual_design', 'dark_mode', 'color_elevation', 'accessibility_wcag'],
    coreCompetencies: ['dark_theme_architecture', 'surface_elevation', 'contrast_inversion'],
    secondarySkills: ['shadow_tokens', 'pure_black_avoidance'],
    skillTags: ['dark_mode', 'theming', 'elevation', 'contrast', 'accessibility'],
    situation: 'Users activating dark mode report eye strain and difficulty distinguishing modals from background cards, while primary buttons appear glaringly harsh and vibrate visually against dark gray surfaces.',
    problem: 'Dark mode was implemented via naive color inversion (replacing white with #000000 pure black) without elevation surface lightening, causing black box crush and violating depth perception heuristics.',
    mission: 'Architect an authentic dark mode system: replace pure #000000 black with dark gray base (#121212), establish 4 surface elevation tiers using subtle opacity overlays, desaturate accent colors, and meet WCAG contrast.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { system: 'Material 3 Dark Theme & Orbit Tokens' }
    },
    availableEvidence: [
      'Community feedback: "Modals blend into the background; I can\'t tell where the popup window ends"',
      'Design critique: Pure black background (#000000) causes halation effect for astigmatic users reading white text'
    ],
    subtasks: [
      {
        id: 'UX-L2-008-S1',
        title: 'Audit Inverted Color Deficiencies & Halation Effects',
        objective: 'Inspect current dark mode in Research Notes Tool and map elevation failures.',
        instructions: 'Open Research Notes Tool, examine dark mode screenshots, and identify contrast and elevation problems.',
        expectedActions: ['Inspect pure black #000000 background in Research Notes', 'Identify missing elevation boundaries between surface tiers and modals'],
        successCriteria: ['Identified failure of 1:1 color inversion', 'Documented need for surface elevation lighting scale'],
        evaluationCriteria: { aestheticAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L2-008-S2',
        title: 'Construct 4-Tier Dark Elevation System & Desaturated Accents',
        objective: 'In Design Canvas: set base to #121212, define Surface 1 (5% white overlay), Surface 2 (8%), and Modal (12%).',
        instructions: 'Open Design Canvas, apply dark surface elevation tokens, desaturate vibrant accent colors by 20%, and save Dark Theme variant.',
        expectedActions: ['Set background base to Dark Gray #121212', 'Configure Surface-1 (#1E1E1E), Surface-2 (#252525), Surface-3 (#2D2D2D)', 'Apply 1px border (#FFFFFF 8% opacity) on floating modals for crisp definition', 'Desaturate primary green from #1DB954 to softer #1ED760', 'Save Dark Mode Variant'],
        successCriteria: ['Modals and cards visually elevate above base background with distinct depth', 'Text and accents readable without harsh contrast vibration (Halation eliminated)'],
        evaluationCriteria: { visualCraft: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['OLED pure black (#000000) mode vs Material Dark Gray (#121212)', 'Colored shadows in dark mode vs subtle 1px border stroke elevation'],
    pressureEvents: ['Major marketing campaign: Dark mode feature highlighted in press release tomorrow morning'],
    expectedSolution: 'Use #121212 base; build elevation via surface lightness (5%, 8%, 12% white tint); use 1px subtle border outline for floating surfaces; desaturate saturated colors.',
    acceptableApproaches: ['Material Design dark theme surface elevation scale', 'Semantic token mapping with elevated border strokes'],
    failureConditions: ['Using pure black #000000 everywhere, destroying depth perception', 'Text contrast drops below 4.5:1 on elevated surfaces'],
    finalDeliverable: 'Harmonious dark mode design system specification with verified elevation hierarchy and WCAG compliance.',
    evaluationCriteria: { visualRefinement: 40, themeArchitecture: 30, testValidation: 30 },
    workplaceContext: 'Dark Theme System Architecture & Visual Elevation',
    taskType: 'visual_theming'
  },

  // =============================================
  // LEVEL 3: ADVANCED (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'UX-L3-001',
    title: 'Enterprise Analytics Dashboard Information Architecture & Cognitive Overload',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Datadog / Executive Cloud Dashboards',
    department: 'Enterprise UX & Visual Analytics',
    domain: 'Cloud Observability / High-Density Dashboards',
    skills: ['ia_enterprise', 'dashboard_design', 'cognitive_overload', 'progressive_disclosure'],
    coreCompetencies: ['dashboard_information_architecture', 'cognitive_load_reduction', 'modular_widgets'],
    secondarySkills: ['data_visualization', 'customizable_views'],
    skillTags: ['dashboard', 'information_architecture', 'cognitive_overload', 'enterprise', 'widgets'],
    situation: 'Chief Information Officers (CIOs) reviewing cloud infrastructure complain of extreme cognitive overload: the dashboard displays 38 simultaneous charts, gauges, and tables on a single screen without visual hierarchy.',
    problem: 'The dashboard dumps raw operational metrics alongside high-level executive summaries without progressive disclosure, causing executive users to miss critical cost and security alert thresholds.',
    mission: 'Re-architect the analytics hub: establish a 3-tier information hierarchy (Executive Summary KPIs $\\rightarrow$ Operational Health Metrics $\\rightarrow$ Deep Forensic Drill-Down), design modular collapsible widget groups, and reduce visual noise.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { targetUsers: 'Enterprise Executives & Engineering Directors' }
    },
    availableEvidence: [
      'Executive usability feedback: "It takes me 10 minutes to find our monthly cloud burn rate in this wall of graphs"',
      'Heatmap: 28 of 38 widgets on the page receive zero clicks from executive users'
    ],
    subtasks: [
      {
        id: 'UX-L3-001-S1',
        title: 'Conduct Widget Usage Audit & Map User Intent Profiles',
        objective: 'Analyze widget interaction heatmaps and distinguish Executive vs SRE operational needs.',
        instructions: 'Open Research Notes Tool, examine heatmap telemetry for all 38 widgets, and segment into Executive KPIs vs Deep Diagnostics.',
        expectedActions: ['Review widget interaction rates in Research Notes', 'Isolate top 4 high-priority Executive KPIs (Spend, Health, Security, Uptime)'],
        successCriteria: ['Identified 28 low-utility widgets cluttering executive view', 'Established two distinct user persona pathways'],
        evaluationCriteria: { telemetryAudit: 50, personaSegmentation: 50 }
      },
      {
        id: 'UX-L3-001-S2',
        title: 'Design 3-Tier Progressive Disclosure Analytics Dashboard',
        objective: 'Design top summary card row (4 macro KPIs), collapsible service health status, and drill-down drawer.',
        instructions: 'Open Design Canvas, restructure layout with prominent hero KPI cards, clean sparklines, and progressive drill-down links.',
        expectedActions: ['Create top row with 4 high-level KPI cards with delta trends', 'Design collapsible System Health status matrix with green/yellow/red indicators', 'Move detailed forensic charts into drawer accessible via "View Deep Metrics" link', 'Save Executive Dashboard Variant'],
        successCriteria: ['Executive users can determine system health and monthly spend in < 5 seconds', 'Operational engineers retain instant 1-click access to granular diagnostics'],
        evaluationCriteria: { dashboardArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Fixed curated layout vs customizable drag-and-drop widget grid', 'Pie charts vs horizontal progress bars for cost breakdown'],
    pressureEvents: ['Board of Directors meeting on Monday: CEO needs clean, impressive executive analytics view'],
    expectedSolution: '3-tier hierarchy: Top row 4 primary KPI cards -> Middle section collapsible infrastructure health -> Side drawer for granular query logs.',
    acceptableApproaches: ['Progressive disclosure dashboard with executive overview and drill-downs', 'Dual-mode toggle: Executive View vs Engineering Detail View'],
    failureConditions: ['Critical alert thresholds hidden where executives cannot see them', 'Removing diagnostic data needed by engineering on-call responders'],
    finalDeliverable: 'Executive Analytics Hub design specification balancing high-level clarity with deep operational drill-down.',
    evaluationCriteria: { cognitiveArchitecture: 40, visualElegance: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Cloud Observability & Executive Analytics',
    taskType: 'dashboard_architecture'
  },

  {
    id: 'UX-L3-002',
    title: 'Cross-Platform Mobile vs Desktop Interaction Parity in Productivity Suite',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Notion / Mobile & Desktop Productivity',
    department: 'Cross-Platform Product Design',
    domain: 'Productivity SaaS / Cross-Platform UX Parity',
    skills: ['cross_platform', 'responsive_design', 'interaction_patterns', 'gestures'],
    coreCompetencies: ['cross_platform_parity', 'hover_vs_touch_translation', 'desktop_mobile_continuity'],
    secondarySkills: ['contextual_toolbars', 'keyboard_shortcuts'],
    skillTags: ['cross_platform', 'mobile_desktop', 'interaction_parity', 'hover_states', 'notion'],
    situation: 'Power users working seamlessly on desktop find the mobile app unusable because critical slash commands (`/table`, `/bullet`), hover action buttons, and drag handles have no mobile equivalents.',
    problem: 'Desktop design relies on hover states (`:hover`) and mouse precision that do not exist on touchscreens, while mobile attempts to clone the desktop layout without touch-native affordances.',
    mission: 'Design cross-platform interaction parity: translate desktop hover actions into a sticky mobile keyboard action toolbar, implement long-press context menus, and ensure seamless document editing continuity.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { platforms: 'macOS Desktop (1440px) and iOS Mobile (390px)' }
    },
    availableEvidence: [
      'User review: "I love Notion on my Mac, but the mobile app is infuriating because I can\'t figure out how to add a table on my phone"',
      'Mobile editing engagement: 82% of mobile sessions are read-only due to high editing friction'
    ],
    subtasks: [
      {
        id: 'UX-L3-002-S1',
        title: 'Map Desktop Hover Dependencies & Mobile Friction Gaps',
        objective: 'Catalog all desktop interactions requiring hover or mouse precision without mobile counterparts.',
        instructions: 'Open Research Notes Tool, examine desktop vs mobile interaction audit, and identify missing mobile triggers.',
        expectedActions: ['Inspect desktop hover triggers in Research Notes', 'Identify desktop slash commands, block drag handles, and row hover menus lacking touch equivalents'],
        successCriteria: ['Mapped 6 core hover dependencies that fail on touch screens', 'Identified root cause of mobile read-only skew'],
        evaluationCriteria: { crossPlatformAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L3-002-S2',
        title: 'Design Touch-Native Accessory Bar & Long-Press Block Menu',
        objective: 'In Design Canvas: design mobile above-keyboard accessory bar and long-press block action drawer.',
        instructions: 'Open Design Canvas, design mobile sticky accessory toolbar with quick block insert buttons (+, Text, H1, Checklist), and define gesture rules.',
        expectedActions: ['Design mobile accessory bar sitting directly above the soft keyboard', 'Provide quick-insert buttons for Heading, Checklist, Image, and Table', 'Design bottom sheet block options menu triggered on long-press or tap-and-hold', 'Save Cross-Platform Parity Variant'],
        successCriteria: ['Users can execute all core block formatting actions on mobile with 1 tap', 'Interaction continuity maintained between mobile and desktop workflows'],
        evaluationCriteria: { mobileTouchDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Sticky accessory bar above keyboard vs floating action button (FAB)', 'Long-press gesture vs dedicated 3-dot block menu button'],
    pressureEvents: ['Product VP: Mobile monthly active editing users must grow by 30% this quarter'],
    expectedSolution: 'Translate desktop hover controls into sticky mobile accessory bar above the keyboard; replace hover handles with swipe gestures or 3-dot tap menus.',
    acceptableApproaches: ['Above-keyboard accessory bar with quick insert pills', 'Bottom drawer action sheet triggered on block tap'],
    failureConditions: ['Mobile accessory bar overlaps the active typing cursor', 'Requiring typing raw markdown symbols on mobile keyboards'],
    finalDeliverable: 'Cross-platform interaction specification providing full editing parity on mobile touchscreens.',
    evaluationCriteria: { crossPlatformParity: 40, interactionElegance: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Cross-Platform Interaction Design & Continuity',
    taskType: 'cross_platform_ux'
  },

  {
    id: 'UX-L3-003',
    title: 'Accessible Screen Reader Journey & Complex Focus Management Design',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Apple / Accessibility Design Studio',
    department: 'Inclusive Technology & Screen Reader Ergonomics',
    domain: 'Consumer Tech / Deep Accessibility Architecture',
    skills: ['accessibility_wcag', 'screen_reader_semantics', 'focus_management', 'aria_architecture'],
    coreCompetencies: ['screen_reader_journey_mapping', 'accessible_focus_choreography', 'aria_live_design'],
    secondarySkills: ['voiceover_testing', 'keyboard_navigation'],
    skillTags: ['a11y', 'screen_reader', 'focus_management', 'aria_live', 'inclusive_design'],
    situation: 'Blind users navigating the online flight booking flow using Apple VoiceOver or NVDA report that dynamic flight search updates are not announced, and selecting a seat sends focus back to the top of the page.',
    problem: 'The seat selector dynamically updates DOM nodes without `aria-live="polite"` regions, lacks a logical heading structure, and fails to manage keyboard focus when navigating an interactive 2D seat map.',
    mission: 'Design an accessible screen reader journey for the flight booking flow: define semantic ARIA live regions for fare updates, choreograph focus movement across the seat map grid (using arrow keys), and deliver complete VoiceOver documentation.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { standard: 'W3C WAI-ARIA Authoring Practices 1.2 & WCAG 2.1 AAA' }
    },
    availableEvidence: [
      'VoiceOver testing video: Screen reader silent when user clicks "Search Flights"; user sits waiting for 30 seconds unaware results loaded',
      'Seat map audit: 180 seats rendered as unlabelled flat div elements with no row or column coordinates'
    ],
    subtasks: [
      {
        id: 'UX-L3-003-S1',
        title: 'Audit Screen Reader Experience & Map Silent Drop Points',
        objective: 'Review VoiceOver session recordings and identify missing spoken notifications and focus jumps.',
        instructions: 'Open Research Notes Tool, examine screen reader transcript logs, and identify unannounced asynchronous updates.',
        expectedActions: ['Inspect screen reader transcript in Research Notes', 'Identify lack of aria-live announcements during flight filtering', 'Document focus reset to document root on seat selection'],
        successCriteria: ['Mapped all silent failure points across flight booking journey', 'Documented absence of grid keyboard navigation rules'],
        evaluationCriteria: { a11yAudit: 50, screenReaderInsight: 50 }
      },
      {
        id: 'UX-L3-003-S2',
        title: 'Choreograph Focus Sequence & ARIA Live Announcements',
        objective: 'Define semantic ARIA markup specifications, arrow-key 2D grid focus rules, and polite spoken feedback.',
        instructions: 'Open Design Canvas, design accessible seat map interaction specs: define role="grid", row/col labels, aria-live status box, and save spec.',
        expectedActions: ['Specify role="grid" with role="row" and role="gridcell" for seat map', 'Define arrow key navigation rules (Up/Down for rows, Left/Right for seats)', 'Specify aria-live="polite" announcement: "Seat 14B, Window, Selected. Total fare updated to $340"', 'Save Accessible Flight Booking Specification'],
        successCriteria: ['Blind users can independently select flight and seat with zero sighted assistance', 'Complete VoiceOver announcement transcript specified for every interaction'],
        evaluationCriteria: { a11yArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['aria-live="assertive" (interrupts immediately) vs aria-live="polite" (waits for speech pause)', '2D grid arrow navigation vs standard linear Tab sequence'],
    pressureEvents: ['Federal Aviation Administration (FAA) Accessibility mandate inspection in 48 hours'],
    expectedSolution: 'Specify role="grid" for seat map; use roving tabindex for arrow key navigation; add aria-live="polite" container for fare announcements; retain focus on active seat.',
    acceptableApproaches: ['W3C WAI-ARIA Grid design pattern with roving tabindex', 'Linear list alternative view for screen reader users'],
    failureConditions: ['Screen reader announces raw unformatted price code strings', 'Focus lost or reset to top of document during booking steps'],
    finalDeliverable: 'Comprehensive Accessibility Specification Document with focus choreography and VoiceOver script.',
    evaluationCriteria: { a11yExcellence: 40, interactionChoreography: 30, testValidation: 30 },
    workplaceContext: 'Mission-Critical Inclusive Design & Screen Reader Architecture',
    taskType: 'accessibility_architecture'
  },

  {
    id: 'UX-L3-004',
    title: 'Design System Migration: Deprecating Legacy Components Without Disruption',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Uber / Base Design System Team',
    department: 'Design Platform & Core Systems',
    domain: 'Mobility / Design System Migration & Governance',
    skills: ['design_systems', 'component_migration', 'design_governance', 'developer_handoff'],
    coreCompetencies: ['design_system_migration', 'legacy_deprecation', 'component_refactoring'],
    secondarySkills: ['token_mapping', 'governance_models'],
    skillTags: ['design_systems', 'migration', 'deprecation', 'governance', 'refactoring'],
    situation: 'The company launched Base Design System v4, but 60 product squads still use legacy v2 components because upgrading breaks existing layouts, resulting in fragmented visual styles and double bundle size.',
    problem: 'The design system team introduced breaking changes to component dimensions and prop names without providing migration token mapping, backward-compatible shims, or automated codemods.',
    mission: 'Architect a non-disruptive design system migration strategy: build 1-to-1 token mapping translation matrices, design backward-compatible component drop-in replacements, and publish a phased deprecation guide.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes', 'project_board'],
      environment: { system: 'Uber Base UI v2 -> v4 Migration' }
    },
    availableEvidence: [
      'Engineering debt audit: 420 legacy Modal and Form components across rider and driver apps',
      'Sprint retrospective: Squads spend 3 weeks per quarter trying to migrate components and giving up'
    ],
    subtasks: [
      {
        id: 'UX-L3-004-S1',
        title: 'Analyze Legacy Component Breaking Changes & Token Divergence',
        objective: 'Compare v2 Modal and Input components against v4 specs and catalog breaking layout shifts.',
        instructions: 'Open Research Notes Tool, examine v2 vs v4 component comparison, and document breaking changes.',
        expectedActions: ['Inspect dimension and padding differences in Research Notes', 'Identify breaking prop changes: size="compact" renamed to density="high"'],
        successCriteria: ['Mapped all breaking visual and API differences', 'Identified primary friction preventing squad adoption'],
        evaluationCriteria: { auditThoroughness: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L3-004-S2',
        title: 'Design 1-to-1 Migration Token Matrix & Backward-Compatible Shims',
        objective: 'Construct visual translation matrix and design non-breaking drop-in component wrappers.',
        instructions: 'Open Design Canvas, build comprehensive v2-to-v4 component mapping matrix, design drop-in shims, and post deprecation roadmap.',
        expectedActions: ['Create visual token migration lookup table in Design Canvas', 'Design drop-in replacement wrappers maintaining v2 layout boundaries', 'Author 3-phase deprecation roadmap: Soft Deprecate -> Warning -> Sunset', 'Save Migration Guide to Project Board'],
        successCriteria: ['Product squads can upgrade components without manual layout rework', 'Clear 6-month deprecation timeline with automated migration tooling'],
        evaluationCriteria: { migrationStrategy: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Hard breaking release vs backward-compatible adapter shims', 'Enforcing adoption via linter warnings vs offering automated codemods'],
    pressureEvents: ['Engineering Leadership: App bundle size exceeded 50MB limit due to shipping duplicate design system versions'],
    expectedSolution: 'Provide 1-to-1 token translation guide; build v4 components with backward-compatible v2 prop adapters; publish 3-phase governance timeline.',
    acceptableApproaches: ['Adapter wrapper pattern for legacy component compatibility', 'Automated Figma token swapper plugin and ESLint codemod'],
    failureConditions: ['Upgrading component breaks existing layout in production', 'Deprecation timeline unrealistic for high-velocity squads'],
    finalDeliverable: 'Design System v2-to-v4 Migration Playbook with token mapping and non-disruptive component shims.',
    evaluationCriteria: { systemArchitecture: 40, governanceStrategy: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Design System Governance & Scale',
    taskType: 'design_governance'
  },

  {
    id: 'UX-L3-005',
    title: 'SaaS Pricing Tier Comparison & Cognitive Decision Architecture',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Slack / Enterprise Pricing & Packaging',
    department: 'Growth Experience & Monetization',
    domain: 'Enterprise SaaS / Pricing Psychology & Conversion',
    skills: ['growth_design', 'pricing_psychology', 'decision_architecture', 'information_design'],
    coreCompetencies: ['pricing_tier_design', 'choice_architecture', 'anchoring_heuristics'],
    secondarySkills: ['feature_matrices', 'social_proof'],
    skillTags: ['pricing', 'growth_design', 'decision_architecture', 'anchoring', 'saas'],
    situation: 'Visitors to the enterprise pricing page suffer from decision paralysis: 42% leave without choosing a plan, and the high-margin "Business+" tier receives only 4% of total signups.',
    problem: 'The pricing page presents 4 identical-looking cards with 35 bullet points each, lacking visual anchoring, clear buyer persona differentiation, or an obvious recommended default.',
    mission: 'Re-architect the pricing decision page: employ behavioral psychology anchoring (highlighting Business+ as "Most Popular"), consolidate 35 bullet points into 5 high-impact differentiator categories, and design an interactive feature matrix.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback'],
      environment: { targetMetric: 'Business+ Tier Adoption & Overall Conversion' }
    },
    availableEvidence: [
      'Hotjar recording: Users scroll up and down repeatedly trying to compare features across 4 dense columns',
      'Exit intent survey: "I couldn\'t tell what the difference was between Pro and Business+ so I picked Free"'
    ],
    subtasks: [
      {
        id: 'UX-L3-005-S1',
        title: 'Analyze Pricing Friction & Cognitive Choice Overload',
        objective: 'Review pricing page heatmaps and analyze the choice overload effect across 4 tiers.',
        instructions: 'Open User Feedback Tool, review pricing page analytics, and map feature list redundancy.',
        expectedActions: ['Inspect user scroll depth and hesitation heatmaps in User Feedback Tool', 'Identify lack of visual hierarchy and feature comparison fatigue'],
        successCriteria: ['Quantified 42% decision paralysis exit rate', 'Identified failure to differentiate Pro vs Business+ benefits'],
        evaluationCriteria: { behavioralAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L3-005-S2',
        title: 'Design Anchored 3-Tier Layout with High-Impact Differentiators',
        objective: 'Apply visual anchoring: elevate Business+ card with badge, highlight key differentiators, and collapse detail matrix.',
        instructions: 'Open Design Canvas, design anchored pricing layout with elevated center card, clear "Best for teams of 20-200" personas, and expandable comparison matrix.',
        expectedActions: ['Elevate Business+ card with visual elevation shadow and "Most Popular" tag', 'Condense features into 5 core value propositions per tier', 'Provide expandable full feature comparison matrix below the fold', 'Save Anchored Pricing Variant'],
        successCriteria: ['Visual anchoring immediately draws eye to high-margin Business+ tier', 'Feature differences understandable in < 15 seconds'],
        evaluationCriteria: { growthDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Monthly vs Annual billing toggle positioning and savings callout', 'Hiding Enterprise tier pricing behind "Contact Sales" CTA vs self-serve checkout'],
    pressureEvents: ['Monetization Strategy Sync tomorrow: Chief Revenue Officer reviewing pricing page redesign proposals'],
    expectedSolution: 'Visual anchoring on center tier (Business+); distinct color/shadow; 5 key bullets only; clear persona tags ("Best for scaling teams"); expandable feature matrix below.',
    acceptableApproaches: ['Visual anchoring with elevated "Recommended" plan card', 'Interactive pricing slider based on team seat count'],
    failureConditions: ['Card sizes uneven causing disorienting layout rhythm', 'Hidden fees or terms of annual commitment not disclosed transparently'],
    finalDeliverable: 'Behaviorally optimized SaaS pricing page design driving increased conversion to high-value tiers.',
    evaluationCriteria: { growthArchitecture: 40, psychologicalDesign: 30, testValidation: 30 },
    workplaceContext: 'SaaS Monetization & Cognitive Choice Architecture',
    taskType: 'monetization_design'
  },

  {
    id: 'UX-L3-006',
    title: 'Micro-Interaction Animation Specs & Motion Accessibility (Prefers-Reduced-Motion)',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Stripe / Dashboard Experience & Interactions',
    department: 'Motion Design & Design Engineering',
    domain: 'Fintech / Micro-Interactions & Motion',
    skills: ['motion_design', 'micro_interactions', 'accessibility_wcag', 'css_animation'],
    coreCompetencies: ['motion_choreography', 'reduced_motion_compliance', 'interaction_polish'],
    secondarySkills: ['spring_curves', 'duration_tokens'],
    skillTags: ['motion', 'animation', 'micro_interactions', 'prefers_reduced_motion', 'wcag'],
    situation: 'Vestibular disorder users report dizziness and nausea when navigating the dashboard due to aggressive multi-directional sliding page transitions and bouncing card animations.',
    problem: 'Animations lack `prefers-reduced-motion` fallbacks, durations are too long (800ms feels sluggish), and spring curves are over-damped with excessive bouncy physics.',
    mission: 'Choreograph high-craft micro-interactions: establish an enterprise motion token scale (150ms-300ms, cubic-bezier ease-out), specify meaningful functional transitions, and provide non-animated instant/fade fallbacks for reduced-motion.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'research_notes'],
      environment: { standard: 'WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions)' }
    },
    availableEvidence: [
      'Accessibility complaint: "The spinning and sliding charts make me feel physically ill; I had to close the app"',
      'UX polish audit: Spring animation duration 850ms makes the dashboard feel slow and un-professional'
    ],
    subtasks: [
      {
        id: 'UX-L3-006-S1',
        title: 'Audit Motion Durations & Vestibular Motion Triggers',
        objective: 'Inspect motion specs in Research Notes Tool and identify vestibular triggers.',
        instructions: 'Open Research Notes Tool, examine animation timeline curves, and isolate dizzying parallax and slide effects.',
        expectedActions: ['Inspect CSS transition curves in Research Notes', 'Identify 850ms bounce animations and missing prefers-reduced-motion media queries'],
        successCriteria: ['Documented vestibular trigger animations', 'Quantified unnecessary interaction latency'],
        evaluationCriteria: { motionAudit: 50, accessibilityInsight: 50 }
      },
      {
        id: 'UX-L3-006-S2',
        title: 'Choreograph Enterprise Motion Tokens & Reduced-Motion Specs',
        objective: 'Define tokenized motion curves (Fast: 150ms, Base: 250ms), subtle fade-in, and instant zero-motion fallback.',
        instructions: 'In Design Canvas, define motion token specification, replace bouncy springs with clean cubic-bezier(0.16, 1, 0.3, 1), and write reduced-motion rules.',
        expectedActions: ['Establish motion token scale: motion-fast (150ms), motion-base (250ms)', 'Apply subtle 4px transformY ease-out instead of 100px screen slides', 'Specify instant opacity cross-fade when prefers-reduced-motion is active', 'Save Motion Specification to Project Board'],
        successCriteria: ['Dashboard feels snappy, responsive, and polished (< 250ms)', '100% compliant with WCAG 2.1 AA animation standards for vestibular users'],
        evaluationCriteria: { motionChoreography: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Subtle opacity fade vs complete zero-duration instant state change for reduced-motion users', 'CSS transitions vs Web Animations API / Framer Motion specifications'],
    pressureEvents: ['Accessibility Lawsuit Risk: All non-compliant motion triggers must be patched immediately'],
    expectedSolution: 'Define motion tokens: Fast 150ms, Base 250ms; use cubic-bezier(0.16, 1, 0.3, 1); wrap all motion in @media (prefers-reduced-motion: reduce) { transition: none; }.',
    acceptableApproaches: ['Tokenized motion system with reduced-motion fallback', 'Functional micro-interactions focused on state feedback without decorative bounce'],
    failureConditions: ['Animations continue to slide or zoom when reduced-motion is requested', 'Animation durations exceed 400ms making UI feel laggy'],
    finalDeliverable: 'Enterprise Motion Design Specification with full accessibility compliance and timing tokens.',
    evaluationCriteria: { motionCraft: 40, accessibilityCompliance: 30, testValidation: 30 },
    workplaceContext: 'High-Craft Motion Design & Accessibility Standards',
    taskType: 'motion_design'
  },

  {
    id: 'UX-L3-007',
    title: 'Continuous Usability Telemetry: Heatmap & Funnel Drop-off Diagnostic',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Airbnb / Host Onboarding Experience',
    department: 'Host Growth & Experience Telemetry',
    domain: 'Hospitality / Conversion Telemetry Diagnostics',
    skills: ['analytics_ux', 'heatmap_analysis', 'funnel_diagnostics', 'user_research'],
    coreCompetencies: ['quantitative_telemetry_analysis', 'funnel_diagnostics', 'usability_heuristics'],
    secondarySkills: ['mixpanel', 'hotjar'],
    skillTags: ['analytics', 'heatmaps', 'funnel', 'drop_off', 'host_onboarding'],
    situation: 'Prospective property hosts drop off by 48% at the "Pricing & Availability" step of onboarding, causing a shortage of rental listings in high-demand vacation markets.',
    problem: 'Telemetry shows users spend 7 minutes on the pricing step before leaving; scroll maps reveal users never see the Smart Pricing toggle, and rage clicks cluster around an unclickable tooltip icon.',
    mission: 'Triangulate Hotjar heatmaps, session recordings, and Mixpanel funnels: diagnose the 3 root causes of host onboarding friction, propose data-backed UI fixes, and estimate business revenue impact.',
    workspace: {
      tools: ['design_brief', 'design_canvas', 'user_feedback', 'research_notes'],
      environment: { tools: 'Mixpanel Analytics / Hotjar Heatmap Engine' }
    },
    availableEvidence: [
      'Mixpanel funnel: 20,000 started listing -> 10,400 completed pricing step (48% drop-off)',
      'Heatmap: 6,400 dead clicks on static info icon that looks like a button'
    ],
    subtasks: [
      {
        id: 'UX-L3-007-S1',
        title: 'Triangulate Funnels, Heatmaps & Rage Click Telemetry',
        objective: 'Analyze telemetry dashboards in User Feedback Tool and identify primary drop-off anomalies.',
        instructions: 'Open User Feedback Tool, examine scroll maps, click heatmaps, and session drop-off timestamps.',
        expectedActions: ['Inspect click map in User Feedback Tool', 'Identify unclickable icon attracting 6,400 rage clicks', 'Notice scroll heatmap showing 70% of hosts never scroll past calendar grid'],
        successCriteria: ['Identified 3 distinct usability bugs from quantitative telemetry', 'Pinpointed Smart Pricing discovery failure'],
        evaluationCriteria: { telemetrySynthesis: 50, diagnosticPrecision: 50 }
      },
      {
        id: 'UX-L3-007-S2',
        title: 'Design Frictionless Pricing Step with Smart Pricing Pre-select',
        objective: 'Reorganize layout: Move Smart Pricing toggle to top, clarify pricing calculator, and fix dead clicks.',
        instructions: 'Open Design Canvas, design streamlined pricing screen with upfront automated pricing suggestion and interactive help drawer.',
        expectedActions: ['Position Smart Pricing recommendation at top with clear estimated earnings callout', 'Make info icon open interactive explainer drawer on click', 'Simplify calendar availability selection with clear default blocks', 'Save Optimized Host Pricing Variant'],
        successCriteria: ['Eliminated rage clicks on info icon', 'Projected to recover 5,000 lost hosts per month, generating $2.4M in GMV'],
        evaluationCriteria: { redesignExecution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Automated Smart Pricing pre-selected as default vs requiring manual input first', 'Modal explanation vs inline expandable helper text'],
    pressureEvents: ['Host Growth Director: Vacation rental season starts in 3 weeks; host supply is critical'],
    expectedSolution: 'Move Smart Pricing recommendation above the fold; show dynamic monthly earnings estimate ($1,850/mo); turn static icon into interactive popover.',
    acceptableApproaches: ['Data-driven layout reorganization based on scroll and click telemetry', 'Automated pricing wizard with single slider'],
    failureConditions: ['Redesign still requires scrolling past large calendar to set base price', 'Failing to address the dead-click rage hot spot'],
    finalDeliverable: 'Telemetry Diagnostic Report and high-converting Host Pricing screen redesign.',
    evaluationCriteria: { telemetryInterpretation: 40, designSolution: 30, testValidation: 30 },
    workplaceContext: 'Product Growth Analytics & Funnel Friction Remediation',
    taskType: 'funnel_diagnostics'
  },

  {
    id: 'UX-L3-008',
    title: 'Cross-Functional Design Critique Defense & Engineering Handoff Specs',
    role: 'ui_ux',
    level: 3,
    difficulty: 'Advanced',
    company: 'Stripe / Dashboard Engineering & Product Experience',
    department: 'Design Systems & Developer Handoff',
    domain: 'Fintech / Cross-Functional Collaboration',
    skills: ['design_defense', 'developer_handoff', 'stakeholder_alignment', 'edge_case_matrices'],
    coreCompetencies: ['design_critique_defense', 'engineering_handoff_specs', 'edge_case_modeling'],
    secondarySkills: ['tokens_handoff', 'responsive_constraints'],
    skillTags: ['design_critique', 'developer_handoff', 'edge_cases', 'stakeholders', 'specs'],
    situation: 'During the design critique with Engineering and Product Management, engineers push back on the new billing portal redesign, claiming the micro-interactions are technically unfeasible and edge cases were ignored.',
    problem: 'The Figma designs show only the "Happy Path" with short mock names and small numbers, omitting empty states, error boundaries, 100-character name overflows, and technical implementation constraints.',
    mission: 'Defend the design with user data, author a comprehensive Edge Case Matrix (Null, Error, Loading, Overflow, Disconnected states), and generate pixel-perfect engineering handoff specifications with tokens.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'project_board', 'ai_assistant'],
      environment: { handoff: 'Figma Dev Mode / W3C Tokens' }
    },
    availableEvidence: [
      'Engineering Lead feedback: "What happens when a customer has a name with 80 characters? What happens when the network fails mid-transaction?"',
      'Critique recording: Product Manager questioned why the modal has a 400px height constraint on small screens'
    ],
    subtasks: [
      {
        id: 'UX-L3-008-S1',
        title: 'Construct Comprehensive Edge-Case State Matrix',
        objective: 'Catalog all 6 core UI states (Empty, Loading, Error, Partial, Overflow, Max Bounds).',
        instructions: 'Open Research Notes Tool, review Happy Path screens, and document all missing edge case states.',
        expectedActions: ['Identify missing edge cases: 100-char string overflow, currency formatting with 9 digits, network drop state', 'Document exact truncation rules (middle-truncation vs multi-line wrap)'],
        successCriteria: ['Mapped complete 6-state edge case matrix', 'Addressed 100% of engineering feasibility objections'],
        evaluationCriteria: { edgeCaseThoroughness: 50, technicalAwareness: 50 }
      },
      {
        id: 'UX-L3-008-S2',
        title: 'Author Developer Handoff Specs & Defend Rationale to AI Lead',
        objective: 'In Design Canvas: specify layout constraints, token mappings, and present defense to Elena Rostova.',
        instructions: 'Update Design Canvas with full developer handoff annotations, define responsive layout constraints, and brief AI Lead in Slack.',
        expectedActions: ['Annotate spacing, typography, and color tokens in Design Canvas', 'Specify text overflow behavior: text-overflow: ellipsis with tooltip on hover', 'Present data-backed defense to AI Design Lead Elena Rostova', 'Save Handoff Package to Project Board'],
        successCriteria: ['Engineering signs off on handoff specs with zero ambiguity', 'Design defended successfully using real user data and technical empathy'],
        evaluationCriteria: { handoffClarity: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Text overflow: Ellipsis truncation vs multi-line expanding container', 'Design token naming parity with frontend CSS variable names'],
    pressureEvents: ['Sprint planning in 2 hours: Engineering will drop billing redesign from sprint if specs are incomplete'],
    expectedSolution: 'Provide complete state matrix (Default, Loading Skeleton, Empty, Error Banner, Long String Overflow); annotate with semantic design tokens; defend with user data.',
    acceptableApproaches: ['Comprehensive Figma Dev Mode handoff spec with edge case matrix', 'Design system token mapping with responsive constraint annotations'],
    failureConditions: ['Ignoring engineering constraints and insisting on impractical custom physics', 'Omitting error and loading states from handoff deliverables'],
    finalDeliverable: 'Complete Developer Handoff Package with Edge Case Matrix and defended design rationale.',
    evaluationCriteria: { handoffQuality: 40, stakeholderAlignment: 30, testValidation: 30 },
    workplaceContext: 'Cross-Functional Design Defense & Engineering Collaboration',
    taskType: 'developer_handoff'
  },

  // ========================================================
  // LEVEL 4: CRITICAL INCIDENT SIMULATION (8 TASKS, 16 SUBTASKS)
  // ========================================================
  {
    id: 'UX-L4-001',
    title: 'Critical Mobile Checkout Drop-off Collapse Post-Redesign Rollout',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Target / Mobile Web Storefront',
    department: 'Digital Experience Command Center',
    domain: 'Retail E-Commerce / Emergency Conversion Recovery',
    skills: ['emergency_redesign', 'conversion_opt', 'incident_response', 'usability_heuristics'],
    coreCompetencies: ['crisis_triage', 'conversion_recovery', 'rapid_prototyping'],
    secondarySkills: ['a_b_testing', 'heuristics'],
    skillTags: ['conversion_crash', 'checkout_incident', 'p1_design', 'mobile_friction', 'crisis'],
    situation: 'At 10:00 AM, following the v5.0 checkout release, mobile checkout conversion crashes by 64%. Over $180,000 in orders are abandoned every hour, triggering a P1 executive war room.',
    problem: 'A newly introduced "Floating Sticky Buy Button" on mobile overlaps the credit card CVV security code input on smaller screens (iPhone SE / Galaxy S21), making it physically impossible for mobile shoppers to enter their CVV code.',
    mission: 'Step into the live P1 incident: diagnose the floating button viewport collision in telemetry, design an immediate emergency layout hotfix unblocking the CVV field, verify touch clearance, and restore mobile revenue.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'user_feedback', 'project_board', 'ai_assistant'],
      environment: { incidentChannel: '#war-room-checkout', severity: 'P1 Critical Revenue Loss' }
    },
    availableEvidence: [
      '[WAR ROOM] Datadog Alert: Mobile Checkout Success Rate plummeted from 78% to 14%',
      'Customer tweet: "Target app won\'t let me type my CVV! The big red button is literally covering the box!"'
    ],
    subtasks: [
      {
        id: 'UX-L4-001-S1',
        title: 'Triage Viewport Collision & Quantify Revenue Bleed',
        objective: 'Inspect user feedback screenshots in mobile mode and identify button overlap root cause.',
        instructions: 'Open User Feedback Tool, review screenshot captures on iPhone SE viewports, and confirm button obscuring CVV input.',
        expectedActions: ['Inspect incoming customer screenshots in User Feedback Tool', 'Identify position: fixed bottom CTA obscuring CVV input field on screens < 400px', 'Post incident diagnosis in Slack war room'],
        successCriteria: ['Diagnosed viewport collision root cause within 90 seconds', 'Quantified that 34% of mobile devices are affected by overlap bug'],
        evaluationCriteria: { triageSpeed: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L4-001-S2',
        title: 'Design Emergency Layout Hotfix & Restore Field Clearance',
        objective: 'In Design Canvas: convert floating button to natural document flow with 80px safe viewport padding.',
        instructions: 'Open Design Canvas, remove fixed overlap, provide 80px bottom safe area padding, verify CVV field is 100% accessible, and export hotfix.',
        expectedActions: ['Remove position: fixed overlap constraint in Design Canvas', 'Anchor checkout CTA with dynamic safe-area-inset-bottom padding', 'Ensure CVV field maintains 48px clearance above any sticky footer', 'Save Emergency Hotfix Variant to Project Board'],
        successCriteria: ['CVV field 100% visible and clickable across all mobile viewport sizes', 'Mobile checkout conversion recovers to 78% baseline'],
        evaluationCriteria: { emergencyHotfix: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Complete rollback to v4 legacy layout vs fast hotfix of sticky button positioning', 'Inline checkout button vs bottom sheet button with auto-scroll on focus'],
    pressureEvents: ['VP of E-Commerce in Slack: "We are losing $3,000 every minute. Do we roll back or do you have a hotfix ready?"'],
    expectedSolution: 'Remove blocking fixed overlay; add padding-bottom: calc(80px + env(safe-area-inset-bottom)); auto-scroll input into view on focus.',
    acceptableApproaches: ['Emergency layout hotfix restoring field clearance and safe area padding', 'Rolling back sticky CTA to standard inline document flow button'],
    failureConditions: ['Hotfix still overlaps field on small 320px screens', 'Button pushed off-screen where users cannot find it'],
    finalDeliverable: 'Emergency Layout Hotfix specification restoring checkout conversion within 15 minutes.',
    evaluationCriteria: { crisisResolution: 40, mobileErgonomics: 30, testValidation: 30 },
    workplaceContext: 'P1 Production Mobile Conversion Collapse & Emergency Hotfix',
    taskType: 'production_incident'
  },

  {
    id: 'UX-L4-002',
    title: 'Regulatory Accessibility (ADA / WCAG 2.1 AA) Lawsuit Threat Audit',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Domino\'s Pizza / Digital Ordering Systems',
    department: 'Legal Compliance & Inclusive Design',
    domain: 'E-Commerce / ADA Legal Accessibility Compliance',
    skills: ['accessibility_wcag', 'legal_compliance', 'inclusive_design', 'screen_reader_semantics'],
    coreCompetencies: ['legal_ada_audit', 'wcag_remediation', 'crisis_compliance'],
    secondarySkills: ['keyboard_trapping', 'form_labels'],
    skillTags: ['ada_lawsuit', 'wcag_compliance', 'legal_threat', 'accessibility', 'critical'],
    situation: 'Legal counsel issued an emergency notice: a major civil rights legal firm served an intent-to-sue notice alleging 18 critical Americans with Disabilities Act (ADA) violations across our digital pizza builder.',
    problem: 'Blind and motor-impaired users cannot complete custom pizza orders: topping checkboxes lack associated `<label>` elements, keyboard focus gets trapped in the crust selector, and error alerts are silent.',
    mission: 'Step in as Lead Accessibility Architect: triage all 18 legal violations, redesign the pizza customization flow to achieve 100% WCAG 2.1 AA compliance, eliminate focus traps, and certify the legal audit report.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'research_notes', 'project_board'],
      environment: { standard: 'ADA Title III & WCAG 2.1 Level AA Legal Standard' }
    },
    availableEvidence: [
      'Legal notice: Exhibit A details 18 specific WCAG violations preventing screen reader users from ordering food',
      'Civil penalty risk: $75,000 fine plus class-action damages if not resolved within 30 days'
    ],
    subtasks: [
      {
        id: 'UX-L4-002-S1',
        title: 'Triage 18 Legal Violations & Isolate Blocking Failures',
        objective: 'Inspect legal complaint exhibit in Research Notes Tool and categorize violations by WCAG criteria.',
        instructions: 'Open Research Notes Tool, examine the 18 cited legal violations, and prioritize blocking barriers.',
        expectedActions: ['Review legal exhibit in Research Notes', 'Identify 3 critical blockers: 1. Keyboard focus trap in crust modal, 2. Missing form labels on toppings, 3. Low contrast prices'],
        successCriteria: ['Categorized all 18 legal violations under WCAG guidelines', 'Prioritized top 3 blocking user journey traps'],
        evaluationCriteria: { legalTriage: 50, standardsInsight: 50 }
      },
      {
        id: 'UX-L4-002-S2',
        title: 'Redesign Pizza Builder with Complete WCAG 2.1 AA Compliance',
        objective: 'Redesign customization flow in Design Canvas with accessible labels, focus loop, and 4.5:1 contrast.',
        instructions: 'Open Design Canvas, re-architect topping selector with explicit labels, focus trap release, and document legal certification report.',
        expectedActions: ['Redesign topping selectors with visible semantic <label> tags and aria-checked states', 'Eliminate keyboard trap in crust modal with Esc key release and Tab loop', 'Update price text to high-contrast Dark Gray (#1E293B, 11:1)', 'Save ADA-Compliant Variant to Project Board'],
        successCriteria: ['All 18 legal violations remediated and validated', 'Digital pizza builder fully accessible to blind and motor-impaired customers'],
        evaluationCriteria: { complianceArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Dedicated accessible text-only ordering flow vs remediating main visual builder', 'Overhauling existing design system components vs patching individual screens'],
    pressureEvents: ['General Counsel on phone: Legal settlement conference in 24 hours; we must show certified compliant designs'],
    expectedSolution: 'Wrap inputs in semantic labels; fix focus trap to allow Tab release; enforce 4.5:1 contrast on prices; attach aria-live updates for cart totals.',
    acceptableApproaches: ['Comprehensive WCAG 2.1 AA remediation across visual pizza builder', 'High-contrast accessible alternative view with full feature parity'],
    failureConditions: ['Any of the 18 cited legal violations remains un-addressed', 'Fixing accessibility breaks visual layout for sighted users'],
    finalDeliverable: 'ADA-Certified Pizza Builder redesign and Legal Compliance Audit Verification Report.',
    evaluationCriteria: { legalComplianceRigor: 40, accessibleDesign: 30, testValidation: 30 },
    workplaceContext: 'High-Stakes Legal Accessibility Remediation & ADA Defense',
    taskType: 'legal_accessibility'
  },

  {
    id: 'UX-L4-003',
    title: 'B2B Enterprise Client Churn Crisis Due to Cluttered Navigation',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Salesforce / Enterprise Cloud CRM',
    department: 'Executive Product Design & Customer Retention',
    domain: 'Enterprise SaaS / High-Stakes Customer Retention',
    skills: ['information_architecture', 'enterprise_ux', 'stakeholder_crisis', 'user_research'],
    coreCompetencies: ['crisis_retention_design', 'navigation_restructuring', 'stakeholder_negotiation'],
    secondarySkills: ['card_sorting', 'executive_workshops'],
    skillTags: ['churn_crisis', 'enterprise_nav', 'information_architecture', 'retention', 'p1'],
    situation: 'Three major enterprise customers representing $14M in annual recurring revenue (ARR) issued contract termination notices citing that the recent navigation update made the platform unusable for their 8,000 sales reps.',
    problem: 'A product team consolidated 50 features into a disjointed multi-level flyout menu where items jump around on hover, causing reps to take 3 times longer to log customer calls.',
    mission: 'Lead the emergency retention redesign: conduct rapid card sorting with enterprise sales leaders, design an intuitive customizable workspace navigation with pinned favorites, and present the turnaround plan.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'research_notes', 'project_board', 'ai_assistant'],
      environment: { stake: '$14 Million ARR Contract Renewal' }
    },
    availableEvidence: [
      'Cancellation notice from Fortune 50 customer: "Your latest navigation overhaul added 15 minutes of overhead per rep per day. We are migrating to a competitor."',
      'Usability metric: Time to log customer call increased from 45 seconds to 2 minutes 20 seconds'
    ],
    subtasks: [
      {
        id: 'UX-L4-003-S1',
        title: 'Triage Enterprise Customer Feedback & Map Workflow Friction',
        objective: 'Analyze cancellation letters in Research Notes Tool and map time-motion regressions.',
        instructions: 'Open Research Notes Tool, examine feedback from the 3 churned enterprise accounts, and identify core navigation bottlenecks.',
        expectedActions: ['Inspect customer cancellation complaints in Research Notes', 'Identify hover-based flyout menu closing accidentally and lost call logging shortcuts'],
        successCriteria: ['Pinpointed primary workflow regression causing churn threat', 'Mapped 3 high-frequency daily tasks that were slowed down'],
        evaluationCriteria: { customerEmpathy: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L4-003-S2',
        title: 'Design Customizable Quick-Access Nav & Present Turnaround Plan',
        objective: 'In Design Canvas: design persistent top bar with pinned Quick Action shortcuts and favorites rail.',
        instructions: 'Open Design Canvas, design streamlined navigation with 1-click "Log Call" quick action, persistent favorites dock, and save turnaround presentation.',
        expectedActions: ['Design persistent Quick Action header with 1-click "Log Call" and "New Lead"', 'Add customizable pinned favorites sidebar where reps pin their 5 daily tools', 'Replace hover flyout menus with predictable click-to-open categorized hub', 'Save Enterprise Retention Design to Project Board'],
        successCriteria: ['Time to log a call reduced back to under 30 seconds', 'Turnaround redesign accepted by enterprise client executive sponsors'],
        evaluationCriteria: { enterpriseArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Customizable favorites rail vs standardized static navigation', 'Rolling back immediately vs presenting fast forward turnaround redesign in 48 hours'],
    pressureEvents: ['Chief Commercial Officer: "If we don\'t have a solution to show their VP tomorrow at 9 AM, the contract is canceled"'],
    expectedSolution: 'Replace unstable hover flyouts with click-activated menu; add top-level Quick Action buttons ("Log Call", "New Deal"); provide customizable pinned favorites dock.',
    acceptableApproaches: ['Quick-action bar with customizable pinned favorites', 'Task-oriented command palette with keyboard shortcuts'],
    failureConditions: ['Presenting another complex multi-level menu without user customization', 'Failing to solve the call logging time regression'],
    finalDeliverable: 'Enterprise Retention Navigation Redesign and Executive Customer Presentation.',
    evaluationCriteria: { retentionDesign: 40, enterpriseUsability: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Customer Retention & Emergency Navigation Re-architecture',
    taskType: 'retention_crisis'
  },

  {
    id: 'UX-L4-004',
    title: 'Mobile App Store Rating Crash (1.8 Stars) After Navigation Overhaul',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Snapchat / Core Navigation & Camera UI',
    department: 'Consumer Product Experience & Crisis Response',
    domain: 'Social Media / High-Velocity Consumer Apps',
    skills: ['crisis_synthesis', 'mobile_ux', 'user_sentiment', 'rapid_prototyping'],
    coreCompetencies: ['user_sentiment_triage', 'rapid_prototype_turnaround', 'consumer_retention'],
    secondarySkills: ['app_store_triage', 'bottom_nav_ergonomics'],
    skillTags: ['rating_crash', 'app_store', 'sentiment_crisis', 'navigation_overhaul', 'mobile'],
    situation: 'Following a bold redesign that combined Stories and Direct Messages into a single feed, the iOS App Store rating crashed from 4.7 stars to 1.8 stars with over 150,000 negative 1-star reviews in 48 hours.',
    problem: 'Users feel disoriented and violated: friends\' private messages are mixed with public brand content, swipe gestures to access the camera no longer work, and core wayfinding is broken.',
    mission: 'Analyze 150,000 App Store review themes using sentiment clustering, design an emergency reconciliation layout restoring clear separation between Friends and Media, and publish an interactive prototype.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'user_feedback', 'project_board', 'ai_assistant'],
      environment: { targetMetric: 'App Store Rating Recovery & User Retention' }
    },
    availableEvidence: [
      'App Store crisis: 154,000 1-star reviews in 48 hours: "Give us back our old Snapchat! This new update is confusing and ruined the app"',
      'Daily Active Users (DAU): Down 12% in the 3 days following the redesign launch'
    ],
    subtasks: [
      {
        id: 'UX-L4-004-S1',
        title: 'Cluster App Store Review Sentiment & Identify Fatal Flaws',
        objective: 'Analyze top 1-star review themes in User Feedback Tool and identify primary user grievances.',
        instructions: 'Open User Feedback Tool, review sentiment clusters from App Store complaints, and isolate the top 2 fatal design flaws.',
        expectedActions: ['Inspect App Store review sentiment clusters in User Feedback Tool', 'Identify #1 grievance: Mingling personal messages with algorithm brand stories', 'Identify #2 grievance: Broken swipe-to-camera muscle memory'],
        successCriteria: ['Synthesized 150k reviews into 2 clear actionable design failures', 'Documented violation of user muscle memory'],
        evaluationCriteria: { sentimentAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L4-004-S2',
        title: 'Design Reconciled 3-Pane Architecture & Muscle Memory Restore',
        objective: 'In Design Canvas: restore left pane (Friends/Chats) and right pane (Discover/Media) with center Camera.',
        instructions: 'Open Design Canvas, re-separate personal chats from algorithmic media, restore intuitive horizontal swipe navigation, and export prototype.',
        expectedActions: ['Re-establish strict boundary between Friends (Left) and Media (Right)', 'Restore center camera viewport as primary launch screen', 'Preserve swipe muscle memory with clear visual tab affordances', 'Save Reconciled Consumer Layout to Project Board'],
        successCriteria: ['Personal messages cleanly separated from commercial media', 'Camera swipe interaction restored with smooth gesture feedback'],
        evaluationCriteria: { consumerUX: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Total rollback to old version vs reconciled hybrid layout preserving new advertising formats', 'Public statement and apology from design leadership'],
    pressureEvents: ['Board Emergency Meeting: Share price dropped 8% following viral celebrity tweets criticizing redesign'],
    expectedSolution: 'Separate Friends and Media onto distinct screens; restore camera as center anchor; re-enable swipe gestures; add clear top tab headers.',
    acceptableApproaches: ['Reconciled hybrid layout restoring spatial separation', 'Phased rollback with opt-in beta testing for future updates'],
    failureConditions: ['Insisting on keeping personal messages and brand ads in the same feed', 'Ignoring user muscle memory for camera gestures'],
    finalDeliverable: 'Reconciled Consumer Navigation Prototype restoring user trust and spatial clarity.',
    evaluationCriteria: { consumerEmpathy: 40, gestureRestoration: 30, testValidation: 30 },
    workplaceContext: 'Viral Consumer Sentiment Crisis & Rapid Turnaround',
    taskType: 'sentiment_crisis'
  },

  {
    id: 'UX-L4-005',
    title: 'Brand Rebrand Rollout Usability Crisis: Legibility & Customer Backlash',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Uber / Brand Identity & Consumer App',
    department: 'Brand Systems & Product Experience',
    domain: 'Mobility / Rebrand Rollout & Brand Usability',
    skills: ['brand_usability', 'typography', 'visual_design', 'crisis_synthesis'],
    coreCompetencies: ['brand_usability_alignment', 'legibility_restoration', 'design_compromise'],
    secondarySkills: ['app_icon_design', 'contrast_tuning'],
    skillTags: ['rebrand_backlash', 'legibility', 'typography', 'brand_identity', 'crisis'],
    situation: 'Following a massive global rebrand, users cannot find the app icon on their phone home screens, the ultra-thin geometric typeface is unreadable on outdoor mobile screens, and brand sentiment is -62.',
    problem: 'The new branding team prioritized abstract high-fashion aesthetics over digital usability: the app icon looks like a generic symbol, body text uses a 300-weight hairline font, and brand colors lack accessibility contrast.',
    mission: 'Lead the emergency brand-usability reconciliation: restore recognized iconography to the mobile app icon, thicken typography to accessible 400/600 weights, adjust brand palette contrast, and restore user recognition.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'research_notes', 'project_board', 'ai_assistant'],
      environment: { brand: 'Global Rebrand Emergency Reconciliation' }
    },
    availableEvidence: [
      'App store reviews: "I was stranded at the airport for 20 minutes because I couldn\'t find the Uber app on my phone!"',
      'Accessibility contrast test: Hairline brand font fails contrast and legibility under direct sunlight'
    ],
    subtasks: [
      {
        id: 'UX-L4-005-S1',
        title: 'Audit Rebrand Legibility Failures & Home Screen Anonymity',
        objective: 'Inspect brand design tokens in Research Notes Tool and catalog readability failures.',
        instructions: 'Open Research Notes Tool, examine outdoor sunlight legibility tests and app icon recognition scores.',
        expectedActions: ['Review brand token audit in Research Notes', 'Identify unrecognizable app icon and unreadable 300-weight hairline font on outdoor screens'],
        successCriteria: ['Pinpointed aesthetic vs usability conflicts', 'Documented 42% decrease in brand recognition speed on home screen'],
        evaluationCriteria: { brandAudit: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L4-005-S2',
        title: 'Reconcile Brand Identity with Digital Usability Standards',
        objective: 'In Design Canvas: restore recognized lettermark icon, thicken typography to 400/600, and ensure WCAG AA contrast.',
        instructions: 'Open Design Canvas, update app icon to include clear brand lettermark, upgrade body text to readable 400-weight, and save reconciled brand tokens.',
        expectedActions: ['Redesign app icon with bold high-contrast brand lettermark', 'Replace hairline font weights with 400 regular and 600 semibold', 'Adjust brand background and text tokens to achieve 7:1 contrast', 'Save Reconciled Brand Specs to Project Board'],
        successCriteria: ['Brand immediately recognizable on crowded smartphone home screens', 'Text 100% readable under direct outdoor sunlight conditions'],
        evaluationCriteria: { brandExecution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Total rollback to legacy brand vs progressive reconciliation of new brand identity', 'Custom typeface modifications vs switching back to system fonts'],
    pressureEvents: ['Marketing and Product Executive summit in 3 hours: Need unified brand-product compromise'],
    expectedSolution: 'Restore bold recognizable brand lettermark to app icon; eliminate hairline font weights (< 400); tune brand colors to achieve minimum 4.5:1 contrast.',
    acceptableApproaches: ['Brand reconciliation maintaining modern aesthetic while enforcing strict usability tokens', 'Dual-mode typography scale prioritizing digital legibility'],
    failureConditions: ['App icon remains an abstract geometric shape that users cannot identify', 'Typography remains unreadable in outdoor mobile environments'],
    finalDeliverable: 'Reconciled Brand & Digital Usability System Specification.',
    evaluationCriteria: { brandUsabilityHarmony: 40, aestheticRefinement: 30, testValidation: 30 },
    workplaceContext: 'Global Brand Rollout Usability Crisis & Reconciliation',
    taskType: 'brand_crisis'
  },

  {
    id: 'UX-L4-006',
    title: 'High-Value Enterprise Customer Onboarding Drop-off Investigation',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Stripe / Atlas & Corporate Treasury Onboarding',
    department: 'High-Value Customer Activation',
    domain: 'Fintech / Enterprise KYC & Compliance Onboarding',
    skills: ['onboarding_ux', 'kyc_compliance', 'enterprise_ux', 'form_friction_reduction'],
    coreCompetencies: ['high_value_onboarding', 'kyc_friction_reduction', 'compliance_design'],
    secondarySkills: ['document_verification', 'progressive_profiling'],
    skillTags: ['kyc', 'onboarding', 'enterprise_dropoff', 'fintech', 'activation'],
    situation: 'Enterprise corporate accounts (average contract value $450k) are abandoning the corporate treasury onboarding flow at a 55% rate during the mandatory Know Your Customer (KYC) identity verification stage.',
    problem: 'The KYC step presents an intimidating, single-session 30-field form requiring passport uploads, beneficial ownership percentages, and articles of incorporation without a save-draft feature or clear explanation of why data is required.',
    mission: 'Re-engineer enterprise KYC onboarding: implement asynchronous progressive document collection, provide clear regulatory transparency tooltips, design an automated beneficial ownership visualizer, and enable team collaboration.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'user_feedback', 'project_board', 'ai_assistant'],
      environment: { targetUsers: 'CFOs, Corporate Controllers, Legal Counsel' }
    },
    availableEvidence: [
      'Enterprise sales pipeline alert: 42 enterprise accounts ($18.9M in contract value) stalled in "KYC Pending" for over 3 weeks',
      'CFO interview: "I started the form, but I didn\'t have our corporate tax return on my laptop, so I closed the tab and lost all my progress"'
    ],
    subtasks: [
      {
        id: 'UX-L4-006-S1',
        title: 'Map Enterprise KYC Friction & Multi-Stakeholder Bottlenecks',
        objective: 'Analyze why CFOs stall on identity verification and map multi-person document dependency.',
        instructions: 'Open User Feedback Tool, review enterprise onboarding journey map, and identify document collection barriers.',
        expectedActions: ['Inspect enterprise drop-off points in User Feedback Tool', 'Identify that single-user single-session requirement conflicts with multi-stakeholder corporate legal data'],
        successCriteria: ['Identified that 80% of CFOs do not possess all required legal documents during initial signup', 'Mapped need for asynchronous multi-stakeholder invite model'],
        evaluationCriteria: { enterpriseInsight: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L4-006-S2',
        title: 'Design Collaborative Asynchronous Onboarding Hub & Auto-Save',
        objective: 'In Design Canvas: design checklist hub with "Invite Legal Counsel to Upload Docs" and auto-save.',
        instructions: 'Open Design Canvas, design onboarding hub with progress tracker, team document delegation buttons, auto-saving drafts, and save to Project Board.',
        expectedActions: ['Design Asynchronous Checklist Hub with progress percentage', 'Add "Assign Document Upload to Colleague" delegation feature', 'Implement real-time auto-saving with clear "All progress saved" badge', 'Add regulatory transparency tooltips explaining why FinCEN requires ownership data', 'Save Enterprise KYC Redesign'],
        successCriteria: ['CFOs can pause and resume onboarding across devices without data loss', 'Legal and finance team members can collaborate asynchronously to upload documents'],
        evaluationCriteria: { enterpriseOnboardingDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Asynchronous team delegation link vs single executive submission', 'Live document OCR pre-fill vs manual data entry first'],
    pressureEvents: ['Chief Revenue Officer: "Stalled enterprise pipeline is holding back our Q4 financial closing"'],
    expectedSolution: 'Convert monolithic form into asynchronous team checklist; add "Delegate to legal counsel" button; auto-save drafts; provide FinCEN compliance explanations.',
    acceptableApproaches: ['Collaborative multi-stakeholder onboarding portal', 'Progressive milestone onboarding with instant partial account provisioning'],
    failureConditions: ['Closing browser tab erases previously uploaded documents', 'Requiring all documents in a single continuous session'],
    finalDeliverable: 'Collaborative Enterprise KYC Onboarding Hub specification recovering stalled enterprise pipeline.',
    evaluationCriteria: { enterpriseActivation: 40, complianceErgonomics: 30, testValidation: 30 },
    workplaceContext: 'High-Value Enterprise Fintech Activation & Compliance',
    taskType: 'enterprise_onboarding'
  },

  {
    id: 'UX-L4-007',
    title: 'Conversion Funnel Cannibalization Between Free & Paid Subscription Tiers',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Spotify / Growth & Premium Conversion',
    department: 'Subscription Monetization Studio',
    domain: 'Streaming Media / Freemium Funnel Optimization',
    skills: ['growth_strategy', 'conversion_design', 'pricing_psychology', 'user_research'],
    coreCompetencies: ['freemium_boundary_optimization', 'cannibalization_remediation', 'monetization_ux'],
    secondarySkills: ['paywall_design', 'feature_gating'],
    skillTags: ['cannibalization', 'freemium', 'paywall', 'growth', 'conversion_crisis'],
    situation: 'Following an update to the free tier that added unlimited mobile song skips, paid Premium subscription upgrades collapsed by 38%, cannibalizing $12M in expected recurring revenue.',
    problem: 'The boundary between Free and Premium was shifted too far into the free tier, eliminating the primary user motivation to upgrade without introducing alternative monetization levers.',
    mission: 'Re-architect the freemium value boundary: design contextual premium paywalls around high-value exclusive features (Lossless Audio, Offline Downloads, Ad-free listening), and restore upgrade velocity.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'user_feedback', 'project_board', 'ai_assistant'],
      environment: { targetMetric: 'Free-to-Paid Conversion Rate & Net Retention' }
    },
    availableEvidence: [
      'Monetization dashboard: Free-to-Premium monthly conversion dropped from 6.8% to 4.2%',
      'User survey: "I was going to subscribe to Premium, but now that free skips are unlimited, I don\'t need to"'
    ],
    subtasks: [
      {
        id: 'UX-L4-007-S1',
        title: 'Analyze Feature Cannibalization & Upgrade Motivation Drivers',
        objective: 'Review user survey data in User Feedback Tool and identify cannibalized upgrade triggers.',
        instructions: 'Open User Feedback Tool, review conversion cohort graphs, and identify which feature gave away core upgrade value.',
        expectedActions: ['Inspect conversion drop-off by feature trigger in User Feedback Tool', 'Identify that unlimited skips eliminated the primary upgrade catalyst'],
        successCriteria: ['Quantified 38% conversion collapse caused by over-generous free tier', 'Mapped top remaining upgrade motivations: Offline Downloads and High-Fidelity Audio'],
        evaluationCriteria: { growthAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L4-007-S2',
        title: 'Design Contextual High-Value Paywalls & Rebalance Value Exchange',
        objective: 'In Design Canvas: design contextual paywall appearing when user attempts offline downloads or high-res audio.',
        instructions: 'Open Design Canvas, design value-packed interstitial paywall highlighting Offline Mode + Lossless Audio with 1-month free trial, and save to Project Board.',
        expectedActions: ['Design high-converting contextual paywall triggered upon clicking Offline Download toggle', 'Showcase clear value contrast: Free (Standard, Online) vs Premium (Lossless, Everywhere)', 'Incorporate frictionless 1-click "Start 30-Day Free Trial" CTA', 'Save Rebalanced Freemium Funnel to Project Board'],
        successCriteria: ['Re-establishes compelling user reason to upgrade to Premium', 'Free-to-paid upgrade velocity projected to recover to 7.0%'],
        evaluationCriteria: { paywallArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Hard paywall (feature locked entirely) vs soft paywall (e.g. 3 offline songs allowed as trial)', 'Family / Duo plan upsell vs individual plan focus'],
    pressureEvents: ['Quarterly Earnings Call in 10 days: Executive team needs clear roadmap to reverse subscription revenue drop'],
    expectedSolution: 'Rebalance freemium boundary; gate high-value features (Offline listening, Lossless audio); deploy contextual paywalls at moment of intent.',
    acceptableApproaches: ['Contextual moment-of-intent paywalls', 'Time-limited free trial onboarding with automated conversion reminders'],
    failureConditions: ['Making free tier so restrictive that active users abandon the app entirely', 'Paywall appears intrusively on every navigation click'],
    finalDeliverable: 'Rebalanced Freemium Boundary Strategy and Contextual Paywall Component Design.',
    evaluationCriteria: { growthStrategy: 40, monetizationDesign: 30, testValidation: 30 },
    workplaceContext: 'Freemium Value Boundary Rebalancing & Monetization Crisis',
    taskType: 'growth_crisis'
  },

  {
    id: 'UX-L4-008',
    title: 'Global Product Localization Breakdown: Right-to-Left (RTL) & Text Expansion',
    role: 'ui_ux',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Uber / Middle East & European Expansion Core',
    department: 'Internationalization & Global Product',
    domain: 'Mobility / Internationalization & RTL Localization',
    skills: ['i18n_ux', 'rtl_layout', 'text_expansion', 'global_usability'],
    coreCompetencies: ['rtl_layout_mirroring', 'text_expansion_containment', 'i18n_design_systems'],
    secondarySkills: ['bidirectional_text', 'cultural_ergonomics'],
    skillTags: ['rtl', 'i18n', 'localization', 'arabic', 'text_expansion', 'crisis'],
    situation: 'During the launch of the ride-hailing app in Saudi Arabia and Germany, German translations overflow buttons by 300% causing truncation, and Arabic users see a broken layout where icons point backwards.',
    problem: 'The design system was built with hardcoded Left-to-Right assumptions without Right-to-Left (RTL) mirroring rules, and UI components use fixed pixel widths that break under German text expansion (average 35% longer).',
    mission: 'Step in as Global Experience Architect: establish strict bidirectional RTL mirroring rules (preserving media directionality), redesign buttons and cards with dynamic auto-wrapping flexbox layouts, and certify global rollout.',
    workspace: {
      tools: ['slack', 'design_brief', 'design_canvas', 'research_notes', 'project_board'],
      environment: { targetLocales: 'Arabic (RTL - ar-SA) and German (LTR Expansion - de-DE)' }
    },
    availableEvidence: [
      'RTL testing screenshot: Progress bar flows right-to-left, but arrow icons point left (backward), confusing riders on trip route',
      'German localization report: "Jetzt buchen und Fahrt bestätigen" clipped to "Jetzt bu..." on 360px screens'
    ],
    subtasks: [
      {
        id: 'UX-L4-008-S1',
        title: 'Audit RTL Mirroring Violations & Text Expansion Clipping',
        objective: 'Inspect Arabic and German localized screens in Research Notes Tool and catalog layout breakage.',
        instructions: 'Open Research Notes Tool, examine Arabic RTL layout distortions and German button text clipping.',
        expectedActions: ['Inspect Arabic ride status card in Research Notes', 'Identify reversed back arrows and un-mirrored margins', 'Inspect German checkout button truncated due to hardcoded 120px width'],
        successCriteria: ['Cataloged all bidirectional mirroring violations', 'Documented 35% text expansion failure points in German'],
        evaluationCriteria: { i18nAudit: 50, rootCauseDetail: 50 }
      },
      {
        id: 'UX-L4-008-S2',
        title: 'Architect Fluid Responsive RTL Mirroring & Auto-Layout Rules',
        objective: 'In Design Canvas: specify complete RTL layout mirroring and dynamic auto-layout button containers.',
        instructions: 'Open Design Canvas, design mirrored Arabic RTL layout, refactor buttons to use flexible padding instead of fixed widths, and save Global Design Specs.',
        expectedActions: ['Mirror layout horizontally for RTL (Start/End logical properties instead of Left/Right)', 'Ensure directional icons (back arrows) flip while non-directional icons (clocks) stay fixed', 'Convert fixed-width button containers to Auto Layout with min-width constraints', 'Save Certified Global I18n Specification to Project Board'],
        successCriteria: ['Arabic interface mirrors naturally with culturally intuitive wayfinding', 'German text expands gracefully across all buttons and headers without clipping'],
        evaluationCriteria: { i18nExecution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Flipping media player controls in RTL vs keeping LTR audio scrubbing direction', 'Using logical properties (margin-inline-start) vs separate LTR/RTL stylesheets'],
    pressureEvents: ['Middle East Regional GM: "Launch event with Saudi Ministry of Transport is in 48 hours; app must be flawless"'],
    expectedSolution: 'Use CSS logical properties (start/end); mirror layout and back arrows in RTL; keep media play controls LTR; use auto-layout flexbox with min-width to accommodate text expansion.',
    acceptableApproaches: ['Comprehensive bidirectional design system specification', 'Component auto-layout refactoring with logical padding tokens'],
    failureConditions: ['Clocks or checkmarks mirrored backwards in RTL', 'Text still truncates on 360px mobile screens in German'],
    finalDeliverable: 'Global Product Internationalization Specification with verified RTL and text expansion compliance.',
    evaluationCriteria: { i18nExcellence: 40, globalUsability: 30, testValidation: 30 },
    workplaceContext: 'Global Product Localization & Bidirectional Architecture',
    taskType: 'localization_crisis'
  }
];
