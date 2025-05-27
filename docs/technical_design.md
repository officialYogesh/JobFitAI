# JobFit AI – Technical Design

> **Version:** 1.0.1 (May 27 2025)  
> **Author:** Yogesh Patil  
> **Stack:** Next.js 15 (Vercel) • Firebase Cloud Functions (Node 20, **us‑east1**) • Supabase pgvector • LangChain JS • OpenAI / Cohere • Google Analytics 4  
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
           │                                │ Cloud Functions   │
           │                                │  Node 20 • us‑east1│
           │  Signed fetch/ callable        └────┬────┬────┬───┘
           │                                            │
           ▼                                            │
┌─────────────────────────┐   Embed + RAG   ┌───────────▼───────────┐
│  Supabase pgvector DB   │◀───────────────▶│ Firestore (NoSQL+TTL) │
│  (free tier, us‑east‑1) │                └────────────────────────┘
```

---

## 2 Component Highlights

- **Next.js Web** – guards routes with Google OAuth; BYOK modal stores API keys locally.
- **Vercel Deployment** – direct Git integration with automatic preview and production deployments.
- **GitHub Actions CI** – lint and build verification only, no deployment handling.
- **Parser CF** – PDF/DOCX → text, auth‑protected.
- **Embed CF** – Embeds & upserts vectors (auth); dedup via SHA‑256 hash.
- **Analyze CF** – LangChain builder chain; supports BYOK models.
- **Data Stores** – Supabase pgvector for vectors, Firestore for metadata & variant logs.
- **GA4** – funnels + A/B stats with `user_id`.

---

## 3 Data Model

```yaml
users/{uid}:
  createdAt: timestamp
sessions/{sid}:
  owner: uid
  jdText: string
  resumeText: string
  vectorIds: [ids]
  fitScore: number
  expiresAt: timestamp
```

---

## 4 Authentication Flow

1. User signs into Google → receives ID token.
2. Next.js stores token (cookie/localStorage).
3. All API calls include `Authorization: Bearer <IDToken>`.
4. Cloud Functions validate `context.auth.uid`.

---

## 5 Deployment Workflow

### Frontend Deployment (Vercel)

1. **Direct Git Integration**: Vercel connected to GitHub repository with automatic webhooks.
2. **Production Deploys**: Every push to `main` branch triggers production deployment.
3. **Preview Deploys**: All PRs and non-main branches get unique preview URLs.
4. **Zero Configuration**: No secrets or manual setup required after initial connection.

### CI/CD Pipeline

1. **GitHub Actions CI**: Runs on every push and PR for code quality checks.
2. **Lint & Build**: Verifies code passes ESLint and builds successfully.
3. **No Deployment**: GitHub Actions only validates code, Vercel handles all deployments.

### Benefits

- **Simplified Setup**: No deployment secrets or complex workflows.
- **Automatic Previews**: Every PR gets a live preview URL for testing.
- **Instant Rollbacks**: Previous deployments remain available for instant rollback.
- **Zero Downtime**: Atomic deployments with health checks.

---

## 6 Error Handling

| Failure               | User Message                                        |
| --------------------- | --------------------------------------------------- |
| Missing/expired token | "Please sign in."                                   |
| OpenAI quota hit      | "Limit reached. Provide your own key or try later." |
