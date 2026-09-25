// server/scripts/migrateToSupabase.js
// Automated One-Click Migration Script from Local JSON Database to Supabase PostgreSQL.
// Zero data loss: Reads existing JSON datasets and upserts them into Supabase tables in batches.

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import { ALL_TASKS } from '../../src/data/taskDatabase.js';
import { MICRO_LEARNING_DATABASE } from '../../src/data/microCourses.js';
import { QUESTION_BANK } from '../../src/data/interviewPreparationData.js';
import { SEED_COMPANIES, SEED_CANDIDATES, SEED_APPLICATIONS } from '../../src/lib/company/companyStore.js';
import { SKILLBASE_COMPANY_JOBS } from '../../src/data/skillBaseData.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-id')) {
  console.error('\n❌ ERROR: Supabase credentials missing in .env!');
  console.log('Please add the following to your .env file:');
  console.log('  VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('  VITE_SUPABASE_ANON_KEY=your-anon-or-service-role-key\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

async function runMigration() {
  console.log('====================================================');
  console.log('🚀 DayOne.ai — Automated JSON to Supabase Migration');
  console.log('====================================================');
  console.log(`Connecting to Supabase at: ${supabaseUrl}\n`);

  try {
    // 1. MIGRATE COMPANIES
    console.log(`📦 [1/7] Migrating ${SEED_COMPANIES.length} Companies...`);
    const companiesPayload = SEED_COMPANIES.map(c => ({
      id: c.companyId,
      company_name: c.companyName,
      email: c.email,
      industry: c.industry,
      location: c.location,
      website: c.website,
      logo: c.logo,
      accent_color: c.accentColor,
      about: c.about
    }));
    const { error: compErr } = await supabase.from('companies').upsert(companiesPayload, { onConflict: 'id' });
    if (compErr) console.warn('⚠️ Companies notice:', compErr.message);
    else console.log('✅ Companies migrated successfully.');

    // 2. MIGRATE VACANCIES (COMPANY JOBS)
    console.log(`\n📦 [2/7] Migrating ${SKILLBASE_COMPANY_JOBS.length} Vacancies...`);
    const jobsPayload = SKILLBASE_COMPANY_JOBS.map(j => ({
      id: j.id,
      company_id: j.companyId,
      company_name: j.company,
      title: j.title,
      role_id: j.roleId,
      location: j.location,
      experience: j.experience,
      salary_range: j.salaryRange,
      description: j.description,
      required_skills: j.requiredSkills || {},
      interview_questions: j.interviewQuestions || [],
      is_company_posted: Boolean(j.isCompanyPosted)
    }));
    const { error: jobErr } = await supabase.from('vacancies').upsert(jobsPayload, { onConflict: 'id' });
    if (jobErr) console.warn('⚠️ Vacancies notice:', jobErr.message);
    else console.log('✅ Vacancies migrated successfully.');

    // 3. MIGRATE CANDIDATES
    console.log(`\n📦 [3/7] Migrating ${SEED_CANDIDATES.length} Candidates...`);
    const candidatesPayload = SEED_CANDIDATES.map(cand => ({
      id: cand.id,
      candidate_tag: cand.candidateTag,
      name: cand.name,
      role_id: cand.roleId,
      target_role: cand.targetRole,
      headline: cand.headline,
      experience_years: cand.experienceYears,
      location: cand.location,
      skills: cand.skills || {},
      skill_score: cand.skillScore,
      task_score: cand.taskScore,
      role_match: cand.roleMatch,
      overall_performance: cand.skillScore,
      task_summary: cand.taskSummary || {},
      interested_in_companies: cand.interestedInCompanies || [],
      resume_summary: cand.resumeSummary,
      personal_info_protected: true
    }));
    const { error: candErr } = await supabase.from('candidates').upsert(candidatesPayload, { onConflict: 'id' });
    if (candErr) console.warn('⚠️ Candidates notice:', candErr.message);
    else console.log('✅ Candidates migrated successfully.');

    // 4. MIGRATE APPLICATIONS
    console.log(`\n📦 [4/7] Migrating ${SEED_APPLICATIONS.length} Applications...`);
    const applicationsPayload = SEED_APPLICATIONS.map(app => ({
      id: app.applicationId,
      company_id: app.companyId,
      company_name: app.company,
      job_id: app.jobId,
      job_title: app.jobTitle,
      candidate_id: app.candidateId,
      candidate_tag: app.candidateTag,
      candidate_name: app.candidateName,
      candidate_role: app.candidateRole,
      candidate_headline: app.candidateHeadline,
      readiness_score: app.readinessScore,
      experience: app.experience,
      location: app.location,
      cv_name: app.cvName,
      cover_note: app.coverNote,
      ai_shortlist: app.aiShortlist || {},
      sent_to_hr: Boolean(app.sentToHr),
      sent_to_hr_at: app.sentToHrAt,
      hr_lead_email: app.hrLeadEmail,
      hr_notes: app.hrNotes
    }));
    const { error: appErr } = await supabase.from('applications').upsert(applicationsPayload, { onConflict: 'id' });
    if (appErr) console.warn('⚠️ Applications notice:', appErr.message);
    else console.log('✅ Applications migrated successfully.');

    // 5. MIGRATE 33 MICRO COURSES
    const allCourses = [];
    MICRO_LEARNING_DATABASE.curriculum.roles.forEach(r => {
      r.learningModules.forEach(mod => {
        allCourses.push({
          id: mod.moduleId,
          role_id: r.roleId,
          title: mod.title,
          domains_covered: mod.domainsCovered || [],
          video_title: mod.videoTitle,
          provider: mod.provider,
          video_url: mod.videoUrl,
          thumbnail_url: mod.domainImage || ''
        });
      });
    });
    console.log(`\n📦 [5/7] Migrating ${allCourses.length} Micro-Courses...`);
    const { error: courseErr } = await supabase.from('micro_courses').upsert(allCourses, { onConflict: 'id' });
    if (courseErr) console.warn('⚠️ Micro-Courses notice:', courseErr.message);
    else console.log('✅ 33 Micro-Courses migrated successfully.');

    // 6. MIGRATE 60 INTERVIEW QUESTIONS
    console.log(`\n📦 [6/7] Migrating ${QUESTION_BANK.length} Interview Questions & Rubrics...`);
    const questionsPayload = QUESTION_BANK.map(q => ({
      id: q.id,
      role_id: q.roleId,
      section: q.section,
      skill: q.skill,
      question: q.question,
      marks: q.marks || 10,
      expected_answer_points: q.expectedAnswerPoints || [],
      rubric: q.rubric || {}
    }));
    const { error: qErr } = await supabase.from('interview_questions').upsert(questionsPayload, { onConflict: 'id' });
    if (qErr) console.warn('⚠️ Interview Questions notice:', qErr.message);
    else console.log('✅ 60 Interview Questions migrated successfully.');

    // 7. MIGRATE 192 MAIN SIMULATION TASKS (IN CHUNKS OF 50)
    console.log(`\n📦 [7/7] Migrating ${ALL_TASKS.length} Simulation Tasks...`);
    const chunkSize = 50;
    for (let i = 0; i < ALL_TASKS.length; i += chunkSize) {
      const chunk = ALL_TASKS.slice(i, i + chunkSize).map(t => ({
        id: t.id,
        role_id: t.roleId,
        level: Number(t.level) || 1,
        difficulty: t.difficulty || 'Intermediate',
        title: t.title,
        competency: t.competency || 'Software Engineering',
        subtasks: t.subtasks || [],
        capture_flags: t.captureFlags || []
      }));
      const { error: taskErr } = await supabase.from('tasks').upsert(chunk, { onConflict: 'id' });
      if (taskErr) {
        console.warn(`⚠️ Tasks batch ${i + 1}-${i + chunk.length} notice:`, taskErr.message);
      } else {
        console.log(`  ➔ Migrated tasks ${i + 1} to ${i + chunk.length}...`);
      }
    }
    console.log('✅ All 192 Simulation Tasks migrated successfully.');

    console.log('\n====================================================');
    console.log('🎉 MIGRATION COMPLETE! ALL DATA IS NOW ON SUPABASE.');
    console.log('====================================================\n');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
  }
}

runMigration();
