"use client";

import { useState, useEffect } from "react";
import AuthGuard from "../components/AuthGuard";

// Hardcoded test data
const mockAnalysisResult = {
  fitScore: 78,
  overallFeedback:
    "Your resume shows strong alignment with the role requirements, particularly in technical skills and experience level. However, there are opportunities to better highlight specific keywords and technologies mentioned in the job description.",

  keywordGaps: [
    { keyword: "React", inResume: 3, inJob: 5, gap: 2, priority: "high" },
    { keyword: "Node.js", inResume: 1, inJob: 4, gap: 3, priority: "high" },
    {
      keyword: "TypeScript",
      inResume: 2,
      inJob: 3,
      gap: 1,
      priority: "medium",
    },
    { keyword: "AWS", inResume: 0, inJob: 2, gap: 2, priority: "high" },
    { keyword: "Docker", inResume: 1, inJob: 3, gap: 2, priority: "medium" },
    { keyword: "GraphQL", inResume: 0, inJob: 1, gap: 1, priority: "low" },
    {
      keyword: "Kubernetes",
      inResume: 0,
      inJob: 2,
      gap: 2,
      priority: "medium",
    },
    { keyword: "MongoDB", inResume: 2, inJob: 2, gap: 0, priority: "none" },
  ],

  skillComparison: [
    {
      skill: "Frontend Development",
      resumeStrength: 85,
      jobRequirement: 90,
      match: true,
    },
    {
      skill: "Backend Development",
      resumeStrength: 75,
      jobRequirement: 80,
      match: true,
    },
    {
      skill: "Database Management",
      resumeStrength: 70,
      jobRequirement: 70,
      match: true,
    },
    {
      skill: "Cloud Services",
      resumeStrength: 40,
      jobRequirement: 85,
      match: false,
    },
    { skill: "DevOps", resumeStrength: 30, jobRequirement: 60, match: false },
    {
      skill: "API Development",
      resumeStrength: 80,
      jobRequirement: 75,
      match: true,
    },
    { skill: "Testing", resumeStrength: 60, jobRequirement: 70, match: false },
    {
      skill: "Agile/Scrum",
      resumeStrength: 65,
      jobRequirement: 50,
      match: true,
    },
  ],

  atsChecks: [
    {
      category: "Contact Information",
      status: "pass",
      message: "Complete contact details found",
    },
    {
      category: "File Format",
      status: "pass",
      message: "PDF format is ATS-friendly",
    },
    {
      category: "Keywords",
      status: "warning",
      message: "Some important keywords missing",
    },
    {
      category: "Section Headers",
      status: "pass",
      message: "Standard section headers used",
    },
    {
      category: "Font & Formatting",
      status: "pass",
      message: "Clean, readable formatting",
    },
    {
      category: "Length",
      status: "warning",
      message: "Resume may be too short for experience level",
    },
  ],

  suggestions: [
    {
      category: "Keywords",
      priority: "high",
      suggestion:
        "Add more mentions of 'React' and 'Node.js' throughout your experience section",
      impact: "Could improve fit score by 8-12 points",
    },
    {
      category: "Skills",
      priority: "high",
      suggestion: "Highlight your AWS or cloud experience, even if limited",
      impact: "Addresses major gap in job requirements",
    },
    {
      category: "Experience",
      priority: "medium",
      suggestion:
        "Quantify your achievements with specific metrics and results",
      impact: "Makes your impact more tangible to recruiters",
    },
    {
      category: "ATS",
      priority: "medium",
      suggestion:
        "Expand your resume to 1.5-2 pages to better showcase your experience",
      impact: "Provides more space for relevant keywords and details",
    },
  ],

  diffComparison: {
    original: `EXPERIENCE
Software Developer at TechCorp (2021-2024)
• Developed web applications using modern technologies
• Worked on team projects and delivered solutions
• Built user interfaces and backend systems
• Collaborated with team members on various projects`,

    improved: `EXPERIENCE
Senior Full-Stack Developer at TechCorp (2021-2024)
• Developed responsive web applications using React, Node.js, and TypeScript, serving 50,000+ daily active users
• Led cross-functional team of 5 developers delivering cloud-native solutions with 99.9% uptime
• Architected scalable REST APIs and microservices on AWS infrastructure, reducing response time by 40%
• Implemented CI/CD pipelines using Docker and automated testing, improving deployment efficiency by 60%`,
  },
};

// Score Ring Component
function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (animatedScore / 100) * circumference
  } ${circumference}`;

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 60; // animate over ~1 second (60 frames)
      const animation = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(animation);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 16); // ~60fps

      return () => clearInterval(animation);
    }, 300); // delay before starting animation

    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"; // green
    if (score >= 60) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "A-";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "B-";
    if (score >= 60) return "C+";
    if (score >= 55) return "C";
    return "C-";
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor(animatedScore)}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">
          {animatedScore}
        </span>
        <span className="text-sm text-gray-500">out of 100</span>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full mt-1`}
          style={{
            backgroundColor: `${getScoreColor(animatedScore)}20`,
            color: getScoreColor(animatedScore),
          }}
        >
          Grade {getScoreGrade(animatedScore)}
        </span>
      </div>
    </div>
  );
}

