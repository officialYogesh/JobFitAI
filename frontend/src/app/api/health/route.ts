import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "JobFitAI API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    architecture: "Next.js API Routes",
  });
}
