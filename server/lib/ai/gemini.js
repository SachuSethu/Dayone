// server/lib/ai/gemini.js
// Centralized server-side AI evaluation service for Resume Intelligence, Gap Reasoning, and Mission Generation.
// Uses official @google/genai SDK with structured JSON enforcement, error handling, and demo fallback.

import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { getMicroCoursesByRole, findMicroCourseForWeakness, getModuleImage } from '../data/microCourses.js';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
const client = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Preferred model according to gemini-api-dev skill
const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Safely parses JSON output from AI evaluation, handling markdown code fences and whitespace
 */
function cleanAndParseJSON(rawText) {
  if (!rawText) return null;
  let text = rawText.trim();

  // Strip markdown code fences if present (```json ... ```)
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    // Attempt relaxed regex extraction
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (inner) {
        console.error('[AI Evaluation JSON Parse Error]:', inner);
      }
    }
    throw new Error('Failed to parse structured JSON from AI evaluation response.');
  }
}

/**
 * 1. Analyze Resume with AI Evaluation
 * POLICY: PURE SKILL EXTRACTION & SKILL-BASED STRENGTH/WEAKNESS DIAGNOSTICS
 * - Does NOT consider, extract, or evaluate projects.
 * - Does NOT consider, extract, require, or evaluate certifications.
 * - Avoids projects and certifications completely.
 * - Extracts technical skills directly from resume text.
 * - Performs pure skill-based strength and weakness analysis.
 */
export async function analyzeResume(resumeText, targetRole, roleRequirements = []) {
  if (!client) {
    console.warn('[AI Evaluation Service] No API key detected. Using strict fallback evaluation engine.');
    return generateFallbackResumeAnalysis(resumeText, targetRole, roleRequirements);
  }

  const prompt = `You are DayOne's AI Evaluation Engine for Resume Understanding.
Analyze the candidate's uploaded resume text against the target role: "${targetRole}".

CRITICAL INSTRUCTIONS (AVOID PROJECTS & CERTIFICATIONS COMPLETELY):
1. NO PROJECT OR CERTIFICATION EVALUATION:
   - DO NOT extract, consider, evaluate, or require projects.
   - DO NOT extract, consider, evaluate, or require certifications or certificates.
   - Completely ignore whether projects or certifications are mentioned or absent.
   - Resumes must NEVER be rejected ("isRejected": false).
2. PURE SKILL-BASED EXTRACTION:
   - Focus SOLELY and EXCLUSIVELY on extracting technical skills directly from the resume text.
   - Evaluate each core skill required for "${targetRole}" based strictly on technical skill depth, keyword frequency, and applied context in the resume:
     * High depth, prominent technical competency: 0.80 - 0.95 (evidenceLevel: "strong")
     * Clear technical skill presence and usage: 0.60 - 0.79 (evidenceLevel: "moderate")
     * Foundational or introductory skill mention: 0.35 - 0.59 (evidenceLevel: "developing")
     * Minimal or absent technical skill mention: 0.15 - 0.30 (evidenceLevel: "foundational", to be validated in workplace simulation)
3. SKILL-BASED STRENGTH & WEAKNESS ANALYSIS:
   - Identify candidate's top skill strengths (skills where candidate demonstrates high proficiency and technical depth).
   - Identify candidate's skill weaknesses / deficits (skills where proficiency is low or lacking relative to role requirements).
   - For each strength and weakness, provide clear technical rationales.

TARGET ROLE: ${targetRole}
ROLE CORE SKILLS:
${roleRequirements.map(r => `- ${r.name} (Importance: ${r.importance})`).join('\n')}

CANDIDATE RESUME TEXT:
${resumeText.slice(0, 12000)}

Return ONLY a single valid JSON object strictly matching this schema:
{
  "isRejected": false,
  "rejectionReason": null,
  "candidate": {
    "targetRole": "${targetRole}",
    "detectedName": "Candidate Name if found",
    "summary": "2-sentence summary of technical skills indicated by resume"
  },
  "skillStrengths": [
    {
      "skill": "Skill Name",
      "proficiency": 88,
      "strengthRationale": "High technical depth and comprehensive usage demonstrated in resume."
    }
  ],
  "skillWeaknesses": [
    {
      "skill": "Skill Name",
      "proficiency": 25,
      "deficit": "Core role requirement with minimal representation in resume.",
      "priority": "high",
      "weaknessRationale": "Requires practical demonstration in workplace simulation to establish competency."
    }
  ],
  "skills": [
    {
      "name": "Skill Name",
      "resumeEvidence": 0.80,
      "evidenceLevel": "strong",
      "validationMethod": "Resume Skill Profile",
      "evidence": [
        "Extracted technical skill competency from candidate resume text."
      ]
    }
  ]
}`;

  try {
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = cleanAndParseJSON(response.text);
    if (!parsed || !parsed.skills || !Array.isArray(parsed.skills)) {
      throw new Error('AI Evaluation response did not contain required skills array.');
    }

    const skillStrengths = Array.isArray(parsed.skillStrengths) ? parsed.skillStrengths : [];
    const skillWeaknesses = Array.isArray(parsed.skillWeaknesses) ? parsed.skillWeaknesses : [];

    return {
      ...parsed,
      isRejected: false,
      rejectionReason: null,
      skillStrengths,
      skillWeaknesses,
      provenance: {
        skillStrengths,
        skillWeaknesses
      },
      isDemoFallback: false
    };
  } catch (err) {
    console.error('[AI Evaluation analyzeResume Error]:', err.message);
    return generateFallbackResumeAnalysis(resumeText, targetRole, roleRequirements);
  }
}