// Keyword Gap Component
function KeywordGapCard({
  gap,
}: {
  gap: (typeof mockAnalysisResult.keywordGaps)[0];
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🔵";
      default:
        return "✅";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{gap.keyword}</h4>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(
            gap.priority
          )}`}
        >
          {getPriorityIcon(gap.priority)}{" "}
          {gap.priority === "none" ? "Perfect" : gap.priority}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">In your resume:</span>
          <span className="font-medium">{gap.inResume} mentions</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">In job description:</span>
          <span className="font-medium">{gap.inJob} mentions</span>
        </div>
        {gap.gap > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-red-600">Gap:</span>
            <span className="font-medium text-red-600">+{gap.gap} needed</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Skill Comparison Bar
function SkillComparisonBar({
  skill,
}: {
  skill: (typeof mockAnalysisResult.skillComparison)[0];
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            skill.match
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {skill.match ? "✅ Match" : "⚠️ Gap"}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Your Level</span>
            <span className="font-medium">{skill.resumeStrength}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${skill.resumeStrength}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Required Level</span>
            <span className="font-medium">{skill.jobRequirement}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${skill.jobRequirement}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ATS Check Item
function ATSCheckItem({
  check,
}: {
  check: (typeof mockAnalysisResult.atsChecks)[0];
}) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return "✅";
      case "warning":
        return "⚠️";
      case "fail":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "fail":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
      <span className="text-lg">{getStatusIcon(check.status)}</span>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{check.category}</h4>
        <p className={`text-sm ${getStatusColor(check.status)}`}>
          {check.message}
        </p>
      </div>
    </div>
  );
}

// Suggestion Card
function SuggestionCard({
  suggestion,
  index,
}: {
  suggestion: (typeof mockAnalysisResult.suggestions)[0];
  index: number;
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "🚨";
      case "medium":
        return "⚡";
      default:
        return "💡";
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 ${getPriorityColor(
        suggestion.priority
      )}`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{getPriorityIcon(suggestion.priority)}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">
              {index + 1}. {suggestion.category}
            </h4>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                suggestion.priority === "high"
                  ? "bg-red-100 text-red-800"
                  : suggestion.priority === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {suggestion.priority} priority
            </span>
          </div>
          <p className="text-gray-700 mb-2">{suggestion.suggestion}</p>
          <p className="text-sm font-medium text-green-700">
            💪 {suggestion.impact}
          </p>
        </div>
      </div>
    </div>
  );
}

