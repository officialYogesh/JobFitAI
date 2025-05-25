# JobFit AI – Technical Design

> **Version:** 1.0.0 (May 24 2025)  
> **Author:** Yogesh Patil  
> **Stack:** Next.js 14 (Vercel) • Firebase Cloud Functions (Node 20, **us‑east1**) • Supabase pgvector • LangChain JS • OpenAI / Cohere • Google Analytics 4  
> **Auth:** **Google sign‑in**

---

## 1  High‑Level Architecture
```text
┌─────────────────────────┐              ┌──────────────────────────┐
│         Browser         │              │        Vercel CDN        │
│  (Next.js + Tailwind)   │  HTTPS/2 SD  │  SSR / ISR page caching  │
└──────────┬──────────────┘              └─────────┬────────────────┘
           │                                         │ Edge Func
           │                                         ▼
           │                                ┌───────────────────┐
           │                                │  Firebase Auth    │
           │                                │  (Google only)    │
           │                                └─────────┬─────────┘
           │                                ID Token  │ (required)
           │                                         ▼
           │                                ┌───────────────────┐
           │                                │ Cloud Functions   │
           │                                │  Node 20 • us‑east1│
           │  Signed fetch/ callable        └────┬────┬────┬───┘
           │                                            │
           ▼                                            │
┌─────────────────────────┐   Embed + RAG   ┌───────────▼───────────┐
│  Supabase pgvector DB   │◀───────────────▶│ Firestore (NoSQL+TTL) │
│  (free tier, us‑east‑1) │                └────────────────────────┘
```

---

## 2  Component Highlights
* **Next.js Web** – guards routes with Google OAuth; BYOK modal stores API keys locally.  
* **Parser CF** – PDF/DOCX → text, auth‑protected.  
* **Embed CF** – Embeds & upserts vectors (auth); dedup via SHA‑256 hash.  
* **Analyze CF** – LangChain builder chain; supports BYOK models.  
* **Data Stores** – Supabase pgvector for vectors, Firestore for metadata & variant logs.  
* **GA4** – funnels + A/B stats with `user_id`.

---

## 3  Data Model
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

## 4  Authentication Flow
1. User signs into Google → receives ID token.  
2. Next.js stores token (cookie/localStorage).  
3. All API calls include `Authorization: Bearer <IDToken>`.  
4. Cloud Functions validate `context.auth.uid`.

---

## 5  Error Handling
| Failure | User Message |
|---------|--------------|
| Missing/expired token | “Please sign in.” |
| OpenAI quota hit | “Limit reached. Provide your own key or try later.” |