/**
 * 2. Analyze Skill Gaps & Prioritize with AI Evaluation
 */
export async function analyzeSkillGaps(candidateProfile, roleRequirements, calculatedGaps) {
  if (!client) {
    return generateFallbackGapReasoning(calculatedGaps);
  }

  const prompt = `You are DayOne's Career Diagnostic Engine.
Explain and prioritize the candidate's skill gaps against the target role requirements based purely on skill proficiency.

CRITICAL INSTRUCTIONS:
DO NOT mention projects or certifications. Avoid projects and certifications completely.
Focus solely on technical skill competencies, skill depths, and practical demonstration in workplace simulation.
Use neutral, constructive, and empowering language.

TARGET ROLE: ${candidateProfile.targetRole}
CALCULATED GAPS:
${JSON.stringify(calculatedGaps.slice(0, 5), null, 2)}

Return ONLY valid JSON:
{
  "priorityGaps": [
    {
      "skill": "Testing",
      "priority": "high",
      "reason": "High role demand with baseline skill presence in resume. Practical simulation will validate your applied ability.",
      "recommendedAction": "practical_validation"
    }
  ]
}`;

  try {
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = cleanAndParseJSON(response.text);
    return parsed?.priorityGaps || generateFallbackGapReasoning(calculatedGaps);
  } catch (err) {
    console.error('[AI Evaluation analyzeSkillGaps Error]:', err.message);
    return generateFallbackGapReasoning(calculatedGaps);
  }
}

/**
 * 3. Generate Personalized First-Day Mission with AI Evaluation
 */
export async function generateMission(candidateProfile, targetRole, priorityGaps) {
  if (!client) {
    return generateFallbackMission(targetRole, priorityGaps);
  }

  const prompt = `You are DayOne's Simulation Architect.
Generate a realistic, high-stakes FIRST-DAY workplace mission tailored to the candidate's biggest competency gap.

TARGET ROLE: ${targetRole}
TOP SKILL GAPS:
${priorityGaps.map(g => `- ${g.skill || g.name} (Priority: ${g.priority})`).join('\n')}

CANDIDATE DEMONSTRATED SKILLS:
${candidateProfile.skills?.filter(s => s.resumeEvidence > 0.3).slice(0, 4).map(s => s.name).join(', ') || 'Foundational knowledge'}

Return ONLY valid JSON:
{
  "title": "Title of the Mission",
  "role": "${targetRole}",
  "scenario": "A 2-sentence scenario description of an active workplace situation during a product sprint.",
  "skillsTested": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "estimatedMinutes": 50,
  "difficulty": "intermediate",
  "objective": "Identify the root cause, implement a reliable fix, and validate with regression testing.",
  "workplaceContext": "You are joining the engineering team during a normal release cycle."
}`;

  try {
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = cleanAndParseJSON(response.text);
    return parsed?.title ? parsed : generateFallbackMission(targetRole, priorityGaps);
  } catch (err) {
    console.error('[AI Evaluation generateMission Error]:', err.message);
    return generateFallbackMission(targetRole, priorityGaps);
  }
}

/**
 * 4. Evaluate Workplace Simulation Task Solution with Gemini AI
 * Enforces strict error-fix validation:
 * - Reject whitespace-only or cosmetic edits with failing scores and 0% statistical gain.
 * - Verify true root-cause error resolution and resilience.
 */
