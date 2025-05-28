# JobFitAI - Next.js API Routes Documentation

## Architecture Overview

JobFitAI now uses **Next.js API Routes** for all backend functionality instead of Firebase Functions. This provides:

- **Cost Effectiveness**: No Firebase Functions billing
- **Simplified Deployment**: Single Vercel project
- **Better Developer Experience**: Unified Next.js codebase
- **Automatic Scaling**: Vercel serverless functions

## API Routes Structure

```
frontend/src/app/api/
├── auth/
│   └── verify/
│       └── route.ts          # Firebase token verification
├── parse/
│   └── route.ts              # Document parsing (PDF/DOCX/TXT)
├── embed/
│   └── route.ts              # Text embedding & vector storage
├── analyze/
│   └── route.ts              # AI analysis chain
└── health/
    └── route.ts              # Health check endpoint
```

## API Endpoints

### 1. Authentication Verification

**POST** `/api/auth/verify`

Verifies Firebase ID tokens for authenticated requests.

```typescript
// Request
{
  "token": "firebase-id-token"
}

// Response
{
  "uid": "user-id",
  "message": "Token verified"
}
```

### 2. Document Parsing

**POST** `/api/parse`

Parses uploaded documents (PDF, DOCX, TXT) into plain text.

```typescript
// Request (FormData)
{
  "file": File // PDF, DOCX, or TXT file
}

// Response
{
  "text": "extracted text content",
  "docHash": "sha256-hash",
  "fileName": "resume.pdf",
  "fileSize": 12345,
  "fileType": "application/pdf"
}
```

### 3. Text Embedding

**POST** `/api/embed`

Generates embeddings and stores vectors in Supabase pgvector.

```typescript
// Request
{
  "text": "document text to embed",
  "docHash": "document-hash",
  "apiKey": "optional-user-api-key",
  "provider": "google" // or "openai"
}

// Response
{
  "message": "Embeddings generated successfully",
  "chunkCount": 5,
  "vectorIds": ["uuid1", "uuid2", ...]
}
```

### 4. AI Analysis

**POST** `/api/analyze`

Performs comprehensive resume analysis using AI models.

```typescript
// Request
{
  "resumeText": "resume content",
  "jobDescription": "job posting content",
  "model": "gemini-2.0-flash",
  "apiKey": "optional-user-api-key",
  "provider": "google"
}

// Response
{
  "fitScore": 85,
  "analysis": {
    "strengths": ["Strong technical background", ...],
    "gaps": ["Missing specific technologies", ...],
    "suggestions": ["Add more specific examples", ...]
  },
  "tailoredResume": "optimized resume text",
  "keywordGaps": ["React", "TypeScript", ...],
  "model": "gemini-2.0-flash",
  "provider": "google",
  "timestamp": "2025-05-28T..."
}
```

### 5. Health Check

**GET** `/api/health`

Service health and status endpoint.

```typescript
// Response
{
  "status": "healthy",
  "service": "JobFitAI API",
  "version": "1.0.0",
  "timestamp": "2025-05-28T...",
  "architecture": "Next.js API Routes"
}
```

## Authentication

All API routes (except `/api/health`) require authentication via Firebase ID token:

```typescript
Headers: {
  "Authorization": "Bearer <firebase-id-token>",
  "Content-Type": "application/json"
}
```

## Error Handling

Standard HTTP status codes with JSON error responses:

```typescript
// 401 Unauthorized
{
  "error": "Unauthorized"
}

// 400 Bad Request
{
  "error": "Missing required parameters"
}

// 500 Internal Server Error
{
  "error": "Service temporarily unavailable"
}
```

## Dependencies to Install

When implementing the full functionality, install these packages:

```bash
# Document parsing
npm install pdf-parse docx2txt

# Database & vectors
npm install @supabase/supabase-js

# Firebase Admin (authentication)
npm install firebase-admin

# AI APIs
npm install @ai-sdk/google @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/cohere

# Utilities
npm install crypto
```

## Environment Variables

Required environment variables for production:

```env
# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Shared AI API Keys (for default access)
GOOGLE_AI_API_KEY=your-shared-google-key
OPENAI_API_KEY=your-fallback-openai-key

# Optional: Other provider keys for fallback
ANTHROPIC_API_KEY=your-anthropic-key
COHERE_API_KEY=your-cohere-key
```

## Migration from Firebase Functions

✅ **Completed**:

- API routes structure created
- Authentication framework ready
- Document parsing foundation
- AI analysis skeleton
- Prompt templates defined

🔄 **Next Steps**:

1. Install and configure dependencies
2. Set up Supabase database with pgvector
3. Implement Firebase Admin SDK integration
4. Add AI API integrations
5. Implement vector storage and retrieval
6. Add comprehensive error handling and logging

This architecture provides a solid foundation for the full JobFitAI implementation while being cost-effective and maintainable.
