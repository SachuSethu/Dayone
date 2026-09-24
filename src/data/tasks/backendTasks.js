// src/data/tasks/backendTasks.js
// 32 Backend Developer Main Tasks (4 Levels × 8 Tasks = 32 Tasks, 64 Subtasks)

export const BACKEND_TASKS = [
  // ==========================================
  // LEVEL 1: FOUNDATION (8 TASKS, 16 SUBTASKS)
  // ==========================================
  {
    id: 'BE-L1-001',
    title: 'REST API CRUD Payload Validation & Error Schema',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Twilio / Messaging API Services',
    department: 'Developer APIs & Ingestion',
    domain: 'Cloud Communications / API Standards',
    skills: ['rest_apis', 'input_validation', 'error_handling', 'nodejs'],
    coreCompetencies: ['input_validation', 'api_design', 'error_handling'],
    secondarySkills: ['zod_schema', 'http_spec'],
    skillTags: ['rest_api', 'validation', 'zod', 'http_422', 'nodejs'],
    situation: 'Third-party developers report that sending malformed JSON to the SMS broadcast endpoint returns an opaque 500 Internal Server Error with internal stack traces instead of helpful 422 Unprocessable Entity error messages.',
    problem: 'API routes parse req.body directly without a validation schema, causing unhandled runtime exceptions when required fields (to, from, body) are missing or of incorrect types.',
    mission: 'Implement strict Zod/Joi schema validation middleware on the endpoint, return RFC 7807 compliant Problem Details JSON (HTTP 422) for client errors, and write unit tests.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / Jest' }
    },
    availableEvidence: [
      'Customer support log: Developer receives 500 error when sending empty phone number',
      'Security audit: Server stack traces leaked in HTTP response body'
    ],
    subtasks: [
      {
        id: 'BE-L1-001-S1',
        title: 'Inspect Ingestion Route & Reproduce 500 Crash',
        objective: 'Send invalid payload to /api/v1/messages and verify unhandled exception stack trace.',
        instructions: 'Run `npm test test/messages.test.js` in terminal to observe the uncaught TypeError on missing property access.',
        expectedActions: ['Run test suite in terminal', 'Identify missing request body validation guard'],
        successCriteria: ['Confirmed 500 error on invalid request payload', 'Identified leaked stack trace in response'],
        evaluationCriteria: { diagnosis: 50, testObservation: 50 }
      },
      {
        id: 'BE-L1-001-S2',
        title: 'Implement Zod Validation Middleware & 422 Response',
        objective: 'Write validateSchema middleware that validates req.body and formats clean field-level error arrays.',
        instructions: 'Create messageSchema.js with Zod, bind to POST /api/v1/messages, format errors as RFC 7807 JSON, and re-run tests.',
        expectedActions: ['Define Zod schema for message payload', 'Add validation middleware returning HTTP 422', 'Verify tests pass 100% green'],
        successCriteria: ['Invalid payloads rejected with HTTP 422 and field-specific errors', 'Zero unhandled exceptions or 500s'],
        evaluationCriteria: { schemaDesign: 50, errorFormatting: 50 }
      }
    ],
    decisionPoints: ['Zod vs Joi vs express-validator', 'RFC 7807 Problem Details vs custom error JSON'],
    pressureEvents: ['API Gateway team reminder: All public endpoints must conform to API style guide by end of sprint'],
    expectedSolution: 'Create Zod schema with e164 phone regex, return res.status(422).json({ error: "Validation Failed", details }) on failure.',
    acceptableApproaches: ['Zod validation middleware', 'Joi validation middleware'],
    failureConditions: ['Route still returns 500 on unexpected keys', 'Valid E.164 phone numbers rejected'],
    finalDeliverable: 'validationMiddleware.js and messageSchema.js with comprehensive test coverage.',
    evaluationCriteria: { validationStrictness: 40, apiConsistency: 30, testValidation: 30 },
    workplaceContext: 'Developer API Input Sanitization',
    taskType: 'api_development'
  },

  {
    id: 'BE-L1-002',
    title: 'SQL N+1 Query Degradation in Social Feed Endpoint',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'LinkedIn / Social Feed Infrastructure',
    department: 'Feed Platform & Data Access',
    domain: 'Social Networking / Database Optimization',
    skills: ['postgresql', 'sql_optimization', 'orm_performance', 'nodejs'],
    coreCompetencies: ['sql_optimization', 'database_querying', 'backend_performance'],
    secondarySkills: ['eager_loading', 'prisma_sequelize'],
    skillTags: ['sql', 'n_plus_one', 'database', 'joins', 'performance'],
    situation: 'The user profile activity endpoint latency increased from 45ms to 1,800ms as user connections grew, causing high CPU alerts on the RDS PostgreSQL cluster.',
    problem: 'The ORM endpoint fetches 50 posts, and then loops over each post in JavaScript to execute `SELECT * FROM users WHERE id = post.author_id` and `SELECT * FROM comments WHERE post_id = post.id`, firing 101 separate SQL queries per request (N+1 query problem).',
    mission: 'Refactor the database query to use eager loading (JOINs or WHERE IN batching) to retrieve all posts, authors, and comments in a single unified SQL query.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL / Prisma ORM' }
    },
    availableEvidence: [
      'PostgreSQL query log: 101 queries executed during a single GET /api/v1/feed request',
      'APM latency alert: p95 latency 1,820ms on database tier'
    ],
    subtasks: [
      {
        id: 'BE-L1-002-S1',
        title: 'Analyze Query Log & Measure Query Multiplication',
        objective: 'Inspect database logs during feed fetch and calculate query amplification factor.',
        instructions: 'Run `npm run test:queries` in terminal and observe the query log stream.',
        expectedActions: ['Execute query benchmark in terminal', 'Identify looping SELECT queries inside post map()'],
        successCriteria: ['Counted 101 distinct queries for a 50-item feed', 'Isolated ORM lazy-loading loop'],
        evaluationCriteria: { queryAudit: 50, profilingSpeed: 50 }
      },
      {
        id: 'BE-L1-002-S2',
        title: 'Implement Eager Loading with JOINs & Batching',
        objective: 'Refactor query to use include: { author: true, comments: true } or single SQL JOIN.',
        instructions: 'Update feedService.js to perform eager fetching in a single query, run tests, and verify query count drops to 1.',
        expectedActions: ['Modify feedService.js query declaration', 'Eliminate loop-based queries', 'Verify latency drops below 50ms and query count = 1'],
        successCriteria: ['Query count reduced from 101 to 1', 'Latency reduced from 1,820ms to 38ms'],
        evaluationCriteria: { queryOptimization: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Single SQL JOIN with JSON aggregation vs two batched WHERE IN queries', 'Dataloader pattern vs direct ORM relation include'],
    pressureEvents: ['RDS database CPU alert: Database at 88% capacity during peak morning feed hours'],
    expectedSolution: 'Replace loop-based queries with Prisma include: { author: true, comments: { take: 3 } } or SQL LEFT JOIN.',
    acceptableApproaches: ['ORM eager loading include', 'Raw SQL with LEFT JOIN and JSON_AGG'],
    failureConditions: ['Cartesian product duplicates comment rows', 'Queries still execute sequentially in a loop'],
    finalDeliverable: 'Optimized feedService.js executing feed queries in a single consolidated SQL statement.',
    evaluationCriteria: { queryEfficiency: 40, databaseHygiene: 30, testValidation: 30 },
    workplaceContext: 'High-Throughput Relational Feed Optimization',
    taskType: 'database_optimization'
  },

  {
    id: 'BE-L1-003',
    title: 'API Bearer Token Authentication & Route Guards',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Auth0 / Identity API Services',
    department: 'Authentication & Security Middleware',
    domain: 'Identity & Access Management / Security',
    skills: ['auth_middleware', 'jwt', 'security', 'nodejs'],
    coreCompetencies: ['authentication', 'middleware_design', 'api_security'],
    secondarySkills: ['crypto', 'bearer_tokens'],
    skillTags: ['jwt', 'authentication', 'middleware', 'bearer_token', 'security'],
    situation: 'Internal security penetration testers discovered that sensitive user profile update endpoints (/api/v1/users/:id/email) can be accessed without a valid Authorization header.',
    problem: 'The authentication middleware was applied globally to the public router but omitted on newly added account settings sub-routers, allowing unauthenticated requests.',
    mission: 'Create a reusable authenticateBearerToken middleware, verify signature and expiration using jsonwebtoken, and apply it to all protected API routes.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / JWT' }
    },
    availableEvidence: [
      'Penetration test report: GET /api/v1/users/42/profile returns HTTP 200 without Authorization header',
      'CVSS Score: 7.5 (High - Missing Authentication on Sensitive Function)'
    ],
    subtasks: [
      {
        id: 'BE-L1-003-S1',
        title: 'Verify Unprotected Route Vulnerability with Test Requests',
        objective: 'Execute curl / supertest requests against user endpoints without Authorization header.',
        instructions: 'Run `npm test test/auth.test.js` and verify which routes fail to return HTTP 401 Unauthorized.',
        expectedActions: ['Run auth test suite in terminal', 'Map unprotected sub-router endpoints'],
        successCriteria: ['Identified 3 unprotected endpoints returning 200 without token', 'Mapped missing middleware attachment'],
        evaluationCriteria: { securityAudit: 50, accuracy: 50 }
      },
      {
        id: 'BE-L1-003-S2',
        title: 'Implement Token Verification Middleware & Route Guarding',
        objective: 'Write authMiddleware.js extracting Bearer token, verifying secret, and attaching req.user.',
        instructions: 'Extract header Authorization: Bearer <token>, verify with jwt.verify, return 401 if missing/invalid, and protect routes.',
        expectedActions: ['Implement authMiddleware with jwt.verify', 'Handle TokenExpiredError and JsonWebTokenError', 'Attach middleware to protected routers', 'Rerun test suite'],
        successCriteria: ['All protected routes return 401 on missing or expired tokens', 'Valid tokens decode and populate req.user cleanly'],
        evaluationCriteria: { securityImplementation: 50, testVerification: 50 }
      }
    ],
    decisionPoints: ['Strict 401 Unauthorized vs 403 Forbidden on expired tokens', 'Passing decoded user in req.user vs context object'],
    pressureEvents: ['Audit compliance check in 45 minutes: All endpoints must enforce token verification'],
    expectedSolution: 'Check req.headers.authorization, parse Bearer token, verify with secret key, attach req.user = decoded; else return 401.',
    acceptableApproaches: ['Custom Express middleware with jsonwebtoken', 'Passport.js HTTP Bearer strategy'],
    failureConditions: ['Tokens with invalid signatures accepted as valid', 'Middleware crashes on malformed Authorization headers'],
    finalDeliverable: 'authMiddleware.js with robust token verification and comprehensive route protection.',
    evaluationCriteria: { securityCorrectness: 40, codeQuality: 30, testValidation: 30 },
    workplaceContext: 'Enterprise API Authentication Hardening',
    taskType: 'security'
  },

  {
    id: 'BE-L1-004',
    title: 'File Upload Multipart Parser & MIME Type Spoofing Defense',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Dropbox / File Ingestion Platform',
    department: 'Storage Engine & Ingestion Security',
    domain: 'Cloud Storage / Secure File Handling',
    skills: ['file_handling', 'security', 'input_validation', 'nodejs'],
    coreCompetencies: ['file_upload_security', 'multipart_handling', 'buffer_inspection'],
    secondarySkills: ['mime_sniffing', 'multer'],
    skillTags: ['file_upload', 'multer', 'mime_type', 'magic_bytes', 'security'],
    situation: 'A security bug bounty hunter demonstrated uploading an executable .sh script disguised as a profile picture (avatar.jpg) by modifying the Content-Type header.',
    problem: 'The upload handler trusts the client-provided Content-Type header and file extension without inspecting the file magic bytes buffer, allowing arbitrary file uploads.',
    mission: 'Implement file magic bytes buffer sniffing (using file-type), enforce a 5MB size ceiling, and restrict storage to authenticated isolated paths.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Multer / file-type' }
    },
    availableEvidence: [
      'Security incident: Malicious file uploaded to /uploads/avatar.jpg containing bash reverse shell',
      'Multer config: upload.single("file") trusts req.file.mimetype without buffer check'
    ],
    subtasks: [
      {
        id: 'BE-L1-004-S1',
        title: 'Reproduce MIME Spoofing with Disguised Payload',
        objective: 'Send a shell script with Content-Type: image/jpeg and verify server acceptance.',
        instructions: 'Run `npm test test/upload.test.js` in terminal and observe the shell script saved to the uploads directory.',
        expectedActions: ['Run upload test suite in terminal', 'Verify that spoofed image/jpeg bypasses existing extension check'],
        successCriteria: ['Reproduced vulnerability where malicious executable is stored', 'Identified reliance on client header'],
        evaluationCriteria: { reproductionAccuracy: 50, securityInsight: 50 }
      },
      {
        id: 'BE-L1-004-S2',
        title: 'Implement Magic Bytes Validation & File Size Limits',
        objective: 'Inspect file buffer header bytes (JPEG FF D8 FF, PNG 89 50 4E 47) and reject spoofed files.',
        instructions: 'Integrate file-type to verify buffer magic bytes, add limits: { fileSize: 5 * 1024 * 1024 }, and reject mismatches with 400 Bad Request.',
        expectedActions: ['Add magic bytes buffer inspection using fileTypeFromBuffer', 'Enforce 5MB limit in Multer storage', 'Rerun test suite to verify rejection'],
        successCriteria: ['Spoofed executables rejected with 400 Bad Request', 'Legitimate PNG and JPEG images upload successfully'],
        evaluationCriteria: { validationRigor: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['In-memory buffer inspection vs stream-based chunk inspection', 'Reject file vs sanitize and re-encode via Sharp'],
    pressureEvents: ['AppSec Emergency Alert: Block unauthenticated executable uploads immediately'],
    expectedSolution: 'Read first 4100 bytes of buffer with file-type; verify true MIME matches allowed image types; enforce 5MB quota.',
    acceptableApproaches: ['Buffer inspection via file-type package', 'Re-encoding uploaded images with Sharp to strip non-image data'],
    failureConditions: ['Server crashes with out-of-memory when 1GB file is sent', 'Executable files successfully saved to disk'],
    finalDeliverable: 'secureUpload.js enforcing magic byte verification and strict size quotas.',
    evaluationCriteria: { securityHygiene: 40, inputSanitization: 30, testValidation: 30 },
    workplaceContext: 'Secure Multi-Part File Ingestion Pipeline',
    taskType: 'file_security'
  },

  {
    id: 'BE-L1-005',
    title: 'Asynchronous Structured Logging & Request Correlation ID',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Datadog / Log Management Services',
    department: 'Telemetry & Observability Engineering',
    domain: 'Cloud Observability / Structured Logging',
    skills: ['observability', 'logging', 'async_local_storage', 'nodejs'],
    coreCompetencies: ['observability', 'structured_logging', 'traceability'],
    secondarySkills: ['pino_logger', 'x_request_id'],
    skillTags: ['logging', 'correlation_id', 'pino', 'structured_logging', 'observability'],
    situation: 'During production microservice debugging, engineers cannot correlate log statements across requests because developers use unstructured console.log() strings with no request IDs.',
    problem: 'Logs appear as unstructured raw text lines without timestamps, severity levels, or shared correlation IDs, making it impossible to trace a single user session in Datadog/ELK.',
    mission: 'Implement structured JSON logging with Pino/Winston, extract or generate X-Request-ID headers, and propagate correlation IDs across async calls via AsyncLocalStorage.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Express / Pino' }
    },
    availableEvidence: [
      'Production log sample: "Error updating user" printed with no user ID, timestamp, or request context',
      'On-call complaint: 3 hours wasted trying to match client error report to backend log'
    ],
    subtasks: [
      {
        id: 'BE-L1-005-S1',
        title: 'Audit Existing Unstructured Console Logs',
        objective: 'Inspect server logs during API traffic and evaluate log parsing compatibility.',
        instructions: 'Run `npm run start:dev` and send mock requests to observe unstructured console output.',
        expectedActions: ['Inspect current console.log statements in routes', 'Identify missing timestamps and request correlation'],
        successCriteria: ['Documented lack of JSON structure and correlation ID', 'Confirmed log parser incompatibility'],
        evaluationCriteria: { auditClarity: 50, observabilityAnalysis: 50 }
      },
      {
        id: 'BE-L1-005-S2',
        title: 'Integrate Structured Pino Logger & AsyncLocalStorage Context',
        objective: 'Inject X-Request-ID middleware, configure Pino JSON logger, and verify structured output.',
        instructions: 'Create logger.js with AsyncLocalStorage, capture req.headers["x-request-id"] || crypto.randomUUID(), and attach to all log lines.',
        expectedActions: ['Configure Pino structured JSON logger', 'Create correlation ID middleware using AsyncLocalStorage', 'Verify all downstream logs include requestId and timestamp'],
        successCriteria: ['100% of logs emitted as structured JSON with requestId', 'X-Request-ID returned in HTTP response headers'],
        evaluationCriteria: { implementationQuality: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['AsyncLocalStorage vs explicit logger passing in function parameters', 'Pino vs Winston for high-throughput performance'],
    pressureEvents: ['Ops Manager: Production logging volume is high; unstructured logs will be dropped at midnight'],
    expectedSolution: 'Use AsyncLocalStorage to store requestId, wrap logger methods to auto-inject { requestId, timestamp, level, msg } as JSON.',
    acceptableApproaches: ['Pino with pino-http middleware', 'AsyncLocalStorage correlation store with Winston'],
    failureConditions: ['Synchronous logging blocks event loop', 'Correlation ID lost across async database await calls'],
    finalDeliverable: 'logger.js and correlationMiddleware.js emitting production-ready structured JSON logs.',
    evaluationCriteria: { observabilityStandards: 40, asyncSafety: 30, testValidation: 30 },
    workplaceContext: 'Microservice Observability & Log Normalization',
    taskType: 'observability'
  },

  {
    id: 'BE-L1-006',
    title: 'Docker Container CrashLoopBackOff & Environment Configuration',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Kubernetes / Cloud Native Deployment Services',
    department: 'Container Infrastructure & DevOps',
    domain: 'DevOps / Container Orchestration',
    skills: ['docker', 'devops', 'linux_signals', 'environment_config'],
    coreCompetencies: ['containerization', 'debugging', 'devops'],
    secondarySkills: ['dockerfile_optimization', 'sigterm_handling'],
    skillTags: ['docker', 'crash_loop', 'containers', 'env_vars', 'devops'],
    situation: 'The newly built payment service container enters a CrashLoopBackOff state in Kubernetes staging, terminating immediately after startup with exit code 1.',
    problem: 'The Dockerfile uses CMD ["node", "server.js"] without injecting required DATABASE_URL environment variables, causing the app to throw an uncaught exception on boot and crash.',
    mission: 'Fix environment variable loading with validation defaults, implement Docker healthcheck endpoint (/healthz), and handle SIGTERM signals for graceful container shutdown.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Docker 24 / Node.js v20 / Linux Alpine' }
    },
    availableEvidence: [
      'Kubernetes pod status: CrashLoopBackOff (Back-off 5m0s restarting failed container)',
      'Container log: Uncaught Error: DATABASE_URL environment variable is required'
    ],
    subtasks: [
      {
        id: 'BE-L1-006-S1',
        title: 'Inspect Docker Logs & Crash Exit Codes',
        objective: 'Run container in test environment and capture stdout/stderr crash traceback.',
        instructions: 'Run `npm run docker:debug` in the terminal to inspect the container startup crash.',
        expectedActions: ['Inspect container exit code and logs in terminal', 'Identify missing configuration guard in config.js'],
        successCriteria: ['Identified missing environment variables causing immediate exit', 'Noted absence of container healthcheck'],
        evaluationCriteria: { containerDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L1-006-S2',
        title: 'Implement Config Validation, Healthcheck & Graceful Exit',
        objective: 'Provide fallback defaults in config.js, add HEALTHCHECK in Dockerfile, and attach process.on("SIGTERM").',
        instructions: 'Update server.js with graceful shutdown handler, expose /healthz endpoint, update Dockerfile, and verify container runs stably.',
        expectedActions: ['Update Dockerfile with multi-stage build and HEALTHCHECK', 'Add /healthz readiness/liveness route', 'Implement process.on("SIGTERM") server.close()', 'Run container test'],
        successCriteria: ['Container starts cleanly and stays in Running status', 'Healthcheck probe returns HTTP 200 OK'],
        evaluationCriteria: { containerHygiene: 50, testVerification: 50 }
      }
    ],
    decisionPoints: ['Multi-stage Docker build vs single layer build', 'Tini init system vs native Node 20 signal handling'],
    pressureEvents: ['Staging deployment pipeline blocked: QA team cannot test checkout features'],
    expectedSolution: 'Validate env vars with clean error message, add HEALTHCHECK CMD curl -f http://localhost:3000/healthz, handle SIGTERM.',
    acceptableApproaches: ['Multi-stage Dockerfile with non-root user and dumb-init', 'Zod environment validation with defaults'],
    failureConditions: ['Container runs as root user', 'SIGTERM kills active connections without flushing responses'],
    finalDeliverable: 'Optimized Dockerfile and server.js passing all Kubernetes container health checks.',
    evaluationCriteria: { devopsHygiene: 40, containerStability: 30, testValidation: 30 },
    workplaceContext: 'Cloud-Native Container Deployment & Reliability',
    taskType: 'devops'
  },

  {
    id: 'BE-L1-007',
    title: 'Unit & Integration Test Suite Database Fixture Isolation',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Stripe / Core API Test Engineering',
    department: 'Quality Engineering & CI Pipelines',
    domain: 'Fintech / Test Automation',
    skills: ['testing_backend', 'postgresql', 'test_fixtures', 'jest'],
    coreCompetencies: ['test_isolation', 'database_fixtures', 'automated_testing'],
    secondarySkills: ['transaction_rollback', 'test_containers'],
    skillTags: ['testing', 'fixtures', 'database_isolation', 'jest', 'ci'],
    situation: 'Running `npm test` locally passes, but running tests in parallel in GitHub Actions fails randomly because tests share and mutate the same database records.',
    problem: 'Test files do not isolate database state between test runs; Test A updates a user record that Test B expects to be clean, causing race conditions in CI.',
    mission: 'Implement database transaction rollback isolation per test or generate isolated random schemas/UUIDs to ensure tests run in 100% isolation.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL / Jest' }
    },
    availableEvidence: [
      'CI failure: Expected user balance 100, received 75 (mutated by previous billing test)',
      'Flaky test rate: 28% of CI pipeline runs fail randomly on parallel worker threads'
    ],
    subtasks: [
      {
        id: 'BE-L1-007-S1',
        title: 'Reproduce Flaky Test Concurrency Collision',
        objective: 'Run test suite with --maxWorkers=4 and observe state collision across parallel test files.',
        instructions: 'Execute `npm test -- --maxWorkers=4` in terminal to reproduce intermittent test failures.',
        expectedActions: ['Run test suite with multi-worker parallelism', 'Identify shared mutable user_id = 1 fixture across test files'],
        successCriteria: ['Reproduced test failure caused by database state leakage', 'Identified missing beforeEach/afterEach teardown'],
        evaluationCriteria: { concurrencyTesting: 50, rootCauseClarity: 50 }
      },
      {
        id: 'BE-L1-007-S2',
        title: 'Implement Transactional Rollback & Isolated Test Fixtures',
        objective: 'Wrap each test in a database transaction that rolls back in afterEach, or generate isolated test tenant UUIDs.',
        instructions: 'Update testSetup.js with transactional rollback logic or TRUNCATE cascade helper, and verify parallel test execution passes 10 times consecutively.',
        expectedActions: ['Implement transactional rollback in testSetup.js', 'Replace hardcoded IDs with dynamic crypto.randomUUID() fixtures', 'Rerun parallel tests 10x'],
        successCriteria: ['100% of tests pass across 4 parallel workers', 'Zero database state leakage between test files'],
        evaluationCriteria: { isolationMechanism: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Database transaction rollback per test vs TRUNCATE table cleanup', 'Dynamic test schemas vs shared schema with UUID partitioning'],
    pressureEvents: ['Engineering VP: CI flakiness is causing 40 wasted engineering hours per week'],
    expectedSolution: 'Wrap each test in BEGIN transaction and execute ROLLBACK in afterEach; or use dynamic test-specific database schemas.',
    acceptableApproaches: ['Transactional rollback pattern in test runner', 'Database truncation with fast TRUNCATE CASCADE'],
    failureConditions: ['Tests leave dirty rows in database', 'Parallel test execution slows down by more than 2x'],
    finalDeliverable: 'testSetup.js providing deterministic, parallel-safe database test isolation.',
    evaluationCriteria: { testIsolation: 40, performance: 30, testValidation: 30 },
    workplaceContext: 'CI/CD Automated Test Suite Reliability',
    taskType: 'testing_qa'
  },

  {
    id: 'BE-L1-008',
    title: 'Pagination & Dynamic Sort Query Parameter SQL Injection',
    role: 'backend',
    level: 1,
    difficulty: 'Foundation',
    company: 'Shopify / Merchant Reporting Services',
    department: 'Application Security & Reporting APIs',
    domain: 'E-Commerce / Data Query Security',
    skills: ['security', 'sql_injection', 'input_sanitization', 'postgresql'],
    coreCompetencies: ['sql_injection_defense', 'input_validation', 'secure_query_design'],
    secondarySkills: ['parameterized_queries', 'allowlist_validation'],
    skillTags: ['sql_injection', 'security', 'cve', 'parameterization', 'allowlist'],
    situation: 'A vulnerability scan flagged the transaction history endpoint (/api/v1/orders?sort=price) with SQL Injection because the sort column is directly concatenated into the SQL string.',
    problem: 'The handler executes `db.query("SELECT * FROM orders ORDER BY " + req.query.sort + " " + req.query.order)`, allowing attackers to pass `price; DROP TABLE orders;--` or extract data via UNION SELECT.',
    mission: 'Implement strict column allowlist validation for sort parameters, parameterize all dynamic query fragments, and write security regression tests.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL' }
    },
    availableEvidence: [
      'Security report: Endpoint vulnerable to boolean-based blind SQL injection via ?sort=CASE+WHEN(...)',
      'Code audit: String concatenation in orderService.js:48'
    ],
    subtasks: [
      {
        id: 'BE-L1-008-S1',
        title: 'Exploit Dynamic Sort Concatenation in Sandbox',
        objective: 'Test SQL injection payload against /api/v1/orders endpoint and observe query execution.',
        instructions: 'Run `npm test test/sqli.test.js` to observe how malicious sort parameters alter the raw SQL query.',
        expectedActions: ['Run security test suite in terminal', 'Observe raw SQL statement generated by concatenation'],
        successCriteria: ['Demonstrated SQL injection via sort parameter', 'Identified vulnerable string interpolation in query builder'],
        evaluationCriteria: { exploitVerification: 50, codeAudit: 50 }
      },
      {
        id: 'BE-L1-008-S2',
        title: 'Implement Strict Allowlist Validation & Safe Sorting',
        objective: 'Enforce allowedSortColumns = [\'created_at\', \'total\', \'status\'] and reject unknown columns with 400.',
        instructions: 'Refactor orderService.js to validate sort column and direction against strict enums before appending to query.',
        expectedActions: ['Create ALLOWED_SORT_COLUMNS allowlist Set', 'Validate sort and order direction (ASC / DESC)', 'Verify all SQL injection payloads are rejected with 400 Bad Request'],
        successCriteria: ['SQL injection payloads rejected cleanly', 'Valid sorting by approved columns functions correctly'],
        evaluationCriteria: { securityHardening: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Strict allowlist enum vs quoting column identifier with pg-format', 'Default fallback sorting vs explicit 400 error on invalid column'],
    pressureEvents: ['External penetration test compliance report due by 5:00 PM today'],
    expectedSolution: 'Validate sort column against ALLOWED_COLUMNS = new Set([\'id\', \'created_at\', \'amount\']), validate direction in [\'ASC\', \'DESC\'].',
    acceptableApproaches: ['Strict allowlist dictionary lookup', 'Parameterized query builder with column mapping'],
    failureConditions: ['Using string escaping regex instead of strict allowlist', 'Allowing arbitrary column names through'],
    finalDeliverable: 'Hardened orderService.js with strict allowlist sorting and zero SQL injection vulnerability.',
    evaluationCriteria: { securityDefense: 40, queryIntegrity: 30, testValidation: 30 },
    workplaceContext: 'Application Security SQL Injection Remediation',
    taskType: 'security'
  },

  // =============================================
  // LEVEL 2: INTERMEDIATE (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'BE-L2-001',
    title: 'Database Connection Pool Exhaustion & Worker Leaks',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Stripe / Core Payment Services',
    department: 'Database Infrastructure & Reliability',
    domain: 'Fintech / High-Concurrency Relational DB',
    skills: ['postgresql', 'database_pooling', 'resilience', 'resource_management'],
    coreCompetencies: ['connection_pooling', 'resource_leak_prevention', 'database_tuning'],
    secondarySkills: ['pg_pool', 'connection_timeouts'],
    skillTags: ['database', 'connection_pool', 'postgresql', 'pool_exhaustion', 'concurrency'],
    situation: 'During payment burst traffic (800 RPS), the backend starts throwing "Error: timeout exceeded when trying to connect" (HTTP 503) and new requests queue up and time out.',
    problem: 'Database connection pool max is set to 20 without statement timeouts, and an unhandled error inside a try/catch block omits `client.release()`, permanently leaking client connections from the pool.',
    mission: 'Ensure all database clients are guaranteed released in a `finally` block, configure statement_timeout, and implement connection pool telemetry metrics.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / pg-pool / PostgreSQL' }
    },
    availableEvidence: [
      'PostgreSQL telemetry: pg_stat_activity shows 100/100 connections in "idle in transaction" state',
      'Client errors: 503 Service Unavailable: connection pool timeout exceeded'
    ],
    subtasks: [
      {
        id: 'BE-L2-001-S1',
        title: 'Trace Connection Pool Leaks Under Simulated Load',
        objective: 'Run load generation script in terminal and observe active pool connection count climb to limit.',
        instructions: 'Execute `npm run test:pool-leak` in terminal and monitor pool.waitingCount and active connections.',
        expectedActions: ['Run pool load test in terminal', 'Observe pool connections reaching 100% and failing to return to zero'],
        successCriteria: ['Identified leaked client inside error branch of transaction', 'Confirmed pool starvation after 20 errors'],
        evaluationCriteria: { leakDetection: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L2-001-S2',
        title: 'Refactor to Guaranteed Release & Statement Timeouts',
        objective: 'Wrap database operations in try/finally to enforce client.release(), and add connectionTimeoutMillis.',
        instructions: 'Update dbPool.js to enforce client.release() in finally blocks, configure idleTimeoutMillis: 5000, and re-run load test.',
        expectedActions: ['Refactor database calls with try/finally client.release()', 'Configure statement_timeout: 3000ms', 'Verify pool returns to 0 idle connections after load test'],
        successCriteria: ['Zero connection leaks even when queries throw errors', 'All 500 parallel queries resolve without timeout'],
        evaluationCriteria: { poolResilience: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Using pool.query directly vs manual pool.connect() / client.release()', 'PGBouncer proxy integration vs in-app pool tuning'],
    pressureEvents: ['Ops Manager: Payment processing backlog growing by 400 orders per minute'],
    expectedSolution: 'Always call client.release() in finally block, set connectionTimeoutMillis: 2000, max: 25, statement_timeout: 3000.',
    acceptableApproaches: ['Guaranteed try/finally client.release() pattern', 'Scoped withTransaction helper wrapping queries'],
    failureConditions: ['Errors inside catch block prevent finally execution', 'Connection timeout set to 0 causing infinite queue'],
    finalDeliverable: 'Hardened dbPool.js with leak-proof connection release and pool health metrics.',
    evaluationCriteria: { poolSafety: 40, concurrencyReliability: 30, testValidation: 30 },
    workplaceContext: 'High-Throughput Relational Database Reliability',
    taskType: 'database_reliability'
  },

  {
    id: 'BE-L2-002',
    title: 'Distributed Idempotency Key Implementation for Payments',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Stripe / Merchant API Core',
    department: 'Payment Processing & Financial Ledger',
    domain: 'Fintech / Idempotency & Financial Systems',
    skills: ['idempotency', 'redis', 'distributed_systems', 'financial_ledger'],
    coreCompetencies: ['idempotent_api_design', 'distributed_locking', 'redis_caching'],
    secondarySkills: ['atomic_operations', 'payload_hashing'],
    skillTags: ['idempotency', 'redis', 'payments', 'distributed_locks', 'setnx'],
    situation: 'Merchants experiencing network timeouts retry their POST /charges requests, resulting in customers being double-charged for the same purchase.',
    problem: 'The payment API lacks an Idempotency-Key mechanism. When the merchant retries after a client-side timeout, the server treats it as a brand-new order and debits the bank account twice.',
    mission: 'Implement an Idempotency-Key handler backed by Redis atomic locks (SET key val NX EX 120), cache the initial response payload, and replay cached responses on duplicate keys.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Redis / Express' }
    },
    availableEvidence: [
      'Dispute ticket: Customer charged twice ($249.00 x 2) within 4 seconds with identical cart details',
      'Merchant log: Client sent identical POST /charges twice with header Idempotency-Key: idemp-9214-abc'
    ],
    subtasks: [
      {
        id: 'BE-L2-002-S1',
        title: 'Simulate Duplicate POST Requests with Identical Key',
        objective: 'Send two concurrent POST requests with the same Idempotency-Key header.',
        instructions: 'Run `npm test test/idempotency.test.js` and verify that the payment service executes twice.',
        expectedActions: ['Run duplicate request test in terminal', 'Observe two distinct charge records created in database'],
        successCriteria: ['Demonstrated double-charge vulnerability', 'Identified missing idempotency check'],
        evaluationCriteria: { testingAccuracy: 50, problemDiagnosis: 50 }
      },
      {
        id: 'BE-L2-002-S2',
        title: 'Implement Redis SETNX Lock & Cached Response Replay',
        objective: 'Acquire Redis lock via SET key IN_PROGRESS NX EX 120, process charge, store response, and replay on repeat.',
        instructions: 'Write idempotencyMiddleware.js: check Redis for key, if exists return cached response, if in-progress return 409 Conflict, else process and cache.',
        expectedActions: ['Implement Redis atomic lock with SET NX EX', 'Cache response body and status code upon completion', 'Replay cached response on identical key', 'Run idempotency test suite'],
        successCriteria: ['Second identical request returns cached 200 without charging customer again', 'Concurrent duplicate requests return 409 Conflict'],
        evaluationCriteria: { idempotencyDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Returning 409 Conflict vs waiting on polling for in-flight requests', 'Payload fingerprint hashing to prevent key reuse with altered amount'],
    pressureEvents: ['Finance Director: Chargeback dispute fees exceeded $12,000 this week from duplicate charges'],
    expectedSolution: 'Use Redis SET key "started" NX EX 60; if lock fails, return cached response if ready or 409; save response to Redis for 24 hours.',
    acceptableApproaches: ['Redis SETNX with cached response payload', 'Database-backed idempotency table with unique constraint'],
    failureConditions: ['Key expires before payment completes causing duplicate charge', 'Replaying stale response when payload payload hash differs'],
    finalDeliverable: 'idempotencyMiddleware.js guaranteeing exactly-once payment execution.',
    evaluationCriteria: { financialSafety: 40, distributedLocking: 30, testValidation: 30 },
    workplaceContext: 'Financial Transaction Idempotency & Safety',
    taskType: 'distributed_systems'
  },

  {
    id: 'BE-L2-003',
    title: 'Redis Cache Stampede & Cache-Aside Invalidation Bug',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Reddit / Front Page Architecture',
    department: 'Caching & Feed Delivery',
    domain: 'Social Media / High-Traffic Caching',
    skills: ['caching', 'redis', 'concurrency', 'performance_opt'],
    coreCompetencies: ['cache_stampede_prevention', 'redis_optimization', 'concurrency'],
    secondarySkills: ['mutex_locking', 'probabilistic_early_expiration'],
    skillTags: ['redis', 'cache_stampede', 'thundering_herd', 'mutex', 'caching'],
    situation: 'When the front page cache key expires every 5 minutes, 8,000 incoming requests simultaneously discover a cache miss and all hit PostgreSQL at once, spiking database CPU to 100% (Thundering Herd).',
    problem: 'The cache-aside pattern lacks a mutex lock or probabilistic early expiration (XFetch algorithm). All concurrent cache misses execute identical heavy SQL queries.',
    mission: 'Implement a distributed mutex lock around cache misses (or probabilistic early expiration) so only ONE worker regenerates the cache while others wait or serve stale-while-revalidate.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Redis / PostgreSQL' }
    },
    availableEvidence: [
      'PostgreSQL CPU graph: Spikes to 100% every 5 minutes on the dot',
      'Database log: 4,200 identical queries SELECT * FROM frontpage_posts executed in a 200ms window'
    ],
    subtasks: [
      {
        id: 'BE-L2-003-S1',
        title: 'Reproduce Thundering Herd on Cache Key Expiry',
        objective: 'Trigger cache expiration during simulated 500 RPS load and measure database query volume.',
        instructions: 'Run `npm run test:cache-stampede` in terminal and inspect database query count immediately following key expiration.',
        expectedActions: ['Run cache stampede simulation in terminal', 'Measure database query surge on cache miss'],
        successCriteria: ['Observed 500 concurrent database queries on key expiration', 'Identified lack of lock coordination'],
        evaluationCriteria: { simulationAccuracy: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L2-003-S2',
        title: 'Implement Mutex Lock / Stale-While-Revalidate Strategy',
        objective: 'Use Redis SET lock_key NX to ensure only 1 worker rebuilds cache; return stale data to other requests.',
        instructions: 'Update cacheService.js with mutex lock pattern or background refresher, re-run test, and verify database query count = 1.',
        expectedActions: ['Implement Redis mutex lock on cache miss', 'Return stale cache while revalidation executes in background', 'Rerun load test'],
        successCriteria: ['Database receives exactly 1 query during cache refresh', 'Zero 500/503 errors during key expiry'],
        evaluationCriteria: { cachingArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Distributed mutex lock vs Probabilistic Early Expiration (XFetch algorithm)', 'Stale-while-revalidate vs synchronous wait with polling'],
    pressureEvents: ['CTO notice: Staging environment crashed during flash load test due to cache stampede'],
    expectedSolution: 'Acquire Redis lock: if acquired, query DB and update cache; if not acquired, wait 50ms or return stale cached payload.',
    acceptableApproaches: ['Redis mutex locking on cache regeneration', 'Probabilistic early expiration (XFetch)', 'Stale-while-revalidate with background worker'],
    failureConditions: ['Lock is never released if database query throws error', 'All requests block and timeout while waiting for lock'],
    finalDeliverable: 'cacheService.js with stampede-proof caching and sub-10ms response times.',
    evaluationCriteria: { cacheDesign: 40, systemResilience: 30, testValidation: 30 },
    workplaceContext: 'High-Volume Caching & Database Shielding',
    taskType: 'caching'
  },

  {
    id: 'BE-L2-004',
    title: 'Rate-Limiting Middleware with Redis Token Bucket Algorithm',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Cloudflare / API Gateway Protection',
    department: 'Edge Security & Rate Limiting',
    domain: 'Cyber Defense / Gateway Rate Limiting',
    skills: ['rate_limiting', 'redis', 'algorithms', 'api_security'],
    coreCompetencies: ['rate_limiting_algorithms', 'redis_lua_scripts', 'api_protection'],
    secondarySkills: ['token_bucket', 'http_headers'],
    skillTags: ['rate_limiting', 'token_bucket', 'redis', 'lua', 'http_429'],
    situation: 'Scraper bots are sending 400 requests/minute from individual IP addresses, extracting proprietary catalog pricing and overloading the search service.',
    problem: 'The current rate limiter uses a fixed window counter in local process memory that resets every minute, allowing a burst of 200 requests at the boundary and failing across multi-pod clusters.',
    mission: 'Implement a distributed Token Bucket rate limiter using an atomic Redis Lua script, return HTTP 429 Too Many Requests with standard Retry-After headers, and support burst allowances.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Redis / Express' }
    },
    availableEvidence: [
      'Traffic analytics: IP 198.51.100.42 sent 12,000 requests in 30 minutes without being throttled',
      'Search backend latency: p99 increased from 80ms to 940ms due to scraper bot queries'
    ],
    subtasks: [
      {
        id: 'BE-L2-004-S1',
        title: 'Evaluate Fixed-Window Flaw with Boundary Burst Attack',
        objective: 'Send burst of requests across minute boundary and verify that local memory counter fails.',
        instructions: 'Run `npm test test/ratelimit.test.js` to observe fixed-window boundary burst bypass.',
        expectedActions: ['Run rate limiting test suite in terminal', 'Observe scraper bot bypassing limit across window boundary'],
        successCriteria: ['Reproduced 2x burst bypass at window boundary', 'Identified state desynchronization across multi-process workers'],
        evaluationCriteria: { algorithmAnalysis: 50, testObservation: 50 }
      },
      {
        id: 'BE-L2-004-S2',
        title: 'Implement Atomic Redis Token Bucket & Retry Headers',
        objective: 'Write Redis Lua script calculating token refill based on elapsed time, deduct tokens, and set 429 response.',
        instructions: 'Create tokenBucketLimiter.js with atomic Redis EVAL script, set X-RateLimit-Remaining and Retry-After headers, and run test suite.',
        expectedActions: ['Write token bucket Redis Lua script', 'Return HTTP 429 with Retry-After header when tokens = 0', 'Verify smooth throttling under 500 RPS burst test'],
        successCriteria: ['Requests exceeding 10 req/sec throttled with HTTP 429', 'Accurate Retry-After header calculated in seconds'],
        evaluationCriteria: { luaImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Token bucket vs Sliding window log vs Leaky bucket', 'IP-based rate limiting vs API-key based rate limiting'],
    pressureEvents: ['Operations alert: Scraper bot activity threatening downstream catalog availability'],
    expectedSolution: 'Execute Lua script in Redis: compute tokens_to_add = (now - last_updated) * refill_rate; if tokens >= 1, deduct and allow, else deny with retry timestamp.',
    acceptableApproaches: ['Atomic Redis Lua script implementing Token Bucket', 'Sliding Window Counter using Redis Sorted Sets (ZSET)'],
    failureConditions: ['Race conditions between GET and SET without Lua script', 'Retry-After header formatted as past date'],
    finalDeliverable: 'tokenBucketLimiter.js with distributed atomic Redis throttling and HTTP 429 headers.',
    evaluationCriteria: { algorithmAccuracy: 40, distributedAtomicSafety: 30, testValidation: 30 },
    workplaceContext: 'API Gateway Throttling & Bot Defense',
    taskType: 'gateway_security'
  },

  {
    id: 'BE-L2-005',
    title: 'Payment Webhook Ingestion & Dead Letter Queue (DLQ) Setup',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Shopify / Webhook Infrastructure',
    department: 'Event Streaming & Asynchronous Ingestion',
    domain: 'E-Commerce / Asynchronous Queues',
    skills: ['queue_processing', 'bullmq', 'error_handling', 'resilience'],
    coreCompetencies: ['asynchronous_queuing', 'dlq_management', 'webhook_ingestion'],
    secondarySkills: ['redis', 'exponential_backoff'],
    skillTags: ['webhooks', 'bullmq', 'dead_letter_queue', 'redis', 'event_processing'],
    situation: 'During payment gateway webhook bursts (1,200 webhooks/sec), when an external fulfillment API throws temporary 500 errors, failed webhooks are permanently dropped and orders remain unfulfilled.',
    problem: 'Webhooks are processed synchronously inside the HTTP handler without an asynchronous message queue. When processing throws an error, the event is lost forever with no retry or Dead Letter Queue (DLQ).',
    mission: 'Decouple webhook ingestion from processing using BullMQ/Redis: return instant HTTP 202 Accepted, retry failed jobs 5 times with exponential backoff, and route poisoned messages to a DLQ.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / BullMQ / Redis' }
    },
    availableEvidence: [
      'Customer support ticket: 48 customer orders placed yesterday were never fulfilled because webhook dropped',
      'Server log: Unhandled promise rejection inside POST /webhooks/stripe: 500 Fulfillment service unavailable'
    ],
    subtasks: [
      {
        id: 'BE-L2-005-S1',
        title: 'Trace Dropped Webhook Events During Outage',
        objective: 'Simulate downstream fulfillment failure during webhook ingestion and observe data loss.',
        instructions: 'Run `npm test test/webhook.test.js` to observe synchronous HTTP 500 response and lost webhook payload.',
        expectedActions: ['Run webhook test in terminal', 'Verify that failed synchronous processing drops order events'],
        successCriteria: ['Demonstrated unrecoverable event loss on 500 error', 'Identified lack of persistent message buffer'],
        evaluationCriteria: { pipelineDiagnosis: 50, riskIdentification: 50 }
      },
      {
        id: 'BE-L2-005-S2',
        title: 'Architect BullMQ Queue, Worker & Dead Letter Quarantine',
        objective: 'Enqueue job in BullMQ, return 202 immediately, retry with backoff, and move to DLQ on max retries.',
        instructions: 'Refactor webhookController.js to push to "payment-webhooks" queue, configure attempts: 5 with backoff, and create a failed job event listener.',
        expectedActions: ['Create BullMQ webhookQueue and worker', 'Return HTTP 202 in < 20ms', 'Implement exponential backoff retry and DLQ routing', 'Run queue test suite'],
        successCriteria: ['Ingestion returns HTTP 202 in < 20ms', 'Failed events retried 5 times and safely archived in DLQ'],
        evaluationCriteria: { queueArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['BullMQ (Redis) vs RabbitMQ vs AWS SQS', 'Immediate 200 vs 202 Accepted status code'],
    pressureEvents: ['Black Friday notice: Expected webhook volume is 10,000/min; synchronous processing will crash servers'],
    expectedSolution: 'Queue incoming body immediately via queue.add(name, data, { attempts: 5, backoff: { type: "exponential", delay: 2000 } }); respond with 202.',
    acceptableApproaches: ['BullMQ Redis-backed worker queue', 'RabbitMQ exchange with dead-letter-exchange routing'],
    failureConditions: ['Database queries executed before returning 202', 'Poison pill message causes infinite retry loop'],
    finalDeliverable: 'webhookQueue.js and webhookWorker.js with guaranteed at-least-once delivery and DLQ quarantine.',
    evaluationCriteria: { queueReliability: 40, faultTolerance: 30, testValidation: 30 },
    workplaceContext: 'Resilient Asynchronous Webhook Ingestion',
    taskType: 'queue_architecture'
  },

  {
    id: 'BE-L2-006',
    title: 'Transactional Outbox Pattern for Asynchronous Microservice Events',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'Uber / Core Trip Dispatch',
    department: 'Distributed Systems & Messaging',
    domain: 'Mobility / Event-Driven Architecture',
    skills: ['distributed_patterns', 'postgresql', 'event_driven', 'data_consistency'],
    coreCompetencies: ['transactional_outbox', 'dual_write_problem', 'event_consistency'],
    secondarySkills: ['kafka', 'cdc_debezium'],
    skillTags: ['outbox_pattern', 'dual_writes', 'microservices', 'acid_transactions', 'kafka'],
    situation: 'When an order is created, the service saves the order to PostgreSQL and then immediately calls Kafka.produce(). When the network glitches or Kafka is slow, the database commits but the Kafka event is lost (Dual-Write problem).',
    problem: 'Dual writes to database and message broker without a 2-phase commit create distributed data inconsistency: orders exist in the database that downstream shipping services never hear about.',
    mission: 'Implement the Transactional Outbox pattern: save the order and the outbox event in the same ACID database transaction, and build a background publisher relay to forward events to the broker.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL' }
    },
    availableEvidence: [
      'Inconsistency audit: 124 orders in orders table have no matching trip_created event in Kafka topic',
      'Error log: Error publishing to Kafka: connection timeout (Order was committed to DB anyway)'
    ],
    subtasks: [
      {
        id: 'BE-L2-006-S1',
        title: 'Simulate Network Partition During Dual Write',
        objective: 'Simulate Kafka broker failure immediately following database commit in test suite.',
        instructions: 'Run `npm test test/outbox.test.js` to observe order saved in DB while message broker event is lost.',
        expectedActions: ['Run dual-write failure test in terminal', 'Verify database contains record with no outbound event published'],
        successCriteria: ['Reproduced Dual-Write inconsistency', 'Understood failure mode of non-transactional messaging'],
        evaluationCriteria: { consistencyAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L2-006-S2',
        title: 'Implement Outbox Table, ACID Transaction & Relay Worker',
        objective: 'Write order and outbox record in single db.tx, and build outboxRelay.js polling and publishing events.',
        instructions: 'Create outbox table schema, insert event inside order transaction, build polling relay that publishes to broker and marks processed: true.',
        expectedActions: ['Create outbox table migration', 'Wrap order insert and outbox insert in single SQL transaction', 'Implement outboxRelay worker with polling/SKIP LOCKED', 'Rerun test suite'],
        successCriteria: ['Zero lost events even if broker is down during order creation', 'Outbox relay successfully delivers pending events upon broker recovery'],
        evaluationCriteria: { transactionalIntegrity: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Polling publisher with SELECT ... FOR UPDATE SKIP LOCKED vs Debezium Change Data Capture (CDC)', 'Idempotent message delivery to downstream consumers'],
    pressureEvents: ['Audit finding: Financial ledger requires guaranteed event delivery for all state changes'],
    expectedSolution: 'Inside BEGIN / COMMIT: INSERT INTO orders ...; INSERT INTO outbox (event_type, payload) ...; background worker polls outbox with SKIP LOCKED.',
    acceptableApproaches: ['Transactional Outbox with polling publisher', 'Transactional Outbox with Debezium CDC listener'],
    failureConditions: ['Outbox insert executed outside the order transaction', 'Relay worker publishes duplicate events without idempotency header'],
    finalDeliverable: 'outboxService.js and outboxRelay.js eliminating the Dual-Write vulnerability.',
    evaluationCriteria: { distributedConsistency: 40, acidSafety: 30, testValidation: 30 },
    workplaceContext: 'Distributed Data Consistency & Messaging',
    taskType: 'distributed_architecture'
  },

  {
    id: 'BE-L2-007',
    title: 'PostgreSQL Composite B-Tree Index Optimization on High-Volume Table',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'GitLab / Project Repositories Platform',
    department: 'Database Engineering & Performance',
    domain: 'Developer Tooling / Database Indexing',
    skills: ['postgresql', 'database_indexing', 'performance_opt', 'sql_optimization'],
    coreCompetencies: ['database_indexing', 'query_plan_analysis', 'explain_analyze'],
    secondarySkills: ['b_tree_indexes', 'seq_scans'],
    skillTags: ['postgresql', 'indexes', 'explain_analyze', 'seq_scan', 'performance'],
    situation: 'The repository search endpoint (/api/v1/projects/:id/commits?author=jordan&since=2026-01-01) takes 4.2 seconds to run on a table with 25 million commits, triggering database slow query alerts.',
    problem: 'The query performs a Sequential Scan (Seq Scan) over 25M rows because there is only a single-column index on project_id, forcing PostgreSQL to filter author and since in memory.',
    mission: 'Analyze query execution plan using EXPLAIN ANALYZE, design an optimal composite B-tree index (project_id, author, committed_at DESC), and verify index scan executes in under 5ms.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL 16' }
    },
    availableEvidence: [
      'EXPLAIN ANALYZE output: Seq Scan on commits (cost=0.00..842,100.00 rows=25,000,000 width=72) (actual time=4180.21ms)',
      'Slow query log: Query duration: 4,185ms (Threshold: > 200ms)'
    ],
    subtasks: [
      {
        id: 'BE-L2-007-S1',
        title: 'Run EXPLAIN ANALYZE & Map Sequential Scan Bottleneck',
        objective: 'Execute query plan analysis in terminal and inspect filter cost and heap reads.',
        instructions: 'Run `npm run db:explain` in the terminal to inspect the execution plan and verify sequential table scan.',
        expectedActions: ['Run EXPLAIN ANALYZE command in terminal', 'Identify 25 million rows scanned sequentially'],
        successCriteria: ['Quantified 4.1s execution time spent in Seq Scan', 'Identified missing composite index on multi-column filter'],
        evaluationCriteria: { queryPlanInterpretation: 50, diagnosticAccuracy: 50 }
      },
      {
        id: 'BE-L2-007-S2',
        title: 'Design Optimal Composite Index & Verify Index Scan',
        objective: 'Create composite index CREATE INDEX CONCURRENTLY on commits (project_id, author, committed_at DESC).',
        instructions: 'Apply migration script, rerun EXPLAIN ANALYZE, and verify the query switches to Index Scan with execution time < 5ms.',
        expectedActions: ['Create composite index migration', 'Execute EXPLAIN ANALYZE to confirm Index Scan', 'Verify execution time drops below 5ms'],
        successCriteria: ['Query execution plan uses Index Scan', 'Execution time drops from 4,180ms to 3.2ms (1,300x speedup)'],
        evaluationCriteria: { indexingStrategy: 50, testVerification: 50 }
      }
    ],
    decisionPoints: ['Column ordering in composite index (equality columns first, range/sort columns last)', 'Index size impact on write performance'],
    pressureEvents: ['Database storage alert: Index creation must use CONCURRENTLY to avoid locking production table'],
    expectedSolution: 'Create index commits (project_id, author, committed_at DESC); order equality columns before range column.',
    acceptableApproaches: ['Composite B-tree index with equality + range order', 'Partial index for active recent years'],
    failureConditions: ['Putting range column committed_at first in index, preventing index filtering on author', 'Omitting CONCURRENTLY in production migration'],
    finalDeliverable: 'migration.sql with optimal composite index and verified sub-5ms EXPLAIN plan.',
    evaluationCriteria: { indexDesignProficiency: 40, queryPerformanceGain: 30, testValidation: 30 },
    workplaceContext: 'High-Scale Relational Database Performance Tuning',
    taskType: 'database_performance'
  },

  {
    id: 'BE-L2-008',
    title: 'Third-Party Webhook HMAC-SHA256 Signature Verification',
    role: 'backend',
    level: 2,
    difficulty: 'Intermediate',
    company: 'GitHub / Webhook Security Services',
    department: 'Platform Security & Webhooks',
    domain: 'Developer Platforms / Cryptographic Verification',
    skills: ['security', 'cryptography', 'hmac', 'nodejs'],
    coreCompetencies: ['cryptographic_verification', 'timing_attack_defense', 'raw_body_parsing'],
    secondarySkills: ['timing_safe_equal', 'crypto_api'],
    skillTags: ['hmac', 'sha256', 'timing_attack', 'security', 'webhooks'],
    situation: 'Security researchers reported that malicious actors can forge incoming GitHub/Stripe webhook payloads because the server verification function is vulnerable to timing attacks and body re-serialization.',
    problem: 'Verification re-stringifies `JSON.stringify(req.body)` instead of using the raw unaltered byte buffer, and compares signatures using `===` instead of `crypto.timingSafeEqual`, leaking timing information.',
    mission: 'Preserve raw request buffer in body parser middleware, compute HMAC-SHA256 signature, and verify using timing-safe comparison.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Crypto / Express' }
    },
    availableEvidence: [
      'Security audit: Signatures fail intermittently when JSON keys change order',
      'Vulnerability report: Timing attack allows signature forgery across 10,000 measured requests'
    ],
    subtasks: [
      {
        id: 'BE-L2-008-S1',
        title: 'Demonstrate Signature Verification Failure on Re-ordered JSON',
        objective: 'Send valid webhook with altered JSON key ordering and observe hash mismatch.',
        instructions: 'Run `npm test test/hmac.test.js` to observe signature verification failure due to JSON.stringify serialization differences.',
        expectedActions: ['Run HMAC test suite in terminal', 'Identify that JSON.stringify changes byte sequence from original payload'],
        successCriteria: ['Demonstrated failure of JSON.stringify verification', 'Identified timing leak in === equality check'],
        evaluationCriteria: { cryptoAnalysis: 50, vulnerabilityDemonstration: 50 }
      },
      {
        id: 'BE-L2-008-S2',
        title: 'Implement Raw Buffer Capture & Timing-Safe Comparison',
        objective: 'Capture req.rawBody via express.json({ verify: ... }) and compare using crypto.timingSafeEqual.',
        instructions: 'Update express body parser to capture rawBuffer, compute HMAC using crypto.createHmac("sha256", secret), and compare with timingSafeEqual.',
        expectedActions: ['Configure body parser verify option to attach req.rawBody', 'Compute crypto.createHmac("sha256", secret).update(req.rawBody).digest("hex")', 'Compare signatures using crypto.timingSafeEqual', 'Run security tests'],
        successCriteria: ['Signatures verified deterministically against raw byte payload', 'Constant-time comparison prevents timing attacks'],
        evaluationCriteria: { cryptoImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Capturing raw buffer in middleware vs stream hashing before parser', 'Buffer length mismatch handling in timingSafeEqual'],
    pressureEvents: ['Compliance requirement: All webhook receivers must pass SOC 2 cryptographic review'],
    expectedSolution: 'Store raw buffer during body parsing; compute HMAC on rawBuffer; compare with crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(computedSig)).',
    acceptableApproaches: ['express.json verify callback storing req.rawBody', 'Dedicated raw stream middleware for webhook routes'],
    failureConditions: ['Using === for signature string comparison', 'Re-serializing parsed JSON object with JSON.stringify'],
    finalDeliverable: 'verifyWebhookSignature.js with timing-safe HMAC-SHA256 validation.',
    evaluationCriteria: { cryptographicSecurity: 40, timingDefense: 30, testValidation: 30 },
    workplaceContext: 'Cryptographic API Security & Webhook Verification',
    taskType: 'cryptography'
  },

  // =============================================
  // LEVEL 3: ADVANCED (8 TASKS, 16 SUBTASKS)
  // =============================================
  {
    id: 'BE-L3-001',
    title: 'Distributed Deadlock in Concurrent Inventory Reservation',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Amazon / Fulfillment Inventory Services',
    department: 'Order Placement & Warehouse Systems',
    domain: 'E-Commerce / High-Concurrency Database Transactions',
    skills: ['postgresql', 'concurrency', 'transaction_isolation', 'deadlock_prevention'],
    coreCompetencies: ['deadlock_resolution', 'concurrency_control', 'pessimistic_locking'],
    secondarySkills: ['select_for_update', 'lock_ordering'],
    skillTags: ['deadlock', 'concurrency', 'postgresql', 'select_for_update', 'inventory'],
    situation: 'During high-volume checkout of multi-item carts, 8% of transactions fail with PostgreSQL Error: deadlock detected (Process 42 waits for ShareLock on transaction 91; Process 91 waits for ExclusiveLock on transaction 42).',
    problem: 'Two concurrent transactions reserving items (Item A and Item B) acquire locks in arbitrary order: Tx 1 locks Item A then waits for Item B; Tx 2 locks Item B then waits for Item A, creating a circular wait deadlock.',
    mission: 'Eliminate deadlocks by enforcing deterministic global lock ordering (e.g. sorting item IDs before executing SELECT FOR UPDATE), and implement automatic retry with exponential backoff on deadlock exceptions.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL' }
    },
    availableEvidence: [
      'PostgreSQL alert: Deadlock detected between process 14210 and 14218 on table inventory_items',
      'Checkout failure spike: 320 customer transactions aborted in 10 minutes'
    ],
    subtasks: [
      {
        id: 'BE-L3-001-S1',
        title: 'Reproduce Circular Lock Deadlock in Concurrent Test',
        objective: 'Execute two parallel transactions reserving [Item A, Item B] and [Item B, Item A] simultaneously.',
        instructions: 'Run `npm test test/deadlock.test.js` to observe the PostgreSQL 40P01 deadlock exception.',
        expectedActions: ['Run concurrent inventory test in terminal', 'Capture PostgreSQL 40P01 deadlock error in logs'],
        successCriteria: ['Reproduced circular lock deadlock in sandbox', 'Identified arbitrary lock acquisition order'],
        evaluationCriteria: { concurrencyDiagnosis: 50, logAnalysis: 50 }
      },
      {
        id: 'BE-L3-001-S2',
        title: 'Enforce Deterministic Lock Ordering & Deadlock Retry',
        objective: 'Sort item IDs numerically before locking via SELECT FOR UPDATE, and wrap transaction in retry handler.',
        instructions: 'Update inventoryService.js to sort items by ID before acquiring row locks, add retry loop for 40P01 errors, and re-run test suite.',
        expectedActions: ['Sort items by ID: items.sort((a,b) => a.id - b.id)', 'Acquire pessimistic row locks in strict order', 'Add retry handler for transient lock errors', 'Rerun concurrent test'],
        successCriteria: ['Zero deadlocks detected across 500 concurrent multi-item transactions', 'All inventory reservations complete accurately'],
        evaluationCriteria: { concurrencyArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Pessimistic locking (SELECT FOR UPDATE) vs Optimistic locking with version column', 'Sorting item IDs in application layer vs database order by query'],
    pressureEvents: ['Flash sale starts in 30 minutes: Multi-item carts must not abort with deadlocks'],
    expectedSolution: 'Sort item IDs in ascending order before locking: SELECT * FROM inventory WHERE id IN (...) ORDER BY id FOR UPDATE.',
    acceptableApproaches: ['Deterministic item ID sorting before locking', 'Optimistic concurrency control with version column'],
    failureConditions: ['Lock ordering still arbitrary across different routes', 'Deadlock retry loop without max retry limit causing thread starvation'],
    finalDeliverable: 'inventoryService.js with deterministic lock ordering and zero deadlock aborts.',
    evaluationCriteria: { deadlockPrevention: 40, concurrencyIntegrity: 30, testValidation: 30 },
    workplaceContext: 'High-Volume E-Commerce Inventory Concurrency',
    taskType: 'concurrency'
  },

  {
    id: 'BE-L3-002',
    title: 'Kafka Consumer Lag Spike & Partition Rebalance Storm',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Netflix / Video Telemetry Platform',
    department: 'Stream Processing & Real-Time Data',
    domain: 'Entertainment / Event Streaming & Kafka',
    skills: ['kafka', 'stream_processing', 'distributed_systems', 'concurrency'],
    coreCompetencies: ['kafka_tuning', 'consumer_lag_mitigation', 'rebalance_storm_defense'],
    secondarySkills: ['partition_assignment', 'backpressure'],
    skillTags: ['kafka', 'consumer_lag', 'rebalance', 'streaming', 'heartbeat'],
    situation: 'During prime-time streaming, Kafka consumer lag climbs to 450,000 unread messages and consumers repeatedly drop out of the consumer group, triggering continuous partition rebalances (Rebalance Storm).',
    problem: 'Each consumer batch processes 500 video events with slow synchronous database writes. The batch takes 35 seconds, exceeding max.poll.interval.ms (30s). Kafka coordinator marks the consumer dead and triggers a cluster-wide rebalance.',
    mission: 'Increase max.poll.interval.ms, reduce max.poll.records, parallelize worker processing using worker threads or async worker pools, and commit offsets asynchronously.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / KafkaJS / Apache Kafka' }
    },
    availableEvidence: [
      'Grafana alert: Kafka consumer group lag = 482,000 messages (Threshold > 50,000)',
      'Consumer log: CommitFailedException: The consumer was kicked out of the group because the time between calls to poll was longer than max.poll.interval.ms'
    ],
    subtasks: [
      {
        id: 'BE-L3-002-S1',
        title: 'Trace CommitFailedException & Rebalance Loop',
        objective: 'Analyze consumer logs and calculate message processing duration vs poll timeout.',
        instructions: 'Run `npm run test:kafka-lag` in terminal and observe the consumer group partition rebalance cascade.',
        expectedActions: ['Run Kafka consumer test in terminal', 'Measure 35-second batch execution exceeding 30-second poll interval'],
        successCriteria: ['Pinpointed CommitFailedException cause', 'Identified synchronous batch bottleneck'],
        evaluationCriteria: { streamAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L3-002-S2',
        title: 'Tune Consumer Config, Parallelize Batch & Heartbeat Keep-Alive',
        objective: 'Set max.poll.interval.ms: 120000, batch write to database with bulk insert, and commit offsets.',
        instructions: 'Update kafkaConsumer.js to tune consumer timeouts, parallelize message processing via bulk database insert, and verify lag drops to zero.',
        expectedActions: ['Update consumer configuration (maxPollInterval, batchSize)', 'Replace single-item DB writes with bulk insert UNNEST', 'Verify consumer group remains stable without rebalancing'],
        successCriteria: ['Consumer lag drained from 450k to 0 in under 3 minutes', 'Zero partition rebalances triggered during processing'],
        evaluationCriteria: { streamOptimization: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Asynchronous offset commit vs synchronous commit per batch', 'Cooperative Sticky assignor vs default eager range assignor'],
    pressureEvents: ['Data Science Lead: Live analytics telemetry delayed by 45 minutes due to consumer lag'],
    expectedSolution: 'Increase maxPollIntervalMs to 120s, reduce batchSize to 100, use bulk database insertion, use CooperativeStickyAssignor.',
    acceptableApproaches: ['Kafka configuration tuning with bulk database persistence', 'Decoupling poll loop from worker processing thread pool'],
    failureConditions: ['Committing offsets before messages are processed (risk of data loss)', 'Consumer still crashes on occasional heavy batches'],
    finalDeliverable: 'kafkaConsumer.js tuned for high-throughput stream processing without rebalance storms.',
    evaluationCriteria: { streamArchitecture: 40, performanceTuning: 30, testValidation: 30 },
    workplaceContext: 'High-Scale Event Stream Ingestion & Processing',
    taskType: 'stream_processing'
  },

  {
    id: 'BE-L3-003',
    title: 'Microservice Circuit Breaker Pattern & Cascading 504 Outage',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'DoorDash / Core Logistics & Dispatch',
    department: 'Microservices Reliability Engineering',
    domain: 'Food Delivery / Distributed Microservices',
    skills: ['microservices', 'resilience', 'circuit_breaker', 'distributed_systems'],
    coreCompetencies: ['fault_tolerance', 'circuit_breaker_pattern', 'cascading_failure_defense'],
    secondarySkills: ['opossum', 'fallback_strategies'],
    skillTags: ['circuit_breaker', 'cascading_failure', 'microservices', 'resilience', 'opossum'],
    situation: 'When an internal third-party geocoding service experiences 10-second latency, all 12 upstream dispatch microservices exhaust their HTTP connection pools, causing a site-wide cascading outage.',
    problem: 'Downstream microservice calls have 30-second timeouts without a circuit breaker. Threads and socket connections pile up waiting for the dead service, causing caller services to run out of memory.',
    mission: 'Implement an Opossum circuit breaker on downstream calls: trip to OPEN state after 50% failure rate, fail fast in 1ms with fallback cached data, and probe recovery via HALF-OPEN state.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Opossum / Express' }
    },
    availableEvidence: [
      'Zipkin distributed trace: Root cause geocoding-service took 10,400ms, propagating 504s to order-service and dispatch-service',
      'System outage: 12 microservices crashed with socket hangup and thread pool starvation'
    ],
    subtasks: [
      {
        id: 'BE-L3-003-S1',
        title: 'Simulate Downstream Geocoding Latency & Cascading Crash',
        objective: 'Inject 10-second latency into mock geocoding service and observe upstream services crash.',
        instructions: 'Run `npm test test/circuit-breaker.test.js` to observe thread pool exhaustion and cascading 504 errors.',
        expectedActions: ['Run cascading failure test in terminal', 'Observe caller services running out of socket connections'],
        successCriteria: ['Reproduced cascading outage across microservice boundaries', 'Identified absent fail-fast mechanism'],
        evaluationCriteria: { distributedDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L3-003-S2',
        title: 'Integrate Circuit Breaker with Fail-Fast Fallback',
        objective: 'Wrap geocodingClient in CircuitBreaker: timeout: 2000ms, errorThresholdPercentage: 50, resetTimeout: 10000ms.',
        instructions: 'Update geocodingService.js with Opossum circuit breaker, provide fallback cached geocode responses, and verify caller remains healthy.',
        expectedActions: ['Configure CircuitBreaker with 2s timeout and 50% error threshold', 'Implement fallback function returning approximate coordinates', 'Verify breaker trips to OPEN and fails fast in < 2ms', 'Rerun test suite'],
        successCriteria: ['Breaker trips to OPEN after 5 failures', 'Downstream failure does not degrade upstream order placement'],
        evaluationCriteria: { resilienceImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Returning cached approximate fallback vs failing with polite degradation error', 'Reset timeout threshold (10s vs 30s)'],
    pressureEvents: ['Incident Commander: Order checkout is failing across all major metropolitan markets'],
    expectedSolution: 'Wrap remote HTTP client in CircuitBreaker with 2s timeout, fallback handler returning default/cached value, monitor state transitions.',
    acceptableApproaches: ['Opossum circuit breaker library', 'Custom state machine implementing Closed/Open/Half-Open'],
    failureConditions: ['Circuit breaker never resets to Half-Open to test service recovery', 'Fallback function throws unhandled exception'],
    finalDeliverable: 'geocodingClient.js with resilient circuit breaker preventing cascading failures.',
    evaluationCriteria: { faultToleranceDesign: 40, architecturalResilience: 30, testValidation: 30 },
    workplaceContext: 'Distributed Microservices Resilience & Cascading Failure Defense',
    taskType: 'distributed_resilience'
  },

  {
    id: 'BE-L3-004',
    title: 'Sharded Database Read Replica Replication Lag & Stale Reads',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Twitter / Core Tweet Storage',
    department: 'Database Infrastructure & Scaling',
    domain: 'Social Media / Sharded Relational DB',
    skills: ['postgresql', 'read_replicas', 'replication_lag', 'distributed_systems'],
    coreCompetencies: ['read_replica_routing', 'replication_lag_mitigation', 'read_after_write_consistency'],
    secondarySkills: ['wal_lsn', 'connection_routing'],
    skillTags: ['read_replicas', 'replication_lag', 'stale_reads', 'read_your_writes', 'postgresql'],
    situation: 'Users posting a tweet and immediately viewing their profile complain that their new tweet is missing. When they refresh 3 seconds later, the tweet appears.',
    problem: 'The web app directs read queries to PostgreSQL read replicas to scale read throughput. When the replica experiences 2.8 seconds of replication lag (WAL apply lag), it serves stale reads.',
    mission: 'Implement Read-Your-Own-Writes consistency: route reads to the primary database for 5 seconds after a user write (or track Postgres LSN / GTID) before routing to replicas.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL Primary + Replica' }
    },
    availableEvidence: [
      'Metrics: PostgreSQL replication lag between primary and replica-02 is 3,400ms',
      'User bug reports: "I just posted an update and it disappeared from my profile!"'
    ],
    subtasks: [
      {
        id: 'BE-L3-004-S1',
        title: 'Reproduce Stale Read Post-Write in Replica Sandbox',
        objective: 'Execute write to primary followed immediately by read from replica with simulated 3s lag.',
        instructions: 'Run `npm test test/replication.test.js` to observe the read-after-write inconsistency.',
        expectedActions: ['Run replication lag test in terminal', 'Observe empty profile feed read immediately after tweet creation'],
        successCriteria: ['Reproduced stale read window', 'Identified naive round-robin replica connection routing'],
        evaluationCriteria: { replicationDiagnosis: 50, consistencyAnalysis: 50 }
      },
      {
        id: 'BE-L3-004-S2',
        title: 'Implement Read-Your-Writes Session Stickiness Router',
        objective: 'Set session cookie / Redis flag lastWriteTimestamp; if (now - lastWrite < 5000) route to primary, else replica.',
        instructions: 'Update dbRouter.js to inspect user session last-write timestamp and dynamically select primary vs replica pool.',
        expectedActions: ['Implement lastWriteTimestamp session tracking', 'Route queries to primary if within 5-second post-write window', 'Verify newly created tweets appear immediately for the author'],
        successCriteria: ['Author sees their own write instantly (100% read-your-writes consistency)', 'General public reads continue to load from replicas'],
        evaluationCriteria: { routerDesign: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Time-based heuristic stickiness (5 seconds) vs Exact WAL Log Sequence Number (LSN) tracking', 'Cookie header vs Redis session store for write timestamp'],
    pressureEvents: ['Product Director: Stale read complaints are the #1 source of user confusion this week'],
    expectedSolution: 'Track last_write_time per user; route author reads to primary if now - last_write < 5s; route non-author reads to replica.',
    acceptableApproaches: ['Time-based session stickiness to primary', 'Postgres LSN tracking with pg_last_wal_replay_lsn'],
    failureConditions: ['All traffic accidentally routed to primary, overwhelming primary database', 'Replicas never used'],
    finalDeliverable: 'dbRouter.js providing guaranteed Read-Your-Own-Writes consistency.',
    evaluationCriteria: { consistencyArchitecture: 40, routingEfficiency: 30, testValidation: 30 },
    workplaceContext: 'Distributed Database Read Replica Consistency',
    taskType: 'database_architecture'
  },

  {
    id: 'BE-L3-005',
    title: 'gRPC Microservice Multiplexing & Connection Keep-Alive Failure',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Square / Core Payment Switch',
    department: 'Internal RPC & High-Speed Networks',
    domain: 'Fintech / Low-Latency RPC',
    skills: ['grpc', 'http2', 'microservices', 'networking'],
    coreCompetencies: ['grpc_optimization', 'http2_multiplexing', 'keepalive_tuning'],
    secondarySkills: ['protobuf', 'connection_pooling'],
    skillTags: ['grpc', 'http2', 'keepalive', 'multiplexing', 'protobuf', 'latency'],
    situation: 'Internal gRPC payment authorization calls intermittently hang for 60 seconds before failing with UNAVAILABLE: GOAWAY received or socket closed.',
    problem: 'Load balancers silently drop idle TCP connections after 60 seconds. The gRPC client HTTP/2 connection pool sends requests on dead connections because keep-alive pings are disabled.',
    mission: 'Configure gRPC HTTP/2 keep-alive client parameters (grpc.keepalive_time_ms: 10000, grpc.keepalive_timeout_ms: 5000), enable channel pooling, and implement transparent retry.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / @grpc/grpc-js' }
    },
    availableEvidence: [
      'gRPC status: UNAVAILABLE (code 14): TCP connection reset by peer on idle channel',
      'AWS NLB metric: Idle connection timeout reached at 60 seconds, sending TCP RST'
    ],
    subtasks: [
      {
        id: 'BE-L3-005-S1',
        title: 'Trace Idle TCP Connection Drop on gRPC Channel',
        objective: 'Simulate 65-second idle gap between RPC calls and observe connection drop in test runner.',
        instructions: 'Run `npm test test/grpc.test.js` to observe the RPC hang on a dropped connection.',
        expectedActions: ['Run gRPC idle channel test in terminal', 'Capture 60-second hang and UNAVAILABLE status code'],
        successCriteria: ['Reproduced silent connection drop on idle gRPC channel', 'Identified missing HTTP/2 keepalive configuration'],
        evaluationCriteria: { networkAnalysis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L3-005-S2',
        title: 'Configure HTTP/2 Keepalive & Channel Subchannel Health',
        objective: 'Inject grpc.keepalive_time_ms: 15000 and grpc.keepalive_permit_without_calls: 1 into channel options.',
        instructions: 'Update grpcClient.js with hardened channel options, add transparent reconnection handler, and verify RPC calls succeed after idle periods.',
        expectedActions: ['Update gRPC client channel options with keepalive parameters', 'Configure retry policy for UNAVAILABLE status', 'Verify RPC resolves in < 15ms even after 90s idle'],
        successCriteria: ['Active HTTP/2 ping keep-alives maintain connection through NLB', 'Zero dropped calls or 60s timeout hangs'],
        evaluationCriteria: { grpcConfiguration: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Keepalive ping interval (10s vs 30s) balancing network chatter vs timeout defense', 'Client-side round-robin load balancing vs NLB routing'],
    pressureEvents: ['Payment authorization p99 latency spiked from 25ms to 60,000ms'],
    expectedSolution: 'Set channel options: { "grpc.keepalive_time_ms": 10000, "grpc.keepalive_timeout_ms": 5000, "grpc.keepalive_permit_without_calls": 1 }.',
    acceptableApproaches: ['HTTP/2 keepalive client options', 'Channel recreation on UNAVAILABLE with exponential backoff'],
    failureConditions: ['Sending pings too frequently triggering GOAWAY ENHANCE_YOUR_CALM from server', 'Channel permanently closed on single network blip'],
    finalDeliverable: 'grpcClient.js with hardened HTTP/2 keepalive configuration and zero dropped connections.',
    evaluationCriteria: { rpcHygiene: 40, networkTuning: 30, testValidation: 30 },
    workplaceContext: 'Low-Latency Enterprise gRPC Microservice Mesh',
    taskType: 'rpc_networking'
  },

  {
    id: 'BE-L3-006',
    title: 'Distributed Tracing & OpenTelemetry Trace Context Propagation',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Uber / Observability Platforms',
    department: 'Distributed Tracing & APM',
    domain: 'Enterprise Cloud / Telemetry & APM',
    skills: ['observability', 'opentelemetry', 'distributed_tracing', 'microservices'],
    coreCompetencies: ['distributed_tracing', 'opentelemetry_instrumentation', 'context_propagation'],
    secondarySkills: ['w3c_traceparent', 'jaeger'],
    skillTags: ['opentelemetry', 'distributed_tracing', 'traceparent', 'observability', 'microservices'],
    situation: 'When an order fails across a 5-microservice chain, the trace is broken in Jaeger into 5 disconnected orphan spans because the HTTP and Kafka headers omit the W3C traceparent context.',
    problem: 'Microservices make outgoing HTTP and message requests without extracting and injecting the W3C `traceparent` header (`00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`), severing the distributed trace.',
    mission: 'Implement automatic OpenTelemetry context propagation across HTTP (Axios/fetch) and Kafka producers/consumers, connecting disparate spans into a unified end-to-end distributed trace.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / OpenTelemetry SDK' }
    },
    availableEvidence: [
      'Jaeger dashboard: 5 disconnected root traces for a single order transaction',
      'Missing headers: Outgoing HTTP request to PaymentService lacks traceparent header'
    ],
    subtasks: [
      {
        id: 'BE-L3-006-S1',
        title: 'Audit Broken Trace Context Across Service Boundaries',
        objective: 'Trace a synthetic request through API Gateway -> Order Service -> Payment Service in test environment.',
        instructions: 'Run `npm test test/tracing.test.js` to observe orphan trace generation.',
        expectedActions: ['Run distributed trace test in terminal', 'Identify missing traceparent header in outgoing HTTP call'],
        successCriteria: ['Documented broken trace links across service boundaries', 'Identified absent OpenTelemetry propagator'],
        evaluationCriteria: { tracingAudit: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L3-006-S2',
        title: 'Instrument W3C Propagator in Outbound HTTP & Message Queues',
        objective: 'Use propagation.inject(context.active(), headers) on outgoing calls and propagation.extract on incoming.',
        instructions: 'Update tracing.js and httpClient.js to inject W3C traceparent headers on outbound requests, and verify unified trace in test runner.',
        expectedActions: ['Configure W3CTraceContextPropagator in OpenTelemetry SDK', 'Inject traceparent header into Axios outbound request', 'Extract traceparent header in Express middleware', 'Verify single trace ID connects all spans'],
        successCriteria: ['All 5 microservice spans share the same root trace ID', 'End-to-end latency waterfall visible in Jaeger'],
        evaluationCriteria: { otelImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Automatic SDK auto-instrumentation vs manual header injection', 'Sampling rate strategy (100% in staging vs 5% adaptive in production)'],
    pressureEvents: ['CTO directive: All microservices must emit connected distributed traces before Q4 launch'],
    expectedSolution: 'Initialize OpenTelemetry with W3CTraceContextPropagator; inject active context into outgoing headers: propagation.inject(context.active(), req.headers).',
    acceptableApproaches: ['OpenTelemetry SDK auto-instrumentation', 'Manual W3C traceparent header formatting and extraction'],
    failureConditions: ['Trace ID regenerated at each microservice boundary', 'Asynchronous context lost across un-instrumented promise callbacks'],
    finalDeliverable: 'tracing.js and httpClient.js ensuring 100% end-to-end trace continuity.',
    evaluationCriteria: { telemetryHygiene: 40, distributedObservability: 30, testValidation: 30 },
    workplaceContext: 'Enterprise Distributed Tracing & Observability',
    taskType: 'observability'
  },

  {
    id: 'BE-L3-007',
    title: 'Multi-Region Data Consistency & Saga Pattern Orchestration',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'Airbnb / Reservation & Booking Infrastructure',
    department: 'Distributed Systems & Transactions',
    domain: 'Hospitality / Distributed Transactions',
    skills: ['distributed_patterns', 'saga_pattern', 'data_consistency', 'resilience'],
    coreCompetencies: ['saga_orchestration', 'compensating_transactions', 'distributed_consistency'],
    secondarySkills: ['state_machines', 'event_choreography'],
    skillTags: ['saga_pattern', 'compensating_transactions', 'distributed_systems', 'consistency'],
    situation: 'When a traveler books a reservation, the system charges the credit card, reserves the room, and awards loyalty points. If the room reservation fails, the credit card charge is never refunded, leaving customer balances debited.',
    problem: 'The booking flow spans 3 independent microservices (Billing, Inventory, Loyalty) without a distributed transaction orchestrator (Saga Pattern) or compensating transactions to rollback partial failures.',
    mission: 'Implement an Orchestrated Saga: coordinate BookingSaga state machine, execute compensating transactions (refund credit card, cancel reservation) when any downstream step fails.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / PostgreSQL' }
    },
    availableEvidence: [
      'Customer dispute: Credit card charged $1,200 for Paris hotel, but reservation was rejected for full capacity',
      'Inconsistency rate: 1.4% of failed bookings leave orphaned charges'
    ],
    subtasks: [
      {
        id: 'BE-L3-007-S1',
        title: 'Simulate Step Failure in Distributed Booking Workflow',
        objective: 'Trigger inventory rejection after payment authorization in test environment.',
        instructions: 'Run `npm test test/saga.test.js` to observe the orphaned credit card charge on booking failure.',
        expectedActions: ['Run saga test suite in terminal', 'Verify payment remains charged when inventory rejects reservation'],
        successCriteria: ['Reproduced partial state failure in distributed workflow', 'Identified absent compensating transaction'],
        evaluationCriteria: { workflowDiagnosis: 50, consistencyAnalysis: 50 }
      },
      {
        id: 'BE-L3-007-S2',
        title: 'Build Saga Orchestrator & Compensating Rollback Steps',
        objective: 'Write BookingSaga.js: execute Payment -> Inventory -> Loyalty; on error, trigger CompensatePayment() in reverse.',
        instructions: 'Implement state machine orchestrating forward steps and compensating backwards steps, verifying clean rollback on any failure.',
        expectedActions: ['Implement BookingSaga state machine', 'Define forward step execution and compensating rollback handlers', 'Verify credit card is refunded immediately if inventory fails', 'Run full saga test suite'],
        successCriteria: ['Failed booking triggers automated refund in < 500ms', 'Zero orphaned charges or inconsistent state across services'],
        evaluationCriteria: { sagaImplementation: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Orchestrated Saga (central coordinator) vs Choreographed Saga (event-driven pub/sub)', 'Synchronous compensation vs queued asynchronous compensation'],
    pressureEvents: ['Customer satisfaction crisis: Executive escalation regarding un-refunded booking errors'],
    expectedSolution: 'Build Saga orchestrator that tracks completed steps array; on error in Step N, iterate completed steps in reverse to execute compensating rollback.',
    acceptableApproaches: ['Orchestrated Saga state machine with step array', 'XState-driven workflow orchestrator'],
    failureConditions: ['Compensating transaction itself fails without retry mechanism', 'Forward execution continues after step failure'],
    finalDeliverable: 'BookingSaga.js with guaranteed compensating rollback and zero orphaned charges.',
    evaluationCriteria: { distributedArchitecture: 40, transactionalSafety: 30, testValidation: 30 },
    workplaceContext: 'Distributed Transactions & Saga Pattern Orchestration',
    taskType: 'distributed_transactions'
  },

  {
    id: 'BE-L3-008',
    title: 'High-Throughput Memory Leak in Node.js Event Loop Heap',
    role: 'backend',
    level: 3,
    difficulty: 'Advanced',
    company: 'PayPal / Node.js Platform Runtime',
    department: 'Core Runtime & Performance Engineering',
    domain: 'Fintech / High-Throughput Node.js Runtime',
    skills: ['profiling', 'memory_management', 'v8_heap', 'nodejs'],
    coreCompetencies: ['memory_leak_profiling', 'v8_heap_analysis', 'event_loop_tuning'],
    secondarySkills: ['heap_snapshots', 'closures'],
    skillTags: ['memory_leak', 'v8_heap', 'heap_snapshot', 'nodejs', 'profiling'],
    situation: 'Node.js backend instances running at 1,500 RPS suffer from gradual memory accumulation: RSS grows by 15MB/minute until the container exceeds its 1GB limit and crashes with OOMKilled (Exit Code 137).',
    problem: 'A global metrics cache `const requestMetrics = {}` accumulates user request timestamps in memory without TTL or eviction, and an unclosed EventEmitter attaches listeners continuously inside route handlers.',
    mission: 'Capture and compare V8 heap snapshots in Chrome DevTools/clinic.js, locate the retaining path of the memory leak, replace unbounded object with LRU cache, and clean up event listeners.',
    workspace: {
      tools: ['editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / V8 Inspector' }
    },
    availableEvidence: [
      'Kubernetes alert: Pod restarted 14 times in 24 hours with OOMKilled (exit code 137)',
      'Heap snapshot comparison: Object count for RequestTelemetry grew from 2,000 to 850,000'
    ],
    subtasks: [
      {
        id: 'BE-L3-008-S1',
        title: 'Capture Heap Snapshots & Identify Retaining Tree',
        objective: 'Run memory profiling load test and compare Baseline vs Load heap snapshots.',
        instructions: 'Run `npm run profile:heap` in terminal and inspect the snapshot retaining paths in the inspector report.',
        expectedActions: ['Generate two heap snapshots under simulated traffic', 'Identify RequestTelemetry object retaining 450MB of memory'],
        successCriteria: ['Pinpointed global requestMetrics dictionary as primary leak source', 'Identified unclosed EventEmitter listener accumulation'],
        evaluationCriteria: { profilingTechnique: 50, rootCauseIsolation: 50 }
      },
      {
        id: 'BE-L3-008-S2',
        title: 'Implement LRU Eviction & Event Listener Removal',
        objective: 'Replace unbounded object with lru-cache (max: 1000 items, ttl: 60s) and remove event listeners on finish.',
        instructions: 'Update metricsCollector.js to use bounded LRU cache, add req.on("finish", cleanup) to release listeners, and verify flat memory footprint.',
        expectedActions: ['Replace global dictionary with bounded LRU cache', 'Remove event listeners in req.on("close")', 'Rerun 10-minute load test and verify memory stabilizes at < 120MB'],
        successCriteria: ['Memory RSS stays completely flat under sustained 1,500 RPS load', 'Zero container OOM restarts'],
        evaluationCriteria: { leakResolution: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['LRU Cache in-memory vs offloading metrics to external Prometheus/StatsD daemon', 'WeakMap/WeakRef for session metadata'],
    pressureEvents: ['Production cluster scaling costs doubled due to pods continually crashing and restarting'],
    expectedSolution: 'Use lru-cache with max: 5000 and ttl: 60_000ms; avoid attaching persistent listeners inside request scope; run garbage collection test.',
    acceptableApproaches: ['Bounded LRU cache with time-to-live eviction', 'Streaming metrics directly to StatsD UDP socket without in-memory buffering'],
    failureConditions: ['Memory continues climbing past 500MB', 'Metrics dropped prematurely due to too-small cache limit'],
    finalDeliverable: 'metricsCollector.js with bounded memory footprint and zero memory leakage.',
    evaluationCriteria: { memoryStability: 40, profilingAccuracy: 30, testValidation: 30 },
    workplaceContext: 'High-Throughput Node.js Memory Profiling & Stabilization',
    taskType: 'performance'
  },

  // ========================================================
  // LEVEL 4: CRITICAL INCIDENT SIMULATION (8 TASKS, 16 SUBTASKS)
  // ========================================================
  {
    id: 'BE-L4-001',
    title: 'Core Payment Database Primary Failover & Split-Brain Prevention',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Stripe / Core Ledger Infrastructure',
    department: 'Site Reliability Engineering & Database Core',
    domain: 'Fintech / Mission-Critical Database Failover',
    skills: ['postgresql', 'patroni', 'high_availability', 'incident_response'],
    coreCompetencies: ['database_failover', 'split_brain_prevention', 'crisis_management'],
    secondarySkills: ['etcd_quorum', 'connection_fencing'],
    skillTags: ['failover', 'split_brain', 'postgresql', 'patroni', 'critical_outage'],
    situation: 'At 03:22 UTC, the primary PostgreSQL database node suffers a hardware kernel panic. Automated HA tooling attempts failover, but both the old primary and new primary believe they are leader, threatening catastrophic split-brain data divergence.',
    problem: 'Consul/Etcd leader lease timed out but the old primary node did not fence itself (missing STONITH / watchdog fencing), accepting writes while replica-01 was promoted to primary.',
    mission: 'Triage the split-brain hazard immediately: fence the old primary to read-only, promote replica-01 as the sole authoritative primary, reconcile write transaction IDs, and restore payment ledger processing.',
    workspace: {
      tools: ['slack', 'editor', 'terminal'],
      environment: { runtime: 'Linux / PostgreSQL 16 / Patroni HA' }
    },
    availableEvidence: [
      '[WAR ROOM] PagerDuty P1: Database Split-Brain Detected: Both db-primary-01 and db-replica-01 accepting writes',
      'Transaction mismatch: 14 transactions committed on db-primary-01 not present on db-replica-01'
    ],
    subtasks: [
      {
        id: 'BE-L4-001-S1',
        title: 'Triage Split-Brain State & Issue Immediate Node Fence',
        objective: 'Inspect cluster state via Patroni CLI, identify conflicting primaries, and demote old primary to read-only.',
        instructions: 'Run `patronictl -c /etc/patroni.yml list` in terminal and issue immediate fence command to old primary node.',
        expectedActions: ['Inspect Patroni cluster status in terminal', 'Identify dual leader state', 'Execute fencing / demote command on db-primary-01', 'Post status update in war room'],
        successCriteria: ['Old primary demoted within 2 minutes', 'Further diverging writes completely blocked'],
        evaluationCriteria: { triageSpeed: 50, fencingAction: 50 }
      },
      {
        id: 'BE-L4-001-S2',
        title: 'Reconcile Divergent Transactions & Complete Failover',
        objective: 'Extract WAL divergence log, replay 14 orphaned transactions onto new primary, and update connection strings.',
        instructions: 'Execute reconciliation script in terminal, verify single authoritative primary, update backend connection pool, and verify payment processing.',
        expectedActions: ['Run transaction reconciliation script', 'Promote db-replica-01 to clean primary', 'Update backend DB_HOST to VIP / promoted node', 'Verify payment transactions succeed'],
        successCriteria: ['Zero lost financial transactions', 'Single healthy primary running with all replicas in sync'],
        evaluationCriteria: { dataReconciliation: 50, recoveryVerification: 50 }
      }
    ],
    decisionPoints: ['Automated fast failover vs human verification before promotion', 'Rewind old primary via pg_rewind vs complete node rebuild'],
    pressureEvents: ['CFO in Slack: "Every minute of payment ledger downtime costs $120,000. Is customer data safe?"'],
    expectedSolution: 'Fence old node immediately: patronictl pause / pg_ctl stop; promote candidate with highest LSN; apply pg_rewind to old node; resume cluster.',
    acceptableApproaches: ['Patroni cluster reconciliation and fencing', 'Manual pg_ctl promote with strict node fencing'],
    failureConditions: ['Allowing divergent writes to continue on both nodes', 'Promoting a replica that was 10,000 transactions behind primary'],
    finalDeliverable: 'Reconciled database cluster with verified single primary and zero data loss.',
    evaluationCriteria: { splitBrainContainment: 40, dataLedgerIntegrity: 30, crisisExecution: 30 },
    workplaceContext: 'P1 Mission-Critical Relational Database Failover',
    taskType: 'production_incident'
  },

  {
    id: 'BE-L4-002',
    title: 'Massive Stripe Webhook Surge & Worker OOM Cascade',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Shopify / Flash Sale Operations',
    department: 'Event Streaming & Worker Reliability',
    domain: 'E-Commerce / High-Velocity Messaging',
    skills: ['bullmq', 'redis', 'memory_management', 'capacity_engineering'],
    coreCompetencies: ['queue_backpressure', 'oom_mitigation', 'rate_limiting'],
    secondarySkills: ['pod_autoscaling', 'memory_limits'],
    skillTags: ['oom_killed', 'webhook_surge', 'bullmq', 'redis', 'backpressure'],
    situation: 'During a celebrity merchandise flash sale, Stripe dispatches 85,000 webhooks in 3 minutes. Worker pods download 20,000 jobs into memory simultaneously, causing all 8 worker pods to crash with OOMKilled.',
    problem: 'BullMQ workers have concurrency: 500 without a memory ceiling or prefetch limit, reading massive payloads into Node.js heap faster than database writes can flush, exhausting pod memory.',
    mission: 'Triage the failing worker cluster, configure BullMQ prefetch backpressure (limiter: { max: 100 }), throttle concurrency per pod to 25, and scale worker deployment to drain the 80k backlog safely.',
    workspace: {
      tools: ['slack', 'editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / BullMQ / Redis / Kubernetes' }
    },
    availableEvidence: [
      'Kubernetes event: 8/8 worker-deployment pods status: OOMKilled (Exit Code 137, Memory > 2GiB)',
      'Redis memory: 4.8GB / 5.0GB capacity reached in Redis queue'
    ],
    subtasks: [
      {
        id: 'BE-L4-002-S1',
        title: 'Triage Worker CrashLoop & Diagnose Ingestion Overflow',
        objective: 'Analyze pod restart logs and inspect Redis queue depth in terminal.',
        instructions: 'Run `kubectl describe pods -l app=webhook-worker` and inspect queue backlog in Redis CLI.',
        expectedActions: ['Inspect pod OOMKilled events in terminal', 'Identify unlimited prefetch and memory exhaustion'],
        successCriteria: ['Identified that prefetch concurrency of 500 flooded 2GB heap', 'Documented 85k pending queue backlog'],
        evaluationCriteria: { triageProficiency: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L4-002-S2',
        title: 'Implement Backpressure Limiting & Restore Cluster Draining',
        objective: 'Configure concurrency: 25, add BullMQ rate limiter, and restart workers with memory limit safety.',
        instructions: 'Update worker.js to enforce concurrency: 25, add backpressure pacing, redeploy pods, and monitor backlog draining.',
        expectedActions: ['Update BullMQ worker concurrency to 25', 'Add queue pacing limiter', 'Restart worker deployment in terminal', 'Verify queue drains with 0 OOM crashes'],
        successCriteria: ['Worker pods remain healthy at < 400MB RAM', 'Queue backlog of 85k jobs drained in < 8 minutes'],
        evaluationCriteria: { backpressureArchitecture: 50, incidentRemediation: 50 }
      }
    ],
    decisionPoints: ['Drop non-essential webhooks vs queue pacing with backpressure', 'Scale pod count vs reduce worker concurrency'],
    pressureEvents: ['Redis alert: Memory at 96% capacity. If Redis runs out of memory, all pending webhooks will be lost'],
    expectedSolution: 'Limit worker concurrency to 25 per pod, configure BullMQ limiter, scale to 12 pods, stream payloads instead of buffering in memory.',
    acceptableApproaches: ['BullMQ backpressure rate limiter with controlled concurrency', 'Pacing worker loop with batch size constraints'],
    failureConditions: ['Increasing pod count without fixing concurrency, causing all new pods to also OOM crash', 'Dropping unacknowledged payment webhooks'],
    finalDeliverable: 'worker.js tuned for backpressure stability, draining the surge without memory exhaustion.',
    evaluationCriteria: { capacityEngineering: 40, faultRecovery: 30, testValidation: 30 },
    workplaceContext: 'High-Volume Webhook Surge Capacity Emergency',
    taskType: 'capacity_engineering'
  },

  {
    id: 'BE-L4-003',
    title: 'Upstream Banking Core API Outage: Circuit Breaking & Offline Ledger',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Robinhood / Cash Management & Transfer Desk',
    department: 'Banking Integrations & Core Ledger',
    domain: 'Fintech / Banking Partner Integration',
    skills: ['circuit_breaker', 'offline_ledger', 'resilience', 'incident_response'],
    coreCompetencies: ['banking_integration', 'offline_ledger', 'graceful_degradation'],
    secondarySkills: ['idempotency', 'audit_logging'],
    skillTags: ['banking_api', 'circuit_breaker', 'offline_spooling', '503_outage', 'fintech'],
    situation: 'Our primary partner bank API (JPMorgan Chase ACH Core) suffers an unannounced 2-hour outage returning HTTP 503. User deposit and withdrawal requests are throwing fatal exceptions.',
    problem: 'Bank transfer service lacks an asynchronous offline settlement queue. Dispatched requests fail immediately instead of being held in an audited ledger queue for automatic replay once the bank recovers.',
    mission: 'Engage circuit breaker on banking API, spool pending deposit/withdrawal requests into an audited offline settlement ledger, and notify users of delayed settlement without failing transfers.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'jira'],
      environment: { runtime: 'Node.js v20 / PostgreSQL' }
    },
    availableEvidence: [
      'Banking partner status: Chase ACH Core Down - All REST and SFTP endpoints returning 503',
      'Failed transactions: 4,800 bank transfer requests failed in 30 minutes'
    ],
    subtasks: [
      {
        id: 'BE-L4-003-S1',
        title: 'Triage Bank Outage & Activate Circuit Breaker Fallback',
        objective: 'Confirm banking 503 status in terminal, verify API partner outage, and engage emergency circuit breaker.',
        instructions: 'Check partner health endpoint in terminal, verify 503 status, and switch bank integration to DEGRADED_OFFLINE mode.',
        expectedActions: ['Run curl health check against partner bank API', 'Toggle banking circuit breaker to OPEN in config', 'Post status update in #war-room-banking'],
        successCriteria: ['Confirmed 100% banking failure', 'Circuit breaker engaged to prevent hammering dead bank API'],
        evaluationCriteria: { triageSpeed: 50, communication: 50 }
      },
      {
        id: 'BE-L4-003-S2',
        title: 'Implement Audited Offline Settlement Ledger Queue',
        objective: 'Route pending transfer requests to pending_ach_transfers table and provide user delayed confirmation.',
        instructions: 'Update transferService.js: record transfer in local database with status "queued_for_clearing", return user success with "Processing within 24h" note, and build auto-drain worker.',
        expectedActions: ['Update transferService.js to spool transactions to database', 'Return user confirmation with pending settlement status', 'Build settlementReplayWorker to auto-drain when partner recovers', 'Verify zero transaction loss'],
        successCriteria: ['Customers can schedule transfers without seeing error screens', '100% of spooled transfers queued safely for replay'],
        evaluationCriteria: { financialArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Block transfer requests entirely vs accept and spool offline', 'Set transfer limit during offline mode to reduce credit risk'],
    pressureEvents: ['Head of Trading: "Do not display error screens. Customers will panic if they cannot initiate deposits."'],
    expectedSolution: 'Trip circuit breaker on banking API; accept user requests, validate account balance, write to offline_ach_ledger; replay once partner recovers.',
    acceptableApproaches: ['Offline ledger table with state machine replay worker', 'Encrypted message queue spooling to persistent storage'],
    failureConditions: ['Allowing withdrawals without balance check during offline mode', 'Failing requests with raw bank 503 error'],
    finalDeliverable: 'transferService.js and settlementReplayWorker.js providing seamless offline financial continuity.',
    evaluationCriteria: { financialContinuity: 40, architecturalResilience: 30, testValidation: 30 },
    workplaceContext: 'Banking Integration Resilience & Offline Spooling',
    taskType: 'financial_resilience'
  },

  {
    id: 'BE-L4-004',
    title: 'Critical Insecure Direct Object Reference (IDOR) on Invoices Endpoint',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Salesforce / Enterprise Billing Platform',
    department: 'Application Security & Enterprise Auth',
    domain: 'Enterprise SaaS / Access Control Security',
    skills: ['security', 'idor_remediation', 'authorization', 'database_isolation'],
    coreCompetencies: ['access_control', 'idor_mitigation', 'appsec'],
    secondarySkills: ['rbac', 'multi_tenant_security'],
    skillTags: ['idor', 'cve', 'security_breach', 'authorization', 'critical'],
    situation: 'A security breach report reveals that an authenticated user can access any other customer\'s confidential invoices and tax documents simply by incrementing the ID in the URL: `/api/v1/invoices/1042`.',
    problem: 'The endpoint executes `SELECT * FROM invoices WHERE id = $1` without verifying that `invoice.organization_id === req.user.organization_id`, failing multi-tenant authorization.',
    mission: 'Immediately deploy an authorization security patch enforcing tenant organization boundaries on all invoice queries, audit access logs for exfiltrated invoice IDs, and deploy automated security tests.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'git'],
      environment: { runtime: 'Node.js v20 / PostgreSQL / Express' }
    },
    availableEvidence: [
      'Bug bounty report: Researcher accessed 40 Fortune 500 invoice records by iterating integer IDs 1000..1040',
      'CVSS Score: 8.8 (High Severity IDOR - Broken Object Level Authorization)'
    ],
    subtasks: [
      {
        id: 'BE-L4-004-S1',
        title: 'Reproduce IDOR Breach & Quantify Historical Exposure',
        objective: 'Test cross-tenant invoice retrieval in test runner and query access logs for unauthorized IDs.',
        instructions: 'Run `npm test test/idor.test.js` to observe User A accessing User B\'s invoice data.',
        expectedActions: ['Run security test in terminal', 'Confirm that query omits organization_id filter', 'Inspect logs for range iteration pattern'],
        successCriteria: ['Confirmed IDOR vulnerability across all invoice routes', 'Identified exposed customer organizations'],
        evaluationCriteria: { securityAudit: 50, breachQuantification: 50 }
      },
      {
        id: 'BE-L4-004-S2',
        title: 'Enforce Tenant-Scoped Query Isolation & UUID Identifiers',
        objective: 'Update SQL queries to enforce `WHERE id = $1 AND organization_id = $2`, and replace serial IDs with UUIDs.',
        instructions: 'Update invoiceService.js to require req.user.organization_id on all queries, return 404 for unowned resources, and verify security test suite passes.',
        expectedActions: ['Update all SQL queries to enforce organization_id = req.user.organization_id', 'Return 404 instead of 403 to prevent ID enumeration', 'Replace sequential integer IDs with UUIDv4', 'Run security regression tests'],
        successCriteria: ['100% of cross-tenant access attempts return 404', 'Zero data leakage between tenant organizations'],
        evaluationCriteria: { authorizationFix: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Returning 404 Not Found vs 403 Forbidden on unowned ID (404 prevents ID enumeration)', 'Row-Level Security (RLS) in PostgreSQL vs application-level authorization guards'],
    pressureEvents: ['Chief Legal Officer: "We have 24 hours to patch and notify affected customers under regulatory compliance"'],
    expectedSolution: 'Always enforce organization_id check: db.query("SELECT * FROM invoices WHERE id = $1 AND organization_id = $2", [id, req.user.orgId]); return 404 if null.',
    acceptableApproaches: ['Application-level tenant scoped queries with 404 response', 'PostgreSQL Row-Level Security (RLS) policies on tenant tables'],
    failureConditions: ['Endpoint still relies only on invoice ID without organization check', 'Leaking organization existence via differing error codes'],
    finalDeliverable: 'Hardened invoiceService.js with strict tenant scoping and verified IDOR defense.',
    evaluationCriteria: { accessControlHardening: 40, vulnerabilityRemediation: 30, testValidation: 30 },
    workplaceContext: 'Critical Application Security IDOR Breach Response',
    taskType: 'security'
  },

  {
    id: 'BE-L4-005',
    title: 'Distributed Lock Leaking & Deadlock in Cluster Worker Pods',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Uber / Global Pricing & Surge Engine',
    department: 'Core Infrastructure & Distributed Algorithms',
    domain: 'Mobility / Distributed Coordination',
    skills: ['distributed_systems', 'redis', 'redlock', 'concurrency'],
    coreCompetencies: ['distributed_locks', 'redlock_algorithm', 'fencing_tokens'],
    secondarySkills: ['lock_ttl', 'process_crashes'],
    skillTags: ['distributed_lock', 'redlock', 'redis', 'deadlock', 'fencing_token'],
    situation: 'During surge price recalculations, worker pods crash or lose network connectivity while holding Redis distributed locks. The lock is never released, permanently freezing surge calculations for 40 major cities.',
    problem: 'Distributed lock acquisition uses SET key val NX without a mandatory expiration TTL (or with an infinite timeout), and lacks a fencing token to reject late writes from partitioned workers.',
    mission: 'Implement the Redlock algorithm with mandatory lease TTL, background heartbeat lock extension, and monotonically increasing fencing tokens to prevent zombie writes.',
    workspace: {
      tools: ['slack', 'editor', 'terminal'],
      environment: { runtime: 'Node.js v20 / Redis / Redlock' }
    },
    availableEvidence: [
      'Surge engine telemetry: Pricing calculations frozen for NYC, Chicago, and Miami for 45 minutes',
      'Redis keys: lock:surge:nyc held by worker-pod-42 (pod terminated 40 minutes ago)'
    ],
    subtasks: [
      {
        id: 'BE-L4-005-S1',
        title: 'Inspect Abandoned Redis Locks & Worker Crash Failure',
        objective: 'Simulate worker process SIGKILL while holding distributed lock in test environment.',
        instructions: 'Run `npm test test/distributed-lock.test.js` to observe permanent lock freeze when worker crashes.',
        expectedActions: ['Run distributed lock test in terminal', 'Verify that crashed worker leaves lock key in Redis without expiration'],
        successCriteria: ['Reproduced permanent lock freeze on worker crash', 'Identified missing TTL lease parameter'],
        evaluationCriteria: { distributedDiagnosis: 50, rootCauseDetail: 50 }
      },
      {
        id: 'BE-L4-005-S2',
        title: 'Deploy Redlock with Lease TTL & Fencing Tokens',
        objective: 'Implement Redlock with 10s TTL, auto-extending heartbeat timer, and monotonic fencing token verification.',
        instructions: 'Update lockManager.js: acquire lock with TTL, start heartbeat renewal timer, release via atomic Lua script checking value, and attach fencing token.',
        expectedActions: ['Implement atomic lock acquisition with TTL (SET NX PX)', 'Add lock heartbeat auto-extension timer', 'Implement atomic unlock Lua script', 'Enforce fencing tokens on database writes'],
        successCriteria: ['Lock auto-expires in 10s if worker crashes, allowing healthy pods to resume', 'Late writes from partitioned workers rejected by fencing token'],
        evaluationCriteria: { redlockArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Redlock across multiple independent Redis masters vs single master with Sentinel', 'Fencing tokens in database vs optimistic version locking'],
    pressureEvents: ['Operations VP: Surge pricing is flat at 1.0x in peak transit hours, causing driver shortage'],
    expectedSolution: 'Acquire lock with SET lock_key token NX PX 10000; extend via timer; release with Lua script: if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end.',
    acceptableApproaches: ['Redlock with auto-extending lease and Lua release', 'PostgreSQL pg_try_advisory_lock with connection lifecycle'],
    failureConditions: ['Worker deletes another worker\'s lock by calling DEL directly', 'Lock held indefinitely if worker thread hangs'],
    finalDeliverable: 'lockManager.js providing crash-resilient distributed locking with fencing token protection.',
    evaluationCriteria: { distributedAlgorithmCorrectness: 40, resilience: 30, testValidation: 30 },
    workplaceContext: 'Distributed Coordination & Locking Architecture',
    taskType: 'distributed_systems'
  },

  {
    id: 'BE-L4-006',
    title: 'Redis Master Eviction Storm & Cache Avalanche Cascade',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Pinterest / Feed & Home Stream Core',
    department: 'Cache Platforms & Infrastructure',
    domain: 'Social Media / Extreme Scale Caching',
    skills: ['redis', 'caching', 'capacity_engineering', 'incident_response'],
    coreCompetencies: ['cache_avalanche_defense', 'memory_eviction_tuning', 'redis_administration'],
    secondarySkills: ['circuit_breaking', 'cache_warmup'],
    skillTags: ['cache_avalanche', 'redis_eviction', 'maxmemory', 'allkeys_lru', 'outage'],
    situation: 'The primary Redis cluster hits its 32GB maxmemory ceiling. Eviction policy is set to noeviction, causing Redis to reject all write commands with OOM command not allowed when used memory > maxmemory, crashing upstream services.',
    problem: 'Unbounded key growth without TTLs exhausted memory. When Redis rejected writes, session stores and feed caches crashed, and incoming read traffic bypassed the cache directly into PostgreSQL, taking down the database.',
    mission: 'Change eviction policy to volatile-lru, identify and delete runaway unbounded keys using Redis CLI, warm cache with high-priority keys, and configure TTL enforcement.',
    workspace: {
      tools: ['slack', 'editor', 'terminal'],
      environment: { runtime: 'Redis 7.2 / Linux' }
    },
    availableEvidence: [
      'Redis log: OOM command not allowed when used memory > maxmemory (32.0GB / 32.0GB)',
      'PostgreSQL database: Connection pool maxed out (100% CPU) due to Cache Avalanche'
    ],
    subtasks: [
      {
        id: 'BE-L4-006-S1',
        title: 'Triage Redis Memory Exhaustion & Identify Rogue Keyspaces',
        objective: 'Run Redis memory analysis commands in terminal and isolate runaway key prefixes.',
        instructions: 'Execute `redis-cli --bigkeys` and `redis-cli memory usage` in terminal to identify the keys consuming 24GB of RAM.',
        expectedActions: ['Run bigkeys and memory usage commands in terminal', 'Identify analytics:temp:* prefix consuming 75% of memory with no TTL'],
        successCriteria: ['Identified rogue un-expiring analytics keys', 'Quantified 32GB memory saturation'],
        evaluationCriteria: { triageAccuracy: 50, memoryAnalysis: 50 }
      },
      {
        id: 'BE-L4-006-S2',
        title: 'Purge Rogue Keys, Update Eviction Policy & Enforce TTLs',
        objective: 'Scan and delete rogue keys with UNLINK, set maxmemory-policy volatile-lru, and enforce mandatory TTLs.',
        instructions: 'Update redis.conf to volatile-lru, run unlink script on rogue keys, patch backend code to enforce TTLs on all SET calls, and verify memory drops to 12GB.',
        expectedActions: ['Execute non-blocking UNLINK on rogue key prefix', 'Update eviction policy to volatile-lru', 'Enforce mandatory TTL in redisClient.js', 'Verify database CPU returns to normal < 20%'],
        successCriteria: ['Redis memory drops from 32GB to 11.4GB', 'Database recovers from Cache Avalanche'],
        evaluationCriteria: { recoveryExecution: 50, architecturalPrevention: 50 }
      }
    ],
    decisionPoints: ['allkeys-lru vs volatile-lru (volatile preserves persistent session keys)', 'Blocking DEL vs non-blocking UNLINK (UNLINK avoids freezing Redis thread)'],
    pressureEvents: ['Site Reliability VP: Full site outage in progress; database cannot handle raw traffic without cache'],
    expectedSolution: 'Use UNLINK on rogue keys; change maxmemory-policy to volatile-lru; add jittered TTLs to all set operations (e.g. 3600 + Math.random() * 300).',
    acceptableApproaches: ['Redis CLI non-blocking UNLINK and volatile-lru policy', 'Cluster memory expansion with key migration script'],
    failureConditions: ['Using blocking KEYS * or DEL on 10 million keys, freezing Redis for 20 seconds', 'Leaving policy as noeviction'],
    finalDeliverable: 'Remediated Redis configuration and hardened redisClient.js with mandatory jittered TTLs.',
    evaluationCriteria: { cacheRecovery: 40, capacityHardening: 30, testValidation: 30 },
    workplaceContext: 'Production Cache Avalanche & Redis Memory Exhaustion',
    taskType: 'cache_capacity'
  },

  {
    id: 'BE-L4-007',
    title: 'Zero-Downtime Database Schema Migration Table Lockout',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'GitLab / Core Database Infrastructure',
    department: 'Database Reliability & Migration Operations',
    domain: 'DevOps / Zero-Downtime Database Engineering',
    skills: ['postgresql', 'database_migrations', 'lock_management', 'zero_downtime'],
    coreCompetencies: ['zero_downtime_migrations', 'lock_analysis', 'schema_evolution'],
    secondarySkills: ['pg_repack', 'concurrent_indexing'],
    skillTags: ['migrations', 'table_lock', 'access_exclusive', 'postgresql', 'zero_downtime'],
    situation: 'A production migration running `ALTER TABLE orders ADD COLUMN status_code VARCHAR(20) DEFAULT \'pending\';` requested an ACCESS EXCLUSIVE lock on a 40-million row table, blocking all reads and writes for 15 minutes.',
    problem: 'Adding a column with a volatile default value and without lock_timeout queues behind slow transactions, blocking all subsequent SELECT/INSERT queries and cascading into connection pool exhaustion.',
    mission: 'Cancel the blocked migration lock, set lock_timeout = 2s, add the column without default, backfill data in batches using background worker, and apply NOT NULL constraint with a CHECK constraint.',
    workspace: {
      tools: ['slack', 'editor', 'terminal'],
      environment: { runtime: 'Linux / PostgreSQL 16' }
    },
    availableEvidence: [
      'PostgreSQL pg_stat_activity: ALTER TABLE orders waiting for AccessExclusiveLock; 450 queries queued behind it',
      'Production incident: 100% of checkout and order query traffic blocked'
    ],
    subtasks: [
      {
        id: 'BE-L4-007-S1',
        title: 'Identify Blocker Query & Terminate Migration Lock',
        objective: 'Query pg_blocking_pids(), locate the hanging ALTER TABLE process, and cancel it.',
        instructions: 'Run `SELECT pg_cancel_backend(pid)` in terminal to terminate the migration lock and restore database traffic.',
        expectedActions: ['Inspect pg_stat_activity for lock queues in terminal', 'Terminate blocking migration process PID', 'Verify queue drains and database latency returns to normal'],
        successCriteria: ['Blocking lock terminated within 60 seconds', 'Normal database traffic immediately resumes'],
        evaluationCriteria: { triageAction: 50, lockInvestigation: 50 }
      },
      {
        id: 'BE-L4-007-S2',
        title: 'Architect 3-Phase Zero-Downtime Migration & Batch Backfill',
        objective: 'Write zero-downtime migration: 1. ADD COLUMN nullable with lock_timeout, 2. Batch backfill, 3. Validate constraint.',
        instructions: 'Update migration.sql: set lock_timeout = \'2s\', add column without default, backfill in chunks of 5,000 rows with sleep, and add CHECK constraint NOT VALID.',
        expectedActions: ['Set lock_timeout = "2s" in migration script', 'Add column as nullable without table-locking default', 'Implement batched backfill script with sleep interval', 'Validate constraint asynchronously'],
        successCriteria: ['Migration completes with zero downtime or table locking', 'All 40M rows populated cleanly without spike in replication lag'],
        evaluationCriteria: { migrationArchitecture: 50, testPassage: 50 }
      }
    ],
    decisionPoints: ['Instant ALTER TABLE in Postgres 11+ with constant defaults vs batched backfill', 'pg_repack vs native online DDL patterns'],
    pressureEvents: ['VP of Infrastructure: Database must remain fully operational; zero downtime permitted for schema updates'],
    expectedSolution: 'Execute with lock_timeout = "2s"; ADD COLUMN status_code VARCHAR(20); backfill in batches: UPDATE orders SET status_code = \'pending\' WHERE id BETWEEN x AND y; ADD CONSTRAINT ... NOT VALID.',
    acceptableApproaches: ['Expand and contract migration pattern', 'PostgreSQL online DDL with NOT VALID constraints and batch backfill'],
    failureConditions: ['Running ALTER TABLE without lock_timeout, risking secondary table lock', 'Running unbounded UPDATE locking all 40M rows at once'],
    finalDeliverable: 'zeroDowntimeMigration.sql and backfillWorker.js with zero query interruption.',
    evaluationCriteria: { migrationSafety: 40, zeroDowntimeExecution: 30, testValidation: 30 },
    workplaceContext: 'Zero-Downtime Enterprise Database Migration',
    taskType: 'database_migration'
  },

  {
    id: 'BE-L4-008',
    title: 'Production Microservice Cascading 503 Outage Post-Deployment',
    role: 'backend',
    level: 4,
    difficulty: 'Critical Incident',
    company: 'Uber / Core Trip Dispatch Services',
    department: 'Site Reliability Engineering & Deployment',
    domain: 'Mobility / High-Availability Microservices',
    skills: ['incident_response', 'kubernetes', 'rollback_procedures', 'canary_deployment'],
    coreCompetencies: ['canary_analysis', 'incident_triage', 'rollback_execution'],
    secondarySkills: ['traffic_shifting', 'prometheus_alerts'],
    skillTags: ['canary_failure', 'rollback', 'kubernetes', '503_outage', 'incident_commander'],
    situation: 'Ten minutes after deploying v2.14.0 to production, global dispatch service error rates spike to 38% with HTTP 503 errors. Drivers cannot accept trip requests, and rider apps show "Service Unavailable".',
    problem: 'A newly introduced database connection string typo in the deployment environment config causes pods to fail healthchecks, while Kubernetes traffic router continues directing traffic to unhealthy pods.',
    mission: 'Step in as Incident Commander: roll back deployment to previous stable release (v2.13.9), execute rolling restart, verify traffic normalization in Prometheus, and author an incident post-mortem.',
    workspace: {
      tools: ['slack', 'editor', 'terminal', 'jira'],
      environment: { runtime: 'Kubernetes / Helm / Prometheus' }
    },
    availableEvidence: [
      'Prometheus Alert: DispatchServiceErrorRate > 35% (Current: 38.2%)',
      'Kubernetes pod logs: FATAL: failed to connect to database at "postgres-prod-master-typo.internal"'
    ],
    subtasks: [
      {
        id: 'BE-L4-008-S1',
        title: 'Triage Outage Scope & Issue Immediate Helm Rollback',
        objective: 'Inspect deployment revision history and execute immediate automated rollback.',
        instructions: 'Run `helm history dispatch-service` and `helm rollback dispatch-service 42` in terminal to restore stable release.',
        expectedActions: ['Inspect Helm release history in terminal', 'Execute helm rollback to previous revision', 'Post immediate incident status update in #incident-command'],
        successCriteria: ['Rollback executed within 90 seconds of triage', 'Old stable pods spin up and pass healthchecks'],
        evaluationCriteria: { incidentTriage: 50, rollbackSpeed: 50 }
      },
      {
        id: 'BE-L4-008-S2',
        title: 'Verify Traffic Normalization & Author Post-Mortem Action Items',
        objective: 'Monitor Prometheus error rates returning to < 0.1%, author root-cause analysis, and add CI config linting.',
        instructions: 'Verify metrics in terminal, write post-mortem document identifying missing environment variable validation, and add CI deployment gate.',
        expectedActions: ['Verify Prometheus error rate drops back to 0.02%', 'Author post-mortem document with 5 Whys analysis', 'Add automated Helm config linting gate in CI'],
        successCriteria: ['Global error rate returns to normal baseline', 'Preventative automated CI validation gate committed'],
        evaluationCriteria: { postMortemQuality: 50, preventativeAction: 50 }
      }
    ],
    decisionPoints: ['Fix forward vs instant rollback to previous known-good revision', 'Canary rollout strategy (10% traffic for 15 min) vs all-at-once deployment'],
    pressureEvents: ['Chief Product Officer on call: "Trip cancellations spiking in London and New York. Revert now."'],
    expectedSolution: 'Execute immediate helm rollback; verify pods healthy; monitor traffic normalization; implement automated canary gating with Prometheus metrics in CI/CD.',
    acceptableApproaches: ['Helm automated rollback', 'Kubernetes rollout undo deployment/dispatch-service'],
    failureConditions: ['Attempting to debug and compile code in production while site is down', 'Leaving unhealthy pods receiving live user traffic'],
    finalDeliverable: 'Rollback execution log and comprehensive PIR (Post-Incident Review) with automated CI verification gates.',
    evaluationCriteria: { incidentLeadership: 40, crisisExecution: 30, preventativeArchitecture: 30 },
    workplaceContext: 'P1 Production Microservice Incident Response & Rollback',
    taskType: 'production_incident'
  }
];