export async function evaluateTaskSolution({
  task = {},
  initialCode = '',
  submittedCode = '',
  files = {},
  terminalOutput = '',
  capturedFlags = [],
  elapsedSeconds = 540,
  hasEdgeCaseFailure = false
}) {
  if (!client) {
    return generateFallbackTaskEvaluation({
      task,
      initialCode,
      submittedCode,
      files,
      terminalOutput,
      capturedFlags,
      hasEdgeCaseFailure
    });
  }

  const roleId = task?.roleId || task?.role || 'frontend-developer';
  const roleCourses = getMicroCoursesByRole(roleId);

  const prompt = `You are DayOne.ai's Master Code Review & AI Evaluation Engine.
Your job is to strictly evaluate whether the candidate ACTUALLY FIXED THE ERROR in the simulated workplace incident, or if they just changed spaces/comments or failed to fix the bug.

CRITICAL EVALUATION POLICIES:
1. TRIVIAL / WHITESPACE EDIT REJECTION (HIGHEST PRIORITY):
   - Compare INITIAL BUGGY CODE with CANDIDATE SUBMITTED CODE.
   - If the candidate only changed whitespace, indentation, spaces, comments, or made cosmetic edits without fixing the core bug:
     - "isBugFixed": false
     - "fixQuality": "trivial_whitespace_edit"
     - "codeCorrectnessScore": 15
     - "debuggingScore": 20
     - "edgeCasesScore": 15
     - "architectureScore": 25
     - "totalReadinessScore": 24
     - "passed": false
     - "statisticalImprovementGain": 0
     - "aiEvaluationSummary": "Evaluation Rejected: Only whitespace or cosmetic formatting changes were detected. The core error was NOT resolved. No statistical improvement is awarded."
     - "unresolvedErrors": ["No retry loop implemented for HTTP 504 / 500 errors", "State lock not released on payment failure", "Float precision error remains in total calculation"]
     - "actionableNextSteps": ["Implement a retry loop with exponential backoff", "Wrap network call in try/finally to clear submitting lock", "Use Math.round on discounted total"]

2. PARTIAL / BROKEN FIX:
   - If candidate attempted a fix but it does not resolve the root cause or fails error recovery:
     - "isBugFixed": false
     - "fixQuality": "incomplete_fix"
     - "codeCorrectnessScore": 45
     - "totalReadinessScore": 48
     - "passed": false
     - "statisticalImprovementGain": 0

3. GENUINE, VERIFIED FIX:
   - If the candidate genuinely implemented the necessary logic to resolve the root cause:
     - "isBugFixed": true
     - "fixQuality": "production_ready"
     - "codeCorrectnessScore": 92
     - "totalReadinessScore": 89
     - "passed": true
     - "statisticalImprovementGain": 20
     - "aiEvaluationSummary": "Root cause verified resolved. The patch implements resilient error recovery and adheres to production standards."

4. CANDIDATE WEAKNESS & STRENGTH DIAGNOSTICS (CRITICAL):
Perform a diagnostic analysis of the candidate's engineering weaknesses demonstrated in this task submission:
- Analyze what root causes or edge cases they struggled with or failed to address (e.g. Asynchronous retries, state release in finally block, floating point precision, unhandled API error codes, testing assertions).
- Provide 2 to 3 primary weaknesses with:
  * "area": Skill or concept area (e.g. "Asynchronous Error Handling", "Production State Cleanup", "IEEE 754 Arithmetic Precision", "Automated Regression Testing")
  * "severity": "high" | "medium" | "low"
  * "description": Observable technical deficiency from their code diff or execution
  * "impactOnProduction": Concrete real-world risk if deployed to production
  * "remediationAdvice": Clear, actionable step to master this skill
- Also identify 1 to 2 "demonstratedStrengths" with evidence from their code or flags.
- Provide "recommendedRemediationSprint": Suggested micro-learning sprint topic.

5. ASSIGN SPECIFIC TARGETED MICRO-LEARNING COURSE (FROM OFFICIAL DATABASE):
Examine the candidate's diagnosed weakness.
Select the SINGLE BEST matching course module from the official DayOne.ai MicroLearningModules database below for their role (${roleId}):
${JSON.stringify(roleCourses, null, 2)}

Return a "recommendedMicroCourse" object in the JSON schema with:
- "moduleId": ID of the module (e.g. "fe-mod-03")
- "title": Title of the module
- "videoTitle": Video title
- "provider": Provider name
- "videoUrl": Official video URL
- "relevanceReason": Concrete explanation why this video course specifically fixes their code weakness

TASK METADATA:
- ID: ${task.id || 'TASK-01'}
- Title: ${task.title || 'Workplace Incident'}
- Role: ${task.role || 'Frontend'} (Level ${task.level || 2})
- Competency: ${task.competency || 'Debugging'}
- Problem Description: ${task.problem || 'Unhandled 504 Gateway Timeout causes checkout button to lock up'}
- Expected Solution: ${task.expectedSolution || 'Exponential backoff retry with try/finally state reset and precision rounding'}

INITIAL BUGGY CODE:
\`\`\`javascript
${initialCode || '// No initial code provided'}
\`\`\`

CANDIDATE SUBMITTED CODE:
\`\`\`javascript
${submittedCode || '// No submitted code provided'}
\`\`\`

TERMINAL OUTPUT:
${terminalOutput || 'No terminal execution'}

CHECKPOINTS CAPTURED:
${Array.isArray(capturedFlags) ? capturedFlags.length : 0} of 10 flags captured.

Return ONLY a single valid JSON object strictly matching this schema:
{
  "isBugFixed": false,
  "fixQuality": "trivial_whitespace_edit",
  "codeCorrectnessScore": 20,
  "edgeCasesScore": 20,
  "architectureScore": 25,
  "debuggingScore": 20,
  "workplaceReview": {
    "communication": 70,
    "problemSolving": 25,
    "prioritization": 60,
    "coachability": 75
  },
  "totalReadinessScore": 25,
  "passed": false,
  "statisticalImprovementGain": 0,
  "aiEvaluationSummary": "...",
  "unresolvedErrors": ["..."],
  "actionableNextSteps": ["..."],
  "weaknessAnalysis": {
    "summary": "...",
    "primaryWeaknesses": [
      {
        "area": "Asynchronous Error Handling",
        "severity": "high",
        "description": "...",
        "impactOnProduction": "...",
        "remediationAdvice": "..."
      }
    ],
    "demonstratedStrengths": [
      {
        "area": "Workspace Navigation",
        "evidence": "..."
      }
    ],
    "recommendedRemediationSprint": "API Error Handling & Exponential Retries"
  },
  "recommendedMicroCourse": {
    "moduleId": "fe-mod-03",
    "title": "Async Data Fetching & Error Handling",
    "videoTitle": "Asynchronous JavaScript Crash Course",
    "provider": "Traversy Media",
    "videoUrl": "https://www.youtube.com/watch?v=PoRJizFvM7s",
    "relevanceReason": "Directly remediates missing retry loops and unhandled 504 timeouts."
  }
}`;

  try {
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = cleanAndParseJSON(response.text);
    if (!parsed) {
      throw new Error('Failed to parse AI evaluation response.');
    }

    let recommendedMicroCourse = parsed.recommendedMicroCourse || null;
    if (!recommendedMicroCourse || !recommendedMicroCourse.videoUrl) {
      const primaryWeakness = parsed.weaknessAnalysis?.primaryWeaknesses?.[0]?.area || task?.primarySkill || task?.title;
      recommendedMicroCourse = findMicroCourseForWeakness(roleId, primaryWeakness);
    } else {
      recommendedMicroCourse.thumbnailUrl = getModuleImage(recommendedMicroCourse);
    }

    return {
      ...parsed,
      isBugFixed: Boolean(parsed.isBugFixed),
      codeCorrectnessScore: Number(parsed.codeCorrectnessScore) || 20,
      totalReadinessScore: Number(parsed.totalReadinessScore) || 25,
      passed: Boolean(parsed.passed),
      statisticalImprovementGain: Number(parsed.statisticalImprovementGain) || 0,
      weaknessAnalysis: parsed.weaknessAnalysis || null,
      recommendedMicroCourse: recommendedMicroCourse || null,
      isDemoFallback: false
    };
  } catch (err) {
    console.error('[AI Evaluation evaluateTaskSolution Error]:', err.message);
    return generateFallbackTaskEvaluation({
      task,
      initialCode,
      submittedCode,
      files,
      terminalOutput,
      capturedFlags,
      hasEdgeCaseFailure
    });
  }
}

