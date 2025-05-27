# JobFit AI – Product Specification

> **Version:** 1.0.1 (May 27 2025)  
> **Author:** Yogesh Patil  
> **License:** MIT (code) / CC-BY-4.0 (prompts & docs)

---

## 1 Vision & Goals

JobFit AI is a **privacy-first web tool** that enables registered users to:

1. **Diagnose fit** between their resume and any Job Description (JD).
2. Receive **LLM-generated, evidence-grounded feedback**—including rewritten summaries, ATS checks, keyword-gap analyses, and hallucination detection—powered by Retrieval-Augmented Generation (RAG) and cloud-based AI APIs (not custom ML algorithms).

---

## 2 User Persona

| Persona                  | Needs                                         | Success Metric                            |
| ------------------------ | --------------------------------------------- | ----------------------------------------- |
| **Authenticated Seeker** | Upload JD + resume, receive actionable advice | Improves fit score ≥ 20 % after revisions |

---

## 3 Core Use Cases

1. **Quick Match** _(after Google sign‑in)_: Copy‑paste or drag‑and‑drop JD & resume → fit score + feedback.
2. **Iterative Rewrite Loop**: User edits resume → re‑analyze → compare diffs.
3. **Email Report** _(future; opt‑in)_.

---

## 4 Functional Requirements

### 4.1 Upload & Parsing

- Accept PDF, DOCX, or raw text.
- Parse with `pdfplumber` / `docx2txt`; fallback to plain text.
- Detect parsing errors and surface human‑readable fixes.

### 4.2 RAG‑Powered Analysis

- Embed JD & resume chunks via Google embedding models (shared access) or `text‑embedding‑3‑small` (OpenAI BYOK).
- Store vectors in Supabase `pgvector` (free tier) with metadata in Firestore.
- Retrieval: semantic + keyword hybrid (LangChain `HypotheticalDocRetriever`).
- **Default Shared Access:** Google Gemini 2.0 Flash with shared API access for immediate use.
- **Enhanced Access:** Users can provide their own API keys for Google (personal limits), OpenAI, Anthropic, or Cohere models.
- **Rate Limit Fallback:** When shared limits are reached, users can add their own Google API key for continued access.
- Prompt chain executes **Role Prompt → Tailor Prompt → Diff Prompt → ATS Prompt → Gap Prompt**.

### 4.3 Authentication

- **Mandatory Google Sign‑In** via Firebase Auth.
- ID token required for every Cloud Function call.

### 4.4 Persistence & Privacy

- Session data stored under `users/{uid}` with 30‑day TTL.
- Resumes/JDs removed on user request or TTL expiry.

### 4.5 Error & Fallback Handling

- Embed fallback to Cohere, retries on timeouts, plain‑text fallback on parse failures.

---

## 5 Non‑Functional Requirements

- **Cost ceiling:** shared Google AI by default; user API keys for enhanced access at their own cost.
- **Latency:** p95 < 8 s on Gemini models (shared or personal access).
- **Security:** No anonymous access; HTTPS; Firebase rules enforce per‑user data isolation.

---

## 6 System Architecture (Excerpt)

Frontend **Vercel (Next.js)** → Firebase Auth (Google) → Cloud Functions (Node 20 us‑east1) → Supabase pgvector & Firestore.

---

## 7 MVP Scope (Weeks 1–5)

1. Google sign‑in flow
2. Upload & parsing
3. Fit score + rewritten summary + diff table
4. RAG grounding (shared Google AI + BYOK fallback)
5. GA4 basic events

---

## 8 About (Updated)

JobFitAI is powered by large language models (LLMs), Retrieval-Augmented Generation (RAG), and cloud-based AI APIs. We do not use custom machine learning algorithms. Our platform provides instant, evidence-based feedback and actionable insights to help job seekers optimize their resumes for any job application, with a strong focus on privacy and user control.

---

## 9 Roadmap

- **June:** MVP launch
