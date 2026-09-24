// server/lib/resume/parser.js
// Server-side resume parser extracting sanitized text from PDF and text documents.

import { PDFParse } from 'pdf-parse';

/**
 * Extracts and normalizes text from an uploaded resume file
 * @param {Buffer} buffer - File buffer
 * @param {string} fileName - Original file name
 * @param {string} mimeType - File MIME type
 * @returns {Promise<Object>} Extracted normalized resume text and metadata
 */
export async function extractResumeText(buffer, fileName = 'resume.pdf', mimeType = 'application/pdf') {
  if (!buffer || buffer.length === 0) {
    throw new Error('Empty resume file received. Please upload a valid document.');
  }

  // Maximum file size limit: 10MB
  if (buffer.length > 10 * 1024 * 1024) {
    throw new Error('Resume file exceeds 10MB limit. Please upload a smaller document.');
  }

  let rawText = '';

  const isPdf = mimeType.includes('pdf') || fileName.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    try {
      const parser = new PDFParse({ data: buffer });
      const textResult = await parser.getText();
      rawText = textResult?.text || '';
    } catch (pdfErr) {
      console.error('[PDF Parser Error]:', pdfErr);
      // Fallback: try reading as utf-8 string if it's not binary or was corrupted
      rawText = buffer.toString('utf-8');
      if (!rawText || rawText.replace(/[\x00-\x1F\x7F-\x9F]/g, '').length < 30) {
        throw new Error(`Failed to parse PDF document: ${pdfErr.message}. Ensure the file is a standard PDF.`);
      }
    }
  } else {
    // Plain text or UTF-8 encoded text / markdown / fallback
    rawText = buffer.toString('utf-8');
  }

  // Sanitize and normalize text:
  // - normalize unicode characters
  // - collapse excessive blank lines and tabs
  // - strip null and non-printable control characters
  const sanitizedText = rawText
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (sanitizedText.length < 50) {
    throw new Error('Extracted text from resume is too short (< 50 characters). Please upload a complete resume document.');
  }

  const wordCount = sanitizedText.split(/\s+/).filter(Boolean).length;

  return {
    text: sanitizedText,
    fileName,
    fileType: isPdf ? 'application/pdf' : 'text/plain',
    charCount: sanitizedText.length,
    wordCount
  };
}
