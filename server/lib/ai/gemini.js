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

CRITICAL EVALUATION POLICIES:
1. RESUME REJECTION POLICY:
   - If the candidate's resume has NO accredited certifications AND NO documented projects with project info (e.g. they only listed course titles, tutorials, bootcamps, or keyword lists without evidence), set "isRejected": true with "rejectionReason": "No accredited certifications or documented project deliverables found in uploaded resume. DayOne strictly requires accredited industry certification credentials or concrete project documentation with technologies and deliverables."
   - If the resume contains at least one verified accredited certification OR documented project deliverables, set "isRejected": false.

2. PROJECT KNOWLEDGE EVALUATION WITHOUT CERTIFICATION:
   - If a candidate has done a project with a skill (even without any certification), EVALUATE THE PROJECT info (technologies used, architectural responsibilities, context, deliverables) and assign their knowledge score based on that project (0.65 - 0.90).
   - Set "hasProjectInfo": true, "hasCertification": false, "validationMethod": "Project Experience Evaluated", "isRemarkedInvalid": false, "validationRemark": null.

3. SPECIFIC SKILL INVALID CERTIFICATION REMARK:
   - If a skill has NO project info, and its certification is missing, unaccredited, or invalid for that specific skill (e.g. course claims without official certificates):
     - DO NOT assign silent zero without remarking!
     - Set "resumeEvidence": 0.0, "isRemarkedInvalid": true, "remarkStatus": "invalid_certification", "validationRemark": "This skill is not valid until you submit a valid certification.", "validationMethod": "Invalid / Unverified Certification".
     - In evidence array, note: "This skill is not valid until you submit a valid certification."

