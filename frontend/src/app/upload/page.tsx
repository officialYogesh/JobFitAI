"use client";

import { useState } from "react";
import AuthGuard from "../components/AuthGuard";

type UploadMode = "file" | "text";

type AIProvider = "openai" | "anthropic" | "cohere" | "google";

interface ModelOption {
  id: string;
  name: string;
  provider: AIProvider;
  description?: string;
  isFree?: boolean;
}

const modelOptions: ModelOption[] = [
  // Google Models (Free by default with option for user API key)
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "google",
    description: "Newest multimodal model with next-gen features (Free)",
    isFree: true,
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "google",
    description: "Fast, versatile multimodal model (Free)",
    isFree: true,
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "google",
    description: "Complex reasoning, 2M token context (Free)",
    isFree: true,
  },
  {
    id: "gemini-1.5-flash-8b",
    name: "Gemini 1.5 Flash-8B",
    provider: "google",
    description: "Efficient model for high-volume tasks (Free)",
    isFree: true,
  },
  // OpenAI Models (Require API key)
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "Latest multimodal model",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "openai",
    description: "Fast and affordable",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    description: "Most capable GPT-4 model",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    description: "Fast and cost-effective",
  },
  // Anthropic Models (Require API key)
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "Most intelligent model",
  },
  {
    id: "claude-3-5-haiku-20241022",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    description: "Fastest model",
  },
  {
    id: "claude-3-opus-20240229",
    name: "Claude 3 Opus",
    provider: "anthropic",
    description: "Most powerful model",
  },
  // Cohere Models (Require API key)
  {
    id: "command-r-plus-08-2024",
    name: "Command R+",
    provider: "cohere",
    description: "Advanced reasoning model",
  },
  {
    id: "command-r-08-2024",
    name: "Command R",
    provider: "cohere",
    description: "Balanced performance",
  },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, title: "Upload Resume" },
    { number: 2, title: "Add Job" },
    { number: 3, title: "View Results" },
  ];

  return (
    <div className="mb-8 sm:mb-12">
      {/* Mobile vertical layout */}
      <div className="flex flex-col space-y-3 sm:hidden">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 ${
                currentStep === step.number
                  ? "bg-blue-500"
                  : currentStep > step.number
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              {currentStep > step.number ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <span className="text-sm">{step.number}</span>
              )}
            </div>

            {/* Step Title */}
            <div className="ml-3">
              <p
                className={`text-sm font-medium transition-colors ${
                  currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
            </div>

            {/* Vertical Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-4 mt-8 w-0.5 h-3 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop horizontal layout */}
      <div className="hidden sm:flex items-center justify-center space-x-0">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 ${
                currentStep === step.number
                  ? "bg-blue-500 scale-110"
                  : currentStep > step.number
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              {currentStep > step.number ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                step.number
              )}
            </div>

            {/* Step Title */}
            <div className="ml-3 mr-8">
              <p
                className={`text-sm font-medium transition-colors ${
                  currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
            </div>

            {/* Horizontal Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 lg:w-16 h-0.5 transition-colors duration-300 ${
                  currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModeToggle({
  mode,
  onModeChange,
}: {
  mode: UploadMode;
  onModeChange: (mode: UploadMode) => void;
}) {
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8">
      <div className="bg-gray-100 p-1 rounded-lg flex w-full max-w-sm">
        <button
          onClick={() => onModeChange("file")}
          className={`flex-1 px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer text-sm sm:text-base ${
            mode === "file"
              ? "bg-blue-500 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => onModeChange("text")}
          className={`flex-1 px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer text-sm sm:text-base ${
            mode === "text"
              ? "bg-blue-500 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Paste Text
        </button>
      </div>
    </div>
  );
}

function FileUploadBox({
  title,
  subtitle,
  acceptedFormats,
  onFileSelect,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  title: string;
  subtitle: string;
  acceptedFormats: string;
  onFileSelect: (file: File) => void;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}) {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 sm:p-12 text-center transition-all duration-300 ${
        isDragOver
          ? "border-blue-500 bg-blue-50 scale-105"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="space-y-3 sm:space-y-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{subtitle}</p>
        </div>

        <div>
          <input
            type="file"
            className="sr-only"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileInput}
            id="resume-file-input"
          />
          <label
            htmlFor="resume-file-input"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer transition-colors inline-block text-sm sm:text-base"
          >
            Upload your resume
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            {acceptedFormats}
          </p>
        </div>
      </div>
    </div>
  );
}

function TextUploadBox({
  title,
  subtitle,
  placeholder,
  value,
  onChange,
}: {
  title: string;
  subtitle: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 sm:p-8 transition-all duration-300">
      <div className="space-y-3 sm:space-y-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
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

        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{subtitle}</p>
        </div>

        <textarea
          className="w-full h-32 sm:h-40 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function APIKeySection({
  apiKey,
  selectedModel,
  onApiKeyChange,
  onModelChange,
}: {
  apiKey: string;
  selectedModel: string;
  onApiKeyChange: (key: string) => void;
  onModelChange: (model: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedModelData = modelOptions.find((m) => m.id === selectedModel);
  const isUsingFreeModel = selectedModelData?.isFree || false;
  const needsApiKey = !isUsingFreeModel && !apiKey;
  const hasUserApiKey = !!apiKey;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">
              AI Configuration
            </h3>
            <p className="text-sm text-gray-600">
              {isUsingFreeModel
                ? hasUserApiKey
                  ? "Using your Google API key"
                  : "Using shared Google AI access"
                : "Configure your API key for premium models"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isUsingFreeModel ? (
            hasUserApiKey ? (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Your API Key
              </span>
            ) : (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Shared Access
              </span>
            )
          ) : apiKey ? (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Configured
            </span>
          ) : (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              API Key Required
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-6 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Selection
              </label>
              <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer text-sm sm:text-base"
              >
                <optgroup label="Google Models (Free)">
                  {modelOptions
                    .filter((model) => model.provider === "google")
                    .map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="OpenAI Models (API Key Required)">
                  {modelOptions
                    .filter((model) => model.provider === "openai")
                    .map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Anthropic Models (API Key Required)">
                  {modelOptions
                    .filter((model) => model.provider === "anthropic")
                    .map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Cohere Models (API Key Required)">
                  {modelOptions
                    .filter((model) => model.provider === "cohere")
                    .map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                </optgroup>
              </select>
              {selectedModelData && (
                <p className="text-xs text-gray-500 mt-1">
                  {selectedModelData.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key {!isUsingFreeModel && "(Required)"}
                {isUsingFreeModel && (
                  <span className="text-xs text-gray-500 ml-1">
                    (Optional for higher limits)
                  </span>
                )}
              </label>
              <input
                type="password"
                placeholder={
                  isUsingFreeModel
                    ? "Optional: Your API key for higher limits"
                    : "Enter your API key..."
                }
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 mt-1">
                {isUsingFreeModel
                  ? hasUserApiKey
                    ? "Using your Google API key for unlimited access"
                    : "Free shared access with fallback to your key if needed"
                  : `Required for ${selectedModelData?.provider.toUpperCase()} models`}
              </p>
            </div>
          </div>

          {isUsingFreeModel && !hasUserApiKey && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-sm text-green-800 font-medium">
                  Using shared Google AI access - No setup required!
                </span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                Start immediately with shared access. Add your own API key above
                for guaranteed availability and higher limits.
              </p>
            </div>
          )}

          {isUsingFreeModel && hasUserApiKey && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-sm text-blue-800 font-medium">
                  Using your Google API key for unlimited access
                </span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                Your requests will use your personal API key with Google&apos;s
                generous free tier limits.
              </p>
            </div>
          )}

          {needsApiKey && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="text-sm text-orange-800 font-medium">
                  API key required for{" "}
                  {selectedModelData?.provider.toUpperCase()} models
                </span>
              </div>
              <p className="text-xs text-orange-700 mt-1">
                Please provide your API key to use this model, or switch to a
                free Google model.
              </p>
            </div>
          )}

          {!isUsingFreeModel && hasUserApiKey && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-sm text-green-800 font-medium">
                  API key configured for{" "}
                  {selectedModelData?.provider.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-xs text-gray-600">
              <strong>API Key Sources:</strong>
              <ul className="mt-1 space-y-1">
                <li>
                  • Google:{" "}
                  <a
                    href="https://ai.google.dev/gemini-api/docs/api-key"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Get API Key
                  </a>
                </li>
                <li>
                  • OpenAI:{" "}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    OpenAI Platform
                  </a>
                </li>
                <li>
                  • Anthropic:{" "}
                  <a
                    href="https://console.anthropic.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Anthropic Console
                  </a>
                </li>
                <li>
                  • Cohere:{" "}
                  <a
                    href="https://dashboard.cohere.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Cohere Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadMode, setUploadMode] = useState<UploadMode>("file");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash"); // Default to free Google model

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setResumeFile(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    setResumeFile(file);
    // Clear text when file is selected
    setResumeText("");
  };

  const handleModeChange = (mode: UploadMode) => {
    setUploadMode(mode);
    // Clear both inputs when switching modes
    setResumeFile(null);
    setResumeText("");
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid =
    uploadMode === "file" ? !!resumeFile : !!resumeText.trim();

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
            <button className="text-white/90 hover:text-white font-medium transition-colors cursor-pointer text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2">
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <APIKeySection
            apiKey={apiKey}
            selectedModel={selectedModel}
            onApiKeyChange={setApiKey}
            onModelChange={setSelectedModel}
          />

          <StepIndicator currentStep={currentStep} />

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            {currentStep === 1 && (
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    UPLOAD YOUR RESUME
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Upload your resume to get started with the analysis
                  </p>
                </div>

                <ModeToggle mode={uploadMode} onModeChange={handleModeChange} />

                {uploadMode === "file" ? (
                  <div className="space-y-6">
                    <FileUploadBox
                      title="Upload your resume to get started"
                      subtitle="Drag and drop your file here or click to browse"
                      acceptedFormats="as .pdf or .docx file"
                      onFileSelect={handleFileSelect}
                      isDragOver={isDragOver}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    />

                    {resumeFile && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-in fade-in duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-green-800">
                              File uploaded successfully!
                            </p>
                            <p className="text-sm text-green-600">
                              {resumeFile.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <TextUploadBox
                    title="Paste Your Resume"
                    subtitle="Copy and paste your resume content here"
                    placeholder="Paste your resume text here..."
                    value={resumeText}
                    onChange={setResumeText}
                  />
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleNextStep}
                    disabled={!isStep1Valid}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    ADD JOB DESCRIPTION
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Paste the job description you want to analyze against your
                    resume
                  </p>
                </div>

                <TextUploadBox
                  title="Job Description"
                  subtitle="Copy and paste the job posting or description here"
                  placeholder="Paste the job description here... Include requirements, responsibilities, and any other relevant details."
                  value={jobDescription}
                  onChange={setJobDescription}
                />

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                  <button
                    onClick={handlePrevStep}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors cursor-pointer text-sm sm:text-base order-2 sm:order-1"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!jobDescription.trim()}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                  >
                    Analyze Resume
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    ANALYSIS RESULTS
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Your resume analysis will appear here
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 sm:p-8 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-spin">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Analyzing Your Resume...
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Please wait while we analyze your resume against the job
                    description. This usually takes less than 8 seconds.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                  <button
                    onClick={handlePrevStep}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors cursor-pointer text-sm sm:text-base order-2 sm:order-1"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors cursor-pointer text-sm sm:text-base order-1 sm:order-2"
                  >
                    Start New Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