// Diff Viewer Component
function DiffViewer({
  original,
  improved,
}: {
  original: string;
  improved: string;
}) {
  const originalLines = original.split("\n");
  const improvedLines = improved.split("\n");

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Original Side */}
        <div className="border-r border-gray-200">
          <div className="bg-red-50 border-b border-red-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <h4 className="font-semibold text-red-800">Original Resume</h4>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {originalLines.map((line, index) => (
              <div
                key={index}
                className="text-sm text-gray-700 leading-relaxed"
              >
                {line || <br />}
              </div>
            ))}
          </div>
        </div>

        {/* Improved Side */}
        <div>
          <div className="bg-green-50 border-b border-green-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <h4 className="font-semibold text-green-800">Improved Resume</h4>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {improvedLines.map((line, index) => (
              <div key={index} className="text-sm leading-relaxed">
                {line.includes("React") ||
                line.includes("Node.js") ||
                line.includes("TypeScript") ||
                line.includes("AWS") ||
                line.includes("Docker") ||
                line.includes("50,000+") ||
                line.includes("99.9%") ||
                line.includes("40%") ||
                line.includes("60%") ? (
                  <span className="bg-green-200 text-green-900 px-1 rounded">
                    {line}
                  </span>
                ) : (
                  <span className="text-gray-700">{line || <br />}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvement Summary */}
      <div className="bg-blue-50 border-t border-blue-200 px-4 py-3">
        <h5 className="font-semibold text-blue-800 mb-2">
          Key Improvements Made:
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-blue-700">
              Added specific technologies (React, Node.js, TypeScript)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-blue-700">
              Included quantifiable metrics (50,000+ users, 99.9% uptime)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-blue-700">
              Enhanced job title (Senior Full-Stack Developer)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-blue-700">
              Added cloud/DevOps keywords (AWS, Docker, CI/CD)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "keywords", name: "Keywords", icon: "🔍" },
    { id: "skills", name: "Skills", icon: "⚡" },
    { id: "ats", name: "ATS Check", icon: "🤖" },
    { id: "diff", name: "Diff Viewer", icon: "🔄" },
    { id: "suggestions", name: "Suggestions", icon: "💡" },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="w-full bg-blue-500 text-white">
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
            <div className="flex items-center gap-4">
              <button
                onClick={() => (window.location.href = "/upload")}
                className="text-white/90 hover:text-white font-medium transition-colors text-sm sm:text-base cursor-pointer"
              >
                New Analysis
              </button>
              <button
                onClick={() => console.log("Logout clicked")}
                className="text-white/90 hover:text-white font-medium transition-colors text-sm sm:text-base cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Hero Section with Score */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 mb-6 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Resume Analysis Complete! 🎉
                </h1>
                <p className="text-blue-100 text-lg mb-4">
                  {mockAnalysisResult.overallFeedback}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-sm text-blue-100">
                      Analysis completed in
                    </span>
                    <div className="font-bold text-lg">6.4s</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-sm text-blue-100">
                      Suggestions found
                    </span>
                    <div className="font-bold text-lg">
                      {mockAnalysisResult.suggestions.length}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <ScoreRing score={mockAnalysisResult.fitScore} size={140} />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">✅</span>
                        <h3 className="font-semibold text-green-800">
                          Strengths
                        </h3>
                      </div>
                      <p className="text-sm text-green-700">
                        Strong technical background and relevant experience
                        align well with job requirements.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">⚠️</span>
                        <h3 className="font-semibold text-yellow-800">
                          Improvements
                        </h3>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Add more cloud services and DevOps keywords to better
                        match job requirements.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">🎯</span>
                        <h3 className="font-semibold text-blue-800">
                          Next Steps
                        </h3>
                      </div>
                      <p className="text-sm text-blue-700">
                        Focus on highlighting AWS experience and quantifying
                        your achievements.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        🔥 Top Priority Fixes
                      </h3>
                      <div className="space-y-3">
                        {mockAnalysisResult.suggestions
                          .filter((s) => s.priority === "high")
                          .slice(0, 3)
                          .map((suggestion, index) => (
                            <div
                              key={index}
                              className="bg-red-50 border border-red-200 rounded-lg p-4"
                            >
                              <h4 className="font-medium text-red-800 mb-1">
                                {suggestion.category}
                              </h4>
                              <p className="text-sm text-red-700">
                                {suggestion.suggestion}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        📈 Skill Gaps
                      </h3>
                      <div className="space-y-3">
                        {mockAnalysisResult.skillComparison
                          .filter((s) => !s.match)
                          .slice(0, 3)
                          .map((skill, index) => (
                            <div
                              key={index}
                              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                            >
                              <h4 className="font-medium text-yellow-800 mb-1">
                                {skill.skill}
                              </h4>
                              <p className="text-sm text-yellow-700">
                                Gap:{" "}
                                {skill.jobRequirement - skill.resumeStrength}{" "}
                                points below requirement
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Keywords Tab */}
              {activeTab === "keywords" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Keyword Analysis 🔍
                    </h2>
                    <p className="text-gray-600">
                      Compare keyword frequency between your resume and the job
                      description
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockAnalysisResult.keywordGaps.map((gap, index) => (
                      <KeywordGapCard key={index} gap={gap} />
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Skills Comparison ⚡
                    </h2>
                    <p className="text-gray-600">
                      How your skills align with job requirements
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockAnalysisResult.skillComparison.map((skill, index) => (
                      <SkillComparisonBar key={index} skill={skill} />
                    ))}
                  </div>
                </div>
              )}

              {/* ATS Check Tab */}
              {activeTab === "ats" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      ATS Compatibility Check 🤖
                    </h2>
                    <p className="text-gray-600">
                      Ensure your resume passes Applicant Tracking Systems
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mockAnalysisResult.atsChecks.map((check, index) => (
                      <ATSCheckItem key={index} check={check} />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions Tab */}
              {activeTab === "suggestions" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Actionable Suggestions 💡
                    </h2>
                    <p className="text-gray-600">
                      Prioritized recommendations to improve your resume
                    </p>
                  </div>

                  <div className="space-y-4">
                    {mockAnalysisResult.suggestions.map((suggestion, index) => (
                      <SuggestionCard
                        key={index}
                        suggestion={suggestion}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Diff Viewer Tab */}
              {activeTab === "diff" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Resume Comparison 🔄
                    </h2>
                    <p className="text-gray-600">
                      Compare the original resume with the improved version
                      highlighting key enhancements
                    </p>
                  </div>

                  <DiffViewer
                    original={mockAnalysisResult.diffComparison.original}
                    improved={mockAnalysisResult.diffComparison.improved}
                  />

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">
                      💡 Pro Tips for Resume Enhancement
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                      <div>
                        <h4 className="font-medium mb-2">🔍 Keywords Matter</h4>
                        <p>
                          Include specific technologies and tools mentioned in
                          the job description
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">📊 Quantify Impact</h4>
                        <p>
                          Use numbers, percentages, and metrics to demonstrate
                          your achievements
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">🎯 Be Specific</h4>
                        <p>
                          Replace generic terms with specific technologies and
                          methodologies
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">🚀 Show Growth</h4>
                        <p>
                          Highlight progression in roles and increasing
                          responsibilities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => console.log("Download report clicked")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer"
            >
              📄 Download Report
            </button>
            <button
              onClick={() => (window.location.href = "/upload")}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer"
            >
              🔄 Run New Analysis
            </button>
            <button
              onClick={() => console.log("Email results clicked")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer"
            >
              📧 Email Results
            </button>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
