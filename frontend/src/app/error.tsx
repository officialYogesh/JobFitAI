"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-8 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          We encountered an unexpected error. Please try again or contact
          support if the problem persists.
        </p>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <div className="text-sm text-gray-500">or</div>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Go Back Home
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left bg-gray-100 rounded-lg p-4">
            <summary className="cursor-pointer font-medium text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-gray-600 overflow-auto">
              {error.message}
              {error.stack && (
                <>
                  {"\n\nStack trace:\n"}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
