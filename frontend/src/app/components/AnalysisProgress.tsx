"use client";

import { useState, useEffect } from "react";

interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "pending" | "running" | "completed" | "error";
  duration?: number; // in milliseconds
}

interface AnalysisProgressProps {
  onComplete?: () => void;
  onError?: (error: string) => void;
}

const ANALYSIS_STEPS: AnalysisStep[] = [
  {
    id: "parse",
    name: "Document Parsing",
    description: "Extracting text from resume and job description",
    icon: "📄",
    duration: 1200,
    status: "pending",
  },
  {
    id: "embed",
    name: "Text Embedding",
    description: "Converting text into vector representations",
    icon: "🔗",
    duration: 2000,
    status: "pending",
  },
  {
    id: "analyze",
    name: "AI Analysis",
    description: "Running compatibility analysis with AI models",
    icon: "🤖",
    duration: 3500,
    status: "pending",
  },
  {
    id: "score",
    name: "Score Calculation",
    description: "Computing fit score and identifying gaps",
    icon: "📊",
    duration: 800,
    status: "pending",
  },
  {
    id: "generate",
    name: "Report Generation",
    description: "Creating detailed feedback and suggestions",
    icon: "📝",
    duration: 1000,
    status: "pending",
  },
];

export default function AnalysisProgress({
  onComplete,
  onError: _onError,
}: AnalysisProgressProps) {
  const [steps, setSteps] = useState<AnalysisStep[]>(ANALYSIS_STEPS);
  const [, setCurrentStepIndex] = useState(-1);
  const [overallProgress, setOverallProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const startAnalysis = () => {
    setStartTime(Date.now());
    setCurrentStepIndex(0);

    // Start the first step
    runStep(0);
  };

  useEffect(() => {
    // Start the analysis automatically
    startAnalysis();
  }, []);

  const runStep = (stepIndex: number) => {
    if (stepIndex >= steps.length) {
      // Analysis completed
      completeAnalysis();
      return;
    }

    // Set current step to running
    setSteps((prev) =>
      prev.map((step, index) => ({
        ...step,
        status: index === stepIndex ? "running" : step.status,
      }))
    );

    const currentStep = steps[stepIndex];
    const duration = currentStep.duration || 1000;

    // Simulate step completion
    setTimeout(() => {
      // Mark current step as completed
      setSteps((prev) =>
        prev.map((step, index) => ({
          ...step,
          status: index === stepIndex ? "completed" : step.status,
        }))
      );

      // Update overall progress
      const progress = ((stepIndex + 1) / steps.length) * 100;
      setOverallProgress(progress);

      // Move to next step
      setCurrentStepIndex(stepIndex + 1);

      // Small delay before starting next step
      setTimeout(() => {
        runStep(stepIndex + 1);
      }, 200);
    }, duration);
  };

  const completeAnalysis = () => {
    setIsCompleted(true);
    setOverallProgress(100);

    // Call completion callback after a brief delay
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  const getElapsedTime = () => {
    if (!startTime) return "0.0s";
    const elapsed = (Date.now() - startTime) / 1000;
    return `${elapsed.toFixed(1)}s`;
  };

  const getStepStatusIcon = (step: AnalysisStep) => {
    switch (step.status) {
      case "completed":
        return "✅";
      case "running":
        return "⏳";
      case "error":
        return "❌";
      default:
        return "⏸️";
    }
  };

  const getStepStatusColor = (step: AnalysisStep) => {
    switch (step.status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "running":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-400 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          {isCompleted ? (
            <span className="text-2xl">🎉</span>
          ) : (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isCompleted ? "Analysis Complete!" : "Analyzing Your Resume"}
        </h2>
        <p className="text-gray-600">
          {isCompleted
            ? "Your resume analysis is ready to view"
            : "Please wait while we analyze your resume and job description compatibility"}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">
            {Math.round(overallProgress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">
            Elapsed: {getElapsedTime()}
          </span>
          <span className="text-xs text-gray-500">
            {isCompleted ? "Completed" : "In Progress"}
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, _index) => (
          <div
            key={step.id}
            className={`border rounded-lg p-4 transition-all duration-300 ${getStepStatusColor(
              step
            )}`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg">
                  {step.status === "running"
                    ? getStepStatusIcon(step)
                    : step.icon}
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-sm">
                  {step.name}
                  {step.status === "running" && (
                    <span className="ml-2">
                      <span className="animate-pulse">●</span>
                    </span>
                  )}
                </h3>
                <p className="text-xs opacity-75 mt-1">{step.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-lg">{getStepStatusIcon(step)}</span>
              </div>
            </div>

            {step.status === "running" && (
              <div className="mt-3 ml-12">
                <div className="w-full bg-white/50 rounded-full h-1.5">
                  <div
                    className="bg-current h-1.5 rounded-full animate-pulse"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        {isCompleted ? (
          <div className="text-sm text-green-600 font-medium">
            ✅ Analysis completed successfully in {getElapsedTime()}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            💡 This analysis typically takes 6-8 seconds
          </div>
        )}
      </div>
    </div>
  );
}
