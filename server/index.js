// server/index.js
// Express API backend for DayOne.ai Resume Intelligence & Gemini Gap Analysis.

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { extractResumeText } from './lib/resume/parser.js';
import { analyzeResume, analyzeSkillGaps, generateMission } from './lib/ai/gemini.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup CORS & JSON body parsing
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Setup multer memory storage for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * Health check & status endpoint
 */
app.get('/api/health', (req, res) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiConfigured: hasGeminiKey,
    engine: 'DayOne AI Evaluation Engine',
    mode: hasGeminiKey ? 'live_ai_evaluation' : 'intelligent_demo_simulation'
  });
});

/**
 * 1. Extract Resume Text
 * Accepts multipart/form-data with 'resume' file OR json with { text, fileName }
 */
app.post('/api/resume/extract', upload.single('resume'), async (req, res) => {
  try {
    if (req.file) {
      const extracted = await extractResumeText(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      return res.json({ success: true, data: extracted });
    }

    if (req.body && req.body.text) {
      const extracted = await extractResumeText(
        Buffer.from(req.body.text, 'utf-8'),
        req.body.fileName || 'resume_pasted.txt',
        'text/plain'
      );
      return res.json({ success: true, data: extracted });
    }

    return res.status(400).json({
      success: false,
      error: 'No resume file or text content provided. Please upload a PDF or paste resume text.'
    });
  } catch (err) {
    console.error('[API /resume/extract Error]:', err.message);
    return res.status(422).json({
      success: false,
      error: err.message || 'Failed to extract resume text.'
    });
  }
});

/**
 * 2. Analyze Resume Intelligence with Gemini
 */
app.post('/api/ai/analyze-resume', async (req, res) => {
  try {
    const { resumeText, targetRole, roleRequirements } = req.body;
    if (!resumeText) {
      return res.status(400).json({ success: false, error: 'resumeText is required.' });
    }
    if (!targetRole) {
      return res.status(400).json({ success: false, error: 'targetRole is required.' });
    }

    const candidateProfile = await analyzeResume(resumeText, targetRole, roleRequirements || []);
    return res.json({ success: true, data: candidateProfile });
  } catch (err) {
    console.error('[API /ai/analyze-resume Error]:', err.message);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal AI analysis error.'
    });
  }
});

/**
 * 3. Analyze Skill Gaps & Prioritize
 */
app.post('/api/ai/analyze-gaps', async (req, res) => {
  try {
    const { candidateProfile, roleRequirements, calculatedGaps } = req.body;
    if (!candidateProfile || !calculatedGaps) {
      return res.status(400).json({
        success: false,
        error: 'candidateProfile and calculatedGaps are required.'
      });
    }

    const priorityGaps = await analyzeSkillGaps(
      candidateProfile,
      roleRequirements || [],
      calculatedGaps || []
    );
    return res.json({ success: true, data: priorityGaps });
  } catch (err) {
    console.error('[API /ai/analyze-gaps Error]:', err.message);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal Gap Analysis error.'
    });
  }
});

/**
 * 4. Generate Personalized First-Day Workplace Mission
 */
app.post('/api/ai/generate-mission', async (req, res) => {
  try {
    const { candidateProfile, targetRole, priorityGaps } = req.body;
    if (!targetRole || !priorityGaps) {
      return res.status(400).json({
        success: false,
        error: 'targetRole and priorityGaps are required.'
      });
    }

    const mission = await generateMission(candidateProfile || {}, targetRole, priorityGaps);
    return res.json({ success: true, data: mission });
  } catch (err) {
    console.error('[API /ai/generate-mission Error]:', err.message);
    return res.status(500).json({
      success: false,
      error: err.message || 'Mission generation error.'
    });
  }
});

// Only start standalone listener when executed directly (e.g. `node server/index.js`)
import { fileURLToPath } from 'url';

const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith('server/index.js') || 
  process.argv[1].endsWith('server\\index.js') ||
  fileURLToPath(import.meta.url) === process.argv[1]
);

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`[DayOne.ai Backend Server] Running on http://localhost:${PORT}`);
  });
}

export default app;