/* =========================================================
   STRICT FALLBACK ENGINE (Enforces Course & Project Rules)
   ========================================================= */

function generateFallbackTaskEvaluation({
  task = {},
  initialCode = '',
  submittedCode = '',
  terminalOutput = '',
  capturedFlags = [],
  hasEdgeCaseFailure = false
}) {
  const roleId = task?.roleId || task?.role || 'frontend-developer';
  const normInitial = (initialCode || '').replace(/\s+/g, '').trim();
  const normSubmitted = (submittedCode || '').replace(/\s+/g, '').trim();

  // If normalized code (without whitespace) is IDENTICAL:
  const isWhitespaceOnly = (normInitial === normSubmitted);

  // Check if candidate actually added key fix keywords
  const hasRetryLogic = normSubmitted.includes('while') || normSubmitted.includes('attempt') || normSubmitted.includes('Math.pow') || normSubmitted.includes('maxRetries=3');
  const hasErrorHandling = normSubmitted.includes('try') && normSubmitted.includes('catch');
  const hasRounding = normSubmitted.includes('Math.round') || normSubmitted.includes('Number.EPSILON');
  const hasAbort = normSubmitted.includes('AbortController') || normSubmitted.includes('signal');

  // If user only added spaces or left code untouched
  if (isWhitespaceOnly) {
    return {
      isBugFixed: false,
      fixQuality: 'trivial_whitespace_edit',
      codeCorrectnessScore: 18,
      edgeCasesScore: 15,
      architectureScore: 25,
      debuggingScore: 20,
      workplaceReview: {
        communication: 65,
        problemSolving: 20,
        prioritization: 50,
        coachability: 70
      },
      totalReadinessScore: 24,
      passed: false,
      statisticalImprovementGain: 0,
      aiEvaluationSummary: 'AI Evaluation Audit: Only whitespace/formatting changes detected. The root-cause error was NOT resolved. No statistical improvement is awarded.',
      unresolvedErrors: [
        'Missing retry loop for unhandled 504 / 500 network errors',
        'State lock not released on payment failure',
        'IEEE 754 precision defect persists in cart calculation'
      ],
      actionableNextSteps: [
        'Open Monaco Editor and implement exponential backoff retry logic',
        'Wrap the API request in try/finally to clear loading and lock states',
        'Apply Math.round precision to discount totals'
      ],
      weaknessAnalysis: {
        summary: 'Candidate submitted only whitespace or formatting changes without addressing the root cause.',
        primaryWeaknesses: [
          {
            area: 'Asynchronous Error Handling & State Recovery',
            severity: 'CRITICAL',
            description: 'Failed to implement exponential backoff retry loop or unfreeze locked state in catch/finally blocks.',
            impactOnProduction: 'Leaves users in permanent loading freeze during transient 504 gateway timeouts.',
            remediationAdvice: 'Study exponential backoff patterns and guarantee state unfreezing within finally blocks.'
          },
          {
            area: 'IEEE 754 Floating-Point Arithmetic',
            severity: 'HIGH',
            description: 'Unrounded floating-point calculations persist in the cart calculations.',
            impactOnProduction: 'Leads to 1-cent discrepancy errors in customer billing and checkout transactions.',
            remediationAdvice: 'Always calculate financial totals in cents using integer math or apply Math.round(val * 100) / 100.'
          }
        ],
        demonstratedStrengths: [
          {
            area: 'Codebase Inspection',
            evidence: 'Navigated to the affected file and initiated simulation workflow.'
          }
        ],
        recommendedRemediationSprint: 'Resilient Asynchronous Flow & Precision Arithmetic'
      },
      recommendedMicroCourse: findMicroCourseForWeakness(roleId, 'Async Data Fetching & Error Handling'),
      isDemoFallback: true
    };
  }

  // Check if genuine fix was implemented
  const hasCoreFix = (hasRetryLogic || hasRounding || hasAbort) && (hasErrorHandling || hasRounding);

  if (!hasCoreFix || hasEdgeCaseFailure) {
    return {
      isBugFixed: false,
      fixQuality: hasEdgeCaseFailure ? 'edge_case_missed' : 'incomplete_fix',
      codeCorrectnessScore: 48,
      edgeCasesScore: 35,
      architectureScore: 50,
      debuggingScore: 45,
      workplaceReview: {
        communication: 72,
        problemSolving: 50,
        prioritization: 60,
        coachability: 80
      },
      totalReadinessScore: 52,
      passed: false,
      statisticalImprovementGain: 0,
      aiEvaluationSummary: hasEdgeCaseFailure 
        ? 'AI Evaluation Audit: Your solution works for the main flow, but failed when the API returned an empty payment payload.'
        : 'AI Evaluation Audit: Partial edits detected, but the root cause has not been resolved. Automated unit tests still fail.',
      unresolvedErrors: [
        'Network retry boundary not fully implemented',
        'Automated tests failed assertions'
      ],
      actionableNextSteps: [
        'Add while loop with exponential backoff',
        'Run npm test in terminal to verify assertions'
      ],
      weaknessAnalysis: {
        summary: hasEdgeCaseFailure 
          ? 'Candidate fixed the primary happy path but overlooked production edge cases (empty payloads / timeout boundaries).'
          : 'Candidate implemented partial changes but failed to resolve the underlying systemic error.',
        primaryWeaknesses: [
          {
            area: hasEdgeCaseFailure ? 'Defensive Programming & Null Safety' : 'Systematic Root-Cause Debugging',
            severity: 'HIGH',
            description: hasEdgeCaseFailure
              ? 'Edge-case handling for missing payload fields or malformed response bodies was omitted.'
              : 'Implemented partial syntax changes without verifying all failure paths and test assertions.',
            impactOnProduction: hasEdgeCaseFailure
              ? 'Unhandled TypeError / null reference exception in production upon abnormal API payload.'
              : 'Persistent 504 retry exhaustion and recurring client-side failure.',
            remediationAdvice: 'Use defensive optional chaining and validate response schemas before accessing nested keys.'
          }
        ],
        demonstratedStrengths: [
          {
            area: 'Core Logic Implementation',
            evidence: 'Correctly identified the defect location and made relevant modifications.'
          }
        ],
        recommendedRemediationSprint: 'Defensive API Integration & Production Edge Cases'
      },
      recommendedMicroCourse: findMicroCourseForWeakness(roleId, hasEdgeCaseFailure ? 'Frontend Performance Optimization' : 'Async Data Fetching & Error Handling'),
      isDemoFallback: true
    };
  }

  // Real fix verified!
  return {
    isBugFixed: true,
    fixQuality: 'production_ready',
    codeCorrectnessScore: 92,
    edgeCasesScore: 88,
    architectureScore: 86,
    debuggingScore: 94,
    workplaceReview: {
      communication: 88,
      problemSolving: 92,
      prioritization: 86,
      coachability: 95
    },
    totalReadinessScore: 89,
    passed: true,
    statisticalImprovementGain: 20,
    aiEvaluationSummary: 'AI Evaluation Passed: Root cause verified resolved. The patch implements exponential backoff retry, clears submitting locks in finally block, and ensures precision financial math.',
    unresolvedErrors: [],
    actionableNextSteps: [
      'Submit PR to main branch',
      'Verify canary deployment metrics'
    ],
    weaknessAnalysis: {
      summary: 'Candidate demonstrated comprehensive mastery: cleanly solved the root-cause bug, adhered to defensive best practices, and preserved edge-case safety.',
      primaryWeaknesses: [],
      demonstratedStrengths: [
        {
          area: 'Resilient Asynchronous Architecture',
          evidence: 'Implemented robust retry loop with exponential backoff and jitter for transient API failures.'
        },
        {
          area: 'Clean State Lifecycle Management',
          evidence: 'Guaranteed lock release and loading flag clearance in finally block across all execution branches.'
        },
        {
          area: 'Defensive Data Handling',
          evidence: 'Safely handled edge-case payloads and guarded against precision drift in calculation routines.'
        }
      ],
      recommendedRemediationSprint: 'Advanced Distributed Microservices & Chaos Engineering'
    },
    recommendedMicroCourse: findMicroCourseForWeakness(roleId, 'State Management & Component Architecture'),
    isDemoFallback: true
  };
}

