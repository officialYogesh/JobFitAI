"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

function Header() {
  const router = useRouter();
  const { isAuthenticated, user: _user, loading, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await signOut();
    // Optionally redirect to home or show logout confirmation
  };

  const handleDashboard = () => {
    router.push("/upload");
  };

  if (loading) {
    return (
      <header className="w-full bg-blue-500 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded flex items-center justify-center">
              <span className="text-blue-500 font-bold text-xs sm:text-sm">
                JF
              </span>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-white">
              JobFitAI
            </span>
          </div>
          <div className="animate-pulse">
            <div className="h-8 w-20 bg-white/20 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-blue-500 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded flex items-center justify-center">
            <span className="text-blue-500 font-bold text-xs sm:text-sm">
              JF
            </span>
          </div>
          <span className="text-lg sm:text-xl font-semibold text-white">
            JobFitAI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-white/90 hover:text-white font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-white/90 hover:text-white font-medium transition-colors"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="text-white/90 hover:text-white font-medium transition-colors"
          >
            About
          </a>
        </nav>

        {/* Desktop Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleDashboard}
                className="text-white/90 hover:text-white font-medium px-4 py-2 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2 rounded transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-white/90 hover:text-white font-medium px-4 py-2 transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={handleSignUp}
                className="bg-white text-blue-500 hover:bg-gray-50 font-medium px-6 py-2 rounded transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 border-t border-blue-400">
          <div className="px-4 py-3 space-y-3">
            <a
              href="#features"
              className="block text-white/90 hover:text-white font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-white/90 hover:text-white font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#about"
              className="block text-white/90 hover:text-white font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <div className="pt-3 border-t border-blue-400 space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      handleDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/90 hover:text-white font-medium py-2 transition-colors cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/90 hover:text-white font-medium py-2 transition-colors cursor-pointer"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      handleSignUp();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left bg-white text-blue-500 hover:bg-gray-50 font-medium px-4 py-2 rounded transition-colors cursor-pointer"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/20 rounded-full animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 rounded-full animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "3s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-20 h-20 bg-blue-100/25 rounded-full animate-ping"
        style={{ animationDelay: "2s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-20 right-40 w-16 h-16 bg-blue-200/20 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      {/* Floating shapes */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300/40 rounded-full animate-float"></div>
      <div
        className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400/30 rounded-full animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-300/35 rounded-full animate-float"
        style={{ animationDelay: "3s" }}
      ></div>
    </div>
  );
}

function HeroSection() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/upload");
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="bg-white py-12 sm:py-20 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Privacy-First AI Analysis
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            AI-Powered <span className="text-blue-500">Resume</span> & Job Fit
            Analysis
          </h1>

          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            A portfolio project demonstrating AI-powered resume analysis.
            Experience instant, evidence-grounded feedback on resume-job fit
            with actionable insights, keyword gap analysis, and rewrite
            suggestions.{" "}
            <span className="text-blue-600 font-medium">
              Free Google AI access included.
            </span>
          </p>

          <div className="flex justify-center mb-8 sm:mb-12">
            <button
              onClick={handleGetStarted}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition-colors cursor-pointer text-sm sm:text-base"
            >
              Get Started with Google
            </button>
          </div>

          {/* Key Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 pt-6 sm:pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                &lt; 8s
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Analysis Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                100%
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Privacy Protected
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                Free
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Google AI Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Core Features
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Everything you need to optimize your resume for any job application
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Smart File Parsing
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Upload PDF, DOCX, or plain text. Our AI parses and extracts
              content with fallback handling for optimal results.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Fit Score Analysis
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Get a detailed compatibility score between your resume and job
              description with evidence-based insights.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Keyword Gap Analysis
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Identify missing keywords and phrases that could improve your
              resume&apos;s ATS compatibility.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              AI Rewrite Suggestions
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Get LLM-generated rewrite suggestions for better alignment with
              job requirements and improved impact.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Privacy First
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Your data is automatically deleted after 30 days. No anonymous
              access, secure authentication required.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Free Google AI + BYOK
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Start free with shared Google AI access or use your own API key
              for OpenAI, Anthropic, Cohere, or personal Google access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            How JobFitAI Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Three simple steps to optimize your resume with AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 relative">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
              1
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Upload & Parse
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Sign in with Google and upload your resume and job description.
              Our AI instantly parses both documents.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
              2
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              AI Analysis
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              RAG-powered AI analyzes compatibility, identifies gaps, and
              generates evidence-based feedback in under 8 seconds.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
              3
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Optimize & Improve
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Get your fit score, keyword gaps, and tailored rewrite
              suggestions. Iterate and improve your resume.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              About JobFitAI
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                JobFitAI is a portfolio project demonstrating a privacy-first
                web tool designed to help job seekers optimize their resumes.
                Built with cutting-edge AI technology, it showcases instant,
                evidence-grounded feedback powered by Retrieval-Augmented
                Generation (RAG).
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                This project demonstrates the use of advanced language models to
                analyze compatibility between resumes and job descriptions,
                showcasing modern web development skills and AI integration
                capabilities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                    Free Access
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Shared Google AI with option for personal keys
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                    Multiple Providers
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Google, OpenAI, Anthropic, Cohere support
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                    Fast Analysis
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Results in under 8 seconds
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                    BYOK Support
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Bring your own API key for premium models
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 sm:p-8 h-80 sm:h-96 flex items-center justify-center">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-12 sm:h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Powered by LLMs & RAG
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Utilizes Retrieval-Augmented Generation and cloud-based AI
                  APIs for advanced resume analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/upload");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AboutSection />

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to try the demo?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100 px-4 sm:px-0">
            A portfolio project showcasing AI-powered resume analysis
            capabilities and modern web development skills.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-500 hover:bg-gray-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition-colors cursor-pointer text-sm sm:text-base"
          >
            Get Started with Google Sign-In
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">
                JF
              </span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">JobFitAI</span>
          </div>
          <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
            Privacy-first AI-powered resume analysis tool
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} JobFitAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
