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

- Embed JD & resume chunks via `text‑embedding‑3‑small` (OpenAI).
- Store vectors in Supabase `pgvector` (free tier) with metadata in Firestore.
- Retrieval: semantic + keyword hybrid (LangChain `HypotheticalDocRetriever`).
- **Bring‑Your‑Own‑Key (BYOK):** Users may supply an OpenAI key locally to unlock paid models.
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

- **Cost ceiling:** free‑tier services; BYOK users pay their own model costs.
- **Latency:** p95 < 8 s on GPT‑3.5 Turbo.
- **Security:** No anonymous access; HTTPS; Firebase rules enforce per‑user data isolation.

---

## 6 System Architecture (Excerpt)

Frontend **Vercel (Next.js)** → Firebase Auth (Google) → Cloud Functions (Node 20 us‑east1) → Supabase pgvector & Firestore.

---

## 7 MVP Scope (Weeks 1–5)

1. Google sign‑in flow
2. Upload & parsing
3. Fit score + rewritten summary + diff table
4. RAG grounding (OpenAI free)
5. GA4 basic events

---

## 8 About (Updated)

JobFitAI is powered by large language models (LLMs), Retrieval-Augmented Generation (RAG), and cloud-based AI APIs. We do not use custom machine learning algorithms. Our platform provides instant, evidence-based feedback and actionable insights to help job seekers optimize their resumes for any job application, with a strong focus on privacy and user control.

---

## 9 Roadmap

- **June:** MVP launch
