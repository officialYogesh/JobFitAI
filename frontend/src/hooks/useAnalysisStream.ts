"use client";

import { useState, useCallback } from "react";

export interface AnalysisStreamStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "error";
  progress: number; // 0-100
  timestamp?: Date;
  details?: string;
}

export interface AnalysisResult {
  fitScore: number;
  analysis: {
    strengths: string[];
    gaps: string[];
    suggestions: string[];
  };
  tailoredResume: string;
  keywordGaps: string[];
  model: string;
  provider: string;
}

export interface AnalysisStreamData {
  steps: AnalysisStreamStep[];
  overallProgress: number;
  currentStep: string | null;
  isCompleted: boolean;
  error: string | null;
  fitScore?: number;
  analysisResult?: AnalysisResult;
}

interface UseAnalysisStreamOptions {
  onComplete?: (result: AnalysisStreamData) => void;
  onError?: (error: string) => void;
  onStepUpdate?: (step: AnalysisStreamStep) => void;
}

interface AnalysisConfig {
  resumeText?: string;
  resumeFile?: File;
  jobDescription: string;
  model: string;
  apiKey?: string;
  provider: string;
}

const ANALYSIS_STEPS: Omit<
  AnalysisStreamStep,
  "status" | "progress" | "timestamp"
>[] = [
  {
    id: "parse",
    name: "Document Parsing",
    description: "Extracting text from resume and job description",
  },
  {
    id: "embed",
    name: "Text Embedding",
    description: "Converting text into vector representations",
  },
  {
    id: "analyze",
    name: "AI Analysis",
    description: "Running compatibility analysis with AI models",
  },
  {
    id: "score",
    name: "Score Calculation",
    description: "Computing fit score and identifying gaps",
  },
  {
    id: "generate",
    name: "Report Generation",
    description: "Creating detailed feedback and suggestions",
  },
];

// Simulated durations for realistic progress (in milliseconds)
const STEP_DURATIONS = {
  parse: 1200,
  embed: 2000,
  analyze: 3500,
  score: 800,
  generate: 1000,
};

export function useAnalysisStream(options: UseAnalysisStreamOptions = {}) {
  const [streamData, setStreamData] = useState<AnalysisStreamData>({
    steps: ANALYSIS_STEPS.map((step) => ({
      ...step,
      status: "pending",
      progress: 0,
    })),
    overallProgress: 0,
    currentStep: null,
    isCompleted: false,
    error: null,
  });

  const [isStreaming, setIsStreaming] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Reset function to start fresh analysis
  const resetStream = useCallback(() => {
    setStreamData({
      steps: ANALYSIS_STEPS.map((step) => ({
        ...step,
        status: "pending",
        progress: 0,
      })),
      overallProgress: 0,
      currentStep: null,
      isCompleted: false,
      error: null,
    });
    setIsStreaming(false);
    setStartTime(null);
  }, []);

  // Simulate streaming analysis (to be replaced with actual SSE)
  const simulateAnalysisStream = useCallback(
    async (analysisConfig: AnalysisConfig) => {
      console.log(
        "Starting simulated analysis stream with config:",
        analysisConfig
      );

      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        const step = ANALYSIS_STEPS[i];
        const duration = STEP_DURATIONS[step.id as keyof typeof STEP_DURATIONS];

        // Start step
        setStreamData((prev) => ({
          ...prev,
          currentStep: step.id,
          steps: prev.steps.map((s, index) =>
            index === i ? { ...s, status: "running", timestamp: new Date() } : s
          ),
        }));

        options.onStepUpdate?.({
          ...step,
          status: "running",
          progress: 0,
          timestamp: new Date(),
        });

        // Simulate progress within step
        const progressInterval = 100; // Update every 100ms
        const totalUpdates = duration / progressInterval;

        for (
          let progress = 0;
          progress <= 100;
          progress += 100 / totalUpdates
        ) {
          await new Promise((resolve) => setTimeout(resolve, progressInterval));

          setStreamData((prev) => ({
            ...prev,
            steps: prev.steps.map((s, index) =>
              index === i ? { ...s, progress: Math.min(100, progress) } : s
            ),
          }));
        }

        // Complete step
        setStreamData((prev) => ({
          ...prev,
          steps: prev.steps.map((s, index) =>
            index === i ? { ...s, status: "completed", progress: 100 } : s
          ),
          overallProgress: ((i + 1) / ANALYSIS_STEPS.length) * 100,
        }));

        options.onStepUpdate?.({
          ...step,
          status: "completed",
          progress: 100,
          timestamp: new Date(),
        });

        // Small delay between steps
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Complete analysis with mock results
      const mockResult: AnalysisResult = {
        fitScore: 78,
        analysis: {
          strengths: ["Strong technical background", "Relevant experience"],
          gaps: [
            "Missing specific technologies",
            "Could improve ATS compatibility",
          ],
          suggestions: [
            "Add more quantified achievements",
            "Include relevant keywords",
          ],
        },
        tailoredResume: "Enhanced resume content...",
        keywordGaps: ["React", "Node.js", "AWS", "Docker"],
        model: analysisConfig.model,
        provider: analysisConfig.provider,
      };

      setStreamData((prev) => ({
        ...prev,
        isCompleted: true,
        currentStep: null,
        analysisResult: mockResult,
      }));

      options.onComplete?.({
        ...streamData,
        isCompleted: true,
        analysisResult: mockResult,
      });
    },
    [options, streamData]
  );

  // Start streaming analysis
  const startStream = useCallback(
    async (analysisConfig: AnalysisConfig) => {
      if (isStreaming) {
        console.warn("Analysis stream already in progress");
        return;
      }

      setIsStreaming(true);
      setStartTime(new Date());

      try {
        // TODO: Replace with actual SSE connection to /api/analyze
        // For now, simulate the streaming process
        await simulateAnalysisStream(analysisConfig);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setStreamData((prev) => ({
          ...prev,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, simulateAnalysisStream, options]
  );

  // Calculate elapsed time
  const getElapsedTime = useCallback(() => {
    if (!startTime) return "0.0s";
    const elapsed = (Date.now() - startTime.getTime()) / 1000;
    return `${elapsed.toFixed(1)}s`;
  }, [startTime]);

  // Get current step details
  const getCurrentStep = useCallback(() => {
    return streamData.steps.find((step) => step.id === streamData.currentStep);
  }, [streamData.steps, streamData.currentStep]);

  return {
    // Stream data
    ...streamData,

    // Stream control
    isStreaming,
    startStream,
    resetStream,

    // Utility functions
    getElapsedTime,
    getCurrentStep,
    startTime,
  };
}

export default useAnalysisStream;
