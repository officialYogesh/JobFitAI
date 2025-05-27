"use client";

import Image from "next/image";

function Header() {
  const handleLogin = () => {
    console.log("Login clicked");
    // TODO: Implement Google login
  };

  const handleSignUp = () => {
    console.log("Sign up clicked");
    // TODO: Implement Google sign up
  };

  return (
    <header className="w-full bg-blue-500 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-blue-500 font-bold text-sm">JF</span>
          </div>
          <span className="text-xl font-semibold text-white">JobFitAI</span>
        </div>

        {/* Navigation */}
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

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogin}
            className="text-white/90 hover:text-white font-medium px-4 py-2 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={handleSignUp}
            className="bg-white text-blue-500 hover:bg-gray-50 font-medium px-6 py-2 rounded transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
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
  const handleGetStarted = () => {
    console.log("Get started clicked");
    // TODO: Implement Google sign up
  };

  return (
    <section className="bg-white py-20 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Privacy-First AI Analysis
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered <span className="text-blue-500">Resume</span> & Job Fit
            Analysis
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Get instant, evidence-grounded feedback on how well your resume
            matches any job description. Receive actionable insights, keyword
            gap analysis, and tailored rewrite suggestions.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors"
            >
              Get Started with Google
            </button>
          </div>

          {/* Key Stats */}
          <div className="flex justify-center gap-12 mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">&lt; 8s</div>
              <div className="text-sm text-gray-600">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Privacy Protected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">RAG</div>
              <div className="text-sm text-gray-600">AI Technology</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to optimize your resume for any job application
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-blue-600"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Smart File Parsing
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Upload PDF, DOCX, or plain text. Our AI parses and extracts
              content with fallback handling for optimal results.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-green-600"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Fit Score Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get a detailed compatibility score between your resume and job
              description with evidence-based insights.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-600"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Keyword Gap Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Identify missing keywords and phrases that could improve your
              resume's ATS compatibility.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-orange-600"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              AI Rewrite Suggestions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get LLM-generated rewrite suggestions for better alignment with
              job requirements and improved impact.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-red-600"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Privacy First
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your data is automatically deleted after 30 days. No anonymous
              access, secure authentication required.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Bring Your Own Key
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Use your own OpenAI API key to unlock premium models and features
              while maintaining full control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How JobFitAI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to optimize your resume with AI-powered insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Upload & Parse
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sign in with Google and upload your resume and job description.
              Our AI instantly parses both documents.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              AI Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              RAG-powered AI analyzes compatibility, identifies gaps, and
              generates evidence-based feedback in under 8 seconds.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Optimize & Improve
            </h3>
            <p className="text-gray-600 leading-relaxed">
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
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              About JobFitAI
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                JobFitAI is a privacy-first web tool designed to help job
                seekers optimize their resumes for any job application. Built
                with cutting-edge AI technology, we provide instant,
                evidence-grounded feedback powered by Retrieval-Augmented
                Generation (RAG).
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform uses advanced language models to analyze the
                compatibility between your resume and job descriptions,
                identifying gaps and providing actionable insights to improve
                your chances of landing interviews.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Privacy-First
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your data is secure with 30-day auto-deletion
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    AI-Powered
                  </h4>
                  <p className="text-sm text-gray-600">
                    RAG technology for accurate analysis
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Fast Analysis
                  </h4>
                  <p className="text-sm text-gray-600">
                    Results in under 8 seconds
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    BYOK Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Use your own OpenAI API key
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
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
                <h3 className="text-xl font-semibold text-gray-900">
                  Powered by LLMs & RAG
                </h3>
                <p className="text-gray-600">
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
  const handleGetStarted = () => {
    console.log("CTA Get started clicked");
    // TODO: Implement Google sign up
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AboutSection />

      {/* CTA Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to optimize your resume?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of job seekers who've improved their resume fit
            scores by 20% or more.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-500 hover:bg-gray-50 font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors"
          >
            Get Started with Google Sign-In
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">JF</span>
            </div>
            <span className="text-xl font-semibold">JobFitAI</span>
          </div>
          <p className="text-gray-400 mb-4">
            Privacy-first AI-powered resume analysis tool
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JobFitAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
