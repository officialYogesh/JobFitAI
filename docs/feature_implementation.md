# JobFit AI – Feature Implementation Plan

> **Document Version:** 1.0.1 (May 28 2025)  
> **Applies to:** Product Spec v1.0.2 & Technical Design v1.0.2  
> **Target MVP Window:** Weeks 1–5

---

## Legend

- **API** = Next.js API Route (Serverless Functions on Vercel)
- **FE** = Next.js Front-end
- **DB** = Supabase PostgreSQL + pgvector
- **TC** = Test Case
- **T-ID** = Unique Test Identifier

---

## Epic 1 – Project Scaffolding & CI/CD

| #   | Task                                                                       | Deliverable                        | Key Tests                                                     |
| --- | -------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| 1.1 | Create monorepo with Next.js 15 full-stack app with PNPM workspaces        | GitHub repo w/ ESLint, Prettier    | TC-E1: `pnpm install && pnpm test` passes zero-lint build     |
| 1.2 | Configure **Vercel** for full-stack deployment with direct Git integration | Auto-deploy on push, preview on PR | TC-E2: Vercel deployment status visible on GitHub PRs         |
| 1.3 | Configure **GitHub Action** for CI (lint & build verification only)        | Lint/build checks on PRs           | TC-E3: CI workflow finishes < 2 min, non-zero exit on failure |

---

## Epic 2 – Authentication (Google-only)

| #   | Task                                                                                      | File/Component       | Key Tests                                                                 |
| --- | ----------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------- |
| 2.1 | Enable Google provider in Firebase console (authentication only)                          | Console config       | —                                                                         |
| 2.2 | FE: Implement `useAuth()` hook (Firebase Web SDK) with enhanced navigation and logout     | `hooks/useAuth.ts`   | TC-A1: Jest – unauth → `null`, after login → returns `uid`                |
| 2.3 | FE: Protect pages with `<AuthGuard>` HOC and conditional navigation (Login/Logout states) | `_app.tsx`           | TC-A2: Cypress – visiting `/upload` redirects to `/login` when not authed |
| 2.4 | API: Create `/api/auth/verify` route to validate Firebase ID tokens                       | `api/auth/verify.ts` | TC-A3: Jest – call API without token → 401                                |

---

## Epic 3 – File Upload & Parsing

| #   | Task                                                           | File/Component            | Key Tests                                                          |
| --- | -------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| 3.1 | FE drag-and-drop component (PDF/DOCX/TXT)                      | `components/FileDrop.tsx` | TC-P1: React Testing Library – drop unsupported file → error toast |
| 3.2 | API `/api/parse` (PDF via server-side libraries, DOCX support) | `api/parse.ts`            | TC-P2: Jest – sample PDF returns plain text > 0 chars              |
| 3.3 | Hash text (`SHA-256`) & return `{docHash, text}`               | same                      | TC-P3: Same file → identical hash                                  |
| 3.4 | Database write to `sessions` table with auth verification      | DB                        | TC-P4: Test DB – doc record exists after parse                     |

---

## Epic 4 – Embedding & Vector Storage

| #   | Task                                                                                          | File/Component | Key Tests                                                |
| --- | --------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------- |
| 4.1 | Supabase project w/ `match_vectors` table (`chunk_text`, `vector`) & pgvector extension       | SQL migration  | TC-V1: psql – `\d match_vectors` shows `vector` column   |
| 4.2 | API `/api/embed` – check cache, if miss ➜ call shared Google AI with user key fallback (BYOK) | `api/embed.ts` | TC-V2: Jest mocks shared/user API – 3 chunks → 3 upserts |
| 4.3 | Set `ivfflat` index for cosine similarity                                                     | SQL            | TC-V3: query plan uses index (EXPLAIN)                   |

---

## Epic 5 – Analysis Chain

| #   | Task                                                                                                                       | File/Component   | Key Tests                                               |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| 5.1 | Design prompt templates (Role, Tailor, Diff, ATS, Gaps)                                                                    | `lib/prompts.ts` | TC-C1: Jest snapshot – prompts contain all placeholders |
| 5.2 | API `/api/analyze` – retrieve top-k (8) chunks, assemble chain, stream responses with shared Google AI (user key fallback) | `api/analyze.ts` | TC-C2: Integration – returns `fitScore` between 0–100   |
| 5.3 | Implement enhanced BYOK path (shared → user Google → other providers) for resilient API access                             | same             | TC-C3: Test fallback chain: shared → user → BYOK        |

---

## Epic 6 – Front-end Results & Diff Viewer

| #   | Task                                      | File/Component               | Key Tests                                             |
| --- | ----------------------------------------- | ---------------------------- | ----------------------------------------------------- |
| 6.1 | Progress bar and streaming output (SSE)   | `hooks/useAnalysisStream.ts` | TC-F1: Jest – stream chunk updates state sequentially |
| 6.2 | Diff viewer table (Original vs. Tailored) | `components/DiffTable.tsx`   | TC-F2: Render two texts, highlights changes           |
| 6.3 | Score card + keyword gap chips            | `components/ScoreCard.tsx`   | TC-F3: Cypress – uploading demo resume displays score |

---

## Epic 7 – Analytics & A/B Framework (Minimal)

| #   | Task                                            | File/Component   | Key Tests                                        |
| --- | ----------------------------------------------- | ---------------- | ------------------------------------------------ |
| 7.1 | GA4 property & env variable `NEXT_PUBLIC_GA_ID` | Vercel env       | —                                                |
| 7.2 | FE event helper `logEvent()`                    | `lib/ga.ts`      | TC-G1: Jest – `gtag` called with correct params  |
| 7.3 | Variant assignment util (hash-based)            | `lib/variant.ts` | TC-G2: Same `sessionId` returns constant variant |

---

## Epic 8 – Security & Rate Limiting

| #   | Task                                                                        | File/Component            | Key Tests                              |
| --- | --------------------------------------------------------------------------- | ------------------------- | -------------------------------------- |
| 8.1 | Database policies enforcing user access control in Supabase                 | `migrations/*.sql`        | TC-S1: Policy test – other user denied |
| 8.2 | API middleware for rate limiting 200 req/day per uid (memory counter + TTL) | `middleware/ratelimit.ts` | TC-S2: Exceed 200 calls → 429          |

---

## Epic 9 – Deployment & Smoke Tests

| #   | Task                                                 | Deliverable                 | Key Tests                               |
| --- | ---------------------------------------------------- | --------------------------- | --------------------------------------- |
| 9.1 | Vercel preview deploy triggers Playwright smoke test | `.github/workflows/e2e.yml` | TC-D1: `/` loads 200, "Sign in" visible |
| 9.2 | Jest unit tests for API routes and utilities         | same                        | TC-D2: `pnpm test` passes               |

---

## Test Coverage Summary

- **Unit tests:** Jest (hooks, utils, API routes) – 80 % lines.
- **Integration tests:** Supabase test DB + API route testing.
- **E2E tests:** Cypress/Playwright on Vercel preview.

---

## Acceptance Criteria for MVP

1. Authenticated user can upload JD & resume, receive fit score & tailored resume in ≤ 8 s p95.
2. Data stored securely with user access control; other users cannot access.
3. BYOK path functions (manual QA with GPT-4).
4. GA4 shows page-view + variant event traffic.
5. All automated tests pass in CI.
6. Cost-effective deployment with Next.js API routes instead of Firebase Functions.
