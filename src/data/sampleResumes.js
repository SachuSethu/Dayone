// src/data/sampleResumes.js
// Realistic pre-built resume profiles for instant one-click testing and demonstration.

export const SAMPLE_RESUMES = {
  'frontend-developer': {
    name: 'Alex Rivera — Frontend Engineer',
    fileName: 'Alex_Rivera_Frontend_Resume.pdf',
    roleId: 'frontend-developer',
    text: `ALEX RIVERA
Full Stack & Frontend Software Engineer
San Francisco, CA • alex.rivera@example.com • github.com/arivera • linkedin.com/in/alex-rivera-dev

PROFESSIONAL SUMMARY
Dynamic Frontend Engineer with 3+ years of experience engineering responsive, high-performance web applications using React, JavaScript (ES6+), HTML5, and CSS3. Demonstrated expertise in building component libraries, state management, and modern user interfaces. Passionate about client-side performance, accessibility (WCAG), and responsive UX.

TECHNICAL SKILLS
- Languages: JavaScript (ES2022+), TypeScript, HTML5, CSS3, Sass/SCSS
- Frameworks & Libraries: React 18, Next.js, Redux Toolkit, React Query, Tailwind CSS
- Tooling & Practices: Webpack, Vite, Git, GitHub Actions, RESTful APIs, Jest, Vitest
- Architecture: Component-Driven Development, Responsive Layouts, Client-Side Routing

WORK EXPERIENCE
Frontend Developer | CloudScale Solutions (2022 - Present)
- Engineered responsive client dashboard using React 18 and Tailwind CSS, increasing page load speed by 34%.
- Migrated legacy multi-page admin panel into single-page application (SPA) with React Router and Context API.
- Implemented real-time dashboard updates via REST API polling and WebSocket telemetry connections.
- Integrated automated GitHub pull request workflows and code review standards across a 7-person agile squad.
- Collaborated closely with UI/UX designers to translate Figma component systems into modular React UI libraries.

Junior Web Developer | PixelCraft Studio (2021 - 2022)
- Built 15+ responsive marketing websites and web applications using modern JavaScript and React.
- Fixed 50+ cross-browser rendering inconsistencies and accessibility issues to meet WCAG AA standards.
- Designed reusable modal dialogues, form inputs, and interactive data cards.
- Integrated backend payment and auth endpoints with fetch and Axios.

FEATURED PROJECTS
- E-Commerce Marketplace Hub: Built with React, TypeScript, and Stripe API. Features responsive grid, cart state persistence with localStorage, and product filtering.
- Telemetry Analytics Visualizer: Interactive charts and metrics monitor built with React and Canvas, consuming live REST endpoints.

EDUCATION
B.S. in Computer Science | University of California, Davis (2017 - 2021)`
  },

  'backend-developer': {
    name: 'Jordan Chen — Backend Engineer',
    fileName: 'Jordan_Chen_Backend_Resume.pdf',
    roleId: 'backend-developer',
    text: `JORDAN CHEN
Backend Distributed Systems Engineer
Seattle, WA • jordan.chen@example.com • github.com/jchen-backend

PROFESSIONAL SUMMARY
Backend Engineer with 4 years of hands-on experience designing robust microservices, architecting RESTful APIs, and optimizing relational databases. Proven track record in scaling Node.js runtimes, handling high-throughput PostgreSQL queries, and containerizing distributed workloads with Docker.

TECHNICAL SKILLS
- Languages: JavaScript, Node.js, TypeScript, Go (Basics), SQL
- Backend & Cloud: Express.js, NestJS, PostgreSQL, Redis, Docker, AWS (ECS, S3, RDS)
- Architecture & Protocols: REST APIs, gRPC, Microservices, Event-Driven Architecture, RabbitMQ
- Testing & Tooling: Jest, Supertest, Git, CI/CD, Postman, Linux/Unix Shell

WORK EXPERIENCE
Backend Software Engineer | Apex Microservices (2022 - Present)
- Architected and deployed 6 core REST API microservices in Node.js and Express handling 1.5M daily requests.
- Optimized slow PostgreSQL queries with composite indexing and query plan analysis, cutting p95 latency by 45%.
- Implemented Redis caching layer for session management and hot product catalog lookups.
- Containerized development and staging environments using Docker and Docker Compose.
- Maintained 85% automated test coverage using Jest and integration test fixtures.

Systems Developer | FinTech Rails (2020 - 2022)
- Built idempotent webhook consumers for financial transaction webhooks with retry backoff policies.
- Designed relational schemas and managed database migrations with Prisma and PostgreSQL.
- Authored comprehensive OpenAPI / Swagger specifications and developer documentation.

EDUCATION
B.S. in Software Engineering | University of Washington (2016 - 2020)`
  },

  'cybersecurity-analyst': {
    name: 'Morgan Taylor — Cybersecurity Analyst',
    fileName: 'Morgan_Taylor_Cybersecurity_Resume.pdf',
    roleId: 'cybersecurity-analyst',
    text: `MORGAN TAYLOR
Cybersecurity Incident Response & SOC Analyst
Austin, TX • morgan.taylor@example.com • linkedin.com/in/morgantaylor-sec

PROFESSIONAL SUMMARY
SOC Analyst (Tier 2) with 2.5 years of experience monitoring high-throughput enterprise SIEM platforms, investigating suspicious telemetry, triaging threat alerts, and executing rapid containment procedures. Solid understanding of the MITRE ATT&CK framework, network packet analysis, and security compliance.

TECHNICAL SKILLS
- SOC & SIEM: Splunk, Elastic SIEM, Log Correlation, Anomaly Detection, Syslog Analysis
- Incident Response: Severity Triage (P1-P4), Host Isolation, Containment Protocols, Chain of Custody
- Network Security: Wireshark, TCP/IP, DNS Inspection, PCAP analysis, Firewall rule authoring, WAF
- Frameworks: MITRE ATT&CK, NIST CSF, ISO 27001, OWASP Top 10

WORK EXPERIENCE
Cybersecurity Operations Analyst | CyberGuard Defense (2022 - Present)
- Investigated over 400 security alerts per month across Splunk enterprise SIEM and CrowdStrike EDR.
- Triaged and contained credential stuffing attacks on consumer authentication endpoints using WAF rate rules.
- Analyzed anomalous DNS queries and detected DNS tunneling attempts using Wireshark and Zeek logs.
- Executed incident containment workflows: isolated infected endpoint machines and revoked compromised tokens.
- Authored post-incident analysis reports and documented mitigation timelines for executive stakeholders.

Security Specialist | NetSecure IT (2021 - 2022)
- Monitored firewall logs and configured iptables rules to drop suspicious command-and-control IP ranges.
- Conducted internal phishing simulation drills and vulnerability scans using Nessus.

CERTIFICATIONS
- CompTIA Security+ (Sec+)
- Certified SOC Analyst (CSA)`
  },

  'uiux-designer': {
    name: 'Taylor Swift — Product & UI/UX Designer',
    fileName: 'Taylor_Swift_Product_Designer_Resume.pdf',
    roleId: 'uiux-designer',
    text: `TAYLOR SWIFT
Senior Product & UI/UX Designer
New York, NY • taylor.design@example.com • portfolio.taylor-design.com

PROFESSIONAL SUMMARY
Product Designer with 3+ years of experience crafting accessible, responsive digital interfaces, conducting in-depth user research, and scaling design systems in Figma. Passionate about WCAG 2.1 Level AA compliance, micro-interactions, and conversion-focused customer journeys.

SKILLS & TOOLS
- Design: Figma (Auto-layout, Variants, Variables), Prototyping, Wireframing, Adobe CC
- UX Research: User Interviews, Usability Testing, Affinity Mapping, Card Sorting, Journey Mapping
- Design Systems: Component Libraries, Token Taxonomy, Style Guides, Spacing Systems
- Accessibility: WCAG 2.1 AA/AAA Guidelines, Color Contrast, Screen Reader ergonomics

EXPERIENCE
Product Designer | Nomad Creative Labs (2022 - Present)
- Spearheaded redesign of mobile onboarding funnel, reducing candidate bounce rate by 28%.
- Built comprehensive Figma design system with 200+ accessible components, variants, and design tokens.
- Conducted 35 qualitative user discovery interviews and synthesized friction themes into prioritized sprint tasks.
- Collaborated with frontend engineers to inspect CSS box model implementations and token parity.

UI Designer | Horizon Digital (2021 - 2022)
- Created high-fidelity interactive prototypes for enterprise SaaS dashboards.
- Performed color contrast audits to ensure compliance with WCAG standards across all core themes.`
  },

  'data-analyst': {
    name: 'Sam Patel — Business Intelligence & Data Analyst',
    fileName: 'Sam_Patel_Data_Analyst_Resume.pdf',
    roleId: 'data-analyst',
    text: `SAM PATEL
Data Analyst & Business Intelligence Specialist
Chicago, IL • sam.patel@example.com • github.com/sampatel-data

PROFESSIONAL SUMMARY
Data Analyst with 3 years of experience writing complex SQL queries, building executive KPI dashboards in Tableau, and conducting exploratory data analysis using Python and Pandas. Adept at cohort retention analysis, hypothesis testing, and translating raw data into business intelligence.

CORE COMPETENCIES
- Databases & Languages: SQL (PostgreSQL, Snowflake, BigQuery), Python (Pandas, NumPy), R
- Business Intelligence: Tableau, PowerBI, Looker Studio, Executive Dashboards
- Statistical Methods: A/B Testing, Cohort Analysis, Descriptive Statistics, Hypothesis Testing
- Modeling: Star Schema, Dimensional Modeling, ETL Data Cleansing

EXPERIENCE
Data Analyst | MetricPulse Analytics (2022 - Present)
- Authored complex SQL queries utilizing window functions, recursive CTEs, and aggregations across 5M+ row datasets.
- Designed 12 interactive Tableau dashboards tracking Monthly Recurring Revenue (MRR), churn rate, and CAC.
- Conducted A/B test evaluation for product checkout variant, establishing statistical significance (p < 0.01).
- Automated weekly KPI data extraction scripts using Python and cron jobs, saving 6 hours per week.

Junior Analyst | City Logistics (2021 - 2022)
- Cleaned and prepared shipping logistics data with Pandas and SQL.
- Created weekly operational reports for regional supply chain directors.`
  }
};
