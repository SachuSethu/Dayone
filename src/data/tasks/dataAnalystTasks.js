/**
 * DayOne.ai - Dynamic Task Database: Data Analyst Tasks
 * 32 Main Tasks (8 Level 1 Foundation, 8 Level 2 Intermediate, 8 Level 3 Advanced, 8 Level 4 Critical Incident)
 * Exactly 2 Subtasks per main task = 64 subtasks total.
 */

export const DATA_ANALYST_TASKS = [
  // ==========================================
  // LEVEL 1: FOUNDATION (8 Tasks)
  // ==========================================
  {
    id: 'DA-L1-001',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Incomplete & Dirty Sales CSV Data Cleaning',
    shortDescription: 'Profile missing values, sanitize inconsistent date strings, and convert malformed currency symbols into numeric floats across 10,000 transaction rows.',
    competency: 'Data Cleaning',
    skills: ['pandas', 'data_cleaning', 'missing_values', 'csv_parsing'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-001-A',
        title: 'Missing Value & Data Type Profiling',
        description: 'Read raw CSV dataset using Pandas, calculate null percentages per column, and identify conflicting string representations of missing values ("N/A", "null", "-").',
        verificationMethod: 'Pandas profiling script outputs summary table of null counts and flags mismatched object column types.',
        deliverables: ['Data health audit summary', 'Null value distribution report']
      },
      {
        id: 'DA-L1-001-B',
        title: 'Standardized Imputation & Format Normalization',
        description: 'Strip currency characters ($ and commas), cast to float64, parse ISO timestamps, and impute missing numerical values with median strategy.',
        verificationMethod: 'Cleaned DataFrame has zero nulls in critical fields, correct dtypes, and exports to clean CSV without loss of rows.',
        deliverables: ['Cleaned CSV export', 'Data cleaning pipeline script']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CLN-101',
      incidentPriority: 'P3 - Data Hygiene',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'The sales operations team exported transactions from three different CRM instances. The resulting CSV has mixed date formats, missing amounts, and corrupted currency symbols.',
      objectives: [
        'Inspect column data types and null counts in Python.',
        'Clean string formatting on prices and timestamps.',
        'Impute missing postal codes and median prices where appropriate.'
      ]
    },
    evaluationCriteria: {
      dataProfilingRigor: 35,
      cleaningAccuracy: 40,
      codeReproducibility: 25
    }
  },
  {
    id: 'DA-L1-002',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'SQL Aggregations & Monthly Active User (MAU) Calculation',
    shortDescription: 'Author performant SQL queries with GROUP BY and DATE_TRUNC to compute Monthly Active Users (MAU) and month-over-month growth percentage.',
    competency: 'SQL & Querying',
    skills: ['sql', 'aggregations', 'group_by', 'kpi_reporting'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-002-A',
        title: 'Monthly Active User Count Querying',
        description: 'Draft PostgreSQL / BigQuery query grouping events by month using `DATE_TRUNC("month", event_time)` and counting distinct active user IDs.',
        verificationMethod: 'SQL query executes successfully returning exactly 12 monthly rows with accurate MAU counts.',
        deliverables: ['MAU aggregation query script', '12-month MAU trend table']
      },
      {
        id: 'DA-L1-002-B',
        title: 'Month-over-Month (MoM) Growth Computation',
        description: 'Implement SQL window function `LAG()` to calculate MoM percentage change in active users and isolate seasonal contraction periods.',
        verificationMethod: 'Calculated MoM percentage matches benchmark verification values within 0.1% tolerance.',
        deliverables: ['MoM growth calculation SQL query', 'Growth variance commentary']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-SQL-102',
      incidentPriority: 'P3 - Routine Analytics',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'Product leadership requires a verified monthly active user (MAU) calculation for the past calendar year to include in the quarterly investor update.',
      objectives: [
        'Write SQL aggregation calculating unique user activity by calendar month.',
        'Compute month-over-month percentage growth rates using LAG.',
        'Format the output into a clean tabular structure.'
      ]
    },
    evaluationCriteria: {
      sqlSyntaxCorrectness: 40,
      aggregationAccuracy: 35,
      analyticalInterpretation: 25
    }
  },
  {
    id: 'DA-L1-003',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Exploratory Data Analysis & Outlier Detection',
    shortDescription: 'Calculate Interquartile Range (IQR) boundaries, plot feature distributions, and flag extreme price/quantity anomalies in order data.',
    competency: 'Exploratory Data Analysis',
    skills: ['eda', 'seaborn', 'matplotlib', 'iqr_outliers'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-003-A',
        title: 'IQR Outlier Identification & Box Plots',
        description: 'Calculate 25th, 50th, and 75th percentiles in Python, compute IQR * 1.5 fences, and plot Seaborn boxplots to isolate extreme transactions.',
        verificationMethod: 'Python script identifies 42 anomalous orders where quantity exceeded normal distribution by 8+ standard deviations.',
        deliverables: ['Outlier detection script', 'Seaborn boxplot visualization']
      },
      {
        id: 'DA-L1-003-B',
        title: 'Distribution Modeling & Skewness Assessment',
        description: 'Generate histograms with kernel density estimates (KDE) and calculate skewness and kurtosis metrics to determine log-transformation suitability.',
        verificationMethod: 'Distribution report documents positive skewness > 3.5 on transaction totals and recommends log transformation.',
        deliverables: ['Feature distribution summary', 'Transformation recommendation note']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-EDA-103',
      incidentPriority: 'P3 - Data Exploration',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'The finance team noticed unexpected spikes in average order value. Investigate whether the increase is broad-based or driven by anomalous bulk orders.',
      objectives: [
        'Compute statistical moments (mean, median, IQR, variance).',
        'Plot distribution charts to visualize long-tail order distributions.',
        'Isolate fraudulent or bulk test orders for removal.'
      ]
    },
    evaluationCriteria: {
      statisticalRigor: 35,
      chartClarity: 35,
      insightSynthesis: 30
    }
  },
  {
    id: 'DA-L1-004',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Spreadsheet Pivot Modeling & Financial Variance Analysis',
    shortDescription: 'Construct a multi-dimensional pivot table comparing Q3 vs Q4 actual departmental expenditure against budgeted forecasts with variance conditional formatting.',
    competency: 'Business Intelligence',
    skills: ['excel', 'pivot_tables', 'variance_analysis', 'vlookup'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-004-A',
        title: 'Departmental Budget Pivot Architecture',
        description: 'Build pivot table grouping spend by Department, Cost Center, and Expense Category, utilizing VLOOKUP/XLOOKUP to join budgeted allocation limits.',
        verificationMethod: 'Pivot table aggregates 100% of expense lines without unmapped categories or circular references.',
        deliverables: ['Dynamic pivot table workbook', 'Lookup mapping reconciliation']
      },
      {
        id: 'DA-L1-004-B',
        title: 'Variance Calculation & Overrun Highlighting',
        description: 'Formulate calculated fields for Dollar Variance ($) and Percentage Variance (%) and apply conditional formatting rules for overruns > 15%.',
        verificationMethod: 'Over-budget items automatically highlighted in amber/red with clear drill-down explanations for the top 3 variances.',
        deliverables: ['Variance summary table', 'Budget overrun executive commentary']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-FIN-104',
      incidentPriority: 'P3 - Financial Audit',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'The CFO requires a clear breakdown of departmental expenditures comparing Q4 actuals against approved Q4 budgets prior to year-end close.',
      objectives: [
        'Assemble pivot model consolidating expenses from 6 cost centers.',
        'Calculate variance percentage: (Actual - Budget) / Budget.',
        'Flag categories exceeding budget limits by more than $50,000.'
      ]
    },
    evaluationCriteria: {
      spreadsheetModelling: 40,
      varianceAccuracy: 35,
      visualFormatting: 25
    }
  },
  {
    id: 'DA-L1-005',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Support Ticket Sentiment & Category Text Parsing',
    shortDescription: 'Parse 5,000 raw customer ticket descriptions with regex pattern matching to categorize complaints and calculate average resolution duration.',
    competency: 'Data Categorization',
    skills: ['text_categorization', 'regex', 'sentiment_scoring', 'support_analytics'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-005-A',
        title: 'Regex Category Classification',
        description: 'Construct Python regular expressions to tag ticket texts into Billing, Technical Bug, Account Access, and Delivery Inquiry categories.',
        verificationMethod: 'Regex classifier categorizes 94%+ of unclassified tickets into structured buckets.',
        deliverables: ['Regex classification script', 'Category tag assignment dataset']
      },
      {
        id: 'DA-L1-005-B',
        title: 'Resolution SLA & Sentiment Correlation',
        description: 'Calculate average resolution hours per category and correlate with simple keyword sentiment polarity to isolate frustrating customer touchpoints.',
        verificationMethod: 'Analysis reveals Account Access tickets take 4x longer than average and possess lowest sentiment score.',
        deliverables: ['SLA performance matrix', 'Root cause summary deck']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CS-105',
      incidentPriority: 'P3 - Customer Operations',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'Customer Support CSAT scores dropped by 12 points last month. Analyze incoming ticket text data to diagnose which issues are driving user dissatisfaction.',
      objectives: [
        'Categorize free-form ticket subject lines using string matching and regex.',
        'Compute mean time to resolve (MTTR) by category.',
        'Identify the category causing the largest volume of negative escalations.'
      ]
    },
    evaluationCriteria: {
      regexEfficiency: 35,
      slaMetricPrecision: 35,
      operationalRecommendations: 30
    }
  },
  {
    id: 'DA-L1-006',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Relational Database Join & Orphaned Record Audit',
    shortDescription: 'Execute SQL INNER, LEFT, and FULL OUTER joins across orders, users, and shipping tables to discover orphaned foreign keys and data integrity loss.',
    competency: 'Data Modeling',
    skills: ['sql_joins', 'foreign_keys', 'referential_integrity', 'data_modeling'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-006-A',
        title: 'Orphaned Foreign Key Discovery Query',
        description: 'Write SQL queries using LEFT JOIN with `WHERE right_table.id IS NULL` to locate orders referencing non-existent user accounts and shipments without orders.',
        verificationMethod: 'Query isolates 184 orphaned order records caused by historical soft-deletion bugs.',
        deliverables: ['Integrity audit query script', 'Orphaned entity breakdown table']
      },
      {
        id: 'DA-L1-006-B',
        title: 'Entity Relationship Diagram & Referential Fix',
        description: 'Document current ERD showing foreign key relationships and write SQL DDL migration adding `ON DELETE SET NULL` constraints to prevent future orphans.',
        verificationMethod: 'Database schema migration script applies cleanly and test deletions cascade appropriately.',
        deliverables: ['Updated ERD schema diagram', 'DDL constraint migration script']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-MOD-106',
      incidentPriority: 'P3 - Data Hygiene',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'Reports on customer lifetime value do not match order totals. Audit relational foreign keys to determine if orphaned orders exist in the database.',
      objectives: [
        'Perform join tests between users and orders tables.',
        'Count orders that lack a corresponding parent user record.',
        'Propose database constraint remedies to enforce referential integrity.'
      ]
    },
    evaluationCriteria: {
      sqlJoinLogic: 40,
      schemaComprehension: 35,
      integrityRemediation: 25
    }
  },
  {
    id: 'DA-L1-007',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Web Traffic Funnel Drop-off Rate Analysis',
    shortDescription: 'Map user journey progression across landing -> search -> cart -> checkout stages and compare mobile vs desktop conversion bottlenecks.',
    competency: 'Product Analytics',
    skills: ['funnel_analysis', 'conversion_rates', 'google_analytics', 'dropoff_metrics'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-007-A',
        title: 'Step-by-Step Conversion Funnel Computation',
        description: 'Aggregate user session touchpoints into discrete sequential stages and calculate stage-to-stage completion rates and cumulative conversion.',
        verificationMethod: 'Funnel calculation table documents exact drop-off percentage at each milestone.',
        deliverables: ['Funnel conversion data table', 'Step-by-step dropoff visualization']
      },
      {
        id: 'DA-L1-007-B',
        title: 'Mobile vs Desktop Funnel Disparity Diagnosis',
        description: 'Segment funnel conversion metrics by device type (iOS, Android, Desktop) to isolate platform-specific drop-off bottlenecks.',
        verificationMethod: 'Analysis identifies cart-to-checkout drop-off on mobile is 2.4x higher than on desktop browsers.',
        deliverables: ['Device comparison breakdown', 'Optimization hypothesis report']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-FNL-107',
      incidentPriority: 'P3 - Product Analytics',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'E-commerce conversion dropped by 1.8% after the latest navigation redesign. Map the user funnel to identify the exact step where users abandon their journey.',
      objectives: [
        'Calculate progression percentages across the 4 core funnel steps.',
        'Compare drop-off rates between desktop and mobile device segments.',
        'Provide recommendations for the UX optimization team.'
      ]
    },
    evaluationCriteria: {
      funnelMathPrecision: 35,
      segmentationInsight: 35,
      businessContextualization: 30
    }
  },
  {
    id: 'DA-L1-008',
    roleId: 'data_analyst',
    level: 1,
    levelLabel: 'Level 1: Foundation',
    title: 'Automated Executive PDF Report Generation with Python',
    shortDescription: 'Build Python automation querying SQLite database, formatting KPI summary cards into HTML Jinja2 template, and compiling clean weekly PDF report.',
    competency: 'Reporting & Automation',
    skills: ['python_reporting', 'jinja2', 'weasyprint', 'kpi_dashboards'],
    estimatedMinutes: 20,
    subtasks: [
      {
        id: 'DA-L1-008-A',
        title: 'Automated KPI Query & Aggregation Pipeline',
        description: 'Write Python script executing SQL queries against weekly transactional database to compute revenue, order count, and average order value (AOV).',
        verificationMethod: 'Python script returns dictionary of verified metrics matching source database records.',
        deliverables: ['Metric extraction Python script', 'JSON KPI payload']
      },
      {
        id: 'DA-L1-008-B',
        title: 'Jinja2 HTML Template & PDF Compilation',
        description: 'Populate responsive HTML Jinja2 template with CSS print media queries and compile to clean executive PDF using WeasyPrint or pdfkit.',
        verificationMethod: 'Generated PDF renders on single page with embedded vector charts, correct pagination, and crisp typography.',
        deliverables: ['HTML/CSS report template', 'Compiled sample PDF report']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-RPT-108',
      incidentPriority: 'P3 - Process Automation',
      estimatedDurationMinutes: 20,
      scenarioBrief: 'Every Monday morning, analysts spend 3 hours manually copying metrics into PowerPoint. Build an end-to-end Python pipeline to automate weekly report generation.',
      objectives: [
        'Automate SQL query execution in Python.',
        'Inject calculated figures into a templated HTML layout.',
        'Compile the final artifact into a polished, printable PDF.'
      ]
    },
    evaluationCriteria: {
      automationReliability: 40,
      templateDesign: 35,
      codeMaintainability: 25
    }
  },

  // ==========================================
  // LEVEL 2: INTERMEDIATE (8 Tasks)
  // ==========================================
  {
    id: 'DA-L2-001',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'E-Commerce Retention Cohort Matrix & Heatmap',
    shortDescription: 'Formulate SQL window functions to assign customer signup cohorts, calculate 12-month retention percentages, and render triangular Seaborn heatmap.',
    competency: 'Retention & Cohort Analytics',
    skills: ['cohort_analysis', 'retention_matrix', 'seaborn', 'sql_window_functions'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-001-A',
        title: 'Cohort SQL Window Function Architecture',
        description: 'Draft SQL query using `FIRST_VALUE(order_date) OVER(PARTITION BY user_id)` to assign monthly cohort month and compute relative active month index (M0, M1..M11).',
        verificationMethod: 'SQL query outputs clean pivot dataset with Cohort Month on Y-axis and Month Index on X-axis.',
        deliverables: ['SQL cohort aggregation query', 'Tabular retention matrix table']
      },
      {
        id: 'DA-L2-001-B',
        title: 'Seaborn Heatmap Visualization & Decay Analysis',
        description: 'Load pivot matrix into Python, compute percentage retention relative to Month 0, and generate annotated Seaborn heatmap highlighting inflection drop points.',
        verificationMethod: 'Heatmap displays percentage values with color gradient, isolating Month 1 cliff drop from 100% to 28%.',
        deliverables: ['Python visualization script', 'Annotated retention heatmap figure']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CHT-201',
      incidentPriority: 'P2 - Strategic Retention Audit',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Management wants to understand customer loyalty over time. Build an exact monthly cohort retention matrix for all customers who signed up in the past year.',
      objectives: [
        'Group users by their first purchase month.',
        'Calculate the percentage of users returning in months 1 through 12.',
        'Visualize retention decay as a clear cohort heatmap.'
      ]
    },
    evaluationCriteria: {
      cohortCalculationAccuracy: 40,
      visualizationQuality: 35,
      decayInterpretation: 25
    }
  },
  {
    id: 'DA-L2-002',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'A/B Test Statistical Significance & Welch\'s T-Test',
    shortDescription: 'Evaluate conversion lift from checkout redesign experiment, perform Welch\'s two-sample t-test in SciPy, and calculate 95% confidence intervals.',
    competency: 'Experimentation & A/B Testing',
    skills: ['ab_testing', 'scipy', 't_test', 'chi_squared', 'p_value'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-002-A',
        title: 'Experiment Sample Sizing & Conversion Testing',
        description: 'Verify minimum detectable effect (MDE) sample size requirements and perform Chi-Squared / Welch t-test on Control vs Variant conversion data.',
        verificationMethod: 'SciPy calculation outputs exact test statistic, degrees of freedom, and p-value.',
        deliverables: ['Statistical hypothesis test script', 'Power analysis verification']
      },
      {
        id: 'DA-L2-002-B',
        title: 'Confidence Intervals & Launch Recommendation',
        description: 'Compute 95% confidence interval for difference in proportions, check for early stopping bias, and synthesize rollout decision for product manager.',
        verificationMethod: 'Confidence interval correctly bounds relative lift (+3.2% to +6.8%) with p < 0.01 rejecting null hypothesis.',
        deliverables: ['A/B test results executive memo', 'Confidence interval chart']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-EXP-202',
      incidentPriority: 'P2 - Product Decision',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'A 2-week A/B test on the one-click checkout concluded with 45,000 visitors per variant. Evaluate whether the observed 4.2% lift is statistically significant.',
      objectives: [
        'Verify test conditions and sample size balance.',
        'Execute statistical significance tests using Python SciPy.',
        'Provide a launch vs iterate decision with confidence bounds.'
      ]
    },
    evaluationCriteria: {
      statisticalRigor: 45,
      pValInterpretation: 30,
      businessRecommendation: 25
    }
  },
  {
    id: 'DA-L2-003',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'RFM (Recency, Frequency, Monetary) Customer Segmentation',
    shortDescription: 'Compute Recency, Frequency, and Monetary scores per customer from transactional logs and categorize into Champion, Loyal, and At-Risk personas.',
    competency: 'Customer Analytics',
    skills: ['rfm_segmentation', 'quantile_binning', 'clustering', 'customer_lifetime_value'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-003-A',
        title: 'RFM Metric Calculation & Quantile Binning',
        description: 'Aggregate user transaction history to calculate days since last order (R), order count (F), and total spend (M), applying pandas `qcut` to assign 1-5 scores.',
        verificationMethod: 'Every customer assigned valid RFM composite score (e.g. 555 for highest tier, 111 for lowest).',
        deliverables: ['RFM calculation script', 'Customer scoring table']
      },
      {
        id: 'DA-L2-003-B',
        title: 'Persona Mapping & Campaign Strategy',
        description: 'Map composite RFM scores into customer segments (Champions, Loyal Customers, Potential Loyalists, At-Risk, Hibernating) and propose tailored email strategies.',
        verificationMethod: 'Segment distribution table matches business target counts with clear actionable activation playbooks.',
        deliverables: ['Customer segment distribution breakdown', 'Lifecycle marketing recommendation']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-RFM-203',
      incidentPriority: 'P2 - Marketing Strategy',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Marketing wants to move away from generic email blasts. Build an RFM segmentation model to identify high-value VIPs and dormant churn risks.',
      objectives: [
        'Compute recency in days, purchase frequency, and monetary value per user.',
        'Bin distributions into quintiles (1-5).',
        'Assign actionable customer personas for email lifecycle marketing.'
      ]
    },
    evaluationCriteria: {
      rfmLogicPrecision: 40,
      personaSegmentation: 35,
      marketingRelevance: 25
    }
  },
  {
    id: 'DA-L2-004',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'SQL Window Functions & Trailing Moving Averages',
    shortDescription: 'Formulate advanced PostgreSQL window functions to compute 7-day and 30-day trailing moving averages for daily Gross Merchandise Value (GMV).',
    competency: 'SQL & Querying',
    skills: ['sql_window_functions', 'running_totals', 'moving_averages', 'postgresql'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-004-A',
        title: 'Trailing Rolling Window SQL Formulation',
        description: 'Write SQL query utilizing `AVG(daily_gmv) OVER(ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for 7-day and 29 preceding for 30-day smoothing.',
        verificationMethod: 'Moving average output smooths daily day-of-week volatility while tracking underlying macro trends.',
        deliverables: ['Moving average SQL script', 'Smoothed revenue trend dataset']
      },
      {
        id: 'DA-L2-004-B',
        title: 'Cumulative Running Totals & Rank Partitions',
        description: 'Add running cumulative revenue calculation with `SUM() OVER(PARTITION BY year ORDER BY date)` and identify peak sales day per month using `DENSE_RANK()`.',
        verificationMethod: 'Cumulative sums reset precisely on Jan 1 and rank 1 correctly flags highest revenue day each month.',
        deliverables: ['Comprehensive window analytics SQL query', 'Validation audit checklist']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-WIN-204',
      incidentPriority: 'P2 - Financial Reporting',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Daily revenue exhibits heavy weekend spikes and dips, obscuring true trend direction. Create a smoothed 7-day and 30-day trailing revenue analysis in SQL.',
      objectives: [
        'Construct rolling window frame specifications in SQL.',
        'Calculate running year-to-date totals.',
        'Rank top performing business days within each fiscal quarter.'
      ]
    },
    evaluationCriteria: {
      windowSyntaxMastery: 45,
      edgeCaseHandling: 30,
      queryOptimization: 25
    }
  },
  {
    id: 'DA-L2-005',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Multi-Touch Marketing Attribution Model Comparison',
    shortDescription: 'Compare First-Touch, Last-Touch, and Linear attribution models across multi-channel customer acquisition journeys to evaluate ad spend efficiency.',
    competency: 'Marketing Analytics',
    skills: ['attribution_modeling', 'first_touch', 'last_touch', 'markov_chains'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-005-A',
        title: 'Journey Path Parsing & Rule-Based Attribution',
        description: 'Parse multi-session touchpoint chains in Python/SQL and allocate conversion revenue under First-Touch, Last-Touch, and Linear (equal split) rules.',
        verificationMethod: 'Calculated channel revenue sum equals total recorded order revenue under all three models.',
        deliverables: ['Attribution model comparison script', 'Channel credit distribution matrix']
      },
      {
        id: 'DA-L2-005-B',
        title: 'Attribution Model Discrepancy & CAC Audit',
        description: 'Calculate Customer Acquisition Cost (CAC) under each attribution model and highlight channels undervalued by naive Last-Touch reporting (e.g. Paid Search vs Top-of-Funnel Brand).',
        verificationMethod: 'Report clearly illustrates that Organic/Content channels generate 35% of first touches despite 8% last touch credit.',
        deliverables: ['Channel CAC comparison table', 'Budget reallocation recommendation']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-MKT-205',
      incidentPriority: 'P2 - Marketing Analytics',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'The CMO is considering cutting top-of-funnel Youtube ads because Google Analytics Last-Click shows low conversion. Compare attribution models to reveal true multi-touch value.',
      objectives: [
        'Reconstruct user touchpoint journey strings.',
        'Compute First-Click, Last-Click, and Linear attribution splits.',
        'Demonstrate how top-of-funnel channels assist final conversion.'
      ]
    },
    evaluationCriteria: {
      attributionLogicPrecision: 40,
      businessAcumen: 35,
      dataSynthesis: 25
    }
  },
  {
    id: 'DA-L2-006',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Interactive BI Dashboard Architecture & Layout Design',
    shortDescription: 'Design an executive dashboard layout in Metabase/Tableau with consolidated summary cards, drill-down filters, and sub-second query performance.',
    competency: 'Data Visualization & BI',
    skills: ['tableau', 'metabase', 'dashboard_design', 'interactive_filters'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-006-A',
        title: 'Semantic Data Mart SQL View Design',
        description: 'Author aggregated SQL view pre-joining metrics across dimensions (region, customer segment, product line) to guarantee sub-second dashboard query latency.',
        verificationMethod: 'EXPLAIN ANALYZE proves dashboard query executes in under 250ms with index scans.',
        deliverables: ['Aggregated data mart SQL view', 'Query performance benchmark']
      },
      {
        id: 'DA-L2-006-B',
        title: 'Information Architecture & Visual Hierarchy Layout',
        description: 'Wireframe and configure dashboard layout with top-line summary metric cards, time-series trend line, geographical heatmap, and interactive dimension filters.',
        verificationMethod: 'Dashboard complies with 5-second cognitive comprehension rule and WCAG color contrast standards.',
        deliverables: ['Dashboard layout specification', 'Interactive filter mapping guide']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-DSH-206',
      incidentPriority: 'P2 - BI Implementation',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Leadership complaints about slow, confusing reports led to a mandate for a centralized Executive Operations Dashboard. Design a high-performance BI data mart and UI layout.',
      objectives: [
        'Build a performant summary view in SQL.',
        'Structure dashboard hierarchy: high-level KPIs at top, granular charts below.',
        'Implement dynamic date range and regional filtering.'
      ]
    },
    evaluationCriteria: {
      dashboardHierarchy: 40,
      queryOptimization: 35,
      usabilityDesign: 25
    }
  },
  {
    id: 'DA-L2-007',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Inventory Stockout Prediction & Safety Stock Modeling',
    shortDescription: 'Model daily SKU sales velocity, estimate lead time variance, and compute optimal Safety Stock and Reorder Points (ROP) to maintain 99% fulfillment service level.',
    competency: 'Supply Chain Analytics',
    skills: ['inventory_modeling', 'safety_stock', 'lead_time_variance', 'stockout_prevention'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-007-A',
        title: 'Demand Variance & Lead Time Modeling',
        description: 'Calculate average daily demand, demand standard deviation, and supplier delivery lead-time variance across 500 SKU lines in Python.',
        verificationMethod: 'Calculations correctly identify top 20 high-volatility SKUs prone to frequent stockouts.',
        deliverables: ['SKU demand volatility dataset', 'Lead time distribution analysis']
      },
      {
        id: 'DA-L2-007-B',
        title: 'Service-Level Z-Score & Reorder Point Formulation',
        description: 'Compute Safety Stock = `Z * sqrt(L * sigma_d^2 + d^2 * sigma_L^2)` with Z=2.33 (99% service level) and output automated reorder alerts for warehouse purchasing.',
        verificationMethod: 'Model outputs exact safety stock threshold and reorder trigger unit counts for all warehouse facilities.',
        deliverables: ['Safety stock calculation script', 'Automated purchase trigger table']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-SC-207',
      incidentPriority: 'P2 - Operations Risk',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'Recent supply disruptions caused our most popular products to stock out 4 times last quarter. Build a statistical safety stock model to protect customer orders.',
      objectives: [
        'Analyze daily sales burn rates and supplier delivery delays.',
        'Calculate statistical safety stocks for 99% customer availability.',
        'Generate an automated reorder alert schedule.'
      ]
    },
    evaluationCriteria: {
      supplyChainFormulas: 45,
      riskToleranceBalancing: 30,
      implementationFeasibility: 25
    }
  },
  {
    id: 'DA-L2-008',
    roleId: 'data_analyst',
    level: 2,
    levelLabel: 'Level 2: Intermediate',
    title: 'Missing Data Diagnostics & Multiple Imputation (MICE)',
    shortDescription: 'Distinguish between MCAR, MAR, and MNAR missing data patterns, conduct Little\'s MCAR test, and apply MICE chained equations imputation.',
    competency: 'Data Quality & Imputation',
    skills: ['mice_imputation', 'missing_mechanisms', 'statistical_rigor', 'scikit_learn'],
    estimatedMinutes: 25,
    subtasks: [
      {
        id: 'DA-L2-008-A',
        title: 'Missingness Mechanism Testing & Correlation Analysis',
        description: 'Evaluate missing indicator dummy variables against observed features using logistic regression and Little\'s test to classify missingness mechanism.',
        verificationMethod: 'Statistical test proves income missingness is Missing at Random (MAR) dependent on age and education level.',
        deliverables: ['Missingness diagnostic report', 'Correlation matrix of missing indicators']
      },
      {
        id: 'DA-L2-008-B',
        title: 'Iterative Chained Equations Imputation',
        description: 'Apply `IterativeImputer` (MICE) in Scikit-Learn across numerical and categorical features, verifying preserved feature variance and correlation structure.',
        verificationMethod: 'Imputed dataset retains original mean within 2% and feature covariances remain statistically indistinguishable from baseline.',
        deliverables: ['MICE imputation script', 'Pre/Post imputation distribution comparison']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-IMP-208',
      incidentPriority: 'P2 - Data Quality',
      estimatedDurationMinutes: 25,
      scenarioBrief: 'A key customer demographic survey has 22% missing values in salary and household size. Simple mean imputation would distort our credit models. Apply MICE.',
      objectives: [
        'Test whether data is missing completely at random (MCAR) or conditionally (MAR).',
        'Run Multivariate Imputation by Chained Equations (MICE).',
        'Verify that statistical distributions remain unbiased.'
      ]
    },
    evaluationCriteria: {
      missingDataTheory: 40,
      imputationImplementation: 35,
      variancePreservation: 25
    }
  },

  // ==========================================
  // LEVEL 3: ADVANCED (8 Tasks)
  // ==========================================
  {
    id: 'DA-L3-001',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Time-Series Decomposition & Prophet Demand Forecasting',
    shortDescription: 'Decompose 3 years of daily order history into trend, weekly seasonality, and holiday spikes using STL, and train Facebook Prophet forecasting model.',
    competency: 'Forecasting & Time-Series',
    skills: ['prophet', 'time_series', 'seasonality_decomposition', 'arima'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-001-A',
        title: 'STL Seasonal & Trend Decomposition',
        description: 'Execute Loess (STL) time series decomposition in Python statsmodels to isolate underlying secular trend from weekly cyclicality and residual noise.',
        verificationMethod: 'Decomposition plots clearly decouple annual growth trend from Black Friday holiday variance.',
        deliverables: ['STL decomposition analysis script', 'Trend and seasonal component figures']
      },
      {
        id: 'DA-L3-001-B',
        title: 'Prophet Model Training & Cross-Validation Evaluation',
        description: 'Fit Prophet model with holiday effects, evaluate backtesting performance using rolling window cross-validation, and verify MAPE remains under 6.5%.',
        verificationMethod: 'Prophet model generates 90-day future demand forecast with 80% and 95% confidence prediction intervals.',
        deliverables: ['Prophet modeling pipeline script', 'Cross-validation MAPE/RMSE report']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-FCS-301',
      incidentPriority: 'P2 - Demand Planning',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Warehouse operations needs a reliable 90-day daily package volume forecast to plan seasonal staffing. Build a production Prophet model incorporating US holiday calendars.',
      objectives: [
        'Decompose time series into trend and weekly/annual seasonality.',
        'Tune Prophet changepoint prior scale and holiday parameters.',
        'Backtest accuracy using expanding window cross-validation.'
      ]
    },
    evaluationCriteria: {
      timeSeriesFundamentals: 40,
      forecastAccuracyRigor: 35,
      uncertaintyQuantification: 25
    }
  },
  {
    id: 'DA-L3-002',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Churn Prediction Modeling & TreeSHAP Feature Attribution',
    shortDescription: 'Train an XGBoost classifier to predict 60-day customer churn and explain risk drivers using TreeSHAP summary and individual waterfall plots.',
    competency: 'Predictive Modeling',
    skills: ['logistic_regression', 'xgboost', 'shap_values', 'churn_modeling'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-002-A',
        title: 'Feature Engineering & XGBoost Classification',
        description: 'Construct behavioral velocity features (30-day login drop, support ticket count, feature usage decline) and train XGBoost classifier optimizing PR-AUC.',
        verificationMethod: 'Model achieves PR-AUC > 0.78 on held-out test split, outperforming baseline logistic regression.',
        deliverables: ['Feature engineering pipeline', 'Trained XGBoost model artifact']
      },
      {
        id: 'DA-L3-002-B',
        title: 'TreeSHAP Interpretability & Risk Score Cards',
        description: 'Compute TreeSHAP values for all test instances, plot global feature importance summary, and generate individual waterfall explanations for customer success reps.',
        verificationMethod: 'SHAP waterfall plot decomposes individual high-risk accounts into primary contributing friction points.',
        deliverables: ['SHAP summary visualization script', 'Customer risk attribution cards']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-ML-302',
      incidentPriority: 'P2 - Customer Success Tooling',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Customer Success needs early warning of enterprise accounts likely to churn before contract renewal. Build a high-precision ML classifier with explainable feature contributions.',
      objectives: [
        'Engineer engagement trajectory features from user event logs.',
        'Train and cross-validate XGBoost model on imbalanced churn dataset.',
        'Generate SHAP waterfall explanations for frontline account managers.'
      ]
    },
    evaluationCriteria: {
      featureEngineering: 35,
      modelEvaluationMetrics: 35,
      explainabilityExecution: 30
    }
  },
  {
    id: 'DA-L3-003',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Causal Inference via Difference-in-Differences (DiD)',
    shortDescription: 'Evaluate true causal revenue lift of a regional TV marketing campaign using Difference-in-Differences econometrics and parallel trends verification.',
    competency: 'Causal Inference',
    skills: ['causal_inference', 'difference_in_differences', 'counterfactual', 'econometrics'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-003-A',
        title: 'Parallel Trends Assumption Validation',
        description: 'Analyze pre-treatment revenue trajectories of treatment state markets vs synthetic control states using OLS interaction regression to verify parallel trends.',
        verificationMethod: 'Pre-treatment interaction terms are statistically indistinguishable from zero (p > 0.20), validating the DiD assumption.',
        deliverables: ['Parallel trends test script', 'Pre-treatment trajectory chart']
      },
      {
        id: 'DA-L3-003-B',
        title: 'Two-Way Fixed Effects (TWFE) Estimation',
        description: 'Estimate DiD treatment effect utilizing two-way fixed effects regression (`Outcome ~ Treat * Post + Unit_FE + Time_FE`) with clustered standard errors.',
        verificationMethod: 'Model outputs statistically significant treatment effect isolating +$18.40 AOV lift attributable directly to the campaign.',
        deliverables: ['TWFE econometrics model script', 'Causal lift executive briefing']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CSL-303',
      incidentPriority: 'P2 - Strategic Measurement',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'We launched a $2M television ad campaign in Texas but not in California or Florida. Standard before-and-after analysis is biased by overall market growth. Use DiD.',
      objectives: [
        'Formulate control and treatment state time-series datasets.',
        'Test and prove the parallel trends assumption mathematically.',
        'Calculate true incremental revenue lift with clustered standard errors.'
      ]
    },
    evaluationCriteria: {
      causalIdentificationStrategy: 45,
      regressionDiscipline: 35,
      executiveCommunication: 20
    }
  },
  {
    id: 'DA-L3-004',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'DBT Data Pipeline Transformation & Great Expectations',
    shortDescription: 'Refactor spaghetti SQL queries into modular DBT staging, intermediate, and dimensional marts with automated data testing suites.',
    competency: 'Analytics Engineering',
    skills: ['dbt', 'sql_modeling', 'great_expectations', 'data_testing'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-004-A',
        title: 'Modular DBT Staging & Marts Architecture',
        description: 'Structure dimensional models into `stg_orders`, `int_customer_metrics`, and `fct_daily_sales` following Kimball star schema modeling best practices.',
        verificationMethod: '`dbt compile` and `dbt run` execute with 0 compilation errors across all DAG dependencies.',
        deliverables: ['DBT project models directory', 'DAG lineage dependency chart']
      },
      {
        id: 'DA-L3-004-B',
        title: 'Automated Schema Tests & Great Expectations Assertions',
        description: 'Configure dbt `schema.yml` tests (unique, not_null, accepted_values, relationships) and Great Expectations assertions verifying order totals > 0.',
        verificationMethod: '`dbt test` executes 36 automated assertions catching intentional bad test records in CI pipeline.',
        deliverables: ['DBT schema test definitions', 'Great Expectations test suite config']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-DBT-304',
      incidentPriority: 'P2 - Architecture Modernization',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Our reporting relies on a single 1,200-line SQL query that breaks frequently and runs for 45 minutes. Modularize it into tested dbt models.',
      objectives: [
        'Deconstruct monolithic query into layered staging and marts models.',
        'Implement incremental materialization strategies.',
        'Add automated primary key uniqueness and foreign key relationship tests.'
      ]
    },
    evaluationCriteria: {
      dbtBestPractices: 40,
      testingThoroughness: 35,
      lineageClarity: 25
    }
  },
  {
    id: 'DA-L3-005',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Customer Lifetime Value (CLV) with BG/NBD and Gamma-Gamma',
    shortDescription: 'Implement Buy \'Til You Die (BTYD) probabilistic models in Python to predict future customer transaction frequency and lifetime monetary value.',
    competency: 'Customer Analytics',
    skills: ['clv_modeling', 'btyd', 'bg_nbd', 'gamma_gamma'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-005-A',
        title: 'BTYD Summary Matrix & BG/NBD Fitting',
        description: 'Convert transaction logs to Recency, Frequency, and Monetary (RFM-T) summary matrix and fit Beta-Geometric/Negative Binomial (BG/NBD) model.',
        verificationMethod: 'BG/NBD model parameters converge and predict customer repeat purchase probability within 4% of actual holdout period.',
        deliverables: ['RFM-T preparation script', 'BG/NBD model parameter report']
      },
      {
        id: 'DA-L3-005-B',
        title: 'Gamma-Gamma Monetary Value & Discounted CLV',
        description: 'Fit Gamma-Gamma submodel to predict expected transaction value and calculate 12-month discounted expected CLV at 10% annual discount rate.',
        verificationMethod: 'CLV output ranks top 1,000 future high-value prospects, decoupling past spend from expected forward profitability.',
        deliverables: ['Discounted CLV calculation script', 'Forward customer valuation table']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CLV-305',
      incidentPriority: 'P2 - High Value Marketing',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Past spend is a poor predictor of future value because many historic high spenders have already churned. Build a BTYD probabilistic CLV model.',
      objectives: [
        'Format customer order history into BTYD RFM-T format.',
        'Train BG/NBD model to estimate individual churn probability (P_alive).',
        'Train Gamma-Gamma model to project 12-month expected cash flows.'
      ]
    },
    evaluationCriteria: {
      probabilisticModeling: 45,
      modelValidationRigor: 30,
      commercialApplication: 25
    }
  },
  {
    id: 'DA-L3-006',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Real-Time Financial Transaction Anomaly Detection',
    shortDescription: 'Develop rolling Z-score and Isolation Forest algorithms on streaming payment transactions to detect payment fraud with low false alarm rates.',
    competency: 'Anomaly Detection',
    skills: ['isolation_forest', 'statistical_process_control', 'z_scores', 'streaming_data'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-006-A',
        title: 'Rolling Window Statistical Process Control (SPC)',
        description: 'Implement rolling mean and standard deviation on streaming transaction velocity, triggering statistical anomaly flags when observations exceed 3.5 sigmas.',
        verificationMethod: 'SPC rule catches sudden account transaction spikes while adapting to changing baseline volumes over time.',
        deliverables: ['Rolling SPC algorithm script', 'Velocity anomaly telemetry output']
      },
      {
        id: 'DA-L3-006-B',
        title: 'Multivariate Isolation Forest & Contamination Tuning',
        description: 'Train Scikit-Learn Isolation Forest across multiple features (amount, foreign IP flag, hour of day) and tune contamination rate to cap alert volume at < 1%.',
        verificationMethod: 'Model achieves 91% recall on historical confirmed fraud incidents with false positive rate < 0.8%.',
        deliverables: ['Isolation Forest model pipeline', 'ROC/PR benchmark curve']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-ANM-306',
      incidentPriority: 'P2 - Fraud Operations',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Rule-based fraud triggers are overwhelming our risk team with 80% false positives. Develop an intelligent machine-learning anomaly detector for live transactions.',
      objectives: [
        'Engineer multi-dimensional feature vectors from raw event logs.',
        'Implement an Isolation Forest algorithm for multivariate anomalies.',
        'Optimize classification thresholds to minimize operational alert fatigue.'
      ]
    },
    evaluationCriteria: {
      algorithmSelection: 40,
      falsePositiveControl: 35,
      productionPragmatism: 25
    }
  },
  {
    id: 'DA-L3-007',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'High-Dimensional Clustering for User Persona Discovery',
    shortDescription: 'Standardize 30 behavioral usage features, perform Principal Component Analysis (PCA), and fit K-Means clustering with Silhouette score optimization.',
    competency: 'Unsupervised Learning',
    skills: ['kmeans', 'pca', 'umap', 'silhouette_analysis'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-007-A',
        title: 'PCA Dimensionality Reduction & Scree Plot',
        description: 'Standardize skewed continuous features with StandardScaler, execute PCA, and analyze explained variance ratio across components to choose optimal dimensional reduction.',
        verificationMethod: 'Scree plot shows first 5 principal components explain 82% of total dataset variance.',
        deliverables: ['PCA transformation script', 'Explained variance scree plot']
      },
      {
        id: 'DA-L3-007-B',
        title: 'K-Means Clustering & Silhouette Evaluation',
        description: 'Iterate K from 2 to 10 evaluating Silhouette coefficients and Davies-Bouldin index, train optimal K-Means model, and profile centroid attributes into product personas.',
        verificationMethod: 'Optimal cluster count (K=4) maximizes average silhouette score (0.61) with clear business behavioral separation.',
        deliverables: ['Cluster optimization analysis', 'User persona behavioral radar chart']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CLU-307',
      incidentPriority: 'P2 - Product Discovery',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Product design wants to build tailored experiences for different user personas, but lacks quantitative definitions. Cluster 50,000 active accounts based on behavioral usage.',
      objectives: [
        'Normalize behavioral telemetry metrics.',
        'Apply PCA and evaluate the optimal cluster count mathematically.',
        'Map mathematical cluster centroids to distinct product persona narratives.'
      ]
    },
    evaluationCriteria: {
      unsupervisedRigour: 40,
      clusterDiagnostics: 35,
      personaSynthesis: 25
    }
  },
  {
    id: 'DA-L3-008',
    roleId: 'data_analyst',
    level: 3,
    levelLabel: 'Level 3: Advanced',
    title: 'Market Basket Analysis via FP-Growth & Association Rules',
    shortDescription: 'Convert 100,000 retail checkout transactions into one-hot basket matrices and mine frequent itemsets using FP-Growth with Lift > 2.5 filtering.',
    competency: 'Market Basket Analysis',
    skills: ['apriori', 'fp_growth', 'association_rules', 'cross_selling'],
    estimatedMinutes: 30,
    subtasks: [
      {
        id: 'DA-L3-008-A',
        title: 'Transaction Encoding & FP-Tree Construction',
        description: 'Transform transactional order logs into one-hot sparse matrices using mlxtend and construct FP-Growth tree with minimum support threshold of 0.015.',
        verificationMethod: 'FP-Growth algorithm mines frequent itemsets 8x faster than traditional Apriori without out-of-memory errors.',
        deliverables: ['Sparse matrix encoding script', 'Frequent itemsets table']
      },
      {
        id: 'DA-L3-008-B',
        title: 'Association Rule Mining & Cross-Sell Strategy',
        description: 'Generate association rules evaluating Support, Confidence, and Lift, filtering for Lift > 2.0 to eliminate spurious correlations, and design checkout cross-sell bundles.',
        verificationMethod: 'Identifies strong non-obvious bundle recommendations (e.g. coffee grinder + espresso scale with Lift 4.8 and Confidence 0.62).',
        deliverables: ['Association rules dataset', 'Cross-sell merchandising recommendation']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-MBA-308',
      incidentPriority: 'P2 - Merchandising Strategy',
      estimatedDurationMinutes: 30,
      scenarioBrief: 'Merchandising wants to configure an automated "Frequently Bought Together" recommendation widget on checkout. Mine transaction logs for high-lift association rules.',
      objectives: [
        'Encode transaction logs into efficient boolean sparse structures.',
        'Execute FP-Growth frequent itemset mining.',
        'Extract high-confidence association rules to power cross-sell recommendations.'
      ]
    },
    evaluationCriteria: {
      algorithmEfficiency: 40,
      ruleFilteringRigour: 35,
      businessMerchandisingValue: 25
    }
  },

  // ==========================================
  // LEVEL 4: CRITICAL INCIDENT (8 Tasks)
  // ==========================================
  {
    id: 'DA-L4-001',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Wall Street Earnings Metric Discrepancy & Revenue Restatement',
    shortDescription: 'Investigate 14% discrepancy between internal Stripe revenue logs and GAAP SEC 10-Q reporting tables, reconcile multi-currency orders, and prevent public earnings restatement.',
    competency: 'Financial Reporting Integrity',
    skills: ['audit_reconciliation', 'revenue_recognition', 'crisis_management', 'sql_debugging'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-001-A',
        title: 'Multi-Currency Ledger Reconciliations',
        description: 'Execute deep SQL reconciliation joining Stripe payment ledger against warehouse GAAP accounting tables, isolating discrepancies across FX currency conversions and refund timing.',
        verificationMethod: 'Isolate exact root cause: duplicate counting of partial refunds in multi-currency European EUR/GBP transactions.',
        deliverables: ['Ledger reconciliation audit table', 'Variance root cause diagnosis']
      },
      {
        id: 'DA-L4-001-B',
        title: 'GAAP Restatement Ledger & External Audit Package',
        description: 'Draft corrected revenue recognition SQL pipeline incorporating proper ASC 606 accrual logic and compile verifiable audit packet for external auditors (Big 4).',
        verificationMethod: 'Corrected ledger matches bank deposit statements to the penny across all 4 fiscal quarters.',
        deliverables: ['Corrected ASC 606 revenue pipeline', 'Auditor reconciliation sign-off document']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-401',
      incidentPriority: 'P0 - Financial / Regulatory Crisis',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'Two days before public Q3 earnings release, the external audit committee found a $12M variance between reported revenue and cash receipts. Find the root cause immediately.',
      objectives: [
        'Perform line-item reconciliation between billing gateways and ledger tables.',
        'Identify whether the bug is in exchange rate conversion or refund timing.',
        'Provide mathematically verified restatement numbers with audit trail.'
      ]
    },
    evaluationCriteria: {
      financialAuditRigor: 45,
      crisisSpeed: 35,
      regulatoryCompliance: 20
    }
  },
  {
    id: 'DA-L4-002',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Silent Data Corruption in Warehouse & Historical Fact Backfill',
    shortDescription: 'Faulty dbt incremental MERGE dropped updates for 90 days across core dimensional tables; reconstruct data lineage, backfill fact tables, and verify data consistency.',
    competency: 'Analytics Engineering',
    skills: ['data_warehouse_debugging', 'lineage_tracing', 'snowflake', 'data_integrity'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-002-A',
        title: 'Incremental Logic Flaw Diagnosis & Blast Radius Mapping',
        description: 'Examine dbt incremental model SQL logic to discover unhandled late-arriving dimension records that caused 2.4 million rows to silently drop update events.',
        verificationMethod: 'Trace complete data lineage graph identifying 18 downstream dependent dashboards displaying corrupted customer totals.',
        deliverables: ['Corruption root cause autopsy', 'Impacted downstream model registry']
      },
      {
        id: 'DA-L4-002-B',
        title: 'Partitioned Historical Backfill & Partition Checksum Validation',
        description: 'Author automated idempotency-safe backfill script reprocessing historical raw Kafka event partitions in 7-day chunks without locking production reporting tables.',
        verificationMethod: 'Post-backfill checksum validations prove row counts and numerical sums match raw source event stream with 0 delta.',
        deliverables: ['Idempotent historical backfill script', 'Integrity verification checksum certificate']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-402',
      incidentPriority: 'P0 - Data Warehouse Corruption',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'A flaw in an incremental dbt model silently skipped late-arriving events for three months. Core KPI dashboards across the entire company are rendering false numbers.',
      objectives: [
        'Diagnose the logic error in the incremental merge condition.',
        'Design a zero-downtime historical backfill plan across 90 partitions.',
        'Validate data integrity with cryptographic checksum comparisons.'
      ]
    },
    evaluationCriteria: {
      lineageDebuggingMastery: 40,
      backfillEngineering: 40,
      productionSafety: 20
    }
  },
  {
    id: 'DA-L4-003',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'High-Stakes A/B Test Sample Ratio Mismatch (SRM) Triage',
    shortDescription: 'Critical checkout A/B test exhibiting severe Sample Ratio Mismatch (SRM) with p-value < 10^-8; uncover Safari WebKit ITP cookie truncation and compute counterfactual lift.',
    competency: 'Experimentation & Causal Inference',
    skills: ['sample_ratio_mismatch', 'srm_investigation', 'chi_square', 'randomization_audit'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-003-A',
        title: 'Chi-Square Goodness-of-Fit SRM Detection',
        description: 'Execute Chi-Square goodness-of-fit test on observed 54,200 (Control) vs 41,800 (Variant) traffic split against expected 50/50 allocation, proving invalidity.',
        verificationMethod: 'Chi-square test yields p = 4.2e-14, definitively proving systemic assignment bias invalidate naive conversion metrics.',
        deliverables: ['SRM statistical calculation proof', 'Traffic allocation divergence report']
      },
      {
        id: 'DA-L4-003-B',
        title: 'Root-Cause Discovery & Post-Stratification Re-weighting',
        description: 'Isolate root cause: CDN caching bug dropping tracking headers on Safari iOS. Apply post-stratification inverse probability re-weighting to rescue test results.',
        verificationMethod: 'Propensity score re-weighting restores balanced counterfactual comparison, isolating true +2.1% variant lift without SRM bias.',
        deliverables: ['CDN assignment bug analysis', 'Re-weighted causal lift evaluation']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-403',
      incidentPriority: 'P0 - Invalidated Executive Experiment',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'Product VPs are about to deploy a major UI overhaul based on positive test results. Our SRM check flagged extreme assignment imbalance. Determine if the experiment is compromised.',
      objectives: [
        'Run statistical Chi-Square test to prove Sample Ratio Mismatch.',
        'Trace traffic delivery logs to isolate why users were dropped.',
        'Deliver a definitive verdict on whether results can be salvaged or test must rerun.'
      ]
    },
    evaluationCriteria: {
      experimentationIntegrity: 45,
      rootCauseTechnicalDepth: 35,
      salvageStrategyValidity: 20
    }
  },
  {
    id: 'DA-L4-004',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Catastrophic Enterprise Churn Surge & Survival Audit',
    shortDescription: 'Enterprise ARR cancellations surged 300% following v4.2 release; conduct Kaplan-Meier survival analysis and Cox Proportional Hazards regression to pinpoint toxic trigger.',
    competency: 'Customer Retention & Root Cause',
    skills: ['survival_analysis', 'kaplan_meier', 'cox_proportional_hazards', 'churn_audit'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-004-A',
        title: 'Kaplan-Meier Survival Curve Stratification',
        description: 'Fit Kaplan-Meier survival curves in Python lifelines, stratifying customer cohorts by platform version and enterprise tier to isolate survival curve divergence.',
        verificationMethod: 'Survival curves prove accounts using release v4.2 experience 3.8x higher hazard rate within first 14 days of upgrade.',
        deliverables: ['Kaplan-Meier survival curves', 'Cohort hazard rate comparison']
      },
      {
        id: 'DA-L4-004-B',
        title: 'Cox Proportional Hazards Multi-Variable Regression',
        description: 'Fit Cox regression across 15 covariates (features used, SSO enabled, API calls), pinpointing broken SAML SSO integration as responsible for 88% of cancellation risk.',
        verificationMethod: 'Cox model Hazard Ratio for broken SSO covariate equals 4.6 (p < 0.001), giving engineering immediate actionable bug target.',
        deliverables: ['Cox regression model results', 'Emergency executive retention roadmap']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-404',
      incidentPriority: 'P0 - Catastrophic Business Risk',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'Enterprise churn spiked from 0.8% to 3.2% monthly following the Q3 platform update. Conduct deep survival analysis to pinpoint the exact failure driver before board meeting.',
      objectives: [
        'Model time-to-churn using Kaplan-Meier estimators.',
        'Identify specific platform features associated with accelerated cancellation.',
        'Synthesize findings into an immediate engineering mitigation brief.'
      ]
    },
    evaluationCriteria: {
      survivalAnalysisMastery: 45,
      rootCauseIsolationSpeed: 35,
      executiveDecisiveness: 20
    }
  },
  {
    id: 'DA-L4-005',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Algorithmic Credit Scoring Bias & Disparate Impact Audit',
    shortDescription: 'Production automated lending model flagged for regulatory disparate impact ratio (<0.80) across protected classes; audit bias and implement Equalized Odds thresholding.',
    competency: 'AI Ethics & Fairness',
    skills: ['fairness_metrics', 'disparate_impact', 'equalized_odds', 'regulatory_compliance'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-005-A',
        title: 'Four-Fifths Rule & Disparate Impact Quantification',
        description: 'Calculate disparate impact ratios across protected demographic classes (gender, age, race proxies) on 100,000 automated loan approval decisions.',
        verificationMethod: 'Analysis demonstrates approval rate for protected group is 58% vs 82% for control group (Disparate Impact ratio 0.70 < legal threshold 0.80).',
        deliverables: ['Fairness metric audit table', 'Proxy feature correlation matrix']
      },
      {
        id: 'DA-L4-005-B',
        title: 'Equalized Odds Calibration & Mitigated Model Deployment',
        description: 'Apply post-processing Equalized Odds threshold tuning to equalize true positive and false positive rates across groups while preserving credit risk prediction.',
        verificationMethod: 'Mitigated decision threshold achieves Disparate Impact ratio 0.86 (>0.80) while maintaining overall portfolio default rate within 0.2%.',
        deliverables: ['Fairness-constrained decision thresholds', 'Regulatory compliance certification package']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-405',
      incidentPriority: 'P0 - Legal / Regulatory Compliance',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'The Consumer Financial Protection Bureau (CFPB) requested an audit of our automated underwriting engine under the Equal Credit Opportunity Act. Measure and remediate model bias.',
      objectives: [
        'Calculate disparate impact, demographic parity, and equalized odds.',
        'Identify proxy variables encoding historical bias.',
        'Recalibrate classification decision boundaries to satisfy regulatory thresholds.'
      ]
    },
    evaluationCriteria: {
      fairnessMetricPrecision: 45,
      regulatoryKnowledge: 35,
      tradeoffAnalysis: 20
    }
  },
  {
    id: 'DA-L4-006',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Ad Spend Bleed & Multi-Million Dollar Click Fraud Audit',
    shortDescription: 'Paid marketing ad spend draining at $80,000/day with 0 downstream conversions; uncover sophisticated residential proxy botnet click fraud and compile network refund claim.',
    competency: 'Ad Tech & Fraud Analytics',
    skills: ['click_fraud', 'ip_clustering', 'session_replay', 'marketing_audit'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-006-A',
        title: 'Click-to-Session Discrepancy & Behavioral Clustering',
        description: 'Correlate Google Ads click timestamps against server access logs to uncover 92,000 clicks lacking corresponding browser rendering or mouse movement telemetry.',
        verificationMethod: 'Clustering analysis identifies automated clicks originating from headless Chromium browsers cycling through residential proxies.',
        deliverables: ['Fraud pattern behavioral matrix', 'Non-human traffic cluster visualization']
      },
      {
        id: 'DA-L4-006-B',
        title: 'Forensic Audit Documentation & Placement Blacklist',
        description: 'Compile cryptographic evidence package quantifying $1.42M in invalid clicks, author formal refund dispute packet for Google Ads, and configure placement IP exclusions.',
        verificationMethod: 'Ad network approves 94% refund credit and placement exclusions immediately reduce invalid click volume by 98%.',
        deliverables: ['Ad network dispute dossier', 'IP & placement CIDR exclusion lists']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-406',
      incidentPriority: 'P0 - Financial Capital Bleed',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'Marketing acquisition budgets are being depleted in hours with zero pipeline impact. Analyze server logs and telemetry to expose bot click farms and recover wasted budget.',
      objectives: [
        'Match ad network click IDs with server request logs.',
        'Identify non-human browsing signatures (zero scroll, identical viewport, fixed intervals).',
        'Package forensic evidence to file formal refund claims with advertising platforms.'
      ]
    },
    evaluationCriteria: {
      forensicLogInvestigation: 45,
      fraudPatternRecognition: 35,
      financialRecoveryImpact: 20
    }
  },
  {
    id: 'DA-L4-007',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Global Supply Chain Shock & Linear Programming Optimization',
    shortDescription: 'Key international freight corridor shut down; formulate Linear Programming model in PuLP to optimize order fulfillment across remaining warehouses and maximize margin.',
    competency: 'Optimization & Operations',
    skills: ['linear_programming', 'pulp', 'supply_chain_optimization', 'monte_carlo'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-007-A',
        title: 'Supply Disruption Monte Carlo Scenario Modeling',
        description: 'Simulate inventory depletion and transit delays across 8 regional distribution centers under varying closure durations using Monte Carlo iterations.',
        verificationMethod: 'Simulation accurately projects exact stockout date for critical customer regions under status quo routing.',
        deliverables: ['Monte Carlo scenario simulation script', 'Regional vulnerability risk table']
      },
      {
        id: 'DA-L4-007-B',
        title: 'PuLP Linear Programming Routing Optimization',
        description: 'Formulate and solve LP optimization problem in Python PuLP: minimize transportation costs and stockout penalties subject to warehouse capacity and route availability.',
        verificationMethod: 'PuLP solver identifies optimal reallocation schedule preserving 92% of order deliveries while mitigating $3.5M in potential cancellation losses.',
        deliverables: ['PuLP LP optimization model script', 'Optimal fulfillment rerouting plan']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-407',
      incidentPriority: 'P0 - Operational Shock',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'A sudden strike shut down our primary port hub handling 60% of incoming stock. Build an operational optimization model to dynamically re-route inventory.',
      objectives: [
        'Model supply chain network as a constrained optimization problem.',
        'Define objective function: maximize satisfied customer demand while minimizing expediting fees.',
        'Solve using PuLP/SciPy and deliver actionable warehouse shipping directives.'
      ]
    },
    evaluationCriteria: {
      optimizationFormulation: 45,
      mathematicalRigour: 35,
      operationalExecution: 20
    }
  },
  {
    id: 'DA-L4-008',
    roleId: 'data_analyst',
    level: 4,
    levelLabel: 'Level 4: Critical Incident',
    title: 'Board Metric Fraud & Ghost Account Benford\'s Law Audit',
    shortDescription: 'Apply Benford\'s Law and digit frequency analysis on user signup timestamps and invoice totals to uncover artificially fabricated ghost metrics prior to Series B.',
    competency: 'Forensic Analytics',
    skills: ['benfords_law', 'fraud_detection', 'forensic_accounting', 'whistleblower_audit'],
    estimatedMinutes: 35,
    subtasks: [
      {
        id: 'DA-L4-008-A',
        title: 'Benford\'s Law First & Second Digit Frequency Testing',
        description: 'Calculate first-digit and second-digit probability distributions of transaction amounts, testing against Benford\'s law logarithmic distribution using Kolmogorov-Smirnov test.',
        verificationMethod: 'Digit analysis shows extreme deviation on digits 7 and 9 (p < 1e-12), signaling synthetic manual data fabrication.',
        deliverables: ['Benford distribution deviation test script', 'Digit frequency comparison chart']
      },
      {
        id: 'DA-L4-008-B',
        title: 'Ghost Account Network Isolation & Unvarnished Truth Deck',
        description: 'Isolate 85,000 synthetic ghost accounts created with automated batch scripts (identical signup second intervals, synthetic email generators), and produce verified truth metrics.',
        verificationMethod: 'Forensic report separates legitimate organic growth (+$14M ARR) from synthetic ghost additions (+$8M ARR) with cryptographic evidence.',
        deliverables: ['Ghost account forensic manifest', 'Unvarnished truth metric briefing for board']
      }
    ],
    missionDataTemplate: {
      missionCode: 'DA-CRIT-408',
      incidentPriority: 'P0 - Executive Integrity / Whistleblower',
      estimatedDurationMinutes: 35,
      scenarioBrief: 'An internal whistleblower alleged that user acquisition numbers are being falsified with bot signups before investor due diligence. Conduct an unvarnished forensic analysis.',
      objectives: [
        'Apply Benford\'s Law and statistical distribution tests on user growth metrics.',
        'Uncover automated bot patterns in signup timestamp intervals and IP subnets.',
        'Deliver a defensible, mathematically validated audit for the Board of Directors.'
      ]
    },
    evaluationCriteria: {
      forensicStatisticalTechniques: 45,
      unflinchingObjectivity: 35,
      boardLevelReporting: 20
    }
  }
];
