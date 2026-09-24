// server/lib/ai/gemini.js
// Centralized server-side AI evaluation service for Resume Intelligence, Gap Reasoning, and Mission Generation.
// Uses official @google/genai SDK with structured JSON enforcement, error handling, and demo fallback.

import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

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
 * Enforces strict rules:
 * - Standalone courses without accredited certification do NOT count as a skill (value = 0).
 * - Projects must contain project info (technologies, description). If absent, project value is 0.0.
 */
export async function analyzeResume(resumeText, targetRole, roleRequirements = []) {
  if (!client) {
    console.warn('[AI Evaluation Service] No API key detected. Using strict fallback evaluation engine.');
    return generateFallbackResumeAnalysis(resumeText, targetRole, roleRequirements);
  }

  const prompt = `You are DayOne's Rigorous AI Evaluation Engine for Resume Understanding.

STRICT EVALUATION POLICY:
1. COURSES WITHOUT CERTIFICATION DO NOT COUNT:
   - If a candidate only lists course names, bootcamps, or tutorials (e.g. "Completed React Course", "Udemy Python", "Coursera Web Dev") WITHOUT an accredited certification credential or license, DO NOT consider it as a verified skill. Set certification value to 0.0 and flag it under unverifiedCourseClaims.
   - Only recognized certifications (e.g. CompTIA, AWS Certified, Meta Certified, Cisco, Oracle, Kubernetes CKA, verified university diploma) provide certification evidence.
2. PROJECT INFO IS MANDATORY:
   - To receive project evidence, a project MUST provide concrete project info (technologies used, architectural responsibilities, deliverables).
   - If a candidate lists a skill only as a keyword without project info, or if no projects are entered for it, consider its project value as strictly 0.0.
   - If a skill has NO project info AND NO accredited certification, its resumeEvidence MUST be 0.0 (0%).
3. Distinguish between:
   - strong evidence (>= 0.70): clear project implementation with technical details and/or verified certification
   - moderate evidence (0.36 - 0.69): project mention with basic context
   - limited evidence (0.01 - 0.35): brief mention in work experience
   - zero evidence (0.00): unverified course claims, standalone keywords without project info, or omitted skills.

TARGET ROLE: ${targetRole}
ROLE CORE SKILLS:
${roleRequirements.map(r => `- ${r.name} (Importance: ${r.importance})`).join('\n')}

CANDIDATE RESUME TEXT:
${resumeText.slice(0, 12000)}

Return ONLY a single valid JSON object strictly matching this schema:
{
  "candidate": {
    "targetRole": "${targetRole}",
    "detectedName": "Candidate Name if found",
    "summary": "2-sentence summary of experience indicated by resume"
  },
  "provenance": {
    "verifiedCertifications": [
      { "name": "Certification Name", "issuer": "Issuer", "verified": true }
    ],
    "unverifiedCourseClaims": [
      { "courseName": "Course Name", "reason": "No official certification credential provided (scored 0%)" }
    ],
    "documentedProjects": [
      { "name": "Project Name", "hasProjectInfo": true, "technologies": ["React", "CSS"] }
    ]
  },
  "skills": [
    {
      "name": "Skill Name",
      "resumeEvidence": 0.85,
      "evidenceLevel": "strong",
      "hasProjectInfo": true,
      "hasCertification": false,
      "validationStatus": "not_validated",
      "evidence": [
        "Concrete project evidence quote or reason why scored 0"
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

    return {
      ...parsed,
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
Explain and prioritize the candidate's skill gaps against the target role requirements based on our strict AI Evaluation.

Use neutral, constructive, and empowering language.
If a candidate has a 0% evidence score due to lacking project details or missing certifications, note that practical simulation is the best way to prove the skill.

TARGET ROLE: ${candidateProfile.targetRole}
CALCULATED GAPS:
${JSON.stringify(calculatedGaps.slice(0, 5), null, 2)}

Return ONLY valid JSON:
{
  "priorityGaps": [
    {
      "skill": "Testing",
      "priority": "high",
      "reason": "High role demand (69%) with zero documented project info in resume. Practical simulation recommended.",
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

/* =========================================================
   STRICT FALLBACK ENGINE (Enforces Course & Project Rules)
   ========================================================= */

function generateFallbackResumeAnalysis(resumeText, targetRole, roleRequirements = []) {
  const textLower = (resumeText || '').toLowerCase();
  
  // 1. Detect Certifications (e.g. "certified", "comptia", "aws", "meta", "license", "credential")
  const verifiedCertifications = [];
  const certKeywords = ['certified', 'certification', 'license', 'credential', 'comptia', 'aws certified', 'cisco', 'security+'];
  certKeywords.forEach(kw => {
    if (textLower.includes(kw)) {
      const matchIndex = textLower.indexOf(kw);
      const snippet = resumeText.slice(Math.max(0, matchIndex - 10), Math.min(resumeText.length, matchIndex + 50)).trim();
      if (!verifiedCertifications.some(c => c.name.toLowerCase().includes(kw))) {
        verifiedCertifications.push({
          name: snippet.replace(/[\r\n]+/g, ' ').slice(0, 40),
          issuer: 'Accredited Credential Issuer',
          verified: true
        });
      }
    }
  });

  // 2. Detect Unverified Course Claims (e.g. "course", "udemy", "coursera", "bootcamp", "tutorial" WITHOUT credential)
  const unverifiedCourseClaims = [];
  const courseKeywords = ['udemy', 'coursera', 'bootcamp', 'codecademy', 'completed course', 'tutorial'];
  courseKeywords.forEach(kw => {
    if (textLower.includes(kw) && verifiedCertifications.length === 0) {
      unverifiedCourseClaims.push({
        courseName: `${kw.toUpperCase()} Coursework`,
        reason: 'Course listed without official accredited certification credential (scored 0% per strict evaluation rules)'
      });
    }
  });

  // 3. Extract Section-Specific Content
  let projectText = '';
  const projectHeaderMatch = resumeText.match(/(?:projects?|work experience|experience|deliverables|employment)[\s\S]*?(?=(?:education|certifications?|courses?|skills?|$))/i);
  if (projectHeaderMatch) {
    projectText = projectHeaderMatch[0].toLowerCase();
  } else {
    const lines = resumeText.split(/\r?\n/);
    const projectLines = lines.filter(l => 
      /(?:built|developed|engineered|implemented|designed|architected|deployed|created|fixed|migrated|refactored)\b/i.test(l)
    );
    projectText = projectLines.join(' ').toLowerCase();
  }

  let courseText = '';
  const courseHeaderMatch = resumeText.match(/(?:education|courses?|bootcamps?|certifications?)[\s\S]*?(?=(?:projects?|experience|deliverables|employment|skills?|$))/i);
  if (courseHeaderMatch) {
    courseText = courseHeaderMatch[0].toLowerCase();
  }

  const documentedProjects = [];
  if (projectText.length > 20) {
    documentedProjects.push({
      name: 'Documented Project Deliverables',
      hasProjectInfo: true,
      technologies: roleRequirements.filter(r => projectText.includes(r.name.toLowerCase())).map(r => r.name)
    });
  }

  // 4. Score Each Skill Strictly Under AI Evaluation Rules
  const skills = roleRequirements.map(req => {
    const skillNameLower = req.name.toLowerCase();
    const isMentioned = textLower.includes(skillNameLower);
    const isInsideProject = projectText.includes(skillNameLower);
    const isInsideCert = verifiedCertifications.some(c => c.name.toLowerCase().includes(skillNameLower));
    const isInsideCourseOnly = courseText.includes(skillNameLower) && !isInsideProject && !isInsideCert;

    let resumeEvidence = 0.0;
    let evidenceLevel = 'zero';
    let hasProjectInfo = false;
    let hasCertification = false;
    const evidence = [];

    if (isInsideCert) {
      hasCertification = true;
      resumeEvidence = 0.90;
      evidenceLevel = 'strong';
      evidence.push(`Verified through accredited industry certification credential in resume.`);
    }

    if (isInsideProject) {
      hasProjectInfo = true;
      const matches = (projectText.match(new RegExp(skillNameLower, 'g')) || []).length;
      if (matches >= 3) {
        resumeEvidence = Math.max(resumeEvidence, 0.85);
        evidenceLevel = 'strong';
        evidence.push(`Supported by ${matches} active project references with documented architectural details.`);
      } else {
        resumeEvidence = Math.max(resumeEvidence, 0.65);
        evidenceLevel = 'moderate';
        evidence.push(`Documented with active project implementation context.`);
      }
    }

    // STRICT RULE: If mentioned only as a keyword, or in a course without cert, or without project info:
    if (!hasProjectInfo && !hasCertification) {
      resumeEvidence = 0.0;
      evidenceLevel = 'zero';
      if (isInsideCourseOnly) {
        evidence.push(`Found only in course title/tutorial without official accredited certification credential. Scored 0% per strict evaluation rules.`);
      } else if (isMentioned) {
        evidence.push(`Listed as standalone keyword without project information or deliverables. Scored 0% value.`);
      } else {
        evidence.push(`No project info or certification credentials found in uploaded resume (0% value).`);
      }
    }

    return {
      name: req.name,
      resumeEvidence,
      evidenceLevel,
      hasProjectInfo,
      hasCertification,
      validationStatus: 'not_validated',
      evidence
    };
  });

  return {
    candidate: {
      targetRole,
      detectedName: 'Candidate Profile',
      summary: `AI Evaluation conducted against ${targetRole} production criteria. Skills strictly audited against documented project info and accredited certifications.`
    },
    provenance: {
      verifiedCertifications,
      unverifiedCourseClaims,
      documentedProjects
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
        ? `${gap.skill} is a critical role requirement (${gap.roleRequirementPercent}%), but has 0% documented evidence due to missing project info and lack of accredited certification. Practical simulation will validate your actual ability.`
        : `${gap.skill} is a core requirement (${gap.roleRequirementPercent}%), while your resume currently validates ${gap.candidateEvidencePercent}% project evidence.`,
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
