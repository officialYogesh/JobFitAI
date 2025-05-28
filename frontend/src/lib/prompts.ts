/**
 * Prompt templates for JobFitAI analysis chain
 */

export const ROLE_PROMPT = `
You are an expert career consultant and resume optimization specialist. Your task is to analyze resumes against job descriptions and provide actionable feedback to help job seekers improve their application materials.

Focus on:
- Skills alignment and gaps
- Experience relevance
- Keyword optimization for ATS systems
- Professional presentation
- Quantifiable achievements

Provide constructive, specific, and actionable advice.
`;

export const TAILOR_PROMPT = `
Based on the provided resume and job description, create a tailored version of the resume that better aligns with the job requirements.

Resume:
{resumeText}

Job Description:
{jobDescription}

Instructions:
1. Preserve the candidate's actual experience and skills
2. Reorder and emphasize relevant experiences
3. Use keywords from the job description where appropriate
4. Enhance descriptions to highlight relevant achievements
5. Maintain professional tone and accuracy

Provide the tailored resume in the same format as the original.
`;

export const DIFF_PROMPT = `
Compare the original resume with the tailored version and highlight the key changes made.

Original Resume:
{originalResume}

Tailored Resume:
{tailoredResume}

Provide a summary of changes including:
- Sections modified
- Keywords added
- Emphasis changes
- New achievements highlighted
`;

export const ATS_PROMPT = `
Analyze this resume for ATS (Applicant Tracking System) optimization against the job description.

Resume:
{resumeText}

Job Description:
{jobDescription}

Evaluate:
1. Keyword density and relevance
2. Section formatting and headers
3. Skills section completeness
4. Experience descriptions optimization
5. Overall ATS-friendliness score (1-100)

Provide specific recommendations for ATS improvement.
`;

export const GAP_PROMPT = `
Identify skill and experience gaps between the resume and job requirements.

Resume:
{resumeText}

Job Description:
{jobDescription}

Analyze:
1. Required skills missing from resume
2. Preferred qualifications not addressed
3. Experience level mismatches
4. Industry-specific knowledge gaps
5. Certification or education requirements

Provide actionable steps to address each gap.
`;

export const FIT_SCORE_PROMPT = `
Calculate a comprehensive fit score (0-100) between this resume and job description.

Resume:
{resumeText}

Job Description:
{jobDescription}

Consider:
- Skills alignment (40%)
- Experience relevance (30%)
- Education requirements (15%)
- Industry knowledge (10%)
- Additional qualifications (5%)

Provide the score with detailed breakdown and justification.
`;

/**
 * Template replacement utility
 */
export function fillPromptTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, "g"), value);
  }

  return result;
}

/**
 * Analysis chain configuration
 */
export const ANALYSIS_CHAIN = [
  { name: "fit_score", prompt: FIT_SCORE_PROMPT },
  { name: "tailor", prompt: TAILOR_PROMPT },
  { name: "ats_check", prompt: ATS_PROMPT },
  { name: "gap_analysis", prompt: GAP_PROMPT },
] as const;

export type AnalysisStep = (typeof ANALYSIS_CHAIN)[number]["name"];
