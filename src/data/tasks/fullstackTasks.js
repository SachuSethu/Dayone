// src/data/tasks/fullstackTasks.js
// 32 Full Stack Developer Main Tasks (4 Levels × 8 Tasks = 32 Tasks, 64 Subtasks)

export const FULLSTACK_TASKS = [
  // ==========================================
  // LEVEL 1: FOUNDATION (8 TASKS, 16 SUBTASKS)
  // ==========================================
  {
    id: 'FS-L1-001',
    title: 'Full-Stack Contact Form: Client Validation to Express Persistence',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'HubSpot / CRM Growth Tools',
    department: 'Lead Ingestion & Forms Engineering',
    domain: 'CRM SaaS / Full-Stack Form Engineering',
    skills: ['react_state', 'rest_apis', 'express', 'postgresql'],
    coreCompetencies: ['fullstack_data_flow', 'client_server_validation', 'database_persistence'],
    secondarySkills: ['zod_schema', 'http_error_handling'],
    skillTags: ['fullstack', 'react', 'express', 'postgresql', 'forms'],
    situation: 'Prospective clients submitting the enterprise contact form receive a generic "Submission failed" toast, while sales teams report that 40% of submitted leads are missing from the CRM database.',
    problem: 'The React form submits field names `user_email` and `phone_number`, but the Express API endpoint expects `email` and `phone`. The backend silently rejects the request with HTTP 400 without descriptive feedback.',
    mission: 'Align client and server payload contracts, implement mirrored Zod validation on both ends, persist leads to PostgreSQL, and render real-time field errors in the UI.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / React 18 / Express / PostgreSQL' }
    },
    availableEvidence: [
      'Browser Network tab: POST /api/v1/leads returns 400 Bad Request: missing required field "email"',
      'React state: Form payload submitted { user_email: "ceo@acme.com" }'
    ],
    subtasks: [
      {
        id: 'FS-L1-001-S1',
        title: 'Trace Payload Discrepancy Across Client-Server Boundary',
        objective: 'Submit contact form in preview and compare React state payload against Express route validation schema.',
        instructions: 'Open browser preview, submit test contact form, and inspect server terminal output for validation error.',
        expectedActions: ['Submit form in browser preview', 'Identify key name mismatch (user_email vs email) in terminal logs'],
        successCriteria: ['Confirmed key naming mismatch', 'Mapped missing client-side error reflection'],
        evaluationCriteria: { diagnosticSpeed: 50, rootCauseIsolation: 50 }
      },
      {
        id: 'FS-L1-001-S2',
        title: 'Unify Data Contract, Database Insertion & UI Error Banners',
        objective: 'Standardize payload to { name, email, phone, message }, save to PostgreSQL, and reflect success message.',
        instructions: 'Update ContactForm.jsx and leadController.js with shared field schema, write database insert query, and verify end-to-end flow.',
        expectedActions: ['Update ContactForm.jsx state and submission payload', 'Update Express route with database INSERT query', 'Verify lead appears in database and UI displays success alert'],
        successCriteria: ['Lead successfully saved to PostgreSQL database', 'Form resets cleanly and displays confirmation banner'],
        evaluationCriteria: { fullstackIntegration: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Shared TypeScript types package vs individual runtime Zod schemas', 'Server-side validation fallback when JavaScript is disabled'],
    pressureEvents: ['Marketing VP: Paid ad campaign is driving 5,000 visitors today; contact form must capture all leads'],
    expectedSolution: 'Align key names to { name, email, phone, message }, validate with Zod on client and server, insert into leads table, return 201 Created.',
    acceptableApproaches: ['Shared Zod validation schema between client and server', 'Coordinated Express controller and React hook form updates'],
    failureConditions: ['Database insert throws null constraint error', 'Client UI ignores server-returned error message'],
    finalDeliverable: 'ContactForm.jsx and leadController.js with harmonious full-stack contract and verified database insertion.',
    evaluationCriteria: { fullstackCohesion: 40, dataValidation: 30, testValidation: 30 },
    workplaceContext: 'Full-Stack Data Flow & Lead Ingestion',
    taskType: 'fullstack_integration'
  },

  {
    id: 'FS-L1-002',
    title: 'Session Cookie vs JWT Token Authentication Flow',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'Shopify / Merchant Admin Platform',
    department: 'Merchant Accounts & Session Auth',
    domain: 'E-Commerce / Full-Stack Authentication',
    skills: ['authentication', 'http_cookies', 'react_state', 'express'],
    coreCompetencies: ['cookie_management', 'session_security', 'auth_state_synchronization'],
    secondarySkills: ['csrf_protection', 'samesite_attributes'],
    skillTags: ['cookies', 'jwt', 'authentication', 'httponly', 'sessions'],
    situation: 'Merchant admin users find that opening multiple browser tabs logs them out of previous tabs, and mobile Safari users are logged out immediately upon page refresh.',
    problem: 'Authentication tokens are stored in window.localStorage without HTTP-only cookie protections, and Safari Intelligent Tracking Prevention (ITP) purges script-writable storage after 7 days.',
    mission: 'Migrate client token storage to secure HTTP-only SameSite=Lax session cookies, implement an active session verification endpoint (/api/v1/auth/me), and synchronize React auth context.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / React 18' }
    },
    availableEvidence: [
      'Security audit: JWT token accessible to XSS attacks in localStorage.getItem("token")',
      'Support ticket: Safari users logged out on page refresh'
    ],
    subtasks: [
      {
        id: 'FS-L1-002-S1',
        title: 'Audit Insecure Storage & Test Cross-Tab Session Loss',
        objective: 'Inspect browser storage in preview and test session persistence across page reload in private mode.',
        instructions: 'Open preview, log in with test credentials, inspect localStorage in DevTools, and observe XSS vulnerability surface.',
        expectedActions: ['Log into admin dashboard in preview', 'Verify token is stored as plain text in localStorage', 'Identify lack of HttpOnly flag'],
        successCriteria: ['Documented localStorage security exposure', 'Identified missing cookie credentials config'],
        evaluationCriteria: { securityAudit: 50, sessionAnalysis: 50 }
      },
      {
        id: 'FS-L1-002-S2',
        title: 'Implement HttpOnly Cookie Dispatch & React Auth Context Hydration',
        objective: 'Set cookie with { httpOnly: true, secure: true, sameSite: "lax" } on server and fetch /me on client boot.',
        instructions: 'Update authController.js to use res.cookie, configure Axios with credentials: true, and hydrate AuthContext on mount.',
        expectedActions: ['Update login route to set HttpOnly session cookie', 'Configure fetch/axios with credentials: "include"', 'Implement AuthContext initial /auth/me verification call', 'Verify clean session retention across reloads'],
        successCriteria: ['Token completely removed from localStorage', 'User remains logged in across tabs and reloads via HttpOnly cookie'],
        evaluationCriteria: { securityHardening: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['SameSite=Strict vs SameSite=Lax (Lax allows external referral links to maintain session)', 'CSRF token header vs SameSite cookie protection'],
    pressureEvents: ['AppSec Audit: Insecure token storage in localStorage violates SOC 2 Type II compliance'],
    expectedSolution: 'Set res.cookie("auth_token", token, { httpOnly: true, secure: true, sameSite: "lax" }), read /auth/me on React load.',
    acceptableApproaches: ['HttpOnly cookie with React AuthProvider /me verification', 'Signed session cookie with express-session'],
    failureConditions: ['CORS configuration rejects credentials with Access-Control-Allow-Origin: *', 'Cookies omitted in cross-origin fetch requests'],
    finalDeliverable: 'authController.js and AuthContext.jsx with secure HttpOnly cookie session management.',
    evaluationCriteria: { sessionSecurity: 40, fullstackIntegration: 30, testValidation: 30 },
    workplaceContext: 'Full-Stack Secure Session Authentication',
    taskType: 'authentication'
  },

  {
    id: 'FS-L1-003',
    title: 'Client-Server API Contract Mismatch & Type Synchronization',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'Linear / Project Management App',
    department: 'Productivity Workspaces & Shared Types',
    domain: 'Developer Tools / Shared Type Systems',
    skills: ['typescript', 'api_contracts', 'react_state', 'nodejs'],
    coreCompetencies: ['shared_types', 'contract_synchronization', 'type_safety'],
    secondarySkills: ['zod_infer', 'monorepo_types'],
    skillTags: ['typescript', 'shared_types', 'api_contract', 'zod', 'type_safety'],
    situation: 'Following a backend database migration that renamed `assigned_user_id` to `assigneeId`, the frontend task list renders blank assignee avatars with undefined property access.',
    problem: 'Frontend and backend maintain duplicate, unsynchronized TypeScript interface definitions in separate directories instead of using a shared types package or single source of truth.',
    mission: 'Establish a shared types contract package, derive TypeScript types from Zod schemas, and verify that breaking contract changes fail compilation in both client and server.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / TypeScript 5 / Monorepo' }
    },
    availableEvidence: [
      'Client console error: TypeError: Cannot read properties of undefined (reading "avatarUrl") at TaskCard.tsx:28',
      'API payload: { id: "T-101", assigneeId: "U-42" } vs Client interface expects { assigned_user_id: string }'
    ],
    subtasks: [
      {
        id: 'FS-L1-003-S1',
        title: 'Locate Divergent Type Interfaces Across Monorepo',
        objective: 'Compare client Task.ts interface with server TaskModel.ts and identify mismatched property keys.',
        instructions: 'Run `npm run typecheck` in terminal to observe TypeScript type mismatches across packages.',
        expectedActions: ['Run monorepo typecheck command', 'Identify divergent field names in client vs server type files'],
        successCriteria: ['Identified 4 mismatched property names between frontend and backend', 'Understood failure of unsynchronized interfaces'],
        evaluationCriteria: { typeAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L1-003-S2',
        title: 'Establish Shared Schema & Enforce End-to-End Type Safety',
        objective: 'Create packages/shared-types with unified TaskSchema, import into both client and server, and pass typecheck.',
        instructions: 'Define TaskSchema in shared package, use z.infer<typeof TaskSchema>, update components and route handlers, and verify 0 type errors.',
        expectedActions: ['Create shared TaskSchema using Zod', 'Export inferred Task type', 'Import shared type in TaskCard.tsx and taskRouter.ts', 'Run npm run typecheck'],
        successCriteria: ['TypeScript compilation passes with 0 errors in both client and server', 'Task cards render assignee avatars cleanly in preview'],
        evaluationCriteria: { typeSafetyImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Zod schema inference vs pure TypeScript interfaces with openapi-typescript', 'Monorepo workspace package vs npm private module'],
    pressureEvents: ['Sprint Release Gate: All PRs must pass strict npm run typecheck before merging to main'],
    expectedSolution: 'Create shared schema package; export type Task = z.infer<typeof TaskSchema>; consume in both client and server.',
    acceptableApproaches: ['Monorepo shared types package with Zod inference', 'OpenAPI generator generating frontend types from backend spec'],
    failureConditions: ['Using any type casts to silence compiler warnings', 'Client still references deprecated property names'],
    finalDeliverable: 'Shared types package and synchronized client/server code passing strict TypeScript typecheck.',
    evaluationCriteria: { typeSafetyRigor: 40, fullstackArchitecture: 30, testValidation: 30 },
    workplaceContext: 'Full-Stack Shared Type Safety & Contract Architecture',
    taskType: 'type_safety'
  },

  {
    id: 'FS-L1-004',
    title: 'Profile Avatar Upload Pipeline: Client Preview to S3 Storage',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'Medium / Publishing Platform',
    department: 'User Profiles & Media Ingestion',
    domain: 'Publishing / Media Storage Pipeline',
    skills: ['file_upload', 'aws_s3', 'presigned_urls', 'react_state'],
    coreCompetencies: ['presigned_url_flow', 'client_image_preview', 'cloud_storage'],
    secondarySkills: ['canvas_crop', 'multer_s3'],
    skillTags: ['s3', 'presigned_url', 'file_upload', 'avatar', 'react'],
    situation: 'Users uploading high-resolution 20MB profile pictures cause the Node.js backend server to run out of memory because images are piped through the application server memory before reaching S3.',
    problem: 'The server acts as an unnecessary proxy for file bytes instead of using AWS S3 Presigned URLs, creating a server memory bottleneck and slow upload speeds.',
    mission: 'Refactor upload pipeline: client requests a Presigned S3 PUT URL from backend, uploads image bytes directly from browser to S3, and notifies backend upon completion.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / React 18 / AWS S3 SDK' }
    },
    availableEvidence: [
      'Server memory graph: Spikes to 1.8GB during user avatar uploads',
      'Upload latency: Users in Europe wait 14 seconds to upload a 10MB photo through US server'
    ],
    subtasks: [
      {
        id: 'FS-L1-004-S1',
        title: 'Inspect Direct Proxy Bottleneck & Memory Consumption',
        objective: 'Trace current avatar upload flow through server proxy endpoint in browser preview.',
        instructions: 'Open preview, upload a 10MB test image, and inspect Network tab request duration and server memory log.',
        expectedActions: ['Upload image in browser preview', 'Observe server buffering entire image buffer into RAM before forwarding to S3'],
        successCriteria: ['Quantified server memory spike on file proxying', 'Identified need for direct-to-S3 Presigned URL architecture'],
        evaluationCriteria: { architecturalDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L1-004-S2',
        title: 'Implement S3 Presigned URL Generator & Direct Browser PUT',
        objective: 'Backend generates presigned URL with PutObjectCommand; frontend executes direct fetch(url, { method: "PUT", body: file }).',
        instructions: 'Update avatarController.js with getSignedUrl, update AvatarUploader.jsx to upload directly to S3 with progress bar, and save S3 URL to DB.',
        expectedActions: ['Implement GET /api/v1/uploads/presigned endpoint', 'Refactor AvatarUploader.jsx to upload directly to presigned URL', 'Save public S3 URL to user database record', 'Verify avatar renders in preview'],
        successCriteria: ['File bytes bypass application server completely', 'Upload speed improves by 4x and server memory remains flat'],
        evaluationCriteria: { presignedArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Direct S3 upload via Presigned URL vs multipart chunked upload through backend', 'Client-side image compression with Canvas before upload'],
    pressureEvents: ['Cloud Infrastructure alert: Bandwidth egress costs doubled due to proxying user uploads twice'],
    expectedSolution: 'Backend calls s3.getSignedUrlPromise("putObject", { Bucket, Key, ContentType, Expires: 300 }); frontend executes fetch(url, { method: "PUT", body: file }).',
    acceptableApproaches: ['AWS S3 Presigned URL direct upload pattern', 'Cloudflare R2 Presigned upload with client direct PUT'],
    failureConditions: ['S3 bucket permissions public write without signature check', 'CORS on S3 bucket rejects browser direct PUT request'],
    finalDeliverable: 'AvatarUploader.jsx and avatarController.js implementing scalable direct-to-storage architecture.',
    evaluationCriteria: { cloudStorageDesign: 40, performanceEfficiency: 30, testValidation: 30 },
    workplaceContext: 'Cloud Storage Direct Ingestion Pipeline',
    taskType: 'cloud_architecture'
  },

  {
    id: 'FS-L1-005',
    title: 'Dynamic Search Filtering: React UI to SQL WHERE Clauses',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'Zillow / Real Estate Property Search',
    department: 'Property Search & Listing Core',
    domain: 'Real Estate / Search & Filtering Systems',
    skills: ['sql_querying', 'react_state', 'url_search_params', 'nodejs'],
    coreCompetencies: ['dynamic_query_building', 'url_state_synchronization', 'search_ux'],
    secondarySkills: ['parameterized_sql', 'debouncing'],
    skillTags: ['sql', 'dynamic_queries', 'react', 'search', 'url_params'],
    situation: 'Home buyers selecting filters (Price: $300k-$600k, Bedrooms: 3+, Has Pool: true) report that search results ignore the price filter and resetting filters does not clear results.',
    problem: 'The Express SQL query builder uses hardcoded string concatenation with logical bugs (OR instead of AND), and frontend filter state is not synchronized with URL query parameters.',
    mission: 'Synchronize React filter state with URLSearchParams, construct dynamic parameterized SQL WHERE clauses safely, and verify search results match applied filters.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / React 18 / PostgreSQL' }
    },
    availableEvidence: [
      'Search query bug: Selecting Bedrooms: 3 and Price: <$500k returns properties priced at $1.2M',
      'SQL log: WHERE bedrooms >= 3 OR price <= 500000 (Logical OR returns entire database)'
    ],
    subtasks: [
      {
        id: 'FS-L1-005-S1',
        title: 'Trace Query Builder Logic Error & State Desync',
        objective: 'Test property filter combinations in preview and observe generated SQL query in terminal.',
        instructions: 'Open browser preview, select Bedroom = 3 and Max Price = $400k, and inspect backend SQL query log.',
        expectedActions: ['Apply filters in search preview', 'Identify flawed SQL WHERE clause using OR instead of AND', 'Observe missing URL parameter synchronization'],
        successCriteria: ['Identified logical query bug returning out-of-budget homes', 'Mapped lack of shareable search URL state'],
        evaluationCriteria: { queryAudit: 50, uxObservation: 50 }
      },
      {
        id: 'FS-L1-005-S2',
        title: 'Implement URLSearchParams Sync & Dynamic Parameterized SQL',
        objective: 'Sync state with useSearchParams, build parameterized WHERE clauses array joined with AND, and execute query.',
        instructions: 'Update PropertyFilters.jsx to push filter state to URL, build dynamic parameterized SQL in listingService.js, and verify accuracy.',
        expectedActions: ['Bind filter changes to URLSearchParams', 'Build dynamic SQL array: conditions.push(`price <= $${params.length}`)', 'Execute db.query with parameterized array', 'Verify accurate results in preview'],
        successCriteria: ['Search results strictly match all active filter constraints', 'Search URLs can be copied and shared with filters preserved'],
        evaluationCriteria: { queryBuilding: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Dynamic SQL string builder vs ORM query builder (Knex / Prisma)', 'Debounced query execution vs explicit "Apply Filters" button'],
    pressureEvents: ['Customer support: 1,400 complaints about listings exceeding user budget filters'],
    expectedSolution: 'Use array of conditions = []; if (minPrice) conditions.push(`price >= $${values.push(minPrice)}`); join with " AND "; bind to URL query.',
    acceptableApproaches: ['Dynamic parameterized SQL conditions array', 'Knex query builder dynamic chaining'],
    failureConditions: ['Concatenating unsanitized strings causing SQL injection', 'Clearing filters in UI leaves stale query params in URL'],
    finalDeliverable: 'PropertyFilters.jsx and listingService.js with URL-synced search and safe dynamic SQL execution.',
    evaluationCriteria: { sqlCorrectness: 40, urlStateHygiene: 30, testValidation: 30 },
    workplaceContext: 'Full-Stack Search & Dynamic Query Filtration',
    taskType: 'search_filtering'
  },

  {
    id: 'FS-L1-006',
    title: 'Full-Stack Cross-Origin Resource Sharing (CORS) & Preflight Handling',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'Stripe / Merchant Dashboard Integrations',
    department: 'API Gateway & Developer Integrations',
    domain: 'Fintech / Cross-Origin Security',
    skills: ['cors', 'http_headers', 'api_security', 'express'],
    coreCompetencies: ['cors_configuration', 'http_preflight_options', 'cross_origin_security'],
    secondarySkills: ['browser_security', 'credentials_headers'],
    skillTags: ['cors', 'preflight', 'options', 'access_control_allow_origin', 'security'],
    situation: 'Merchants testing the embeddable checkout widget on their external websites (mystore.com) see console errors: "Access to fetch at api.dayone.com has been blocked by CORS policy".',
    problem: 'The backend CORS middleware is configured with Access-Control-Allow-Origin: * while also specifying credentials: true, which browsers reject, and the server fails to handle HTTP OPTIONS preflight requests.',
    mission: 'Configure dynamic origin reflection allowlist in Express CORS middleware, handle HTTP OPTIONS preflight requests with 204 No Content, and allow custom headers (X-Api-Key).',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / CORS' }
    },
    availableEvidence: [
      'Browser error: The value of the \'Access-Control-Allow-Origin\' header in the response must not be the wildcard \'*\' when the request\'s credentials mode is \'include\'',
      'Network tab: OPTIONS /api/v1/checkout returns 404 Not Found'
    ],
    subtasks: [
      {
        id: 'FS-L1-006-S1',
        title: 'Reproduce CORS Preflight Rejection in Cross-Origin Sandbox',
        objective: 'Trigger cross-origin request from client sandbox and inspect rejected preflight headers.',
        instructions: 'Run `npm test test/cors.test.js` to observe the browser security sandbox rejection.',
        expectedActions: ['Run CORS test in terminal', 'Identify conflicting wildcard origin and credentials: true combination', 'Observe 404 response on OPTIONS preflight'],
        successCriteria: ['Reproduced browser CORS blocking error', 'Understood W3C Fetch specification origin restrictions'],
        evaluationCriteria: { securityInsight: 50, headerAudit: 50 }
      },
      {
        id: 'FS-L1-006-S2',
        title: 'Configure Dynamic Origin Allowlist & OPTIONS Preflight Handler',
        objective: 'Implement cors({ origin: (origin, callback) => ..., credentials: true, optionsSuccessStatus: 204 }).',
        instructions: 'Update server.js with hardened CORS configuration, permit authorized merchant domains, handle OPTIONS 204, and re-run tests.',
        expectedActions: ['Configure cors middleware with origin callback function', 'Set Access-Control-Allow-Headers for custom auth headers', 'Set optionsSuccessStatus: 204', 'Rerun test suite'],
        successCriteria: ['Cross-origin requests from approved merchant origins succeed', 'OPTIONS preflight responds with 204 No Content and appropriate headers'],
        evaluationCriteria: { corsImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Dynamic database origin check vs regex domain pattern allowlist', 'Preflight cache max-age header (Access-Control-Max-Age: 86400)'],
    pressureEvents: ['Merchant launch blocker: 50 enterprise merchants unable to embed checkout on their storefronts'],
    expectedSolution: 'Use cors({ origin: allowedOriginsList, credentials: true, methods: ["GET","POST","PUT","DELETE","OPTIONS"], allowedHeaders: ["Content-Type","Authorization","X-Api-Key"], optionsSuccessStatus: 204 }).',
    acceptableApproaches: ['Express cors middleware with origin callback', 'Custom middleware intercepting OPTIONS and setting response headers'],
    failureConditions: ['Using Access-Control-Allow-Origin: * with credentials', 'Allowing arbitrary malicious origins without validation'],
    finalDeliverable: 'corsConfig.js providing enterprise-grade cross-origin access and preflight compliance.',
    evaluationCriteria: { corsHygiene: 40, securityCompliance: 30, testValidation: 30 },
    workplaceContext: 'Cross-Origin Enterprise API Integration',
    taskType: 'security'
  },

  {
    id: 'FS-L1-007',
    title: 'End-to-End Playwright User Journey Integration Test Regression',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'GitLab / Quality Engineering & E2E Testing',
    department: 'Full-Stack Test Automation',
    domain: 'Developer Tools / E2E Automation',
    skills: ['e2e_testing', 'playwright', 'fullstack_testing', 'ci_cd'],
    coreCompetencies: ['e2e_automation', 'flaky_test_resolution', 'user_journey_validation'],
    secondarySkills: ['test_fixtures', 'selectors'],
    skillTags: ['playwright', 'e2e', 'testing', 'automation', 'ci_cd'],
    situation: 'The nightly Playwright E2E test suite failed on the core user signup journey: "Timeout 30000ms exceeded while waiting for locator(\'#welcome-banner\')".',
    problem: 'The test uses brittle CSS selectors (#btn-4) that changed during a design system update, and tests do not wait for the database user confirmation email token to be generated.',
    mission: 'Refactor Playwright test to use resilient user-facing role locators (getByRole, getByLabel), mock email verification via test fixtures, and achieve deterministic 100% pass rate.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Playwright 1.42' }
    },
    availableEvidence: [
      'Playwright trace: Failed step: page.click("#btn-4") - element not found in DOM',
      'CI log: 3 of 5 E2E tests timed out waiting for hardcoded CSS IDs'
    ],
    subtasks: [
      {
        id: 'FS-L1-007-S1',
        title: 'Run Playwright Trace Viewer & Inspect Locator Failure',
        objective: 'Inspect trace.zip from failed CI run and identify brittle CSS selector breakage.',
        instructions: 'Run `npx playwright test signup.spec.ts` in terminal and view the step failure snapshot.',
        expectedActions: ['Run Playwright test in terminal', 'Inspect failure snapshot and locate missing #btn-4 selector'],
        successCriteria: ['Identified that CSS class and ID refactoring broke E2E selectors', 'Understood flaw of structural CSS locators'],
        evaluationCriteria: { e2eAnalysis: 50, diagnosticClarity: 50 }
      },
      {
        id: 'FS-L1-007-S2',
        title: 'Refactor to Semantic Locators & Deterministic Fixtures',
        objective: 'Replace CSS selectors with page.getByRole("button", { name: "Sign Up" }) and await network response.',
        instructions: 'Update signup.spec.ts to use user-facing accessible locators, await the /api/v1/auth/signup response, and verify test passes 5 times consecutively.',
        expectedActions: ['Rewrite locators to use getByRole, getByLabel, getByText', 'Add page.waitForResponse for signup API call', 'Run Playwright test suite to confirm green execution'],
        successCriteria: ['E2E signup test passes cleanly in under 4 seconds', 'Zero reliance on fragile CSS class names or arbitrary sleep timers'],
        evaluationCriteria: { e2eTestQuality: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['data-testid attributes vs accessible getByRole locators', 'Mocking third-party email API vs polling test mail inbox'],
    pressureEvents: ['Release train departs at noon: Green E2E test suite required for staging deployment'],
    expectedSolution: 'Use page.getByRole("button", { name: "Create Account" }); use page.waitForResponse; avoid page.waitForTimeout().',
    acceptableApproaches: ['Playwright recommended accessible locator hierarchy', 'Explicit network response promises'],
    failureConditions: ['Using hardcoded page.waitForTimeout(5000) arbitrary sleeps', 'Tests fail when button copy changes slightly'],
    finalDeliverable: 'signup.spec.ts providing rock-solid, resilient end-to-end test verification.',
    evaluationCriteria: { e2eRobustness: 40, locatorHygiene: 30, testValidation: 30 },
    workplaceContext: 'Full-Stack End-to-End Automated Testing',
    taskType: 'testing_qa'
  },

  {
    id: 'FS-L1-008',
    title: 'Secret Environment Variable Leakage to Frontend Client Bundle',
    role: 'fullstack',
    level: 1,
    difficulty: 'Foundation',
    company: 'Coinbase / Web Application Security',
    department: 'AppSec & Core Engineering',
    domain: 'Crypto / Secrets Management & Web Security',
    skills: ['security', 'environment_variables', 'webpack_bundler', 'nodejs'],
    coreCompetencies: ['secrets_management', 'bundle_analysis', 'appsec'],
    secondarySkills: ['nextjs_env', 'dotenv'],
    skillTags: ['secrets_leak', 'env_vars', 'security', 'api_key', 'bundling'],
    situation: 'A security auditor extracted the master Stripe Secret Key (`sk_live_...`) and internal database password directly from the compiled JavaScript bundle (`app.js`) in the browser.',
    problem: 'Webpack / Vite environment injection used `new webpack.DefinePlugin({ "process.env": JSON.stringify(process.env) })`, injecting all private backend environment secrets into public client code.',
    mission: 'Immediately revoke leaked credentials, isolate client-safe variables with strict prefixes (e.g. `VITE_PUBLIC_` / `NEXT_PUBLIC_`), and configure automated CI secret scanning.',
    workspace: {
      tools: ['editor', 'terminal', 'git'],
      environment: { runtime: 'Node.js v20 / Vite 5 / React 18' }
    },
    availableEvidence: [
      'Public bundle search: String "sk_live_51M..." found in dist/assets/index.js at line 428',
      'Security audit rating: CRITICAL (Full database and payment credential exposure)'
    ],
    subtasks: [
      {
        id: 'FS-L1-008-S1',
        title: 'Search Compiled Production Bundle for Leaked Secrets',
        objective: 'Execute bundle scan in terminal and locate exposed private environment keys.',
        instructions: 'Run `npm run build && grep -rn "sk_live" dist/` in terminal to verify leaked API keys.',
        expectedActions: ['Run production build command', 'Grep compiled dist/ bundles for sensitive string prefixes'],
        successCriteria: ['Located Stripe Secret Key in compiled client JavaScript', 'Identified unsafe webpack/vite environment configuration'],
        evaluationCriteria: { securityAudit: 50, rootCauseIsolation: 50 }
      },
      {
        id: 'FS-L1-008-S2',
        title: 'Enforce Client Variable Prefixing & CI Secret Scan Gate',
        objective: 'Restrict client env exposure strictly to VITE_PUBLIC_* variables and add gitleaks CI check.',
        instructions: 'Update vite.config.js / envConfig.js to only expose whitelisted public variables, rotate credentials in .env, and verify dist contains zero secrets.',
        expectedActions: ['Refactor bundler config to strip process.env injection', 'Enforce prefix VITE_PUBLIC_ on safe client variables', 'Verify clean production build contains 0 secret strings', 'Add pre-commit secret check'],
        successCriteria: ['Compiled client bundle contains zero private backend secrets', 'Application functions normally with properly scoped variables'],
        evaluationCriteria: { securityRemediation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Build-time environment injection vs runtime /api/config endpoint', 'Pre-commit hook vs CI pipeline secret scanning'],
    pressureEvents: ['CISO Emergency Directive: All developer builds halted until secret leak is remediated and keys rotated'],
    expectedSolution: 'Remove blanket process.env injection; only expose variables explicitly prefixed with VITE_PUBLIC_ / NEXT_PUBLIC_; rotate compromised keys.',
    acceptableApproaches: ['Vite native envPrefix: "VITE_PUBLIC_"', 'Backend config endpoint returning only non-sensitive public settings'],
    failureConditions: ['Private API keys still bundled into public output', 'Client crashes because legitimate public keys were also stripped'],
    finalDeliverable: 'Hardened bundler configuration and sanitized environment loading pipeline.',
    evaluationCriteria: { secretsHygiene: 40, securityHardening: 30, testValidation: 30 },
    workplaceContext: 'Application Security Secrets Management',
    taskType: 'security'
  },

  // =============================================
  // LEVEL 2: INTERMEDIATE (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'FS-L2-001',
    title: 'Real-Time Chat App: Socket.io Client & Redis Pub/Sub Cluster',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Slack / Enterprise Messaging Core',
    department: 'Real-Time Messaging & Presence',
    domain: 'Enterprise Communications / Real-Time Scale',
    skills: ['socket_io', 'redis_pubsub', 'react_state', 'nodejs'],
    coreCompetencies: ['real_time_clustering', 'websocket_rooms', 'horizontal_scaling'],
    secondarySkills: ['socket_adapter', 'reconnection'],
    skillTags: ['socket_io', 'redis', 'pubsub', 'real_time', 'chat'],
    situation: 'When the backend scales from 1 server pod to 4 server pods behind a load balancer, users connected to Server Pod A cannot receive messages sent by users connected to Server Pod B.',
    problem: 'Socket.io servers store active connections in local process memory without a shared messaging adapter. Messages broadcast to a channel room only reach sockets on that single local node.',
    mission: 'Connect Socket.io to a shared Redis Pub/Sub adapter (@socket.io/redis-adapter), handle multi-room subscriptions, and verify real-time cross-pod message delivery in React.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Socket.io / Redis / React 18' }
    },
    availableEvidence: [
      'Customer report: Users in the same chat room do not see each other\'s messages unless they refresh',
      'Architecture diagram: 4 Socket.io pods running independently without Redis adapter'
    ],
    subtasks: [
      {
        id: 'FS-L2-001-S1',
        title: 'Demonstrate Cross-Node Message Drop in Multi-Pod Setup',
        objective: 'Connect two browser clients to distinct server instances and observe dropped messages.',
        instructions: 'Run `npm test test/socket-cluster.test.js` to observe message failure across disconnected nodes.',
        expectedActions: ['Run multi-node socket test in terminal', 'Observe that messages emitted on Node 1 fail to arrive on Node 2'],
        successCriteria: ['Reproduced cross-node message isolation', 'Identified absent shared message broker adapter'],
        evaluationCriteria: { distributedAnalysis: 50, testObservation: 50 }
      },
      {
        id: 'FS-L2-001-S2',
        title: 'Integrate Redis Adapter & Broadcast Across Server Pods',
        objective: 'Attach createAdapter(pubClient, subClient) to Socket.io server and test cross-pod broadcast.',
        instructions: 'Update socketServer.js to configure @socket.io/redis-adapter, verify rooms sync across both test nodes, and test React chat UI.',
        expectedActions: ['Configure Socket.io Redis adapter with pub/sub Redis clients', 'Join sockets to room identifiers', 'Verify message broadcast reaches clients on all pods', 'Run socket cluster test suite'],
        successCriteria: ['Messages broadcast instantly to all clients across all server pods', 'Sub-15ms message delivery latency'],
        evaluationCriteria: { adapterConfiguration: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Redis Pub/Sub adapter vs Redis Streams adapter (Streams provide message replay history)', 'Sticky sessions on load balancer vs socket connection ID affinity'],
    pressureEvents: ['Live customer demo: Executive team testing chat room across different office branches'],
    expectedSolution: 'Attach io.adapter(createAdapter(pubClient, subClient)); emit via io.to(roomId).emit("message", data).',
    acceptableApproaches: ['Socket.io Redis adapter integration', 'Standalone Redis Pub/Sub worker broadcasting to local clients'],
    failureConditions: ['Redis connection drop unhandled, crashing Socket.io process', 'Duplicate messages delivered to same client'],
    finalDeliverable: 'socketServer.js and ChatRoom.jsx providing seamless multi-pod real-time communication.',
    evaluationCriteria: { realTimeArchitecture: 40, distributedScaling: 30, testValidation: 30 },
    workplaceContext: 'Horizontally Scaled Real-Time Communications',
    taskType: 'real_time_systems'
  },

  {
    id: 'FS-L2-002',
    title: 'Optimistic UI Updates with Server Rollback on Mutation Failure',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Trello / Board & Card Workspaces',
    department: 'Frontend Experience & Backend APIs',
    domain: 'Productivity SaaS / Optimistic State',
    skills: ['optimistic_ui', 'tanstack_query', 'error_handling', 'rest_apis'],
    coreCompetencies: ['optimistic_updates', 'rollback_mechanisms', 'client_server_resilience'],
    secondarySkills: ['cache_manipulation', 'toast_notifications'],
    skillTags: ['optimistic_ui', 'tanstack_query', 'react', 'rollback', 'ux'],
    situation: 'Users dragging cards between Kanban columns notice a 600ms latency pause before the card moves. When the network fails, the card visually snaps to the new column anyway, corrupting client state.',
    problem: 'Card drag-and-drop waits for server HTTP 200 before updating the UI (poor perceived performance), and error handlers fail to restore previous cache state on 500 error.',
    mission: 'Implement TanStack Query optimistic updates on the Kanban board: move card instantaneously, capture previous state snapshot in onMutate, and roll back cleanly if the server rejects.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / React 18 / TanStack Query v5' }
    },
    availableEvidence: [
      'User feedback: Board feels sluggish; cards take almost a second to drop into place',
      'Desync bug: Card displays in "Done" column in browser, but reloads back to "To Do" on refresh'
    ],
    subtasks: [
      {
        id: 'FS-L2-002-S1',
        title: 'Audit Drag-and-Drop Latency & State Inconsistency',
        objective: 'Move card in browser preview under 800ms network throttling and observe sluggish drop.',
        instructions: 'Open browser preview, set network throttling to Slow 3G, drag a card, and observe the lag.',
        expectedActions: ['Drag card in Kanban preview', 'Observe noticeable pause waiting for server response', 'Inject server 500 error and observe corrupted UI state'],
        successCriteria: ['Measured 800ms perceived interaction delay', 'Confirmed lack of error rollback on mutation failure'],
        evaluationCriteria: { uxProfiling: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L2-002-S2',
        title: 'Implement onMutate Snapshot & onError Rollback Handler',
        objective: 'Cancel incoming queries, save snapshot in onMutate, update cache optimistically, and rollback on error.',
        instructions: 'Update useMoveCardMutation.js with TanStack Query optimistic update pattern, trigger server failure, and verify card snaps back smoothly.',
        expectedActions: ['Cancel pending queries via queryClient.cancelQueries', 'Capture snapshot = queryClient.getQueryData', 'Update cache immediately with new column', 'Implement onError: queryClient.setQueryData(key, snapshot)'],
        successCriteria: ['Card moves instantaneously in < 16ms (60fps feel)', 'Card automatically snaps back to original column with error toast if server fails'],
        evaluationCriteria: { optimisticImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Optimistic update with rollback vs pessimistic loader spinner', 'Server conflict resolution when card was moved by another user concurrently'],
    pressureEvents: ['Product review: Drag-and-drop perceived performance must feel native and instantaneous'],
    expectedSolution: 'Implement onMutate returning { previousCards }, setQueryData optimistically; onError restoring previousCards; onSettled invalidating query.',
    acceptableApproaches: ['TanStack Query onMutate / onError rollback pattern', 'Custom React reducer with undo action buffer'],
    failureConditions: ['Cache permanently corrupted when server returns 400/500', 'Optimistic state overwritten by stale background refetch'],
    finalDeliverable: 'useMoveCardMutation.js with instantaneous optimistic response and safe rollback.',
    evaluationCriteria: { perceivedPerformance: 40, stateIntegrity: 30, testValidation: 30 },
    workplaceContext: 'High-Fidelity Interactive Kanban UX',
    taskType: 'fullstack_ux'
  },

  {
    id: 'FS-L2-003',
    title: 'Server-Side Rendering (SSR) Hydration Mismatch & Dynamic Meta Tags',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Etsy / Marketplace SEO Platforms',
    department: 'SEO Engineering & Web Storefronts',
    domain: 'E-Commerce / SSR & Search Indexing',
    skills: ['ssr_hydration', 'nextjs', 'seo', 'react_lifecycle'],
    coreCompetencies: ['ssr_debugging', 'hydration_mismatch_resolution', 'seo_metadata'],
    secondarySkills: ['open_graph', 'html_serialization'],
    skillTags: ['ssr', 'nextjs', 'hydration', 'seo', 'open_graph'],
    situation: 'Social media link previews (Twitter Cards and Facebook Open Graph) on product pages show generic fallback text instead of the product title and price, harming social referral traffic.',
    problem: 'Product metadata is fetched client-side inside a useEffect hook after initial page render, leaving server-rendered HTML with blank Open Graph tags when social crawlers scrape the page.',
    mission: 'Migrate data fetching to Server-Side Rendering (getServerSideProps / Next.js Server Components), inject dynamic Open Graph meta tags into server HTML, and eliminate client hydration warnings.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Next.js 14 / React 18' }
    },
    availableEvidence: [
      'Social crawler test: curl https://etsy-demo.com/listing/428 returns <meta property="og:title" content="Etsy Listing" />',
      'Hydration warning in console: Text content did not match. Server: "$45.00" Client: "$45.00 USD"'
    ],
    subtasks: [
      {
        id: 'FS-L2-003-S1',
        title: 'Inspect Raw Server HTML via cURL & Verify Crawler View',
        objective: 'Fetch raw HTML of product page and identify missing server-side meta tags.',
        instructions: 'Run `curl -s http://localhost:3000/product/101 | grep og:` in terminal to inspect server output.',
        expectedActions: ['Run curl command in terminal', 'Observe empty Open Graph meta tags and blank product title in server HTML'],
        successCriteria: ['Confirmed crawlers receive un-hydrated template', 'Identified client-only useEffect fetch anti-pattern'],
        evaluationCriteria: { seoAudit: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L2-003-S2',
        title: 'Migrate to Server Fetching & Dynamic Head Tag Generation',
        objective: 'Implement getServerSideProps to fetch listing from database and render dynamic Next Head tags.',
        instructions: 'Update [id].jsx to fetch product data on server, inject og:title, og:image, and og:price into Head, and resolve client hydration diff.',
        expectedActions: ['Implement getServerSideProps in [id].jsx', 'Populate Next Head component with dynamic Open Graph tags', 'Ensure currency formatting matches server and client locale', 'Rerun curl test to verify populated tags'],
        successCriteria: ['Raw server HTML contains dynamic product title, price, and image tags', 'Zero React hydration mismatch warnings in browser console'],
        evaluationCriteria: { ssrImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Static Site Generation with ISR (getStaticProps) vs Server-Side Rendering (getServerSideProps)', 'Locale-aware currency formatting avoiding timezone hydration mismatch'],
    pressureEvents: ['Marketing Lead: New product launch tomorrow; Twitter link previews must show real photo and price'],
    expectedSolution: 'Fetch data in getServerSideProps; pass product as props to page component; render <Head><meta property="og:title" content={product.name} />.',
    acceptableApproaches: ['Next.js getServerSideProps dynamic SSR', 'Next.js App Router generateMetadata function'],
    failureConditions: ['Client-side window.location used on server causing reference crash', 'Hydration mismatch warnings persist in production build'],
    finalDeliverable: 'ProductPage.jsx with dynamic server-rendered SEO meta tags and 100% clean hydration.',
    evaluationCriteria: { ssrHygiene: 40, seoExecution: 30, testValidation: 30 },
    workplaceContext: 'Full-Stack SSR & Social Media Search Optimization',
    taskType: 'seo_ssr'
  },

  {
    id: 'FS-L2-004',
    title: 'Full-Stack Stripe Subscription Webhook & Customer Portal Sync',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Canva / Subscription & Growth Core',
    department: 'Billing Systems & User Subscriptions',
    domain: 'SaaS / Subscription Life Cycle',
    skills: ['stripe_api', 'webhooks', 'postgresql', 'react_state'],
    coreCompetencies: ['saas_billing', 'webhook_reconciliation', 'subscription_lifecycle'],
    secondarySkills: ['customer_portal', 'rbac_permissions'],
    skillTags: ['stripe', 'subscriptions', 'webhooks', 'billing', 'saas'],
    situation: 'When customers cancel or upgrade their Pro subscription via the Stripe Customer Portal, the web application continues showing their old tier until they manually log out and log back in.',
    problem: 'The customer_subscription_updated webhook is received but fails to update user permissions in the database due to missing event type handling, and the client UI has no mechanism to refresh subscription status.',
    mission: 'Handle Stripe webhook events (`customer.subscription.updated`, `customer.subscription.deleted`), update user entitlement flags in PostgreSQL, and reflect real-time tier updates in the React navigation bar.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Stripe SDK / PostgreSQL / React 18' }
    },
    availableEvidence: [
      'Billing dispute: User canceled Pro subscription yesterday but was still able to download Pro assets',
      'Webhook logs: Event customer.subscription.updated received HTTP 200 but user.tier remains "pro"'
    ],
    subtasks: [
      {
        id: 'FS-L2-004-S1',
        title: 'Trace Webhook Event Handling & Database State Stagnation',
        objective: 'Trigger mock Stripe subscription cancellation webhook and inspect database user record.',
        instructions: 'Run `npm test test/billing.test.js` to observe missing event handler in webhook listener.',
        expectedActions: ['Run webhook billing test in terminal', 'Identify unhandled customer.subscription.updated event switch branch'],
        successCriteria: ['Identified that subscription changes are ignored by webhook router', 'Mapped client UI stale entitlement state'],
        evaluationCriteria: { billingAudit: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L2-004-S2',
        title: 'Implement Webhook State Reconciliation & UI Tier Badge',
        objective: 'Update user tier, status, and current_period_end in DB on webhook, and update React user context.',
        instructions: 'Update stripeWebhook.js to process subscription updates, update database user record, and emit update to React client.',
        expectedActions: ['Implement customer.subscription.updated handler', 'Update users table with new plan tier and status', 'Update UserContext.jsx to reflect active subscription status', 'Verify tier badge updates in preview'],
        successCriteria: ['Database user tier updates immediately upon webhook event', 'React UI accurately reflects Pro vs Free badge without re-login'],
        evaluationCriteria: { webhookHandling: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Listening to Stripe webhooks vs polling Stripe API on user session load', 'Grace period handling for past_due status vs immediate feature revocation'],
    pressureEvents: ['Finance audit: Revenue leakage due to canceled users retaining premium feature access'],
    expectedSolution: 'In webhook handler, switch on event.type, extract subscription object, UPDATE users SET tier = sub.status === "active" ? "pro" : "free".',
    acceptableApproaches: ['Stripe webhook event listener updating database tier', 'Stripe checkout session completion sync with customer ID mapping'],
    failureConditions: ['Webhook signature verification bypassed', 'Customer downgraded while payment is still active'],
    finalDeliverable: 'stripeWebhook.js and SubscriptionStatusBadge.jsx providing real-time billing reconciliation.',
    evaluationCriteria: { billingIntegrity: 40, fullstackSynchronization: 30, testValidation: 30 },
    workplaceContext: 'SaaS Subscription Lifecycle & Webhook Processing',
    taskType: 'saas_billing'
  },

  {
    id: 'FS-L2-005',
    title: 'Full-Stack Role-Based Access Control (RBAC) in UI & API Routes',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Notion / Workspace Permissions Platform',
    department: 'Enterprise Security & Permissions',
    domain: 'Enterprise SaaS / Role-Based Access Control',
    skills: ['authorization', 'rbac', 'react_state', 'express'],
    coreCompetencies: ['rbac_architecture', 'route_guarding', 'client_view_hiding'],
    secondarySkills: ['jwt_claims', 'http_403'],
    skillTags: ['rbac', 'authorization', 'permissions', 'admin_guards', 'security'],
    situation: 'A standard "Viewer" user discovered they can delete workspace channels simply by sending a `DELETE /api/v1/channels/:id` request directly via Postman, bypassing the hidden UI button.',
    problem: 'Access control is enforced only on the frontend by hiding the Delete button, while the backend Express route lacks authorization middleware to check the user role.',
    mission: 'Implement defense-in-depth: create authorizeRoles("admin", "owner") middleware on backend routes, return HTTP 403 Forbidden for unauthorized requests, and conditionally render UI controls based on permissions.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / React 18' }
    },
    availableEvidence: [
      'Security ticket: Viewer account deleted production "General" channel using cURL',
      'API audit: DELETE /api/v1/channels/:id checks if user is logged in, but never checks user.role'
    ],
    subtasks: [
      {
        id: 'FS-L2-005-S1',
        title: 'Exploit Missing Authorization via Direct API Invocation',
        objective: 'Send DELETE request using Viewer credentials and observe unauthorized resource deletion.',
        instructions: 'Run `npm test test/rbac.test.js` to observe that backend allows non-admin users to delete resources.',
        expectedActions: ['Run RBAC test suite in terminal', 'Confirm Viewer role can execute admin delete operations'],
        successCriteria: ['Reproduced unauthorized privilege escalation', 'Identified reliance on frontend button hiding alone'],
        evaluationCriteria: { exploitDemonstration: 50, securityInsight: 50 }
      },
      {
        id: 'FS-L2-005-S2',
        title: 'Implement Backend authorizeRoles Middleware & Protected UI Gate',
        objective: 'Write authorizeRoles(...allowedRoles) middleware returning 403, and wrap UI buttons in CanAccess component.',
        instructions: 'Add authorizeRoles("admin") to channel delete route, create CanAccess component in React, and verify end-to-end security.',
        expectedActions: ['Implement authorizeRoles middleware in Express', 'Return HTTP 403 Forbidden with descriptive error', 'Protect DELETE route in channelRoutes.js', 'Verify Viewer receives 403 while Admin succeeds'],
        successCriteria: ['Backend rejects unauthorized roles with HTTP 403 Forbidden', 'UI cleanly hides administrative controls for Viewer accounts'],
        evaluationCriteria: { rbacImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Role-Based Access Control (RBAC) vs Attribute-Based Access Control (ABAC)', 'Returning 403 Forbidden vs 404 Not Found on unauthorized access'],
    pressureEvents: ['Compliance deadline: Enterprise customer ISO 27001 audit reviewing access control enforcement'],
    expectedSolution: 'Create middleware: (req, res, next) => allowed.includes(req.user.role) ? next() : res.status(403).json({ error: "Forbidden" }); protect DELETE route.',
    acceptableApproaches: ['Express RBAC middleware with role enum checking', 'CASL / CanCan style permission engine in client and server'],
    failureConditions: ['Middleware checks role from request body instead of verified JWT session', 'Frontend crashes when encountering 403 error'],
    finalDeliverable: 'rbacMiddleware.js and CanAccess.jsx providing defense-in-depth authorization.',
    evaluationCriteria: { accessControlHardening: 40, fullstackSecurity: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Multi-Tier Role-Based Access Control',
    taskType: 'security'
  },

  {
    id: 'FS-L2-006',
    title: 'Background Job Notification Pipeline: Queue to WebSocket Push',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Figma / Export & Asset Pipeline',
    department: 'Asset Processing & Real-Time Notifications',
    domain: 'Creative Cloud / Asynchronous Notifications',
    skills: ['bullmq', 'websocket', 'react_state', 'nodejs'],
    coreCompetencies: ['asynchronous_job_tracking', 'websocket_push', 'real_time_toast_ui'],
    secondarySkills: ['redis', 'job_progress'],
    skillTags: ['bullmq', 'websocket', 'notifications', 'async_jobs', 'fullstack'],
    situation: 'When users export a 200-page PDF presentation, they stare at a frozen spinner for 2 minutes. If they navigate to another page, the download link is lost forever.',
    problem: 'Exporting runs synchronously inside the web request instead of being dispatched to a background worker queue, and the frontend has no real-time push mechanism to receive the download URL when complete.',
    mission: 'Offload PDF generation to a BullMQ worker, return job ID immediately, emit job progress (0%..100%) and completed download URL over WebSockets, and display a persistent notification toast in React.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / BullMQ / Socket.io / React 18' }
    },
    availableEvidence: [
      'HTTP 504 Timeout: POST /api/v1/export times out after 60 seconds on large documents',
      'User complaint: "I clicked export, waited 2 minutes, page timed out, and I got nothing"'
    ],
    subtasks: [
      {
        id: 'FS-L2-006-S1',
        title: 'Trace Long-Running Request Timeout & Worker Decoupling',
        objective: 'Trigger export in browser preview and observe HTTP timeout on large file simulation.',
        instructions: 'Open preview, click "Export Presentation (200 Pages)", and observe the 60-second gateway timeout in console.',
        expectedActions: ['Trigger export in preview', 'Observe synchronous blocking request and timeout', 'Identify need for asynchronous job queue'],
        successCriteria: ['Captured HTTP timeout on synchronous export', 'Documented need for worker queue and push notification'],
        evaluationCriteria: { architectureDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L2-006-S2',
        title: 'Implement BullMQ Worker & WebSocket Progress Dispatcher',
        objective: 'Enqueue job in BullMQ, emit socket events on progress and completed, and display download toast in React.',
        instructions: 'Create exportQueue.js, update exportWorker to call job.updateProgress() and emit to user room, and render NotificationBell.jsx.',
        expectedActions: ['Enqueue export job and return HTTP 202 with jobId', 'Emit "export:progress" and "export:complete" via Socket.io', 'Update NotificationBell.jsx to show live progress bar and download link', 'Verify end-to-end export'],
        successCriteria: ['Initial request returns in < 50ms', 'Client receives real-time progress updates and download link appears in toast'],
        evaluationCriteria: { asyncPipelineDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Polling job status endpoint vs pushing via WebSockets', 'Temporary download link expiration (S3 presigned URL with 1h TTL)'],
    pressureEvents: ['Customer satisfaction alert: Export timeouts are driving users to competitor tools'],
    expectedSolution: 'Enqueue in BullMQ; return 202 { jobId }; worker updates progress and emits io.to(userId).emit("export:ready", { downloadUrl }).',
    acceptableApproaches: ['BullMQ background worker with Socket.io push notifications', 'Server-Sent Events (SSE) stream for job progress tracking'],
    failureConditions: ['Job progress emitted to global room instead of user-specific socket room', 'Worker hangs without error handling on corrupt document'],
    finalDeliverable: 'exportQueue.js and NotificationBell.jsx delivering asynchronous background exports.',
    evaluationCriteria: { asynchronousDesign: 40, realTimeUX: 30, testValidation: 30 },
    workplaceContext: 'Asynchronous Background Jobs & Real-Time User Notifications',
    taskType: 'async_notifications'
  },

  {
    id: 'FS-L2-007',
    title: 'Automated Database Seeding & Schema Migration in CI/CD Pipeline',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Vercel / Preview Environments Core',
    department: 'Developer Experience & CI Automation',
    domain: 'Cloud Platforms / Ephemeral Test Environments',
    skills: ['devops', 'postgresql', 'prisma_migrations', 'ci_cd'],
    coreCompetencies: ['schema_migrations', 'database_seeding', 'ci_automation'],
    secondarySkills: ['bash_scripting', 'github_actions'],
    skillTags: ['prisma', 'migrations', 'seeding', 'ci_cd', 'database'],
    situation: 'Pull request preview environments fail to boot with "Relation user_profiles does not exist" because database migrations and seed scripts fail to execute in the automated CI container.',
    problem: 'The migration script runs `prisma db push` instead of versioned `prisma migrate deploy`, causing schema divergence, and the seed script uses raw SQL statements that fail on non-empty databases.',
    mission: 'Create idempotent database migration and seed scripts, configure automated CI workflow to spin up ephemeral test databases, and verify clean data hydration.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL / Prisma ORM / GitHub Actions' }
    },
    availableEvidence: [
      'CI log: Error: P3005 The database schema is not empty. Cannot apply migration.',
      'Preview deployment failure: 100% of pull requests fail automated E2E preview step'
    ],
    subtasks: [
      {
        id: 'FS-L2-007-S1',
        title: 'Diagnose Migration Lockout & Non-Idempotent Seed Script',
        objective: 'Run CI database provisioning script locally and observe schema collision failure.',
        instructions: 'Run `npm run db:ci-setup` in terminal and inspect the Prisma migration error.',
        expectedActions: ['Execute CI setup script in terminal', 'Identify non-idempotent seed script failing on duplicate unique key'],
        successCriteria: ['Identified failure mode of non-idempotent migration commands', 'Pinpointed lack of upsert in seeding logic'],
        evaluationCriteria: { ciAudit: 50, scriptAnalysis: 50 }
      },
      {
        id: 'FS-L2-007-S2',
        title: 'Write Idempotent Migration Runner & Upsert Seed Script',
        objective: 'Use prisma migrate deploy and refactor seed script to use upsert ({ where, update, create }).',
        instructions: 'Update package.json scripts with prisma migrate deploy, rewrite seed.ts with prisma.user.upsert(), and verify CI setup passes.',
        expectedActions: ['Update CI migration command to prisma migrate deploy', 'Refactor seed.ts to use upsert instead of create', 'Verify script runs repeatedly without error on existing data', 'Run test suite'],
        successCriteria: ['CI database provisioning passes 100% reliably', 'Seed script can be run multiple times idempotently'],
        evaluationCriteria: { migrationHygiene: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['prisma db push (prototyping) vs prisma migrate deploy (production/CI)', 'Seeding static mock data vs generating randomized data with faker.js'],
    pressureEvents: ['Release engineer: 12 pull requests blocked from staging deployment due to CI migration failure'],
    expectedSolution: 'Execute prisma migrate deploy; write seed scripts using db.user.upsert({ where: { email }, update: {}, create: { ... } }).',
    acceptableApproaches: ['Prisma idempotent migration and upsert seeding', 'Knex/TypeORM versioned migrations with idempotent seeders'],
    failureConditions: ['Seed script drops production tables if run in production environment', 'Migrations fail to apply in chronological sequence'],
    finalDeliverable: 'Idempotent dbSetup.sh and seed.ts ensuring flawless CI/CD preview environment provisioning.',
    evaluationCriteria: { devopsHygiene: 40, databaseSafety: 30, testValidation: 30 },
    workplaceContext: 'CI/CD Database Lifecycle & Preview Environments',
    taskType: 'devops_database'
  },

  {
    id: 'FS-L2-008',
    title: 'Streaming Large CSV Export Without Blocking Node.js Event Loop',
    role: 'fullstack',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Stripe / Merchant Reporting Core',
    department: 'Financial Reporting & Data Export',
    domain: 'Fintech / Stream Processing & CSV Export',
    skills: ['streaming_data', 'nodejs_streams', 'postgresql_cursor', 'react_state'],
    coreCompetencies: ['stream_processing', 'event_loop_protection', 'chunked_http_responses'],
    secondarySkills: ['fast_csv', 'memory_limits'],
    skillTags: ['streams', 'csv_export', 'database_cursor', 'event_loop', 'memory'],
    situation: 'When an enterprise merchant downloads a CSV of 500,000 transactions, the Node.js server freezes for 18 seconds, dropping all other concurrent user requests, before crashing with Out of Memory.',
    problem: 'The export endpoint fetches all 500k rows into an in-memory JavaScript array (`db.query()`), builds a 300MB string in RAM with `.join("\\n")`, and blocks the event loop.',
    mission: 'Implement streaming database query using PostgreSQL Cursor (`pg-query-stream`), pipe rows through a CSV transformation stream, and send chunked HTTP response to client in real-time.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / pg-query-stream / fast-csv / Express' }
    },
    availableEvidence: [
      'Server memory crash: Process heap reached 1.6GB before crashing during CSV export',
      'Event loop lag: Blocked for 18,200ms during CSV string concatenation'
    ],
    subtasks: [
      {
        id: 'FS-L2-008-S1',
        title: 'Profile Event Loop Blockage During In-Memory Array Export',
        objective: 'Trigger 500k row export in test environment and measure event loop freeze.',
        instructions: 'Run `npm run test:export-block` in terminal and monitor event loop latency metrics.',
        expectedActions: ['Run export benchmark in terminal', 'Observe 15+ second event loop lockup and memory spike to 1.5GB'],
        successCriteria: ['Demonstrated complete event loop stall on in-memory array building', 'Identified failure to stream HTTP response chunks'],
        evaluationCriteria: { streamProfiling: 50, memoryAnalysis: 50 }
      },
      {
        id: 'FS-L2-008-S2',
        title: 'Implement Database Cursor & Piped CSV Transform Stream',
        objective: 'Use pg-query-stream to fetch 1,000 rows at a time, pipe to fast-csv format(), and pipe to res.',
        instructions: 'Update exportController.js: set Content-Type: text/csv and Transfer-Encoding: chunked, pipe DB cursor stream through CSV formatter to response.',
        expectedActions: ['Open database stream via QueryStream', 'Pipe stream through fast-csv transform to res', 'Set Content-Disposition: attachment; filename="transactions.csv"', 'Verify memory stays flat < 80MB during 500k row export'],
        successCriteria: ['Export starts streaming immediately in < 50ms', 'Memory usage remains flat at < 80MB regardless of row count (100k or 10M)'],
        evaluationCriteria: { streamArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Node.js native stream pipeline vs async generator for-await-of loop', 'Gzip compression on the fly during CSV stream'],
    pressureEvents: ['Operations alert: Memory crashes during end-of-month financial reconciliation reports'],
    expectedSolution: 'Set res headers; const stream = client.query(new QueryStream(sql)); stream.pipe(csv.format({ headers: true })).pipe(res); handle error and finish.',
    acceptableApproaches: ['Node.js stream.pipeline with database cursor and CSV formatter', 'TransformStream with chunked response writing'],
    failureConditions: ['Buffering all rows in memory before calling res.write()', 'Client disconnect leaves database cursor open leaking connection'],
    finalDeliverable: 'exportController.js streaming massive CSV reports with minimal memory footprint.',
    evaluationCriteria: { streamEfficiency: 40, eventLoopSafety: 30, testValidation: 30 },
    workplaceContext: 'High-Volume Streaming Data Export Pipeline',
    taskType: 'stream_processing'
  },

  // =============================================
  // LEVEL 3: ADVANCED (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'FS-L3-001',
    title: 'Collaborative Document Editor with Conflict-Free Replicated Data Types (CRDT)',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'Figma / Real-Time Document Collaboration',
    department: 'Multiplayer Engine & Collaborative Core',
    domain: 'Creative Cloud / Real-Time Collaboration & CRDT',
    skills: ['crdt', 'websocket', 'yjs', 'fullstack_architecture'],
    coreCompetencies: ['crdt_synchronization', 'multiplayer_collaboration', 'state_convergence'],
    secondarySkills: ['quill_editor', 'binary_encoding'],
    skillTags: ['crdt', 'yjs', 'websocket', 'collaborative_editing', 'multiplayer'],
    situation: 'When two remote designers type in the same text field simultaneously over high-latency connections, their edits jumble, letters are duplicated, and the document states diverge permanently.',
    problem: 'The document editor uses naive string replacement over WebSockets instead of a Conflict-Free Replicated Data Type (CRDT), making it impossible to guarantee strong eventual consistency across concurrent edits.',
    mission: 'Implement a CRDT multiplayer synchronization engine using Yjs and WebSockets: integrate y-websocket provider, bind Y.Text to editor, and verify state convergence across high-latency simulated peers.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Yjs / WebSockets / React 18' }
    },
    availableEvidence: [
      'Document divergence report: Peer A sees "Design Systems" while Peer B sees "DesSysign tems"',
      'WebSocket traffic: Raw text strings transmitted instead of CRDT delta updates'
    ],
    subtasks: [
      {
        id: 'FS-L3-001-S1',
        title: 'Demonstrate Text Overwrite & Desynchronization Under Latency',
        objective: 'Simulate concurrent typing across two virtual clients with 200ms latency in test runner.',
        instructions: 'Run `npm test test/multiplayer.test.js` to observe concurrent keystroke corruption.',
        expectedActions: ['Run multiplayer concurrency test in terminal', 'Observe text jumbling and permanent state divergence between peers'],
        successCriteria: ['Reproduced state divergence on concurrent edits', 'Identified lack of operational transformation or CRDT engine'],
        evaluationCriteria: { concurrencyDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L3-001-S2',
        title: 'Integrate Yjs CRDT Document & Y-WebSocket Sync Server',
        objective: 'Instantiate Y.Doc, bind Y.Text to client editor, and run Y-WebSocket sync backend.',
        instructions: 'Update collaborativeEditor.js to use Yjs, wire up websocket provider, and verify that concurrent edits converge identically.',
        expectedActions: ['Configure Y.Doc and Y.Text data structure', 'Set up y-websocket client provider and server handler', 'Simulate concurrent keystrokes across peers', 'Verify 100% identical convergence on both peers'],
        successCriteria: ['Documents on all connected peers converge to identical text', 'Zero lost characters or cursor jumping'],
        evaluationCriteria: { crdtImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Yjs vs Automerge CRDT library', 'Binary WebSocket encoding (lib0) vs JSON protocol'],
    pressureEvents: ['Product demo: CEO testing live multiplayer document editing with investors'],
    expectedSolution: 'Create const ydoc = new Y.Doc(); bind y-websocket provider; bind ydoc.getText("content") to editor; let CRDT handle convergence.',
    acceptableApproaches: ['Yjs with y-websocket server synchronization', 'Automerge document synchronization over WebSockets'],
    failureConditions: ['Sending entire document string on every keystroke', 'Peers maintain conflicting character order after network reconnect'],
    finalDeliverable: 'MultiplayerEditor.jsx and yjsServer.js providing real-time CRDT document collaboration.',
    evaluationCriteria: { crdtArchitecture: 40, realTimeConvergence: 30, testValidation: 30 },
    workplaceContext: 'Real-Time Multiplayer Collaborative Engine',
    taskType: 'collaborative_crdt'
  },

  {
    id: 'FS-L3-002',
    title: 'GraphQL Federation & Schema Stitching N+1 Latency Regression',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'Netflix / Unified Graph Gateway',
    department: 'API Platform & GraphQL Federation',
    domain: 'Streaming Media / GraphQL Supergraph',
    skills: ['graphql_federation', 'apollo_gateway', 'dataloader', 'nodejs'],
    coreCompetencies: ['graphql_federation', 'dataloader_batching', 'schema_stitching'],
    secondarySkills: ['subgraph_resolvers', 'query_complexity'],
    skillTags: ['graphql', 'federation', 'dataloader', 'apollo', 'n_plus_one'],
    situation: 'The mobile app home screen query `getPersonalizedRecommendations` takes 3,200ms to resolve through Apollo Federation Gateway, triggering downstream service timeout alarms.',
    problem: 'The UserSubgraph and VideoSubgraph federated schema resolves user viewing history by calling VideoService.getById() individually for each of the 60 recommended titles without a DataLoader batching mechanism.',
    mission: 'Implement an Apollo Federation DataLoader batching resolver on VideoSubgraph, configure query complexity limits, and reduce gateway query latency to under 120ms.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Apollo Gateway / Apollo Server' }
    },
    availableEvidence: [
      'Apollo Studio trace: Query executed 61 sub-queries across subgraph boundary',
      'Gateway latency: p99 latency 3,240ms on personalized home feed'
    ],
    subtasks: [
      {
        id: 'FS-L3-002-S1',
        title: 'Trace Federated Query Plan & Cross-Subgraph N+1 Calls',
        objective: 'Inspect Apollo Federation Query Plan in terminal and count downstream subgraph fetches.',
        instructions: 'Run `npm run test:federation-plan` to observe the generated execution plan.',
        expectedActions: ['Run query plan analysis in terminal', 'Identify 60 sequential HTTP requests from Gateway to VideoSubgraph'],
        successCriteria: ['Mapped federated query plan bottleneck', 'Identified absent DataLoader batching on entity resolver'],
        evaluationCriteria: { federationAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L3-002-S2',
        title: 'Implement DataLoader Entity Batching in Video Subgraph',
        objective: 'Write videoDataLoader batch function (keys => db.getVideosByIds(keys)) and wire into __resolveReference.',
        instructions: 'Update videoResolvers.js to batch entity lookups via DataLoader, rerun query plan test, and verify single batched request.',
        expectedActions: ['Create DataLoader batch function for video IDs', 'Implement __resolveReference entity resolver using DataLoader', 'Verify subgraph calls drop from 61 to 1', 'Confirm response latency < 120ms'],
        successCriteria: ['Subgraph requests reduced from 61 to 1 batched call', 'Query latency drops from 3,200ms to 95ms (30x improvement)'],
        evaluationCriteria: { dataloaderDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Dataloader per-request context instantiation vs singleton (Singleton causes cross-user cache leakage)', 'Query depth limiting vs query cost analysis'],
    pressureEvents: ['Mobile release gate: App launch time must remain under 1.5 seconds on cellular data'],
    expectedSolution: 'Instantiate DataLoader in GraphQL context: new DataLoader(ids => batchFetchVideos(ids)); call loader.load(ref.id) in __resolveReference.',
    acceptableApproaches: ['DataLoader in Apollo Server context with batched reference resolver', 'Apollo Router declarative entity batching'],
    failureConditions: ['DataLoader shared globally across requests leaking user context', 'Subgraph returns results out of order breaking loader matching'],
    finalDeliverable: 'videoResolvers.js with high-performance federated entity batching.',
    evaluationCriteria: { federationDesign: 40, queryPerformance: 30, testValidation: 30 },
    workplaceContext: 'Enterprise GraphQL Federation Architecture',
    taskType: 'graphql_federation'
  },

  {
    id: 'FS-L3-003',
    title: 'Multi-Tenant SaaS Tenant Context Isolation: Subdomains & DB Schemas',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'Slack / Enterprise Grid Multi-Tenancy',
    department: 'Multi-Tenant Platform Infrastructure',
    domain: 'Enterprise SaaS / Multi-Tenant Isolation',
    skills: ['multitenancy', 'postgresql_schemas', 'async_local_storage', 'dns_routing'],
    coreCompetencies: ['multi_tenant_architecture', 'tenant_routing', 'data_isolation'],
    secondarySkills: ['subdomain_extraction', 'connection_switching'],
    skillTags: ['multitenant', 'postgresql_schemas', 'subdomains', 'tenant_context', 'saas'],
    situation: 'During enterprise security verification, an engineer from Tenant Alpha discovered they could query users from Tenant Beta by crafting raw API calls with a forged Host header.',
    problem: 'Tenant identification relies on unverified client headers without database schema partitioning. All tenants share a single `public` schema without strict connection routing or search_path isolation.',
    mission: 'Implement multi-tenant context middleware using AsyncLocalStorage, isolate tenants into dedicated PostgreSQL schemas (`tenant_alpha`, `tenant_beta`), and enforce search_path on all queries.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL 16 / Express' }
    },
    availableEvidence: [
      'Security audit finding: Tenant Alpha can view Tenant Beta employee directory by passing X-Tenant-Id: beta',
      'Compliance: Multi-tenant data segregation required for SOC 2 Type II certification'
    ],
    subtasks: [
      {
        id: 'FS-L3-003-S1',
        title: 'Demonstrate Cross-Tenant Data Access via Header Forgery',
        objective: 'Execute test simulating Tenant Alpha forging request headers to read Tenant Beta data.',
        instructions: 'Run `npm test test/multitenancy.test.js` to observe tenant data leakage.',
        expectedActions: ['Run multi-tenant test in terminal', 'Observe Tenant Alpha accessing Tenant Beta database records'],
        successCriteria: ['Reproduced cross-tenant data access flaw', 'Identified reliance on unverified request headers in shared schema'],
        evaluationCriteria: { securityAudit: 50, tenantAnalysis: 50 }
      },
      {
        id: 'FS-L3-003-S2',
        title: 'Architect Subdomain Resolution & PostgreSQL Schema Isolation',
        objective: 'Resolve tenant from verified subdomain/JWT, set search_path = tenant_schema, and enforce strict isolation.',
        instructions: 'Create tenantContext.js using AsyncLocalStorage, dynamically switch PostgreSQL search_path before query execution, and re-run tests.',
        expectedActions: ['Extract verified tenant from authenticated JWT claims', 'Set AsyncLocalStorage tenant context', 'Set connection search_path to tenant schema on checkout', 'Verify 100% data isolation in test suite'],
        successCriteria: ['100% of queries strictly restricted to authenticated tenant schema', 'Cross-tenant access attempts return 0 records or fail with schema error'],
        evaluationCriteria: { tenantIsolation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Schema-per-tenant vs Database-per-tenant vs Shared table with Row-Level Security (RLS)', 'Connection pool per tenant vs shared pool with dynamic search_path setting'],
    pressureEvents: ['Fortune 500 customer contract signing pending verified SOC 2 tenant segregation audit'],
    expectedSolution: 'Verify tenant ID from signed JWT; execute `SET search_path TO "tenant_${tenantId}", public` on client checkout; run queries in tenant context.',
    acceptableApproaches: ['PostgreSQL schema-per-tenant with dynamic search_path', 'PostgreSQL Row-Level Security (RLS) with current_setting(\'app.current_tenant_id\')'],
    failureConditions: ['Connection returned to pool without resetting search_path, poisoning next request', 'Tenant ID parsed from unauthenticated query param'],
    finalDeliverable: 'tenantMiddleware.js and dbTenantPool.js enforcing ironclad multi-tenant data segregation.',
    evaluationCriteria: { isolationArchitecture: 40, securityCompliance: 30, testValidation: 30 },
    workplaceContext: 'Multi-Tenant Enterprise SaaS Isolation',
    taskType: 'multi_tenancy'
  },

  {
    id: 'FS-L3-004',
    title: 'Zero-Downtime Blue/Green Deployment with Database Migration',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'Stripe / Core Deployment Infrastructure',
    department: 'Release Engineering & Traffic Shifting',
    domain: 'Fintech / Zero-Downtime Releases',
    skills: ['devops', 'zero_downtime', 'database_migrations', 'blue_green'],
    coreCompetencies: ['blue_green_deployment', 'expand_and_contract_pattern', 'traffic_shifting'],
    secondarySkills: ['backward_compatibility', 'healthchecks'],
    skillTags: ['blue_green', 'zero_downtime', 'migrations', 'deployment', 'devops'],
    situation: 'During the v3.0 release, switching traffic from Blue to Green caused 4,000 HTTP 500 errors because the Green app required a renamed database column that the Blue app was still writing to.',
    problem: 'Deployments execute breaking schema changes in a single step instead of using the Expand-and-Contract (Parallel Change) migration pattern, causing active sessions on the old version to crash.',
    mission: 'Implement the Expand-and-Contract database pattern: expand schema with dual-writing, verify Blue and Green simultaneously function, shift traffic, and contract schema after cutover.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL / Nginx Traffic Switch' }
    },
    availableEvidence: [
      'Production deployment log: 4,120 errors: column "full_name" does not exist in version 2 code',
      'Deployment downtime: 8 minutes of degraded service during database migration'
    ],
    subtasks: [
      {
        id: 'FS-L3-004-S1',
        title: 'Simulate Breaking Schema Change During Traffic Shift',
        objective: 'Trigger column rename in database while Blue application handles live traffic.',
        instructions: 'Run `npm test test/blue-green.test.js` to observe immediate crash in Blue application.',
        expectedActions: ['Run traffic shift simulation in terminal', 'Observe Blue application throwing SQL errors when column is renamed'],
        successCriteria: ['Reproduced deployment downtime failure', 'Identified violation of backward compatibility principles'],
        evaluationCriteria: { deploymentDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L3-004-S2',
        title: 'Architect Expand-and-Contract Migration & Traffic Switch',
        objective: '1. Add new column (Expand), 2. Dual-write in code, 3. Shift traffic to Green, 4. Drop old column (Contract).',
        instructions: 'Update migration scripts and model code to support both column formats simultaneously, run simulated deployment, and verify 0 errors.',
        expectedActions: ['Apply Expand migration adding new column as nullable', 'Update backend model to write to both columns and read with fallback', 'Execute Nginx traffic shift from Blue to Green', 'Verify zero 500 errors during switchover'],
        successCriteria: ['100% zero downtime during deployment traffic shift', 'Both old and new versions run concurrently without SQL errors'],
        evaluationCriteria: { migrationPattern: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Application-layer dual writing vs PostgreSQL database trigger dual writing', 'Canary traffic shifting (10% -> 50% -> 100%) vs instant switch'],
    pressureEvents: ['CTO Directive: Zero downtime SLA is mandatory for all future platform updates'],
    expectedSolution: 'Phase 1: ADD COLUMN new_name; Phase 2: Deploy code writing to old and new; Phase 3: Backfill old data; Phase 4: Deploy code reading new; Phase 5: DROP COLUMN old.',
    acceptableApproaches: ['Expand-and-Contract migration pattern', 'Database views / triggers maintaining backward compatibility shim'],
    failureConditions: ['Renaming column in place breaking old version code', 'Dropping old column before old version pods are completely decommissioned'],
    finalDeliverable: 'expandContractMigration.sql and trafficSwitch.sh providing 100% zero-downtime deployment.',
    evaluationCriteria: { deploymentEngineering: 40, backwardCompatibility: 30, testValidation: 30 },
    workplaceContext: 'Continuous Zero-Downtime Deployment Architecture',
    taskType: 'deployment_engineering'
  },

  {
    id: 'FS-L3-005',
    title: 'Asynchronous Video Upload & Transcoding Pipeline: Client to FFmpeg Queue',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'TikTok / Creator Video Ingestion',
    department: 'Media Processing & Video Infrastructure',
    domain: 'Social Video / Asynchronous Video Pipelines',
    skills: ['media_processing', 'ffmpeg', 'bullmq', 'chunked_uploads'],
    coreCompetencies: ['video_transcoding', 'chunked_upload_pipeline', 'hls_streaming'],
    secondarySkills: ['hls_m3u8', 'webhooks'],
    skillTags: ['video_upload', 'ffmpeg', 'hls', 'transcoding', 'bullmq'],
    situation: 'Creators uploading 2GB 4K video files experience frequent network upload drops on mobile, and the backend server CPU spikes to 100% trying to transcode videos synchronously.',
    problem: 'Uploads are sent as a single monolithic HTTP POST without chunking or resume capability, and FFmpeg transcoding executes in the web process instead of an asynchronous worker queue.',
    mission: 'Implement resumable chunked video uploads (Tus protocol / chunked multipart), queue transcoding in BullMQ, transcode into HLS format (1080p, 720p, 480p) via FFmpeg, and notify client.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / FFmpeg / BullMQ / React 18' }
    },
    availableEvidence: [
      'Upload failure rate: 38% of uploads > 500MB fail on mobile due to network connection resets',
      'CPU saturation: Single 4K transcoding job consumes 8 CPU cores, causing web API to drop connections'
    ],
    subtasks: [
      {
        id: 'FS-L3-005-S1',
        title: 'Trace Monolithic Upload Failure & Server CPU Saturation',
        objective: 'Simulate 1GB upload with network drop at 80% and inspect server process CPU.',
        instructions: 'Run `npm test test/video-upload.test.js` to observe upload restart from 0% and CPU spike.',
        expectedActions: ['Run video upload test in terminal', 'Observe failure to resume interrupted upload', 'Observe synchronous FFmpeg process blocking server thread'],
        successCriteria: ['Demonstrated unrecoverable upload failure on network glitch', 'Identified synchronous media processing anti-pattern'],
        evaluationCriteria: { mediaDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L3-005-S2',
        title: 'Implement Resumable Chunked Upload & Worker HLS Transcoder',
        objective: 'Slice video into 5MB chunks on client, assemble on server, enqueue in BullMQ, and transcode HLS playlist.',
        instructions: 'Update VideoUploader.jsx with chunked upload loop, create transcodeWorker.js with FFmpeg HLS conversion, and emit status over WebSocket.',
        expectedActions: ['Implement client-side File.slice() chunked upload handler', 'Assemble chunks on server and push to transcoding queue', 'Execute FFmpeg generating master.m3u8 and HLS video segments', 'Verify playback in HLS video player preview'],
        successCriteria: ['Interrupted uploads resume from last completed chunk without restarting', 'Videos transcode asynchronously into HLS multi-bitrate streams'],
        evaluationCriteria: { mediaPipelineDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Tus protocol vs custom S3 multipart upload implementation', 'GPU-accelerated NVENC transcoding vs CPU-based libx264'],
    pressureEvents: ['Creator Summit in 2 days: Influencers uploading 4K video blogs must have smooth experience'],
    expectedSolution: 'Slice file into 5MB chunks; verify chunk hashes; assemble into final file; queue BullMQ job; run ffmpeg -i input.mp4 -hls_time 6 -hls_playlist_type vod master.m3u8.',
    acceptableApproaches: ['Chunked resumable upload with FFmpeg background worker', 'S3 Multipart Upload with AWS Elemental MediaConvert webhooks'],
    failureConditions: ['Chunk hash mismatch corrupts video stream', 'Transcoding worker leaves temporary video files filling up disk space'],
    finalDeliverable: 'VideoUploader.jsx and transcodeWorker.js providing rock-solid resumable video processing.',
    evaluationCriteria: { mediaArchitecture: 40, resilience: 30, testValidation: 30 },
    workplaceContext: 'High-Volume Video Ingestion & HLS Transcoding',
    taskType: 'media_pipeline'
  },

  {
    id: 'FS-L3-006',
    title: 'Server-Sent Events (SSE) vs WebSockets for High-Volume Telemetry Streaming',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'Datadog / Live Metrics Stream Engineering',
    department: 'Real-Time Telemetry & Metric Streaming',
    domain: 'Cloud Observability / Server-Sent Events',
    skills: ['sse_streaming', 'http2', 'event_stream', 'react_hooks'],
    coreCompetencies: ['sse_architecture', 'unidirectional_streaming', 'http2_multiplexing'],
    secondarySkills: ['text_event_stream', 'backoff_reconnect'],
    skillTags: ['sse', 'server_sent_events', 'http2', 'streaming', 'telemetry'],
    situation: 'A real-time telemetry dashboard using WebSockets exhausts corporate firewall proxies that block non-HTTP port 80/443 WebSocket upgrades, while maintaining bidirectional socket overhead for unidirectional data.',
    problem: 'The dashboard only needs unidirectional server-to-client streaming, but WebSockets require protocol upgrade handshakes that fail across corporate enterprise proxy firewalls.',
    mission: 'Migrate live telemetry streaming from WebSockets to HTTP/2 Server-Sent Events (SSE) with `text/event-stream`, native browser EventSource auto-reconnection, and client backoff.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / React 18 / EventSource' }
    },
    availableEvidence: [
      'Enterprise firewall log: WebSocket connection to wss://datadog-demo.com/stream BLOCKED (101 Switching Protocols forbidden)',
      'Corporate client issue: 42 enterprise clients behind bluecoat proxies cannot view live metrics'
    ],
    subtasks: [
      {
        id: 'FS-L3-006-S1',
        title: 'Trace Corporate Proxy Blockade on WebSocket Handshake',
        objective: 'Simulate corporate proxy stripping 101 Switching Protocols header in test runner.',
        instructions: 'Run `npm test test/sse.test.js` to observe WebSocket handshake failure through proxy.',
        expectedActions: ['Run proxy simulation test in terminal', 'Observe WebSocket upgrade rejected with HTTP 403 Forbidden'],
        successCriteria: ['Confirmed corporate proxy blocking WebSocket upgrades', 'Identified suitability of standard HTTP/2 SSE streaming'],
        evaluationCriteria: { networkInspection: 50, protocolInsight: 50 }
      },
      {
        id: 'FS-L3-006-S2',
        title: 'Implement HTTP/2 SSE Endpoint & React useEventSource Hook',
        objective: 'Write res.writeHead(200, { "Content-Type": "text/event-stream" }) and connect native EventSource in React.',
        instructions: 'Update telemetryController.js to format data: {payload}\\n\\n, write useEventSource custom hook, and verify chart updates smoothly.',
        expectedActions: ['Configure SSE headers (text/event-stream, Cache-Control: no-cache, Connection: keep-alive)', 'Format event stream chunks: id: 1\\nevent: metric\\ndata: {...}\\n\\n', 'Implement useEventSource hook in React', 'Verify streaming through corporate proxy simulation'],
        successCriteria: ['Telemetry streams cleanly through standard HTTP/2 without proxy blocks', 'EventSource automatically reconnects if network drops'],
        evaluationCriteria: { sseImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Server-Sent Events (SSE) vs WebSockets (SSE works over standard HTTP/2 and has native auto-reconnect)', 'Heartbeat keepalive comments (: ping\\n\\n) to prevent proxy timeout'],
    pressureEvents: ['Sales demo: Major bank security review requires all traffic to use standard HTTP/2 without socket upgrades'],
    expectedSolution: 'Send headers text/event-stream; flush headers; send res.write(`data: ${JSON.stringify(metric)}\\n\\n`); client uses new EventSource("/api/stream").',
    acceptableApproaches: ['Server-Sent Events with HTTP/2 multiplexing', 'Fetch API readable stream with TextDecoderStream'],
    failureConditions: ['Forgetting double newline \\n\\n at end of SSE message, causing client to buffer indefinitely', 'Response buffering in Nginx (missing X-Accel-Buffering: no)'],
    finalDeliverable: 'telemetryStream.js and useEventSource.js delivering reliable HTTP/2 telemetry streaming.',
    evaluationCriteria: { streamingDesign: 40, proxyResilience: 30, testValidation: 30 },
    workplaceContext: 'Enterprise-Compliant Real-Time Data Streaming',
    taskType: 'real_time_streaming'
  },

  {
    id: 'FS-L3-007',
    title: 'Edge Functions & Global Geolocation Content Personalization',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'Vercel / Edge Middleware & Routing',
    department: 'Edge Compute & Global Delivery',
    domain: 'Cloud Platforms / Edge Serverless Functions',
    skills: ['edge_computing', 'cloudflare_workers', 'geolocation', 'caching_strategies'],
    coreCompetencies: ['edge_middleware', 'geolocation_routing', 'sub_millisecond_routing'],
    secondarySkills: ['v8_isolates', 'cache_headers'],
    skillTags: ['edge_functions', 'geolocation', 'cloudflare_workers', 'sub_millisecond', 'edge'],
    situation: 'International users visiting an e-commerce storefront wait 1.2 seconds for currency conversion and regional pricing because all requests travel across the globe to the US-East origin server.',
    problem: 'Geolocation, currency detection, and regional content rewrites execute on the centralized origin database instead of executing at the CDN Edge (V8 Isolates) in < 15ms.',
    mission: 'Implement an Edge Middleware function (Cloudflare Workers / Vercel Edge): inspect request.geo (country, currency), rewrite the URL path, inject custom headers, and cache edge responses.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Edge Runtime / V8 Isolates / Web Standards' }
    },
    availableEvidence: [
      'Latency metrics: European users experience 1,180ms TTFB due to transatlantic round trips',
      'Origin server CPU: 40% of origin CPU consumed by repetitive IP-to-country GeoIP lookups'
    ],
    subtasks: [
      {
        id: 'FS-L3-007-S1',
        title: 'Benchmark Centralized Origin Latency vs Edge Response',
        objective: 'Measure round-trip time from Tokyo and Frankfurt nodes to centralized US origin.',
        instructions: 'Run `npm run bench:geo` in terminal to observe latency impact of origin GeoIP lookups.',
        expectedActions: ['Run international latency benchmark in terminal', 'Quantify 1,100ms+ round-trip latency overhead'],
        successCriteria: ['Demonstrated geographic latency penalty', 'Identified opportunities for edge rewrite'],
        evaluationCriteria: { latencyAnalysis: 50, edgeFeasibility: 50 }
      },
      {
        id: 'FS-L3-007-S2',
        title: 'Deploy Edge Middleware & Regional URL Rewriting',
        objective: 'Write edge middleware inspecting req.geo.country and rewrite response to localized currency in < 10ms.',
        instructions: 'Update middleware.ts using standard Web APIs, inject x-user-currency header, cache regional fragments, and verify sub-20ms TTFB.',
        expectedActions: ['Write Edge Middleware using standard Request/Response APIs', 'Detect country code and inject X-Regional-Currency header', 'Rewrite URL path to localized edge route', 'Run edge benchmark to confirm TTFB < 25ms'],
        successCriteria: ['TTFB for international users drops from 1,200ms to 18ms', 'Origin server offloaded completely from GeoIP processing'],
        evaluationCriteria: { edgeImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Edge HTML rewriting (HTMLRewriter) vs Client-side hydration with Edge cookie', 'Edge Key-Value (KV) cache vs Cache-Control edge caching'],
    pressureEvents: ['Black Friday Europe: European conversion rates dropping due to multi-second page loads'],
    expectedSolution: 'In Edge Middleware: const country = req.geo?.country || "US"; const currency = getCurrency(country); res.headers.set("x-currency", currency); return rewrite.',
    acceptableApproaches: ['Vercel / Cloudflare Edge Middleware with URL rewriting', 'HTMLRewriter stream transformer at edge'],
    failureConditions: ['Using Node.js-specific modules (fs, path) in Edge Runtime (V8 isolate crash)', 'Edge function execution exceeds 50ms CPU limit'],
    finalDeliverable: 'middleware.ts running at the edge delivering sub-20ms regional content personalization.',
    evaluationCriteria: { edgeArchitecture: 40, latencyReduction: 30, testValidation: 30 },
    workplaceContext: 'Global Edge Computing & Geolocation Optimization',
    taskType: 'edge_computing'
  },

  {
    id: 'FS-L3-008',
    title: 'Full-Stack Performance Audit: Core Web Vitals to Server TTFB',
    role: 'fullstack',
    level: 3,
    difficulty: 'Advanced',
    company: 'Shopify / Merchant Speed Core',
    department: 'Web Performance & Infrastructure',
    domain: 'E-Commerce / Full-Stack Speed Optimization',
    skills: ['performance_opt', 'core_web_vitals', 'ttfb_optimization', 'profiling'],
    coreCompetencies: ['fullstack_performance_tuning', 'ttfb_reduction', 'bundle_optimization'],
    secondarySkills: ['redis_caching', 'code_splitting'],
    skillTags: ['ttfb', 'core_web_vitals', 'performance', 'redis', 'bundle_size'],
    situation: 'A major e-commerce storefront suffers from both a slow backend Time to First Byte (TTFB = 1,800ms) and an oversized client JavaScript bundle (3.8MB), causing an overall Lighthouse score of 24/100.',
    problem: 'Backend executes un-indexed sequential SQL queries before sending the first byte of HTML, and the frontend bundle includes entire heavy libraries (moment.js, lodash, un-treeshaken icons) on initial load.',
    mission: 'Execute full-stack performance optimization: cache initial HTML shell in Redis to drop TTFB to < 100ms, code-split frontend bundles using dynamic import(), and raise Lighthouse score to > 90.',
    workspace: {
      tools: ['editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Vite / React 18 / Redis / Lighthouse' }
    },
    availableEvidence: [
      'Lighthouse audit: Score 24/100 (TTFB 1.8s, LCP 5.2s, Bundle Size 3.8MB)',
      'Bundle analyzer: moment.js and full lodash library accounting for 48% of total client bundle'
    ],
    subtasks: [
      {
        id: 'FS-L3-008-S1',
        title: 'Run Full-Stack Lighthouse & Bundle Analyzer Audit',
        objective: 'Execute Lighthouse CLI and webpack/vite bundle visualizer in terminal.',
        instructions: 'Run `npm run perf:audit` and `npm run build:analyze` to pinpoint the dual backend and frontend bottlenecks.',
        expectedActions: ['Execute automated performance audit', 'Identify 1.8s backend database delay and 3.8MB bundle bloat'],
        successCriteria: ['Quantified full-stack performance debt', 'Mapped top 3 heaviest third-party JavaScript dependencies'],
        evaluationCriteria: { diagnosticThoroughness: 50, metricAccuracy: 50 }
      },
      {
        id: 'FS-L3-008-S2',
        title: 'Implement Redis TTFB Caching & Dynamic Bundle Splitting',
        objective: 'Cache server response in Redis (TTFB < 80ms) and replace heavy libraries with date-fns/lodash-es and React.lazy.',
        instructions: 'Update serverCache.js with Redis HTML caching, refactor client imports to use code-splitting, and achieve Lighthouse > 90.',
        expectedActions: ['Implement Redis cache-aside for product HTML responses', 'Replace moment.js with native Intl or date-fns', 'Code-split heavy modals with React.lazy and Suspense', 'Rerun Lighthouse audit'],
        successCriteria: ['TTFB drops from 1,800ms to 65ms', 'Client bundle size reduced from 3.8MB to 340kB', 'Lighthouse score jumps from 24 to 94'],
        evaluationCriteria: { fullstackOptimization: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Dynamic imports (React.lazy) vs route-based automatic code splitting', 'HTML fragment caching vs complete page caching in Redis'],
    pressureEvents: ['Google SEO update: Sites with Lighthouse score < 50 face immediate 20% organic traffic demotion'],
    expectedSolution: 'Cache HTML responses in Redis with 60s TTL; replace moment with Intl.DateTimeFormat; use React.lazy(() => import("./HeavyModal")).',
    acceptableApproaches: ['Full-stack optimization combining server Redis caching and client dynamic code-splitting', 'Edge caching with client bundle tree-shaking'],
    failureConditions: ['Stale price information cached indefinitely in Redis', 'Code splitting creates excessive waterfall chunk requests on slow mobile'],
    finalDeliverable: 'Optimized full-stack application achieving Lighthouse score > 90 and sub-100ms TTFB.',
    evaluationCriteria: { fullstackMastery: 40, measurableImprovement: 30, testValidation: 30 },
    workplaceContext: 'Comprehensive Full-Stack Performance Engineering',
    taskType: 'fullstack_performance'
  },

  // ========================================================
  // LEVEL 4: CRITICAL INCIDENT SIMULATION (8 TASKS, 16 SUBTASKS)
  // ========================================================
  {
    id: 'FS-L4-001',
    title: 'Full-Stack E-Commerce Checkout Outage Under Flash Sale Traffic',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Shopify / Flash Sale Command Center',
    department: 'Full-Stack SRE & Merchant Checkout',
    domain: 'E-Commerce / Extreme Concurrency Outage',
    skills: ['incident_response', 'queue_throttling', 'circuit_breaker', 'fullstack_architecture'],
    coreCompetencies: ['crisis_triage', 'virtual_waiting_room', 'graceful_degradation'],
    secondarySkills: ['redis_queues', 'client_polling'],
    skillTags: ['flash_sale', 'checkout_outage', 'queue_throttling', 'p1_incident', 'fullstack'],
    situation: 'During a massive sneaker drop (150,000 users clicking checkout simultaneously), the backend database locks up with 100% CPU, the API returns 504 Gateway Timeouts, and the React UI locks in an infinite spinner.',
    problem: 'The checkout system lacks ingress queue throttling (Virtual Waiting Room). Every checkout click immediately hammers the relational database with concurrent ACID transactions, causing total system collapse.',
    mission: 'Act as Incident Commander: deploy a Virtual Waiting Room queue at the edge to meter checkout traffic to 500 orders/minute, engage client-side queue polling UI, and restore database stability.',
    workspace: {
      tools: ['slack', 'editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / React 18 / Redis / PostgreSQL' }
    },
    availableEvidence: [
      '[WAR ROOM] Datadog Alert: Checkout p99 latency = 45,000ms | 504 Gateway Timeout rate = 82%',
      'CFO message: "Flash sale is failing. 80,000 customers unable to check out. Fix this immediately."'
    ],
    subtasks: [
      {
        id: 'FS-L4-001-S1',
        title: 'Triage Concurrency Avalanche & Announce Containment Strategy',
        objective: 'Analyze APM metrics, identify database saturation, and post mitigation plan in war room.',
        instructions: 'Check Grafana metrics in preview, confirm database connection exhaustion, and declare P1 incident response.',
        expectedActions: ['Inspect incoming traffic spike metrics in terminal', 'Post containment strategy in Slack war room'],
        successCriteria: ['Incident acknowledged within 90 seconds', 'Identified database saturation due to unthrottled checkout submissions'],
        evaluationCriteria: { incidentTriage: 50, communication: 50 }
      },
      {
        id: 'FS-L4-001-S2',
        title: 'Deploy Virtual Waiting Room Queue & Client Metering UI',
        objective: 'Intercept checkout submissions in Redis queue, return QueuePosition token, and render client waiting room.',
        instructions: 'Update checkoutRouter.js to enqueue orders in Redis, update CheckoutModal.jsx to display queue position (e.g. "Your spot in line: #412"), and meter database processing.',
        expectedActions: ['Implement Redis queue waiting room in checkoutRouter.js', 'Return HTTP 202 with queueToken and estimatedWaitSeconds', 'Render QueueStatus modal on frontend with live position polling', 'Verify database CPU drops from 100% to 45%'],
        successCriteria: ['Database CPU stabilizes under 50%', 'Orders process cleanly at regulated rate without timeouts or double-charges'],
        evaluationCriteria: { fullstackCrisisResolution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Drop excess requests vs FIFO queuing with waiting room', 'Client polling interval (2s vs 5s) vs WebSocket queue push'],
    pressureEvents: ['CEO on emergency bridge: "Every second we are down damages our brand. When will customers be able to buy?"'],
    expectedSolution: 'Enqueue requests in Redis FIFO queue; return queue token; frontend polls /queue/status; worker dequeues 50 orders/sec into database.',
    acceptableApproaches: ['Redis-backed Virtual Waiting Room pattern', 'Cloudflare Waiting Room edge throttling'],
    failureConditions: ['Allowing unmetered traffic to crash database again', 'Queue drops customers who have been waiting in line'],
    finalDeliverable: 'waitingRoomService.js and WaitingRoomModal.jsx restoring order processing stability.',
    evaluationCriteria: { crisisManagement: 40, systemStability: 30, testValidation: 30 },
    workplaceContext: 'P1 Flash Sale Concurrency Collapse & Recovery',
    taskType: 'production_incident'
  },

  {
    id: 'FS-L4-002',
    title: 'Account Takeover Vulnerability: Broken Object Level Authorization (BOLA)',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Discord / Account & Security Operations',
    department: 'AppSec & Trust and Safety',
    domain: 'Communications / Account Security & BOLA',
    skills: ['security', 'account_takeover', 'bola_remediation', 'session_revocation'],
    coreCompetencies: ['bola_remediation', 'session_security', 'incident_containment'],
    secondarySkills: ['token_revocation', 'audit_logging'],
    skillTags: ['account_takeover', 'bola', 'idor', 'cve', 'security_crisis'],
    situation: 'A security breach in progress reveals that an attacker is actively changing email addresses on high-profile verified accounts via a vulnerable endpoint: `POST /api/v1/user/update-email`.',
    problem: 'The backend endpoint trusts a client-provided `userId` parameter in the JSON payload instead of extracting the authenticated user identity from the verified session token, allowing arbitrary account takeovers.',
    mission: 'Immediately patch the BOLA vulnerability to bind updates strictly to req.user.id, invalidate all compromised sessions in Redis, send emergency notification emails, and deploy regression security tests.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'git'],
      environment: { runtime: 'Node.js v20 / Express / Redis / PostgreSQL' }
    },
    availableEvidence: [
      'Security incident alert: 18 verified creator accounts had their recovery email changed to attacker@exploit.net within 5 minutes',
      'API payload: { userId: "target-user-99", newEmail: "attacker@exploit.net" } processed successfully by non-admin'
    ],
    subtasks: [
      {
        id: 'FS-L4-002-S1',
        title: 'Triage Exploit Payload & Revoke Compromised Sessions',
        objective: 'Analyze attacker requests in logs, identify vulnerable route, and revoke affected user tokens in Redis.',
        instructions: 'Check terminal security logs, locate BOLA flaw in userController.js, and execute token revocation command for affected accounts.',
        expectedActions: ['Inspect attacker payload in terminal logs', 'Execute Redis session purge for all compromised account IDs', 'Lock affected accounts for manual verification'],
        successCriteria: ['Attacker locked out from compromised accounts within 2 minutes', 'BOLA vulnerability mechanics fully identified'],
        evaluationCriteria: { incidentTriage: 50, containmentSpeed: 50 }
      },
      {
        id: 'FS-L4-002-S2',
        title: 'Enforce Session Binding & Re-Authentication Verification',
        objective: 'Remove userId from request body, bind updates strictly to req.user.id, and require current password.',
        instructions: 'Refactor updateEmail in userController.js: require current password check, use req.user.id from verified session, and run security test suite.',
        expectedActions: ['Strip userId parameter from route schema', 'Enforce req.user.id session binding', 'Require current password verification before email changes', 'Deploy security regression tests'],
        successCriteria: ['Vulnerability completely eliminated; impossible to modify another user\'s email', 'Security test suite verifies 100% rejection of unauthorized updates'],
        evaluationCriteria: { securityHardening: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Require password re-entry vs require email verification link to old address before change', 'Global session purge vs targeted user token purge'],
    pressureEvents: ['Head of Trust & Safety: High-profile celebrity accounts currently targeted; fix must be live in 15 minutes'],
    expectedSolution: 'Remove userId from req.body; verify bcrypt.compare(password, user.passwordHash); execute UPDATE users SET email = $1 WHERE id = req.user.id.',
    acceptableApproaches: ['Strict session identity binding with password verification', 'Two-step confirmation email to old address before applying change'],
    failureConditions: ['Allowing client to pass target userId in URL or body', 'Failing to revoke active session tokens of the attacker'],
    finalDeliverable: 'Hardened userController.js with verified session binding and zero BOLA vulnerability.',
    evaluationCriteria: { accountSecurity: 40, crisisRemediation: 30, testValidation: 30 },
    workplaceContext: 'Critical Application Security Account Takeover Emergency',
    taskType: 'security'
  },

  {
    id: 'FS-L4-003',
    title: 'Global CDN Cache Poisoning & Stale Dynamic Data Outage',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'The New York Times / Digital News Delivery',
    department: 'Edge Delivery & Platform Operations',
    domain: 'Publishing / CDN Cache Invalidation',
    skills: ['cdn_caching', 'cache_poisoning', 'cloudflare_workers', 'http_headers'],
    coreCompetencies: ['cache_poisoning_defense', 'cdn_invalidation', 'cache_key_architecture'],
    secondarySkills: ['x_forwarded_host', 'varnish'],
    skillTags: ['cache_poisoning', 'cdn', 'cloudflare', 'http_headers', 'outage'],
    situation: 'Breaking election results on the homepage are frozen with 3-hour-old stale data for 10 million readers worldwide, while some users see another user\'s private account dashboard on the homepage.',
    problem: 'An unkeyed HTTP header (`X-Forwarded-Host` / `X-Original-URL`) poisoned Cloudflare CDN edge caches, and the backend incorrectly emitted `Cache-Control: public, s-maxage=3600` on personalized user routes.',
    mission: 'Execute immediate global CDN cache purge, remove unkeyed header reflections from backend, enforce strict `Cache-Control: private, no-store` on user-specific endpoints, and restore live election feed.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'browser'],
      environment: { runtime: 'Cloudflare CDN / Node.js v20 / Express' }
    },
    availableEvidence: [
      'Edge log: GET / cached by Cloudflare with Cache-Control: public, max-age=14400',
      'Privacy incident: User A loaded homepage and saw User B\'s name and reading history'
    ],
    subtasks: [
      {
        id: 'FS-L4-003-S1',
        title: 'Triage Cache Poisoning Headers & Issue Global Edge Purge',
        objective: 'Inspect HTTP response headers via cURL, identify rogue public cache headers, and trigger CDN purge.',
        instructions: 'Run `curl -I https://demo-news.com/` in terminal, locate s-maxage header, and execute Cloudflare purge API call.',
        expectedActions: ['Inspect CDN cache headers in terminal', 'Identify Cache-Control: public on personalized route', 'Execute global cache purge via terminal API call', 'Notify war room in Slack'],
        successCriteria: ['Global edge cache purged within 60 seconds', 'Stale election data immediately flushed from edge nodes'],
        evaluationCriteria: { triageSpeed: 50, edgeAction: 50 }
      },
      {
        id: 'FS-L4-003-S2',
        title: 'Harden Cache-Control Policies & Sanitize Edge Cache Keys',
        objective: 'Enforce Cache-Control: private, no-cache on authenticated routes and sanitize unkeyed headers.',
        instructions: 'Update headerMiddleware.js to strip unkeyed header reflections, enforce strict cache policies based on auth cookies, and verify in preview.',
        expectedActions: ['Update response header middleware in Express', 'Ensure authenticated responses always include Cache-Control: private, no-store', 'Strip X-Forwarded-Host from template rendering', 'Verify live election ticker updates every 10s'],
        successCriteria: ['Zero private user data cached at CDN edge', 'Live dynamic election data updates in real-time across all regions'],
        evaluationCriteria: { headerHardening: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Complete edge cache purge (purge everything) vs targeted URL purge', 'Cache-Tag / Surrogate-Key invalidation architecture'],
    pressureEvents: ['Editor-in-Chief: "10 million readers are looking at wrong election results. Fix the homepage immediately."'],
    expectedSolution: 'Execute Cloudflare API purge; in Express: if (req.cookies.token) res.setHeader("Cache-Control", "private, no-cache, no-store"); else res.setHeader("Cache-Control", "public, s-maxage=10").',
    acceptableApproaches: ['Dynamic Cache-Control middleware based on authentication presence', 'Cloudflare Cache-Tag based granular edge invalidation'],
    failureConditions: ['Cache-Control remains public for logged-in users', 'Purging cache without fixing header causes immediate re-poisoning'],
    finalDeliverable: 'headerMiddleware.js and cdnPurge.sh restoring real-time data integrity and privacy.',
    evaluationCriteria: { cdnArchitecture: 40, dataPrivacy: 30, testValidation: 30 },
    workplaceContext: 'Global CDN Cache Poisoning & Election Night Recovery',
    taskType: 'cdn_security'
  },

  {
    id: 'FS-L4-004',
    title: 'WebSocket Connection Flood Taking Down Core API Clusters',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Discord / Voice & Real-Time Gateway',
    department: 'Real-Time Edge Infrastructure',
    domain: 'Communications / Real-Time Gateway Scaling',
    skills: ['websocket', 'dos_mitigation', 'connection_limits', 'incident_response'],
    coreCompetencies: ['connection_flood_defense', 'socket_rate_limiting', 'cluster_stabilization'],
    secondarySkills: ['iptables', 'tcp_tuning'],
    skillTags: ['websocket', 'ddos', 'connection_flood', 'gateway', 'outage'],
    situation: 'A rogue script distributed across 5,000 IP addresses opens 180,000 WebSocket connections without sending data, exhausting Linux file descriptors and crashing the core API cluster.',
    problem: 'The WebSocket server lacks per-IP connection limits, handshake timeouts, and authentication gating during the HTTP upgrade phase, allowing attackers to exhaust socket file descriptors in seconds.',
    mission: 'Step in during the active connection flood: drop unauthenticated connections during the HTTP upgrade phase, enforce max 10 sockets per IP, add a 5-second handshake timeout, and stabilize the cluster.',
    workspace: {
      tools: ['slack', 'editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Linux / Socket.io' }
    },
    availableEvidence: [
      'Linux kernel alert: Error: EMFILE: too many open files (Process reached 65,535 file descriptor ceiling)',
      'Gateway metric: 182,000 active TCP connections, but only 400 messages/sec transmitted'
    ],
    subtasks: [
      {
        id: 'FS-L4-004-S1',
        title: 'Triage File Descriptor Exhaustion & Isolate Zombie Sockets',
        objective: 'Check open file descriptors via lsof/netstat in terminal and identify connection flood IP clusters.',
        instructions: 'Run `netstat -an | grep ESTABLISHED | wc -l` in terminal and identify top offending IP subnets.',
        expectedActions: ['Inspect active connection count in terminal', 'Identify EMFILE file descriptor ceiling crash', 'Locate top IP addresses opening 500+ connections each'],
        successCriteria: ['Identified file descriptor exhaustion root cause', 'Isolated top offending zombie socket IPs'],
        evaluationCriteria: { networkForensics: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L4-004-S2',
        title: 'Deploy Upgrade Authentication Gate & Handshake Timeouts',
        objective: 'Reject unauthenticated HTTP 101 upgrades, enforce max 10 sockets per IP, and kill idle handshakes in 5s.',
        instructions: 'Update socketGateway.js to verify JWT during server.on("upgrade"), enforce connection limits via Redis counter, and restart gateway.',
        expectedActions: ['Implement pre-upgrade token verification in server.on("upgrade")', 'Enforce max 10 connections per IP using in-memory / Redis map', 'Add 5-second handshake timeout closing inactive sockets', 'Verify open socket count drops to healthy baseline'],
        successCriteria: ['Zombie connection flood dropped immediately', 'Legitimate authenticated users connect cleanly in < 50ms'],
        evaluationCriteria: { gatewayHardening: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Drop connections at Linux iptables level vs Node.js HTTP upgrade event', 'IP-based connection limits vs authenticated user ID limits'],
    pressureEvents: ['Infrastructure Director: Entire real-time chat platform is dark until socket flood is mitigated'],
    expectedSolution: 'Intercept server.on("upgrade", (req, socket, head) => ...); verify token; check ipConnectionCount.get(ip) < 10; set 5s handshake timeout; destroy if invalid.',
    acceptableApproaches: ['HTTP upgrade authentication verification with connection limits', 'Edge reverse proxy (Nginx / HAProxy) rate-limiting WebSocket upgrades'],
    failureConditions: ['Allowing unauthenticated sockets to complete WebSocket handshake', 'Legitimate users with multiple browser tabs blocked by too-low connection limit'],
    finalDeliverable: 'socketGateway.js with hardened upgrade authentication and file descriptor protections.',
    evaluationCriteria: { gatewaySecurity: 40, connectionManagement: 30, testValidation: 30 },
    workplaceContext: 'High-Concurrence WebSocket DDoS Defense',
    taskType: 'gateway_security'
  },

  {
    id: 'FS-L4-005',
    title: 'Data Corruption in Background Sync Worker Post-Release',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Notion / Core Database & Sync Engine',
    department: 'Data Reliability & Disaster Recovery',
    domain: 'Productivity / Data Integrity & Backfill',
    skills: ['data_integrity', 'database_backfill', 'disaster_recovery', 'postgresql'],
    coreCompetencies: ['data_corruption_triage', 'database_backfill', 'point_in_time_recovery'],
    secondarySkills: ['sql_diff', 'atomic_updates'],
    skillTags: ['data_corruption', 'backfill', 'disaster_recovery', 'postgresql', 'crisis'],
    situation: 'A buggy background sync worker deployed 40 minutes ago transposed user column data: `user.first_name` was written into `user.last_name` and vice versa for 12,000 active users.',
    problem: 'Worker function had inverted destructured arguments `({ lastName, firstName }) = payload`, corrupting production user profile records across 12,000 accounts.',
    mission: 'Immediately pause the buggy sync worker, query the database audit log / WAL history to extract correct pre-corruption names, deploy an atomic backfill remediation script, and verify data integrity.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'git'],
      environment: { runtime: 'Node.js v20 / PostgreSQL / Disaster Recovery CLI' }
    },
    availableEvidence: [
      'Customer support alert: 850 users reported their name on invoices is backwards (e.g. "Smith John")',
      'Audit log: 12,410 UPDATE queries executed by worker_sync_v2.4 in the last 40 minutes'
    ],
    subtasks: [
      {
        id: 'FS-L4-005-S1',
        title: 'Stop Corrupting Worker & Quantify Blast Radius',
        objective: 'Halt the background worker deployment and query the database audit table to identify all corrupted user IDs.',
        instructions: 'Scale worker deployment to 0 in terminal and run query on `audit_logs` to count affected records.',
        expectedActions: ['Scale buggy worker deployment to 0 in terminal', 'Query audit_logs for worker updates in last 45 minutes', 'Isolate exact list of 12,410 affected user IDs'],
        successCriteria: ['Buggy worker halted within 60 seconds', 'Exact blast radius quantified with list of affected IDs'],
        evaluationCriteria: { emergencyAction: 50, blastRadiusAudit: 50 }
      },
      {
        id: 'FS-L4-005-S2',
        title: 'Deploy Inversion Bug Fix & Execute Atomic Backfill Script',
        objective: 'Fix argument destructuring in worker code, write transactional backfill script from audit log, and restore data.',
        instructions: 'Update syncWorker.js, write restoreNames.sql using audit_logs old_data values, execute in transaction, and verify names restored.',
        expectedActions: ['Fix destructured argument inversion bug in syncWorker.js', 'Author restoreNames.sql using audit_log previous values', 'Execute backfill inside BEGIN / COMMIT transaction', 'Verify sample of 50 users restored accurately'],
        successCriteria: ['100% of 12,410 corrupted user names restored to original values', 'Bug fixed in worker code before restarting deployment'],
        evaluationCriteria: { dataRemediation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Restoring from audit log table vs executing Point-in-Time Recovery (PITR) on database', 'Notifying affected users vs transparent silent fix'],
    pressureEvents: ['Head of Compliance: Data integrity violation must be fixed before business hours in Europe'],
    expectedSolution: 'Stop worker; UPDATE users u SET first_name = a.old_value->>\'first_name\', last_name = a.old_value->>\'last_name\' FROM audit_logs a WHERE u.id = a.user_id AND a.created_at > NOW() - INTERVAL \'1 hour\'; commit.',
    acceptableApproaches: ['Targeted SQL backfill from audit log history', 'Scripted transactional restoration with verification dry-run'],
    failureConditions: ['Swapping names blindly on users who were already correct', 'Restarting worker before fixing inversion bug in code'],
    finalDeliverable: 'Bugfix in syncWorker.js and verified transactional restoreNames.sql script.',
    evaluationCriteria: { dataIntegrityRestoration: 40, safetyVerification: 30, testValidation: 30 },
    workplaceContext: 'Production Data Corruption Remediation & Disaster Recovery',
    taskType: 'disaster_recovery'
  },

  {
    id: 'FS-L4-006',
    title: 'Third-Party Auth Provider (Google/GitHub OAuth) Outage Fallback',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Linear / Developer Issue Tracker',
    department: 'Authentication & Identity Platforms',
    domain: 'Developer SaaS / OAuth Disaster Recovery',
    skills: ['oauth2', 'auth_fallback', 'magic_links', 'fullstack_architecture'],
    coreCompetencies: ['auth_outage_mitigation', 'emergency_fallback_channels', 'user_session_preservation'],
    secondarySkills: ['email_magic_links', 'incident_communication'],
    skillTags: ['oauth_outage', 'google_auth_down', 'magic_link', 'auth_fallback', 'crisis'],
    situation: 'Google Identity services suffer a global outage returning 500 errors. 85% of our users sign in via "Log in with Google" and are completely locked out of the application on Monday morning.',
    problem: 'The application relies solely on Google OAuth without an emergency authentication fallback (e.g. Magic Link email authentication or password fallback), stranding 40,000 active teams.',
    mission: 'Deploy an emergency Magic Link email authentication fallback channel: allow Google-authenticated users to request a one-time cryptographic sign-in link sent to their verified email, bypassing Google OAuth.',
    workspace: {
      tools: ['slack', 'editor', 'browser', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / React 18 / Email Gateway' }
    },
    availableEvidence: [
      'Google Cloud Status: Google Identity Services / OAuth 2.0 Global Outage (500 Internal Error)',
      'Customer support: 1,800 tickets: "Our entire engineering department cannot access Linear this morning"'
    ],
    subtasks: [
      {
        id: 'FS-L4-006-S1',
        title: 'Verify Google OAuth Outage & Declare Emergency Auth Plan',
        objective: 'Confirm Google OAuth 500 error in terminal, inspect login screen, and post emergency plan in war room.',
        instructions: 'Trigger Google sign-in in browser preview, capture Google 500 error, and notify team of Magic Link fallback deployment.',
        expectedActions: ['Simulate failed Google OAuth callback in preview', 'Declare emergency authentication deployment in Slack #war-room'],
        successCriteria: ['Confirmed Google OAuth failure affects 85% of users', 'Formulated cryptographic Magic Link emergency path'],
        evaluationCriteria: { triageSpeed: 50, communication: 50 }
      },
      {
        id: 'FS-L4-006-S2',
        title: 'Deploy Magic Link Backend Endpoint & Emergency Sign-In UI',
        objective: 'Create POST /api/v1/auth/magic-link generating 15-minute signed token, send email, and render Magic Link input.',
        instructions: 'Update authController.js with magic link generator, add "Email Me a Login Link" button on LoginPage.jsx, and verify sign-in.',
        expectedActions: ['Implement emergency magic link generation with crypto.randomBytes', 'Send email with one-time verification URL /auth/verify?token=...', 'Add Magic Link fallback option to LoginPage.jsx', 'Verify user successfully logs in via magic link in preview'],
        successCriteria: ['Users locked out by Google outage successfully log in via Magic Link', 'Zero security degradation; one-time token expires in 15 minutes'],
        evaluationCriteria: { emergencyArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Magic Link vs temporary password reset', 'Token expiry window (15 minutes vs 1 hour)'],
    pressureEvents: ['CEO on call: "Every SaaS customer depends on us for sprint planning. We must restore access within 30 minutes."'],
    expectedSolution: 'Create emergency route: find user by email; generate random token with 15m expiration in Redis; send email; on verify, issue standard session JWT.',
    acceptableApproaches: ['Cryptographic Magic Link email fallback', 'One-Time Password (OTP) verification email'],
    failureConditions: ['Magic link tokens reusable multiple times', 'Allowing unverified emails to claim existing Google accounts'],
    finalDeliverable: 'magicLinkAuth.js and EmergencyLoginButton.jsx restoring login accessibility during third-party outage.',
    evaluationCriteria: { crisisArchitecture: 40, securityIntegrity: 30, testValidation: 30 },
    workplaceContext: 'Third-Party Identity Provider Outage Disaster Recovery',
    taskType: 'identity_resilience'
  },

  {
    id: 'FS-L4-007',
    title: 'Production Memory Leak in Next.js Server-Side Rendering Node',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Target / E-Commerce Storefront',
    department: 'Web Architecture & Next.js Platforms',
    domain: 'Retail E-Commerce / Server-Side Rendering',
    skills: ['memory_leak', 'nextjs_ssr', 'nodejs_heap', 'incident_response'],
    coreCompetencies: ['ssr_memory_profiling', 'v8_heap_debugging', 'server_stability'],
    secondarySkills: ['weakmap', 'garbage_collection'],
    skillTags: ['nextjs', 'ssr', 'memory_leak', 'oom_killed', 'production_incident'],
    situation: 'During holiday shopping traffic, Next.js SSR server pods experience severe memory bloat: memory usage climbs to 1.5GB within 15 minutes of startup, crashing all 16 frontend pods sequentially (Rolling Crash Wave).',
    problem: 'A custom server-side translation helper caches formatted string dictionaries in a module-scoped global object `const i18nCache = {}` that grows indefinitely with every incoming request headers locale parameter.',
    mission: 'Profile the running Next.js SSR Node process using heap snapshots, identify the global cache retaining path, refactor to request-scoped cache or WeakMap, and stabilize server memory at < 200MB.',
    workspace: {
      tools: ['slack', 'editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Next.js 14 / V8 Profiler' }
    },
    availableEvidence: [
      'Kubernetes crash log: 16/16 nextjs-storefront pods restarted 42 times today with ExitCode 137 (OOM)',
      'V8 heap inspection: Object (i18nCache) retains 1.2GB of memory across 400,000 unique keys'
    ],
    subtasks: [
      {
        id: 'FS-L4-007-S1',
        title: 'Profile Next.js SSR Node Heap & Identify Leaking Cache',
        objective: 'Trigger simulated traffic against SSR server and capture heap snapshot diff in terminal.',
        instructions: 'Run `npm run profile:ssr` in terminal and inspect object allocation tree in generated profile.',
        expectedActions: ['Run SSR load simulation in terminal', 'Capture heap snapshot comparison', 'Identify global i18nCache holding 1.2GB of detached translation objects'],
        successCriteria: ['Pinpointed module-level global cache in i18nServer.js', 'Identified linear memory growth per incoming request'],
        evaluationCriteria: { heapProfiling: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L4-007-S2',
        title: 'Refactor to Request-Scoped Cache & Stabilize SSR Pods',
        objective: 'Move i18n cache into request context (AsyncLocalStorage) or bounded LRU cache with max 500 items.',
        instructions: 'Update i18nServer.js to use lru-cache with max: 500, deploy hotfix, and run 10-minute load test to verify flat memory footprint.',
        expectedActions: ['Replace unbounded global object with bounded LRU cache', 'Limit cache keys strictly to sanitized locale codes', 'Verify pod memory stays completely flat at < 180MB under sustained load', 'Commit production hotfix'],
        successCriteria: ['Memory usage stabilizes at < 180MB indefinitely', 'Zero container crashes or restarts during sustained holiday traffic test'],
        evaluationCriteria: { memoryRemediation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['LRU Cache in memory vs pre-compiling all static translation dictionaries at build time', 'Restarting pods on timer vs fixing underlying root cause'],
    pressureEvents: ['Operations VP: Site crashing every 15 minutes during prime shopping hours; fix must be live within the hour'],
    expectedSolution: 'Remove global mutable object; use lru-cache with max: 100 entries; or pre-load fixed locale translations at startup.',
    acceptableApproaches: ['Bounded LRU cache for server-side translation helpers', 'Static build-time translation dictionary pre-compilation'],
    failureConditions: ['Memory continues climbing past 1GB under load', 'Translations fail to load causing raw translation keys to display'],
    finalDeliverable: 'i18nServer.js with bounded memory management and stabilized Next.js SSR pod deployment.',
    evaluationCriteria: { ssrStability: 40, memoryProfilingProficiency: 30, testValidation: 30 },
    workplaceContext: 'High-Volume Next.js Server-Side Rendering Stability',
    taskType: 'ssr_performance'
  },

  {
    id: 'FS-L4-008',
    title: 'Payment Webhook Race Condition: Duplicate Order Fulfillment',
    role: 'fullstack',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Shopify / Merchant Fulfillment Engine',
    department: 'Order Processing & Warehouse Logistics',
    domain: 'E-Commerce / Concurrency & Warehouse Logistics',
    skills: ['concurrency', 'distributed_locking', 'idempotency', 'postgresql'],
    coreCompetencies: ['race_condition_resolution', 'distributed_locking', 'warehouse_fulfillment_safety'],
    secondarySkills: ['pessimistic_locking', 'redis_mutex'],
    skillTags: ['race_condition', 'duplicate_fulfillment', 'payment_webhook', 'distributed_lock', 'fintech'],
    situation: 'When payment providers send rapid concurrent webhook retries (`payment_intent.succeeded`) within 50ms of each other, warehouse automated systems ship duplicate physical merchandise to the customer.',
    problem: 'The webhook handler checks `if (order.status === "paid") return;` before calling `fulfillOrder()`, but both concurrent requests execute the read before either writes the new status (Check-Then-Act Race Condition).',
    mission: 'Implement an atomic distributed lock on the order ID via Redis (or PostgreSQL `SELECT FOR UPDATE`), ensure strict idempotency, and eliminate duplicate warehouse fulfillment dispatches.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'git'],
      environment: { runtime: 'Node.js v20 / PostgreSQL / Redis / Express' }
    },
    availableEvidence: [
      'Warehouse audit: 340 customers received two pairs of shoes while only paying for one ($68,000 lost inventory)',
      'Server log: Two identical payment_intent.succeeded webhooks arrived at 14:02:11.042 and 14:02:11.078, both executing fulfillOrder()'
    ],
    subtasks: [
      {
        id: 'FS-L4-008-S1',
        title: 'Reproduce Check-Then-Act Race Condition with Concurrent Webhooks',
        objective: 'Send two simultaneous webhook requests for the same order in test environment.',
        instructions: 'Run `npm test test/webhook-race.test.js` to observe two duplicate fulfillment events dispatched.',
        expectedActions: ['Run concurrent webhook race test in terminal', 'Observe both threads passing the `status !== "paid"` check simultaneously'],
        successCriteria: ['Reproduced duplicate fulfillment dispatch', 'Identified Check-Then-Act race condition in fulfillment pipeline'],
        evaluationCriteria: { raceConditionDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'FS-L4-008-S2',
        title: 'Implement Distributed Lock & Atomic Database Status Check',
        objective: 'Acquire Redis lock order_lock:${orderId} or use `SELECT * FROM orders WHERE id = $1 FOR UPDATE`.',
        instructions: 'Update fulfillmentService.js to acquire atomic lock, verify and update status inside transaction, and verify only 1 fulfillment executes.',
        expectedActions: ['Wrap fulfillment check in atomic database transaction with SELECT FOR UPDATE', 'Or acquire Redis mutex lock before checking status', 'Commit status = "paid" before dispatching warehouse event', 'Rerun concurrent test suite'],
        successCriteria: ['Exactly 1 fulfillment dispatched regardless of concurrent webhook retries', 'Subsequent webhooks detect paid status and exit safely'],
        evaluationCriteria: { concurrencyProtection: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Database row-level lock (SELECT FOR UPDATE) vs Redis distributed mutex lock', 'Optimistic locking with version column vs pessimistic locking'],
    pressureEvents: ['COO Directive: Warehouse shipping halted until duplicate dispatch bug is 100% resolved'],
    expectedSolution: 'Wrap fulfillment in transaction: BEGIN; SELECT status FROM orders WHERE id = $1 FOR UPDATE; if status != "pending" ROLLBACK; UPDATE orders SET status = "paid"; COMMIT; fulfillOrder().',
    acceptableApproaches: ['PostgreSQL row-level locking with SELECT FOR UPDATE in ACID transaction', 'Redis distributed lock with SET order_lock NX EX 10'],
    failureConditions: ['Dispatching fulfillment before database status transaction commits', 'Holding lock for minutes causing webhook timeout from payment provider'],
    finalDeliverable: 'fulfillmentService.js with atomic concurrency protection and zero duplicate shipments.',
    evaluationCriteria: { concurrencyMastery: 40, financialIntegrity: 30, testValidation: 30 },
    workplaceContext: 'Mission-Critical E-Commerce Concurrency & Logistics',
    taskType: 'concurrency'
  }
];
