// src/lib/skills/gapEngine.js
// Deterministic Skill Gap Engine comparing candidate resume evidence against role requirements.
// Enforces strict zero-evidence policy for unverified course claims and missing project info.

/**
 * Calculates skill gaps given candidate extracted skills and role requirements
 * @param {Array} candidateSkills - Array of { name, resumeEvidence (0-1), evidenceLevel, evidence, hasProjectInfo, hasCertification }
 * @param {Array} roleRequirements - Array of { name, importance (0-1), category, description }
 * @returns {Array} Array of calculated gap objects sorted by priority
 */
export function calculateSkillGaps(candidateSkills = [], roleRequirements = []) {
  if (!roleRequirements || !roleRequirements.length) {
    return [];
  }

  // Create a lookup map for candidate evidence
  const candidateMap = new Map();
  candidateSkills.forEach(s => {
    const key = s.name.toLowerCase().trim();
    candidateMap.set(key, s);
  });

  const gapResults = roleRequirements.map(req => {
    const key = req.name.toLowerCase().trim();
    const candidateMatch = candidateMap.get(key);

    // Strict rule: if no match, evidence is strictly 0.0 (0%)
    const rawCandidateEvidence = candidateMatch ? Number(candidateMatch.resumeEvidence ?? 0) : 0.0;
    const candidateEvidence = Math.max(0, Math.min(1, rawCandidateEvidence));
    const roleRequirement = Number(req.importance || 0.75);
    
    // Raw gap (clamped >= 0)
    const rawGap = Math.max(0, roleRequirement - candidateEvidence);
    const gapPercentage = Math.round(rawGap * 100);

    // Alignment status determination
    let alignmentStatus = 'strong_alignment';
    if (candidateEvidence === 0 || rawGap > 0.30) {
      alignmentStatus = 'high_priority_gap';
    } else if (rawGap > 0.10) {
      alignmentStatus = 'development_opportunity';
    }

    // Weighted priority score:
    // Gap size * 1.5 + Role importance * 1.8 + Evidence scarcity penalty
    const isZero = candidateEvidence === 0;
    const evidenceLevel = candidateMatch?.evidenceLevel || (isZero ? 'zero' : 'limited');
    const evidencePenalty = isZero ? 0.40 : (evidenceLevel === 'limited' ? 0.20 : 0);
    const priorityScore = (rawGap * 1.5) + (roleRequirement * 1.8) + evidencePenalty;

    let priority = 'low';
    if (isZero || priorityScore >= 2.0 || rawGap >= 0.30) {
      priority = 'high';
    } else if (priorityScore >= 1.3 || rawGap >= 0.12) {
      priority = 'medium';
    }

    return {
      skill: req.name,
      category: req.category,
      description: req.description,
      candidateEvidence: Math.round(candidateEvidence * 100) / 100,
      candidateEvidencePercent: Math.round(candidateEvidence * 100),
      roleRequirement: Math.round(roleRequirement * 100) / 100,
      roleRequirementPercent: Math.round(roleRequirement * 100),
      gap: Math.round(rawGap * 100) / 100,
      gapPercentage,
      priority,
      priorityScore,
      alignmentStatus,
      isZeroValue: isZero,
      hasProjectInfo: candidateMatch?.hasProjectInfo || false,
      hasCertification: candidateMatch?.hasCertification || false,
      isRemarkedInvalid: candidateMatch?.isRemarkedInvalid || false,
      remarkStatus: candidateMatch?.remarkStatus || null,
      validationRemark: candidateMatch?.validationRemark || null,
      validationMethod: candidateMatch?.validationMethod || (candidateMatch?.hasCertification ? 'Accredited Certification' : candidateMatch?.hasProjectInfo ? 'Project Evidence Evaluated' : 'Invalid / Unverified Certification'),
      evidenceLevel: isZero ? 'zero' : evidenceLevel,
      evidence: candidateMatch?.evidence || (candidateMatch?.validationRemark ? [candidateMatch.validationRemark] : ['No verified project info or accredited certification found in resume (0% value).']),
      validationStatus: candidateMatch?.validationStatus || (candidateMatch?.isRemarkedInvalid ? 'invalid_until_certified' : 'validated')
    };
  });

  // Sort by priorityScore descending (highest urgency first)
  return gapResults.sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Calculates a statistical histogram grouping skills into 5 competency distribution tiers
 * @param {Array} skillGaps - Calculated skill gaps array
 * @returns {Array} Histogram bins data for Recharts BarChart
 */
export function calculateEvidenceHistogram(skillGaps = []) {
  const bins = [
    { tier: '0% - 20%', range: 'Zero / Unverified', candidateCount: 0, requirementCount: 0, description: 'Missing project info or unverified coursework' },
    { tier: '21% - 40%', range: 'Limited Evidence', candidateCount: 0, requirementCount: 0, description: 'Basic keyword or introductory mentions' },
    { tier: '41% - 60%', range: 'Developing', candidateCount: 0, requirementCount: 0, description: 'Moderate implementation across project work' },
    { tier: '61% - 80%', range: 'Proficient', candidateCount: 0, requirementCount: 0, description: 'Strong multi-project evidence & delivery' },
    { tier: '81% - 100%', range: 'Certified / Mastered', candidateCount: 0, requirementCount: 0, description: 'Accredited certification or deep production proof' }
  ];

  skillGaps.forEach(g => {
    const cScore = g.candidateEvidencePercent;
    const rScore = g.roleRequirementPercent;

    // Place candidate
    if (cScore <= 20) bins[0].candidateCount++;
    else if (cScore <= 40) bins[1].candidateCount++;
    else if (cScore <= 60) bins[2].candidateCount++;
    else if (cScore <= 80) bins[3].candidateCount++;
    else bins[4].candidateCount++;

    // Place requirement
    if (rScore <= 20) bins[0].requirementCount++;
    else if (rScore <= 40) bins[1].requirementCount++;
    else if (rScore <= 60) bins[2].requirementCount++;
    else if (rScore <= 80) bins[3].requirementCount++;
    else bins[4].requirementCount++;
  });

  return bins;
}

/**
 * Extracts top priority areas with constructive reasoning
 */
export function getPriorityAreas(gaps, limit = 3) {
  return gaps
    .filter(g => g.alignmentStatus !== 'strong_alignment')
    .slice(0, limit)
    .map(g => ({
      ...g,
      constructiveReason: g.candidateEvidencePercent === 0
        ? `${g.skill} is an essential role capability (${g.roleRequirementPercent}%), but has 0% evidence due to missing project descriptions or lack of accredited certifications. DayOne validates this directly in simulation.`
        : `${g.skill} requires practical demonstration. Role requirement is ${g.roleRequirementPercent}%, whereas your documented resume evidence indicates ${g.candidateEvidencePercent}%.`
    }));
}
