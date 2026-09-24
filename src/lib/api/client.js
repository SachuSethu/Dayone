// src/lib/api/client.js
// Client API service communicating with the DayOne.ai backend endpoints.

/**
 * 1. Extract resume text from file or text string
 */
export async function apiExtractResume({ file, text, fileName }) {
  if (file) {
    const formData = new FormData();
    formData.append('resume', file);
    
    const res = await fetch('/api/resume/extract', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to extract resume text.');
    }
    return data.data;
  }

  // Paste / direct text payload
  const res = await fetch('/api/resume/extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, fileName: fileName || 'resume.txt' })
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to extract resume text.');
  }
  return data.data;
}

/**
 * 2. Analyze resume intelligence with Gemini
 */
export async function apiAnalyzeResume(resumeText, targetRoleName, roleRequirements) {
  const res = await fetch('/api/ai/analyze-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      resumeText,
      targetRole: targetRoleName,
      roleRequirements
    })
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Resume analysis failed.');
  }
  return data.data;
}

/**
 * 3. Analyze skill gaps with Gemini reasoning
 */
export async function apiAnalyzeGaps(candidateProfile, roleRequirements, calculatedGaps) {
  const res = await fetch('/api/ai/analyze-gaps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      candidateProfile,
      roleRequirements,
      calculatedGaps
    })
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Gap analysis reasoning failed.');
  }
  return data.data;
}

/**
 * 4. Synthesize personalized First-Day Workplace Mission
 */
export async function apiGenerateMission(candidateProfile, targetRoleName, priorityGaps) {
  const res = await fetch('/api/ai/generate-mission', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      candidateProfile,
      targetRole: targetRoleName,
      priorityGaps
    })
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Mission synthesis failed.');
  }
  return data.data;
}

/**
 * 5. Check API health and Gemini configuration status
 */
export async function apiCheckHealth() {
  try {
    const res = await fetch('/api/health');
    return await res.json();
  } catch (err) {
    return { status: 'offline', geminiConfigured: false, mode: 'local_client_fallback' };
  }
}
