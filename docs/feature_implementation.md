# JobFit AI – Feature Implementation Plan

> **Document Version:** 1.0.0 (May 24 2025)  
> **Applies to:** Product Spec v1.0.0 & Technical Design v1.0.0  
> **Target MVP Window:** Weeks 1–5

---

## Legend

- **CF** = Firebase Cloud Function (Node 20)
- **FE** = Next.js Front-end
- **DB** = Firestore / Supabase pgvector
- **TC** = Test Case
- **T-ID** = Unique Test Identifier

---

## Epic 1 – Project Scaffolding & CI/CD

| #   | Task                                                                                             | Deliverable                     | Key Tests                                                  |
| --- | ------------------------------------------------------------------------------------------------ | ------------------------------- | ---------------------------------------------------------- |
| 1.1 | Create monorepo (`/frontend`, `/functions`) with PNPM workspaces                                 | GitHub repo w/ ESLint, Prettier | TC-E1: `pnpm install && pnpm test` passes zero-lint build  |
| 1.2 | Configure **Vercel** for `/frontend` (Preview & Prod)                                            | Auto-deploy preview on PR       | TC-E2: Vercel deployment status check via GitHub Action    |
| 1.3 | Configure **GitHub Action** to deploy CFs via `firebase deploy --only functions,firestore:rules` | Prod CF running                 | TC-E3: Workflow finishes < 5 min, non-zero exit on failure |

---

## Epic 2 – Authentication (Google-only)

| #   | Task                                                          | File/Component     | Key Tests                                                                    |
| --- | ------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| 2.1 | Enable Google provider in Firebase console (us-east1)         | Console config     | —                                                                            |
| 2.2 | FE: Implement `useAuth()` hook (NextAuth or Firebase Web SDK) | `hooks/useAuth.ts` | TC-A1: Jest – unauth → `null`, after login → returns `uid`                   |
| 2.3 | FE: Protect pages with `<AuthGuard>` HOC                      | `_app.tsx`         | TC-A2: Cypress – visiting `/dashboard` redirects to `/login` when not authed |
| 2.4 | CF middleware to validate `context.auth.uid`                  | `lib/auth.ts`      | TC-A3: Firebase emulator – call CF without token → 401                       |

---

## Epic 3 – File Upload & Parsing

| #   | Task                                                       | File/Component            | Key Tests                                                          |
| --- | ---------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| 3.1 | FE drag-and-drop component (PDF/DOCX/TXT)                  | `components/FileDrop.tsx` | TC-P1: React Testing Library – drop unsupported file → error toast |
| 3.2 | CF `parseDocs` (PDF via `pdfplumber`, DOCX via `docx2txt`) | `functions/parseDocs.ts`  | TC-P2: Jest – sample PDF returns plain text > 0 chars              |
| 3.3 | Hash text (`SHA-256`) & return `{docHash, text}`           | same                      | TC-P3: Same file → identical hash                                  |
| 3.4 | Firestore write `embeddings/{uid}/{hash}` placeholder      | DB                        | TC-P4: Emulator – doc record exists after parse                    |

---

## Epic 4 – Embedding & Vector Storage

| #   | Task                                                                                    | File/Component               | Key Tests                                              |
| --- | --------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------ |
| 4.1 | Supabase project w/ `match_vectors` table (`chunk_text`, `vector`) & pgvector extension | SQL migration                | TC-V1: psql – `\d match_vectors` shows `vector` column |
| 4.2 | CF `embedAndStore` – check Firestore cache, if miss ➜ call OpenAI (or Cohere)           | `functions/embedAndStore.ts` | TC-V2: Jest mocks OpenAI – 3 chunks → 3 upserts        |
| 4.3 | Set `ivfflat` index for cosine similarity                                               | SQL                          | TC-V3: query plan uses index (EXPLAIN)                 |

---

## Epic 5 – Analysis Chain

| #   | Task                                                                 | File/Component         | Key Tests                                               |
| --- | -------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------- |
| 5.1 | Design LangChain prompts (Role, Tailor, Diff, ATS, Gaps)             | `chains/prompts.ts`    | TC-C1: Jest snapshot – prompts contain all placeholders |
| 5.2 | CF `analyze` – retrieve top-k (8) chunks, assemble chain, stream SSE | `functions/analyze.ts` | TC-C2: Integration – returns `fitScore` between 0–100   |
| 5.3 | Implement BYOK path (forward key header)                             | same                   | TC-C3: Provide fake key → CF receives via header        |

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

| #   | Task                                                                | File/Component     | Key Tests                                 |
| --- | ------------------------------------------------------------------- | ------------------ | ----------------------------------------- |
| 8.1 | Firestore Rules enforcing `request.auth.uid == resource.data.owner` | `firestore.rules`  | TC-S1: Rules unit test – other uid denied |
| 8.2 | CF quota limit 200 req/day per uid (memory counter + TTL)           | `lib/ratelimit.ts` | TC-S2: Exceed 200 calls → 429             |

---

## Epic 9 – Deployment & Smoke Tests

| #   | Task                                                    | Deliverable                 | Key Tests                               |
| --- | ------------------------------------------------------- | --------------------------- | --------------------------------------- |
| 9.1 | Vercel preview deploy triggers Playwright smoke test    | `.github/workflows/e2e.yml` | TC-D1: `/` loads 200, "Sign in" visible |
| 9.2 | Firebase emulator CI step for CF unit/integration tests | same                        | TC-D2: `pnpm test:functions` passes     |

---

## Test Coverage Summary

- **Unit tests:** Jest (hooks, utils, CF pure logic) – 80 % lines.
- **Integration tests:** Firebase emulator + Supabase test DB.
- **E2E tests:** Cypress/Playwright on Vercel preview.

---

## Acceptance Criteria for MVP

1. Authenticated user can upload JD & resume, receive fit score & tailored resume in ≤ 8 s p95.
2. Data stored under their UID; other users cannot access.
3. BYOK path functions (manual QA with GPT-4).
4. GA4 shows page-view + variant event traffic.
5. All automated tests pass in CI.
