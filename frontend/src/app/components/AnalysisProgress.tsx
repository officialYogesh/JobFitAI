"use client";

import { useEffect } from "react";
import {
  useAnalysisStream,
  type AnalysisStreamStep,
} from "@/hooks/useAnalysisStream";

interface AnalysisProgressProps {
  onComplete?: () => void;
  onError?: (error: string) => void;
  // Analysis configuration
  analysisConfig?: {
    resumeText?: string;
    resumeFile?: File;
    jobDescription: string;
    model: string;
    apiKey?: string;
    provider: string;
  };
  // Auto-start analysis on mount
  autoStart?: boolean;
}

export default function AnalysisProgress({
  onComplete,
  onError,
  analysisConfig = {
    jobDescription: "Sample job description for testing",
    model: "gemini-2.0-flash",
    provider: "google",
  },
  autoStart = true,
}: AnalysisProgressProps) {
  const {
    steps,
    overallProgress,
    isCompleted,
    error,
    isStreaming,
    startStream,
    getElapsedTime,
    getCurrentStep,
  } = useAnalysisStream({
    onComplete: (result) => {
      console.log("Analysis completed with result:", result);
      onComplete?.();
    },
    onError: (error) => {
      console.error("Analysis error:", error);
      onError?.(error);
    },
    onStepUpdate: (step) => {
      console.log("Step update:", step);
    },
  });

  useEffect(() => {
    if (autoStart && !isStreaming && !isCompleted) {
      startStream(analysisConfig);
    }
  }, [autoStart, isStreaming, isCompleted, startStream, analysisConfig]);

  const getStepStatusIcon = (step: AnalysisStreamStep) => {
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

  const getStepStatusColor = (step: AnalysisStreamStep) => {
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

  const getStepIcon = (step: AnalysisStreamStep) => {
    const icons: Record<string, string> = {
      parse: "📄",
      embed: "🔗",
      analyze: "🤖",
      score: "📊",
      generate: "📝",
    };
    return icons[step.id] || "📋";
  };

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analysis Failed
          </h2>
          <p className="text-gray-600 mb-4">
            An error occurred during the analysis process
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

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
                    : getStepIcon(step)}
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
                    className="bg-current h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${step.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs opacity-60">
                    {Math.round(step.progress)}%
                  </span>
                  {step.timestamp && (
                    <span className="text-xs opacity-60">
                      Started {step.timestamp.toLocaleTimeString()}
                    </span>
                  )}
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

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer font-medium">
              Debug Info (Development Only)
            </summary>
            <div className="mt-2 space-y-1">
              <div>Current Step: {getCurrentStep()?.name || "None"}</div>
              <div>Streaming: {isStreaming ? "Yes" : "No"}</div>
              <div>Completed: {isCompleted ? "Yes" : "No"}</div>
              <div>Overall Progress: {overallProgress.toFixed(1)}%</div>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
