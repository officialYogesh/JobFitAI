"use client";

import { useRouter } from "next/navigation";
import AuthGuard from "../components/AuthGuard";
import AnalysisProgress from "../components/AnalysisProgress";
import { useAuth } from "@/hooks/useAuth";

export default function AnalysisPage() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleAnalysisComplete = () => {
    console.log("Analysis completed! Redirecting to results...");
    // Redirect to results page after analysis completion
    setTimeout(() => {
      router.push("/results");
    }, 1000); // Brief delay to show completion state
  };

  const handleAnalysisError = (error: string) => {
    console.error("Analysis error:", error);
    // Could show error state or retry options
    alert(`Analysis failed: ${error}`);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

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
                onClick={() => router.push("/upload")}
                className="text-white/90 hover:text-white font-medium transition-colors text-sm sm:text-base cursor-pointer"
              >
                Back to Upload
              </button>
              <button
                onClick={handleLogout}
                className="text-white/90 hover:text-white font-medium transition-colors text-sm sm:text-base cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-12">
          <AnalysisProgress
            onComplete={handleAnalysisComplete}
            onError={handleAnalysisError}
          />
        </main>

        {/* Footer with helpful info */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              ⚡ Analysis powered by AI • 🔒 Your data is secure and will be
              deleted automatically
            </p>
          </div>
        </footer>
      </div>
    </AuthGuard>
  );
}
