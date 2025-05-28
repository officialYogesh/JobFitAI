# JobFit AI – Technical Design

> **Version:** 1.0.2 (May 28 2025)  
> **Author:** Yogesh Patil  
> **Stack:** Next.js 15 (Vercel) • Next.js API Routes • Firebase Auth (Google only) • Supabase pgvector • Google AI / OpenAI / Anthropic / Cohere • Google Analytics 4  
> **Auth:** **Google sign‑in**  
> **Deployment:** Vercel Direct Git Integration + GitHub Actions CI

---

## 1 High‑Level Architecture

```text
┌─────────────────────────┐              ┌──────────────────────────┐
│         Browser         │              │     Vercel (Direct Git)  │
│  (Next.js + Tailwind)   │  HTTPS/2 SD  │  Auto-deploy + Preview   │
└──────────┬──────────────┘              └─────────┬────────────────┘
           │                                         │ CI via GitHub Actions
           │                                         ▼
           │                                ┌───────────────────┐
           │                                │  Firebase Auth    │
           │                                │  (Google only)    │
           │                                └─────────┬─────────┘
           │                                ID Token  │ (required)
           │                                         ▼
           │                                ┌───────────────────┐
           │                                │ Next.js API Routes│
           │                                │  Server Actions   │
           │  Fetch API calls               └────┬────┬────┬───┘
           │                                            │
           ▼                                            │
┌─────────────────────────┐   Embed + RAG   ┌───────────▼───────────┐
│  Supabase pgvector DB   │◀───────────────▶│ Supabase PostgreSQL   │
│  (free tier, us‑east‑1) │                └────────────────────────┘
```

---

## 2 Component Highlights

- **Next.js Full-Stack** – guards routes with Google OAuth; enhanced navigation with logout functionality; BYOK modal stores API keys locally; shared Google AI by default with user key fallback.
- **Authentication State Management** – conditional navigation showing Login/Sign Up for guests and Dashboard/Logout for authenticated users with proper state transitions.
- **Vercel Deployment** – direct Git integration with automatic preview and production deployments.
- **GitHub Actions CI** – lint and build verification only, no deployment handling.
- **Next.js API Routes** – `/api/parse` for PDF/DOCX → text conversion, auth-protected with Firebase token verification.
- **Next.js API Routes** – `/api/embed` for embeddings & vector storage; supports shared Google embedding and user BYOK.
- **Next.js API Routes** – `/api/analyze` for LLM analysis chain; supports shared Google models with user API key fallback and BYOK models.
- **Data Stores** – Supabase pgvector for vectors, Supabase PostgreSQL for metadata & session management.
- **GA4** – funnels + A/B stats with `user_id`.

---

## 3 Data Model

```yaml
# Supabase PostgreSQL Tables
users:
  id: uuid (primary key)
  uid: string (Firebase UID)
  email: string
  created_at: timestamp
  updated_at: timestamp

sessions:
  id: uuid (primary key)
  user_id: uuid (foreign key)
  jd_text: text
  resume_text: text
  vector_ids: text[] (array)
  fit_score: integer
  analysis_result: jsonb
  expires_at: timestamp
  created_at: timestamp

# pgvector extension table
match_vectors:
  id: uuid (primary key)
  session_id: uuid (foreign key)
  chunk_text: text
  vector: vector(1536)
  metadata: jsonb
  created_at: timestamp
```

---

## 4 Authentication Flow

1. User signs into Google → receives Firebase ID token.
2. Next.js stores token (cookie/localStorage).
3. All API calls include `Authorization: Bearer <IDToken>`.
4. Next.js API routes verify Firebase ID token using Firebase Admin SDK.

---

## 5 API Routes Structure

```typescript
// /api/auth/verify - Verify Firebase token and get/create user
// /api/parse - Parse uploaded documents (PDF/DOCX)
// /api/embed - Generate embeddings and store vectors
// /api/analyze - Run analysis chain with LLM
// /api/sessions - CRUD operations for analysis sessions
// /api/health - Health check endpoint
```

---

## 6 Deployment Workflow

### Frontend & Backend Deployment (Vercel)

1. **Direct Git Integration**: Vercel connected to GitHub repository with automatic webhooks.
2. **Production Deploys**: Every push to `main` branch triggers production deployment.
3. **Preview Deploys**: All PRs and non-main branches get unique preview URLs.
4. **Zero Configuration**: No secrets or manual setup required after initial connection.
5. **API Routes**: Deployed automatically as serverless functions alongside frontend.

### CI/CD Pipeline

1. **GitHub Actions CI**: Runs on every push and PR for code quality checks.
2. **Lint & Build**: Verifies code passes ESLint and builds successfully.
3. **No Deployment**: GitHub Actions only validates code, Vercel handles all deployments.

### Benefits

- **Simplified Setup**: No deployment secrets or complex workflows.
- **Automatic Previews**: Every PR gets a live preview URL for testing.
- **Instant Rollbacks**: Previous deployments remain available for instant rollback.
- **Zero Downtime**: Atomic deployments with health checks.
- **Cost Effective**: No Firebase Functions billing, only Vercel hosting costs.

---

## 7 Error Handling

| Failure               | User Message                                                        |
| --------------------- | ------------------------------------------------------------------- |
| Missing/expired token | "Please sign in."                                                   |
| Shared quota exceeded | "Shared limit reached. Please add your Google API key to continue." |
| User API quota hit    | "Your API limit reached. Check your provider's usage dashboard."    |
| Parse failure         | "Document parsing failed. Please try a different format."           |
| Database error        | "Service temporarily unavailable. Please try again."                |
