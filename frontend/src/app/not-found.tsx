import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-8 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <div className="text-sm text-gray-500">
            or try one of these links:
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/upload"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Upload Resume
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link
              href="/results"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View Demo Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
