# JobFitAI - AI-Powered Resume Analysis

**Portfolio Project Demonstrating Modern Web Development & AI Integration**

JobFitAI is a privacy-first web application that analyzes resume-job compatibility using AI models and Retrieval-Augmented Generation (RAG). Built with Next.js 15, Firebase Authentication, and modern AI APIs.

## 🚀 Current Status

**Frontend Complete** ✅

- Modern, responsive UI with mobile-first design
- Complete user authentication flow with Google sign-in
- Real-time analysis progress tracking
- Comprehensive results dashboard with interactive visualizations
- Demo mode for portfolio testing without Firebase setup

**Backend Architecture** 🚧

- Next.js API routes structure designed
- Firebase Auth integration complete
- Ready for Supabase database and AI API implementation

## 🎯 Features

### Authentication & Security

- **Firebase Google Authentication** with automatic redirects
- **Demo Mode** for portfolio testing without Firebase setup
- **Protected Routes** with AuthGuard components
- **Privacy-First Design** with 30-day data TTL

### Resume Analysis (UI Complete, Backend Pending)

- **Smart File Parsing** - PDF, DOCX, and text support
- **Real-Time Progress Tracking** - 5-step analysis with animations
- **AI-Powered Analysis** - Compatibility scoring and gap identification
- **Interactive Results Dashboard** - 6-tab interface with detailed insights
- **Keyword Gap Analysis** - Visual comparison with priority indicators
- **ATS Compatibility Check** - Comprehensive formatting assessment

### User Experience

- **Mobile-First Responsive Design** across all devices
- **Smooth Animations** and micro-interactions
- **Intuitive Navigation** with breadcrumbs and state management
- **Professional UI/UX** suitable for enterprise applications

## 🛠 Tech Stack

### Frontend

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Firebase Auth** for Google authentication

### Backend (Architecture Ready)

- **Next.js API Routes** for serverless functions
- **Supabase** with PostgreSQL and pgvector extension
- **AI APIs**: Google Gemini, OpenAI, Anthropic, Cohere
- **Shared Access + BYOK** model for cost-effective usage

### Development

- **TypeScript** with strict mode
- **ESLint + Prettier** for code quality
- **PNPM** for package management
- **Vercel** for deployment

## 📋 Setup Instructions

### 1. Clone & Install

```bash
git clone <repository-url>
cd JobFitAI
cd frontend
pnpm install
```

### 2. Environment Setup

Create `frontend/.env.local`:

```env
# Required for production authentication
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Optional: For backend implementation
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
GOOGLE_AI_API_KEY=your-google-ai-key
```

### 3. Firebase Setup (Optional)

For real authentication (not required for demo):

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Google Authentication in Authentication > Sign-in method
3. Add your domain to authorized domains
4. Copy configuration to `.env.local`

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎮 Demo Mode

**No Firebase setup required!** The application includes a demo mode that:

- ✅ Shows all UI components and interactions

# JobFitAI