4. ACCREDITED CERTIFICATIONS:
   - Only recognized official credentials (e.g. AWS Certified, CompTIA, Cisco, Meta, Oracle, Kubernetes CKA, Google Cloud, accredited university degree) provide certification evidence (0.85 - 0.95).

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
      "isRemarkedInvalid": false,
      "remarkStatus": null,
      "validationRemark": null,
      "validationMethod": "Project Experience Evaluated",
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
      isRejected: Boolean(parsed.isRejected),
      rejectionReason: parsed.rejectionReason || null,
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
  
  // 1. Detect Accredited Industry Certifications
  const verifiedCertifications = [];
  const recognizedCertPatterns = [
    /\b(aws\s+certified\s+[a-z0-9\s-]+)\b/i,
    /\b(comptia\s+(?:security\+|network\+|a\+|cyso\+|casp\+|linux\+))\b/i,
    /\b(cisco\s+certified\s+[a-z0-9\s-]+|ccna|ccnp|ccie)\b/i,
    /\b(google\s+cloud\s+certified\s+[a-z0-9\s-]+)\b/i,
    /\b(microsoft\s+certified\s+[a-z0-9\s-]+|azure\s+certified\s+[a-z0-9\s-]+)\b/i,
    /\b(meta\s+certified\s+[a-z0-9\s-]+)\b/i,
    /\b(certified\s+kubernetes\s+(?:administrator|application\s+developer)|cka|ckad)\b/i,
    /\b(cissp|ceh|certified\s+information\s+systems\s+security\s+professional)\b/i,
    /\b(certified\s+soc\s+analyst|csa)\b/i,
    /\b(certified\s+scrum\s+master|csm)\b/i
  ];

  recognizedCertPatterns.forEach(pattern => {
    const match = resumeText.match(pattern);
    if (match) {
      const matchText = match[0].trim();
      const matchLower = matchText.toLowerCase();
      const negRegex = new RegExp(`(?:no|without|not|lacks?|zero)\\s+[^.\\n]*?${matchLower.slice(0, 10)}`, 'i');
      if (!negRegex.test(textLower)) {
        if (!verifiedCertifications.some(c => c.name.toLowerCase() === matchLower)) {
          verifiedCertifications.push({
            name: matchText,
            issuer: 'Accredited Credential Authority',
            verified: true
          });
        }
      }
    }
  });

  // Explicit check: If text says "no certs", "no certifications", "no accredited certifications", empty the array
  if (/(?:no|without|zero|lacks?)\s+(?:accredited\s+)?(?:certifications?|certs?|credentials?|licenses?)\b/i.test(textLower)) {
    verifiedCertifications.length = 0;
  }

  // 2. Detect Unverified Course Claims (e.g. "udemy", "coursera", "bootcamp", "tutorial" WITHOUT credential)
  const unverifiedCourseClaims = [];
  const courseKeywords = ['udemy', 'coursera', 'bootcamp', 'codecademy', 'completed course', 'tutorial', 'youtube'];
  courseKeywords.forEach(kw => {
    if (textLower.includes(kw)) {
      unverifiedCourseClaims.push({
        courseName: `${kw.toUpperCase()} Coursework / Tutorial`,
        reason: 'Course listed without official accredited certification credential (scored 0% per strict evaluation rules)'
      });
    }
  });

  // 3. Extract Section-Specific Content
  let projectText = '';
  const projectHeaderMatch = resumeText.match(/(?:^|\r?\n)\s*(?:featured\s+)?(?:technical\s+)?(?:projects?|work\s+experience|professional\s+experience|experience|deliverables|employment)(?:[^\r\n]*?)[:\r\n][\s\S]*?(?=(?:(?:^|\r?\n)\s*(?:education|certifications?|courses?|online\s+courses?|bootcamps?|skills?)(?:[^\r\n]*?)[:\r\n]|$))/i);
  if (projectHeaderMatch) {
    projectText = projectHeaderMatch[0].toLowerCase();
  } else {
    const lines = resumeText.split(/\r?\n/);
    const projectLines = lines.filter(l => 
      /(?:built|developed|engineered|implemented|designed|architected|deployed|created|fixed|migrated|refactored)\b/i.test(l) &&
      !/(?:course|video|tutorial|bootcamp|lecture|watched|completed course)\b/i.test(l)
    );
    if (projectLines.length > 0) {
      projectText = projectLines.join(' ').toLowerCase();
    }
  }

  let courseText = '';
  const courseHeaderMatch = resumeText.match(/(?:^|\r?\n)\s*(?:education|courses?|online\s+courses?|bootcamps?|certifications?)(?:[^\r\n]*?)[:\r\n][\s\S]*?(?=(?:(?:^|\r?\n)\s*(?:projects?|work\s+experience|experience|deliverables|skills?)(?:[^\r\n]*?)[:\r\n]|$))/i);
  if (courseHeaderMatch) {
    courseText = courseHeaderMatch[0].toLowerCase();
  } else {
    courseText = textLower;
  }

  const documentedProjects = [];
  const projectTechs = roleRequirements.filter(r => projectText.includes(r.name.toLowerCase())).map(r => r.name);
  const hasProjectVerbs = /(?:built|developed|engineered|implemented|designed|architected|deployed|created|fixed|migrated|refactored)\b/i.test(projectText);
  const isNegativeProjectClaim = /(?:no\s+projects?|without\s+projects?|no\s+production\s+experience)\b/i.test(textLower);

  if (projectText.length > 25 && (projectTechs.length > 0 || hasProjectVerbs) && !isNegativeProjectClaim) {
    documentedProjects.push({
      name: 'Documented Project Deliverables',
      hasProjectInfo: true,
      technologies: projectTechs
    });
  }

  // Strict Policy 1: If resume contains NO certifications AND NO documented projects, REJECT IT
  const hasAnyCert = verifiedCertifications.length > 0;
  const hasAnyProject = documentedProjects.length > 0;
  const isRejected = !hasAnyCert && !hasAnyProject;
  const rejectionReason = isRejected
    ? "No accredited certifications or documented project deliverables were detected in the uploaded resume. Per DayOne's Strict AI Evaluation Standards, resumes without official credentials or documented projects cannot be evaluated."
    : null;

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
    let isRemarkedInvalid = false;
    let remarkStatus = null;
    let validationRemark = null;
    let validationMethod = 'Unverified';
    const evidence = [];

    // Branch A: Verified accredited certification
    if (isInsideCert) {
      hasCertification = true;
      resumeEvidence = 0.90;
      evidenceLevel = 'strong';
      validationMethod = 'Accredited Certification Credential';
      evidence.push(`Verified through accredited industry certification credential in resume.`);
    }

    // Branch B: Completed a project with the skill without certification -> evaluate project and assign knowledge
    if (isInsideProject) {
      hasProjectInfo = true;
      const matches = (projectText.match(new RegExp(skillNameLower, 'g')) || []).length;
      if (matches >= 3) {
        resumeEvidence = Math.max(resumeEvidence, 0.85);
        evidenceLevel = 'strong';
        evidence.push(`Evaluated from documented project: Supported by ${matches} active project implementations with architecture & code deliverables.`);
      } else {
        resumeEvidence = Math.max(resumeEvidence, 0.65);
        evidenceLevel = 'moderate';
        evidence.push(`Evaluated from documented project: Active implementation and technical deliverables.`);
      }
      validationMethod = hasCertification ? 'Certification + Project Evidence' : 'Project Experience Evaluated (No Cert Needed)';
    }

    // Branch C: Missing/invalid certification AND no project info -> Remark the skill!
    if (!hasProjectInfo && !hasCertification) {
      resumeEvidence = 0.0;
      evidenceLevel = 'zero';
      isRemarkedInvalid = true;
      remarkStatus = 'invalid_certification';
      validationRemark = 'This skill is not valid until you submit a valid certification.';
      validationMethod = 'Invalid / Unverified Certification';

      if (isInsideCourseOnly) {
        evidence.push(`Found only in course title or unaccredited tutorial. This skill is not valid until you submit a valid certification.`);
      } else if (isMentioned) {
        evidence.push(`Listed as standalone keyword without project information or deliverables. This skill is not valid until you submit a valid certification.`);
      } else {
        evidence.push(`No valid accredited certification or project info found. This skill is not valid until you submit a valid certification.`);
      }
    }

    return {
      name: req.name,
      resumeEvidence,
      evidenceLevel,
      hasProjectInfo,
      hasCertification,
      isRemarkedInvalid,
      remarkStatus,
      validationRemark,
      validationMethod,
      validationStatus: isRemarkedInvalid ? 'invalid_until_certified' : 'validated',
      evidence
    };
  });

  return {
    isRejected,
    rejectionReason,
    candidate: {
      targetRole,
      detectedName: 'Candidate Profile',
      summary: isRejected 
        ? 'Resume rejected: Missing required accredited certifications and project documentation.' 
        : `AI Evaluation conducted against ${targetRole} production criteria. Skills strictly audited against documented project info and accredited certifications.`
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