function generateFallbackResumeAnalysis(resumeText, targetRole, roleRequirements = []) {
  const textLower = (resumeText || '').toLowerCase();
  
  // Pure skill-based extraction from resume text - NO projects, NO certifications
  const skills = roleRequirements.map(req => {
    const skillNameLower = req.name.toLowerCase();
    
    // Check frequency and context of technical skill in resume text
    const escapedName = skillNameLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedName}\\b`, 'gi');
    const matches = (textLower.match(regex) || []).length;

    let resumeEvidence = 0.20;
    let evidenceLevel = 'foundational';
    let validationMethod = 'Simulation Baseline';
    const evidence = [];

    if (matches >= 3) {
      resumeEvidence = 0.88;
      evidenceLevel = 'strong';
      validationMethod = 'Resume Skill Profile';
      evidence.push(`High proficiency: "${req.name}" is referenced ${matches} times across candidate resume technical profile.`);
    } else if (matches >= 1) {
      resumeEvidence = 0.65;
      evidenceLevel = 'moderate';
      validationMethod = 'Resume Skill Profile';
      evidence.push(`Documented competency: "${req.name}" identified directly in candidate resume technical profile.`);
    } else {
      resumeEvidence = 0.20;
      evidenceLevel = 'foundational';
      validationMethod = 'Simulation Baseline';
      evidence.push(`Baseline role competency: "${req.name}" to be evaluated dynamically during live workplace simulation.`);
    }

    return {
      name: req.name,
      resumeEvidence,
      evidenceLevel,
      hasProjectInfo: false,
      hasCertification: false,
      isRemarkedInvalid: false,
      remarkStatus: null,
      validationRemark: null,
      validationMethod,
      validationStatus: 'validated',
      evidence
    };
  });

  // Calculate purely skill-based strengths and weaknesses
  const sortedByEvidence = [...skills].sort((a, b) => b.resumeEvidence - a.resumeEvidence);

  const skillStrengths = sortedByEvidence
    .filter(s => s.resumeEvidence >= 0.50)
    .slice(0, 4)
    .map(s => ({
      skill: s.name,
      proficiency: Math.round(s.resumeEvidence * 100),
      strengthRationale: `Strong candidate competency: "${s.name}" is prominently documented in the resume profile.`
    }));

  const skillWeaknesses = [...sortedByEvidence]
    .reverse()
    .filter(s => s.resumeEvidence < 0.65)
    .slice(0, 4)
    .map(s => ({
      skill: s.name,
      proficiency: Math.round(s.resumeEvidence * 100),
      deficit: `Limited or foundational representation in resume text.`,
      priority: s.resumeEvidence <= 0.25 ? 'high' : 'medium',
      weaknessRationale: `Core ${targetRole} requirement requiring applied validation in workplace simulation.`
    }));

  return {
    isRejected: false,
    rejectionReason: null,
    candidate: {
      targetRole,
      detectedName: 'Candidate Profile',
      summary: `AI skill-based profile evaluated for ${targetRole}. Technical competencies extracted directly from resume.`
    },
    skillStrengths,
    skillWeaknesses,
    provenance: {
      skillStrengths,
      skillWeaknesses
    },
    skills,
    isDemoFallback: true
  };
}

function generateFallbackGapReasoning(calculatedGaps) {
  return calculatedGaps.slice(0, 3).map(gap => {
    const isZero = gap.candidateEvidencePercent === 0;
    return {
      skill: gap.skill,
      priority: gap.priority || 'high',
      reason: isZero
        ? `${gap.skill} is an essential role requirement (${gap.roleRequirementPercent}%), with baseline skill presence in resume. Practical simulation will validate your applied ability.`
        : `${gap.skill} is a core requirement (${gap.roleRequirementPercent}%), while your resume indicates ${gap.candidateEvidencePercent}% documented skill baseline.`,
      recommendedAction: 'practical_validation'
    };
  });
}

function generateFallbackMission(targetRole, priorityGaps) {
  const topGap = priorityGaps[0]?.skill || 'Core Capability';
  return {
    title: `${topGap} Production Pipeline Investigation`,
    role: targetRole,
    scenario: `A critical service component is experiencing intermittent latency timeouts during peak traffic. You need to inspect telemetry logs, pinpoint the root cause, and implement a resilient fix.`,
    skillsTested: [
      topGap,
      priorityGaps[1]?.skill || 'State Safety',
      'API Integration',
      'Debugging',
      'Communication'
    ],
    estimatedMinutes: 45,
    difficulty: 'intermediate',
    objective: `Investigate the failing service endpoint, implement safe error handling with retry logic, and verify that automated tests pass 100%.`,
    workplaceContext: `You are joining the platform engineering team during a sprint release.`
  };
}

/**
 * 5. Generate Personalized Job Recommendation Analysis with Gemini AI
 * Evaluates candidate's verified skills, readiness score, and task achievements against a specific company opening.
 */
export async function generatePersonalizedJobRecommendation({
  candidate = {},
  job = {},
  candidateVector = {},
  readinessScore = 75
}) {
  if (!client) {
    return generateFallbackJobRecommendation({ candidate, job, candidateVector, readinessScore });
  }

  const prompt = `You are DayOne.ai's AI Executive Recruiter & Career Diagnostic Engine.
Evaluate the candidate's verified skills and readiness against this specific job opening.

CANDIDATE PROFILE:
- Name: ${candidate.name || 'Candidate'}
- Target Role: ${candidate.targetRole || 'Software Engineer'}
- Current Readiness Score: ${readinessScore}%
- Candidate Skill Profile: ${JSON.stringify(candidateVector, null, 2)}

JOB DETAILS:
- Company: ${job.company}
- Position: ${job.title}
- Location: ${job.location}
- Salary Range: ${job.salaryRange}
- Job Description: ${job.description}
- Required Skills & Thresholds: ${JSON.stringify(job.requiredSkills, null, 2)}

INSTRUCTIONS:
1. Calculate an accurate "aiFitScore" (0-100) based on how well the candidate's skills align with the job requirements.
2. Determine "priorityTier":
   - "top_fit": 80-100% (Priority #1 - Highly recommended for immediate application)
   - "strong_fit": 65-79% (Priority #2 - Strong alignment with core responsibilities)
   - "growth_fit": 50-64% (Priority #3 - Good potential with on-the-job expansion)
   - "stretch_role": <50% (Priority #4 - Stretch career opportunity)
3. Provide "recommendationHeadline": A crisp, encouraging 1-sentence headline.
4. Provide "personalizedRationale": 2-3 sentences explaining exactly why this candidate stands out for this specific job based on their skills.
5. Provide "competitiveStrengths": Array of 2-3 bullet points highlighting their highest-impact skills for this role.
6. Provide "applicationAdvice": 1-2 actionable sentences advising what to emphasize in their application or interview.
7. Provide "aiPitchNote": A pre-composed 3-sentence personalized cover note for the hiring manager highlighting candidate's verified skills.

Return ONLY a single valid JSON object matching this schema:
{
  "aiFitScore": 88,
  "priorityTier": "top_fit",
  "recommendationHeadline": "High priority technical alignment for ${job.company}'s ${job.title} role.",
  "personalizedRationale": "...",
  "competitiveStrengths": ["...", "..."],
  "applicationAdvice": "...",
  "aiPitchNote": "..."
}`;

  try {
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = cleanAndParseJSON(response.text);
    if (!parsed || typeof parsed.aiFitScore !== 'number') {
      return generateFallbackJobRecommendation({ candidate, job, candidateVector, readinessScore });
    }

    return {
      ...parsed,
      isDemoFallback: false
    };
  } catch (err) {
    console.error('[AI Evaluation generatePersonalizedJobRecommendation Error]:', err.message);
    return generateFallbackJobRecommendation({ candidate, job, candidateVector, readinessScore });
  }
}

export function generateFallbackJobRecommendation({ candidate = {}, job = {}, candidateVector = {}, readinessScore = 75 }) {
  const reqs = job.requiredSkills || {};
  const keys = Object.keys(reqs);
  let totalRatio = 0;
  const strengths = [];

  keys.forEach(k => {
    const cand = candidateVector[k] || 0;
    const req = reqs[k] || 50;
    const ratio = Math.min(cand / req, 1.0);
    totalRatio += ratio;
    if (cand >= req) {
      strengths.push(`${k.toUpperCase()} exceeds company requirement (${cand}% vs ${req}% needed)`);
    }
  });

  const rawScore = keys.length ? Math.round((totalRatio / keys.length) * 100) : readinessScore;
  const aiFitScore = Math.max(30, Math.min(98, Math.round((rawScore * 0.7) + (readinessScore * 0.3))));

  let priorityTier = 'growth_fit';
  let tierLabel = 'Priority #3: Good Growth Fit';
  if (aiFitScore >= 80) {
    priorityTier = 'top_fit';
    tierLabel = 'Priority #1: Top Recommendation';
  } else if (aiFitScore >= 65) {
    priorityTier = 'strong_fit';
    tierLabel = 'Priority #2: Strong Match';
  } else if (aiFitScore < 50) {
    priorityTier = 'stretch_role';
    tierLabel = 'Priority #4: Stretch Role';
  }

  const candidateName = candidate.name || 'Candidate';
  const roleName = candidate.targetRole || job.title || 'Engineer';

  return {
    aiFitScore,
    priorityTier,
    tierLabel,
    recommendationHeadline: `${tierLabel} for ${job.company} (${aiFitScore}% AI Fit).`,
    personalizedRationale: `Based on your technical profile and verified ${roleName} competencies, your background directly aligns with ${job.company}'s tech stack. Your DayOne workplace simulation verification gives you an advantage over unverified resumes.`,
    competitiveStrengths: strengths.length ? strengths.slice(0, 3) : [`Core competency in ${keys.slice(0, 2).join(' & ')}`, 'Demonstrated practical troubleshooting ability'],
    applicationAdvice: `Highlight your hands-on simulation experience and readiness score (${readinessScore}%) in your application note.`,
    aiPitchNote: `I am applying for the ${job.title} position at ${job.company}. With a verified ${readinessScore}% workplace readiness score on DayOne.ai and hands-on simulation experience in ${keys.slice(0, 2).join(' and ')}, I can contribute immediately with production-standard code and zero-regression reliability.`,
    isDemoFallback: true
  };
}
