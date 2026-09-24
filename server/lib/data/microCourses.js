// server/lib/data/microCourses.js
// Server copy of DayOne.ai Micro-Learning Modules Database v2.0
// Exported for Gemini API prompting and fallback task evaluation matching.

export const MICRO_LEARNING_DATABASE = {
  platform: 'DayOne.ai',
  databaseSchema: 'MicroLearningModules',
  version: '2.0',
  curriculum: {
    roles: [
      {
        roleId: 'frontend-developer',
        title: 'Frontend Developer',
        aliases: ['frontend', 'fe', 'frontend-developer', 'react-developer', 'web-developer'],
        domainImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
        learningModules: [
          {
            moduleId: 'fe-mod-01',
            title: 'State Management & Component Architecture',
            domainsCovered: [
              'React State Management',
              'Component Architecture',
              'State Lifecycle',
              'State Mutex'
            ],
            videoTitle: 'State Managers Are Making Your Code Worse In React',
            provider: 'Web Dev Simplified',
            videoUrl: 'https://www.youtube.com/watch?v=VenLRGHx3D4',
            domainImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fe-mod-02',
            title: 'Frontend Performance Optimization',
            domainsCovered: [
              'Frontend Performance',
              'Testing & Debugging',
              'Memory Leaks',
              'Render Thrashing'
            ],
            videoTitle: 'The ultimate guide to web performance',
            provider: 'Beyond Fireship',
            videoUrl: 'https://www.youtube.com/watch?v=0fONene3OIA',
            domainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fe-mod-03',
            title: 'Async Data Fetching & Error Handling',
            domainsCovered: [
              'API Integration',
              'Async Programming',
              'Error Handling',
              'Exponential Backoff',
              'Timeout Recovery'
            ],
            videoTitle: 'Asynchronous JavaScript Crash Course',
            provider: 'Traversy Media',
            videoUrl: 'https://www.youtube.com/watch?v=PoRJizFvM7s',
            domainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fe-mod-04',
            title: 'Modern UI: Responsive Design & Accessibility',
            domainsCovered: [
              'Responsive Design',
              'Accessibility',
              'WCAG',
              'Tap Targets'
            ],
            videoTitle: 'Learn CSS Accessibility in 20 Minutes',
            provider: 'freeCodeCamp',
            videoUrl: 'https://www.youtube.com/watch?v=W-LhVd5c90M',
            domainImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fe-mod-05',
            title: 'Forms & Client-Side Security',
            domainsCovered: [
              'Form Validation',
              'Authentication',
              'Client-Side Security',
              'Input Sanitization'
            ],
            videoTitle: 'React Hook Form - The Best Way To Handle Forms',
            provider: 'Web Dev Simplified',
            videoUrl: 'https://www.youtube.com/watch?v=RkXv4AANVGc',
            domainImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fe-mod-06',
            title: 'Offline States & Real-Time Sync',
            domainsCovered: [
              'Real-Time Applications',
              'Data Synchronization',
              'Offline Handling',
              'Release & Incident Recovery'
            ],
            videoTitle: 'Progressive Web Apps (PWA) - Build an Offline App',
            provider: 'Fireship',
            videoUrl: 'https://www.youtube.com/watch?v=sFsRylCQblw',
            domainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        roleId: 'backend-developer',
        title: 'Backend Developer',
        aliases: ['backend', 'be', 'backend-developer', 'nodejs-developer', 'api-engineer'],
        domainImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
        learningModules: [
          {
            moduleId: 'be-mod-01',
            title: 'Database Indexing & Query Optimization',
            domainsCovered: [
              'Database Management',
              'SQL & Query Optimization',
              'Transactions',
              'Lock Contention',
              'Indexing'
            ],
            videoTitle: 'Database Indexing Explained (with PostgreSQL)',
            provider: 'Hussein Nasser',
            videoUrl: 'https://www.youtube.com/watch?v=-qNSXK7s7_w',
            domainImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'be-mod-02',
            title: 'Caching Strategies & Background Jobs',
            domainsCovered: [
              'Caching',
              'Concurrency',
              'Background Jobs',
              'Redis',
              'Rate Limiting'
            ],
            videoTitle: 'Redis Crash Course (Caching in Node.js)',
            provider: 'Web Dev Simplified',
            videoUrl: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ',
            domainImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'be-mod-03',
            title: 'Distributed Systems & Event Processing',
            domainsCovered: [
              'Distributed Systems',
              'Event Processing',
              'API Performance',
              'Message Queues',
              'Idempotency'
            ],
            videoTitle: 'Top 7 Most-Used Distributed System Patterns',
            provider: 'ByteByteGo',
            videoUrl: 'https://www.youtube.com/watch?v=nH4qjmP2KEE',
            domainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'be-mod-04',
            title: 'REST APIs, Auth & Validation',
            domainsCovered: [
              'REST API Development',
              'Input Validation',
              'Authentication',
              'Authorization',
              'JWT Security'
            ],
            videoTitle: 'Node.js API Authentication with JWT',
            provider: 'Web Dev Simplified',
            videoUrl: 'https://www.youtube.com/watch?v=mbsmsi7IGXI',
            domainImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'be-mod-05',
            title: 'Backend Observability & Reliability',
            domainsCovered: [
              'Observability',
              'Reliability & Incident Recovery',
              'Logging',
              'Metrics & Tracing',
              'Error Boundaries'
            ],
            videoTitle: 'Logging and Error Handling in Node.js',
            provider: 'Programming with Mosh',
            videoUrl: 'https://www.youtube.com/watch?v=b0wFNDzH8GA',
            domainImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        roleId: 'full-stack-developer',
        title: 'Full Stack Developer',
        aliases: ['fullstack', 'fs', 'full-stack-developer', 'mern-developer'],
        domainImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
        learningModules: [
          {
            moduleId: 'fs-mod-01',
            title: 'Full Stack File Uploads & Data Validation',
            domainsCovered: [
              'File Uploads',
              'Form & Data Validation',
              'Multer',
              'Multipart Handling'
            ],
            videoTitle: 'Understanding File Uploads in Node.js using Multer',
            provider: 'The Full Stack Junkie',
            videoUrl: 'https://www.youtube.com/watch?v=EVOFt8Its6I',
            domainImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fs-mod-02',
            title: 'API Contracts & Client-Server Integration',
            domainsCovered: [
              'Frontend–Backend Integration',
              'API Contracts',
              'Payload Validation',
              'State Synchronization'
            ],
            videoTitle: 'Connect React to Node.js & Express API',
            provider: 'freeCodeCamp',
            videoUrl: 'https://www.youtube.com/watch?v=7CqJlxBYj-M',
            domainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fs-mod-03',
            title: 'End-to-End CRUD & Database Integration',
            domainsCovered: [
              'CRUD Systems',
              'Database Integration',
              'Data Consistency',
              'ACID Transactions'
            ],
            videoTitle: 'Build a MERN Stack App (CRUD & Deployment)',
            provider: 'Traversy Media',
            videoUrl: 'https://www.youtube.com/watch?v=pbvTWpbRuv4',
            domainImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fs-mod-04',
            title: 'Real-Time Full Stack Features',
            domainsCovered: [
              'Real-Time Features',
              'End-to-End Debugging',
              'WebSockets',
              'Event Emitters'
            ],
            videoTitle: 'Socket.io React & Node Tutorial',
            provider: 'PedroTech',
            videoUrl: 'https://www.youtube.com/watch?v=djMy4QsPWiI',
            domainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fs-mod-05',
            title: 'Full Stack Authentication Architecture',
            domainsCovered: [
              'Authentication',
              'Authorization',
              'Session Handling',
              'Role-Based Access'
            ],
            videoTitle: 'Next.js Authentication Crash Course',
            provider: 'Codevolution',
            videoUrl: 'https://www.youtube.com/watch?v=iWzJbM5x6Xk',
            domainImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'fs-mod-06',
            title: 'Deployment & Microservices Architecture',
            domainsCovered: [
              'Performance',
              'Deployment',
              'Distributed Integration',
              'Production Recovery'
            ],
            videoTitle: 'What Are Microservices Really All About?',
            provider: 'ByteByteGo',
            videoUrl: 'https://www.youtube.com/watch?v=lTAcCNbJ7KE',
            domainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        roleId: 'ui-ux-designer',
        title: 'UI/UX Designer',
        aliases: ['uiux-designer', 'ui_ux', 'designer', 'product-designer', 'ux-designer'],
        domainImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
        learningModules: [
          {
            moduleId: 'ux-mod-01',
            title: 'Foundations of User Research & Usability',
            domainsCovered: [
              'User Research',
              'Usability',
              'UX Problem Solving',
              'Qualitative Interviews'
            ],
            videoTitle: 'What Is User Research?',
            provider: 'Nielsen Norman Group',
            videoUrl: 'https://www.youtube.com/watch?v=what-is-user-research/',
            domainImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'ux-mod-02',
            title: 'Structuring the Experience: IA & User Flows',
            domainsCovered: [
              'Information Architecture',
              'User Flows',
              'Navigation Models',
              'Taxonomy'
            ],
            videoTitle: 'Information Architecture: 3 Key Models',
            provider: 'Nielsen Norman Group',
            videoUrl: 'https://www.youtube.com/watch?v=information-architecture-3-key-models/',
            domainImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'ux-mod-03',
            title: 'Scaling Design: Building Design Systems',
            domainsCovered: [
              'Design Systems',
              'Figma Tokens',
              'Component Libraries',
              'Auto-Layout'
            ],
            videoTitle: 'Build a Design System - Full Course',
            provider: 'UI Collective',
            videoUrl: 'https://www.youtube.com/watch?v=opTANvl9G1g',
            domainImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'ux-mod-04',
            title: 'Interaction, Responsiveness, & Accessibility',
            domainsCovered: [
              'Interaction Design',
              'Responsive Design',
              'Accessibility',
              'WCAG 2.1 AA',
              'Tap Targets'
            ],
            videoTitle: 'Design System 101: free Beginner Figma Tutorial for UIUX Designers',
            provider: 'Fast Track UX',
            videoUrl: 'https://www.youtube.com/watch?v=shuIfhrLIP0',
            domainImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'ux-mod-05',
            title: 'UX Analytics & Conversion Rate Optimization (CRO)',
            domainsCovered: [
              'Analytics',
              'Conversion Optimization',
              'Product UX',
              'Cart Abandonment',
              'Funnel Analysis'
            ],
            videoTitle: 'Measuring UX and ROI',
            provider: 'Nielsen Norman Group',
            videoUrl: 'https://www.youtube.com/watch?v=measuring-ux-and-roi/',
            domainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'ux-mod-06',
            title: 'Enterprise UX, Handoff & Stakeholder Communication',
            domainsCovered: [
              'Enterprise UX',
              'Design Handoff',
              'Stakeholder Communication',
              'Developer Specifications'
            ],
            videoTitle: 'Storytelling to Present UX Work',
            provider: 'Nielsen Norman Group',
            videoUrl: 'https://www.youtube.com/watch?v=storytelling-to-present-ux-work/',
            domainImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        roleId: 'cybersecurity-analyst',
        title: 'Cybersecurity Analyst',
        aliases: ['cybersecurity', 'security', 'cybersecurity-analyst', 'soc-analyst', 'secops'],
        domainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
        learningModules: [
          {
            moduleId: 'cy-mod-01',
            title: 'SOC Foundations & SIEM Investigation',
            domainsCovered: [
              'SIEM Investigation',
              'Threat Correlation',
              'Incident Detection',
              'Splunk',
              'Log Triage'
            ],
            videoTitle: 'Splunk Tutorial for SOC Analysts',
            provider: 'MyDFIR',
            videoUrl: 'https://www.youtube.com/watch?v=_8779Ms6k_E',
            domainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'cy-mod-02',
            title: 'Identity Threats & Phishing Analysis',
            domainsCovered: [
              'Authentication Monitoring',
              'Phishing Analysis',
              'Identity Security',
              'Credential Stuffing'
            ],
            videoTitle: 'Phishing Email Analysis Basics',
            provider: 'Blue Team Resources',
            videoUrl: 'https://www.youtube.com/watch?v=jcUZ-hnp474',
            domainImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'cy-mod-03',
            title: 'Endpoint Security & Malware Analysis',
            domainsCovered: [
              'Endpoint Security',
              'Malware Analysis',
              'Process Injection',
              'Reverse Engineering'
            ],
            videoTitle: 'Intro to Malware Analysis for Beginners',
            provider: 'TryHackMe',
            videoUrl: 'https://www.youtube.com/watch?v=tOlrV51v5MQ',
            domainImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'cy-mod-04',
            title: 'Perimeter Defense: Network & Cloud Security',
            domainsCovered: [
              'Network Monitoring',
              'Cloud Security',
              'Data Exfiltration Detection',
              'DNS Tunneling',
              'Firewalls'
            ],
            videoTitle: 'INCIDENT response - Cloud Security Tutorial',
            provider: 'LinkedIn Learning',
            videoUrl: 'https://www.youtube.com/watch?v=vL-GgeRBeHM',
            domainImage: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'cy-mod-05',
            title: 'The Incident Response Lifecycle & Threat Hunting',
            domainsCovered: [
              'Incident Response',
              'Containment',
              'Threat Hunting',
              'Security Documentation',
              'MITRE ATT&CK'
            ],
            videoTitle: 'Introduction to Cybersecurity Incident Response',
            provider: 'Struggle Security',
            videoUrl: 'https://www.youtube.com/watch?v=YZSM3YPn998',
            domainImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80'
          }
        ]
      },
      {
        roleId: 'data-analyst',
        title: 'Data Analyst',
        aliases: ['data', 'data_analyst', 'data-analyst', 'bi-analyst', 'analytics'],
        domainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        learningModules: [
          {
            moduleId: 'da-mod-01',
            title: 'Foundations of Data Preparation & Quality',
            domainsCovered: [
              'Data Cleaning',
              'SQL',
              'Data Quality',
              'Data Transformation'
            ],
            videoTitle: 'All About Data Cleaning and Transformation in SQL',
            provider: 'DataMites',
            videoUrl: 'https://www.youtube.com/watch?v=Pkt-GMeGI-4',
            domainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'da-mod-02',
            title: 'Exploratory Data Analysis & Anomaly Detection',
            domainsCovered: [
              'Exploratory Data Analysis',
              'Anomaly Detection',
              'Pandas',
              'Statistical Outliers'
            ],
            videoTitle: 'Tutorial: Exploratory Data Analysis in Python',
            provider: 'Coursera',
            videoUrl: 'https://www.youtube.com/watch?v=ZGbI-RZ5KGw',
            domainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'da-mod-03',
            title: 'Customer & Marketing Analytics',
            domainsCovered: [
              'Customer Analytics',
              'Marketing Analytics',
              'Customer Segmentation',
              'Cohort Analysis'
            ],
            videoTitle: 'Customer Segmentation Strategies & Best Practices In Adobe',
            provider: 'Adobe Analytics',
            videoUrl: 'https://www.youtube.com/watch?v=z3g3kZCYK5o',
            domainImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'da-mod-04',
            title: 'Business Metrics, Sales & Forecasting',
            domainsCovered: [
              'Business Metrics',
              'Sales Analytics',
              'Forecasting',
              'Trend Modeling'
            ],
            videoTitle: 'Lecture 10 : Introduction to Python for Forecasting',
            provider: 'Sales Forecasting Mastery',
            videoUrl: 'https://www.youtube.com/watch?v=UCSuevHbwhI',
            domainImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
          },
          {
            moduleId: 'da-mod-05',
            title: 'Data Visualization & Executive Reporting',
            domainsCovered: [
              'Dashboarding',
              'Data Visualization',
              'Experiment Analysis',
              'Business & Executive Reporting',
              'Tableau'
            ],
            videoTitle: 'Data Visualization & Executive Dashboarding with Tableau',
            provider: 'Simplilearn',
            videoUrl: 'https://www.youtube.com/watch?v=e_0-v18IqT0',
            domainImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80'
          }
        ]
      }
    ]
  }
};

export function extractYouTubeId(url = '') {
  if (!url) return null;
  const match = url.match(/(?:v=|\/embed\/|\/watch\?v=|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function getModuleImage(module = {}) {
  const ytId = extractYouTubeId(module.videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return module.domainImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';
}

export function normalizeCurriculumRoleId(roleId = '') {
  const clean = String(roleId).toLowerCase().trim();
  if (clean.includes('front') || clean === 'fe') return 'frontend-developer';
  if (clean.includes('full') || clean === 'fs') return 'full-stack-developer';
  if (clean.includes('back') || clean === 'be') return 'backend-developer';
  if (clean.includes('cyber') || clean.includes('sec') || clean.includes('soc')) return 'cybersecurity-analyst';
  if (clean.includes('ui') || clean.includes('ux') || clean.includes('design')) return 'ui-ux-designer';
  if (clean.includes('data') || clean.includes('anal')) return 'data-analyst';
  return 'frontend-developer';
}

export function getMicroCoursesByRole(roleId) {
  const normalized = normalizeCurriculumRoleId(roleId);
  const roleObj = MICRO_LEARNING_DATABASE.curriculum.roles.find(
    r => r.roleId === normalized || (r.aliases && r.aliases.includes(roleId?.toLowerCase()))
  );
  return roleObj ? roleObj.learningModules : MICRO_LEARNING_DATABASE.curriculum.roles[0].learningModules;
}

export function findMicroCourseForWeakness(roleId, weaknessQuery = '') {
  const modules = getMicroCoursesByRole(roleId);
  if (!modules || modules.length === 0) return null;

  const queryLower = (weaknessQuery || '').toLowerCase();
  let bestMatch = null;
  let highestScore = -1;

  modules.forEach(mod => {
    let score = 0;
    if (queryLower.includes(mod.title.toLowerCase()) || mod.title.toLowerCase().includes(queryLower)) {
      score += 15;
    }
    mod.domainsCovered.forEach(domain => {
      const dLower = domain.toLowerCase();
      if (queryLower.includes(dLower) || dLower.includes(queryLower)) {
        score += 20;
      }
      const words = dLower.split(/\s+/);
      words.forEach(w => {
        if (w.length > 3 && queryLower.includes(w)) {
          score += 5;
        }
      });
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = mod;
    }
  });

  if (!bestMatch || highestScore <= 0) {
    if (queryLower.includes('async') || queryLower.includes('retry') || queryLower.includes('timeout') || queryLower.includes('error')) {
      bestMatch = modules.find(m => m.moduleId === 'fe-mod-03' || m.moduleId === 'be-mod-05' || m.moduleId === 'fs-mod-02') || modules[0];
    } else if (queryLower.includes('state') || queryLower.includes('lock') || queryLower.includes('react')) {
      bestMatch = modules.find(m => m.moduleId === 'fe-mod-01') || modules[0];
    } else if (queryLower.includes('sql') || queryLower.includes('query') || queryLower.includes('database')) {
      bestMatch = modules.find(m => m.moduleId === 'be-mod-01' || m.moduleId === 'da-mod-01') || modules[0];
    } else if (queryLower.includes('siem') || queryLower.includes('threat') || queryLower.includes('incident')) {
      bestMatch = modules.find(m => m.moduleId === 'cy-mod-01' || m.moduleId === 'cy-mod-05') || modules[0];
    } else {
      bestMatch = modules[0];
    }
  }

  return {
    ...bestMatch,
    thumbnailUrl: getModuleImage(bestMatch)
  };
}
